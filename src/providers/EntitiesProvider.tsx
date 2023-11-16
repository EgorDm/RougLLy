import React, {useMemo} from "react";
import {Gpu, Instance, Model} from "../schema/components";
import {CONFIGURATIONS, GPUS, INSTANCES, MODELS} from "../constants";
import {useLocalStorage} from "../hooks/useLocalStorage";
import {Configuration} from "../schema/comparison";


const EntitiesContext = React.createContext<{
    models: Model[],
    setModels: (models: Model[]) => void,
    instances: Instance[],
    setInstances: (instances: Instance[]) => void,
    gpus: Gpu[],
    setGpus: (gpus: Gpu[]) => void,
    configurations: Configuration[],
    setConfigurations: (configurations: Configuration[]) => void,
}>(null as any);


export const EntitiesProvider = ({children}: { children: React.ReactNode }) => {

    const [models, setModels] = useLocalStorage('models_v1', MODELS);
    const [instances, setInstances] = useLocalStorage('instances_v1', INSTANCES);
    const [gpus, setGpus] = useLocalStorage('gpus_v1', GPUS);
    const [configurations, setConfigurations] = useLocalStorage('configurations_v1', CONFIGURATIONS);

    const contextValue = useMemo(() => ({
        models: MODELS.concat(models.filter((row: Model) => !row.locked)),
        setModels,
        instances: INSTANCES.concat(instances.filter((row: Instance) => !row.locked)),
        setInstances,
        gpus: GPUS.concat(gpus.filter((row: Gpu) => !row.locked)),
        setGpus,
        configurations: CONFIGURATIONS.concat(configurations.filter((row: Configuration) => !row.locked)),
        setConfigurations,
    }), [models, instances, gpus, configurations]);

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