"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var color_1 = require("./color");
var core_1 = require("@angular/core");
describe('MixinColor', function () {
    it('should augment an existing class with a color property', function () {
        var classWithColor = color_1.mixinColor(TestClass);
        var instance = new classWithColor();
        expect(instance.color)
            .toBeFalsy('Expected the mixed-into class to have a color property');
        instance.color = 'accent';
        expect(instance.color)
            .toBe('accent', 'Expected the mixed-into class to have an updated color property');
    });
    it('should remove old color classes if new color is set', function () {
        var classWithColor = color_1.mixinColor(TestClass);
        var instance = new classWithColor();
        expect(instance.testElement.classList.length)
            .toBe(0, 'Expected the element to not have any classes at initialization');
        instance.color = 'primary';
        expect(instance.testElement.classList)
            .toContain('mat-primary', 'Expected the element to have the "mat-primary" class set');
        instance.color = 'accent';
        expect(instance.testElement.classList)
            .not.toContain('mat-primary', 'Expected the element to no longer have "mat-primary" set.');
        expect(instance.testElement.classList)
            .toContain('mat-accent', 'Expected the element to have the "mat-accent" class set');
    });
    it('should allow having no color set', function () {
        var classWithColor = color_1.mixinColor(TestClass);
        var instance = new classWithColor();
        expect(instance.testElement.classList.length)
            .toBe(0, 'Expected the element to not have any classes at initialization');
        instance.color = 'primary';
        expect(instance.testElement.classList)
            .toContain('mat-primary', 'Expected the element to have the "mat-primary" class set');
        instance.color = undefined;
        expect(instance.testElement.classList.length)
            .toBe(0, 'Expected the element to have no color class set.');
    });
    it('should allow having a default color if specified', function () {
        var classWithColor = color_1.mixinColor(TestClass, 'accent');
        var instance = new classWithColor();
        expect(instance.testElement.classList)
            .toContain('mat-accent', 'Expected the element to have the "mat-accent" class by default.');
        instance.color = undefined;
        expect(instance.testElement.classList)
            .toContain('mat-accent', 'Expected the default color "mat-accent" to be set.');
    });
});
var TestClass = /** @class */ (function () {
    function TestClass() {
        this.testElement = document.createElement('div');
        /** Fake instance of an ElementRef. */
        this._elementRef = new core_1.ElementRef(this.testElement);
    }
    return TestClass;
}());
//# sourceMappingURL=color.spec.js.map