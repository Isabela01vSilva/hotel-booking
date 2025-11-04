import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  Input,
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {
  MatDatepickerInputEvent,
  MatDatepickerModule,
} from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-date-input',
  standalone: true,
  imports: [MatInputModule, MatDatepickerModule, ReactiveFormsModule, MatNativeDateModule],
  templateUrl: './date-input.component.html',
  styleUrls: ['./date-input.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    provideNativeDateAdapter(),
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateInputComponent),
      multi: true,
    },
  ],
})
export class DateInputComponent implements ControlValueAccessor {
  @Input() labelText: string = '';

  @Input() minDate: Date = new Date();

  value: Date | null = null;

  onChange!: (value: Date | null) => void;
  onTouched!: () => void;

  onValueChange(event: MatDatepickerInputEvent<Date>) {
    const date = event.value ?? null;
    this.value = date;
    this.onChange?.(date);
  }

  writeValue(value: Date): void {
    this.value = value;
  }

  registerOnChange(fn: (value: Date | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}
