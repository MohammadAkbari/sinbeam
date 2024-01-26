import type LoadParameters from "../models/permanentLoads";
import type Link from "../models/link";
import type { LoadType } from "../enums/loadType";
import type { CombinationType } from "../enums/combinationType";
import type UltimatePointLoadDto from "./ultimatePointLoadDto";
import type CharacteristicPointLoadDto from "./characteristicPointLoadDto";
import { DesignType } from "../enums/designType";


export default class LoadingDto {

    constructor() {
        this.permanentLoads = {} as LoadParameters;
        this.variableLoads = {} as LoadParameters;
        this.ultimateLoads = {} as LoadParameters;
        this.ultimatePointLoads = [] as UltimatePointLoadDto[];
        this.characteristicPointLoads = [] as CharacteristicPointLoadDto[];
    }

    selfWeight: number;

    loadType: LoadType;
    designType: DesignType;
    permanentLoads = {} as LoadParameters;
    variableLoads = {} as LoadParameters;
    ultimateLoads = {} as LoadParameters;


    ultimatePointLoads: Array<UltimatePointLoadDto>
    characteristicPointLoads: Array<CharacteristicPointLoadDto>
    span: number


    combinationType: CombinationType;

    _links: Array<Link>;
}