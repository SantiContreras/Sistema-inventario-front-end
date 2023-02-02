import { MediaMatcher } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  mobileQuery:MediaQueryList;

  menuNav =[
    {name:"home",route:"home",icon:"home"},
    {name:"categorias",route:"category",icon:"category"},
    {name:"productos",route:"product",icon:"production_quantity_limits"},
  ]

  constructor(media:MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width:600px)');
   }

  ngOnInit(): void {
    
  }

}
