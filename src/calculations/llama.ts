import {Calculation, CalculationFn, EstimationParams} from "../schema/calculation";


export const calculateLLaMA: CalculationFn = (
    {
        model,
        instance,
        precisionBits,
        ...params
    }: EstimationParams,
): Calculation => {
    const totalVRAM = instance.gpuCount * instance.gpu.memory;
    const dimPerAttentionHead = model.hiddenDimSize / model.numAttentionHeads;
    const instancePricePerSecond = instance.pricePerHour / 3600;

    const totalFp16MatmulFlopsAdjusted = instance.gpuCount * instance.gpu.fp16MatmulFlops * params.processingUtilization;
    const totalMemoryBandwidthAdjusted = instance.gpuCount * instance.gpu.memoryBandwidth * params.processingUtilization;

    const precisionBytes = precisionBits / 8;
    const modelSizeBytes = model.parameterCount * precisionBytes;
    const cacheSizeAvailableBytes = totalVRAM - modelSizeBytes;

    const forwardPassFlops = 4 * model.hiddenDimSize * model.numHiddenLayers * model.maxSeqLength * 2;
    const memoryBandwidthForModelWeights = modelSizeBytes;

    const processingMemoryPerTokenBytes = memoryBandwidthForModelWeights / model.maxSeqLength;
    const tokenKVCacheSizeBytes = 2 * model.numKeyValueHeads * model.numHiddenLayers * dimPerAttentionHead * precisionBytes;
    const sequenceKVCacheSizeBytes = tokenKVCacheSizeBytes * model.maxSeqLength;

    const recommendedBatchSize = Math.floor(cacheSizeAvailableBytes / sequenceKVCacheSizeBytes);
    const batchSize = params.batchSize ?? recommendedBatchSize;

    const batchTotalKVCacheSizeBytes = sequenceKVCacheSizeBytes * batchSize;

    const memoryRequirementGeneration = modelSizeBytes + batchTotalKVCacheSizeBytes;

    const processingComputeBandwidthRequirement = modelSizeBytes;
    const processingComputeBoundThreshold = totalFp16MatmulFlopsAdjusted / processingComputeBandwidthRequirement;
    const processingThroughput = totalFp16MatmulFlopsAdjusted / processingComputeBoundThreshold;
    const processingCost = (instancePricePerSecond / processingThroughput) * 1000;

    const generationLatency = (model.maxSeqLength * batchSize * modelSizeBytes) / totalFp16MatmulFlopsAdjusted;
    const generationThroughputSingle = totalMemoryBandwidthAdjusted / modelSizeBytes;
    const generationCostSingle = (instancePricePerSecond / generationThroughputSingle) * 1000;
    const generationThroughput = generationThroughputSingle * batchSize;
    const generationCost = generationCostSingle / batchSize;

    return {
        groups: [
            {
                name: 'Calculation Constants',
                calculations: [
                    {
                        value: precisionBytes,
                        display: {
                            unit: "bytes",
                            label: "Precision Bytes",
                            info: "The number of bytes required to store a single precision floating point number."
                        }
                    },
                    {
                        value: modelSizeBytes,
                        display: {
                            unit: "bytes",
                            label: "Model Size",
                            info: "The number of bytes required to store the model."
                        }
                    },
                    {
                        value: totalVRAM,
                        display: {
                            unit: "bytes",
                            label: "Total VRAM",
                            info: "The total amount of VRAM available on the instance."
                        }
                    },
                    {
                        value: cacheSizeAvailableBytes,
                        display: {
                            unit: "bytes",
                            label: "VRAM Available for Cache",
                            info: "The amount of VRAM available for the KV cache."
                        }
                    },
                    {
                        value: recommendedBatchSize,
                        display: {
                            unit: "bytes",
                            label: "Recommended Batch Size",
                            info: "The recommended batch size for optimal utilization of the instance."
                        }
                    }
                ]
            },
            {
                name: "Compute and Memory Requirements",
                calculations: [
                    {
                        value: forwardPassFlops,
                        display: {
                            unit: "FLOPs",
                            label: "Forward Pass FLOPs",
                            info: "The number of floating point operations required to perform a forward pass of the model."
                        }
                    },
                    {
                        value: memoryBandwidthForModelWeights,
                        display: {
                            unit: "bytes",
                            label: "Memory Bandwidth for Model Weights",
                            info: "The amount of memory bandwidth required to perform a forward pass."
                        }
                    },
                    {
                        value: processingMemoryPerTokenBytes,
                        display: {
                            unit: "bytes",
                            label: "Memory Per Token (for Prompt Processing)",
                            info: "The amount of memory required per token for processing the prompt."
                        }
                    },
                    {
                        value: tokenKVCacheSizeBytes,
                        display: {
                            unit: "bytes",
                            label: "Token KV Cache Size",
                            info: "The amount of memory required to store the key and value vectors for each token."
                        }
                    },
                    {
                        value: memoryRequirementGeneration,
                        display: {
                            unit: "bytes",
                            label: "Memory Requirement (for Generation)",
                            info: "The amount of memory required to perform generation."
                        }
                    }
                ]
            }
        ],
        processing: {
            calculations: [
                {
                    value: processingComputeBandwidthRequirement,
                    display: {
                        unit: "bytes",
                        label: "Compute Bandwidth per Token",
                        info: "The amount of compute FLOPs bandwidth required to perform a forward pass."
                    }
                },
                {
                    value: processingComputeBoundThreshold,
                    display: {
                        unit: "tokens",
                        label: "Compute Bound Threshold",
                        info: "The number of tokens after which prompt processing becomes compute bound."
                    }
                }
            ],
            costPer1KTokens: processingCost,
            throughput: processingThroughput
        },
        generation: {
            calculations: [
                {
                    value: generationLatency,
                    display: {
                        unit: "seconds",
                        label: "Generation Latency",
                        info: "How long it takes until the first token is generated. (i.e. time it takes to process the prompt)"
                    }
                },
                {
                    value: generationThroughputSingle,
                    display: {
                        unit: "tokens/second",
                        label: "Generation Throughput (Single)",
                        info: "The number of tokens that can be generated per second for single generation."
                    }
                },
                {
                    value: generationCostSingle,
                    display: {
                        unit: "dollar/1k tokens",
                        label: "Generation Cost (Single)",
                        info: "The number of tokens that can be generated per dollar for single generation."
                    }
                },
            ],
            costPer1KTokens: generationCost,
            throughput: generationThroughput
        }
    }
}