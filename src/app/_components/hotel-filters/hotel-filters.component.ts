import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-hotel-filters',
  templateUrl: './hotel-filters.component.html',
  styleUrls: ['./hotel-filters.component.css']
})
export class HotelFiltersComponent {
  isOpen = false;
  showPrice = true;
  showStars = true;

  filterForm!: FormGroup;

  stars = [
    { label: '1 estrela', checked: false, count: 28 },
    { label: '2 estrelas', checked: false, count: '99+' },
    { label: '3 estrelas', checked: false, count: '99+' },
    { label: '4 estrelas', checked: false, count: 11 },
    { label: '5 estrelas', checked: false, count: 2 },
    { label: 'Não classificado', checked: false, count: 17 }
  ];

  constructor(private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      hotelName: [''],
      minPrice: [0],
      maxPrice: [1200]
    });
  }

  // Abre/fecha o painel
  toggleFilters() {
    this.isOpen = !this.isOpen;
  }

  // Mostra/oculta o bloco de preço
  togglePrice() {
    this.showPrice = !this.showPrice;
  }

  // Mostra/oculta o bloco de estrelas
  toggleStars() {
    this.showStars = !this.showStars;
  }

  // Limpa todos os filtros
  clearFilters() {
    this.filterForm.reset({
      hotelName: '',
      minPrice: 0,
      maxPrice: 1200
    });
    this.stars.forEach(s => (s.checked = false));
  }
}
