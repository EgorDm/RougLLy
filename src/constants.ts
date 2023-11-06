import {Gpu, Instance, Model} from "./schema/components";
import exp from "constants";


export const MODELS: Model[] = [
    {
        name: 'LLaMA 2 70B',
        family: 'LLaMA 2',
        parameterCount: 70e9,
        maxSeqLength: 4096,
        hiddenDimSize: 8192,
        numAttentionHeads: 64,
        numHiddenLayers: 80,
        numKeyValueHeads: 8,
        locked: true,
    },
    {
        name: 'LLaMA 2 13B',
        family: 'LLaMA 2',
        parameterCount: 13e9,
        maxSeqLength: 4096,
        hiddenDimSize: 5120,
        numAttentionHeads: 40,
        numHiddenLayers: 40,
        numKeyValueHeads: 40,
        locked: true,
    },
    {
        name: 'LLaMA 2 7B',
        family: 'LLaMA 2',
        parameterCount: 7e9,
        maxSeqLength: 4096,
        hiddenDimSize: 4096,
        numAttentionHeads: 32,
        numHiddenLayers: 32,
        numKeyValueHeads: 32,
    }
]

const GPU_A100_40G: Gpu = {
    vendor: 'NVIDIA',
    model: 'A100 40G',
    memory: 40e9,
    fp16MatmulFlops: 312e12,
    memoryBandwidth: 1555e9,
}

const GPU_A100_80G_SXM: Gpu = {
    vendor: 'NVIDIA',
    model: 'A100 80G SXM',
    memory: 80e9,
    fp16MatmulFlops: 312e12,
    memoryBandwidth: 2039e9,
}

const GPU_A100_80G_PCIE: Gpu = {
    vendor: 'NVIDIA',
    model: 'A100 80G PCIe',
    memory: 80e9,
    fp16MatmulFlops: 312e12,
    memoryBandwidth: 1935e9,
}

const GPU_H100_SXM: Gpu = {
    vendor: 'NVIDIA',
    model: 'H100 SXM',
    memory: 80e9,
    fp16MatmulFlops: 1979e12,
    memoryBandwidth: 3350e9,
}

const GPU_H100_PCIE: Gpu = {
    vendor: 'NVIDIA',
    model: 'H100 PCIe',
    memory: 80e9,
    fp16MatmulFlops: 1513e12,
    memoryBandwidth: 2000e9,
}

export const GPUS: Gpu[] = [
    GPU_A100_40G,
    GPU_A100_80G_SXM,
    GPU_A100_80G_PCIE,
    GPU_H100_SXM,
    GPU_H100_PCIE,
]

export const INSTANCES: Instance[] = [
    {
        provider: 'Lambda Labs',
        name: '1x A100 40G',
        gpu: GPU_A100_40G,
        gpuCount: 1,
        pricePerHour: 1.10,
    },
    {
        provider: 'Lambda Labs',
        name: '4x A100 40G',
        gpu: GPU_A100_40G,
        gpuCount: 4,
        pricePerHour: 4.40,
    },
    {
        provider: 'Lambda Labs',
        name: '8x A100 80G',
        gpu: GPU_A100_80G_PCIE,
        gpuCount: 8,
        pricePerHour: 8.80,
    }
]