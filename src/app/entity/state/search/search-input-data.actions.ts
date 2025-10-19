import { createAction, props } from "@ngrx/store";
import { ISearchInputData } from "../../search-input-data.interface";


const saveSearchInputData = createAction('[Search Input Date] Save Search Input Date Actions Success',
  props<{ searchInputData: ISearchInputData }>()
);

export const searchInputDataActions = {
  saveSearchInputData
};
