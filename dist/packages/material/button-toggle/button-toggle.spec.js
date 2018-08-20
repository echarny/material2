"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/cdk/testing");
var core_1 = require("@angular/core");
var testing_2 = require("@angular/core/testing");
var forms_1 = require("@angular/forms");
var platform_browser_1 = require("@angular/platform-browser");
var index_1 = require("./index");
describe('MatButtonToggle with forms', function () {
    beforeEach(testing_2.fakeAsync(function () {
        testing_2.TestBed.configureTestingModule({
            imports: [index_1.MatButtonToggleModule, forms_1.FormsModule, forms_1.ReactiveFormsModule],
            declarations: [
                ButtonToggleGroupWithNgModel,
                ButtonToggleGroupWithFormControl,
            ],
        });
        testing_2.TestBed.compileComponents();
    }));
    describe('using FormControl', function () {
        var fixture;
        var groupDebugElement;
        var groupInstance;
        var testComponent;
        beforeEach(testing_2.fakeAsync(function () {
            fixture = testing_2.TestBed.createComponent(ButtonToggleGroupWithFormControl);
            fixture.detectChanges();
            testComponent = fixture.debugElement.componentInstance;
            groupDebugElement = fixture.debugElement.query(platform_browser_1.By.directive(index_1.MatButtonToggleGroup));
            groupInstance = groupDebugElement.injector.get(index_1.MatButtonToggleGroup);
        }));
        it('should toggle the disabled state', function () {
            testComponent.control.disable();
            expect(groupInstance.disabled).toBe(true);
            testComponent.control.enable();
            expect(groupInstance.disabled).toBe(false);
        });
        it('should set the value', function () {
            testComponent.control.setValue('green');
            expect(groupInstance.value).toBe('green');
            testComponent.control.setValue('red');
            expect(groupInstance.value).toBe('red');
        });
        it('should register the on change callback', function () {
            var spy = jasmine.createSpy('onChange callback');
            testComponent.control.registerOnChange(spy);
            testComponent.control.setValue('blue');
            expect(spy).toHaveBeenCalled();
        });
    });
    describe('button toggle group with ngModel and change event', function () {
        var fixture;
        var groupDebugElement;
        var buttonToggleDebugElements;
        var groupInstance;
        var buttonToggleInstances;
        var testComponent;
        var groupNgModel;
        var buttonToggleLabels;
        beforeEach(testing_2.fakeAsync(function () {
            fixture = testing_2.TestBed.createComponent(ButtonToggleGroupWithNgModel);
            fixture.detectChanges();
            testComponent = fixture.debugElement.componentInstance;
            groupDebugElement = fixture.debugElement.query(platform_browser_1.By.directive(index_1.MatButtonToggleGroup));
            groupInstance = groupDebugElement.injector.get(index_1.MatButtonToggleGroup);
            groupNgModel = groupDebugElement.injector.get(forms_1.NgModel);
            buttonToggleDebugElements = fixture.debugElement.queryAll(platform_browser_1.By.directive(index_1.MatButtonToggle));
            buttonToggleInstances = buttonToggleDebugElements.map(function (debugEl) { return debugEl.componentInstance; });
            buttonToggleLabels = buttonToggleDebugElements.map(function (debugEl) { return debugEl.query(platform_browser_1.By.css('button')).nativeElement; });
            fixture.detectChanges();
        }));
        it('should update the model before firing change event', testing_2.fakeAsync(function () {
            expect(testComponent.modelValue).toBeUndefined();
            expect(testComponent.lastEvent).toBeUndefined();
            buttonToggleLabels[0].click();
            fixture.detectChanges();
            testing_2.tick();
            expect(testComponent.modelValue).toBe('red');
            expect(testComponent.lastEvent.value).toBe('red');
        }));
        it('should set individual radio names based on the group name', function () {
            expect(groupInstance.name).toBeTruthy();
            for (var _i = 0, buttonToggleInstances_1 = buttonToggleInstances; _i < buttonToggleInstances_1.length; _i++) {
                var buttonToggle = buttonToggleInstances_1[_i];
                expect(buttonToggle.name).toBe(groupInstance.name);
            }
            groupInstance.name = 'new name';
            for (var _a = 0, buttonToggleInstances_2 = buttonToggleInstances; _a < buttonToggleInstances_2.length; _a++) {
                var buttonToggle = buttonToggleInstances_2[_a];
                expect(buttonToggle.name).toBe(groupInstance.name);
            }
        });
        it('should check the corresponding button toggle on a group value change', function () {
            expect(groupInstance.value).toBeFalsy();
            for (var _i = 0, buttonToggleInstances_3 = buttonToggleInstances; _i < buttonToggleInstances_3.length; _i++) {
                var buttonToggle = buttonToggleInstances_3[_i];
                expect(buttonToggle.checked).toBeFalsy();
            }
            groupInstance.value = 'red';
            for (var _a = 0, buttonToggleInstances_4 = buttonToggleInstances; _a < buttonToggleInstances_4.length; _a++) {
                var buttonToggle = buttonToggleInstances_4[_a];
                expect(buttonToggle.checked).toBe(groupInstance.value === buttonToggle.value);
            }
            var selected = groupInstance.selected;
            expect(selected.value).toBe(groupInstance.value);
        });
        it('should have the correct FormControl state initially and after interaction', testing_2.fakeAsync(function () {
            expect(groupNgModel.valid).toBe(true);
            expect(groupNgModel.pristine).toBe(true);
            expect(groupNgModel.touched).toBe(false);
            buttonToggleInstances[1].checked = true;
            fixture.detectChanges();
            testing_2.tick();
            expect(groupNgModel.valid).toBe(true);
            expect(groupNgModel.pristine).toBe(true);
            expect(groupNgModel.touched).toBe(false);
            buttonToggleLabels[2].click();
            fixture.detectChanges();
            testing_2.tick();
            expect(groupNgModel.valid).toBe(true);
            expect(groupNgModel.pristine).toBe(false);
            expect(groupNgModel.touched).toBe(true);
        }));
        it('should update the ngModel value when selecting a button toggle', testing_2.fakeAsync(function () {
            buttonToggleLabels[1].click();
            fixture.detectChanges();
            testing_2.tick();
            expect(testComponent.modelValue).toBe('green');
        }));
        it('should show a ripple on label click', function () {
            var groupElement = groupDebugElement.nativeElement;
            expect(groupElement.querySelectorAll('.mat-ripple-element').length).toBe(0);
            testing_1.dispatchMouseEvent(buttonToggleLabels[0], 'mousedown');
            testing_1.dispatchMouseEvent(buttonToggleLabels[0], 'mouseup');
            expect(groupElement.querySelectorAll('.mat-ripple-element').length).toBe(1);
        });
        it('should allow ripples to be disabled', function () {
            var groupElement = groupDebugElement.nativeElement;
            testComponent.disableRipple = true;
            fixture.detectChanges();
            expect(groupElement.querySelectorAll('.mat-ripple-element').length).toBe(0);
            testing_1.dispatchMouseEvent(buttonToggleLabels[0], 'mousedown');
            testing_1.dispatchMouseEvent(buttonToggleLabels[0], 'mouseup');
            expect(groupElement.querySelectorAll('.mat-ripple-element').length).toBe(0);
        });
    });
});
describe('MatButtonToggle without forms', function () {
    beforeEach(testing_2.fakeAsync(function () {
        testing_2.TestBed.configureTestingModule({
            imports: [index_1.MatButtonToggleModule],
            declarations: [
                ButtonTogglesInsideButtonToggleGroup,
                ButtonTogglesInsideButtonToggleGroupMultiple,
                FalsyButtonTogglesInsideButtonToggleGroupMultiple,
                ButtonToggleGroupWithInitialValue,
                StandaloneButtonToggle,
                ButtonToggleWithAriaLabel,
                ButtonToggleWithAriaLabelledby,
                RepeatedButtonTogglesWithPreselectedValue,
                ButtonToggleWithTabindex,
            ],
        });
        testing_2.TestBed.compileComponents();
    }));
    describe('inside of an exclusive selection group', function () {
        var fixture;
        var groupDebugElement;
        var groupNativeElement;
        var buttonToggleDebugElements;
        var buttonToggleNativeElements;
        var buttonToggleLabelElements;
        var groupInstance;
        var buttonToggleInstances;
        var testComponent;
        beforeEach(function () {
            fixture = testing_2.TestBed.createComponent(ButtonTogglesInsideButtonToggleGroup);
            fixture.detectChanges();
            testComponent = fixture.debugElement.componentInstance;
            groupDebugElement = fixture.debugElement.query(platform_browser_1.By.directive(index_1.MatButtonToggleGroup));
            groupNativeElement = groupDebugElement.nativeElement;
            groupInstance = groupDebugElement.injector.get(index_1.MatButtonToggleGroup);
            buttonToggleDebugElements = fixture.debugElement.queryAll(platform_browser_1.By.directive(index_1.MatButtonToggle));
            buttonToggleNativeElements = buttonToggleDebugElements
                .map(function (debugEl) { return debugEl.nativeElement; });
            buttonToggleLabelElements = fixture.debugElement.queryAll(platform_browser_1.By.css('button'))
                .map(function (debugEl) { return debugEl.nativeElement; });
            buttonToggleInstances = buttonToggleDebugElements.map(function (debugEl) { return debugEl.componentInstance; });
        });
        it('should set individual button toggle names based on the group name', function () {
            expect(groupInstance.name).toBeTruthy();
            for (var _i = 0, buttonToggleInstances_5 = buttonToggleInstances; _i < buttonToggleInstances_5.length; _i++) {
                var buttonToggle = buttonToggleInstances_5[_i];
                expect(buttonToggle.name).toBe(groupInstance.name);
            }
        });
        it('should disable click interactions when the group is disabled', function () {
            testComponent.isGroupDisabled = true;
            fixture.detectChanges();
            buttonToggleNativeElements[0].click();
            expect(buttonToggleInstances[0].checked).toBe(false);
            expect(buttonToggleInstances[0].disabled).toBe(true);
            testComponent.isGroupDisabled = false;
            fixture.detectChanges();
            expect(buttonToggleInstances[0].disabled).toBe(false);
            buttonToggleLabelElements[0].click();
            fixture.detectChanges();
            expect(buttonToggleInstances[0].checked).toBe(true);
        });
        it('should update the group value when one of the toggles changes', function () {
            expect(groupInstance.value).toBeFalsy();
            buttonToggleLabelElements[0].click();
            fixture.detectChanges();
            expect(groupInstance.value).toBe('test1');
            expect(groupInstance.selected).toBe(buttonToggleInstances[0]);
        });
        it('should propagate the value change back up via a two-way binding', function () {
            expect(groupInstance.value).toBeFalsy();
            buttonToggleLabelElements[0].click();
            fixture.detectChanges();
            expect(groupInstance.value).toBe('test1');
            expect(testComponent.groupValue).toBe('test1');
        });
        it('should update the group and toggles when one of the button toggles is clicked', function () {
            expect(groupInstance.value).toBeFalsy();
            buttonToggleLabelElements[0].click();
            fixture.detectChanges();
            expect(groupInstance.value).toBe('test1');
            expect(groupInstance.selected).toBe(buttonToggleInstances[0]);
            expect(buttonToggleInstances[0].checked).toBe(true);
            expect(buttonToggleInstances[1].checked).toBe(false);
            buttonToggleLabelElements[1].click();
            fixture.detectChanges();
            expect(groupInstance.value).toBe('test2');
            expect(groupInstance.selected).toBe(buttonToggleInstances[1]);
            expect(buttonToggleInstances[0].checked).toBe(false);
            expect(buttonToggleInstances[1].checked).toBe(true);
        });
        it('should check a button toggle upon interaction with underlying native radio button', function () {
            buttonToggleLabelElements[0].click();
            fixture.detectChanges();
            expect(buttonToggleInstances[0].checked).toBe(true);
            expect(groupInstance.value);
        });
        it('should change the vertical state', function () {
            expect(groupNativeElement.classList).not.toContain('mat-button-toggle-vertical');
            groupInstance.vertical = true;
            fixture.detectChanges();
            expect(groupNativeElement.classList).toContain('mat-button-toggle-vertical');
        });
        it('should emit a change event from button toggles', testing_2.fakeAsync(function () {
            expect(buttonToggleInstances[0].checked).toBe(false);
            var changeSpy = jasmine.createSpy('button-toggle change listener');
            buttonToggleInstances[0].change.subscribe(changeSpy);
            buttonToggleLabelElements[0].click();
            fixture.detectChanges();
            testing_2.tick();
            expect(changeSpy).toHaveBeenCalledTimes(1);
            buttonToggleLabelElements[0].click();
            fixture.detectChanges();
            testing_2.tick();
            // Always emit change event when button toggle is clicked
            expect(changeSpy).toHaveBeenCalledTimes(2);
        }));
        it('should emit a change event from the button toggle group', testing_2.fakeAsync(function () {
            expect(groupInstance.value).toBeFalsy();
            var changeSpy = jasmine.createSpy('button-toggle-group change listener');
            groupInstance.change.subscribe(changeSpy);
            buttonToggleLabelElements[0].click();
            fixture.detectChanges();
            testing_2.tick();
            expect(changeSpy).toHaveBeenCalled();
            buttonToggleLabelElements[1].click();
            fixture.detectChanges();
            testing_2.tick();
            expect(changeSpy).toHaveBeenCalledTimes(2);
        }));
        it('should update the group and button toggles when updating the group value', function () {
            expect(groupInstance.value).toBeFalsy();
            testComponent.groupValue = 'test1';
            fixture.detectChanges();
            expect(groupInstance.value).toBe('test1');
            expect(groupInstance.selected).toBe(buttonToggleInstances[0]);
            expect(buttonToggleInstances[0].checked).toBe(true);
            expect(buttonToggleInstances[1].checked).toBe(false);
            testComponent.groupValue = 'test2';
            fixture.detectChanges();
            expect(groupInstance.value).toBe('test2');
            expect(groupInstance.selected).toBe(buttonToggleInstances[1]);
            expect(buttonToggleInstances[0].checked).toBe(false);
            expect(buttonToggleInstances[1].checked).toBe(true);
        });
        it('should deselect all of the checkboxes when the group value is cleared', function () {
            buttonToggleInstances[0].checked = true;
            expect(groupInstance.value).toBeTruthy();
            groupInstance.value = null;
            expect(buttonToggleInstances.every(function (toggle) { return !toggle.checked; })).toBe(true);
        });
    });
    describe('with initial value and change event', function () {
        it('should not fire an initial change event', function () {
            var fixture = testing_2.TestBed.createComponent(ButtonToggleGroupWithInitialValue);
            var testComponent = fixture.debugElement.componentInstance;
            var groupDebugElement = fixture.debugElement.query(platform_browser_1.By.directive(index_1.MatButtonToggleGroup));
            var groupInstance = groupDebugElement.injector
                .get(index_1.MatButtonToggleGroup);
            fixture.detectChanges();
            // Note that we cast to a boolean, because the event has some circular references
            // which will crash the runner when Jasmine attempts to stringify them.
            expect(!!testComponent.lastEvent).toBe(false);
            expect(groupInstance.value).toBe('red');
            groupInstance.value = 'green';
            fixture.detectChanges();
            expect(!!testComponent.lastEvent).toBe(false);
            expect(groupInstance.value).toBe('green');
        });
    });
    describe('inside of a multiple selection group', function () {
        var fixture;
        var groupDebugElement;
        var groupNativeElement;
        var buttonToggleDebugElements;
        var buttonToggleNativeElements;
        var buttonToggleLabelElements;
        var groupInstance;
        var buttonToggleInstances;
        var testComponent;
        beforeEach(testing_2.fakeAsync(function () {
            fixture = testing_2.TestBed.createComponent(ButtonTogglesInsideButtonToggleGroupMultiple);
            fixture.detectChanges();
            testComponent = fixture.debugElement.componentInstance;
            groupDebugElement = fixture.debugElement.query(platform_browser_1.By.directive(index_1.MatButtonToggleGroup));
            groupNativeElement = groupDebugElement.nativeElement;
            groupInstance = groupDebugElement.injector.get(index_1.MatButtonToggleGroup);
            buttonToggleDebugElements = fixture.debugElement.queryAll(platform_browser_1.By.directive(index_1.MatButtonToggle));
            buttonToggleNativeElements = buttonToggleDebugElements
                .map(function (debugEl) { return debugEl.nativeElement; });
            buttonToggleLabelElements = fixture.debugElement.queryAll(platform_browser_1.By.css('button'))
                .map(function (debugEl) { return debugEl.nativeElement; });
            buttonToggleInstances = buttonToggleDebugElements.map(function (debugEl) { return debugEl.componentInstance; });
        }));
        it('should disable click interactions when the group is disabled', function () {
            testComponent.isGroupDisabled = true;
            fixture.detectChanges();
            buttonToggleNativeElements[0].click();
            expect(buttonToggleInstances[0].checked).toBe(false);
        });
        it('should check a button toggle when clicked', function () {
            expect(buttonToggleInstances.every(function (buttonToggle) { return !buttonToggle.checked; })).toBe(true);
            var nativeCheckboxLabel = buttonToggleDebugElements[0].query(platform_browser_1.By.css('button')).nativeElement;
            nativeCheckboxLabel.click();
            expect(groupInstance.value).toEqual(['eggs']);
            expect(buttonToggleInstances[0].checked).toBe(true);
        });
        it('should allow for multiple toggles to be selected', function () {
            buttonToggleInstances[0].checked = true;
            fixture.detectChanges();
            expect(groupInstance.value).toEqual(['eggs']);
            expect(buttonToggleInstances[0].checked).toBe(true);
            buttonToggleInstances[1].checked = true;
            fixture.detectChanges();
            expect(groupInstance.value).toEqual(['eggs', 'flour']);
            expect(buttonToggleInstances[1].checked).toBe(true);
            expect(buttonToggleInstances[0].checked).toBe(true);
        });
        it('should check a button toggle upon interaction with underlying native checkbox', function () {
            var nativeCheckboxButton = buttonToggleDebugElements[0].query(platform_browser_1.By.css('button')).nativeElement;
            nativeCheckboxButton.click();
            fixture.detectChanges();
            expect(groupInstance.value).toEqual(['eggs']);
            expect(buttonToggleInstances[0].checked).toBe(true);
        });
        it('should change the vertical state', function () {
            expect(groupNativeElement.classList).not.toContain('mat-button-toggle-vertical');
            groupInstance.vertical = true;
            fixture.detectChanges();
            expect(groupNativeElement.classList).toContain('mat-button-toggle-vertical');
        });
        it('should deselect a button toggle when selected twice', testing_2.fakeAsync(function () {
            buttonToggleLabelElements[0].click();
            fixture.detectChanges();
            testing_2.tick();
            expect(buttonToggleInstances[0].checked).toBe(true);
            expect(groupInstance.value).toEqual(['eggs']);
            buttonToggleLabelElements[0].click();
            fixture.detectChanges();
            testing_2.tick();
            expect(groupInstance.value).toEqual([]);
            expect(buttonToggleInstances[0].checked).toBe(false);
        }));
        it('should emit a change event for state changes', testing_2.fakeAsync(function () {
            expect(buttonToggleInstances[0].checked).toBe(false);
            var changeSpy = jasmine.createSpy('button-toggle change listener');
            buttonToggleInstances[0].change.subscribe(changeSpy);
            buttonToggleLabelElements[0].click();
            fixture.detectChanges();
            testing_2.tick();
            expect(changeSpy).toHaveBeenCalled();
            expect(groupInstance.value).toEqual(['eggs']);
            buttonToggleLabelElements[0].click();
            fixture.detectChanges();
            testing_2.tick();
            expect(groupInstance.value).toEqual([]);
            // The default browser behavior is to emit an event, when the value was set
            // to false. That's because the current input type is set to `checkbox` when
            // using the multiple mode.
            expect(changeSpy).toHaveBeenCalledTimes(2);
        }));
        it('should throw when attempting to assign a non-array value', function () {
            expect(function () {
                groupInstance.value = 'not-an-array';
            }).toThrowError(/Value must be an array/);
        });
        it('should be able to query for the deprecated `MatButtonToggleGroupMultiple`', function () {
            expect(fixture.debugElement.query(platform_browser_1.By.directive(index_1.MatButtonToggleGroupMultiple))).toBeTruthy();
        });
    });
    describe('as standalone', function () {
        var fixture;
        var buttonToggleDebugElement;
        var buttonToggleNativeElement;
        var buttonToggleLabelElement;
        var buttonToggleInstance;
        var buttonToggleButtonElement;
        beforeEach(testing_2.fakeAsync(function () {
            fixture = testing_2.TestBed.createComponent(StandaloneButtonToggle);
            fixture.detectChanges();
            buttonToggleDebugElement = fixture.debugElement.query(platform_browser_1.By.directive(index_1.MatButtonToggle));
            buttonToggleNativeElement = buttonToggleDebugElement.nativeElement;
            buttonToggleLabelElement = fixture.debugElement
                .query(platform_browser_1.By.css('.mat-button-toggle-label-content')).nativeElement;
            buttonToggleInstance = buttonToggleDebugElement.componentInstance;
            buttonToggleButtonElement = buttonToggleNativeElement.querySelector('button');
        }));
        it('should toggle when clicked', testing_2.fakeAsync(function () {
            buttonToggleLabelElement.click();
            fixture.detectChanges();
            testing_2.flush();
            expect(buttonToggleInstance.checked).toBe(true);
            buttonToggleLabelElement.click();
            fixture.detectChanges();
            testing_2.flush();
            expect(buttonToggleInstance.checked).toBe(false);
        }));
        it('should emit a change event for state changes', testing_2.fakeAsync(function () {
            expect(buttonToggleInstance.checked).toBe(false);
            var changeSpy = jasmine.createSpy('button-toggle change listener');
            buttonToggleInstance.change.subscribe(changeSpy);
            buttonToggleLabelElement.click();
            fixture.detectChanges();
            testing_2.tick();
            expect(changeSpy).toHaveBeenCalled();
            buttonToggleLabelElement.click();
            fixture.detectChanges();
            testing_2.tick();
            // The default browser behavior is to emit an event, when the value was set
            // to false. That's because the current input type is set to `checkbox`.
            expect(changeSpy).toHaveBeenCalledTimes(2);
        }));
        it('should focus on underlying input element when focus() is called', function () {
            var nativeButton = buttonToggleDebugElement.query(platform_browser_1.By.css('button')).nativeElement;
            expect(document.activeElement).not.toBe(nativeButton);
            buttonToggleInstance.focus();
            fixture.detectChanges();
            expect(document.activeElement).toBe(nativeButton);
        });
        it('should not assign a name to the underlying input if one is not passed in', function () {
            expect(buttonToggleButtonElement.getAttribute('name')).toBeFalsy();
        });
        it('should have correct aria-pressed attribute', function () {
            expect(buttonToggleButtonElement.getAttribute('aria-pressed'))
                .toBe('false');
            buttonToggleLabelElement.click();
            fixture.detectChanges();
            expect(buttonToggleButtonElement.getAttribute('aria-pressed'))
                .toBe('true');
        });
    });
    describe('aria-label handling ', function () {
        it('should not set the aria-label attribute if none is provided', function () {
            var fixture = testing_2.TestBed.createComponent(StandaloneButtonToggle);
            var checkboxDebugElement = fixture.debugElement.query(platform_browser_1.By.directive(index_1.MatButtonToggle));
            var checkboxNativeElement = checkboxDebugElement.nativeElement;
            var buttonElement = checkboxNativeElement.querySelector('button');
            fixture.detectChanges();
            expect(buttonElement.hasAttribute('aria-label')).toBe(false);
        });
        it('should use the provided aria-label', function () {
            var fixture = testing_2.TestBed.createComponent(ButtonToggleWithAriaLabel);
            var checkboxDebugElement = fixture.debugElement.query(platform_browser_1.By.directive(index_1.MatButtonToggle));
            var checkboxNativeElement = checkboxDebugElement.nativeElement;
            var buttonElement = checkboxNativeElement.querySelector('button');
            fixture.detectChanges();
            expect(buttonElement.getAttribute('aria-label')).toBe('Super effective');
        });
    });
    describe('with provided aria-labelledby ', function () {
        var checkboxDebugElement;
        var checkboxNativeElement;
        var buttonElement;
        it('should use the provided aria-labelledby', function () {
            var fixture = testing_2.TestBed.createComponent(ButtonToggleWithAriaLabelledby);
            checkboxDebugElement = fixture.debugElement.query(platform_browser_1.By.directive(index_1.MatButtonToggle));
            checkboxNativeElement = checkboxDebugElement.nativeElement;
            buttonElement = checkboxNativeElement.querySelector('button');
            fixture.detectChanges();
            expect(buttonElement.getAttribute('aria-labelledby')).toBe('some-id');
        });
        it('should not assign aria-labelledby if none is provided', function () {
            var fixture = testing_2.TestBed.createComponent(StandaloneButtonToggle);
            checkboxDebugElement = fixture.debugElement.query(platform_browser_1.By.directive(index_1.MatButtonToggle));
            checkboxNativeElement = checkboxDebugElement.nativeElement;
            buttonElement = checkboxNativeElement.querySelector('button');
            fixture.detectChanges();
            expect(buttonElement.getAttribute('aria-labelledby')).toBe(null);
        });
    });
    describe('with tabindex ', function () {
        it('should forward the tabindex to the underlying button', function () {
            var fixture = testing_2.TestBed.createComponent(ButtonToggleWithTabindex);
            fixture.detectChanges();
            var button = fixture.nativeElement.querySelector('.mat-button-toggle button');
            expect(button.getAttribute('tabindex')).toBe('3');
        });
        it('should clear the tabindex from the host element', function () {
            var fixture = testing_2.TestBed.createComponent(ButtonToggleWithTabindex);
            fixture.detectChanges();
            var host = fixture.nativeElement.querySelector('.mat-button-toggle');
            expect(host.hasAttribute('tabindex')).toBe(false);
        });
    });
    it('should not throw on init when toggles are repeated and there is an initial value', function () {
        var fixture = testing_2.TestBed.createComponent(RepeatedButtonTogglesWithPreselectedValue);
        expect(function () { return fixture.detectChanges(); }).not.toThrow();
        expect(fixture.componentInstance.toggleGroup.value).toBe('Two');
        expect(fixture.componentInstance.toggles.toArray()[1].checked).toBe(true);
    });
    it('should maintain the selected state when the value and toggles are swapped out at ' +
        'the same time', function () {
        var fixture = testing_2.TestBed.createComponent(RepeatedButtonTogglesWithPreselectedValue);
        fixture.detectChanges();
        expect(fixture.componentInstance.toggleGroup.value).toBe('Two');
        expect(fixture.componentInstance.toggles.toArray()[1].checked).toBe(true);
        fixture.componentInstance.possibleValues = ['Five', 'Six', 'Seven'];
        fixture.componentInstance.value = 'Seven';
        fixture.detectChanges();
        expect(fixture.componentInstance.toggleGroup.value).toBe('Seven');
        expect(fixture.componentInstance.toggles.toArray()[2].checked).toBe(true);
    });
    it('should select falsy button toggle value in multiple selection', function () {
        var fixture = testing_2.TestBed.createComponent(FalsyButtonTogglesInsideButtonToggleGroupMultiple);
        fixture.detectChanges();
        expect(fixture.componentInstance.toggles.toArray()[0].checked).toBe(true);
        expect(fixture.componentInstance.toggles.toArray()[1].checked).toBe(false);
        expect(fixture.componentInstance.toggles.toArray()[2].checked).toBe(false);
        fixture.componentInstance.value = [0, false];
        fixture.detectChanges();
        expect(fixture.componentInstance.toggles.toArray()[0].checked).toBe(true);
        expect(fixture.componentInstance.toggles.toArray()[1].checked).toBe(false);
        expect(fixture.componentInstance.toggles.toArray()[2].checked).toBe(true);
    });
});
var ButtonTogglesInsideButtonToggleGroup = /** @class */ (function () {
    function ButtonTogglesInsideButtonToggleGroup() {
        this.isGroupDisabled = false;
        this.isVertical = false;
    }
    ButtonTogglesInsideButtonToggleGroup.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n  <mat-button-toggle-group [disabled]=\"isGroupDisabled\"\n                           [vertical]=\"isVertical\"\n                           [(value)]=\"groupValue\">\n    <mat-button-toggle value=\"test1\">Test1</mat-button-toggle>\n    <mat-button-toggle value=\"test2\">Test2</mat-button-toggle>\n    <mat-button-toggle value=\"test3\">Test3</mat-button-toggle>\n  </mat-button-toggle-group>\n  "
                },] },
    ];
    return ButtonTogglesInsideButtonToggleGroup;
}());
var ButtonToggleGroupWithNgModel = /** @class */ (function () {
    function ButtonToggleGroupWithNgModel() {
        this.options = [
            { label: 'Red', value: 'red' },
            { label: 'Green', value: 'green' },
            { label: 'Blue', value: 'blue' },
        ];
        this.disableRipple = false;
    }
    ButtonToggleGroupWithNgModel.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n  <mat-button-toggle-group [(ngModel)]=\"modelValue\" (change)=\"lastEvent = $event\">\n    <mat-button-toggle *ngFor=\"let option of options\" [value]=\"option.value\"\n                       [disableRipple]=\"disableRipple\">\n      {{option.label}}\n    </mat-button-toggle>\n  </mat-button-toggle-group>\n  "
                },] },
    ];
    return ButtonToggleGroupWithNgModel;
}());
var ButtonTogglesInsideButtonToggleGroupMultiple = /** @class */ (function () {
    function ButtonTogglesInsideButtonToggleGroupMultiple() {
        this.isGroupDisabled = false;
        this.isVertical = false;
    }
    ButtonTogglesInsideButtonToggleGroupMultiple.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n  <mat-button-toggle-group [disabled]=\"isGroupDisabled\" [vertical]=\"isVertical\" multiple>\n    <mat-button-toggle value=\"eggs\">Eggs</mat-button-toggle>\n    <mat-button-toggle value=\"flour\">Flour</mat-button-toggle>\n    <mat-button-toggle value=\"sugar\">Sugar</mat-button-toggle>\n  </mat-button-toggle-group>\n  "
                },] },
    ];
    return ButtonTogglesInsideButtonToggleGroupMultiple;
}());
var FalsyButtonTogglesInsideButtonToggleGroupMultiple = /** @class */ (function () {
    function FalsyButtonTogglesInsideButtonToggleGroupMultiple() {
        this.value = [0];
    }
    FalsyButtonTogglesInsideButtonToggleGroupMultiple.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n  <mat-button-toggle-group multiple [value]=\"value\">\n    <mat-button-toggle [value]=\"0\">Eggs</mat-button-toggle>\n    <mat-button-toggle [value]=\"null\">Flour</mat-button-toggle>\n    <mat-button-toggle [value]=\"false\">Sugar</mat-button-toggle>\n    <mat-button-toggle>Sugar</mat-button-toggle>\n  </mat-button-toggle-group>\n  "
                },] },
    ];
    /** @nocollapse */
    FalsyButtonTogglesInsideButtonToggleGroupMultiple.propDecorators = {
        "toggles": [{ type: core_1.ViewChildren, args: [index_1.MatButtonToggle,] },],
    };
    return FalsyButtonTogglesInsideButtonToggleGroupMultiple;
}());
var StandaloneButtonToggle = /** @class */ (function () {
    function StandaloneButtonToggle() {
    }
    StandaloneButtonToggle.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n  <mat-button-toggle>Yes</mat-button-toggle>\n  "
                },] },
    ];
    return StandaloneButtonToggle;
}());
var ButtonToggleGroupWithInitialValue = /** @class */ (function () {
    function ButtonToggleGroupWithInitialValue() {
    }
    ButtonToggleGroupWithInitialValue.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n  <mat-button-toggle-group (change)=\"lastEvent = $event\" value=\"red\">\n    <mat-button-toggle value=\"red\">Value Red</mat-button-toggle>\n    <mat-button-toggle value=\"green\">Value Green</mat-button-toggle>\n  </mat-button-toggle-group>\n  "
                },] },
    ];
    return ButtonToggleGroupWithInitialValue;
}());
var ButtonToggleGroupWithFormControl = /** @class */ (function () {
    function ButtonToggleGroupWithFormControl() {
        this.control = new forms_1.FormControl();
    }
    ButtonToggleGroupWithFormControl.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n  <mat-button-toggle-group [formControl]=\"control\">\n    <mat-button-toggle value=\"red\">Value Red</mat-button-toggle>\n    <mat-button-toggle value=\"green\">Value Green</mat-button-toggle>\n    <mat-button-toggle value=\"blue\">Value Blue</mat-button-toggle>\n  </mat-button-toggle-group>\n  "
                },] },
    ];
    return ButtonToggleGroupWithFormControl;
}());
/** Simple test component with an aria-label set. */
var ButtonToggleWithAriaLabel = /** @class */ (function () {
    function ButtonToggleWithAriaLabel() {
    }
    ButtonToggleWithAriaLabel.decorators = [
        { type: core_1.Component, args: [{
                    template: "<mat-button-toggle aria-label=\"Super effective\"></mat-button-toggle>"
                },] },
    ];
    return ButtonToggleWithAriaLabel;
}());
/** Simple test component with an aria-label set. */
var ButtonToggleWithAriaLabelledby = /** @class */ (function () {
    function ButtonToggleWithAriaLabelledby() {
    }
    ButtonToggleWithAriaLabelledby.decorators = [
        { type: core_1.Component, args: [{
                    template: "<mat-button-toggle aria-labelledby=\"some-id\"></mat-button-toggle>"
                },] },
    ];
    return ButtonToggleWithAriaLabelledby;
}());
var RepeatedButtonTogglesWithPreselectedValue = /** @class */ (function () {
    function RepeatedButtonTogglesWithPreselectedValue() {
        this.possibleValues = ['One', 'Two', 'Three'];
        this.value = 'Two';
    }
    RepeatedButtonTogglesWithPreselectedValue.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <mat-button-toggle-group [(value)]=\"value\">\n      <mat-button-toggle *ngFor=\"let toggle of possibleValues\" [value]=\"toggle\">\n        {{toggle}}\n      </mat-button-toggle>\n    </mat-button-toggle-group>\n  "
                },] },
    ];
    /** @nocollapse */
    RepeatedButtonTogglesWithPreselectedValue.propDecorators = {
        "toggleGroup": [{ type: core_1.ViewChild, args: [index_1.MatButtonToggleGroup,] },],
        "toggles": [{ type: core_1.ViewChildren, args: [index_1.MatButtonToggle,] },],
    };
    return RepeatedButtonTogglesWithPreselectedValue;
}());
var ButtonToggleWithTabindex = /** @class */ (function () {
    function ButtonToggleWithTabindex() {
    }
    ButtonToggleWithTabindex.decorators = [
        { type: core_1.Component, args: [{
                    template: "<mat-button-toggle tabindex=\"3\"></mat-button-toggle>"
                },] },
    ];
    return ButtonToggleWithTabindex;
}());
//# sourceMappingURL=button-toggle.spec.js.map