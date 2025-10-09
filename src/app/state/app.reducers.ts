import { suggestionsReducer } from './../entity/state/suggestion/suggestions.reducer';
import { hotelReducer } from './../entity/state/hotel/hotel.reducer';

import { ActionReducerMap } from '@ngrx/store';
import { IAppState } from './app.state';

export const appReducers: ActionReducerMap<IAppState> = {
  hotels: hotelReducer,
  suggestions: suggestionsReducer
};
