import React from 'react';
import {
    BrowserRouter,
    Route,
    Routes
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
        if (process.env.NODE_ENV === 'production') {
            return <BrowserRouter basename="/RougLLy">{children}</BrowserRouter>
        } else {
            return <BrowserRouter basename="/">{children}</BrowserRouter>
        }
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
