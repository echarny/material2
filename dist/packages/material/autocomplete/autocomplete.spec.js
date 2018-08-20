"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bidi_1 = require("@angular/cdk/bidi");
var keycodes_1 = require("@angular/cdk/keycodes");
var overlay_1 = require("@angular/cdk/overlay");
var scrolling_1 = require("@angular/cdk/scrolling");
var testing_1 = require("@angular/cdk/testing");
var core_1 = require("@angular/core");
var testing_2 = require("@angular/core/testing");
var forms_1 = require("@angular/forms");
var core_2 = require("@angular/material/core");
var form_field_1 = require("@angular/material/form-field");
var platform_browser_1 = require("@angular/platform-browser");
var animations_1 = require("@angular/platform-browser/animations");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var index_1 = require("../input/index");
var index_2 = require("./index");
describe('MatAutocomplete', function () {
    var overlayContainer;
    var overlayContainerElement;
    var zone;
    // Creates a test component fixture.
    function createComponent(component, providers) {
        if (providers === void 0) { providers = []; }
        testing_2.TestBed.configureTestingModule({
            imports: [
                index_2.MatAutocompleteModule,
                form_field_1.MatFormFieldModule,
                index_1.MatInputModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                animations_1.NoopAnimationsModule
            ],
            declarations: [component],
            providers: [
                { provide: core_1.NgZone, useFactory: function () { return zone = new testing_1.MockNgZone(); } }
            ].concat(providers)
        });
        testing_2.TestBed.compileComponents();
        testing_2.inject([overlay_1.OverlayContainer], function (oc) {
            overlayContainer = oc;
            overlayContainerElement = oc.getContainerElement();
        })();
        return testing_2.TestBed.createComponent(component);
    }
    afterEach(testing_2.inject([overlay_1.OverlayContainer], function (currentOverlayContainer) {
        // Since we're resetting the testing module in some of the tests,
        // we can potentially have multiple overlay containers.
        currentOverlayContainer.ngOnDestroy();
        overlayContainer.ngOnDestroy();
    }));
    describe('panel toggling', function () {
        var fixture;
        var input;
        beforeEach(function () {
            fixture = createComponent(SimpleAutocomplete);
            fixture.detectChanges();
            input = fixture.debugElement.query(platform_browser_1.By.css('input')).nativeElement;
        });
        it('should open the panel when the input is focused', function () {
            expect(fixture.componentInstance.trigger.panelOpen)
                .toBe(false, "Expected panel state to start out closed.");
            testing_1.dispatchFakeEvent(input, 'focusin');
            fixture.detectChanges();
            expect(fixture.componentInstance.trigger.panelOpen)
                .toBe(true, "Expected panel state to read open when input is focused.");
            expect(overlayContainerElement.textContent)
                .toContain('Alabama', "Expected panel to display when input is focused.");
            expect(overlayContainerElement.textContent)
                .toContain('California', "Expected panel to display when input is focused.");
        });
        it('should not open the panel on focus if the input is readonly', testing_2.fakeAsync(function () {
            var trigger = fixture.componentInstance.trigger;
            input.readOnly = true;
            fixture.detectChanges();
            expect(trigger.panelOpen).toBe(false, 'Expected panel state to start out closed.');
            testing_1.dispatchFakeEvent(input, 'focusin');
            testing_2.flush();
            fixture.detectChanges();
            expect(trigger.panelOpen).toBe(false, 'Expected panel to stay closed.');
        }));
        it('should not open using the arrow keys when the input is readonly', testing_2.fakeAsync(function () {
            var trigger = fixture.componentInstance.trigger;
            input.readOnly = true;
            fixture.detectChanges();
            expect(trigger.panelOpen).toBe(false, 'Expected panel state to start out closed.');
            testing_1.dispatchKeyboardEvent(input, 'keydown', keycodes_1.DOWN_ARROW);
            testing_2.flush();
            fixture.detectChanges();
            expect(trigger.panelOpen).toBe(false, 'Expected panel to stay closed.');
        }));
        it('should open the panel programmatically', function () {
            expect(fixture.componentInstance.trigger.panelOpen)
                .toBe(false, "Expected panel state to start out closed.");
            fixture.componentInstance.trigger.openPanel();
            fixture.detectChanges();
            expect(fixture.componentInstance.trigger.panelOpen)
                .toBe(true, "Expected panel state to read open when opened programmatically.");
            expect(overlayContainerElement.textContent)
                .toContain('Alabama', "Expected panel to display when opened programmatically.");
            expect(overlayContainerElement.textContent)
                .toContain('California', "Expected panel to display when opened programmatically.");
        });
        it('should show the panel when the first open is after the initial zone stabilization', testing_2.async(function () {
            // Note that we're running outside the Angular zone, in order to be able
            // to test properly without the subscription from `_subscribeToClosingActions`
            // giving us a false positive.
            // Note that we're running outside the Angular zone, in order to be able
            // to test properly without the subscription from `_subscribeToClosingActions`
            // giving us a false positive.
            fixture.ngZone.runOutsideAngular(function () {
                fixture.componentInstance.trigger.openPanel();
                Promise.resolve().then(function () {
                    expect(fixture.componentInstance.panel.showPanel)
                        .toBe(true, "Expected panel to be visible.");
                });
            });
        }));
        it('should close the panel when the user clicks away', testing_2.fakeAsync(function () {
            testing_1.dispatchFakeEvent(input, 'focusin');
            fixture.detectChanges();
            zone.simulateZoneExit();
            testing_1.dispatchFakeEvent(document, 'click');
            expect(fixture.componentInstance.trigger.panelOpen)
                .toBe(false, "Expected clicking outside the panel to set its state to closed.");
            expect(overlayContainerElement.textContent)
                .toEqual('', "Expected clicking outside the panel to close the panel.");
        }));
        it('should close the panel when the user taps away on a touch device', testing_2.fakeAsync(function () {
            testing_1.dispatchFakeEvent(input, 'focus');
            fixture.detectChanges();
            testing_2.flush();
            testing_1.dispatchFakeEvent(document, 'touchend');
            expect(fixture.componentInstance.trigger.panelOpen)
                .toBe(false, "Expected tapping outside the panel to set its state to closed.");
            expect(overlayContainerElement.textContent)
                .toEqual('', "Expected tapping outside the panel to close the panel.");
        }));
        it('should close the panel when an option is clicked', testing_2.fakeAsync(function () {
            testing_1.dispatchFakeEvent(input, 'focusin');
            fixture.detectChanges();
            zone.simulateZoneExit();
            var option = overlayContainerElement.querySelector('mat-option');
            option.click();
            fixture.detectChanges();
            expect(fixture.componentInstance.trigger.panelOpen)
                .toBe(false, "Expected clicking an option to set the panel state to closed.");
            expect(overlayContainerElement.textContent)
                .toEqual('', "Expected clicking an option to close the panel.");
        }));
        it('should close the panel when a newly created option is clicked', testing_2.fakeAsync(function () {
            testing_1.dispatchFakeEvent(input, 'focusin');
            fixture.detectChanges();
            zone.simulateZoneExit();
            // Filter down the option list to a subset of original options ('Alabama', 'California')
            // Filter down the option list to a subset of original options ('Alabama', 'California')
            testing_1.typeInElement('al', input);
            fixture.detectChanges();
            testing_2.tick();
            var options = overlayContainerElement.querySelectorAll('mat-option');
            options[0].click();
            // Changing value from 'Alabama' to 'al' to re-populate the option list,
            // ensuring that 'California' is created new.
            // Changing value from 'Alabama' to 'al' to re-populate the option list,
            // ensuring that 'California' is created new.
            testing_1.dispatchFakeEvent(input, 'focusin');
            testing_1.typeInElement('al', input);
            fixture.detectChanges();
            testing_2.tick();
            options = overlayContainerElement.querySelectorAll('mat-option');
            options[1].click();
            fixture.detectChanges();
            expect(fixture.componentInstance.trigger.panelOpen)
                .toBe(false, "Expected clicking a new option to set the panel state to closed.");
            expect(overlayContainerElement.textContent)
                .toEqual('', "Expected clicking a new option to close the panel.");
        }));
        it('should close the panel programmatically', function () {
            fixture.componentInstance.trigger.openPanel();
            fixture.detectChanges();
            fixture.componentInstance.trigger.closePanel();
            fixture.detectChanges();
            expect(fixture.componentInstance.trigger.panelOpen)
                .toBe(false, "Expected closing programmatically to set the panel state to closed.");
            expect(overlayContainerElement.textContent)
                .toEqual('', "Expected closing programmatically to close the panel.");
        });
        it('should not throw when attempting to close the panel of a destroyed autocomplete', function () {
            var trigger = fixture.componentInstance.trigger;
            trigger.openPanel();
            fixture.detectChanges();
            fixture.destroy();
            expect(function () { return trigger.closePanel(); }).not.toThrow();
        });
        it('should hide the panel when the options list is empty', testing_2.fakeAsync(function () {
            testing_1.dispatchFakeEvent(input, 'focusin');
            fixture.detectChanges();
            var panel = overlayContainerElement.querySelector('.mat-autocomplete-panel');
            expect(panel.classList)
                .toContain('mat-autocomplete-visible', "Expected panel to start out visible.");
            // Filter down the option list such that no options match the value
            // Filter down the option list such that no options match the value
            testing_1.typeInElement('af', input);
            fixture.detectChanges();
            testing_2.tick();
            fixture.detectChanges();
            expect(panel.classList)
                .toContain('mat-autocomplete-hidden', "Expected panel to hide itself when empty.");
        }));
        it('should keep the label floating until the panel closes', testing_2.fakeAsync(function () {
            fixture.componentInstance.trigger.openPanel();
            expect(fixture.componentInstance.formField.floatLabel)
                .toEqual('always', 'Expected label to float as soon as panel opens.');
            zone.simulateZoneExit();
            fixture.detectChanges();
            var options = overlayContainerElement.querySelectorAll('mat-option');
            options[1].click();
            fixture.detectChanges();
            expect(fixture.componentInstance.formField.floatLabel)
                .toEqual('auto', 'Expected label to return to auto state after panel closes.');
        }));
        it('should not open the panel when the `input` event is invoked on a non-focused input', function () {
            expect(fixture.componentInstance.trigger.panelOpen)
                .toBe(false, "Expected panel state to start out closed.");
            input.value = 'Alabama';
            testing_1.dispatchFakeEvent(input, 'input');
            fixture.detectChanges();
            expect(fixture.componentInstance.trigger.panelOpen)
                .toBe(false, "Expected panel state to stay closed.");
        });
        it('should not mess with label placement if set to never', testing_2.fakeAsync(function () {
            fixture.componentInstance.floatLabel = 'never';
            fixture.detectChanges();
            fixture.componentInstance.trigger.openPanel();
            expect(fixture.componentInstance.formField.floatLabel)
                .toEqual('never', 'Expected label to stay static.');
            testing_2.flush();
            fixture.detectChanges();
            var options = overlayContainerElement.querySelectorAll('mat-option');
            options[1].click();
            fixture.detectChanges();
            expect(fixture.componentInstance.formField.floatLabel)
                .toEqual('never', 'Expected label to stay in static state after close.');
        }));
        it('should not mess with label placement if set to always', testing_2.fakeAsync(function () {
            fixture.componentInstance.floatLabel = 'always';
            fixture.detectChanges();
            fixture.componentInstance.trigger.openPanel();
            expect(fixture.componentInstance.formField.floatLabel)
                .toEqual('always', 'Expected label to stay elevated on open.');
            testing_2.flush();
            fixture.detectChanges();
            var options = overlayContainerElement.querySelectorAll('mat-option');
            options[1].click();
            fixture.detectChanges();
            expect(fixture.componentInstance.formField.floatLabel)
                .toEqual('always', 'Expected label to stay elevated after close.');
        }));
        it('should toggle the visibility when typing and closing the panel', testing_2.fakeAsync(function () {
            fixture.componentInstance.trigger.openPanel();
            testing_2.tick();
            fixture.detectChanges();
            expect(overlayContainerElement.querySelector('.mat-autocomplete-panel').classList)
                .toContain('mat-autocomplete-visible', 'Expected panel to be visible.');
            testing_1.typeInElement('x', input);
            fixture.detectChanges();
            testing_2.tick();
            fixture.detectChanges();
            expect(overlayContainerElement.querySelector('.mat-autocomplete-panel').classList)
                .toContain('mat-autocomplete-hidden', 'Expected panel to be hidden.');
            fixture.componentInstance.trigger.closePanel();
            fixture.detectChanges();
            fixture.componentInstance.trigger.openPanel();
            fixture.detectChanges();
            testing_1.typeInElement('al', input);
            fixture.detectChanges();
            testing_2.tick();
            fixture.detectChanges();
            expect(overlayContainerElement.querySelector('.mat-autocomplete-panel').classList)
                .toContain('mat-autocomplete-visible', 'Expected panel to be visible.');
        }));
        it('should animate the label when the input is focused', function () {
            var inputContainer = fixture.componentInstance.formField;
            spyOn(inputContainer, '_animateAndLockLabel');
            expect(inputContainer._animateAndLockLabel).not.toHaveBeenCalled();
            testing_1.dispatchFakeEvent(fixture.debugElement.query(platform_browser_1.By.css('input')).nativeElement, 'focusin');
            expect(inputContainer._animateAndLockLabel).toHaveBeenCalled();
        });
        it('should provide the open state of the panel', testing_2.fakeAsync(function () {
            expect(fixture.componentInstance.panel.isOpen).toBeFalsy("Expected the panel to be unopened initially.");
            testing_1.dispatchFakeEvent(input, 'focusin');
            fixture.detectChanges();
            testing_2.flush();
            expect(fixture.componentInstance.panel.isOpen).toBeTruthy("Expected the panel to be opened on focus.");
        }));
        it('should emit an event when the panel is opened', function () {
            fixture.componentInstance.trigger.openPanel();
            fixture.detectChanges();
            expect(fixture.componentInstance.openedSpy).toHaveBeenCalled();
        });
        it('should not emit the `opened` event when no options are being shown', function () {
            fixture.componentInstance.filteredStates = fixture.componentInstance.states = [];
            fixture.detectChanges();
            fixture.componentInstance.trigger.openPanel();
            fixture.detectChanges();
            expect(fixture.componentInstance.openedSpy).not.toHaveBeenCalled();
        });
        it('should not emit the opened event multiple times while typing', testing_2.fakeAsync(function () {
            fixture.componentInstance.trigger.openPanel();
            fixture.detectChanges();
            expect(fixture.componentInstance.openedSpy).toHaveBeenCalledTimes(1);
            testing_1.typeInElement('Alabam', input);
            fixture.detectChanges();
            testing_2.tick();
            fixture.detectChanges();
            expect(fixture.componentInstance.openedSpy).toHaveBeenCalledTimes(1);
        }));
        it('should emit an event when the panel is closed', function () {
            fixture.componentInstance.trigger.openPanel();
            fixture.detectChanges();
            fixture.componentInstance.trigger.closePanel();
            fixture.detectChanges();
            expect(fixture.componentInstance.closedSpy).toHaveBeenCalled();
        });
        it('should not emit the `closed` event when no options were shown', function () {
            fixture.componentInstance.filteredStates = fixture.componentInstance.states = [];
            fixture.detectChanges();
            fixture.componentInstance.trigger.openPanel();
            fixture.detectChanges();
            fixture.componentInstance.trigger.closePanel();
            fixture.detectChanges();
            expect(fixture.componentInstance.closedSpy).not.toHaveBeenCalled();
        });
        it('should not be able to open the panel if the autocomplete is disabled', function () {
            expect(fixture.componentInstance.trigger.panelOpen)
                .toBe(false, "Expected panel state to start out closed.");
            fixture.componentInstance.autocompleteDisabled = true;
            fixture.detectChanges();
            testing_1.dispatchFakeEvent(input, 'focusin');
            fixture.detectChanges();
            expect(fixture.componentInstance.trigger.panelOpen)
                .toBe(false, "Expected panel to remain closed.");
        });
        it('should continue to update the model if the autocomplete is disabled', function () {
            fixture.componentInstance.autocompleteDisabled = true;
            fixture.detectChanges();
            testing_1.typeInElement('hello', input);
            fixture.detectChanges();
            expect(fixture.componentInstance.stateCtrl.value).toBe('hello');
        });
    });
    it('should have the correct text direction in RTL', function () {
        var rtlFixture = createComponent(SimpleAutocomplete, [
            { provide: bidi_1.Directionality, useFactory: function () { return ({ value: 'rtl' }); } },
        ]);
        rtlFixture.detectChanges();
        rtlFixture.componentInstance.trigger.openPanel();
        rtlFixture.detectChanges();
        var boundingBox = (overlayContainerElement.querySelector('.cdk-overlay-connected-position-bounding-box'));
        expect(boundingBox.getAttribute('dir')).toEqual('rtl');
    });
    it('should update the panel direction if it changes for the trigger', function () {
        var dirProvider = { value: 'rtl' };
        var rtlFixture = createComponent(SimpleAutocomplete, [
            { provide: bidi_1.Directionality, useFactory: function () { return dirProvider; } },
        ]);
        rtlFixture.detectChanges();
        rtlFixture.componentInstance.trigger.openPanel();
        rtlFixture.detectChanges();
        var boundingBox = (overlayContainerElement.querySelector('.cdk-overlay-connected-position-bounding-box'));
        expect(boundingBox.getAttribute('dir')).toEqual('rtl');
        rtlFixture.componentInstance.trigger.closePanel();
        rtlFixture.detectChanges();
        dirProvider.value = 'ltr';
        rtlFixture.componentInstance.trigger.openPanel();
        rtlFixture.detectChanges();
        boundingBox =
            (overlayContainerElement.querySelector('.cdk-overlay-connected-position-bounding-box'));
        expect(boundingBox.getAttribute('dir')).toEqual('ltr');
    });
    it('should be able to set a custom value for the `autocomplete` attribute', function () {
        var fixture = createComponent(AutocompleteWithNativeAutocompleteAttribute);
        var input = fixture.nativeElement.querySelector('input');
        fixture.detectChanges();
        expect(input.getAttribute('autocomplete')).toBe('changed');
    });
    it('should not throw when typing in an element with a null and disabled autocomplete', function () {
        var fixture = createComponent(InputWithoutAutocompleteAndDisabled);
        fixture.detectChanges();
        expect(function () {
            testing_1.dispatchKeyboardEvent(fixture.nativeElement.querySelector('input'), 'keydown', keycodes_1.SPACE);
            fixture.detectChanges();
        }).not.toThrow();
    });
    describe('forms integration', function () {
        var fixture;
        var input;
        beforeEach(function () {
            fixture = createComponent(SimpleAutocomplete);
            fixture.detectChanges();
            input = fixture.debugElement.query(platform_browser_1.By.css('input')).nativeElement;
        });
        it('should update control value as user types with input value', function () {
            fixture.componentInstance.trigger.openPanel();
            fixture.detectChanges();
            zone.simulateZoneExit();
            testing_1.typeInElement('a', input);
            fixture.detectChanges();
            expect(fixture.componentInstance.stateCtrl.value)
                .toEqual('a', 'Expected control value to be updated as user types.');
            testing_1.typeInElement('al', input);
            fixture.detectChanges();
            expect(fixture.componentInstance.stateCtrl.value)
                .toEqual('al', 'Expected control value to be updated as user types.');
        });
        it('should update control value when option is selected with option value', testing_2.fakeAsync(function () {
            fixture.componentInstance.trigger.openPanel();
            fixture.detectChanges();
            zone.simulateZoneExit();
            var options = overlayContainerElement.querySelectorAll('mat-option');
            options[1].click();
            fixture.detectChanges();
            expect(fixture.componentInstance.stateCtrl.value)
                .toEqual({ code: 'CA', name: 'California' }, 'Expected control value to equal the selected option value.');
        }));
        it('should update the control back to a string if user types after an option is selected', testing_2.fakeAsync(function () {
            fixture.componentInstance.trigger.openPanel();
            fixture.detectChanges();
            zone.simulateZoneExit();
            var options = overlayContainerElement.querySelectorAll('mat-option');
            options[1].click();
            fixture.detectChanges();
            testing_1.typeInElement('Californi', input);
            fixture.detectChanges();
            testing_2.tick();
            expect(fixture.componentInstance.stateCtrl.value)
                .toEqual('Californi', 'Expected control value to revert back to string.');
        }));
        it('should fill the text field with display value when an option is selected', testing_2.fakeAsync(function () {
            fixture.componentInstance.trigger.openPanel();
            fixture.detectChanges();
            zone.simulateZoneExit();
            var options = overlayContainerElement.querySelectorAll('mat-option');
            options[1].click();
            fixture.detectChanges();
            expect(input.value)
                .toContain('California', "Expected text field to fill with selected value.");
        }));
        it('should fill the text field with value if displayWith is not set', testing_2.fakeAsync(function () {
            fixture.componentInstance.trigger.openPanel();
            fixture.detectChanges();
            zone.simulateZoneExit();
            fixture.componentInstance.panel.displayWith = null;
            fixture.componentInstance.options.toArray()[1].value = 'test value';
            fixture.detectChanges();
            var options = overlayContainerElement.querySelectorAll('mat-option');
            options[1].click();
            fixture.detectChanges();
            expect(input.value)
                .toContain('test value', "Expected input to fall back to selected option's value.");
        }));
        it('should fill the text field correctly if value is set to obj programmatically', testing_2.fakeAsync(function () {
            fixture.componentInstance.stateCtrl.setValue({ code: 'AL', name: 'Alabama' });
            fixture.detectChanges();
            testing_2.tick();
            fixture.detectChanges();
            expect(input.value)
                .toContain('Alabama', "Expected input to fill with matching option's viewValue.");
        }));
        it('should clear the text field if value is reset programmatically', testing_2.fakeAsync(function () {
            testing_1.typeInElement('Alabama', input);
            fixture.detectChanges();
            testing_2.tick();
            fixture.componentInstance.stateCtrl.reset();
            testing_2.tick();
            fixture.detectChanges();
            testing_2.tick();
            expect(input.value).toEqual('', "Expected input value to be empty after reset.");
        }));
        it('should disable input in view when disabled programmatically', function () {
            var formFieldElement = fixture.debugElement.query(platform_browser_1.By.css('.mat-form-field')).nativeElement;
            expect(input.disabled)
                .toBe(false, "Expected input to start out enabled in view.");
            expect(formFieldElement.classList.contains('mat-form-field-disabled'))
                .toBe(false, "Expected input underline to start out with normal styles.");
            fixture.componentInstance.stateCtrl.disable();
            fixture.detectChanges();
            expect(input.disabled)
                .toBe(true, "Expected input to be disabled in view when disabled programmatically.");
            expect(formFieldElement.classList.contains('mat-form-field-disabled'))
                .toBe(true, "Expected input underline to display disabled styles.");
        });
        it('should mark the autocomplete control as dirty as user types', function () {
            expect(fixture.componentInstance.stateCtrl.dirty)
                .toBe(false, "Expected control to start out pristine.");
            testing_1.typeInElement('a', input);
            fixture.detectChanges();
            expect(fixture.componentInstance.stateCtrl.dirty)
                .toBe(true, "Expected control to become dirty when the user types into the input.");
        });
        it('should mark the autocomplete control as dirty when an option is selected', testing_2.fakeAsync(function () {
            expect(fixture.componentInstance.stateCtrl.dirty)
                .toBe(false, "Expected control to start out pristine.");
            fixture.componentInstance.trigger.openPanel();
            fixture.detectChanges();
            zone.simulateZoneExit();
            var options = overlayContainerElement.querySelectorAll('mat-option');
            options[1].click();
            fixture.detectChanges();
            expect(fixture.componentInstance.stateCtrl.dirty)
                .toBe(true, "Expected control to become dirty when an option was selected.");
        }));
        it('should not mark the control dirty when the value is set programmatically', function () {
            expect(fixture.componentInstance.stateCtrl.dirty)
                .toBe(false, "Expected control to start out pristine.");
            fixture.componentInstance.stateCtrl.setValue('AL');
            fixture.detectChanges();
            expect(fixture.componentInstance.stateCtrl.dirty)
                .toBe(false, "Expected control to stay pristine if value is set programmatically.");
        });
        it('should mark the autocomplete control as touched on blur', function () {
            fixture.componentInstance.trigger.openPanel();
            fixture.detectChanges();
            expect(fixture.componentInstance.stateCtrl.touched)
                .toBe(false, "Expected control to start out untouched.");
            testing_1.dispatchFakeEvent(input, 'blur');
            fixture.detectChanges();
            expect(fixture.componentInstance.stateCtrl.touched)
                .toBe(true, "Expected control to become touched on blur.");
        });
        it('should disable the input when used with a value accessor and without `matInput`', function () {
            overlayContainer.ngOnDestroy();
            fixture.destroy();
            testing_2.TestBed.resetTestingModule();
            var plainFixture = createComponent(PlainAutocompleteInputWithFormControl);
            plainFixture.detectChanges();
            input = plainFixture.nativeElement.querySelector('input');
            expect(input.disabled).toBe(false);
            plainFixture.componentInstance.formControl.disable();
            plainFixture.detectChanges();
            expect(input.disabled).toBe(true);
        });
    });
    describe('keyboard events', function () {
        var fixture;
        var input;
        var DOWN_ARROW_EVENT;
        var UP_ARROW_EVENT;
        var ENTER_EVENT;
        beforeEach(testing_2.fakeAsync(function () {
            fixture = createComponent(SimpleAutocomplete);
            fixture.detectChanges();
            input = fixture.debugElement.query(platform_browser_1.By.css('input')).nativeElement;
            DOWN_ARROW_EVENT = testing_1.createKeyboardEvent('keydown', keycodes_1.DOWN_ARROW);
            UP_ARROW_EVENT = testing_1.createKeyboardEvent('keydown', keycodes_1.UP_ARROW);
            ENTER_EVENT = testing_1.createKeyboardEvent('keydown', keycodes_1.ENTER);
            fixture.componentInstance.trigger.openPanel();
            fixture.detectChanges();
            zone.simulateZoneExit();
        }));
        it('should not focus the option when DOWN key is pressed', function () {
            spyOn(fixture.componentInstance.options.first, 'focus');
            fixture.componentInstance.trigger._handleKeydown(DOWN_ARROW_EVENT);
            expect(fixture.componentInstance.options.first.focus).not.toHaveBeenCalled();
        });
        it('should not close the panel when DOWN key is pressed', function () {
            fixture.componentInstance.trigger._handleKeydown(DOWN_ARROW_EVENT);
            expect(fixture.componentInstance.trigger.panelOpen)
                .toBe(true, "Expected panel state to stay open when DOWN key is pressed.");
            expect(overlayContainerElement.textContent)
                .toContain('Alabama', "Expected panel to keep displaying when DOWN key is pressed.");
            expect(overlayContainerElement.textContent)
                .toContain('California', "Expected panel to keep displaying when DOWN key is pressed.");
        });
        it('should set the active item to the first option when DOWN key is pressed', function () {
            var componentInstance = fixture.componentInstance;
            var optionEls = overlayContainerElement.querySelectorAll('mat-option');
            expect(componentInstance.trigger.panelOpen)
                .toBe(true, 'Expected first down press to open the pane.');
            componentInstance.trigger._handleKeydown(DOWN_ARROW_EVENT);
            fixture.detectChanges();
            expect(componentInstance.trigger.activeOption === componentInstance.options.first)
                .toBe(true, 'Expected first option to be active.');
            expect(optionEls[0].classList).toContain('mat-active');
            expect(optionEls[1].classList).not.toContain('mat-active');
            componentInstance.trigger._handleKeydown(DOWN_ARROW_EVENT);
            fixture.detectChanges();
            expect(componentInstance.trigger.activeOption === componentInstance.options.toArray()[1])
                .toBe(true, 'Expected second option to be active.');
            expect(optionEls[0].classList).not.toContain('mat-active');
            expect(optionEls[1].classList).toContain('mat-active');
        });
        it('should set the active item to the last option when UP key is pressed', function () {
            var componentInstance = fixture.componentInstance;
            var optionEls = overlayContainerElement.querySelectorAll('mat-option');
            expect(componentInstance.trigger.panelOpen)
                .toBe(true, 'Expected first up press to open the pane.');
            componentInstance.trigger._handleKeydown(UP_ARROW_EVENT);
            fixture.detectChanges();
            expect(componentInstance.trigger.activeOption === componentInstance.options.last)
                .toBe(true, 'Expected last option to be active.');
            expect(optionEls[10].classList).toContain('mat-active');
            expect(optionEls[0].classList).not.toContain('mat-active');
            componentInstance.trigger._handleKeydown(DOWN_ARROW_EVENT);
            fixture.detectChanges();
            expect(componentInstance.trigger.activeOption === componentInstance.options.first)
                .toBe(true, 'Expected first option to be active.');
            expect(optionEls[0].classList).toContain('mat-active');
        });
        it('should set the active item properly after filtering', testing_2.fakeAsync(function () {
            var componentInstance = fixture.componentInstance;
            componentInstance.trigger._handleKeydown(DOWN_ARROW_EVENT);
            testing_2.tick();
            fixture.detectChanges();
        }));
        it('should set the active item properly after filtering', function () {
            var componentInstance = fixture.componentInstance;
            testing_1.typeInElement('o', input);
            fixture.detectChanges();
            componentInstance.trigger._handleKeydown(DOWN_ARROW_EVENT);
            fixture.detectChanges();
            var optionEls = overlayContainerElement.querySelectorAll('mat-option');
            expect(componentInstance.trigger.activeOption === componentInstance.options.first)
                .toBe(true, 'Expected first option to be active.');
            expect(optionEls[0].classList).toContain('mat-active');
            expect(optionEls[1].classList).not.toContain('mat-active');
        });
        it('should fill the text field when an option is selected with ENTER', testing_2.fakeAsync(function () {
            fixture.componentInstance.trigger._handleKeydown(DOWN_ARROW_EVENT);
            testing_2.flush();
            fixture.detectChanges();
            fixture.componentInstance.trigger._handleKeydown(ENTER_EVENT);
            fixture.detectChanges();
            expect(input.value)
                .toContain('Alabama', "Expected text field to fill with selected value on ENTER.");
        }));
        it('should prevent the default enter key action', testing_2.fakeAsync(function () {
            fixture.componentInstance.trigger._handleKeydown(DOWN_ARROW_EVENT);
            testing_2.flush();
            fixture.componentInstance.trigger._handleKeydown(ENTER_EVENT);
            expect(ENTER_EVENT.defaultPrevented)
                .toBe(true, 'Expected the default action to have been prevented.');
        }));
        it('should not prevent the default enter action for a closed panel after a user action', function () {
            fixture.componentInstance.trigger._handleKeydown(UP_ARROW_EVENT);
            fixture.detectChanges();
            fixture.componentInstance.trigger.closePanel();
            fixture.detectChanges();
            fixture.componentInstance.trigger._handleKeydown(ENTER_EVENT);
            expect(ENTER_EVENT.defaultPrevented).toBe(false, 'Default action should not be prevented.');
        });
        it('should fill the text field, not select an option, when SPACE is entered', function () {
            testing_1.typeInElement('New', input);
            fixture.detectChanges();
            var SPACE_EVENT = testing_1.createKeyboardEvent('keydown', keycodes_1.SPACE);
            fixture.componentInstance.trigger._handleKeydown(DOWN_ARROW_EVENT);
            fixture.detectChanges();
            fixture.componentInstance.trigger._handleKeydown(SPACE_EVENT);
            fixture.detectChanges();
            expect(input.value).not.toContain('New York', "Expected option not to be selected on SPACE.");
        });
        it('should mark the control dirty when selecting an option from the keyboard', testing_2.fakeAsync(function () {
            expect(fixture.componentInstance.stateCtrl.dirty)
                .toBe(false, "Expected control to start out pristine.");
            fixture.componentInstance.trigger._handleKeydown(DOWN_ARROW_EVENT);
            testing_2.flush();
            fixture.componentInstance.trigger._handleKeydown(ENTER_EVENT);
            fixture.detectChanges();
            expect(fixture.componentInstance.stateCtrl.dirty)
                .toBe(true, "Expected control to become dirty when option was selected by ENTER.");
        }));
        it('should open the panel again when typing after making a selection', testing_2.fakeAsync(function () {
            fixture.componentInstance.trigger._handleKeydown(DOWN_ARROW_EVENT);
            testing_2.flush();
            fixture.componentInstance.trigger._handleKeydown(ENTER_EVENT);
            fixture.detectChanges();
            expect(fixture.componentInstance.trigger.panelOpen)
                .toBe(false, "Expected panel state to read closed after ENTER key.");
            expect(overlayContainerElement.textContent)
                .toEqual('', "Expected panel to close after ENTER key.");
            testing_1.dispatchFakeEvent(input, 'focusin');
            testing_1.typeInElement('Alabama', input);
            fixture.detectChanges();
            testing_2.tick();
            expect(fixture.componentInstance.trigger.panelOpen)
                .toBe(true, "Expected panel state to read open when typing in input.");
            expect(overlayContainerElement.textContent)
                .toContain('Alabama', "Expected panel to display when typing in input.");
        }));
        it('should not open the panel if the `input` event was dispatched with changing the value', testing_2.fakeAsync(function () {
            var trigger = fixture.componentInstance.trigger;
            testing_1.dispatchFakeEvent(input, 'focusin');
            testing_1.typeInElement('A', input);
            fixture.detectChanges();
            testing_2.tick();
            expect(trigger.panelOpen).toBe(true, 'Expected panel to be open.');
            trigger.closePanel();
            fixture.detectChanges();
            expect(trigger.panelOpen).toBe(false, 'Expected panel to be closed.');
            // Dispatch the event without actually changing the value
            // to simulate what happen in some cases on IE.
            // Dispatch the event without actually changing the value
            // to simulate what happen in some cases on IE.
            testing_1.dispatchFakeEvent(input, 'input');
            fixture.detectChanges();
            testing_2.tick();
            expect(trigger.panelOpen).toBe(false, 'Expected panel to stay closed.');
        }));
        it('should scroll to active options below the fold', function () {
            var trigger = fixture.componentInstance.trigger;
            var scrollContainer = (document.querySelector('.cdk-overlay-pane .mat-autocomplete-panel'));
            trigger._handleKeydown(DOWN_ARROW_EVENT);
            fixture.detectChanges();
            expect(scrollContainer.scrollTop).toEqual(0, "Expected panel not to scroll.");
            // These down arrows will set the 6th option active, below the fold.
            [1, 2, 3, 4, 5].forEach(function () { return trigger._handleKeydown(DOWN_ARROW_EVENT); });
            // Expect option bottom minus the panel height (288 - 256 = 32)
            expect(scrollContainer.scrollTop)
                .toEqual(32, "Expected panel to reveal the sixth option.");
        });
        it('should scroll to active options on UP arrow', function () {
            var scrollContainer = (document.querySelector('.cdk-overlay-pane .mat-autocomplete-panel'));
            fixture.componentInstance.trigger._handleKeydown(UP_ARROW_EVENT);
            fixture.detectChanges();
            // Expect option bottom minus the panel height (528 - 256 = 272)
            expect(scrollContainer.scrollTop).toEqual(272, "Expected panel to reveal last option.");
        });
        it('should not scroll to active options that are fully in the panel', function () {
            var trigger = fixture.componentInstance.trigger;
            var scrollContainer = (document.querySelector('.cdk-overlay-pane .mat-autocomplete-panel'));
            trigger._handleKeydown(DOWN_ARROW_EVENT);
            fixture.detectChanges();
            expect(scrollContainer.scrollTop).toEqual(0, "Expected panel not to scroll.");
            // These down arrows will set the 6th option active, below the fold.
            [1, 2, 3, 4, 5].forEach(function () { return trigger._handleKeydown(DOWN_ARROW_EVENT); });
            // Expect option bottom minus the panel height (288 - 256 = 32)
            expect(scrollContainer.scrollTop)
                .toEqual(32, "Expected panel to reveal the sixth option.");
            // These up arrows will set the 2nd option active
            [4, 3, 2, 1].forEach(function () { return trigger._handleKeydown(UP_ARROW_EVENT); });
            // Expect no scrolling to have occurred. Still showing bottom of 6th option.
            expect(scrollContainer.scrollTop)
                .toEqual(32, "Expected panel not to scroll up since sixth option still fully visible.");
        });
        it('should scroll to active options that are above the panel', function () {
            var trigger = fixture.componentInstance.trigger;
            var scrollContainer = (document.querySelector('.cdk-overlay-pane .mat-autocomplete-panel'));
            trigger._handleKeydown(DOWN_ARROW_EVENT);
            fixture.detectChanges();
            expect(scrollContainer.scrollTop).toEqual(0, "Expected panel not to scroll.");
            // These down arrows will set the 7th option active, below the fold.
            [1, 2, 3, 4, 5, 6].forEach(function () { return trigger._handleKeydown(DOWN_ARROW_EVENT); });
            // These up arrows will set the 2nd option active
            [5, 4, 3, 2, 1].forEach(function () { return trigger._handleKeydown(UP_ARROW_EVENT); });
            // Expect to show the top of the 2nd option at the top of the panel
            expect(scrollContainer.scrollTop)
                .toEqual(48, "Expected panel to scroll up when option is above panel.");
        });
        it('should close the panel when pressing escape', testing_2.fakeAsync(function () {
            var trigger = fixture.componentInstance.trigger;
            var escapeEvent = testing_1.createKeyboardEvent('keydown', keycodes_1.ESCAPE);
            var stopPropagationSpy = spyOn(escapeEvent, 'stopPropagation').and.callThrough();
            input.focus();
            testing_2.flush();
            fixture.detectChanges();
            expect(document.activeElement).toBe(input, 'Expected input to be focused.');
            expect(trigger.panelOpen).toBe(true, 'Expected panel to be open.');
            trigger._handleKeydown(escapeEvent);
            fixture.detectChanges();
            expect(document.activeElement).toBe(input, 'Expected input to continue to be focused.');
            expect(trigger.panelOpen).toBe(false, 'Expected panel to be closed.');
            expect(stopPropagationSpy).toHaveBeenCalled();
        }));
        it('should prevent the default action when pressing escape', testing_2.fakeAsync(function () {
            var escapeEvent = testing_1.dispatchKeyboardEvent(input, 'keydown', keycodes_1.ESCAPE);
            fixture.detectChanges();
            expect(escapeEvent.defaultPrevented).toBe(true);
        }));
        it('should close the panel when pressing ALT + UP_ARROW', testing_2.fakeAsync(function () {
            var trigger = fixture.componentInstance.trigger;
            var upArrowEvent = testing_1.createKeyboardEvent('keydown', keycodes_1.UP_ARROW);
            Object.defineProperty(upArrowEvent, 'altKey', { get: function () { return true; } });
            input.focus();
            testing_2.flush();
            fixture.detectChanges();
            expect(document.activeElement).toBe(input, 'Expected input to be focused.');
            expect(trigger.panelOpen).toBe(true, 'Expected panel to be open.');
            trigger._handleKeydown(upArrowEvent);
            fixture.detectChanges();
            expect(document.activeElement).toBe(input, 'Expected input to continue to be focused.');
            expect(trigger.panelOpen).toBe(false, 'Expected panel to be closed.');
        }));
        it('should close the panel when tabbing away from a trigger without results', testing_2.fakeAsync(function () {
            fixture.componentInstance.states = [];
            fixture.componentInstance.filteredStates = [];
            fixture.detectChanges();
            input.focus();
            testing_2.flush();
            expect(overlayContainerElement.querySelector('.mat-autocomplete-panel'))
                .toBeTruthy('Expected panel to be rendered.');
            testing_1.dispatchKeyboardEvent(input, 'keydown', keycodes_1.TAB);
            fixture.detectChanges();
            expect(overlayContainerElement.querySelector('.mat-autocomplete-panel'))
                .toBeFalsy('Expected panel to be removed.');
        }));
        it('should reset the active option when closing with the escape key', testing_2.fakeAsync(function () {
            var trigger = fixture.componentInstance.trigger;
            trigger.openPanel();
            fixture.detectChanges();
            testing_2.tick();
            expect(trigger.panelOpen).toBe(true, 'Expected panel to be open.');
            expect(!!trigger.activeOption).toBe(false, 'Expected no active option.');
            // Press the down arrow a few times.
            [1, 2, 3].forEach(function () {
                trigger._handleKeydown(DOWN_ARROW_EVENT);
                testing_2.tick();
                fixture.detectChanges();
            });
            // Note that this casts to a boolean, in order to prevent Jasmine
            // from crashing when trying to stringify the option if the test fails.
            expect(!!trigger.activeOption).toBe(true, 'Expected to find an active option.');
            trigger._handleKeydown(testing_1.createKeyboardEvent('keydown', keycodes_1.ESCAPE));
            testing_2.tick();
            expect(!!trigger.activeOption).toBe(false, 'Expected no active options.');
        }));
        it('should reset the active option when closing by selecting with enter', testing_2.fakeAsync(function () {
            var trigger = fixture.componentInstance.trigger;
            trigger.openPanel();
            fixture.detectChanges();
            testing_2.tick();
            expect(trigger.panelOpen).toBe(true, 'Expected panel to be open.');
            expect(!!trigger.activeOption).toBe(false, 'Expected no active option.');
            // Press the down arrow a few times.
            [1, 2, 3].forEach(function () {
                trigger._handleKeydown(DOWN_ARROW_EVENT);
                testing_2.tick();
                fixture.detectChanges();
            });
            // Note that this casts to a boolean, in order to prevent Jasmine
            // from crashing when trying to stringify the option if the test fails.
            expect(!!trigger.activeOption).toBe(true, 'Expected to find an active option.');
            trigger._handleKeydown(ENTER_EVENT);
            testing_2.tick();
            expect(!!trigger.activeOption).toBe(false, 'Expected no active options.');
        }));
    });
    describe('option groups', function () {
        var fixture;
        var DOWN_ARROW_EVENT;
        var UP_ARROW_EVENT;
        var container;
        beforeEach(testing_2.fakeAsync(function () {
            fixture = createComponent(AutocompleteWithGroups);
            fixture.detectChanges();
            DOWN_ARROW_EVENT = testing_1.createKeyboardEvent('keydown', keycodes_1.DOWN_ARROW);
            UP_ARROW_EVENT = testing_1.createKeyboardEvent('keydown', keycodes_1.UP_ARROW);
            fixture.componentInstance.trigger.openPanel();
            fixture.detectChanges();
            testing_2.tick();
            fixture.detectChanges();
            container = document.querySelector('.mat-autocomplete-panel');
        }));
        it('should scroll to active options below the fold', testing_2.fakeAsync(function () {
            fixture.componentInstance.trigger._handleKeydown(DOWN_ARROW_EVENT);
            testing_2.tick();
            fixture.detectChanges();
            expect(container.scrollTop).toBe(0, 'Expected the panel not to scroll.');
            // Press the down arrow five times.
            [1, 2, 3, 4, 5].forEach(function () {
                fixture.componentInstance.trigger._handleKeydown(DOWN_ARROW_EVENT);
                testing_2.tick();
            });
            // <option bottom> - <panel height> + <2x group labels> = 128
            // 288 - 256 + 96 = 128
            expect(container.scrollTop)
                .toBe(128, 'Expected panel to reveal the sixth option.');
        }));
        it('should scroll to active options on UP arrow', testing_2.fakeAsync(function () {
            fixture.componentInstance.trigger._handleKeydown(UP_ARROW_EVENT);
            testing_2.tick();
            fixture.detectChanges();
            // <option bottom> - <panel height> + <3x group label> = 464
            // 576 - 256 + 144 = 464
            expect(container.scrollTop).toBe(464, 'Expected panel to reveal last option.');
        }));
        it('should scroll to active options that are above the panel', testing_2.fakeAsync(function () {
            fixture.componentInstance.trigger._handleKeydown(DOWN_ARROW_EVENT);
            testing_2.tick();
            fixture.detectChanges();
            expect(container.scrollTop).toBe(0, 'Expected panel not to scroll.');
            // These down arrows will set the 7th option active, below the fold.
            [1, 2, 3, 4, 5, 6].forEach(function () {
                fixture.componentInstance.trigger._handleKeydown(DOWN_ARROW_EVENT);
                testing_2.tick();
            });
            // These up arrows will set the 2nd option active
            [5, 4, 3, 2, 1].forEach(function () {
                fixture.componentInstance.trigger._handleKeydown(UP_ARROW_EVENT);
                testing_2.tick();
            });
            // Expect to show the top of the 2nd option at the top of the panel.
            // It is offset by 48, because there's a group label above it.
            expect(container.scrollTop)
                .toBe(96, 'Expected panel to scroll up when option is above panel.');
        }));
    });
    describe('aria', function () {
        var fixture;
        var input;
        beforeEach(function () {
            fixture = createComponent(SimpleAutocomplete);
            fixture.detectChanges();
            input = fixture.debugElement.query(platform_browser_1.By.css('input')).nativeElement;
        });
        it('should set role of input to combobox', function () {
            expect(input.getAttribute('role'))
                .toEqual('combobox', 'Expected role of input to be combobox.');
        });
        it('should set role of autocomplete panel to listbox', function () {
            fixture.componentInstance.trigger.openPanel();
            fixture.detectChanges();
            var panel = fixture.debugElement.query(platform_browser_1.By.css('.mat-autocomplete-panel')).nativeElement;
            expect(panel.getAttribute('role'))
                .toEqual('listbox', 'Expected role of the panel to be listbox.');
        });
        it('should set aria-autocomplete to list', function () {
            expect(input.getAttribute('aria-autocomplete'))
                .toEqual('list', 'Expected aria-autocomplete attribute to equal list.');
        });
        it('should set aria-activedescendant based on the active option', testing_2.fakeAsync(function () {
            fixture.componentInstance.trigger.openPanel();
            fixture.detectChanges();
            expect(input.hasAttribute('aria-activedescendant'))
                .toBe(false, 'Expected aria-activedescendant to be absent if no active item.');
            var DOWN_ARROW_EVENT = testing_1.createKeyboardEvent('keydown', keycodes_1.DOWN_ARROW);
            fixture.componentInstance.trigger._handleKeydown(DOWN_ARROW_EVENT);
            testing_2.tick();
            fixture.detectChanges();
            expect(input.getAttribute('aria-activedescendant'))
                .toEqual(fixture.componentInstance.options.first.id, 'Expected aria-activedescendant to match the active item after 1 down arrow.');
            fixture.componentInstance.trigger._handleKeydown(DOWN_ARROW_EVENT);
            testing_2.tick();
            fixture.detectChanges();
            expect(input.getAttribute('aria-activedescendant'))
                .toEqual(fixture.componentInstance.options.toArray()[1].id, 'Expected aria-activedescendant to match the active item after 2 down arrows.');
        }));
        it('should set aria-expanded based on whether the panel is open', function () {
            expect(input.getAttribute('aria-expanded'))
                .toBe('false', 'Expected aria-expanded to be false while panel is closed.');
            fixture.componentInstance.trigger.openPanel();
            fixture.detectChanges();
            expect(input.getAttribute('aria-expanded'))
                .toBe('true', 'Expected aria-expanded to be true while panel is open.');
            fixture.componentInstance.trigger.closePanel();
            fixture.detectChanges();
            expect(input.getAttribute('aria-expanded'))
                .toBe('false', 'Expected aria-expanded to be false when panel closes again.');
        });
        it('should set aria-expanded properly when the panel is hidden', testing_2.fakeAsync(function () {
            fixture.componentInstance.trigger.openPanel();
            fixture.detectChanges();
            expect(input.getAttribute('aria-expanded'))
                .toBe('true', 'Expected aria-expanded to be true while panel is open.');
            testing_1.typeInElement('zz', input);
            fixture.detectChanges();
            testing_2.tick();
            fixture.detectChanges();
            expect(input.getAttribute('aria-expanded'))
                .toBe('false', 'Expected aria-expanded to be false when panel hides itself.');
        }));
        it('should set aria-owns based on the attached autocomplete', function () {
            fixture.componentInstance.trigger.openPanel();
            fixture.detectChanges();
            var panel = fixture.debugElement.query(platform_browser_1.By.css('.mat-autocomplete-panel')).nativeElement;
            expect(input.getAttribute('aria-owns'))
                .toBe(panel.getAttribute('id'), 'Expected aria-owns to match attached autocomplete.');
        });
        it('should not set aria-owns while the autocomplete is closed', function () {
            expect(input.getAttribute('aria-owns')).toBeFalsy();
            fixture.componentInstance.trigger.openPanel();
            fixture.detectChanges();
            expect(input.getAttribute('aria-owns')).toBeTruthy();
        });
        it('should restore focus to the input when clicking to select a value', testing_2.fakeAsync(function () {
            fixture.componentInstance.trigger.openPanel();
            fixture.detectChanges();
            zone.simulateZoneExit();
            var option = overlayContainerElement.querySelector('mat-option');
            // Focus the option manually since the synthetic click may not do it.
            option.focus();
            option.click();
            fixture.detectChanges();
            expect(document.activeElement).toBe(input, 'Expected focus to be restored to the input.');
        }));
        it('should remove autocomplete-specific aria attributes when autocomplete is disabled', function () {
            fixture.componentInstance.autocompleteDisabled = true;
            fixture.detectChanges();
            expect(input.getAttribute('role')).toBeFalsy();
            expect(input.getAttribute('aria-autocomplete')).toBeFalsy();
            expect(input.getAttribute('aria-expanded')).toBeFalsy();
            expect(input.getAttribute('aria-owns')).toBeFalsy();
        });
    });
    describe('Fallback positions', function () {
        it('should use below positioning by default', testing_2.fakeAsync(function () {
            var fixture = createComponent(SimpleAutocomplete);
            fixture.detectChanges();
            var inputReference = fixture.debugElement.query(platform_browser_1.By.css('.mat-form-field-flex')).nativeElement;
            fixture.componentInstance.trigger.openPanel();
            fixture.detectChanges();
            zone.simulateZoneExit();
            fixture.detectChanges();
            var inputBottom = inputReference.getBoundingClientRect().bottom;
            var panel = (overlayContainerElement.querySelector('.mat-autocomplete-panel'));
            var panelTop = panel.getBoundingClientRect().top;
            expect(Math.floor(inputBottom))
                .toEqual(Math.floor(panelTop), "Expected panel top to match input bottom by default.");
            expect(panel.classList).not.toContain('mat-autocomplete-panel-above');
        }));
        it('should reposition the panel on scroll', function () {
            var scrolledSubject = new rxjs_1.Subject();
            var spacer = document.createElement('div');
            var fixture = createComponent(SimpleAutocomplete, [{
                    provide: scrolling_1.ScrollDispatcher,
                    useValue: { scrolled: function () { return scrolledSubject.asObservable(); } }
                }]);
            fixture.detectChanges();
            var inputReference = fixture.debugElement.query(platform_browser_1.By.css('.mat-form-field-flex')).nativeElement;
            spacer.style.height = '1000px';
            document.body.appendChild(spacer);
            fixture.componentInstance.trigger.openPanel();
            fixture.detectChanges();
            window.scroll(0, 100);
            scrolledSubject.next();
            fixture.detectChanges();
            var inputBottom = inputReference.getBoundingClientRect().bottom;
            var panel = (overlayContainerElement.querySelector('.cdk-overlay-pane'));
            var panelTop = panel.getBoundingClientRect().top;
            expect(Math.floor(inputBottom)).toEqual(Math.floor(panelTop), 'Expected panel top to match input bottom after scrolling.');
            document.body.removeChild(spacer);
            window.scroll(0, 0);
        });
        it('should fall back to above position if panel cannot fit below', testing_2.fakeAsync(function () {
            var fixture = createComponent(SimpleAutocomplete);
            fixture.detectChanges();
            var inputReference = fixture.debugElement.query(platform_browser_1.By.css('.mat-form-field-flex')).nativeElement;
            // Push the autocomplete trigger down so it won't have room to open "below"
            inputReference.style.bottom = '0';
            inputReference.style.position = 'fixed';
            fixture.componentInstance.trigger.openPanel();
            fixture.detectChanges();
            zone.simulateZoneExit();
            fixture.detectChanges();
            var inputTop = inputReference.getBoundingClientRect().top;
            var panel = (overlayContainerElement.querySelector('.cdk-overlay-pane'));
            var panelBottom = panel.getBoundingClientRect().bottom;
            expect(Math.floor(inputTop))
                .toEqual(Math.floor(panelBottom), "Expected panel to fall back to above position.");
            expect(panel.querySelector('.mat-autocomplete-panel').classList)
                .toContain('mat-autocomplete-panel-above');
        }));
        it('should allow the panel to expand when the number of results increases', testing_2.fakeAsync(function () {
            var fixture = createComponent(SimpleAutocomplete);
            fixture.detectChanges();
            var inputEl = fixture.debugElement.query(platform_browser_1.By.css('input')).nativeElement;
            var inputReference = fixture.debugElement.query(platform_browser_1.By.css('.mat-form-field-flex')).nativeElement;
            // Push the element down so it has a little bit of space, but not enough to render.
            inputReference.style.bottom = '10px';
            inputReference.style.position = 'fixed';
            // Type enough to only show one option.
            // Type enough to only show one option.
            testing_1.typeInElement('California', inputEl);
            fixture.detectChanges();
            testing_2.tick();
            fixture.componentInstance.trigger.openPanel();
            fixture.detectChanges();
            zone.simulateZoneExit();
            var panel = (overlayContainerElement.querySelector('.cdk-overlay-pane'));
            var initialPanelHeight = panel.getBoundingClientRect().height;
            fixture.componentInstance.trigger.closePanel();
            fixture.detectChanges();
            // Change the text so we get more than one result.
            // Change the text so we get more than one result.
            testing_1.typeInElement('C', inputEl);
            fixture.detectChanges();
            testing_2.tick();
            fixture.componentInstance.trigger.openPanel();
            fixture.detectChanges();
            zone.simulateZoneExit();
            panel = (overlayContainerElement.querySelector('.cdk-overlay-pane'));
            expect(panel.getBoundingClientRect().height).toBeGreaterThan(initialPanelHeight);
        }));
        it('should align panel properly when filtering in "above" position', testing_2.fakeAsync(function () {
            var fixture = createComponent(SimpleAutocomplete);
            fixture.detectChanges();
            var input = fixture.debugElement.query(platform_browser_1.By.css('input')).nativeElement;
            var inputReference = fixture.debugElement.query(platform_browser_1.By.css('.mat-form-field-flex')).nativeElement;
            // Push the autocomplete trigger down so it won't have room to open "below"
            inputReference.style.bottom = '0';
            inputReference.style.position = 'fixed';
            fixture.componentInstance.trigger.openPanel();
            fixture.detectChanges();
            zone.simulateZoneExit();
            testing_1.typeInElement('f', input);
            fixture.detectChanges();
            testing_2.tick();
            var inputTop = inputReference.getBoundingClientRect().top;
            var panel = (overlayContainerElement.querySelector('.mat-autocomplete-panel'));
            var panelBottom = panel.getBoundingClientRect().bottom;
            expect(Math.floor(inputTop))
                .toEqual(Math.floor(panelBottom), "Expected panel to stay aligned after filtering.");
        }));
        it('should fall back to above position when requested if options are added while ' +
            'the panel is open', testing_2.fakeAsync(function () {
            var fixture = createComponent(SimpleAutocomplete);
            fixture.componentInstance.states = fixture.componentInstance.states.slice(0, 1);
            fixture.componentInstance.filteredStates = fixture.componentInstance.states.slice();
            fixture.detectChanges();
            var inputEl = fixture.debugElement.query(platform_browser_1.By.css('input')).nativeElement;
            var inputReference = fixture.debugElement.query(platform_browser_1.By.css('.mat-form-field-flex')).nativeElement;
            // Push the element down so it has a little bit of space, but not enough to render.
            inputReference.style.bottom = '75px';
            inputReference.style.position = 'fixed';
            testing_1.dispatchFakeEvent(inputEl, 'focusin');
            fixture.detectChanges();
            zone.simulateZoneExit();
            fixture.detectChanges();
            var panel = (overlayContainerElement.querySelector('.mat-autocomplete-panel'));
            var inputRect = inputReference.getBoundingClientRect();
            var panelRect = panel.getBoundingClientRect();
            expect(Math.floor(panelRect.top))
                .toBe(Math.floor(inputRect.bottom), "Expected panel top to be below input before repositioning.");
            for (var i = 0; i < 20; i++) {
                fixture.componentInstance.filteredStates.push({ code: 'FK', name: 'Fake State' });
                fixture.detectChanges();
            }
            // Request a position update now that there are too many suggestions to fit in the viewport.
            fixture.componentInstance.trigger.updatePosition();
            inputRect = inputReference.getBoundingClientRect();
            panelRect = panel.getBoundingClientRect();
            expect(Math.floor(panelRect.bottom))
                .toBe(Math.floor(inputRect.top), "Expected panel to fall back to above position after repositioning.");
            testing_2.tick();
        }));
        it('should not throw if a panel reposition is requested while the panel is closed', function () {
            var fixture = createComponent(SimpleAutocomplete);
            fixture.detectChanges();
            expect(function () { return fixture.componentInstance.trigger.updatePosition(); }).not.toThrow();
        });
    });
    describe('Option selection', function () {
        var fixture;
        beforeEach(function () {
            fixture = createComponent(SimpleAutocomplete);
            fixture.detectChanges();
        });
        it('should deselect any other selected option', testing_2.fakeAsync(function () {
            fixture.componentInstance.trigger.openPanel();
            fixture.detectChanges();
            var options = overlayContainerElement.querySelectorAll('mat-option');
            options[0].click();
            fixture.detectChanges();
            zone.simulateZoneExit();
            fixture.detectChanges();
            var componentOptions = fixture.componentInstance.options.toArray();
            expect(componentOptions[0].selected)
                .toBe(true, "Clicked option should be selected.");
            options = overlayContainerElement.querySelectorAll('mat-option');
            options[1].click();
            fixture.detectChanges();
            expect(componentOptions[0].selected)
                .toBe(false, "Previous option should not be selected.");
            expect(componentOptions[1].selected)
                .toBe(true, "New Clicked option should be selected.");
        }));
        it('should call deselect only on the previous selected option', testing_2.fakeAsync(function () {
            fixture.componentInstance.trigger.openPanel();
            fixture.detectChanges();
            var options = overlayContainerElement.querySelectorAll('mat-option');
            options[0].click();
            fixture.detectChanges();
            zone.simulateZoneExit();
            fixture.detectChanges();
            var componentOptions = fixture.componentInstance.options.toArray();
            componentOptions.forEach(function (option) { return spyOn(option, 'deselect'); });
            expect(componentOptions[0].selected)
                .toBe(true, "Clicked option should be selected.");
            options = overlayContainerElement.querySelectorAll('mat-option');
            options[1].click();
            fixture.detectChanges();
            expect(componentOptions[0].deselect).toHaveBeenCalled();
            componentOptions.slice(1).forEach(function (option) { return expect(option.deselect).not.toHaveBeenCalled(); });
        }));
        it('should be able to preselect the first option', testing_2.fakeAsync(function () {
            fixture.componentInstance.trigger.autocomplete.autoActiveFirstOption = true;
            fixture.componentInstance.trigger.openPanel();
            fixture.detectChanges();
            zone.simulateZoneExit();
            fixture.detectChanges();
            expect(overlayContainerElement.querySelectorAll('mat-option')[0].classList)
                .toContain('mat-active', 'Expected first option to be highlighted.');
        }));
        it('should be able to configure preselecting the first option globally', testing_2.fakeAsync(function () {
            overlayContainer.ngOnDestroy();
            fixture.destroy();
            testing_2.TestBed.resetTestingModule();
            fixture = createComponent(SimpleAutocomplete, [
                { provide: index_2.MAT_AUTOCOMPLETE_DEFAULT_OPTIONS, useValue: { autoActiveFirstOption: true } }
            ]);
            fixture.detectChanges();
            fixture.componentInstance.trigger.openPanel();
            fixture.detectChanges();
            zone.simulateZoneExit();
            fixture.detectChanges();
            expect(overlayContainerElement.querySelectorAll('mat-option')[0].classList)
                .toContain('mat-active', 'Expected first option to be highlighted.');
        }));
        it('should handle `optionSelections` being accessed too early', testing_2.fakeAsync(function () {
            overlayContainer.ngOnDestroy();
            fixture.destroy();
            fixture = testing_2.TestBed.createComponent(SimpleAutocomplete);
            var spy = jasmine.createSpy('option selection spy');
            var subscription;
            expect(fixture.componentInstance.trigger.autocomplete).toBeFalsy();
            expect(function () {
                subscription = fixture.componentInstance.trigger.optionSelections.subscribe(spy);
            }).not.toThrow();
            fixture.detectChanges();
            fixture.componentInstance.trigger.openPanel();
            fixture.detectChanges();
            zone.simulateZoneExit();
            var option = overlayContainerElement.querySelector('mat-option');
            option.click();
            fixture.detectChanges();
            zone.simulateZoneExit();
            expect(spy).toHaveBeenCalledWith(jasmine.any(core_2.MatOptionSelectionChange));
            subscription.unsubscribe();
        }));
        it('should reposition the panel when the amount of options changes', testing_2.fakeAsync(function () {
            var formField = fixture.debugElement.query(platform_browser_1.By.css('.mat-form-field')).nativeElement;
            var inputReference = formField.querySelector('.mat-form-field-flex');
            var input = inputReference.querySelector('input');
            formField.style.bottom = '100px';
            formField.style.position = 'fixed';
            testing_1.typeInElement('Cali', input);
            fixture.detectChanges();
            testing_2.tick();
            zone.simulateZoneExit();
            fixture.detectChanges();
            var inputBottom = inputReference.getBoundingClientRect().bottom;
            var panel = (overlayContainerElement.querySelector('.mat-autocomplete-panel'));
            var panelTop = panel.getBoundingClientRect().top;
            expect(Math.floor(inputBottom)).toBe(Math.floor(panelTop), "Expected panel top to match input bottom when there is only one option.");
            testing_1.typeInElement('', input);
            fixture.detectChanges();
            testing_2.tick();
            fixture.detectChanges();
            var inputTop = inputReference.getBoundingClientRect().top;
            var panelBottom = panel.getBoundingClientRect().bottom;
            expect(Math.floor(inputTop)).toBe(Math.floor(panelBottom), "Expected panel switch to the above position if the options no longer fit.");
        }));
    });
    describe('panel closing', function () {
        var fixture;
        var input;
        var trigger;
        var closingActionSpy;
        var closingActionsSub;
        beforeEach(testing_2.fakeAsync(function () {
            fixture = createComponent(SimpleAutocomplete);
            fixture.detectChanges();
            input = fixture.debugElement.query(platform_browser_1.By.css('input')).nativeElement;
            fixture.componentInstance.trigger.openPanel();
            fixture.detectChanges();
            testing_2.flush();
            trigger = fixture.componentInstance.trigger;
            closingActionSpy = jasmine.createSpy('closing action listener');
            closingActionsSub = trigger.panelClosingActions.subscribe(closingActionSpy);
        }));
        afterEach(function () {
            closingActionsSub.unsubscribe();
        });
        it('should emit panel close event when clicking away', function () {
            expect(closingActionSpy).not.toHaveBeenCalled();
            testing_1.dispatchFakeEvent(document, 'click');
            expect(closingActionSpy).toHaveBeenCalledWith(null);
        });
        it('should emit panel close event when tabbing out', function () {
            var tabEvent = testing_1.createKeyboardEvent('keydown', keycodes_1.TAB);
            input.focus();
            expect(closingActionSpy).not.toHaveBeenCalled();
            trigger._handleKeydown(tabEvent);
            expect(closingActionSpy).toHaveBeenCalledWith(null);
        });
        it('should not emit when tabbing away from a closed panel', function () {
            var tabEvent = testing_1.createKeyboardEvent('keydown', keycodes_1.TAB);
            input.focus();
            zone.simulateZoneExit();
            trigger._handleKeydown(tabEvent);
            // Ensure that it emitted once while the panel was open.
            expect(closingActionSpy).toHaveBeenCalledTimes(1);
            trigger._handleKeydown(tabEvent);
            // Ensure that it didn't emit again when tabbing out again.
            expect(closingActionSpy).toHaveBeenCalledTimes(1);
        });
        it('should emit panel close event when selecting an option', function () {
            var option = overlayContainerElement.querySelector('mat-option');
            expect(closingActionSpy).not.toHaveBeenCalled();
            option.click();
            expect(closingActionSpy).toHaveBeenCalledWith(jasmine.any(core_2.MatOptionSelectionChange));
        });
        it('should close the panel when pressing escape', function () {
            var escapeEvent = testing_1.createKeyboardEvent('keydown', keycodes_1.ESCAPE);
            expect(closingActionSpy).not.toHaveBeenCalled();
            trigger._handleKeydown(escapeEvent);
            expect(closingActionSpy).toHaveBeenCalledWith(null);
        });
    });
    describe('without matInput', function () {
        var fixture;
        beforeEach(function () {
            fixture = createComponent(AutocompleteWithNativeInput);
            fixture.detectChanges();
        });
        it('should not throw when clicking outside', testing_2.fakeAsync(function () {
            testing_1.dispatchFakeEvent(fixture.debugElement.query(platform_browser_1.By.css('input')).nativeElement, 'focus');
            fixture.detectChanges();
            testing_2.flush();
            expect(function () { return testing_1.dispatchFakeEvent(document, 'click'); }).not.toThrow();
        }));
    });
    describe('misc', function () {
        it('should allow basic use without any forms directives', function () {
            expect(function () {
                var fixture = createComponent(AutocompleteWithoutForms);
                fixture.detectChanges();
                var input = fixture.debugElement.query(platform_browser_1.By.css('input')).nativeElement;
                testing_1.typeInElement('d', input);
                fixture.detectChanges();
                var options = overlayContainerElement.querySelectorAll('mat-option');
                expect(options.length).toBe(1);
            }).not.toThrowError();
        });
        it('should display an empty input when the value is undefined with ngModel', function () {
            var fixture = createComponent(AutocompleteWithNgModel);
            fixture.detectChanges();
            expect(fixture.debugElement.query(platform_browser_1.By.css('input')).nativeElement.value).toBe('');
        });
        it('should display the number when the selected option is the number zero', testing_2.fakeAsync(function () {
            var fixture = createComponent(AutocompleteWithNumbers);
            fixture.componentInstance.selectedNumber = 0;
            fixture.detectChanges();
            testing_2.tick();
            expect(fixture.debugElement.query(platform_browser_1.By.css('input')).nativeElement.value).toBe('0');
        }));
        it('should work when input is wrapped in ngIf', function () {
            var fixture = createComponent(NgIfAutocomplete);
            fixture.detectChanges();
            testing_1.dispatchFakeEvent(fixture.debugElement.query(platform_browser_1.By.css('input')).nativeElement, 'focusin');
            fixture.detectChanges();
            expect(fixture.componentInstance.trigger.panelOpen)
                .toBe(true, "Expected panel state to read open when input is focused.");
            expect(overlayContainerElement.textContent)
                .toContain('One', "Expected panel to display when input is focused.");
            expect(overlayContainerElement.textContent)
                .toContain('Two', "Expected panel to display when input is focused.");
        });
        it('should filter properly with ngIf after setting the active item', function () {
            var fixture = createComponent(NgIfAutocomplete);
            fixture.detectChanges();
            fixture.componentInstance.trigger.openPanel();
            fixture.detectChanges();
            var DOWN_ARROW_EVENT = testing_1.createKeyboardEvent('keydown', keycodes_1.DOWN_ARROW);
            fixture.componentInstance.trigger._handleKeydown(DOWN_ARROW_EVENT);
            fixture.detectChanges();
            var input = fixture.debugElement.query(platform_browser_1.By.css('input')).nativeElement;
            testing_1.typeInElement('o', input);
            fixture.detectChanges();
            expect(fixture.componentInstance.matOptions.length).toBe(2);
        });
        it('should throw if the user attempts to open the panel too early', function () {
            var fixture = createComponent(AutocompleteWithoutPanel);
            fixture.detectChanges();
            expect(function () {
                fixture.componentInstance.trigger.openPanel();
            }).toThrow(index_2.getMatAutocompleteMissingPanelError());
        });
        it('should not throw on init, even if the panel is not defined', testing_2.fakeAsync(function () {
            expect(function () {
                var fixture = createComponent(AutocompleteWithoutPanel);
                fixture.componentInstance.control.setValue('Something');
                fixture.detectChanges();
                testing_2.tick();
            }).not.toThrow();
        }));
        it('should hide the label with a preselected form control value ' +
            'and a disabled floating label', testing_2.fakeAsync(function () {
            var fixture = createComponent(AutocompleteWithFormsAndNonfloatingLabel);
            fixture.detectChanges();
            testing_2.tick();
            fixture.detectChanges();
            var input = fixture.nativeElement.querySelector('input');
            var label = fixture.nativeElement.querySelector('.mat-form-field-label');
            expect(input.value).toBe('California');
            expect(label.classList).not.toContain('mat-form-field-empty');
        }));
        it('should transfer the mat-autocomplete classes to the panel element', testing_2.fakeAsync(function () {
            var fixture = createComponent(SimpleAutocomplete);
            fixture.detectChanges();
            fixture.componentInstance.trigger.openPanel();
            testing_2.tick();
            fixture.detectChanges();
            var autocomplete = fixture.debugElement.nativeElement.querySelector('mat-autocomplete');
            var panel = (overlayContainerElement.querySelector('.mat-autocomplete-panel'));
            expect(autocomplete.classList).not.toContain('class-one');
            expect(autocomplete.classList).not.toContain('class-two');
            expect(panel.classList).toContain('class-one');
            expect(panel.classList).toContain('class-two');
        }));
        it('should reset correctly when closed programmatically', testing_2.fakeAsync(function () {
            var scrolledSubject = new rxjs_1.Subject();
            var fixture = createComponent(SimpleAutocomplete, [
                {
                    provide: scrolling_1.ScrollDispatcher,
                    useValue: { scrolled: function () { return scrolledSubject.asObservable(); } }
                },
                {
                    provide: index_2.MAT_AUTOCOMPLETE_SCROLL_STRATEGY,
                    useFactory: function (overlay) { return function () { return overlay.scrollStrategies.close(); }; },
                    deps: [overlay_1.Overlay]
                }
            ]);
            fixture.detectChanges();
            var trigger = fixture.componentInstance.trigger;
            trigger.openPanel();
            fixture.detectChanges();
            zone.simulateZoneExit();
            expect(trigger.panelOpen).toBe(true, 'Expected panel to be open.');
            scrolledSubject.next();
            fixture.detectChanges();
            expect(trigger.panelOpen).toBe(false, 'Expected panel to be closed.');
        }));
        it('should handle autocomplete being attached to number inputs', testing_2.fakeAsync(function () {
            var fixture = createComponent(AutocompleteWithNumberInputAndNgModel);
            fixture.detectChanges();
            var input = fixture.debugElement.query(platform_browser_1.By.css('input')).nativeElement;
            testing_1.typeInElement('1337', input);
            fixture.detectChanges();
            expect(fixture.componentInstance.selectedValue).toBe(1337);
        }));
    });
    it('should have correct width when opened', function () {
        var widthFixture = createComponent(SimpleAutocomplete);
        widthFixture.componentInstance.width = 300;
        widthFixture.detectChanges();
        widthFixture.componentInstance.trigger.openPanel();
        widthFixture.detectChanges();
        var overlayPane = overlayContainerElement.querySelector('.cdk-overlay-pane');
        // Firefox, edge return a decimal value for width, so we need to parse and round it to verify
        expect(Math.ceil(parseFloat(overlayPane.style.width))).toBe(300);
        widthFixture.componentInstance.trigger.closePanel();
        widthFixture.detectChanges();
        widthFixture.componentInstance.width = 500;
        widthFixture.detectChanges();
        widthFixture.componentInstance.trigger.openPanel();
        widthFixture.detectChanges();
        // Firefox, edge return a decimal value for width, so we need to parse and round it to verify
        expect(Math.ceil(parseFloat(overlayPane.style.width))).toBe(500);
    });
    it('should update the width while the panel is open', function () {
        var widthFixture = createComponent(SimpleAutocomplete);
        widthFixture.componentInstance.width = 300;
        widthFixture.detectChanges();
        widthFixture.componentInstance.trigger.openPanel();
        widthFixture.detectChanges();
        var overlayPane = overlayContainerElement.querySelector('.cdk-overlay-pane');
        var input = widthFixture.debugElement.query(platform_browser_1.By.css('input')).nativeElement;
        expect(Math.ceil(parseFloat(overlayPane.style.width))).toBe(300);
        widthFixture.componentInstance.width = 500;
        widthFixture.detectChanges();
        input.focus();
        testing_1.dispatchFakeEvent(input, 'input');
        widthFixture.detectChanges();
        expect(Math.ceil(parseFloat(overlayPane.style.width))).toBe(500);
    });
    it('should update the panel width if the window is resized', testing_2.fakeAsync(function () {
        var widthFixture = createComponent(SimpleAutocomplete);
        widthFixture.componentInstance.width = 300;
        widthFixture.detectChanges();
        widthFixture.componentInstance.trigger.openPanel();
        widthFixture.detectChanges();
        var overlayPane = overlayContainerElement.querySelector('.cdk-overlay-pane');
        expect(Math.ceil(parseFloat(overlayPane.style.width))).toBe(300);
        widthFixture.componentInstance.width = 400;
        widthFixture.detectChanges();
        testing_1.dispatchFakeEvent(window, 'resize');
        testing_2.tick(20);
        expect(Math.ceil(parseFloat(overlayPane.style.width))).toBe(400);
    }));
    it('should have panel width match host width by default', function () {
        var widthFixture = createComponent(SimpleAutocomplete);
        widthFixture.componentInstance.width = 300;
        widthFixture.detectChanges();
        widthFixture.componentInstance.trigger.openPanel();
        widthFixture.detectChanges();
        var overlayPane = overlayContainerElement.querySelector('.cdk-overlay-pane');
        expect(Math.ceil(parseFloat(overlayPane.style.width))).toBe(300);
    });
    it('should have panel width set to string value', function () {
        var widthFixture = createComponent(SimpleAutocomplete);
        widthFixture.componentInstance.width = 300;
        widthFixture.detectChanges();
        widthFixture.componentInstance.trigger.autocomplete.panelWidth = 'auto';
        widthFixture.componentInstance.trigger.openPanel();
        widthFixture.detectChanges();
        var overlayPane = overlayContainerElement.querySelector('.cdk-overlay-pane');
        expect(overlayPane.style.width).toBe('auto');
    });
    it('should have panel width set to number value', function () {
        var widthFixture = createComponent(SimpleAutocomplete);
        widthFixture.componentInstance.width = 300;
        widthFixture.detectChanges();
        widthFixture.componentInstance.trigger.autocomplete.panelWidth = 400;
        widthFixture.componentInstance.trigger.openPanel();
        widthFixture.detectChanges();
        var overlayPane = overlayContainerElement.querySelector('.cdk-overlay-pane');
        expect(Math.ceil(parseFloat(overlayPane.style.width))).toBe(400);
    });
    it('should show the panel when the options are initialized later within a component with ' +
        'OnPush change detection', testing_2.fakeAsync(function () {
        var fixture = createComponent(AutocompleteWithOnPushDelay);
        fixture.detectChanges();
        testing_1.dispatchFakeEvent(fixture.debugElement.query(platform_browser_1.By.css('input')).nativeElement, 'focusin');
        testing_2.tick(1000);
        fixture.detectChanges();
        testing_2.tick();
        Promise.resolve().then(function () {
            var panel = overlayContainerElement.querySelector('.mat-autocomplete-panel');
            var visibleClass = 'mat-autocomplete-visible';
            fixture.detectChanges();
            expect(panel.classList).toContain(visibleClass, "Expected panel to be visible.");
        });
    }));
    it('should emit an event when an option is selected', testing_2.fakeAsync(function () {
        var fixture = createComponent(AutocompleteWithSelectEvent);
        fixture.detectChanges();
        fixture.componentInstance.trigger.openPanel();
        zone.simulateZoneExit();
        fixture.detectChanges();
        var options = overlayContainerElement.querySelectorAll('mat-option');
        var spy = fixture.componentInstance.optionSelected;
        options[1].click();
        testing_2.tick();
        fixture.detectChanges();
        expect(spy).toHaveBeenCalledTimes(1);
        var event = spy.calls.mostRecent().args[0];
        expect(event.source).toBe(fixture.componentInstance.autocomplete);
        expect(event.option.value).toBe('Washington');
    }));
    it('should emit an event when a newly-added option is selected', testing_2.fakeAsync(function () {
        var fixture = createComponent(AutocompleteWithSelectEvent);
        fixture.detectChanges();
        fixture.componentInstance.trigger.openPanel();
        testing_2.tick();
        fixture.detectChanges();
        fixture.componentInstance.states.push('Puerto Rico');
        fixture.detectChanges();
        testing_2.tick();
        fixture.detectChanges();
        var options = overlayContainerElement.querySelectorAll('mat-option');
        var spy = fixture.componentInstance.optionSelected;
        options[3].click();
        testing_2.tick();
        fixture.detectChanges();
        expect(spy).toHaveBeenCalledTimes(1);
        var event = spy.calls.mostRecent().args[0];
        expect(event.source).toBe(fixture.componentInstance.autocomplete);
        expect(event.option.value).toBe('Puerto Rico');
    }));
    it('should be able to set a custom panel connection element', function () {
        var fixture = createComponent(AutocompleteWithDifferentOrigin);
        fixture.detectChanges();
        fixture.componentInstance.trigger.openPanel();
        fixture.detectChanges();
        zone.simulateZoneExit();
        var overlayRect = overlayContainerElement.querySelector('.cdk-overlay-pane').getBoundingClientRect();
        var originRect = fixture.nativeElement.querySelector('.origin').getBoundingClientRect();
        expect(Math.floor(overlayRect.top)).toBe(Math.floor(originRect.bottom), 'Expected autocomplete panel to align with the bottom of the new origin.');
    });
});
var SimpleAutocomplete = /** @class */ (function () {
    function SimpleAutocomplete() {
        var _this = this;
        this.stateCtrl = new forms_1.FormControl();
        this.floatLabel = 'auto';
        this.disableRipple = false;
        this.autocompleteDisabled = false;
        this.openedSpy = jasmine.createSpy('autocomplete opened spy');
        this.closedSpy = jasmine.createSpy('autocomplete closed spy');
        this.states = [
            { code: 'AL', name: 'Alabama' },
            { code: 'CA', name: 'California' },
            { code: 'FL', name: 'Florida' },
            { code: 'KS', name: 'Kansas' },
            { code: 'MA', name: 'Massachusetts' },
            { code: 'NY', name: 'New York' },
            { code: 'OR', name: 'Oregon' },
            { code: 'PA', name: 'Pennsylvania' },
            { code: 'TN', name: 'Tennessee' },
            { code: 'VA', name: 'Virginia' },
            { code: 'WY', name: 'Wyoming' },
        ];
        this.filteredStates = this.states;
        this.valueSub = this.stateCtrl.valueChanges.subscribe(function (val) {
            _this.filteredStates = val ? _this.states.filter(function (s) { return s.name.match(new RegExp(val, 'gi')); })
                : _this.states;
        });
    }
    SimpleAutocomplete.prototype.displayFn = function (value) {
        return value ? value.name : value;
    };
    SimpleAutocomplete.prototype.ngOnDestroy = function () {
        this.valueSub.unsubscribe();
    };
    SimpleAutocomplete.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <mat-form-field [floatLabel]=\"floatLabel\" [style.width.px]=\"width\">\n      <input\n        matInput\n        placeholder=\"State\"\n        [matAutocomplete]=\"auto\"\n        [matAutocompleteDisabled]=\"autocompleteDisabled\"\n        [formControl]=\"stateCtrl\">\n    </mat-form-field>\n\n    <mat-autocomplete class=\"class-one class-two\" #auto=\"matAutocomplete\" [displayWith]=\"displayFn\"\n      [disableRipple]=\"disableRipple\" (opened)=\"openedSpy()\" (closed)=\"closedSpy()\">\n      <mat-option *ngFor=\"let state of filteredStates\" [value]=\"state\">\n        <span>{{ state.code }}: {{ state.name }}</span>\n      </mat-option>\n    </mat-autocomplete>\n  "
                },] },
    ];
    /** @nocollapse */
    SimpleAutocomplete.ctorParameters = function () { return []; };
    SimpleAutocomplete.propDecorators = {
        "trigger": [{ type: core_1.ViewChild, args: [index_2.MatAutocompleteTrigger,] },],
        "panel": [{ type: core_1.ViewChild, args: [index_2.MatAutocomplete,] },],
        "formField": [{ type: core_1.ViewChild, args: [form_field_1.MatFormField,] },],
        "options": [{ type: core_1.ViewChildren, args: [core_2.MatOption,] },],
    };
    return SimpleAutocomplete;
}());
var NgIfAutocomplete = /** @class */ (function () {
    function NgIfAutocomplete() {
        var _this = this;
        this.optionCtrl = new forms_1.FormControl();
        this.isVisible = true;
        this.options = ['One', 'Two', 'Three'];
        this.filteredOptions = this.optionCtrl.valueChanges.pipe(operators_1.startWith(null), operators_1.map(function (val) {
            return val ? _this.options.filter(function (option) { return new RegExp(val, 'gi').test(option); })
                : _this.options.slice();
        }));
    }
    NgIfAutocomplete.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <mat-form-field *ngIf=\"isVisible\">\n      <input matInput placeholder=\"Choose\" [matAutocomplete]=\"auto\" [formControl]=\"optionCtrl\">\n    </mat-form-field>\n\n    <mat-autocomplete #auto=\"matAutocomplete\">\n      <mat-option *ngFor=\"let option of filteredOptions | async\" [value]=\"option\">\n         {{option}}\n      </mat-option>\n    </mat-autocomplete>\n  "
                },] },
    ];
    /** @nocollapse */
    NgIfAutocomplete.ctorParameters = function () { return []; };
    NgIfAutocomplete.propDecorators = {
        "trigger": [{ type: core_1.ViewChild, args: [index_2.MatAutocompleteTrigger,] },],
        "matOptions": [{ type: core_1.ViewChildren, args: [core_2.MatOption,] },],
    };
    return NgIfAutocomplete;
}());
var AutocompleteWithoutForms = /** @class */ (function () {
    function AutocompleteWithoutForms() {
        this.states = ['Alabama', 'California', 'Florida'];
        this.filteredStates = this.states.slice();
    }
    AutocompleteWithoutForms.prototype.onInput = function (value) {
        this.filteredStates = this.states.filter(function (s) { return new RegExp(value, 'gi').test(s); });
    };
    AutocompleteWithoutForms.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <mat-form-field>\n      <input matInput placeholder=\"State\" [matAutocomplete]=\"auto\"\n      (input)=\"onInput($event.target?.value)\">\n    </mat-form-field>\n\n    <mat-autocomplete #auto=\"matAutocomplete\">\n      <mat-option *ngFor=\"let state of filteredStates\" [value]=\"state\">\n        <span> {{ state }}  </span>\n      </mat-option>\n    </mat-autocomplete>\n  "
                },] },
    ];
    /** @nocollapse */
    AutocompleteWithoutForms.ctorParameters = function () { return []; };
    return AutocompleteWithoutForms;
}());
var AutocompleteWithNgModel = /** @class */ (function () {
    function AutocompleteWithNgModel() {
        this.states = ['New York', 'Washington', 'Oregon'];
        this.filteredStates = this.states.slice();
    }
    AutocompleteWithNgModel.prototype.onInput = function (value) {
        this.filteredStates = this.states.filter(function (s) { return new RegExp(value, 'gi').test(s); });
    };
    AutocompleteWithNgModel.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <mat-form-field>\n      <input matInput placeholder=\"State\" [matAutocomplete]=\"auto\" [(ngModel)]=\"selectedState\"\n      (ngModelChange)=\"onInput($event)\">\n    </mat-form-field>\n\n    <mat-autocomplete #auto=\"matAutocomplete\">\n      <mat-option *ngFor=\"let state of filteredStates\" [value]=\"state\">\n        <span>{{ state }}</span>\n      </mat-option>\n    </mat-autocomplete>\n  "
                },] },
    ];
    /** @nocollapse */
    AutocompleteWithNgModel.ctorParameters = function () { return []; };
    return AutocompleteWithNgModel;
}());
var AutocompleteWithNumbers = /** @class */ (function () {
    function AutocompleteWithNumbers() {
        this.numbers = [0, 1, 2];
    }
    AutocompleteWithNumbers.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <mat-form-field>\n      <input matInput placeholder=\"Number\" [matAutocomplete]=\"auto\" [(ngModel)]=\"selectedNumber\">\n    </mat-form-field>\n\n    <mat-autocomplete #auto=\"matAutocomplete\">\n      <mat-option *ngFor=\"let number of numbers\" [value]=\"number\">\n        <span>{{ number }}</span>\n      </mat-option>\n    </mat-autocomplete>\n  "
                },] },
    ];
    return AutocompleteWithNumbers;
}());
var AutocompleteWithOnPushDelay = /** @class */ (function () {
    function AutocompleteWithOnPushDelay() {
    }
    AutocompleteWithOnPushDelay.prototype.ngOnInit = function () {
        var _this = this;
        setTimeout(function () {
            _this.options = ['One'];
        }, 1000);
    };
    AutocompleteWithOnPushDelay.decorators = [
        { type: core_1.Component, args: [{
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    template: "\n    <mat-form-field>\n      <input type=\"text\" matInput [matAutocomplete]=\"auto\">\n    </mat-form-field>\n\n    <mat-autocomplete #auto=\"matAutocomplete\">\n      <mat-option *ngFor=\"let option of options\" [value]=\"option\">{{ option }}</mat-option>\n    </mat-autocomplete>\n  "
                },] },
    ];
    /** @nocollapse */
    AutocompleteWithOnPushDelay.propDecorators = {
        "trigger": [{ type: core_1.ViewChild, args: [index_2.MatAutocompleteTrigger,] },],
    };
    return AutocompleteWithOnPushDelay;
}());
var AutocompleteWithNativeInput = /** @class */ (function () {
    function AutocompleteWithNativeInput() {
        var _this = this;
        this.optionCtrl = new forms_1.FormControl();
        this.options = ['En', 'To', 'Tre', 'Fire', 'Fem'];
        this.filteredOptions = this.optionCtrl.valueChanges.pipe(operators_1.startWith(null), operators_1.map(function (val) {
            return val ? _this.options.filter(function (option) { return new RegExp(val, 'gi').test(option); })
                : _this.options.slice();
        }));
    }
    AutocompleteWithNativeInput.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <input placeholder=\"Choose\" [matAutocomplete]=\"auto\" [formControl]=\"optionCtrl\">\n\n    <mat-autocomplete #auto=\"matAutocomplete\">\n      <mat-option *ngFor=\"let option of filteredOptions | async\" [value]=\"option\">\n         {{option}}\n      </mat-option>\n    </mat-autocomplete>\n  "
                },] },
    ];
    /** @nocollapse */
    AutocompleteWithNativeInput.ctorParameters = function () { return []; };
    AutocompleteWithNativeInput.propDecorators = {
        "trigger": [{ type: core_1.ViewChild, args: [index_2.MatAutocompleteTrigger,] },],
        "matOptions": [{ type: core_1.ViewChildren, args: [core_2.MatOption,] },],
    };
    return AutocompleteWithNativeInput;
}());
var AutocompleteWithoutPanel = /** @class */ (function () {
    function AutocompleteWithoutPanel() {
        this.control = new forms_1.FormControl();
    }
    AutocompleteWithoutPanel.decorators = [
        { type: core_1.Component, args: [{
                    template: "<input placeholder=\"Choose\" [matAutocomplete]=\"auto\" [formControl]=\"control\">"
                },] },
    ];
    /** @nocollapse */
    AutocompleteWithoutPanel.propDecorators = {
        "trigger": [{ type: core_1.ViewChild, args: [index_2.MatAutocompleteTrigger,] },],
    };
    return AutocompleteWithoutPanel;
}());
var AutocompleteWithFormsAndNonfloatingLabel = /** @class */ (function () {
    function AutocompleteWithFormsAndNonfloatingLabel() {
        this.formControl = new forms_1.FormControl('California');
    }
    AutocompleteWithFormsAndNonfloatingLabel.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <mat-form-field floatLabel=\"never\">\n      <input placeholder=\"State\" matInput [matAutocomplete]=\"auto\" [formControl]=\"formControl\">\n    </mat-form-field>\n\n    <mat-autocomplete #auto=\"matAutocomplete\">\n      <mat-option value=\"California\">California</mat-option>\n    </mat-autocomplete>\n  "
                },] },
    ];
    return AutocompleteWithFormsAndNonfloatingLabel;
}());
var AutocompleteWithGroups = /** @class */ (function () {
    function AutocompleteWithGroups() {
        this.stateGroups = [
            {
                title: 'One',
                states: ['Alabama', 'California', 'Florida', 'Oregon']
            },
            {
                title: 'Two',
                states: ['Kansas', 'Massachusetts', 'New York', 'Pennsylvania']
            },
            {
                title: 'Three',
                states: ['Tennessee', 'Virginia', 'Wyoming', 'Alaska']
            }
        ];
    }
    AutocompleteWithGroups.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <mat-form-field>\n      <input matInput placeholder=\"State\" [matAutocomplete]=\"auto\" [(ngModel)]=\"selectedState\">\n    </mat-form-field>\n\n    <mat-autocomplete #auto=\"matAutocomplete\">\n      <mat-optgroup *ngFor=\"let group of stateGroups\" [label]=\"group.label\">\n        <mat-option *ngFor=\"let state of group.states\" [value]=\"state\">\n          <span>{{ state }}</span>\n        </mat-option>\n      </mat-optgroup>\n    </mat-autocomplete>\n  "
                },] },
    ];
    /** @nocollapse */
    AutocompleteWithGroups.propDecorators = {
        "trigger": [{ type: core_1.ViewChild, args: [index_2.MatAutocompleteTrigger,] },],
    };
    return AutocompleteWithGroups;
}());
var AutocompleteWithSelectEvent = /** @class */ (function () {
    function AutocompleteWithSelectEvent() {
        this.states = ['New York', 'Washington', 'Oregon'];
        this.optionSelected = jasmine.createSpy('optionSelected callback');
    }
    AutocompleteWithSelectEvent.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <mat-form-field>\n      <input matInput placeholder=\"State\" [matAutocomplete]=\"auto\" [(ngModel)]=\"selectedState\">\n    </mat-form-field>\n\n    <mat-autocomplete #auto=\"matAutocomplete\" (optionSelected)=\"optionSelected($event)\">\n      <mat-option *ngFor=\"let state of states\" [value]=\"state\">\n        <span>{{ state }}</span>\n      </mat-option>\n    </mat-autocomplete>\n  "
                },] },
    ];
    /** @nocollapse */
    AutocompleteWithSelectEvent.propDecorators = {
        "trigger": [{ type: core_1.ViewChild, args: [index_2.MatAutocompleteTrigger,] },],
        "autocomplete": [{ type: core_1.ViewChild, args: [index_2.MatAutocomplete,] },],
    };
    return AutocompleteWithSelectEvent;
}());
var PlainAutocompleteInputWithFormControl = /** @class */ (function () {
    function PlainAutocompleteInputWithFormControl() {
        this.formControl = new forms_1.FormControl();
    }
    PlainAutocompleteInputWithFormControl.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <input [formControl]=\"formControl\" [matAutocomplete]=\"auto\"/>\n    <mat-autocomplete #auto=\"matAutocomplete\"></mat-autocomplete>\n  "
                },] },
    ];
    return PlainAutocompleteInputWithFormControl;
}());
var AutocompleteWithNumberInputAndNgModel = /** @class */ (function () {
    function AutocompleteWithNumberInputAndNgModel() {
        this.values = [1, 2, 3];
    }
    AutocompleteWithNumberInputAndNgModel.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <mat-form-field>\n      <input type=\"number\" matInput [matAutocomplete]=\"auto\" [(ngModel)]=\"selectedValue\">\n    </mat-form-field>\n\n    <mat-autocomplete #auto=\"matAutocomplete\">\n      <mat-option *ngFor=\"let value of values\" [value]=\"value\">{{value}}</mat-option>\n    </mat-autocomplete>\n  "
                },] },
    ];
    return AutocompleteWithNumberInputAndNgModel;
}());
var AutocompleteWithDifferentOrigin = /** @class */ (function () {
    function AutocompleteWithDifferentOrigin() {
        this.values = ['one', 'two', 'three'];
    }
    AutocompleteWithDifferentOrigin.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <div>\n      <mat-form-field>\n        <input\n          matInput\n          [matAutocomplete]=\"auto\"\n          [matAutocompleteConnectedTo]=\"origin\"\n          [(ngModel)]=\"selectedValue\">\n      </mat-form-field>\n    </div>\n\n    <div\n      class=\"origin\"\n      matAutocompleteOrigin\n      #origin=\"matAutocompleteOrigin\"\n      style=\"margin-top: 50px\">\n      Connection element\n    </div>\n\n    <mat-autocomplete #auto=\"matAutocomplete\">\n      <mat-option *ngFor=\"let value of values\" [value]=\"value\">{{value}}</mat-option>\n    </mat-autocomplete>\n  "
                },] },
    ];
    /** @nocollapse */
    AutocompleteWithDifferentOrigin.propDecorators = {
        "trigger": [{ type: core_1.ViewChild, args: [index_2.MatAutocompleteTrigger,] },],
    };
    return AutocompleteWithDifferentOrigin;
}());
var AutocompleteWithNativeAutocompleteAttribute = /** @class */ (function () {
    function AutocompleteWithNativeAutocompleteAttribute() {
    }
    AutocompleteWithNativeAutocompleteAttribute.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <input autocomplete=\"changed\" [(ngModel)]=\"value\" [matAutocomplete]=\"auto\"/>\n    <mat-autocomplete #auto=\"matAutocomplete\"></mat-autocomplete>\n  "
                },] },
    ];
    return AutocompleteWithNativeAutocompleteAttribute;
}());
var InputWithoutAutocompleteAndDisabled = /** @class */ (function () {
    function InputWithoutAutocompleteAndDisabled() {
    }
    InputWithoutAutocompleteAndDisabled.decorators = [
        { type: core_1.Component, args: [{
                    template: '<input [matAutocomplete]="null" matAutocompleteDisabled>'
                },] },
    ];
    return InputWithoutAutocompleteAndDisabled;
}());
//# sourceMappingURL=autocomplete.spec.js.map