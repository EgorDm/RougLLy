import React from "react";
import {useEstimationContext} from "../../../providers/EstimationProvider";
import {Gpu} from "../../../schema/components";
import {CalculationValue} from "../../../schema/calculation";
import MetricGroupPanel from "../../../components/MetricGroupPanel";

function createModelCalculatedValues(gpu: Gpu): CalculationValue[] {
    return [
        {
            value: {
                value: gpu.memory,
                unit: 'bytes'
            },
            display: {
                label: 'GPU Memory',
                info: 'The amount of memory on the GPU.',
            }
        },
        {
            value: {
                value: gpu.fp16MatmulFlops,
                unit: 'flops'
            },
            display: {
                label: 'GPU FLOPS (fp16 matmul)',
                info: 'The number of floating point operations per second that the GPU can perform.',
            }
        },
        {
            value: {
                value: gpu.memoryBandwidth,
                unit: 'bytes'
            },
            display: {
                label: 'GPU Memory Bandwidth',
                info: 'The amount of memory bandwidth on the GPU.',
            }
        },
    ]
}


export const GpuDetails = () => {
    const {params: {instance: {gpu}}} = useEstimationContext();

    const calculatedValues = createModelCalculatedValues(gpu);

    return (
        <MetricGroupPanel
            title={'GPU Details'}
            subtitle={`${gpu.vendor} ${gpu.model}`}
            data={calculatedValues}
        />
    )
}