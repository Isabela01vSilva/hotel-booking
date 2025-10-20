import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  OnInit,
} from '@angular/core';
import { ButtonComponent } from '../../button/button.component';
import { MatMenuTrigger, MatMenu } from '@angular/material/menu';
import { MatFormField } from '@angular/material/form-field';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-guest-input',
  imports: [ButtonComponent, MatFormField, MatMenu, ReactiveFormsModule, MatMenuTrigger],
  templateUrl: './guest-input.component.html',
  styleUrls: ['./guest-input.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GuestInputComponent),
      multi: true,
    },
  ],
})
export class GuestInputComponent implements ControlValueAccessor, OnInit {

  adultos = 2;
  criancas = 0;
  tempAdultos = this.adultos;
  tempCriancas = this.criancas;

  value: { adultos: number, criancas: number} = { adultos: this.adultos, criancas: this.criancas };
  onChange!: (value: { adultos: number, criancas: number}) => void;
  onTouched!: () => void;

  ngOnInit(): void {
    /* this.onValueChange(); */
  }

  writeValue(value: { adultos: number, criancas: number}): void {
    this.value = value;
  }
  registerOnChange(fn: (value: { adultos: number, criancas: number}) => void): void {
    this.onChange = fn;
  };
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  onValueChange() {
    this.value = { adultos: this.adultos, criancas: this.criancas };
    if (this.onChange) {
      this.onChange(this.value);
    }
  }

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

    this.onValueChange();

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
}
