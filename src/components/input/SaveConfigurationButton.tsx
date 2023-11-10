import {Alert, Button, IconButton, Snackbar} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import React, {useCallback} from "react";
import {useEntitiesContext} from "../../providers/EntitiesProvider";
import {useEstimationContext} from "../../providers/EstimationProvider";
import {formatScaleUnitNumber} from "../../utils/formatting";
import {useNavigate} from "react-router-dom";


function SaveConfigurationButton() {
    const {params, calculation} = useEstimationContext();
    const {setConfigurations, configurations} = useEntitiesContext();

    const [open, setOpen] = React.useState(false);

    const navigate = useNavigate();

    const handleClose = useCallback((event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    }, []);

    const onClick = useCallback(() => {
        const nextId = Math.max(...configurations.map((row) => row.id ?? 0)) + 1;

        setConfigurations([
            ...configurations,
            {
                id: nextId,
                params,

                vendor: `${params.instance.name} with ${params.model.family}`,
                model: `${params.model.name} on ${params.instance.name}`,

                size: formatScaleUnitNumber(params.model.parameterCount),
                maxSeqLength: params.model.maxSeqLength,

                inputPrice: calculation.processing.costPer1KTokens,
                outputPrice: calculation.generation.costPer1KTokens,

                locked: false,
            }
        ])

        setOpen(true);
    }, [configurations, params, calculation]);

    const openComparison = useCallback(() => {
        navigate('/comparison')
    }, []);


    return (
        <>
            <IconButton aria-label="save" color="primary" onClick={onClick}>
                <SaveIcon/>
            </IconButton>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert
                    onClose={handleClose}
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
        </>
    )
}

export default SaveConfigurationButton;