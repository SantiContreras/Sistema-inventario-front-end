import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(private kecloacSer:KeycloakService) { }

  getRoles(){
    return this.kecloacSer.getUserRoles();
  }
   //si es admin establesco los permisos
  isAdmin(){
    let sies = this.kecloacSer.getUserRoles().filter(role => role =="admin");

    if(sies.length>0) 
      return true 
    
    else return false
  }
}
