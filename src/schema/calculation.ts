import {Gpu, Instance, Model} from "./components";

export interface EstimationParams {
    model: Model;
    instance: Instance;

    processingUtilization: number;
    generationUtilization: number;

    precisionBits: number;
    quantization: string;

    batchSize: number | null;
}

export type CalculationFn = (params: EstimationParams) => Calculation;


export interface Calculation {
    groups: CalculationGroup[];

    processing: ProcessingCalculationGroup;
    generation: GenerationCalculationGroup;
}

export interface CalculationGroup {
    name: string;
    description?: string;
    calculations: CalculationValue[];
}

export interface CalculationValue {
    name?: string;
    value: Value;
    extra?: string;
    display: ValueDisplay;
}


export interface ValueDisplay {
    label: string;
    info?: string;
}

export type Value = number | string | {
    value: number;
    unit: 'bytes'
} | {
    value: number;
    unit: 'flops'
} | {
    value: number;
    unit: 'dollar'
    precision?: number;
} | {
    value: number;
    unit: string;
    precision?: number;
};


export interface ProcessingCalculationGroup {
    calculations: CalculationValue[];

    throughput: number;
    costPer1KTokens: number;
}

export interface GenerationCalculationGroup {
    calculations: CalculationValue[];

    throughput: number;
    costPer1KTokens: number;
}