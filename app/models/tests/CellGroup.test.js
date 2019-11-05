import Cell from '../Cell';
import CellGroup from '../CellGroup';

describe('CellGroup', () => {
  describe('contains', () => {
    it('works for inside cell', () => {
      const group = new CellGroup([new Cell(1, 1)]);
      expect(group.contains(1, 1))
        .toBe(true);
    });

    it('works for cell outside', () => {
      const group = new CellGroup([new Cell(1, 1)]);
      expect(group.contains(2, 1))
        .toBe(false);
    });
  });
});
