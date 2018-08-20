"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var forms_1 = require("@angular/forms");
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var testing_2 = require("@angular/cdk/testing");
var core_2 = require("@angular/material/core");
var index_1 = require("./index");
describe('MatRadio', function () {
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [index_1.MatRadioModule, forms_1.FormsModule, forms_1.ReactiveFormsModule],
            declarations: [
                DisableableRadioButton,
                FocusableRadioButton,
                RadiosInsideRadioGroup,
                RadioGroupWithNgModel,
                RadioGroupWithFormControl,
                StandaloneRadioButtons,
                InterleavedRadioGroup,
                TranscludingWrapper
            ]
        });
        testing_1.TestBed.compileComponents();
    }));
    describe('inside of a group', function () {
        var fixture;
        var groupDebugElement;
        var radioDebugElements;
        var radioNativeElements;
        var radioLabelElements;
        var radioInputElements;
        var groupInstance;
        var radioInstances;
        var testComponent;
        beforeEach(testing_1.async(function () {
            fixture = testing_1.TestBed.createComponent(RadiosInsideRadioGroup);
            fixture.detectChanges();
            testComponent = fixture.debugElement.componentInstance;
            groupDebugElement = fixture.debugElement.query(platform_browser_1.By.directive(index_1.MatRadioGroup));
            groupInstance = groupDebugElement.injector.get(index_1.MatRadioGroup);
            radioDebugElements = fixture.debugElement.queryAll(platform_browser_1.By.directive(index_1.MatRadioButton));
            radioNativeElements = radioDebugElements.map(function (debugEl) { return debugEl.nativeElement; });
            radioInstances = radioDebugElements.map(function (debugEl) { return debugEl.componentInstance; });
            radioLabelElements = radioDebugElements
                .map(function (debugEl) { return debugEl.query(platform_browser_1.By.css('label')).nativeElement; });
            radioInputElements = radioDebugElements
                .map(function (debugEl) { return debugEl.query(platform_browser_1.By.css('input')).nativeElement; });
        }));
        it('should set individual radio names based on the group name', function () {
            expect(groupInstance.name).toBeTruthy();
            for (var _i = 0, radioInstances_1 = radioInstances; _i < radioInstances_1.length; _i++) {
                var radio = radioInstances_1[_i];
                expect(radio.name).toBe(groupInstance.name);
            }
        });
        it('should coerce the disabled binding on the radio group', function () {
            groupInstance.disabled = '';
            fixture.detectChanges();
            radioLabelElements[0].click();
            fixture.detectChanges();
            expect(radioInstances[0].checked).toBe(false);
            expect(groupInstance.disabled).toBe(true);
        });
        it('should disable click interaction when the group is disabled', function () {
            testComponent.isGroupDisabled = true;
            fixture.detectChanges();
            radioLabelElements[0].click();
            fixture.detectChanges();
            expect(radioInstances[0].checked).toBe(false);
        });
        it('should set label position based on the group labelPosition', function () {
            testComponent.labelPos = 'before';
            fixture.detectChanges();
            for (var _i = 0, radioInstances_2 = radioInstances; _i < radioInstances_2.length; _i++) {
                var radio = radioInstances_2[_i];
                expect(radio.labelPosition).toBe('before');
            }
            testComponent.labelPos = 'after';
            fixture.detectChanges();
            for (var _a = 0, radioInstances_3 = radioInstances; _a < radioInstances_3.length; _a++) {
                var radio = radioInstances_3[_a];
                expect(radio.labelPosition).toBe('after');
            }
        });
        it('should disable each individual radio when the group is disabled', function () {
            testComponent.isGroupDisabled = true;
            fixture.detectChanges();
            for (var _i = 0, radioInstances_4 = radioInstances; _i < radioInstances_4.length; _i++) {
                var radio = radioInstances_4[_i];
                expect(radio.disabled).toBe(true);
            }
        });
        it('should set required to each radio button when the group is required', function () {
            testComponent.isGroupRequired = true;
            fixture.detectChanges();
            for (var _i = 0, radioInstances_5 = radioInstances; _i < radioInstances_5.length; _i++) {
                var radio = radioInstances_5[_i];
                expect(radio.required).toBe(true);
            }
        });
        it('should update the group value when one of the radios changes', function () {
            expect(groupInstance.value).toBeFalsy();
            radioInstances[0].checked = true;
            fixture.detectChanges();
            expect(groupInstance.value).toBe('fire');
            expect(groupInstance.selected).toBe(radioInstances[0]);
        });
        it('should update the group and radios when one of the radios is clicked', function () {
            expect(groupInstance.value).toBeFalsy();
            radioLabelElements[0].click();
            fixture.detectChanges();
            expect(groupInstance.value).toBe('fire');
            expect(groupInstance.selected).toBe(radioInstances[0]);
            expect(radioInstances[0].checked).toBe(true);
            expect(radioInstances[1].checked).toBe(false);
            radioLabelElements[1].click();
            fixture.detectChanges();
            expect(groupInstance.value).toBe('water');
            expect(groupInstance.selected).toBe(radioInstances[1]);
            expect(radioInstances[0].checked).toBe(false);
            expect(radioInstances[1].checked).toBe(true);
        });
        it('should check a radio upon interaction with the underlying native radio button', function () {
            radioInputElements[0].click();
            fixture.detectChanges();
            expect(radioInstances[0].checked).toBe(true);
            expect(groupInstance.value).toBe('fire');
            expect(groupInstance.selected).toBe(radioInstances[0]);
        });
        it('should emit a change event from radio buttons', function () {
            expect(radioInstances[0].checked).toBe(false);
            var spies = radioInstances
                .map(function (radio, index) { return jasmine.createSpy("onChangeSpy " + index + " for " + radio.name); });
            spies.forEach(function (spy, index) { return radioInstances[index].change.subscribe(spy); });
            radioLabelElements[0].click();
            fixture.detectChanges();
            expect(spies[0]).toHaveBeenCalled();
            radioLabelElements[1].click();
            fixture.detectChanges();
            // To match the native radio button behavior, the change event shouldn't
            // be triggered when the radio got unselected.
            expect(spies[0]).toHaveBeenCalledTimes(1);
            expect(spies[1]).toHaveBeenCalledTimes(1);
        });
        it("should not emit a change event from the radio group when change group value\n        programmatically", function () {
            expect(groupInstance.value).toBeFalsy();
            var changeSpy = jasmine.createSpy('radio-group change listener');
            groupInstance.change.subscribe(changeSpy);
            radioLabelElements[0].click();
            fixture.detectChanges();
            expect(changeSpy).toHaveBeenCalledTimes(1);
            groupInstance.value = 'water';
            fixture.detectChanges();
            expect(changeSpy).toHaveBeenCalledTimes(1);
        });
        it('should show a ripple when focusing via the keyboard', testing_1.fakeAsync(function () {
            expect(radioNativeElements[0].querySelectorAll('.mat-ripple-element').length)
                .toBe(0, 'Expected no ripples on init.');
            testing_2.dispatchFakeEvent(radioInputElements[0], 'keydown');
            testing_2.dispatchFakeEvent(radioInputElements[0], 'focus');
            testing_1.tick(core_2.defaultRippleAnimationConfig.enterDuration);
            expect(radioNativeElements[0].querySelectorAll('.mat-ripple-element').length)
                .toBe(1, 'Expected one ripple after keyboard focus.');
            testing_2.dispatchFakeEvent(radioInputElements[0], 'blur');
            testing_1.tick(core_2.defaultRippleAnimationConfig.exitDuration);
            expect(radioNativeElements[0].querySelectorAll('.mat-ripple-element').length)
                .toBe(0, 'Expected no ripples on blur.');
        }));
        it('should update the group and radios when updating the group value', function () {
            expect(groupInstance.value).toBeFalsy();
            testComponent.groupValue = 'fire';
            fixture.detectChanges();
            expect(groupInstance.value).toBe('fire');
            expect(groupInstance.selected).toBe(radioInstances[0]);
            expect(radioInstances[0].checked).toBe(true);
            expect(radioInstances[1].checked).toBe(false);
            testComponent.groupValue = 'water';
            fixture.detectChanges();
            expect(groupInstance.value).toBe('water');
            expect(groupInstance.selected).toBe(radioInstances[1]);
            expect(radioInstances[0].checked).toBe(false);
            expect(radioInstances[1].checked).toBe(true);
        });
        it('should deselect all of the checkboxes when the group value is cleared', function () {
            radioInstances[0].checked = true;
            expect(groupInstance.value).toBeTruthy();
            groupInstance.value = null;
            expect(radioInstances.every(function (radio) { return !radio.checked; })).toBe(true);
        });
        it('should not show ripples on disabled radio buttons', function () {
            testComponent.isFirstDisabled = true;
            fixture.detectChanges();
            testing_2.dispatchFakeEvent(radioLabelElements[0], 'mousedown');
            testing_2.dispatchFakeEvent(radioLabelElements[0], 'mouseup');
            expect(radioNativeElements[0].querySelectorAll('.mat-ripple-element').length)
                .toBe(0, 'Expected a disabled radio button to not show ripples');
            testComponent.isFirstDisabled = false;
            fixture.detectChanges();
            testing_2.dispatchFakeEvent(radioLabelElements[0], 'mousedown');
            testing_2.dispatchFakeEvent(radioLabelElements[0], 'mouseup');
            expect(radioNativeElements[0].querySelectorAll('.mat-ripple-element').length)
                .toBe(1, 'Expected an enabled radio button to show ripples');
        });
        it('should not show ripples if matRippleDisabled input is set', function () {
            testComponent.disableRipple = true;
            fixture.detectChanges();
            for (var _i = 0, radioLabelElements_1 = radioLabelElements; _i < radioLabelElements_1.length; _i++) {
                var radioLabel = radioLabelElements_1[_i];
                testing_2.dispatchFakeEvent(radioLabel, 'mousedown');
                testing_2.dispatchFakeEvent(radioLabel, 'mouseup');
                expect(radioLabel.querySelectorAll('.mat-ripple-element').length).toBe(0);
            }
            testComponent.disableRipple = false;
            fixture.detectChanges();
            for (var _a = 0, radioLabelElements_2 = radioLabelElements; _a < radioLabelElements_2.length; _a++) {
                var radioLabel = radioLabelElements_2[_a];
                testing_2.dispatchFakeEvent(radioLabel, 'mousedown');
                testing_2.dispatchFakeEvent(radioLabel, 'mouseup');
                expect(radioLabel.querySelectorAll('.mat-ripple-element').length).toBe(1);
            }
        });
        it("should update the group's selected radio to null when unchecking that radio\n        programmatically", function () {
            var changeSpy = jasmine.createSpy('radio-group change listener');
            groupInstance.change.subscribe(changeSpy);
            radioInstances[0].checked = true;
            fixture.detectChanges();
            expect(changeSpy).not.toHaveBeenCalled();
            expect(groupInstance.value).toBeTruthy();
            radioInstances[0].checked = false;
            fixture.detectChanges();
            expect(changeSpy).not.toHaveBeenCalled();
            expect(groupInstance.value).toBeFalsy();
            expect(radioInstances.every(function (radio) { return !radio.checked; })).toBe(true);
            expect(groupInstance.selected).toBeNull();
        });
        it('should not fire a change event from the group when a radio checked state changes', function () {
            var changeSpy = jasmine.createSpy('radio-group change listener');
            groupInstance.change.subscribe(changeSpy);
            radioInstances[0].checked = true;
            fixture.detectChanges();
            expect(changeSpy).not.toHaveBeenCalled();
            expect(groupInstance.value).toBeTruthy();
            expect(groupInstance.value).toBe('fire');
            radioInstances[1].checked = true;
            fixture.detectChanges();
            expect(groupInstance.value).toBe('water');
            expect(changeSpy).not.toHaveBeenCalled();
        });
        it("should update checked status if changed value to radio group's value", function () {
            var changeSpy = jasmine.createSpy('radio-group change listener');
            groupInstance.change.subscribe(changeSpy);
            groupInstance.value = 'apple';
            expect(changeSpy).not.toHaveBeenCalled();
            expect(groupInstance.value).toBe('apple');
            expect(groupInstance.selected).toBeFalsy('expect group selected to be null');
            expect(radioInstances[0].checked).toBeFalsy('should not select the first button');
            expect(radioInstances[1].checked).toBeFalsy('should not select the second button');
            expect(radioInstances[2].checked).toBeFalsy('should not select the third button');
            radioInstances[0].value = 'apple';
            fixture.detectChanges();
            expect(groupInstance.selected).toBe(radioInstances[0], 'expect group selected to be first button');
            expect(radioInstances[0].checked).toBeTruthy('expect group select the first button');
            expect(radioInstances[1].checked).toBeFalsy('should not select the second button');
            expect(radioInstances[2].checked).toBeFalsy('should not select the third button');
        });
        it('should apply class based on color attribute', function () {
            expect(radioNativeElements.every(function (radioEl) { return radioEl.classList.contains('mat-accent'); }))
                .toBe(true, 'Expected every radio element to use the accent color by default.');
            testComponent.color = 'primary';
            fixture.detectChanges();
            expect(radioNativeElements.every(function (radioEl) { return radioEl.classList.contains('mat-primary'); }))
                .toBe(true, 'Expected every radio element to use the primary color from the binding.');
            testComponent.color = 'warn';
            fixture.detectChanges();
            expect(radioNativeElements.every(function (radioEl) { return radioEl.classList.contains('mat-warn'); }))
                .toBe(true, 'Expected every radio element to use the primary color from the binding.');
            testComponent.color = null;
            fixture.detectChanges();
            expect(radioNativeElements.every(function (radioEl) { return radioEl.classList.contains('mat-accent'); }))
                .toBe(true, 'Expected every radio element to fallback to accent color if value is falsy.');
        });
    });
    describe('group with ngModel', function () {
        var fixture;
        var groupDebugElement;
        var radioDebugElements;
        var innerRadios;
        var radioLabelElements;
        var groupInstance;
        var radioInstances;
        var testComponent;
        var groupNgModel;
        beforeEach(function () {
            fixture = testing_1.TestBed.createComponent(RadioGroupWithNgModel);
            fixture.detectChanges();
            testComponent = fixture.debugElement.componentInstance;
            groupDebugElement = fixture.debugElement.query(platform_browser_1.By.directive(index_1.MatRadioGroup));
            groupInstance = groupDebugElement.injector.get(index_1.MatRadioGroup);
            groupNgModel = groupDebugElement.injector.get(forms_1.NgModel);
            radioDebugElements = fixture.debugElement.queryAll(platform_browser_1.By.directive(index_1.MatRadioButton));
            radioInstances = radioDebugElements.map(function (debugEl) { return debugEl.componentInstance; });
            innerRadios = fixture.debugElement.queryAll(platform_browser_1.By.css('input[type="radio"]'));
            radioLabelElements = radioDebugElements
                .map(function (debugEl) { return debugEl.query(platform_browser_1.By.css('label')).nativeElement; });
        });
        it('should set individual radio names based on the group name', function () {
            expect(groupInstance.name).toBeTruthy();
            for (var _i = 0, radioInstances_6 = radioInstances; _i < radioInstances_6.length; _i++) {
                var radio = radioInstances_6[_i];
                expect(radio.name).toBe(groupInstance.name);
            }
            groupInstance.name = 'new name';
            for (var _a = 0, radioInstances_7 = radioInstances; _a < radioInstances_7.length; _a++) {
                var radio = radioInstances_7[_a];
                expect(radio.name).toBe(groupInstance.name);
            }
        });
        it('should check the corresponding radio button on group value change', function () {
            expect(groupInstance.value).toBeFalsy();
            for (var _i = 0, radioInstances_8 = radioInstances; _i < radioInstances_8.length; _i++) {
                var radio = radioInstances_8[_i];
                expect(radio.checked).toBeFalsy();
            }
            groupInstance.value = 'vanilla';
            for (var _a = 0, radioInstances_9 = radioInstances; _a < radioInstances_9.length; _a++) {
                var radio = radioInstances_9[_a];
                expect(radio.checked).toBe(groupInstance.value === radio.value);
            }
            expect(groupInstance.selected.value).toBe(groupInstance.value);
        });
        it('should have the correct control state initially and after interaction', function () {
            // The control should start off valid, pristine, and untouched.
            expect(groupNgModel.valid).toBe(true);
            expect(groupNgModel.pristine).toBe(true);
            expect(groupNgModel.touched).toBe(false);
            // After changing the value programmatically, the control should stay pristine
            // but remain untouched.
            radioInstances[1].checked = true;
            fixture.detectChanges();
            expect(groupNgModel.valid).toBe(true);
            expect(groupNgModel.pristine).toBe(true);
            expect(groupNgModel.touched).toBe(false);
            // After a user interaction occurs (such as a click), the control should become dirty and
            // now also be touched.
            radioLabelElements[2].click();
            fixture.detectChanges();
            expect(groupNgModel.valid).toBe(true);
            expect(groupNgModel.pristine).toBe(false);
            expect(groupNgModel.touched).toBe(true);
        });
        it('should write to the radio button based on ngModel', testing_1.fakeAsync(function () {
            testComponent.modelValue = 'chocolate';
            fixture.detectChanges();
            testing_1.tick();
            fixture.detectChanges();
            expect(innerRadios[1].nativeElement.checked).toBe(true);
            expect(radioInstances[1].checked).toBe(true);
        }));
        it('should update the ngModel value when selecting a radio button', function () {
            testing_2.dispatchFakeEvent(innerRadios[1].nativeElement, 'change');
            fixture.detectChanges();
            expect(testComponent.modelValue).toBe('chocolate');
        });
        it('should update the model before firing change event', function () {
            expect(testComponent.modelValue).toBeUndefined();
            expect(testComponent.lastEvent).toBeUndefined();
            testing_2.dispatchFakeEvent(innerRadios[1].nativeElement, 'change');
            fixture.detectChanges();
            expect(testComponent.lastEvent.value).toBe('chocolate');
            testing_2.dispatchFakeEvent(innerRadios[0].nativeElement, 'change');
            fixture.detectChanges();
            expect(testComponent.lastEvent.value).toBe('vanilla');
        });
    });
    describe('group with FormControl', function () {
        var fixture;
        var groupDebugElement;
        var groupInstance;
        var testComponent;
        beforeEach(function () {
            fixture = testing_1.TestBed.createComponent(RadioGroupWithFormControl);
            fixture.detectChanges();
            testComponent = fixture.debugElement.componentInstance;
            groupDebugElement = fixture.debugElement.query(platform_browser_1.By.directive(index_1.MatRadioGroup));
            groupInstance = groupDebugElement.injector.get(index_1.MatRadioGroup);
        });
        it('should toggle the disabled state', function () {
            expect(groupInstance.disabled).toBeFalsy();
            testComponent.formControl.disable();
            fixture.detectChanges();
            expect(groupInstance.disabled).toBeTruthy();
            testComponent.formControl.enable();
            fixture.detectChanges();
            expect(groupInstance.disabled).toBeFalsy();
        });
    });
    describe('disableable', function () {
        var fixture;
        var radioInstance;
        var radioNativeElement;
        var testComponent;
        beforeEach(function () {
            fixture = testing_1.TestBed.createComponent(DisableableRadioButton);
            fixture.detectChanges();
            testComponent = fixture.debugElement.componentInstance;
            var radioDebugElement = fixture.debugElement.query(platform_browser_1.By.directive(index_1.MatRadioButton));
            radioInstance = radioDebugElement.injector.get(index_1.MatRadioButton);
            radioNativeElement = radioDebugElement.nativeElement.querySelector('input');
        });
        it('should toggle the disabled state', function () {
            expect(radioInstance.disabled).toBeFalsy();
            expect(radioNativeElement.disabled).toBeFalsy();
            testComponent.disabled = true;
            fixture.detectChanges();
            expect(radioInstance.disabled).toBeTruthy();
            expect(radioNativeElement.disabled).toBeTruthy();
            testComponent.disabled = false;
            fixture.detectChanges();
            expect(radioInstance.disabled).toBeFalsy();
            expect(radioNativeElement.disabled).toBeFalsy();
        });
    });
    describe('as standalone', function () {
        var fixture;
        var radioDebugElements;
        var seasonRadioInstances;
        var weatherRadioInstances;
        var fruitRadioInstances;
        var fruitRadioNativeInputs;
        var testComponent;
        beforeEach(function () {
            fixture = testing_1.TestBed.createComponent(StandaloneRadioButtons);
            fixture.detectChanges();
            testComponent = fixture.debugElement.componentInstance;
            radioDebugElements = fixture.debugElement.queryAll(platform_browser_1.By.directive(index_1.MatRadioButton));
            seasonRadioInstances = radioDebugElements
                .filter(function (debugEl) { return debugEl.componentInstance.name == 'season'; })
                .map(function (debugEl) { return debugEl.componentInstance; });
            weatherRadioInstances = radioDebugElements
                .filter(function (debugEl) { return debugEl.componentInstance.name == 'weather'; })
                .map(function (debugEl) { return debugEl.componentInstance; });
            fruitRadioInstances = radioDebugElements
                .filter(function (debugEl) { return debugEl.componentInstance.name == 'fruit'; })
                .map(function (debugEl) { return debugEl.componentInstance; });
            var fruitRadioNativeElements = radioDebugElements
                .filter(function (debugEl) { return debugEl.componentInstance.name == 'fruit'; })
                .map(function (debugEl) { return debugEl.nativeElement; });
            fruitRadioNativeInputs = [];
            for (var _i = 0, fruitRadioNativeElements_1 = fruitRadioNativeElements; _i < fruitRadioNativeElements_1.length; _i++) {
                var element = fruitRadioNativeElements_1[_i];
                fruitRadioNativeInputs.push(element.querySelector('input'));
            }
        });
        it('should uniquely select radios by a name', function () {
            seasonRadioInstances[0].checked = true;
            weatherRadioInstances[1].checked = true;
            fixture.detectChanges();
            expect(seasonRadioInstances[0].checked).toBe(true);
            expect(seasonRadioInstances[1].checked).toBe(false);
            expect(seasonRadioInstances[2].checked).toBe(false);
            expect(weatherRadioInstances[0].checked).toBe(false);
            expect(weatherRadioInstances[1].checked).toBe(true);
            expect(weatherRadioInstances[2].checked).toBe(false);
            seasonRadioInstances[1].checked = true;
            fixture.detectChanges();
            expect(seasonRadioInstances[0].checked).toBe(false);
            expect(seasonRadioInstances[1].checked).toBe(true);
            expect(seasonRadioInstances[2].checked).toBe(false);
            expect(weatherRadioInstances[0].checked).toBe(false);
            expect(weatherRadioInstances[1].checked).toBe(true);
            expect(weatherRadioInstances[2].checked).toBe(false);
            weatherRadioInstances[2].checked = true;
            expect(seasonRadioInstances[0].checked).toBe(false);
            expect(seasonRadioInstances[1].checked).toBe(true);
            expect(seasonRadioInstances[2].checked).toBe(false);
            expect(weatherRadioInstances[0].checked).toBe(false);
            expect(weatherRadioInstances[1].checked).toBe(false);
            expect(weatherRadioInstances[2].checked).toBe(true);
        });
        it('should add required attribute to the underlying input element if defined', function () {
            var radioInstance = seasonRadioInstances[0];
            radioInstance.required = true;
            fixture.detectChanges();
            expect(radioInstance.required).toBe(true);
        });
        it('should add aria-label attribute to the underlying input element if defined', function () {
            expect(fruitRadioNativeInputs[0].getAttribute('aria-label')).toBe('Banana');
        });
        it('should not add aria-label attribute if not defined', function () {
            expect(fruitRadioNativeInputs[1].hasAttribute('aria-label')).toBeFalsy();
        });
        it('should change aria-label attribute if property is changed at runtime', function () {
            expect(fruitRadioNativeInputs[0].getAttribute('aria-label')).toBe('Banana');
            testComponent.ariaLabel = 'Pineapple';
            fixture.detectChanges();
            expect(fruitRadioNativeInputs[0].getAttribute('aria-label')).toBe('Pineapple');
        });
        it('should add aria-labelledby attribute to the underlying input element if defined', function () {
            expect(fruitRadioNativeInputs[0].getAttribute('aria-labelledby')).toBe('xyz');
        });
        it('should not add aria-labelledby attribute if not defined', function () {
            expect(fruitRadioNativeInputs[1].hasAttribute('aria-labelledby')).toBeFalsy();
        });
        it('should change aria-labelledby attribute if property is changed at runtime', function () {
            expect(fruitRadioNativeInputs[0].getAttribute('aria-labelledby')).toBe('xyz');
            testComponent.ariaLabelledby = 'uvw';
            fixture.detectChanges();
            expect(fruitRadioNativeInputs[0].getAttribute('aria-labelledby')).toBe('uvw');
        });
        it('should add aria-describedby attribute to the underlying input element if defined', function () {
            expect(fruitRadioNativeInputs[0].getAttribute('aria-describedby')).toBe('abc');
        });
        it('should not add aria-describedby attribute if not defined', function () {
            expect(fruitRadioNativeInputs[1].hasAttribute('aria-describedby')).toBeFalsy();
        });
        it('should change aria-describedby attribute if property is changed at runtime', function () {
            expect(fruitRadioNativeInputs[0].getAttribute('aria-describedby')).toBe('abc');
            testComponent.ariaDescribedby = 'uvw';
            fixture.detectChanges();
            expect(fruitRadioNativeInputs[0].getAttribute('aria-describedby')).toBe('uvw');
        });
        it('should focus on underlying input element when focus() is called', function () {
            for (var i = 0; i < fruitRadioInstances.length; i++) {
                expect(document.activeElement).not.toBe(fruitRadioNativeInputs[i]);
                fruitRadioInstances[i].focus();
                fixture.detectChanges();
                expect(document.activeElement).toBe(fruitRadioNativeInputs[i]);
            }
        });
        it('should not add the "name" attribute if it is not passed in', function () {
            var radio = fixture.debugElement.nativeElement.querySelector('#nameless input');
            expect(radio.hasAttribute('name')).toBe(false);
        });
    });
    describe('with tabindex', function () {
        var fixture;
        beforeEach(function () {
            fixture = testing_1.TestBed.createComponent(FocusableRadioButton);
            fixture.detectChanges();
        });
        it('should forward focus to native input', function () {
            var radioButtonEl = fixture.debugElement.query(platform_browser_1.By.css('.mat-radio-button')).nativeElement;
            var inputEl = fixture.debugElement.query(platform_browser_1.By.css('.mat-radio-input')).nativeElement;
            radioButtonEl.focus();
            // Focus events don't always fire in tests, so we need to fake it.
            // Focus events don't always fire in tests, so we need to fake it.
            testing_2.dispatchFakeEvent(radioButtonEl, 'focus');
            fixture.detectChanges();
            expect(document.activeElement).toBe(inputEl);
        });
        it('should allow specifying an explicit tabindex for a single radio-button', function () {
            var radioButtonInput = fixture.debugElement
                .query(platform_browser_1.By.css('.mat-radio-button input')).nativeElement;
            expect(radioButtonInput.tabIndex)
                .toBe(0, 'Expected the tabindex to be set to "0" by default.');
            fixture.componentInstance.tabIndex = 4;
            fixture.detectChanges();
            expect(radioButtonInput.tabIndex)
                .toBe(4, 'Expected the tabindex to be set to "4".');
        });
    });
    describe('group interspersed with other tags', function () {
        var fixture;
        var groupDebugElement;
        var groupInstance;
        var radioDebugElements;
        var radioInstances;
        beforeEach(testing_1.async(function () {
            fixture = testing_1.TestBed.createComponent(InterleavedRadioGroup);
            fixture.detectChanges();
            groupDebugElement = fixture.debugElement.query(platform_browser_1.By.directive(index_1.MatRadioGroup));
            groupInstance = groupDebugElement.injector.get(index_1.MatRadioGroup);
            radioDebugElements = fixture.debugElement.queryAll(platform_browser_1.By.directive(index_1.MatRadioButton));
            radioInstances = radioDebugElements.map(function (debugEl) { return debugEl.componentInstance; });
        }));
        it('should initialize selection of radios based on model value', function () {
            expect(groupInstance.selected).toBe(radioInstances[2]);
        });
    });
});
var RadiosInsideRadioGroup = /** @class */ (function () {
    function RadiosInsideRadioGroup() {
        this.isFirstDisabled = false;
        this.isGroupDisabled = false;
        this.isGroupRequired = false;
        this.groupValue = null;
        this.disableRipple = false;
    }
    RadiosInsideRadioGroup.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n  <mat-radio-group [disabled]=\"isGroupDisabled\"\n                  [labelPosition]=\"labelPos\"\n                  [required]=\"isGroupRequired\"\n                  [value]=\"groupValue\"\n                  name=\"test-name\">\n    <mat-radio-button value=\"fire\" [disableRipple]=\"disableRipple\" [disabled]=\"isFirstDisabled\"\n                     [color]=\"color\">\n      Charmander\n    </mat-radio-button>\n    <mat-radio-button value=\"water\" [disableRipple]=\"disableRipple\" [color]=\"color\">\n      Squirtle\n    </mat-radio-button>\n    <mat-radio-button value=\"leaf\" [disableRipple]=\"disableRipple\" [color]=\"color\">\n      Bulbasaur\n    </mat-radio-button>\n  </mat-radio-group>\n  "
                },] },
    ];
    return RadiosInsideRadioGroup;
}());
var StandaloneRadioButtons = /** @class */ (function () {
    function StandaloneRadioButtons() {
        this.ariaLabel = 'Banana';
        this.ariaLabelledby = 'xyz';
        this.ariaDescribedby = 'abc';
    }
    StandaloneRadioButtons.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <mat-radio-button name=\"season\" value=\"spring\">Spring</mat-radio-button>\n    <mat-radio-button name=\"season\" value=\"summer\">Summer</mat-radio-button>\n    <mat-radio-button name=\"season\" value=\"autum\">Autumn</mat-radio-button>\n\n    <mat-radio-button name=\"weather\" value=\"warm\">Spring</mat-radio-button>\n    <mat-radio-button name=\"weather\" value=\"hot\">Summer</mat-radio-button>\n    <mat-radio-button name=\"weather\" value=\"cool\">Autumn</mat-radio-button>\n\n    <span id=\"xyz\">Baby Banana</span>\n    <span id=\"abc\">A smaller banana</span>\n    <mat-radio-button name=\"fruit\"\n                     value=\"banana\"\n                     [aria-label]=\"ariaLabel\"\n                     [aria-labelledby]=\"ariaLabelledby\"\n                     [aria-describedby]=\"ariaDescribedby\">\n    </mat-radio-button>\n    <mat-radio-button name=\"fruit\" value=\"raspberry\">Raspberry</mat-radio-button>\n    <mat-radio-button id=\"nameless\" value=\"no-name\">No name</mat-radio-button>\n  "
                },] },
    ];
    return StandaloneRadioButtons;
}());
var RadioGroupWithNgModel = /** @class */ (function () {
    function RadioGroupWithNgModel() {
        this.options = [
            { label: 'Vanilla', value: 'vanilla' },
            { label: 'Chocolate', value: 'chocolate' },
            { label: 'Strawberry', value: 'strawberry' },
        ];
    }
    RadioGroupWithNgModel.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n  <mat-radio-group [(ngModel)]=\"modelValue\" (change)=\"lastEvent = $event\">\n    <mat-radio-button *ngFor=\"let option of options\" [value]=\"option.value\">\n      {{option.label}}\n    </mat-radio-button>\n  </mat-radio-group>\n  "
                },] },
    ];
    return RadioGroupWithNgModel;
}());
var DisableableRadioButton = /** @class */ (function () {
    function DisableableRadioButton() {
    }
    Object.defineProperty(DisableableRadioButton.prototype, "disabled", {
        set: function (value) {
            this.matRadioButton.disabled = value;
        },
        enumerable: true,
        configurable: true
    });
    DisableableRadioButton.decorators = [
        { type: core_1.Component, args: [{
                    template: "<mat-radio-button>One</mat-radio-button>"
                },] },
    ];
    /** @nocollapse */
    DisableableRadioButton.propDecorators = {
        "matRadioButton": [{ type: core_1.ViewChild, args: [index_1.MatRadioButton,] },],
    };
    return DisableableRadioButton;
}());
var RadioGroupWithFormControl = /** @class */ (function () {
    function RadioGroupWithFormControl() {
        this.formControl = new forms_1.FormControl();
    }
    RadioGroupWithFormControl.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n  <mat-radio-group [formControl]=\"formControl\">\n    <mat-radio-button value=\"1\">One</mat-radio-button>\n  </mat-radio-group>\n  "
                },] },
    ];
    return RadioGroupWithFormControl;
}());
var FocusableRadioButton = /** @class */ (function () {
    function FocusableRadioButton() {
    }
    FocusableRadioButton.decorators = [
        { type: core_1.Component, args: [{
                    template: "<mat-radio-button [tabIndex]=\"tabIndex\"></mat-radio-button>"
                },] },
    ];
    return FocusableRadioButton;
}());
var InterleavedRadioGroup = /** @class */ (function () {
    function InterleavedRadioGroup() {
        this.modelValue = 'strawberry';
        this.options = [
            { label: 'Vanilla', value: 'vanilla' },
            { label: 'Chocolate', value: 'chocolate' },
            { label: 'Strawberry', value: 'strawberry' },
        ];
    }
    InterleavedRadioGroup.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n  <mat-radio-group name=\"group\" [(ngModel)]=\"modelValue\">\n    <transcluding-wrapper *ngFor=\"let option of options\">\n      <mat-radio-button [value]=\"option.value\">{{option.label}}</mat-radio-button>\n    </transcluding-wrapper>\n  </mat-radio-group>\n  "
                },] },
    ];
    return InterleavedRadioGroup;
}());
var TranscludingWrapper = /** @class */ (function () {
    function TranscludingWrapper() {
    }
    TranscludingWrapper.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'transcluding-wrapper',
                    template: "\n    <div><ng-content></ng-content></div>\n  "
                },] },
    ];
    return TranscludingWrapper;
}());
//# sourceMappingURL=radio.spec.js.map