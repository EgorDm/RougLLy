import {Autocomplete, TextField} from "@mui/material";
import React from "react";
import {INSTANCES} from "../../../constants";
import {useEstimationContext} from "../../../providers/EstimationProvider";
import {Instance} from "../../../schema/components";
import {useEntitiesContext} from "../../../providers/EntitiesProvider";


export const InstanceSelection = () => {

    const {params, setParams} = useEstimationContext();
    const {instances} = useEntitiesContext();


    const onChange = (event: any, value: Instance | null) => {
        if (value) {
            setParams({
                ...params,
                instance: value
            })
        }
    }

    return (
        <Autocomplete
            disablePortal
            value={params.instance}
            options={instances}
            getOptionLabel={(option) => `${option.provider} ${option.name}`}
            renderInput={(params) => <TextField {...params} label="Instance"/>}
            onChange={onChange}
            isOptionEqualToValue={
                (option, value) => `${option.provider}/${option.name}` === `${value.provider}/${value.name}`
            }
        />
    )
}