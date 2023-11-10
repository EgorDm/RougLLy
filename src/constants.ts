import {Gpu, Instance, Model} from "./schema/components";
import exp from "constants";
import {Configuration} from "./schema/comparison";


export const MODELS: Model[] = [
    {
        id: 1,
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
        id: 2,
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
        id: 3,
        name: 'LLaMA 2 7B',
        family: 'LLaMA 2',
        parameterCount: 7e9,
        maxSeqLength: 4096,
        hiddenDimSize: 4096,
        numAttentionHeads: 32,
        numHiddenLayers: 32,
        numKeyValueHeads: 32,
        locked: true,
    }
]

export const NEW_MODEL: Model = {
    name: '',
    family: 'LLaMA 2',
    parameterCount: 7e9,
    maxSeqLength: 4096,
    hiddenDimSize: 3072,
    numAttentionHeads: 24,
    numHiddenLayers: 24,
    numKeyValueHeads: 24,
}

const GPU_A100_40G: Gpu = {
    id: 1,
    vendor: 'NVIDIA',
    model: 'A100 40G',
    memory: 40e9,
    fp16MatmulFlops: 312e12,
    memoryBandwidth: 1555e9,

    locked: true,
}

const GPU_A100_80G_SXM: Gpu = {
    id: 2,
    vendor: 'NVIDIA',
    model: 'A100 80G SXM',
    memory: 80e9,
    fp16MatmulFlops: 312e12,
    memoryBandwidth: 2039e9,

    locked: true,
}

const GPU_A100_80G_PCIE: Gpu = {
    id: 3,
    vendor: 'NVIDIA',
    model: 'A100 80G PCIe',
    memory: 80e9,
    fp16MatmulFlops: 312e12,
    memoryBandwidth: 1935e9,

    locked: true,
}

const GPU_H100_SXM: Gpu = {
    id: 4,
    vendor: 'NVIDIA',
    model: 'H100 SXM',
    memory: 80e9,
    fp16MatmulFlops: 1979e12,
    memoryBandwidth: 3350e9,

    locked: true,
}

const GPU_H100_PCIE: Gpu = {
    id: 5,
    vendor: 'NVIDIA',
    model: 'H100 PCIe',
    memory: 80e9,
    fp16MatmulFlops: 1513e12,
    memoryBandwidth: 2000e9,

    locked: true,
}

export const GPUS: Gpu[] = [
    GPU_A100_40G,
    GPU_A100_80G_SXM,
    GPU_A100_80G_PCIE,
    GPU_H100_SXM,
    GPU_H100_PCIE,
]

export const NEW_GPU: Gpu = {
    vendor: 'NVIDIA',
    model: 'A100 40G',
    memory: 40e9,
    fp16MatmulFlops: 312e12,
    memoryBandwidth: 1555e9,
}

export const INSTANCES: Instance[] = [
    {
        id: 1,
        provider: 'Lambda Labs',
        name: '1x A100 40G',
        gpu: GPU_A100_40G,
        gpuCount: 1,
        pricePerHour: 1.10,

        locked: true,
    },
    {
        id: 2,
        provider: 'Lambda Labs',
        name: '4x A100 40G',
        gpu: GPU_A100_40G,
        gpuCount: 4,
        pricePerHour: 4.40,

        locked: true,
    },
    {
        id: 3,
        provider: 'Lambda Labs',
        name: '8x A100 80G',
        gpu: GPU_A100_80G_PCIE,
        gpuCount: 8,
        pricePerHour: 8.80,

        locked: true,
    }
]

export const NEW_INSTANCE: Instance = {
    provider: 'Lambda Labs',
    name: '1x A100 40G',
    gpu: GPU_A100_40G,
    gpuCount: 1,
    pricePerHour: 1.10,
}

export const CONFIGURATIONS: Configuration[] = [
    {
        id: 1,
        vendor: 'OpenAI',
        model: 'gpt-4-1106-preview',
        size: '~1.7T',
        maxSeqLength: 128000,
        inputPrice: 0.01,
        outputPrice: 0.03,

        locked: true,
    },
    {
        id: 2,
        vendor: 'OpenAI',
        model: 'gpt-3.5-turbo-1106',
        size: '~175B',
        maxSeqLength: 16385,
        inputPrice: 0.001,
        outputPrice: 0.002,

        locked: true,
    },
    {
        id: 3,
        vendor: 'Antropic (AWS Bedrock)',
        model: 'Claude',
        size: '~137B',
        maxSeqLength: 100000,
        inputPrice: 0.011,
        outputPrice: 0.03268,

        locked: true,
    },
    {
        id: 4,
        vendor: 'Google Cloud',
        model: 'PaLM 2',
        size: '~340B',
        maxSeqLength: 8000,
        inputPrice: 0.002,
        outputPrice: 0.002,

        locked: true,
    }
]

export const NEW_CONFIGURATION: Configuration = {
    vendor: 'OpenAI',
    model: 'gpt-5',
    size: '~1.7T',
    maxSeqLength: 128000,
    inputPrice: 0.01,
    outputPrice: 0.03,
}