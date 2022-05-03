export class Shipment {
    shipmentId: string;
    orderId: string;
    createdDate: Date;
    creatorName: string;
    status: string;
    contactName?: string;
    contactNumber?: string;
    contactAddress?: string;
    shipmentCode?: string;
    orderCode?: string;

    constructor(
        shipmentId: string,
        orderId: string,
        createdDate: Date,
        creatorName: string,
        status: string,
    ) {
        this.shipmentId = shipmentId;
        this.orderId = orderId;
        this.createdDate = createdDate;
        this.creatorName = creatorName;
        this.status = status;
    }
}
