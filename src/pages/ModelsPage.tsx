import * as React from 'react';
import {useEntitiesContext} from "../providers/EntitiesProvider";
import {Stack, Typography} from "@mui/material";
import {
    GridColDef,
    GridValidRowModel,
} from '@mui/x-data-grid';
import {formatScaleUnitNumber} from "../utils/formatting";
import CALCULATION_LOOKUP from "../calculations";
import EditTable from "../components/data/EditTable";
import {NEW_MODEL} from "../constants";

const COLUMNS: GridColDef[] = [
    {
        field: 'family', headerName: 'Family', width: 120, editable: true,
        type: 'singleSelect',
        valueOptions: Object.keys(CALCULATION_LOOKUP),
    },
    {field: 'name', headerName: 'Name', width: 120, editable: true},
    {
        field: 'parameterCount', headerName: '# Parameters', width: 100, editable: true,
        valueFormatter: (params) => formatScaleUnitNumber(params.value as number)
    },
    {
        field: 'maxSeqLength', headerName: 'Seq Length', flex: 1, editable: true,
    },
    {
        field: 'hiddenDimSize', headerName: 'Hidden Dim Size', flex: 1, editable: true,
    },
    {
        field: 'numAttentionHeads', headerName: '# Att Heads', flex: 1, editable: true,
    },
    {
        field: 'numHiddenLayers', headerName: '# Hidden Layers', flex: 1, editable: true,
    },
    {
        field: 'numKeyValueHeads', headerName: '#KV Heads', flex: 1, editable: true,
    }
]


function ModelsPage() {
    const {models, setModels} = useEntitiesContext();

    return (
        <Stack flexDirection="column" sx={{flex: 1}}>
            <Stack sx={{pl: 2, pr: 2}}>
                <Typography variant="h6">Models</Typography>
                <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                    Update the list of models used for cost estimation.<br/>
                    The family is used to determine the type of model and it's calculation structure.
                </Typography>
            </Stack>
            <EditTable
                rows={models}
                setRows={setModels as (rows: GridValidRowModel[]) => void}
                columns={COLUMNS}
                modelName="Model"
                newRow={NEW_MODEL}
            />
        </Stack>
    );
}

export default ModelsPage;