import { ElementType } from "../enums/elementType";
import { DesignType } from "../enums/designType";
import { ULSLoadExpression } from "../enums/uLSLoadExpression";
import  DesignParameters  from "../models/designParameters";
import  DeflectionLimit  from "../models/deflectionLimit";
import { SteelType } from "../enums/steelType";


export default class OrderDto  {
    id: number;

    projectName:string;
    designer:string;
    note:string;

    elementType :ElementType;
    span:number;
    designType: DesignType;

    designParameters:DesignParameters;
    deflectionLimit:DeflectionLimit;
    ulsLoadExpression:ULSLoadExpression;

    steelType:SteelType;
}




// public int Id { get; set; }
// public string ProjectName { get; set; }
// public string Designer { get; set; }
// public string Note { get; set; }
// public ElementType ElementType { get; set; } = ElementType.Rafter;
// public double Span { get; set; }


// public DesignType DesignType { get; set; } = DesignType.UK;
// public DesignParameters DesignParameters { get; set; }
// public DeflectionLimit DeflectionLimit { get; set; }
// public ULSLoadExpression ULSLoadExpression { get; set; } = ULSLoadExpression.Expression610a;
// public SteelType SteelType { get; set; }