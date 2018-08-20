"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var boolean_property_1 = require("./boolean-property");
describe('coerceBooleanProperty', function () {
    it('should coerce undefined to false', function () {
        expect(boolean_property_1.coerceBooleanProperty(undefined)).toBe(false);
    });
    it('should coerce null to false', function () {
        expect(boolean_property_1.coerceBooleanProperty(null)).toBe(false);
    });
    it('should coerce the empty string to true', function () {
        expect(boolean_property_1.coerceBooleanProperty('')).toBe(true);
    });
    it('should coerce zero to true', function () {
        expect(boolean_property_1.coerceBooleanProperty(0)).toBe(true);
    });
    it('should coerce the string "false" to false', function () {
        expect(boolean_property_1.coerceBooleanProperty('false')).toBe(false);
    });
    it('should coerce the boolean false to false', function () {
        expect(boolean_property_1.coerceBooleanProperty(false)).toBe(false);
    });
    it('should coerce the boolean true to true', function () {
        expect(boolean_property_1.coerceBooleanProperty(true)).toBe(true);
    });
    it('should coerce the string "true" to true', function () {
        expect(boolean_property_1.coerceBooleanProperty('true')).toBe(true);
    });
    it('should coerce an arbitrary string to true', function () {
        expect(boolean_property_1.coerceBooleanProperty('pink')).toBe(true);
    });
    it('should coerce an object to true', function () {
        expect(boolean_property_1.coerceBooleanProperty({})).toBe(true);
    });
    it('should coerce an array to true', function () {
        expect(boolean_property_1.coerceBooleanProperty([])).toBe(true);
    });
});
//# sourceMappingURL=boolean-property.spec.js.map