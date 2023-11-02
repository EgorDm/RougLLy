import {Gpu, Instance, Model} from "./components";

export interface EstimationParams {
    model: Model;
    instance: Instance;

    processingUtilization: number;
    generationUtilization: number;

    precisionBits: number;
    quantization: string | null;

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
    value: number | string;
    error?: string;
    display: ValueDisplay;
}


export interface ValueDisplay {
    unit?: string;
    label: string;
    info?: string;
}


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