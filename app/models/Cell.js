
class Cell {
  constructor(row, col) {
    if (col !== undefined) {
      this.row = row;
      this.col = col;
    } else {
      this.row = 0;
      this.col = row;
    }
  }

  static equals(a, b) {
    const view = (a.view && b.view)
      ? a.view.x === b.view.x
      && a.view.y === b.view.y
      && a.view.width === b.view.width
      && a.view.height === b.view.height
      : !(a.view || b.view);

    return a.row === b.row
      && a.col === b.col
      && view;
  }

  withPosition1D(x, width) {
    return {
      ...this,
      view: {
        x,
        width,
        left: x,
        right: x + width
      }
    };
  }

  withPosition2D(x, y, width, height) {
    return {
      ...this,
      view: {
        x,
        y,
        width,
        height,
        left: x,
        right: x + width,
        top: y,
        bottom: y + height
      }
    };
  }

  withPosition(...args) {
    return args.length <= 2
      ? this.withPosition1D(...args)
      : this.withPosition2D(...args);
  }

  inView1D(cell, view, offset = 0) {
    const x = ((view - cell) / 2) - offset + (this.col * cell);
    return this.withPosition(x, cell);
  }

  inView2D(
    cellWidth, cellHeight,
    viewWidth, viewHeight,
    offsetX = 0, offsetY = 0
  ) {
    const x = ((viewWidth - cellWidth) / 2) - offsetX + (this.col * cellWidth);
    const y = ((viewHeight - cellHeight) / 2) + offsetY - (this.row * cellHeight);
    return this.withPosition(x, y, cellWidth, cellHeight);
  }

  inView(...args) {
    return args.length <= 3
      ? this.inView1D(...args)
      : this.inView2D(...args);
  }
}

export default Cell;
