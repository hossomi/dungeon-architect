import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import './style.scss';

import Grid from 'components/Grid';
import Ruler from 'components/Ruler';

const RULER_WIDTH = 20;

export default class WorldPage extends React.Component {
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
      width: content.clientWidth,
      height: content.clientHeight
    });
  };

  isCellSelectable = (row, col) => {
    const { selectedCells, rooms } = this.props;
    const isCell = (c) => c.row === row && c.col === col;
    return !selectedCells.find(isCell) && !rooms.find((r) => r.cells.find(isCell));
  }

  render() {
    const { width, height } = this.state;
    const {
      selectionEnabled,
      selectedCells,
      rooms,
      toggleSelection,
      clearSelection,
      selectCell,
      createRoom
    } = this.props;

    const hlength = Math.max(width - RULER_WIDTH * 2, 0);
    const vlength = Math.max(height - RULER_WIDTH * 2, 0);
    const cellWidth = 80;
    const cellHeight = 60;

    return (
      <div className="world">
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
            selectedCells={selectedCells}
            groupedCells={rooms}
            onCellMouseDown={({ cell }) => {
              if (this.isCellSelectable(cell.row, cell.col)) {
                selectCell(cell.row, cell.col);
              }
              toggleSelection(true);
            }}
            onCellMouseUp={() => {
              if (selectedCells.length > 0) {
                createRoom(selectedCells);
                clearSelection();
              }
              toggleSelection(false);
            }}
            onCellMouseOver={({ cell }) => {
              if (selectionEnabled && this.isCellSelectable(cell.row, cell.col)) {
                selectCell(cell.row, cell.col);
              }
            }} />
        </svg>
      </div>
    );
  }
}

WorldPage.propTypes = {
  selectionEnabled: PropTypes.bool,
  selectedCells: PropTypes.array,
  rooms: PropTypes.array,
  toggleSelection: PropTypes.func,
  clearSelection: PropTypes.func,
  selectCell: PropTypes.func,
  createRoom: PropTypes.func
};
