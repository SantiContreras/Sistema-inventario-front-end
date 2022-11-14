import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from 'src/app/modules/shared/services/category.service';

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.css']
})
export class NewCategoryComponent implements OnInit {
  public categoryForm:FormGroup 

  constructor(private fb:FormBuilder , private categoryService: CategoryService , 
    private dialogRef : MatDialogRef<NewCategoryComponent>) { 
    this.categoryForm =this.fb.group({
      name:['',Validators.required],
      descripcion:['',Validators.required]
    })
  }

  ngOnInit(): void {
  }

  onSave():void{
      let data = {
          name: this.categoryForm.get('name')?.value,
          descripcion: this.categoryForm.get('descripcion')?.value,
      }

      this.categoryService.saveCategory(data).subscribe((data:any) => {
            console.log(data),
            this.dialogRef.close(1)
      },
      
      (error:any)=>{
        this.dialogRef.close(2)
      }
      )
  }
   
  onCancel():void {
    this.dialogRef.close(3)
  }
}
