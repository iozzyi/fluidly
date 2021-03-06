function getObjectInstanceType(object) {
  const isADate = object instanceof Date;
  if (isADate) return 'Date';
  return Array.isArray(object) ? 'Array' : 'Object';
}

function assertArrayEquals(array1, array2, message = `Arrays do not match`) {
  if (array1.length !== array2.length) {
    throw Error(message);
  }
  for (let i=0; i<array1.length; i++) {
    assertEquals(array1[i], array2[i]);
  }
}

function assertEquals(expect, actual) {
  const typeofExpect = typeof expect;
  const typeofActual = typeof actual;
  if (typeofExpect !== typeofActual) {
    const instancetypeofExpect = typeofExpect === 'object'
      ? getObjectInstanceType(expect) : typeofExpect;
    const instancetypeofActual = typeofActual === 'object'
      ? getObjectInstanceType(actual) : typeofActual;
    throw Error(`Expected type: ${instancetypeofExpect}, Actual type: ${instancetypeofActual}, does not match`);
  }
  switch (typeofActual) {
    case 'string':
      if (expect.length !== actual.length) {
        throw Error(`Strings do not match`);
      }
      if (expect !== actual) {
        throw Error(`String values do not match`);
      }
      return;
    case 'object':
      const instanceExpect = getObjectInstanceType(expect);
      const instanceArray = getObjectInstanceType(actual);
      if (instanceExpect !== instanceArray) {
        throw Error(`Expected: ${instanceExpect}, Actual: ${instanceArray}, does not match`)
      }

      if (instanceExpect === 'Array') {
        assertArrayEquals(expect, actual);
      }

      if (instanceExpect === 'Date') {
        const expectMillis = expect.getTime();
        const actualMillis = actual.getTime();
        if (expectMillis !== actualMillis) {
          throw Error(`Dates do not match, expected ${expect}, actual ${actual}`);
        }
      }

      if (instanceExpect === 'Object') {
        const keysExpect = Object.keys(expect);
        const keysActual = Object.keys(actual);
        assertArrayEquals(keysExpect, keysActual, 'Object keys do not match');
        const valuesExpect = Object.values(expect);
        const valuesActual = Object.values(actual);
        assertArrayEquals(valuesExpect, valuesActual, 'Object values do not match');
      }
      return;
    default:
      if (expect !== actual) {
        throw Error(`Values are not equal`);
      }
      return;
  }
}

module.exports = assertEquals