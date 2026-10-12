const { calculateSum, greet, validateEmail, getUniqueValues, mergeObjects } = require('../src/utils/helpers');

describe('Helper Functions', () => {
  describe('calculateSum', () => {
    test('should sum positive numbers correctly', () => {
      expect(calculateSum([1, 2, 3, 4, 5])).toBe(15);
    });

    test('should handle negative numbers', () => {
      expect(calculateSum([-1, -2, -3])).toBe(-6);
    });

    test('should handle mixed positive and negative numbers', () => {
      expect(calculateSum([10, -5, 3, -2])).toBe(6);
    });

    test('should return 0 for empty array', () => {
      expect(calculateSum([])).toBe(0);
    });

    test('should return single number for single element array', () => {
      expect(calculateSum([42])).toBe(42);
    });

    test('should throw error for non-array input', () => {
      expect(() => calculateSum('not an array')).toThrow('Input must be an array');
    });
  });

  describe('greet', () => {
    test('should greet with capitalized name', () => {
      expect(greet('john')).toBe('Hello, John!');
    });

    test('should handle already capitalized names', () => {
      expect(greet('Alice')).toBe('Hello, Alice!');
    });

    test('should throw error for empty string', () => {
      expect(() => greet('')).toThrow('Name must be a non-empty string');
    });

    test('should throw error for non-string input', () => {
      expect(() => greet(123)).toThrow('Name must be a non-empty string');
    });

    test('should throw error for null', () => {
      expect(() => greet(null)).toThrow('Name must be a non-empty string');
    });
  });

  describe('validateEmail', () => {
    test('should validate correct email addresses', () => {
      expect(validateEmail('user@example.com')).toBe(true);
    });

    test('should validate emails with multiple domain levels', () => {
      expect(validateEmail('user@mail.example.co.uk')).toBe(true);
    });

    test('should reject email without @', () => {
      expect(validateEmail('userexample.com')).toBe(false);
    });

    test('should reject email without domain', () => {
      expect(validateEmail('user@')).toBe(false);
    });

    test('should reject email without local part', () => {
      expect(validateEmail('@example.com')).toBe(false);
    });

    test('should reject email with spaces', () => {
      expect(validateEmail('user @example.com')).toBe(false);
    });
  });

  describe('getUniqueValues', () => {
    test('should remove duplicate values', () => {
      expect(getUniqueValues([1, 2, 2, 3, 3, 3])).toEqual([1, 2, 3]);
    });

    test('should handle empty array', () => {
      expect(getUniqueValues([])).toEqual([]);
    });

    test('should handle array with no duplicates', () => {
      expect(getUniqueValues([1, 2, 3])).toEqual([1, 2, 3]);
    });
  });

  describe('mergeObjects', () => {
    test('should merge two objects', () => {
      const obj1 = { a: 1, b: 2 };
      const obj2 = { c: 3 };
      expect(mergeObjects(obj1, obj2)).toEqual({ a: 1, b: 2, c: 3 });
    });

    test('should merge multiple objects', () => {
      expect(mergeObjects({ a: 1 }, { b: 2 }, { c: 3 })).toEqual({ a: 1, b: 2, c: 3 });
    });

    test('should handle object overwrite', () => {
      const obj1 = { a: 1 };
      const obj2 = { a: 2 };
      expect(mergeObjects(obj1, obj2)).toEqual({ a: 2 });
    });
  });
});
