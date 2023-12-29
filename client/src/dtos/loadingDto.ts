import LoadParameters from "../models/permanentLoads";
import Link from "../models/link";
import { LoadType } from "../enums/loadType";
import UltimatePointLoadDto from "./ultimatePointLoadDto";
import CharacteristicPointLoadDto from "./characteristicPointLoadDto";


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
    permanentLoads = {} as LoadParameters;
    variableLoads = {} as LoadParameters;
    ultimateLoads = {} as LoadParameters;


    ultimatePointLoads: Array<UltimatePointLoadDto>
    characteristicPointLoads: Array<CharacteristicPointLoadDto>

    _links: Array<Link>


    //////

    span :number
}