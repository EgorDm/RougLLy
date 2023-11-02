import ConfigurationPanel from "../containers/estimation/configuration_panel/ConfigurationPanel";
import {Box, Divider, Paper, Stack} from "@mui/material";
import DetailsPanel from "../containers/estimation/details_panel/DetailsPanel";
import CostsPanel from "../containers/estimation/CostsPanel";
import React from "react";
import {EstimationProvider} from "../providers/EstimationProvider";

function EstimationPage() {
    return (
        <EstimationProvider>
            <ConfigurationPanel/>
            <Divider sx={{mt: 2, mb: 2}}/>
            <Stack flexGrow={1}>
                <DetailsPanel/>
            </Stack>
            <Paper elevation={4} square>
                <Box sx={{pt: 2, pb: 2}} alignItems="center">
                    <CostsPanel/>
                </Box>
            </Paper>
        </EstimationProvider>
    )
}

export default EstimationPage;