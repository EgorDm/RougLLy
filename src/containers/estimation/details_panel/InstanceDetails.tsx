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
import {Instance, Model} from "../../../schema/components";
import {CalculationValue} from "../../../schema/calculation";
import {DataTable} from "../../../components/data/DataTable";

function createCalculatedValues(instance: Instance): CalculationValue[] {
    return [
        {
            value: `${instance.gpu.vendor} ${instance.gpu.model}`,
            display: {
                label: 'GPU Name',
                info: 'The name of the GPU.',
            }
        },
        {
            value: instance.gpuCount,
            display: {
                label: 'Number of GPUs',
            }
        },
        {
            value: instance.pricePerHour,
            display: {
                label: 'Price per Hour',
                info: 'How much it costs to rent the instance for an hour.',
            }
        },
        {
            value: instance.pricePerHour / 3600,
            display: {
                label: 'Price per Second',
                info: 'How much it costs to rent the instance for a second.',
            }
        },
    ]
}


export const InstanceDetails = () => {
    const {params: {instance}} = useEstimationContext();

    const calculatedValues = createCalculatedValues(instance);

    return (
        <Accordion>
            <AccordionSummary aria-controls="panel1d-content" id="panel1d-header"
                              expandIcon={<ExpandMoreIcon/>}>
                <Stack flexDirection="row" flex={1} sx={{pr: 4}}>
                    <Typography flex={2}>Instance Details</Typography>
                    <Typography flex={1} fontWeight={'bold'}>{instance.provider} {instance.name}</Typography>
                </Stack>
            </AccordionSummary>
            <AccordionDetails sx={{pl: 0, pr: 0}}>
                <DataTable data={calculatedValues}/>
            </AccordionDetails>
        </Accordion>
    )
}