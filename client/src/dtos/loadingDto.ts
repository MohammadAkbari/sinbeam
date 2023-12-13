import  LoadParameters  from "../models/permanentLoads";
import  Link  from "../models/link";
import { LoadType } from "../enums/loadType";
import UltimatePointLoadDto from "./ultimatePointLoadDto";
import CharacteristicPointLoadDto from "./characteristicPointLoadDto";


export default class LoadingDto  {
    selfWeight: number;

    loadType:LoadType;
    permanentLoads:LoadParameters;
    variableLoads:LoadParameters;
    ultimateLoads:LoadParameters;
    

    ultimatePointLoads:Array<UltimatePointLoadDto>
    characteristicPointLoads:Array<CharacteristicPointLoadDto>
    
    _links:Array<Link>
}