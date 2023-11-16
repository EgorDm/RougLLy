import {EstimationParams} from "./calculation";


export interface Configuration {
    id?: number;
    name: string;
    params?: EstimationParams;

    maxSeqLength: number;
    size?: string;

    inputPrice: number;
    outputPrice: number | null;

    locked?: boolean;
}
