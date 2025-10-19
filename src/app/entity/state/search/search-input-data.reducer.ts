import { createReducer, on } from "@ngrx/store";
import { ISearchInputData } from "../../search-input-data.interface";
import { searchInputDataActions } from "./search-input-data.actions";

export interface SearchInputDataState {
  searchInputData: ISearchInputData;
}

const initialState: SearchInputDataState = {
  searchInputData: {} as ISearchInputData,
};

export const searchInputDataReducer = createReducer(
  initialState,
  on(searchInputDataActions.saveSearchInputData, (currentState, { searchInputData }) => ({
    ...currentState,
    searchInputData: searchInputData,
  }))
);
