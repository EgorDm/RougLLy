import React, {useMemo} from "react";
import {Calculation, EstimationParams} from "../schema/calculation";
import {INSTANCES, MODELS} from "../constants";
import calculations from "../calculations";


const EstimationContext = React.createContext<{
    params: EstimationParams,
    setParams: (params: EstimationParams) => void,
    calculation: Calculation,
}>(null as any);

export const EstimationProvider = ({children}: { children: React.ReactNode }) => {
    const [params, setParams] = React.useState<EstimationParams>({
        model: MODELS[2],
        instance: INSTANCES[0],

        processingUtilization: 0.7,
        generationUtilization: 0.7,

        precisionBits: 16,
        quantization: 'none',

        batchSize: null,
    });

    const calculation = useMemo(() => {
        const calculator = calculations[params.model.family];

        return calculator(params)
    }, [params]);

    const contextValue = useMemo(() => ({
        params,
        setParams,
        calculation,
    }), [params, calculation]);


    return (
        <EstimationContext.Provider value={contextValue}>
            {children}
        </EstimationContext.Provider>
    )
}

export const useEstimationContext = () => {
    const context = React.useContext(EstimationContext);
    if (context === null) {
        throw new Error('useContext must be used within a Provider');
    }
    return context;
}