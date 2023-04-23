import type Deflection from "./Deflection";
import type Shear from "./Shear";
import type Bending from "./bending";

export default class AnalysisResultDto  {
    bending: Bending;
    shear: Shear;
    deflection :Deflection;
}

