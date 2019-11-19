import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import './style.scss';

import Grid from 'components/Grid';
import Ruler from 'components/Ruler';

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
    const {
      selection,
      rooms,
      isCellSelected,
      getCellRoom,
      enableSelection,
      clearSelection,
      selectCell,
      createRoom
    } = this.props;

    const hlength = Math.max(width - RULER_WIDTH * 2, 0);
    const vlength = Math.max(height - RULER_WIDTH * 2, 0);
    const cellWidth = 80;
    const cellHeight = 60;

    return (
      <div className="overview">
        <Helmet>
          <title>Overview</title>
        </Helmet>

        <svg width={width} height={height}>
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
            cellHeight={cellHeight}
            selectedCells={selection.cells}
            groupedCells={rooms}
            onCellMouseDown={({ cell }) => {
              if (!isCellSelected(cell.row, cell.col)
                && !getCellRoom(cell.row, cell.col)) {
                selectCell(cell.row, cell.col);
              }
              enableSelection(true);
            }}
            onCellMouseUp={() => {
              if (selection.cells.length > 0) {
                createRoom(selection.cells);
                clearSelection();
              }
              enableSelection(false);
            }}
            onCellMouseOver={({ cell }) => {
              if (selection.enabled
                && !isCellSelected(cell.row, cell.col)
                && !getCellRoom(cell.row, cell.col)) {
                selectCell(cell.row, cell.col);
              }
            }} />
        </svg>
      </div>
    );
  }
}

OverviewPage.propTypes = {
  selection: PropTypes.object,
  rooms: PropTypes.array,
  isCellSelected: PropTypes.func,
  getCellRoom: PropTypes.func,
  enableSelection: PropTypes.func,
  clearSelection: PropTypes.func,
  selectCell: PropTypes.func,
  createRoom: PropTypes.func
};
