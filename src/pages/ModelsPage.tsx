import * as React from 'react';
import {useEntitiesContext} from "../providers/EntitiesProvider";
import {alpha, Button, darken, Stack, styled, Typography} from "@mui/material";
import {
    GridRowsProp,
    GridRowModesModel,
    GridRowModes,
    DataGrid,
    GridColDef,
    GridToolbarContainer,
    GridActionsCellItem,
    GridEventListener,
    GridRowId,
    GridRowModel,
    GridRowEditStopReasons,
    gridClasses,
    GridValidRowModel,
} from '@mui/x-data-grid';
import {Model} from "../schema/components";
import {formatBytes, formatScaleUnitNumber} from "../utils/formatting";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import CALCULATION_LOOKUP from "../calculations";

const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
    [`& .${gridClasses.row}.even`]: {
        backgroundColor: alpha(theme.palette.grey[800], 0.2),
        '&:hover, &.Mui-hovered': {
            backgroundColor: alpha(theme.palette.grey[800], 0.6),
        }
    }
}));

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

interface EditToolbarProps {
    modelName: string;
    setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
    setRowModesModel: (
        newModel: (oldModel: GridRowModesModel) => GridRowModesModel,
    ) => void;
}



function EditToolbar(props: EditToolbarProps) {
    const { setRows, setRowModesModel } = props;

    const handleClick = () => {
        const id = '';
        setRows((oldRows) => [...oldRows, { id, name: '', age: '', isNew: true }]);
        setRowModesModel((oldModel) => ({
            ...oldModel,
            [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
        }));
    };

    return (
        <GridToolbarContainer>
            <Stack sx={{flexGrow: 1}}/>
            <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
                Add {props.modelName}
            </Button>
        </GridToolbarContainer>
    );
}



function ModelsPage() {
    const {models, setModels} = useEntitiesContext();
    const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});

    const setRows = setModels as (rows: GridValidRowModel[]) => void;
    const rows: GridRowsProp = models;

    console.log(rowModesModel)

    const actionsColumn: GridColDef = {
        field: 'actions',
        type: 'actions',
        headerName: 'Actions',
        width: 100,
        cellClassName: 'actions',
        getActions: ({id}) => {
            const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

            const editRow = rows.find((row) => getRowId(row) === id);

            if (isInEditMode) {
                return [
                    <GridActionsCellItem
                        icon={<SaveIcon/>}
                        label="Save"
                        sx={{color: 'primary.main'}}
                        onClick={handleSaveClick(id)}
                    />,
                    <GridActionsCellItem
                        icon={<CancelIcon/>}
                        label="Cancel"
                        className="textPrimary"
                        onClick={handleCancelClick(id)}
                        color="inherit"
                    />,
                ];
            }

            return [
                <GridActionsCellItem
                    icon={<EditIcon/>}
                    label="Edit"
                    className="textPrimary"
                    onClick={handleEditClick(id)}
                    color="inherit"
                    disabled={editRow?.locked ?? false}
                />,
                <GridActionsCellItem
                    icon={<DeleteIcon/>}
                    label="Delete"
                    onClick={handleDeleteClick(id)}
                    color="inherit"
                    disabled={editRow?.locked ?? false}
                />,
            ];
        }
    }

    const columns = [...COLUMNS, actionsColumn];

    const getRowId = (row: GridRowModel) => `${row.family}/${row.name}`;

    const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };

    const handleEditClick = (id: GridRowId) => () => {
        setRowModesModel({...rowModesModel, [id]: {mode: GridRowModes.Edit}});
    };

    const handleSaveClick = (id: GridRowId) => () => {
        setRowModesModel({...rowModesModel, [id]: {mode: GridRowModes.View}});
    };

    const handleDeleteClick = (id: GridRowId) => () => {
        setRows(models.filter((row) => getRowId(row) !== id));
    };

    const handleCancelClick = (id: GridRowId) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: {mode: GridRowModes.View, ignoreModifications: true},
        });

        const editedRow = rows.find((row) => getRowId(row) === id);
        if (editedRow!.isNew) {
            setRows(rows.filter((row) => getRowId(row) !== id));
        }
    }

    const processRowUpdate = (newRow: GridRowModel) => {
        const updatedRow = {...newRow, isNew: false};
        setRows(rows.map((row) => (getRowId(row) === getRowId(newRow) ? updatedRow : row)));
        return updatedRow;
    }

    const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
        setRowModesModel(newRowModesModel);
    }

    const handleRowEditStart: GridEventListener<'rowEditStart'> = (params, event) => {
        if (params.row?.locked) {
            event.defaultMuiPrevented = true;
        }
    }

    return (
        <Stack flexDirection="column" sx={{flex: 1}}>
            <Stack sx={{pl: 2, pr: 2}}>
                <Typography variant="h6">Models</Typography>
                <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                    Update the list of models used for cost estimation.<br/>
                    The family is used to determine the type of model and it's calculation structure.
                </Typography>
            </Stack>
            <StripedDataGrid
                sx={{
                    flexGrow: 1,
                    borderRadius: 0,
                    border: 0,
                }}
                rows={rows}
                columns={columns}
                editMode="row"
                rowModesModel={rowModesModel}
                onRowModesModelChange={handleRowModesModelChange}
                onRowEditStart={handleRowEditStart}
                onRowEditStop={handleRowEditStop}
                processRowUpdate={processRowUpdate}
                getRowId={getRowId}
                getRowClassName={(params) =>
                    params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
                }
                slots={{
                    toolbar: EditToolbar,
                }}
                slotProps={{
                    toolbar: {setRows, setRowModesModel, modelName: 'Model'},
                }}
            />
        </Stack>
    );
}

export default ModelsPage;