export class Invoice {
    invoiceId: string;
    invoiceCode: string;
    totalTax: number;
    totalDiscount: number;
    total: number;
    orderIdList: string[];
    createdDate?: Date;
    creatorName: string;
    status: string;
    customerName? : string;

    constructor(
        invoiceId: string,
        invoiceCode: string,
        totalTax: number,
        totalDiscount: number,
        total: number,
        orderIdList: string[],
        status: string,
        creatorName: string
    ) {
        this.invoiceId = invoiceId;
        this.invoiceCode = invoiceCode;
        this.totalTax = totalTax;
        this.totalDiscount = totalDiscount;
        this.total = total;
        this.orderIdList = orderIdList;
        this.status = status;
        this.creatorName = creatorName;
    }
}
