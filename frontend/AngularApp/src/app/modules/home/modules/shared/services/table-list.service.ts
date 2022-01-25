import { Injectable } from '@angular/core';
// import { BaseService } from 'src/app/core/services/base.service';

@Injectable({
    providedIn: 'root'
})
export class TableListService{
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    selectedRows: any[] = [];

    setSelectedRow(selectedRows) {
        this.selectedRows = selectedRows;
    }

    getSelectedRows() {
        return this.selectedRows;
    }
}
