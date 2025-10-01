import { hotelReducer } from './../entity/state/hotel.reducer';
import { ActionReducerMap } from '@ngrx/store';
import { IAppState } from './app.state';

export const appReducers: ActionReducerMap<IAppState> = {
  hotels: hotelReducer,
};
