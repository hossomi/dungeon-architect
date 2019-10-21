import React from 'react';
import { Helmet } from 'react-helmet';
import Overview from 'components/Overview';
import './style.scss';

export default class OverviewPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { width: 0, height: 0 };
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    const content = document.getElementById('content');
    this.setState({
      width: content.offsetWidth,
      height: content.offsetHeight
    });
  }

  render() {
    const { width, height } = this.state;
    return (
      <article>
        <Helmet>
          <title>Overview</title>
        </Helmet>
        <Overview
          x={0}
          y={0}
          width={width}
          height={height}
          cellWidth={80}
          cellHeight={60} />
      </article>
    );
  }
}
