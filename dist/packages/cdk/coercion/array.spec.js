"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var array_1 = require("./array");
describe('coerceArray', function () {
    it('should wrap a string in an array', function () {
        var stringVal = 'just a string';
        expect(array_1.coerceArray(stringVal)).toEqual([stringVal]);
    });
    it('should wrap a number in an array', function () {
        var numberVal = 42;
        expect(array_1.coerceArray(numberVal)).toEqual([numberVal]);
    });
    it('should wrap an object in an array', function () {
        var objectVal = { something: 'clever' };
        expect(array_1.coerceArray(objectVal)).toEqual([objectVal]);
    });
    it('should wrap a null vall in an array', function () {
        var nullVal = null;
        expect(array_1.coerceArray(nullVal)).toEqual([nullVal]);
    });
    it('should wrap an undefined value in an array', function () {
        var undefinedVal = undefined;
        expect(array_1.coerceArray(undefinedVal)).toEqual([undefinedVal]);
    });
    it('should not wrap an array in an array', function () {
        var arrayVal = [1, 2, 3];
        expect(array_1.coerceArray(arrayVal)).toBe(arrayVal);
    });
});
//# sourceMappingURL=array.spec.js.map