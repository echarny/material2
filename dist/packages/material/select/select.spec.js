"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var bidi_1 = require("@angular/cdk/bidi");
var keycodes_1 = require("@angular/cdk/keycodes");
var overlay_1 = require("@angular/cdk/overlay");
var platform_1 = require("@angular/cdk/platform");
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
var index_1 = require("./index");
var select_1 = require("./select");
var select_errors_1 = require("./select-errors");
/** The debounce interval when typing letters to select an option. */
var LETTER_KEY_DEBOUNCE_INTERVAL = 200;
describe('MatSelect', function () {
    var overlayContainer;
    var overlayContainerElement;
    var dir;
    var scrolledSubject = new rxjs_1.Subject();
    var viewportRuler;
    var platform;
    /**
       * Configures the test module for MatSelect with the given declarations. This is broken out so
       * that we're only compiling the necessary test components for each test in order to speed up
       * overall test time.
       * @param declarations Components to declare for this block
       */
    function configureMatSelectTestingModule(declarations) {
        testing_2.TestBed.configureTestingModule({
            imports: [
                form_field_1.MatFormFieldModule,
                index_1.MatSelectModule,
                forms_1.ReactiveFormsModule,
                forms_1.FormsModule,
                animations_1.NoopAnimationsModule,
            ],
            declarations: declarations,
            providers: [
                { provide: bidi_1.Directionality, useFactory: function () { return dir = { value: 'ltr' }; } },
                {
                    provide: scrolling_1.ScrollDispatcher, useFactory: function () {
                        return ({
                            scrolled: function () { return scrolledSubject.asObservable(); },
                        });
                    },
                },
            ],
        }).compileComponents();
        testing_2.inject([overlay_1.OverlayContainer, platform_1.Platform], function (oc, p) {
            overlayContainer = oc;
            overlayContainerElement = oc.getContainerElement();
            platform = p;
        })();
    }
    afterEach(function () {
        overlayContainer.ngOnDestroy();
    });
    describe('core', function () {
        beforeEach(testing_2.async(function () {
            configureMatSelectTestingModule([
                BasicSelect,
                MultiSelect,
                SelectWithGroups,
                SelectWithGroupsAndNgContainer,
                SelectWithFormFieldLabel,
            ]);
        }));
        describe('accessibility', function () {
            describe('for select', function () {
                var fixture;
                var select;
                beforeEach(testing_2.fakeAsync(function () {
                    fixture = testing_2.TestBed.createComponent(BasicSelect);
                    fixture.detectChanges();
                    select = fixture.debugElement.query(platform_browser_1.By.css('mat-select')).nativeElement;
                }));
                it('should set the role of the select to listbox', testing_2.fakeAsync(function () {
                    expect(select.getAttribute('role')).toEqual('listbox');
                }));
                it('should set the aria label of the select to the placeholder', testing_2.fakeAsync(function () {
                    expect(select.getAttribute('aria-label')).toEqual('Food');
                }));
                it('should support setting a custom aria-label', testing_2.fakeAsync(function () {
                    fixture.componentInstance.ariaLabel = 'Custom Label';
                    fixture.detectChanges();
                    expect(select.getAttribute('aria-label')).toEqual('Custom Label');
                }));
                it('should not set an aria-label if aria-labelledby is specified', testing_2.fakeAsync(function () {
                    fixture.componentInstance.ariaLabelledby = 'myLabelId';
                    fixture.detectChanges();
                    expect(select.getAttribute('aria-label')).toBeFalsy('Expected no aria-label to be set.');
                    expect(select.getAttribute('aria-labelledby')).toBe('myLabelId');
                }));
                it('should not have aria-labelledby in the DOM if it`s not specified', testing_2.fakeAsync(function () {
                    fixture.detectChanges();
                    expect(select.hasAttribute('aria-labelledby')).toBeFalsy();
                }));
                it('should set the tabindex of the select to 0 by default', testing_2.fakeAsync(function () {
                    expect(select.getAttribute('tabindex')).toEqual('0');
                }));
                it('should be able to override the tabindex', testing_2.fakeAsync(function () {
                    fixture.componentInstance.tabIndexOverride = 3;
                    fixture.detectChanges();
                    expect(select.getAttribute('tabindex')).toBe('3');
                }));
                it('should set aria-required for required selects', testing_2.fakeAsync(function () {
                    expect(select.getAttribute('aria-required'))
                        .toEqual('false', "Expected aria-required attr to be false for normal selects.");
                    fixture.componentInstance.isRequired = true;
                    fixture.detectChanges();
                    expect(select.getAttribute('aria-required'))
                        .toEqual('true', "Expected aria-required attr to be true for required selects.");
                }));
                it('should set the mat-select-required class for required selects', testing_2.fakeAsync(function () {
                    expect(select.classList).not.toContain('mat-select-required', "Expected the mat-select-required class not to be set.");
                    fixture.componentInstance.isRequired = true;
                    fixture.detectChanges();
                    expect(select.classList).toContain('mat-select-required', "Expected the mat-select-required class to be set.");
                }));
                it('should set aria-invalid for selects that are invalid and touched', testing_2.fakeAsync(function () {
                    expect(select.getAttribute('aria-invalid'))
                        .toEqual('false', "Expected aria-invalid attr to be false for valid selects.");
                    fixture.componentInstance.isRequired = true;
                    fixture.componentInstance.control.markAsTouched();
                    fixture.detectChanges();
                    expect(select.getAttribute('aria-invalid'))
                        .toEqual('true', "Expected aria-invalid attr to be true for invalid selects.");
                }));
                it('should set aria-disabled for disabled selects', testing_2.fakeAsync(function () {
                    expect(select.getAttribute('aria-disabled')).toEqual('false');
                    fixture.componentInstance.control.disable();
                    fixture.detectChanges();
                    expect(select.getAttribute('aria-disabled')).toEqual('true');
                }));
                it('should set the tabindex of the select to -1 if disabled', testing_2.fakeAsync(function () {
                    fixture.componentInstance.control.disable();
                    fixture.detectChanges();
                    expect(select.getAttribute('tabindex')).toEqual('-1');
                    fixture.componentInstance.control.enable();
                    fixture.detectChanges();
                    expect(select.getAttribute('tabindex')).toEqual('0');
                }));
                it('should set `aria-labelledby` to form field label if there is no placeholder', function () {
                    fixture.destroy();
                    var labelFixture = testing_2.TestBed.createComponent(SelectWithFormFieldLabel);
                    labelFixture.detectChanges();
                    select = labelFixture.debugElement.query(platform_browser_1.By.css('mat-select')).nativeElement;
                    expect(select.getAttribute('aria-labelledby')).toBeTruthy();
                    expect(select.getAttribute('aria-labelledby'))
                        .toBe(labelFixture.nativeElement.querySelector('label').getAttribute('id'));
                });
                it('should not set `aria-labelledby` if there is a placeholder', function () {
                    fixture.destroy();
                    var labelFixture = testing_2.TestBed.createComponent(SelectWithFormFieldLabel);
                    labelFixture.componentInstance.placeholder = 'Thing selector';
                    labelFixture.detectChanges();
                    select = labelFixture.debugElement.query(platform_browser_1.By.css('mat-select')).nativeElement;
                    expect(select.getAttribute('aria-labelledby')).toBeFalsy();
                });
                it('should select options via the UP/DOWN arrow keys on a closed select', testing_2.fakeAsync(function () {
                    var formControl = fixture.componentInstance.control;
                    var options = fixture.componentInstance.options.toArray();
                    expect(formControl.value).toBeFalsy('Expected no initial value.');
                    testing_1.dispatchKeyboardEvent(select, 'keydown', keycodes_1.DOWN_ARROW);
                    expect(options[0].selected).toBe(true, 'Expected first option to be selected.');
                    expect(formControl.value).toBe(options[0].value, 'Expected value from first option to have been set on the model.');
                    testing_1.dispatchKeyboardEvent(select, 'keydown', keycodes_1.DOWN_ARROW);
                    testing_1.dispatchKeyboardEvent(select, 'keydown', keycodes_1.DOWN_ARROW);
                    // Note that the third option is skipped, because it is disabled.
                    expect(options[3].selected).toBe(true, 'Expected fourth option to be selected.');
                    expect(formControl.value).toBe(options[3].value, 'Expected value from fourth option to have been set on the model.');
                    testing_1.dispatchKeyboardEvent(select, 'keydown', keycodes_1.UP_ARROW);
                    expect(options[1].selected).toBe(true, 'Expected second option to be selected.');
                    expect(formControl.value).toBe(options[1].value, 'Expected value from second option to have been set on the model.');
                }));
                it('should resume focus from selected item after selecting via click', testing_2.fakeAsync(function () {
                    var formControl = fixture.componentInstance.control;
                    var options = fixture.componentInstance.options.toArray();
                    expect(formControl.value).toBeFalsy('Expected no initial value.');
                    fixture.componentInstance.select.open();
                    fixture.detectChanges();
                    testing_2.flush();
                    overlayContainerElement.querySelectorAll('mat-option')[3].click();
                    fixture.detectChanges();
                    testing_2.flush();
                    expect(formControl.value).toBe(options[3].value);
                    testing_1.dispatchKeyboardEvent(select, 'keydown', keycodes_1.DOWN_ARROW);
                    fixture.detectChanges();
                    expect(formControl.value).toBe(options[4].value);
                }));
                it('should select options via LEFT/RIGHT arrow keys on a closed select', testing_2.fakeAsync(function () {
                    var formControl = fixture.componentInstance.control;
                    var options = fixture.componentInstance.options.toArray();
                    expect(formControl.value).toBeFalsy('Expected no initial value.');
                    testing_1.dispatchKeyboardEvent(select, 'keydown', keycodes_1.RIGHT_ARROW);
                    expect(options[0].selected).toBe(true, 'Expected first option to be selected.');
                    expect(formControl.value).toBe(options[0].value, 'Expected value from first option to have been set on the model.');
                    testing_1.dispatchKeyboardEvent(select, 'keydown', keycodes_1.RIGHT_ARROW);
                    testing_1.dispatchKeyboardEvent(select, 'keydown', keycodes_1.RIGHT_ARROW);
                    // Note that the third option is skipped, because it is disabled.
                    expect(options[3].selected).toBe(true, 'Expected fourth option to be selected.');
                    expect(formControl.value).toBe(options[3].value, 'Expected value from fourth option to have been set on the model.');
                    testing_1.dispatchKeyboardEvent(select, 'keydown', keycodes_1.LEFT_ARROW);
                    expect(options[1].selected).toBe(true, 'Expected second option to be selected.');
                    expect(formControl.value).toBe(options[1].value, 'Expected value from second option to have been set on the model.');
                }));
                it('should open a single-selection select using ALT + DOWN_ARROW', testing_2.fakeAsync(function () {
                    var _a = fixture.componentInstance, formControl = _a.control, selectInstance = _a.select;
                    expect(selectInstance.panelOpen).toBe(false, 'Expected select to be closed.');
                    expect(formControl.value).toBeFalsy('Expected no initial value.');
                    var event = testing_1.createKeyboardEvent('keydown', keycodes_1.DOWN_ARROW);
                    Object.defineProperty(event, 'altKey', { get: function () { return true; } });
                    testing_1.dispatchEvent(select, event);
                    expect(selectInstance.panelOpen).toBe(true, 'Expected select to be open.');
                    expect(formControl.value).toBeFalsy('Expected value not to have changed.');
                }));
                it('should open a single-selection select using ALT + UP_ARROW', testing_2.fakeAsync(function () {
                    var _a = fixture.componentInstance, formControl = _a.control, selectInstance = _a.select;
                    expect(selectInstance.panelOpen).toBe(false, 'Expected select to be closed.');
                    expect(formControl.value).toBeFalsy('Expected no initial value.');
                    var event = testing_1.createKeyboardEvent('keydown', keycodes_1.UP_ARROW);
                    Object.defineProperty(event, 'altKey', { get: function () { return true; } });
                    testing_1.dispatchEvent(select, event);
                    expect(selectInstance.panelOpen).toBe(true, 'Expected select to be open.');
                    expect(formControl.value).toBeFalsy('Expected value not to have changed.');
                }));
                it('should should close when pressing ALT + DOWN_ARROW', testing_2.fakeAsync(function () {
                    var selectInstance = fixture.componentInstance.select;
                    selectInstance.open();
                    fixture.detectChanges();
                    expect(selectInstance.panelOpen).toBe(true, 'Expected select to be open.');
                    var event = testing_1.createKeyboardEvent('keydown', keycodes_1.DOWN_ARROW);
                    Object.defineProperty(event, 'altKey', { get: function () { return true; } });
                    testing_1.dispatchEvent(select, event);
                    expect(selectInstance.panelOpen).toBe(false, 'Expected select to be closed.');
                    expect(event.defaultPrevented).toBe(true, 'Expected default action to be prevented.');
                }));
                it('should should close when pressing ALT + UP_ARROW', testing_2.fakeAsync(function () {
                    var selectInstance = fixture.componentInstance.select;
                    selectInstance.open();
                    fixture.detectChanges();
                    expect(selectInstance.panelOpen).toBe(true, 'Expected select to be open.');
                    var event = testing_1.createKeyboardEvent('keydown', keycodes_1.UP_ARROW);
                    Object.defineProperty(event, 'altKey', { get: function () { return true; } });
                    testing_1.dispatchEvent(select, event);
                    expect(selectInstance.panelOpen).toBe(false, 'Expected select to be closed.');
                    expect(event.defaultPrevented).toBe(true, 'Expected default action to be prevented.');
                }));
                it('should be able to select options by typing on a closed select', testing_2.fakeAsync(function () {
                    var formControl = fixture.componentInstance.control;
                    var options = fixture.componentInstance.options.toArray();
                    expect(formControl.value).toBeFalsy('Expected no initial value.');
                    testing_1.dispatchEvent(select, testing_1.createKeyboardEvent('keydown', 80, undefined, 'p'));
                    testing_2.tick(200);
                    expect(options[1].selected).toBe(true, 'Expected second option to be selected.');
                    expect(formControl.value).toBe(options[1].value, 'Expected value from second option to have been set on the model.');
                    testing_1.dispatchEvent(select, testing_1.createKeyboardEvent('keydown', 69, undefined, 'e'));
                    testing_2.tick(200);
                    expect(options[5].selected).toBe(true, 'Expected sixth option to be selected.');
                    expect(formControl.value).toBe(options[5].value, 'Expected value from sixth option to have been set on the model.');
                }));
                it('should open the panel when pressing a vertical arrow key on a closed multiple select', testing_2.fakeAsync(function () {
                    fixture.destroy();
                    var multiFixture = testing_2.TestBed.createComponent(MultiSelect);
                    var instance = multiFixture.componentInstance;
                    multiFixture.detectChanges();
                    select = multiFixture.debugElement.query(platform_browser_1.By.css('mat-select')).nativeElement;
                    var initialValue = instance.control.value;
                    expect(instance.select.panelOpen).toBe(false, 'Expected panel to be closed.');
                    var event = testing_1.dispatchKeyboardEvent(select, 'keydown', keycodes_1.DOWN_ARROW);
                    expect(instance.select.panelOpen).toBe(true, 'Expected panel to be open.');
                    expect(instance.control.value).toBe(initialValue, 'Expected value to stay the same.');
                    expect(event.defaultPrevented).toBe(true, 'Expected default to be prevented.');
                }));
                it('should open the panel when pressing a horizontal arrow key on closed multiple select', testing_2.fakeAsync(function () {
                    fixture.destroy();
                    var multiFixture = testing_2.TestBed.createComponent(MultiSelect);
                    var instance = multiFixture.componentInstance;
                    multiFixture.detectChanges();
                    select = multiFixture.debugElement.query(platform_browser_1.By.css('mat-select')).nativeElement;
                    var initialValue = instance.control.value;
                    expect(instance.select.panelOpen).toBe(false, 'Expected panel to be closed.');
                    var event = testing_1.dispatchKeyboardEvent(select, 'keydown', keycodes_1.RIGHT_ARROW);
                    expect(instance.select.panelOpen).toBe(true, 'Expected panel to be open.');
                    expect(instance.control.value).toBe(initialValue, 'Expected value to stay the same.');
                    expect(event.defaultPrevented).toBe(true, 'Expected default to be prevented.');
                }));
                it('should do nothing when typing on a closed multi-select', testing_2.fakeAsync(function () {
                    fixture.destroy();
                    var multiFixture = testing_2.TestBed.createComponent(MultiSelect);
                    var instance = multiFixture.componentInstance;
                    multiFixture.detectChanges();
                    select = multiFixture.debugElement.query(platform_browser_1.By.css('mat-select')).nativeElement;
                    var initialValue = instance.control.value;
                    expect(instance.select.panelOpen).toBe(false, 'Expected panel to be closed.');
                    testing_1.dispatchEvent(select, testing_1.createKeyboardEvent('keydown', 80, undefined, 'p'));
                    expect(instance.select.panelOpen).toBe(false, 'Expected panel to stay closed.');
                    expect(instance.control.value).toBe(initialValue, 'Expected value to stay the same.');
                }));
                it('should do nothing if the key manager did not change the active item', testing_2.fakeAsync(function () {
                    var formControl = fixture.componentInstance.control;
                    expect(formControl.value).toBeNull('Expected form control value to be empty.');
                    expect(formControl.pristine).toBe(true, 'Expected form control to be clean.');
                    testing_1.dispatchKeyboardEvent(select, 'keydown', 16); // Press a random key.
                    expect(formControl.value).toBeNull('Expected form control value to stay empty.');
                    expect(formControl.pristine).toBe(true, 'Expected form control to stay clean.');
                }));
                it('should continue from the selected option when the value is set programmatically', testing_2.fakeAsync(function () {
                    var formControl = fixture.componentInstance.control;
                    formControl.setValue('eggs-5');
                    fixture.detectChanges();
                    testing_1.dispatchKeyboardEvent(select, 'keydown', keycodes_1.DOWN_ARROW);
                    expect(formControl.value).toBe('pasta-6');
                    expect(fixture.componentInstance.options.toArray()[6].selected).toBe(true);
                }));
                it('should not shift focus when the selected options are updated programmatically ' +
                    'in a multi select', testing_2.fakeAsync(function () {
                    fixture.destroy();
                    var multiFixture = testing_2.TestBed.createComponent(MultiSelect);
                    multiFixture.detectChanges();
                    select = multiFixture.debugElement.query(platform_browser_1.By.css('mat-select')).nativeElement;
                    multiFixture.componentInstance.select.open();
                    multiFixture.detectChanges();
                    var options = overlayContainerElement.querySelectorAll('mat-option');
                    options[3].focus();
                    expect(document.activeElement).toBe(options[3], 'Expected fourth option to be focused.');
                    multiFixture.componentInstance.control.setValue(['steak-0', 'sushi-7']);
                    multiFixture.detectChanges();
                    expect(document.activeElement)
                        .toBe(options[3], 'Expected fourth option to remain focused.');
                }));
                it('should not cycle through the options if the control is disabled', testing_2.fakeAsync(function () {
                    var formControl = fixture.componentInstance.control;
                    formControl.setValue('eggs-5');
                    formControl.disable();
                    testing_1.dispatchKeyboardEvent(select, 'keydown', keycodes_1.DOWN_ARROW);
                    expect(formControl.value).toBe('eggs-5', 'Expected value to remain unchaged.');
                }));
                it('should not wrap selection after reaching the end of the options', testing_2.fakeAsync(function () {
                    var lastOption = fixture.componentInstance.options.last;
                    fixture.componentInstance.options.forEach(function () {
                        testing_1.dispatchKeyboardEvent(select, 'keydown', keycodes_1.DOWN_ARROW);
                    });
                    expect(lastOption.selected).toBe(true, 'Expected last option to be selected.');
                    testing_1.dispatchKeyboardEvent(select, 'keydown', keycodes_1.DOWN_ARROW);
                    expect(lastOption.selected).toBe(true, 'Expected last option to stay selected.');
                }));
                it('should not open a multiple select when tabbing through', testing_2.fakeAsync(function () {
                    fixture.destroy();
                    var multiFixture = testing_2.TestBed.createComponent(MultiSelect);
                    multiFixture.detectChanges();
                    select = multiFixture.debugElement.query(platform_browser_1.By.css('mat-select')).nativeElement;
                    expect(multiFixture.componentInstance.select.panelOpen)
                        .toBe(false, 'Expected panel to be closed initially.');
                    testing_1.dispatchKeyboardEvent(select, 'keydown', keycodes_1.TAB);
                    expect(multiFixture.componentInstance.select.panelOpen)
                        .toBe(false, 'Expected panel to stay closed.');
                }));
                it('should toggle the next option when pressing shift + DOWN_ARROW on a multi-select', testing_2.fakeAsync(function () {
                    fixture.destroy();
                    var multiFixture = testing_2.TestBed.createComponent(MultiSelect);
                    var event = testing_1.createKeyboardEvent('keydown', keycodes_1.DOWN_ARROW);
                    Object.defineProperty(event, 'shiftKey', { get: function () { return true; } });
                    multiFixture.detectChanges();
                    select = multiFixture.debugElement.query(platform_browser_1.By.css('mat-select')).nativeElement;
                    multiFixture.componentInstance.select.open();
                    multiFixture.detectChanges();
                    testing_2.flush();
                    expect(multiFixture.componentInstance.select.value).toBeFalsy();
                    testing_1.dispatchEvent(select, event);
                    multiFixture.detectChanges();
                    expect(multiFixture.componentInstance.select.value).toEqual(['pizza-1']);
                    testing_1.dispatchEvent(select, event);
                    multiFixture.detectChanges();
                    expect(multiFixture.componentInstance.select.value).toEqual(['pizza-1', 'tacos-2']);
                }));
                it('should toggle the previous option when pressing shift + UP_ARROW on a multi-select', testing_2.fakeAsync(function () {
                    fixture.destroy();
                    var multiFixture = testing_2.TestBed.createComponent(MultiSelect);
                    var event = testing_1.createKeyboardEvent('keydown', keycodes_1.UP_ARROW);
                    Object.defineProperty(event, 'shiftKey', { get: function () { return true; } });
                    multiFixture.detectChanges();
                    select = multiFixture.debugElement.query(platform_browser_1.By.css('mat-select')).nativeElement;
                    multiFixture.componentInstance.select.open();
                    multiFixture.detectChanges();
                    testing_2.flush();
                    // Move focus down first.
                    for (var i = 0; i < 5; i++) {
                        testing_1.dispatchKeyboardEvent(select, 'keydown', keycodes_1.DOWN_ARROW);
                        multiFixture.detectChanges();
                    }
                    expect(multiFixture.componentInstance.select.value).toBeFalsy();
                    testing_1.dispatchEvent(select, event);
                    multiFixture.detectChanges();
                    expect(multiFixture.componentInstance.select.value).toEqual(['chips-4']);
                    testing_1.dispatchEvent(select, event);
                    multiFixture.detectChanges();
                    expect(multiFixture.componentInstance.select.value).toEqual(['sandwich-3', 'chips-4']);
                }));
                it('should prevent the default action when pressing space', testing_2.fakeAsync(function () {
                    var event = testing_1.dispatchKeyboardEvent(select, 'keydown', keycodes_1.SPACE);
                    expect(event.defaultPrevented).toBe(true);
                }));
                it('should consider the selection a result of a user action when closed', testing_2.fakeAsync(function () {
                    var option = fixture.componentInstance.options.first;
                    var spy = jasmine.createSpy('option selection spy');
                    var subscription = option.onSelectionChange.pipe(operators_1.map(function (e) { return e.isUserInput; })).subscribe(spy);
                    testing_1.dispatchKeyboardEvent(select, 'keydown', keycodes_1.DOWN_ARROW);
                    expect(spy).toHaveBeenCalledWith(true);
                    subscription.unsubscribe();
                }));
                it('should be able to focus the select trigger', testing_2.fakeAsync(function () {
                    document.body.focus(); // ensure that focus isn't on the trigger already
                    fixture.componentInstance.select.focus();
                    expect(document.activeElement).toBe(select, 'Expected select element to be focused.');
                }));
                // Having `aria-hidden` on the trigger avoids issues where
                // screen readers read out the wrong amount of options.
                it('should set aria-hidden on the trigger element', testing_2.fakeAsync(function () {
                    var trigger = fixture.debugElement.query(platform_browser_1.By.css('.mat-select-trigger')).nativeElement;
                    expect(trigger.getAttribute('aria-hidden'))
                        .toBe('true', 'Expected aria-hidden to be true when the select is open.');
                }));
                it('should set `aria-multiselectable` to true on multi-select instances', testing_2.fakeAsync(function () {
                    fixture.destroy();
                    var multiFixture = testing_2.TestBed.createComponent(MultiSelect);
                    multiFixture.detectChanges();
                    select = multiFixture.debugElement.query(platform_browser_1.By.css('mat-select')).nativeElement;
                    expect(select.getAttribute('aria-multiselectable')).toBe('true');
                }));
                it('should set aria-multiselectable false on single-selection instances', testing_2.fakeAsync(function () {
                    expect(select.getAttribute('aria-multiselectable')).toBe('false');
                }));
                it('should set aria-activedescendant only while the panel is open', testing_2.fakeAsync(function () {
                    fixture.componentInstance.control.setValue('chips-4');
                    fixture.detectChanges();
                    var host = fixture.debugElement.query(platform_browser_1.By.css('mat-select')).nativeElement;
                    expect(host.hasAttribute('aria-activedescendant'))
                        .toBe(false, 'Expected no aria-activedescendant on init.');
                    fixture.componentInstance.select.open();
                    fixture.detectChanges();
                    testing_2.flush();
                    var options = overlayContainerElement.querySelectorAll('mat-option');
                    expect(host.getAttribute('aria-activedescendant'))
                        .toBe(options[4].id, 'Expected aria-activedescendant to match the active option.');
                    fixture.componentInstance.select.close();
                    fixture.detectChanges();
                    testing_2.flush();
                    expect(host.hasAttribute('aria-activedescendant'))
                        .toBe(false, 'Expected no aria-activedescendant when closed.');
                }));
                it('should set aria-activedescendant based on the focused option', testing_2.fakeAsync(function () {
                    var host = fixture.debugElement.query(platform_browser_1.By.css('mat-select')).nativeElement;
                    fixture.componentInstance.select.open();
                    fixture.detectChanges();
                    testing_2.flush();
                    var options = overlayContainerElement.querySelectorAll('mat-option');
                    expect(host.getAttribute('aria-activedescendant')).toBe(options[0].id);
                    [1, 2, 3].forEach(function () {
                        testing_1.dispatchKeyboardEvent(host, 'keydown', keycodes_1.DOWN_ARROW);
                        fixture.detectChanges();
                    });
                    expect(host.getAttribute('aria-activedescendant')).toBe(options[4].id);
                    testing_1.dispatchKeyboardEvent(host, 'keydown', keycodes_1.UP_ARROW);
                    fixture.detectChanges();
                    expect(host.getAttribute('aria-activedescendant')).toBe(options[3].id);
                }));
                it('should not change the aria-activedescendant using the horizontal arrow keys', testing_2.fakeAsync(function () {
                    var host = fixture.debugElement.query(platform_browser_1.By.css('mat-select')).nativeElement;
                    fixture.componentInstance.select.open();
                    fixture.detectChanges();
                    testing_2.flush();
                    var options = overlayContainerElement.querySelectorAll('mat-option');
                    expect(host.getAttribute('aria-activedescendant')).toBe(options[0].id);
                    [1, 2, 3].forEach(function () {
                        testing_1.dispatchKeyboardEvent(host, 'keydown', keycodes_1.RIGHT_ARROW);
                        fixture.detectChanges();
                    });
                    expect(host.getAttribute('aria-activedescendant')).toBe(options[0].id);
                }));
                it('should restore focus to the trigger after selecting an option in multi-select mode', testing_2.fakeAsync(function () {
                    fixture.destroy();
                    var multiFixture = testing_2.TestBed.createComponent(MultiSelect);
                    var instance = multiFixture.componentInstance;
                    multiFixture.detectChanges();
                    select = multiFixture.debugElement.query(platform_browser_1.By.css('mat-select')).nativeElement;
                    instance.select.open();
                    multiFixture.detectChanges();
                    // Ensure that the select isn't focused to begin with.
                    select.blur();
                    expect(document.activeElement).not.toBe(select, 'Expected trigger not to be focused.');
                    var option = overlayContainerElement.querySelector('mat-option');
                    option.click();
                    multiFixture.detectChanges();
                    expect(document.activeElement).toBe(select, 'Expected trigger to be focused.');
                }));
            });
            describe('for options', function () {
                var fixture;
                var trigger;
                var options;
                beforeEach(testing_2.fakeAsync(function () {
                    fixture = testing_2.TestBed.createComponent(BasicSelect);
                    fixture.detectChanges();
                    trigger = fixture.debugElement.query(platform_browser_1.By.css('.mat-select-trigger')).nativeElement;
                    trigger.click();
                    fixture.detectChanges();
                    options = overlayContainerElement.querySelectorAll('mat-option');
                }));
                it('should set the role of mat-option to option', testing_2.fakeAsync(function () {
                    expect(options[0].getAttribute('role')).toEqual('option');
                    expect(options[1].getAttribute('role')).toEqual('option');
                    expect(options[2].getAttribute('role')).toEqual('option');
                }));
                it('should set aria-selected on each option', testing_2.fakeAsync(function () {
                    expect(options[0].getAttribute('aria-selected')).toEqual('false');
                    expect(options[1].getAttribute('aria-selected')).toEqual('false');
                    expect(options[2].getAttribute('aria-selected')).toEqual('false');
                    options[1].click();
                    fixture.detectChanges();
                    trigger.click();
                    fixture.detectChanges();
                    testing_2.flush();
                    expect(options[0].getAttribute('aria-selected')).toEqual('false');
                    expect(options[1].getAttribute('aria-selected')).toEqual('true');
                    expect(options[2].getAttribute('aria-selected')).toEqual('false');
                }));
                it('should set the tabindex of each option according to disabled state', testing_2.fakeAsync(function () {
                    expect(options[0].getAttribute('tabindex')).toEqual('0');
                    expect(options[1].getAttribute('tabindex')).toEqual('0');
                    expect(options[2].getAttribute('tabindex')).toEqual('-1');
                }));
                it('should set aria-disabled for disabled options', testing_2.fakeAsync(function () {
                    expect(options[0].getAttribute('aria-disabled')).toEqual('false');
                    expect(options[1].getAttribute('aria-disabled')).toEqual('false');
                    expect(options[2].getAttribute('aria-disabled')).toEqual('true');
                    fixture.componentInstance.foods[2]['disabled'] = false;
                    fixture.detectChanges();
                    expect(options[0].getAttribute('aria-disabled')).toEqual('false');
                    expect(options[1].getAttribute('aria-disabled')).toEqual('false');
                    expect(options[2].getAttribute('aria-disabled')).toEqual('false');
                }));
            });
            describe('for option groups', function () {
                var fixture;
                var trigger;
                var groups;
                beforeEach(testing_2.fakeAsync(function () {
                    fixture = testing_2.TestBed.createComponent(SelectWithGroups);
                    fixture.detectChanges();
                    trigger = fixture.debugElement.query(platform_browser_1.By.css('.mat-select-trigger')).nativeElement;
                    trigger.click();
                    fixture.detectChanges();
                    groups = overlayContainerElement.querySelectorAll('mat-optgroup');
                }));
                it('should set the appropriate role', testing_2.fakeAsync(function () {
                    expect(groups[0].getAttribute('role')).toBe('group');
                }));
                it('should set the `aria-labelledby` attribute', testing_2.fakeAsync(function () {
                    var group = groups[0];
                    var label = (group.querySelector('label'));
                    expect(label.getAttribute('id')).toBeTruthy('Expected label to have an id.');
                    expect(group.getAttribute('aria-labelledby'))
                        .toBe(label.getAttribute('id'), 'Expected `aria-labelledby` to match the label id.');
                }));
                it('should set the `aria-disabled` attribute if the group is disabled', testing_2.fakeAsync(function () {
                    expect(groups[1].getAttribute('aria-disabled')).toBe('true');
                }));
            });
        });
        describe('overlay panel', function () {
            var fixture;
            var trigger;
            beforeEach(testing_2.fakeAsync(function () {
                fixture = testing_2.TestBed.createComponent(BasicSelect);
                fixture.detectChanges();
                trigger = fixture.debugElement.query(platform_browser_1.By.css('.mat-select-trigger')).nativeElement;
            }));
            it('should not throw when attempting to open too early', function () {
                // Create component and then immediately open without running change detection
                fixture = testing_2.TestBed.createComponent(BasicSelect);
                expect(function () { return fixture.componentInstance.select.open(); }).not.toThrow();
            });
            it('should open the panel when trigger is clicked', testing_2.fakeAsync(function () {
                trigger.click();
                fixture.detectChanges();
                testing_2.flush();
                expect(fixture.componentInstance.select.panelOpen).toBe(true);
                expect(overlayContainerElement.textContent).toContain('Steak');
                expect(overlayContainerElement.textContent).toContain('Pizza');
                expect(overlayContainerElement.textContent).toContain('Tacos');
            }));
            it('should close the panel when an item is clicked', testing_2.fakeAsync(function () {
                trigger.click();
                fixture.detectChanges();
                testing_2.flush();
                var option = overlayContainerElement.querySelector('mat-option');
                option.click();
                fixture.detectChanges();
                testing_2.flush();
                expect(overlayContainerElement.textContent).toEqual('');
                expect(fixture.componentInstance.select.panelOpen).toBe(false);
            }));
            it('should close the panel when a click occurs outside the panel', testing_2.fakeAsync(function () {
                trigger.click();
                fixture.detectChanges();
                testing_2.flush();
                var backdrop = overlayContainerElement.querySelector('.cdk-overlay-backdrop');
                backdrop.click();
                fixture.detectChanges();
                testing_2.flush();
                expect(overlayContainerElement.textContent).toEqual('');
                expect(fixture.componentInstance.select.panelOpen).toBe(false);
            }));
            it('should set the width of the overlay based on the trigger', testing_2.fakeAsync(function () {
                trigger.style.width = '200px';
                trigger.click();
                fixture.detectChanges();
                testing_2.flush();
                var pane = overlayContainerElement.querySelector('.cdk-overlay-pane');
                expect(pane.style.minWidth).toBe('200px');
            }));
            it('should not attempt to open a select that does not have any options', testing_2.fakeAsync(function () {
                fixture.componentInstance.foods = [];
                fixture.detectChanges();
                trigger.click();
                fixture.detectChanges();
                expect(fixture.componentInstance.select.panelOpen).toBe(false);
            }));
            it('should close the panel when tabbing out', testing_2.fakeAsync(function () {
                trigger.click();
                fixture.detectChanges();
                testing_2.flush();
                expect(fixture.componentInstance.select.panelOpen).toBe(true);
                testing_1.dispatchKeyboardEvent(trigger, 'keydown', keycodes_1.TAB);
                fixture.detectChanges();
                testing_2.flush();
                expect(fixture.componentInstance.select.panelOpen).toBe(false);
            }));
            it('should restore focus to the host before tabbing away', testing_2.fakeAsync(function () {
                var select = fixture.nativeElement.querySelector('.mat-select');
                trigger.click();
                fixture.detectChanges();
                testing_2.flush();
                expect(fixture.componentInstance.select.panelOpen).toBe(true);
                // Use a spy since focus can be flaky in unit tests.
                spyOn(select, 'focus').and.callThrough();
                testing_1.dispatchKeyboardEvent(trigger, 'keydown', keycodes_1.TAB);
                fixture.detectChanges();
                testing_2.flush();
                expect(select.focus).toHaveBeenCalled();
            }));
            it('should close when tabbing out from inside the panel', testing_2.fakeAsync(function () {
                trigger.click();
                fixture.detectChanges();
                testing_2.flush();
                expect(fixture.componentInstance.select.panelOpen).toBe(true);
                var panel = (overlayContainerElement.querySelector('.mat-select-panel'));
                testing_1.dispatchKeyboardEvent(panel, 'keydown', keycodes_1.TAB);
                fixture.detectChanges();
                testing_2.flush();
                expect(fixture.componentInstance.select.panelOpen).toBe(false);
            }));
            it('should focus the first option when pressing HOME', testing_2.fakeAsync(function () {
                fixture.componentInstance.control.setValue('pizza-1');
                fixture.detectChanges();
                trigger.click();
                fixture.detectChanges();
                testing_2.flush();
                var event = testing_1.dispatchKeyboardEvent(trigger, 'keydown', keycodes_1.HOME);
                fixture.detectChanges();
                expect(fixture.componentInstance.select._keyManager.activeItemIndex).toBe(0);
                expect(event.defaultPrevented).toBe(true);
            }));
            it('should focus the last option when pressing END', testing_2.fakeAsync(function () {
                fixture.componentInstance.control.setValue('pizza-1');
                fixture.detectChanges();
                trigger.click();
                fixture.detectChanges();
                testing_2.flush();
                var event = testing_1.dispatchKeyboardEvent(trigger, 'keydown', keycodes_1.END);
                fixture.detectChanges();
                expect(fixture.componentInstance.select._keyManager.activeItemIndex).toBe(7);
                expect(event.defaultPrevented).toBe(true);
            }));
            it('should be able to set extra classes on the panel', testing_2.fakeAsync(function () {
                trigger.click();
                fixture.detectChanges();
                var panel = overlayContainerElement.querySelector('.mat-select-panel');
                expect(panel.classList).toContain('custom-one');
                expect(panel.classList).toContain('custom-two');
            }));
            it('should prevent the default action when pressing SPACE on an option', testing_2.fakeAsync(function () {
                trigger.click();
                fixture.detectChanges();
                var option = (overlayContainerElement.querySelector('mat-option'));
                var event = testing_1.dispatchKeyboardEvent(option, 'keydown', keycodes_1.SPACE);
                expect(event.defaultPrevented).toBe(true);
            }));
            it('should prevent the default action when pressing ENTER on an option', testing_2.fakeAsync(function () {
                trigger.click();
                fixture.detectChanges();
                var option = (overlayContainerElement.querySelector('mat-option'));
                var event = testing_1.dispatchKeyboardEvent(option, 'keydown', keycodes_1.ENTER);
                expect(event.defaultPrevented).toBe(true);
            }));
            it('should update disableRipple properly on each option', testing_2.fakeAsync(function () {
                var options = fixture.componentInstance.options.toArray();
                expect(options.every(function (option) { return option.disableRipple === false; }))
                    .toBeTruthy('Expected all options to have disableRipple set to false initially.');
                fixture.componentInstance.disableRipple = true;
                fixture.detectChanges();
                expect(options.every(function (option) { return option.disableRipple === true; }))
                    .toBeTruthy('Expected all options to have disableRipple set to true.');
            }));
            it('should not show ripples if they were disabled', testing_2.fakeAsync(function () {
                fixture.componentInstance.disableRipple = true;
                fixture.detectChanges();
                trigger.click();
                fixture.detectChanges();
                testing_2.flush();
                var option = (overlayContainerElement.querySelector('mat-option'));
                testing_1.dispatchFakeEvent(option, 'mousedown');
                testing_1.dispatchFakeEvent(option, 'mouseup');
                expect(option.querySelectorAll('.mat-ripple-element').length).toBe(0);
            }));
            it('should be able to render options inside groups with an ng-container', testing_2.fakeAsync(function () {
                fixture.destroy();
                var groupFixture = testing_2.TestBed.createComponent(SelectWithGroupsAndNgContainer);
                groupFixture.detectChanges();
                trigger = groupFixture.debugElement.query(platform_browser_1.By.css('.mat-select-trigger')).nativeElement;
                trigger.click();
                groupFixture.detectChanges();
                expect(document.querySelectorAll('.cdk-overlay-container mat-option').length)
                    .toBeGreaterThan(0, 'Expected at least one option to be rendered.');
            }));
            it('should not consider itself as blurred if the trigger loses focus while the ' +
                'panel is still open', testing_2.fakeAsync(function () {
                var selectElement = fixture.nativeElement.querySelector('.mat-select');
                var selectInstance = fixture.componentInstance.select;
                testing_1.dispatchFakeEvent(selectElement, 'focus');
                fixture.detectChanges();
                expect(selectInstance.focused).toBe(true, 'Expected select to be focused.');
                selectInstance.open();
                fixture.detectChanges();
                testing_2.flush();
                testing_1.dispatchFakeEvent(selectElement, 'blur');
                fixture.detectChanges();
                expect(selectInstance.focused).toBe(true, 'Expected select element to remain focused.');
            }));
        });
        describe('selection logic', function () {
            var fixture;
            var trigger;
            var formField;
            beforeEach(testing_2.fakeAsync(function () {
                fixture = testing_2.TestBed.createComponent(BasicSelect);
                fixture.detectChanges();
                trigger = fixture.debugElement.query(platform_browser_1.By.css('.mat-select-trigger')).nativeElement;
                formField = fixture.debugElement.query(platform_browser_1.By.css('.mat-form-field')).nativeElement;
            }));
            it('should not float label if no option is selected', testing_2.fakeAsync(function () {
                expect(formField.classList.contains('mat-form-field-should-float'))
                    .toBe(false, 'Label should not be floating');
            }));
            it('should focus the first option if no option is selected', testing_2.fakeAsync(function () {
                trigger.click();
                fixture.detectChanges();
                testing_2.flush();
                expect(fixture.componentInstance.select._keyManager.activeItemIndex).toEqual(0);
            }));
            it('should select an option when it is clicked', testing_2.fakeAsync(function () {
                trigger.click();
                fixture.detectChanges();
                testing_2.flush();
                var option = overlayContainerElement.querySelector('mat-option');
                option.click();
                fixture.detectChanges();
                testing_2.flush();
                trigger.click();
                fixture.detectChanges();
                testing_2.flush();
                option = overlayContainerElement.querySelector('mat-option');
                expect(option.classList).toContain('mat-selected');
                expect(fixture.componentInstance.options.first.selected).toBe(true);
                expect(fixture.componentInstance.select.selected)
                    .toBe(fixture.componentInstance.options.first);
            }));
            it('should be able to select an option using the MatOption API', testing_2.fakeAsync(function () {
                trigger.click();
                fixture.detectChanges();
                testing_2.flush();
                var optionInstances = fixture.componentInstance.options.toArray();
                var optionNodes = overlayContainerElement.querySelectorAll('mat-option');
                optionInstances[1].select();
                fixture.detectChanges();
                expect(optionNodes[1].classList).toContain('mat-selected');
                expect(optionInstances[1].selected).toBe(true);
                expect(fixture.componentInstance.select.selected).toBe(optionInstances[1]);
            }));
            it('should deselect other options when one is selected', testing_2.fakeAsync(function () {
                trigger.click();
                fixture.detectChanges();
                testing_2.flush();
                var options = overlayContainerElement.querySelectorAll('mat-option');
                options[0].click();
                fixture.detectChanges();
                testing_2.flush();
                trigger.click();
                fixture.detectChanges();
                testing_2.flush();
                options = overlayContainerElement.querySelectorAll('mat-option');
                expect(options[1].classList).not.toContain('mat-selected');
                expect(options[2].classList).not.toContain('mat-selected');
                var optionInstances = fixture.componentInstance.options.toArray();
                expect(optionInstances[1].selected).toBe(false);
                expect(optionInstances[2].selected).toBe(false);
            }));
            it('should deselect other options when one is programmatically selected', testing_2.fakeAsync(function () {
                var control = fixture.componentInstance.control;
                var foods = fixture.componentInstance.foods;
                trigger.click();
                fixture.detectChanges();
                testing_2.flush();
                var options = overlayContainerElement.querySelectorAll('mat-option');
                options[0].click();
                fixture.detectChanges();
                testing_2.flush();
                control.setValue(foods[1].value);
                fixture.detectChanges();
                trigger.click();
                fixture.detectChanges();
                testing_2.flush();
                options = overlayContainerElement.querySelectorAll('mat-option');
                expect(options[0].classList)
                    .not.toContain('mat-selected', 'Expected first option to no longer be selected');
                expect(options[1].classList)
                    .toContain('mat-selected', 'Expected second option to be selected');
                var optionInstances = fixture.componentInstance.options.toArray();
                expect(optionInstances[0].selected)
                    .toBe(false, 'Expected first option to no longer be selected');
                expect(optionInstances[1].selected)
                    .toBe(true, 'Expected second option to be selected');
            }));
            it('should remove selection if option has been removed', testing_2.fakeAsync(function () {
                var select = fixture.componentInstance.select;
                trigger.click();
                fixture.detectChanges();
                testing_2.flush();
                var firstOption = overlayContainerElement.querySelectorAll('mat-option')[0];
                firstOption.click();
                fixture.detectChanges();
                expect(select.selected).toBe(select.options.first, 'Expected first option to be selected.');
                fixture.componentInstance.foods = [];
                fixture.detectChanges();
                testing_2.flush();
                expect(select.selected)
                    .toBeUndefined('Expected selection to be removed when option no longer exists.');
            }));
            it('should display the selected option in the trigger', testing_2.fakeAsync(function () {
                trigger.click();
                fixture.detectChanges();
                testing_2.flush();
                var option = overlayContainerElement.querySelector('mat-option');
                option.click();
                fixture.detectChanges();
                testing_2.flush();
                var value = fixture.debugElement.query(platform_browser_1.By.css('.mat-select-value')).nativeElement;
                expect(formField.classList.contains('mat-form-field-should-float'))
                    .toBe(true, 'Label should be floating');
                expect(value.textContent).toContain('Steak');
            }));
            it('should focus the selected option if an option is selected', testing_2.fakeAsync(function () {
                // must wait for initial writeValue promise to finish
                // must wait for initial writeValue promise to finish
                testing_2.flush();
                fixture.componentInstance.control.setValue('pizza-1');
                fixture.detectChanges();
                trigger.click();
                fixture.detectChanges();
                testing_2.flush();
                // must wait for animation to finish
                fixture.detectChanges();
                expect(fixture.componentInstance.select._keyManager.activeItemIndex).toEqual(1);
            }));
            it('should select an option that was added after initialization', testing_2.fakeAsync(function () {
                fixture.componentInstance.foods.push({ viewValue: 'Potatoes', value: 'potatoes-8' });
                trigger.click();
                fixture.detectChanges();
                testing_2.flush();
                var options = overlayContainerElement.querySelectorAll('mat-option');
                options[8].click();
                fixture.detectChanges();
                testing_2.flush();
                expect(trigger.textContent).toContain('Potatoes');
                expect(fixture.componentInstance.select.selected)
                    .toBe(fixture.componentInstance.options.last);
            }));
            it('should update the trigger when the selected option label is changed', testing_2.fakeAsync(function () {
                fixture.componentInstance.control.setValue('pizza-1');
                fixture.detectChanges();
                expect(trigger.textContent.trim()).toBe('Pizza');
                fixture.componentInstance.foods[1].viewValue = 'Calzone';
                fixture.detectChanges();
                expect(trigger.textContent.trim()).toBe('Calzone');
            }));
            it('should not select disabled options', testing_2.fakeAsync(function () {
                trigger.click();
                fixture.detectChanges();
                var options = overlayContainerElement.querySelectorAll('mat-option');
                options[2].click();
                fixture.detectChanges();
                expect(fixture.componentInstance.select.panelOpen).toBe(true);
                expect(options[2].classList).not.toContain('mat-selected');
                expect(fixture.componentInstance.select.selected).toBeUndefined();
            }));
            it('should not select options inside a disabled group', testing_2.fakeAsync(function () {
                fixture.destroy();
                var groupFixture = testing_2.TestBed.createComponent(SelectWithGroups);
                groupFixture.detectChanges();
                groupFixture.debugElement.query(platform_browser_1.By.css('.mat-select-trigger')).nativeElement.click();
                groupFixture.detectChanges();
                var disabledGroup = overlayContainerElement.querySelectorAll('mat-optgroup')[1];
                var options = disabledGroup.querySelectorAll('mat-option');
                options[0].click();
                groupFixture.detectChanges();
                expect(groupFixture.componentInstance.select.panelOpen).toBe(true);
                expect(options[0].classList).not.toContain('mat-selected');
                expect(groupFixture.componentInstance.select.selected).toBeUndefined();
            }));
            it('should not throw if triggerValue accessed with no selected value', testing_2.fakeAsync(function () {
                expect(function () { return fixture.componentInstance.select.triggerValue; }).not.toThrow();
            }));
            it('should emit to `optionSelectionChanges` when an option is selected', testing_2.fakeAsync(function () {
                trigger.click();
                fixture.detectChanges();
                testing_2.flush();
                var spy = jasmine.createSpy('option selection spy');
                var subscription = fixture.componentInstance.select.optionSelectionChanges.subscribe(spy);
                var option = overlayContainerElement.querySelector('mat-option');
                option.click();
                fixture.detectChanges();
                testing_2.flush();
                expect(spy).toHaveBeenCalledWith(jasmine.any(core_2.MatOptionSelectionChange));
                subscription.unsubscribe();
            }));
            it('should handle accessing `optionSelectionChanges` before the options are initialized', testing_2.fakeAsync(function () {
                fixture.destroy();
                fixture = testing_2.TestBed.createComponent(BasicSelect);
                var spy = jasmine.createSpy('option selection spy');
                var subscription;
                expect(fixture.componentInstance.select.options).toBeFalsy();
                expect(function () {
                    subscription = fixture.componentInstance.select.optionSelectionChanges.subscribe(spy);
                }).not.toThrow();
                fixture.detectChanges();
                trigger = fixture.debugElement.query(platform_browser_1.By.css('.mat-select-trigger')).nativeElement;
                trigger.click();
                fixture.detectChanges();
                testing_2.flush();
                var option = overlayContainerElement.querySelector('mat-option');
                option.click();
                fixture.detectChanges();
                testing_2.flush();
                expect(spy).toHaveBeenCalledWith(jasmine.any(core_2.MatOptionSelectionChange));
                subscription.unsubscribe();
            }));
        });
        describe('forms integration', function () {
            var fixture;
            var trigger;
            beforeEach(testing_2.fakeAsync(function () {
                fixture = testing_2.TestBed.createComponent(BasicSelect);
                fixture.detectChanges();
                trigger = fixture.debugElement.query(platform_browser_1.By.css('.mat-select-trigger')).nativeElement;
            }));
            it('should take an initial view value with reactive forms', testing_2.fakeAsync(function () {
                fixture.componentInstance.control = new forms_1.FormControl('pizza-1');
                fixture.detectChanges();
                var value = fixture.debugElement.query(platform_browser_1.By.css('.mat-select-value'));
                expect(value.nativeElement.textContent)
                    .toContain('Pizza', "Expected trigger to be populated by the control's initial value.");
                trigger = fixture.debugElement.query(platform_browser_1.By.css('.mat-select-trigger')).nativeElement;
                trigger.click();
                fixture.detectChanges();
                testing_2.flush();
                var options = overlayContainerElement.querySelectorAll('mat-option');
                expect(options[1].classList)
                    .toContain('mat-selected', "Expected option with the control's initial value to be selected.");
            }));
            it('should set the view value from the form', testing_2.fakeAsync(function () {
                var value = fixture.debugElement.query(platform_browser_1.By.css('.mat-select-value'));
                expect(value.nativeElement.textContent.trim()).toBe('Food');
                fixture.componentInstance.control.setValue('pizza-1');
                fixture.detectChanges();
                value = fixture.debugElement.query(platform_browser_1.By.css('.mat-select-value'));
                expect(value.nativeElement.textContent)
                    .toContain('Pizza', "Expected trigger to be populated by the control's new value.");
                trigger.click();
                fixture.detectChanges();
                testing_2.flush();
                var options = overlayContainerElement.querySelectorAll('mat-option');
                expect(options[1].classList).toContain('mat-selected', "Expected option with the control's new value to be selected.");
            }));
            it('should update the form value when the view changes', testing_2.fakeAsync(function () {
                expect(fixture.componentInstance.control.value)
                    .toEqual(null, "Expected the control's value to be empty initially.");
                trigger.click();
                fixture.detectChanges();
                testing_2.flush();
                var option = overlayContainerElement.querySelector('mat-option');
                option.click();
                fixture.detectChanges();
                testing_2.flush();
                expect(fixture.componentInstance.control.value)
                    .toEqual('steak-0', "Expected control's value to be set to the new option.");
            }));
            it('should clear the selection when a nonexistent option value is selected', testing_2.fakeAsync(function () {
                fixture.componentInstance.control.setValue('pizza-1');
                fixture.detectChanges();
                fixture.componentInstance.control.setValue('gibberish');
                fixture.detectChanges();
                var value = fixture.debugElement.query(platform_browser_1.By.css('.mat-select-value'));
                expect(value.nativeElement.textContent.trim())
                    .toBe('Food', "Expected trigger to show the placeholder.");
                expect(trigger.textContent)
                    .not.toContain('Pizza', "Expected trigger is cleared when option value is not found.");
                trigger.click();
                fixture.detectChanges();
                testing_2.flush();
                var options = overlayContainerElement.querySelectorAll('mat-option');
                expect(options[1].classList)
                    .not.toContain('mat-selected', "Expected option w/ the old value not to be selected.");
            }));
            it('should clear the selection when the control is reset', testing_2.fakeAsync(function () {
                fixture.componentInstance.control.setValue('pizza-1');
                fixture.detectChanges();
                fixture.componentInstance.control.reset();
                fixture.detectChanges();
                var value = fixture.debugElement.query(platform_browser_1.By.css('.mat-select-value'));
                expect(value.nativeElement.textContent.trim())
                    .toBe('Food', "Expected trigger to show the placeholder.");
                expect(trigger.textContent)
                    .not.toContain('Pizza', "Expected trigger is cleared when option value is not found.");
                trigger.click();
                fixture.detectChanges();
                testing_2.flush();
                var options = overlayContainerElement.querySelectorAll('mat-option');
                expect(options[1].classList)
                    .not.toContain('mat-selected', "Expected option w/ the old value not to be selected.");
            }));
            it('should set the control to touched when the select is blurred', testing_2.fakeAsync(function () {
                expect(fixture.componentInstance.control.touched)
                    .toEqual(false, "Expected the control to start off as untouched.");
                trigger.click();
                testing_1.dispatchFakeEvent(trigger, 'blur');
                fixture.detectChanges();
                testing_2.flush();
                expect(fixture.componentInstance.control.touched)
                    .toEqual(false, "Expected the control to stay untouched when menu opened.");
                var backdrop = overlayContainerElement.querySelector('.cdk-overlay-backdrop');
                backdrop.click();
                testing_1.dispatchFakeEvent(trigger, 'blur');
                fixture.detectChanges();
                testing_2.flush();
                expect(fixture.componentInstance.control.touched)
                    .toEqual(true, "Expected the control to be touched as soon as focus left the select.");
            }));
            it('should set the control to touched when the panel is closed', testing_2.fakeAsync(function () {
                expect(fixture.componentInstance.control.touched)
                    .toBe(false, 'Expected the control to start off as untouched.');
                trigger.click();
                testing_1.dispatchFakeEvent(trigger, 'blur');
                fixture.detectChanges();
                testing_2.flush();
                expect(fixture.componentInstance.control.touched)
                    .toBe(false, 'Expected the control to stay untouched when menu opened.');
                fixture.componentInstance.select.close();
                fixture.detectChanges();
                testing_2.flush();
                expect(fixture.componentInstance.control.touched)
                    .toBe(true, 'Expected the control to be touched when the panel was closed.');
            }));
            it('should not set touched when a disabled select is touched', testing_2.fakeAsync(function () {
                expect(fixture.componentInstance.control.touched)
                    .toBe(false, 'Expected the control to start off as untouched.');
                fixture.componentInstance.control.disable();
                testing_1.dispatchFakeEvent(trigger, 'blur');
                expect(fixture.componentInstance.control.touched)
                    .toBe(false, 'Expected the control to stay untouched.');
            }));
            it('should set the control to dirty when the select value changes in DOM', testing_2.fakeAsync(function () {
                expect(fixture.componentInstance.control.dirty)
                    .toEqual(false, "Expected control to start out pristine.");
                trigger.click();
                fixture.detectChanges();
                testing_2.flush();
                var option = overlayContainerElement.querySelector('mat-option');
                option.click();
                fixture.detectChanges();
                testing_2.flush();
                expect(fixture.componentInstance.control.dirty)
                    .toEqual(true, "Expected control to be dirty after value was changed by user.");
            }));
            it('should not set the control to dirty when the value changes programmatically', testing_2.fakeAsync(function () {
                expect(fixture.componentInstance.control.dirty)
                    .toEqual(false, "Expected control to start out pristine.");
                fixture.componentInstance.control.setValue('pizza-1');
                expect(fixture.componentInstance.control.dirty)
                    .toEqual(false, "Expected control to stay pristine after programmatic change.");
            }));
            it('should set an asterisk after the label if control is required', testing_2.fakeAsync(function () {
                var requiredMarker = fixture.debugElement.query(platform_browser_1.By.css('.mat-form-field-required-marker'));
                expect(requiredMarker)
                    .toBeNull("Expected label not to have an asterisk, as control was not required.");
                fixture.componentInstance.isRequired = true;
                fixture.detectChanges();
                requiredMarker = fixture.debugElement.query(platform_browser_1.By.css('.mat-form-field-required-marker'));
                expect(requiredMarker)
                    .not.toBeNull("Expected label to have an asterisk, as control was required.");
            }));
        });
        describe('disabled behavior', function () {
            it('should disable itself when control is disabled programmatically', testing_2.fakeAsync(function () {
                var fixture = testing_2.TestBed.createComponent(BasicSelect);
                fixture.detectChanges();
                fixture.componentInstance.control.disable();
                fixture.detectChanges();
                var trigger = fixture.debugElement.query(platform_browser_1.By.css('.mat-select-trigger')).nativeElement;
                expect(getComputedStyle(trigger).getPropertyValue('cursor'))
                    .toEqual('default', "Expected cursor to be default arrow on disabled control.");
                trigger.click();
                fixture.detectChanges();
                expect(overlayContainerElement.textContent)
                    .toEqual('', "Expected select panel to stay closed.");
                expect(fixture.componentInstance.select.panelOpen)
                    .toBe(false, "Expected select panelOpen property to stay false.");
                fixture.componentInstance.control.enable();
                fixture.detectChanges();
                expect(getComputedStyle(trigger).getPropertyValue('cursor'))
                    .toEqual('pointer', "Expected cursor to be a pointer on enabled control.");
                trigger.click();
                fixture.detectChanges();
                expect(overlayContainerElement.textContent)
                    .toContain('Steak', "Expected select panel to open normally on re-enabled control");
                expect(fixture.componentInstance.select.panelOpen)
                    .toBe(true, "Expected select panelOpen property to become true.");
            }));
        });
        describe('animations', function () {
            var fixture;
            var trigger;
            var formField;
            beforeEach(testing_2.fakeAsync(function () {
                fixture = testing_2.TestBed.createComponent(BasicSelect);
                fixture.detectChanges();
                trigger = fixture.debugElement.query(platform_browser_1.By.css('.mat-select-trigger')).nativeElement;
                formField = fixture.debugElement.query(platform_browser_1.By.css('.mat-form-field')).nativeElement;
            }));
            it('should float the label when the panel is open and unselected', testing_2.fakeAsync(function () {
                expect(formField.classList.contains('mat-form-field-should-float'))
                    .toBe(false, 'Expected label to initially have a normal position.');
                fixture.componentInstance.select.open();
                fixture.detectChanges();
                testing_2.flush();
                expect(formField.classList).toContain('mat-form-field-should-float', 'Expected label to animate up to floating position.');
                fixture.componentInstance.select.close();
                fixture.detectChanges();
                testing_2.flush();
                expect(formField.classList).not.toContain('mat-form-field-should-float', 'Expected placeholder to animate back down to normal position.');
            }));
            it('should add a class to the panel when the menu is done animating', testing_2.fakeAsync(function () {
                trigger.click();
                fixture.detectChanges();
                var panel = (overlayContainerElement.querySelector('.mat-select-panel'));
                expect(panel.classList).not.toContain('mat-select-panel-done-animating');
                testing_2.flush();
                fixture.detectChanges();
                expect(panel.classList).toContain('mat-select-panel-done-animating');
            }));
        });
        describe('keyboard scrolling', function () {
            var fixture;
            var host;
            var panel;
            beforeEach(testing_2.fakeAsync(function () {
                fixture = testing_2.TestBed.createComponent(BasicSelect);
                fixture.componentInstance.foods = [];
                for (var i = 0; i < 30; i++) {
                    fixture.componentInstance.foods.push({ value: "value-" + i, viewValue: "Option " + i });
                }
                fixture.detectChanges();
                fixture.componentInstance.select.open();
                fixture.detectChanges();
                testing_2.flush();
                host = fixture.debugElement.query(platform_browser_1.By.css('mat-select')).nativeElement;
                panel = overlayContainerElement.querySelector('.mat-select-panel');
            }));
            it('should not scroll to options that are completely in the view', testing_2.fakeAsync(function () {
                var initialScrollPosition = panel.scrollTop;
                [1, 2, 3].forEach(function () {
                    testing_1.dispatchKeyboardEvent(host, 'keydown', keycodes_1.DOWN_ARROW);
                });
                expect(panel.scrollTop)
                    .toBe(initialScrollPosition, 'Expected scroll position not to change');
            }));
            it('should scroll down to the active option', testing_2.fakeAsync(function () {
                for (var i = 0; i < 15; i++) {
                    testing_1.dispatchKeyboardEvent(host, 'keydown', keycodes_1.DOWN_ARROW);
                }
                // <option index * height> - <panel height> = 16 * 48 - 256 = 512
                expect(panel.scrollTop).toBe(512, 'Expected scroll to be at the 16th option.');
            }));
            it('should scroll up to the active option', testing_2.fakeAsync(function () {
                // Scroll to the bottom.
                for (var i = 0; i < fixture.componentInstance.foods.length; i++) {
                    testing_1.dispatchKeyboardEvent(host, 'keydown', keycodes_1.DOWN_ARROW);
                }
                for (var i = 0; i < 20; i++) {
                    testing_1.dispatchKeyboardEvent(host, 'keydown', keycodes_1.UP_ARROW);
                }
                // <option index * height> = 9 * 48 = 432
                expect(panel.scrollTop).toBe(432, 'Expected scroll to be at the 9th option.');
            }));
            it('should skip option group labels', testing_2.fakeAsync(function () {
                fixture.destroy();
                var groupFixture = testing_2.TestBed.createComponent(SelectWithGroups);
                groupFixture.detectChanges();
                groupFixture.componentInstance.select.open();
                groupFixture.detectChanges();
                testing_2.flush();
                host = groupFixture.debugElement.query(platform_browser_1.By.css('mat-select')).nativeElement;
                panel = overlayContainerElement.querySelector('.mat-select-panel');
                for (var i = 0; i < 5; i++) {
                    testing_1.dispatchKeyboardEvent(host, 'keydown', keycodes_1.DOWN_ARROW);
                }
                // Note that we press down 5 times, but it will skip
                // 3 options because the second group is disabled.
                // <(option index + group labels) * height> - <panel height> = (9 + 3) * 48 - 256 = 320
                expect(panel.scrollTop).toBe(320, 'Expected scroll to be at the 9th option.');
            }));
            it('should scroll top the top when pressing HOME', testing_2.fakeAsync(function () {
                for (var i = 0; i < 20; i++) {
                    testing_1.dispatchKeyboardEvent(host, 'keydown', keycodes_1.DOWN_ARROW);
                    fixture.detectChanges();
                }
                expect(panel.scrollTop).toBeGreaterThan(0, 'Expected panel to be scrolled down.');
                testing_1.dispatchKeyboardEvent(host, 'keydown', keycodes_1.HOME);
                fixture.detectChanges();
                expect(panel.scrollTop).toBe(0, 'Expected panel to be scrolled to the top');
            }));
            it('should scroll to the bottom of the panel when pressing END', testing_2.fakeAsync(function () {
                testing_1.dispatchKeyboardEvent(host, 'keydown', keycodes_1.END);
                fixture.detectChanges();
                // <option amount> * <option height> - <panel height> = 30 * 48 - 256 = 1184
                expect(panel.scrollTop).toBe(1184, 'Expected panel to be scrolled to the bottom');
            }));
            it('should scroll to the active option when typing', testing_2.fakeAsync(function () {
                for (var i = 0; i < 15; i++) {
                    // Press the letter 'o' 15 times since all the options are named 'Option <index>'
                    // Press the letter 'o' 15 times since all the options are named 'Option <index>'
                    testing_1.dispatchEvent(host, testing_1.createKeyboardEvent('keydown', 79, undefined, 'o'));
                    fixture.detectChanges();
                    testing_2.tick(LETTER_KEY_DEBOUNCE_INTERVAL);
                }
                testing_2.flush();
                // <option index * height> - <panel height> = 16 * 48 - 256 = 512
                expect(panel.scrollTop).toBe(512, 'Expected scroll to be at the 16th option.');
            }));
        });
    });
    describe('when initialized without options', function () {
        beforeEach(testing_2.async(function () { return configureMatSelectTestingModule([SelectInitWithoutOptions]); }));
        it('should select the proper option when option list is initialized later', testing_2.fakeAsync(function () {
            var fixture = testing_2.TestBed.createComponent(SelectInitWithoutOptions);
            var instance = fixture.componentInstance;
            fixture.detectChanges();
            testing_2.flush();
            // Wait for the initial writeValue promise.
            expect(instance.select.selected).toBeFalsy();
            instance.addOptions();
            fixture.detectChanges();
            testing_2.flush();
            // Wait for the next writeValue promise.
            expect(instance.select.selected).toBe(instance.options.toArray()[1]);
        }));
    });
    describe('with a selectionChange event handler', function () {
        beforeEach(testing_2.async(function () { return configureMatSelectTestingModule([SelectWithChangeEvent]); }));
        var fixture;
        var trigger;
        beforeEach(testing_2.fakeAsync(function () {
            fixture = testing_2.TestBed.createComponent(SelectWithChangeEvent);
            fixture.detectChanges();
            trigger = fixture.debugElement.query(platform_browser_1.By.css('.mat-select-trigger')).nativeElement;
        }));
        it('should emit an event when the selected option has changed', testing_2.fakeAsync(function () {
            trigger.click();
            fixture.detectChanges();
            overlayContainerElement.querySelector('mat-option').click();
            expect(fixture.componentInstance.changeListener).toHaveBeenCalled();
        }));
        it('should not emit multiple change events for the same option', testing_2.fakeAsync(function () {
            trigger.click();
            fixture.detectChanges();
            var option = overlayContainerElement.querySelector('mat-option');
            option.click();
            option.click();
            expect(fixture.componentInstance.changeListener).toHaveBeenCalledTimes(1);
        }));
        it('should only emit one event when pressing arrow keys on closed select', testing_2.fakeAsync(function () {
            var select = fixture.debugElement.query(platform_browser_1.By.css('mat-select')).nativeElement;
            testing_1.dispatchKeyboardEvent(select, 'keydown', keycodes_1.DOWN_ARROW);
            expect(fixture.componentInstance.changeListener).toHaveBeenCalledTimes(1);
        }));
    });
    describe('with ngModel', function () {
        beforeEach(testing_2.async(function () { return configureMatSelectTestingModule([NgModelSelect]); }));
        it('should disable itself when control is disabled using the property', testing_2.fakeAsync(function () {
            var fixture = testing_2.TestBed.createComponent(NgModelSelect);
            fixture.detectChanges();
            fixture.componentInstance.isDisabled = true;
            fixture.detectChanges();
            testing_2.flush();
            fixture.detectChanges();
            var trigger = fixture.debugElement.query(platform_browser_1.By.css('.mat-select-trigger')).nativeElement;
            expect(getComputedStyle(trigger).getPropertyValue('cursor'))
                .toEqual('default', "Expected cursor to be default arrow on disabled control.");
            trigger.click();
            fixture.detectChanges();
            expect(overlayContainerElement.textContent)
                .toEqual('', "Expected select panel to stay closed.");
            expect(fixture.componentInstance.select.panelOpen)
                .toBe(false, "Expected select panelOpen property to stay false.");
            fixture.componentInstance.isDisabled = false;
            fixture.detectChanges();
            testing_2.flush();
            fixture.detectChanges();
            expect(getComputedStyle(trigger).getPropertyValue('cursor'))
                .toEqual('pointer', "Expected cursor to be a pointer on enabled control.");
            trigger.click();
            fixture.detectChanges();
            expect(overlayContainerElement.textContent)
                .toContain('Steak', "Expected select panel to open normally on re-enabled control");
            expect(fixture.componentInstance.select.panelOpen)
                .toBe(true, "Expected select panelOpen property to become true.");
        }));
    });
    describe('with ngIf', function () {
        beforeEach(testing_2.async(function () { return configureMatSelectTestingModule([NgIfSelect]); }));
        it('should handle nesting in an ngIf', testing_2.fakeAsync(function () {
            var fixture = testing_2.TestBed.createComponent(NgIfSelect);
            fixture.detectChanges();
            fixture.componentInstance.isShowing = true;
            fixture.detectChanges();
            var trigger = fixture.debugElement.query(platform_browser_1.By.css('.mat-select-trigger')).nativeElement;
            trigger.style.width = '300px';
            trigger.click();
            fixture.detectChanges();
            testing_2.flush();
            var value = fixture.debugElement.query(platform_browser_1.By.css('.mat-select-value'));
            expect(value.nativeElement.textContent)
                .toContain('Pizza', "Expected trigger to be populated by the control's initial value.");
            var pane = overlayContainerElement.querySelector('.cdk-overlay-pane');
            expect(pane.style.minWidth).toEqual('300px');
            expect(fixture.componentInstance.select.panelOpen).toBe(true);
            expect(overlayContainerElement.textContent).toContain('Steak');
            expect(overlayContainerElement.textContent).toContain('Pizza');
            expect(overlayContainerElement.textContent).toContain('Tacos');
        }));
    });
    describe('with multiple mat-select elements in one view', function () {
        beforeEach(testing_2.async(function () { return configureMatSelectTestingModule([ManySelects]); }));
        var fixture;
        var triggers;
        var options;
        beforeEach(testing_2.fakeAsync(function () {
            fixture = testing_2.TestBed.createComponent(ManySelects);
            fixture.detectChanges();
            triggers = fixture.debugElement.queryAll(platform_browser_1.By.css('.mat-select-trigger'));
            triggers[0].nativeElement.click();
            fixture.detectChanges();
            testing_2.flush();
            options = overlayContainerElement.querySelectorAll('mat-option');
        }));
        it('should set aria-owns properly', testing_2.fakeAsync(function () {
            var selects = fixture.debugElement.queryAll(platform_browser_1.By.css('mat-select'));
            expect(selects[0].nativeElement.getAttribute('aria-owns'))
                .toContain(options[0].id, "Expected aria-owns to contain IDs of its child options.");
            expect(selects[0].nativeElement.getAttribute('aria-owns'))
                .toContain(options[1].id, "Expected aria-owns to contain IDs of its child options.");
            var backdrop = overlayContainerElement.querySelector('.cdk-overlay-backdrop');
            backdrop.click();
            fixture.detectChanges();
            testing_2.flush();
            triggers[1].nativeElement.click();
            fixture.detectChanges();
            testing_2.flush();
            options = overlayContainerElement.querySelectorAll('mat-option');
            expect(selects[1].nativeElement.getAttribute('aria-owns'))
                .toContain(options[0].id, "Expected aria-owns to contain IDs of its child options.");
            expect(selects[1].nativeElement.getAttribute('aria-owns'))
                .toContain(options[1].id, "Expected aria-owns to contain IDs of its child options.");
        }));
        it('should remove aria-owns when the options are not visible', testing_2.fakeAsync(function () {
            var select = fixture.debugElement.query(platform_browser_1.By.css('mat-select'));
            expect(select.nativeElement.hasAttribute('aria-owns'))
                .toBe(true, 'Expected select to have aria-owns while open.');
            var backdrop = overlayContainerElement.querySelector('.cdk-overlay-backdrop');
            backdrop.click();
            fixture.detectChanges();
            testing_2.flush();
            expect(select.nativeElement.hasAttribute('aria-owns'))
                .toBe(false, 'Expected select not to have aria-owns when closed.');
        }));
        it('should set the option id properly', testing_2.fakeAsync(function () {
            var firstOptionID = options[0].id;
            expect(options[0].id)
                .toContain('mat-option', "Expected option ID to have the correct prefix.");
            expect(options[0].id).not.toEqual(options[1].id, "Expected option IDs to be unique.");
            var backdrop = overlayContainerElement.querySelector('.cdk-overlay-backdrop');
            backdrop.click();
            fixture.detectChanges();
            testing_2.flush();
            triggers[1].nativeElement.click();
            fixture.detectChanges();
            testing_2.flush();
            options = overlayContainerElement.querySelectorAll('mat-option');
            expect(options[0].id)
                .toContain('mat-option', "Expected option ID to have the correct prefix.");
            expect(options[0].id).not.toEqual(firstOptionID, "Expected option IDs to be unique.");
            expect(options[0].id).not.toEqual(options[1].id, "Expected option IDs to be unique.");
        }));
    });
    describe('with floatLabel', function () {
        beforeEach(testing_2.async(function () { return configureMatSelectTestingModule([FloatLabelSelect]); }));
        var fixture;
        var formField;
        beforeEach(testing_2.fakeAsync(function () {
            fixture = testing_2.TestBed.createComponent(FloatLabelSelect);
            fixture.detectChanges();
            formField = fixture.debugElement.query(platform_browser_1.By.css('.mat-form-field')).nativeElement;
        }));
        it('should be able to disable the floating label', testing_2.fakeAsync(function () {
            fixture.componentInstance.floatLabel = 'never';
            fixture.detectChanges();
            expect(formField.classList.contains('mat-form-field-can-float'))
                .toBe(false, 'Floating label should be disabled');
            fixture.componentInstance.control.setValue('pizza-1');
            fixture.detectChanges();
            expect(formField.classList.contains('mat-form-field-can-float'))
                .toBe(false, 'Floating label should be disabled');
        }));
        it('should be able to always float the label', testing_2.fakeAsync(function () {
            expect(fixture.componentInstance.control.value).toBeFalsy();
            fixture.componentInstance.floatLabel = 'always';
            fixture.detectChanges();
            expect(formField.classList.contains('mat-form-field-can-float'))
                .toBe(true, 'Label should be able to float');
            expect(formField.classList.contains('mat-form-field-should-float'))
                .toBe(true, 'Label should be floating');
        }));
        it('should default to global floating label type', testing_2.fakeAsync(function () {
            fixture.destroy();
            testing_2.TestBed.resetTestingModule();
            testing_2.TestBed.configureTestingModule({
                imports: [
                    form_field_1.MatFormFieldModule,
                    index_1.MatSelectModule,
                    forms_1.ReactiveFormsModule,
                    forms_1.FormsModule,
                    animations_1.NoopAnimationsModule
                ],
                declarations: [
                    FloatLabelSelect
                ],
                providers: [{ provide: core_2.MAT_LABEL_GLOBAL_OPTIONS, useValue: { float: 'always' } }]
            });
            fixture = testing_2.TestBed.createComponent(FloatLabelSelect);
            fixture.componentInstance.floatLabel = null;
            fixture.detectChanges();
            formField = fixture.debugElement.query(platform_browser_1.By.css('.mat-form-field')).nativeElement;
            expect(formField.classList.contains('mat-form-field-can-float'))
                .toBe(true, 'Label should be able to float');
            expect(formField.classList.contains('mat-form-field-should-float'))
                .toBe(true, 'Label should be floating');
        }));
    });
    describe('with a sibling component that throws an error', function () {
        beforeEach(testing_2.async(function () {
            return configureMatSelectTestingModule([
                SelectWithErrorSibling,
                ThrowsErrorOnInit,
            ]);
        }));
        it('should not crash the browser when a sibling throws an error on init', testing_2.fakeAsync(function () {
            // Note that this test can be considered successful if the error being thrown didn't
            // end up crashing the testing setup altogether.
            expect(function () {
                testing_2.TestBed.createComponent(SelectWithErrorSibling).detectChanges();
            }).toThrowError(new RegExp('Oh no!', 'g'));
        }));
    });
    describe('with tabindex', function () {
        beforeEach(testing_2.async(function () { return configureMatSelectTestingModule([SelectWithPlainTabindex]); }));
        it('should be able to set the tabindex via the native attribute', testing_2.fakeAsync(function () {
            var fixture = testing_2.TestBed.createComponent(SelectWithPlainTabindex);
            fixture.detectChanges();
            var select = fixture.debugElement.query(platform_browser_1.By.css('mat-select')).nativeElement;
            expect(select.getAttribute('tabindex')).toBe('5');
        }));
    });
    describe('change events', function () {
        beforeEach(testing_2.async(function () { return configureMatSelectTestingModule([SelectWithPlainTabindex]); }));
        it('should complete the stateChanges stream on destroy', function () {
            var fixture = testing_2.TestBed.createComponent(SelectWithPlainTabindex);
            fixture.detectChanges();
            var debugElement = fixture.debugElement.query(platform_browser_1.By.directive(select_1.MatSelect));
            var select = debugElement.componentInstance;
            var spy = jasmine.createSpy('stateChanges complete');
            var subscription = select.stateChanges.subscribe(undefined, undefined, spy);
            fixture.destroy();
            expect(spy).toHaveBeenCalled();
            subscription.unsubscribe();
        });
    });
    describe('when initially hidden', function () {
        beforeEach(testing_2.async(function () { return configureMatSelectTestingModule([BasicSelectInitiallyHidden]); }));
        it('should set the width of the overlay if the element was hidden initially', testing_2.fakeAsync(function () {
            var fixture = testing_2.TestBed.createComponent(BasicSelectInitiallyHidden);
            fixture.detectChanges();
            var trigger = fixture.debugElement.query(platform_browser_1.By.css('.mat-select-trigger')).nativeElement;
            trigger.style.width = '200px';
            fixture.componentInstance.isVisible = true;
            fixture.detectChanges();
            trigger.click();
            fixture.detectChanges();
            testing_2.flush();
            var pane = overlayContainerElement.querySelector('.cdk-overlay-pane');
            expect(pane.style.minWidth).toBe('200px');
        }));
    });
    describe('with no placeholder', function () {
        beforeEach(testing_2.async(function () { return configureMatSelectTestingModule([BasicSelectNoPlaceholder]); }));
        it('should set the width of the overlay if there is no placeholder', testing_2.fakeAsync(function () {
            var fixture = testing_2.TestBed.createComponent(BasicSelectNoPlaceholder);
            fixture.detectChanges();
            var trigger = fixture.debugElement.query(platform_browser_1.By.css('.mat-select-trigger')).nativeElement;
            trigger.click();
            fixture.detectChanges();
            testing_2.flush();
            var pane = overlayContainerElement.querySelector('.cdk-overlay-pane');
            expect(parseInt(pane.style.minWidth)).toBeGreaterThan(0);
        }));
    });
    describe('with theming', function () {
        beforeEach(testing_2.async(function () { return configureMatSelectTestingModule([BasicSelectWithTheming]); }));
        var fixture;
        beforeEach(testing_2.fakeAsync(function () {
            fixture = testing_2.TestBed.createComponent(BasicSelectWithTheming);
            fixture.detectChanges();
        }));
        it('should transfer the theme to the select panel', testing_2.fakeAsync(function () {
            fixture.componentInstance.theme = 'warn';
            fixture.detectChanges();
            fixture.componentInstance.select.open();
            fixture.detectChanges();
            var panel = overlayContainerElement.querySelector('.mat-select-panel');
            expect(panel.classList).toContain('mat-warn');
        }));
    });
    describe('when invalid inside a form', function () {
        beforeEach(testing_2.async(function () { return configureMatSelectTestingModule([InvalidSelectInForm]); }));
        it('should not throw SelectionModel errors in addition to ngModel errors', testing_2.fakeAsync(function () {
            var fixture = testing_2.TestBed.createComponent(InvalidSelectInForm);
            // The first change detection run will throw the "ngModel is missing a name" error.
            expect(function () { return fixture.detectChanges(); }).toThrowError(/the name attribute must be set/g);
            // The second run shouldn't throw selection-model related errors.
            expect(function () { return fixture.detectChanges(); }).not.toThrow();
        }));
    });
    describe('with ngModel using compareWith', function () {
        beforeEach(testing_2.async(function () { return configureMatSelectTestingModule([NgModelCompareWithSelect]); }));
        var fixture;
        var instance;
        beforeEach(testing_2.fakeAsync(function () {
            fixture = testing_2.TestBed.createComponent(NgModelCompareWithSelect);
            instance = fixture.componentInstance;
            fixture.detectChanges();
        }));
        describe('comparing by value', function () {
            it('should have a selection', testing_2.fakeAsync(function () {
                var selectedOption = instance.select.selected;
                expect(selectedOption.value.value).toEqual('pizza-1');
            }));
            it('should update when making a new selection', testing_2.fakeAsync(function () {
                instance.options.last._selectViaInteraction();
                fixture.detectChanges();
                testing_2.flush();
                var selectedOption = instance.select.selected;
                expect(instance.selectedFood.value).toEqual('tacos-2');
                expect(selectedOption.value.value).toEqual('tacos-2');
            }));
        });
        describe('comparing by reference', function () {
            beforeEach(testing_2.fakeAsync(function () {
                spyOn(instance, 'compareByReference').and.callThrough();
                instance.useCompareByReference();
                fixture.detectChanges();
            }));
            it('should use the comparator', testing_2.fakeAsync(function () {
                expect(instance.compareByReference).toHaveBeenCalled();
            }));
            it('should initialize with no selection despite having a value', testing_2.fakeAsync(function () {
                expect(instance.selectedFood.value).toBe('pizza-1');
                expect(instance.select.selected).toBeUndefined();
            }));
            it('should not update the selection if value is copied on change', testing_2.fakeAsync(function () {
                instance.options.first._selectViaInteraction();
                fixture.detectChanges();
                testing_2.flush();
                expect(instance.selectedFood.value).toEqual('steak-0');
                expect(instance.select.selected).toBeUndefined();
            }));
            it('should throw an error when using a non-function comparator', testing_2.fakeAsync(function () {
                instance.useNullComparator();
                expect(function () {
                    fixture.detectChanges();
                }).toThrowError(testing_1.wrappedErrorMessage(select_errors_1.getMatSelectNonFunctionValueError()));
            }));
        });
    });
    describe("when the select's value is accessed on initialization", function () {
        beforeEach(testing_2.async(function () { return configureMatSelectTestingModule([SelectEarlyAccessSibling]); }));
        it('should not throw when trying to access the selected value on init', testing_2.fakeAsync(function () {
            expect(function () {
                testing_2.TestBed.createComponent(SelectEarlyAccessSibling).detectChanges();
            }).not.toThrow();
        }));
    });
    describe('inside of a form group', function () {
        beforeEach(testing_2.async(function () { return configureMatSelectTestingModule([SelectInsideFormGroup]); }));
        var fixture;
        var testComponent;
        var select;
        beforeEach(testing_2.fakeAsync(function () {
            fixture = testing_2.TestBed.createComponent(SelectInsideFormGroup);
            fixture.detectChanges();
            testComponent = fixture.componentInstance;
            select = fixture.debugElement.query(platform_browser_1.By.css('mat-select')).nativeElement;
        }));
        it('should not set the invalid class on a clean select', testing_2.fakeAsync(function () {
            expect(testComponent.formGroup.untouched).toBe(true, 'Expected the form to be untouched.');
            expect(testComponent.formControl.invalid).toBe(true, 'Expected form control to be invalid.');
            expect(select.classList)
                .not.toContain('mat-select-invalid', 'Expected select not to appear invalid.');
            expect(select.getAttribute('aria-invalid'))
                .toBe('false', 'Expected aria-invalid to be set to false.');
        }));
        it('should appear as invalid if it becomes touched', testing_2.fakeAsync(function () {
            expect(select.classList)
                .not.toContain('mat-select-invalid', 'Expected select not to appear invalid.');
            expect(select.getAttribute('aria-invalid'))
                .toBe('false', 'Expected aria-invalid to be set to false.');
            testComponent.formControl.markAsTouched();
            fixture.detectChanges();
            expect(select.classList)
                .toContain('mat-select-invalid', 'Expected select to appear invalid.');
            expect(select.getAttribute('aria-invalid'))
                .toBe('true', 'Expected aria-invalid to be set to true.');
        }));
        it('should not have the invalid class when the select becomes valid', testing_2.fakeAsync(function () {
            testComponent.formControl.markAsTouched();
            fixture.detectChanges();
            expect(select.classList)
                .toContain('mat-select-invalid', 'Expected select to appear invalid.');
            expect(select.getAttribute('aria-invalid'))
                .toBe('true', 'Expected aria-invalid to be set to true.');
            testComponent.formControl.setValue('pizza-1');
            fixture.detectChanges();
            expect(select.classList)
                .not.toContain('mat-select-invalid', 'Expected select not to appear invalid.');
            expect(select.getAttribute('aria-invalid'))
                .toBe('false', 'Expected aria-invalid to be set to false.');
        }));
        it('should appear as invalid when the parent form group is submitted', testing_2.fakeAsync(function () {
            expect(select.classList)
                .not.toContain('mat-select-invalid', 'Expected select not to appear invalid.');
            expect(select.getAttribute('aria-invalid'))
                .toBe('false', 'Expected aria-invalid to be set to false.');
            testing_1.dispatchFakeEvent(fixture.debugElement.query(platform_browser_1.By.css('form')).nativeElement, 'submit');
            fixture.detectChanges();
            expect(select.classList)
                .toContain('mat-select-invalid', 'Expected select to appear invalid.');
            expect(select.getAttribute('aria-invalid'))
                .toBe('true', 'Expected aria-invalid to be set to true.');
        }));
        it('should render the error messages when the parent form is submitted', testing_2.fakeAsync(function () {
            var debugEl = fixture.debugElement.nativeElement;
            expect(debugEl.querySelectorAll('mat-error').length).toBe(0, 'Expected no error messages');
            testing_1.dispatchFakeEvent(fixture.debugElement.query(platform_browser_1.By.css('form')).nativeElement, 'submit');
            fixture.detectChanges();
            expect(debugEl.querySelectorAll('mat-error').length).toBe(1, 'Expected one error message');
        }));
        it('should override error matching behavior via injection token', testing_2.fakeAsync(function () {
            var errorStateMatcher = {
                isErrorState: jasmine.createSpy('error state matcher').and.returnValue(true)
            };
            fixture.destroy();
            testing_2.TestBed.resetTestingModule().configureTestingModule({
                imports: [index_1.MatSelectModule, forms_1.ReactiveFormsModule, forms_1.FormsModule, animations_1.NoopAnimationsModule],
                declarations: [SelectInsideFormGroup],
                providers: [{ provide: core_2.ErrorStateMatcher, useValue: errorStateMatcher }],
            });
            var errorFixture = testing_2.TestBed.createComponent(SelectInsideFormGroup);
            var component = errorFixture.componentInstance;
            errorFixture.detectChanges();
            expect(component.select.errorState).toBe(true);
            expect(errorStateMatcher.isErrorState).toHaveBeenCalled();
        }));
    });
    describe('with custom error behavior', function () {
        beforeEach(testing_2.async(function () { return configureMatSelectTestingModule([CustomErrorBehaviorSelect]); }));
        it('should be able to override the error matching behavior via an @Input', testing_2.fakeAsync(function () {
            var fixture = testing_2.TestBed.createComponent(CustomErrorBehaviorSelect);
            var component = fixture.componentInstance;
            var matcher = jasmine.createSpy('error state matcher').and.returnValue(true);
            fixture.detectChanges();
            expect(component.control.invalid).toBe(false);
            expect(component.select.errorState).toBe(false);
            fixture.componentInstance.errorStateMatcher = { isErrorState: matcher };
            fixture.detectChanges();
            expect(component.select.errorState).toBe(true);
            expect(matcher).toHaveBeenCalled();
        }));
    });
    describe('with preselected array values', function () {
        beforeEach(testing_2.async(function () {
            return configureMatSelectTestingModule([
                SingleSelectWithPreselectedArrayValues,
            ]);
        }));
        it('should be able to preselect an array value in single-selection mode', testing_2.fakeAsync(function () {
            var fixture = testing_2.TestBed.createComponent(SingleSelectWithPreselectedArrayValues);
            fixture.detectChanges();
            testing_2.flush();
            fixture.detectChanges();
            var trigger = fixture.debugElement.query(platform_browser_1.By.css('.mat-select-trigger')).nativeElement;
            expect(trigger.textContent).toContain('Pizza');
            expect(fixture.componentInstance.options.toArray()[1].selected).toBe(true);
        }));
    });
    describe('with custom value accessor', function () {
        beforeEach(testing_2.async(function () {
            return configureMatSelectTestingModule([
                CompWithCustomSelect,
                CustomSelectAccessor,
            ]);
        }));
        it('should support use inside a custom value accessor', testing_2.fakeAsync(function () {
            var fixture = testing_2.TestBed.createComponent(CompWithCustomSelect);
            spyOn(fixture.componentInstance.customAccessor, 'writeValue');
            fixture.detectChanges();
            expect(fixture.componentInstance.customAccessor.select.ngControl)
                .toBeFalsy('Expected mat-select NOT to inherit control from parent value accessor.');
            expect(fixture.componentInstance.customAccessor.writeValue).toHaveBeenCalled();
        }));
    });
    describe('with a falsy value', function () {
        beforeEach(testing_2.async(function () { return configureMatSelectTestingModule([FalsyValueSelect]); }));
        it('should be able to programmatically select a falsy option', testing_2.fakeAsync(function () {
            var fixture = testing_2.TestBed.createComponent(FalsyValueSelect);
            fixture.detectChanges();
            fixture.debugElement.query(platform_browser_1.By.css('.mat-select-trigger')).nativeElement.click();
            fixture.componentInstance.control.setValue(0);
            fixture.detectChanges();
            testing_2.flush();
            expect(fixture.componentInstance.options.first.selected)
                .toBe(true, 'Expected first option to be selected');
            expect(overlayContainerElement.querySelectorAll('mat-option')[0].classList)
                .toContain('mat-selected', 'Expected first option to be selected');
        }));
    });
    describe('with OnPush', function () {
        beforeEach(testing_2.async(function () {
            return configureMatSelectTestingModule([
                BasicSelectOnPush,
                BasicSelectOnPushPreselected,
            ]);
        }));
        it('should set the trigger text based on the value when initialized', testing_2.fakeAsync(function () {
            var fixture = testing_2.TestBed.createComponent(BasicSelectOnPushPreselected);
            fixture.detectChanges();
            testing_2.flush();
            var trigger = fixture.debugElement.query(platform_browser_1.By.css('.mat-select-trigger')).nativeElement;
            fixture.detectChanges();
            expect(trigger.textContent).toContain('Pizza');
        }));
        it('should update the trigger based on the value', testing_2.fakeAsync(function () {
            var fixture = testing_2.TestBed.createComponent(BasicSelectOnPush);
            fixture.detectChanges();
            var trigger = fixture.debugElement.query(platform_browser_1.By.css('.mat-select-trigger')).nativeElement;
            fixture.componentInstance.control.setValue('pizza-1');
            fixture.detectChanges();
            expect(trigger.textContent).toContain('Pizza');
            fixture.componentInstance.control.reset();
            fixture.detectChanges();
            expect(trigger.textContent).not.toContain('Pizza');
        }));
    });
    describe('with custom trigger', function () {
        beforeEach(testing_2.async(function () { return configureMatSelectTestingModule([SelectWithCustomTrigger]); }));
        it('should allow the user to customize the label', testing_2.fakeAsync(function () {
            var fixture = testing_2.TestBed.createComponent(SelectWithCustomTrigger);
            fixture.detectChanges();
            fixture.componentInstance.control.setValue('pizza-1');
            fixture.detectChanges();
            var label = fixture.debugElement.query(platform_browser_1.By.css('.mat-select-value')).nativeElement;
            expect(label.textContent).toContain('azziP', 'Expected the displayed text to be "Pizza" in reverse.');
        }));
    });
    describe('when reseting the value by setting null or undefined', function () {
        beforeEach(testing_2.async(function () { return configureMatSelectTestingModule([ResetValuesSelect]); }));
        var fixture;
        var trigger;
        var formField;
        var options;
        beforeEach(testing_2.fakeAsync(function () {
            fixture = testing_2.TestBed.createComponent(ResetValuesSelect);
            fixture.detectChanges();
            trigger = fixture.debugElement.query(platform_browser_1.By.css('.mat-select-trigger')).nativeElement;
            formField = fixture.debugElement.query(platform_browser_1.By.css('.mat-form-field')).nativeElement;
            trigger.click();
            fixture.detectChanges();
            testing_2.flush();
            options = overlayContainerElement.querySelectorAll('mat-option');
            options[0].click();
            fixture.detectChanges();
            testing_2.flush();
        }));
        it('should reset when an option with an undefined value is selected', testing_2.fakeAsync(function () {
            options[4].click();
            fixture.detectChanges();
            testing_2.flush();
            expect(fixture.componentInstance.control.value).toBeUndefined();
            expect(fixture.componentInstance.select.selected).toBeFalsy();
            expect(formField.classList).not.toContain('mat-form-field-should-float');
            expect(trigger.textContent).not.toContain('Undefined');
        }));
        it('should reset when an option with a null value is selected', testing_2.fakeAsync(function () {
            options[5].click();
            fixture.detectChanges();
            testing_2.flush();
            expect(fixture.componentInstance.control.value).toBeNull();
            expect(fixture.componentInstance.select.selected).toBeFalsy();
            expect(formField.classList).not.toContain('mat-form-field-should-float');
            expect(trigger.textContent).not.toContain('Null');
        }));
        it('should reset when a blank option is selected', testing_2.fakeAsync(function () {
            options[6].click();
            fixture.detectChanges();
            testing_2.flush();
            expect(fixture.componentInstance.control.value).toBeUndefined();
            expect(fixture.componentInstance.select.selected).toBeFalsy();
            expect(formField.classList).not.toContain('mat-form-field-should-float');
            expect(trigger.textContent).not.toContain('None');
        }));
        it('should not mark the reset option as selected ', testing_2.fakeAsync(function () {
            options[5].click();
            fixture.detectChanges();
            testing_2.flush();
            fixture.componentInstance.select.open();
            fixture.detectChanges();
            testing_2.flush();
            expect(options[5].classList).not.toContain('mat-selected');
        }));
        it('should not reset when any other falsy option is selected', testing_2.fakeAsync(function () {
            options[3].click();
            fixture.detectChanges();
            testing_2.flush();
            expect(fixture.componentInstance.control.value).toBe(false);
            expect(fixture.componentInstance.select.selected).toBeTruthy();
            expect(formField.classList).toContain('mat-form-field-should-float');
            expect(trigger.textContent).toContain('Falsy');
        }));
        it('should not consider the reset values as selected when resetting the form control', testing_2.fakeAsync(function () {
            expect(formField.classList).toContain('mat-form-field-should-float');
            fixture.componentInstance.control.reset();
            fixture.detectChanges();
            expect(fixture.componentInstance.control.value).toBeNull();
            expect(fixture.componentInstance.select.selected).toBeFalsy();
            expect(formField.classList).not.toContain('mat-formf-field-should-float');
            expect(trigger.textContent).not.toContain('Null');
            expect(trigger.textContent).not.toContain('Undefined');
        }));
    });
    describe('without Angular forms', function () {
        beforeEach(testing_2.async(function () {
            return configureMatSelectTestingModule([
                BasicSelectWithoutForms,
                BasicSelectWithoutFormsPreselected,
                BasicSelectWithoutFormsMultiple,
            ]);
        }));
        it('should set the value when options are clicked', testing_2.fakeAsync(function () {
            var fixture = testing_2.TestBed.createComponent(BasicSelectWithoutForms);
            fixture.detectChanges();
            expect(fixture.componentInstance.selectedFood).toBeFalsy();
            var trigger = fixture.debugElement.query(platform_browser_1.By.css('.mat-select-trigger')).nativeElement;
            trigger.click();
            fixture.detectChanges();
            testing_2.flush();
            overlayContainerElement.querySelector('mat-option').click();
            fixture.detectChanges();
            testing_2.flush();
            expect(fixture.componentInstance.selectedFood).toBe('steak-0');
            expect(fixture.componentInstance.select.value).toBe('steak-0');
            expect(trigger.textContent).toContain('Steak');
            trigger.click();
            fixture.detectChanges();
            testing_2.flush();
            overlayContainerElement.querySelectorAll('mat-option')[2].click();
            fixture.detectChanges();
            testing_2.flush();
            expect(fixture.componentInstance.selectedFood).toBe('sandwich-2');
            expect(fixture.componentInstance.select.value).toBe('sandwich-2');
            expect(trigger.textContent).toContain('Sandwich');
        }));
        it('should mark options as selected when the value is set', testing_2.fakeAsync(function () {
            var fixture = testing_2.TestBed.createComponent(BasicSelectWithoutForms);
            fixture.detectChanges();
            fixture.componentInstance.selectedFood = 'sandwich-2';
            fixture.detectChanges();
            var trigger = fixture.debugElement.query(platform_browser_1.By.css('.mat-select-trigger')).nativeElement;
            expect(trigger.textContent).toContain('Sandwich');
            trigger.click();
            fixture.detectChanges();
            var option = overlayContainerElement.querySelectorAll('mat-option')[2];
            expect(option.classList).toContain('mat-selected');
            expect(fixture.componentInstance.select.value).toBe('sandwich-2');
        }));
        it('should reset the label when a null value is set', testing_2.fakeAsync(function () {
            var fixture = testing_2.TestBed.createComponent(BasicSelectWithoutForms);
            fixture.detectChanges();
            expect(fixture.componentInstance.selectedFood).toBeFalsy();
            var trigger = fixture.debugElement.query(platform_browser_1.By.css('.mat-select-trigger')).nativeElement;
            trigger.click();
            fixture.detectChanges();
            testing_2.flush();
            overlayContainerElement.querySelector('mat-option').click();
            fixture.detectChanges();
            testing_2.flush();
            expect(fixture.componentInstance.selectedFood).toBe('steak-0');
            expect(fixture.componentInstance.select.value).toBe('steak-0');
            expect(trigger.textContent).toContain('Steak');
            fixture.componentInstance.selectedFood = null;
            fixture.detectChanges();
            expect(fixture.componentInstance.select.value).toBeNull();
            expect(trigger.textContent).not.toContain('Steak');
        }));
        it('should reflect the preselected value', testing_2.fakeAsync(function () {
            var fixture = testing_2.TestBed.createComponent(BasicSelectWithoutFormsPreselected);
            fixture.detectChanges();
            testing_2.flush();
            var trigger = fixture.debugElement.query(platform_browser_1.By.css('.mat-select-trigger')).nativeElement;
            fixture.detectChanges();
            expect(trigger.textContent).toContain('Pizza');
            trigger.click();
            fixture.detectChanges();
            var option = overlayContainerElement.querySelectorAll('mat-option')[1];
            expect(option.classList).toContain('mat-selected');
            expect(fixture.componentInstance.select.value).toBe('pizza-1');
        }));
        it('should be able to select multiple values', testing_2.fakeAsync(function () {
            var fixture = testing_2.TestBed.createComponent(BasicSelectWithoutFormsMultiple);
            fixture.detectChanges();
            expect(fixture.componentInstance.selectedFoods).toBeFalsy();
            var trigger = fixture.debugElement.query(platform_browser_1.By.css('.mat-select-trigger')).nativeElement;
            trigger.click();
            fixture.detectChanges();
            var options = overlayContainerElement.querySelectorAll('mat-option');
            options[0].click();
            fixture.detectChanges();
            expect(fixture.componentInstance.selectedFoods).toEqual(['steak-0']);
            expect(fixture.componentInstance.select.value).toEqual(['steak-0']);
            expect(trigger.textContent).toContain('Steak');
            options[2].click();
            fixture.detectChanges();
            expect(fixture.componentInstance.selectedFoods).toEqual(['steak-0', 'sandwich-2']);
            expect(fixture.componentInstance.select.value).toEqual(['steak-0', 'sandwich-2']);
            expect(trigger.textContent).toContain('Steak, Sandwich');
            options[1].click();
            fixture.detectChanges();
            expect(fixture.componentInstance.selectedFoods).toEqual(['steak-0', 'pizza-1', 'sandwich-2']);
            expect(fixture.componentInstance.select.value).toEqual(['steak-0', 'pizza-1', 'sandwich-2']);
            expect(trigger.textContent).toContain('Steak, Pizza, Sandwich');
        }));
        it('should restore focus to the host element', testing_2.fakeAsync(function () {
            var fixture = testing_2.TestBed.createComponent(BasicSelectWithoutForms);
            fixture.detectChanges();
            fixture.debugElement.query(platform_browser_1.By.css('.mat-select-trigger')).nativeElement.click();
            fixture.detectChanges();
            testing_2.flush();
            overlayContainerElement.querySelector('mat-option').click();
            fixture.detectChanges();
            testing_2.flush();
            var select = fixture.debugElement.nativeElement.querySelector('mat-select');
            expect(document.activeElement).toBe(select, 'Expected trigger to be focused.');
        }));
        it('should not restore focus to the host element when clicking outside', testing_2.fakeAsync(function () {
            var fixture = testing_2.TestBed.createComponent(BasicSelectWithoutForms);
            var select = fixture.debugElement.nativeElement.querySelector('mat-select');
            fixture.detectChanges();
            fixture.debugElement.query(platform_browser_1.By.css('.mat-select-trigger')).nativeElement.click();
            fixture.detectChanges();
            testing_2.flush();
            expect(document.activeElement).toBe(select, 'Expected trigger to be focused.');
            select.blur(); // Blur manually since the programmatic click might not do it.
            overlayContainerElement.querySelector('.cdk-overlay-backdrop').click();
            fixture.detectChanges();
            testing_2.flush();
            expect(document.activeElement).not.toBe(select, 'Expected trigger not to be focused.');
        }));
        it('should update the data binding before emitting the change event', testing_2.fakeAsync(function () {
            var fixture = testing_2.TestBed.createComponent(BasicSelectWithoutForms);
            var instance = fixture.componentInstance;
            var spy = jasmine.createSpy('change spy');
            fixture.detectChanges();
            instance.select.selectionChange.subscribe(function () { return spy(instance.selectedFood); });
            expect(instance.selectedFood).toBeFalsy();
            fixture.debugElement.query(platform_browser_1.By.css('.mat-select-trigger')).nativeElement.click();
            fixture.detectChanges();
            testing_2.flush();
            overlayContainerElement.querySelector('mat-option').click();
            fixture.detectChanges();
            testing_2.flush();
            expect(instance.selectedFood).toBe('steak-0');
            expect(spy).toHaveBeenCalledWith('steak-0');
        }));
    });
    describe('with option centering disabled', function () {
        beforeEach(testing_2.async(function () {
            return configureMatSelectTestingModule([
                SelectWithoutOptionCentering,
            ]);
        }));
        var fixture;
        var trigger;
        beforeEach(testing_2.fakeAsync(function () {
            fixture = testing_2.TestBed.createComponent(SelectWithoutOptionCentering);
            fixture.detectChanges();
            trigger = fixture.debugElement.query(platform_browser_1.By.css('.mat-select-trigger')).nativeElement;
        }));
        it('should not align the active option with the trigger if centering is disabled', testing_2.fakeAsync(function () {
            trigger.click();
            fixture.detectChanges();
            testing_2.flush();
            var scrollContainer = (document.querySelector('.cdk-overlay-pane .mat-select-panel'));
            // The panel should be scrolled to 0 because centering the option disabled.
            expect(scrollContainer.scrollTop).toEqual(0, "Expected panel not to be scrolled.");
            // The trigger should contain 'Pizza' because it was preselected
            expect(trigger.textContent).toContain('Pizza');
            // The selected index should be 1 because it was preselected
            expect(fixture.componentInstance.options.toArray()[1].selected).toBe(true);
        }));
    });
    describe('positioning', function () {
        beforeEach(testing_2.async(function () {
            return configureMatSelectTestingModule([
                BasicSelect,
                MultiSelect,
                SelectWithGroups,
            ]);
        }));
        beforeEach((testing_2.inject([scrolling_1.ViewportRuler], function (vr) {
            viewportRuler = vr;
        })));
        var fixture;
        var trigger;
        var formField;
        beforeEach(testing_2.fakeAsync(function () {
            fixture = testing_2.TestBed.createComponent(BasicSelect);
            fixture.detectChanges();
            trigger = fixture.debugElement.query(platform_browser_1.By.css('.mat-select-trigger')).nativeElement;
            formField = fixture.debugElement.query(platform_browser_1.By.css('mat-form-field')).nativeElement;
        }));
        /**
             * Asserts that the given option is aligned with the trigger.
             * @param index The index of the option.
             * @param selectInstance Instance of the `mat-select` component to check against.
             */
        function checkTriggerAlignedWithOption(index, selectInstance) {
            if (selectInstance === void 0) { selectInstance = fixture.componentInstance.select; }
            var overlayPane = (overlayContainerElement.querySelector('.cdk-overlay-pane'));
            var triggerTop = trigger.getBoundingClientRect().top;
            var overlayTop = overlayPane.getBoundingClientRect().top;
            var options = overlayPane.querySelectorAll('mat-option');
            var optionTop = options[index].getBoundingClientRect().top;
            var triggerFontSize = parseInt(window.getComputedStyle(trigger)['font-size']);
            var triggerLineHeightEm = 1.125;
            // Extra trigger height beyond the font size caused by the fact that the line-height is
            // greater than 1em.
            var triggerExtraLineSpaceAbove = (1 - triggerLineHeightEm) * triggerFontSize / 2;
            var topDifference = Math.floor(optionTop) -
                Math.floor(triggerTop - triggerFontSize - triggerExtraLineSpaceAbove);
            // Expect the coordinates to be within a pixel of each other. We can't rely on comparing
            // the exact value, because different browsers report the various sizes with slight (< 1px)
            // deviations.
            expect(Math.abs(topDifference) < 2)
                .toBe(true, "Expected trigger to align with option " + index + ".");
            // For the animation to start at the option's center, its origin must be the distance
            // from the top of the overlay to the option top + half the option height (48/2 = 24).
            var expectedOrigin = Math.floor(optionTop - overlayTop + 24);
            var rawYOrigin = selectInstance._transformOrigin.split(' ')[1].trim();
            var origin = Math.floor(parseInt(rawYOrigin));
            // Because the origin depends on the Y axis offset, we also have to
            // round down and check that the difference is within a pixel.
            expect(Math.abs(expectedOrigin - origin) < 2).toBe(true, "Expected panel animation to originate in the center of option " + index + ".");
        }
        describe('ample space to open', function () {
            beforeEach(testing_2.fakeAsync(function () {
                // these styles are necessary because we are first testing the overlay's position
                // if there is room for it to open to its full extent in either direction.
                formField.style.position = 'fixed';
                formField.style.top = '285px';
                formField.style.left = '20px';
            }));
            it('should align the first option with trigger text if no option is selected', testing_2.fakeAsync(function () {
                // We shouldn't push it too far down for this one, because the default may
                // end up being too much when running the tests on mobile browsers.
                formField.style.top = '100px';
                trigger.click();
                fixture.detectChanges();
                testing_2.flush();
                var scrollContainer = (document.querySelector('.cdk-overlay-pane .mat-select-panel'));
                // The panel should be scrolled to 0 because centering the option is not possible.
                expect(scrollContainer.scrollTop).toEqual(0, "Expected panel not to be scrolled.");
                checkTriggerAlignedWithOption(0);
            }));
            it('should align a selected option too high to be centered with the trigger text', testing_2.fakeAsync(function () {
                // Select the second option, because it can't be scrolled any further downward
                fixture.componentInstance.control.setValue('pizza-1');
                fixture.detectChanges();
                trigger.click();
                fixture.detectChanges();
                testing_2.flush();
                var scrollContainer = (document.querySelector('.cdk-overlay-pane .mat-select-panel'));
                // The panel should be scrolled to 0 because centering the option is not possible.
                expect(scrollContainer.scrollTop).toEqual(0, "Expected panel not to be scrolled.");
                checkTriggerAlignedWithOption(1);
            }));
            it('should align a selected option in the middle with the trigger text', testing_2.fakeAsync(function () {
                // Select the fifth option, which has enough space to scroll to the center
                fixture.componentInstance.control.setValue('chips-4');
                fixture.detectChanges();
                testing_2.flush();
                trigger.click();
                fixture.detectChanges();
                testing_2.flush();
                var scrollContainer = (document.querySelector('.cdk-overlay-pane .mat-select-panel'));
                // The selected option should be scrolled to the center of the panel.
                // This will be its original offset from the scrollTop - half the panel height + half
                // the option height. 4 (index) * 48 (option height) = 192px offset from scrollTop
                // 192 - 256/2 + 48/2 = 88px
                expect(scrollContainer.scrollTop)
                    .toEqual(88, "Expected overlay panel to be scrolled to center the selected option.");
                checkTriggerAlignedWithOption(4);
            }));
            it('should align a selected option at the scroll max with the trigger text', testing_2.fakeAsync(function () {
                // Select the last option in the list
                fixture.componentInstance.control.setValue('sushi-7');
                fixture.detectChanges();
                testing_2.flush();
                trigger.click();
                fixture.detectChanges();
                testing_2.flush();
                var scrollContainer = (document.querySelector('.cdk-overlay-pane .mat-select-panel'));
                // The selected option should be scrolled to the max scroll position.
                // This will be the height of the scrollContainer - the panel height.
                // 8 options * 48px = 384 scrollContainer height, 384 - 256 = 128px max scroll
                expect(scrollContainer.scrollTop)
                    .toEqual(128, "Expected overlay panel to be scrolled to its maximum position.");
                checkTriggerAlignedWithOption(7);
            }));
            it('should account for preceding label groups when aligning the option', testing_2.fakeAsync(function () {
                // Test is off-by-one on edge for some reason, but verified that it looks correct through
                // manual testing.
                if (platform.EDGE) {
                    return;
                }
                fixture.destroy();
                var groupFixture = testing_2.TestBed.createComponent(SelectWithGroups);
                groupFixture.detectChanges();
                trigger = groupFixture.debugElement.query(platform_browser_1.By.css('.mat-select-trigger')).nativeElement;
                formField = groupFixture.debugElement.query(platform_browser_1.By.css('mat-form-field')).nativeElement;
                formField.style.position = 'fixed';
                formField.style.top = '200px';
                formField.style.left = '100px';
                // Select an option in the third group, which has a couple of group labels before it.
                groupFixture.componentInstance.control.setValue('vulpix-7');
                groupFixture.detectChanges();
                trigger.click();
                groupFixture.detectChanges();
                testing_2.flush();
                var scrollContainer = (document.querySelector('.cdk-overlay-pane .mat-select-panel'));
                // The selected option should be scrolled to the center of the panel.
                // This will be its original offset from the scrollTop - half the panel height + half the
                // option height. 10 (option index + 3 group labels before it) * 48 (option height) = 480
                // 480 (offset from scrollTop) - 256/2 + 48/2 = 376px
                expect(Math.floor(scrollContainer.scrollTop))
                    .toBe(376, "Expected overlay panel to be scrolled to center the selected option.");
                checkTriggerAlignedWithOption(7, groupFixture.componentInstance.select);
            }));
        });
        describe('limited space to open vertically', function () {
            beforeEach(testing_2.fakeAsync(function () {
                formField.style.position = 'fixed';
                formField.style.left = '20px';
            }));
            it('should adjust position of centered option if there is little space above', testing_2.fakeAsync(function () {
                var selectMenuHeight = 256;
                var selectMenuViewportPadding = 8;
                var selectItemHeight = 48;
                var selectedIndex = 4;
                var fontSize = 16;
                var lineHeightEm = 1.125;
                var expectedExtraScroll = 5;
                // Trigger element height.
                var triggerHeight = fontSize * lineHeightEm;
                // Ideal space above selected item in order to center it.
                var idealSpaceAboveSelectedItem = (selectMenuHeight - selectItemHeight) / 2;
                // Actual space above selected item.
                var actualSpaceAboveSelectedItem = selectItemHeight * selectedIndex;
                // Ideal scroll position to center.
                var idealScrollTop = actualSpaceAboveSelectedItem - idealSpaceAboveSelectedItem;
                // Top-most select-position that allows for perfect centering.
                var topMostPositionForPerfectCentering = idealSpaceAboveSelectedItem + selectMenuViewportPadding +
                    (selectItemHeight - triggerHeight) / 2;
                // Position of select relative to top edge of mat-form-field.
                var formFieldTopSpace = trigger.getBoundingClientRect().top - formField.getBoundingClientRect().top;
                var formFieldTop = topMostPositionForPerfectCentering - formFieldTopSpace - expectedExtraScroll;
                formField.style.top = formFieldTop + "px";
                // Select an option in the middle of the list
                fixture.componentInstance.control.setValue('chips-4');
                fixture.detectChanges();
                testing_2.flush();
                trigger.click();
                fixture.detectChanges();
                testing_2.flush();
                var scrollContainer = (document.querySelector('.cdk-overlay-pane .mat-select-panel'));
                expect(Math.ceil(scrollContainer.scrollTop))
                    .toEqual(Math.ceil(idealScrollTop + 5), "Expected panel to adjust scroll position to fit in viewport.");
                checkTriggerAlignedWithOption(4);
            }));
            it('should adjust position of centered option if there is little space below', testing_2.fakeAsync(function () {
                var selectMenuHeight = 256;
                var selectMenuViewportPadding = 8;
                var selectItemHeight = 48;
                var selectedIndex = 4;
                var fontSize = 16;
                var lineHeightEm = 1.125;
                var expectedExtraScroll = 5;
                // Trigger element height.
                var triggerHeight = fontSize * lineHeightEm;
                // Ideal space above selected item in order to center it.
                var idealSpaceAboveSelectedItem = (selectMenuHeight - selectItemHeight) / 2;
                // Actual space above selected item.
                var actualSpaceAboveSelectedItem = selectItemHeight * selectedIndex;
                // Ideal scroll position to center.
                var idealScrollTop = actualSpaceAboveSelectedItem - idealSpaceAboveSelectedItem;
                // Bottom-most select-position that allows for perfect centering.
                var bottomMostPositionForPerfectCentering = idealSpaceAboveSelectedItem + selectMenuViewportPadding +
                    (selectItemHeight - triggerHeight) / 2;
                // Position of select relative to bottom edge of mat-form-field:
                var formFieldBottomSpace = formField.getBoundingClientRect().bottom - trigger.getBoundingClientRect().bottom;
                var formFieldBottom = bottomMostPositionForPerfectCentering - formFieldBottomSpace - expectedExtraScroll;
                // Push the select to a position with not quite enough space on the bottom to open
                // with the option completely centered (needs 113px at least: 256/2 - 48/2 + 9)
                formField.style.bottom = formFieldBottom + "px";
                // Select an option in the middle of the list
                fixture.componentInstance.control.setValue('chips-4');
                fixture.detectChanges();
                testing_2.flush();
                fixture.detectChanges();
                trigger.click();
                fixture.detectChanges();
                testing_2.flush();
                var scrollContainer = (document.querySelector('.cdk-overlay-pane .mat-select-panel'));
                // Scroll should adjust by the difference between the bottom space available
                // (56px from the bottom of the screen - 8px padding = 48px)
                // and the height of the panel below the option (113px).
                // 113px - 48px = 75px difference. Original scrollTop 88px - 75px = 23px
                var difference = Math.ceil(scrollContainer.scrollTop) -
                    Math.ceil(idealScrollTop - expectedExtraScroll);
                // Note that different browser/OS combinations report the different dimensions with
                // slight deviations (< 1px). We round the expectation and check that the values
                // are within a pixel of each other to avoid flakes.
                expect(Math.abs(difference) < 2)
                    .toBe(true, "Expected panel to adjust scroll position to fit in viewport.");
                checkTriggerAlignedWithOption(4);
            }));
            it('should fall back to "above" positioning if scroll adjustment will not help', testing_2.fakeAsync(function () {
                // Push the select to a position with not enough space on the bottom to open
                formField.style.bottom = '56px';
                fixture.detectChanges();
                // Select an option that cannot be scrolled any farther upward
                fixture.componentInstance.control.setValue('coke-0');
                fixture.detectChanges();
                trigger.click();
                fixture.detectChanges();
                testing_2.flush();
                var overlayPane = (document.querySelector('.cdk-overlay-pane'));
                var triggerBottom = trigger.getBoundingClientRect().bottom;
                var overlayBottom = overlayPane.getBoundingClientRect().bottom;
                var scrollContainer = (overlayPane.querySelector('.mat-select-panel'));
                // Expect no scroll to be attempted
                expect(scrollContainer.scrollTop).toEqual(0, "Expected panel not to be scrolled.");
                var difference = Math.floor(overlayBottom) - Math.floor(triggerBottom);
                // Check that the values are within a pixel of each other. This avoids sub-pixel
                // deviations between OS and browser versions.
                expect(Math.abs(difference) < 2)
                    .toEqual(true, "Expected trigger bottom to align with overlay bottom.");
                expect(fixture.componentInstance.select._transformOrigin)
                    .toContain("bottom", "Expected panel animation to originate at the bottom.");
            }));
            it('should fall back to "below" positioning if scroll adjustment won\'t help', testing_2.fakeAsync(function () {
                // Push the select to a position with not enough space on the top to open
                formField.style.top = '85px';
                // Select an option that cannot be scrolled any farther downward
                fixture.componentInstance.control.setValue('sushi-7');
                fixture.detectChanges();
                testing_2.flush();
                trigger.click();
                fixture.detectChanges();
                testing_2.flush();
                var overlayPane = (document.querySelector('.cdk-overlay-pane'));
                var triggerTop = trigger.getBoundingClientRect().top;
                var overlayTop = overlayPane.getBoundingClientRect().top;
                var scrollContainer = (overlayPane.querySelector('.mat-select-panel'));
                // Expect scroll to remain at the max scroll position
                expect(scrollContainer.scrollTop).toEqual(128, "Expected panel to be at max scroll.");
                expect(Math.floor(overlayTop))
                    .toEqual(Math.floor(triggerTop), "Expected trigger top to align with overlay top.");
                expect(fixture.componentInstance.select._transformOrigin)
                    .toContain("top", "Expected panel animation to originate at the top.");
            }));
        });
        describe('limited space to open horizontally', function () {
            beforeEach(testing_2.fakeAsync(function () {
                formField.style.position = 'absolute';
                formField.style.top = '200px';
            }));
            it('should stay within the viewport when overflowing on the left in ltr', testing_2.fakeAsync(function () {
                formField.style.left = '-100px';
                trigger.click();
                fixture.detectChanges();
                testing_2.flush();
                var panelLeft = document.querySelector('.mat-select-panel').getBoundingClientRect().left;
                expect(panelLeft).toBeGreaterThan(0, "Expected select panel to be inside the viewport in ltr.");
            }));
            it('should stay within the viewport when overflowing on the left in rtl', testing_2.fakeAsync(function () {
                dir.value = 'rtl';
                formField.style.left = '-100px';
                trigger.click();
                fixture.detectChanges();
                testing_2.flush();
                var panelLeft = document.querySelector('.mat-select-panel').getBoundingClientRect().left;
                expect(panelLeft).toBeGreaterThan(0, "Expected select panel to be inside the viewport in rtl.");
            }));
            it('should stay within the viewport when overflowing on the right in ltr', testing_2.fakeAsync(function () {
                formField.style.right = '-100px';
                trigger.click();
                fixture.detectChanges();
                testing_2.flush();
                var viewportRect = viewportRuler.getViewportRect().right;
                var panelRight = document.querySelector('.mat-select-panel')
                    .getBoundingClientRect().right;
                expect(viewportRect - panelRight).toBeGreaterThan(0, "Expected select panel to be inside the viewport in ltr.");
            }));
            it('should stay within the viewport when overflowing on the right in rtl', testing_2.fakeAsync(function () {
                dir.value = 'rtl';
                formField.style.right = '-100px';
                trigger.click();
                fixture.detectChanges();
                testing_2.flush();
                var viewportRect = viewportRuler.getViewportRect().right;
                var panelRight = document.querySelector('.mat-select-panel')
                    .getBoundingClientRect().right;
                expect(viewportRect - panelRight).toBeGreaterThan(0, "Expected select panel to be inside the viewport in rtl.");
            }));
            it('should keep the position within the viewport on repeat openings', testing_2.fakeAsync(function () {
                formField.style.left = '-100px';
                trigger.click();
                fixture.detectChanges();
                testing_2.flush();
                var panelLeft = document.querySelector('.mat-select-panel').getBoundingClientRect().left;
                expect(panelLeft)
                    .toBeGreaterThanOrEqual(0, "Expected select panel to be inside the viewport.");
                fixture.componentInstance.select.close();
                fixture.detectChanges();
                testing_2.flush();
                trigger.click();
                fixture.detectChanges();
                testing_2.flush();
                panelLeft = document.querySelector('.mat-select-panel').getBoundingClientRect().left;
                expect(panelLeft).toBeGreaterThanOrEqual(0, "Expected select panel continue being inside the viewport.");
            }));
        });
        describe('when scrolled', function () {
            var startingWindowHeight = window.innerHeight;
            // Need to set the scrollTop two different ways to support
            // both Chrome and Firefox.
            function setScrollTop(num) {
                document.body.scrollTop = num;
                document.documentElement.scrollTop = num;
            }
            beforeEach(testing_2.fakeAsync(function () {
                // Make the div above the select very tall, so the page will scroll
                fixture.componentInstance.heightAbove = 2000;
                fixture.detectChanges();
                setScrollTop(0);
                // Give the select enough horizontal space to open
                formField.style.marginLeft = '20px';
                formField.style.marginRight = '20px';
            }));
            it('should align the first option properly when scrolled', testing_2.fakeAsync(function () {
                // Give the select enough space to open
                fixture.componentInstance.heightBelow = 400;
                fixture.detectChanges();
                // Space that is needed in order to show the menu below the trigger.
                // 256 (height of the menu overlay) - 45 (estimated height of the trigger)
                var requiredSpaceBelow = 256 - 45;
                // Scroll the select into view. Make sure that there is enough space for the menu
                // to open below the trigger (depending on the screen resolution)
                setScrollTop(2000 - requiredSpaceBelow);
                // In the iOS simulator (BrowserStack & SauceLabs), adding the content to the
                // body causes karma's iframe for the test to stretch to fit that content once we attempt to
                // scroll the page. Setting width / height / maxWidth / maxHeight on the iframe does not
                // successfully constrain its size. As such, skip assertions in environments where the
                // window size has changed since the start of the test.
                if (window.innerHeight > startingWindowHeight) {
                    return;
                }
                trigger.click();
                fixture.detectChanges();
                testing_2.flush();
                checkTriggerAlignedWithOption(0);
            }));
            it('should align a centered option properly when scrolled', testing_2.fakeAsync(function () {
                // Give the select enough space to open
                fixture.componentInstance.heightBelow = 400;
                fixture.detectChanges();
                fixture.componentInstance.control.setValue('chips-4');
                fixture.detectChanges();
                testing_2.flush();
                // Space that is needed in order to show the menu below the trigger.
                // 256 (height of the menu overlay) - 45 (estimated height of the trigger)
                // Even though there might be less options displayed below the trigger because the
                // selected option is the fourth item, we want to make sure we have enough space here.
                var requiredSpaceBelow = 256 - 45;
                // Scroll the select into view. Make sure that there is enough space for the menu
                // to open below the trigger (depending on the screen resolution)
                setScrollTop(2000 - requiredSpaceBelow);
                // In the iOS simulator (BrowserStack & SauceLabs), adding the content to the
                // body causes karma's iframe for the test to stretch to fit that content once we attempt
                // to scroll the page. Setting width / height / maxWidth / maxHeight on the iframe does
                // not successfully constrain its size. As such, skip assertions in environments where the
                // window size has changed since the start of the test.
                if (window.innerHeight > startingWindowHeight) {
                    return;
                }
                trigger.click();
                fixture.detectChanges();
                testing_2.flush();
                checkTriggerAlignedWithOption(4);
            }));
            it('should align a centered option properly when scrolling while the panel is open', testing_2.fakeAsync(function () {
                fixture.componentInstance.heightBelow = 400;
                fixture.componentInstance.heightAbove = 400;
                fixture.componentInstance.control.setValue('chips-4');
                fixture.detectChanges();
                testing_2.flush();
                trigger.click();
                fixture.detectChanges();
                testing_2.flush();
                setScrollTop(100);
                scrolledSubject.next();
                fixture.detectChanges();
                checkTriggerAlignedWithOption(4);
            }));
            it('should fall back to "above" positioning properly when scrolled', testing_2.fakeAsync(function () {
                // Give the select insufficient space to open below the trigger
                fixture.componentInstance.heightAbove = 0;
                fixture.componentInstance.heightBelow = 100;
                trigger.style.marginTop = '2000px';
                fixture.detectChanges();
                // Scroll the select into view
                setScrollTop(1400);
                // In the iOS simulator (BrowserStack & SauceLabs), adding the content to the
                // body causes karma's iframe for the test to stretch to fit that content once we attempt to
                // scroll the page. Setting width / height / maxWidth / maxHeight on the iframe does not
                // successfully constrain its size. As such, skip assertions in environments where the
                // window size has changed since the start of the test.
                if (window.innerHeight > startingWindowHeight) {
                    return;
                }
                trigger.click();
                fixture.detectChanges();
                testing_2.flush();
                var overlayPane = (overlayContainerElement.querySelector('.cdk-overlay-pane'));
                var triggerBottom = trigger.getBoundingClientRect().bottom;
                var overlayBottom = overlayPane.getBoundingClientRect().bottom;
                var difference = Math.floor(overlayBottom) - Math.floor(triggerBottom);
                // Check that the values are within a pixel of each other. This avoids sub-pixel
                // deviations between OS and browser versions.
                expect(Math.abs(difference) < 2)
                    .toEqual(true, "Expected trigger bottom to align with overlay bottom.");
            }));
            it('should fall back to "below" positioning properly when scrolled', testing_2.fakeAsync(function () {
                // Give plenty of space for the select to open below the trigger
                fixture.componentInstance.heightBelow = 650;
                fixture.detectChanges();
                // Select an option too low in the list to fit in limited space above
                fixture.componentInstance.control.setValue('sushi-7');
                fixture.detectChanges();
                // Scroll the select so that it has insufficient space to open above the trigger
                setScrollTop(1950);
                // In the iOS simulator (BrowserStack & SauceLabs), adding the content to the
                // body causes karma's iframe for the test to stretch to fit that content once we attempt to
                // scroll the page. Setting width / height / maxWidth / maxHeight on the iframe does not
                // successfully constrain its size. As such, skip assertions in environments where the
                // window size has changed since the start of the test.
                if (window.innerHeight > startingWindowHeight) {
                    return;
                }
                trigger.click();
                fixture.detectChanges();
                testing_2.flush();
                var overlayPane = (overlayContainerElement.querySelector('.cdk-overlay-pane'));
                var triggerTop = trigger.getBoundingClientRect().top;
                var overlayTop = overlayPane.getBoundingClientRect().top;
                expect(Math.floor(overlayTop))
                    .toEqual(Math.floor(triggerTop), "Expected trigger top to align with overlay top.");
            }));
        });
        describe('x-axis positioning', function () {
            beforeEach(testing_2.fakeAsync(function () {
                formField.style.position = 'fixed';
                formField.style.left = '30px';
            }));
            it('should align the trigger and the selected option on the x-axis in ltr', testing_2.fakeAsync(function () {
                trigger.click();
                fixture.detectChanges();
                testing_2.flush();
                var triggerLeft = trigger.getBoundingClientRect().left;
                var firstOptionLeft = document.querySelector('.cdk-overlay-pane mat-option')
                    .getBoundingClientRect().left;
                // Each option is 32px wider than the trigger, so it must be adjusted 16px
                // to ensure the text overlaps correctly.
                expect(Math.floor(firstOptionLeft)).toEqual(Math.floor(triggerLeft - 16), "Expected trigger to align with the selected option on the x-axis in LTR.");
            }));
            it('should align the trigger and the selected option on the x-axis in rtl', testing_2.fakeAsync(function () {
                dir.value = 'rtl';
                fixture.detectChanges();
                trigger.click();
                fixture.detectChanges();
                testing_2.flush();
                var triggerRight = trigger.getBoundingClientRect().right;
                var firstOptionRight = document.querySelector('.cdk-overlay-pane mat-option').getBoundingClientRect().right;
                // Each option is 32px wider than the trigger, so it must be adjusted 16px
                // to ensure the text overlaps correctly.
                expect(Math.floor(firstOptionRight))
                    .toEqual(Math.floor(triggerRight + 16), "Expected trigger to align with the selected option on the x-axis in RTL.");
            }));
        });
        describe('x-axis positioning in multi select mode', function () {
            var multiFixture;
            beforeEach(testing_2.fakeAsync(function () {
                multiFixture = testing_2.TestBed.createComponent(MultiSelect);
                multiFixture.detectChanges();
                formField = multiFixture.debugElement.query(platform_browser_1.By.css('.mat-form-field')).nativeElement;
                trigger = multiFixture.debugElement.query(platform_browser_1.By.css('.mat-select-trigger')).nativeElement;
                formField.style.position = 'fixed';
                formField.style.left = '60px';
            }));
            it('should adjust for the checkbox in ltr', testing_2.fakeAsync(function () {
                trigger.click();
                multiFixture.detectChanges();
                testing_2.flush();
                var triggerLeft = trigger.getBoundingClientRect().left;
                var firstOptionLeft = document.querySelector('.cdk-overlay-pane mat-option').getBoundingClientRect().left;
                // 44px accounts for the checkbox size, margin and the panel's padding.
                expect(Math.floor(firstOptionLeft))
                    .toEqual(Math.floor(triggerLeft - 44), "Expected trigger label to align along x-axis, accounting for the checkbox.");
            }));
            it('should adjust for the checkbox in rtl', testing_2.fakeAsync(function () {
                dir.value = 'rtl';
                trigger.click();
                multiFixture.detectChanges();
                testing_2.flush();
                var triggerRight = trigger.getBoundingClientRect().right;
                var firstOptionRight = document.querySelector('.cdk-overlay-pane mat-option').getBoundingClientRect().right;
                // 44px accounts for the checkbox size, margin and the panel's padding.
                expect(Math.floor(firstOptionRight))
                    .toEqual(Math.floor(triggerRight + 44), "Expected trigger label to align along x-axis, accounting for the checkbox.");
            }));
        });
        describe('x-axis positioning with groups', function () {
            var groupFixture;
            beforeEach(testing_2.fakeAsync(function () {
                groupFixture = testing_2.TestBed.createComponent(SelectWithGroups);
                groupFixture.detectChanges();
                formField = groupFixture.debugElement.query(platform_browser_1.By.css('.mat-form-field')).nativeElement;
                trigger = groupFixture.debugElement.query(platform_browser_1.By.css('.mat-select-trigger')).nativeElement;
                formField.style.position = 'fixed';
                formField.style.left = '60px';
            }));
            it('should adjust for the group padding in ltr', testing_2.fakeAsync(function () {
                groupFixture.componentInstance.control.setValue('oddish-1');
                groupFixture.detectChanges();
                trigger.click();
                groupFixture.detectChanges();
                groupFixture.whenStable().then(function () {
                    var group = (document.querySelector('.cdk-overlay-pane mat-optgroup'));
                    var triggerLeft = trigger.getBoundingClientRect().left;
                    var selectedOptionLeft = group.querySelector('mat-option.mat-selected')
                        .getBoundingClientRect().left;
                    // 32px is the 16px default padding plus 16px of padding when an option is in a group.
                    expect(Math.floor(selectedOptionLeft)).toEqual(Math.floor(triggerLeft - 32), "Expected trigger label to align along x-axis, accounting for the padding in ltr.");
                });
            }));
            it('should adjust for the group padding in rtl', testing_2.fakeAsync(function () {
                dir.value = 'rtl';
                groupFixture.componentInstance.control.setValue('oddish-1');
                groupFixture.detectChanges();
                trigger.click();
                groupFixture.detectChanges();
                testing_2.flush();
                var group = (document.querySelector('.cdk-overlay-pane mat-optgroup'));
                var triggerRight = trigger.getBoundingClientRect().right;
                var selectedOptionRight = group.querySelector('mat-option.mat-selected')
                    .getBoundingClientRect().right;
                // 32px is the 16px default padding plus 16px of padding when an option is in a group.
                expect(Math.floor(selectedOptionRight)).toEqual(Math.floor(triggerRight + 32), "Expected trigger label to align along x-axis, accounting for the padding in rtl.");
            }));
            it('should not adjust if all options are within a group, except the selected one', testing_2.fakeAsync(function () {
                groupFixture.componentInstance.control.setValue('mime-11');
                groupFixture.detectChanges();
                trigger.click();
                groupFixture.detectChanges();
                testing_2.flush();
                var selected = (document.querySelector('.cdk-overlay-pane mat-option.mat-selected'));
                var selectedOptionLeft = selected.getBoundingClientRect().left;
                var triggerLeft = trigger.getBoundingClientRect().left;
                // 16px is the default option padding
                expect(Math.floor(selectedOptionLeft)).toEqual(Math.floor(triggerLeft - 16));
            }));
            it('should align the first option to the trigger, if nothing is selected', testing_2.fakeAsync(function () {
                // Push down the form field so there is space for the item to completely align.
                formField.style.top = '100px';
                var menuItemHeight = 48;
                var triggerFontSize = 16;
                var triggerLineHeightEm = 1.125;
                var triggerHeight = triggerFontSize * triggerLineHeightEm;
                trigger.click();
                groupFixture.detectChanges();
                testing_2.flush();
                var triggerTop = trigger.getBoundingClientRect().top;
                var option = overlayContainerElement.querySelector('.cdk-overlay-pane mat-option');
                var optionTop = option ? option.getBoundingClientRect().top : 0;
                // There appears to be a small rounding error on IE, so we verify that the value is close,
                // not exact.
                if (platform.TRIDENT) {
                    var difference = Math.abs(optionTop + (menuItemHeight - triggerHeight) / 2 - triggerTop);
                    expect(difference)
                        .toBeLessThan(0.1, 'Expected trigger to align with the first option.');
                }
                else {
                    expect(Math.floor(optionTop + (menuItemHeight - triggerHeight) / 2))
                        .toBe(Math.floor(triggerTop), 'Expected trigger to align with the first option.');
                }
            }));
        });
    });
    describe('with multiple selection', function () {
        beforeEach(testing_2.async(function () { return configureMatSelectTestingModule([MultiSelect]); }));
        var fixture;
        var testInstance;
        var trigger;
        beforeEach(testing_2.fakeAsync(function () {
            fixture = testing_2.TestBed.createComponent(MultiSelect);
            testInstance = fixture.componentInstance;
            fixture.detectChanges();
            trigger = fixture.debugElement.query(platform_browser_1.By.css('.mat-select-trigger')).nativeElement;
        }));
        it('should be able to select multiple values', testing_2.fakeAsync(function () {
            trigger.click();
            fixture.detectChanges();
            var options = overlayContainerElement.querySelectorAll('mat-option');
            options[0].click();
            options[2].click();
            options[5].click();
            fixture.detectChanges();
            expect(testInstance.control.value).toEqual(['steak-0', 'tacos-2', 'eggs-5']);
        }));
        it('should be able to toggle an option on and off', testing_2.fakeAsync(function () {
            trigger.click();
            fixture.detectChanges();
            var option = overlayContainerElement.querySelector('mat-option');
            option.click();
            fixture.detectChanges();
            expect(testInstance.control.value).toEqual(['steak-0']);
            option.click();
            fixture.detectChanges();
            expect(testInstance.control.value).toEqual([]);
        }));
        it('should update the label', testing_2.fakeAsync(function () {
            trigger.click();
            fixture.detectChanges();
            testing_2.flush();
            var options = overlayContainerElement.querySelectorAll('mat-option');
            options[0].click();
            options[2].click();
            options[5].click();
            fixture.detectChanges();
            expect(trigger.textContent).toContain('Steak, Tacos, Eggs');
            options[2].click();
            fixture.detectChanges();
            expect(trigger.textContent).toContain('Steak, Eggs');
        }));
        it('should be able to set the selected value by taking an array', testing_2.fakeAsync(function () {
            trigger.click();
            testInstance.control.setValue(['steak-0', 'eggs-5']);
            fixture.detectChanges();
            var optionNodes = overlayContainerElement.querySelectorAll('mat-option');
            var optionInstances = testInstance.options.toArray();
            expect(optionNodes[0].classList).toContain('mat-selected');
            expect(optionNodes[5].classList).toContain('mat-selected');
            expect(optionInstances[0].selected).toBe(true);
            expect(optionInstances[5].selected).toBe(true);
        }));
        it('should override the previously-selected value when setting an array', testing_2.fakeAsync(function () {
            trigger.click();
            fixture.detectChanges();
            var options = overlayContainerElement.querySelectorAll('mat-option');
            options[0].click();
            fixture.detectChanges();
            expect(options[0].classList).toContain('mat-selected');
            testInstance.control.setValue(['eggs-5']);
            fixture.detectChanges();
            expect(options[0].classList).not.toContain('mat-selected');
            expect(options[5].classList).toContain('mat-selected');
        }));
        it('should not close the panel when clicking on options', testing_2.fakeAsync(function () {
            trigger.click();
            fixture.detectChanges();
            expect(testInstance.select.panelOpen).toBe(true);
            var options = overlayContainerElement.querySelectorAll('mat-option');
            options[0].click();
            options[1].click();
            fixture.detectChanges();
            expect(testInstance.select.panelOpen).toBe(true);
        }));
        it('should sort the selected options based on their order in the panel', testing_2.fakeAsync(function () {
            trigger.click();
            fixture.detectChanges();
            testing_2.flush();
            var options = overlayContainerElement.querySelectorAll('mat-option');
            options[2].click();
            options[0].click();
            options[1].click();
            fixture.detectChanges();
            expect(trigger.textContent).toContain('Steak, Pizza, Tacos');
            expect(fixture.componentInstance.control.value).toEqual(['steak-0', 'pizza-1', 'tacos-2']);
        }));
        it('should sort the selected options in reverse in rtl', testing_2.fakeAsync(function () {
            dir.value = 'rtl';
            trigger.click();
            fixture.detectChanges();
            testing_2.flush();
            var options = overlayContainerElement.querySelectorAll('mat-option');
            options[2].click();
            options[0].click();
            options[1].click();
            fixture.detectChanges();
            expect(trigger.textContent).toContain('Tacos, Pizza, Steak');
            expect(fixture.componentInstance.control.value).toEqual(['steak-0', 'pizza-1', 'tacos-2']);
        }));
        it('should be able to customize the value sorting logic', testing_2.fakeAsync(function () {
            fixture.componentInstance.sortComparator = function (a, b, optionsArray) {
                return optionsArray.indexOf(b) - optionsArray.indexOf(a);
            };
            fixture.detectChanges();
            trigger.click();
            fixture.detectChanges();
            testing_2.flush();
            var options = overlayContainerElement.querySelectorAll('mat-option');
            for (var i = 0; i < 3; i++) {
                options[i].click();
            }
            fixture.detectChanges();
            // Expect the items to be in reverse order.
            expect(trigger.textContent).toContain('Tacos, Pizza, Steak');
            expect(fixture.componentInstance.control.value).toEqual(['tacos-2', 'pizza-1', 'steak-0']);
        }));
        it('should sort the values that get set via the model based on the panel order', testing_2.fakeAsync(function () {
            trigger.click();
            fixture.detectChanges();
            testInstance.control.setValue(['tacos-2', 'steak-0', 'pizza-1']);
            fixture.detectChanges();
            expect(trigger.textContent).toContain('Steak, Pizza, Tacos');
        }));
        it('should reverse sort the values, that get set via the model in rtl', testing_2.fakeAsync(function () {
            dir.value = 'rtl';
            trigger.click();
            fixture.detectChanges();
            testInstance.control.setValue(['tacos-2', 'steak-0', 'pizza-1']);
            fixture.detectChanges();
            expect(trigger.textContent).toContain('Tacos, Pizza, Steak');
        }));
        it('should throw an exception when trying to set a non-array value', testing_2.fakeAsync(function () {
            expect(function () {
                testInstance.control.setValue('not-an-array');
            }).toThrowError(testing_1.wrappedErrorMessage(select_errors_1.getMatSelectNonArrayValueError()));
        }));
        it('should throw an exception when trying to change multiple mode after init', testing_2.fakeAsync(function () {
            expect(function () {
                testInstance.select.multiple = false;
            }).toThrowError(testing_1.wrappedErrorMessage(select_errors_1.getMatSelectDynamicMultipleError()));
        }));
        it('should pass the `multiple` value to all of the option instances', testing_2.fakeAsync(function () {
            trigger.click();
            fixture.detectChanges();
            testing_2.flush();
            expect(testInstance.options.toArray().every(function (option) { return !!option.multiple; })).toBe(true, 'Expected `multiple` to have been added to initial set of options.');
            testInstance.foods.push({ value: 'cake-8', viewValue: 'Cake' });
            fixture.detectChanges();
            expect(testInstance.options.toArray().every(function (option) { return !!option.multiple; })).toBe(true, 'Expected `multiple` to have been set on dynamically-added option.');
        }));
        it('should update the active item index on click', testing_2.fakeAsync(function () {
            trigger.click();
            fixture.detectChanges();
            testing_2.flush();
            expect(fixture.componentInstance.select._keyManager.activeItemIndex).toBe(0);
            var options = overlayContainerElement.querySelectorAll('mat-option');
            options[2].click();
            fixture.detectChanges();
            expect(fixture.componentInstance.select._keyManager.activeItemIndex).toBe(2);
        }));
        it('should be to select an option with a `null` value', testing_2.fakeAsync(function () {
            fixture.componentInstance.foods = [
                { value: null, viewValue: 'Steak' },
                { value: 'pizza-1', viewValue: 'Pizza' },
                { value: null, viewValue: 'Tacos' },
            ];
            fixture.detectChanges();
            trigger.click();
            fixture.detectChanges();
            var options = overlayContainerElement.querySelectorAll('mat-option');
            options[0].click();
            options[1].click();
            options[2].click();
            fixture.detectChanges();
            expect(testInstance.control.value).toEqual([null, 'pizza-1', null]);
        }));
        it('should select all options when pressing ctrl + a', function () {
            var selectElement = fixture.nativeElement.querySelector('mat-select');
            var options = fixture.componentInstance.options.toArray();
            expect(testInstance.control.value).toBeFalsy();
            expect(options.every(function (option) { return option.selected; })).toBe(false);
            fixture.componentInstance.select.open();
            fixture.detectChanges();
            var event = testing_1.createKeyboardEvent('keydown', keycodes_1.A, selectElement);
            Object.defineProperty(event, 'ctrlKey', { get: function () { return true; } });
            testing_1.dispatchEvent(selectElement, event);
            fixture.detectChanges();
            expect(options.every(function (option) { return option.selected; })).toBe(true);
            expect(testInstance.control.value).toEqual([
                'steak-0',
                'pizza-1',
                'tacos-2',
                'sandwich-3',
                'chips-4',
                'eggs-5',
                'pasta-6',
                'sushi-7'
            ]);
        });
        it('should select all options when pressing ctrl + a when some options are selected', function () {
            var selectElement = fixture.nativeElement.querySelector('mat-select');
            var options = fixture.componentInstance.options.toArray();
            options[0].select();
            fixture.detectChanges();
            expect(testInstance.control.value).toEqual(['steak-0']);
            expect(options.some(function (option) { return option.selected; })).toBe(true);
            fixture.componentInstance.select.open();
            fixture.detectChanges();
            var event = testing_1.createKeyboardEvent('keydown', keycodes_1.A, selectElement);
            Object.defineProperty(event, 'ctrlKey', { get: function () { return true; } });
            testing_1.dispatchEvent(selectElement, event);
            fixture.detectChanges();
            expect(options.every(function (option) { return option.selected; })).toBe(true);
            expect(testInstance.control.value).toEqual([
                'steak-0',
                'pizza-1',
                'tacos-2',
                'sandwich-3',
                'chips-4',
                'eggs-5',
                'pasta-6',
                'sushi-7'
            ]);
        });
        it('should deselect all options with ctrl + a if all options are selected', function () {
            var selectElement = fixture.nativeElement.querySelector('mat-select');
            var options = fixture.componentInstance.options.toArray();
            options.forEach(function (option) { return option.select(); });
            fixture.detectChanges();
            expect(testInstance.control.value).toEqual([
                'steak-0',
                'pizza-1',
                'tacos-2',
                'sandwich-3',
                'chips-4',
                'eggs-5',
                'pasta-6',
                'sushi-7'
            ]);
            expect(options.every(function (option) { return option.selected; })).toBe(true);
            fixture.componentInstance.select.open();
            fixture.detectChanges();
            var event = testing_1.createKeyboardEvent('keydown', keycodes_1.A, selectElement);
            Object.defineProperty(event, 'ctrlKey', { get: function () { return true; } });
            testing_1.dispatchEvent(selectElement, event);
            fixture.detectChanges();
            expect(options.some(function (option) { return option.selected; })).toBe(false);
            expect(testInstance.control.value).toEqual([]);
        });
    });
});
var BasicSelect = /** @class */ (function () {
    function BasicSelect() {
        this.foods = [
            { value: 'steak-0', viewValue: 'Steak' },
            { value: 'pizza-1', viewValue: 'Pizza' },
            { value: 'tacos-2', viewValue: 'Tacos', disabled: true },
            { value: 'sandwich-3', viewValue: 'Sandwich' },
            { value: 'chips-4', viewValue: 'Chips' },
            { value: 'eggs-5', viewValue: 'Eggs' },
            { value: 'pasta-6', viewValue: 'Pasta' },
            { value: 'sushi-7', viewValue: 'Sushi' },
        ];
        this.control = new forms_1.FormControl();
        this.heightAbove = 0;
        this.heightBelow = 0;
        this.panelClass = ['custom-one', 'custom-two'];
    }
    BasicSelect.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'basic-select',
                    template: "\n    <div [style.height.px]=\"heightAbove\"></div>\n    <mat-form-field>\n      <mat-select placeholder=\"Food\" [formControl]=\"control\" [required]=\"isRequired\"\n        [tabIndex]=\"tabIndexOverride\" [aria-label]=\"ariaLabel\" [aria-labelledby]=\"ariaLabelledby\"\n        [panelClass]=\"panelClass\" [disableRipple]=\"disableRipple\">\n        <mat-option *ngFor=\"let food of foods\" [value]=\"food.value\" [disabled]=\"food.disabled\">\n          {{ food.viewValue }}\n        </mat-option>\n      </mat-select>\n    </mat-form-field>\n    <div [style.height.px]=\"heightBelow\"></div>\n  "
                },] },
    ];
    /** @nocollapse */
    BasicSelect.propDecorators = {
        "select": [{ type: core_1.ViewChild, args: [select_1.MatSelect,] },],
        "options": [{ type: core_1.ViewChildren, args: [core_2.MatOption,] },],
    };
    return BasicSelect;
}());
var NgModelSelect = /** @class */ (function () {
    function NgModelSelect() {
        this.foods = [
            { value: 'steak-0', viewValue: 'Steak' },
            { value: 'pizza-1', viewValue: 'Pizza' },
            { value: 'tacos-2', viewValue: 'Tacos' },
        ];
    }
    NgModelSelect.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'ng-model-select',
                    template: "\n    <mat-form-field>\n      <mat-select placeholder=\"Food\" ngModel [disabled]=\"isDisabled\">\n        <mat-option *ngFor=\"let food of foods\"\n                    [value]=\"food.value\">{{ food.viewValue }}\n        </mat-option>\n      </mat-select>\n    </mat-form-field>\n  "
                },] },
    ];
    /** @nocollapse */
    NgModelSelect.propDecorators = {
        "select": [{ type: core_1.ViewChild, args: [select_1.MatSelect,] },],
        "options": [{ type: core_1.ViewChildren, args: [core_2.MatOption,] },],
    };
    return NgModelSelect;
}());
var ManySelects = /** @class */ (function () {
    function ManySelects() {
    }
    ManySelects.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'many-selects',
                    template: "\n    <mat-form-field>\n      <mat-select placeholder=\"First\">\n        <mat-option value=\"one\">one</mat-option>\n        <mat-option value=\"two\">two</mat-option>\n      </mat-select>\n    </mat-form-field>\n    <mat-form-field>\n      <mat-select placeholder=\"Second\">\n        <mat-option value=\"three\">three</mat-option>\n        <mat-option value=\"four\">four</mat-option>\n      </mat-select>\n    </mat-form-field>\n  "
                },] },
    ];
    return ManySelects;
}());
var NgIfSelect = /** @class */ (function () {
    function NgIfSelect() {
        this.isShowing = false;
        this.foods = [
            { value: 'steak-0', viewValue: 'Steak' },
            { value: 'pizza-1', viewValue: 'Pizza' },
            { value: 'tacos-2', viewValue: 'Tacos' }
        ];
        this.control = new forms_1.FormControl('pizza-1');
    }
    NgIfSelect.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'ng-if-select',
                    template: "\n    <div *ngIf=\"isShowing\">\n      <mat-form-field>\n        <mat-select placeholder=\"Food I want to eat right now\" [formControl]=\"control\">\n          <mat-option *ngFor=\"let food of foods\" [value]=\"food.value\">\n            {{ food.viewValue }}\n          </mat-option>\n        </mat-select>\n      </mat-form-field>\n    </div>\n  ",
                },] },
    ];
    /** @nocollapse */
    NgIfSelect.propDecorators = {
        "select": [{ type: core_1.ViewChild, args: [select_1.MatSelect,] },],
    };
    return NgIfSelect;
}());
var SelectWithChangeEvent = /** @class */ (function () {
    function SelectWithChangeEvent() {
        this.foods = [
            'steak-0',
            'pizza-1',
            'tacos-2',
            'sandwich-3',
            'chips-4',
            'eggs-5',
            'pasta-6',
            'sushi-7'
        ];
        this.changeListener = jasmine.createSpy('MatSelect change listener');
    }
    SelectWithChangeEvent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'select-with-change-event',
                    template: "\n    <mat-form-field>\n      <mat-select (selectionChange)=\"changeListener($event)\">\n        <mat-option *ngFor=\"let food of foods\" [value]=\"food\">{{ food }}</mat-option>\n      </mat-select>\n    </mat-form-field>\n  "
                },] },
    ];
    return SelectWithChangeEvent;
}());
var SelectInitWithoutOptions = /** @class */ (function () {
    function SelectInitWithoutOptions() {
        this.control = new forms_1.FormControl('pizza-1');
    }
    SelectInitWithoutOptions.prototype.addOptions = function () {
        this.foods = [
            { value: 'steak-0', viewValue: 'Steak' },
            { value: 'pizza-1', viewValue: 'Pizza' },
            { value: 'tacos-2', viewValue: 'Tacos' }
        ];
    };
    SelectInitWithoutOptions.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'select-init-without-options',
                    template: "\n    <mat-form-field>\n      <mat-select placeholder=\"Food I want to eat right now\" [formControl]=\"control\">\n        <mat-option *ngFor=\"let food of foods\" [value]=\"food.value\">\n          {{ food.viewValue }}\n        </mat-option>\n      </mat-select>\n    </mat-form-field>\n  "
                },] },
    ];
    /** @nocollapse */
    SelectInitWithoutOptions.propDecorators = {
        "select": [{ type: core_1.ViewChild, args: [select_1.MatSelect,] },],
        "options": [{ type: core_1.ViewChildren, args: [core_2.MatOption,] },],
    };
    return SelectInitWithoutOptions;
}());
var CustomSelectAccessor = /** @class */ (function () {
    function CustomSelectAccessor() {
        this.writeValue = function () { };
        this.registerOnChange = function () { };
        this.registerOnTouched = function () { };
    }
    CustomSelectAccessor.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'custom-select-accessor',
                    template: "<mat-form-field><mat-select></mat-select></mat-form-field>",
                    providers: [{
                            provide: forms_1.NG_VALUE_ACCESSOR,
                            useExisting: CustomSelectAccessor,
                            multi: true
                        }]
                },] },
    ];
    /** @nocollapse */
    CustomSelectAccessor.propDecorators = {
        "select": [{ type: core_1.ViewChild, args: [select_1.MatSelect,] },],
    };
    return CustomSelectAccessor;
}());
var CompWithCustomSelect = /** @class */ (function () {
    function CompWithCustomSelect() {
        this.ctrl = new forms_1.FormControl('initial value');
    }
    CompWithCustomSelect.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'comp-with-custom-select',
                    template: "<custom-select-accessor [formControl]=\"ctrl\"></custom-select-accessor>",
                    providers: [{
                            provide: forms_1.NG_VALUE_ACCESSOR,
                            useExisting: CustomSelectAccessor,
                            multi: true
                        }]
                },] },
    ];
    /** @nocollapse */
    CompWithCustomSelect.propDecorators = {
        "customAccessor": [{ type: core_1.ViewChild, args: [CustomSelectAccessor,] },],
    };
    return CompWithCustomSelect;
}());
var SelectWithErrorSibling = /** @class */ (function () {
    function SelectWithErrorSibling() {
    }
    SelectWithErrorSibling.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'select-infinite-loop',
                    template: "\n    <mat-form-field>\n      <mat-select [(ngModel)]=\"value\"></mat-select>\n    </mat-form-field>\n    <throws-error-on-init></throws-error-on-init>\n  "
                },] },
    ];
    return SelectWithErrorSibling;
}());
var ThrowsErrorOnInit = /** @class */ (function () {
    function ThrowsErrorOnInit() {
    }
    ThrowsErrorOnInit.prototype.ngOnInit = function () {
        throw Error('Oh no!');
    };
    ThrowsErrorOnInit.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'throws-error-on-init',
                    template: ''
                },] },
    ];
    return ThrowsErrorOnInit;
}());
var BasicSelectOnPush = /** @class */ (function () {
    function BasicSelectOnPush() {
        this.foods = [
            { value: 'steak-0', viewValue: 'Steak' },
            { value: 'pizza-1', viewValue: 'Pizza' },
            { value: 'tacos-2', viewValue: 'Tacos' },
        ];
        this.control = new forms_1.FormControl();
    }
    BasicSelectOnPush.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'basic-select-on-push',
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    template: "\n    <mat-form-field>\n      <mat-select placeholder=\"Food\" [formControl]=\"control\">\n        <mat-option *ngFor=\"let food of foods\" [value]=\"food.value\">\n          {{ food.viewValue }}\n        </mat-option>\n      </mat-select>\n    </mat-form-field>\n  "
                },] },
    ];
    return BasicSelectOnPush;
}());
var BasicSelectOnPushPreselected = /** @class */ (function () {
    function BasicSelectOnPushPreselected() {
        this.foods = [
            { value: 'steak-0', viewValue: 'Steak' },
            { value: 'pizza-1', viewValue: 'Pizza' },
            { value: 'tacos-2', viewValue: 'Tacos' },
        ];
        this.control = new forms_1.FormControl('pizza-1');
    }
    BasicSelectOnPushPreselected.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'basic-select-on-push-preselected',
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    template: "\n    <mat-form-field>\n      <mat-select placeholder=\"Food\" [formControl]=\"control\">\n        <mat-option *ngFor=\"let food of foods\" [value]=\"food.value\">\n          {{ food.viewValue }}\n        </mat-option>\n      </mat-select>\n    </mat-form-field>\n  "
                },] },
    ];
    return BasicSelectOnPushPreselected;
}());
var FloatLabelSelect = /** @class */ (function () {
    function FloatLabelSelect() {
        this.floatLabel = 'auto';
        this.control = new forms_1.FormControl();
        this.foods = [
            { value: 'steak-0', viewValue: 'Steak' },
            { value: 'pizza-1', viewValue: 'Pizza' },
            { value: 'tacos-2', viewValue: 'Tacos' }
        ];
    }
    FloatLabelSelect.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'floating-label-select',
                    template: "\n    <mat-form-field [floatLabel]=\"floatLabel\">\n      <mat-select placeholder=\"Food I want to eat right now\" [formControl]=\"control\">\n        <mat-option *ngFor=\"let food of foods\" [value]=\"food.value\">\n          {{ food.viewValue }}\n        </mat-option>\n      </mat-select>\n    </mat-form-field>\n    ",
                },] },
    ];
    /** @nocollapse */
    FloatLabelSelect.propDecorators = {
        "select": [{ type: core_1.ViewChild, args: [select_1.MatSelect,] },],
    };
    return FloatLabelSelect;
}());
var MultiSelect = /** @class */ (function () {
    function MultiSelect() {
        this.foods = [
            { value: 'steak-0', viewValue: 'Steak' },
            { value: 'pizza-1', viewValue: 'Pizza' },
            { value: 'tacos-2', viewValue: 'Tacos' },
            { value: 'sandwich-3', viewValue: 'Sandwich' },
            { value: 'chips-4', viewValue: 'Chips' },
            { value: 'eggs-5', viewValue: 'Eggs' },
            { value: 'pasta-6', viewValue: 'Pasta' },
            { value: 'sushi-7', viewValue: 'Sushi' },
        ];
        this.control = new forms_1.FormControl();
    }
    MultiSelect.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'multi-select',
                    template: "\n    <mat-form-field>\n      <mat-select multiple placeholder=\"Food\" [formControl]=\"control\"\n        [sortComparator]=\"sortComparator\">\n        <mat-option *ngFor=\"let food of foods\"\n                    [value]=\"food.value\">{{ food.viewValue }}\n        </mat-option>\n      </mat-select>\n    </mat-form-field>\n  "
                },] },
    ];
    /** @nocollapse */
    MultiSelect.propDecorators = {
        "select": [{ type: core_1.ViewChild, args: [select_1.MatSelect,] },],
        "options": [{ type: core_1.ViewChildren, args: [core_2.MatOption,] },],
    };
    return MultiSelect;
}());
var SelectWithPlainTabindex = /** @class */ (function () {
    function SelectWithPlainTabindex() {
    }
    SelectWithPlainTabindex.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'select-with-plain-tabindex',
                    template: "<mat-form-field><mat-select tabindex=\"5\"></mat-select></mat-form-field>"
                },] },
    ];
    return SelectWithPlainTabindex;
}());
var SelectEarlyAccessSibling = /** @class */ (function () {
    function SelectEarlyAccessSibling() {
    }
    SelectEarlyAccessSibling.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'select-early-sibling-access',
                    template: "\n    <mat-form-field>\n      <mat-select #select=\"matSelect\"></mat-select>\n    </mat-form-field>\n    <div *ngIf=\"select.selected\"></div>\n  "
                },] },
    ];
    return SelectEarlyAccessSibling;
}());
var BasicSelectInitiallyHidden = /** @class */ (function () {
    function BasicSelectInitiallyHidden() {
        this.isVisible = false;
    }
    BasicSelectInitiallyHidden.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'basic-select-initially-hidden',
                    template: "\n    <mat-form-field>\n      <mat-select [style.display]=\"isVisible ? 'block' : 'none'\">\n        <mat-option value=\"value\">There are no other options</mat-option>\n      </mat-select>\n    </mat-form-field>\n  "
                },] },
    ];
    return BasicSelectInitiallyHidden;
}());
var BasicSelectNoPlaceholder = /** @class */ (function () {
    function BasicSelectNoPlaceholder() {
    }
    BasicSelectNoPlaceholder.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'basic-select-no-placeholder',
                    template: "\n    <mat-form-field>\n      <mat-select>\n        <mat-option value=\"value\">There are no other options</mat-option>\n      </mat-select>\n    </mat-form-field>\n  "
                },] },
    ];
    return BasicSelectNoPlaceholder;
}());
var BasicSelectWithTheming = /** @class */ (function () {
    function BasicSelectWithTheming() {
    }
    BasicSelectWithTheming.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'basic-select-with-theming',
                    template: "\n    <mat-form-field [color]=\"theme\">\n      <mat-select placeholder=\"Food\">\n        <mat-option value=\"steak-0\">Steak</mat-option>\n        <mat-option value=\"pizza-1\">Pizza</mat-option>\n      </mat-select>\n    </mat-form-field>\n  "
                },] },
    ];
    /** @nocollapse */
    BasicSelectWithTheming.propDecorators = {
        "select": [{ type: core_1.ViewChild, args: [select_1.MatSelect,] },],
    };
    return BasicSelectWithTheming;
}());
var ResetValuesSelect = /** @class */ (function () {
    function ResetValuesSelect() {
        this.foods = [
            { value: 'steak-0', viewValue: 'Steak' },
            { value: 'pizza-1', viewValue: 'Pizza' },
            { value: 'tacos-2', viewValue: 'Tacos' },
            { value: false, viewValue: 'Falsy' },
            { viewValue: 'Undefined' },
            { value: null, viewValue: 'Null' },
        ];
        this.control = new forms_1.FormControl();
    }
    ResetValuesSelect.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'reset-values-select',
                    template: "\n    <mat-form-field>\n      <mat-select placeholder=\"Food\" [formControl]=\"control\">\n        <mat-option *ngFor=\"let food of foods\" [value]=\"food.value\">\n          {{ food.viewValue }}\n        </mat-option>\n        <mat-option>None</mat-option>\n      </mat-select>\n    </mat-form-field>\n  "
                },] },
    ];
    /** @nocollapse */
    ResetValuesSelect.propDecorators = {
        "select": [{ type: core_1.ViewChild, args: [select_1.MatSelect,] },],
    };
    return ResetValuesSelect;
}());
var FalsyValueSelect = /** @class */ (function () {
    function FalsyValueSelect() {
        this.foods = [
            { value: 0, viewValue: 'Steak' },
            { value: 1, viewValue: 'Pizza' },
        ];
        this.control = new forms_1.FormControl();
    }
    FalsyValueSelect.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <mat-form-field>\n      <mat-select [formControl]=\"control\">\n        <mat-option *ngFor=\"let food of foods\"\n                    [value]=\"food.value\">{{ food.viewValue }}\n        </mat-option>\n      </mat-select>\n    </mat-form-field>\n  "
                },] },
    ];
    /** @nocollapse */
    FalsyValueSelect.propDecorators = {
        "options": [{ type: core_1.ViewChildren, args: [core_2.MatOption,] },],
    };
    return FalsyValueSelect;
}());
var SelectWithGroups = /** @class */ (function () {
    function SelectWithGroups() {
        this.control = new forms_1.FormControl();
        this.pokemonTypes = [
            {
                name: 'Grass',
                pokemon: [
                    { value: 'bulbasaur-0', viewValue: 'Bulbasaur' },
                    { value: 'oddish-1', viewValue: 'Oddish' },
                    { value: 'bellsprout-2', viewValue: 'Bellsprout' }
                ]
            },
            {
                name: 'Water',
                disabled: true,
                pokemon: [
                    { value: 'squirtle-3', viewValue: 'Squirtle' },
                    { value: 'psyduck-4', viewValue: 'Psyduck' },
                    { value: 'horsea-5', viewValue: 'Horsea' }
                ]
            },
            {
                name: 'Fire',
                pokemon: [
                    { value: 'charmander-6', viewValue: 'Charmander' },
                    { value: 'vulpix-7', viewValue: 'Vulpix' },
                    { value: 'flareon-8', viewValue: 'Flareon' }
                ]
            },
            {
                name: 'Psychic',
                pokemon: [
                    { value: 'mew-9', viewValue: 'Mew' },
                    { value: 'mewtwo-10', viewValue: 'Mewtwo' },
                ]
            }
        ];
    }
    SelectWithGroups.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'select-with-groups',
                    template: "\n    <mat-form-field>\n      <mat-select placeholder=\"Pokemon\" [formControl]=\"control\">\n        <mat-optgroup *ngFor=\"let group of pokemonTypes\" [label]=\"group.name\"\n          [disabled]=\"group.disabled\">\n          <mat-option *ngFor=\"let pokemon of group.pokemon\" [value]=\"pokemon.value\">\n            {{ pokemon.viewValue }}\n          </mat-option>\n        </mat-optgroup>\n        <mat-option value=\"mime-11\">Mr. Mime</mat-option>\n      </mat-select>\n    </mat-form-field>\n  "
                },] },
    ];
    /** @nocollapse */
    SelectWithGroups.propDecorators = {
        "select": [{ type: core_1.ViewChild, args: [select_1.MatSelect,] },],
        "options": [{ type: core_1.ViewChildren, args: [core_2.MatOption,] },],
    };
    return SelectWithGroups;
}());
var SelectWithGroupsAndNgContainer = /** @class */ (function () {
    function SelectWithGroupsAndNgContainer() {
        this.control = new forms_1.FormControl();
        this.pokemonTypes = [
            {
                name: 'Grass',
                pokemon: [{ value: 'bulbasaur-0', viewValue: 'Bulbasaur' }]
            }
        ];
    }
    SelectWithGroupsAndNgContainer.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'select-with-groups',
                    template: "\n    <mat-form-field>\n      <mat-select placeholder=\"Pokemon\" [formControl]=\"control\">\n        <mat-optgroup *ngFor=\"let group of pokemonTypes\" [label]=\"group.name\">\n          <ng-container *ngFor=\"let pokemon of group.pokemon\">\n            <mat-option [value]=\"pokemon.value\">{{ pokemon.viewValue }}</mat-option>\n          </ng-container>\n        </mat-optgroup>\n      </mat-select>\n    </mat-form-field>\n  "
                },] },
    ];
    return SelectWithGroupsAndNgContainer;
}());
var InvalidSelectInForm = /** @class */ (function () {
    function InvalidSelectInForm() {
    }
    InvalidSelectInForm.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <form>\n      <mat-form-field>\n        <mat-select [(ngModel)]=\"value\"></mat-select>\n      </mat-form-field>\n    </form>\n  "
                },] },
    ];
    return InvalidSelectInForm;
}());
var SelectInsideFormGroup = /** @class */ (function () {
    function SelectInsideFormGroup() {
        this.formControl = new forms_1.FormControl('', forms_1.Validators.required);
        this.formGroup = new forms_1.FormGroup({
            food: this.formControl
        });
    }
    SelectInsideFormGroup.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <form [formGroup]=\"formGroup\">\n      <mat-form-field>\n        <mat-select placeholder=\"Food\" formControlName=\"food\">\n          <mat-option value=\"steak-0\">Steak</mat-option>\n          <mat-option value=\"pizza-1\">Pizza</mat-option>\n        </mat-select>\n\n        <mat-error>This field is required</mat-error>\n      </mat-form-field>\n    </form>\n  "
                },] },
    ];
    /** @nocollapse */
    SelectInsideFormGroup.propDecorators = {
        "formGroupDirective": [{ type: core_1.ViewChild, args: [forms_1.FormGroupDirective,] },],
        "select": [{ type: core_1.ViewChild, args: [select_1.MatSelect,] },],
    };
    return SelectInsideFormGroup;
}());
var BasicSelectWithoutForms = /** @class */ (function () {
    function BasicSelectWithoutForms() {
        this.foods = [
            { value: 'steak-0', viewValue: 'Steak' },
            { value: 'pizza-1', viewValue: 'Pizza' },
            { value: 'sandwich-2', viewValue: 'Sandwich' },
        ];
    }
    BasicSelectWithoutForms.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <mat-form-field>\n      <mat-select placeholder=\"Food\" [(value)]=\"selectedFood\">\n        <mat-option *ngFor=\"let food of foods\" [value]=\"food.value\">\n          {{ food.viewValue }}\n        </mat-option>\n      </mat-select>\n    </mat-form-field>\n  "
                },] },
    ];
    /** @nocollapse */
    BasicSelectWithoutForms.propDecorators = {
        "select": [{ type: core_1.ViewChild, args: [select_1.MatSelect,] },],
    };
    return BasicSelectWithoutForms;
}());
var BasicSelectWithoutFormsPreselected = /** @class */ (function () {
    function BasicSelectWithoutFormsPreselected() {
        this.selectedFood = 'pizza-1';
        this.foods = [
            { value: 'steak-0', viewValue: 'Steak' },
            { value: 'pizza-1', viewValue: 'Pizza' },
        ];
    }
    BasicSelectWithoutFormsPreselected.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <mat-form-field>\n      <mat-select placeholder=\"Food\" [(value)]=\"selectedFood\">\n        <mat-option *ngFor=\"let food of foods\" [value]=\"food.value\">\n          {{ food.viewValue }}\n        </mat-option>\n      </mat-select>\n    </mat-form-field>\n  "
                },] },
    ];
    /** @nocollapse */
    BasicSelectWithoutFormsPreselected.propDecorators = {
        "select": [{ type: core_1.ViewChild, args: [select_1.MatSelect,] },],
    };
    return BasicSelectWithoutFormsPreselected;
}());
var BasicSelectWithoutFormsMultiple = /** @class */ (function () {
    function BasicSelectWithoutFormsMultiple() {
        this.foods = [
            { value: 'steak-0', viewValue: 'Steak' },
            { value: 'pizza-1', viewValue: 'Pizza' },
            { value: 'sandwich-2', viewValue: 'Sandwich' },
        ];
    }
    BasicSelectWithoutFormsMultiple.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <mat-form-field>\n      <mat-select placeholder=\"Food\" [(value)]=\"selectedFoods\" multiple>\n        <mat-option *ngFor=\"let food of foods\" [value]=\"food.value\">\n          {{ food.viewValue }}\n        </mat-option>\n      </mat-select>\n    </mat-form-field>\n  "
                },] },
    ];
    /** @nocollapse */
    BasicSelectWithoutFormsMultiple.propDecorators = {
        "select": [{ type: core_1.ViewChild, args: [select_1.MatSelect,] },],
    };
    return BasicSelectWithoutFormsMultiple;
}());
var SelectWithCustomTrigger = /** @class */ (function () {
    function SelectWithCustomTrigger() {
        this.foods = [
            { value: 'steak-0', viewValue: 'Steak' },
            { value: 'pizza-1', viewValue: 'Pizza' },
        ];
        this.control = new forms_1.FormControl();
    }
    SelectWithCustomTrigger.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'select-with-custom-trigger',
                    template: "\n    <mat-form-field>\n      <mat-select placeholder=\"Food\" [formControl]=\"control\" #select=\"matSelect\">\n        <mat-select-trigger>\n          {{ select.selected?.viewValue.split('').reverse().join('') }}\n        </mat-select-trigger>\n        <mat-option *ngFor=\"let food of foods\" [value]=\"food.value\">\n          {{ food.viewValue }}\n        </mat-option>\n      </mat-select>\n    </mat-form-field>\n  "
                },] },
    ];
    return SelectWithCustomTrigger;
}());
var NgModelCompareWithSelect = /** @class */ (function () {
    function NgModelCompareWithSelect() {
        this.foods = [
            { value: 'steak-0', viewValue: 'Steak' },
            { value: 'pizza-1', viewValue: 'Pizza' },
            { value: 'tacos-2', viewValue: 'Tacos' },
        ];
        this.selectedFood = { value: 'pizza-1', viewValue: 'Pizza' };
        this.comparator = this.compareByValue;
    }
    NgModelCompareWithSelect.prototype.useCompareByValue = function () { this.comparator = this.compareByValue; };
    NgModelCompareWithSelect.prototype.useCompareByReference = function () { this.comparator = this.compareByReference; };
    NgModelCompareWithSelect.prototype.useNullComparator = function () { this.comparator = null; };
    NgModelCompareWithSelect.prototype.compareByValue = function (f1, f2) { return f1 && f2 && f1.value === f2.value; };
    NgModelCompareWithSelect.prototype.compareByReference = function (f1, f2) { return f1 === f2; };
    NgModelCompareWithSelect.prototype.setFoodByCopy = function (newValue) {
        this.selectedFood = __assign({}, newValue);
    };
    NgModelCompareWithSelect.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'ng-model-compare-with',
                    template: "\n    <mat-form-field>\n      <mat-select [ngModel]=\"selectedFood\" (ngModelChange)=\"setFoodByCopy($event)\"\n                 [compareWith]=\"comparator\">\n        <mat-option *ngFor=\"let food of foods\" [value]=\"food\">{{ food.viewValue }}</mat-option>\n      </mat-select>\n    </mat-form-field>\n  "
                },] },
    ];
    /** @nocollapse */
    NgModelCompareWithSelect.propDecorators = {
        "select": [{ type: core_1.ViewChild, args: [select_1.MatSelect,] },],
        "options": [{ type: core_1.ViewChildren, args: [core_2.MatOption,] },],
    };
    return NgModelCompareWithSelect;
}());
var CustomErrorBehaviorSelect = /** @class */ (function () {
    function CustomErrorBehaviorSelect() {
        this.control = new forms_1.FormControl();
        this.foods = [
            { value: 'steak-0', viewValue: 'Steak' },
            { value: 'pizza-1', viewValue: 'Pizza' },
        ];
    }
    CustomErrorBehaviorSelect.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <mat-select placeholder=\"Food\" [formControl]=\"control\" [errorStateMatcher]=\"errorStateMatcher\">\n      <mat-option *ngFor=\"let food of foods\" [value]=\"food.value\">\n        {{ food.viewValue }}\n      </mat-option>\n    </mat-select>\n  "
                },] },
    ];
    /** @nocollapse */
    CustomErrorBehaviorSelect.propDecorators = {
        "select": [{ type: core_1.ViewChild, args: [select_1.MatSelect,] },],
    };
    return CustomErrorBehaviorSelect;
}());
var SingleSelectWithPreselectedArrayValues = /** @class */ (function () {
    function SingleSelectWithPreselectedArrayValues() {
        this.foods = [
            { value: ['steak-0', 'steak-1'], viewValue: 'Steak' },
            { value: ['pizza-1', 'pizza-2'], viewValue: 'Pizza' },
            { value: ['tacos-2', 'tacos-3'], viewValue: 'Tacos' },
        ];
        this.selectedFoods = this.foods[1].value;
    }
    SingleSelectWithPreselectedArrayValues.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <mat-form-field>\n      <mat-select placeholder=\"Food\" [(ngModel)]=\"selectedFoods\">\n        <mat-option *ngFor=\"let food of foods\"\n                    [value]=\"food.value\">{{ food.viewValue }}\n        </mat-option>\n      </mat-select>\n    </mat-form-field>\n  "
                },] },
    ];
    /** @nocollapse */
    SingleSelectWithPreselectedArrayValues.propDecorators = {
        "select": [{ type: core_1.ViewChild, args: [select_1.MatSelect,] },],
        "options": [{ type: core_1.ViewChildren, args: [core_2.MatOption,] },],
    };
    return SingleSelectWithPreselectedArrayValues;
}());
var SelectWithoutOptionCentering = /** @class */ (function () {
    function SelectWithoutOptionCentering() {
        this.foods = [
            { value: 'steak-0', viewValue: 'Steak' },
            { value: 'pizza-1', viewValue: 'Pizza' },
            { value: 'tacos-2', viewValue: 'Tacos' },
            { value: 'sandwich-3', viewValue: 'Sandwich' },
            { value: 'chips-4', viewValue: 'Chips' },
            { value: 'eggs-5', viewValue: 'Eggs' },
            { value: 'pasta-6', viewValue: 'Pasta' },
            { value: 'sushi-7', viewValue: 'Sushi' },
        ];
        this.control = new forms_1.FormControl('pizza-1');
    }
    SelectWithoutOptionCentering.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'select-without-option-centering',
                    template: "\n    <mat-form-field>\n      <mat-select placeholder=\"Food\" [formControl]=\"control\" disableOptionCentering>\n        <mat-option *ngFor=\"let food of foods\" [value]=\"food.value\">\n          {{ food.viewValue }}\n        </mat-option>\n      </mat-select>\n    </mat-form-field>\n  "
                },] },
    ];
    /** @nocollapse */
    SelectWithoutOptionCentering.propDecorators = {
        "select": [{ type: core_1.ViewChild, args: [select_1.MatSelect,] },],
        "options": [{ type: core_1.ViewChildren, args: [core_2.MatOption,] },],
    };
    return SelectWithoutOptionCentering;
}());
var SelectWithFormFieldLabel = /** @class */ (function () {
    function SelectWithFormFieldLabel() {
    }
    SelectWithFormFieldLabel.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <mat-form-field>\n      <mat-label>Select a thing</mat-label>\n\n      <mat-select [placeholder]=\"placeholder\">\n        <mat-option value=\"thing\">A thing</mat-option>\n      </mat-select>\n    </mat-form-field>\n  "
                },] },
    ];
    return SelectWithFormFieldLabel;
}());
//# sourceMappingURL=select.spec.js.map