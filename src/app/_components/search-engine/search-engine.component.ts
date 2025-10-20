import { ISuggestions } from './../../entity/suggestions.interface';
import { searchInputData } from './../../entity/state/search/search-input-data.selectors';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
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
import { combineLatest, filter, map, Observable, startWith } from 'rxjs';

// NGRX
import { Store } from '@ngrx/store';

// Interfaces & Components
import { ButtonComponent } from '../../_components/button/button.component';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { searchInputDataActions } from '../../entity/state/search/search-input-data.actions';
import { ISearchInputData } from '../../entity/search-input-data.interface';
import { DateInputComponent } from '../input/date-input/date-input.component';
import { GuestInputComponent } from '../input/guest-input/guest-input.component';
import { suggestionSelector } from '../../entity/state/suggestion/suggestions.selectors';
import { suggestionsActions } from '../../entity/state/suggestion/suggestions.actions';

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
    DateInputComponent,
    GuestInputComponent,
  ],
  templateUrl: './search-engine.component.html',
  styleUrls: ['./search-engine.component.css'],
})
export class SearchEngineComponent implements OnInit {
  /*
  (1) Agora tenho que passar a quantidade de adultos e crianças
  data entrada e data saida tmb, na page de checkout

  (2) Criar função de erro dos inputs, não passar para a proxima tela

  (5) Limpar esse type

   */

  options$: Observable<ISuggestions[]> | undefined;

  filteredOptions$: Observable<ISuggestions[]> | undefined;
  suggestionControl = new FormControl<string | ISuggestions>(
    {
      id: 0,
      name: '',
      region: '',
      type: '',
    },
    Validators.required
  );

  form!: FormGroup;
  formSubmetido = false;

  today: Date = new Date();
  minSaida: Date | null = null;

  searchInputData$!: Observable<ISearchInputData>;

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
      hospedes: [{ adultos: 2, criancas: 0 }, [Validators.required]],
    });

    this.form.get('entrada')?.valueChanges.subscribe((entrada: Date | null) => {
      this.minSaida = entrada;
    });

    this.form.addControl('suggestions', this.suggestionControl);

    this.filteredOptions$ = combineLatest([
      this.options$,
      this.suggestionControl.valueChanges.pipe(startWith('')),
    ]).pipe(
      map(([options, value]) => {
        const filterValue =
          typeof value === 'string'
            ? value.toLowerCase()
            : value?.name.toLowerCase() || '';

        const regionFilter =
          typeof value === 'string'
            ? value.toLowerCase()
            : value?.region.toLowerCase() || '';

        return options.filter(
          (option) =>
            option.name.toLowerCase().includes(filterValue) ||
            option.name.toLowerCase().includes(regionFilter)
        );
      })
    );

    this.searchInputData$ = this.store.select(searchInputData());

    this.searchInputData$.subscribe((data) => {
      console.log(data);
    });
  }

  displayFn(suggestion: ISuggestions): string {
    return suggestion && suggestion.name ? suggestion.name : '';
  }

  pesquisar() {
    this.formSubmetido = true;

    const entrada = this.form.value.entrada;
    const saida = this.form.value.saida;
    const name = this.form.value.suggestions.name;
    const region = this.form.value.suggestions.region;
    const guest = this.form.value.hospedes;

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.store.dispatch(
      searchInputDataActions.saveSearchInputData({
        searchInputData: {
          dataentra: entrada ? entrada.getTime() : '',
          datasaida: saida ? saida.getTime() : '',
          destinationName: name + '',
          region: region + '',
          qtdpessoas: guest,
        },
      })
    );

    this.router.navigate(['/search']);
  }
}
