import { Component } from '@angular/core';
import { ButtonComponent } from "../button/button.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-room-option',
  imports: [ButtonComponent],
  templateUrl: './room-option.component.html',
  styleUrl: './room-option.component.css'
})
export class RoomOptionComponent {
  constructor(private router: Router) {}

  pesquisar() {
    this.router.navigate(['/checkout']);
  }
}
