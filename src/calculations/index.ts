import {CalculationFn} from "../schema/calculation";
import {calculateLLaMA} from "./llama";


const CALCULATION_LOOKUP: Record<string, CalculationFn> = {
    'LLaMA 2': calculateLLaMA,
    'Mistral': calculateLLaMA,
}

export default CALCULATION_LOOKUP;