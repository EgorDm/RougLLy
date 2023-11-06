import {AppBar, Container, Tab, Tabs} from "@mui/material";
import {Link, matchPath, useLocation} from "react-router-dom";
import React from "react";

function useRouteMatch(patterns: readonly string[]) {
    const {pathname} = useLocation();

    for (let i = 0; i < patterns.length; i += 1) {
        const pattern = patterns[i];
        const possibleMatch = matchPath(pattern, pathname);
        if (possibleMatch !== null) {
            return possibleMatch;
        }
    }

    return null;
}


function Navigation() {
    const routeMatch = useRouteMatch([
        '/estimation', '/models', '/instances', '/gpus', '/comparison'
    ]);
    const currentTab = routeMatch?.pattern?.path ?? '/estimation';

    return (
        <Container maxWidth="md" sx={{position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1000, pl: 0, pr: 0}}>
            <AppBar position="static">
                <Tabs
                    indicatorColor="secondary"
                    textColor="inherit"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                    value={currentTab}
                >
                    <Tab label="Estimation" value="/estimation" to="/estimation" component={Link}/>
                    <Tab label="Models" value="/models" to="/models" component={Link}/>
                    <Tab label="Instances" value="/instances" to="/instances" component={Link}/>
                    <Tab label="GPUs" value="/gpus" to="/gpus" component={Link}/>
                    <Tab label="Comparison" value="/comparison" to="/comparison" component={Link}/>
                </Tabs>
            </AppBar>
        </Container>
    )
}


export default Navigation;