import { HotelState } from "../entity/state/hotel/hotel.reducer";
import { SuggestionsState } from "../entity/state/suggestion/suggestions.reducer";

export interface IAppState {
  hotels: HotelState,
  suggestions: SuggestionsState
}
