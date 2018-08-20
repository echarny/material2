"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var keycodes_1 = require("@angular/cdk/keycodes");
var testing_1 = require("@angular/cdk/testing");
var core_1 = require("@angular/core");
var testing_2 = require("@angular/core/testing");
var platform_browser_1 = require("@angular/platform-browser");
var index_1 = require("../index");
var focus_monitor_1 = require("./focus-monitor");
describe('FocusMonitor', function () {
    var fixture;
    var buttonElement;
    var focusMonitor;
    var changeHandler;
    beforeEach(function () {
        testing_2.TestBed.configureTestingModule({
            imports: [index_1.A11yModule],
            declarations: [
                PlainButton,
            ],
        }).compileComponents();
    });
    beforeEach(testing_2.inject([focus_monitor_1.FocusMonitor], function (fm) {
        fixture = testing_2.TestBed.createComponent(PlainButton);
        fixture.detectChanges();
        buttonElement = fixture.debugElement.query(platform_browser_1.By.css('button')).nativeElement;
        focusMonitor = fm;
        changeHandler = jasmine.createSpy('focus origin change handler');
        focusMonitor.monitor(buttonElement).subscribe(changeHandler);
        testing_1.patchElementFocus(buttonElement);
    }));
    it('manually registered element should receive focus classes', testing_2.fakeAsync(function () {
        buttonElement.focus();
        fixture.detectChanges();
        testing_2.tick();
        expect(buttonElement.classList.contains('cdk-focused'))
            .toBe(true, 'button should have cdk-focused class');
        expect(changeHandler).toHaveBeenCalledTimes(1);
    }));
    it('should detect focus via keyboard', testing_2.fakeAsync(function () {
        // Simulate focus via keyboard.
        // Simulate focus via keyboard.
        testing_1.dispatchKeyboardEvent(document, 'keydown', keycodes_1.TAB);
        buttonElement.focus();
        fixture.detectChanges();
        testing_2.flush();
        expect(buttonElement.classList.length)
            .toBe(2, 'button should have exactly 2 focus classes');
        expect(buttonElement.classList.contains('cdk-focused'))
            .toBe(true, 'button should have cdk-focused class');
        expect(buttonElement.classList.contains('cdk-keyboard-focused'))
            .toBe(true, 'button should have cdk-keyboard-focused class');
        expect(changeHandler).toHaveBeenCalledWith('keyboard');
    }));
    it('should detect focus via mouse', testing_2.fakeAsync(function () {
        // Simulate focus via mouse.
        // Simulate focus via mouse.
        testing_1.dispatchMouseEvent(buttonElement, 'mousedown');
        buttonElement.focus();
        fixture.detectChanges();
        testing_2.flush();
        expect(buttonElement.classList.length)
            .toBe(2, 'button should have exactly 2 focus classes');
        expect(buttonElement.classList.contains('cdk-focused'))
            .toBe(true, 'button should have cdk-focused class');
        expect(buttonElement.classList.contains('cdk-mouse-focused'))
            .toBe(true, 'button should have cdk-mouse-focused class');
        expect(changeHandler).toHaveBeenCalledWith('mouse');
    }));
    it('should detect focus via touch', testing_2.fakeAsync(function () {
        // Simulate focus via touch.
        // Simulate focus via touch.
        testing_1.dispatchFakeEvent(buttonElement, 'touchstart');
        buttonElement.focus();
        fixture.detectChanges();
        testing_2.tick(focus_monitor_1.TOUCH_BUFFER_MS);
        expect(buttonElement.classList.length)
            .toBe(2, 'button should have exactly 2 focus classes');
        expect(buttonElement.classList.contains('cdk-focused'))
            .toBe(true, 'button should have cdk-focused class');
        expect(buttonElement.classList.contains('cdk-touch-focused'))
            .toBe(true, 'button should have cdk-touch-focused class');
        expect(changeHandler).toHaveBeenCalledWith('touch');
    }));
    it('should detect programmatic focus', testing_2.fakeAsync(function () {
        // Programmatically focus.
        buttonElement.focus();
        fixture.detectChanges();
        testing_2.tick();
        expect(buttonElement.classList.length)
            .toBe(2, 'button should have exactly 2 focus classes');
        expect(buttonElement.classList.contains('cdk-focused'))
            .toBe(true, 'button should have cdk-focused class');
        expect(buttonElement.classList.contains('cdk-program-focused'))
            .toBe(true, 'button should have cdk-program-focused class');
        expect(changeHandler).toHaveBeenCalledWith('program');
    }));
    it('focusVia keyboard should simulate keyboard focus', testing_2.fakeAsync(function () {
        focusMonitor.focusVia(buttonElement, 'keyboard');
        testing_2.flush();
        expect(buttonElement.classList.length)
            .toBe(2, 'button should have exactly 2 focus classes');
        expect(buttonElement.classList.contains('cdk-focused'))
            .toBe(true, 'button should have cdk-focused class');
        expect(buttonElement.classList.contains('cdk-keyboard-focused'))
            .toBe(true, 'button should have cdk-keyboard-focused class');
        expect(changeHandler).toHaveBeenCalledWith('keyboard');
    }));
    it('focusVia mouse should simulate mouse focus', testing_2.fakeAsync(function () {
        focusMonitor.focusVia(buttonElement, 'mouse');
        fixture.detectChanges();
        testing_2.flush();
        expect(buttonElement.classList.length)
            .toBe(2, 'button should have exactly 2 focus classes');
        expect(buttonElement.classList.contains('cdk-focused'))
            .toBe(true, 'button should have cdk-focused class');
        expect(buttonElement.classList.contains('cdk-mouse-focused'))
            .toBe(true, 'button should have cdk-mouse-focused class');
        expect(changeHandler).toHaveBeenCalledWith('mouse');
    }));
    it('focusVia mouse should simulate mouse focus', testing_2.fakeAsync(function () {
        focusMonitor.focusVia(buttonElement, 'touch');
        fixture.detectChanges();
        testing_2.flush();
        expect(buttonElement.classList.length)
            .toBe(2, 'button should have exactly 2 focus classes');
        expect(buttonElement.classList.contains('cdk-focused'))
            .toBe(true, 'button should have cdk-focused class');
        expect(buttonElement.classList.contains('cdk-touch-focused'))
            .toBe(true, 'button should have cdk-touch-focused class');
        expect(changeHandler).toHaveBeenCalledWith('touch');
    }));
    it('focusVia program should simulate programmatic focus', testing_2.fakeAsync(function () {
        focusMonitor.focusVia(buttonElement, 'program');
        fixture.detectChanges();
        testing_2.flush();
        expect(buttonElement.classList.length)
            .toBe(2, 'button should have exactly 2 focus classes');
        expect(buttonElement.classList.contains('cdk-focused'))
            .toBe(true, 'button should have cdk-focused class');
        expect(buttonElement.classList.contains('cdk-program-focused'))
            .toBe(true, 'button should have cdk-program-focused class');
        expect(changeHandler).toHaveBeenCalledWith('program');
    }));
    it('should remove focus classes on blur', testing_2.fakeAsync(function () {
        buttonElement.focus();
        fixture.detectChanges();
        testing_2.tick();
        expect(buttonElement.classList.length)
            .toBe(2, 'button should have exactly 2 focus classes');
        expect(changeHandler).toHaveBeenCalledWith('program');
        // Call `blur` directly because invoking `buttonElement.blur()` does not always trigger the
        // handler on IE11 on SauceLabs.
        focusMonitor._onBlur({}, buttonElement);
        fixture.detectChanges();
        expect(buttonElement.classList.length)
            .toBe(0, 'button should not have any focus classes');
        expect(changeHandler).toHaveBeenCalledWith(null);
    }));
    it('should remove classes on stopMonitoring', testing_2.fakeAsync(function () {
        buttonElement.focus();
        fixture.detectChanges();
        testing_2.tick();
        expect(buttonElement.classList.length).toBe(2, 'button should have exactly 2 focus classes');
        focusMonitor.stopMonitoring(buttonElement);
        fixture.detectChanges();
        expect(buttonElement.classList.length).toBe(0, 'button should not have any focus classes');
    }));
    it('should remove classes when destroyed', testing_2.fakeAsync(function () {
        buttonElement.focus();
        fixture.detectChanges();
        testing_2.tick();
        expect(buttonElement.classList.length).toBe(2, 'button should have exactly 2 focus classes');
        // Destroy manually since destroying the fixture won't do it.
        focusMonitor.ngOnDestroy();
        fixture.detectChanges();
        expect(buttonElement.classList.length).toBe(0, 'button should not have any focus classes');
    }));
    it('should pass focus options to the native focus method', testing_2.fakeAsync(function () {
        spyOn(buttonElement, 'focus');
        focusMonitor.focusVia(buttonElement, 'program', { preventScroll: true });
        fixture.detectChanges();
        testing_2.flush();
        expect(buttonElement.focus).toHaveBeenCalledWith(jasmine.objectContaining({
            preventScroll: true
        }));
    }));
    it('should not clear the focus origin too early in the current event loop', testing_2.fakeAsync(function () {
        testing_1.dispatchKeyboardEvent(document, 'keydown', keycodes_1.TAB);
        // Simulate the behavior of Firefox 57 where the focus event sometimes happens *one* tick later.
        // Simulate the behavior of Firefox 57 where the focus event sometimes happens *one* tick later.
        testing_2.tick();
        buttonElement.focus();
        // Since the timeout doesn't clear the focus origin too early as with the `0ms` timeout, the
        // focus origin should be reported properly.
        expect(changeHandler).toHaveBeenCalledWith('keyboard');
        testing_2.flush();
    }));
});
describe('cdkMonitorFocus', function () {
    beforeEach(function () {
        testing_2.TestBed.configureTestingModule({
            imports: [index_1.A11yModule],
            declarations: [
                ButtonWithFocusClasses,
                ComplexComponentWithMonitorElementFocus,
                ComplexComponentWithMonitorSubtreeFocus,
                ComplexComponentWithMonitorSubtreeFocusAndMonitorElementFocus,
            ],
        }).compileComponents();
    });
    describe('button with cdkMonitorElementFocus', function () {
        var fixture;
        var buttonElement;
        beforeEach(function () {
            fixture = testing_2.TestBed.createComponent(ButtonWithFocusClasses);
            fixture.detectChanges();
            spyOn(fixture.componentInstance, 'focusChanged');
            buttonElement = fixture.debugElement.query(platform_browser_1.By.css('button')).nativeElement;
            testing_1.patchElementFocus(buttonElement);
        });
        it('should initially not be focused', function () {
            expect(buttonElement.classList.length).toBe(0, 'button should not have focus classes');
        });
        it('should detect focus via keyboard', testing_2.fakeAsync(function () {
            // Simulate focus via keyboard.
            // Simulate focus via keyboard.
            testing_1.dispatchKeyboardEvent(document, 'keydown', keycodes_1.TAB);
            buttonElement.focus();
            fixture.detectChanges();
            testing_2.flush();
            expect(buttonElement.classList.length)
                .toBe(2, 'button should have exactly 2 focus classes');
            expect(buttonElement.classList.contains('cdk-focused'))
                .toBe(true, 'button should have cdk-focused class');
            expect(buttonElement.classList.contains('cdk-keyboard-focused'))
                .toBe(true, 'button should have cdk-keyboard-focused class');
            expect(fixture.componentInstance.focusChanged).toHaveBeenCalledWith('keyboard');
        }));
        it('should detect focus via mouse', testing_2.fakeAsync(function () {
            // Simulate focus via mouse.
            // Simulate focus via mouse.
            testing_1.dispatchMouseEvent(buttonElement, 'mousedown');
            buttonElement.focus();
            fixture.detectChanges();
            testing_2.flush();
            expect(buttonElement.classList.length)
                .toBe(2, 'button should have exactly 2 focus classes');
            expect(buttonElement.classList.contains('cdk-focused'))
                .toBe(true, 'button should have cdk-focused class');
            expect(buttonElement.classList.contains('cdk-mouse-focused'))
                .toBe(true, 'button should have cdk-mouse-focused class');
            expect(fixture.componentInstance.focusChanged).toHaveBeenCalledWith('mouse');
        }));
        it('should detect focus via touch', testing_2.fakeAsync(function () {
            // Simulate focus via touch.
            // Simulate focus via touch.
            testing_1.dispatchFakeEvent(buttonElement, 'touchstart');
            buttonElement.focus();
            fixture.detectChanges();
            testing_2.tick(focus_monitor_1.TOUCH_BUFFER_MS);
            expect(buttonElement.classList.length)
                .toBe(2, 'button should have exactly 2 focus classes');
            expect(buttonElement.classList.contains('cdk-focused'))
                .toBe(true, 'button should have cdk-focused class');
            expect(buttonElement.classList.contains('cdk-touch-focused'))
                .toBe(true, 'button should have cdk-touch-focused class');
            expect(fixture.componentInstance.focusChanged).toHaveBeenCalledWith('touch');
        }));
        it('should detect programmatic focus', testing_2.fakeAsync(function () {
            // Programmatically focus.
            buttonElement.focus();
            fixture.detectChanges();
            testing_2.tick();
            expect(buttonElement.classList.length)
                .toBe(2, 'button should have exactly 2 focus classes');
            expect(buttonElement.classList.contains('cdk-focused'))
                .toBe(true, 'button should have cdk-focused class');
            expect(buttonElement.classList.contains('cdk-program-focused'))
                .toBe(true, 'button should have cdk-program-focused class');
            expect(fixture.componentInstance.focusChanged).toHaveBeenCalledWith('program');
        }));
        it('should remove focus classes on blur', testing_2.fakeAsync(function () {
            buttonElement.focus();
            fixture.detectChanges();
            testing_2.tick();
            expect(buttonElement.classList.length)
                .toBe(2, 'button should have exactly 2 focus classes');
            expect(fixture.componentInstance.focusChanged).toHaveBeenCalledWith('program');
            buttonElement.blur();
            fixture.detectChanges();
            expect(buttonElement.classList.length)
                .toBe(0, 'button should not have any focus classes');
            expect(fixture.componentInstance.focusChanged).toHaveBeenCalledWith(null);
        }));
    });
    describe('complex component with cdkMonitorElementFocus', function () {
        var fixture;
        var parentElement;
        var childElement;
        beforeEach(function () {
            fixture = testing_2.TestBed.createComponent(ComplexComponentWithMonitorElementFocus);
            fixture.detectChanges();
            parentElement = fixture.debugElement.query(platform_browser_1.By.css('div')).nativeElement;
            childElement = fixture.debugElement.query(platform_browser_1.By.css('button')).nativeElement;
            testing_1.patchElementFocus(parentElement);
            testing_1.patchElementFocus(childElement);
        });
        it('should add focus classes on parent focus', testing_2.fakeAsync(function () {
            parentElement.focus();
            fixture.detectChanges();
            testing_2.tick();
            expect(parentElement.classList.length).toBe(2, 'button should have exactly 2 focus classes');
        }));
        it('should not add focus classes on child focus', testing_2.fakeAsync(function () {
            childElement.focus();
            fixture.detectChanges();
            testing_2.tick();
            expect(parentElement.classList.length).toBe(0, 'button should not have any focus classes');
        }));
    });
    describe('complex component with cdkMonitorSubtreeFocus', function () {
        var fixture;
        var parentElement;
        var childElement;
        beforeEach(function () {
            fixture = testing_2.TestBed.createComponent(ComplexComponentWithMonitorSubtreeFocus);
            fixture.detectChanges();
            parentElement = fixture.debugElement.query(platform_browser_1.By.css('div')).nativeElement;
            childElement = fixture.debugElement.query(platform_browser_1.By.css('button')).nativeElement;
            testing_1.patchElementFocus(parentElement);
            testing_1.patchElementFocus(childElement);
        });
        it('should add focus classes on parent focus', testing_2.fakeAsync(function () {
            parentElement.focus();
            fixture.detectChanges();
            testing_2.tick();
            expect(parentElement.classList.length).toBe(2, 'button should have exactly 2 focus classes');
        }));
        it('should add focus classes on child focus', testing_2.fakeAsync(function () {
            childElement.focus();
            fixture.detectChanges();
            testing_2.tick();
            expect(parentElement.classList.length).toBe(2, 'button should have exactly 2 focus classes');
        }));
    });
    describe('complex component with cdkMonitorSubtreeFocus and cdkMonitorElementFocus', function () {
        var fixture;
        var parentElement;
        var childElement;
        var focusMonitor;
        beforeEach(testing_2.inject([focus_monitor_1.FocusMonitor], function (fm) {
            focusMonitor = fm;
            fixture =
                testing_2.TestBed.createComponent(ComplexComponentWithMonitorSubtreeFocusAndMonitorElementFocus);
            fixture.detectChanges();
            parentElement = fixture.debugElement.query(platform_browser_1.By.css('div')).nativeElement;
            childElement = fixture.debugElement.query(platform_browser_1.By.css('button')).nativeElement;
            testing_1.patchElementFocus(parentElement);
            testing_1.patchElementFocus(childElement);
        }));
        it('should add keyboard focus classes on both elements when child is focused via keyboard', testing_2.fakeAsync(function () {
            focusMonitor.focusVia(childElement, 'keyboard');
            fixture.detectChanges();
            testing_2.flush();
            expect(parentElement.classList).toContain('cdk-keyboard-focused');
            expect(childElement.classList).toContain('cdk-keyboard-focused');
        }));
    });
});
describe('FocusMonitor observable stream', function () {
    var fixture;
    var buttonElement;
    var focusMonitor;
    beforeEach(function () {
        testing_2.TestBed.configureTestingModule({
            imports: [index_1.A11yModule],
            declarations: [
                PlainButton,
            ],
        }).compileComponents();
    });
    beforeEach(testing_2.inject([focus_monitor_1.FocusMonitor], function (fm) {
        fixture = testing_2.TestBed.createComponent(PlainButton);
        focusMonitor = fm;
        fixture.detectChanges();
        buttonElement = fixture.debugElement.nativeElement.querySelector('button');
        testing_1.patchElementFocus(buttonElement);
    }));
    it('should emit inside the NgZone', testing_2.fakeAsync(function () {
        var spy = jasmine.createSpy('zone spy');
        focusMonitor.monitor(buttonElement).subscribe(function () { return spy(core_1.NgZone.isInAngularZone()); });
        expect(spy).not.toHaveBeenCalled();
        buttonElement.focus();
        fixture.detectChanges();
        testing_2.tick();
        expect(spy).toHaveBeenCalledWith(true);
    }));
});
var PlainButton = /** @class */ (function () {
    function PlainButton() {
    }
    PlainButton.decorators = [
        { type: core_1.Component, args: [{
                    template: "<button>focus me!</button>"
                },] },
    ];
    return PlainButton;
}());
var ButtonWithFocusClasses = /** @class */ (function () {
    function ButtonWithFocusClasses() {
    }
    ButtonWithFocusClasses.prototype.focusChanged = function (_origin) { };
    ButtonWithFocusClasses.decorators = [
        { type: core_1.Component, args: [{
                    template: "<button cdkMonitorElementFocus (cdkFocusChange)=\"focusChanged($event)\"></button>"
                },] },
    ];
    return ButtonWithFocusClasses;
}());
var ComplexComponentWithMonitorElementFocus = /** @class */ (function () {
    function ComplexComponentWithMonitorElementFocus() {
    }
    ComplexComponentWithMonitorElementFocus.decorators = [
        { type: core_1.Component, args: [{
                    template: "<div tabindex=\"0\" cdkMonitorElementFocus><button></button></div>"
                },] },
    ];
    return ComplexComponentWithMonitorElementFocus;
}());
var ComplexComponentWithMonitorSubtreeFocus = /** @class */ (function () {
    function ComplexComponentWithMonitorSubtreeFocus() {
    }
    ComplexComponentWithMonitorSubtreeFocus.decorators = [
        { type: core_1.Component, args: [{
                    template: "<div tabindex=\"0\" cdkMonitorSubtreeFocus><button></button></div>"
                },] },
    ];
    return ComplexComponentWithMonitorSubtreeFocus;
}());
var ComplexComponentWithMonitorSubtreeFocusAndMonitorElementFocus = /** @class */ (function () {
    function ComplexComponentWithMonitorSubtreeFocusAndMonitorElementFocus() {
    }
    ComplexComponentWithMonitorSubtreeFocusAndMonitorElementFocus.decorators = [
        { type: core_1.Component, args: [{
                    template: "<div cdkMonitorSubtreeFocus><button cdkMonitorElementFocus></button></div>"
                },] },
    ];
    return ComplexComponentWithMonitorSubtreeFocusAndMonitorElementFocus;
}());
//# sourceMappingURL=focus-monitor.spec.js.map