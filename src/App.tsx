import React from 'react';
import {
    Accordion,
    AccordionDetails,
    AccordionProps, AccordionSummary,
    AccordionSummaryProps,
    AppBar,
    Autocomplete,
    Box,
    Card, Checkbox, Collapse,
    Container,
    Divider, FormControl, FormControlLabel, FormLabel, IconButton, Input, InputAdornment, InputLabel, MenuItem,
    Paper, Select, Slider, Stack,
    styled,
    Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Tabs,
    TextField,
    Typography
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Grid from "@mui/material/Unstable_Grid2";
import ConfigurationPanel from "./containers/estimation/ConfigurationPanel";
import DetailsPanel from "./containers/estimation/DetailsPanel";
import CostsPanel from "./containers/estimation/CostsPanel";
import {
    BrowserRouter,
    createBrowserRouter,
    Link,
    matchPath,
    MemoryRouter, Outlet,
    Route,
    Routes,
    useLocation
} from "react-router-dom";
import EstimationPage from "./pages/EstimationPage";
import {StaticRouter} from "react-router-dom/server";
import ModelsPage from "./pages/ModelsPage";
import InstancesPage from "./pages/InstancesPage";
import GpusPage from "./pages/GpusPage";
import ComparisonPage from "./pages/ComparisonPage";

function a11yProps(index: number) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}


function Router(props: { children?: React.ReactNode }) {
    const {children} = props;
    if (typeof window === 'undefined') {
        return <StaticRouter location="/estimation">{children}</StaticRouter>;
    }

    return (
        <BrowserRouter>{children}</BrowserRouter>
        // <MemoryRouter initialEntries={['/estimation']} initialIndex={0}>
        //     {children}
        // </MemoryRouter>
    );
}


const router = createBrowserRouter([
    {
        path: "/",
        element: <EstimationPage/>,
    },
]);


function App() {
    const [open, setOpen] = React.useState(false);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route index element={<EstimationPage/>}/>
                    <Route path="estimation" element={<EstimationPage/>}/>
                    <Route path="models" element={<ModelsPage/>}/>
                    <Route path="instances" element={<InstancesPage/>}/>
                    <Route path="gpus" element={<GpusPage/>}/>
                    <Route path="comparison" element={<ComparisonPage/>}/>
                </Route>
            </Routes>
        </Router>
    )
        ;
}

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
                                Quick and Realistic Cost EstimationPage for LLMs
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
    const currentTab = routeMatch?.pattern?.path;


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

export default App;
