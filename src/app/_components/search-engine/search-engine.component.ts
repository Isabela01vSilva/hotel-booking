import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

// Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';

// RXJS
import { Observable, combineLatest } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

// NGRX
import { Store } from '@ngrx/store';
import { suggestionsActions } from '../../entity/state/suggestion/suggestions.actions';
import { suggestionsSelector } from '../../entity/state/suggestion/suggestions.selectors';

// Interfaces & Components
import { ISuggestions } from '../../entity/suggestions.interface';
import { ButtonComponent } from '../../_components/button/button.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HomeComponent } from '../../pages/home/home.component';

@Component({
  selector: 'app-search-engine',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideNativeDateAdapter()],
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
    MatDatepickerModule,
    ButtonComponent,
    RouterLink,
    RouterOutlet,
  ],
  templateUrl: './search-engine.component.html',
  styleUrl: './search-engine.component.css',
})
export class SearchEngineComponent implements OnInit {
  // ==============================
  // AUTOCOMPLETE - DESTINATÁRIO
  // ==============================

  trackById(index: number, item: ISuggestions): number {
    return item.id;
  }

  myControl = new FormControl<string | ISuggestions>('');
  filteredOptions$!: Observable<ISuggestions[]>;

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(suggestionsActions.findSuggestions());

    this.filteredOptions$ = combineLatest([
      this.myControl.valueChanges.pipe(startWith('')),
      this.store.select(suggestionsSelector),
    ]).pipe(
      map(([value, suggestions]) => {
      const nome = typeof value === 'string' ? value : value?.name;
      return nome && nome.length > 0
        ? this._filterSuggestions(suggestions, nome)
        : [];
      })
    );
  }

  displayFn(suggestion: ISuggestions): string {
    return suggestion?.name ?? '';
  }

  private _filterSuggestions(
    suggestions: ISuggestions[],
    nome: string
  ): ISuggestions[] {
    const filterValue = nome.toLowerCase();
    return suggestions.filter((s) =>
      s.name.toLowerCase().includes(filterValue)
    );
  }

  // ==============================
  // HÓSPEDES - ADULTOS E CRIANÇAS
  // ==============================

  adultos = 2;
  criancas = 0;
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
    const criancasText =
      this.criancas > 0
        ? `, ${this.criancas} criança${this.criancas > 1 ? 's' : ''}`
        : '';
    const quartoText = `, 1 Quarto`;
    return adultosText + criancasText + quartoText;
  }

  // ==============================
  // LÓGICA DE ATIVAÇÃO
  // ==============================

  propriedadeHabilitada = true;

  onActivate(component: any) {
    this.propriedadeHabilitada = component instanceof HomeComponent;
    console.log('habilitou: ' + this.propriedadeHabilitada);
  }

  onDeactivate(component: any) {
    // Limpar estado ou resetar variáveis se necessário
  }
}
