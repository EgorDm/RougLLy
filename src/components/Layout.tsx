import {Box, Container, Divider, Paper, Stack, Typography} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import {Outlet} from "react-router-dom";
import React from "react";
import Navigation from "./Navigation";


function Layout() {
    return (
        <Container maxWidth="md" sx={{height: '100%', paddingBottom: 6, pl: 0, pr: 0}} fixed>
            <Paper sx={{height: '100%', overflow: 'auto'}} elevation={2} square>
                <Stack sx={{minHeight: '100%'}}>
                    <Grid xs="auto">
                        <Box alignContent="center" sx={{pt: 2}}>
                            <Typography variant="h5" component="div" gutterBottom textAlign="center">
                                RoughLLy
                            </Typography>
                            <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom textAlign="center">
                                Quick and Realistic Cost Estimation for LLMs
                            </Typography>
                            <Divider sx={{mt: 2, mb: 2}}/>
                        </Box>
                    </Grid>
                    <Outlet/>
                </Stack>
            </Paper>
            <Navigation/>
        </Container>
    )
}

export default Layout;
