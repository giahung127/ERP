import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Category } from '../../shared/models/category/category.model';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddCategoryModalComponent } from '../add-category-modal/add-category-modal.component';
import { CategoryService } from '../services/category.service'
import { ToastrService } from 'ngx-toastr';
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
  @Output() childrenChanged: EventEmitter<{ id: String }> = new EventEmitter();
  constructor(
    private dialog: MatDialog,
    private toastr: ToastrService,
    private categoryService: CategoryService
  ) {
    this.initData()
  }
  treeData: Node[] = [];
  currentNodeId = '';
  maxLevel = 0;
  categoryList: Category[] = [];
  initData() {
    this.categoryService.getAllCategory()
      .subscribe((res) => {
        let data;
        data = res
        this.categoryList = data.map(({ id,code,  name, level, parentId})=>{
          return {
            'categoryId': id,
            'categoryName': name,
            'code': code,
            'description': '',
            'level': level,
            'parentId': parentId !== null ? parentId : ''
          }
        })
    this.maxLevel = Math.max(...this.categoryList.map((category) => {return category.level}))
    this.dataSource.data = [{ name: 'All', id: '',children: this.constructData(0, '')}]
    this.treeControl.dataNodes
            .filter((node) => {
                return node.name === 'All';
            })
            .forEach((node) => {
                this.treeControl.expand(node);
            });
      })
  }
  

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
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      categoryList: this.categoryList,
      selectedCategoryId: selectedCategoryId
    };
    const dialogRef = this.dialog.open(AddCategoryModalComponent, dialogConfig);
    dialogRef
        .afterClosed()
        .subscribe(
          (newCategory) => {
            if(newCategory){
              const data = {
                id: selectedCategoryId,
                name: newCategory.categoryName,
                code: newCategory.code,
                parentId: newCategory.parentCategory ? newCategory.parentCategory : null,
                level: newCategory.parentCategory ? this.categoryList.filter(x=> {return x.categoryId === newCategory.parentCategory})[0].level + 1 : 0
              }
              if(selectedCategoryId === ''){
                this.categoryService.addNewCategory(data)
                  .subscribe(
                  (res)=>{
                    let tempRes;
                    tempRes = res;
                    this.toastr.success('New category is successfully added');
                    const temp: Category = {
                      'categoryId': tempRes.data,
                      'categoryName': data.name,
                      'code': data.code,
                      'description': '',
                      'level': data.level,
                      'parentId': newCategory.parentCategory
                    }
                    this.initData()
                    // this.categoryList.push(temp);
                    // this.maxLevel = Math.max(...this.categoryList.map((category) => {return category.level}))
                    // this.dataSource.data = [{ name: 'All', id: '',children: this.constructData(0, '')}]
                    // this.treeControl.dataNodes
                    //         .filter((node) => {
                    //             return node.name === 'All';
                    //         })
                    //         .forEach((node) => {
                    //             this.treeControl.expand(node);
                    //         });
                  })
                } else {
                  this.categoryService.updateCategoryById(data)
                  .subscribe(
                    (res)=>{
                      this.toastr.success('The category is successfully updated');
                      const temp = {
                        'categoryId': data.id,
                        'categoryName': data.name,
                        'code': data.code,
                        'description': '',
                        'level': data.level,
                        'parentId': data.parentId
                      } 
                      this.initData()
                      // this.categoryList = [...this.categoryList.filter(x => {return x.categoryId !== selectedCategoryId}), temp];
                      
                      // this.maxLevel = Math.max(...this.categoryList.map((category) => {return category.level}))
                      // this.dataSource.data = [{ name: 'All', id: '',children: this.constructData(0, '')}]
                      // this.treeControl.dataNodes
                      //         .filter((node) => {
                      //             return node.name === 'All';
                      //         })
                      //         .forEach((node) => {
                      //             this.treeControl.expand(node);
                      //         });
                    }
                  )
                }
              }
        });
    }

  onViewDetail( id: string) {
    this.childrenChanged.emit({ id });
  }
}
