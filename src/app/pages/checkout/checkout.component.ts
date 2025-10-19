import { searchInputData } from './../../entity/state/search/search-input-data.selectors';
import { Component, OnInit } from '@angular/core';
import { ButtonComponent } from '../../_components/button/button.component';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom, Observable } from 'rxjs';
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
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';

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
  botaoClicado = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private store: Store,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.hotelId = Number(this.route.snapshot.paramMap.get('hotelId'));
    this.roomName = this.route.snapshot.paramMap.get('roomName') as string;
    console.log('Hotel ID:', this.hotelId);
    this.hotel$ = this.store.select(hotelsByIdSelector(this.hotelId));
    this.searchInputData$ = this.store.select(searchInputData());

    this.checkoutForm = this.fb.group({
      nomeHospede: ['', Validators.required],
      sobrenomeHospede: ['', Validators.required],
      nomeContato: ['', Validators.required],
      emailContato: ['', [Validators.required]],
      telefoneContato: ['', Validators.required],
      observacoes: [''],
    });
  }

  pesquisar() {
    this.botaoClicado = true;

    if (this.checkoutForm.valid) {
      const formatData = {
        nomeHotel: this.hotelId,
        nomeHospede: this.checkoutForm.value.nomeHospede,
        sobrenomeHospede: this.checkoutForm.value.sobrenomeHospede,
        nomeContato: this.checkoutForm.value.nomeContato,
        emailContato: this.checkoutForm.value.emailContato,
        telefoneContato: this.checkoutForm.value.telefoneContato,
      };

      this.router.navigate(['/success'], {
        state: { formData: formatData },
      });
    }
  }

  getRoomByName(hotel: IHotel, roomName: string): IRoom {
    return hotel.rooms.find((room) => room.roomType.name === roomName) as IRoom;
  }
}
