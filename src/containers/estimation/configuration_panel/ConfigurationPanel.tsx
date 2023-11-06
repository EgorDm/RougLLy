import {
    Accordion as MuiAccordion,
    AccordionDetails, AccordionProps, AccordionSummary as MuiAccordionSummary, AccordionSummaryProps,
    Autocomplete,
    Box, Checkbox,
    Container,
    FormControl, FormControlLabel, InputAdornment, InputLabel, MenuItem, Select,
    Slider,
    Stack, styled,
    TextField,
    Typography
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React from "react";
import {ModelSelection} from "./ModelSelection";
import {InstanceSelection} from "./InstanceSelection";
import AdvancedPanel from "./AdvancedPanel";


function ConfigurationPanel() {
    return (
        <Stack>
            <Container maxWidth="sm">
                <Box alignItems="center">
                    <ModelSelection/>
                </Box>
                <Box sx={{pt: 2}} alignItems="center">
                    <InstanceSelection/>
                </Box>
            </Container>
            <Container maxWidth="sm" sx={{pt: 2}}>
                <AdvancedPanel/>
            </Container>
        </Stack>
    )
}

export default ConfigurationPanel;