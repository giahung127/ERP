export class ImportProduct {
    no: number;
    productId: string;
    productCode: string;
    productName: string;
    amount: number;
    price:number;
    isExpire: boolean;
    manufacturedDate?: Date;
    expiryDate?: Date;

    constructor(no: number, productId: string, productCode: string, productName: string, amount: number, price: number, isExpire: boolean){
        this.no = no;
        this.productId = productId;
        this.productCode = productCode;
        this.productName = productName;
        this.amount = amount;
        this.price = price;
        this.isExpire = isExpire;
    }
}
