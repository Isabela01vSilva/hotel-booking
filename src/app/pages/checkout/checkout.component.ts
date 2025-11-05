import { searchInputData } from './../../entity/state/search/search-input-data.selectors';
import { Component, OnInit } from '@angular/core';
import { ButtonComponent } from '../../_components/button/button.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IRoom } from '../../entity/room.interface';
import { IHotel } from '../../entity/hotel.interface';
import { Store } from '@ngrx/store';
import { hotelsByIdSelector } from '../../entity/state/hotel/hotel.selectors';
import { AsyncPipe, CommonModule, CurrencyPipe } from '@angular/common';
import { ISearchInputData } from '../../entity/search-input-data.interface';

import {
  ɵInternalFormsSharedModule,
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
  FormArray,
  AbstractControl,
} from '@angular/forms';
import { ICheckoutData } from '../../entity/checkout-data.interface';
import { checkoutDataActions } from '../../entity/state/checkout/checkout-data.actions';

@Component({
  selector: 'app-checkout',
  imports: [
    CommonModule,
    ButtonComponent,
    AsyncPipe,
    CurrencyPipe,
    ɵInternalFormsSharedModule,
    ReactiveFormsModule,
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent implements OnInit {
  hotel$: Observable<IHotel> | undefined;
  searchInputData$!: Observable<ISearchInputData>;

  roomName: string = '';
  hotelId: number = 0;

  checkoutForm!: FormGroup;
  btnClicked = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private store: Store,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.hotelId = Number(this.route.snapshot.paramMap.get('hotelId'));
    this.roomName = this.route.snapshot.paramMap.get('roomName') as string;

    this.hotel$ = this.store.select(hotelsByIdSelector(this.hotelId));
    this.searchInputData$ = this.store.select(searchInputData());

    this.checkoutForm = this.fb.group({
      guests: this.fb.array([]),
      contactName: ['', Validators.required],
      contactEmail: ['', [Validators.required, Validators.email]],
      contactPhone: [
        '',
        [
          Validators.required,
          Validators.pattern(/^\s*\(?\d{2}\)?\s*\d{4,5}\s*-?\s*\d{4}\s*$/),
        ],
      ],
      notes: [''],
    });

    this.searchInputData$.subscribe((searchInfo) => {
      if (!searchInfo) return;
      const totalGuests  =
        (searchInfo.guest.adults ?? 0) + (searchInfo.guest.children ?? 0);
      this.setGuests(totalGuests);
    });
  }

  get guests(): FormArray<FormGroup> {
    return this.checkoutForm.get('guests') as FormArray<FormGroup>;
  }

  private createGuest(): FormGroup {
    return this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
    });
  }

  private setGuests(totalGuests: number): void {
    this.guests.clear();
    Array.from({ length: totalGuests }, () =>
      this.guests.push(this.createGuest())
    );
  }

  submitForm() {
    this.btnClicked = true;

    if (this.checkoutForm.valid) {
      const guests = this.guests.value.map((g: any) => ({
        name: g.firstName,
        lastname: g.lastName,
      }));

      const checkoutData: ICheckoutData = {
        contactName: this.checkoutForm.value.contactName,
        contactEmail: this.checkoutForm.value.contactEmail,
        contactPhone: this.checkoutForm.value.contactPhone,
        guests,
      };

      this.store.dispatch(
        checkoutDataActions.saveCheckoutData({ checkoutData, hotelId: this.hotelId })
      );

      this.router.navigate(['/success']);
    }
  }

  getRoomByName(hotel: IHotel, roomName: string): IRoom {
    return hotel.rooms.find((room) => room.roomType.name === roomName) as IRoom;
  }

  calculateStayDays(data: any): number {
    if (!data?.checkInDate || !data?.checkOutDate) return 0;

    const checkIn = new Date(data.checkInDate);
    const checkOut = new Date(data.checkOutDate);

    const diffTime = checkOut.getTime() - checkIn.getTime();
    const diffDays = diffTime / (1000 * 60 * 60 * 24);

    return diffDays > 0 ? diffDays : 1;
  }

  isInvalid(control: AbstractControl | null): boolean {
    return !!(this.btnClicked && control?.invalid);
  }

  hasError(controlName: string, error: string): boolean {
    const control = this.checkoutForm.get(controlName);
    return !!(this.btnClicked && control?.hasError(error));
  }
}
