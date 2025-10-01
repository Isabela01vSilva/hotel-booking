import { createAction, props } from "@ngrx/store";
import { IHotel } from "../hotel.interface";

const findHotels = createAction('[Hotels] Find Hotels');
const findHotelsSuccess = createAction('[Hotels] Find Hotels Success',
  props<{ hotels: IHotel[]}>()
)

export const hotelsActions = {
  findHotels,
  findHotelsSuccess
}
