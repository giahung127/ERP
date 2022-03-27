export class ImportProduct {
    no: number;
    productId: string;
    productCode: string;
    productName: string;
    amount: number

    constructor(no: number, productId: string, productCode: string, productName: string, amount: number){
        this.no = no;
        this.productId = productId;
        this.productCode = productCode;
        this.productName = productName;
        this.amount = amount;
    }
}
