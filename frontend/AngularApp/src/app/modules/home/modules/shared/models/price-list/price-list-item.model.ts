export class PriceListItem {
    productId: string;
    priceListId: string;
    price: number;
    updatedAt: string;
    constructor(productId: string, priceListId: string, price: number, updatedAt: string){
        this.productId = productId;
        this.priceListId = priceListId;
        this.price = price;
        this.updatedAt = updatedAt;
    }
}
