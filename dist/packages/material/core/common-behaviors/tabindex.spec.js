"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tabindex_1 = require("./tabindex");
describe('mixinTabIndex', function () {
    it('should augment an existing class with a tabIndex property', function () {
        var classWithMixin = tabindex_1.mixinTabIndex(TestClass);
        var instance = new classWithMixin();
        expect(instance.tabIndex)
            .toBe(0, 'Expected the mixed-into class to have a tabIndex property');
        instance.tabIndex = 4;
        expect(instance.tabIndex)
            .toBe(4, 'Expected the mixed-into class to have an updated tabIndex property');
    });
    it('should set tabIndex to `-1` if the disabled property is set to true', function () {
        var classWithMixin = tabindex_1.mixinTabIndex(TestClass);
        var instance = new classWithMixin();
        expect(instance.tabIndex)
            .toBe(0, 'Expected tabIndex to be set to 0 initially');
        instance.disabled = true;
        expect(instance.tabIndex)
            .toBe(-1, 'Expected tabIndex to be set to -1 if the disabled property is set to true');
    });
    it('should allow having a custom default tabIndex value', function () {
        var classWithMixin = tabindex_1.mixinTabIndex(TestClass, 20);
        var instance = new classWithMixin();
        expect(instance.tabIndex)
            .toBe(20, 'Expected tabIndex to be set to 20 initially');
        instance.tabIndex = 0;
        expect(instance.tabIndex)
            .toBe(0, 'Expected tabIndex to still support 0 as value');
    });
});
var TestClass = /** @class */ (function () {
    function TestClass() {
        this.disabled = false;
    }
    return TestClass;
}());
//# sourceMappingURL=tabindex.spec.js.map