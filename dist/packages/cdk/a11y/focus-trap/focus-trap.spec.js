"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var platform_1 = require("@angular/cdk/platform");
var core_1 = require("@angular/core");
var testing_1 = require("@angular/core/testing");
var index_1 = require("../index");
describe('FocusTrap', function () {
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [index_1.A11yModule],
            declarations: [
                FocusTrapWithBindings,
                SimpleFocusTrap,
                FocusTrapTargets,
                FocusTrapWithSvg,
                FocusTrapWithoutFocusableElements,
                FocusTrapWithAutoCapture,
            ],
        });
        testing_1.TestBed.compileComponents();
    }));
    describe('with default element', function () {
        var fixture;
        var focusTrapInstance;
        beforeEach(function () {
            fixture = testing_1.TestBed.createComponent(SimpleFocusTrap);
            fixture.detectChanges();
            focusTrapInstance = fixture.componentInstance.focusTrapDirective.focusTrap;
        });
        it('wrap focus from end to start', function () {
            // Because we can't mimic a real tab press focus change in a unit test, just call the
            // focus event handler directly.
            var result = focusTrapInstance.focusFirstTabbableElement();
            expect(document.activeElement.nodeName.toLowerCase())
                .toBe('input', 'Expected input element to be focused');
            expect(result).toBe(true, 'Expected return value to be true if focus was shifted.');
        });
        it('should wrap focus from start to end', function () {
            // Because we can't mimic a real tab press focus change in a unit test, just call the
            // focus event handler directly.
            var result = focusTrapInstance.focusLastTabbableElement();
            var platformId = testing_1.TestBed.get(core_1.PLATFORM_ID);
            // In iOS button elements are never tabbable, so the last element will be the input.
            var lastElement = new platform_1.Platform(platformId).IOS ? 'input' : 'button';
            expect(document.activeElement.nodeName.toLowerCase())
                .toBe(lastElement, "Expected " + lastElement + " element to be focused");
            expect(result).toBe(true, 'Expected return value to be true if focus was shifted.');
        });
        it('should return false if it did not manage to find a focusable element', function () {
            fixture.destroy();
            var newFixture = testing_1.TestBed.createComponent(FocusTrapWithoutFocusableElements);
            newFixture.detectChanges();
            var focusTrap = newFixture.componentInstance.focusTrapDirective.focusTrap;
            var result = focusTrap.focusFirstTabbableElement();
            expect(result).toBe(false);
        });
        it('should be enabled by default', function () {
            expect(focusTrapInstance.enabled).toBe(true);
        });
    });
    describe('with bindings', function () {
        var fixture;
        beforeEach(function () {
            fixture = testing_1.TestBed.createComponent(FocusTrapWithBindings);
            fixture.detectChanges();
        });
        it('should clean up its anchor sibling elements on destroy', function () {
            var rootElement = fixture.debugElement.nativeElement;
            expect(rootElement.querySelectorAll('div.cdk-visually-hidden').length).toBe(2);
            fixture.componentInstance.renderFocusTrap = false;
            fixture.detectChanges();
            expect(rootElement.querySelectorAll('div.cdk-visually-hidden').length).toBe(0);
        });
        it('should set the appropriate tabindex on the anchors, based on the disabled state', function () {
            var anchors = Array.from(fixture.debugElement.nativeElement.querySelectorAll('div.cdk-visually-hidden'));
            expect(anchors.every(function (current) { return current.getAttribute('tabindex') === '0'; })).toBe(true);
            fixture.componentInstance._isFocusTrapEnabled = false;
            fixture.detectChanges();
            expect(anchors.every(function (current) { return current.getAttribute('tabindex') === '-1'; })).toBe(true);
        });
    });
    describe('with focus targets', function () {
        var fixture;
        var focusTrapInstance;
        beforeEach(function () {
            fixture = testing_1.TestBed.createComponent(FocusTrapTargets);
            fixture.detectChanges();
            focusTrapInstance = fixture.componentInstance.focusTrapDirective.focusTrap;
        });
        it('should be able to set initial focus target', function () {
            // Because we can't mimic a real tab press focus change in a unit test, just call the
            // focus event handler directly.
            focusTrapInstance.focusInitialElement();
            expect(document.activeElement.id).toBe('middle');
        });
        it('should be able to prioritize the first focus target', function () {
            // Because we can't mimic a real tab press focus change in a unit test, just call the
            // focus event handler directly.
            focusTrapInstance.focusFirstTabbableElement();
            expect(document.activeElement.id).toBe('first');
        });
        it('should be able to prioritize the last focus target', function () {
            // Because we can't mimic a real tab press focus change in a unit test, just call the
            // focus event handler directly.
            focusTrapInstance.focusLastTabbableElement();
            expect(document.activeElement.id).toBe('last');
        });
    });
    describe('special cases', function () {
        it('should not throw when it has a SVG child', function () {
            var fixture = testing_1.TestBed.createComponent(FocusTrapWithSvg);
            fixture.detectChanges();
            var focusTrapInstance = fixture.componentInstance.focusTrapDirective.focusTrap;
            expect(function () { return focusTrapInstance.focusFirstTabbableElement(); }).not.toThrow();
            expect(function () { return focusTrapInstance.focusLastTabbableElement(); }).not.toThrow();
        });
    });
    describe('with autoCapture', function () {
        it('should automatically capture and return focus on init / destroy', testing_1.async(function () {
            var fixture = testing_1.TestBed.createComponent(FocusTrapWithAutoCapture);
            fixture.detectChanges();
            var buttonOutsideTrappedRegion = fixture.nativeElement.querySelector('button');
            buttonOutsideTrappedRegion.focus();
            expect(document.activeElement).toBe(buttonOutsideTrappedRegion);
            fixture.componentInstance.showTrappedRegion = true;
            fixture.detectChanges();
            fixture.whenStable().then(function () {
                expect(document.activeElement.id).toBe('auto-capture-target');
                fixture.destroy();
                expect(document.activeElement).toBe(buttonOutsideTrappedRegion);
            });
        }));
    });
});
var SimpleFocusTrap = /** @class */ (function () {
    function SimpleFocusTrap() {
    }
    SimpleFocusTrap.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <div cdkTrapFocus>\n      <input>\n      <button>SAVE</button>\n    </div>\n    "
                },] },
    ];
    /** @nocollapse */
    SimpleFocusTrap.propDecorators = {
        "focusTrapDirective": [{ type: core_1.ViewChild, args: [index_1.CdkTrapFocus,] },],
    };
    return SimpleFocusTrap;
}());
var FocusTrapWithAutoCapture = /** @class */ (function () {
    function FocusTrapWithAutoCapture() {
        this.showTrappedRegion = false;
    }
    FocusTrapWithAutoCapture.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <button type=\"button\">Toggle</button>\n    <div *ngIf=\"showTrappedRegion\" cdkTrapFocus cdkTrapFocusAutoCapture>\n      <input id=\"auto-capture-target\">\n      <button>SAVE</button>\n    </div>\n    "
                },] },
    ];
    /** @nocollapse */
    FocusTrapWithAutoCapture.propDecorators = {
        "focusTrapDirective": [{ type: core_1.ViewChild, args: [index_1.CdkTrapFocus,] },],
    };
    return FocusTrapWithAutoCapture;
}());
var FocusTrapWithBindings = /** @class */ (function () {
    function FocusTrapWithBindings() {
        this.renderFocusTrap = true;
        this._isFocusTrapEnabled = true;
    }
    FocusTrapWithBindings.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <div *ngIf=\"renderFocusTrap\" [cdkTrapFocus]=\"_isFocusTrapEnabled\">\n      <input>\n      <button>SAVE</button>\n    </div>\n    "
                },] },
    ];
    /** @nocollapse */
    FocusTrapWithBindings.propDecorators = {
        "focusTrapDirective": [{ type: core_1.ViewChild, args: [index_1.CdkTrapFocus,] },],
    };
    return FocusTrapWithBindings;
}());
var FocusTrapTargets = /** @class */ (function () {
    function FocusTrapTargets() {
    }
    FocusTrapTargets.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <div cdkTrapFocus>\n      <input>\n      <button>before</button>\n      <button id=\"first\" cdkFocusRegionStart></button>\n      <button id=\"middle\" cdkFocusInitial></button>\n      <button id=\"last\" cdkFocusRegionEnd></button>\n      <button>after</button>\n      <input>\n    </div>\n    "
                },] },
    ];
    /** @nocollapse */
    FocusTrapTargets.propDecorators = {
        "focusTrapDirective": [{ type: core_1.ViewChild, args: [index_1.CdkTrapFocus,] },],
    };
    return FocusTrapTargets;
}());
var FocusTrapWithSvg = /** @class */ (function () {
    function FocusTrapWithSvg() {
    }
    FocusTrapWithSvg.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <div cdkTrapFocus>\n      <svg xmlns=\"http://www.w3.org/2000/svg\">\n        <circle cx=\"100\" cy=\"100\" r=\"100\"/>\n      </svg>\n    </div>\n    "
                },] },
    ];
    /** @nocollapse */
    FocusTrapWithSvg.propDecorators = {
        "focusTrapDirective": [{ type: core_1.ViewChild, args: [index_1.CdkTrapFocus,] },],
    };
    return FocusTrapWithSvg;
}());
var FocusTrapWithoutFocusableElements = /** @class */ (function () {
    function FocusTrapWithoutFocusableElements() {
    }
    FocusTrapWithoutFocusableElements.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <div cdkTrapFocus>\n      <p>Hello</p>\n    </div>\n    "
                },] },
    ];
    /** @nocollapse */
    FocusTrapWithoutFocusableElements.propDecorators = {
        "focusTrapDirective": [{ type: core_1.ViewChild, args: [index_1.CdkTrapFocus,] },],
    };
    return FocusTrapWithoutFocusableElements;
}());
//# sourceMappingURL=focus-trap.spec.js.map