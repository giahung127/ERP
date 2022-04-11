export class Shipment {
    shipmentId: string;
    orderId: string;
    createdDate: Date;
    creatorName: string;
    shippingAddress: string;
    contactNumber: string;
    status: string;
    customerName?: string

    constructor(
        shipmentId: string,
        orderId: string,
        createdDate: Date,
        creatorName: string,
        shippingAddress: string,
        contactNumber: string,
        status: string,
    ) {
        this.shipmentId = shipmentId;
        this.orderId = orderId;
        this.createdDate = createdDate;
        this.creatorName = creatorName;
        this.shippingAddress = shippingAddress;
        this.contactNumber = contactNumber;
        this.status = status;
    }
}
