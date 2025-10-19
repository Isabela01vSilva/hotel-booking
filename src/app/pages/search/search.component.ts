import { hotelsSelector } from './../../entity/state/hotel/hotel.selectors';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CardComponent } from '../../_components/card/card.component';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { hotelsActions } from '../../entity/state/hotel/hotel.actions';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CardComponent, AsyncPipe],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent implements OnInit {
  hotelIds$: Observable<number[]> | undefined;

  @Output() deactivate = new EventEmitter<void>();

  sugestionName = "";
  sugestionRegion = "";

  constructor(private store: Store, private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.store.dispatch(hotelsActions.findHotels());
    this.hotelIds$ = this.store.select(hotelsSelector);
    this.deactivate.emit;

    this.sugestionName = this.route.snapshot.queryParamMap.get('sugestionName') ?? '';
    this.sugestionRegion = this.route.snapshot.queryParamMap.get('sugestionRegion') ?? '';

  }
}
