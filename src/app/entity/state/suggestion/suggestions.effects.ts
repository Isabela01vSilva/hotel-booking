import { Actions, createEffect, ofType } from '@ngrx/effects';
import { inject } from '@angular/core';
import { map, switchMap, tap } from 'rxjs';
import { ApiServiceService } from '../../../services/api-service.service';
import { suggestionsActions } from './suggestions.actions';
import { ISuggestions } from '../../suggestions.interface';

export const findSuggestionEffect = createEffect(
  (actions$ = inject(Actions), apiService = inject(ApiServiceService)) => {
    return actions$.pipe(
      ofType(suggestionsActions.findSuggestions),
      tap(() => console.log('Suggestion Passou pelo Effect')),
      switchMap(() =>
        apiService
          .get<ISuggestions[]>('suggestions')
          .pipe(
            map((suggestions) => suggestionsActions.findSuggestionsSuccess({ suggestions: suggestions }))
          )
      )
    );
  },
  { functional: true }
);
