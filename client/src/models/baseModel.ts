import type Link from "./link";

export default class BaseModel  {
    id: number;
    row: number;
    _links:Link[];
}
