import type VerificationItem from "./verificationItem";

export default class FlangeVerification  {
    maximumUtilization: number;
    verificationItems: Array<VerificationItem> = [];
    captions: Array<string> = [];
    keyValues:any
}