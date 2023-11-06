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
import ConfigurationPanel from "./containers/estimation/configuration_panel/ConfigurationPanel";
import DetailsPanel from "./containers/estimation/details_panel/DetailsPanel";
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
import Layout from "./components/Layout";
import {EntitiesProvider} from "./providers/EntitiesProvider";


function Router(props: { children?: React.ReactNode }) {
    const {children} = props;
    if (typeof window === 'undefined') {
        return <StaticRouter location="/">{children}</StaticRouter>
    } else {
        return <BrowserRouter>{children}</BrowserRouter>
    }
}

function App() {
    return (

        <Router>
            <EntitiesProvider>
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
            </EntitiesProvider>
        </Router>
    )
}


export default App;
