import BaseModel from "./baseModel";

export default class CharacteristicPointLoadDto extends BaseModel {
    position: number;
    permanentAction: number;
    variableAction: number;
}