import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmComponent } from '../../shared/components/confirm/confirm.component';
import { ProductService } from '../../shared/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor(private productServices :ProductService) { }

  ngOnInit(): void {

    this.getProduct();
  }

  displayedColumns:string[]=['id','name','price','account','category','picture','actions']
  dataSource = new MatTableDataSource<ProductElement>();
  @ViewChild(MatPaginator)
  paginator! :MatPaginator;


  getProduct(){
    this.productServices.getProducts()
     .subscribe( (data:any) =>{
          console.log("respuesta ok",data);
          this.processProductResponse(data);
     },(error:any) =>{
      console.log("error al consumi el servicio",error)
 })
  }

  processProductResponse(resp :any){
    const dataProduct: ProductElement[] = [];
    if(resp.metadata[0].code == "00"){
        let listProduct = resp.product.products;

        listProduct.forEach( (element:ProductElement) => {
            element.category = element.category.name
            element.picture = 'data:image/jpeg;base64'+element.picture
            dataProduct.push(element);
        });

        //seteamos el data source
        this.dataSource = new MatTableDataSource<ProductElement>(dataProduct);
        this.dataSource.paginator = this.paginator;


    }

}

}

export interface ProductElement{
  id:number
  name:string
  price:number
  account:number
  category:any
  picture:any
}
