import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ICheckoutData } from '../../checkout-data.interface';
import { CheckoutDataState } from './checkout-data.reducer';

export const selectCheckoutState = createFeatureSelector<CheckoutDataState>('checkoutData');

export const checkoutData = () => createSelector(
  selectCheckoutState,
  (state) => state.checkoutData as ICheckoutData
);

export const hotelId = () => createSelector(
  selectCheckoutState,
  (state) => state.hotelId
);
