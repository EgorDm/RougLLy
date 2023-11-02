import React from "react";
import {Accordion, AccordionDetails, AccordionSummary, Typography} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {ModelDetails} from "./ModelDetails";
import {InstanceDetails} from "./InstanceDetails";
import {GpuDetails} from "./GpuDetails";


function DetailsPanel() {
    return (
        <React.Fragment>
            <ModelDetails/>
            <InstanceDetails/>
            <GpuDetails/>
            <Accordion>
                <AccordionSummary aria-controls="panel1d-content" id="panel1d-header"
                                  expandIcon={<ExpandMoreIcon/>}>
                    <Typography>Memory and Compute Requirements</Typography>
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

export default DetailsPanel;