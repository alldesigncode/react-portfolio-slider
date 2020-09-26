import { Nav } from './nav/Nav';
import { PortfolioList } from './portfolio-list/PortfolioList';
import { PortfolioActions } from './actions/PortfolioActions';
import { FC } from 'react';

export const components: FC<any>[] = [Nav, PortfolioList, PortfolioActions];

export * from './nav/Nav';
export * from './portfolio-list/PortfolioList';
export * from './actions/PortfolioActions';
