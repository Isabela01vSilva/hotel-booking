import { createReducer, on } from "@ngrx/store";
import { ISuggestions } from "../../suggestions.interface";
import { suggestionsActions } from "./suggestions.actions";

enum SuggestionStatus {
  loading = 'loading',
  pending = 'pending',
  error = 'error',
  success = 'success',
}

export interface SuggestionsState {
  suggestions: ISuggestions[];
  error: '' | null;
  status: SuggestionStatus;
}

const initialState: SuggestionsState = {
  error: null,
  status: SuggestionStatus.pending,
  suggestions: [],
};

export const suggestionsReducer = createReducer(
  initialState,
  on(suggestionsActions.findSuggestions, (currentState) => ({
    ...currentState,
    status: SuggestionStatus.loading,
  })),
  on(suggestionsActions.findSuggestionsSuccess, (currentState, { suggestions }) => ({
    ...currentState,
    status: SuggestionStatus.success,
    suggestions: suggestions,
  }))
);
