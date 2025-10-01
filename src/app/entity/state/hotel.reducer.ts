import { createReducer, on } from '@ngrx/store';
import { IHotel } from '../hotel.interface';
import { hotelsActions } from './hotel.actions';

enum HotelStatus {
  loading = 'loading',
  pending = 'pending',
  error = 'error',
  success = 'success',
}

export interface HotelState {
  hotels: IHotel[];
  error: '' | null;
  status: HotelStatus;
}

const initialState: HotelState = {
  error: null,
  status: HotelStatus.pending,
  hotels: [],
};

export const hotelReducer = createReducer(
  initialState,
  on(hotelsActions.findHotels, (currentState) => ({
    ...currentState,
    status: HotelStatus.loading,
  })),
  on(hotelsActions.findHotelsSuccess, (currentState, hotels) => ({
    ...currentState,
    status: HotelStatus.success,
    hotels: hotels.hotels
  }))
);
