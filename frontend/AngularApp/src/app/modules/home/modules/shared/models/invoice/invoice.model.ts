export class Invoice {
    invoiceId: string;
    orderId: string;
    createdDate: Date;
    status: string;
    creatorName: string;

    constructor(
        invoiceId: string,
        orderId: string,
        createdDate: Date,
        status: string,
        creatorName: string
    ) {
        this.invoiceId = invoiceId;
        this.orderId = orderId;
        this.createdDate = createdDate;
        this.status = status;
        this.creatorName = creatorName;
    }
}
