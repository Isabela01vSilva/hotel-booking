import { Component } from '@angular/core';
import { SearchEngineComponent } from '../../_components/search-engine/search-engine.component';
import { CardComponent } from '../../_components/card/card.component';

@Component({
  selector: 'app-search',
  imports: [SearchEngineComponent, CardComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent {
  cardsArray = new Array(12);
}
