import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { CategoryService } from 'src/app/modules/shared/services/category.service';
import { NewCategoryComponent } from '../new-category/new-category.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  constructor(private categoryService:CategoryService , public dialog: MatDialog, 
    private snackBar:MatSnackBar) { }

  ngOnInit(): void {
    this.getCategories()  
  }

    displayedColumns:string[]=['id','descripcion','name','actions']
    dataSource = new MatTableDataSource<CategoryElement>();

  getCategories(){
    this.categoryService.getCategories()
      .subscribe( (data:any) => {
        console.log("respuesta categories: ", data);
        this.processCategoriesResponse(data);
      })
  }

  processCategoriesResponse(resp:any){

    const dataCategory : CategoryElement[] = [];
    if (resp.metadata[0].code == "001" ) {
      let listCategory = resp.categoryresponse.categorys;

      listCategory.forEach((element: CategoryElement) => {
        dataCategory.push(element)
      });

      this.dataSource = new MatTableDataSource<CategoryElement>(dataCategory);
    }

  }

  openCategoryDialog(){
    const dialogRef = this.dialog.open( NewCategoryComponent, {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe((result:any) => {
      if (result == 1) {
        this.openSnackBar("categoria agragada","exitosa")
        this.getCategories()
      } else  if(result==2){
        this.openSnackBar("Se produjo un error","Error")
      }
    });
  }

  openSnackBar(message:string , action:string):MatSnackBarRef<SimpleSnackBar>{
    return this.snackBar.open(message ,action , {
      duration:2000
    })

  }

}

export interface CategoryElement {
  descripcion : string;
  name:string;
  id: number;
}
