import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginatedTabHeader } from '@angular/material/tabs/paginated-tab-header';

import { Observable } from 'rxjs';
import { ConfirmComponent } from 'src/app/modules/shared/components/confirm/confirm.component';
import { CategoryService } from 'src/app/modules/shared/services/category.service';
import { UtilService } from 'src/app/modules/shered/services/util.service';
import { NewCategoryComponent } from '../new-category/new-category.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  isAdmin : any

  constructor(private categoryService:CategoryService , public dialog: MatDialog, 
    private snackBar:MatSnackBar , private util:UtilService) { }

  ngOnInit(): void {
    this.getCategories()  
    this.isAdmin = this.util.isAdmin();
  }

    displayedColumns:string[]=['id','descripcion','name','actions']
    dataSource = new MatTableDataSource<CategoryElement>();
    @ViewChild(MatPaginator)
    paginator! :MatPaginator;

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
      let listCategory = resp.categoryResponse.category;

      listCategory.forEach((element: CategoryElement) => {
        dataCategory.push(element)
      });

      this.dataSource = new MatTableDataSource<CategoryElement>(dataCategory);
      this.dataSource.paginator=this.paginator;
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

  edit(id:number , name:string , descripcion:string){

    const dialogRef = this.dialog.open( NewCategoryComponent, { width: '750px',
     data : {
      id:id ,name:name , descripcion:descripcion
     }
    });

    dialogRef.afterClosed().subscribe((result:any) => {
      if (result == 1) {
        this.openSnackBar("CATEGORIA ACTUALIZADA","exitosa")
        this.getCategories()
      } else  if(result==2){
        this.openSnackBar("Se produjo un error al actualizar","Error")
      }
    });
  }

  openSnackBar(message:string , action:string):MatSnackBarRef<SimpleSnackBar>{
    return this.snackBar.open(message ,action , {
      duration:2000
    })

  }
  
  delete(id:any) {
    const dialogRef = this.dialog.open( ConfirmComponent, { 
      width: '750px',
      data : { id:id, module:"category" }
   });

   dialogRef.afterClosed().subscribe((result:any) => {
     if (result == 1) {
       this.openSnackBar("CATEGORIA ELIMINADA","exitosa")
       this.getCategories()
     } else  if(result==2){
       this.openSnackBar("Se produjo un error al ELIMINAR","Error")
     }
   });
  }

  buscar( termino: string){

    if( termino.length === 0){
      return this.getCategories();
    }

    this.categoryService.getCategoryById(termino)
            .subscribe( (resp: any) => {
              this.processCategoriesResponse(resp);
            })
  }

  exportExcel() {
    this.categoryService.ExportCategories()
    .subscribe((data:any) =>{
        let file = new Blob([],{type : 'application/vpn.openxmlformats-officedcument.spreadsheet.sheet'})
        let fileurl = URL.createObjectURL(file);
        var anchor = document.createElement("a")
        anchor.download = "categories.xlsx"
        anchor.href = fileurl
        anchor.click();
        this.openSnackBar("Se descargo con exito el archivo","Exito");
    })
  }

}

export interface CategoryElement {
  descripcion : string;
  name:string;
  id: number;
}
