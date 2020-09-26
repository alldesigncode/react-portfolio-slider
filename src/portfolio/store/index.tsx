import { combineReducers } from 'redux';
import * as fromPortfolio from './reducers/portfolio-settings.reducer';

export interface PortfolioState {
  portfolioSettings: fromPortfolio.State;
}

export const portfolioReducers = combineReducers<PortfolioState>({
  portfolioSettings: fromPortfolio.portfolioSettingsReducer,
});
