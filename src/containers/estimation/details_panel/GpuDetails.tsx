import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Paper,
    Stack, styled,
    TableBody, TableCell,
    TableContainer, TableRow,
    Typography
} from "@mui/material";
import Table from '@mui/material/Table';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React from "react";
import {useEstimationContext} from "../../../providers/EstimationProvider";
import {Gpu, Model} from "../../../schema/components";
import {CalculationValue} from "../../../schema/calculation";
import {DataTable} from "../../../components/data/DataTable";

function createModelCalculatedValues(gpu: Gpu): CalculationValue[] {
    return [
        {
            value: gpu.memory,
            display: {
                label: 'GPU Memory',
                info: 'The amount of memory on the GPU.',
                unit: 'bytes'
            }
        },
        {
            value: gpu.fp16MatmulFlops,
            display: {
                label: 'GPU FLOPS (fp16 matmul)',
                info: 'The number of floating point operations per second that the GPU can perform.',
                unit: 'flops'
            }
        },
        {
            value: gpu.memoryBandwidth,
            display: {
                label: 'GPU Memory Bandwidth',
                info: 'The amount of memory bandwidth on the GPU.',
                unit: 'bytes'
            }
        },
    ]
}


export const GpuDetails = () => {
    const {params: {instance: {gpu}}} = useEstimationContext();

    const calculatedValues = createModelCalculatedValues(gpu);

    return (
        <Accordion>
            <AccordionSummary aria-controls="panel1d-content" id="panel1d-header"
                              expandIcon={<ExpandMoreIcon/>}>
                <Stack flexDirection="row" flex={1} sx={{pr: 4}}>
                    <Typography flex={2}>GPU Details</Typography>
                    <Typography flex={1} fontWeight={'bold'}>{gpu.vendor} {gpu.model}</Typography>
                </Stack>
            </AccordionSummary>
            <AccordionDetails sx={{pl: 0, pr: 0}}>
                <DataTable data={calculatedValues}/>
            </AccordionDetails>
        </Accordion>
    )
}