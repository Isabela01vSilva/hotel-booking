import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sucess',
  imports: [],
  templateUrl: './sucess.component.html',
  styleUrl: './sucess.component.css',
})
export class SucessComponent implements OnInit {

  checkoutData: any;

  ngOnInit() {
    const nav = history.state;
    this.checkoutData = nav.formData;
  }
}
