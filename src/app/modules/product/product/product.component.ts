import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { NewCategoryComponent } from '../../category/components/new-category/new-category.component';
import { ConfirmComponent } from '../../shared/components/confirm/confirm.component';
import { ProductService } from '../../shared/services/product.service';
import { NewProductComponent } from '../new-product/new-product.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor(private productServices: ProductService, public dialog: MatDialog,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {

    this.getProduct();
  }

  displayedColumns: string[] = ['id', 'name', 'price', 'account', 'category', 'picture', 'actions']
  dataSource = new MatTableDataSource<ProductElement>();
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;


  getProduct() {
    this.productServices.getProducts()
      .subscribe((data: any) => {
        console.log("respuesta ok", data);
        this.processProductResponse(data);
      }, (error: any) => {
        console.log("error al consumi el servicio", error)
      })
  }

  processProductResponse(resp: any) {
    const dataProduct: ProductElement[] = [];
    if (resp.metadata[0].code == "00") {
      let listProduct = resp.product.products;

      listProduct.forEach((element: ProductElement) => {
        //element.category = element.category.name
        element.picture = 'data:image/jpeg;base64,' + element.picture
        dataProduct.push(element);
      });

      //seteamos el data source
      this.dataSource = new MatTableDataSource<ProductElement>(dataProduct);
      this.dataSource.paginator = this.paginator;


    }

  }

  openProductDialog() {
    const dialogRef = this.dialog.open(NewProductComponent, {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result == 1) {
        this.openSnackBar("Producto agragado", "exitosa")
        this.getProduct()
      } else if (result == 2) {
        this.openSnackBar("Se produjo un error al agragar un nuevo producto", "Error")
      }
    });
  }


  openSnackBar(message: string, action: string): MatSnackBarRef<SimpleSnackBar> {
    return this.snackBar.open(message, action, {
      duration: 2000
    })

  }

  editar(id: number, name: string, price: number, account: number, category: number) {
    const dialogRef = this.dialog.open(NewProductComponent, {
      width: '450px',
      data: { id: id, name: name, price: price, account: account, category: category }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result == 1) {
        this.openSnackBar("Producto Editado exitosamente", "exitosa")
        this.getProduct()
      } else if (result == 2) {
        this.openSnackBar("Se produjo un error al editar un nuevo producto", "Error")
      }
    });
  }

  delete(id: any) {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '450px',
      data: { id: id, module:"product" }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result == 1) {
        this.openSnackBar("Producto elinimado exitosamente", "exitosa")
        this.getProduct()
      } else if (result == 2) {
        this.openSnackBar("Se produjo un error al eliminar un producto", "Error")
      }
    });
  }

  buscar(nombre: any){
    if(nombre.length === 0){
      return this.getProduct();
    }
    this.productServices.getProductByName(nombre).subscribe((resp:any)=>{
      this.processProductResponse(resp);
    });
  }

  exportExcelProducts() {
    this.productServices.ExportProducts()
    .subscribe((data:any) =>{
        let file = new Blob([],{type : 'application/vpn.openxmlformats-officedcument.spreadsheet.sheet'})
        let fileurl = URL.createObjectURL(file);
        var anchor = document.createElement("a")
        anchor.download = "products.odt"
        anchor.href = fileurl
        anchor.click();
        this.openSnackBar("Se descargo con exito el archivo","Exito");
    })
  }







}

export interface ProductElement {
  id: number
  name: string
  price: number
  account: number
  category: any
  picture: any
}
