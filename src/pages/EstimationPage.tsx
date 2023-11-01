import ConfigurationPanel from "../containers/estimation/ConfigurationPanel";
import {Box, Divider, Paper, Stack} from "@mui/material";
import DetailsPanel from "../containers/estimation/DetailsPanel";
import CostsPanel from "../containers/estimation/CostsPanel";
import React from "react";

function EstimationPage() {
    return (
        <React.Fragment>
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
        </React.Fragment>
    )
}

export default EstimationPage;