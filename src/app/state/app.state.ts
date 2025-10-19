import { HotelState } from "../entity/state/hotel/hotel.reducer";
import { SearchInputDataState } from "../entity/state/search/search-input-data.reducer";
import { SuggestionsState } from "../entity/state/suggestion/suggestions.reducer";

export interface IAppState {
  hotels: HotelState,
  suggestions: SuggestionsState,
  searchInputData: SearchInputDataState
}
