import { hotelsSelector } from './../../entity/state/hotel/hotel.selectors';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CardComponent } from '../../_components/card/card.component';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { hotelsActions } from '../../entity/state/hotel/hotel.actions';
import { ActivatedRoute } from '@angular/router';
import { HotelFiltersComponent } from "../../_components/hotel-filters/hotel-filters.component";
import { ReactiveFormsModule } from '@angular/forms';
import { ISearchInputData } from '../../entity/search-input-data.interface';
import { searchInputData } from '../../entity/state/search/search-input-data.selectors';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CardComponent, AsyncPipe, HotelFiltersComponent, ReactiveFormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent implements OnInit {

  hotelIds$: Observable<number[]> | undefined;
  searchInputData$!: Observable<ISearchInputData> | undefined;

  @Output() deactivate = new EventEmitter<void>();

  sugestionName = "";
  sugestionRegion = "";

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(hotelsActions.findHotels());
    this.hotelIds$ = this.store.select(hotelsSelector);

    this.searchInputData$ = this.store.select(
      searchInputData()
    )
  }
}
