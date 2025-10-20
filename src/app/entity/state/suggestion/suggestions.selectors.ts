import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ISuggestions } from "../../suggestions.interface";
import { SuggestionsState } from "./suggestions.reducer";

export const selectSuggestionState = createFeatureSelector<SuggestionsState>('suggestions')

export const suggestionsSelector = createSelector(
  selectSuggestionState, (state) => state.suggestions
)

export const suggestionByIdSelector = (suggestionId: number) => createSelector(
  selectSuggestionState,
  (state) => state.suggestions.find((suggestion) => suggestion.id === suggestionId) as ISuggestions
)



export const suggestionSelector = () => createSelector(
  selectSuggestionState,
  (state) => state.suggestions as ISuggestions[]
)
