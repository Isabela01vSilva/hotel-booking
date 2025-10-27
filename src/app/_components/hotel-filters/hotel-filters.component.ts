import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { hotelsByStarsSelector } from '../../entity/state/hotel/hotel.selectors';
import { hotelsActions } from '../../entity/state/hotel/hotel.actions';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hotel-filters',
  templateUrl: './hotel-filters.component.html',
  styleUrls: ['./hotel-filters.component.css'],
  imports: [MatSliderModule, ReactiveFormsModule, CommonModule],
})
export class HotelFiltersComponent implements OnInit {

  hotelStars$!: Observable<[number, number][]>;

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

  toggles: Record<string, boolean> = {
    filters: false,
    price: true,
    stars: true,
  };

  toggle(section: string, event?: MouseEvent): void {
    event?.stopPropagation();
    this.toggles[section] = !this.toggles[section];
  }

  isOpen(section: string): boolean {
    return !!this.toggles[section];
  }

  getToggleIcon(section: string): string {
    return this.isOpen(section) ? 'ph ph-caret-down' : 'ph ph-caret-up';
  }

  clear() {
    this.filterForm.reset({
      nameHotel: '',
      minPrice: 0,
      maxPrice: 1200,
    });

    const checkboxes = document.querySelectorAll(
      '.checkout-list input[type="checkbox"]'
    );
    checkboxes.forEach((checkbox: any) => (checkbox.checked = false));
  }

  @HostListener('document:click')
  onDocumentClick(): void {
    if (this.isOpen('filters')) {
      this.toggles['filters'] = false;
    }
  }
}
