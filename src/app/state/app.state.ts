import { HotelState } from "../entity/state/hotel/hotel.reducer";
import { SearchInputDataState } from "../entity/state/search/search-input-data.reducer";
import { SuggestionsState } from "../entity/state/suggestion/suggestions.reducer";
import { CheckoutDataState } from '../entity/state/checkout/checkout-data.reducer';

export interface IAppState {
  hotels: HotelState,
  suggestions: SuggestionsState,
  searchInputData: SearchInputDataState,
  checkoutData: CheckoutDataState
}
