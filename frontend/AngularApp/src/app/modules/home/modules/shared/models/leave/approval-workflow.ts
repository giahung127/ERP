import { ApprovalStatus } from './enum.model';
import { TableStatus } from '../components';

export class ApprovalWorkflow {
    id: string;
    Position: string;
    Time: string;
    Status: TableStatus<ApprovalStatus>;

    constructor(id: string, position: string, time: string, status: TableStatus<ApprovalStatus>) {
        this.id = id;
        this.Position = position;
        this.Time = time;
        this.Status = status;
    }
}
