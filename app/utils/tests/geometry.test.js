import Cell from 'models/Cell';
import {
  getViewCells, getViewCellsRange
} from '../geometry';

describe('geometry', () => {
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
