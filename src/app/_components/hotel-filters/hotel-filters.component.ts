import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { map, Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { IHotel } from '../../entity/hotel.interface';
import { hotelsByStarsSelector, hotelsSelector } from '../../entity/state/hotel/hotel.selectors';
import { hotelsActions } from '../../entity/state/hotel/hotel.actions';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hotel-filters',
  templateUrl: './hotel-filters.component.html',
  styleUrls: ['./hotel-filters.component.css'],
  imports: [MatSliderModule, ReactiveFormsModule, CommonModule],
})
export class HotelFiltersComponent implements OnInit {
  hotelStars$!: Observable<Record<number, number>>;

  showFilters = false;
  showPrice = false;
  showStars = false;

  stars = [1, 2, 3, 4, 5];
  selectedStars: number[] = [];

  filterForm: FormGroup;

  constructor(private fb: FormBuilder, private store: Store) {
    this.filterForm = this.fb.group({
      nameHotel: [''],
      minPrice: [0],
      maxPrice: [1200],
    });

    this.hotelStars$ = this.store.select(hotelsByStarsSelector);
  }

  ngOnInit(): void {
    this.store.dispatch(hotelsActions.findHotels());
  }

  toggleFilters(event?: MouseEvent): void {
    event?.stopPropagation();
    this.showFilters = !this.showFilters;
  }

  togglePrice(): void {
    this.showPrice = !this.showPrice;
  }

  toggleStar(): void {
    this.showStars = !this.showStars;
  }

  onStarChange(star: number, event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;

    if (checked) {
      this.selectedStars.push(star);
    } else {
      this.selectedStars = this.selectedStars.filter((s) => s !== star);
    }
  }

  clear(){
    this.filterForm.reset({
    nameHotel: '',
    minPrice: 0,
    maxPrice: 1200,
  });

  // Limpa seleção de estrelas
  this.selectedStars = [];
  }

  @HostListener('document:click')
  onDocumentClick(): void {
    if (this.showFilters) {
      this.showFilters = false;
    }
  }
}
