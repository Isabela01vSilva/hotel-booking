import { hotelsSelector } from './../../entity/state/hotel.selectors';
import { SearchEngineComponent } from './../../_components/search-engine/search-engine.component';
import { Component, Input, OnInit } from '@angular/core';
import { CardComponent } from '../../_components/card/card.component';
import { ApiServiceService } from '../../services/api-service.service';
import { IHotel } from '../../entity/hotel.interface';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { hotelsActions } from '../../entity/state/hotel.actions';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CardComponent, AsyncPipe, SearchEngineComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent implements OnInit {

  hotels$: Observable<IHotel[]> | undefined



  constructor(private apiService: ApiServiceService,
    private store: Store) {
  }



  ngOnInit(): void {
    this.store.dispatch(hotelsActions.findHotels())
    this.hotels$ = this.store.select(hotelsSelector)
  }
}
