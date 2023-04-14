import BaseModel from "./baseModel";

export default class PointLoadDto extends BaseModel {
    position: number;
    load: number;
}