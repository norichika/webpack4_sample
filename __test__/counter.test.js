// const Counter = require('../src/js/counter');
import Counter from "../src/js/counter";
describe('Counter', () => {
  let counter
  beforeAll(() => {
    counter = new Counter(0)
  })
  beforeEach(() => {
    counter.count = 1
  })
  describe('increment()', () => {
    test('increment', () => {
      counter.increment()
      expect(counter.count).toBe(2)
    })
  })
  describe('decrement()', () => {
    test('decrement', () => {
      counter.decrement()
      expect(counter.count).toBe(0)
    })
  })
})
