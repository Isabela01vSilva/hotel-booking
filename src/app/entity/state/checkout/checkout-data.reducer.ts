import { createReducer, on } from '@ngrx/store';
import { ICheckoutData } from '../../checkout-data.interface';
import { checkoutDataActions } from './checkout-data.actions';

export interface CheckoutDataState {
  hotelId: number;
  checkoutData: ICheckoutData;
}

export const initialState: CheckoutDataState = {
  hotelId: 0,
  checkoutData: {} as ICheckoutData,
};

export const checkoutDataReducer = createReducer(
  initialState,
  on(checkoutDataActions.saveCheckoutData, (currentState, { checkoutData, hotelId }) => ({
    ...currentState,
    checkoutData,
    hotelId
  }))
);
