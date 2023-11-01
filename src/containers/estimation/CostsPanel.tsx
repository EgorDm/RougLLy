import React from "react";
import {Accordion, AccordionDetails, AccordionSummary, Box, Typography} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";


function CostsPanel() {
    return (
        <React.Fragment>
            <Accordion>
                <AccordionSummary aria-controls="panel1d-content" id="panel1d-header"
                                  expandIcon={<ExpandMoreIcon/>}>
                    <Box sx={{ width: '66%', flexShrink: 0 }}>
                        <Typography display="inline">
                            Output Cost
                        </Typography>
                    </Box>
                    <Box>
                        <Typography sx={{ color: 'text.secondary' }} display="inline">
                            $0.0015
                        </Typography>
                        {' '}
                        <Typography sx={{ color: 'text.secondary' }} display="inline" variant="caption">
                            /1k Tokens
                        </Typography>
                    </Box>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                        malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor
                        sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                        sit amet blandit leo lobortis eget.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary aria-controls="panel1d-content" id="panel1d-header"
                                  expandIcon={<ExpandMoreIcon/>}>
                    <Box sx={{ width: '66%', flexShrink: 0 }}>
                        <Typography display="inline">
                            Input Cost
                        </Typography>
                    </Box>

                    <Box>
                        <Typography sx={{ color: 'text.secondary' }} display="inline">
                            $0.002
                        </Typography>
                        {' '}
                        <Typography sx={{ color: 'text.secondary' }} display="inline" variant="caption">
                            /1k Tokens
                        </Typography>
                    </Box>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                        malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor
                        sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                        sit amet blandit leo lobortis eget.
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </React.Fragment>
    )
}

export default CostsPanel;