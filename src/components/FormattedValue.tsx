import {formatBytes, formatDuration, formatFlops, formatScaleUnitNumber} from "../utils/formatting";
import {Value} from "../schema/calculation";


function FormattedValue({value: valueObject}: { value: Value }) {
    if (typeof valueObject === "number" || typeof valueObject === "string") {
        return <>{valueObject}</>
    }

    const {value, unit} = valueObject;

    if (unit === "bytes") {
        return <>{formatBytes(value as number)}</>
    } else if (unit === "flops") {
        return <>{formatFlops(value as number)}</>
    } else if (unit === "bignumber") {
        return <>{formatScaleUnitNumber(value as number)}</>
    } else if (unit === 'dollar') {
        return <>$ {value.toFixed(valueObject.precision ?? 2)}</>
    } else if (unit === 'seconds') {
        return <>{formatDuration(value)} s</>
    } else {
        return <>{'precision' in valueObject ? value.toFixed(valueObject.precision) : value}</>
    }
}

export default FormattedValue;