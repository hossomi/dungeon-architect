import { gridRowPoints, gridPoints } from '../geometry';

function lrtbcm(left, right, top, bottom, center, middle) {
  return {
    left,
    right,
    top,
    bottom,
    center,
    middle
  };
}

describe('geometry', () => {
  describe('gridRowPoints', () => {
    it('even grid should work', () => {
      expect(gridRowPoints(25, 100))
        .toEqual([
          {
            view: { start: 0, end: 25, middle: 12.5 },
            grid: { index: -2 }
          },
          {
            view: { start: 25, end: 50, middle: 37.5 },
            grid: { index: -1 }
          },
          {
            view: { start: 50, end: 75, middle: 62.5 },
            grid: { index: 1 }
          },
          {
            view: { start: 75, end: 100, middle: 87.5 },
            grid: { index: 2 }
          }
        ]);
    });

    it('odd grid should work', () => {
      expect(gridRowPoints(20, 100))
        .toEqual([
          {
            view: { start: -10, end: 10, middle: 0 },
            grid: { index: -3 }
          },
          {
            view: { start: 10, end: 30, middle: 20 },
            grid: { index: -2 }
          },
          {
            view: { start: 30, end: 50, middle: 40 },
            grid: { index: -1 }
          },
          {
            view: { start: 50, end: 70, middle: 60 },
            grid: { index: 1 }
          },
          {
            view: { start: 70, end: 90, middle: 80 },
            grid: { index: 2 }
          },
          {
            view: { start: 90, end: 110, middle: 100 },
            grid: { index: 3 }
          }
        ]);
    });

    it('offset < grid should work', () => {
      expect(gridRowPoints(25, 100, 10))
        .toEqual([
          {
            view: { start: -15, end: 10, middle: -2.5 },
            grid: { index: -3 }
          },
          {
            view: { start: 10, end: 35, middle: 22.5 },
            grid: { index: -2 }
          },
          {
            view: { start: 35, end: 60, middle: 47.5 },
            grid: { index: -1 }
          },
          {
            view: { start: 60, end: 85, middle: 72.5 },
            grid: { index: 1 }
          },
          {
            view: { start: 85, end: 110, middle: 97.5 },
            grid: { index: 2 }
          }
        ]);
    });

    it('offset > grid should work', () => {
      expect(gridRowPoints(25, 100, 60))
        .toEqual([
          {
            view: { start: -15, end: 10, middle: -2.5 },
            grid: { index: -5 }
          },
          {
            view: { start: 10, end: 35, middle: 22.5 },
            grid: { index: -4 }
          },
          {
            view: { start: 35, end: 60, middle: 47.5 },
            grid: { index: -3 }
          },
          {
            view: { start: 60, end: 85, middle: 72.5 },
            grid: { index: -2 }
          },
          {
            view: { start: 85, end: 110, middle: 97.5 },
            grid: { index: -1 }
          }
        ]);
    });

    it('offset > view should work', () => {
      expect(gridRowPoints(25, 100, 120))
        .toEqual([
          {
            view: { start: -5, end: 20, middle: 7.5 },
            grid: { index: -7 }
          },
          {
            view: { start: 20, end: 45, middle: 32.5 },
            grid: { index: -6 }
          },
          {
            view: { start: 45, end: 70, middle: 57.5 },
            grid: { index: -5 }
          },
          {
            view: { start: 70, end: 95, middle: 82.5 },
            grid: { index: -4 }
          },
          {
            view: { start: 95, end: 120, middle: 107.5 },
            grid: { index: -3 }
          }
        ]);
    });
  });

  describe('gridPoints', () => {
    it('even steps should work', () => {
      expect(gridPoints(50, 25, 100, 50))
        .toEqual([
          {
            view: lrtbcm(0, 50, 0, 25, 25, 12.5),
            grid: { row: -1, col: -1 }
          },
          {
            view: lrtbcm(50, 100, 0, 25, 75, 12.5),
            grid: { row: -1, col: 1 }
          },
          {
            view: lrtbcm(0, 50, 25, 50, 25, 37.5),
            grid: { row: 1, col: -1 }
          },
          {
            view: lrtbcm(50, 100, 25, 50, 75, 37.5),
            grid: { row: 1, col: 1 }
          }
        ]);
    });

    it('odd steps should work', () => {
      expect(gridPoints(60, 30, 100, 50))
        .toEqual([
          {
            view: lrtbcm(-10, 50, -5, 25, 20, 10),
            grid: { row: -1, col: -1 }
          },
          {
            view: lrtbcm(50, 110, -5, 25, 80, 10),
            grid: { row: -1, col: 1 }
          },
          {
            view: lrtbcm(-10, 50, 25, 55, 20, 40),
            grid: { row: 1, col: -1 }
          },
          {
            view: lrtbcm(50, 110, 25, 55, 80, 40),
            grid: { row: 1, col: 1 }
          }
        ]);
    });

    it('offset < grid should work', () => {
      expect(gridPoints(50, 25, 100, 50, 10, 10))
        .toEqual([
          {
            view: lrtbcm(-40, 10, -15, 10, -15, -2.5),
            grid: { row: -2, col: -2 }
          },
          {
            view: lrtbcm(10, 60, -15, 10, 35, -2.5),
            grid: { row: -2, col: -1 }
          },
          {
            view: lrtbcm(60, 110, -15, 10, 85, -2.5),
            grid: { row: -2, col: 1 }
          },

          {
            view: lrtbcm(-40, 10, 10, 35, -15, 22.5),
            grid: { row: -1, col: -2 }
          },
          {
            view: lrtbcm(10, 60, 10, 35, 35, 22.5),
            grid: { row: -1, col: -1 }
          },
          {
            view: lrtbcm(60, 110, 10, 35, 85, 22.5),
            grid: { row: -1, col: 1 }
          },
          {
            view: lrtbcm(-40, 10, 35, 60, -15, 47.5),
            grid: { row: 1, col: -2 }
          },
          {
            view: lrtbcm(10, 60, 35, 60, 35, 47.5),
            grid: { row: 1, col: -1 }
          },
          {
            view: lrtbcm(60, 110, 35, 60, 85, 47.5),
            grid: { row: 1, col: 1 }
          }
        ]);
    });

    it('offset > grid should work', () => {
      expect(gridPoints(50, 25, 100, 50, 60, 30))
        .toEqual([
          {
            view: lrtbcm(-40, 10, -20, 5, -15, -7.5),
            grid: { row: -3, col: -3 }
          },
          {
            view: lrtbcm(10, 60, -20, 5, 35, -7.5),
            grid: { row: -3, col: -2 }
          },
          {
            view: lrtbcm(60, 110, -20, 5, 85, -7.5),
            grid: { row: -3, col: -1 }
          },
          {
            view: lrtbcm(-40, 10, 5, 30, -15, 17.5),
            grid: { row: -2, col: -3 }
          },
          {
            view: lrtbcm(10, 60, 5, 30, 35, 17.5),
            grid: { row: -2, col: -2 }
          },
          {
            view: lrtbcm(60, 110, 5, 30, 85, 17.5),
            grid: { row: -2, col: -1 }
          },
          {
            view: lrtbcm(-40, 10, 30, 55, -15, 42.5),
            grid: { row: -1, col: -3 }
          },
          {
            view: lrtbcm(10, 60, 30, 55, 35, 42.5),
            grid: { row: -1, col: -2 }
          },
          {
            view: lrtbcm(60, 110, 30, 55, 85, 42.5),
            grid: { row: -1, col: -1 }
          }
        ]);
    });

    it('offset > view should work', () => {
      expect(gridPoints(50, 25, 100, 50, 120, 60))
        .toEqual([
          {
            view: lrtbcm(-30, 20, -15, 10, -5, -2.5),
            grid: { row: -4, col: -4 }
          },
          {
            view: lrtbcm(20, 70, -15, 10, 45, -2.5),
            grid: { row: -4, col: -3 }
          },
          {
            view: lrtbcm(70, 120, -15, 10, 95, -2.5),
            grid: { row: -4, col: -2 }
          },
          {
            view: lrtbcm(-30, 20, 10, 35, -5, 22.5),
            grid: { row: -3, col: -4 }
          },
          {
            view: lrtbcm(20, 70, 10, 35, 45, 22.5),
            grid: { row: -3, col: -3 }
          },
          {
            view: lrtbcm(70, 120, 10, 35, 95, 22.5),
            grid: { row: -3, col: -2 }
          },
          {
            view: lrtbcm(-30, 20, 35, 60, -5, 47.5),
            grid: { row: -2, col: -4 }
          },
          {
            view: lrtbcm(20, 70, 35, 60, 45, 47.5),
            grid: { row: -2, col: -3 }
          },
          {
            view: lrtbcm(70, 120, 35, 60, 95, 47.5),
            grid: { row: -2, col: -2 }
          }
        ]);
    });
  });
});
