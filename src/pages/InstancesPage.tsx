import {useEntitiesContext} from "../providers/EntitiesProvider";
import {Stack, Typography} from "@mui/material";
import EditTable from "../components/data/EditTable";
import {
    GridColDef,
    GridValidRowModel
} from "@mui/x-data-grid";
import * as React from "react";
import {GridEditSingleSelectCell} from "../components/input/GridEditSingleSelectCell";
import {NEW_INSTANCE} from "../constants";


function InstancesPage() {
    const {instances, gpus, setInstances} = useEntitiesContext();

    const COLUMNS: GridColDef[] = [
        {
            field: 'provider', headerName: 'Provider', width: 120, editable: true,
        },
        {field: 'name', headerName: 'Name', width: 120, editable: true},
        {
            field: 'gpu', headerName: 'GPU', flex: 1, minWidth: 180, editable: true, type: 'singleSelect',
            valueOptions: gpus,
            getOptionLabel: (option: any) => `${option.vendor} ${option.model}`,
            getOptionValue: (option: any) => `${option.vendor}/${option.model}`,
            renderEditCell: (params) => <GridEditSingleSelectCell
                remapValues={Object.fromEntries(
                    gpus.map((gpu) => [`${gpu.vendor}/${gpu.model}`, gpu])
                )}
                {...params}
            />,
            valueFormatter: (params) => `${params.value?.vendor} ${params.value?.model}`
        },
        {
            field: 'gpuCount', headerName: '# GPUs', flex: 1, editable: true,
        },
        {
            field: 'pricePerHour', headerName: 'Price per hour', flex: 1, editable: true,
            valueFormatter: (params) => `$${(params.value as number).toFixed(2)}`
        },
    ]


    return (
        <Stack flexDirection="column" sx={{flex: 1}}>
            <Stack sx={{pl: 2, pr: 2}}>
                <Typography variant="h6">Instances</Typography>
                <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                    Update the list of models used for cost estimation.<br/>
                    The family is used to determine the type of model and it's calculation structure.
                </Typography>
            </Stack>
            <EditTable
                rows={instances}
                setRows={setInstances as (rows: GridValidRowModel[]) => void}
                columns={COLUMNS}
                modelName="Instance"
                newRow={NEW_INSTANCE}
            />
        </Stack>
    );
}

export default InstancesPage;