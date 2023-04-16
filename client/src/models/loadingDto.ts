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
        this.CharacteristicPointLoads = [] as CharacteristicPointLoadDto[];
    }

    span :number
    selfWeight: number;
    loadType: LoadType;

    permanentLoads: LoadParameters;
    variableLoads: LoadParameters;
    ultimateLoads: LoadParameters;
    ultimatePointLoads: UltimatePointLoadDto[];
    CharacteristicPointLoads: CharacteristicPointLoadDto[];
    _links: Link[];
}