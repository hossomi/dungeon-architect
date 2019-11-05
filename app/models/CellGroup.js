
export default class CellGroup {
  constructor(cells, color) {
    this.cells = cells;
    this.color = color;
  }

  contains = (row, col) => this.cells.some((cell) => cell.is(row, col))
}
