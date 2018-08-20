"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var disabled_1 = require("./disabled");
describe('MixinDisabled', function () {
    it('should augment an existing class with a disabled property', function () {
        var EmptyClass = /** @class */ (function () {
            function EmptyClass() {
            }
            return EmptyClass;
        }());
        var classWithDisabled = disabled_1.mixinDisabled(EmptyClass);
        var instance = new classWithDisabled();
        expect(instance.disabled)
            .toBe(false, 'Expected the mixed-into class to have a disabled property');
        instance.disabled = true;
        expect(instance.disabled)
            .toBe(true, 'Expected the mixed-into class to have an updated disabled property');
    });
});
//# sourceMappingURL=disabled.spec.js.map