"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var observers_1 = require("@angular/cdk/observers");
var testing_1 = require("@angular/cdk/testing");
var core_1 = require("@angular/core");
var testing_2 = require("@angular/core/testing");
var forms_1 = require("@angular/forms");
var platform_browser_1 = require("@angular/platform-browser");
var bidi_1 = require("@angular/cdk/bidi");
var test_gesture_config_1 = require("../slider/test-gesture-config");
var slide_toggle_config_1 = require("./slide-toggle-config");
var index_1 = require("./index");
describe('MatSlideToggle without forms', function () {
    var gestureConfig;
    var mutationObserverCallbacks;
    var flushMutationObserver = function () { return mutationObserverCallbacks.forEach(function (callback) { return callback(); }); };
    beforeEach(testing_2.fakeAsync(function () {
        mutationObserverCallbacks = [];
        testing_2.TestBed.configureTestingModule({
            imports: [index_1.MatSlideToggleModule, bidi_1.BidiModule],
            declarations: [
                SlideToggleBasic,
                SlideToggleWithTabindexAttr,
                SlideToggleWithoutLabel
            ],
            providers: [
                { provide: platform_browser_1.HAMMER_GESTURE_CONFIG, useFactory: function () { return gestureConfig = new test_gesture_config_1.TestGestureConfig(); } },
                {
                    provide: observers_1.MutationObserverFactory,
                    useValue: {
                        create: function (callback) {
                            mutationObserverCallbacks.push(callback);
                            return { observe: function () { }, disconnect: function () { } };
                        }
                    }
                }
            ]
        });
        testing_2.TestBed.compileComponents();
    }));
    describe('basic behavior', function () {
        var fixture;
        var testComponent;
        var slideToggle;
        var slideToggleElement;
        var labelElement;
        var inputElement;
        beforeEach(testing_2.fakeAsync(function () {
            fixture = testing_2.TestBed.createComponent(SlideToggleBasic);
            // Enable jasmine spies on event functions, which may trigger at initialization
            // of the slide-toggle component.
            spyOn(fixture.debugElement.componentInstance, 'onSlideChange').and.callThrough();
            spyOn(fixture.debugElement.componentInstance, 'onSlideClick').and.callThrough();
            // Initialize the slide-toggle component, by triggering the first change detection cycle.
            fixture.detectChanges();
            var slideToggleDebug = fixture.debugElement.query(platform_browser_1.By.css('mat-slide-toggle'));
            testComponent = fixture.debugElement.componentInstance;
            slideToggle = slideToggleDebug.componentInstance;
            slideToggleElement = slideToggleDebug.nativeElement;
            inputElement = fixture.debugElement.query(platform_browser_1.By.css('input')).nativeElement;
            labelElement = fixture.debugElement.query(platform_browser_1.By.css('label')).nativeElement;
        }));
        it('should apply class based on color attribute', function () {
            testComponent.slideColor = 'primary';
            fixture.detectChanges();
            expect(slideToggleElement.classList).toContain('mat-primary');
            testComponent.slideColor = 'accent';
            fixture.detectChanges();
            expect(slideToggleElement.classList).toContain('mat-accent');
        });
        it('should correctly update the disabled property', function () {
            expect(inputElement.disabled).toBeFalsy();
            testComponent.isDisabled = true;
            fixture.detectChanges();
            expect(inputElement.disabled).toBeTruthy();
        });
        it('should correctly update the checked property', function () {
            expect(slideToggle.checked).toBeFalsy();
            testComponent.slideChecked = true;
            fixture.detectChanges();
            expect(inputElement.checked).toBeTruthy();
        });
        it('should set the toggle to checked on click', function () {
            expect(slideToggle.checked).toBe(false);
            expect(slideToggleElement.classList).not.toContain('mat-checked');
            labelElement.click();
            fixture.detectChanges();
            expect(slideToggleElement.classList).toContain('mat-checked');
            expect(slideToggle.checked).toBe(true);
        });
        it('should not trigger the click event multiple times', function () {
            // By default, when clicking on a label element, a generated click will be dispatched
            // on the associated input element.
            // Since we're using a label element and a visual hidden input, this behavior can led
            // to an issue, where the click events on the slide-toggle are getting executed twice.
            expect(slideToggle.checked).toBe(false);
            expect(slideToggleElement.classList).not.toContain('mat-checked');
            labelElement.click();
            fixture.detectChanges();
            expect(slideToggleElement.classList).toContain('mat-checked');
            expect(slideToggle.checked).toBe(true);
            expect(testComponent.onSlideClick).toHaveBeenCalledTimes(1);
        });
        it('should trigger the change event properly', function () {
            expect(inputElement.checked).toBe(false);
            expect(slideToggleElement.classList).not.toContain('mat-checked');
            labelElement.click();
            fixture.detectChanges();
            expect(inputElement.checked).toBe(true);
            expect(slideToggleElement.classList).toContain('mat-checked');
            expect(testComponent.onSlideChange).toHaveBeenCalledTimes(1);
        });
        it('should not trigger the change event by changing the native value', testing_2.fakeAsync(function () {
            expect(inputElement.checked).toBe(false);
            expect(slideToggleElement.classList).not.toContain('mat-checked');
            testComponent.slideChecked = true;
            fixture.detectChanges();
            expect(inputElement.checked).toBe(true);
            expect(slideToggleElement.classList).toContain('mat-checked');
            testing_2.tick();
            expect(testComponent.onSlideChange).not.toHaveBeenCalled();
        }));
        it('should not trigger the change event on initialization', testing_2.fakeAsync(function () {
            expect(inputElement.checked).toBe(false);
            expect(slideToggleElement.classList).not.toContain('mat-checked');
            testComponent.slideChecked = true;
            fixture.detectChanges();
            expect(inputElement.checked).toBe(true);
            expect(slideToggleElement.classList).toContain('mat-checked');
            testing_2.tick();
            expect(testComponent.onSlideChange).not.toHaveBeenCalled();
        }));
        it('should add a suffix to the inputs id', function () {
            testComponent.slideId = 'myId';
            fixture.detectChanges();
            expect(slideToggleElement.id).toBe('myId');
            expect(inputElement.id).toBe(slideToggleElement.id + "-input");
            testComponent.slideId = 'nextId';
            fixture.detectChanges();
            expect(slideToggleElement.id).toBe('nextId');
            expect(inputElement.id).toBe(slideToggleElement.id + "-input");
            testComponent.slideId = null;
            fixture.detectChanges();
            // Once the id binding is set to null, the id property should auto-generate a unique id.
            expect(inputElement.id).toMatch(/mat-slide-toggle-\d+-input/);
        });
        it('should forward the tabIndex to the underlying input', function () {
            fixture.detectChanges();
            expect(inputElement.tabIndex).toBe(0);
            testComponent.slideTabindex = 4;
            fixture.detectChanges();
            expect(inputElement.tabIndex).toBe(4);
        });
        it('should forward the specified name to the input', function () {
            testComponent.slideName = 'myName';
            fixture.detectChanges();
            expect(inputElement.name).toBe('myName');
            testComponent.slideName = 'nextName';
            fixture.detectChanges();
            expect(inputElement.name).toBe('nextName');
            testComponent.slideName = null;
            fixture.detectChanges();
            expect(inputElement.name).toBe('');
        });
        it('should forward the aria-label attribute to the input', function () {
            testComponent.slideLabel = 'ariaLabel';
            fixture.detectChanges();
            expect(inputElement.getAttribute('aria-label')).toBe('ariaLabel');
            testComponent.slideLabel = null;
            fixture.detectChanges();
            expect(inputElement.hasAttribute('aria-label')).toBeFalsy();
        });
        it('should forward the aria-labelledby attribute to the input', function () {
            testComponent.slideLabelledBy = 'ariaLabelledBy';
            fixture.detectChanges();
            expect(inputElement.getAttribute('aria-labelledby')).toBe('ariaLabelledBy');
            testComponent.slideLabelledBy = null;
            fixture.detectChanges();
            expect(inputElement.hasAttribute('aria-labelledby')).toBeFalsy();
        });
        it('should emit the new values properly', testing_2.fakeAsync(function () {
            labelElement.click();
            fixture.detectChanges();
            testing_2.tick();
            // We're checking the arguments type / emitted value to be a boolean, because sometimes the
            // emitted value can be a DOM Event, which is not valid.
            // See angular/angular#4059
            expect(testComponent.lastEvent.checked).toBe(true);
        }));
        it('should support subscription on the change observable', testing_2.fakeAsync(function () {
            var spy = jasmine.createSpy('change spy');
            var subscription = slideToggle.change.subscribe(spy);
            labelElement.click();
            fixture.detectChanges();
            testing_2.tick();
            expect(spy).toHaveBeenCalledWith(jasmine.objectContaining({ checked: true }));
            subscription.unsubscribe();
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
            slideToggle.focus();
            fixture.detectChanges();
            expect(document.activeElement).toBe(inputElement);
        });
        it('should set a element class if labelPosition is set to before', function () {
            expect(slideToggleElement.classList).not.toContain('mat-slide-toggle-label-before');
            testComponent.labelPosition = 'before';
            fixture.detectChanges();
            expect(slideToggleElement.classList).toContain('mat-slide-toggle-label-before');
        });
        it('should show ripples on label mousedown', function () {
            var rippleSelector = '.mat-ripple-element:not(.mat-slide-toggle-persistent-ripple)';
            expect(slideToggleElement.querySelectorAll(rippleSelector).length).toBe(0);
            testing_1.dispatchFakeEvent(labelElement, 'mousedown');
            testing_1.dispatchFakeEvent(labelElement, 'mouseup');
            expect(slideToggleElement.querySelectorAll(rippleSelector).length).toBe(1);
        });
        it('should not show ripples when disableRipple is set', function () {
            var rippleSelector = '.mat-ripple-element:not(.mat-slide-toggle-persistent-ripple)';
            testComponent.disableRipple = true;
            fixture.detectChanges();
            expect(slideToggleElement.querySelectorAll(rippleSelector).length).toBe(0);
            testing_1.dispatchFakeEvent(labelElement, 'mousedown');
            testing_1.dispatchFakeEvent(labelElement, 'mouseup');
            expect(slideToggleElement.querySelectorAll(rippleSelector).length).toBe(0);
        });
    });
    describe('custom template', function () {
        it('should not trigger the change event on initialization', testing_2.fakeAsync(function () {
            var fixture = testing_2.TestBed.createComponent(SlideToggleBasic);
            fixture.componentInstance.slideChecked = true;
            fixture.detectChanges();
            expect(fixture.componentInstance.lastEvent).toBeFalsy();
        }));
        it('should be able to set the tabindex via the native attribute', testing_2.fakeAsync(function () {
            var fixture = testing_2.TestBed.createComponent(SlideToggleWithTabindexAttr);
            fixture.detectChanges();
            var slideToggle = fixture.debugElement
                .query(platform_browser_1.By.directive(index_1.MatSlideToggle)).componentInstance;
            expect(slideToggle.tabIndex)
                .toBe(5, 'Expected tabIndex property to have been set based on the native attribute');
        }));
    });
    describe('custom action configuration', function () {
        it('should not change value on click when click action is noop', testing_2.fakeAsync(function () {
            testing_2.TestBed
                .resetTestingModule()
                .configureTestingModule({
                imports: [index_1.MatSlideToggleModule],
                declarations: [SlideToggleBasic],
                providers: [
                    {
                        provide: platform_browser_1.HAMMER_GESTURE_CONFIG,
                        useFactory: function () { return gestureConfig = new test_gesture_config_1.TestGestureConfig(); }
                    },
                    { provide: slide_toggle_config_1.MAT_SLIDE_TOGGLE_DEFAULT_OPTIONS, useValue: { disableToggleValue: true } },
                ]
            });
            var fixture = testing_2.TestBed.createComponent(SlideToggleBasic);
            var testComponent = fixture.debugElement.componentInstance;
            var slideToggleDebug = fixture.debugElement.query(platform_browser_1.By.css('mat-slide-toggle'));
            var slideToggle = slideToggleDebug.componentInstance;
            var inputElement = fixture.debugElement.query(platform_browser_1.By.css('input')).nativeElement;
            var labelElement = fixture.debugElement.query(platform_browser_1.By.css('label')).nativeElement;
            expect(testComponent.toggleTriggered).toBe(0);
            expect(testComponent.dragTriggered).toBe(0);
            expect(slideToggle.checked).toBe(false, 'Expect slide toggle value not changed');
            labelElement.click();
            fixture.detectChanges();
            expect(slideToggle.checked).toBe(false, 'Expect slide toggle value not changed');
            expect(testComponent.toggleTriggered).toBe(1, 'Expect toggle once');
            expect(testComponent.dragTriggered).toBe(0);
            inputElement.click();
            fixture.detectChanges();
            expect(slideToggle.checked).toBe(false, 'Expect slide toggle value not changed');
            expect(testComponent.toggleTriggered).toBe(2, 'Expect toggle twice');
            expect(testComponent.dragTriggered).toBe(0);
        }));
        it('should not change value on dragging when drag action is noop', testing_2.fakeAsync(function () {
            testing_2.TestBed
                .resetTestingModule()
                .configureTestingModule({
                imports: [index_1.MatSlideToggleModule],
                declarations: [SlideToggleBasic],
                providers: [
                    {
                        provide: platform_browser_1.HAMMER_GESTURE_CONFIG,
                        useFactory: function () { return gestureConfig = new test_gesture_config_1.TestGestureConfig(); }
                    },
                    { provide: slide_toggle_config_1.MAT_SLIDE_TOGGLE_DEFAULT_OPTIONS, useValue: { disableDragValue: true } },
                ]
            });
            var fixture = testing_2.TestBed.createComponent(SlideToggleBasic);
            var testComponent = fixture.debugElement.componentInstance;
            var slideToggleDebug = fixture.debugElement.query(platform_browser_1.By.css('mat-slide-toggle'));
            var thumbContainerDebug = slideToggleDebug
                .query(platform_browser_1.By.css('.mat-slide-toggle-thumb-container'));
            var slideThumbContainer = thumbContainerDebug.nativeElement;
            var slideToggle = slideToggleDebug.componentInstance;
            expect(testComponent.toggleTriggered).toBe(0);
            expect(testComponent.dragTriggered).toBe(0);
            expect(slideToggle.checked).toBe(false);
            gestureConfig.emitEventForElement('slidestart', slideThumbContainer);
            expect(slideThumbContainer.classList).toContain('mat-dragging');
            gestureConfig.emitEventForElement('slide', slideThumbContainer, {
                deltaX: 200 // Arbitrary, large delta that will be clamped to the end of the slide-toggle.
            });
            gestureConfig.emitEventForElement('slideend', slideThumbContainer);
            // Flush the timeout for the slide ending.
            // Flush the timeout for the slide ending.
            testing_2.tick();
            expect(slideToggle.checked).toBe(false, 'Expect slide toggle value not changed');
            expect(slideThumbContainer.classList).not.toContain('mat-dragging');
            expect(testComponent.lastEvent).toBeUndefined();
            expect(testComponent.toggleTriggered).toBe(0);
            expect(testComponent.dragTriggered).toBe(1, 'Expect drag once');
        }));
    });
    describe('with dragging', function () {
        var fixture;
        var testComponent;
        var slideToggle;
        var slideToggleElement;
        var slideThumbContainer;
        var inputElement;
        beforeEach(testing_2.fakeAsync(function () {
            fixture = testing_2.TestBed.createComponent(SlideToggleBasic);
            fixture.detectChanges();
            var slideToggleDebug = fixture.debugElement.query(platform_browser_1.By.css('mat-slide-toggle'));
            var thumbContainerDebug = slideToggleDebug
                .query(platform_browser_1.By.css('.mat-slide-toggle-thumb-container'));
            testComponent = fixture.debugElement.componentInstance;
            slideToggle = slideToggleDebug.componentInstance;
            slideToggleElement = slideToggleDebug.nativeElement;
            slideThumbContainer = thumbContainerDebug.nativeElement;
            inputElement = (slideToggleElement.querySelector('input'));
        }));
        it('should drag from start to end', testing_2.fakeAsync(function () {
            expect(slideToggle.checked).toBe(false);
            gestureConfig.emitEventForElement('slidestart', slideThumbContainer);
            expect(slideThumbContainer.classList).toContain('mat-dragging');
            gestureConfig.emitEventForElement('slide', slideThumbContainer, {
                deltaX: 200 // Arbitrary, large delta that will be clamped to the end of the slide-toggle.
            });
            gestureConfig.emitEventForElement('slideend', slideThumbContainer);
            // Flush the timeout for the slide ending.
            // Flush the timeout for the slide ending.
            testing_2.tick();
            expect(slideToggle.checked).toBe(true);
            expect(slideThumbContainer.classList).not.toContain('mat-dragging');
        }));
        it('should drag from start to end in RTL', testing_2.fakeAsync(function () {
            testComponent.direction = 'rtl';
            fixture.detectChanges();
            expect(slideToggle.checked).toBe(false);
            gestureConfig.emitEventForElement('slidestart', slideThumbContainer);
            expect(slideThumbContainer.classList).toContain('mat-dragging');
            gestureConfig.emitEventForElement('slide', slideThumbContainer, {
                deltaX: -200 // Arbitrary, large delta that will be clamped to the end of the slide-toggle.
            });
            gestureConfig.emitEventForElement('slideend', slideThumbContainer);
            // Flush the timeout for the slide ending.
            // Flush the timeout for the slide ending.
            testing_2.tick();
            expect(slideToggle.checked).toBe(true);
            expect(slideThumbContainer.classList).not.toContain('mat-dragging');
        }));
        it('should drag from end to start', testing_2.fakeAsync(function () {
            slideToggle.checked = true;
            gestureConfig.emitEventForElement('slidestart', slideThumbContainer);
            expect(slideThumbContainer.classList).toContain('mat-dragging');
            gestureConfig.emitEventForElement('slide', slideThumbContainer, {
                deltaX: -200 // Arbitrary, large delta that will be clamped to the end of the slide-toggle.
            });
            gestureConfig.emitEventForElement('slideend', slideThumbContainer);
            // Flush the timeout for the slide ending.
            // Flush the timeout for the slide ending.
            testing_2.tick();
            expect(slideToggle.checked).toBe(false);
            expect(slideThumbContainer.classList).not.toContain('mat-dragging');
        }));
        it('should drag from end to start in RTL', testing_2.fakeAsync(function () {
            testComponent.direction = 'rtl';
            fixture.detectChanges();
            slideToggle.checked = true;
            gestureConfig.emitEventForElement('slidestart', slideThumbContainer);
            expect(slideThumbContainer.classList).toContain('mat-dragging');
            gestureConfig.emitEventForElement('slide', slideThumbContainer, {
                deltaX: 200 // Arbitrary, large delta that will be clamped to the end of the slide-toggle.
            });
            gestureConfig.emitEventForElement('slideend', slideThumbContainer);
            // Flush the timeout for the slide ending.
            // Flush the timeout for the slide ending.
            testing_2.tick();
            expect(slideToggle.checked).toBe(false);
            expect(slideThumbContainer.classList).not.toContain('mat-dragging');
        }));
        it('should not drag when disabled', testing_2.fakeAsync(function () {
            slideToggle.disabled = true;
            expect(slideToggle.checked).toBe(false);
            gestureConfig.emitEventForElement('slidestart', slideThumbContainer);
            expect(slideThumbContainer.classList).not.toContain('mat-dragging');
            gestureConfig.emitEventForElement('slide', slideThumbContainer, {
                deltaX: 200 // Arbitrary, large delta that will be clamped to the end of the slide-toggle.
            });
            gestureConfig.emitEventForElement('slideend', slideThumbContainer);
            // Flush the timeout for the slide ending.
            // Flush the timeout for the slide ending.
            testing_2.tick();
            expect(slideToggle.checked).toBe(false);
            expect(slideThumbContainer.classList).not.toContain('mat-dragging');
        }));
        it('should should emit a change event after drag', testing_2.fakeAsync(function () {
            expect(slideToggle.checked).toBe(false);
            gestureConfig.emitEventForElement('slidestart', slideThumbContainer);
            expect(slideThumbContainer.classList).toContain('mat-dragging');
            gestureConfig.emitEventForElement('slide', slideThumbContainer, {
                deltaX: 200 // Arbitrary, large delta that will be clamped to the end of the slide-toggle.
            });
            gestureConfig.emitEventForElement('slideend', slideThumbContainer);
            // Flush the timeout for the slide ending.
            // Flush the timeout for the slide ending.
            testing_2.tick();
            expect(slideToggle.checked).toBe(true);
            expect(slideThumbContainer.classList).not.toContain('mat-dragging');
            expect(testComponent.lastEvent.checked).toBe(true);
        }));
        it('should not emit a change event when the value did not change', testing_2.fakeAsync(function () {
            expect(slideToggle.checked).toBe(false);
            gestureConfig.emitEventForElement('slidestart', slideThumbContainer);
            gestureConfig.emitEventForElement('slide', slideThumbContainer, { deltaX: 0 });
            gestureConfig.emitEventForElement('slideend', slideThumbContainer);
            // Flush the timeout for the slide ending.
            // Flush the timeout for the slide ending.
            testing_2.tick();
            expect(slideThumbContainer.classList).not.toContain('mat-dragging');
            expect(slideToggle.checked).toBe(false);
            expect(testComponent.lastEvent)
                .toBeFalsy('Expected the slide-toggle to not emit a change event.');
        }));
        it('should ignore clicks on the label element while dragging', testing_2.fakeAsync(function () {
            expect(slideToggle.checked).toBe(false);
            gestureConfig.emitEventForElement('slidestart', slideThumbContainer);
            gestureConfig.emitEventForElement('slide', slideThumbContainer, {
                deltaX: 200 // Arbitrary, large delta that will be clamped to the end of the slide-toggle.
            });
            gestureConfig.emitEventForElement('slideend', slideThumbContainer);
            expect(slideToggle.checked).toBe(true);
            // Fake a change event that has been fired after dragging through the click on pointer
            // release (noticeable on IE11, Edge)
            inputElement.checked = false;
            testing_1.dispatchFakeEvent(inputElement, 'change');
            // Flush the timeout for the slide ending.
            // Flush the timeout for the slide ending.
            testing_2.tick();
            expect(slideThumbContainer.classList).not.toContain('mat-dragging');
            expect(slideToggle.checked).toBe(true);
        }));
        it('should update the checked property of the input', testing_2.fakeAsync(function () {
            expect(inputElement.checked).toBe(false);
            gestureConfig.emitEventForElement('slidestart', slideThumbContainer);
            expect(slideThumbContainer.classList).toContain('mat-dragging');
            gestureConfig.emitEventForElement('slide', slideThumbContainer, {
                deltaX: 200 // Arbitrary, large delta that will be clamped to the end of the slide-toggle.
            });
            gestureConfig.emitEventForElement('slideend', slideThumbContainer);
            fixture.detectChanges();
            expect(inputElement.checked).toBe(true);
            // Flush the timeout for the slide ending.
            // Flush the timeout for the slide ending.
            testing_2.tick();
            expect(slideThumbContainer.classList).not.toContain('mat-dragging');
        }));
    });
    describe('without label', function () {
        var fixture;
        var testComponent;
        var slideToggleElement;
        var slideToggleBarElement;
        beforeEach(function () {
            fixture = testing_2.TestBed.createComponent(SlideToggleWithoutLabel);
            var slideToggleDebugEl = fixture.debugElement.query(platform_browser_1.By.directive(index_1.MatSlideToggle));
            testComponent = fixture.componentInstance;
            slideToggleElement = slideToggleDebugEl.nativeElement;
            slideToggleBarElement = slideToggleDebugEl
                .query(platform_browser_1.By.css('.mat-slide-toggle-bar')).nativeElement;
        });
        it('should remove margin for slide-toggle without a label', function () {
            fixture.detectChanges();
            expect(slideToggleBarElement.classList)
                .toContain('mat-slide-toggle-bar-no-side-margin');
        });
        it('should not remove margin if initial label is set through binding', testing_2.fakeAsync(function () {
            testComponent.label = 'Some content';
            fixture.detectChanges();
            expect(slideToggleBarElement.classList)
                .not.toContain('mat-slide-toggle-bar-no-side-margin');
        }));
        it('should re-add margin if label is added asynchronously', testing_2.fakeAsync(function () {
            fixture.detectChanges();
            expect(slideToggleBarElement.classList)
                .toContain('mat-slide-toggle-bar-no-side-margin');
            testComponent.label = 'Some content';
            fixture.detectChanges();
            flushMutationObserver();
            fixture.detectChanges();
            expect(slideToggleElement.classList)
                .not.toContain('mat-slide-toggle-bar-no-side-margin');
        }));
    });
});
describe('MatSlideToggle with forms', function () {
    beforeEach(testing_2.fakeAsync(function () {
        testing_2.TestBed.configureTestingModule({
            imports: [index_1.MatSlideToggleModule, forms_1.FormsModule, forms_1.ReactiveFormsModule],
            declarations: [
                SlideToggleWithForm,
                SlideToggleWithModel,
                SlideToggleWithFormControl,
                SlideToggleWithModelAndChangeEvent,
            ]
        });
        testing_2.TestBed.compileComponents();
    }));
    describe('using ngModel', function () {
        var fixture;
        var testComponent;
        var slideToggle;
        var slideToggleElement;
        var slideToggleModel;
        var inputElement;
        var labelElement;
        // This initialization is async() because it needs to wait for ngModel to set the initial value.
        beforeEach(testing_2.fakeAsync(function () {
            fixture = testing_2.TestBed.createComponent(SlideToggleWithModel);
            fixture.detectChanges();
            var slideToggleDebug = fixture.debugElement.query(platform_browser_1.By.directive(index_1.MatSlideToggle));
            testComponent = fixture.debugElement.componentInstance;
            slideToggle = slideToggleDebug.componentInstance;
            slideToggleElement = slideToggleDebug.nativeElement;
            slideToggleModel = slideToggleDebug.injector.get(forms_1.NgModel);
            inputElement = fixture.debugElement.query(platform_browser_1.By.css('input')).nativeElement;
            labelElement = fixture.debugElement.query(platform_browser_1.By.css('label')).nativeElement;
        }));
        it('should be initially set to ng-pristine', function () {
            expect(slideToggleElement.classList).toContain('ng-pristine');
            expect(slideToggleElement.classList).not.toContain('ng-dirty');
        });
        it('should update the model programmatically', testing_2.fakeAsync(function () {
            expect(slideToggleElement.classList).not.toContain('mat-checked');
            testComponent.modelValue = true;
            fixture.detectChanges();
            // Flush the microtasks because the forms module updates the model state asynchronously.
            // Flush the microtasks because the forms module updates the model state asynchronously.
            testing_2.flushMicrotasks();
            fixture.detectChanges();
            expect(slideToggleElement.classList).toContain('mat-checked');
        }));
        it('should have the correct control state initially and after interaction', testing_2.fakeAsync(function () {
            // The control should start off valid, pristine, and untouched.
            expect(slideToggleModel.valid).toBe(true);
            expect(slideToggleModel.pristine).toBe(true);
            expect(slideToggleModel.touched).toBe(false);
            // After changing the value from the view, the control should
            // become dirty (not pristine), but remain untouched if focus is still there.
            slideToggle.checked = true;
            // Dispatch a change event on the input element to fake a user interaction that triggered
            // the state change.
            // Dispatch a change event on the input element to fake a user interaction that triggered
            // the state change.
            testing_1.dispatchFakeEvent(inputElement, 'change');
            expect(slideToggleModel.valid).toBe(true);
            expect(slideToggleModel.pristine).toBe(false);
            expect(slideToggleModel.touched).toBe(false);
            // Once the input element loses focus, the control should remain dirty but should
            // also turn touched.
            // Once the input element loses focus, the control should remain dirty but should
            // also turn touched.
            testing_1.dispatchFakeEvent(inputElement, 'blur');
            fixture.detectChanges();
            testing_2.flushMicrotasks();
            expect(slideToggleModel.valid).toBe(true);
            expect(slideToggleModel.pristine).toBe(false);
            expect(slideToggleModel.touched).toBe(true);
        }));
        it('should not throw an error when disabling while focused', testing_2.fakeAsync(function () {
            expect(function () {
                // Focus the input element because after disabling, the `blur` event should automatically
                // fire and not result in a changed after checked exception. Related: #12323
                inputElement.focus();
                // Flush the two nested timeouts from the FocusMonitor that are being created on `focus`.
                // Flush the two nested timeouts from the FocusMonitor that are being created on `focus`.
                testing_2.flush();
                slideToggle.disabled = true;
                fixture.detectChanges();
                testing_2.flushMicrotasks();
            }).not.toThrow();
        }));
        it('should not set the control to touched when changing the state programmatically', testing_2.fakeAsync(function () {
            // The control should start off with being untouched.
            expect(slideToggleModel.touched).toBe(false);
            slideToggle.checked = true;
            fixture.detectChanges();
            expect(slideToggleModel.touched).toBe(false);
            expect(slideToggleElement.classList).toContain('mat-checked');
            // Once the input element loses focus, the control should remain dirty but should
            // also turn touched.
            // Once the input element loses focus, the control should remain dirty but should
            // also turn touched.
            testing_1.dispatchFakeEvent(inputElement, 'blur');
            fixture.detectChanges();
            testing_2.flushMicrotasks();
            expect(slideToggleModel.touched).toBe(true);
            expect(slideToggleElement.classList).toContain('mat-checked');
        }));
        it('should not set the control to touched when changing the model', testing_2.fakeAsync(function () {
            // The control should start off with being untouched.
            expect(slideToggleModel.touched).toBe(false);
            testComponent.modelValue = true;
            fixture.detectChanges();
            // Flush the microtasks because the forms module updates the model state asynchronously.
            // Flush the microtasks because the forms module updates the model state asynchronously.
            testing_2.flushMicrotasks();
            // The checked property has been updated from the model and now the view needs
            // to reflect the state change.
            fixture.detectChanges();
            expect(slideToggleModel.touched).toBe(false);
            expect(slideToggle.checked).toBe(true);
            expect(slideToggleElement.classList).toContain('mat-checked');
        }));
        it('should update checked state on click if control is checked initially', testing_2.fakeAsync(function () {
            fixture = testing_2.TestBed.createComponent(SlideToggleWithModel);
            slideToggle = fixture.debugElement.query(platform_browser_1.By.directive(index_1.MatSlideToggle)).componentInstance;
            labelElement = fixture.debugElement.query(platform_browser_1.By.css('label')).nativeElement;
            fixture.componentInstance.modelValue = true;
            fixture.detectChanges();
            // Flush the microtasks because the forms module updates the model state asynchronously.
            // Flush the microtasks because the forms module updates the model state asynchronously.
            testing_2.flushMicrotasks();
            // Now the new checked variable has been updated in the slide-toggle and the slide-toggle
            // is marked for check because it still needs to update the underlying input.
            fixture.detectChanges();
            expect(slideToggle.checked)
                .toBe(true, 'Expected slide-toggle to be checked initially');
            labelElement.click();
            fixture.detectChanges();
            testing_2.tick();
            expect(slideToggle.checked)
                .toBe(false, 'Expected slide-toggle to be no longer checked after label click.');
        }));
        it('should be pristine if initial value is set from NgModel', testing_2.fakeAsync(function () {
            fixture = testing_2.TestBed.createComponent(SlideToggleWithModel);
            fixture.componentInstance.modelValue = true;
            fixture.detectChanges();
            var debugElement = fixture.debugElement.query(platform_browser_1.By.directive(index_1.MatSlideToggle));
            var modelInstance = debugElement.injector.get(forms_1.NgModel);
            // Flush the microtasks because the forms module updates the model state asynchronously.
            // Flush the microtasks because the forms module updates the model state asynchronously.
            testing_2.flushMicrotasks();
            expect(modelInstance.pristine).toBe(true);
        }));
        it('should set the model value when toggling via the `toggle` method', testing_2.fakeAsync(function () {
            expect(testComponent.modelValue).toBe(false);
            fixture.debugElement.query(platform_browser_1.By.directive(index_1.MatSlideToggle)).componentInstance.toggle();
            fixture.detectChanges();
            testing_2.flushMicrotasks();
            fixture.detectChanges();
            expect(testComponent.modelValue).toBe(true);
        }));
    });
    describe('with a FormControl', function () {
        var fixture;
        var testComponent;
        var slideToggle;
        var inputElement;
        beforeEach(function () {
            fixture = testing_2.TestBed.createComponent(SlideToggleWithFormControl);
            fixture.detectChanges();
            testComponent = fixture.debugElement.componentInstance;
            slideToggle = fixture.debugElement.query(platform_browser_1.By.directive(index_1.MatSlideToggle)).componentInstance;
            inputElement = fixture.debugElement.query(platform_browser_1.By.css('input')).nativeElement;
        });
        it('should toggle the disabled state', function () {
            expect(slideToggle.disabled).toBe(false);
            expect(inputElement.disabled).toBe(false);
            testComponent.formControl.disable();
            fixture.detectChanges();
            expect(slideToggle.disabled).toBe(true);
            expect(inputElement.disabled).toBe(true);
            testComponent.formControl.enable();
            fixture.detectChanges();
            expect(slideToggle.disabled).toBe(false);
            expect(inputElement.disabled).toBe(false);
        });
    });
    describe('with form element', function () {
        var fixture;
        var testComponent;
        var buttonElement;
        var inputElement;
        // This initialization is async() because it needs to wait for ngModel to set the initial value.
        beforeEach(testing_2.fakeAsync(function () {
            fixture = testing_2.TestBed.createComponent(SlideToggleWithForm);
            fixture.detectChanges();
            testComponent = fixture.debugElement.componentInstance;
            buttonElement = fixture.debugElement.query(platform_browser_1.By.css('button')).nativeElement;
            inputElement = fixture.debugElement.query(platform_browser_1.By.css('input')).nativeElement;
        }));
        it('should prevent the form from submit when being required', function () {
            if (typeof inputElement.reportValidity === 'undefined') {
                // If the browser does not report the validity then the tests will break.
                // e.g Safari 8 on Mobile.
                return;
            }
            testComponent.isRequired = true;
            fixture.detectChanges();
            buttonElement.click();
            fixture.detectChanges();
            expect(testComponent.isSubmitted).toBe(false);
            testComponent.isRequired = false;
            fixture.detectChanges();
            buttonElement.click();
            fixture.detectChanges();
            expect(testComponent.isSubmitted).toBe(true);
        });
    });
    describe('with model and change event', function () {
        it('should report changes to NgModel before emitting change event', function () {
            var fixture = testing_2.TestBed.createComponent(SlideToggleWithModelAndChangeEvent);
            fixture.detectChanges();
            var labelEl = fixture.debugElement.query(platform_browser_1.By.css('label')).nativeElement;
            spyOn(fixture.componentInstance, 'onChange').and.callFake(function () {
                expect(fixture.componentInstance.checked)
                    .toBe(true, 'Expected the model value to have changed before the change event fired.');
            });
            labelEl.click();
            expect(fixture.componentInstance.onChange).toHaveBeenCalledTimes(1);
        });
    });
});
var SlideToggleBasic = /** @class */ (function () {
    function SlideToggleBasic() {
        var _this = this;
        this.isDisabled = false;
        this.isRequired = false;
        this.disableRipple = false;
        this.slideChecked = false;
        this.toggleTriggered = 0;
        this.dragTriggered = 0;
        this.direction = 'ltr';
        this.onSlideClick = function () { };
        this.onSlideChange = function (event) { return _this.lastEvent = event; };
        this.onSlideToggleChange = function () { return _this.toggleTriggered++; };
        this.onSlideDragChange = function () { return _this.dragTriggered++; };
    }
    SlideToggleBasic.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <mat-slide-toggle [dir]=\"direction\" [required]=\"isRequired\"\n                     [disabled]=\"isDisabled\"\n                     [color]=\"slideColor\"\n                     [id]=\"slideId\"\n                     [checked]=\"slideChecked\"\n                     [name]=\"slideName\"\n                     [aria-label]=\"slideLabel\"\n                     [aria-labelledby]=\"slideLabelledBy\"\n                     [tabIndex]=\"slideTabindex\"\n                     [labelPosition]=\"labelPosition\"\n                     [disableRipple]=\"disableRipple\"\n                     (toggleChange)=\"onSlideToggleChange()\"\n                     (dragChange)=\"onSlideDragChange()\"\n                     (change)=\"onSlideChange($event)\"\n                     (click)=\"onSlideClick($event)\">\n      <span>Test Slide Toggle</span>\n    </mat-slide-toggle>",
                },] },
    ];
    return SlideToggleBasic;
}());
var SlideToggleWithForm = /** @class */ (function () {
    function SlideToggleWithForm() {
        this.isSubmitted = false;
        this.isRequired = false;
    }
    SlideToggleWithForm.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <form ngNativeValidate (ngSubmit)=\"isSubmitted = true\">\n      <mat-slide-toggle name=\"slide\" ngModel [required]=\"isRequired\">Required</mat-slide-toggle>\n      <button type=\"submit\"></button>\n    </form>"
                },] },
    ];
    return SlideToggleWithForm;
}());
var SlideToggleWithModel = /** @class */ (function () {
    function SlideToggleWithModel() {
        this.modelValue = false;
    }
    SlideToggleWithModel.decorators = [
        { type: core_1.Component, args: [{
                    template: "<mat-slide-toggle [(ngModel)]=\"modelValue\"></mat-slide-toggle>"
                },] },
    ];
    return SlideToggleWithModel;
}());
var SlideToggleWithFormControl = /** @class */ (function () {
    function SlideToggleWithFormControl() {
        this.formControl = new forms_1.FormControl();
    }
    SlideToggleWithFormControl.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <mat-slide-toggle [formControl]=\"formControl\">\n      <span>Test Slide Toggle</span>\n    </mat-slide-toggle>",
                },] },
    ];
    return SlideToggleWithFormControl;
}());
var SlideToggleWithTabindexAttr = /** @class */ (function () {
    function SlideToggleWithTabindexAttr() {
    }
    SlideToggleWithTabindexAttr.decorators = [
        { type: core_1.Component, args: [{
                    template: "<mat-slide-toggle tabindex=\"5\"></mat-slide-toggle>"
                },] },
    ];
    return SlideToggleWithTabindexAttr;
}());
var SlideToggleWithoutLabel = /** @class */ (function () {
    function SlideToggleWithoutLabel() {
    }
    SlideToggleWithoutLabel.decorators = [
        { type: core_1.Component, args: [{
                    template: "<mat-slide-toggle>{{label}}</mat-slide-toggle>"
                },] },
    ];
    return SlideToggleWithoutLabel;
}());
var SlideToggleWithModelAndChangeEvent = /** @class */ (function () {
    function SlideToggleWithModelAndChangeEvent() {
        this.onChange = function () { };
    }
    SlideToggleWithModelAndChangeEvent.decorators = [
        { type: core_1.Component, args: [{
                    template: "<mat-slide-toggle [(ngModel)]=\"checked\" (change)=\"onChange()\"></mat-slide-toggle>"
                },] },
    ];
    return SlideToggleWithModelAndChangeEvent;
}());
//# sourceMappingURL=slide-toggle.spec.js.map