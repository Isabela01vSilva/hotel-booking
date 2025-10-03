import { Component } from '@angular/core';
import { ButtonComponent } from '../../_components/button/button.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  imports: [ButtonComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent {
  constructor(private router: Router) {}

  pesquisar() {
    this.router.navigate(['/success']);
  }
}
