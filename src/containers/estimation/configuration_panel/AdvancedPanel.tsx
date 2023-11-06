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
import BatchSizeSelector from "../../../components/input/BatchSizeSelector";
import LabeledSlider from "../../../components/input/LabeledSlider";


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
    const {params, calculation, setParams} = useEstimationContext();

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
                    <BatchSizeSelector
                        value={params.batchSize}
                        defaultValue={calculation.recommendedBatchSize}
                        onChange={(batchSize) => setParamsPartial({batchSize})}
                    />
                </Stack>
                <LabeledSlider
                    sx={{mt: 2}}
                    label="Utilization"
                    min={10}
                    max={100}
                    value={Math.round(params.processingUtilization * 100)}
                    onChange={(e, value) => setParamsPartial({
                        processingUtilization: value as number / 100,
                        generationUtilization: value as number / 100,
                    })}
                    defaultValue={70}
                    step={10}
                    marks
                    valueLabelDisplay="auto"
                />
            </AccordionDetails>
        </Accordion>
    )
}

export default AdvancedPanel;