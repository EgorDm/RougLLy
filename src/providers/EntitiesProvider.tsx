import React, {useMemo, useState} from "react";
import {Calculation, EstimationParams} from "../schema/calculation";
import {Gpu, Instance, Model} from "../schema/components";
import {GPUS, INSTANCES, MODELS} from "../constants";


const EntitiesContext = React.createContext<{
    models: Model[],
    setModels: (models: Model[]) => void,
    instances: Instance[],
    gpus: Gpu[],
}>(null as any);


export const EntitiesProvider = ({children}: { children: React.ReactNode }) => {
    const [models, setModels] = useState(MODELS);

    const contextValue = useMemo(() => ({
        models,
        setModels,
        instances: INSTANCES,
        gpus: GPUS,
    }), []);

    return (
        <EntitiesContext.Provider value={contextValue}>
            {children}
        </EntitiesContext.Provider>
    )
}

export const useEntitiesContext = () => {
    const context = React.useContext(EntitiesContext);
    if (context === null) {
        throw new Error('useContext must be used within a Provider');
    }
    return context;
}