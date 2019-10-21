import React from 'react';
import { Helmet } from 'react-helmet';
import { Switch, Route } from 'react-router-dom';

import OverviewPage from 'containers/OverviewPage';
import NotFoundPage from 'containers/NotFoundPage';
import Header from 'components/Header';
import Toolbar from 'components/Toolbar';
import './style.scss';

const App = () => (
  <div className="app-wrapper">
    <Helmet
      titleTemplate="%s - Dungeon Architect"
      defaultTitle="Dungeon Architect">
    </Helmet>
    <Header />
    <div id="content" className="content">
      <Switch>
        <Route exact path="/" component={OverviewPage} />
        <Route path="" component={NotFoundPage} />
      </Switch>
    </div>
    <Toolbar />
  </div>
);

export default App;
