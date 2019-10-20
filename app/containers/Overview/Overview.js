import React from 'react';
import { Helmet } from 'react-helmet';
import './style.scss';

export default class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <article>
        <Helmet>
          <title>Overview</title>
        </Helmet>
        <div className="overview">
          
        </div>
      </article>
    );
  }
}
