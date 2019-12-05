import React from 'react';
import { Helmet } from 'react-helmet';
import { Switch, Route } from 'react-router-dom';

import WorldPage from 'containers/WorldPage';
import NotFoundPage from 'containers/NotFoundPage';
import Sidebar from 'containers/Sidebar';
import Navigator from 'containers/Navigator';
import './style.scss';

const App = () => (
  <div className="app">
    <Helmet
      titleTemplate="%s - Dungeon Architect"
      defaultTitle="Dungeon Architect">
    </Helmet>
    <div className="left">
      <Sidebar />
    </div>
    <div className="content">
      <Switch>
        <Route exact path="/" component={WorldPage} />
        <Route path="" component={NotFoundPage} />
      </Switch>
    </div>
    <div className="right">
      <Navigator />
    </div>
  </div>
);

export default App;
