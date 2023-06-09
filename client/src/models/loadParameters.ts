import type { LoadType } from "@/enums/loadType";

export default class LoadParameters {
    udl: number;

    partialUdl: number;
    partialUdlStart: number;
    partialUdlEnd: number;

    endMomentLeft: number;
    endMomentRight: number;
    axialForce: number;
}