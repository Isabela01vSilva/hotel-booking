import { Component } from '@angular/core';
import { SearchEngineComponent } from "../../_components/search-engine/search-engine.component";
import { BaseComponent } from "../../_components/base/base.component";
import { RoomOptionComponent } from "../../_components/room-option/room-option.component";

@Component({
  selector: 'app-detail',
  imports: [SearchEngineComponent, BaseComponent, RoomOptionComponent],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class DetailComponent {

}
