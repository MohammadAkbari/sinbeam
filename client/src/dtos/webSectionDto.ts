import SectionDesign from "../models/sectionDesign";
import type Link from "../models/link";

export default class WebSectionDto  {
    id: string;

    webDepth:number;
    webThickness:number;
    webSteel:string;

    topFlangeThickness:number;
    topFlangeWidth:number;
    topFlangeSteel:string;

    bottomFlangeThickness:number;
    bottomFlangeWidth:number;
    bottomFlangeSteel:string;

    design:SectionDesign;
    properties:Array<string>=[];

    _links:Array<Link>

}