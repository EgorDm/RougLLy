import {
    Accordion as MuiAccordion,
    AccordionDetails, AccordionProps, AccordionSummary as MuiAccordionSummary,
    AccordionSummaryProps,
    Stack,
    styled,
    Typography
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React from "react";
import {DataTable} from "./data/DataTable";
import {CalculationValue} from "../schema/calculation";

const Accordion = styled((props: AccordionProps) => (
    <MuiAccordion disableGutters square {...props} />
))(({theme}) => ({

}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
    <MuiAccordionSummary
        expandIcon={<ExpandMoreIcon/>}
        {...props}
    />
))(({theme}) => ({
    '&.Mui-expanded': {
        minHeight: 0,
    }
}));


const MetricGroupPanel = ({title, subtitle, data}: {
    title: string,
    subtitle?: React.ReactNode,
    data: CalculationValue[]
}) => {
    return (
        <Accordion>
            <AccordionSummary>
                <Stack flexDirection="row" flex={1} sx={{pr: 4}}>
                    <Typography flex={2}>{title}</Typography>
                    {subtitle && <Typography flex={1} component="div" fontWeight={'bold'}>{subtitle}</Typography>}
                </Stack>
            </AccordionSummary>
            <AccordionDetails sx={{pl: 0, pr: 0, pt: 0, pb: 0}}>
                <DataTable data={data}/>
            </AccordionDetails>
        </Accordion>
    )
}

export default MetricGroupPanel;