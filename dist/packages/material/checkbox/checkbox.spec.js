"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var forms_1 = require("@angular/forms");
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var testing_2 = require("@angular/cdk/testing");
var index_1 = require("./index");
var core_2 = require("@angular/material/core");
var checkbox_config_1 = require("./checkbox-config");
var observers_1 = require("@angular/cdk/observers");
describe('MatCheckbox', function () {
    var fixture;
    function createComponent(componentType) {
        testing_1.TestBed.configureTestingModule({
            imports: [index_1.MatCheckboxModule, forms_1.FormsModule, forms_1.ReactiveFormsModule],
            declarations: [componentType],
        }).compileComponents();
        return testing_1.TestBed.createComponent(componentType);
    }
    describe('basic behaviors', function () {
        var checkboxDebugElement;
        var checkboxNativeElement;
        var checkboxInstance;
        var testComponent;
        var inputElement;
        var labelElement;
        beforeEach(function () {
            fixture = createComponent(SingleCheckbox);
            fixture.detectChanges();
            checkboxDebugElement = fixture.debugElement.query(platform_browser_1.By.directive(index_1.MatCheckbox));
            checkboxNativeElement = checkboxDebugElement.nativeElement;
            checkboxInstance = checkboxDebugElement.componentInstance;
            testComponent = fixture.debugElement.componentInstance;
            inputElement = checkboxNativeElement.querySelector('input');
            labelElement = checkboxNativeElement.querySelector('label');
        });
        it('should add and remove the checked state', function () {
            expect(checkboxInstance.checked).toBe(false);
            expect(checkboxNativeElement.classList).not.toContain('mat-checkbox-checked');
            expect(inputElement.checked).toBe(false);
            testComponent.isChecked = true;
            fixture.detectChanges();
            expect(checkboxInstance.checked).toBe(true);
            expect(checkboxNativeElement.classList).toContain('mat-checkbox-checked');
            expect(inputElement.checked).toBe(true);
            testComponent.isChecked = false;
            fixture.detectChanges();
            expect(checkboxInstance.checked).toBe(false);
            expect(checkboxNativeElement.classList).not.toContain('mat-checkbox-checked');
            expect(inputElement.checked).toBe(false);
        });
        it('should expose the ripple instance', function () {
            expect(checkboxInstance.ripple).toBeTruthy();
        });
        it('should add and remove indeterminate state', function () {
            expect(checkboxNativeElement.classList).not.toContain('mat-checkbox-checked');
            expect(inputElement.checked).toBe(false);
            expect(inputElement.indeterminate).toBe(false);
            expect(inputElement.getAttribute('aria-checked'))
                .toBe('false', 'Expect aria-checked to be false');
            testComponent.isIndeterminate = true;
            fixture.detectChanges();
            expect(checkboxNativeElement.classList).toContain('mat-checkbox-indeterminate');
            expect(inputElement.checked).toBe(false);
            expect(inputElement.indeterminate).toBe(true);
            expect(inputElement.getAttribute('aria-checked'))
                .toBe('mixed', 'Expect aria checked to be mixed for indeterminate checkbox');
            testComponent.isIndeterminate = false;
            fixture.detectChanges();
            expect(checkboxNativeElement.classList).not.toContain('mat-checkbox-indeterminate');
            expect(inputElement.checked).toBe(false);
            expect(inputElement.indeterminate).toBe(false);
        });
        it('should set indeterminate to false when input clicked', testing_1.fakeAsync(function () {
            testComponent.isIndeterminate = true;
            fixture.detectChanges();
            expect(checkboxInstance.indeterminate).toBe(true);
            expect(inputElement.indeterminate).toBe(true);
            expect(testComponent.isIndeterminate).toBe(true);
            inputElement.click();
            fixture.detectChanges();
            // Flush the microtasks because the forms module updates the model state asynchronously.
            // Flush the microtasks because the forms module updates the model state asynchronously.
            testing_1.flush();
            // The checked property has been updated from the model and now the view needs
            // to reflect the state change.
            fixture.detectChanges();
            expect(checkboxInstance.checked).toBe(true);
            expect(inputElement.indeterminate).toBe(false);
            expect(inputElement.checked).toBe(true);
            expect(testComponent.isIndeterminate).toBe(false);
            testComponent.isIndeterminate = true;
            fixture.detectChanges();
            expect(checkboxInstance.indeterminate).toBe(true);
            expect(inputElement.indeterminate).toBe(true);
            expect(inputElement.checked).toBe(true);
            expect(testComponent.isIndeterminate).toBe(true);
            expect(inputElement.getAttribute('aria-checked'))
                .toBe('true', 'Expect aria checked to be true');
            inputElement.click();
            fixture.detectChanges();
            // Flush the microtasks because the forms module updates the model state asynchronously.
            // Flush the microtasks because the forms module updates the model state asynchronously.
            testing_1.flush();
            // The checked property has been updated from the model and now the view needs
            // to reflect the state change.
            fixture.detectChanges();
            expect(checkboxInstance.checked).toBe(false);
            expect(inputElement.indeterminate).toBe(false);
            expect(inputElement.checked).toBe(false);
            expect(testComponent.isIndeterminate).toBe(false);
        }));
        it('should not set indeterminate to false when checked is set programmatically', function () {
            testComponent.isIndeterminate = true;
            fixture.detectChanges();
            expect(checkboxInstance.indeterminate).toBe(true);
            expect(inputElement.indeterminate).toBe(true);
            expect(testComponent.isIndeterminate).toBe(true);
            testComponent.isChecked = true;
            fixture.detectChanges();
            expect(checkboxInstance.checked).toBe(true);
            expect(inputElement.indeterminate).toBe(true);
            expect(inputElement.checked).toBe(true);
            expect(testComponent.isIndeterminate).toBe(true);
            testComponent.isChecked = false;
            fixture.detectChanges();
            expect(checkboxInstance.checked).toBe(false);
            expect(inputElement.indeterminate).toBe(true);
            expect(inputElement.checked).toBe(false);
            expect(testComponent.isIndeterminate).toBe(true);
        });
        it('should change native element checked when check programmatically', function () {
            expect(inputElement.checked).toBe(false);
            checkboxInstance.checked = true;
            fixture.detectChanges();
            expect(inputElement.checked).toBe(true);
        });
        it('should toggle checked state on click', function () {
            expect(checkboxInstance.checked).toBe(false);
            labelElement.click();
            fixture.detectChanges();
            expect(checkboxInstance.checked).toBe(true);
            labelElement.click();
            fixture.detectChanges();
            expect(checkboxInstance.checked).toBe(false);
        });
        it('should change from indeterminate to checked on click', testing_1.fakeAsync(function () {
            testComponent.isChecked = false;
            testComponent.isIndeterminate = true;
            fixture.detectChanges();
            expect(checkboxInstance.checked).toBe(false);
            expect(checkboxInstance.indeterminate).toBe(true);
            checkboxInstance._onInputClick({ stopPropagation: function () { } });
            // Flush the microtasks because the indeterminate state will be updated in the next tick.
            // Flush the microtasks because the indeterminate state will be updated in the next tick.
            testing_1.flush();
            expect(checkboxInstance.checked).toBe(true);
            expect(checkboxInstance.indeterminate).toBe(false);
            checkboxInstance._onInputClick({ stopPropagation: function () { } });
            fixture.detectChanges();
            expect(checkboxInstance.checked).toBe(false);
            expect(checkboxInstance.indeterminate).toBe(false);
            testing_1.flush();
        }));
        it('should add and remove disabled state', function () {
            expect(checkboxInstance.disabled).toBe(false);
            expect(checkboxNativeElement.classList).not.toContain('mat-checkbox-disabled');
            expect(inputElement.tabIndex).toBe(0);
            expect(inputElement.disabled).toBe(false);
            testComponent.isDisabled = true;
            fixture.detectChanges();
            expect(checkboxInstance.disabled).toBe(true);
            expect(checkboxNativeElement.classList).toContain('mat-checkbox-disabled');
            expect(inputElement.disabled).toBe(true);
            testComponent.isDisabled = false;
            fixture.detectChanges();
            expect(checkboxInstance.disabled).toBe(false);
            expect(checkboxNativeElement.classList).not.toContain('mat-checkbox-disabled');
            expect(inputElement.tabIndex).toBe(0);
            expect(inputElement.disabled).toBe(false);
        });
        it('should not toggle `checked` state upon interation while disabled', function () {
            testComponent.isDisabled = true;
            fixture.detectChanges();
            checkboxNativeElement.click();
            expect(checkboxInstance.checked).toBe(false);
        });
        it('should overwrite indeterminate state when clicked', testing_1.fakeAsync(function () {
            testComponent.isIndeterminate = true;
            fixture.detectChanges();
            inputElement.click();
            fixture.detectChanges();
            // Flush the microtasks because the indeterminate state will be updated in the next tick.
            // Flush the microtasks because the indeterminate state will be updated in the next tick.
            testing_1.flush();
            expect(checkboxInstance.checked).toBe(true);
            expect(checkboxInstance.indeterminate).toBe(false);
        }));
        it('should preserve the user-provided id', function () {
            expect(checkboxNativeElement.id).toBe('simple-check');
            expect(inputElement.id).toBe('simple-check-input');
        });
        it('should generate a unique id for the checkbox input if no id is set', function () {
            testComponent.checkboxId = null;
            fixture.detectChanges();
            expect(checkboxInstance.inputId).toMatch(/mat-checkbox-\d+/);
            expect(inputElement.id).toBe(checkboxInstance.inputId);
        });
        it('should project the checkbox content into the label element', function () {
            var label = checkboxNativeElement.querySelector('.mat-checkbox-label');
            expect(label.textContent.trim()).toBe('Simple checkbox');
        });
        it('should make the host element a tab stop', function () {
            expect(inputElement.tabIndex).toBe(0);
        });
        it('should add a css class to position the label before the checkbox', function () {
            testComponent.labelPos = 'before';
            fixture.detectChanges();
            expect(checkboxNativeElement.classList).toContain('mat-checkbox-label-before');
        });
        it('should not trigger the click event multiple times', function () {
            // By default, when clicking on a label element, a generated click will be dispatched
            // on the associated input element.
            // Since we're using a label element and a visual hidden input, this behavior can led
            // to an issue, where the click events on the checkbox are getting executed twice.
            spyOn(testComponent, 'onCheckboxClick');
            expect(inputElement.checked).toBe(false);
            expect(checkboxNativeElement.classList).not.toContain('mat-checkbox-checked');
            labelElement.click();
            fixture.detectChanges();
            expect(checkboxNativeElement.classList).toContain('mat-checkbox-checked');
            expect(inputElement.checked).toBe(true);
            expect(testComponent.onCheckboxClick).toHaveBeenCalledTimes(1);
        });
        it('should trigger a change event when the native input does', testing_1.fakeAsync(function () {
            spyOn(testComponent, 'onCheckboxChange');
            expect(inputElement.checked).toBe(false);
            expect(checkboxNativeElement.classList).not.toContain('mat-checkbox-checked');
            labelElement.click();
            fixture.detectChanges();
            expect(inputElement.checked).toBe(true);
            expect(checkboxNativeElement.classList).toContain('mat-checkbox-checked');
            fixture.detectChanges();
            testing_1.flush();
            // The change event shouldn't fire, because the value change was not caused
            // by any interaction.
            expect(testComponent.onCheckboxChange).toHaveBeenCalledTimes(1);
        }));
        it('should not trigger the change event by changing the native value', testing_1.fakeAsync(function () {
            spyOn(testComponent, 'onCheckboxChange');
            expect(inputElement.checked).toBe(false);
            expect(checkboxNativeElement.classList).not.toContain('mat-checkbox-checked');
            testComponent.isChecked = true;
            fixture.detectChanges();
            expect(inputElement.checked).toBe(true);
            expect(checkboxNativeElement.classList).toContain('mat-checkbox-checked');
            fixture.detectChanges();
            testing_1.flush();
            // The change event shouldn't fire, because the value change was not caused
            // by any interaction.
            expect(testComponent.onCheckboxChange).not.toHaveBeenCalled();
        }));
        it('should forward the required attribute', function () {
            testComponent.isRequired = true;
            fixture.detectChanges();
            expect(inputElement.required).toBe(true);
            testComponent.isRequired = false;
            fixture.detectChanges();
            expect(inputElement.required).toBe(false);
        });
        it('should focus on underlying input element when focus() is called', function () {
            expect(document.activeElement).not.toBe(inputElement);
            checkboxInstance.focus();
            fixture.detectChanges();
            expect(document.activeElement).toBe(inputElement);
        });
        it('should forward the value to input element', function () {
            testComponent.checkboxValue = 'basic_checkbox';
            fixture.detectChanges();
            expect(inputElement.value).toBe('basic_checkbox');
        });
        it('should show a ripple when focused by a keyboard action', testing_1.fakeAsync(function () {
            expect(fixture.nativeElement.querySelectorAll('.mat-ripple-element').length)
                .toBe(0, 'Expected no ripples on load.');
            testing_2.dispatchFakeEvent(inputElement, 'keydown');
            testing_2.dispatchFakeEvent(inputElement, 'focus');
            testing_1.tick(core_2.defaultRippleAnimationConfig.enterDuration);
            expect(fixture.nativeElement.querySelectorAll('.mat-ripple-element').length)
                .toBe(1, 'Expected ripple after element is focused.');
            testing_2.dispatchFakeEvent(checkboxInstance._inputElement.nativeElement, 'blur');
            testing_1.tick(core_2.defaultRippleAnimationConfig.exitDuration);
            expect(fixture.nativeElement.querySelectorAll('.mat-ripple-element').length)
                .toBe(0, 'Expected no ripple after element is blurred.');
        }));
        it('should remove the SVG checkmark from the tab order', function () {
            expect(checkboxNativeElement.querySelector('svg').getAttribute('focusable')).toBe('false');
        });
        describe('ripple elements', function () {
            it('should show ripples on label mousedown', function () {
                expect(checkboxNativeElement.querySelector('.mat-ripple-element')).toBeFalsy();
                testing_2.dispatchFakeEvent(labelElement, 'mousedown');
                testing_2.dispatchFakeEvent(labelElement, 'mouseup');
                expect(checkboxNativeElement.querySelectorAll('.mat-ripple-element').length).toBe(1);
            });
            it('should not show ripples when disabled', function () {
                testComponent.isDisabled = true;
                fixture.detectChanges();
                testing_2.dispatchFakeEvent(labelElement, 'mousedown');
                testing_2.dispatchFakeEvent(labelElement, 'mouseup');
                expect(checkboxNativeElement.querySelectorAll('.mat-ripple-element').length).toBe(0);
                testComponent.isDisabled = false;
                fixture.detectChanges();
                testing_2.dispatchFakeEvent(labelElement, 'mousedown');
                testing_2.dispatchFakeEvent(labelElement, 'mouseup');
                expect(checkboxNativeElement.querySelectorAll('.mat-ripple-element').length).toBe(1);
            });
            it('should remove ripple if matRippleDisabled input is set', function () {
                testComponent.disableRipple = true;
                fixture.detectChanges();
                testing_2.dispatchFakeEvent(labelElement, 'mousedown');
                testing_2.dispatchFakeEvent(labelElement, 'mouseup');
                expect(checkboxNativeElement.querySelectorAll('.mat-ripple-element').length).toBe(0);
                testComponent.disableRipple = false;
                fixture.detectChanges();
                testing_2.dispatchFakeEvent(labelElement, 'mousedown');
                testing_2.dispatchFakeEvent(labelElement, 'mouseup');
                expect(checkboxNativeElement.querySelectorAll('.mat-ripple-element').length).toBe(1);
            });
        });
        describe('color behaviour', function () {
            it('should apply class based on color attribute', function () {
                testComponent.checkboxColor = 'primary';
                fixture.detectChanges();
                expect(checkboxNativeElement.classList.contains('mat-primary')).toBe(true);
                testComponent.checkboxColor = 'accent';
                fixture.detectChanges();
                expect(checkboxNativeElement.classList.contains('mat-accent')).toBe(true);
            });
            it('should should not clear previous defined classes', function () {
                checkboxNativeElement.classList.add('custom-class');
                testComponent.checkboxColor = 'primary';
                fixture.detectChanges();
                expect(checkboxNativeElement.classList.contains('mat-primary')).toBe(true);
                expect(checkboxNativeElement.classList.contains('custom-class')).toBe(true);
                testComponent.checkboxColor = 'accent';
                fixture.detectChanges();
                expect(checkboxNativeElement.classList.contains('mat-primary')).toBe(false);
                expect(checkboxNativeElement.classList.contains('mat-accent')).toBe(true);
                expect(checkboxNativeElement.classList.contains('custom-class')).toBe(true);
            });
        });
        describe('state transition css classes', function () {
            it('should transition unchecked -> checked -> unchecked', function () {
                inputElement.click();
                fixture.detectChanges();
                expect(checkboxNativeElement.classList).toContain('mat-checkbox-anim-unchecked-checked');
                inputElement.click();
                fixture.detectChanges();
                expect(checkboxNativeElement.classList)
                    .not.toContain('mat-checkbox-anim-unchecked-checked');
                expect(checkboxNativeElement.classList)
                    .toContain('mat-checkbox-anim-checked-unchecked');
            });
            it('should transition unchecked -> indeterminate -> unchecked', function () {
                testComponent.isIndeterminate = true;
                fixture.detectChanges();
                expect(checkboxNativeElement.classList)
                    .toContain('mat-checkbox-anim-unchecked-indeterminate');
                testComponent.isIndeterminate = false;
                fixture.detectChanges();
                expect(checkboxNativeElement.classList)
                    .not.toContain('mat-checkbox-anim-unchecked-indeterminate');
                expect(checkboxNativeElement.classList)
                    .toContain('mat-checkbox-anim-indeterminate-unchecked');
            });
            it('should transition indeterminate -> checked', function () {
                testComponent.isIndeterminate = true;
                fixture.detectChanges();
                inputElement.click();
                fixture.detectChanges();
                expect(checkboxNativeElement.classList).not.toContain('mat-checkbox-anim-unchecked-indeterminate');
                expect(checkboxNativeElement.classList)
                    .toContain('mat-checkbox-anim-indeterminate-checked');
            });
            it('should not apply transition classes when there is no state change', function () {
                testComponent.isChecked = checkboxInstance.checked;
                fixture.detectChanges();
                expect(checkboxNativeElement).not.toMatch(/^mat\-checkbox\-anim/g);
                testComponent.isIndeterminate = checkboxInstance.indeterminate;
                expect(checkboxNativeElement).not.toMatch(/^mat\-checkbox\-anim/g);
            });
            it('should not initially have any transition classes', function () {
                expect(checkboxNativeElement).not.toMatch(/^mat\-checkbox\-anim/g);
            });
            it('should not have transition classes when animation ends', testing_1.fakeAsync(function () {
                testComponent.isIndeterminate = true;
                fixture.detectChanges();
                expect(checkboxNativeElement.classList)
                    .toContain('mat-checkbox-anim-unchecked-indeterminate');
                testing_1.flush();
                expect(checkboxNativeElement.classList)
                    .not.toContain('mat-checkbox-anim-unchecked-indeterminate');
            }));
        });
        describe("when MAT_CHECKBOX_CLICK_ACTION is 'check'", function () {
            beforeEach(function () {
                testing_1.TestBed.resetTestingModule();
                testing_1.TestBed.configureTestingModule({
                    imports: [index_1.MatCheckboxModule, forms_1.FormsModule, forms_1.ReactiveFormsModule],
                    declarations: [SingleCheckbox],
                    providers: [
                        { provide: checkbox_config_1.MAT_CHECKBOX_CLICK_ACTION, useValue: 'check' }
                    ]
                });
                fixture = createComponent(SingleCheckbox);
                fixture.detectChanges();
                checkboxDebugElement = fixture.debugElement.query(platform_browser_1.By.directive(index_1.MatCheckbox));
                checkboxNativeElement = checkboxDebugElement.nativeElement;
                checkboxInstance = checkboxDebugElement.componentInstance;
                testComponent = fixture.debugElement.componentInstance;
                inputElement = checkboxNativeElement.querySelector('input');
                labelElement = checkboxNativeElement.querySelector('label');
            });
            it('should not set `indeterminate` to false on click if check is set', testing_1.fakeAsync(function () {
                testComponent.isIndeterminate = true;
                inputElement.click();
                fixture.detectChanges();
                testing_1.flush();
                fixture.detectChanges();
                expect(inputElement.checked).toBe(true);
                expect(checkboxNativeElement.classList).toContain('mat-checkbox-checked');
                expect(inputElement.indeterminate).toBe(true);
                expect(checkboxNativeElement.classList).toContain('mat-checkbox-indeterminate');
            }));
        });
        describe("when MAT_CHECKBOX_CLICK_ACTION is 'noop'", function () {
            beforeEach(function () {
                testing_1.TestBed.resetTestingModule();
                testing_1.TestBed.configureTestingModule({
                    imports: [index_1.MatCheckboxModule, forms_1.FormsModule, forms_1.ReactiveFormsModule],
                    declarations: [SingleCheckbox],
                    providers: [
                        { provide: checkbox_config_1.MAT_CHECKBOX_CLICK_ACTION, useValue: 'noop' }
                    ]
                });
                fixture = createComponent(SingleCheckbox);
                fixture.detectChanges();
                checkboxDebugElement = fixture.debugElement.query(platform_browser_1.By.directive(index_1.MatCheckbox));
                checkboxNativeElement = checkboxDebugElement.nativeElement;
                checkboxInstance = checkboxDebugElement.componentInstance;
                testComponent = fixture.debugElement.componentInstance;
                inputElement = checkboxNativeElement.querySelector('input');
                labelElement = checkboxNativeElement.querySelector('label');
            });
            it('should not change `indeterminate` on click if noop is set', testing_1.fakeAsync(function () {
                testComponent.isIndeterminate = true;
                inputElement.click();
                fixture.detectChanges();
                testing_1.flush();
                fixture.detectChanges();
                expect(inputElement.checked).toBe(false);
                expect(checkboxNativeElement.classList).not.toContain('mat-checkbox-checked');
                expect(inputElement.indeterminate).toBe(true);
                expect(checkboxNativeElement.classList).toContain('mat-checkbox-indeterminate');
            }));
            it("should not change 'checked' or 'indeterminate' on click if noop is set", testing_1.fakeAsync(function () {
                testComponent.isChecked = true;
                testComponent.isIndeterminate = true;
                inputElement.click();
                fixture.detectChanges();
                testing_1.flush();
                fixture.detectChanges();
                expect(inputElement.checked).toBe(true);
                expect(checkboxNativeElement.classList).toContain('mat-checkbox-checked');
                expect(inputElement.indeterminate).toBe(true);
                expect(checkboxNativeElement.classList).toContain('mat-checkbox-indeterminate');
                testComponent.isChecked = false;
                inputElement.click();
                fixture.detectChanges();
                testing_1.flush();
                fixture.detectChanges();
                expect(inputElement.checked).toBe(false);
                expect(checkboxNativeElement.classList).not.toContain('mat-checkbox-checked');
                expect(inputElement.indeterminate).toBe(true, 'indeterminate should not change');
                expect(checkboxNativeElement.classList).toContain('mat-checkbox-indeterminate');
            }));
        });
    });
    describe('with change event and no initial value', function () {
        var checkboxDebugElement;
        var checkboxNativeElement;
        var checkboxInstance;
        var testComponent;
        var inputElement;
        var labelElement;
        beforeEach(function () {
            fixture = createComponent(CheckboxWithChangeEvent);
            fixture.detectChanges();
            checkboxDebugElement = fixture.debugElement.query(platform_browser_1.By.directive(index_1.MatCheckbox));
            checkboxNativeElement = checkboxDebugElement.nativeElement;
            checkboxInstance = checkboxDebugElement.componentInstance;
            testComponent = fixture.debugElement.componentInstance;
            inputElement = checkboxNativeElement.querySelector('input');
            labelElement = checkboxNativeElement.querySelector('label');
        });
        it('should emit the event to the change observable', function () {
            var changeSpy = jasmine.createSpy('onChangeObservable');
            checkboxInstance.change.subscribe(changeSpy);
            fixture.detectChanges();
            expect(changeSpy).not.toHaveBeenCalled();
            // When changing the native `checked` property the checkbox will not fire a change event,
            // because the element is not focused and it's not the native behavior of the input element.
            labelElement.click();
            fixture.detectChanges();
            expect(changeSpy).toHaveBeenCalledTimes(1);
        });
        it('should not emit a DOM event to the change output', testing_1.fakeAsync(function () {
            fixture.detectChanges();
            expect(testComponent.lastEvent).toBeUndefined();
            // Trigger the click on the inputElement, because the input will probably
            // emit a DOM event to the change output.
            inputElement.click();
            fixture.detectChanges();
            testing_1.flush();
            // We're checking the arguments type / emitted value to be a boolean, because sometimes the
            // emitted value can be a DOM Event, which is not valid.
            // See angular/angular#4059
            expect(testComponent.lastEvent.checked).toBe(true);
        }));
    });
    describe('aria-label ', function () {
        var checkboxDebugElement;
        var checkboxNativeElement;
        var inputElement;
        it('should use the provided aria-label', function () {
            fixture = createComponent(CheckboxWithAriaLabel);
            checkboxDebugElement = fixture.debugElement.query(platform_browser_1.By.directive(index_1.MatCheckbox));
            checkboxNativeElement = checkboxDebugElement.nativeElement;
            inputElement = checkboxNativeElement.querySelector('input');
            fixture.detectChanges();
            expect(inputElement.getAttribute('aria-label')).toBe('Super effective');
        });
        it('should not set the aria-label attribute if no value is provided', function () {
            fixture = createComponent(SingleCheckbox);
            fixture.detectChanges();
            expect(fixture.nativeElement.querySelector('input').hasAttribute('aria-label')).toBe(false);
        });
    });
    describe('with provided aria-labelledby ', function () {
        var checkboxDebugElement;
        var checkboxNativeElement;
        var inputElement;
        it('should use the provided aria-labelledby', function () {
            fixture = createComponent(CheckboxWithAriaLabelledby);
            checkboxDebugElement = fixture.debugElement.query(platform_browser_1.By.directive(index_1.MatCheckbox));
            checkboxNativeElement = checkboxDebugElement.nativeElement;
            inputElement = checkboxNativeElement.querySelector('input');
            fixture.detectChanges();
            expect(inputElement.getAttribute('aria-labelledby')).toBe('some-id');
        });
        it('should not assign aria-labelledby if none is provided', function () {
            fixture = createComponent(SingleCheckbox);
            checkboxDebugElement = fixture.debugElement.query(platform_browser_1.By.directive(index_1.MatCheckbox));
            checkboxNativeElement = checkboxDebugElement.nativeElement;
            inputElement = checkboxNativeElement.querySelector('input');
            fixture.detectChanges();
            expect(inputElement.getAttribute('aria-labelledby')).toBe(null);
        });
    });
    describe('with provided tabIndex', function () {
        var checkboxDebugElement;
        var checkboxNativeElement;
        var testComponent;
        var inputElement;
        beforeEach(function () {
            fixture = createComponent(CheckboxWithTabIndex);
            fixture.detectChanges();
            testComponent = fixture.debugElement.componentInstance;
            checkboxDebugElement = fixture.debugElement.query(platform_browser_1.By.directive(index_1.MatCheckbox));
            checkboxNativeElement = checkboxDebugElement.nativeElement;
            inputElement = checkboxNativeElement.querySelector('input');
        });
        it('should preserve any given tabIndex', function () {
            expect(inputElement.tabIndex).toBe(7);
        });
        it('should preserve given tabIndex when the checkbox is disabled then enabled', function () {
            testComponent.isDisabled = true;
            fixture.detectChanges();
            testComponent.customTabIndex = 13;
            fixture.detectChanges();
            testComponent.isDisabled = false;
            fixture.detectChanges();
            expect(inputElement.tabIndex).toBe(13);
        });
    });
    describe('with native tabindex attribute', function () {
        it('should properly detect native tabindex attribute', testing_1.fakeAsync(function () {
            fixture = createComponent(CheckboxWithTabindexAttr);
            fixture.detectChanges();
            var checkbox = fixture.debugElement
                .query(platform_browser_1.By.directive(index_1.MatCheckbox)).componentInstance;
            expect(checkbox.tabIndex)
                .toBe(5, 'Expected tabIndex property to have been set based on the native attribute');
        }));
    });
    describe('using ViewChild', function () {
        var checkboxDebugElement;
        var checkboxNativeElement;
        var testComponent;
        beforeEach(function () {
            fixture = createComponent(CheckboxUsingViewChild);
            fixture.detectChanges();
            checkboxDebugElement = fixture.debugElement.query(platform_browser_1.By.directive(index_1.MatCheckbox));
            checkboxNativeElement = checkboxDebugElement.nativeElement;
            testComponent = fixture.debugElement.componentInstance;
        });
        it('should toggle checkbox disabledness correctly', function () {
            var checkboxInstance = checkboxDebugElement.componentInstance;
            var inputElement = checkboxNativeElement.querySelector('input');
            expect(checkboxInstance.disabled).toBe(false);
            expect(checkboxNativeElement.classList).not.toContain('mat-checkbox-disabled');
            expect(inputElement.tabIndex).toBe(0);
            expect(inputElement.disabled).toBe(false);
            testComponent.isDisabled = true;
            fixture.detectChanges();
            expect(checkboxInstance.disabled).toBe(true);
            expect(checkboxNativeElement.classList).toContain('mat-checkbox-disabled');
            expect(inputElement.disabled).toBe(true);
            testComponent.isDisabled = false;
            fixture.detectChanges();
            expect(checkboxInstance.disabled).toBe(false);
            expect(checkboxNativeElement.classList).not.toContain('mat-checkbox-disabled');
            expect(inputElement.tabIndex).toBe(0);
            expect(inputElement.disabled).toBe(false);
        });
        it('should toggle checkbox ripple disabledness correctly', function () {
            var labelElement = checkboxNativeElement.querySelector('label');
            testComponent.isDisabled = true;
            fixture.detectChanges();
            testing_2.dispatchFakeEvent(labelElement, 'mousedown');
            testing_2.dispatchFakeEvent(labelElement, 'mouseup');
            expect(checkboxNativeElement.querySelectorAll('.mat-ripple-element').length).toBe(0);
            testComponent.isDisabled = false;
            fixture.detectChanges();
            testing_2.dispatchFakeEvent(labelElement, 'mousedown');
            testing_2.dispatchFakeEvent(labelElement, 'mouseup');
            expect(checkboxNativeElement.querySelectorAll('.mat-ripple-element').length).toBe(1);
        });
    });
    describe('with multiple checkboxes', function () {
        beforeEach(function () {
            fixture = createComponent(MultipleCheckboxes);
            fixture.detectChanges();
        });
        it('should assign a unique id to each checkbox', function () {
            var _a = fixture.debugElement.queryAll(platform_browser_1.By.directive(index_1.MatCheckbox))
                .map(function (debugElement) { return debugElement.nativeElement.querySelector('input').id; }), firstId = _a[0], secondId = _a[1];
            expect(firstId).toMatch(/mat-checkbox-\d+-input/);
            expect(secondId).toMatch(/mat-checkbox-\d+-input/);
            expect(firstId).not.toEqual(secondId);
        });
    });
    describe('with ngModel', function () {
        var checkboxDebugElement;
        var checkboxNativeElement;
        var checkboxInstance;
        var inputElement;
        var ngModel;
        beforeEach(function () {
            fixture = createComponent(CheckboxWithNgModel);
            fixture.componentInstance.isRequired = false;
            fixture.detectChanges();
            checkboxDebugElement = fixture.debugElement.query(platform_browser_1.By.directive(index_1.MatCheckbox));
            checkboxNativeElement = checkboxDebugElement.nativeElement;
            checkboxInstance = checkboxDebugElement.componentInstance;
            inputElement = checkboxNativeElement.querySelector('input');
            ngModel = checkboxDebugElement.injector.get(forms_1.NgModel);
        });
        it('should be pristine, untouched, and valid initially', function () {
            expect(ngModel.valid).toBe(true);
            expect(ngModel.pristine).toBe(true);
            expect(ngModel.touched).toBe(false);
        });
        it('should have correct control states after interaction', testing_1.fakeAsync(function () {
            inputElement.click();
            fixture.detectChanges();
            // Flush the timeout that is being created whenever a `click` event has been fired by
            // the underlying input.
            // Flush the timeout that is being created whenever a `click` event has been fired by
            // the underlying input.
            testing_1.flush();
            // After the value change through interaction, the control should be dirty, but remain
            // untouched as long as the focus is still on the underlying input.
            expect(ngModel.pristine).toBe(false);
            expect(ngModel.touched).toBe(false);
            // If the input element loses focus, the control should remain dirty but should
            // also turn touched.
            // If the input element loses focus, the control should remain dirty but should
            // also turn touched.
            testing_2.dispatchFakeEvent(inputElement, 'blur');
            fixture.detectChanges();
            testing_1.flushMicrotasks();
            expect(ngModel.pristine).toBe(false);
            expect(ngModel.touched).toBe(true);
        }));
        it('should not throw an error when disabling while focused', testing_1.fakeAsync(function () {
            expect(function () {
                // Focus the input element because after disabling, the `blur` event should automatically
                // fire and not result in a changed after checked exception. Related: #12323
                inputElement.focus();
                // Flush the two nested timeouts from the FocusMonitor that are being created on `focus`.
                // Flush the two nested timeouts from the FocusMonitor that are being created on `focus`.
                testing_1.flush();
                checkboxInstance.disabled = true;
                fixture.detectChanges();
                testing_1.flushMicrotasks();
            }).not.toThrow();
        }));
        it('should toggle checked state on click', function () {
            expect(checkboxInstance.checked).toBe(false);
            inputElement.click();
            fixture.detectChanges();
            expect(checkboxInstance.checked).toBe(true);
            inputElement.click();
            fixture.detectChanges();
            expect(checkboxInstance.checked).toBe(false);
        });
        it('should validate with RequiredTrue validator', function () {
            fixture.componentInstance.isRequired = true;
            inputElement.click();
            fixture.detectChanges();
            expect(checkboxInstance.checked).toBe(true);
            expect(ngModel.valid).toBe(true);
            inputElement.click();
            fixture.detectChanges();
            expect(checkboxInstance.checked).toBe(false);
            expect(ngModel.valid).toBe(false);
        });
    });
    describe('with name attribute', function () {
        beforeEach(function () {
            fixture = createComponent(CheckboxWithNameAttribute);
            fixture.detectChanges();
        });
        it('should forward name value to input element', function () {
            var checkboxElement = fixture.debugElement.query(platform_browser_1.By.directive(index_1.MatCheckbox));
            var inputElement = checkboxElement.nativeElement.querySelector('input');
            expect(inputElement.getAttribute('name')).toBe('test-name');
        });
    });
    describe('with form control', function () {
        var checkboxDebugElement;
        var checkboxInstance;
        var testComponent;
        var inputElement;
        beforeEach(function () {
            fixture = createComponent(CheckboxWithFormControl);
            fixture.detectChanges();
            checkboxDebugElement = fixture.debugElement.query(platform_browser_1.By.directive(index_1.MatCheckbox));
            checkboxInstance = checkboxDebugElement.componentInstance;
            testComponent = fixture.debugElement.componentInstance;
            inputElement = checkboxDebugElement.nativeElement.querySelector('input');
        });
        it('should toggle the disabled state', function () {
            expect(checkboxInstance.disabled).toBe(false);
            testComponent.formControl.disable();
            fixture.detectChanges();
            expect(checkboxInstance.disabled).toBe(true);
            expect(inputElement.disabled).toBe(true);
            testComponent.formControl.enable();
            fixture.detectChanges();
            expect(checkboxInstance.disabled).toBe(false);
            expect(inputElement.disabled).toBe(false);
        });
    });
    describe('without label', function () {
        var testComponent;
        var checkboxInnerContainer;
        beforeEach(function () {
            fixture = createComponent(CheckboxWithoutLabel);
            var checkboxDebugEl = fixture.debugElement.query(platform_browser_1.By.directive(index_1.MatCheckbox));
            testComponent = fixture.componentInstance;
            checkboxInnerContainer = checkboxDebugEl
                .query(platform_browser_1.By.css('.mat-checkbox-inner-container')).nativeElement;
        });
        it('should remove margin for checkbox without a label', function () {
            fixture.detectChanges();
            expect(checkboxInnerContainer.classList)
                .toContain('mat-checkbox-inner-container-no-side-margin');
        });
        it('should not remove margin if initial label is set through binding', function () {
            testComponent.label = 'Some content';
            fixture.detectChanges();
            expect(checkboxInnerContainer.classList)
                .not.toContain('mat-checkbox-inner-container-no-side-margin');
        });
        it('should re-add margin if label is added asynchronously', function () {
            fixture.destroy();
            var mutationCallbacks = [];
            testing_1.TestBed
                .resetTestingModule()
                .configureTestingModule({
                imports: [index_1.MatCheckboxModule, forms_1.FormsModule, forms_1.ReactiveFormsModule],
                declarations: [CheckboxWithoutLabel],
                providers: [{
                        provide: observers_1.MutationObserverFactory,
                        useValue: {
                            // Stub out the factory that creates mutation observers for the underlying directive
                            // to allows us to flush out the callbacks asynchronously.
                            create: function (callback) {
                                mutationCallbacks.push(callback);
                                return {
                                    observe: function () { },
                                    disconnect: function () { }
                                };
                            }
                        }
                    }]
            })
                .compileComponents();
            fixture = createComponent(CheckboxWithoutLabel);
            checkboxInnerContainer = fixture.debugElement
                .query(platform_browser_1.By.css('.mat-checkbox-inner-container')).nativeElement;
            fixture.detectChanges();
            expect(checkboxInnerContainer.classList)
                .toContain('mat-checkbox-inner-container-no-side-margin');
            fixture.componentInstance.label = 'Some content';
            fixture.detectChanges();
            mutationCallbacks.forEach(function (callback) { return callback(); });
            // The MutationObserver from the cdkObserveContent directive detected the content change
            // and notified the checkbox component. The checkbox then marks the component as dirty
            // by calling `markForCheck()`. This needs to be reflected by the component template then.
            fixture.detectChanges();
            expect(checkboxInnerContainer.classList)
                .not.toContain('mat-checkbox-inner-container-no-side-margin');
        });
        it('should not add the "name" attribute if it is not passed in', function () {
            fixture.detectChanges();
            expect(checkboxInnerContainer.querySelector('input').hasAttribute('name')).toBe(false);
        });
        it('should not add the "value" attribute if it is not passed in', function () {
            fixture.detectChanges();
            expect(checkboxInnerContainer.querySelector('input').hasAttribute('value')).toBe(false);
        });
    });
});
/** Simple component for testing a single checkbox. */
var SingleCheckbox = /** @class */ (function () {
    function SingleCheckbox() {
        this.labelPos = 'after';
        this.isChecked = false;
        this.isRequired = false;
        this.isIndeterminate = false;
        this.isDisabled = false;
        this.disableRipple = false;
        this.parentElementClicked = false;
        this.parentElementKeyedUp = false;
        this.checkboxId = 'simple-check';
        this.checkboxColor = 'primary';
        this.checkboxValue = 'single_checkbox';
        this.onCheckboxClick = function () { };
        this.onCheckboxChange = function () { };
    }
    SingleCheckbox.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n  <div (click)=\"parentElementClicked = true\" (keyup)=\"parentElementKeyedUp = true\">\n    <mat-checkbox\n        [id]=\"checkboxId\"\n        [required]=\"isRequired\"\n        [labelPosition]=\"labelPos\"\n        [checked]=\"isChecked\"\n        [(indeterminate)]=\"isIndeterminate\"\n        [disabled]=\"isDisabled\"\n        [color]=\"checkboxColor\"\n        [disableRipple]=\"disableRipple\"\n        [value]=\"checkboxValue\"\n        (click)=\"onCheckboxClick($event)\"\n        (change)=\"onCheckboxChange($event)\">\n      Simple checkbox\n    </mat-checkbox>\n  </div>"
                },] },
    ];
    return SingleCheckbox;
}());
/** Simple component for testing an MatCheckbox with required ngModel. */
var CheckboxWithNgModel = /** @class */ (function () {
    function CheckboxWithNgModel() {
        this.isGood = false;
        this.isRequired = true;
    }
    CheckboxWithNgModel.decorators = [
        { type: core_1.Component, args: [{
                    template: "<mat-checkbox [required]=\"isRequired\" [(ngModel)]=\"isGood\">Be good</mat-checkbox>",
                },] },
    ];
    return CheckboxWithNgModel;
}());
/** Simple test component with multiple checkboxes. */
var MultipleCheckboxes = /** @class */ (function () {
    function MultipleCheckboxes() {
    }
    MultipleCheckboxes.decorators = [
        { type: core_1.Component, args: [({
                    template: "\n    <mat-checkbox>Option 1</mat-checkbox>\n    <mat-checkbox>Option 2</mat-checkbox>\n  "
                }),] },
    ];
    return MultipleCheckboxes;
}());
/** Simple test component with tabIndex */
var CheckboxWithTabIndex = /** @class */ (function () {
    function CheckboxWithTabIndex() {
        this.customTabIndex = 7;
        this.isDisabled = false;
    }
    CheckboxWithTabIndex.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <mat-checkbox\n        [tabIndex]=\"customTabIndex\"\n        [disabled]=\"isDisabled\">\n    </mat-checkbox>",
                },] },
    ];
    return CheckboxWithTabIndex;
}());
/** Simple test component that accesses MatCheckbox using ViewChild. */
var CheckboxUsingViewChild = /** @class */ (function () {
    function CheckboxUsingViewChild() {
    }
    Object.defineProperty(CheckboxUsingViewChild.prototype, "isDisabled", {
        set: function (value) {
            this.checkbox.disabled = value;
        },
        enumerable: true,
        configurable: true
    });
    CheckboxUsingViewChild.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <mat-checkbox></mat-checkbox>",
                },] },
    ];
    /** @nocollapse */
    CheckboxUsingViewChild.propDecorators = {
        "checkbox": [{ type: core_1.ViewChild, args: [index_1.MatCheckbox,] },],
    };
    return CheckboxUsingViewChild;
}());
/** Simple test component with an aria-label set. */
var CheckboxWithAriaLabel = /** @class */ (function () {
    function CheckboxWithAriaLabel() {
    }
    CheckboxWithAriaLabel.decorators = [
        { type: core_1.Component, args: [{
                    template: "<mat-checkbox aria-label=\"Super effective\"></mat-checkbox>"
                },] },
    ];
    return CheckboxWithAriaLabel;
}());
/** Simple test component with an aria-label set. */
var CheckboxWithAriaLabelledby = /** @class */ (function () {
    function CheckboxWithAriaLabelledby() {
    }
    CheckboxWithAriaLabelledby.decorators = [
        { type: core_1.Component, args: [{
                    template: "<mat-checkbox aria-labelledby=\"some-id\"></mat-checkbox>"
                },] },
    ];
    return CheckboxWithAriaLabelledby;
}());
/** Simple test component with name attribute */
var CheckboxWithNameAttribute = /** @class */ (function () {
    function CheckboxWithNameAttribute() {
    }
    CheckboxWithNameAttribute.decorators = [
        { type: core_1.Component, args: [{
                    template: "<mat-checkbox name=\"test-name\"></mat-checkbox>"
                },] },
    ];
    return CheckboxWithNameAttribute;
}());
/** Simple test component with change event */
var CheckboxWithChangeEvent = /** @class */ (function () {
    function CheckboxWithChangeEvent() {
    }
    CheckboxWithChangeEvent.decorators = [
        { type: core_1.Component, args: [{
                    template: "<mat-checkbox (change)=\"lastEvent = $event\"></mat-checkbox>"
                },] },
    ];
    return CheckboxWithChangeEvent;
}());
/** Test component with reactive forms */
var CheckboxWithFormControl = /** @class */ (function () {
    function CheckboxWithFormControl() {
        this.formControl = new forms_1.FormControl();
    }
    CheckboxWithFormControl.decorators = [
        { type: core_1.Component, args: [{
                    template: "<mat-checkbox [formControl]=\"formControl\"></mat-checkbox>"
                },] },
    ];
    return CheckboxWithFormControl;
}());
/** Test component without label */
var CheckboxWithoutLabel = /** @class */ (function () {
    function CheckboxWithoutLabel() {
    }
    CheckboxWithoutLabel.decorators = [
        { type: core_1.Component, args: [{
                    template: "<mat-checkbox>{{ label }}</mat-checkbox>"
                },] },
    ];
    return CheckboxWithoutLabel;
}());
/** Test component with the native tabindex attribute. */
var CheckboxWithTabindexAttr = /** @class */ (function () {
    function CheckboxWithTabindexAttr() {
    }
    CheckboxWithTabindexAttr.decorators = [
        { type: core_1.Component, args: [{
                    template: "<mat-checkbox tabindex=\"5\"></mat-checkbox>"
                },] },
    ];
    return CheckboxWithTabindexAttr;
}());
//# sourceMappingURL=checkbox.spec.js.map