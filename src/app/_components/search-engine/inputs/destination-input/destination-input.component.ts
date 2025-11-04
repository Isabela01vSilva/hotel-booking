import {
  Component,
  forwardRef,
  Input,
  OnInit,
} from '@angular/core';
import { ISuggestions } from '../../../../entity/suggestions.interface';
import { combineLatest, map, Observable, startWith, Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { suggestionsActions } from '../../../../entity/state/suggestion/suggestions.actions';
import { suggestionSelector } from '../../../../entity/state/suggestion/suggestions.selectors';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { AsyncPipe, CommonModule } from '@angular/common';

import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-destination-input',
  standalone: true,
  imports: [
    MatAutocompleteModule,
    AsyncPipe,
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './destination-input.component.html',
  styleUrls: ['./destination-input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DestinationInputComponent),
      multi: true,
    },
  ],
})
export class DestinationInputComponent implements OnInit, ControlValueAccessor {
  @Input() labelText: string = '';

  inputValue: string = '';
  options$!: Observable<ISuggestions[]>;
  filteredOptions$!: Observable<ISuggestions[]>;
  private inputChange$ = new Subject<string>();

  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  constructor(private store: Store) {
    this.store.dispatch(suggestionsActions.findSuggestions());
  }

  ngOnInit() {
    this.options$ = this.store.select(suggestionSelector());

    this.filteredOptions$ = combineLatest([
      this.options$,
      this.inputChange$.pipe(startWith('')),
    ]).pipe(
      map(([options, value]) => {
        const searchText = value.toLowerCase();
        return options.filter(
          (option) =>
            option.name.toLowerCase().includes(searchText) ||
            option.region.toLowerCase().includes(searchText)
        );
      })
    );
  }

  onValueChange($event: any) {
    this.onInputChange($event);
    if (this.onChange) {
      this.onChange(this.inputValue);
    }
  }

  onInputChange(event: InputEvent) {
    const input = event.target as HTMLInputElement;
    const value = input.value;
    this.inputValue = value;

    this.inputChange$.next(value);
    this.onChange(value);
  }

  onOptionSelected(option: ISuggestions) {
    this.inputValue = option.name;
    this.onChange(option);
  }

  displayFn(value: string | ISuggestions): string {
    return typeof value === 'string' ? value : value?.name ?? '';
  }

  writeValue(value: any): void {
    if (value) {
      this.inputValue = typeof value === 'string' ? value : value.name ?? '';
    } else {
      this.inputValue = '';
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
