import type { LoadType } from "../enums/loadType";
import type { CombinationType } from "../enums/combinationType";
import type { DesignType } from "../enums/designType";
import IranLoadingItemDto from "./IranLoadingItemDto";

export default class IranLoadingDto {

    constructor() {
        this.loadingItems = [] as IranLoadingItemDto[];
    }

    selfWeight: number;
    loadType: LoadType;
    span: number;
    designType: DesignType;

    combinationType: CombinationType;
    loadingItems: Array<IranLoadingItemDto> = [];
}