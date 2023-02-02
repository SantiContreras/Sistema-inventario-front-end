import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const url_base = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {

  }


  /**
   * metodo para obtener todos los productos 
   * 
   * */

  getProducts() {
    const EndPoint = `${url_base}/products`;
    return this.http.get(EndPoint);

  }
}
