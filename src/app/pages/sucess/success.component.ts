import { checkoutData } from './../../entity/state/checkout/checkout-data.selectors';
import { Component, OnInit } from '@angular/core';
import { IHotel } from '../../entity/hotel.interface';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { ICheckoutData } from '../../entity/checkout-data.interface';
import { Store } from '@ngrx/store';
import { hotelsByIdSelector } from '../../entity/state/hotel/hotel.selectors';

@Component({
  selector: 'app-sucess',
  imports: [AsyncPipe],
  templateUrl: './success.component.html',
  styleUrl: './success.component.css',
})
export class SucessComponent implements OnInit {
  checkoutData$!: Observable<ICheckoutData>;
  hotel$!: Observable<IHotel>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.checkoutData$ = this.store.select(checkoutData());
    this.checkoutData$.subscribe((data) => {
      console.log('Dados de checkout recebidos:', data);
    });

    this.hotel$ = this.store.select((state: any) => {
      const id = state.checkoutData?.hotelId!;
      return hotelsByIdSelector(id)(state)!;
    });
  }
}
