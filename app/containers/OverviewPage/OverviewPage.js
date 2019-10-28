import React from 'react';
import { Helmet } from 'react-helmet';
import Grid from 'components/Grid';
import Ruler from 'components/Ruler';
import './style.scss';

const RULER_WIDTH = 20;

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

  updateWindowDimensions = () => {
    const content = document.getElementById('content');
    this.setState({
      width: content.offsetWidth,
      height: content.offsetHeight
    });
  };

  render() {
    const { width, height } = this.state;

    const hlength = Math.max(width - RULER_WIDTH * 2, 0);
    const vlength = Math.max(height - RULER_WIDTH * 2, 0);
    const cellWidth = 80;
    const cellHeight = 60;

    return (
      <div className="overview">
        <Helmet>
          <title>Overview</title>
        </Helmet>

        <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
          <Ruler
            x={RULER_WIDTH}
            y={0}
            length={hlength}
            width={RULER_WIDTH}
            step={cellWidth}
            position="top" />
          <Ruler
            x={RULER_WIDTH}
            y={height}
            length={hlength}
            width={RULER_WIDTH}
            step={cellWidth}
            position="bottom" />
          <Ruler
            x={0}
            y={RULER_WIDTH}
            length={vlength}
            width={RULER_WIDTH}
            step={cellHeight}
            position="left" />
          <Ruler
            x={width}
            y={RULER_WIDTH}
            length={vlength}
            width={RULER_WIDTH}
            step={cellHeight}
            position="right" />
          <Grid
            x={RULER_WIDTH}
            y={RULER_WIDTH}
            width={hlength}
            height={vlength}
            cellWidth={cellWidth}
            cellHeight={cellHeight} />
        </svg>
      </div>
    );
  }
}
