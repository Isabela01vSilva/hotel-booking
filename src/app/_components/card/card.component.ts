import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { Router } from '@angular/router';
import { IHotel } from '../../entity/hotel.interface';

@Component({
  selector: 'app-card',
  imports: [ButtonComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent implements OnChanges {
@Input() hotel: IHotel | undefined

hotelName: string = "";
currency: string = "";
hotelMinPrice: number = 0;
stars: number = 0;
arrayIndex = []
image = ""

  constructor(private router: Router) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['hotel'] && this.hotel) {
      this.hotelName = this.hotel.hotel.name;
      this.currency = this.hotel.lowestPrice.currency;
      this.hotelMinPrice = this.hotel.lowestPrice.amount;
      this.stars = this.hotel.hotel.stars;
      this.arrayIndex = Array.from({ length: this.stars });
      this.image = this.hotel.hotel.image
    }
  }

  pesquisar() {
    this.router.navigate(['/hotel']);
  }
}
