export class Category {
    categoryId: string;
    categoryName: string;
    code: string;
    description: string;
    level: number;
    parentId?: string;

    constructor(categoryId: string, categoryName: string, code: string, description: string, level: number, parentId: string){
        this.categoryId = categoryId;
        this.categoryName = categoryName;
        this.code = code;
        this.description = description;
        this.level = level;
        this.parentId = parentId;
    }
}
