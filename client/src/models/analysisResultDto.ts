import type Deflection from "./Deflection";
import type Shear from "./Shear";
import type Bending from "./bending";
import Link from "./link";

export default class AnalysisResultDto  {
    bending: Bending;
    shear: Shear;
    deflection :Deflection;

    _links:Link[];
}

