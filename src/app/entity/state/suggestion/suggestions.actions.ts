import { createAction, props } from '@ngrx/store';
import { ISuggestions } from './../../suggestions.interface';

const findSuggestions = createAction('[Suggestions] Find Suggestions');
const findSuggestionsSuccess = createAction('[Suggestions] Find Suggestions Success',
  props<{ suggestions: ISuggestions[] }>()
);

export const suggestionsActions = {
  findSuggestions,
  findSuggestionsSuccess,
};
