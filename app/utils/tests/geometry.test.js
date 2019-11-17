import Cell from 'models/Cell';
import {
  gridRowPoints, gridPoints, getViewCells, getViewCellsRange
} from '../geometry';

function lrtb(left, right, top, bottom) {
  return {
    left,
    right,
    top,
    bottom,
    center: (left + right) / 2,
    middle: (top + bottom) / 2,
    width: right - left,
    height: bottom - top
  };
}

function lr(left, right) {
  return {
    left,
    right,
    center: (left + right) / 2,
    width: right - left
  };
}

describe('geometry', () => {
  describe('gridRowPoints', () => {
    it('even grid should work', () => {
      expect(gridRowPoints(25, 100))
        .toEqual([
          {
            view: lr(0, 25),
            grid: { row: -2 }
          },
          {
            view: lr(25, 50),
            grid: { row: -1 }
          },
          {
            view: lr(50, 75),
            grid: { row: 1 }
          },
          {
            view: lr(75, 100),
            grid: { row: 2 }
          }
        ]);
    });

    it('odd grid should work', () => {
      expect(gridRowPoints(20, 100))
        .toEqual([
          {
            view: lr(-10, 10),
            grid: { row: -3 }
          },
          {
            view: lr(10, 30),
            grid: { row: -2 }
          },
          {
            view: lr(30, 50),
            grid: { row: -1 }
          },
          {
            view: lr(50, 70),
            grid: { row: 1 }
          },
          {
            view: lr(70, 90),
            grid: { row: 2 }
          },
          {
            view: lr(90, 110),
            grid: { row: 3 }
          }
        ]);
    });

    it('offset < grid should work', () => {
      expect(gridRowPoints(25, 100, 10))
        .toEqual([
          {
            view: lr(-15, 10),
            grid: { row: -3 }
          },
          {
            view: lr(10, 35),
            grid: { row: -2 }
          },
          {
            view: lr(35, 60),
            grid: { row: -1 }
          },
          {
            view: lr(60, 85),
            grid: { row: 1 }
          },
          {
            view: lr(85, 110),
            grid: { row: 2 }
          }
        ]);
    });

    it('offset > grid should work', () => {
      expect(gridRowPoints(25, 100, 60))
        .toEqual([
          {
            view: lr(-15, 10),
            grid: { row: -5 }
          },
          {
            view: lr(10, 35),
            grid: { row: -4 }
          },
          {
            view: lr(35, 60),
            grid: { row: -3 }
          },
          {
            view: lr(60, 85),
            grid: { row: -2 }
          },
          {
            view: lr(85, 110),
            grid: { row: -1 }
          }
        ]);
    });

    it('offset > view should work', () => {
      expect(gridRowPoints(25, 100, 120))
        .toEqual([
          {
            view: lr(-5, 20),
            grid: { row: -7 }
          },
          {
            view: lr(20, 45),
            grid: { row: -6 }
          },
          {
            view: lr(45, 70),
            grid: { row: -5 }
          },
          {
            view: lr(70, 95),
            grid: { row: -4 }
          },
          {
            view: lr(95, 120),
            grid: { row: -3 }
          }
        ]);
    });
  });

  describe('gridPoints', () => {
    it('even steps should work', () => {
      expect(gridPoints(50, 25, 100, 50))
        .toEqual([
          {
            view: lrtb(0, 50, 0, 25),
            grid: { row: -1, col: -1 }
          },
          {
            view: lrtb(50, 100, 0, 25),
            grid: { row: -1, col: 1 }
          },
          {
            view: lrtb(0, 50, 25, 50),
            grid: { row: 1, col: -1 }
          },
          {
            view: lrtb(50, 100, 25, 50),
            grid: { row: 1, col: 1 }
          }
        ]);
    });

    it('odd steps should work', () => {
      expect(gridPoints(60, 30, 100, 50))
        .toEqual([
          {
            view: lrtb(-10, 50, -5, 25),
            grid: { row: -1, col: -1 }
          },
          {
            view: lrtb(50, 110, -5, 25),
            grid: { row: -1, col: 1 }
          },
          {
            view: lrtb(-10, 50, 25, 55),
            grid: { row: 1, col: -1 }
          },
          {
            view: lrtb(50, 110, 25, 55),
            grid: { row: 1, col: 1 }
          }
        ]);
    });

    it('offset < grid should work', () => {
      expect(gridPoints(50, 25, 100, 50, 10, 10))
        .toEqual([
          {
            view: lrtb(-40, 10, -15, 10),
            grid: { row: -2, col: -2 }
          },
          {
            view: lrtb(10, 60, -15, 10),
            grid: { row: -2, col: -1 }
          },
          {
            view: lrtb(60, 110, -15, 10),
            grid: { row: -2, col: 1 }
          },

          {
            view: lrtb(-40, 10, 10, 35),
            grid: { row: -1, col: -2 }
          },
          {
            view: lrtb(10, 60, 10, 35),
            grid: { row: -1, col: -1 }
          },
          {
            view: lrtb(60, 110, 10, 35),
            grid: { row: -1, col: 1 }
          },
          {
            view: lrtb(-40, 10, 35, 60),
            grid: { row: 1, col: -2 }
          },
          {
            view: lrtb(10, 60, 35, 60),
            grid: { row: 1, col: -1 }
          },
          {
            view: lrtb(60, 110, 35, 60),
            grid: { row: 1, col: 1 }
          }
        ]);
    });

    it('offset > grid should work', () => {
      expect(gridPoints(50, 25, 100, 50, 60, 30))
        .toEqual([
          {
            view: lrtb(-40, 10, -20, 5),
            grid: { row: -3, col: -3 }
          },
          {
            view: lrtb(10, 60, -20, 5),
            grid: { row: -3, col: -2 }
          },
          {
            view: lrtb(60, 110, -20, 5),
            grid: { row: -3, col: -1 }
          },
          {
            view: lrtb(-40, 10, 5, 30),
            grid: { row: -2, col: -3 }
          },
          {
            view: lrtb(10, 60, 5, 30),
            grid: { row: -2, col: -2 }
          },
          {
            view: lrtb(60, 110, 5, 30),
            grid: { row: -2, col: -1 }
          },
          {
            view: lrtb(-40, 10, 30, 55),
            grid: { row: -1, col: -3 }
          },
          {
            view: lrtb(10, 60, 30, 55),
            grid: { row: -1, col: -2 }
          },
          {
            view: lrtb(60, 110, 30, 55),
            grid: { row: -1, col: -1 }
          }
        ]);
    });

    it('offset > view should work', () => {
      expect(gridPoints(50, 25, 100, 50, 120, 60))
        .toEqual([
          {
            view: lrtb(-30, 20, -15, 10),
            grid: { row: -4, col: -4 }
          },
          {
            view: lrtb(20, 70, -15, 10),
            grid: { row: -4, col: -3 }
          },
          {
            view: lrtb(70, 120, -15, 10),
            grid: { row: -4, col: -2 }
          },
          {
            view: lrtb(-30, 20, 10, 35),
            grid: { row: -3, col: -4 }
          },
          {
            view: lrtb(20, 70, 10, 35),
            grid: { row: -3, col: -3 }
          },
          {
            view: lrtb(70, 120, 10, 35),
            grid: { row: -3, col: -2 }
          },
          {
            view: lrtb(-30, 20, 35, 60),
            grid: { row: -2, col: -4 }
          },
          {
            view: lrtb(20, 70, 35, 60),
            grid: { row: -2, col: -3 }
          },
          {
            view: lrtb(70, 120, 35, 60),
            grid: { row: -2, col: -2 }
          }
        ]);
    });
  });

  describe('getViewCellsRange', () => {
    it('view = 1; offset = 0', () => {
      expect(getViewCellsRange(100, 80))
        .toEqual({ min: 0, max: 0, count: 1 });
    });

    it('view = 1.25; offset = 0', () => {
      expect(getViewCellsRange(100, 125))
        .toEqual({ min: -1, max: 1, count: 3 });
    });

    it('view = 1.5; offset = 0', () => {
      expect(getViewCellsRange(100, 150))
        .toEqual({ min: -1, max: 1, count: 3 });
    });

    it('view = 1.75; offset = 0', () => {
      expect(getViewCellsRange(100, 175))
        .toEqual({ min: -1, max: 1, count: 3 });
    });

    it('view = 2; offset = 0', () => {
      expect(getViewCellsRange(100, 200))
        .toEqual({ min: -1, max: 1, count: 3 });
    });

    it('view = 2.25; offset = 0', () => {
      expect(getViewCellsRange(100, 225))
        .toEqual({ min: -1, max: 1, count: 3 });
    });

    it('view = 2.5; offset = 0', () => {
      expect(getViewCellsRange(100, 250))
        .toEqual({ min: -1, max: 1, count: 3 });
    });

    it('view = 2.75; offset = 0', () => {
      expect(getViewCellsRange(100, 275))
        .toEqual({ min: -1, max: 1, count: 3 });
    });

    it('view = 3; offset = 0', () => {
      expect(getViewCellsRange(100, 300))
        .toEqual({ min: -1, max: 1, count: 3 });
    });

    it('view = 3.25; offset = 0', () => {
      expect(getViewCellsRange(100, 325))
        .toEqual({ min: -2, max: 2, count: 5 });
    });

    it('view = 0.5; offset = 0.25', () => {
      expect(getViewCellsRange(100, 50, 25))
        .toEqual({ min: 0, max: 0, count: 1 });
    });

    it('view = 0.5; offset = 0.5', () => {
      expect(getViewCellsRange(100, 50, 50))
        .toEqual({ min: 0, max: 1, count: 2 });
    });

    it('view = 1; offset = 0.25', () => {
      expect(getViewCellsRange(100, 100, 25))
        .toEqual({ min: 0, max: 1, count: 2 });
    });

    it('view = 1.5; offset = 0.25', () => {
      expect(getViewCellsRange(100, 150, 25))
        .toEqual({ min: 0, max: 1, count: 2 });
    });

    it('view = 2; offset = 0.5', () => {
      expect(getViewCellsRange(100, 200, 50))
        .toEqual({ min: 0, max: 1, count: 2 });
    });

    it('view = 3; offset = 0.5', () => {
      expect(getViewCellsRange(100, 300, 50))
        .toEqual({ min: -1, max: 2, count: 4 });
    });

    it('2D; no offset', () => {
      expect(getViewCellsRange(100, 50, 200, 100))
        .toEqual({
          rows: { min: -1, max: 1, count: 3 },
          cols: { min: -1, max: 1, count: 3 }
        });
    });

    it('2D; offset', () => {
      expect(getViewCellsRange(100, 50, 200, 100, 50, 25))
        .toEqual({
          rows: { min: 0, max: 1, count: 2 },
          cols: { min: 0, max: 1, count: 2 }
        });
    });
  });

  describe('getViewCells', () => {
    it('view = 1; offset = 0', () => {
      expect(getViewCells(50, 50))
        .toElementsEqualWith([
          new Cell(0).withPosition(0, 50)
        ], Cell.equals);
    });

    it('view = 1.2; offset = 0', () => {
      expect(getViewCells(50, 60))
        .toElementsEqualWith([
          new Cell(-1).withPosition(-45, 50),
          new Cell(0).withPosition(5, 50),
          new Cell(1).withPosition(55, 50)
        ], Cell.equals);
    });

    it('view = 2; offset = 0', () => {
      expect(getViewCells(50, 100))
        .toElementsEqualWith([
          new Cell(-1).withPosition(-25, 50),
          new Cell(0).withPosition(25, 50),
          new Cell(1).withPosition(75, 50)
        ], Cell.equals);
    });

    it('view = 3; offset = 0', () => {
      expect(getViewCells(50, 150))
        .toElementsEqualWith([
          new Cell(-1).withPosition(0, 50),
          new Cell(0).withPosition(50, 50),
          new Cell(1).withPosition(100, 50)
        ], Cell.equals);
    });

    it('view = 1; offset = 0.2', () => {
      expect(getViewCells(50, 50, 10))
        .toElementsEqualWith([
          new Cell(0).withPosition(-10, 50),
          new Cell(1).withPosition(40, 50)
        ], Cell.equals);
    });

    it('view = 2; offset = 0.2', () => {
      expect(getViewCells(50, 100, 10))
        .toElementsEqualWith([
          new Cell(-1).withPosition(-35, 50),
          new Cell(0).withPosition(15, 50),
          new Cell(1).withPosition(65, 50)
        ], Cell.equals);
    });

    it('view = 2; offset = 0.5', () => {
      expect(getViewCells(50, 100, 25))
        .toElementsEqualWith([
          new Cell(0).withPosition(0, 50),
          new Cell(1).withPosition(50, 50)
        ], Cell.equals);
    });

    it('view = 2; offset = 1', () => {
      expect(getViewCells(50, 100, 50))
        .toElementsEqualWith([
          new Cell(0).withPosition(-25, 50),
          new Cell(1).withPosition(25, 50),
          new Cell(2).withPosition(75, 50)
        ], Cell.equals);
    });

    it('2D; no offset', () => {
      expect(getViewCells(50, 25, 100, 50))
        .toElementsEqualWith([
          new Cell(-1, -1).withPosition(-25, 37.5, 50, 25),
          new Cell(-1, 0).withPosition(25, 37.5, 50, 25),
          new Cell(-1, 1).withPosition(75, 37.5, 50, 25),
          new Cell(0, -1).withPosition(-25, 12.5, 50, 25),
          new Cell(0, 0).withPosition(25, 12.5, 50, 25),
          new Cell(0, 1).withPosition(75, 12.5, 50, 25),
          new Cell(1, -1).withPosition(-25, -12.5, 50, 25),
          new Cell(1, 0).withPosition(25, -12.5, 50, 25),
          new Cell(1, 1).withPosition(75, -12.5, 50, 25)
        ], Cell.equals);
    });

    it('2D; offset', () => {
      expect(getViewCells(50, 25, 100, 50, 25, 12.5))
        .toElementsEqualWith([
          new Cell(0, 0).withPosition(0, 25, 50, 25),
          new Cell(0, 1).withPosition(50, 25, 50, 25),
          new Cell(1, 0).withPosition(0, 0, 50, 25),
          new Cell(1, 1).withPosition(50, 0, 50, 25)
        ], Cell.equals);
    });
  });
});
