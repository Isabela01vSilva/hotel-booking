import { Component } from '@angular/core';
import { SearchEngineComponent } from "../../_components/search-engine/search-engine.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SearchEngineComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {

}
