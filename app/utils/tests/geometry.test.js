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
            view: { left: 0, right: 25, center: 12.5 },
            grid: { row: -2 }
          },
          {
            view: { left: 25, right: 50, center: 37.5 },
            grid: { row: -1 }
          },
          {
            view: { left: 50, right: 75, center: 62.5 },
            grid: { row: 1 }
          },
          {
            view: { left: 75, right: 100, center: 87.5 },
            grid: { row: 2 }
          }
        ]);
    });

    it('odd grid should work', () => {
      expect(gridRowPoints(20, 100))
        .toEqual([
          {
            view: { left: -10, right: 10, center: 0 },
            grid: { row: -3 }
          },
          {
            view: { left: 10, right: 30, center: 20 },
            grid: { row: -2 }
          },
          {
            view: { left: 30, right: 50, center: 40 },
            grid: { row: -1 }
          },
          {
            view: { left: 50, right: 70, center: 60 },
            grid: { row: 1 }
          },
          {
            view: { left: 70, right: 90, center: 80 },
            grid: { row: 2 }
          },
          {
            view: { left: 90, right: 110, center: 100 },
            grid: { row: 3 }
          }
        ]);
    });

    it('offset < grid should work', () => {
      expect(gridRowPoints(25, 100, 10))
        .toEqual([
          {
            view: { left: -15, right: 10, center: -2.5 },
            grid: { row: -3 }
          },
          {
            view: { left: 10, right: 35, center: 22.5 },
            grid: { row: -2 }
          },
          {
            view: { left: 35, right: 60, center: 47.5 },
            grid: { row: -1 }
          },
          {
            view: { left: 60, right: 85, center: 72.5 },
            grid: { row: 1 }
          },
          {
            view: { left: 85, right: 110, center: 97.5 },
            grid: { row: 2 }
          }
        ]);
    });

    it('offset > grid should work', () => {
      expect(gridRowPoints(25, 100, 60))
        .toEqual([
          {
            view: { left: -15, right: 10, center: -2.5 },
            grid: { row: -5 }
          },
          {
            view: { left: 10, right: 35, center: 22.5 },
            grid: { row: -4 }
          },
          {
            view: { left: 35, right: 60, center: 47.5 },
            grid: { row: -3 }
          },
          {
            view: { left: 60, right: 85, center: 72.5 },
            grid: { row: -2 }
          },
          {
            view: { left: 85, right: 110, center: 97.5 },
            grid: { row: -1 }
          }
        ]);
    });

    it('offset > view should work', () => {
      expect(gridRowPoints(25, 100, 120))
        .toEqual([
          {
            view: { left: -5, right: 20, center: 7.5 },
            grid: { row: -7 }
          },
          {
            view: { left: 20, right: 45, center: 32.5 },
            grid: { row: -6 }
          },
          {
            view: { left: 45, right: 70, center: 57.5 },
            grid: { row: -5 }
          },
          {
            view: { left: 70, right: 95, center: 82.5 },
            grid: { row: -4 }
          },
          {
            view: { left: 95, right: 120, center: 107.5 },
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
