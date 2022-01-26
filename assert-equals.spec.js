const assertEquals = require('./assert-equals')

describe('assertEquals', () => {
  describe('when expected and actual are different types', () => {
    describe('expected a string', () => {
      it('expected a string but received a number', () => {
        expect(() => assertEquals('abc', 123)).toThrow('Expected type: string, Actual type: number, does not match');
      });
      it('expected a string but received a boolean', () => {
        expect(() => assertEquals('abc', true)).toThrow('Expected type: string, Actual type: boolean, does not match');
      });
      it('expected a string but received an object', () => {
        expect(() => assertEquals('abc', {})).toThrow('Expected type: string, Actual type: Object, does not match');
      });
      it('expected a string but received an array', () => {
        expect(() => assertEquals('abc', [])).toThrow('Expected type: string, Actual type: Array, does not match');
      });
      it('expected a string but received a function', () => {
        expect(() => assertEquals('abc', () => {})).toThrow('Expected type: string, Actual type: function, does not match');
      });
    });
    describe('expected a number', () => {
      it('expected a number but received a string', () => {
        expect(() => assertEquals(123, 'abc')).toThrow('Expected type: number, Actual type: string, does not match');
      });
      it('expected a number but received a boolean', () => {
        expect(() => assertEquals(0, false)).toThrow('Expected type: number, Actual type: boolean, does not match');
      });
    });
    describe('expected a boolean', () => {
      it('expected a boolean but received a number', () => {
        expect(() => assertEquals(true, 1)).toThrow('Expected type: boolean, Actual type: number, does not match');
      });
    });
    describe('expected an object', () => {
      it('expected an object {} but received an array []', () => {
        expect(() => assertEquals({}, [])).toThrow('Expected: Object, Actual: Array, does not match');
      });
    });
    describe('expected an array', () => {
      it('expected an array [] but received an object {}', () => {
        expect(() => assertEquals([], {})).toThrow('Expected: Array, Actual: Object, does not match');
      });
    });
  });

  describe('booleans', () => {
    it('when expected and actual are the same boolean', () => {
      expect(() => assertEquals(true, true)).not.toThrow();
      expect(() => assertEquals(false, false)).not.toThrow();
    });
    it('when expected and actual are different booleans', () => {
      expect(() => assertEquals(true, false)).toThrow('Values are not equal');
      expect(() => assertEquals(false, true)).toThrow('Values are not equal');
    });
  });

  describe('numbers', () => {
    it('when expected and actual are the same number', () => {
      expect(() => assertEquals(123, 123)).not.toThrow();
      expect(() => assertEquals(444, 444)).not.toThrow();
      expect(() => assertEquals(0.999, 0.999)).not.toThrow();
    });
    it('when expected and actual are different numbers', () => {
      expect(() => assertEquals(1, -1)).toThrow('Values are not equal');
      expect(() => assertEquals(123, 124)).toThrow('Values are not equal');
      expect(() => assertEquals(0.999, 0.99901)).toThrow('Values are not equal');
    });
  });

  describe('strings', () => {
    describe('when expected and actual are the same string', () => {
      it('returns without throwing an error', () => {
        expect(() => assertEquals('abc', 'abc')).not.toThrow();
        expect(() => assertEquals('words with spaces', 'words with spaces')).not.toThrow();
      })
    });
    describe('when expected and actual are different strings', () => {
      it('strings of different lengths', () => {
        expect(() => assertEquals('ab', 'abc')).toThrow('Strings do not match');
      });
      it('strings of same length but different values', () => {
        expect(() => assertEquals('abc', 'cab')).toThrow('String values do not match');
        expect(() => assertEquals('abc', 'def')).toThrow('String values do not match');
      });
    });
  });

  describe('arrays', () => {
    it('when expected and actual are duplicate arrays', () => {
      expect(() => assertEquals([], [])).not.toThrow();
      expect(() => assertEquals([1], [1])).not.toThrow();
      expect(() => assertEquals([5,8,1,4,9], [5,8,1,4,9])).not.toThrow();
      expect(() => assertEquals([123, 'abc', false], [123, 'abc', false])).not.toThrow();
    });
    it('when expected and actual are different arrays', () => {
      expect(() => assertEquals([], [undefined])).toThrow('Arrays do not match');
      expect(() => assertEquals([123, 'abc', false], [123, 'abc', true])).toThrow('Values are not equal');
      expect(() => assertEquals([{}], [[]])).toThrow('Expected: Object, Actual: Array, does not match');
    });
  });

  describe('objects', () => {
    it('when expected and actual are duplicate objects', () => {
      expect(() => assertEquals({}, {})).not.toThrow();
      expect(() => assertEquals({test: 'abc'}, {test: 'abc'})).not.toThrow();
      expect(() => assertEquals({test: ['abc', 123]}, {test: ['abc', 123]})).not.toThrow();
    });
    it('when expected and actual are different objects', () => {
      expect(() => assertEquals({key1: 'test'}, {key2: 'test'})).toThrow('String values do not match');
      expect(() => assertEquals({key1: 'value1'}, {key1: 'value2'})).toThrow('String values do not match');
      expect(() => assertEquals({}, {key1: 'value1'})).toThrow('Object keys do not match');
    });
  });

  describe('dates', () => {
    it('should throw different dates', () => {
      const date1 = new Date('2022-01-26T03:24:00');
      const date2 = new Date('2022-01-27T03:24:00');
      expect(() => assertEquals(date1, date2)).toThrow('Dates do not match, expected Wed Jan 26 2022 03:24:00 GMT+0000 (Greenwich Mean Time), actual Thu Jan 27 2022 03:24:00 GMT+0000 (Greenwich Mean Time)');
    });
    it('show not throw on the same date', () => {
      const date1 = new Date('2022-01-27T00:00:01');
      const date2 = new Date('2022-01-27T00:00:01');
      expect(() => assertEquals(date1, date2)).not.toThrow();
    })
  })

  describe('exercise', () => {
    it('should throw', () => {
      const obj1 = {featuring: {dog: 'zinha', owner: 'arav', team: ['lucy', 'osman', new Date('2022-01-27T03:24:00')]}};
      const obj2 = {featuring: {dog: 'zinha', owner: 'arav', team: ['lucy', 'osman', new Date('2022-01-26T03:24:00')]}};
      expect(() => assertEquals(obj1, obj2)).toThrow();
    });
  })
});
