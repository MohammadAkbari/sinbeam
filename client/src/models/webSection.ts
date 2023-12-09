import type Link from "./link";


export default class WebSection  {
    id: string;
    key: string;
    weight: number;
    webHeight: number;
    webThickness: number;
    webThicknessKey: string;
    flangeWidth: number;
    flangeThickness: number;
    sectionPerimeter: number;
    surfaceAreaPerM: number;
    momentOfInertiaIy: number;
    momentOfInertiaIz: number;
    bendingCapacity: number;
    shearCapacity: number;
    axialCapacity: number;
    z: number;
    iw: number;
    It: number;
    _links:Array<Link>
}

