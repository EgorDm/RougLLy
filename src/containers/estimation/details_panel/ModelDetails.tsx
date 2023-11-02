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
import {Model} from "../../../schema/components";
import {CalculationValue} from "../../../schema/calculation";
import {DataTable} from "../../../components/data/DataTable";

function createModelCalculatedValues(model: Model): CalculationValue[] {
    return [
        {
            value: model.parameterCount,
            display: {
                label: 'Model Parameter Count',
                info: 'The number of parameters in the model. This is the number of weights in the model.',
                unit: 'bignumber'
            }
        },
        {
            value: model.maxSeqLength,
            display: {
                label: 'Maximum Sequence Length',
                info: 'The maximum sequence length that the model can process.',
            }
        },
        {
            value: model.hiddenDimSize,
            display: {
                label: 'Hidden Dimension Size',
                info: 'The hidden dimension size of the model.',
            }
        },
        {
            value: model.numAttentionHeads,
            display: {
                label: 'Number of Attention Heads',
                info: 'The number of attention heads in the model.',
            }
        },
        {
            value: model.numHiddenLayers,
            display: {
                label: 'Number of Layers',
                info: 'The number of layers in the model.',
            }
        },
        {
            value: model.numKeyValueHeads,
            display: {
                label: 'Number of Key/Value Heads',
                info: 'The number of key/value heads in the model.',
            }
        },
        {
            value: model.hiddenDimSize / model.numAttentionHeads,
            display: {
                label: 'Dimension Size per Attention Head',
                info: 'The dimension size per attention head in the model.',
            }
        }
    ]
}


export const ModelDetails = () => {
    const {params: {model}} = useEstimationContext();

    const calculatedValues = createModelCalculatedValues(model);

    return (
        <Accordion>
            <AccordionSummary aria-controls="panel1d-content" id="panel1d-header"
                              expandIcon={<ExpandMoreIcon/>}>
                <Stack flexDirection="row" flex={1} sx={{pr: 4}}>
                    <Typography flex={2}>Model Details</Typography>
                    <Typography flex={1} fontWeight={'bold'}>{model.name}</Typography>
                </Stack>
            </AccordionSummary>
            <AccordionDetails sx={{pl: 0, pr: 0}}>
                <DataTable data={calculatedValues}/>
            </AccordionDetails>
        </Accordion>
    )
}