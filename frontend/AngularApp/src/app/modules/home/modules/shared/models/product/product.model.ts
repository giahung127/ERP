export class Product {
    productId: string;
    productName: string;
    price: number;
    categoryId: string;
    categoryName: string;
    description: string;

    constructor(productId: string, productName: string, price: number, categoryId: string, categoryName: string, description: string){
        this.productId = productId;
        this.productName = productName;
        this.price = price;
        this.categoryId = categoryId;
        this.categoryName = categoryName;
        this.description = description;
    }
}
