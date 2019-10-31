import { gridRowPoints, gridPoints } from '../geometry';

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
});
