import type Point from "./point";

export default class Deflection {
    sheer: Point[];
    bending: Point[];
    total: Point[];
    maMaxDeflnShear: number;
}