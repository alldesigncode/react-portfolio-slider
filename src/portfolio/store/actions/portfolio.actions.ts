import { DataModel } from '../reducers/portfolio-settings.reducer';
import { Dispatch } from 'redux';

export enum ActionTypes {
  ADD_DATA = '[Portfolio] ADD_DATA',
  SET_ACTIVE_INDEX = '[Portfolio] SET_ACTIVE_INDEX'
}

export interface AddDataAction {
  type: ActionTypes.ADD_DATA;
  data: DataModel[];
}

export interface SetActiveIndexAction {
  type: ActionTypes.SET_ACTIVE_INDEX,
  index: number
}

export const addData = (data: DataModel[]) => (dispatch: Dispatch) => {
  return dispatch({ type: ActionTypes.ADD_DATA, data });
};

export const setAcitveIndex = (index: number) => (dispatch: Dispatch) => {
  return dispatch({ type: ActionTypes.SET_ACTIVE_INDEX, index });
}

export type PortfolioActions = AddDataAction | SetActiveIndexAction;
