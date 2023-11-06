import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
    Accordion as MuiAccordion,
    AccordionDetails, AccordionProps, AccordionSummary as MuiAccordionSummary, AccordionSummaryProps,
    Box, Checkbox,
    FormControl, FormControlLabel, InputAdornment,
    InputLabel,
    MenuItem,
    Select,
    Slider,
    Stack, styled, TextField,
    Typography
} from "@mui/material";
import React from "react";
import QuantizationSelector from "../../../components/input/QuantizationSelector";
import {useEstimationContext} from "../../../providers/EstimationProvider";
import PrecisionSelector from "../../../components/input/PrecisionSelector";


const Accordion = styled((props: AccordionProps) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({theme}) => ({
    border: 'none',
    backgroundColor: 'transparent',
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&:before': {
        display: 'none',
    },
}));


const AccordionSummary = styled((props: AccordionSummaryProps) => (
    <MuiAccordionSummary
        expandIcon={<ExpandMoreIcon/>}
        {...props}
    />
))(({theme}) => ({

    flexDirection: 'row-reverse',
    paddingLeft: 8,
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1),
    },
}));




export function AdvancedPanel() {
    const {params, setParams} = useEstimationContext();

    const setParamsPartial = (paramsPartial: Partial<typeof params>) => {
        setParams({...params, ...paramsPartial})
    }

    return (
        <Accordion variant={'outlined'}>
            <AccordionSummary>
                <Typography>Advanced Settings</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Stack flexDirection="row">
                    <PrecisionSelector
                        value={params.precisionBits}
                        onChange={(precisionBits) => setParamsPartial({precisionBits})}/>
                    <QuantizationSelector
                        value={params.quantization}
                        precisionBits={params.precisionBits}
                        onChange={(quantization) => setParamsPartial({quantization})}
                    />
                </Stack>


                <Stack spacing={1.5} sx={{minWidth: 300, mt: 2}}>
                    <TextField
                        type="number" inputProps={{inputMode: 'numeric', pattern: '[0-9]*'}}
                        value={5}
                        label="Batch Size"
                        InputProps={{
                            endAdornment: <InputAdornment position="start">
                                <FormControlLabel control={<Checkbox/>} label="Recommended"
                                                  sx={{ml: 0, mr: 0}}/>
                            </InputAdornment>,
                        }}
                    />
                </Stack>
                <Box sx={{mt: 2}}>
                    <Typography variant="caption" gutterBottom>
                        Utilization
                    </Typography>
                    <Slider
                        track="inverted"
                        aria-labelledby="track-inverted-slider"
                        min={10}
                        max={100}
                        defaultValue={70}
                        step={10}
                        marks
                        valueLabelDisplay="auto"
                    />
                </Box>
            </AccordionDetails>
        </Accordion>
    )
}

export default AdvancedPanel;