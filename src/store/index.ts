import {
  applyMiddleware,
  combineReducers,
  createStore,
  Store,
} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import thunk from 'redux-thunk';

import * as fromPortfolio from '../portfolio/store';

export interface AppState {
  portfolio: fromPortfolio.PortfolioState;
}

const rootReducer = combineReducers<AppState>({
  portfolio: fromPortfolio.portfolioReducers,
});

export default function configureStore(): Store<AppState> {
  const store = createStore(
    rootReducer,
    undefined,
    composeWithDevTools(applyMiddleware(thunk))
  );
  return store;
}
