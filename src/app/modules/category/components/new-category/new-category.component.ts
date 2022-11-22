import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryService } from 'src/app/modules/shared/services/category.service';

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.css']
})
export class NewCategoryComponent implements OnInit {
  public categoryForm:FormGroup ;
  public estadoCategoria:String = "Agregar"

  constructor(private fb:FormBuilder , private categoryService: CategoryService , 
    private dialogRef : MatDialogRef<NewCategoryComponent>, @Inject(MAT_DIALOG_DATA )public data: any) { 
    this.categoryForm =this.fb.group({
      name:['',Validators.required],
      descripcion:['',Validators.required]
    })

    if(data != null) {
      this.updateData(data);
      this.estadoCategoria="Actualizar"
    }
  }

  ngOnInit(): void {
  }

  onSave():void{
      let data = {
          name: this.categoryForm.get('name')?.value,
          descripcion: this.categoryForm.get('descripcion')?.value,
      }
       if (data != null) {
          this.categoryService.updateCategory(data , this.data.id)
                  .subscribe( (data:any)=>{
                    this.dialogRef.close(1)
                  },
    
                  (error:any)=>{
                  this.dialogRef.close(2)
                  })
       } else {
        this.categoryService.saveCategory(data).subscribe((data:any) => {
          console.log(data),
          this.dialogRef.close(1)
          },
    
        (error:any)=>{
        this.dialogRef.close(2)
        }
        )
       }
     
  }
   
  onCancel():void {
    this.dialogRef.close(3)
  }

  updateData(data: any) {
    this.categoryForm =this.fb.group({
      name:[data.name,Validators.required],
      descripcion:[data.descripcion,Validators.required]
    })
  }
}
