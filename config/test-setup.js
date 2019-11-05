// needed for regenerator-runtime
// (ES7 generator support is required by redux-saga)
import '@babel/polyfill';

// Enzyme adapter for React 16
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

expect.extend({
  toElementsEqualWith(actual, expected, comparator) {
    const hint = this.utils.matcherHint('toElementsEqualWith', undefined, undefined, {
      comment: 'custom element equality',
      isNot: this.isNot,
      promise: this.promise
    });

    const misses = [];
    for (let i = 0; i < Math.max(actual.length, expected.length); i += 1) {
      if (!actual[i] || !expected[i] || !comparator(actual[i], expected[i])) {
        misses.push({
          actual: actual[i],
          expected: expected[i],
          index: i
        });
      }
    }

    return {
      name: 'toElementsEqualWith',
      actual,
      expected,
      pass: (misses.length === 0),
      message: () => `${hint}\n\n`
        + `Expected length: ${expected.length}\n`
        + `Received length: ${actual.length}\n\n`
        + `${misses.map((miss) => `[${miss.index}]\n`
          + `  Expected: ${miss.expected !== undefined
            ? this.utils.printExpected(miss.expected)
            : 'undefined'}\n`
          + `  Received: ${miss.actual !== undefined
            ? this.utils.printReceived(miss.actual)
            : 'undefined'}`)
          .join('\n')}`
    };
  }
});
