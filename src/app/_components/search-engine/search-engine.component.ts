import { CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

// Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
  MatOptionModule,
  provideNativeDateAdapter,
} from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';

// RXJS
import { combineLatest, map, Observable, startWith } from 'rxjs';

// NGRX
import { Store } from '@ngrx/store';

// Components & Interfaces
import { ButtonComponent } from '../../_components/button/button.component';
import { DateInputComponent } from '../input/date-input/date-input.component';
import { GuestInputComponent } from '../input/guest-input/guest-input.component';
import { ISuggestions } from '../../entity/suggestions.interface';
import { ISearchInputData } from '../../entity/search-input-data.interface';
import { suggestionSelector } from '../../entity/state/suggestion/suggestions.selectors';
import { suggestionsActions } from '../../entity/state/suggestion/suggestions.actions';
import { searchInputData } from '../../entity/state/search/search-input-data.selectors';
import { searchInputDataActions } from '../../entity/state/search/search-input-data.actions';

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
    MatAutocompleteModule,
    MatButtonModule,
    MatIconModule,
    MatOptionModule,
    MatDatepickerModule,
    ButtonComponent,
    DateInputComponent,
    GuestInputComponent,
    RouterOutlet,
  ],
  templateUrl: './search-engine.component.html',
  styleUrls: ['./search-engine.component.css'],
})
export class SearchEngineComponent implements OnInit {
  options$!: Observable<ISuggestions[]>;
  filteredOptions$!: Observable<ISuggestions[]>;
  searchInputData$!: Observable<ISearchInputData>;

  form!: FormGroup;
  formSubmetido = false;
  botaoClicado = false;

  today: Date = new Date();
  minSaida: Date | null = null;

  suggestionControl = new FormControl<string | ISuggestions>(
    { id: 0, name: '', region: '', type: '' },
    Validators.required
  );

  constructor(
    private store: Store,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.store.dispatch(suggestionsActions.findSuggestions());
  }

  ngOnInit() {
    this.options$ = this.store.select(suggestionSelector());

    this.form = this.fb.group({
      entrada: [null, Validators.required],
      saida: [null, Validators.required],
      hospedes: [{ adultos: 2, criancas: 0 }],
      suggestion: ['', Validators.required],
    });

    this.form.get('entrada')?.valueChanges.subscribe((entrada: Date | null) => {
      this.minSaida = entrada;
    });

    this.filteredOptions$ = combineLatest([
      this.options$,
      this.form.get('suggestion')!.valueChanges.pipe(startWith('')),
    ]).pipe(
      map(([options, value]) => {
        const searchText =
          typeof value === 'string'
            ? value.toLowerCase()
            : (value?.name || value?.region || '').toLowerCase();

        return options.filter(
          (option) =>
            option.name.toLowerCase().includes(searchText) ||
            option.region.toLowerCase().includes(searchText)
        );
      })
    );

    this.searchInputData$ = this.store.select(searchInputData());
  }

  displayFn(value: string | ISuggestions): string {
    return typeof value === 'string' ? value : value?.name ?? '';
  }

  pesquisar() {
    this.formSubmetido = true;
    this.botaoClicado = true;

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { entrada, saida, hospedes, suggestion } = this.form.value;

    this.store.dispatch(
      searchInputDataActions.saveSearchInputData({
        searchInputData: {
          checkInDate: entrada?.getTime() || 0,
          checkOutDate: saida?.getTime() || 0,
          destinationName: suggestion?.name || '',
          region: suggestion?.region || '',
          guest: {
            adults: hospedes.adultos,
            children: hospedes.criancas,
          },
        },
      })
    );

    this.router.navigate(['/search']);
  }
}
