"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var index_1 = require("./index");
var core_2 = require("@angular/material/core");
describe('MatButton', function () {
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [index_1.MatButtonModule],
            declarations: [TestApp],
        });
        testing_1.TestBed.compileComponents();
    }));
    // General button tests
    it('should apply class based on color attribute', function () {
        var fixture = testing_1.TestBed.createComponent(TestApp);
        var testComponent = fixture.debugElement.componentInstance;
        var buttonDebugElement = fixture.debugElement.query(platform_browser_1.By.css('button'));
        var aDebugElement = fixture.debugElement.query(platform_browser_1.By.css('a'));
        testComponent.buttonColor = 'primary';
        fixture.detectChanges();
        expect(buttonDebugElement.nativeElement.classList.contains('mat-primary')).toBe(true);
        expect(aDebugElement.nativeElement.classList.contains('mat-primary')).toBe(true);
        testComponent.buttonColor = 'accent';
        fixture.detectChanges();
        expect(buttonDebugElement.nativeElement.classList.contains('mat-accent')).toBe(true);
        expect(aDebugElement.nativeElement.classList.contains('mat-accent')).toBe(true);
        testComponent.buttonColor = null;
        fixture.detectChanges();
        expect(buttonDebugElement.nativeElement.classList).not.toContain('mat-accent');
        expect(aDebugElement.nativeElement.classList).not.toContain('mat-accent');
    });
    it('should expose the ripple instance', function () {
        var fixture = testing_1.TestBed.createComponent(TestApp);
        var button = fixture.debugElement.query(platform_browser_1.By.css('button')).componentInstance;
        expect(button.ripple).toBeTruthy();
    });
    it('should should not clear previous defined classes', function () {
        var fixture = testing_1.TestBed.createComponent(TestApp);
        var testComponent = fixture.debugElement.componentInstance;
        var buttonDebugElement = fixture.debugElement.query(platform_browser_1.By.css('button'));
        buttonDebugElement.nativeElement.classList.add('custom-class');
        testComponent.buttonColor = 'primary';
        fixture.detectChanges();
        expect(buttonDebugElement.nativeElement.classList.contains('mat-primary')).toBe(true);
        expect(buttonDebugElement.nativeElement.classList.contains('custom-class')).toBe(true);
        testComponent.buttonColor = 'accent';
        fixture.detectChanges();
        expect(buttonDebugElement.nativeElement.classList.contains('mat-primary')).toBe(false);
        expect(buttonDebugElement.nativeElement.classList.contains('mat-accent')).toBe(true);
        expect(buttonDebugElement.nativeElement.classList.contains('custom-class')).toBe(true);
    });
    describe('button[mat-fab]', function () {
        it('should have accent palette by default', function () {
            var fixture = testing_1.TestBed.createComponent(TestApp);
            var fabButtonDebugEl = fixture.debugElement.query(platform_browser_1.By.css('button[mat-fab]'));
            fixture.detectChanges();
            expect(fabButtonDebugEl.nativeElement.classList)
                .toContain('mat-accent', 'Expected fab buttons to use accent palette by default');
        });
    });
    describe('button[mat-mini-fab]', function () {
        it('should have accent palette by default', function () {
            var fixture = testing_1.TestBed.createComponent(TestApp);
            var miniFabButtonDebugEl = fixture.debugElement.query(platform_browser_1.By.css('button[mat-mini-fab]'));
            fixture.detectChanges();
            expect(miniFabButtonDebugEl.nativeElement.classList)
                .toContain('mat-accent', 'Expected mini-fab buttons to use accent palette by default');
        });
    });
    // Regular button tests
    describe('button[mat-button]', function () {
        it('should handle a click on the button', function () {
            var fixture = testing_1.TestBed.createComponent(TestApp);
            var testComponent = fixture.debugElement.componentInstance;
            var buttonDebugElement = fixture.debugElement.query(platform_browser_1.By.css('button'));
            buttonDebugElement.nativeElement.click();
            expect(testComponent.clickCount).toBe(1);
        });
        it('should not increment if disabled', function () {
            var fixture = testing_1.TestBed.createComponent(TestApp);
            var testComponent = fixture.debugElement.componentInstance;
            var buttonDebugElement = fixture.debugElement.query(platform_browser_1.By.css('button'));
            testComponent.isDisabled = true;
            fixture.detectChanges();
            buttonDebugElement.nativeElement.click();
            expect(testComponent.clickCount).toBe(0);
        });
        it('should disable the native button element', function () {
            var fixture = testing_1.TestBed.createComponent(TestApp);
            var buttonNativeElement = fixture.nativeElement.querySelector('button');
            expect(buttonNativeElement.disabled).toBeFalsy('Expected button not to be disabled');
            fixture.componentInstance.isDisabled = true;
            fixture.detectChanges();
            expect(buttonNativeElement.disabled).toBeTruthy('Expected button to be disabled');
        });
    });
    // Anchor button tests
    describe('a[mat-button]', function () {
        it('should not redirect if disabled', function () {
            var fixture = testing_1.TestBed.createComponent(TestApp);
            var testComponent = fixture.debugElement.componentInstance;
            var buttonDebugElement = fixture.debugElement.query(platform_browser_1.By.css('a'));
            testComponent.isDisabled = true;
            fixture.detectChanges();
            buttonDebugElement.nativeElement.click();
        });
        it('should remove tabindex if disabled', function () {
            var fixture = testing_1.TestBed.createComponent(TestApp);
            var testComponent = fixture.debugElement.componentInstance;
            var buttonDebugElement = fixture.debugElement.query(platform_browser_1.By.css('a'));
            expect(buttonDebugElement.nativeElement.getAttribute('tabIndex')).toBe(null);
            testComponent.isDisabled = true;
            fixture.detectChanges();
            expect(buttonDebugElement.nativeElement.getAttribute('tabIndex')).toBe('-1');
        });
        it('should add aria-disabled attribute if disabled', function () {
            var fixture = testing_1.TestBed.createComponent(TestApp);
            var testComponent = fixture.debugElement.componentInstance;
            var buttonDebugElement = fixture.debugElement.query(platform_browser_1.By.css('a'));
            fixture.detectChanges();
            expect(buttonDebugElement.nativeElement.getAttribute('aria-disabled')).toBe('false');
            testComponent.isDisabled = true;
            fixture.detectChanges();
            expect(buttonDebugElement.nativeElement.getAttribute('aria-disabled')).toBe('true');
        });
        it('should not add aria-disabled attribute if disabled is false', function () {
            var fixture = testing_1.TestBed.createComponent(TestApp);
            var testComponent = fixture.debugElement.componentInstance;
            var buttonDebugElement = fixture.debugElement.query(platform_browser_1.By.css('a'));
            fixture.detectChanges();
            expect(buttonDebugElement.nativeElement.getAttribute('aria-disabled'))
                .toBe('false', 'Expect aria-disabled="false"');
            expect(buttonDebugElement.nativeElement.getAttribute('disabled'))
                .toBeNull('Expect disabled="false"');
            testComponent.isDisabled = false;
            fixture.detectChanges();
            expect(buttonDebugElement.nativeElement.getAttribute('aria-disabled'))
                .toBe('false', 'Expect no aria-disabled');
            expect(buttonDebugElement.nativeElement.getAttribute('disabled'))
                .toBeNull('Expect no disabled');
        });
        it('should be able to set a custom tabindex', function () {
            var fixture = testing_1.TestBed.createComponent(TestApp);
            var testComponent = fixture.debugElement.componentInstance;
            var buttonElement = fixture.debugElement.query(platform_browser_1.By.css('a')).nativeElement;
            fixture.componentInstance.tabIndex = 3;
            fixture.detectChanges();
            expect(buttonElement.getAttribute('tabIndex'))
                .toBe('3', 'Expected custom tabindex to be set');
            testComponent.isDisabled = true;
            fixture.detectChanges();
            expect(buttonElement.getAttribute('tabIndex'))
                .toBe('-1', 'Expected custom tabindex to be overwritten when disabled.');
        });
    });
    // Ripple tests.
    describe('button ripples', function () {
        var fixture;
        var testComponent;
        var buttonDebugElement;
        var buttonRippleDebugElement;
        var buttonRippleInstance;
        var anchorDebugElement;
        var anchorRippleDebugElement;
        var anchorRippleInstance;
        beforeEach(function () {
            fixture = testing_1.TestBed.createComponent(TestApp);
            fixture.detectChanges();
            testComponent = fixture.componentInstance;
            buttonDebugElement = fixture.debugElement.query(platform_browser_1.By.css('button[mat-button]'));
            buttonRippleDebugElement = buttonDebugElement.query(platform_browser_1.By.directive(core_2.MatRipple));
            buttonRippleInstance = buttonRippleDebugElement.injector.get(core_2.MatRipple);
            anchorDebugElement = fixture.debugElement.query(platform_browser_1.By.css('a[mat-button]'));
            anchorRippleDebugElement = anchorDebugElement.query(platform_browser_1.By.directive(core_2.MatRipple));
            anchorRippleInstance = anchorRippleDebugElement.injector.get(core_2.MatRipple);
        });
        it('should disable the ripple if matRippleDisabled input is set', function () {
            expect(buttonRippleInstance.disabled).toBeFalsy();
            testComponent.rippleDisabled = true;
            fixture.detectChanges();
            expect(buttonRippleInstance.disabled).toBeTruthy();
        });
        it('should disable the ripple when the button is disabled', function () {
            expect(buttonRippleInstance.disabled).toBeFalsy('Expected an enabled button[mat-button] to have an enabled ripple');
            expect(anchorRippleInstance.disabled).toBeFalsy('Expected an enabled a[mat-button] to have an enabled ripple');
            testComponent.isDisabled = true;
            fixture.detectChanges();
            expect(buttonRippleInstance.disabled).toBeTruthy('Expected a disabled button[mat-button] not to have an enabled ripple');
            expect(anchorRippleInstance.disabled).toBeTruthy('Expected a disabled a[mat-button] not to have an enabled ripple');
        });
    });
});
/** Test component that contains an MatButton. */
var TestApp = /** @class */ (function () {
    function TestApp() {
        this.clickCount = 0;
        this.isDisabled = false;
        this.rippleDisabled = false;
    }
    TestApp.prototype.increment = function () {
        this.clickCount++;
    };
    TestApp.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'test-app',
                    template: "\n    <button [tabIndex]=\"tabIndex\" mat-button type=\"button\" (click)=\"increment()\"\n      [disabled]=\"isDisabled\" [color]=\"buttonColor\" [disableRipple]=\"rippleDisabled\">\n      Go\n    </button>\n    <a [tabIndex]=\"tabIndex\" href=\"http://www.google.com\" mat-button [disabled]=\"isDisabled\"\n      [color]=\"buttonColor\">\n      Link\n    </a>\n    <button mat-fab>Fab Button</button>\n    <button mat-mini-fab>Mini Fab Button</button>\n  "
                },] },
    ];
    return TestApp;
}());
//# sourceMappingURL=button.spec.js.map