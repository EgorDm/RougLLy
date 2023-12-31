import React from "react";
import {useEntitiesContext} from "../providers/EntitiesProvider";
import {GridColDef, GridValidRowModel} from "@mui/x-data-grid";
import {Stack, Typography} from "@mui/material";
import EditTable from "../components/data/EditTable";
import {formatBytes, formatFlops} from "../utils/formatting";
import {NEW_GPU} from "../constants";

const COLUMNS: GridColDef[] = [
    {
        field: 'vendor', headerName: 'Vendor', width: 120, editable: true,
    },
    {field: 'model', headerName: 'Model', width: 120, editable: true},
    {
        field: 'memory', headerName: 'VRAM', flex: 1, editable: true,
        valueFormatter: (params) => formatBytes(params.value as number)
    },
    {
        field: 'fp16MatmulFlops', headerName: 'FP16 Matmul FLOPS', flex: 1, editable: true,
        valueFormatter: (params) => formatFlops(params.value as number)
    },
    {
        field: 'memoryBandwidth', headerName: 'Mem Bandwidth', flex: 1, editable: true,
        valueFormatter: (params) => formatBytes(params.value as number)
    },

]

function GpusPage() {
    const {gpus, setGpus} = useEntitiesContext();


    return (
        <Stack flexDirection="column" sx={{flex: 1}}>
            <Stack sx={{pl: 2, pr: 2}}>
                <Typography variant="h6">GPUs</Typography>
                <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                    GPUs specs determine if they can run a model and how fast the inference is.<br/>
                    Because generation is memory bound, the memory bandwidth is important.
                </Typography>
            </Stack>
            <EditTable
                rows={gpus}
                setRows={setGpus as (rows: GridValidRowModel[]) => void}
                columns={COLUMNS}
                modelName="GPU"
                newRow={NEW_GPU}
            />
        </Stack>
    );
}

export default GpusPage;