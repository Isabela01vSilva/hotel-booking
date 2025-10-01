import { ApiServiceService } from './../../services/api-service.service';
import { Component, Injectable } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { debounceTime, map, startWith } from 'rxjs/operators';

// Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { MatOptionModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../_components/button/button.component';

import { Router } from '@angular/router';
import { IHotel } from '../../entity/hotel.interface';

@Component({
  selector: 'app-search-engine',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatIconModule,
    MatOptionModule,
    ButtonComponent
  ],
  templateUrl: './search-engine.component.html',
  styleUrl: './search-engine.component.css',
})
export class SearchEngineComponent {
  constructor(private router: Router, private apiService: ApiServiceService) {

  }

  pesquisar() {
    this.router.navigate(['/search']);
  }

  adultos = 2;
  criancas = 0;

  // Valores temporários enquanto o menu está aberto
  tempAdultos = this.adultos;
  tempCriancas = this.criancas;

  increment(tipo: 'adultos' | 'criancas') {
    if (tipo === 'adultos') {
      this.tempAdultos++;
    } else {
      this.tempCriancas++;
    }
  }

  decrement(tipo: 'adultos' | 'criancas') {
    if (tipo === 'adultos' && this.tempAdultos > 1) {
      this.tempAdultos--;
    } else if (tipo === 'criancas' && this.tempCriancas > 0) {
      this.tempCriancas--;
    }
  }

  applySelection(menuTrigger: MatMenuTrigger) {
  this.adultos = this.tempAdultos;
  this.criancas = this.tempCriancas;
  menuTrigger.closeMenu();
}


  getTotalPessoas(): string {
  const adultosText = `${this.adultos} adulto${this.adultos > 1 ? 's' : ''}`;
  const criancasText = this.criancas > 0
    ? `, ${this.criancas} criança${this.criancas > 1 ? 's' : ''}`
    : '';
  const quartoText = `, 1 Quarto`;

  return adultosText + criancasText + quartoText;
}

}
