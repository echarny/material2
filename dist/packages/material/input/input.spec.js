"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var platform_1 = require("@angular/cdk/platform");
var testing_1 = require("@angular/cdk/testing");
var core_1 = require("@angular/core");
var testing_2 = require("@angular/core/testing");
var forms_1 = require("@angular/forms");
var core_2 = require("@angular/material/core");
var form_field_1 = require("@angular/material/form-field");
var platform_browser_1 = require("@angular/platform-browser");
var animations_1 = require("@angular/platform-browser/animations");
var index_1 = require("./index");
var input_1 = require("./input");
var stepper_1 = require("@angular/material/stepper");
var tabs_1 = require("@angular/material/tabs");
var autosize_1 = require("./autosize");
describe('MatInput without forms', function () {
    it('should default to floating labels', testing_2.fakeAsync(function () {
        var fixture = createComponent(MatInputWithId);
        fixture.detectChanges();
        var formField = fixture.debugElement.query(platform_browser_1.By.directive(form_field_1.MatFormField))
            .componentInstance;
        expect(formField.floatLabel).toBe('auto', 'Expected MatInput to set floatingLabel to auto by default.');
    }));
    it('should default to global floating label type', testing_2.fakeAsync(function () {
        var fixture = createComponent(MatInputWithId, [{
                provide: core_2.MAT_LABEL_GLOBAL_OPTIONS, useValue: { float: 'always' }
            }]);
        fixture.detectChanges();
        var formField = fixture.debugElement.query(platform_browser_1.By.directive(form_field_1.MatFormField))
            .componentInstance;
        expect(formField.floatLabel).toBe('always', 'Expected MatInput to set floatingLabel to always from global option.');
    }));
    it('should not be treated as empty if type is date', testing_2.fakeAsync(function () {
        var platform = new platform_1.Platform();
        if (!(platform.TRIDENT || (platform.SAFARI && !platform.IOS))) {
            var fixture = createComponent(MatInputDateTestController);
            fixture.detectChanges();
            var el = fixture.debugElement.query(platform_browser_1.By.css('label')).nativeElement;
            expect(el).not.toBeNull();
            expect(el.classList.contains('mat-form-field-empty')).toBe(false);
        }
    }));
    // Safari Desktop and IE don't support type="date" and fallback to type="text".
    it('should be treated as empty if type is date in Safari Desktop or IE', testing_2.fakeAsync(function () {
        var platform = new platform_1.Platform();
        if (platform.TRIDENT || (platform.SAFARI && !platform.IOS)) {
            var fixture = createComponent(MatInputDateTestController);
            fixture.detectChanges();
            var el = fixture.debugElement.query(platform_browser_1.By.css('label')).nativeElement;
            expect(el).not.toBeNull();
            expect(el.classList.contains('mat-form-field-empty')).toBe(true);
        }
    }));
    it('should treat text input type as empty at init', testing_2.fakeAsync(function () {
        var fixture = createComponent(MatInputTextTestController);
        fixture.detectChanges();
        var el = fixture.debugElement.query(platform_browser_1.By.css('label')).nativeElement;
        expect(el).not.toBeNull();
        expect(el.classList.contains('mat-form-field-empty')).toBe(true);
    }));
    it('should treat password input type as empty at init', testing_2.fakeAsync(function () {
        var fixture = createComponent(MatInputPasswordTestController);
        fixture.detectChanges();
        var el = fixture.debugElement.query(platform_browser_1.By.css('label')).nativeElement;
        expect(el).not.toBeNull();
        expect(el.classList.contains('mat-form-field-empty')).toBe(true);
    }));
    it('should treat number input type as empty at init', testing_2.fakeAsync(function () {
        var fixture = createComponent(MatInputNumberTestController);
        fixture.detectChanges();
        var el = fixture.debugElement.query(platform_browser_1.By.css('label')).nativeElement;
        expect(el).not.toBeNull();
        expect(el.classList.contains('mat-form-field-empty')).toBe(true);
    }));
    it('should not be empty after input entered', testing_2.fakeAsync(function () {
        var fixture = createComponent(MatInputTextTestController);
        fixture.detectChanges();
        var inputEl = fixture.debugElement.query(platform_browser_1.By.css('input'));
        var el = fixture.debugElement.query(platform_browser_1.By.css('label')).nativeElement;
        expect(el).not.toBeNull();
        expect(el.classList.contains('mat-form-field-empty')).toBe(true, 'should be empty');
        inputEl.nativeElement.value = 'hello';
        // Simulate input event.
        inputEl.triggerEventHandler('input', { target: inputEl.nativeElement });
        fixture.detectChanges();
        el = fixture.debugElement.query(platform_browser_1.By.css('label')).nativeElement;
        expect(el.classList.contains('mat-form-field-empty')).toBe(false, 'should not be empty');
    }));
    it('should update the placeholder when input entered', testing_2.fakeAsync(function () {
        var fixture = createComponent(MatInputWithStaticLabel);
        fixture.detectChanges();
        var inputEl = fixture.debugElement.query(platform_browser_1.By.css('input'));
        var labelEl = fixture.debugElement.query(platform_browser_1.By.css('label')).nativeElement;
        expect(labelEl.classList).toContain('mat-form-field-empty');
        expect(labelEl.classList).not.toContain('mat-form-field-float');
        // Update the value of the input.
        inputEl.nativeElement.value = 'Text';
        // Fake behavior of the `(input)` event which should trigger a change detection.
        fixture.detectChanges();
        expect(labelEl.classList).not.toContain('mat-form-field-empty');
        expect(labelEl.classList).not.toContain('mat-form-field-float');
    }));
    it('should not be empty when the value set before view init', testing_2.fakeAsync(function () {
        var fixture = createComponent(MatInputWithValueBinding);
        fixture.detectChanges();
        var labelEl = fixture.debugElement.query(platform_browser_1.By.css('.mat-form-field-label')).nativeElement;
        expect(labelEl.classList).not.toContain('mat-form-field-empty');
        fixture.componentInstance.value = '';
        fixture.detectChanges();
        expect(labelEl.classList).toContain('mat-form-field-empty');
    }));
    it('should add id', testing_2.fakeAsync(function () {
        var fixture = createComponent(MatInputTextTestController);
        fixture.detectChanges();
        var inputElement = fixture.debugElement.query(platform_browser_1.By.css('input')).nativeElement;
        var labelElement = fixture.debugElement.query(platform_browser_1.By.css('label')).nativeElement;
        expect(inputElement.id).toBeTruthy();
        expect(inputElement.id).toEqual((labelElement.getAttribute('for')));
    }));
    it('should add aria-owns to the label for the associated control', testing_2.fakeAsync(function () {
        var fixture = createComponent(MatInputTextTestController);
        fixture.detectChanges();
        var inputElement = fixture.debugElement.query(platform_browser_1.By.css('input')).nativeElement;
        var labelElement = fixture.debugElement.query(platform_browser_1.By.css('label')).nativeElement;
        expect(labelElement.getAttribute('aria-owns')).toBe(inputElement.id);
    }));
    it('should add aria-required reflecting the required state', testing_2.fakeAsync(function () {
        var fixture = createComponent(MatInputWithRequired);
        fixture.detectChanges();
        var inputElement = fixture.debugElement.query(platform_browser_1.By.css('input')).nativeElement;
        expect(inputElement.getAttribute('aria-required'))
            .toBe('false', 'Expected aria-required to reflect required state of false');
        fixture.componentInstance.required = true;
        fixture.detectChanges();
        expect(inputElement.getAttribute('aria-required'))
            .toBe('true', 'Expected aria-required to reflect required state of true');
    }));
    it('should not overwrite existing id', testing_2.fakeAsync(function () {
        var fixture = createComponent(MatInputWithId);
        fixture.detectChanges();
        var inputElement = fixture.debugElement.query(platform_browser_1.By.css('input')).nativeElement;
        var labelElement = fixture.debugElement.query(platform_browser_1.By.css('label')).nativeElement;
        expect(inputElement.id).toBe('test-id');
        expect(labelElement.getAttribute('for')).toBe('test-id');
    }));
    it('validates there\'s only one hint label per side', testing_2.fakeAsync(function () {
        var fixture = createComponent(MatInputInvalidHintTestController);
        expect(function () {
            try {
                fixture.detectChanges();
                testing_2.flush();
            }
            catch (_a) {
                testing_2.flush();
            }
        }).toThrowError(testing_1.wrappedErrorMessage(form_field_1.getMatFormFieldDuplicatedHintError('start')));
    }));
    it('validates there\'s only one hint label per side (attribute)', testing_2.fakeAsync(function () {
        var fixture = createComponent(MatInputInvalidHint2TestController);
        expect(function () {
            try {
                fixture.detectChanges();
                testing_2.flush();
            }
            catch (_a) {
                testing_2.flush();
            }
        }).toThrowError(testing_1.wrappedErrorMessage(form_field_1.getMatFormFieldDuplicatedHintError('start')));
    }));
    it('validates there\'s only one placeholder', testing_2.fakeAsync(function () {
        var fixture = createComponent(MatInputInvalidPlaceholderTestController);
        expect(function () {
            try {
                fixture.detectChanges();
                testing_2.flush();
            }
            catch (_a) {
                testing_2.flush();
            }
        }).toThrowError(testing_1.wrappedErrorMessage(form_field_1.getMatFormFieldPlaceholderConflictError()));
    }));
    it('validates that matInput child is present', testing_2.fakeAsync(function () {
        var fixture = createComponent(MatInputMissingMatInputTestController);
        expect(function () { return fixture.detectChanges(); }).toThrowError(testing_1.wrappedErrorMessage(form_field_1.getMatFormFieldMissingControlError()));
    }));
    it('validates that matInput child is present after initialization', testing_2.fakeAsync(function () {
        var fixture = createComponent(MatInputWithNgIf);
        expect(function () { return fixture.detectChanges(); }).not.toThrowError(testing_1.wrappedErrorMessage(form_field_1.getMatFormFieldMissingControlError()));
        fixture.componentInstance.renderInput = false;
        expect(function () { return fixture.detectChanges(); }).toThrowError(testing_1.wrappedErrorMessage(form_field_1.getMatFormFieldMissingControlError()));
    }));
    it('validates the type', testing_2.fakeAsync(function () {
        var fixture = createComponent(MatInputInvalidTypeTestController);
        // Technically this throws during the OnChanges detection phase,
        // so the error is really a ChangeDetectionError and it becomes
        // hard to build a full exception to compare with.
        // We just check for any exception in this case.
        expect(function () { return fixture.detectChanges(); }).toThrow();
    }));
    it('supports hint labels attribute', testing_2.fakeAsync(function () {
        var fixture = createComponent(MatInputHintLabelTestController);
        fixture.detectChanges();
        // If the hint label is empty, expect no label.
        expect(fixture.debugElement.query(platform_browser_1.By.css('.mat-hint'))).toBeNull();
        fixture.componentInstance.label = 'label';
        fixture.detectChanges();
        expect(fixture.debugElement.query(platform_browser_1.By.css('.mat-hint'))).not.toBeNull();
    }));
    it('sets an id on hint labels', testing_2.fakeAsync(function () {
        var fixture = createComponent(MatInputHintLabelTestController);
        fixture.componentInstance.label = 'label';
        fixture.detectChanges();
        var hint = fixture.debugElement.query(platform_browser_1.By.css('.mat-hint')).nativeElement;
        expect(hint.getAttribute('id')).toBeTruthy();
    }));
    it('supports hint labels elements', testing_2.fakeAsync(function () {
        var fixture = createComponent(MatInputHintLabel2TestController);
        fixture.detectChanges();
        // In this case, we should have an empty <mat-hint>.
        var el = fixture.debugElement.query(platform_browser_1.By.css('mat-hint')).nativeElement;
        expect(el.textContent).toBeFalsy();
        fixture.componentInstance.label = 'label';
        fixture.detectChanges();
        el = fixture.debugElement.query(platform_browser_1.By.css('mat-hint')).nativeElement;
        expect(el.textContent).toBe('label');
    }));
    it('sets an id on the hint element', testing_2.fakeAsync(function () {
        var fixture = createComponent(MatInputHintLabel2TestController);
        fixture.componentInstance.label = 'label';
        fixture.detectChanges();
        var hint = fixture.debugElement.query(platform_browser_1.By.css('mat-hint')).nativeElement;
        expect(hint.getAttribute('id')).toBeTruthy();
    }));
    it('supports placeholder attribute', testing_2.fakeAsync(function () {
        var fixture = createComponent(MatInputPlaceholderAttrTestComponent);
        fixture.detectChanges();
        var inputEl = fixture.debugElement.query(platform_browser_1.By.css('input')).nativeElement;
        expect(fixture.debugElement.query(platform_browser_1.By.css('label'))).toBeNull();
        expect(inputEl.placeholder).toBe('');
        fixture.componentInstance.placeholder = 'Other placeholder';
        fixture.detectChanges();
        var labelEl = fixture.debugElement.query(platform_browser_1.By.css('label'));
        expect(inputEl.placeholder).toBe('Other placeholder');
        expect(labelEl).not.toBeNull();
        expect(labelEl.nativeElement.textContent).toMatch('Other placeholder');
        expect(labelEl.nativeElement.textContent).not.toMatch(/\*/g);
    }));
    it('supports placeholder element', testing_2.fakeAsync(function () {
        var fixture = createComponent(MatInputPlaceholderElementTestComponent);
        fixture.detectChanges();
        var el = fixture.debugElement.query(platform_browser_1.By.css('label'));
        expect(el).not.toBeNull();
        expect(el.nativeElement.textContent).toMatch('Default Placeholder');
        fixture.componentInstance.placeholder = 'Other placeholder';
        fixture.detectChanges();
        el = fixture.debugElement.query(platform_browser_1.By.css('label'));
        expect(el).not.toBeNull();
        expect(el.nativeElement.textContent).toMatch('Other placeholder');
        expect(el.nativeElement.textContent).not.toMatch(/\*/g);
    }));
    it('supports placeholder required star', testing_2.fakeAsync(function () {
        var fixture = createComponent(MatInputPlaceholderRequiredTestComponent);
        fixture.detectChanges();
        var el = fixture.debugElement.query(platform_browser_1.By.css('label'));
        expect(el).not.toBeNull();
        expect(el.nativeElement.textContent).toMatch(/hello\s+\*/g);
    }));
    it('should hide the required star if input is disabled', function () {
        var fixture = createComponent(MatInputPlaceholderRequiredTestComponent);
        fixture.componentInstance.disabled = true;
        fixture.detectChanges();
        var el = fixture.debugElement.query(platform_browser_1.By.css('label'));
        expect(el).not.toBeNull();
        expect(el.nativeElement.textContent).toMatch(/^hello$/);
    });
    it('should hide the required star from screen readers', testing_2.fakeAsync(function () {
        var fixture = createComponent(MatInputPlaceholderRequiredTestComponent);
        fixture.detectChanges();
        var el = fixture.debugElement.query(platform_browser_1.By.css('.mat-form-field-required-marker')).nativeElement;
        expect(el.getAttribute('aria-hidden')).toBe('true');
    }));
    it('hide placeholder required star when set to hide the required marker', testing_2.fakeAsync(function () {
        var fixture = createComponent(MatInputPlaceholderRequiredTestComponent);
        fixture.detectChanges();
        var el = fixture.debugElement.query(platform_browser_1.By.css('label'));
        expect(el).not.toBeNull();
        expect(el.nativeElement.textContent).toMatch(/hello\s+\*/g);
        fixture.componentInstance.hideRequiredMarker = true;
        fixture.detectChanges();
        expect(el.nativeElement.textContent).toMatch(/hello/g);
    }));
    it('supports the disabled attribute as binding', testing_2.fakeAsync(function () {
        var fixture = createComponent(MatInputWithDisabled);
        fixture.detectChanges();
        var formFieldEl = fixture.debugElement.query(platform_browser_1.By.css('.mat-form-field')).nativeElement;
        var inputEl = fixture.debugElement.query(platform_browser_1.By.css('input')).nativeElement;
        expect(formFieldEl.classList.contains('mat-form-field-disabled'))
            .toBe(false, "Expected form field not to start out disabled.");
        expect(inputEl.disabled).toBe(false);
        fixture.componentInstance.disabled = true;
        fixture.detectChanges();
        expect(formFieldEl.classList.contains('mat-form-field-disabled'))
            .toBe(true, "Expected form field to look disabled after property is set.");
        expect(inputEl.disabled).toBe(true);
    }));
    it('supports the required attribute as binding', testing_2.fakeAsync(function () {
        var fixture = createComponent(MatInputWithRequired);
        fixture.detectChanges();
        var inputEl = fixture.debugElement.query(platform_browser_1.By.css('input')).nativeElement;
        expect(inputEl.required).toBe(false);
        fixture.componentInstance.required = true;
        fixture.detectChanges();
        expect(inputEl.required).toBe(true);
    }));
    it('supports the type attribute as binding', testing_2.fakeAsync(function () {
        var fixture = createComponent(MatInputWithType);
        fixture.detectChanges();
        var inputEl = fixture.debugElement.query(platform_browser_1.By.css('input')).nativeElement;
        expect(inputEl.type).toBe('text');
        fixture.componentInstance.type = 'password';
        fixture.detectChanges();
        expect(inputEl.type).toBe('password');
    }));
    it('supports textarea', testing_2.fakeAsync(function () {
        var fixture = createComponent(MatInputTextareaWithBindings);
        fixture.detectChanges();
        var textarea = fixture.nativeElement.querySelector('textarea');
        expect(textarea).not.toBeNull();
    }));
    it('sets the aria-describedby when a hintLabel is set', testing_2.fakeAsync(function () {
        var fixture = createComponent(MatInputHintLabelTestController);
        fixture.componentInstance.label = 'label';
        fixture.detectChanges();
        var hint = fixture.debugElement.query(platform_browser_1.By.css('.mat-hint')).nativeElement;
        var input = fixture.debugElement.query(platform_browser_1.By.css('input')).nativeElement;
        expect(input.getAttribute('aria-describedby')).toBe(hint.getAttribute('id'));
    }));
    it('sets the aria-describedby to the id of the mat-hint', testing_2.fakeAsync(function () {
        var fixture = createComponent(MatInputHintLabel2TestController);
        fixture.componentInstance.label = 'label';
        fixture.detectChanges();
        var hint = fixture.debugElement.query(platform_browser_1.By.css('.mat-hint')).nativeElement;
        var input = fixture.debugElement.query(platform_browser_1.By.css('input')).nativeElement;
        expect(input.getAttribute('aria-describedby')).toBe(hint.getAttribute('id'));
    }));
    it('sets the aria-describedby with multiple mat-hint instances', testing_2.fakeAsync(function () {
        var fixture = createComponent(MatInputMultipleHintTestController);
        fixture.componentInstance.startId = 'start';
        fixture.componentInstance.endId = 'end';
        fixture.detectChanges();
        var input = fixture.debugElement.query(platform_browser_1.By.css('input')).nativeElement;
        expect(input.getAttribute('aria-describedby')).toBe('start end');
    }));
    it('sets the aria-describedby when a hintLabel is set, in addition to a mat-hint', testing_2.fakeAsync(function () {
        var fixture = createComponent(MatInputMultipleHintMixedTestController);
        fixture.detectChanges();
        var hintLabel = fixture.debugElement.query(platform_browser_1.By.css('.mat-hint:not(.mat-right)')).nativeElement;
        var endLabel = fixture.debugElement.query(platform_browser_1.By.css('.mat-hint.mat-right')).nativeElement;
        var input = fixture.debugElement.query(platform_browser_1.By.css('input')).nativeElement;
        var ariaValue = input.getAttribute('aria-describedby');
        expect(ariaValue).toBe(hintLabel.getAttribute('id') + " " + endLabel.getAttribute('id'));
    }));
    it('should float when floatLabel is set to default and text is entered', testing_2.fakeAsync(function () {
        var fixture = createComponent(MatInputWithDynamicLabel);
        fixture.detectChanges();
        var inputEl = fixture.debugElement.query(platform_browser_1.By.css('input')).nativeElement;
        var formFieldEl = fixture.debugElement.query(platform_browser_1.By.css('.mat-form-field')).nativeElement;
        expect(formFieldEl.classList).toContain('mat-form-field-can-float');
        expect(formFieldEl.classList).toContain('mat-form-field-should-float');
        fixture.componentInstance.shouldFloat = 'auto';
        fixture.detectChanges();
        expect(formFieldEl.classList).toContain('mat-form-field-can-float');
        expect(formFieldEl.classList).not.toContain('mat-form-field-should-float');
        // Update the value of the input.
        inputEl.value = 'Text';
        // Fake behavior of the `(input)` event which should trigger a change detection.
        fixture.detectChanges();
        expect(formFieldEl.classList).toContain('mat-form-field-can-float');
        expect(formFieldEl.classList).toContain('mat-form-field-should-float');
    }));
    it('should always float the label when floatLabel is set to true', testing_2.fakeAsync(function () {
        var fixture = createComponent(MatInputWithDynamicLabel);
        fixture.detectChanges();
        var inputEl = fixture.debugElement.query(platform_browser_1.By.css('input')).nativeElement;
        var formFieldEl = fixture.debugElement.query(platform_browser_1.By.css('.mat-form-field')).nativeElement;
        expect(formFieldEl.classList).toContain('mat-form-field-can-float');
        expect(formFieldEl.classList).toContain('mat-form-field-should-float');
        fixture.detectChanges();
        // Update the value of the input.
        inputEl.value = 'Text';
        // Fake behavior of the `(input)` event which should trigger a change detection.
        fixture.detectChanges();
        expect(formFieldEl.classList).toContain('mat-form-field-can-float');
        expect(formFieldEl.classList).toContain('mat-form-field-should-float');
    }));
    it('should never float the label when floatLabel is set to false', testing_2.fakeAsync(function () {
        var fixture = createComponent(MatInputWithDynamicLabel);
        fixture.componentInstance.shouldFloat = 'never';
        fixture.detectChanges();
        var inputEl = fixture.debugElement.query(platform_browser_1.By.css('input')).nativeElement;
        var labelEl = fixture.debugElement.query(platform_browser_1.By.css('label')).nativeElement;
        expect(labelEl.classList).toContain('mat-form-field-empty');
        expect(labelEl.classList).not.toContain('mat-form-field-float');
        // Update the value of the input.
        inputEl.value = 'Text';
        // Fake behavior of the `(input)` event which should trigger a change detection.
        fixture.detectChanges();
        expect(labelEl.classList).not.toContain('mat-form-field-empty');
        expect(labelEl.classList).not.toContain('mat-form-field-float');
    }));
    it('should be able to toggle the floating label programmatically', testing_2.fakeAsync(function () {
        var fixture = createComponent(MatInputWithId);
        fixture.detectChanges();
        var formField = fixture.debugElement.query(platform_browser_1.By.directive(form_field_1.MatFormField));
        var containerInstance = formField.componentInstance;
        var label = formField.nativeElement.querySelector('.mat-form-field-label');
        expect(containerInstance.floatLabel).toBe('auto');
        expect(label.classList)
            .toContain('mat-form-field-empty', 'Expected input to be considered empty.');
        containerInstance.floatLabel = 'always';
        fixture.detectChanges();
        expect(label.classList)
            .not.toContain('mat-form-field-empty', 'Expected input to be considered not empty.');
    }));
    it('should not have prefix and suffix elements when none are specified', testing_2.fakeAsync(function () {
        var fixture = createComponent(MatInputWithId);
        fixture.detectChanges();
        var prefixEl = fixture.debugElement.query(platform_browser_1.By.css('.mat-form-field-prefix'));
        var suffixEl = fixture.debugElement.query(platform_browser_1.By.css('.mat-form-field-suffix'));
        expect(prefixEl).toBeNull();
        expect(suffixEl).toBeNull();
    }));
    it('should add prefix and suffix elements when specified', testing_2.fakeAsync(function () {
        var fixture = createComponent(MatInputWithPrefixAndSuffix);
        fixture.detectChanges();
        var prefixEl = fixture.debugElement.query(platform_browser_1.By.css('.mat-form-field-prefix'));
        var suffixEl = fixture.debugElement.query(platform_browser_1.By.css('.mat-form-field-suffix'));
        expect(prefixEl).not.toBeNull();
        expect(suffixEl).not.toBeNull();
        expect(prefixEl.nativeElement.innerText.trim()).toEqual('Prefix');
        expect(suffixEl.nativeElement.innerText.trim()).toEqual('Suffix');
    }));
    it('should update empty class when value changes programmatically and OnPush', testing_2.fakeAsync(function () {
        var fixture = createComponent(MatInputOnPush);
        fixture.detectChanges();
        var component = fixture.componentInstance;
        var label = fixture.debugElement.query(platform_browser_1.By.css('.mat-form-field-label')).nativeElement;
        expect(label.classList).toContain('mat-form-field-empty', 'Input initially empty');
        component.formControl.setValue('something');
        fixture.detectChanges();
        expect(label.classList).not.toContain('mat-form-field-empty', 'Input no longer empty');
    }));
    it('should set the focused class when the input is focused', testing_2.fakeAsync(function () {
        var fixture = createComponent(MatInputTextTestController);
        fixture.detectChanges();
        var input = fixture.debugElement.query(platform_browser_1.By.directive(input_1.MatInput))
            .injector.get(input_1.MatInput);
        var container = fixture.debugElement.query(platform_browser_1.By.css('mat-form-field')).nativeElement;
        // Call the focus handler directly to avoid flakyness where
        // browsers don't focus elements if the window is minimized.
        input._focusChanged(true);
        fixture.detectChanges();
        expect(container.classList).toContain('mat-focused');
    }));
    it('should remove the focused class if the input becomes disabled while focused', testing_2.fakeAsync(function () {
        var fixture = createComponent(MatInputTextTestController);
        fixture.detectChanges();
        var input = fixture.debugElement.query(platform_browser_1.By.directive(input_1.MatInput)).injector.get(input_1.MatInput);
        var container = fixture.debugElement.query(platform_browser_1.By.css('mat-form-field')).nativeElement;
        // Call the focus handler directly to avoid flakyness where
        // browsers don't focus elements if the window is minimized.
        input._focusChanged(true);
        fixture.detectChanges();
        expect(container.classList).toContain('mat-focused');
        input.disabled = true;
        fixture.detectChanges();
        expect(container.classList).not.toContain('mat-focused');
    }));
    it('should be able to animate the label up and lock it in position', testing_2.fakeAsync(function () {
        var fixture = createComponent(MatInputTextTestController);
        fixture.detectChanges();
        var inputContainer = fixture.debugElement.query(platform_browser_1.By.directive(form_field_1.MatFormField))
            .componentInstance;
        var label = fixture.debugElement.query(platform_browser_1.By.css('.mat-form-field-label')).nativeElement;
        expect(inputContainer.floatLabel).toBe('auto');
        inputContainer._animateAndLockLabel();
        fixture.detectChanges();
        expect(inputContainer._shouldAlwaysFloat).toBe(false);
        expect(inputContainer.floatLabel).toBe('always');
        var fakeEvent = Object.assign(testing_1.createFakeEvent('transitionend'), { propertyName: 'transform' });
        label.dispatchEvent(fakeEvent);
        fixture.detectChanges();
        expect(inputContainer._shouldAlwaysFloat).toBe(true);
        expect(inputContainer.floatLabel).toBe('always');
    }));
    it('should not highlight when focusing a readonly input', testing_2.fakeAsync(function () {
        var fixture = createComponent(MatInputWithReadonlyInput);
        fixture.detectChanges();
        var input = fixture.debugElement.query(platform_browser_1.By.directive(input_1.MatInput)).injector.get(input_1.MatInput);
        var container = fixture.debugElement.query(platform_browser_1.By.css('mat-form-field')).nativeElement;
        // Call the focus handler directly to avoid flakyness where
        // browsers don't focus elements if the window is minimized.
        input._focusChanged(true);
        fixture.detectChanges();
        expect(input.focused).toBe(false);
        expect(container.classList).not.toContain('mat-focused');
    }));
    it('should only show the native placeholder, when there is a label, on focus', function () {
        var fixture = createComponent(MatInputWithLabelAndPlaceholder);
        fixture.detectChanges();
        var container = fixture.debugElement.query(platform_browser_1.By.css('mat-form-field')).nativeElement;
        var label = fixture.debugElement.query(platform_browser_1.By.css('.mat-form-field-label')).nativeElement;
        var input = fixture.debugElement.query(platform_browser_1.By.css('input')).nativeElement;
        expect(container.classList).toContain('mat-form-field-hide-placeholder');
        expect(container.classList).not.toContain('mat-form-field-should-float');
        expect(label.textContent.trim()).toBe('Label');
        expect(input.getAttribute('placeholder')).toBe('Placeholder');
        input.value = 'Value';
        fixture.detectChanges();
        expect(container.classList).not.toContain('mat-form-field-hide-placeholder');
        expect(container.classList).toContain('mat-form-field-should-float');
    });
    it('should always show the native placeholder when floatLabel is set to "always"', function () {
        var fixture = createComponent(MatInputWithLabelAndPlaceholder);
        fixture.componentInstance.floatLabel = 'always';
        fixture.detectChanges();
        var container = fixture.debugElement.query(platform_browser_1.By.css('mat-form-field')).nativeElement;
        expect(container.classList).not.toContain('mat-form-field-hide-placeholder');
    });
    it('should not add the `placeholder` attribute if there is no placeholder', function () {
        var fixture = createComponent(MatInputWithoutPlaceholder);
        fixture.detectChanges();
        var input = fixture.debugElement.query(platform_browser_1.By.css('input')).nativeElement;
        expect(input.hasAttribute('placeholder')).toBe(false);
    });
    it('should not show the native placeholder when floatLabel is set to "never"', function () {
        var fixture = createComponent(MatInputWithLabelAndPlaceholder);
        fixture.componentInstance.floatLabel = 'never';
        fixture.detectChanges();
        var container = fixture.debugElement.query(platform_browser_1.By.css('mat-form-field')).nativeElement;
        var input = fixture.debugElement.query(platform_browser_1.By.css('input')).nativeElement;
        expect(container.classList).toContain('mat-form-field-hide-placeholder');
        expect(container.classList).not.toContain('mat-form-field-should-float');
        input.value = 'Value';
        fixture.detectChanges();
        expect(container.classList).toContain('mat-form-field-hide-placeholder');
        expect(container.classList).not.toContain('mat-form-field-should-float');
    });
});
describe('MatInput with forms', function () {
    describe('error messages', function () {
        var fixture;
        var testComponent;
        var containerEl;
        var inputEl;
        beforeEach(testing_2.fakeAsync(function () {
            fixture = createComponent(MatInputWithFormErrorMessages);
            fixture.detectChanges();
            testComponent = fixture.componentInstance;
            containerEl = fixture.debugElement.query(platform_browser_1.By.css('mat-form-field')).nativeElement;
            inputEl = fixture.debugElement.query(platform_browser_1.By.css('input')).nativeElement;
        }));
        it('should not show any errors if the user has not interacted', testing_2.fakeAsync(function () {
            expect(testComponent.formControl.untouched).toBe(true, 'Expected untouched form control');
            expect(containerEl.querySelectorAll('mat-error').length).toBe(0, 'Expected no error message');
            expect(inputEl.getAttribute('aria-invalid'))
                .toBe('false', 'Expected aria-invalid to be set to "false".');
        }));
        it('should display an error message when the input is touched and invalid', testing_2.fakeAsync(function () {
            expect(testComponent.formControl.invalid).toBe(true, 'Expected form control to be invalid');
            expect(containerEl.querySelectorAll('mat-error').length).toBe(0, 'Expected no error message');
            testComponent.formControl.markAsTouched();
            fixture.detectChanges();
            testing_2.flush();
            expect(containerEl.classList)
                .toContain('mat-form-field-invalid', 'Expected container to have the invalid CSS class.');
            expect(containerEl.querySelectorAll('mat-error').length)
                .toBe(1, 'Expected one error message to have been rendered.');
            expect(inputEl.getAttribute('aria-invalid'))
                .toBe('true', 'Expected aria-invalid to be set to "true".');
        }));
        it('should display an error message when the parent form is submitted', testing_2.fakeAsync(function () {
            expect(testComponent.form.submitted).toBe(false, 'Expected form not to have been submitted');
            expect(testComponent.formControl.invalid).toBe(true, 'Expected form control to be invalid');
            expect(containerEl.querySelectorAll('mat-error').length).toBe(0, 'Expected no error message');
            testing_1.dispatchFakeEvent(fixture.debugElement.query(platform_browser_1.By.css('form')).nativeElement, 'submit');
            fixture.detectChanges();
            testing_2.flush();
            expect(testComponent.form.submitted).toBe(true, 'Expected form to have been submitted');
            expect(containerEl.classList)
                .toContain('mat-form-field-invalid', 'Expected container to have the invalid CSS class.');
            expect(containerEl.querySelectorAll('mat-error').length)
                .toBe(1, 'Expected one error message to have been rendered.');
            expect(inputEl.getAttribute('aria-invalid'))
                .toBe('true', 'Expected aria-invalid to be set to "true".');
        }));
        it('should display an error message when the parent form group is submitted', testing_2.fakeAsync(function () {
            fixture.destroy();
            testing_2.TestBed.resetTestingModule();
            var groupFixture = createComponent(MatInputWithFormGroupErrorMessages);
            var component;
            groupFixture.detectChanges();
            component = groupFixture.componentInstance;
            containerEl = groupFixture.debugElement.query(platform_browser_1.By.css('mat-form-field')).nativeElement;
            inputEl = groupFixture.debugElement.query(platform_browser_1.By.css('input')).nativeElement;
            expect(component.formGroup.invalid).toBe(true, 'Expected form control to be invalid');
            expect(containerEl.querySelectorAll('mat-error').length).toBe(0, 'Expected no error message');
            expect(inputEl.getAttribute('aria-invalid'))
                .toBe('false', 'Expected aria-invalid to be set to "false".');
            expect(component.formGroupDirective.submitted)
                .toBe(false, 'Expected form not to have been submitted');
            testing_1.dispatchFakeEvent(groupFixture.debugElement.query(platform_browser_1.By.css('form')).nativeElement, 'submit');
            groupFixture.detectChanges();
            testing_2.flush();
            expect(component.formGroupDirective.submitted)
                .toBe(true, 'Expected form to have been submitted');
            expect(containerEl.classList)
                .toContain('mat-form-field-invalid', 'Expected container to have the invalid CSS class.');
            expect(containerEl.querySelectorAll('mat-error').length)
                .toBe(1, 'Expected one error message to have been rendered.');
            expect(inputEl.getAttribute('aria-invalid'))
                .toBe('true', 'Expected aria-invalid to be set to "true".');
        }));
        it('should hide the errors and show the hints once the input becomes valid', testing_2.fakeAsync(function () {
            testComponent.formControl.markAsTouched();
            fixture.detectChanges();
            testing_2.flush();
            expect(containerEl.classList)
                .toContain('mat-form-field-invalid', 'Expected container to have the invalid CSS class.');
            expect(containerEl.querySelectorAll('mat-error').length)
                .toBe(1, 'Expected one error message to have been rendered.');
            expect(containerEl.querySelectorAll('mat-hint').length)
                .toBe(0, 'Expected no hints to be shown.');
            testComponent.formControl.setValue('something');
            fixture.detectChanges();
            testing_2.flush();
            expect(containerEl.classList).not.toContain('mat-form-field-invalid', 'Expected container not to have the invalid class when valid.');
            expect(containerEl.querySelectorAll('mat-error').length)
                .toBe(0, 'Expected no error messages when the input is valid.');
            expect(containerEl.querySelectorAll('mat-hint').length)
                .toBe(1, 'Expected one hint to be shown once the input is valid.');
        }));
        it('should not hide the hint if there are no error messages', testing_2.fakeAsync(function () {
            testComponent.renderError = false;
            fixture.detectChanges();
            expect(containerEl.querySelectorAll('mat-hint').length)
                .toBe(1, 'Expected one hint to be shown on load.');
            testComponent.formControl.markAsTouched();
            fixture.detectChanges();
            testing_2.flush();
            expect(containerEl.querySelectorAll('mat-hint').length)
                .toBe(1, 'Expected one hint to still be shown.');
        }));
        it('should set the proper role on the error messages', testing_2.fakeAsync(function () {
            testComponent.formControl.markAsTouched();
            fixture.detectChanges();
            expect(containerEl.querySelector('mat-error').getAttribute('role')).toBe('alert');
        }));
        it('sets the aria-describedby to reference errors when in error state', testing_2.fakeAsync(function () {
            var hintId = fixture.debugElement.query(platform_browser_1.By.css('.mat-hint')).nativeElement.getAttribute('id');
            var describedBy = inputEl.getAttribute('aria-describedby');
            expect(hintId).toBeTruthy('hint should be shown');
            expect(describedBy).toBe(hintId);
            fixture.componentInstance.formControl.markAsTouched();
            fixture.detectChanges();
            var errorIds = fixture.debugElement.queryAll(platform_browser_1.By.css('.mat-error'))
                .map(function (el) { return el.nativeElement.getAttribute('id'); }).join(' ');
            describedBy = inputEl.getAttribute('aria-describedby');
            expect(errorIds).toBeTruthy('errors should be shown');
            expect(describedBy).toBe(errorIds);
        }));
    });
    describe('custom error behavior', function () {
        it('should display an error message when a custom error matcher returns true', testing_2.fakeAsync(function () {
            var fixture = createComponent(MatInputWithCustomErrorStateMatcher);
            fixture.detectChanges();
            var component = fixture.componentInstance;
            var containerEl = fixture.debugElement.query(platform_browser_1.By.css('mat-form-field')).nativeElement;
            var control = (component.formGroup.get('name'));
            expect(control.invalid).toBe(true, 'Expected form control to be invalid');
            expect(containerEl.querySelectorAll('mat-error').length)
                .toBe(0, 'Expected no error messages');
            control.markAsTouched();
            fixture.detectChanges();
            expect(containerEl.querySelectorAll('mat-error').length)
                .toBe(0, 'Expected no error messages after being touched.');
            component.errorState = true;
            fixture.detectChanges();
            expect(containerEl.querySelectorAll('mat-error').length)
                .toBe(1, 'Expected one error messages to have been rendered.');
        }));
        it('should display an error message when global error matcher returns true', testing_2.fakeAsync(function () {
            var fixture = createComponent(MatInputWithFormErrorMessages, [{
                    provide: core_2.ErrorStateMatcher, useValue: { isErrorState: function () { return true; } }
                }
            ]);
            fixture.detectChanges();
            var containerEl = fixture.debugElement.query(platform_browser_1.By.css('mat-form-field')).nativeElement;
            var testComponent = fixture.componentInstance;
            // Expect the control to still be untouched but the error to show due to the global setting
            expect(testComponent.formControl.untouched).toBe(true, 'Expected untouched form control');
            expect(containerEl.querySelectorAll('mat-error').length).toBe(1, 'Expected an error message');
        }));
        it('should display an error message when using ShowOnDirtyErrorStateMatcher', testing_2.fakeAsync(function () {
            var fixture = createComponent(MatInputWithFormErrorMessages, [{
                    provide: core_2.ErrorStateMatcher, useClass: core_2.ShowOnDirtyErrorStateMatcher
                }]);
            fixture.detectChanges();
            var containerEl = fixture.debugElement.query(platform_browser_1.By.css('mat-form-field')).nativeElement;
            var testComponent = fixture.componentInstance;
            expect(testComponent.formControl.invalid).toBe(true, 'Expected form control to be invalid');
            expect(containerEl.querySelectorAll('mat-error').length).toBe(0, 'Expected no error message');
            testComponent.formControl.markAsTouched();
            fixture.detectChanges();
            expect(containerEl.querySelectorAll('mat-error').length)
                .toBe(0, 'Expected no error messages when touched');
            testComponent.formControl.markAsDirty();
            fixture.detectChanges();
            expect(containerEl.querySelectorAll('mat-error').length)
                .toBe(1, 'Expected one error message when dirty');
        }));
    });
    it('should update the value when using FormControl.setValue', testing_2.fakeAsync(function () {
        var fixture = createComponent(MatInputWithFormControl);
        fixture.detectChanges();
        var input = fixture.debugElement.query(platform_browser_1.By.directive(input_1.MatInput))
            .injector.get(input_1.MatInput);
        expect(input.value).toBeFalsy();
        fixture.componentInstance.formControl.setValue('something');
        expect(input.value).toBe('something');
    }));
    it('should display disabled styles when using FormControl.disable()', testing_2.fakeAsync(function () {
        var fixture = createComponent(MatInputWithFormControl);
        fixture.detectChanges();
        var formFieldEl = fixture.debugElement.query(platform_browser_1.By.css('.mat-form-field')).nativeElement;
        var inputEl = fixture.debugElement.query(platform_browser_1.By.css('input')).nativeElement;
        expect(formFieldEl.classList)
            .not.toContain('mat-form-field-disabled', "Expected form field not to start out disabled.");
        expect(inputEl.disabled).toBe(false);
        fixture.componentInstance.formControl.disable();
        fixture.detectChanges();
        expect(formFieldEl.classList).toContain('mat-form-field-disabled', "Expected form field to look disabled after disable() is called.");
        expect(inputEl.disabled).toBe(true);
    }));
    it('should not treat the number 0 as empty', testing_2.fakeAsync(function () {
        var fixture = createComponent(MatInputZeroTestController);
        fixture.detectChanges();
        testing_2.flush();
        fixture.detectChanges();
        var el = fixture.debugElement.query(platform_browser_1.By.css('label')).nativeElement;
        expect(el).not.toBeNull();
        expect(el.classList.contains('mat-form-field-empty')).toBe(false);
    }));
    it('should update when the form field value is patched without emitting', testing_2.fakeAsync(function () {
        var fixture = createComponent(MatInputWithFormControl);
        fixture.detectChanges();
        var el = fixture.debugElement.query(platform_browser_1.By.css('label')).nativeElement;
        expect(el.classList).toContain('mat-form-field-empty');
        fixture.componentInstance.formControl.patchValue('value', { emitEvent: false });
        fixture.detectChanges();
        expect(el.classList).not.toContain('mat-form-field-empty');
    }));
});
describe('MatInput with appearance', function () {
    var nonLegacyAppearances = ['standard', 'fill'];
    var fixture;
    var testComponent;
    var containerEl;
    beforeEach(testing_2.fakeAsync(function () {
        fixture = createComponent(MatInputWithAppearance);
        fixture.detectChanges();
        testComponent = fixture.componentInstance;
        containerEl = fixture.debugElement.query(platform_browser_1.By.css('mat-form-field')).nativeElement;
    }));
    it('legacy appearance should promote placeholder to label', testing_2.fakeAsync(function () {
        testComponent.appearance = 'legacy';
        fixture.detectChanges();
        expect(containerEl.classList).toContain('mat-form-field-appearance-legacy');
        expect(testComponent.formField._hasFloatingLabel()).toBe(true);
        expect(testComponent.formField._hideControlPlaceholder()).toBe(true);
    }));
    it('non-legacy appearances should not promote placeholder to label', testing_2.fakeAsync(function () {
        for (var _i = 0, nonLegacyAppearances_1 = nonLegacyAppearances; _i < nonLegacyAppearances_1.length; _i++) {
            var appearance = nonLegacyAppearances_1[_i];
            testComponent.appearance = appearance;
            fixture.detectChanges();
            expect(containerEl.classList).toContain("mat-form-field-appearance-" + appearance);
            expect(testComponent.formField._hasFloatingLabel()).toBe(false);
            expect(testComponent.formField._hideControlPlaceholder()).toBe(false);
        }
    }));
    it('legacy appearance should respect float never', testing_2.fakeAsync(function () {
        testComponent.appearance = 'legacy';
        fixture.detectChanges();
        expect(containerEl.classList).toContain('mat-form-field-appearance-legacy');
        expect(testComponent.formField.floatLabel).toBe('never');
    }));
    it('non-legacy appearances should not respect float never', testing_2.fakeAsync(function () {
        for (var _i = 0, nonLegacyAppearances_2 = nonLegacyAppearances; _i < nonLegacyAppearances_2.length; _i++) {
            var appearance = nonLegacyAppearances_2[_i];
            testComponent.appearance = appearance;
            fixture.detectChanges();
            expect(containerEl.classList).toContain("mat-form-field-appearance-" + appearance);
            expect(testComponent.formField.floatLabel).toBe('auto');
        }
    }));
    it('should recalculate gaps when switching to outline appearance after init', testing_2.fakeAsync(function () {
        fixture.destroy();
        testing_2.TestBed.resetTestingModule();
        var outlineFixture = createComponent(MatInputWithAppearanceAndLabel);
        outlineFixture.detectChanges();
        outlineFixture.componentInstance.appearance = 'legacy';
        outlineFixture.detectChanges();
        testing_2.flush();
        outlineFixture.componentInstance.appearance = 'outline';
        outlineFixture.detectChanges();
        testing_2.flush();
        outlineFixture.detectChanges();
        var wrapperElement = outlineFixture.nativeElement;
        var outlineStart = wrapperElement.querySelector('.mat-form-field-outline-start');
        var outlineGap = wrapperElement.querySelector('.mat-form-field-outline-gap');
        expect(parseInt(outlineStart.style.width)).toBeGreaterThan(0);
        expect(parseInt(outlineGap.style.width)).toBeGreaterThan(0);
    }));
});
describe('MatFormField default options', function () {
    it('should be legacy appearance if no default options provided', testing_2.fakeAsync(function () {
        var fixture = createComponent(MatInputWithAppearance);
        fixture.detectChanges();
        testing_2.flush();
        expect(fixture.componentInstance.formField.appearance).toBe('legacy');
    }));
    it('should be legacy appearance if empty default options provided', testing_2.fakeAsync(function () {
        var fixture = createComponent(MatInputWithAppearance, [{
                provide: form_field_1.MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {}
            }
        ]);
        fixture.detectChanges();
        testing_2.flush();
        expect(fixture.componentInstance.formField.appearance).toBe('legacy');
    }));
    it('should be custom default appearance if custom appearance specified in default options', testing_2.fakeAsync(function () {
        var fixture = createComponent(MatInputWithAppearance, [{
                provide: form_field_1.MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' }
            }
        ]);
        fixture.detectChanges();
        testing_2.flush();
        expect(fixture.componentInstance.formField.appearance).toBe('fill');
    }));
});
describe('MatInput with textarea autosize', function () {
    it('should not calculate wrong content height due to long placeholders', function () {
        var fixture = createComponent(AutosizeTextareaWithLongPlaceholder);
        fixture.detectChanges();
        var textarea = fixture.nativeElement.querySelector('textarea');
        var autosize = fixture.componentInstance.autosize;
        autosize.resizeToFitContent(true);
        var heightWithLongPlaceholder = textarea.clientHeight;
        fixture.componentInstance.placeholder = 'Short';
        fixture.detectChanges();
        autosize.resizeToFitContent(true);
        expect(textarea.clientHeight).toBe(heightWithLongPlaceholder, 'Expected the textarea height to be the same with a long placeholder.');
    });
    it('should work in a tab', function () {
        var fixture = createComponent(AutosizeTextareaInATab, [], [tabs_1.MatTabsModule]);
        fixture.detectChanges();
        var textarea = fixture.nativeElement.querySelector('textarea');
        expect(textarea.getBoundingClientRect().height).toBeGreaterThan(1);
    });
    it('should work in a step', function () {
        var fixture = createComponent(AutosizeTextareaInAStep, [], [stepper_1.MatStepperModule]);
        fixture.detectChanges();
        var textarea = fixture.nativeElement.querySelector('textarea');
        expect(textarea.getBoundingClientRect().height).toBeGreaterThan(1);
    });
});
function createComponent(component, providers, imports) {
    if (providers === void 0) { providers = []; }
    if (imports === void 0) { imports = []; }
    testing_2.TestBed.configureTestingModule({
        imports: [
            forms_1.FormsModule,
            form_field_1.MatFormFieldModule,
            index_1.MatInputModule,
            animations_1.BrowserAnimationsModule,
            platform_1.PlatformModule,
            forms_1.ReactiveFormsModule
        ].concat(imports),
        declarations: [component],
        providers: providers,
    }).compileComponents();
    return testing_2.TestBed.createComponent(component);
}
var MatInputWithId = /** @class */ (function () {
    function MatInputWithId() {
    }
    MatInputWithId.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <mat-form-field>\n      <input matInput id=\"test-id\" placeholder=\"test\">\n    </mat-form-field>"
                },] },
    ];
    return MatInputWithId;
}());
var MatInputWithDisabled = /** @class */ (function () {
    function MatInputWithDisabled() {
    }
    MatInputWithDisabled.decorators = [
        { type: core_1.Component, args: [{
                    template: "<mat-form-field><input matInput [disabled]=\"disabled\"></mat-form-field>"
                },] },
    ];
    return MatInputWithDisabled;
}());
var MatInputWithRequired = /** @class */ (function () {
    function MatInputWithRequired() {
    }
    MatInputWithRequired.decorators = [
        { type: core_1.Component, args: [{
                    template: "<mat-form-field><input matInput [required]=\"required\"></mat-form-field>"
                },] },
    ];
    return MatInputWithRequired;
}());
var MatInputWithType = /** @class */ (function () {
    function MatInputWithType() {
    }
    MatInputWithType.decorators = [
        { type: core_1.Component, args: [{
                    template: "<mat-form-field><input matInput [type]=\"type\"></mat-form-field>"
                },] },
    ];
    return MatInputWithType;
}());
var MatInputPlaceholderRequiredTestComponent = /** @class */ (function () {
    function MatInputPlaceholderRequiredTestComponent() {
        this.hideRequiredMarker = false;
        this.disabled = false;
    }
    MatInputPlaceholderRequiredTestComponent.decorators = [
        { type: core_1.Component, args: [{
                    template: "<mat-form-field [hideRequiredMarker]=\"hideRequiredMarker\">\n                <input matInput required [disabled]=\"disabled\" placeholder=\"hello\">\n             </mat-form-field>"
                },] },
    ];
    return MatInputPlaceholderRequiredTestComponent;
}());
var MatInputPlaceholderElementTestComponent = /** @class */ (function () {
    function MatInputPlaceholderElementTestComponent() {
        this.placeholder = 'Default Placeholder';
    }
    MatInputPlaceholderElementTestComponent.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <mat-form-field>\n      <input matInput>\n      <mat-placeholder>{{placeholder}}</mat-placeholder>\n    </mat-form-field>"
                },] },
    ];
    return MatInputPlaceholderElementTestComponent;
}());
var MatInputWithFormControl = /** @class */ (function () {
    function MatInputWithFormControl() {
        this.formControl = new forms_1.FormControl();
    }
    MatInputWithFormControl.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <mat-form-field>\n      <input matInput placeholder=\"Hello\" [formControl]=\"formControl\">\n    </mat-form-field>"
                },] },
    ];
    return MatInputWithFormControl;
}());
var MatInputPlaceholderAttrTestComponent = /** @class */ (function () {
    function MatInputPlaceholderAttrTestComponent() {
        this.placeholder = '';
    }
    MatInputPlaceholderAttrTestComponent.decorators = [
        { type: core_1.Component, args: [{
                    template: "<mat-form-field><input matInput [placeholder]=\"placeholder\"></mat-form-field>"
                },] },
    ];
    return MatInputPlaceholderAttrTestComponent;
}());
var MatInputHintLabel2TestController = /** @class */ (function () {
    function MatInputHintLabel2TestController() {
        this.label = '';
    }
    MatInputHintLabel2TestController.decorators = [
        { type: core_1.Component, args: [{
                    template: "<mat-form-field><input matInput><mat-hint>{{label}}</mat-hint></mat-form-field>"
                },] },
    ];
    return MatInputHintLabel2TestController;
}());
var MatInputHintLabelTestController = /** @class */ (function () {
    function MatInputHintLabelTestController() {
        this.label = '';
    }
    MatInputHintLabelTestController.decorators = [
        { type: core_1.Component, args: [{
                    template: "<mat-form-field [hintLabel]=\"label\"><input matInput></mat-form-field>"
                },] },
    ];
    return MatInputHintLabelTestController;
}());
var MatInputInvalidTypeTestController = /** @class */ (function () {
    function MatInputInvalidTypeTestController() {
    }
    MatInputInvalidTypeTestController.decorators = [
        { type: core_1.Component, args: [{
                    template: "<mat-form-field><input matInput type=\"file\"></mat-form-field>"
                },] },
    ];
    return MatInputInvalidTypeTestController;
}());
var MatInputInvalidPlaceholderTestController = /** @class */ (function () {
    function MatInputInvalidPlaceholderTestController() {
    }
    MatInputInvalidPlaceholderTestController.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <mat-form-field>\n      <input matInput placeholder=\"Hello\">\n      <mat-placeholder>World</mat-placeholder>\n    </mat-form-field>"
                },] },
    ];
    return MatInputInvalidPlaceholderTestController;
}());
var MatInputInvalidHint2TestController = /** @class */ (function () {
    function MatInputInvalidHint2TestController() {
    }
    MatInputInvalidHint2TestController.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <mat-form-field hintLabel=\"Hello\">\n      <input matInput>\n      <mat-hint>World</mat-hint>\n    </mat-form-field>"
                },] },
    ];
    return MatInputInvalidHint2TestController;
}());
var MatInputInvalidHintTestController = /** @class */ (function () {
    function MatInputInvalidHintTestController() {
    }
    MatInputInvalidHintTestController.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <mat-form-field>\n      <input matInput>\n      <mat-hint>Hello</mat-hint>\n      <mat-hint>World</mat-hint>\n    </mat-form-field>"
                },] },
    ];
    return MatInputInvalidHintTestController;
}());
var MatInputMultipleHintTestController = /** @class */ (function () {
    function MatInputMultipleHintTestController() {
    }
    MatInputMultipleHintTestController.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <mat-form-field>\n      <input matInput>\n      <mat-hint align=\"start\" [id]=\"startId\">Hello</mat-hint>\n      <mat-hint align=\"end\" [id]=\"endId\">World</mat-hint>\n    </mat-form-field>"
                },] },
    ];
    return MatInputMultipleHintTestController;
}());
var MatInputMultipleHintMixedTestController = /** @class */ (function () {
    function MatInputMultipleHintMixedTestController() {
    }
    MatInputMultipleHintMixedTestController.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <mat-form-field hintLabel=\"Hello\">\n      <input matInput>\n      <mat-hint align=\"end\">World</mat-hint>\n    </mat-form-field>"
                },] },
    ];
    return MatInputMultipleHintMixedTestController;
}());
var MatInputDateTestController = /** @class */ (function () {
    function MatInputDateTestController() {
    }
    MatInputDateTestController.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <mat-form-field>\n      <input matInput type=\"date\" placeholder=\"Placeholder\">\n    </mat-form-field>"
                },] },
    ];
    return MatInputDateTestController;
}());
var MatInputTextTestController = /** @class */ (function () {
    function MatInputTextTestController() {
    }
    MatInputTextTestController.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <mat-form-field>\n      <input matInput type=\"text\" placeholder=\"Placeholder\">\n    </mat-form-field>"
                },] },
    ];
    return MatInputTextTestController;
}());
var MatInputPasswordTestController = /** @class */ (function () {
    function MatInputPasswordTestController() {
    }
    MatInputPasswordTestController.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <mat-form-field>\n      <input matInput type=\"password\" placeholder=\"Placeholder\">\n    </mat-form-field>"
                },] },
    ];
    return MatInputPasswordTestController;
}());
var MatInputNumberTestController = /** @class */ (function () {
    function MatInputNumberTestController() {
    }
    MatInputNumberTestController.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <mat-form-field>\n      <input matInput type=\"number\" placeholder=\"Placeholder\">\n    </mat-form-field>"
                },] },
    ];
    return MatInputNumberTestController;
}());
var MatInputZeroTestController = /** @class */ (function () {
    function MatInputZeroTestController() {
        this.value = 0;
    }
    MatInputZeroTestController.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <mat-form-field>\n      <input matInput type=\"number\" placeholder=\"Placeholder\" [(ngModel)]=\"value\">\n    </mat-form-field>"
                },] },
    ];
    return MatInputZeroTestController;
}());
var MatInputWithValueBinding = /** @class */ (function () {
    function MatInputWithValueBinding() {
        this.value = 'Initial';
    }
    MatInputWithValueBinding.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <mat-form-field>\n      <input matInput placeholder=\"Label\" [value]=\"value\">\n    </mat-form-field>"
                },] },
    ];
    return MatInputWithValueBinding;
}());
var MatInputWithStaticLabel = /** @class */ (function () {
    function MatInputWithStaticLabel() {
    }
    MatInputWithStaticLabel.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <mat-form-field floatLabel=\"never\">\n      <input matInput placeholder=\"Label\">\n    </mat-form-field>\n  "
                },] },
    ];
    return MatInputWithStaticLabel;
}());
var MatInputWithDynamicLabel = /** @class */ (function () {
    function MatInputWithDynamicLabel() {
        this.shouldFloat = 'always';
    }
    MatInputWithDynamicLabel.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <mat-form-field [floatLabel]=\"shouldFloat\">\n      <input matInput placeholder=\"Label\">\n    </mat-form-field>"
                },] },
    ];
    return MatInputWithDynamicLabel;
}());
var MatInputTextareaWithBindings = /** @class */ (function () {
    function MatInputTextareaWithBindings() {
        this.rows = 4;
        this.cols = 8;
        this.wrap = 'hard';
    }
    MatInputTextareaWithBindings.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <mat-form-field>\n      <textarea matInput [rows]=\"rows\" [cols]=\"cols\" [wrap]=\"wrap\" placeholder=\"Snacks\"></textarea>\n    </mat-form-field>"
                },] },
    ];
    return MatInputTextareaWithBindings;
}());
var MatInputMissingMatInputTestController = /** @class */ (function () {
    function MatInputMissingMatInputTestController() {
    }
    MatInputMissingMatInputTestController.decorators = [
        { type: core_1.Component, args: [{
                    template: "<mat-form-field><input></mat-form-field>"
                },] },
    ];
    return MatInputMissingMatInputTestController;
}());
var MatInputWithFormErrorMessages = /** @class */ (function () {
    function MatInputWithFormErrorMessages() {
        this.formControl = new forms_1.FormControl('', forms_1.Validators.required);
        this.renderError = true;
    }
    MatInputWithFormErrorMessages.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <form #form=\"ngForm\" novalidate>\n      <mat-form-field>\n        <input matInput [formControl]=\"formControl\">\n        <mat-hint>Please type something</mat-hint>\n        <mat-error *ngIf=\"renderError\">This field is required</mat-error>\n      </mat-form-field>\n    </form>\n  "
                },] },
    ];
    /** @nocollapse */
    MatInputWithFormErrorMessages.propDecorators = {
        "form": [{ type: core_1.ViewChild, args: ['form',] },],
    };
    return MatInputWithFormErrorMessages;
}());
var MatInputWithCustomErrorStateMatcher = /** @class */ (function () {
    function MatInputWithCustomErrorStateMatcher() {
        var _this = this;
        this.formGroup = new forms_1.FormGroup({
            name: new forms_1.FormControl('', forms_1.Validators.required)
        });
        this.errorState = false;
        this.customErrorStateMatcher = {
            isErrorState: function () { return _this.errorState; }
        };
    }
    MatInputWithCustomErrorStateMatcher.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <form [formGroup]=\"formGroup\">\n      <mat-form-field>\n        <input matInput\n            formControlName=\"name\"\n            [errorStateMatcher]=\"customErrorStateMatcher\">\n        <mat-hint>Please type something</mat-hint>\n        <mat-error>This field is required</mat-error>\n      </mat-form-field>\n    </form>\n  "
                },] },
    ];
    return MatInputWithCustomErrorStateMatcher;
}());
var MatInputWithFormGroupErrorMessages = /** @class */ (function () {
    function MatInputWithFormGroupErrorMessages() {
        this.formGroup = new forms_1.FormGroup({
            name: new forms_1.FormControl('', forms_1.Validators.required)
        });
    }
    MatInputWithFormGroupErrorMessages.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <form [formGroup]=\"formGroup\" novalidate>\n      <mat-form-field>\n        <input matInput formControlName=\"name\">\n        <mat-hint>Please type something</mat-hint>\n        <mat-error>This field is required</mat-error>\n      </mat-form-field>\n    </form>\n  "
                },] },
    ];
    /** @nocollapse */
    MatInputWithFormGroupErrorMessages.propDecorators = {
        "formGroupDirective": [{ type: core_1.ViewChild, args: [forms_1.FormGroupDirective,] },],
    };
    return MatInputWithFormGroupErrorMessages;
}());
var MatInputWithPrefixAndSuffix = /** @class */ (function () {
    function MatInputWithPrefixAndSuffix() {
    }
    MatInputWithPrefixAndSuffix.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <mat-form-field>\n      <div matPrefix>Prefix</div>\n      <input matInput>\n      <div matSuffix>Suffix</div>\n    </mat-form-field>\n  "
                },] },
    ];
    return MatInputWithPrefixAndSuffix;
}());
var MatInputWithNgIf = /** @class */ (function () {
    function MatInputWithNgIf() {
        this.renderInput = true;
    }
    MatInputWithNgIf.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <mat-form-field>\n      <input matInput *ngIf=\"renderInput\">\n    </mat-form-field>\n  "
                },] },
    ];
    return MatInputWithNgIf;
}());
var MatInputOnPush = /** @class */ (function () {
    function MatInputOnPush() {
        this.formControl = new forms_1.FormControl('');
    }
    MatInputOnPush.decorators = [
        { type: core_1.Component, args: [{
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    template: "\n    <mat-form-field>\n      <input matInput placeholder=\"Label\" [formControl]=\"formControl\">\n    </mat-form-field>\n  "
                },] },
    ];
    return MatInputOnPush;
}());
var MatInputWithReadonlyInput = /** @class */ (function () {
    function MatInputWithReadonlyInput() {
    }
    MatInputWithReadonlyInput.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <mat-form-field>\n      <input matInput readonly value=\"Only for reading\">\n    </mat-form-field>\n  "
                },] },
    ];
    return MatInputWithReadonlyInput;
}());
var MatInputWithLabelAndPlaceholder = /** @class */ (function () {
    function MatInputWithLabelAndPlaceholder() {
    }
    MatInputWithLabelAndPlaceholder.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <mat-form-field [floatLabel]=\"floatLabel\">\n      <mat-label>Label</mat-label>\n      <input matInput placeholder=\"Placeholder\">\n    </mat-form-field>\n  "
                },] },
    ];
    return MatInputWithLabelAndPlaceholder;
}());
var MatInputWithAppearance = /** @class */ (function () {
    function MatInputWithAppearance() {
    }
    MatInputWithAppearance.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <mat-form-field [appearance]=\"appearance\" floatLabel=\"never\">\n      <input matInput placeholder=\"Placeholder\">\n    </mat-form-field>\n  "
                },] },
    ];
    /** @nocollapse */
    MatInputWithAppearance.propDecorators = {
        "formField": [{ type: core_1.ViewChild, args: [form_field_1.MatFormField,] },],
    };
    return MatInputWithAppearance;
}());
var MatInputWithAppearanceAndLabel = /** @class */ (function () {
    function MatInputWithAppearanceAndLabel() {
    }
    MatInputWithAppearanceAndLabel.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <mat-form-field [appearance]=\"appearance\">\n      <mat-label>Label</mat-label>\n      <input matInput>\n    </mat-form-field>\n  "
                },] },
    ];
    return MatInputWithAppearanceAndLabel;
}());
var MatInputWithoutPlaceholder = /** @class */ (function () {
    function MatInputWithoutPlaceholder() {
    }
    MatInputWithoutPlaceholder.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <mat-form-field>\n      <input matInput>\n    </mat-form-field>\n  "
                },] },
    ];
    return MatInputWithoutPlaceholder;
}());
// Styles to reset padding and border to make measurement comparisons easier.
var textareaStyleReset = "\n    textarea {\n      padding: 0;\n      border: none;\n      overflow: auto;\n    }";
var AutosizeTextareaWithLongPlaceholder = /** @class */ (function () {
    function AutosizeTextareaWithLongPlaceholder() {
        this.placeholder = 'Long Long Long Long Long Long Long Long Placeholder';
    }
    AutosizeTextareaWithLongPlaceholder.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <mat-form-field style=\"width: 100px\">\n      <textarea matInput matTextareaAutosize [placeholder]=\"placeholder\"></textarea>\n    </mat-form-field>",
                    styles: [textareaStyleReset],
                },] },
    ];
    /** @nocollapse */
    AutosizeTextareaWithLongPlaceholder.propDecorators = {
        "autosize": [{ type: core_1.ViewChild, args: [autosize_1.MatTextareaAutosize,] },],
    };
    return AutosizeTextareaWithLongPlaceholder;
}());
var AutosizeTextareaInATab = /** @class */ (function () {
    function AutosizeTextareaInATab() {
    }
    AutosizeTextareaInATab.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <mat-tab-group>\n      <mat-tab label=\"Tab 1\">\n        <mat-form-field>\n          <textarea matInput matTextareaAutosize>\n            Blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah\n          </textarea>\n        </mat-form-field>\n      </mat-tab>\n    </mat-tab-group>\n  "
                },] },
    ];
    return AutosizeTextareaInATab;
}());
var AutosizeTextareaInAStep = /** @class */ (function () {
    function AutosizeTextareaInAStep() {
    }
    AutosizeTextareaInAStep.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <mat-horizontal-stepper>\n      <mat-step label=\"Step 1\">\n        <mat-form-field>\n          <textarea matInput matTextareaAautosize>\n            Blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah\n          </textarea>\n        </mat-form-field>\n      </mat-step>\n    </mat-horizontal-stepper>\n  "
                },] },
    ];
    return AutosizeTextareaInAStep;
}());
//# sourceMappingURL=input.spec.js.map