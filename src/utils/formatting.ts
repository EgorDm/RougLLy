export function formatScaleUnitNumber(
    value: number,
    decimals: number = 2,
    k: number = 1000,
    scales: string[] = ['','K','M','B','T','Q'],
): string {
    if (!+value) return `0 ${scales[0]}`

    const dm = decimals < 0 ? 0 : decimals

    const i = Math.floor(Math.log(value) / Math.log(k))

    console.log(value, parseFloat((value / Math.pow(k, i)).toFixed(dm)))
    return `${(value / Math.pow(k, i)).toFixed(dm)} ${scales[i]}`
}

const BYTES_SCALES = ['bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];

export function formatBytes(bytes: number, decimals: number = 2): string {
    return formatScaleUnitNumber(bytes, decimals, 1000, BYTES_SCALES)
}

const FLOPS_SCALES = ['FLOPS', 'kFLOPS', 'MFLOPS', 'GFLOPS', 'TFLOPS', 'PFLOPS', 'EFLOPS', 'ZFLOPS', 'YFLOPS'];

export function formatFlops(bytes: number, decimals: number = 2): string {
    return formatScaleUnitNumber(bytes, decimals, 1000, FLOPS_SCALES)
}

export function formatDuration(duration: number): string {
    return duration.toFixed(2)
}