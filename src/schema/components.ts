export interface Model {
    name: string;
    family: string;

    parameterCount: number;
    maxSeqLength: number;

    hiddenDimSize: number;
    numAttentionHeads: number;

    numHiddenLayers: number;
    numKeyValueHeads: number;
}


export interface Instance {
    provider: string;
    name: string;

    gpu: Gpu;
    gpuCount: number;

    pricePerHour: number;
}

export interface Gpu {
    vendor: string;
    model: string;
    memory: number;
    fp16MatmulFlops: number;
    memoryBandwidth: number;
}


