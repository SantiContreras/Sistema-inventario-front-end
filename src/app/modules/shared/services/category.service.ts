import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const url_base = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient) {  
  }

  getCategories(){

    const EndPoint = `${url_base}/categories`;
    return this.http.get(EndPoint);
  }
}
