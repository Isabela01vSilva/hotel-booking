import { createFeatureSelector, createSelector } from "@ngrx/store";
import { HotelState } from './hotel.reducer';

export const selectHotelState = createFeatureSelector<HotelState>('hotels')

export const hotelsSelector = createSelector(
  selectHotelState,
  (state) => state.hotels
)
