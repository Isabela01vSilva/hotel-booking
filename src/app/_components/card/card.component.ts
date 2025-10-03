import { IHotel } from './../../entity/hotel.interface';
import { Observable } from 'rxjs';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { Router } from '@angular/router';
import { State, Store } from '@ngrx/store';
import { hotelsByIdSelector } from '../../entity/state/hotel.selectors';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-card',
  imports: [ButtonComponent, AsyncPipe],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent implements OnChanges, OnInit {
  @Input() hotelId!: number;

  @Input() hotel: IHotel | undefined;

  hotelName: string = '';
  currency: string = '';
  hotelMinPrice: number = 0;
  stars: number = 0;
  arrayIndex = [];
  image = '';
  hotel$: Observable<IHotel> | undefined;

  constructor(private router: Router, private store: Store) {}

  ngOnInit(): void {
    this.hotel$ = this.store.select(hotelsByIdSelector(this.hotelId));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['hotel'] && this.hotel) {
      this.hotelName = this.hotel.hotel.name;
      this.currency = this.hotel.lowestPrice.currency;
      this.hotelMinPrice = this.hotel.lowestPrice.amount;
      this.stars = this.hotel.hotel.stars;
      this.arrayIndex = Array.from({ length: this.stars });
      this.image = this.hotel.hotel.image;
    }
  }

  pesquisar() {
    this.router.navigate(['/hotel']);
  }
}
