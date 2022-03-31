import { PriceListItem } from "./price-list-item.model";

export class PriceList {
    id: string;
    code: string;
    name: string;

    item? : PriceListItem[]
    constructor(id: string, code: string, name: string){
        this.id = id;
        this.code = code;
        this.name = name;
    }
}
