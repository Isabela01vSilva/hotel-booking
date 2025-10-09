import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RoomOptionComponent } from '../../_components/room-option/room-option.component';
import { Observable } from 'rxjs';

import { IHotel } from '../../entity/hotel.interface';
import { Store } from '@ngrx/store';
import { hotelsByIdSelector } from '../../entity/state/hotel/hotel.selectors';

import { ActivatedRoute } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { IRoom } from '../../entity/room.interface';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
  imports: [RoomOptionComponent, AsyncPipe]
})
export class DetailComponent implements OnInit {

  hotel$: Observable<IHotel> | undefined;

  @Input() room!: IRoom;
  @Input() hotelId!: number;

  @Output() deactivate = new EventEmitter<void>();

  constructor(private route: ActivatedRoute, private store: Store) {}

  ngOnInit(): void {
    this.deactivate.emit;
    this.hotelId = Number(this.route.snapshot.paramMap.get('id'));
    this.hotel$ = this.store.select(hotelsByIdSelector(this.hotelId));
  }

  getStarsArray(n: number | undefined): number[] {
    if (n === undefined || n <= 0) {
      return [];
    }
    return new Array(n).fill(0);
  }
}
