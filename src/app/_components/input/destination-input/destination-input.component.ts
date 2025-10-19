import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  Input,
  OnInit,
} from '@angular/core';
import { MatFormField, MatError } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

import { AsyncPipe } from '@angular/common';
import IOption from './IOption';

@Component({
  selector: 'app-destination-input',
  imports: [MatFormField, MatAutocompleteModule, MatError, AsyncPipe],
  templateUrl: './destination-input.component.html',
  styleUrls: ['./destination-input.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DestinationInputComponent),
      multi: true,
    },
  ],
})
export class DestinationInputComponent implements ControlValueAccessor, OnInit {
  @Input() labelText: string = '';
  @Input() isError: boolean = false;
  @Input() suggestionsList!: IOption[];
  suggestionsFiltered: IOption[] = [];


  value: IOption = { id: 0, name: '', region: '' };
  onChange!: (value: IOption) => void;
  onTouched!: () => void;

  constructor() {}
  ngOnInit(): void {
    this.suggestionsFiltered = [...this.suggestionsList];
  }

  onValueChange(option: IOption) {
    if (this.onChange) {
      this.onChange(option);
    }
  }

  inputChanges(value: EventTarget | null) {
    if(value as HTMLInputElement !== null) {
      this.suggestionsFiltered = this.suggestionsList.filter((s) => s.name.toLowerCase().includes(value ? (value as HTMLInputElement).value.toLowerCase() : ''))
    }

    ;
  }

  writeValue(value: IOption): void {
    this.value = value;

    //aqui que coloco a logica da opcao do usuario???
  }

  registerOnChange(fn: (value: IOption) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

}
