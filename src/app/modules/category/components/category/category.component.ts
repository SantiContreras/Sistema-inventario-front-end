import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { CategoryService } from 'src/app/modules/shared/services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  constructor(private categoryService:CategoryService) { }

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

}

export interface CategoryElement {
  descripcion : string;
  name:string;
  id: number;
}
