import { Component, Input } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { SearchEngineComponent } from "../search-engine/search-engine.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  imports: [ButtonComponent, SearchEngineComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {

  constructor(private router: Router) {}

  pesquisar() {
    this.router.navigate(['/hotel']);
  }
}
