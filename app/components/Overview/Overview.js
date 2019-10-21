import React from 'react';
import PropTypes from 'prop-types';
import * as _ from 'lodash';
import './style.scss';

const RULER_WIDTH = 20;

function centerCellOffset(size, cell) {
  return size / 2 - Math.floor(size / 2 / cell) * cell;
}

export default class Overview extends React.Component {
  renderRulers = () => {
    const {
      x, y, width, height, cellWidth, cellHeight
    } = this.props;
    return (
      <g shapeRendering="crispEdges">
        <line
          x1={x}
          x2={x + width}
          y1={RULER_WIDTH}
          y2={RULER_WIDTH}
          stroke="black" />
        {_.range(centerCellOffset(width, cellWidth), width, cellWidth)
          .map((gx) => (
            <g key={gx}>
              <line
                x1={x + gx}
                x2={x + gx}
                y1={y}
                y2={y + RULER_WIDTH}
                stroke="black" />
              <text
                x={x + gx + 3}
                y={y + RULER_WIDTH - 3}
                fontFamily="Verdana"
                fontSize="10">
                {gx - width / 2}
              </text>
            </g>
          ))}

        <line
          x1={x}
          x2={x + width}
          y1={y + height - RULER_WIDTH}
          y2={y + height - RULER_WIDTH}
          stroke="black" />
        {_.range(centerCellOffset(width, cellWidth), width, cellWidth)
          .map((gx) => (
            <g key={gx}>
              <line
                x1={x + gx}
                x2={x + gx}
                y1={y + height - RULER_WIDTH}
                y2={y + height}
                stroke="black" />
              <text
                x={x + gx + 3}
                y={x + height - RULER_WIDTH}
                baselineShift="-10px"
                fontFamily="Verdana"
                fontSize="10">
                {gx - width / 2}
              </text>
            </g>
          ))}

        <line
          y1={y}
          y2={y + height}
          x1={RULER_WIDTH}
          x2={RULER_WIDTH}
          stroke="black" />
        {_.range(centerCellOffset(height, cellHeight), height, cellHeight)
          .map((gy) => (
            <g key={gy}>
              <line
                x1={x}
                x2={x + RULER_WIDTH}
                y1={y + gy}
                y2={y + gy}
                stroke="black" />
              <text
                x={RULER_WIDTH - 3}
                y={gy - 3}
                fontFamily="Verdana"
                fontSize="10"
                transform={`rotate(-90, ${RULER_WIDTH - 3}, ${gy - 3})`}>
                {height / 2 - gy}
              </text>
            </g>
          ))}

        <line
          x1={x + width - RULER_WIDTH}
          x2={x + width - RULER_WIDTH}
          y1={y}
          y2={y + height}
          stroke="black" />
        {_.range(centerCellOffset(height, cellHeight), height, cellHeight)
          .map((gy) => (
            <g key={gy}>
              <line
                x1={width - RULER_WIDTH}
                x2={width}
                y1={y + gy}
                y2={y + gy}
                stroke="black" />
              <text
                x={width - RULER_WIDTH + 3}
                y={y + gy}
                baselineShift="-10px"
                fontFamily="Verdana"
                fontSize="10"
                transform={`rotate(-90, ${width - RULER_WIDTH}, ${y + gy})`}>
                {height / 2 - gy}
              </text>
            </g>
          ))}
      </g>
    );
  };

  renderGrid = () => {
    const {
      x, y, width, height, cellWidth, cellHeight
    } = this.props;
    return (
      <g>
        <rect
          x={RULER_WIDTH}
          y={RULER_WIDTH}
          width={width - RULER_WIDTH * 2}
          height={height - RULER_WIDTH * 2}
          fill="white" />
        {_.range(centerCellOffset(width, cellWidth), width, cellWidth)
          .map((gx) => (
            <line
              key={gx}
              x1={gx}
              x2={gx}
              y1={y + RULER_WIDTH}
              y2={y + height - RULER_WIDTH}
              stroke="black" />
          ))}
        {_.range(centerCellOffset(height, cellHeight), height, cellHeight)
          .map((gy) => (
            <line
              key={gy}
              x1={x + RULER_WIDTH}
              x2={x + width - RULER_WIDTH}
              y1={gy}
              y2={gy}
              stroke="black" />
          ))}
      </g>
    );
  };

  render() {
    const {
      x, y, width, height
    } = this.props;
    return (
      <svg
        width={width}
        height={height}
        viewBox={`${x} ${y} ${width} ${height}`}>
        {this.renderGrid()}
        {this.renderRulers()}
      </svg>
    );
  }
}

Overview.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  cellWidth: PropTypes.number,
  cellHeight: PropTypes.number
};
