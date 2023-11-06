import {Box, Slider, Typography} from "@mui/material";
import React from "react";

const LOOKUP: Record<number, number> = {
    1: 3,
    2: 4,
    3: 5,
    4: 6,
    5: 8,
    6: 16,
    7: 32,
}

const REV_LOOKUP: Record<number, number> = {
    3: 1,
    4: 2,
    5: 3,
    6: 4,
    8: 5,
    16: 6,
    32: 7,
}

const MARKS = [
    {
        value: 1,
        label: '3-bit',
    },
    {
        value: 2,
        label: '4-bit',
    },
    {
        value: 3,
        label: '5-bit',
    },
    {
        value: 4,
        label: '6-bit',
    },
    {
        value: 5,
        label: '8-bit',
    },
    {
        value: 6,
        label: '16-bit',
    },
    {
        value: 7,
        label: '32-bit',
    },
];

function valueText(value: number) {
    return `${value}-bit`;
}

function PrecisionSelector(
    {
        value,
        onChange,
        ...props
    }: {
        value: number,
        onChange: (value: number) => void,
    }
) {

    return (
        <Box sx={{flexGrow: 1, pr: 6}}>
            <Typography variant="caption" gutterBottom>
                Float Precision
            </Typography>
            <Slider
                track="inverted"
                aria-labelledby="track-inverted-slider"
                getAriaValueText={valueText}
                defaultValue={REV_LOOKUP[16]}
                min={1}
                max={7}
                marks={MARKS}
                value={REV_LOOKUP[value]}
                onChange={(e, v) => onChange(LOOKUP[v as number])}
            />
        </Box>
    )
}

export default PrecisionSelector;