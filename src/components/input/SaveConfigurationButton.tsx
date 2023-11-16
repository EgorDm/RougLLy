import {
    Alert,
    Box,
    Button,
    Card,
    CardActions,
    Dialog, DialogActions, DialogContent,
    DialogTitle,
    IconButton,
    Modal,
    Snackbar, TextField,
    Typography
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import React, {useCallback} from "react";
import {useEntitiesContext} from "../../providers/EntitiesProvider";
import {useEstimationContext} from "../../providers/EstimationProvider";
import {formatScaleUnitNumber} from "../../utils/formatting";
import {useNavigate} from "react-router-dom";


function SaveConfigurationButton() {
    const {params, calculation} = useEstimationContext();
    const {setConfigurations, configurations} = useEntitiesContext();

    const [snackbarOpen, setSnackbarOpen] = React.useState(false);
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [name, setName] = React.useState('');

    const navigate = useNavigate();

    const handleSnackbarClose = useCallback((event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackbarOpen(false);
    }, []);

    const handleDialogClose = useCallback(() => {
        setDialogOpen(false);
    }, []);

    const handleSave = useCallback(() => {
        const nextId = Math.max(...configurations.map((row) => row.id ?? 0)) + 1;

        setConfigurations([
            ...configurations,
            {
                id: nextId,
                params,

                name,

                size: formatScaleUnitNumber(params.model.parameterCount),
                maxSeqLength: params.model.maxSeqLength,

                inputPrice: calculation.processing.costPer1KTokens,
                outputPrice: calculation.generation.costPer1KTokens,

                locked: false,
            }
        ])

        setSnackbarOpen(true);
        setDialogOpen(false);
    }, [configurations, params, calculation, name])

    const onClick = useCallback(() => {
        setName(`${params.model.name} on ${params.instance.name}`)
        setDialogOpen(true)
    }, [configurations, params, calculation]);

    const openComparison = useCallback(() => {
        navigate('/comparison')
    }, []);


    return (
        <>
            <IconButton aria-label="save" color="default" onClick={onClick}>
                <SaveIcon/>
            </IconButton>
            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
                <Alert
                    onClose={handleSnackbarClose}
                    severity="success" sx={{width: '100%'}}
                    action={
                        <Button color="secondary" size="small" onClick={openComparison}>
                            Open in Comparison
                        </Button>
                    }
                >
                    We have saved your configuration!
                </Alert>
            </Snackbar>
            <Dialog
                open={dialogOpen}
                onClose={handleDialogClose}
            >
                <DialogTitle>Give your configuration a name</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Name"
                        type="name"
                        fullWidth
                        variant="standard"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose}>Cancel</Button>
                    <Button onClick={handleSave} color="success">Save</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default SaveConfigurationButton;