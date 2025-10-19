import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ISearchInputData } from "../../search-input-data.interface";
import { SearchInputDataState } from "./search-input-data.reducer";

export const selectSearchInputDataState = createFeatureSelector<SearchInputDataState>('searchInputData')

export const searchInputData = () => createSelector(
  selectSearchInputDataState,
  (state) => state.searchInputData as ISearchInputData
)
