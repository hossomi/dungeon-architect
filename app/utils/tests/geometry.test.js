import { centeredSteps2 } from '../geometry';

describe('geometry', () => {
  describe('centeredSteps2', () => {
    it('should work', (done) => {
      expect(centeredSteps2(100, 30, 0))
        .toBe([-60, -30, 0, 30, 60]);
    });
  });
});
