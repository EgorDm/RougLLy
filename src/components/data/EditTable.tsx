import {alpha, Button, Stack, styled, Typography} from "@mui/material";
import {
    DataGrid, GridActionsCellItem,
    gridClasses, GridColDef,
    GridEventListener, GridRowEditStopReasons, GridRowId,
    GridRowModel, GridRowModes, GridRowModesModel,
    GridRowsProp, GridToolbarContainer,
    GridValidRowModel
} from "@mui/x-data-grid";
import * as React from "react";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";

const StripedDataGrid = styled(DataGrid)(({theme}) => ({
    flexGrow: 1,
    borderRadius: 0,
    border: 0,
    [`& .${gridClasses.row}.even`]: {
        backgroundColor: alpha(theme.palette.grey[800], 0.2),
        '&:hover, &.Mui-hovered': {
            backgroundColor: alpha(theme.palette.grey[800], 0.6),
        }
    }
}));

interface EditTableProps {
    setRows: (rows: GridValidRowModel[]) => void
    rows: GridRowsProp,
    columns: GridColDef[],
    modelName?: string,
    newRow?: GridRowModel,
}

function EditTable(
    {setRows, rows, columns: dataColumns, modelName, newRow}: EditTableProps
) {
    const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});

    const actionsColumn: GridColDef = {
        field: 'actions',
        type: 'actions',
        headerName: 'Actions',
        width: 100,
        cellClassName: 'actions',
        getActions: ({id}) => {
            const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

            const editRow = rows.find((row) => row.id === id);

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

    const columns = [...dataColumns, actionsColumn];

    const handleRowEditStop: GridEventListener<'rowEditStop'> = (
        params, event
    ) => {
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
        setRows(rows.filter((row) => row.id !== id));
    };

    const handleCancelClick = (id: GridRowId) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: {mode: GridRowModes.View, ignoreModifications: true},
        });

        const editedRow = rows.find((row) => row.id === id);
        if (editedRow!.isNew) {
            setRows(rows.filter((row) => row.id !== id));
        }
    }

    const processRowUpdate = (newRow: GridRowModel) => {
        const updatedRow = {...newRow, isNew: false};
        setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
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
        <StripedDataGrid
            rows={rows}
            columns={columns}
            editMode="row"
            rowModesModel={rowModesModel}
            onRowModesModelChange={handleRowModesModelChange}
            onRowEditStart={handleRowEditStart}
            onRowEditStop={handleRowEditStop}
            processRowUpdate={processRowUpdate}
            getRowId={(row) => row.id}
            getRowClassName={(params) =>
                params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
            }
            slots={{
                toolbar: EditToolbar,
            }}
            slotProps={{
                toolbar: {
                    rows, setRows, setRowModesModel,
                    modelName: modelName ?? 'Row',
                    newRow,
                },
            }}
            rowCount={rows.length}
        />
    )
}

interface EditToolbarProps {
    modelName: string;
    rows: GridRowsProp;
    setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
    setRowModesModel: (
        newModel: (oldModel: GridRowModesModel) => GridRowModesModel,
    ) => void;
    newRow?: GridRowModel;
}


function EditToolbar(props: EditToolbarProps) {
    const {setRows, rows, newRow, setRowModesModel} = props;

    const handleClick = () => {
        const id = Math.max(...rows.map((row: any) => row.id)) + 1;
        setRows((oldRows) => [...oldRows, {id, ...newRow, isNew: true}]);
        setRowModesModel((oldModel) => ({
            ...oldModel,
            [id]: {mode: GridRowModes.Edit, fieldToFocus: 'name'},
        }));
    };

    return (
        <GridToolbarContainer>
            <Stack sx={{flexGrow: 1}}/>
            <Button color="primary" startIcon={<AddIcon/>} onClick={handleClick}>
                Add {props.modelName}
            </Button>
        </GridToolbarContainer>
    );
}


export default EditTable;