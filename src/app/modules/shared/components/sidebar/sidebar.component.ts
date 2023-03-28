import { MediaMatcher } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import {KeycloakService} from 'keycloak-angular'

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  mobileQuery:MediaQueryList;
  username:any

  menuNav =[
    {name:"home",route:"home",icon:"home"},
    {name:"categorias",route:"category",icon:"category"},
    {name:"productos",route:"product",icon:"production_quantity_limits"},
  ]

  constructor(media:MediaMatcher, private keyloackService : KeycloakService) {
    this.mobileQuery = media.matchMedia('(max-width:600px)');
   }

  ngOnInit(): void {
    this.username = this.keyloackService.getUsername();
    
  }

  cerrarsesio(){
      this.keyloackService.logout();
  }

}
