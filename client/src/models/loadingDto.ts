import type { LoadType } from "@/enums/loadType";
import type Link from "./link";
import type LoadParameters from "./loadParameters";
import type UltimatePointLoadDto from "./ultimatePointLoadDto";
import type CharacteristicPointLoadDto from "./characteristicPointLoadDto";

export default class LoadingDto {

    constructor() {
        this.permanentLoads = {} as LoadParameters;
        this.variableLoads = {} as LoadParameters;
        this.ultimateLoads = {} as LoadParameters;
        this.ultimatePointLoads = [] as UltimatePointLoadDto[];
        this.characteristicPointLoads = [] as CharacteristicPointLoadDto[];
    }

    span :number
    selfWeight: number;
    loadType: LoadType;

    permanentLoads: LoadParameters;
    variableLoads: LoadParameters;
    ultimateLoads: LoadParameters;
    ultimatePointLoads: UltimatePointLoadDto[];
    characteristicPointLoads: CharacteristicPointLoadDto[];
    _links: Link[];


    /////////////////////
    fullRestraintTopFlange: boolean = false;
    topFlangeRestraints: Array<number> = [];

    fullRestraintBottomFlange: boolean = false;
    bottomFlangeRestraints: Array<number> = [];
}