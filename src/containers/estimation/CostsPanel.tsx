import React from "react";
import {Box, Typography} from "@mui/material";
import {useEstimationContext} from "../../providers/EstimationProvider";
import MetricGroupPanel from "../../components/MetricGroupPanel";
import FormattedValue from "../../components/FormattedValue";


function CostsPanel() {
    const {calculation: {processing, generation}} = useEstimationContext();

    return (
        <React.Fragment>
            <MetricGroupPanel
                title="Input Cost"
                subtitle={
                    <Box>
                        <Typography sx={{ color: 'text.secondary' }} display="inline">
                            <FormattedValue value={{value: processing.costPer1KTokens, unit: 'dollar', precision: 5}} />
                        </Typography>
                        {' '}
                        <Typography sx={{ color: 'text.secondary' }} display="inline" variant="caption">
                            /1k Tokens
                        </Typography>
                    </Box>
                }
                data={processing.calculations}
            />
            <MetricGroupPanel
                title="Output Cost"
                subtitle={
                    <Box>
                        <Typography sx={{ color: 'text.secondary' }} display="inline">
                            <FormattedValue value={{value: generation.costPer1KTokens, unit: 'dollar', precision: 5}} />
                        </Typography>
                        {' '}
                        <Typography sx={{ color: 'text.secondary' }} display="inline" variant="caption">
                            /1k Tokens
                        </Typography>
                    </Box>
                }
                data={generation.calculations}
            />
        </React.Fragment>
    )
}

export default CostsPanel;