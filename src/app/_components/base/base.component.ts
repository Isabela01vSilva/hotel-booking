import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "../footer/footer.component";
import { HeaderComponent } from "../header/header.component";

@Component({
  selector: 'app-base',
  imports: [RouterOutlet, FooterComponent, HeaderComponent],
  templateUrl: './base.component.html',
  styleUrl: './base.component.css'
})
export class BaseComponent implements OnInit {

  constructor (){}
  ngOnInit(): void {
    console.log("criou uma vez")
  }

}
