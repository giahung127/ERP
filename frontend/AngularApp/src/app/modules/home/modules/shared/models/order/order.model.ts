export class Order {
    orderId: string;
    createdDate: string;
    supplier: string;
    customer: string;
    status: string;

    constructor(
        orderId: string,
        createdDate: string,
        supplier: string,
        customer: string,
        status: string
    ) {
        this.orderId = orderId;
        this.createdDate = createdDate;
        this.supplier = supplier;
        this.customer = customer;
        this.status = status;
    }
}
