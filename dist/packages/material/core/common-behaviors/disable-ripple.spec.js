"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var disable_ripple_1 = require("./disable-ripple");
describe('mixinDisableRipple', function () {
    it('should augment an existing class with a disableRipple property', function () {
        var classWithMixin = disable_ripple_1.mixinDisableRipple(TestClass);
        var instance = new classWithMixin();
        expect(instance.disableRipple)
            .toBe(false, 'Expected the mixed-into class to have a disable-ripple property');
        instance.disableRipple = true;
        expect(instance.disableRipple)
            .toBe(true, 'Expected the mixed-into class to have an updated disable-ripple property');
    });
    it('should coerce values being passed to the disableRipple property', function () {
        var classWithMixin = disable_ripple_1.mixinDisableRipple(TestClass);
        var instance = new classWithMixin();
        expect(instance.disableRipple)
            .toBe(false, 'Expected disableRipple to be set to false initially');
        // Setting string values to the disableRipple property should be prevented by TypeScript's
        // type checking, but developers can still set string values from their template bindings.
        // Setting string values to the disableRipple property should be prevented by TypeScript's
        // type checking, but developers can still set string values from their template bindings.
        instance.disableRipple = '';
        expect(instance.disableRipple)
            .toBe(true, 'Expected disableRipple to be set to true if an empty string is set as value');
    });
});
var TestClass = /** @class */ (function () {
    function TestClass() {
    }
    return TestClass;
}());
//# sourceMappingURL=disable-ripple.spec.js.map