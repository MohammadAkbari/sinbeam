import Link from "../models/link";
import { CombinationType } from '@/enums/combinationType';

export default class RestraintDto {

    constructor() {
        this.topFlangeRestraints = [] as number[];
        this.bottomFlangeRestraints = [] as number[];
    }

    topFlangeRestraints: Array<number> = [];
    bottomFlangeRestraints: Array<number> = [];

    fullRestraintTopFlange: boolean;
    fullRestraintBottomFlange: boolean;

    combination: CombinationType;

    _links: Array<Link>;
}