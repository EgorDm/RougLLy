import * as React from 'react';
import {useEntitiesContext} from "../providers/EntitiesProvider";
import {Stack, Typography} from "@mui/material";
import {
    GridActionsCellItem,
    GridColDef, GridRowParams,
    GridValidRowModel,
} from '@mui/x-data-grid';
import EditTable from "../components/data/EditTable";
import {NEW_CONFIGURATION} from "../constants";
import ReceiptIcon from '@mui/icons-material/Receipt';
import {useNavigate} from "react-router-dom";

const COLUMNS: GridColDef[] = [
    {
        field: 'name', headerName: 'Name', width: 240, editable: true,
    },
    {field: 'size', headerName: '# Parameters', flex: 1, editable: true},
    {
        field: 'maxSeqLength', headerName: 'Seq Length', flex: 1, editable: true,
    },
    {
        field: 'inputPrice', headerName: 'Input price/1K tokens', flex: 1, editable: true,
        valueFormatter: (params) => `$${(params.value as number).toFixed(5)}`
    },
    {
        field: 'outputPrice', headerName: 'Output price/1K tokens', flex: 1, editable: true,
        valueFormatter: (params) => `$${(params.value as number).toFixed(5)}`
    },
]


function ComparisonPage() {
    const {configurations, setConfigurations} = useEntitiesContext();
    const navigate = useNavigate()

    const onOpenEstimator = (params: GridRowParams) => {
        navigate('/estimation', {state: {params: params.row.params}})
    }

    const customActions = (params: GridRowParams & { isInEditMode: boolean}) => {
        if (params.row.locked || !params.isInEditMode) {
            return []
        }

        return [
            <GridActionsCellItem
                icon={<ReceiptIcon/>}
                label="View in Estimator"
                onClick={() => onOpenEstimator(params)}
            />,
        ]
    }

    return (
        <Stack flexDirection="column" sx={{flex: 1}}>
            <Stack sx={{pl: 2, pr: 2}}>
                <Typography variant="h6">Configurations</Typography>
                <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                    Configurations are the combination of a model and an instance.<br/>
                    They are used to determine the cost of running a model on an instance.
                </Typography>
            </Stack>
            <EditTable
                rows={configurations}
                setRows={setConfigurations as (rows: GridValidRowModel[]) => void}
                columns={COLUMNS}
                modelName="Configuration"
                newRow={NEW_CONFIGURATION}
                customActionsDef={customActions}
            />
        </Stack>
    );
}

export default ComparisonPage;