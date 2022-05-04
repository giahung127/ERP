export class Product {
    productId: string;
    productCode: string;
    productName: string;
    price: number;
    amount: number;
    categoryId: string;
    categoryName: string;
    description: string;
    needAmount?: number;

    constructor(productId: string, productCode: string, productName: string, price: number, amount: number, categoryId: string, categoryName: string, description: string){
        this.productId = productId;
        this.productCode = productCode;
        this.productName = productName;
        this.price = price;
        this.amount = amount;
        this.categoryId = categoryId;
        this.categoryName = categoryName;
        this.description = description;
    }
}
