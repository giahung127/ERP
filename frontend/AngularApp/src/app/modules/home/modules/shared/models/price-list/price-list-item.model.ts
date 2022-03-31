export class PriceListItem {
    itemId: string;
    priceListId: string;
    price: number;
    updatedAt: string;
    constructor(itemId: string, priceListId: string, price: number, updatedAt: string){
        this.itemId = itemId;
        this.priceListId = priceListId;
        this.price = price;
        this.updatedAt = updatedAt;
    }
}
