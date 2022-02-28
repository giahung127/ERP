import { Component, OnInit } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Category } from '../../shared/models/category/category.model';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddCategoryModalComponent } from '../add-category-modal/add-category-modal.component';

interface Node {
  name: string;
  id: string;
  children: Node[];
}

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  id: string;
  level: number;
}


@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent {

  constructor(
    private dialog: MatDialog,
  ) {
    this.dataSource.data = [{ name: 'All', id: '',children: this.constructData(0, '')}]
    this.treeControl.dataNodes
            .filter((node) => {
                return node.name === 'All';
            })
            .forEach((node) => {
                this.treeControl.expand(node);
            });
  }
  treeData: Node[] = [];
  currentNodeId = '';
  categoryList: Category[] = [
    new Category('c001','My pham 1', 'DEF', 0, ''),
    new Category('c002','My pham 2', 'DEF', 0, ''),
    new Category('c003','Mat na', 'DEF', 1, 'c001'),
    new Category('c004','Nuoc tay trang', 'DEF', 1, 'c001'),
    new Category('c005','Kem chong nang', 'DEF', 1, 'c002'),
    new Category('c006','Mat na 1', 'DEF', 2, 'c003'),
    new Category('c007','Nuoc tay trang 1', 'DEF', 2, 'c004')
  ];

  maxLevel = Math.max(...this.categoryList.map((category) => {return category.level}))

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    (node) => {
        return node.level;
    },
    (node) => {
        return node.expandable;
    }
  );

  private _transformer = (node: Node, level: number) => {
    return {
        expandable: !!node.children && node.children.length > 0,
        name: node.name,
        id: node.id,
        level
    };
  };

  /* eslint-disable @typescript-eslint/member-ordering */
  treeFlattener = new MatTreeFlattener(
    this._transformer,
    (node) => {
        return node.level;
    },
    (node) => {
        return node.expandable;
    },
    (node) => {
        return node.children;
    }
  );

  /* eslint-disable @typescript-eslint/member-ordering */
  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  hasChild = (_: number, node: ExampleFlatNode) => {
    return node.expandable;
  };

  constructData(level: number, parentId: string): Node[] {
    let listData: Node[] = [];
    this.categoryList.filter(category => {return category.level === level && category.parentId === parentId})
      .forEach(category => {
        if(category.level < this.maxLevel - 1){
          const data: Node = {
            id: category.categoryId,
            name: category.categoryName,
            children: this.constructData(category.level + 1, category.categoryId)
          }
          listData.push(data)
        } else {
          const leafNode: Node[] = [];
          this.categoryList.filter(x => {return x.parentId === category.categoryId})
            .forEach(x => {
              const data: Node = {
                id: x.categoryId,
                name: x.categoryName,
                children: []
              }
              leafNode.push(data)
            })
          const data: Node = {
            id: category.categoryId,
            name: category.categoryName,
            children: leafNode
          }
          listData.push(data)
        }
    })
    return listData
  }

  openCreateCategoryDialog(selectedCategoryId: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      categoryList: this.categoryList,
      selectedCategoryId: selectedCategoryId
    };
    const dialogRef = this.dialog.open(AddCategoryModalComponent, dialogConfig);
    dialogRef
        .afterClosed()
        .subscribe(() => {
        });
}
}
