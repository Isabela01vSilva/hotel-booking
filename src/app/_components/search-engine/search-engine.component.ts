import { searchInputData } from './../../entity/state/search/search-input-data.selectors';
import { ISuggestions } from './../../entity/suggestions.interface';
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
import { Observable, combineLatest } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

// NGRX
import { Store } from '@ngrx/store';
import { suggestionsActions } from '../../entity/state/suggestion/suggestions.actions';
import { suggestionsSelector } from '../../entity/state/suggestion/suggestions.selectors';

// Interfaces & Components
import { ButtonComponent } from '../../_components/button/button.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HomeComponent } from '../../pages/home/home.component';
import { searchInputDataActions } from '../../entity/state/search/search-input-data.actions';
import { ISearchInputData } from '../../entity/search-input-data.interface';
import { DateInputComponent } from "../input/date-input/date-input.component";
import IOption from '../input/destination-input/IOption';
import { DestinationInputComponent } from '../input/destination-input/destination-input.component';

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
    DestinationInputComponent
],
  templateUrl: './search-engine.component.html',
  styleUrls: ['./search-engine.component.css'],
})
export class SearchEngineComponent implements OnInit {
  /// ==============================
  // NGRX - SALVAR DADOS DE PESQUISA
  // ==============================

  form!: FormGroup;
  searchInputData$!: Observable<ISearchInputData>;

  formSubmetido = false;

  constructor(private store: Store, private fb: FormBuilder) {}

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

    this.form = this.fb.group({
      destino: [null, Validators.required],
      entrada: [null, Validators.required],
      saida: [null, Validators.required],
    });

    this.searchInputData$ = this.store.select(searchInputData());

    this.searchInputData$.subscribe((data) => {
      console.log(data);
    });
  }

  pesquisar() {

    this.formSubmetido = true;

    const entrada = this.form.value.entrada;
    const saida = this.form.value.saida;

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.store.dispatch(
      searchInputDataActions.saveSearchInputData({
        searchInputData: {
          dataentra: entrada ? entrada.getTime() : '',
          datasaida: saida ? saida.getTime() : '',
        },
      })
    );
  }

  // ==============================
  // AUTOCOMPLETE - DESTINATÁRIO
  // ==============================

  trackById(index: number, item: ISuggestions): number {
    return item.id;
  }

  myControl = new FormControl<ISuggestions>({
    id: 0,
    name: '',
    region: '',
    type: '',
  });

  filteredOptions$!: Observable<ISuggestions[]>;

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


get su() : Observable<IOption[]> {
  return this.filteredOptions$.pipe(
    map(options => options.map(fo => ({
      id: fo.id,
      name: fo.name,
      region: fo.region
    })))
  );
}


  // ==============================
  // LÓGICA DE ATIVAÇÃO
  // ==============================

  propriedadeHabilitada = true;

  onActivate(component: any) {
    this.propriedadeHabilitada = component instanceof HomeComponent;
    console.log('habilitou: ' + this.propriedadeHabilitada);
  }
}
