import { hotelsSelector } from './../../entity/state/hotel/hotel.selectors';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CardComponent } from '../../_components/card/card.component';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { hotelsActions } from '../../entity/state/hotel/hotel.actions';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CardComponent, AsyncPipe],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent implements OnInit {

  hotelIds$: Observable<number[]> | undefined

  @Output() deactivate = new EventEmitter<void>();

  constructor(
    private store: Store) {
  }

  ngOnInit(): void {
    this.store.dispatch(hotelsActions.findHotels())
    this.hotelIds$ = this.store.select(hotelsSelector)
    this.deactivate.emit
  }
}

