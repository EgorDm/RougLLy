import {Checkbox, FormControlLabel, InputAdornment, TextField} from "@mui/material";
import React from "react";


function BatchSizeSelector(
    {value, defaultValue, onChange}: {
        value: number | null,
        defaultValue: number,
        onChange: (value: number | null) => void,
    }
) {
    return (
        <TextField
            type="number" inputProps={{inputMode: 'numeric', pattern: '[0-9]*'}}
            label="Batch Size"
            value={value ?? defaultValue}
            disabled={value === null}
            onChange={(e) => onChange(parseInt(e.target.value))}
            InputProps={{
                endAdornment: <InputAdornment position="start">
                    <FormControlLabel
                        control={
                            <Checkbox
                                value={value === null}
                                checked={value === null}/>
                        }
                        label="Recommended"
                        sx={{ml: 0, mr: 0}}
                        onChange={(e, checked) => {
                            onChange(checked ? null : defaultValue)
                        }}
                    />
                </InputAdornment>,
            }}
        />
    )
}

export default BatchSizeSelector;