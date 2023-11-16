import React from "react";
import {ModelDetails} from "./ModelDetails";
import {InstanceDetails} from "./InstanceDetails";
import {GpuDetails} from "./GpuDetails";
import {useEstimationContext} from "../../../providers/EstimationProvider";
import MetricGroupPanel from "../../../components/MetricGroupPanel";


function DetailsPanel() {
    const {calculation: {groups}} = useEstimationContext();

    const groupViews = groups.map((group, index) => (
        <MetricGroupPanel
            key={index}
            title={group.name}
            subtitle={group.subtitle}
            data={group.calculations}
        />
    ));


    return (
        <React.Fragment>
            <ModelDetails/>
            <InstanceDetails/>
            <GpuDetails/>
            {groupViews}
        </React.Fragment>
    )

}


export default DetailsPanel;
