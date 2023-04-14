import type { LoadType } from "@/enums/loadType";
import type Link from "./link";
import type LoadParameters from "./loadParameters";
import type PointLoadDto from "./pointLoadDto";

export default class LoadingDto {
    selfWeight: number;
    loadType: LoadType;

    permanentLoads: LoadParameters;
    variableLoads: LoadParameters;
    ultimateLoads: LoadParameters;
    pointLoads: PointLoadDto[];

    _links: Link[];
}