export enum TableStatusColor {
    Success = 'Success',
    Error = 'Error',
    Warning = 'Warning'
}

export class TableStatus<T> {
    name: T;
    type: TableStatusColor;

    constructor(name: T, type: TableStatusColor) {
        this.name = name;
        this.type = type;
    }
}
