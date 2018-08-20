"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var keycodes_1 = require("@angular/cdk/keycodes");
var overlay_1 = require("@angular/cdk/overlay");
var testing_1 = require("@angular/cdk/testing");
var core_1 = require("@angular/core");
var testing_2 = require("@angular/core/testing");
var forms_1 = require("@angular/forms");
var core_2 = require("@angular/material/core");
var form_field_1 = require("@angular/material/form-field");
var platform_browser_1 = require("@angular/platform-browser");
var animations_1 = require("@angular/platform-browser/animations");
var rxjs_1 = require("rxjs");
var index_1 = require("../input/index");
var datepicker_1 = require("./datepicker");
var datepicker_input_1 = require("./datepicker-input");
var datepicker_toggle_1 = require("./datepicker-toggle");
var index_2 = require("./index");
var bidi_1 = require("@angular/cdk/bidi");
var testing_3 = require("@angular/platform-browser-dynamic/testing");
describe('MatDatepicker', function () {
    var SUPPORTS_INTL = typeof Intl != 'undefined';
    // Creates a test component fixture.
    function createComponent(component, imports, providers, entryComponents) {
        if (imports === void 0) { imports = []; }
        if (providers === void 0) { providers = []; }
        if (entryComponents === void 0) { entryComponents = []; }
        testing_2.TestBed.configureTestingModule({
            imports: [
                forms_1.FormsModule,
                index_2.MatDatepickerModule,
                form_field_1.MatFormFieldModule,
                index_1.MatInputModule,
                animations_1.NoopAnimationsModule,
                forms_1.ReactiveFormsModule
            ].concat(imports),
            providers: providers,
            declarations: [component].concat(entryComponents),
        });
        testing_2.TestBed.overrideModule(testing_3.BrowserDynamicTestingModule, {
            set: {
                entryComponents: [entryComponents]
            }
        }).compileComponents();
        return testing_2.TestBed.createComponent(component);
    }
    afterEach(testing_2.inject([overlay_1.OverlayContainer], function (container) {
        container.ngOnDestroy();
    }));
    describe('with MatNativeDateModule', function () {
        describe('standard datepicker', function () {
            var fixture;
            var testComponent;
            beforeEach(testing_2.fakeAsync(function () {
                fixture = createComponent(StandardDatepicker, [core_2.MatNativeDateModule]);
                fixture.detectChanges();
                testComponent = fixture.componentInstance;
            }));
            afterEach(testing_2.fakeAsync(function () {
                testComponent.datepicker.close();
                fixture.detectChanges();
                testing_2.flush();
            }));
            it('should initialize with correct value shown in input', function () {
                if (SUPPORTS_INTL) {
                    expect(fixture.nativeElement.querySelector('input').value).toBe('1/1/2020');
                }
            });
            it('open non-touch should open popup', function () {
                expect(document.querySelector('.cdk-overlay-pane.mat-datepicker-popup')).toBeNull();
                testComponent.datepicker.open();
                fixture.detectChanges();
                expect(document.querySelector('.cdk-overlay-pane.mat-datepicker-popup')).not.toBeNull();
            });
            it('open touch should open dialog', function () {
                testComponent.touch = true;
                fixture.detectChanges();
                expect(document.querySelector('.mat-datepicker-dialog mat-dialog-container')).toBeNull();
                testComponent.datepicker.open();
                fixture.detectChanges();
                expect(document.querySelector('.mat-datepicker-dialog mat-dialog-container'))
                    .not.toBeNull();
            });
            it('should open datepicker if opened input is set to true', testing_2.fakeAsync(function () {
                testComponent.opened = true;
                fixture.detectChanges();
                testing_2.flush();
                expect(document.querySelector('.mat-datepicker-content')).not.toBeNull();
                testComponent.opened = false;
                fixture.detectChanges();
                testing_2.flush();
                expect(document.querySelector('.mat-datepicker-content')).toBeNull();
            }));
            it('open in disabled mode should not open the calendar', function () {
                testComponent.disabled = true;
                fixture.detectChanges();
                expect(document.querySelector('.cdk-overlay-pane')).toBeNull();
                expect(document.querySelector('mat-dialog-container')).toBeNull();
                testComponent.datepicker.open();
                fixture.detectChanges();
                expect(document.querySelector('.cdk-overlay-pane')).toBeNull();
                expect(document.querySelector('mat-dialog-container')).toBeNull();
            });
            it('disabled datepicker input should open the calendar if datepicker is enabled', function () {
                testComponent.datepicker.disabled = false;
                testComponent.datepickerInput.disabled = true;
                fixture.detectChanges();
                expect(document.querySelector('.cdk-overlay-pane')).toBeNull();
                testComponent.datepicker.open();
                fixture.detectChanges();
                expect(document.querySelector('.cdk-overlay-pane')).not.toBeNull();
            });
            it('close should close popup', testing_2.fakeAsync(function () {
                testComponent.datepicker.open();
                fixture.detectChanges();
                testing_2.flush();
                var popup = (document.querySelector('.cdk-overlay-pane'));
                expect(popup).not.toBeNull();
                expect(parseInt(getComputedStyle(popup).height)).not.toBe(0);
                testComponent.datepicker.close();
                fixture.detectChanges();
                testing_2.flush();
                expect(parseInt(getComputedStyle(popup).height)).toBe(0);
            }));
            it('should close the popup when pressing ESCAPE', testing_2.fakeAsync(function () {
                testComponent.datepicker.open();
                fixture.detectChanges();
                expect(testComponent.datepicker.opened).toBe(true, 'Expected datepicker to be open.');
                testing_1.dispatchKeyboardEvent(document.body, 'keydown', keycodes_1.ESCAPE);
                fixture.detectChanges();
                testing_2.flush();
                expect(testComponent.datepicker.opened).toBe(false, 'Expected datepicker to be closed.');
            }));
            it('should set the proper role on the popup', testing_2.fakeAsync(function () {
                testComponent.datepicker.open();
                fixture.detectChanges();
                testing_2.flush();
                var popup = (document.querySelector('.cdk-overlay-pane'));
                expect(popup).toBeTruthy();
                expect(popup.getAttribute('role')).toBe('dialog');
            }));
            it('close should close dialog', testing_2.fakeAsync(function () {
                testComponent.touch = true;
                fixture.detectChanges();
                testComponent.datepicker.open();
                fixture.detectChanges();
                expect(document.querySelector('mat-dialog-container')).not.toBeNull();
                testComponent.datepicker.close();
                fixture.detectChanges();
                testing_2.flush();
                expect(document.querySelector('mat-dialog-container')).toBeNull();
            }));
            it('setting selected via click should update input and close calendar', testing_2.fakeAsync(function () {
                testComponent.touch = true;
                fixture.detectChanges();
                testComponent.datepicker.open();
                fixture.detectChanges();
                testing_2.flush();
                expect(document.querySelector('mat-dialog-container')).not.toBeNull();
                expect(testComponent.datepickerInput.value).toEqual(new Date(2020, core_2.JAN, 1));
                var cells = document.querySelectorAll('.mat-calendar-body-cell');
                testing_1.dispatchMouseEvent(cells[1], 'click');
                fixture.detectChanges();
                testing_2.flush();
                expect(document.querySelector('mat-dialog-container')).toBeNull();
                expect(testComponent.datepickerInput.value).toEqual(new Date(2020, core_2.JAN, 2));
            }));
            it('setting selected via enter press should update input and close calendar', testing_2.fakeAsync(function () {
                testComponent.touch = true;
                fixture.detectChanges();
                testComponent.datepicker.open();
                fixture.detectChanges();
                testing_2.flush();
                expect(document.querySelector('mat-dialog-container')).not.toBeNull();
                expect(testComponent.datepickerInput.value).toEqual(new Date(2020, core_2.JAN, 1));
                var calendarBodyEl = document.querySelector('.mat-calendar-body');
                testing_1.dispatchKeyboardEvent(calendarBodyEl, 'keydown', keycodes_1.RIGHT_ARROW);
                fixture.detectChanges();
                testing_2.flush();
                testing_1.dispatchKeyboardEvent(calendarBodyEl, 'keydown', keycodes_1.ENTER);
                fixture.detectChanges();
                testing_2.flush();
                expect(document.querySelector('mat-dialog-container')).toBeNull();
                expect(testComponent.datepickerInput.value).toEqual(new Date(2020, core_2.JAN, 2));
            }));
            it('clicking the currently selected date should close the calendar ' +
                'without firing selectedChanged', testing_2.fakeAsync(function () {
                var selectedChangedSpy = spyOn(testComponent.datepicker._selectedChanged, 'next').and.callThrough();
                for (var changeCount = 1; changeCount < 3; changeCount++) {
                    var currentDay = changeCount;
                    testComponent.datepicker.open();
                    fixture.detectChanges();
                    expect(document.querySelector('mat-datepicker-content')).not.toBeNull();
                    expect(testComponent.datepickerInput.value).toEqual(new Date(2020, core_2.JAN, currentDay));
                    var cells = document.querySelectorAll('.mat-calendar-body-cell');
                    testing_1.dispatchMouseEvent(cells[1], 'click');
                    fixture.detectChanges();
                    testing_2.flush();
                }
                expect(selectedChangedSpy.calls.count()).toEqual(1);
                expect(document.querySelector('mat-dialog-container')).toBeNull();
                expect(testComponent.datepickerInput.value).toEqual(new Date(2020, core_2.JAN, 2));
            }));
            it('pressing enter on the currently selected date should close the calendar without ' +
                'firing selectedChanged', function () {
                var selectedChangedSpy = spyOn(testComponent.datepicker._selectedChanged, 'next').and.callThrough();
                testComponent.datepicker.open();
                fixture.detectChanges();
                var calendarBodyEl = document.querySelector('.mat-calendar-body');
                expect(calendarBodyEl).not.toBeNull();
                expect(testComponent.datepickerInput.value).toEqual(new Date(2020, core_2.JAN, 1));
                testing_1.dispatchKeyboardEvent(calendarBodyEl, 'keydown', keycodes_1.ENTER);
                fixture.detectChanges();
                fixture.whenStable().then(function () {
                    expect(selectedChangedSpy.calls.count()).toEqual(0);
                    expect(document.querySelector('mat-dialog-container')).toBeNull();
                    expect(testComponent.datepickerInput.value).toEqual(new Date(2020, core_2.JAN, 1));
                });
            });
            it('startAt should fallback to input value', function () {
                expect(testComponent.datepicker.startAt).toEqual(new Date(2020, core_2.JAN, 1));
            });
            it('should attach popup to native input', function () {
                var attachToRef = testComponent.datepickerInput.getConnectedOverlayOrigin();
                expect(attachToRef.nativeElement.tagName.toLowerCase())
                    .toBe('input', 'popup should be attached to native input');
            });
            it('input should aria-owns calendar after opened in non-touch mode', testing_2.fakeAsync(function () {
                var inputEl = fixture.debugElement.query(platform_browser_1.By.css('input')).nativeElement;
                expect(inputEl.getAttribute('aria-owns')).toBeNull();
                testComponent.datepicker.open();
                fixture.detectChanges();
                testing_2.flush();
                var ownedElementId = inputEl.getAttribute('aria-owns');
                expect(ownedElementId).not.toBeNull();
                var ownedElement = document.getElementById(ownedElementId);
                expect(ownedElement).not.toBeNull();
                expect(ownedElement.tagName.toLowerCase()).toBe('mat-calendar');
            }));
            it('input should aria-owns calendar after opened in touch mode', function () {
                testComponent.touch = true;
                fixture.detectChanges();
                var inputEl = fixture.debugElement.query(platform_browser_1.By.css('input')).nativeElement;
                expect(inputEl.getAttribute('aria-owns')).toBeNull();
                testComponent.datepicker.open();
                fixture.detectChanges();
                var ownedElementId = inputEl.getAttribute('aria-owns');
                expect(ownedElementId).not.toBeNull();
                var ownedElement = document.getElementById(ownedElementId);
                expect(ownedElement).not.toBeNull();
                expect(ownedElement.tagName.toLowerCase()).toBe('mat-calendar');
            });
            it('should not throw when given wrong data type', function () {
                testComponent.date = '1/1/2017';
                expect(function () { return fixture.detectChanges(); }).not.toThrow();
            });
            it('should clear out the backdrop subscriptions on close', testing_2.fakeAsync(function () {
                for (var i = 0; i < 3; i++) {
                    testComponent.datepicker.open();
                    fixture.detectChanges();
                    testComponent.datepicker.close();
                    fixture.detectChanges();
                }
                testComponent.datepicker.open();
                fixture.detectChanges();
                var spy = jasmine.createSpy('close event spy');
                var subscription = testComponent.datepicker.closedStream.subscribe(spy);
                var backdrop = document.querySelector('.cdk-overlay-backdrop');
                backdrop.click();
                fixture.detectChanges();
                testing_2.flush();
                expect(spy).toHaveBeenCalledTimes(1);
                expect(testComponent.datepicker.opened).toBe(false);
                subscription.unsubscribe();
            }));
            it('should reset the datepicker when it is closed externally', testing_2.fakeAsync(testing_2.inject([overlay_1.OverlayContainer], function (oldOverlayContainer) {
                // Destroy the old container manually since resetting the testing module won't do it.
                oldOverlayContainer.ngOnDestroy();
                testing_2.TestBed.resetTestingModule();
                var scrolledSubject = new rxjs_1.Subject();
                // Stub out a `CloseScrollStrategy` so we can trigger a detachment via the `OverlayRef`.
                fixture = createComponent(StandardDatepicker, [core_2.MatNativeDateModule], [
                    {
                        provide: overlay_1.ScrollDispatcher,
                        useValue: { scrolled: function () { return scrolledSubject; } }
                    },
                    {
                        provide: index_2.MAT_DATEPICKER_SCROLL_STRATEGY,
                        deps: [overlay_1.Overlay],
                        useFactory: function (overlay) { return function () { return overlay.scrollStrategies.close(); }; }
                    }
                ]);
                fixture.detectChanges();
                testComponent = fixture.componentInstance;
                testComponent.datepicker.open();
                fixture.detectChanges();
                expect(testComponent.datepicker.opened).toBe(true);
                scrolledSubject.next();
                testing_2.flush();
                fixture.detectChanges();
                expect(testComponent.datepicker.opened).toBe(false);
            })));
            it('should close the datpeicker using ALT + UP_ARROW', testing_2.fakeAsync(function () {
                testComponent.datepicker.open();
                fixture.detectChanges();
                testing_2.flush();
                expect(testComponent.datepicker.opened).toBe(true);
                var event = testing_1.createKeyboardEvent('keydown', keycodes_1.UP_ARROW);
                Object.defineProperty(event, 'altKey', { get: function () { return true; } });
                testing_1.dispatchEvent(document.body, event);
                fixture.detectChanges();
                testing_2.flush();
                expect(testComponent.datepicker.opened).toBe(false);
            }));
            it('should open the datpeicker using ALT + DOWN_ARROW', testing_2.fakeAsync(function () {
                expect(testComponent.datepicker.opened).toBe(false);
                var event = testing_1.createKeyboardEvent('keydown', keycodes_1.DOWN_ARROW);
                Object.defineProperty(event, 'altKey', { get: function () { return true; } });
                testing_1.dispatchEvent(fixture.nativeElement.querySelector('input'), event);
                fixture.detectChanges();
                testing_2.flush();
                expect(testComponent.datepicker.opened).toBe(true);
                expect(event.defaultPrevented).toBe(true);
            }));
        });
        describe('datepicker with too many inputs', function () {
            it('should throw when multiple inputs registered', testing_2.fakeAsync(function () {
                var fixture = createComponent(MultiInputDatepicker, [core_2.MatNativeDateModule]);
                expect(function () { return fixture.detectChanges(); }).toThrow();
            }));
        });
        describe('datepicker that is assigned to input at a later point', function () {
            it('should not throw on ALT + DOWN_ARROW for input without datepicker', testing_2.fakeAsync(function () {
                var fixture = createComponent(DelayedDatepicker, [core_2.MatNativeDateModule]);
                fixture.detectChanges();
                expect(function () {
                    var event = testing_1.createKeyboardEvent('keydown', keycodes_1.DOWN_ARROW);
                    Object.defineProperty(event, 'altKey', { get: function () { return true; } });
                    testing_1.dispatchEvent(fixture.nativeElement.querySelector('input'), event);
                    fixture.detectChanges();
                    testing_2.flush();
                }).not.toThrow();
            }));
            it('should handle value changes when a datepicker is assigned after init', testing_2.fakeAsync(function () {
                var fixture = createComponent(DelayedDatepicker, [core_2.MatNativeDateModule]);
                var testComponent = fixture.componentInstance;
                var toSelect = new Date(2017, core_2.JAN, 1);
                fixture.detectChanges();
                expect(testComponent.datepickerInput.value).toBeNull();
                expect(testComponent.datepicker._selected).toBeNull();
                testComponent.assignedDatepicker = testComponent.datepicker;
                fixture.detectChanges();
                testComponent.assignedDatepicker.select(toSelect);
                fixture.detectChanges();
                testing_2.flush();
                fixture.detectChanges();
                expect(testComponent.datepickerInput.value).toEqual(toSelect);
                expect(testComponent.datepicker._selected).toEqual(toSelect);
            }));
        });
        describe('datepicker with no inputs', function () {
            var fixture;
            var testComponent;
            beforeEach(testing_2.fakeAsync(function () {
                fixture = createComponent(NoInputDatepicker, [core_2.MatNativeDateModule]);
                fixture.detectChanges();
                testComponent = fixture.componentInstance;
            }));
            afterEach(testing_2.fakeAsync(function () {
                testComponent.datepicker.close();
                fixture.detectChanges();
            }));
            it('should not throw when accessing disabled property', function () {
                expect(function () { return testComponent.datepicker.disabled; }).not.toThrow();
            });
            it('should throw when opened with no registered inputs', testing_2.fakeAsync(function () {
                expect(function () { return testComponent.datepicker.open(); }).toThrow();
            }));
        });
        describe('datepicker with startAt', function () {
            var fixture;
            var testComponent;
            beforeEach(testing_2.fakeAsync(function () {
                fixture = createComponent(DatepickerWithStartAt, [core_2.MatNativeDateModule]);
                fixture.detectChanges();
                testComponent = fixture.componentInstance;
            }));
            afterEach(testing_2.fakeAsync(function () {
                testComponent.datepicker.close();
                fixture.detectChanges();
            }));
            it('explicit startAt should override input value', function () {
                expect(testComponent.datepicker.startAt).toEqual(new Date(2010, core_2.JAN, 1));
            });
        });
        describe('datepicker with startView set to year', function () {
            var fixture;
            var testComponent;
            beforeEach(testing_2.fakeAsync(function () {
                fixture = createComponent(DatepickerWithStartViewYear, [core_2.MatNativeDateModule]);
                fixture.detectChanges();
                testComponent = fixture.componentInstance;
            }));
            afterEach(testing_2.fakeAsync(function () {
                testComponent.datepicker.close();
                fixture.detectChanges();
                testing_2.flush();
            }));
            it('should start at the specified view', function () {
                testComponent.datepicker.open();
                fixture.detectChanges();
                var firstCalendarCell = (document.querySelector('.mat-calendar-body-cell'));
                // When the calendar is in year view, the first cell should be for a month rather than
                // for a date.
                expect(firstCalendarCell.textContent)
                    .toBe('JAN', 'Expected the calendar to be in year-view');
            });
            it('should fire yearSelected when user selects calendar year in year view', testing_2.fakeAsync(function () {
                spyOn(testComponent, 'onYearSelection');
                expect(testComponent.onYearSelection).not.toHaveBeenCalled();
                testComponent.datepicker.open();
                fixture.detectChanges();
                var cells = document.querySelectorAll('.mat-calendar-body-cell');
                testing_1.dispatchMouseEvent(cells[0], 'click');
                fixture.detectChanges();
                testing_2.flush();
                expect(testComponent.onYearSelection).toHaveBeenCalled();
            }));
        });
        describe('datepicker with startView set to multiyear', function () {
            var fixture;
            var testComponent;
            beforeEach(testing_2.fakeAsync(function () {
                fixture = createComponent(DatepickerWithStartViewMultiYear, [core_2.MatNativeDateModule]);
                fixture.detectChanges();
                testComponent = fixture.componentInstance;
                spyOn(testComponent, 'onMultiYearSelection');
            }));
            afterEach(testing_2.fakeAsync(function () {
                testComponent.datepicker.close();
                fixture.detectChanges();
                testing_2.flush();
            }));
            it('should start at the specified view', function () {
                testComponent.datepicker.open();
                fixture.detectChanges();
                var firstCalendarCell = (document.querySelector('.mat-calendar-body-cell'));
                // When the calendar is in year view, the first cell should be for a month rather than
                // for a date.
                expect(firstCalendarCell.textContent)
                    .toBe('2016', 'Expected the calendar to be in multi-year-view');
            });
            it('should fire yearSelected when user selects calendar year in multiyear view', testing_2.fakeAsync(function () {
                expect(testComponent.onMultiYearSelection).not.toHaveBeenCalled();
                testComponent.datepicker.open();
                fixture.detectChanges();
                var cells = document.querySelectorAll('.mat-calendar-body-cell');
                testing_1.dispatchMouseEvent(cells[0], 'click');
                fixture.detectChanges();
                testing_2.flush();
                expect(testComponent.onMultiYearSelection).toHaveBeenCalled();
            }));
        });
        describe('datepicker with ngModel', function () {
            var fixture;
            var testComponent;
            beforeEach(testing_2.fakeAsync(function () {
                fixture = createComponent(DatepickerWithNgModel, [core_2.MatNativeDateModule]);
                fixture.detectChanges();
                fixture.whenStable().then(function () {
                    fixture.detectChanges();
                    testComponent = fixture.componentInstance;
                });
            }));
            afterEach(testing_2.fakeAsync(function () {
                testComponent.datepicker.close();
                fixture.detectChanges();
            }));
            it('should update datepicker when model changes', testing_2.fakeAsync(function () {
                expect(testComponent.datepickerInput.value).toBeNull();
                expect(testComponent.datepicker._selected).toBeNull();
                var selected = new Date(2017, core_2.JAN, 1);
                testComponent.selected = selected;
                fixture.detectChanges();
                testing_2.flush();
                fixture.detectChanges();
                expect(testComponent.datepickerInput.value).toEqual(selected);
                expect(testComponent.datepicker._selected).toEqual(selected);
            }));
            it('should update model when date is selected', testing_2.fakeAsync(function () {
                expect(testComponent.selected).toBeNull();
                expect(testComponent.datepickerInput.value).toBeNull();
                var selected = new Date(2017, core_2.JAN, 1);
                testComponent.datepicker.select(selected);
                fixture.detectChanges();
                testing_2.flush();
                fixture.detectChanges();
                expect(testComponent.selected).toEqual(selected);
                expect(testComponent.datepickerInput.value).toEqual(selected);
            }));
            it('should mark input dirty after input event', function () {
                var inputEl = fixture.debugElement.query(platform_browser_1.By.css('input')).nativeElement;
                expect(inputEl.classList).toContain('ng-pristine');
                inputEl.value = '2001-01-01';
                testing_1.dispatchFakeEvent(inputEl, 'input');
                fixture.detectChanges();
                expect(inputEl.classList).toContain('ng-dirty');
            });
            it('should mark input dirty after date selected', testing_2.fakeAsync(function () {
                var inputEl = fixture.debugElement.query(platform_browser_1.By.css('input')).nativeElement;
                expect(inputEl.classList).toContain('ng-pristine');
                testComponent.datepicker.select(new Date(2017, core_2.JAN, 1));
                fixture.detectChanges();
                testing_2.flush();
                fixture.detectChanges();
                expect(inputEl.classList).toContain('ng-dirty');
            }));
            it('should not mark dirty after model change', testing_2.fakeAsync(function () {
                var inputEl = fixture.debugElement.query(platform_browser_1.By.css('input')).nativeElement;
                expect(inputEl.classList).toContain('ng-pristine');
                testComponent.selected = new Date(2017, core_2.JAN, 1);
                fixture.detectChanges();
                testing_2.flush();
                fixture.detectChanges();
                expect(inputEl.classList).toContain('ng-pristine');
            }));
            it('should mark input touched on blur', function () {
                var inputEl = fixture.debugElement.query(platform_browser_1.By.css('input')).nativeElement;
                expect(inputEl.classList).toContain('ng-untouched');
                testing_1.dispatchFakeEvent(inputEl, 'focus');
                fixture.detectChanges();
                expect(inputEl.classList).toContain('ng-untouched');
                testing_1.dispatchFakeEvent(inputEl, 'blur');
                fixture.detectChanges();
                expect(inputEl.classList).toContain('ng-touched');
            });
            it('should reformat the input value on blur', function () {
                if (SUPPORTS_INTL) {
                    // Skip this test if the internationalization API is not supported in the current
                    // browser. Browsers like Safari 9 do not support the "Intl" API.
                    return;
                }
                var inputEl = fixture.debugElement.query(platform_browser_1.By.css('input')).nativeElement;
                inputEl.value = '2001-01-01';
                testing_1.dispatchFakeEvent(inputEl, 'input');
                fixture.detectChanges();
                testing_1.dispatchFakeEvent(inputEl, 'blur');
                fixture.detectChanges();
                expect(inputEl.value).toBe('1/1/2001');
            });
            it('should not reformat invalid dates on blur', function () {
                var inputEl = fixture.debugElement.query(platform_browser_1.By.css('input')).nativeElement;
                inputEl.value = 'very-valid-date';
                testing_1.dispatchFakeEvent(inputEl, 'input');
                fixture.detectChanges();
                testing_1.dispatchFakeEvent(inputEl, 'blur');
                fixture.detectChanges();
                expect(inputEl.value).toBe('very-valid-date');
            });
            it('should mark input touched on calendar selection', testing_2.fakeAsync(function () {
                var inputEl = fixture.debugElement.query(platform_browser_1.By.css('input')).nativeElement;
                expect(inputEl.classList).toContain('ng-untouched');
                testComponent.datepicker.select(new Date(2017, core_2.JAN, 1));
                fixture.detectChanges();
                testing_2.flush();
                fixture.detectChanges();
                expect(inputEl.classList).toContain('ng-touched');
            }));
        });
        describe('datepicker with formControl', function () {
            var fixture;
            var testComponent;
            beforeEach(testing_2.fakeAsync(function () {
                fixture = createComponent(DatepickerWithFormControl, [core_2.MatNativeDateModule]);
                fixture.detectChanges();
                testComponent = fixture.componentInstance;
            }));
            afterEach(testing_2.fakeAsync(function () {
                testComponent.datepicker.close();
                fixture.detectChanges();
            }));
            it('should update datepicker when formControl changes', function () {
                expect(testComponent.datepickerInput.value).toBeNull();
                expect(testComponent.datepicker._selected).toBeNull();
                var selected = new Date(2017, core_2.JAN, 1);
                testComponent.formControl.setValue(selected);
                fixture.detectChanges();
                expect(testComponent.datepickerInput.value).toEqual(selected);
                expect(testComponent.datepicker._selected).toEqual(selected);
            });
            it('should update formControl when date is selected', function () {
                expect(testComponent.formControl.value).toBeNull();
                expect(testComponent.datepickerInput.value).toBeNull();
                var selected = new Date(2017, core_2.JAN, 1);
                testComponent.datepicker.select(selected);
                fixture.detectChanges();
                expect(testComponent.formControl.value).toEqual(selected);
                expect(testComponent.datepickerInput.value).toEqual(selected);
            });
            it('should disable input when form control disabled', function () {
                var inputEl = fixture.debugElement.query(platform_browser_1.By.css('input')).nativeElement;
                expect(inputEl.disabled).toBe(false);
                testComponent.formControl.disable();
                fixture.detectChanges();
                expect(inputEl.disabled).toBe(true);
            });
            it('should disable toggle when form control disabled', function () {
                expect(testComponent.datepickerToggle.disabled).toBe(false);
                testComponent.formControl.disable();
                fixture.detectChanges();
                expect(testComponent.datepickerToggle.disabled).toBe(true);
            });
        });
        describe('datepicker with mat-datepicker-toggle', function () {
            var fixture;
            var testComponent;
            beforeEach(testing_2.fakeAsync(function () {
                fixture = createComponent(DatepickerWithToggle, [core_2.MatNativeDateModule]);
                fixture.detectChanges();
                testComponent = fixture.componentInstance;
            }));
            afterEach(testing_2.fakeAsync(function () {
                testComponent.datepicker.close();
                fixture.detectChanges();
                testing_2.flush();
            }));
            it('should set `aria-haspopup` on the toggle button', function () {
                var button = fixture.debugElement.query(platform_browser_1.By.css('button'));
                expect(button).toBeTruthy();
                expect(button.nativeElement.getAttribute('aria-haspopup')).toBe('true');
            });
            it('should open calendar when toggle clicked', function () {
                expect(document.querySelector('mat-dialog-container')).toBeNull();
                var toggle = fixture.debugElement.query(platform_browser_1.By.css('button'));
                testing_1.dispatchMouseEvent(toggle.nativeElement, 'click');
                fixture.detectChanges();
                expect(document.querySelector('mat-dialog-container')).not.toBeNull();
            });
            it('should not open calendar when toggle clicked if datepicker is disabled', function () {
                testComponent.datepicker.disabled = true;
                fixture.detectChanges();
                var toggle = fixture.debugElement.query(platform_browser_1.By.css('button')).nativeElement;
                expect(toggle.hasAttribute('disabled')).toBe(true);
                expect(document.querySelector('mat-dialog-container')).toBeNull();
                testing_1.dispatchMouseEvent(toggle, 'click');
                fixture.detectChanges();
                expect(document.querySelector('mat-dialog-container')).toBeNull();
            });
            it('should not open calendar when toggle clicked if input is disabled', function () {
                expect(testComponent.datepicker.disabled).toBe(false);
                testComponent.input.disabled = true;
                fixture.detectChanges();
                var toggle = fixture.debugElement.query(platform_browser_1.By.css('button')).nativeElement;
                expect(toggle.hasAttribute('disabled')).toBe(true);
                expect(document.querySelector('mat-dialog-container')).toBeNull();
                testing_1.dispatchMouseEvent(toggle, 'click');
                fixture.detectChanges();
                expect(document.querySelector('mat-dialog-container')).toBeNull();
            });
            it('should set the `button` type on the trigger to prevent form submissions', function () {
                var toggle = fixture.debugElement.query(platform_browser_1.By.css('button')).nativeElement;
                expect(toggle.getAttribute('type')).toBe('button');
            });
            it('should remove the underlying SVG icon from the tab order', function () {
                var icon = fixture.debugElement.nativeElement.querySelector('svg');
                expect(icon.getAttribute('focusable')).toBe('false');
            });
            it('should restore focus to the toggle after the calendar is closed', function () {
                var toggle = fixture.debugElement.query(platform_browser_1.By.css('button')).nativeElement;
                fixture.componentInstance.touchUI = false;
                fixture.detectChanges();
                toggle.focus();
                expect(document.activeElement).toBe(toggle, 'Expected toggle to be focused.');
                fixture.componentInstance.datepicker.open();
                fixture.detectChanges();
                var pane = (document.querySelector('.cdk-overlay-pane'));
                expect(pane).toBeTruthy('Expected calendar to be open.');
                expect(pane.contains(document.activeElement))
                    .toBe(true, 'Expected focus to be inside the calendar.');
                fixture.componentInstance.datepicker.close();
                fixture.detectChanges();
                expect(document.activeElement).toBe(toggle, 'Expected focus to be restored to toggle.');
            });
            it('should re-render when the i18n labels change', testing_2.inject([index_2.MatDatepickerIntl], function (intl) {
                var toggle = fixture.debugElement.query(platform_browser_1.By.css('button')).nativeElement;
                intl.openCalendarLabel = 'Open the calendar, perhaps?';
                intl.changes.next();
                fixture.detectChanges();
                expect(toggle.getAttribute('aria-label')).toBe('Open the calendar, perhaps?');
            }));
            it('should toggle the active state of the datepicker toggle', testing_2.fakeAsync(function () {
                var toggle = fixture.debugElement.query(platform_browser_1.By.css('mat-datepicker-toggle')).nativeElement;
                expect(toggle.classList).not.toContain('mat-datepicker-toggle-active');
                fixture.componentInstance.datepicker.open();
                fixture.detectChanges();
                testing_2.flush();
                expect(toggle.classList).toContain('mat-datepicker-toggle-active');
                fixture.componentInstance.datepicker.close();
                fixture.detectChanges();
                testing_2.flush();
                fixture.detectChanges();
                expect(toggle.classList).not.toContain('mat-datepicker-toggle-active');
            }));
        });
        describe('datepicker with custom mat-datepicker-toggle icon', function () {
            it('should be able to override the mat-datepicker-toggle icon', testing_2.fakeAsync(function () {
                var fixture = createComponent(DatepickerWithCustomIcon, [core_2.MatNativeDateModule]);
                fixture.detectChanges();
                expect(fixture.nativeElement.querySelector('.mat-datepicker-toggle .custom-icon'))
                    .toBeTruthy('Expected custom icon to be rendered.');
                expect(fixture.nativeElement.querySelector('.mat-datepicker-toggle mat-icon'))
                    .toBeFalsy('Expected default icon to be removed.');
            }));
        });
        describe('datepicker inside mat-form-field', function () {
            var fixture;
            var testComponent;
            beforeEach(testing_2.fakeAsync(function () {
                fixture = createComponent(FormFieldDatepicker, [core_2.MatNativeDateModule]);
                fixture.detectChanges();
                testComponent = fixture.componentInstance;
            }));
            afterEach(testing_2.fakeAsync(function () {
                testComponent.datepicker.close();
                fixture.detectChanges();
                testing_2.flush();
            }));
            it('should float the placeholder when an invalid value is entered', function () {
                testComponent.datepickerInput.value = 'totally-not-a-date';
                fixture.debugElement.nativeElement.querySelector('input').value = 'totally-not-a-date';
                fixture.detectChanges();
                expect(fixture.debugElement.nativeElement.querySelector('mat-form-field').classList)
                    .toContain('mat-form-field-should-float');
            });
            it('should pass the form field theme color to the overlay', testing_2.fakeAsync(function () {
                testComponent.formField.color = 'primary';
                testComponent.datepicker.open();
                fixture.detectChanges();
                testing_2.flush();
                var contentEl = (document.querySelector('.mat-datepicker-content'));
                expect(contentEl.classList).toContain('mat-primary');
                testComponent.datepicker.close();
                fixture.detectChanges();
                testing_2.flush();
                testComponent.formField.color = 'warn';
                testComponent.datepicker.open();
                contentEl = (document.querySelector('.mat-datepicker-content'));
                fixture.detectChanges();
                testing_2.flush();
                expect(contentEl.classList).toContain('mat-warn');
                expect(contentEl.classList).not.toContain('mat-primary');
            }));
            it('should prefer the datepicker color over the form field one', testing_2.fakeAsync(function () {
                testComponent.datepicker.color = 'accent';
                testComponent.formField.color = 'warn';
                testComponent.datepicker.open();
                fixture.detectChanges();
                testing_2.flush();
                var contentEl = (document.querySelector('.mat-datepicker-content'));
                expect(contentEl.classList).toContain('mat-accent');
                expect(contentEl.classList).not.toContain('mat-warn');
            }));
        });
        describe('datepicker with min and max dates and validation', function () {
            var fixture;
            var testComponent;
            beforeEach(testing_2.fakeAsync(function () {
                fixture = createComponent(DatepickerWithMinAndMaxValidation, [core_2.MatNativeDateModule]);
                fixture.detectChanges();
                testComponent = fixture.componentInstance;
            }));
            afterEach(testing_2.fakeAsync(function () {
                testComponent.datepicker.close();
                fixture.detectChanges();
            }));
            it('should use min and max dates specified by the input', function () {
                expect(testComponent.datepicker._minDate).toEqual(new Date(2010, core_2.JAN, 1));
                expect(testComponent.datepicker._maxDate).toEqual(new Date(2020, core_2.JAN, 1));
            });
            it('should mark invalid when value is before min', testing_2.fakeAsync(function () {
                testComponent.date = new Date(2009, core_2.DEC, 31);
                fixture.detectChanges();
                testing_2.flush();
                fixture.detectChanges();
                expect(fixture.debugElement.query(platform_browser_1.By.css('input')).nativeElement.classList)
                    .toContain('ng-invalid');
            }));
            it('should mark invalid when value is after max', testing_2.fakeAsync(function () {
                testComponent.date = new Date(2020, core_2.JAN, 2);
                fixture.detectChanges();
                testing_2.flush();
                fixture.detectChanges();
                expect(fixture.debugElement.query(platform_browser_1.By.css('input')).nativeElement.classList)
                    .toContain('ng-invalid');
            }));
            it('should not mark invalid when value equals min', testing_2.fakeAsync(function () {
                testComponent.date = testComponent.datepicker._minDate;
                fixture.detectChanges();
                testing_2.flush();
                fixture.detectChanges();
                expect(fixture.debugElement.query(platform_browser_1.By.css('input')).nativeElement.classList)
                    .not.toContain('ng-invalid');
            }));
            it('should not mark invalid when value equals max', testing_2.fakeAsync(function () {
                testComponent.date = testComponent.datepicker._maxDate;
                fixture.detectChanges();
                testing_2.flush();
                fixture.detectChanges();
                expect(fixture.debugElement.query(platform_browser_1.By.css('input')).nativeElement.classList)
                    .not.toContain('ng-invalid');
            }));
            it('should not mark invalid when value is between min and max', testing_2.fakeAsync(function () {
                testComponent.date = new Date(2010, core_2.JAN, 2);
                fixture.detectChanges();
                testing_2.flush();
                fixture.detectChanges();
                expect(fixture.debugElement.query(platform_browser_1.By.css('input')).nativeElement.classList)
                    .not.toContain('ng-invalid');
            }));
        });
        describe('datepicker with filter and validation', function () {
            var fixture;
            var testComponent;
            beforeEach(testing_2.fakeAsync(function () {
                fixture = createComponent(DatepickerWithFilterAndValidation, [core_2.MatNativeDateModule]);
                fixture.detectChanges();
                testComponent = fixture.componentInstance;
            }));
            afterEach(testing_2.fakeAsync(function () {
                testComponent.datepicker.close();
                fixture.detectChanges();
                testing_2.flush();
            }));
            it('should mark input invalid', testing_2.fakeAsync(function () {
                testComponent.date = new Date(2017, core_2.JAN, 1);
                fixture.detectChanges();
                testing_2.flush();
                fixture.detectChanges();
                expect(fixture.debugElement.query(platform_browser_1.By.css('input')).nativeElement.classList)
                    .toContain('ng-invalid');
                testComponent.date = new Date(2017, core_2.JAN, 2);
                fixture.detectChanges();
                testing_2.flush();
                fixture.detectChanges();
                expect(fixture.debugElement.query(platform_browser_1.By.css('input')).nativeElement.classList)
                    .not.toContain('ng-invalid');
            }));
            it('should disable filtered calendar cells', function () {
                fixture.detectChanges();
                testComponent.datepicker.open();
                fixture.detectChanges();
                expect(document.querySelector('mat-dialog-container')).not.toBeNull();
                var cells = document.querySelectorAll('.mat-calendar-body-cell');
                expect(cells[0].classList).toContain('mat-calendar-body-disabled');
                expect(cells[1].classList).not.toContain('mat-calendar-body-disabled');
            });
        });
        describe('datepicker with change and input events', function () {
            var fixture;
            var testComponent;
            var inputEl;
            beforeEach(testing_2.fakeAsync(function () {
                fixture = createComponent(DatepickerWithChangeAndInputEvents, [core_2.MatNativeDateModule]);
                fixture.detectChanges();
                testComponent = fixture.componentInstance;
                inputEl = fixture.debugElement.query(platform_browser_1.By.css('input')).nativeElement;
                spyOn(testComponent, 'onChange');
                spyOn(testComponent, 'onInput');
                spyOn(testComponent, 'onDateChange');
                spyOn(testComponent, 'onDateInput');
            }));
            afterEach(testing_2.fakeAsync(function () {
                testComponent.datepicker.close();
                fixture.detectChanges();
            }));
            it('should fire input and dateInput events when user types input', function () {
                expect(testComponent.onChange).not.toHaveBeenCalled();
                expect(testComponent.onDateChange).not.toHaveBeenCalled();
                expect(testComponent.onInput).not.toHaveBeenCalled();
                expect(testComponent.onDateInput).not.toHaveBeenCalled();
                inputEl.value = '2001-01-01';
                testing_1.dispatchFakeEvent(inputEl, 'input');
                fixture.detectChanges();
                expect(testComponent.onChange).not.toHaveBeenCalled();
                expect(testComponent.onDateChange).not.toHaveBeenCalled();
                expect(testComponent.onInput).toHaveBeenCalled();
                expect(testComponent.onDateInput).toHaveBeenCalled();
            });
            it('should fire change and dateChange events when user commits typed input', function () {
                expect(testComponent.onChange).not.toHaveBeenCalled();
                expect(testComponent.onDateChange).not.toHaveBeenCalled();
                expect(testComponent.onInput).not.toHaveBeenCalled();
                expect(testComponent.onDateInput).not.toHaveBeenCalled();
                testing_1.dispatchFakeEvent(inputEl, 'change');
                fixture.detectChanges();
                expect(testComponent.onChange).toHaveBeenCalled();
                expect(testComponent.onDateChange).toHaveBeenCalled();
                expect(testComponent.onInput).not.toHaveBeenCalled();
                expect(testComponent.onDateInput).not.toHaveBeenCalled();
            });
            it('should fire dateChange and dateInput events when user selects calendar date', testing_2.fakeAsync(function () {
                expect(testComponent.onChange).not.toHaveBeenCalled();
                expect(testComponent.onDateChange).not.toHaveBeenCalled();
                expect(testComponent.onInput).not.toHaveBeenCalled();
                expect(testComponent.onDateInput).not.toHaveBeenCalled();
                testComponent.datepicker.open();
                fixture.detectChanges();
                expect(document.querySelector('mat-dialog-container')).not.toBeNull();
                var cells = document.querySelectorAll('.mat-calendar-body-cell');
                testing_1.dispatchMouseEvent(cells[0], 'click');
                fixture.detectChanges();
                testing_2.flush();
                expect(testComponent.onChange).not.toHaveBeenCalled();
                expect(testComponent.onDateChange).toHaveBeenCalled();
                expect(testComponent.onInput).not.toHaveBeenCalled();
                expect(testComponent.onDateInput).toHaveBeenCalled();
            }));
            it('should not fire the dateInput event if the value has not changed', function () {
                expect(testComponent.onDateInput).not.toHaveBeenCalled();
                inputEl.value = '12/12/2012';
                testing_1.dispatchFakeEvent(inputEl, 'input');
                fixture.detectChanges();
                expect(testComponent.onDateInput).toHaveBeenCalledTimes(1);
                testing_1.dispatchFakeEvent(inputEl, 'input');
                fixture.detectChanges();
                expect(testComponent.onDateInput).toHaveBeenCalledTimes(1);
            });
        });
        describe('with ISO 8601 strings as input', function () {
            var fixture;
            var testComponent;
            beforeEach(testing_2.fakeAsync(function () {
                fixture = createComponent(DatepickerWithISOStrings, [core_2.MatNativeDateModule]);
                testComponent = fixture.componentInstance;
            }));
            afterEach(testing_2.fakeAsync(function () {
                testComponent.datepicker.close();
                fixture.detectChanges();
            }));
            it('should coerce ISO strings', testing_2.fakeAsync(function () {
                expect(function () { return fixture.detectChanges(); }).not.toThrow();
                testing_2.flush();
                fixture.detectChanges();
                expect(testComponent.datepicker.startAt).toEqual(new Date(2017, core_2.JUL, 1));
                expect(testComponent.datepickerInput.value).toEqual(new Date(2017, core_2.JUN, 1));
                expect(testComponent.datepickerInput.min).toEqual(new Date(2017, core_2.JAN, 1));
                expect(testComponent.datepickerInput.max).toEqual(new Date(2017, core_2.DEC, 31));
            }));
        });
        describe('with events', function () {
            var fixture;
            var testComponent;
            beforeEach(testing_2.fakeAsync(function () {
                fixture = createComponent(DatepickerWithEvents, [core_2.MatNativeDateModule]);
                fixture.detectChanges();
                testComponent = fixture.componentInstance;
            }));
            it('should dispatch an event when a datepicker is opened', function () {
                testComponent.datepicker.open();
                fixture.detectChanges();
                expect(testComponent.openedSpy).toHaveBeenCalled();
            });
            it('should dispatch an event when a datepicker is closed', testing_2.fakeAsync(function () {
                testComponent.datepicker.open();
                fixture.detectChanges();
                testComponent.datepicker.close();
                testing_2.flush();
                fixture.detectChanges();
                expect(testComponent.closedSpy).toHaveBeenCalled();
            }));
        });
        describe('datepicker that opens on focus', function () {
            var fixture;
            var testComponent;
            var input;
            beforeEach(testing_2.fakeAsync(function () {
                fixture = createComponent(DatepickerOpeningOnFocus, [core_2.MatNativeDateModule]);
                fixture.detectChanges();
                testComponent = fixture.componentInstance;
                input = fixture.debugElement.query(platform_browser_1.By.css('input')).nativeElement;
            }));
            it('should not reopen if the browser fires the focus event asynchronously', testing_2.fakeAsync(function () {
                // Stub out the real focus method so we can call it reliably.
                spyOn(input, 'focus').and.callFake(function () {
                    // Dispatch the event handler async to simulate the IE11 behavior.
                    Promise.resolve().then(function () { return testing_1.dispatchFakeEvent(input, 'focus'); });
                });
                // Open initially by focusing.
                input.focus();
                fixture.detectChanges();
                testing_2.flush();
                // Due to some browser limitations we can't install a stub on `document.activeElement`
                // so instead we have to override the previously-focused element manually.
                // Due to some browser limitations we can't install a stub on `document.activeElement`
                // so instead we have to override the previously-focused element manually.
                fixture.componentInstance.datepicker._focusedElementBeforeOpen = input;
                // Ensure that the datepicker is actually open.
                expect(testComponent.datepicker.opened).toBe(true, 'Expected datepicker to be open.');
                // Close the datepicker.
                testComponent.datepicker.close();
                fixture.detectChanges();
                // Schedule the input to be focused asynchronously.
                input.focus();
                fixture.detectChanges();
                // Flush out the scheduled tasks.
                // Flush out the scheduled tasks.
                testing_2.flush();
                expect(testComponent.datepicker.opened).toBe(false, 'Expected datepicker to be closed.');
            }));
        });
        describe('datepicker directionality', function () {
            it('should pass along the directionality to the popup', function () {
                var fixture = createComponent(StandardDatepicker, [core_2.MatNativeDateModule], [{
                        provide: bidi_1.Directionality,
                        useValue: ({ value: 'rtl' })
                    }]);
                fixture.detectChanges();
                fixture.componentInstance.datepicker.open();
                fixture.detectChanges();
                var overlay = (document.querySelector('.cdk-overlay-connected-position-bounding-box'));
                expect(overlay.getAttribute('dir')).toBe('rtl');
            });
            it('should update the popup direction if the directionality value changes', testing_2.fakeAsync(function () {
                var dirProvider = { value: 'ltr' };
                var fixture = createComponent(StandardDatepicker, [core_2.MatNativeDateModule], [{
                        provide: bidi_1.Directionality,
                        useFactory: function () { return dirProvider; }
                    }]);
                fixture.detectChanges();
                fixture.componentInstance.datepicker.open();
                fixture.detectChanges();
                var overlay = (document.querySelector('.cdk-overlay-connected-position-bounding-box'));
                expect(overlay.getAttribute('dir')).toBe('ltr');
                fixture.componentInstance.datepicker.close();
                fixture.detectChanges();
                testing_2.flush();
                dirProvider.value = 'rtl';
                fixture.componentInstance.datepicker.open();
                fixture.detectChanges();
                overlay = (document.querySelector('.cdk-overlay-connected-position-bounding-box'));
                expect(overlay.getAttribute('dir')).toBe('rtl');
            }));
            it('should pass along the directionality to the dialog in touch mode', function () {
                var fixture = createComponent(StandardDatepicker, [core_2.MatNativeDateModule], [{
                        provide: bidi_1.Directionality,
                        useValue: ({ value: 'rtl' })
                    }]);
                fixture.componentInstance.touch = true;
                fixture.detectChanges();
                fixture.componentInstance.datepicker.open();
                fixture.detectChanges();
                var overlay = (document.querySelector('.cdk-global-overlay-wrapper'));
                expect(overlay.getAttribute('dir')).toBe('rtl');
            });
        });
    });
    describe('with missing DateAdapter and MAT_DATE_FORMATS', function () {
        it('should throw when created', function () {
            expect(function () { return createComponent(StandardDatepicker); })
                .toThrowError(/MatDatepicker: No provider found for .*/);
        });
    });
    describe('popup positioning', function () {
        var fixture;
        var testComponent;
        var input;
        beforeEach(testing_2.fakeAsync(function () {
            fixture = createComponent(StandardDatepicker, [core_2.MatNativeDateModule]);
            fixture.detectChanges();
            testComponent = fixture.componentInstance;
            input = fixture.debugElement.query(platform_browser_1.By.css('input')).nativeElement;
            input.style.position = 'fixed';
        }));
        it('should be below and to the right when there is plenty of space', function () {
            input.style.top = input.style.left = '20px';
            testComponent.datepicker.open();
            fixture.detectChanges();
            var overlayRect = document.querySelector('.cdk-overlay-pane').getBoundingClientRect();
            var inputRect = input.getBoundingClientRect();
            expect(Math.floor(overlayRect.top))
                .toBe(Math.floor(inputRect.bottom), 'Expected popup to align to input bottom.');
            expect(Math.floor(overlayRect.left))
                .toBe(Math.floor(inputRect.left), 'Expected popup to align to input left.');
        });
        it('should be above and to the right when there is no space below', function () {
            input.style.bottom = input.style.left = '20px';
            testComponent.datepicker.open();
            fixture.detectChanges();
            var overlayRect = document.querySelector('.cdk-overlay-pane').getBoundingClientRect();
            var inputRect = input.getBoundingClientRect();
            expect(Math.floor(overlayRect.bottom))
                .toBe(Math.floor(inputRect.top), 'Expected popup to align to input top.');
            expect(Math.floor(overlayRect.left))
                .toBe(Math.floor(inputRect.left), 'Expected popup to align to input left.');
        });
        it('should be below and to the left when there is no space on the right', function () {
            input.style.top = input.style.right = '20px';
            testComponent.datepicker.open();
            fixture.detectChanges();
            var overlayRect = document.querySelector('.cdk-overlay-pane').getBoundingClientRect();
            var inputRect = input.getBoundingClientRect();
            expect(Math.floor(overlayRect.top))
                .toBe(Math.floor(inputRect.bottom), 'Expected popup to align to input bottom.');
            expect(Math.floor(overlayRect.right))
                .toBe(Math.floor(inputRect.right), 'Expected popup to align to input right.');
        });
        it('should be above and to the left when there is no space on the bottom', function () {
            input.style.bottom = input.style.right = '20px';
            testComponent.datepicker.open();
            fixture.detectChanges();
            var overlayRect = document.querySelector('.cdk-overlay-pane').getBoundingClientRect();
            var inputRect = input.getBoundingClientRect();
            expect(Math.floor(overlayRect.bottom))
                .toBe(Math.floor(inputRect.top), 'Expected popup to align to input top.');
            expect(Math.floor(overlayRect.right))
                .toBe(Math.floor(inputRect.right), 'Expected popup to align to input right.');
        });
    });
    describe('internationalization', function () {
        var fixture;
        var testComponent;
        var input;
        beforeEach(testing_2.fakeAsync(function () {
            fixture = createComponent(DatepickerWithi18n, [core_2.MatNativeDateModule, core_2.NativeDateModule], [{ provide: core_2.MAT_DATE_LOCALE, useValue: 'de-DE' }]);
            fixture.detectChanges();
            testComponent = fixture.componentInstance;
            input = fixture.nativeElement.querySelector('input');
        }));
        it('should have the correct input value even when inverted date format', testing_2.fakeAsync(function () {
            if (typeof Intl === 'undefined') {
                // Skip this test if the internationalization API is not supported in the current
                // browser. Browsers like Safari 9 do not support the "Intl" API.
                return;
            }
            var selected = new Date(2017, core_2.SEP, 1);
            testComponent.date = selected;
            fixture.detectChanges();
            testing_2.flush();
            fixture.detectChanges();
            // Normally the proper date format would 01.09.2017, but some browsers seem format the
            // date without the leading zero. (e.g. 1.9.2017).
            expect(input.value).toMatch(/0?1\.0?9\.2017/);
            expect(testComponent.datepickerInput.value).toBe(selected);
        }));
    });
    describe('datepicker with custom header', function () {
        var fixture;
        var testComponent;
        beforeEach(testing_2.fakeAsync(function () {
            fixture = createComponent(DatepickerWithCustomHeader, [core_2.MatNativeDateModule], [], [CustomHeaderForDatepicker]);
            fixture.detectChanges();
            testComponent = fixture.componentInstance;
        }));
        it('should instantiate a datepicker with a custom header', testing_2.fakeAsync(function () {
            expect(testComponent).toBeTruthy();
        }));
        it('should find the standard header element', testing_2.fakeAsync(function () {
            testComponent.datepicker.open();
            fixture.detectChanges();
            testing_2.flush();
            fixture.detectChanges();
            expect(document.querySelector('mat-calendar-header')).toBeTruthy();
        }));
    });
});
var StandardDatepicker = /** @class */ (function () {
    function StandardDatepicker() {
        this.opened = false;
        this.touch = false;
        this.disabled = false;
        this.date = new Date(2020, core_2.JAN, 1);
    }
    StandardDatepicker.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <input [matDatepicker]=\"d\" [value]=\"date\">\n    <mat-datepicker #d [touchUi]=\"touch\" [disabled]=\"disabled\" [opened]=\"opened\"></mat-datepicker>\n  ",
                },] },
    ];
    /** @nocollapse */
    StandardDatepicker.propDecorators = {
        "datepicker": [{ type: core_1.ViewChild, args: ['d',] },],
        "datepickerInput": [{ type: core_1.ViewChild, args: [datepicker_input_1.MatDatepickerInput,] },],
    };
    return StandardDatepicker;
}());
var MultiInputDatepicker = /** @class */ (function () {
    function MultiInputDatepicker() {
    }
    MultiInputDatepicker.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <input [matDatepicker]=\"d\"><input [matDatepicker]=\"d\"><mat-datepicker #d></mat-datepicker>\n  ",
                },] },
    ];
    return MultiInputDatepicker;
}());
var NoInputDatepicker = /** @class */ (function () {
    function NoInputDatepicker() {
    }
    NoInputDatepicker.decorators = [
        { type: core_1.Component, args: [{
                    template: "<mat-datepicker #d></mat-datepicker>",
                },] },
    ];
    /** @nocollapse */
    NoInputDatepicker.propDecorators = {
        "datepicker": [{ type: core_1.ViewChild, args: ['d',] },],
    };
    return NoInputDatepicker;
}());
var DatepickerWithStartAt = /** @class */ (function () {
    function DatepickerWithStartAt() {
        this.date = new Date(2020, core_2.JAN, 1);
        this.startDate = new Date(2010, core_2.JAN, 1);
    }
    DatepickerWithStartAt.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <input [matDatepicker]=\"d\" [value]=\"date\">\n    <mat-datepicker #d [startAt]=\"startDate\"></mat-datepicker>\n  ",
                },] },
    ];
    /** @nocollapse */
    DatepickerWithStartAt.propDecorators = {
        "datepicker": [{ type: core_1.ViewChild, args: ['d',] },],
    };
    return DatepickerWithStartAt;
}());
var DatepickerWithStartViewYear = /** @class */ (function () {
    function DatepickerWithStartViewYear() {
        this.date = new Date(2020, core_2.JAN, 1);
    }
    DatepickerWithStartViewYear.prototype.onYearSelection = function () { };
    DatepickerWithStartViewYear.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <input [matDatepicker]=\"d\" [value]=\"date\">\n    <mat-datepicker #d startView=\"year\" (monthSelected)=\"onYearSelection()\"></mat-datepicker>\n  ",
                },] },
    ];
    /** @nocollapse */
    DatepickerWithStartViewYear.propDecorators = {
        "datepicker": [{ type: core_1.ViewChild, args: ['d',] },],
    };
    return DatepickerWithStartViewYear;
}());
var DatepickerWithStartViewMultiYear = /** @class */ (function () {
    function DatepickerWithStartViewMultiYear() {
        this.date = new Date(2020, core_2.JAN, 1);
    }
    DatepickerWithStartViewMultiYear.prototype.onMultiYearSelection = function () { };
    DatepickerWithStartViewMultiYear.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <input [matDatepicker]=\"d\" [value]=\"date\">\n    <mat-datepicker #d startView=\"multi-year\"\n        (yearSelected)=\"onMultiYearSelection()\"></mat-datepicker>\n  ",
                },] },
    ];
    /** @nocollapse */
    DatepickerWithStartViewMultiYear.propDecorators = {
        "datepicker": [{ type: core_1.ViewChild, args: ['d',] },],
    };
    return DatepickerWithStartViewMultiYear;
}());
var DatepickerWithNgModel = /** @class */ (function () {
    function DatepickerWithNgModel() {
        this.selected = null;
    }
    DatepickerWithNgModel.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <input [(ngModel)]=\"selected\" [matDatepicker]=\"d\">\n    <mat-datepicker #d></mat-datepicker>\n  ",
                },] },
    ];
    /** @nocollapse */
    DatepickerWithNgModel.propDecorators = {
        "datepicker": [{ type: core_1.ViewChild, args: ['d',] },],
        "datepickerInput": [{ type: core_1.ViewChild, args: [datepicker_input_1.MatDatepickerInput,] },],
    };
    return DatepickerWithNgModel;
}());
var DatepickerWithFormControl = /** @class */ (function () {
    function DatepickerWithFormControl() {
        this.formControl = new forms_1.FormControl();
    }
    DatepickerWithFormControl.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <input [formControl]=\"formControl\" [matDatepicker]=\"d\">\n    <mat-datepicker-toggle [for]=\"d\"></mat-datepicker-toggle>\n    <mat-datepicker #d></mat-datepicker>\n  ",
                },] },
    ];
    /** @nocollapse */
    DatepickerWithFormControl.propDecorators = {
        "datepicker": [{ type: core_1.ViewChild, args: ['d',] },],
        "datepickerInput": [{ type: core_1.ViewChild, args: [datepicker_input_1.MatDatepickerInput,] },],
        "datepickerToggle": [{ type: core_1.ViewChild, args: [datepicker_toggle_1.MatDatepickerToggle,] },],
    };
    return DatepickerWithFormControl;
}());
var DatepickerWithToggle = /** @class */ (function () {
    function DatepickerWithToggle() {
        this.touchUI = true;
    }
    DatepickerWithToggle.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <input [matDatepicker]=\"d\">\n    <mat-datepicker-toggle [for]=\"d\"></mat-datepicker-toggle>\n    <mat-datepicker #d [touchUi]=\"touchUI\"></mat-datepicker>\n  ",
                },] },
    ];
    /** @nocollapse */
    DatepickerWithToggle.propDecorators = {
        "datepicker": [{ type: core_1.ViewChild, args: ['d',] },],
        "input": [{ type: core_1.ViewChild, args: [datepicker_input_1.MatDatepickerInput,] },],
    };
    return DatepickerWithToggle;
}());
var DatepickerWithCustomIcon = /** @class */ (function () {
    function DatepickerWithCustomIcon() {
    }
    DatepickerWithCustomIcon.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <input [matDatepicker]=\"d\">\n    <mat-datepicker-toggle [for]=\"d\">\n      <div class=\"custom-icon\" matDatepickerToggleIcon></div>\n    </mat-datepicker-toggle>\n    <mat-datepicker #d></mat-datepicker>\n  ",
                },] },
    ];
    return DatepickerWithCustomIcon;
}());
var FormFieldDatepicker = /** @class */ (function () {
    function FormFieldDatepicker() {
    }
    FormFieldDatepicker.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n      <mat-form-field>\n        <input matInput [matDatepicker]=\"d\">\n        <mat-datepicker #d></mat-datepicker>\n      </mat-form-field>\n  ",
                },] },
    ];
    /** @nocollapse */
    FormFieldDatepicker.propDecorators = {
        "datepicker": [{ type: core_1.ViewChild, args: ['d',] },],
        "datepickerInput": [{ type: core_1.ViewChild, args: [datepicker_input_1.MatDatepickerInput,] },],
        "formField": [{ type: core_1.ViewChild, args: [form_field_1.MatFormField,] },],
    };
    return FormFieldDatepicker;
}());
var DatepickerWithMinAndMaxValidation = /** @class */ (function () {
    function DatepickerWithMinAndMaxValidation() {
        this.minDate = new Date(2010, core_2.JAN, 1);
        this.maxDate = new Date(2020, core_2.JAN, 1);
    }
    DatepickerWithMinAndMaxValidation.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <input [matDatepicker]=\"d\" [(ngModel)]=\"date\" [min]=\"minDate\" [max]=\"maxDate\">\n    <mat-datepicker-toggle [for]=\"d\"></mat-datepicker-toggle>\n    <mat-datepicker #d></mat-datepicker>\n  ",
                },] },
    ];
    /** @nocollapse */
    DatepickerWithMinAndMaxValidation.propDecorators = {
        "datepicker": [{ type: core_1.ViewChild, args: ['d',] },],
    };
    return DatepickerWithMinAndMaxValidation;
}());
var DatepickerWithFilterAndValidation = /** @class */ (function () {
    function DatepickerWithFilterAndValidation() {
        this.filter = function (date) { return date.getDate() != 1; };
    }
    DatepickerWithFilterAndValidation.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <input [matDatepicker]=\"d\" [(ngModel)]=\"date\" [matDatepickerFilter]=\"filter\">\n    <mat-datepicker-toggle [for]=\"d\"></mat-datepicker-toggle>\n    <mat-datepicker #d [touchUi]=\"true\"></mat-datepicker>\n  ",
                },] },
    ];
    /** @nocollapse */
    DatepickerWithFilterAndValidation.propDecorators = {
        "datepicker": [{ type: core_1.ViewChild, args: ['d',] },],
    };
    return DatepickerWithFilterAndValidation;
}());
var DatepickerWithChangeAndInputEvents = /** @class */ (function () {
    function DatepickerWithChangeAndInputEvents() {
    }
    DatepickerWithChangeAndInputEvents.prototype.onChange = function () { };
    DatepickerWithChangeAndInputEvents.prototype.onInput = function () { };
    DatepickerWithChangeAndInputEvents.prototype.onDateChange = function () { };
    DatepickerWithChangeAndInputEvents.prototype.onDateInput = function () { };
    DatepickerWithChangeAndInputEvents.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <input [matDatepicker]=\"d\" (change)=\"onChange()\" (input)=\"onInput()\"\n           (dateChange)=\"onDateChange()\" (dateInput)=\"onDateInput()\">\n    <mat-datepicker #d [touchUi]=\"true\"></mat-datepicker>\n  "
                },] },
    ];
    /** @nocollapse */
    DatepickerWithChangeAndInputEvents.propDecorators = {
        "datepicker": [{ type: core_1.ViewChild, args: ['d',] },],
    };
    return DatepickerWithChangeAndInputEvents;
}());
var DatepickerWithi18n = /** @class */ (function () {
    function DatepickerWithi18n() {
        this.date = new Date(2010, core_2.JAN, 1);
    }
    DatepickerWithi18n.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <input [matDatepicker]=\"d\" [(ngModel)]=\"date\">\n    <mat-datepicker #d></mat-datepicker>\n  "
                },] },
    ];
    /** @nocollapse */
    DatepickerWithi18n.propDecorators = {
        "datepicker": [{ type: core_1.ViewChild, args: ['d',] },],
        "datepickerInput": [{ type: core_1.ViewChild, args: [datepicker_input_1.MatDatepickerInput,] },],
    };
    return DatepickerWithi18n;
}());
var DatepickerWithISOStrings = /** @class */ (function () {
    function DatepickerWithISOStrings() {
        this.value = new Date(2017, core_2.JUN, 1).toISOString();
        this.min = new Date(2017, core_2.JAN, 1).toISOString();
        this.max = new Date(2017, core_2.DEC, 31).toISOString();
        this.startAt = new Date(2017, core_2.JUL, 1).toISOString();
    }
    DatepickerWithISOStrings.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <input [matDatepicker]=\"d\" [(ngModel)]=\"value\" [min]=\"min\" [max]=\"max\">\n    <mat-datepicker #d [startAt]=\"startAt\"></mat-datepicker>\n  "
                },] },
    ];
    /** @nocollapse */
    DatepickerWithISOStrings.propDecorators = {
        "datepicker": [{ type: core_1.ViewChild, args: ['d',] },],
        "datepickerInput": [{ type: core_1.ViewChild, args: [datepicker_input_1.MatDatepickerInput,] },],
    };
    return DatepickerWithISOStrings;
}());
var DatepickerWithEvents = /** @class */ (function () {
    function DatepickerWithEvents() {
        this.selected = null;
        this.openedSpy = jasmine.createSpy('opened spy');
        this.closedSpy = jasmine.createSpy('closed spy');
    }
    DatepickerWithEvents.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <input [(ngModel)]=\"selected\" [matDatepicker]=\"d\">\n    <mat-datepicker (opened)=\"openedSpy()\" (closed)=\"closedSpy()\" #d></mat-datepicker>\n  ",
                },] },
    ];
    /** @nocollapse */
    DatepickerWithEvents.propDecorators = {
        "datepicker": [{ type: core_1.ViewChild, args: ['d',] },],
    };
    return DatepickerWithEvents;
}());
var DatepickerOpeningOnFocus = /** @class */ (function () {
    function DatepickerOpeningOnFocus() {
    }
    DatepickerOpeningOnFocus.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <input (focus)=\"d.open()\" [matDatepicker]=\"d\">\n    <mat-datepicker #d=\"matDatepicker\"></mat-datepicker>\n  ",
                },] },
    ];
    /** @nocollapse */
    DatepickerOpeningOnFocus.propDecorators = {
        "datepicker": [{ type: core_1.ViewChild, args: [datepicker_1.MatDatepicker,] },],
    };
    return DatepickerOpeningOnFocus;
}());
var DatepickerWithCustomHeader = /** @class */ (function () {
    function DatepickerWithCustomHeader() {
    }
    DatepickerWithCustomHeader.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <input [matDatepicker]=\"ch\">\n    <mat-datepicker #ch [calendarHeaderComponent]=\"CustomHeaderForDatepicker\"></mat-datepicker>\n  ",
                },] },
    ];
    /** @nocollapse */
    DatepickerWithCustomHeader.propDecorators = {
        "datepicker": [{ type: core_1.ViewChild, args: ['ch',] },],
    };
    return DatepickerWithCustomHeader;
}());
var CustomHeaderForDatepicker = /** @class */ (function () {
    function CustomHeaderForDatepicker() {
    }
    CustomHeaderForDatepicker.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <div>Custom element</div>\n    <mat-calendar-header></mat-calendar-header>\n  ",
                },] },
    ];
    return CustomHeaderForDatepicker;
}());
var DelayedDatepicker = /** @class */ (function () {
    function DelayedDatepicker() {
    }
    DelayedDatepicker.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <input [matDatepicker]=\"assignedDatepicker\" [value]=\"date\">\n    <mat-datepicker #d [touchUi]=\"touch\"></mat-datepicker>\n  ",
                },] },
    ];
    /** @nocollapse */
    DelayedDatepicker.propDecorators = {
        "datepicker": [{ type: core_1.ViewChild, args: ['d',] },],
        "datepickerInput": [{ type: core_1.ViewChild, args: [datepicker_input_1.MatDatepickerInput,] },],
    };
    return DelayedDatepicker;
}());
//# sourceMappingURL=datepicker.spec.js.map