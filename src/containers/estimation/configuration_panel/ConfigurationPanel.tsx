import {
    Box, Container,
    Stack, StackProps
} from "@mui/material";
import React from "react";
import {ModelSelection} from "./ModelSelection";
import {InstanceSelection} from "./InstanceSelection";
import AdvancedPanel from "./AdvancedPanel";


function ConfigurationPanel(props: StackProps) {
    return (
        <Stack {...props}>
            <Box alignItems="center">
                <ModelSelection/>
            </Box>
            <Box sx={{pt: 2}} alignItems="center">
                <InstanceSelection/>
            </Box>
            <AdvancedPanel/>
        </Stack>
    )
}

export default ConfigurationPanel;