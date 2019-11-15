
class Cell {
  constructor(row, col) {
    this.row = row;
    this.col = col;
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

  withPosition(x, y, width, height) {
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

  inView(
    cellWidth, cellHeight,
    viewWidth, viewHeight,
    offsetX = 0, offsetY = 0
  ) {
    const x = ((viewWidth - cellWidth) / 2) - offsetX + (this.col * cellWidth);
    const y = ((viewHeight - cellHeight) / 2) + offsetY - (this.row * cellHeight);
    return this.withPosition(x, y, cellWidth, cellHeight);
  }

  is(row, col) { return this.row === row && this.col === col; }

  equals(other) { return Cell.equals(this, other); }
}

export default Cell;
