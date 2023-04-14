import type Link from "./link";

export default class BeamDto  {
    span:number;
    isUniformDepth:boolean;
    webDepthLeft:number;

    webDepthRight:number;
    webThickness:number;
    topFlangeThickness:number;
    
    topFlangeWidth:number;
    bottomFlangeThickness:number;
    bottomFlangeWidth:number;

    _links:Link[];
}
