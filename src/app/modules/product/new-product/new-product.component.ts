import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { NewCategoryComponent } from '../../category/components/new-category/new-category.component';
import { CategoryService } from '../../shared/services/category.service';
import { ProductService } from '../../shared/services/product.service';

/* defino la interface categoria*/
export interface Category {
  description: string;
  id: number;
  name: string;
}

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {

  estadoProducto: string = ""
  public productForm: FormGroup;
  categories: Category[] = []; /* declaro arreglo de categorias interface*/
  seletecFile: any
  nameImg: string = ""

  constructor(private fb: FormBuilder, private productService: ProductService, private categoryService: CategoryService,
    private dialogRef: MatDialogRef<NewProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      account: ['', Validators.required],
      category: ['', Validators.required],
      picture: ['', Validators.required],
    })

    if (data != null) {
      this.updateForm(data);
      this.estadoProducto = "Actualizar"
    }

  }

  ngOnInit(): void {
    this.getCategories()
  }

  onSave() {
    let data = {
      name: this.productForm.get('name')?.value,
      price: this.productForm.get('price')?.value,
      account: this.productForm.get('account')?.value,
      category: this.productForm.get('category')?.value,
      picture: this.seletecFile
    }

    const uploadImageData = new FormData();
    uploadImageData.append('picture', data.picture, data.picture.name);
    uploadImageData.append('name', data.name);
    uploadImageData.append('price', data.price);
    uploadImageData.append('account', data.account);
    uploadImageData.append('categoryId', data.category);

    if (this.data != null) {
      //call the service to update product
      this.productService.updateProduct(uploadImageData, this.data.id)
        .subscribe((data: any) => {
          this.dialogRef.close(1)
        }, (error: any) => {
          this.dialogRef.close(2)
        })
    } else {
      //call the service to save product
      this.productService.saveProduct(uploadImageData)
        .subscribe((data: any) => {
          this.dialogRef.close(1)
        }, (error: any) => {
          this.dialogRef.close(2)
        })
    }

 

  }

  onCancel() { }

  getCategories() {
    this.categoryService.getCategories()
      .subscribe((data: any) => {
        this.categories = data.categoryResponse.category;
      }, (error: any) => {
        console.log("error al consultar categorias");
      })
  }

  onFileChanged(event: any) {
    this.seletecFile = event.target.files[0];
    console.log(this.seletecFile)
    this.nameImg = event.target.files[0].name
  }

  updateForm(data: any) {
    this.productForm = this.fb.group({
      name: [data.name, Validators.required],
      price: [data.price, Validators.required],
      account: [data.account, Validators.required],
      category: [data.category.id, Validators.required],
      picture: [data.picture, Validators.required],
    })
  }



}
