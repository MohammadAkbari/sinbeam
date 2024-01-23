import Link from "../models/link";

export default class RestraintDto {

    constructor() {
        this.topFlangeRestraints = [] as number[];
        this.bottomFlangeRestraints = [] as number[];
    }

    topFlangeRestraints: Array<number> = [];
    bottomFlangeRestraints: Array<number> = [];

    fullRestraintTopFlange: boolean;
    fullRestraintBottomFlange: boolean;

    _links: Array<Link>;
}