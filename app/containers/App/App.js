import React from 'react';
import { Helmet } from 'react-helmet';
import { Switch, Route } from 'react-router-dom';

import WorldPage from 'containers/WorldPage';
import NotFoundPage from 'containers/NotFoundPage';
import Toolbar from 'containers/Toolbar';
import Header from 'components/Header';
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
        <Route exact path="/" component={WorldPage} />
        <Route path="" component={NotFoundPage} />
      </Switch>
    </div>
    <Toolbar />
  </div>
);

export default App;
