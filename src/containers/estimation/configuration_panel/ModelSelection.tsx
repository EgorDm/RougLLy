import {Autocomplete, TextField} from "@mui/material";
import React from "react";
import {MODELS} from "../../../constants";
import {useEstimationContext} from "../../../providers/EstimationProvider";
import {Instance, Model} from "../../../schema/components";


export const ModelSelection = () => {
    const options = MODELS;

    const {params, setParams} = useEstimationContext();

    const onChange = (event: any, value: Model | null) => {
        if (value) {
            setParams({
                ...params,
                model: value
            })
        }
    }

    return (
        <Autocomplete
            disablePortal
            value={params.model}
            options={options}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => <TextField {...params} label="Model"/>}
            onChange={onChange}
        />
    )
}