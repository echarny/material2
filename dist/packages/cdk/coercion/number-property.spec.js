"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var number_property_1 = require("./number-property");
describe('coerceNumberProperty', function () {
    it('should coerce undefined to 0 or default', function () {
        expect(number_property_1.coerceNumberProperty(undefined)).toBe(0);
        expect(number_property_1.coerceNumberProperty(undefined, 111)).toBe(111);
    });
    it('should coerce null to 0 or default', function () {
        expect(number_property_1.coerceNumberProperty(null)).toBe(0);
        expect(number_property_1.coerceNumberProperty(null, 111)).toBe(111);
    });
    it('should coerce true to 0 or default', function () {
        expect(number_property_1.coerceNumberProperty(true)).toBe(0);
        expect(number_property_1.coerceNumberProperty(true, 111)).toBe(111);
    });
    it('should coerce false to 0 or default', function () {
        expect(number_property_1.coerceNumberProperty(false)).toBe(0);
        expect(number_property_1.coerceNumberProperty(false, 111)).toBe(111);
    });
    it('should coerce the empty string to 0 or default', function () {
        expect(number_property_1.coerceNumberProperty('')).toBe(0);
        expect(number_property_1.coerceNumberProperty('', 111)).toBe(111);
    });
    it('should coerce the string "1" to 1', function () {
        expect(number_property_1.coerceNumberProperty('1')).toBe(1);
        expect(number_property_1.coerceNumberProperty('1', 111)).toBe(1);
    });
    it('should coerce the string "123.456" to 123.456', function () {
        expect(number_property_1.coerceNumberProperty('123.456')).toBe(123.456);
        expect(number_property_1.coerceNumberProperty('123.456', 111)).toBe(123.456);
    });
    it('should coerce the string "-123.456" to -123.456', function () {
        expect(number_property_1.coerceNumberProperty('-123.456')).toBe(-123.456);
        expect(number_property_1.coerceNumberProperty('-123.456', 111)).toBe(-123.456);
    });
    it('should coerce an arbitrary string to 0 or default', function () {
        expect(number_property_1.coerceNumberProperty('pink')).toBe(0);
        expect(number_property_1.coerceNumberProperty('pink', 111)).toBe(111);
    });
    it('should coerce an arbitrary string prefixed with a number to 0 or default', function () {
        expect(number_property_1.coerceNumberProperty('123pink')).toBe(0);
        expect(number_property_1.coerceNumberProperty('123pink', 111)).toBe(111);
    });
    it('should coerce the number 1 to 1', function () {
        expect(number_property_1.coerceNumberProperty(1)).toBe(1);
        expect(number_property_1.coerceNumberProperty(1, 111)).toBe(1);
    });
    it('should coerce the number 123.456 to 123.456', function () {
        expect(number_property_1.coerceNumberProperty(123.456)).toBe(123.456);
        expect(number_property_1.coerceNumberProperty(123.456, 111)).toBe(123.456);
    });
    it('should coerce the number -123.456 to -123.456', function () {
        expect(number_property_1.coerceNumberProperty(-123.456)).toBe(-123.456);
        expect(number_property_1.coerceNumberProperty(-123.456, 111)).toBe(-123.456);
    });
    it('should coerce an object to 0 or default', function () {
        expect(number_property_1.coerceNumberProperty({})).toBe(0);
        expect(number_property_1.coerceNumberProperty({}, 111)).toBe(111);
    });
    it('should coerce an array to 0 or default', function () {
        expect(number_property_1.coerceNumberProperty([])).toBe(0);
        expect(number_property_1.coerceNumberProperty([], 111)).toBe(111);
    });
});
//# sourceMappingURL=number-property.spec.js.map