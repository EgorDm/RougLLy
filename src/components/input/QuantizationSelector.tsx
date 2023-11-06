import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import React from "react";

const OPTIONS: Record<number, any[]> = {
    2: [
        {value: 'Q2_K', label: 'Q2_K'},
    ],
    3: [
        {value: 'Q3_K_L', label: 'Q3_K_L'},
        {value: 'Q3_K_M', label: 'Q3_K_M'},
        {value: 'Q3_K_S', label: 'Q3_K_S'},
    ],
    4: [
        {value: 'Q4_0', label: 'Q4_0'},
        {value: 'Q4_K_M', label: 'Q4_K_M'},
        {value: 'Q4_K_S', label: 'Q4_K_S'},
    ],
    5: [
        {value: 'Q5_0', label: 'Q5_0'},
        {value: 'Q5_K_M', label: 'Q5_K_M'},
        {value: 'Q5_K_S', label: 'Q5_K_S'},
    ],
    6: [
        {value: 'Q6_K', label: 'Q6_K'},
    ],
    8: [
        {value: 'Q8_0', label: 'Q8_0'},
    ],
}

function QuantizationSelector(
    {
        value,
        precisionBits,
        onChange,
        ...props
    }: {
        value: string,
        precisionBits: number,
        onChange: (value: string) => void,
    }
) {
    const options = [
        {value: 'none', label: 'none'},
    ].concat(OPTIONS[precisionBits] ?? []);

    const valueInOptions = options.find(option => option.value === value);


    return (
        <FormControl variant="outlined" sx={{minWidth: 120, mt: 2}} {...props}>
            <InputLabel id="quantization-label">Quantization</InputLabel>
            <Select
                labelId="quantization-label"
                label="Quantization"
                value={valueInOptions ? value : 'none'}
                disabled={options.length === 1}
                onChange={(e) => onChange(e.target.value as string)}
            >
                {options.map((option, i) => (
                    <MenuItem key={i} value={option.value}>{option.label}</MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}

export default QuantizationSelector