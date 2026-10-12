const _ = require('lodash');

/**
 * Calculate sum of numbers
 * @param {number[]} numbers - Array of numbers
 * @returns {number} Sum of all numbers
 */
function calculateSum(numbers) {
  if (!Array.isArray(numbers)) {
    throw new Error('Input must be an array');
  }
  return numbers.reduce((acc, num) => acc + num, 0);
}

/**
 * Greet a person by name
 * @param {string} name - Person's name
 * @returns {string} Greeting message
 */
function greet(name) {
  if (!name || typeof name !== 'string') {
    throw new Error('Name must be a non-empty string');
  }
  return `Hello, ${_.capitalize(name)}!`;
}

/**
 * Validate email format
 * @param {string} email - Email address
 * @returns {boolean} True if valid email
 */
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Get unique values from array
 * @param {array} arr - Input array
 * @returns {array} Unique values
 */
function getUniqueValues(arr) {
  return _.uniq(arr);
}

/**
 * Merge multiple objects
 * @param {...object} objects - Objects to merge
 * @returns {object} Merged object
 */
function mergeObjects(...objects) {
  return _.merge({}, ...objects);
}

module.exports = {
  calculateSum,
  greet,
  validateEmail,
  getUniqueValues,
  mergeObjects
};
