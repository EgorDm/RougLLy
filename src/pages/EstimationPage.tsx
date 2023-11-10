import ConfigurationPanel from "../containers/estimation/configuration_panel/ConfigurationPanel";
import {Box, Divider, IconButton, Paper, Stack} from "@mui/material";
import DetailsPanel from "../containers/estimation/details_panel/DetailsPanel";
import CostsPanel from "../containers/estimation/CostsPanel";
import React from "react";
import {EstimationProvider} from "../providers/EstimationProvider";
import Grid from '@mui/material/Unstable_Grid2';
import SaveConfigurationButton from "../components/input/SaveConfigurationButton";

function EstimationPage() {
    return (
        <EstimationProvider>
            <Grid container>
                <Grid xs={10}>
                    <ConfigurationPanel/>
                </Grid>
                <Grid xs={2}>
                    <SaveConfigurationButton/>
                </Grid>
            </Grid>
            <Divider sx={{mt: 2, mb: 2}}/>
            <Stack flexGrow={1}>
                <DetailsPanel/>
            </Stack>
            <Paper elevation={4} square>
                <Box sx={{pt: 2, pb: 0}} alignItems="center">
                    <CostsPanel/>
                </Box>
            </Paper>
        </EstimationProvider>
    )
}

export default EstimationPage;