import { Reducer } from 'redux';
import { PortfolioActions, ActionTypes } from '../actions/portfolio.actions';

export interface State {
  data: { [id: number]: DataModel };
  activeIndex: number;
}

const initialDogState: State = {
  data: {},
  activeIndex: 0,
};

export const portfolioSettingsReducer: Reducer<State, PortfolioActions> = (
  state = initialDogState,
  action
) => {
  switch (action.type) {
    case ActionTypes.ADD_DATA: {
      return {
        ...state,
        data: action.data.reduce(
          (entities: { [id: number]: DataModel }, data) => {
            return {
              ...entities,
              [data.id]: data,
            };
          },
          {
            ...state.data,
          }
        ),
      };
    }
    case ActionTypes.SET_ACTIVE_INDEX: {
      return {
        ...state,
        activeIndex: action.index,
      };
    }
    default:
      return state;
  }
};

export interface DataModel {
  id: number;
  title: string;
  imageUrl: string;
}
