"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var testing_2 = require("@angular/cdk/testing");
var index_1 = require("./index");
describe('MatOption component', function () {
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [index_1.MatOptionModule],
            declarations: [OptionWithDisable]
        }).compileComponents();
    }));
    it('should complete the `stateChanges` stream on destroy', function () {
        var fixture = testing_1.TestBed.createComponent(OptionWithDisable);
        fixture.detectChanges();
        var optionInstance = fixture.debugElement.query(platform_browser_1.By.directive(index_1.MatOption)).componentInstance;
        var completeSpy = jasmine.createSpy('complete spy');
        var subscription = optionInstance._stateChanges.subscribe(undefined, undefined, completeSpy);
        fixture.destroy();
        expect(completeSpy).toHaveBeenCalled();
        subscription.unsubscribe();
    });
    it('should not emit to `onSelectionChange` if selecting an already-selected option', function () {
        var fixture = testing_1.TestBed.createComponent(OptionWithDisable);
        fixture.detectChanges();
        var optionInstance = fixture.debugElement.query(platform_browser_1.By.directive(index_1.MatOption)).componentInstance;
        optionInstance.select();
        expect(optionInstance.selected).toBe(true);
        var spy = jasmine.createSpy('selection change spy');
        var subscription = optionInstance.onSelectionChange.subscribe(spy);
        optionInstance.select();
        fixture.detectChanges();
        expect(optionInstance.selected).toBe(true);
        expect(spy).not.toHaveBeenCalled();
        subscription.unsubscribe();
    });
    it('should not emit to `onSelectionChange` if deselecting an unselected option', function () {
        var fixture = testing_1.TestBed.createComponent(OptionWithDisable);
        fixture.detectChanges();
        var optionInstance = fixture.debugElement.query(platform_browser_1.By.directive(index_1.MatOption)).componentInstance;
        optionInstance.deselect();
        expect(optionInstance.selected).toBe(false);
        var spy = jasmine.createSpy('selection change spy');
        var subscription = optionInstance.onSelectionChange.subscribe(spy);
        optionInstance.deselect();
        fixture.detectChanges();
        expect(optionInstance.selected).toBe(false);
        expect(spy).not.toHaveBeenCalled();
        subscription.unsubscribe();
    });
    describe('ripples', function () {
        var fixture;
        var optionDebugElement;
        var optionNativeElement;
        var optionInstance;
        beforeEach(function () {
            fixture = testing_1.TestBed.createComponent(OptionWithDisable);
            fixture.detectChanges();
            optionDebugElement = fixture.debugElement.query(platform_browser_1.By.directive(index_1.MatOption));
            optionNativeElement = optionDebugElement.nativeElement;
            optionInstance = optionDebugElement.componentInstance;
        });
        it('should show ripples by default', function () {
            expect(optionInstance.disableRipple).toBeFalsy('Expected ripples to be enabled by default');
            expect(optionNativeElement.querySelectorAll('.mat-ripple-element').length)
                .toBe(0, 'Expected no ripples to show up initially');
            testing_2.dispatchFakeEvent(optionNativeElement, 'mousedown');
            testing_2.dispatchFakeEvent(optionNativeElement, 'mouseup');
            expect(optionNativeElement.querySelectorAll('.mat-ripple-element').length)
                .toBe(1, 'Expected one ripple to show up after a fake click.');
        });
        it('should not show ripples if the option is disabled', function () {
            expect(optionNativeElement.querySelectorAll('.mat-ripple-element').length)
                .toBe(0, 'Expected no ripples to show up initially');
            fixture.componentInstance.disabled = true;
            fixture.detectChanges();
            testing_2.dispatchFakeEvent(optionNativeElement, 'mousedown');
            testing_2.dispatchFakeEvent(optionNativeElement, 'mouseup');
            expect(optionNativeElement.querySelectorAll('.mat-ripple-element').length)
                .toBe(0, 'Expected no ripples to show up after click on a disabled option.');
        });
    });
});
var OptionWithDisable = /** @class */ (function () {
    function OptionWithDisable() {
    }
    OptionWithDisable.decorators = [
        { type: core_1.Component, args: [{
                    template: "<mat-option [disabled]=\"disabled\"></mat-option>"
                },] },
    ];
    return OptionWithDisable;
}());
//# sourceMappingURL=option.spec.js.map