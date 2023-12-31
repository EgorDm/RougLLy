import React from "react";
import {useEstimationContext} from "../../../providers/EstimationProvider";
import {Instance} from "../../../schema/components";
import {CalculationValue} from "../../../schema/calculation";
import MetricGroupPanel from "../../../components/MetricGroupPanel";

function createCalculatedValues(instance: Instance): CalculationValue[] {
    return [
        {
            value: `${instance.gpu.vendor} ${instance.gpu.model}`,
            display: {
                label: 'GPU Name',
                info: 'The name of the GPU.',
            }
        },
        {
            value: instance.gpuCount,
            display: {
                label: 'Number of GPUs',
            }
        },
        {
            value: {
                value: instance.pricePerHour,
                unit: 'dollar',
                precision: 5,
            },
            display: {
                label: 'Price per Hour',
                info: 'How much it costs to rent the instance for an hour.',
            }
        },
        {
            value: {
                value: instance.pricePerHour / 3600,
                unit: 'dollar',
                precision: 5,
            },
            display: {
                label: 'Price per Second',
                info: 'How much it costs to rent the instance for a second.',
            }
        },
    ]
}


export const InstanceDetails = () => {
    const {params: {instance}} = useEstimationContext();

    const calculatedValues = createCalculatedValues(instance);

    return (
        <MetricGroupPanel
            title={'Instance Details'}
            subtitle={`${instance.provider} ${instance.name}`}
            data={calculatedValues}
        />
    )
}