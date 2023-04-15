import type { LoadType } from "@/enums/loadType";
import type Link from "./link";
import type LoadParameters from "./loadParameters";
import type UltimatePointLoadDto from "./ultimatePointLoadDto";
import type CharacteristicPointLoadDto from "./characteristicPointLoadDto";

export default class LoadingDto {
    selfWeight: number;
    loadType: LoadType;

    permanentLoads: LoadParameters;
    variableLoads: LoadParameters;
    ultimateLoads: LoadParameters;
    ultimatePointLoads: UltimatePointLoadDto[];
    CharacteristicPointLoads:CharacteristicPointLoadDto[];
    _links: Link[];
}