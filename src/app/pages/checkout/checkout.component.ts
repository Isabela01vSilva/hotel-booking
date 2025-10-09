import { Component, Input, OnInit } from '@angular/core';
import { ButtonComponent } from '../../_components/button/button.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IRoom } from '../../entity/room.interface';
import { IHotel } from '../../entity/hotel.interface';
import { Store } from '@ngrx/store';
import { hotelsByIdSelector } from '../../entity/state/hotel/hotel.selectors';

@Component({
  selector: 'app-checkout',
  imports: [ButtonComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent implements OnInit {

  hotel$: Observable<IHotel> | undefined;

  @Input() room!: IRoom;
  @Input() hotelId!: number;

  constructor(private router: Router,
    private store: Store,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.hotelId = Number(this.route.snapshot.paramMap.get('id'));
    this.hotel$ = this.store.select(hotelsByIdSelector(this.hotelId));
  }

  pesquisar() {
    this.router.navigate(['/success']);
  }
}
