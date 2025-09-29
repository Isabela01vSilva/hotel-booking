import { Component } from '@angular/core';
import { ButtonComponent } from '../../_components/button/button.component';
import { SearchEngineComponent } from '../../_components/search-engine/search-engine.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  imports: [ButtonComponent, SearchEngineComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent {
  constructor(private router: Router) {}

  pesquisar() {
    this.router.navigate(['/success']);
  }
}
