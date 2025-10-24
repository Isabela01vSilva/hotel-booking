import { createFeatureSelector, createSelector } from '@ngrx/store';
import { HotelState } from './hotel.reducer';
import { IHotel } from '../../hotel.interface';

export const selectHotelState = createFeatureSelector<HotelState>('hotels');

export const hotelsSelector = createSelector(selectHotelState, (state) =>
  state.hotels.map((hotel) => hotel.id)
);

export const hotelsByIdSelector = (hotelId: number) =>
  createSelector(
    selectHotelState,
    (state) => state.hotels.find((hotel) => hotel.id === hotelId) as IHotel
);

export const hotelsByStarsSelector = (stars: number[]) => createSelector(
  selectHotelState,
  (state) => {
    if (!stars || stars.length === 0) {
      return state.hotels;
    }
    return state.hotels.filter(hotel => stars.includes(hotel.hotel.stars));
  }
);
