import type DesignItem from "./designItem";
import type Link from "./link";

export default class Design {
    web: DesignItem
    bottomFlange: DesignItem
    topFlange: DesignItem

    _links:Link[];
}