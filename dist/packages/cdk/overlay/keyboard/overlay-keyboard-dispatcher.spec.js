"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var testing_2 = require("@angular/cdk/testing");
var keycodes_1 = require("@angular/cdk/keycodes");
var core_1 = require("@angular/core");
var index_1 = require("../index");
var overlay_keyboard_dispatcher_1 = require("./overlay-keyboard-dispatcher");
var portal_1 = require("@angular/cdk/portal");
describe('OverlayKeyboardDispatcher', function () {
    var keyboardDispatcher;
    var overlay;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [index_1.OverlayModule, TestComponentModule],
        });
        testing_1.inject([overlay_keyboard_dispatcher_1.OverlayKeyboardDispatcher, index_1.Overlay], function (kbd, o) {
            keyboardDispatcher = kbd;
            overlay = o;
        })();
    });
    afterEach(testing_1.inject([index_1.OverlayContainer], function (overlayContainer) {
        overlayContainer.ngOnDestroy();
    }));
    it('should track overlays in order as they are attached and detached', function () {
        var overlayOne = overlay.create();
        var overlayTwo = overlay.create();
        // Attach overlays
        keyboardDispatcher.add(overlayOne);
        keyboardDispatcher.add(overlayTwo);
        expect(keyboardDispatcher._attachedOverlays.length)
            .toBe(2, 'Expected both overlays to be tracked.');
        expect(keyboardDispatcher._attachedOverlays[0]).toBe(overlayOne, 'Expected one to be first.');
        expect(keyboardDispatcher._attachedOverlays[1]).toBe(overlayTwo, 'Expected two to be last.');
        // Detach first one and re-attach it
        keyboardDispatcher.remove(overlayOne);
        keyboardDispatcher.add(overlayOne);
        expect(keyboardDispatcher._attachedOverlays[0])
            .toBe(overlayTwo, 'Expected two to now be first.');
        expect(keyboardDispatcher._attachedOverlays[1])
            .toBe(overlayOne, 'Expected one to now be last.');
    });
    it('should dispatch body keyboard events to the most recently attached overlay', function () {
        var overlayOne = overlay.create();
        var overlayTwo = overlay.create();
        var overlayOneSpy = jasmine.createSpy('overlayOne keyboard event spy');
        var overlayTwoSpy = jasmine.createSpy('overlayTwo keyboard event spy');
        overlayOne.keydownEvents().subscribe(overlayOneSpy);
        overlayTwo.keydownEvents().subscribe(overlayTwoSpy);
        // Attach overlays
        keyboardDispatcher.add(overlayOne);
        keyboardDispatcher.add(overlayTwo);
        testing_2.dispatchKeyboardEvent(document.body, 'keydown', keycodes_1.ESCAPE);
        // Most recent overlay should receive event
        expect(overlayOneSpy).not.toHaveBeenCalled();
        expect(overlayTwoSpy).toHaveBeenCalled();
    });
    it('should dispatch keyboard events when propagation is stopped', function () {
        var overlayRef = overlay.create();
        var spy = jasmine.createSpy('keyboard event spy');
        var button = document.createElement('button');
        document.body.appendChild(button);
        button.addEventListener('keydown', function (event) { return event.stopPropagation(); });
        overlayRef.keydownEvents().subscribe(spy);
        keyboardDispatcher.add(overlayRef);
        testing_2.dispatchKeyboardEvent(button, 'keydown', keycodes_1.ESCAPE);
        expect(spy).toHaveBeenCalled();
        button.parentNode.removeChild(button);
    });
    it('should complete the keydown stream on dispose', function () {
        var overlayRef = overlay.create();
        var completeSpy = jasmine.createSpy('keydown complete spy');
        overlayRef.keydownEvents().subscribe(undefined, undefined, completeSpy);
        overlayRef.dispose();
        expect(completeSpy).toHaveBeenCalled();
    });
    it('should stop emitting events to detached overlays', function () {
        var instance = overlay.create();
        var spy = jasmine.createSpy('keyboard event spy');
        instance.attach(new portal_1.ComponentPortal(TestComponent));
        instance.keydownEvents().subscribe(spy);
        testing_2.dispatchKeyboardEvent(document.body, 'keydown', keycodes_1.ESCAPE, instance.overlayElement);
        expect(spy).toHaveBeenCalledTimes(1);
        instance.detach();
        testing_2.dispatchKeyboardEvent(document.body, 'keydown', keycodes_1.ESCAPE, instance.overlayElement);
        expect(spy).toHaveBeenCalledTimes(1);
    });
    it('should stop emitting events to disposed overlays', function () {
        var instance = overlay.create();
        var spy = jasmine.createSpy('keyboard event spy');
        instance.attach(new portal_1.ComponentPortal(TestComponent));
        instance.keydownEvents().subscribe(spy);
        testing_2.dispatchKeyboardEvent(document.body, 'keydown', keycodes_1.ESCAPE, instance.overlayElement);
        expect(spy).toHaveBeenCalledTimes(1);
        instance.dispose();
        testing_2.dispatchKeyboardEvent(document.body, 'keydown', keycodes_1.ESCAPE, instance.overlayElement);
        expect(spy).toHaveBeenCalledTimes(1);
    });
    it('should dispose of the global keyboard event handler correctly', function () {
        var overlayRef = overlay.create();
        var body = document.body;
        spyOn(body, 'addEventListener');
        spyOn(body, 'removeEventListener');
        keyboardDispatcher.add(overlayRef);
        expect(body.addEventListener).toHaveBeenCalledWith('keydown', jasmine.any(Function), true);
        overlayRef.dispose();
        expect(body.removeEventListener).toHaveBeenCalledWith('keydown', jasmine.any(Function), true);
    });
    it('should skip overlays that do not have keydown event subscriptions', function () {
        var overlayOne = overlay.create();
        var overlayTwo = overlay.create();
        var overlayOneSpy = jasmine.createSpy('overlayOne keyboard event spy');
        overlayOne.keydownEvents().subscribe(overlayOneSpy);
        keyboardDispatcher.add(overlayOne);
        keyboardDispatcher.add(overlayTwo);
        testing_2.dispatchKeyboardEvent(document.body, 'keydown', keycodes_1.ESCAPE);
        expect(overlayOneSpy).toHaveBeenCalled();
    });
    it('should not add the same overlay to the stack multiple times', function () {
        var overlayOne = overlay.create();
        var overlayTwo = overlay.create();
        var overlayOneSpy = jasmine.createSpy('overlayOne keyboard event spy');
        var overlayTwoSpy = jasmine.createSpy('overlayTwo keyboard event spy');
        overlayOne.keydownEvents().subscribe(overlayOneSpy);
        overlayTwo.keydownEvents().subscribe(overlayTwoSpy);
        keyboardDispatcher.add(overlayOne);
        keyboardDispatcher.add(overlayTwo);
        keyboardDispatcher.add(overlayOne);
        testing_2.dispatchKeyboardEvent(document.body, 'keydown', keycodes_1.ESCAPE);
        expect(keyboardDispatcher._attachedOverlays).toEqual([overlayTwo, overlayOne]);
        expect(overlayTwoSpy).not.toHaveBeenCalled();
        expect(overlayOneSpy).toHaveBeenCalled();
    });
});
var TestComponent = /** @class */ (function () {
    function TestComponent() {
    }
    TestComponent.decorators = [
        { type: core_1.Component, args: [{
                    template: 'Hello'
                },] },
    ];
    return TestComponent;
}());
// Create a real (non-test) NgModule as a workaround for
// https://github.com/angular/angular/issues/10760
var TestComponentModule = /** @class */ (function () {
    function TestComponentModule() {
    }
    TestComponentModule.decorators = [
        { type: core_1.NgModule, args: [{
                    exports: [TestComponent],
                    declarations: [TestComponent],
                    entryComponents: [TestComponent],
                },] },
    ];
    return TestComponentModule;
}());
//# sourceMappingURL=overlay-keyboard-dispatcher.spec.js.map