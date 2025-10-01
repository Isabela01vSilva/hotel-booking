import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { appProviders } from '../app/app.providers'
import { provideHttpClient } from '@angular/common/http';
import { provideState, provideStore } from '@ngrx/store';
import { appReducers } from './state/app.reducers';
import { provideEffects } from '@ngrx/effects';
import { findHotelsEffect } from './entity/state/hotel.effects';
import { hotelReducer } from './entity/state/hotel.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), // Angular 15+ forma moderna,,
    provideStore(appReducers),
    provideEffects({ findHotelsEffect }),
    provideState({name: 'hotels', reducer: hotelReducer})
]
};
