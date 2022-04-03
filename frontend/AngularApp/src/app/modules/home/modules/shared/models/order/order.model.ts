export class Order {
    orderId: string;
    createdDate: Date;
    status: string;
    creatorName: string;
    priceListId: string;
    totalIncludeTax?: number;
    totalExcludeTax?: number;
    tax?: number;
    discount?: number;
    shippingFee?: number;
    customerId: string;
    customerName?: string;

    constructor(
        orderId: string,
        createdDate: Date,
        status: string,
        creatorName: string,
        customerId: string,
        priceListId: string
    ) {
        this.orderId = orderId;
        this.createdDate = createdDate;
        this.status = status;
        this.creatorName = creatorName;
        this.customerId = customerId;
        this.priceListId = priceListId;
    }
}
