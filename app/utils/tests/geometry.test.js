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
      expect(getViewCells(50, 25, 50, 25))
        .toElementsEqualWith([
          new Cell(0, 0).withPosition(0, 0, 50, 25)
        ], Cell.equals);
    });

    it('view = 1.2; offset = 0', () => {
      expect(getViewCells(50, 25, 60, 30))
        .toElementsEqualWith([
          new Cell(-1, -1).withPosition(-45, 27.5, 50, 25),
          new Cell(-1, 0).withPosition(5, 27.5, 50, 25),
          new Cell(-1, 1).withPosition(55, 27.5, 50, 25),
          new Cell(0, -1).withPosition(-45, 2.5, 50, 25),
          new Cell(0, 0).withPosition(5, 2.5, 50, 25),
          new Cell(0, 1).withPosition(55, 2.5, 50, 25),
          new Cell(1, -1).withPosition(-45, -22.5, 50, 25),
          new Cell(1, 0).withPosition(5, -22.5, 50, 25),
          new Cell(1, 1).withPosition(55, -22.5, 50, 25)
        ], Cell.equals);
    });

    it('view = 2; offset = 0', () => {
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

    it('view = 3; offset = 0', () => {
      expect(getViewCells(50, 25, 150, 75))
        .toElementsEqualWith([
          new Cell(-1, -1).withPosition(0, 50, 50, 25),
          new Cell(-1, 0).withPosition(50, 50, 50, 25),
          new Cell(-1, 1).withPosition(100, 50, 50, 25),
          new Cell(0, -1).withPosition(0, 25, 50, 25),
          new Cell(0, 0).withPosition(50, 25, 50, 25),
          new Cell(0, 1).withPosition(100, 25, 50, 25),
          new Cell(1, -1).withPosition(0, 0, 50, 25),
          new Cell(1, 0).withPosition(50, 0, 50, 25),
          new Cell(1, 1).withPosition(100, 0, 50, 25)
        ], Cell.equals);
    });

    it('view = 1; offset = 0.2', () => {
      expect(getViewCells(50, 25, 50, 25, 10, 5))
        .toElementsEqualWith([
          new Cell(0, 0).withPosition(-10, 5, 50, 25),
          new Cell(0, 1).withPosition(40, 5, 50, 25),
          new Cell(1, 0).withPosition(-10, -20, 50, 25),
          new Cell(1, 1).withPosition(40, -20, 50, 25)
        ], Cell.equals);
    });

    it('view = 2; offset = 0.2', () => {
      expect(getViewCells(50, 25, 100, 50, 10, 5))
        .toElementsEqualWith([
          new Cell(-1, -1).withPosition(-35, 42.5, 50, 25),
          new Cell(-1, 0).withPosition(15, 42.5, 50, 25),
          new Cell(-1, 1).withPosition(65, 42.5, 50, 25),
          new Cell(0, -1).withPosition(-35, 17.5, 50, 25),
          new Cell(0, 0).withPosition(15, 17.5, 50, 25),
          new Cell(0, 1).withPosition(65, 17.5, 50, 25),
          new Cell(1, -1).withPosition(-35, -7.5, 50, 25),
          new Cell(1, 0).withPosition(15, -7.5, 50, 25),
          new Cell(1, 1).withPosition(65, -7.5, 50, 25)
        ], Cell.equals);
    });

    it('view = 2; offset = 0.5', () => {
      expect(getViewCells(50, 25, 100, 50, 25, 12.5))
        .toElementsEqualWith([
          new Cell(0, 0).withPosition(0, 25, 50, 25),
          new Cell(0, 1).withPosition(50, 25, 50, 25),
          new Cell(1, 0).withPosition(0, 0, 50, 25),
          new Cell(1, 1).withPosition(50, 0, 50, 25)
        ], Cell.equals);
    });

    it('view = 2; offset = 1', () => {
      expect(getViewCells(50, 25, 100, 50, 50, 25))
        .toElementsEqualWith([
          new Cell(0, 0).withPosition(-25, 37.5, 50, 25),
          new Cell(0, 1).withPosition(25, 37.5, 50, 25),
          new Cell(0, 2).withPosition(75, 37.5, 50, 25),
          new Cell(1, 0).withPosition(-25, 12.5, 50, 25),
          new Cell(1, 1).withPosition(25, 12.5, 50, 25),
          new Cell(1, 2).withPosition(75, 12.5, 50, 25),
          new Cell(2, 0).withPosition(-25, -12.5, 50, 25),
          new Cell(2, 1).withPosition(25, -12.5, 50, 25),
          new Cell(2, 2).withPosition(75, -12.5, 50, 25)
        ], Cell.equals);
    });
  });

  describe('getRowCells', () => {
    it('view = 1; offset = 0', () => {
      expect(getViewCells(50, 25, 50, 25))
        .toElementsEqualWith([
          new Cell(0, 0).withPosition(0, 0, 50, 25)
        ], Cell.equals);
    });

    it('view = 1.2; offset = 0', () => {
      expect(getViewCells(50, 25, 60, 30))
        .toElementsEqualWith([
          new Cell(-1, -1).withPosition(-45, 27.5, 50, 25),
          new Cell(-1, 0).withPosition(5, 27.5, 50, 25),
          new Cell(-1, 1).withPosition(55, 27.5, 50, 25),
          new Cell(0, -1).withPosition(-45, 2.5, 50, 25),
          new Cell(0, 0).withPosition(5, 2.5, 50, 25),
          new Cell(0, 1).withPosition(55, 2.5, 50, 25),
          new Cell(1, -1).withPosition(-45, -22.5, 50, 25),
          new Cell(1, 0).withPosition(5, -22.5, 50, 25),
          new Cell(1, 1).withPosition(55, -22.5, 50, 25)
        ], Cell.equals);
    });

    it('view = 2; offset = 0', () => {
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

    it('view = 2.2; offset = 0', () => {
      expect(getViewCells(50, 25, 110, 55))
        .toElementsEqualWith([
          new Cell(-1, -1).withPosition(-20, 40, 50, 25),
          new Cell(-1, 0).withPosition(30, 40, 50, 25),
          new Cell(-1, 1).withPosition(80, 40, 50, 25),
          new Cell(0, -1).withPosition(-20, 15, 50, 25),
          new Cell(0, 0).withPosition(30, 15, 50, 25),
          new Cell(0, 1).withPosition(80, 15, 50, 25),
          new Cell(1, -1).withPosition(-20, -10, 50, 25),
          new Cell(1, 0).withPosition(30, -10, 50, 25),
          new Cell(1, 1).withPosition(80, -10, 50, 25)
        ], Cell.equals);
    });

    it('view = 3; offset = 0', () => {
      expect(getViewCells(50, 25, 150, 75))
        .toElementsEqualWith([
          new Cell(-1, -1).withPosition(0, 50, 50, 25),
          new Cell(-1, 0).withPosition(50, 50, 50, 25),
          new Cell(-1, 1).withPosition(100, 50, 50, 25),
          new Cell(0, -1).withPosition(0, 25, 50, 25),
          new Cell(0, 0).withPosition(50, 25, 50, 25),
          new Cell(0, 1).withPosition(100, 25, 50, 25),
          new Cell(1, -1).withPosition(0, 0, 50, 25),
          new Cell(1, 0).withPosition(50, 0, 50, 25),
          new Cell(1, 1).withPosition(100, 0, 50, 25)
        ], Cell.equals);
    });

    it('view = 3.2; offset = 0', () => {
      expect(getViewCells(50, 25, 160, 80))
        .toElementsEqualWith([
          new Cell(-2, -2).withPosition(-45, 77.5, 50, 25),
          new Cell(-2, -1).withPosition(5, 77.5, 50, 25),
          new Cell(-2, 0).withPosition(55, 77.5, 50, 25),
          new Cell(-2, 1).withPosition(105, 77.5, 50, 25),
          new Cell(-2, 2).withPosition(155, 77.5, 50, 25),

          new Cell(-1, -2).withPosition(-45, 52.5, 50, 25),
          new Cell(-1, -1).withPosition(5, 52.5, 50, 25),
          new Cell(-1, 0).withPosition(55, 52.5, 50, 25),
          new Cell(-1, 1).withPosition(105, 52.5, 50, 25),
          new Cell(-1, 2).withPosition(155, 52.5, 50, 25),

          new Cell(0, -2).withPosition(-45, 27.5, 50, 25),
          new Cell(0, -1).withPosition(5, 27.5, 50, 25),
          new Cell(0, 0).withPosition(55, 27.5, 50, 25),
          new Cell(0, 1).withPosition(105, 27.5, 50, 25),
          new Cell(0, 2).withPosition(155, 27.5, 50, 25),

          new Cell(1, -2).withPosition(-45, 2.5, 50, 25),
          new Cell(1, -1).withPosition(5, 2.5, 50, 25),
          new Cell(1, 0).withPosition(55, 2.5, 50, 25),
          new Cell(1, 1).withPosition(105, 2.5, 50, 25),
          new Cell(1, 2).withPosition(155, 2.5, 50, 25),

          new Cell(2, -2).withPosition(-45, -22.5, 50, 25),
          new Cell(2, -1).withPosition(5, -22.5, 50, 25),
          new Cell(2, 0).withPosition(55, -22.5, 50, 25),
          new Cell(2, 1).withPosition(105, -22.5, 50, 25),
          new Cell(2, 2).withPosition(155, -22.5, 50, 25)
        ], Cell.equals);
    });

    it('view = 2; offset = 0.2', () => {
      expect(getViewCells(50, 25, 100, 50, 10, 5))
        .toElementsEqualWith([
          new Cell(-1, -1).withPosition(-35, 42.5, 50, 25),
          new Cell(-1, 0).withPosition(15, 42.5, 50, 25),
          new Cell(-1, 1).withPosition(65, 42.5, 50, 25),
          new Cell(0, -1).withPosition(-35, 17.5, 50, 25),
          new Cell(0, 0).withPosition(15, 17.5, 50, 25),
          new Cell(0, 1).withPosition(65, 17.5, 50, 25),
          new Cell(1, -1).withPosition(-35, -7.5, 50, 25),
          new Cell(1, 0).withPosition(15, -7.5, 50, 25),
          new Cell(1, 1).withPosition(65, -7.5, 50, 25)
        ], Cell.equals);
    });

    it('view = 2; offset = 0.2', () => {
      expect(getViewCells(50, 25, 100, 50, 10, 5))
        .toElementsEqualWith([
          new Cell(-1, -1).withPosition(-35, 42.5, 50, 25),
          new Cell(-1, 0).withPosition(15, 42.5, 50, 25),
          new Cell(-1, 1).withPosition(65, 42.5, 50, 25),
          new Cell(0, -1).withPosition(-35, 17.5, 50, 25),
          new Cell(0, 0).withPosition(15, 17.5, 50, 25),
          new Cell(0, 1).withPosition(65, 17.5, 50, 25),
          new Cell(1, -1).withPosition(-35, -7.5, 50, 25),
          new Cell(1, 0).withPosition(15, -7.5, 50, 25),
          new Cell(1, 1).withPosition(65, -7.5, 50, 25)
        ], Cell.equals);
    });

    it('view = 2; offset = 0.5', () => {
      expect(getViewCells(50, 25, 100, 50, 25, 12.5))
        .toElementsEqualWith([
          new Cell(0, 0).withPosition(0, 25, 50, 25),
          new Cell(0, 1).withPosition(50, 25, 50, 25),
          new Cell(1, 0).withPosition(0, 0, 50, 25),
          new Cell(1, 1).withPosition(50, 0, 50, 25)
        ], Cell.equals);
    });

    it('view = 2; offset = 1', () => {
      expect(getViewCells(50, 25, 100, 50, 50, 25))
        .toElementsEqualWith([
          new Cell(0, 0).withPosition(-25, 37.5, 50, 25),
          new Cell(0, 1).withPosition(25, 37.5, 50, 25),
          new Cell(0, 2).withPosition(75, 37.5, 50, 25),
          new Cell(1, 0).withPosition(-25, 12.5, 50, 25),
          new Cell(1, 1).withPosition(25, 12.5, 50, 25),
          new Cell(1, 2).withPosition(75, 12.5, 50, 25),
          new Cell(2, 0).withPosition(-25, -12.5, 50, 25),
          new Cell(2, 1).withPosition(25, -12.5, 50, 25),
          new Cell(2, 2).withPosition(75, -12.5, 50, 25)
        ], Cell.equals);
    });
  });
});
