import { IHotel } from './../../entity/hotel.interface';
import { Observable } from 'rxjs';
import {
  Component,
  Input,
  OnInit
} from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { hotelsByIdSelector } from '../../entity/state/hotel/hotel.selectors';
import { AsyncPipe } from '@angular/common';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  imports: [ButtonComponent, AsyncPipe, CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent implements OnInit {

  @Input() hotelId!: number;

  hotel$: Observable<IHotel> | undefined;

  constructor(private router: Router, private store: Store) {}

  getStarsArray(n: number | undefined): number[] {
    if (n === undefined || n <= 0) {
      return [];
    }
    return new Array(n).fill(0);
  }

  ngOnInit(): void {
    this.hotel$ = this.store.select(hotelsByIdSelector(this.hotelId));
  }

  search() {
    this.router.navigate(['/hotel', this.hotelId]);
  }
}
