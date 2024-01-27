
import { XType } from "../enums/xType";
import { ZType } from "../enums/zType";
import { Unit } from "../enums/unit";
import { DesignType } from "../enums/designType";

export default class IranLoadingItemDto {
    row: number;

    xType: XType;
    zType: ZType;

    point: Number;
    value: Number;
    leftValue: Number;
    rightValue: Number;

    unit: Unit;
    designType: DesignType;
}