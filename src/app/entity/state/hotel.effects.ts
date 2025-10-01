import { Actions, createEffect, ofType } from '@ngrx/effects';
import { hotelsSelector } from './hotel.selectors';
import { inject } from '@angular/core';
import { ApiServiceService } from '../../services/api-service.service';
import { hotelsActions } from './hotel.actions';
import { map, switchMap, tap } from 'rxjs';
import { IHotel } from '../hotel.interface';

export const findHotelsEffect = createEffect(
  (actions$ = inject(Actions), apiService = inject(ApiServiceService)) => {
    return actions$.pipe(
      ofType(hotelsActions.findHotels),
      tap(() => console.log('Passou pelo Effect')),
      switchMap(() =>
        apiService
          .get<IHotel[]>('hotels')
          .pipe(
            map((hotels) => hotelsActions.findHotelsSuccess({ hotels: hotels }))
          )
      )
    );
  },
  { functional: true }
);
