"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
var platform_1 = require("@angular/cdk/platform");
var core_1 = require("@angular/core");
var testing_1 = require("@angular/core/testing");
var rxjs_1 = require("rxjs");
var autofill_1 = require("./autofill");
var text_field_module_1 = require("./text-field-module");
var listenerOptions = platform_1.supportsPassiveEventListeners() ? { passive: true } : false;
describe('AutofillMonitor', function () {
    var autofillMonitor;
    var fixture;
    var testComponent;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [text_field_module_1.TextFieldModule],
            declarations: [Inputs],
        }).compileComponents();
    });
    beforeEach(testing_1.inject([autofill_1.AutofillMonitor], function (afm) {
        autofillMonitor = afm;
        fixture = testing_1.TestBed.createComponent(Inputs);
        testComponent = fixture.componentInstance;
        for (var _i = 0, _a = [testComponent.input1, testComponent.input2, testComponent.input3]; _i < _a.length; _i++) {
            var input = _a[_i];
            spyOn(input.nativeElement, 'addEventListener');
            spyOn(input.nativeElement, 'removeEventListener');
        }
        fixture.detectChanges();
    }));
    afterEach(function () {
        // Call destroy to make sure we clean up all listeners.
        autofillMonitor.ngOnDestroy();
    });
    it('should add monitored class and listener upon monitoring', function () {
        var inputEl = testComponent.input1.nativeElement;
        expect(inputEl.addEventListener).not.toHaveBeenCalled();
        autofillMonitor.monitor(inputEl);
        expect(inputEl.classList).toContain('cdk-text-field-autofill-monitored');
        expect(inputEl.addEventListener)
            .toHaveBeenCalledWith('animationstart', jasmine.any(Function), listenerOptions);
    });
    it('should not add multiple listeners to the same element', function () {
        var inputEl = testComponent.input1.nativeElement;
        expect(inputEl.addEventListener).not.toHaveBeenCalled();
        autofillMonitor.monitor(inputEl);
        autofillMonitor.monitor(inputEl);
        expect(inputEl.addEventListener).toHaveBeenCalledTimes(1);
    });
    it('should remove monitored class and listener upon stop monitoring', function () {
        var inputEl = testComponent.input1.nativeElement;
        autofillMonitor.monitor(inputEl);
        expect(inputEl.classList).toContain('cdk-text-field-autofill-monitored');
        expect(inputEl.removeEventListener).not.toHaveBeenCalled();
        autofillMonitor.stopMonitoring(inputEl);
        expect(inputEl.classList).not.toContain('cdk-text-field-autofill-monitored');
        expect(inputEl.removeEventListener)
            .toHaveBeenCalledWith('animationstart', jasmine.any(Function), listenerOptions);
    });
    it('should stop monitoring all monitored elements upon destroy', function () {
        var inputEl1 = testComponent.input1.nativeElement;
        var inputEl2 = testComponent.input2.nativeElement;
        var inputEl3 = testComponent.input3.nativeElement;
        autofillMonitor.monitor(inputEl1);
        autofillMonitor.monitor(inputEl2);
        autofillMonitor.monitor(inputEl3);
        expect(inputEl1.removeEventListener).not.toHaveBeenCalled();
        expect(inputEl2.removeEventListener).not.toHaveBeenCalled();
        expect(inputEl3.removeEventListener).not.toHaveBeenCalled();
        autofillMonitor.ngOnDestroy();
        expect(inputEl1.removeEventListener).toHaveBeenCalled();
        expect(inputEl2.removeEventListener).toHaveBeenCalled();
        expect(inputEl3.removeEventListener).toHaveBeenCalled();
    });
    it('should emit and add filled class upon start animation', function () {
        var inputEl = testComponent.input1.nativeElement;
        var animationStartCallback = function () { };
        var autofillStreamEvent = null;
        inputEl.addEventListener.and.callFake(function (_, cb) { return animationStartCallback = cb; });
        var autofillStream = autofillMonitor.monitor(inputEl);
        autofillStream.subscribe(function (event) { return autofillStreamEvent = event; });
        expect(autofillStreamEvent).toBeNull();
        expect(inputEl.classList).not.toContain('cdk-text-field-autofilled');
        animationStartCallback({ animationName: 'cdk-text-field-autofill-start', target: inputEl });
        expect(inputEl.classList).toContain('cdk-text-field-autofilled');
        expect(autofillStreamEvent).toEqual({ target: inputEl, isAutofilled: true });
    });
    it('should emit and remove filled class upon end animation', function () {
        var inputEl = testComponent.input1.nativeElement;
        var animationStartCallback = function () { };
        var autofillStreamEvent = null;
        inputEl.addEventListener.and.callFake(function (_, cb) { return animationStartCallback = cb; });
        var autofillStream = autofillMonitor.monitor(inputEl);
        autofillStream.subscribe(function (event) { return autofillStreamEvent = event; });
        animationStartCallback({ animationName: 'cdk-text-field-autofill-start', target: inputEl });
        expect(inputEl.classList).toContain('cdk-text-field-autofilled');
        expect(autofillStreamEvent).toEqual({ target: inputEl, isAutofilled: true });
        animationStartCallback({ animationName: 'cdk-text-field-autofill-end', target: inputEl });
        expect(inputEl.classList).not.toContain('cdk-text-field-autofilled');
        expect(autofillStreamEvent).toEqual({ target: inputEl, isAutofilled: false });
    });
    it('should cleanup filled class if monitoring stopped in autofilled state', function () {
        var inputEl = testComponent.input1.nativeElement;
        var animationStartCallback = function () { };
        inputEl.addEventListener.and.callFake(function (_, cb) { return animationStartCallback = cb; });
        autofillMonitor.monitor(inputEl);
        animationStartCallback({ animationName: 'cdk-text-field-autofill-start', target: inputEl });
        expect(inputEl.classList).toContain('cdk-text-field-autofilled');
        autofillMonitor.stopMonitoring(inputEl);
        expect(inputEl.classlist).not.toContain('cdk-text-field-autofilled');
    });
    it('should complete the stream when monitoring is stopped', function () {
        var element = testComponent.input1.nativeElement;
        var autofillStream = autofillMonitor.monitor(element);
        var spy = jasmine.createSpy('autofillStream complete');
        autofillStream.subscribe(undefined, undefined, spy);
        expect(spy).not.toHaveBeenCalled();
        autofillMonitor.stopMonitoring(element);
        expect(spy).toHaveBeenCalled();
    });
    it('should emit on stream inside the NgZone', function () {
        var inputEl = testComponent.input1.nativeElement;
        var animationStartCallback = function () { };
        inputEl.addEventListener.and.callFake(function (_, cb) { return animationStartCallback = cb; });
        var autofillStream = autofillMonitor.monitor(inputEl);
        var spy = jasmine.createSpy('autofill spy');
        autofillStream.subscribe(function () { return spy(core_1.NgZone.isInAngularZone()); });
        expect(spy).not.toHaveBeenCalled();
        animationStartCallback({ animationName: 'cdk-text-field-autofill-start', target: inputEl });
        expect(spy).toHaveBeenCalledWith(true);
    });
    it('should not emit on init if input is unfilled', function () {
        var inputEl = testComponent.input1.nativeElement;
        var animationStartCallback = function () { };
        inputEl.addEventListener.and.callFake(function (_, cb) { return animationStartCallback = cb; });
        var autofillStream = autofillMonitor.monitor(inputEl);
        var spy = jasmine.createSpy('autofill spy');
        autofillStream.subscribe(function () { return spy(); });
        animationStartCallback({ animationName: 'cdk-text-field-autofill-end', target: inputEl });
        expect(spy).not.toHaveBeenCalled();
    });
});
describe('cdkAutofill', function () {
    var autofillMonitor;
    var fixture;
    var testComponent;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [text_field_module_1.TextFieldModule],
            declarations: [InputWithCdkAutofilled],
        }).compileComponents();
    });
    beforeEach(testing_1.inject([autofill_1.AutofillMonitor], function (afm) {
        autofillMonitor = afm;
        spyOn(autofillMonitor, 'monitor').and.returnValue(rxjs_1.EMPTY);
        spyOn(autofillMonitor, 'stopMonitoring');
        fixture = testing_1.TestBed.createComponent(InputWithCdkAutofilled);
        testComponent = fixture.componentInstance;
        fixture.detectChanges();
    }));
    it('should monitor host element on init', function () {
        expect(autofillMonitor.monitor).toHaveBeenCalledWith(testComponent.input.nativeElement);
    });
    it('should stop monitoring host element on destroy', function () {
        expect(autofillMonitor.stopMonitoring).not.toHaveBeenCalled();
        fixture.destroy();
        expect(autofillMonitor.stopMonitoring).toHaveBeenCalledWith(testComponent.input.nativeElement);
    });
});
var Inputs = /** @class */ (function () {
    function Inputs() {
    }
    Inputs.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <input #input1>\n    <input #input2>\n    <input #input3>\n  "
                },] },
    ];
    /** @nocollapse */
    Inputs.propDecorators = {
        "input1": [{ type: core_1.ViewChild, args: ['input1',] },],
        "input2": [{ type: core_1.ViewChild, args: ['input2',] },],
        "input3": [{ type: core_1.ViewChild, args: ['input3',] },],
    };
    return Inputs;
}());
var InputWithCdkAutofilled = /** @class */ (function () {
    function InputWithCdkAutofilled() {
    }
    InputWithCdkAutofilled.decorators = [
        { type: core_1.Component, args: [{
                    template: "<input #input cdkAutofill>"
                },] },
    ];
    /** @nocollapse */
    InputWithCdkAutofilled.propDecorators = {
        "input": [{ type: core_1.ViewChild, args: ['input',] },],
    };
    return InputWithCdkAutofilled;
}());
//# sourceMappingURL=autofill.spec.js.map