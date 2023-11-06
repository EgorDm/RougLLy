import {Box, Slider, Typography} from "@mui/material";
import React from "react";
import {SliderProps} from "@mui/material/Slider/Slider";


function LabeledSlider(
    {sx, label, ...props}: SliderProps & { label: string }
) {
    return (
        <Box sx={sx}>
            <Typography variant="caption" gutterBottom>
                {label}
            </Typography>
            <Slider
                track="inverted"
                aria-labelledby="track-inverted-slider"
                {...props}
            />
        </Box>
    )
}

export default LabeledSlider;