import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ConfirmComponent } from './components/confirm/confirm.component';



@NgModule({
  declarations: [
    SidebarComponent,
    ConfirmComponent
  ],
  exports:[
    SidebarComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    RouterModule,
    HttpClientModule
    
  ]
})
export class SharedModule { }
