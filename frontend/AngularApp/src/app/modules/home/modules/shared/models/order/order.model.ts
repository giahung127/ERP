export class Order {
    orderId: string;
    createdDate: string;
    customer: string;
    status: string;

    constructor(
        orderId: string,
        createdDate: string,
        customer: string,
        status: string
    ) {
        this.orderId = orderId;
        this.createdDate = createdDate;
        this.customer = customer;
        this.status = status;
    }
}
