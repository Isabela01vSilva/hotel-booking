import { createAction, props } from '@ngrx/store';
import { ICheckoutData } from '../../checkout-data.interface';

const saveCheckoutData = createAction(
  '[Checkout Data] Save Checkout Data',
  props<{ checkoutData: ICheckoutData; hotelId: number }>()
);

export const checkoutDataActions = {
  saveCheckoutData
}
