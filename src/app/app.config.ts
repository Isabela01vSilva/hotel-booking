import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideState, provideStore } from '@ngrx/store';
import { appReducers } from './state/app.reducers';
import { provideEffects } from '@ngrx/effects';
import { findHotelsEffect } from './entity/state/hotel/hotel.effects';
import { hotelReducer } from './entity/state/hotel/hotel.reducer';
import { findSuggestionEffect } from './entity/state/suggestion/suggestions.effects';
import { suggestionsReducer } from './entity/state/suggestion/suggestions.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), // Angular 15+ forma moderna,,
    provideStore(appReducers),
    provideEffects({ findHotelsEffect, findSuggestionEffect }),
    provideState({ name: 'hotels', reducer: hotelReducer }),
    provideState({ name: 'suggestions', reducer: suggestionsReducer }),
]
};
