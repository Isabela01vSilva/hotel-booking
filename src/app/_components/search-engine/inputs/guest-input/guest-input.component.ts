import { ChangeDetectionStrategy, Component, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatMenuTrigger, MatMenuModule } from '@angular/material/menu';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { ButtonComponent } from '../../../button/button.component';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-guest-input',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatButtonModule,
    MatInputModule,
    ButtonComponent,

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './guest-input.component.html',
  styleUrls: ['./guest-input.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GuestInputComponent),
      multi: true,
    },
  ],
})
export class GuestInputComponent implements ControlValueAccessor {
  adults = 2;
  children = 0;

  adultsCount = this.adults;
  childrenCount = this.children;

  value: { adults: number; children: number } = {
    adults: this.adults,
    children: this.children,
  };

  onChange!: (value: { adults: number; children: number }) => void;
  onTouched!: () => void;

  writeValue(value: { adults: number; children: number }): void {
    this.value = value;
  }

  registerOnChange(
    fn: (value: { adults: number; children: number }) => void
  ): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  onValueChange() {
    this.value = { adults: this.adults, children: this.children };
    if (this.onChange) {
      this.onChange(this.value);
    }
  }

  increment(type: 'adults' | 'children'): void {
    if (type === 'adults') {
      this.adultsCount++;
    } else {
      this.childrenCount++;
    }
  }

  decrement(type: 'adults' | 'children'): void {
    if (type === 'adults' && this.adultsCount > 1) {
      this.adultsCount--;
    } else if (type === 'children' && this.childrenCount > 0) {
      this.childrenCount--;
    }
  }

  applySelection(menuTrigger: MatMenuTrigger): void {
    this.adults = this.adultsCount;
    this.children = this.childrenCount;

    this.onValueChange();
    menuTrigger.closeMenu();
  }

  getTotalGuests(): string {
    const adultsText = `${this.adults} Adulto${this.adults > 1 ? 's' : ''}`;
    const childrenText =
      this.children > 0
        ? `, ${this.children} Criança${this.children > 1 ? 's' : ''}`
        : '';
    const roomText = `, 1 Quarto`;
    return adultsText + childrenText + roomText;
  }
}
