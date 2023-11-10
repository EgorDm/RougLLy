import {EstimationParams} from "./calculation";

export interface Model {
    id?: number;
    name: string;
    family: string;

    parameterCount: number;
    maxSeqLength: number;

    hiddenDimSize: number;
    numAttentionHeads: number;

    numHiddenLayers: number;
    numKeyValueHeads: number;

    locked?: boolean;
}


export interface Instance {
    id?: number;
    provider: string;
    name: string;

    gpu: Gpu;
    gpuCount: number;

    pricePerHour: number;

    locked?: boolean;
}

export interface Gpu {
    id?: number;
    vendor: string;
    model: string;
    memory: number;
    fp16MatmulFlops: number;
    memoryBandwidth: number;

    locked?: boolean;
}

