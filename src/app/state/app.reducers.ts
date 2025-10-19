import { suggestionsReducer } from './../entity/state/suggestion/suggestions.reducer';
import { hotelReducer } from './../entity/state/hotel/hotel.reducer';

import { ActionReducerMap } from '@ngrx/store';
import { IAppState } from './app.state';
import { searchInputDataReducer } from '../entity/state/search/search-input-data.reducer';

export const appReducers: ActionReducerMap<IAppState> = {
  hotels: hotelReducer,
  suggestions: suggestionsReducer,
  searchInputData: searchInputDataReducer
};
