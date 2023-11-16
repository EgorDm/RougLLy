import {Calculation, CalculationFn, EstimationParams} from "../schema/calculation";
import {formatBytes} from "../utils/formatting";


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
    const cacheSizeAvailableBytes = Math.max(totalVRAM - modelSizeBytes, 0);

    const forwardPassFlops = 4 * model.hiddenDimSize * model.numHiddenLayers * model.maxSeqLength * 2;
    const memoryBandwidthForModelWeights = modelSizeBytes;

    const processingMemoryPerTokenBytes = memoryBandwidthForModelWeights / model.maxSeqLength;
    const tokenKVCacheSizeBytes = 2 * model.numKeyValueHeads * model.numHiddenLayers * dimPerAttentionHead * precisionBytes;
    const sequenceKVCacheSizeBytes = tokenKVCacheSizeBytes * model.maxSeqLength;

    const recommendedBatchSize = Math.floor(cacheSizeAvailableBytes / sequenceKVCacheSizeBytes);
    const batchSize = params.batchSize ?? recommendedBatchSize;

    const batchTotalKVCacheSizeBytes = sequenceKVCacheSizeBytes * batchSize;

    const memoryRequirementGeneration = modelSizeBytes + batchTotalKVCacheSizeBytes;
    const minMemoryRequirementGeneration = modelSizeBytes + sequenceKVCacheSizeBytes;

    const processingComputeBandwidthRequirement = modelSizeBytes;
    const processingComputeBoundThreshold = totalFp16MatmulFlopsAdjusted / processingComputeBandwidthRequirement;
    const processingThroughput = processingComputeBoundThreshold;
    const processingCost = (instancePricePerSecond / processingThroughput) * 1000;

    const generationLatency = (model.maxSeqLength * batchSize * modelSizeBytes) / totalFp16MatmulFlopsAdjusted;
    const generationThroughputSingle = totalMemoryBandwidthAdjusted / modelSizeBytes;
    const generationCostSingle = (instancePricePerSecond / generationThroughputSingle) * 1000;
    const generationThroughput = generationThroughputSingle * batchSize;
    const generationCost = generationCostSingle / batchSize;

    return {
        recommendedBatchSize,
        groups: [
            {
                name: 'Calculation Constants',
                subtitle: `Batch Size: ${batchSize}`,
                calculations: [
                    {
                        value: {
                            value: precisionBytes,
                            unit: "bytes",
                        },
                        display: {
                            label: "Precision Bytes",
                            info: "The number of bytes required to store a single precision floating point number."
                        }
                    },
                    {
                        value: {
                            value: modelSizeBytes,
                            unit: "bytes",
                        },
                        display: {
                            label: "Model Size",
                            info: "The number of bytes required to store the model."
                        }
                    },
                    {
                        value: {
                            value: totalVRAM,
                            unit: "bytes",
                        },
                        display: {
                            label: "Total VRAM",
                            info: "The total amount of VRAM available on the instance."
                        }
                    },
                    {
                        value: {
                            value: cacheSizeAvailableBytes,
                            unit: "bytes",
                        },
                        display: {
                            label: "VRAM Available for Cache",
                            info: "The amount of VRAM available for the KV cache."
                        }
                    },
                    {
                        value: recommendedBatchSize,
                        display: {
                            label: "Recommended Batch Size",
                            info: "The recommended batch size for optimal utilization of the instance."
                        }
                    }
                ]
            },
            {
                name: "Compute and Memory Requirements",
                subtitle: `Min VRAM: ${formatBytes(minMemoryRequirementGeneration)}`,
                calculations: [
                    {
                        value: {
                            value: forwardPassFlops,
                            unit: "flops",
                        },
                        display: {
                            label: "Forward Pass FLOPs",
                            info: "The number of floating point operations required to perform a forward pass of the model."
                        }
                    },
                    {
                        value: {
                            value: memoryBandwidthForModelWeights,
                            unit: "bytes",
                        },
                        display: {
                            label: "Memory Bandwidth for Model Weights",
                            info: "The amount of memory bandwidth required to perform a forward pass."
                        }
                    },
                    {
                        value: {
                            value: processingMemoryPerTokenBytes,
                            unit: "bytes",
                        },
                        display: {
                            label: "Memory Per Token (for Prompt Processing)",
                            info: "The amount of memory required per token for processing the prompt."
                        }
                    },
                    {
                        value: {
                            value: tokenKVCacheSizeBytes,
                            unit: "bytes",
                        },
                        display: {
                            label: "Token KV Cache Size",
                            info: "The amount of memory required to store the key and value vectors for each token."
                        }
                    },
                    {
                        value: {
                            value: memoryRequirementGeneration,
                            unit: "bytes",
                        },
                        display: {
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
                    value: {
                        value: processingComputeBandwidthRequirement,
                        unit: "bytes",
                    },
                    display: {
                        label: "Compute Bandwidth per Token",
                        info: "The amount of compute FLOPs bandwidth required to perform a forward pass."
                    }
                },
                {
                    value: {
                        value: processingComputeBoundThreshold,
                        unit: "tokens",
                    },
                    display: {
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
                    value: {
                        value: generationLatency,
                        unit: "seconds",
                    },
                    display: {
                        label: "Generation Latency",
                        info: "How long it takes until the first token is generated. (i.e. time it takes to process the prompt)"
                    }
                },
                {
                    value: {
                        value: generationThroughputSingle,
                        unit: "tokens/second",
                        precision: 2
                    },
                    display: {
                        label: "Generation Throughput (Single)",
                        info: "The number of tokens that can be generated per second for single generation."
                    }
                },
                {
                    value: {
                        value: generationCostSingle,
                        unit: "dollar",
                        precision: 5,
                    },
                    display: {
                        label: "Generation Cost (Single) per 1k Tokens",
                        info: "The number of tokens that can be generated per dollar for single generation."
                    }
                },
                {
                    value: {
                        value: generationThroughput,
                        unit: "tokens/second",
                        precision: 2
                    },
                    display: {
                        label: "Generation Throughput (Batch)",
                        info: "The number of tokens that can be generated per second for batch generation."
                    }
                },
            ],
            costPer1KTokens: generationCost,
            throughput: generationThroughput
        }
    }
}