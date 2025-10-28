import { Component, Input } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { CurrencyPipe } from '@angular/common';
import { IRoom } from '../../entity/room.interface';

@Component({
  selector: 'app-room-option',
  imports: [ButtonComponent, CurrencyPipe],
  templateUrl: './room-option.component.html',
  styleUrl: './room-option.component.css',
})
export class RoomOptionComponent {

  @Input() hotelId!: number;
  @Input() room!: IRoom;

  constructor(private router: Router, private store: Store) {}

  ngOnInit(): void {}

  search() {
    this.router.navigate(['/checkout', this.hotelId, this.room.roomType.name])
  }
}
