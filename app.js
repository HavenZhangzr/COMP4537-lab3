const MathOperations = require('./math');

const math = new MathOperations();
const a = 10;
const b = 5;
const sum = math.add(a, b);
const diff = math.subtract(a, b);

console.log(`Hello Haven. The sum is ${sum}, the difference is ${diff}`);
