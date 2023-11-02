import {Autocomplete, TextField} from "@mui/material";
import React from "react";
import {INSTANCES} from "../../../constants";
import {useEstimationContext} from "../../../providers/EstimationProvider";
import {Instance} from "../../../schema/components";


export const InstanceSelection = () => {
    const options = INSTANCES;

    const {params, setParams} = useEstimationContext();

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
            options={options}
            getOptionLabel={(option) => `${option.provider} ${option.name}`}
            renderInput={(params) => <TextField {...params} label="Instance"/>}
            onChange={onChange}
        />
    )
}