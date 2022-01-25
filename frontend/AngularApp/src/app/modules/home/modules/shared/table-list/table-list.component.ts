import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TableStatusColor } from '../models/components';
import { TableListService } from '../services/table-list.service';

@Component({
    changeDetection: ChangeDetectionStrategy.Default,
    selector: 'app-home-table-list',
    templateUrl: './table-list.component.html',
    styleUrls: ['./table-list.component.scss']
})
export class TableListComponent implements OnInit, AfterViewInit, OnChanges {
    column: string[] = [];
    searchKeyword = '';
    typepass = 'password';
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    selection = new SelectionModel<any>(true, []);
    success = TableStatusColor.Success;
    error = TableStatusColor.Error;
    warning = TableStatusColor.Warning;
    @ViewChild(MatPaginator) paginator?: MatPaginator;
    @ViewChild(MatSort) sort?: MatSort;

    @Input() header = true;
    // @Input() footer = true;
    @Input() title = '';
    @Input() add = false; // Add button, pass a callback to it
    @Input() filter = false;
    @Input() search = false; // Allow user to search on the table
    @Input() more = true;
    @Input() save = false;
    @Input() onSaveAction;
    @Input() onQuickUpdate;
    @Input() pass = false;
    @Input() select;
    // Use it if you want custom menu instead of View, Edit and Delete menu
    // [{display: 'Edit', action: ()=>{}}, {display: ...}]
    @Input() customActions;
    @Input() checkbox = false;
    @Input() sorting = true;
    @Input() paginating = true;
    @Input() columnName: string[] = [];
    // List of column u want to be an input
    // Must be the same as in columnName
    @Input() formField;
    // Use it if you want column names to be different from model properties, otherwise use columnName as normal
    // {'column1': 'property1', 'column2': 'property2',...}
    @Input() columnToProperty;
    @Input() useDefaultStatusColumn = true;
    // {'column1': transform(original) => {... formattedData}, 'column2': 'property2',...}
    @Input() customColumnFormat = {};
    @Input() key = '';
    @Input() data;
    @Input() usePaginator = true;
    @Input() onViewClick: (id: string) => void = () => {};
    @Input() onEditClick: (id: string) => void = () => {};
    @Input() onDeleteClick: (id: string) => void = () => {};
    @Input() onAdd: () => void = () => {};
    constructor(private tableListService: TableListService) {}

    ngOnInit(): void {
        this.column = [...this.columnName];
        if (this.more) {
            this.column = [...this.column, 'more'];
        }
        if (this.customActions) {
            this.column = [...this.column, 'customActions'];
        }
        if (this.checkbox) {
            this.column = ['checkbox', ...this.column];
        }
        if (this.save) {
            this.column = [...this.column, 'save'];
        }
    }
    ngOnChanges() {
        this.data = new MatTableDataSource(this.data);
        this.data.paginator = this.paginator;
        this.data.sort = this.sort;
        this.selection.clear();

        this.data.data.forEach((row) => {
            if (row.isCheck) {
                this.selection.select(row);
                this.tableListService.setSelectedRow(this.selection.selected);
            }
        });
    }

    ngAfterViewInit(): void {
        this.data.paginator = this.paginator;
        this.data.sort = this.sort;
    }

    getValue(obj, columnName) {
        if (obj[columnName] === undefined) {
            // Use custom column name (column name != property name)
            if (this.columnToProperty[columnName]) {
                if (obj[this.columnToProperty[columnName]] || obj[this.columnToProperty[columnName]] === 0) {
                    if (this.customColumnFormat[columnName] !== undefined) {
                        return this.customColumnFormat[columnName](obj[this.columnToProperty[columnName]], obj);
                    }
                    return obj[this.columnToProperty[columnName]];
                }
                return 'None';
            }
            return 'Unknown';
        }
        if (obj[columnName]) {
            return obj[columnName];
        }
        return 'None';
    }

    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.data.data.length;
        return numSelected === numRows;
    }

    masterToggle() {
        if (!this.isAllSelected()) {
            this.selection.select(...this.data.data);
            this.tableListService.setSelectedRow(this.selection.selected);
            return;
        }
        this.selection.clear();
        this.tableListService.setSelectedRow(this.selection.selected);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    checkboxLabel(row?: any): string {
        if (!row) {
            return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
        }
        return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onCheckboxChange(row: any) {
        this.selection.toggle(row);
        this.tableListService.setSelectedRow(this.selection.selected);
    }

    isFormField(columnName: string) {
        if (this.formField) {
            return Object.keys(this.formField).some((column) => {
                return column === columnName;
            });
        }
        return false;
    }

    isInvalid(row) {
        let check = false;
        Object.keys(this.formField).forEach((name) => {
            if (row[this.formField[name]] == null) {
                check = true;
            }
        });
        return check;
    }

    sortColumn(): void {
        // Only table using custom column name need to use this
        if (this.columnToProperty) {
            this.data.sortingDataAccessor = (item, columnName) => {
                return item[this.columnToProperty[columnName]];
            };
        }
    }

    showPass() {
        if (this.typepass === 'password') {
            this.typepass = 'text';
        } else {
            this.typepass = 'password';
        }
    }

    applyFilter(filterValue: string) {
        filterValue.trim();
        filterValue.toLowerCase();
        this.data.filter = filterValue;
    }
}
