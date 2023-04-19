import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ProductElement } from 'src/app/modules/product/product/product.component';
import { ProductService } from 'src/app/modules/shared/services/product.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  dataSource: any;
  paginator: any;
  chartBar : any
  chartdoughnut: any;
 


  constructor(private productServices: ProductService) { }

  ngOnInit(): void {

    this.getProduct();
  }

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
    const nameProduc: string[] = [];
    const account: number[] = [];
    if (resp.metadata[0].code == "00") {
      let listProduct = resp.product.products;

      listProduct.forEach((element: ProductElement) => {
          nameProduc.push(element.name);
          account.push(element.account);
      });

      //aqui metemos el grafico de barras

      this.chartdoughnut = new Chart('canvas-bar',{
        type:'bar',
        data:{
          labels:nameProduc,
          datasets:[{
            label:'Productos', data:account
          }
        ]
        }
      });

      this.chartdoughnut = new Chart('canvas-doughnut',{
        type:'doughnut',
        data:{
          labels:nameProduc,
          datasets:[{
            label:'Productos', data:account
          }
        ]
        }
      });
     


    }

  }

}
