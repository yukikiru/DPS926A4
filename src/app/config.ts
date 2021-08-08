
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Module that stores details of API credentials. Would be hidden normally...
@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class Creds {
    client_id:string;
    client_secret:string;
    grant_type:string;

    constructor(){
        this.client_id = "22afvoky8648lt7zlysnhkk4gvwo02";
        this.client_secret = "igcpe1br9wbnlrfram18doozn5ea9n";
        this.grant_type = "client_credentials";
    }
}
