import { Actions, createEffect, ofType } from '@ngrx/effects';
import { inject } from '@angular/core';
import { IHotel } from '../../hotel.interface';
import { hotelsActions } from './hotel.actions';
import { map, switchMap, tap } from 'rxjs';
import { ApiServiceService } from '../../../services/api-service.service';

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
