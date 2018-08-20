"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var css_pixel_value_1 = require("./css-pixel-value");
describe('coerceCssPixelValue', function () {
    it('should add pixel units to a number value', function () {
        expect(css_pixel_value_1.coerceCssPixelValue(1337)).toBe('1337px');
    });
    it('should ignore string values', function () {
        expect(css_pixel_value_1.coerceCssPixelValue('1337rem')).toBe('1337rem');
    });
    it('should return an empty string for null', function () {
        expect(css_pixel_value_1.coerceCssPixelValue(null)).toBe('');
    });
    it('should return an empty string for undefined', function () {
        expect(css_pixel_value_1.coerceCssPixelValue(undefined)).toBe('');
    });
});
//# sourceMappingURL=css-pixel-value.spec.js.map