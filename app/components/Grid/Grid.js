import React from 'react';
import PropTypes from 'prop-types';
import * as _ from 'lodash';
import './style.scss';

import { centeredSteps } from 'utils/geometry';

export default class Grid extends React.Component {
  render() {
    const {
      x, y, width, height, cellWidth, cellHeight
    } = this.props;

    return (
      <svg
        x={x}
        y={y}
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}>
        {centeredSteps(width, cellWidth)
          .map((gx) => centeredSteps(height, cellHeight)
            .map((gy) => (
              <rect
                className="grid-cell"
                key={`${gx},${gy}`}
                x={gx}
                y={gy}
                width={cellWidth}
                height={cellHeight} />
            )))}
      </svg>
    );
  }
}

Grid.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  cellWidth: PropTypes.number,
  cellHeight: PropTypes.number
};
