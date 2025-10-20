import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sucess',
  imports: [],
  templateUrl: './sucess.component.html',
  styleUrl: './sucess.component.css',
})
export class SucessComponent implements OnInit {

  checkoutData: any; /* colocar  o tipo aquiiiiii */

  /* tenho que acessar a store do hotel para pegar o nome aquiaquuiaqui */

  ngOnInit() {
    const nav = history.state;
    this.checkoutData = nav.formData;
  }
}
