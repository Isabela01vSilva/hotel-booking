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

export const hotelsByStarsSelector = createSelector(
  selectHotelState,
  (state: HotelState): Record<number, number> => {
    const starRecord: Record<number, number> = {
      5: 0,
      4: 0,
      3: 0,
      2: 0,
      1: 0,
      0: 0,
    };

    state.hotels.forEach((hotel) => {
      const stars = hotel.hotel.stars;
      starRecord[stars] = (starRecord[stars] || 0) + 1;
    });

    return starRecord;
  }
);
