import React, { Fragment } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { PortfolioPage } from '../portfolio/PortfolioPage';
function App() {
  return (
    <Fragment>
      <Route exact path="/">
        <Redirect to="/portfolio" />
      </Route>
      <Switch>
        <Route path="/portfolio" component={PortfolioPage} />
      </Switch>
    </Fragment>
  );
}

export default App;
