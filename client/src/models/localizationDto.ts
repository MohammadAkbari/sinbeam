import type { DesignType } from "@/enums/designType";
import type DesignParameters from "./designParameters";
import type DeflectionLimit from "./deflectionLimit";
import type { ULSLoadExpression } from "@/enums/uLSLoadExpression";
import type Link from "./link";

export default class LocalizationDto  {


    designType: DesignType;
    uLSLoadExpression:ULSLoadExpression;


    deflectionLimit: DeflectionLimit ={} as DeflectionLimit;
    psiValue:number;

    designParameters: DesignParameters;
    defaultNA:DesignParameters;    

    _links:Link[];
}
