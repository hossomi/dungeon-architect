/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import { Switch, Route } from 'react-router-dom';

import Overview from 'containers/Overview';
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
    <div className="content">
      <Switch>
        <Route exact path="/" component={Overview} />
        <Route path="" component={NotFoundPage} />
      </Switch>
    </div>
    <Toolbar />
  </div>
);

export default App;
