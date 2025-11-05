import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DateInputComponent } from './inputs/date-input/date-input.component';
import { DestinationInputComponent } from './inputs/destination-input/destination-input.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Router, RouterOutlet } from '@angular/router';
import { SharedService } from '../../services/shared.service';
import { ISearchInputData } from '../../entity/search-input-data.interface';
import { searchInputData } from '../../entity/state/search/search-input-data.selectors';
import { searchInputDataActions } from '../../entity/state/search/search-input-data.actions';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from '../button/button.component';
import { CommonModule, NgClass } from '@angular/common';
import { GuestInputComponent } from './inputs/guest-input/guest-input.component';

@Component({
  selector: 'app-search-engine',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,

  imports: [
    CommonModule,
    DestinationInputComponent,
    DateInputComponent,
    ReactiveFormsModule,
    RouterOutlet,
    ButtonComponent,
    NgClass,
    GuestInputComponent,
  ],
  templateUrl: './search-engine.component.html',
  styleUrls: ['./search-engine.component.css'],
  providers: [],
})
export class SearchEngineComponent implements OnInit {
  searchInputData$!: Observable<ISearchInputData>;

  form!: FormGroup;
  formSubmitted = false;
  buttonClicked = false;

  hasError = false;

  $isReversed: Observable<boolean> | undefined;

  constructor(
    private store: Store,
    private fb: FormBuilder,
    private router: Router,
    private shared: SharedService
  ) {
    this.$isReversed = shared.initialized$;
  }

  ngOnInit() {
    this.form = this.fb.group(
      {
        checkIn: [null, Validators.required],
        checkOut: [null, Validators.required],
        guests: [{ adults: 2, children: 0 }],
        destination: ['', Validators.required],
      },
      { validators: this.dateRangeValidator }
    );

    this.form.valueChanges.subscribe(() => {
      if (this.form.valid) {
        this.hasError = false;
      }
    });

    this.searchInputData$ = this.store.select(searchInputData());
  }

  dateRangeValidator(formGroup: FormGroup) {
    const checkIn = formGroup.get('checkIn')?.value;
    const checkOut = formGroup.get('checkOut')?.value;

    if (checkIn && checkOut && checkOut <= checkIn) {
      return { invalidDateRange: true };
    }

    return null;
  }

  search() {
    this.formSubmitted = true;
    this.buttonClicked = true;

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.hasError = true;
      return;
    }

    const { checkIn, checkOut, guests, destination } = this.form.value;

    this.store.dispatch(
      searchInputDataActions.saveSearchInputData({
        searchInputData: {
          checkInDate: checkIn?.getTime() || 0,
          checkOutDate: checkOut?.getTime() || 0,
          destinationName: destination?.name || '',
          region: destination?.region || '',
          guest: {
            adults: guests.adults,
            children: guests.children,
          },
        },
      })
    );

    this.router.navigate(['/search']);
  }
}
