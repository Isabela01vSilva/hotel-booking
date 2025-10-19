import { ChangeDetectionStrategy, Component, forwardRef, Input } from '@angular/core';
import { MatDatepickerInput } from "@angular/material/datepicker";
import { MatDatepickerToggle, MatDatepicker } from "@angular/material/datepicker";
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from "@angular/material/input";

@Component({
  selector: 'app-date-input',
  imports: [MatDatepickerInput, MatDatepickerToggle, MatDatepicker, ReactiveFormsModule, MatInputModule],
  templateUrl: './date-input.component.html',
  styleUrl: './date-input.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateInputComponent),
      multi: true
    }
  ]
})
export class DateInputComponent implements ControlValueAccessor {
  @Input() labelText: string = '';
  @Input() isError: boolean = false;

  value: string = '';
  onChange!: ((value: string) => void);
  onTouched!: () => void;

  onValueChange(eventTarget: EventTarget | null) {
    console.log(this.isError)
    this.value = eventTarget ? (eventTarget as HTMLInputElement).value : ''
    if (this.onChange) {
      this.onChange(this.value);
    }
  }

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}


