"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bidi_1 = require("@angular/cdk/bidi");
var keycodes_1 = require("@angular/cdk/keycodes");
var testing_1 = require("@angular/cdk/testing");
var core_1 = require("@angular/core");
var testing_2 = require("@angular/core/testing");
var forms_1 = require("@angular/forms");
var platform_browser_1 = require("@angular/platform-browser");
var index_1 = require("./index");
var test_gesture_config_1 = require("./test-gesture-config");
describe('MatSlider', function () {
    var gestureConfig;
    function createComponent(component) {
        testing_2.TestBed.configureTestingModule({
            imports: [index_1.MatSliderModule, forms_1.ReactiveFormsModule, forms_1.FormsModule, bidi_1.BidiModule],
            declarations: [component],
            providers: [
                { provide: platform_browser_1.HAMMER_GESTURE_CONFIG, useFactory: function () {
                        gestureConfig = new test_gesture_config_1.TestGestureConfig();
                        return gestureConfig;
                    } }
            ]
        }).compileComponents();
        return testing_2.TestBed.createComponent(component);
    }
    describe('standard slider', function () {
        var fixture;
        var sliderDebugElement;
        var sliderNativeElement;
        var sliderInstance;
        var trackFillElement;
        beforeEach(function () {
            fixture = createComponent(StandardSlider);
            fixture.detectChanges();
            sliderDebugElement = fixture.debugElement.query(platform_browser_1.By.directive(index_1.MatSlider));
            sliderNativeElement = sliderDebugElement.nativeElement;
            sliderInstance = sliderDebugElement.componentInstance;
            trackFillElement = sliderNativeElement.querySelector('.mat-slider-track-fill');
        });
        it('should set the default values', function () {
            expect(sliderInstance.value).toBe(0);
            expect(sliderInstance.min).toBe(0);
            expect(sliderInstance.max).toBe(100);
        });
        it('should update the value on a click', function () {
            expect(sliderInstance.value).toBe(0);
            dispatchClickEventSequence(sliderNativeElement, 0.19);
            expect(sliderInstance.value).toBe(19);
        });
        it('should update the value on a slide', function () {
            expect(sliderInstance.value).toBe(0);
            dispatchSlideEventSequence(sliderNativeElement, 0, 0.89, gestureConfig);
            expect(sliderInstance.value).toBe(89);
        });
        it('should set the value as min when sliding before the track', function () {
            expect(sliderInstance.value).toBe(0);
            dispatchSlideEventSequence(sliderNativeElement, 0, -1.33, gestureConfig);
            expect(sliderInstance.value).toBe(0);
        });
        it('should set the value as max when sliding past the track', function () {
            expect(sliderInstance.value).toBe(0);
            dispatchSlideEventSequence(sliderNativeElement, 0, 1.75, gestureConfig);
            expect(sliderInstance.value).toBe(100);
        });
        it('should update the track fill on click', function () {
            expect(trackFillElement.style.transform).toContain('scale3d(0, 1, 1)');
            dispatchClickEventSequence(sliderNativeElement, 0.39);
            fixture.detectChanges();
            expect(trackFillElement.style.transform).toContain('scale3d(0.39, 1, 1)');
        });
        it('should update the track fill on slide', function () {
            expect(trackFillElement.style.transform).toContain('scale3d(0, 1, 1)');
            dispatchSlideEventSequence(sliderNativeElement, 0, 0.86, gestureConfig);
            fixture.detectChanges();
            expect(trackFillElement.style.transform).toContain('scale3d(0.86, 1, 1)');
        });
        it('should add and remove the mat-slider-sliding class when sliding', function () {
            expect(sliderNativeElement.classList).not.toContain('mat-slider-sliding');
            dispatchSlideStartEvent(sliderNativeElement, 0, gestureConfig);
            fixture.detectChanges();
            expect(sliderNativeElement.classList).toContain('mat-slider-sliding');
            dispatchSlideEndEvent(sliderNativeElement, 0.34, gestureConfig);
            fixture.detectChanges();
            expect(sliderNativeElement.classList).not.toContain('mat-slider-sliding');
        });
        it('should not change value without emitting a change event', function () {
            var onChangeSpy = jasmine.createSpy('slider onChange');
            sliderInstance.change.subscribe(onChangeSpy);
            sliderInstance.value = 50;
            fixture.detectChanges();
            dispatchSlideStartEvent(sliderNativeElement, 0, gestureConfig);
            fixture.detectChanges();
            dispatchSlideEvent(sliderNativeElement, 10, gestureConfig);
            fixture.detectChanges();
            // In some situations, HammerJS will fire a second "slidestart" event because the user
            // holds the thumb and drags it around. This would mean that the `_valueOnSlideStart`
            // value will be updated to the actual end value. Causing the slider to think that the value
            // didn't change at all.
            dispatchSlideStartEvent(sliderNativeElement, 10, gestureConfig);
            fixture.detectChanges();
            dispatchSlideEndEvent(sliderNativeElement, 10, gestureConfig);
            fixture.detectChanges();
            expect(sliderNativeElement.classList).not.toContain('mat-slider-sliding');
            expect(onChangeSpy).toHaveBeenCalledTimes(1);
        });
        it('should reset active state upon blur', function () {
            sliderInstance._isActive = true;
            testing_1.dispatchFakeEvent(sliderNativeElement, 'blur');
            fixture.detectChanges();
            expect(sliderInstance._isActive).toBe(false);
        });
        it('should reset thumb gap when blurred on min value', function () {
            sliderInstance._isActive = true;
            sliderInstance.value = 0;
            fixture.detectChanges();
            expect(sliderInstance._thumbGap).toBe(10);
            testing_1.dispatchFakeEvent(sliderNativeElement, 'blur');
            fixture.detectChanges();
            expect(sliderInstance._thumbGap).toBe(7);
        });
        it('should have thumb gap when at min value', function () {
            expect(trackFillElement.style.transform).toContain('translateX(-7px)');
        });
        it('should not have thumb gap when not at min value', function () {
            dispatchClickEventSequence(sliderNativeElement, 1);
            fixture.detectChanges();
            // Some browsers use '0' and some use '0px', so leave off the closing paren.
            expect(trackFillElement.style.transform).toContain('translateX(0');
        });
        it('should have aria-orientation horizontal', function () {
            expect(sliderNativeElement.getAttribute('aria-orientation')).toEqual('horizontal');
        });
        it('should slide to the max value when the steps do not divide evenly into it', function () {
            sliderInstance.min = 5;
            sliderInstance.max = 100;
            sliderInstance.step = 15;
            dispatchSlideEventSequence(sliderNativeElement, 0, 1, gestureConfig);
            fixture.detectChanges();
            expect(sliderInstance.value).toBe(100);
        });
    });
    describe('disabled slider', function () {
        var fixture;
        var sliderDebugElement;
        var sliderNativeElement;
        var sliderInstance;
        var trackFillElement;
        beforeEach(function () {
            fixture = createComponent(DisabledSlider);
            fixture.detectChanges();
            sliderDebugElement = fixture.debugElement.query(platform_browser_1.By.directive(index_1.MatSlider));
            sliderNativeElement = sliderDebugElement.nativeElement;
            sliderInstance = sliderDebugElement.componentInstance;
            trackFillElement = sliderNativeElement.querySelector('.mat-slider-track-fill');
        });
        it('should be disabled', function () {
            expect(sliderInstance.disabled).toBeTruthy();
        });
        it('should not change the value on click when disabled', function () {
            expect(sliderInstance.value).toBe(0);
            dispatchClickEventSequence(sliderNativeElement, 0.63);
            expect(sliderInstance.value).toBe(0);
        });
        it('should not change the value on slide when disabled', function () {
            expect(sliderInstance.value).toBe(0);
            dispatchSlideEventSequence(sliderNativeElement, 0, 0.5, gestureConfig);
            expect(sliderInstance.value).toBe(0);
        });
        it('should not emit change when disabled', function () {
            var onChangeSpy = jasmine.createSpy('slider onChange');
            sliderInstance.change.subscribe(onChangeSpy);
            dispatchSlideEventSequence(sliderNativeElement, 0, 0.5, gestureConfig);
            expect(onChangeSpy).toHaveBeenCalledTimes(0);
        });
        it('should not add the mat-slider-active class on click when disabled', function () {
            expect(sliderNativeElement.classList).not.toContain('mat-slider-active');
            dispatchClickEventSequence(sliderNativeElement, 0.43);
            fixture.detectChanges();
            expect(sliderNativeElement.classList).not.toContain('mat-slider-active');
        });
        it('should not add the mat-slider-sliding class on slide when disabled', function () {
            expect(sliderNativeElement.classList).not.toContain('mat-slider-sliding');
            dispatchSlideStartEvent(sliderNativeElement, 0.46, gestureConfig);
            fixture.detectChanges();
            expect(sliderNativeElement.classList).not.toContain('mat-slider-sliding');
        });
        it('should leave thumb gap', function () {
            expect(trackFillElement.style.transform).toContain('translateX(-7px)');
        });
        it('should disable tabbing to the slider', function () {
            expect(sliderNativeElement.tabIndex).toBe(-1);
        });
    });
    describe('slider with set min and max', function () {
        var fixture;
        var sliderDebugElement;
        var sliderNativeElement;
        var sliderInstance;
        var trackFillElement;
        var ticksContainerElement;
        var ticksElement;
        var testComponent;
        beforeEach(function () {
            fixture = createComponent(SliderWithMinAndMax);
            fixture.detectChanges();
            sliderDebugElement = fixture.debugElement.query(platform_browser_1.By.directive(index_1.MatSlider));
            testComponent = fixture.debugElement.componentInstance;
            sliderNativeElement = sliderDebugElement.nativeElement;
            sliderInstance = sliderDebugElement.injector.get(index_1.MatSlider);
            trackFillElement = sliderNativeElement.querySelector('.mat-slider-track-fill');
            ticksContainerElement = sliderNativeElement.querySelector('.mat-slider-ticks-container');
            ticksElement = sliderNativeElement.querySelector('.mat-slider-ticks');
        });
        it('should set the default values from the attributes', function () {
            expect(sliderInstance.value).toBe(4);
            expect(sliderInstance.min).toBe(4);
            expect(sliderInstance.max).toBe(6);
        });
        it('should set the correct value on click', function () {
            dispatchClickEventSequence(sliderNativeElement, 0.09);
            fixture.detectChanges();
            // Computed by multiplying the difference between the min and the max by the percentage from
            // the click and adding that to the minimum.
            var value = Math.round(4 + (0.09 * (6 - 4)));
            expect(sliderInstance.value).toBe(value);
        });
        it('should set the correct value on slide', function () {
            dispatchSlideEventSequence(sliderNativeElement, 0, 0.62, gestureConfig);
            fixture.detectChanges();
            // Computed by multiplying the difference between the min and the max by the percentage from
            // the click and adding that to the minimum.
            var value = Math.round(4 + (0.62 * (6 - 4)));
            expect(sliderInstance.value).toBe(value);
        });
        it('should snap the fill to the nearest value on click', function () {
            dispatchClickEventSequence(sliderNativeElement, 0.68);
            fixture.detectChanges();
            // The closest snap is halfway on the slider.
            expect(trackFillElement.style.transform).toContain('scale3d(0.5, 1, 1)');
        });
        it('should snap the fill to the nearest value on slide', function () {
            dispatchSlideEventSequence(sliderNativeElement, 0, 0.74, gestureConfig);
            fixture.detectChanges();
            // The closest snap is at the halfway point on the slider.
            expect(trackFillElement.style.transform).toContain('scale3d(0.5, 1, 1)');
        });
        it('should adjust fill and ticks on mouse enter when min changes', function () {
            testComponent.min = -2;
            fixture.detectChanges();
            dispatchMouseenterEvent(sliderNativeElement);
            fixture.detectChanges();
            expect(trackFillElement.style.transform).toContain('scale3d(0.75, 1, 1)');
            expect(ticksElement.style.backgroundSize).toBe('75% 2px');
            // Make sure it cuts off the last half tick interval.
            expect(ticksElement.style.transform).toContain('translateX(37.5%)');
            expect(ticksContainerElement.style.transform).toBe('translateX(-37.5%)');
        });
        it('should adjust fill and ticks on mouse enter when max changes', function () {
            testComponent.min = -2;
            fixture.detectChanges();
            testComponent.max = 10;
            fixture.detectChanges();
            dispatchMouseenterEvent(sliderNativeElement);
            fixture.detectChanges();
            expect(trackFillElement.style.transform).toContain('scale3d(0.5, 1, 1)');
            expect(ticksElement.style.backgroundSize).toBe('50% 2px');
            // Make sure it cuts off the last half tick interval.
            expect(ticksElement.style.transform).toContain('translateX(25%)');
            expect(ticksContainerElement.style.transform).toBe('translateX(-25%)');
        });
    });
    describe('slider with set value', function () {
        var fixture;
        var sliderDebugElement;
        var sliderNativeElement;
        var sliderInstance;
        beforeEach(function () {
            fixture = createComponent(SliderWithValue);
            fixture.detectChanges();
            sliderDebugElement = fixture.debugElement.query(platform_browser_1.By.directive(index_1.MatSlider));
            sliderNativeElement = sliderDebugElement.nativeElement;
            sliderInstance = sliderDebugElement.injector.get(index_1.MatSlider);
        });
        it('should set the default value from the attribute', function () {
            expect(sliderInstance.value).toBe(26);
        });
        it('should set the correct value on click', function () {
            dispatchClickEventSequence(sliderNativeElement, 0.92);
            fixture.detectChanges();
            // On a slider with default max and min the value should be approximately equal to the
            // percentage clicked. This should be the case regardless of what the original set value was.
            expect(sliderInstance.value).toBe(92);
        });
        it('should set the correct value on slide', function () {
            dispatchSlideEventSequence(sliderNativeElement, 0, 0.32, gestureConfig);
            fixture.detectChanges();
            expect(sliderInstance.value).toBe(32);
        });
    });
    describe('slider with set step', function () {
        var fixture;
        var sliderDebugElement;
        var sliderNativeElement;
        var sliderInstance;
        var trackFillElement;
        beforeEach(function () {
            fixture = createComponent(SliderWithStep);
            fixture.detectChanges();
            sliderDebugElement = fixture.debugElement.query(platform_browser_1.By.directive(index_1.MatSlider));
            sliderNativeElement = sliderDebugElement.nativeElement;
            sliderInstance = sliderDebugElement.injector.get(index_1.MatSlider);
            trackFillElement = sliderNativeElement.querySelector('.mat-slider-track-fill');
        });
        it('should set the correct step value on click', function () {
            expect(sliderInstance.value).toBe(0);
            dispatchClickEventSequence(sliderNativeElement, 0.13);
            fixture.detectChanges();
            expect(sliderInstance.value).toBe(25);
        });
        it('should snap the fill to a step on click', function () {
            dispatchClickEventSequence(sliderNativeElement, 0.66);
            fixture.detectChanges();
            // The closest step is at 75% of the slider.
            expect(trackFillElement.style.transform).toContain('scale3d(0.75, 1, 1)');
        });
        it('should set the correct step value on slide', function () {
            dispatchSlideEventSequence(sliderNativeElement, 0, 0.07, gestureConfig);
            fixture.detectChanges();
            expect(sliderInstance.value).toBe(0);
        });
        it('should snap the thumb and fill to a step on slide', function () {
            dispatchSlideEventSequence(sliderNativeElement, 0, 0.88, gestureConfig);
            fixture.detectChanges();
            // The closest snap is at the end of the slider.
            expect(trackFillElement.style.transform).toContain('scale3d(1, 1, 1)');
        });
        it('should round the value inside the label based on the provided step', function () {
            var testStep = function (step, expected) {
                fixture.componentInstance.step = step;
                fixture.detectChanges();
                dispatchSlideEventSequence(sliderNativeElement, 0, 0.333333, gestureConfig);
                expect(sliderDebugElement.componentInstance.displayValue.toString()).toBe(expected);
            };
            testStep(1, '33');
            testStep(0.1, '33.3');
            testStep(0.01, '33.33');
            testStep(0.001, '33.333');
        });
        it('should not add decimals to the value if it is a whole number', function () {
            fixture.componentInstance.step = 0.1;
            fixture.detectChanges();
            dispatchSlideEventSequence(sliderNativeElement, 0, 1, gestureConfig);
            expect(sliderDebugElement.componentInstance.displayValue).toBe(100);
        });
        it('should truncate long decimal values when using a decimal step', function () {
            fixture.componentInstance.step = 0.1;
            fixture.detectChanges();
            dispatchSlideEventSequence(sliderNativeElement, 0, 0.333333, gestureConfig);
            expect(sliderInstance.value).toBe(33.3);
        });
        it('should truncate long decimal values when using a decimal step and the arrow keys', function () {
            fixture.componentInstance.step = 0.1;
            fixture.detectChanges();
            for (var i = 0; i < 3; i++) {
                testing_1.dispatchKeyboardEvent(sliderNativeElement, 'keydown', keycodes_1.UP_ARROW);
            }
            expect(sliderInstance.value).toBe(0.3);
        });
    });
    describe('slider with auto ticks', function () {
        var fixture;
        var sliderDebugElement;
        var sliderNativeElement;
        var ticksContainerElement;
        var ticksElement;
        beforeEach(function () {
            fixture = createComponent(SliderWithAutoTickInterval);
            fixture.detectChanges();
            sliderDebugElement = fixture.debugElement.query(platform_browser_1.By.directive(index_1.MatSlider));
            sliderNativeElement = sliderDebugElement.nativeElement;
            ticksContainerElement = sliderNativeElement.querySelector('.mat-slider-ticks-container');
            ticksElement = sliderNativeElement.querySelector('.mat-slider-ticks');
        });
        it('should set the correct tick separation on mouse enter', function () {
            dispatchMouseenterEvent(sliderNativeElement);
            fixture.detectChanges();
            // Ticks should be 30px apart (therefore 30% for a 100px long slider).
            expect(ticksElement.style.backgroundSize).toBe('30% 2px');
            // Make sure it cuts off the last half tick interval.
            expect(ticksElement.style.transform).toContain('translateX(15%)');
            expect(ticksContainerElement.style.transform).toBe('translateX(-15%)');
        });
    });
    describe('slider with set tick interval', function () {
        var fixture;
        var sliderDebugElement;
        var sliderNativeElement;
        var ticksContainerElement;
        var ticksElement;
        beforeEach(function () {
            fixture = createComponent(SliderWithSetTickInterval);
            fixture.detectChanges();
            sliderDebugElement = fixture.debugElement.query(platform_browser_1.By.directive(index_1.MatSlider));
            sliderNativeElement = sliderDebugElement.nativeElement;
            ticksContainerElement = sliderNativeElement.querySelector('.mat-slider-ticks-container');
            ticksElement = sliderNativeElement.querySelector('.mat-slider-ticks');
        });
        it('should set the correct tick separation on mouse enter', function () {
            dispatchMouseenterEvent(sliderNativeElement);
            fixture.detectChanges();
            // Ticks should be every 18 values (tickInterval of 6 * step size of 3). On a slider 100px
            // long with 100 values, this is 18%.
            expect(ticksElement.style.backgroundSize).toBe('18% 2px');
            // Make sure it cuts off the last half tick interval.
            expect(ticksElement.style.transform).toContain('translateX(9%)');
            expect(ticksContainerElement.style.transform).toBe('translateX(-9%)');
        });
        it('should be able to reset the tick interval after it has been set', function () {
            expect(sliderNativeElement.classList)
                .toContain('mat-slider-has-ticks', 'Expected element to have ticks initially.');
            fixture.componentInstance.tickInterval = 0;
            fixture.detectChanges();
            expect(sliderNativeElement.classList)
                .not.toContain('mat-slider-has-ticks', 'Expected element not to have ticks after reset.');
        });
    });
    describe('slider with thumb label', function () {
        var fixture;
        var sliderDebugElement;
        var sliderNativeElement;
        var sliderInstance;
        var thumbLabelTextElement;
        beforeEach(function () {
            fixture = createComponent(SliderWithThumbLabel);
            fixture.detectChanges();
            sliderDebugElement = fixture.debugElement.query(platform_browser_1.By.directive(index_1.MatSlider));
            sliderNativeElement = sliderDebugElement.nativeElement;
            sliderInstance = sliderDebugElement.componentInstance;
            thumbLabelTextElement = (sliderNativeElement.querySelector('.mat-slider-thumb-label-text'));
        });
        it('should add the thumb label class to the slider container', function () {
            expect(sliderNativeElement.classList).toContain('mat-slider-thumb-label-showing');
        });
        it('should update the thumb label text on click', function () {
            expect(thumbLabelTextElement.textContent).toBe('0');
            dispatchClickEventSequence(sliderNativeElement, 0.13);
            fixture.detectChanges();
            // The thumb label text is set to the slider's value. These should always be the same.
            expect(thumbLabelTextElement.textContent).toBe('13');
        });
        it('should update the thumb label text on slide', function () {
            expect(thumbLabelTextElement.textContent).toBe('0');
            dispatchSlideEventSequence(sliderNativeElement, 0, 0.56, gestureConfig);
            fixture.detectChanges();
            // The thumb label text is set to the slider's value. These should always be the same.
            expect(thumbLabelTextElement.textContent).toBe("" + sliderInstance.value);
        });
    });
    describe('slider with custom thumb label formatting', function () {
        var fixture;
        var sliderInstance;
        var thumbLabelTextElement;
        beforeEach(function () {
            fixture = createComponent(SliderWithCustomThumbLabelFormatting);
            fixture.detectChanges();
            var sliderDebugElement = fixture.debugElement.query(platform_browser_1.By.directive(index_1.MatSlider));
            var sliderNativeElement = sliderDebugElement.nativeElement;
            sliderInstance = sliderDebugElement.componentInstance;
            thumbLabelTextElement = (sliderNativeElement.querySelector('.mat-slider-thumb-label-text'));
        });
        it('should invoke the passed-in `displayWith` function with the value', function () {
            spyOn(fixture.componentInstance, 'displayWith').and.callThrough();
            sliderInstance.value = 1337;
            fixture.detectChanges();
            expect(fixture.componentInstance.displayWith).toHaveBeenCalledWith(1337);
        });
        it('should format the thumb label based on the passed-in `displayWith` function', function () {
            sliderInstance.value = 200000;
            fixture.detectChanges();
            expect(thumbLabelTextElement.textContent).toBe('200k');
        });
    });
    describe('slider with value property binding', function () {
        var fixture;
        var sliderDebugElement;
        var sliderNativeElement;
        var sliderInstance;
        var testComponent;
        var trackFillElement;
        beforeEach(function () {
            fixture = createComponent(SliderWithOneWayBinding);
            fixture.detectChanges();
            testComponent = fixture.debugElement.componentInstance;
            sliderDebugElement = fixture.debugElement.query(platform_browser_1.By.directive(index_1.MatSlider));
            sliderNativeElement = sliderDebugElement.nativeElement;
            sliderInstance = sliderDebugElement.injector.get(index_1.MatSlider);
            trackFillElement = sliderNativeElement.querySelector('.mat-slider-track-fill');
        });
        it('should initialize based on bound value', function () {
            expect(sliderInstance.value).toBe(50);
            expect(trackFillElement.style.transform).toContain('scale3d(0.5, 1, 1)');
        });
        it('should update when bound value changes', function () {
            testComponent.val = 75;
            fixture.detectChanges();
            expect(sliderInstance.value).toBe(75);
            expect(trackFillElement.style.transform).toContain('scale3d(0.75, 1, 1)');
        });
    });
    describe('slider with set min and max and a value smaller than min', function () {
        var fixture;
        var sliderDebugElement;
        var sliderNativeElement;
        var sliderInstance;
        var trackFillElement;
        beforeEach(function () {
            fixture = createComponent(SliderWithValueSmallerThanMin);
            fixture.detectChanges();
            sliderDebugElement = fixture.debugElement.query(platform_browser_1.By.directive(index_1.MatSlider));
            sliderNativeElement = sliderDebugElement.nativeElement;
            sliderInstance = sliderDebugElement.componentInstance;
            trackFillElement = sliderNativeElement.querySelector('.mat-slider-track-fill');
        });
        it('should set the value smaller than the min value', function () {
            expect(sliderInstance.value).toBe(3);
            expect(sliderInstance.min).toBe(4);
            expect(sliderInstance.max).toBe(6);
        });
        it('should set the fill to the min value', function () {
            expect(trackFillElement.style.transform).toContain('scale3d(0, 1, 1)');
        });
    });
    describe('slider with set min and max and a value greater than max', function () {
        var fixture;
        var sliderDebugElement;
        var sliderNativeElement;
        var sliderInstance;
        var trackFillElement;
        beforeEach(function () {
            fixture = createComponent(SliderWithValueGreaterThanMax);
            fixture.detectChanges();
            sliderDebugElement = fixture.debugElement.query(platform_browser_1.By.directive(index_1.MatSlider));
            sliderNativeElement = sliderDebugElement.nativeElement;
            sliderInstance = sliderDebugElement.componentInstance;
            trackFillElement = sliderNativeElement.querySelector('.mat-slider-track-fill');
        });
        it('should set the value greater than the max value', function () {
            expect(sliderInstance.value).toBe(7);
            expect(sliderInstance.min).toBe(4);
            expect(sliderInstance.max).toBe(6);
        });
        it('should set the fill to the max value', function () {
            expect(trackFillElement.style.transform).toContain('scale3d(1, 1, 1)');
        });
    });
    describe('slider with change handler', function () {
        var fixture;
        var sliderDebugElement;
        var sliderNativeElement;
        var testComponent;
        beforeEach(function () {
            fixture = createComponent(SliderWithChangeHandler);
            fixture.detectChanges();
            testComponent = fixture.debugElement.componentInstance;
            spyOn(testComponent, 'onChange');
            spyOn(testComponent, 'onInput');
            sliderDebugElement = fixture.debugElement.query(platform_browser_1.By.directive(index_1.MatSlider));
            sliderNativeElement = sliderDebugElement.nativeElement;
        });
        it('should emit change on click', function () {
            expect(testComponent.onChange).not.toHaveBeenCalled();
            dispatchClickEventSequence(sliderNativeElement, 0.2);
            fixture.detectChanges();
            expect(testComponent.onChange).toHaveBeenCalledTimes(1);
        });
        it('should emit change on slide', function () {
            expect(testComponent.onChange).not.toHaveBeenCalled();
            dispatchSlideEventSequence(sliderNativeElement, 0, 0.4, gestureConfig);
            fixture.detectChanges();
            expect(testComponent.onChange).toHaveBeenCalledTimes(1);
        });
        it('should not emit multiple changes for same value', function () {
            expect(testComponent.onChange).not.toHaveBeenCalled();
            dispatchClickEventSequence(sliderNativeElement, 0.6);
            dispatchSlideEventSequence(sliderNativeElement, 0.6, 0.6, gestureConfig);
            fixture.detectChanges();
            expect(testComponent.onChange).toHaveBeenCalledTimes(1);
        });
        it('should dispatch events when changing back to previously emitted value after ' +
            'programmatically setting value', function () {
            expect(testComponent.onChange).not.toHaveBeenCalled();
            expect(testComponent.onInput).not.toHaveBeenCalled();
            dispatchClickEventSequence(sliderNativeElement, 0.2);
            fixture.detectChanges();
            expect(testComponent.onChange).toHaveBeenCalledTimes(1);
            expect(testComponent.onInput).toHaveBeenCalledTimes(1);
            testComponent.slider.value = 0;
            fixture.detectChanges();
            expect(testComponent.onChange).toHaveBeenCalledTimes(1);
            expect(testComponent.onInput).toHaveBeenCalledTimes(1);
            dispatchClickEventSequence(sliderNativeElement, 0.2);
            fixture.detectChanges();
            expect(testComponent.onChange).toHaveBeenCalledTimes(2);
            expect(testComponent.onInput).toHaveBeenCalledTimes(2);
        });
    });
    describe('slider with input event', function () {
        var fixture;
        var sliderDebugElement;
        var sliderNativeElement;
        var testComponent;
        beforeEach(function () {
            fixture = createComponent(SliderWithChangeHandler);
            fixture.detectChanges();
            testComponent = fixture.debugElement.componentInstance;
            spyOn(testComponent, 'onInput');
            spyOn(testComponent, 'onChange');
            sliderDebugElement = fixture.debugElement.query(platform_browser_1.By.directive(index_1.MatSlider));
            sliderNativeElement = sliderDebugElement.nativeElement;
        });
        it('should emit an input event while sliding', function () {
            expect(testComponent.onChange).not.toHaveBeenCalled();
            dispatchMouseenterEvent(sliderNativeElement);
            dispatchSlideEvent(sliderNativeElement, 0.5, gestureConfig);
            dispatchSlideEvent(sliderNativeElement, 1, gestureConfig);
            dispatchSlideEndEvent(sliderNativeElement, 1, gestureConfig);
            fixture.detectChanges();
            // The input event should fire twice, because the slider changed two times.
            expect(testComponent.onInput).toHaveBeenCalledTimes(2);
            expect(testComponent.onChange).toHaveBeenCalledTimes(1);
        });
        it('should emit an input event when clicking', function () {
            expect(testComponent.onChange).not.toHaveBeenCalled();
            dispatchClickEventSequence(sliderNativeElement, 0.75);
            fixture.detectChanges();
            // The `onInput` event should be emitted once due to a single click.
            expect(testComponent.onInput).toHaveBeenCalledTimes(1);
            expect(testComponent.onChange).toHaveBeenCalledTimes(1);
        });
    });
    describe('keyboard support', function () {
        var fixture;
        var sliderDebugElement;
        var sliderNativeElement;
        var testComponent;
        var sliderInstance;
        beforeEach(function () {
            fixture = createComponent(SliderWithChangeHandler);
            fixture.detectChanges();
            testComponent = fixture.debugElement.componentInstance;
            spyOn(testComponent, 'onInput');
            spyOn(testComponent, 'onChange');
            sliderDebugElement = fixture.debugElement.query(platform_browser_1.By.directive(index_1.MatSlider));
            sliderNativeElement = sliderDebugElement.nativeElement;
            sliderInstance = sliderDebugElement.injector.get(index_1.MatSlider);
        });
        it('should increment slider by 1 on up arrow pressed', function () {
            expect(testComponent.onChange).not.toHaveBeenCalled();
            testing_1.dispatchKeyboardEvent(sliderNativeElement, 'keydown', keycodes_1.UP_ARROW);
            fixture.detectChanges();
            // The `onInput` event should be emitted once due to a single keyboard press.
            expect(testComponent.onInput).toHaveBeenCalledTimes(1);
            expect(testComponent.onChange).toHaveBeenCalledTimes(1);
            expect(sliderInstance.value).toBe(1);
        });
        it('should increment slider by 1 on right arrow pressed', function () {
            expect(testComponent.onChange).not.toHaveBeenCalled();
            testing_1.dispatchKeyboardEvent(sliderNativeElement, 'keydown', keycodes_1.RIGHT_ARROW);
            fixture.detectChanges();
            // The `onInput` event should be emitted once due to a single keyboard press.
            expect(testComponent.onInput).toHaveBeenCalledTimes(1);
            expect(testComponent.onChange).toHaveBeenCalledTimes(1);
            expect(sliderInstance.value).toBe(1);
        });
        it('should decrement slider by 1 on down arrow pressed', function () {
            sliderInstance.value = 100;
            expect(testComponent.onChange).not.toHaveBeenCalled();
            testing_1.dispatchKeyboardEvent(sliderNativeElement, 'keydown', keycodes_1.DOWN_ARROW);
            fixture.detectChanges();
            // The `onInput` event should be emitted once due to a single keyboard press.
            expect(testComponent.onInput).toHaveBeenCalledTimes(1);
            expect(testComponent.onChange).toHaveBeenCalledTimes(1);
            expect(sliderInstance.value).toBe(99);
        });
        it('should decrement slider by 1 on left arrow pressed', function () {
            sliderInstance.value = 100;
            expect(testComponent.onChange).not.toHaveBeenCalled();
            testing_1.dispatchKeyboardEvent(sliderNativeElement, 'keydown', keycodes_1.LEFT_ARROW);
            fixture.detectChanges();
            // The `onInput` event should be emitted once due to a single keyboard press.
            expect(testComponent.onInput).toHaveBeenCalledTimes(1);
            expect(testComponent.onChange).toHaveBeenCalledTimes(1);
            expect(sliderInstance.value).toBe(99);
        });
        it('should increment slider by 10 on page up pressed', function () {
            expect(testComponent.onChange).not.toHaveBeenCalled();
            testing_1.dispatchKeyboardEvent(sliderNativeElement, 'keydown', keycodes_1.PAGE_UP);
            fixture.detectChanges();
            // The `onInput` event should be emitted once due to a single keyboard press.
            expect(testComponent.onInput).toHaveBeenCalledTimes(1);
            expect(testComponent.onChange).toHaveBeenCalledTimes(1);
            expect(sliderInstance.value).toBe(10);
        });
        it('should decrement slider by 10 on page down pressed', function () {
            sliderInstance.value = 100;
            expect(testComponent.onChange).not.toHaveBeenCalled();
            testing_1.dispatchKeyboardEvent(sliderNativeElement, 'keydown', keycodes_1.PAGE_DOWN);
            fixture.detectChanges();
            // The `onInput` event should be emitted once due to a single keyboard press.
            expect(testComponent.onInput).toHaveBeenCalledTimes(1);
            expect(testComponent.onChange).toHaveBeenCalledTimes(1);
            expect(sliderInstance.value).toBe(90);
        });
        it('should set slider to max on end pressed', function () {
            expect(testComponent.onChange).not.toHaveBeenCalled();
            testing_1.dispatchKeyboardEvent(sliderNativeElement, 'keydown', keycodes_1.END);
            fixture.detectChanges();
            // The `onInput` event should be emitted once due to a single keyboard press.
            expect(testComponent.onInput).toHaveBeenCalledTimes(1);
            expect(testComponent.onChange).toHaveBeenCalledTimes(1);
            expect(sliderInstance.value).toBe(100);
        });
        it('should set slider to min on home pressed', function () {
            sliderInstance.value = 100;
            expect(testComponent.onChange).not.toHaveBeenCalled();
            testing_1.dispatchKeyboardEvent(sliderNativeElement, 'keydown', keycodes_1.HOME);
            fixture.detectChanges();
            // The `onInput` event should be emitted once due to a single keyboard press.
            expect(testComponent.onInput).toHaveBeenCalledTimes(1);
            expect(testComponent.onChange).toHaveBeenCalledTimes(1);
            expect(sliderInstance.value).toBe(0);
        });
        it("should take not action for presses of keys it doesn't care about", function () {
            sliderInstance.value = 50;
            expect(testComponent.onChange).not.toHaveBeenCalled();
            testing_1.dispatchKeyboardEvent(sliderNativeElement, 'keydown', keycodes_1.BACKSPACE);
            fixture.detectChanges();
            // The `onInput` event should be emitted once due to a single keyboard press.
            expect(testComponent.onInput).not.toHaveBeenCalled();
            expect(testComponent.onChange).not.toHaveBeenCalled();
            expect(sliderInstance.value).toBe(50);
        });
    });
    describe('slider with direction and invert', function () {
        var fixture;
        var sliderDebugElement;
        var sliderNativeElement;
        var sliderInstance;
        var testComponent;
        beforeEach(function () {
            fixture = createComponent(SliderWithDirAndInvert);
            fixture.detectChanges();
            testComponent = fixture.debugElement.componentInstance;
            sliderDebugElement = fixture.debugElement.query(platform_browser_1.By.directive(index_1.MatSlider));
            sliderInstance = sliderDebugElement.injector.get(index_1.MatSlider);
            sliderNativeElement = sliderDebugElement.nativeElement;
        });
        it('works in inverted mode', function () {
            testComponent.invert = true;
            fixture.detectChanges();
            dispatchClickEventSequence(sliderNativeElement, 0.3);
            fixture.detectChanges();
            expect(sliderInstance.value).toBe(70);
        });
        it('works in RTL languages', function () {
            testComponent.dir = 'rtl';
            fixture.detectChanges();
            dispatchClickEventSequence(sliderNativeElement, 0.3);
            fixture.detectChanges();
            expect(sliderInstance.value).toBe(70);
        });
        it('works in RTL languages in inverted mode', function () {
            testComponent.dir = 'rtl';
            testComponent.invert = true;
            fixture.detectChanges();
            dispatchClickEventSequence(sliderNativeElement, 0.3);
            fixture.detectChanges();
            expect(sliderInstance.value).toBe(30);
        });
        it('should re-render slider with updated style upon directionality change', function () {
            testComponent.dir = 'rtl';
            fixture.detectChanges();
            var initialTrackFillStyles = sliderInstance._trackFillStyles;
            var initialTicksContainerStyles = sliderInstance._ticksContainerStyles;
            var initialTicksStyles = sliderInstance._ticksStyles;
            var initialThumbContainerStyles = sliderInstance._thumbContainerStyles;
            testComponent.dir = 'ltr';
            fixture.detectChanges();
            expect(initialTrackFillStyles).not.toEqual(sliderInstance._trackFillStyles);
            expect(initialTicksContainerStyles).not.toEqual(sliderInstance._ticksContainerStyles);
            expect(initialTicksStyles).not.toEqual(sliderInstance._ticksStyles);
            expect(initialThumbContainerStyles).not.toEqual(sliderInstance._thumbContainerStyles);
        });
        it('should increment inverted slider by 1 on right arrow pressed', function () {
            testComponent.invert = true;
            fixture.detectChanges();
            testing_1.dispatchKeyboardEvent(sliderNativeElement, 'keydown', keycodes_1.RIGHT_ARROW);
            fixture.detectChanges();
            expect(sliderInstance.value).toBe(1);
        });
        it('should decrement inverted slider by 1 on left arrow pressed', function () {
            testComponent.invert = true;
            sliderInstance.value = 100;
            fixture.detectChanges();
            testing_1.dispatchKeyboardEvent(sliderNativeElement, 'keydown', keycodes_1.LEFT_ARROW);
            fixture.detectChanges();
            expect(sliderInstance.value).toBe(99);
        });
        it('should decrement RTL slider by 1 on right arrow pressed', function () {
            testComponent.dir = 'rtl';
            sliderInstance.value = 100;
            fixture.detectChanges();
            testing_1.dispatchKeyboardEvent(sliderNativeElement, 'keydown', keycodes_1.RIGHT_ARROW);
            fixture.detectChanges();
            expect(sliderInstance.value).toBe(99);
        });
        it('should increment RTL slider by 1 on left arrow pressed', function () {
            testComponent.dir = 'rtl';
            fixture.detectChanges();
            testing_1.dispatchKeyboardEvent(sliderNativeElement, 'keydown', keycodes_1.LEFT_ARROW);
            fixture.detectChanges();
            expect(sliderInstance.value).toBe(1);
        });
        it('should decrement inverted RTL slider by 1 on right arrow pressed', function () {
            testComponent.dir = 'rtl';
            testComponent.invert = true;
            sliderInstance.value = 100;
            fixture.detectChanges();
            testing_1.dispatchKeyboardEvent(sliderNativeElement, 'keydown', keycodes_1.RIGHT_ARROW);
            fixture.detectChanges();
            expect(sliderInstance.value).toBe(99);
        });
        it('should increment inverted RTL slider by 1 on left arrow pressed', function () {
            testComponent.dir = 'rtl';
            testComponent.invert = true;
            fixture.detectChanges();
            testing_1.dispatchKeyboardEvent(sliderNativeElement, 'keydown', keycodes_1.LEFT_ARROW);
            fixture.detectChanges();
            expect(sliderInstance.value).toBe(1);
        });
        it('should hide last tick when inverted and at min value', function () {
            testComponent.invert = true;
            fixture.detectChanges();
            expect(sliderNativeElement.classList.contains('mat-slider-hide-last-tick'))
                .toBe(true, 'last tick should be hidden');
        });
    });
    describe('vertical slider', function () {
        var fixture;
        var sliderDebugElement;
        var sliderNativeElement;
        var trackFillElement;
        var sliderInstance;
        var testComponent;
        beforeEach(function () {
            fixture = createComponent(VerticalSlider);
            fixture.detectChanges();
            testComponent = fixture.debugElement.componentInstance;
            sliderDebugElement = fixture.debugElement.query(platform_browser_1.By.directive(index_1.MatSlider));
            sliderInstance = sliderDebugElement.injector.get(index_1.MatSlider);
            sliderNativeElement = sliderDebugElement.nativeElement;
            trackFillElement = sliderNativeElement.querySelector('.mat-slider-track-fill');
        });
        it('updates value on click', function () {
            dispatchClickEventSequence(sliderNativeElement, 0.3);
            fixture.detectChanges();
            expect(sliderInstance.value).toBe(70);
        });
        it('updates value on click in inverted mode', function () {
            testComponent.invert = true;
            fixture.detectChanges();
            dispatchClickEventSequence(sliderNativeElement, 0.3);
            fixture.detectChanges();
            expect(sliderInstance.value).toBe(30);
        });
        it('should update the track fill on click', function () {
            expect(trackFillElement.style.transform).toContain('scale3d(1, 0, 1)');
            dispatchClickEventSequence(sliderNativeElement, 0.39);
            fixture.detectChanges();
            expect(trackFillElement.style.transform).toContain('scale3d(1, 0.61, 1)');
        });
        it('should update the track fill on click in inverted mode', function () {
            testComponent.invert = true;
            fixture.detectChanges();
            expect(trackFillElement.style.transform).toContain('scale3d(1, 0, 1)');
            dispatchClickEventSequence(sliderNativeElement, 0.39);
            fixture.detectChanges();
            expect(trackFillElement.style.transform).toContain('scale3d(1, 0.39, 1)');
        });
        it('should have aria-orientation vertical', function () {
            expect(sliderNativeElement.getAttribute('aria-orientation')).toEqual('vertical');
        });
    });
    describe('tabindex', function () {
        it('should allow setting the tabIndex through binding', function () {
            var fixture = createComponent(SliderWithTabIndexBinding);
            fixture.detectChanges();
            var slider = fixture.debugElement.query(platform_browser_1.By.directive(index_1.MatSlider)).componentInstance;
            expect(slider.tabIndex).toBe(0, 'Expected the tabIndex to be set to 0 by default.');
            fixture.componentInstance.tabIndex = 3;
            fixture.detectChanges();
            expect(slider.tabIndex).toBe(3, 'Expected the tabIndex to have been changed.');
        });
        it('should detect the native tabindex attribute', function () {
            var fixture = createComponent(SliderWithNativeTabindexAttr);
            fixture.detectChanges();
            var slider = fixture.debugElement.query(platform_browser_1.By.directive(index_1.MatSlider)).componentInstance;
            expect(slider.tabIndex)
                .toBe(5, 'Expected the tabIndex to be set to the value of the native attribute.');
        });
    });
    describe('slider with ngModel', function () {
        var fixture;
        var sliderDebugElement;
        var sliderNativeElement;
        var testComponent;
        beforeEach(function () {
            fixture = createComponent(SliderWithNgModel);
            fixture.detectChanges();
            testComponent = fixture.debugElement.componentInstance;
            sliderDebugElement = fixture.debugElement.query(platform_browser_1.By.directive(index_1.MatSlider));
            sliderNativeElement = sliderDebugElement.nativeElement;
        });
        it('should update the model on click', function () {
            expect(testComponent.val).toBe(0);
            dispatchClickEventSequence(sliderNativeElement, 0.76);
            fixture.detectChanges();
            expect(testComponent.val).toBe(76);
        });
        it('should update the model on slide', function () {
            expect(testComponent.val).toBe(0);
            dispatchSlideEventSequence(sliderNativeElement, 0, 0.19, gestureConfig);
            fixture.detectChanges();
            expect(testComponent.val).toBe(19);
        });
        it('should update the model on keydown', function () {
            expect(testComponent.val).toBe(0);
            testing_1.dispatchKeyboardEvent(sliderNativeElement, 'keydown', keycodes_1.UP_ARROW);
            fixture.detectChanges();
            expect(testComponent.val).toBe(1);
        });
        it('should be able to reset a slider by setting the model back to undefined', testing_2.fakeAsync(function () {
            expect(testComponent.slider.value).toBe(0);
            testComponent.val = 5;
            fixture.detectChanges();
            testing_2.flush();
            expect(testComponent.slider.value).toBe(5);
            testComponent.val = undefined;
            fixture.detectChanges();
            testing_2.flush();
            expect(testComponent.slider.value).toBe(0);
        }));
    });
    describe('slider as a custom form control', function () {
        var fixture;
        var sliderDebugElement;
        var sliderNativeElement;
        var sliderInstance;
        var testComponent;
        beforeEach(function () {
            fixture = createComponent(SliderWithFormControl);
            fixture.detectChanges();
            testComponent = fixture.debugElement.componentInstance;
            sliderDebugElement = fixture.debugElement.query(platform_browser_1.By.directive(index_1.MatSlider));
            sliderNativeElement = sliderDebugElement.nativeElement;
            sliderInstance = sliderDebugElement.injector.get(index_1.MatSlider);
        });
        it('should not update the control when the value is updated', function () {
            expect(testComponent.control.value).toBe(0);
            sliderInstance.value = 11;
            fixture.detectChanges();
            expect(testComponent.control.value).toBe(0);
        });
        it('should update the control on click', function () {
            expect(testComponent.control.value).toBe(0);
            dispatchClickEventSequence(sliderNativeElement, 0.76);
            fixture.detectChanges();
            expect(testComponent.control.value).toBe(76);
        });
        it('should update the control on slide', function () {
            expect(testComponent.control.value).toBe(0);
            dispatchSlideEventSequence(sliderNativeElement, 0, 0.19, gestureConfig);
            fixture.detectChanges();
            expect(testComponent.control.value).toBe(19);
        });
        it('should update the value when the control is set', function () {
            expect(sliderInstance.value).toBe(0);
            testComponent.control.setValue(7);
            fixture.detectChanges();
            expect(sliderInstance.value).toBe(7);
        });
        it('should update the disabled state when control is disabled', function () {
            expect(sliderInstance.disabled).toBe(false);
            testComponent.control.disable();
            fixture.detectChanges();
            expect(sliderInstance.disabled).toBe(true);
        });
        it('should update the disabled state when the control is enabled', function () {
            sliderInstance.disabled = true;
            testComponent.control.enable();
            fixture.detectChanges();
            expect(sliderInstance.disabled).toBe(false);
        });
        it('should have the correct control state initially and after interaction', function () {
            var sliderControl = testComponent.control;
            // The control should start off valid, pristine, and untouched.
            expect(sliderControl.valid).toBe(true);
            expect(sliderControl.pristine).toBe(true);
            expect(sliderControl.touched).toBe(false);
            // After changing the value, the control should become dirty (not pristine),
            // but remain untouched.
            dispatchClickEventSequence(sliderNativeElement, 0.5);
            fixture.detectChanges();
            expect(sliderControl.valid).toBe(true);
            expect(sliderControl.pristine).toBe(false);
            expect(sliderControl.touched).toBe(false);
            // If the control has been visited due to interaction, the control should remain
            // dirty and now also be touched.
            sliderInstance._onBlur();
            fixture.detectChanges();
            expect(sliderControl.valid).toBe(true);
            expect(sliderControl.pristine).toBe(false);
            expect(sliderControl.touched).toBe(true);
        });
    });
    describe('slider with a two-way binding', function () {
        var fixture;
        var testComponent;
        var sliderNativeElement;
        beforeEach(function () {
            fixture = createComponent(SliderWithTwoWayBinding);
            fixture.detectChanges();
            testComponent = fixture.componentInstance;
            var sliderDebugElement = fixture.debugElement.query(platform_browser_1.By.directive(index_1.MatSlider));
            sliderNativeElement = sliderDebugElement.nativeElement;
        });
        it('should sync the value binding in both directions', function () {
            expect(testComponent.value).toBe(0);
            expect(testComponent.slider.value).toBe(0);
            dispatchClickEventSequence(sliderNativeElement, 0.1);
            fixture.detectChanges();
            expect(testComponent.value).toBe(10);
            expect(testComponent.slider.value).toBe(10);
            testComponent.value = 20;
            fixture.detectChanges();
            expect(testComponent.value).toBe(20);
            expect(testComponent.slider.value).toBe(20);
        });
    });
});
// Disable animations and make the slider an even 100px (+ 8px padding on either side)
// so we get nice round values in tests.
var styles = "\n  .mat-slider-horizontal { min-width: 116px !important; }\n  .mat-slider-vertical { min-height: 116px !important; }\n  .mat-slider-track-fill { transition: none !important; }\n";
var StandardSlider = /** @class */ (function () {
    function StandardSlider() {
    }
    StandardSlider.decorators = [
        { type: core_1.Component, args: [{
                    template: "<mat-slider></mat-slider>",
                    styles: [styles],
                },] },
    ];
    return StandardSlider;
}());
var DisabledSlider = /** @class */ (function () {
    function DisabledSlider() {
    }
    DisabledSlider.decorators = [
        { type: core_1.Component, args: [{
                    template: "<mat-slider disabled></mat-slider>",
                    styles: [styles],
                },] },
    ];
    return DisabledSlider;
}());
var SliderWithMinAndMax = /** @class */ (function () {
    function SliderWithMinAndMax() {
        this.min = 4;
        this.max = 6;
    }
    SliderWithMinAndMax.decorators = [
        { type: core_1.Component, args: [{
                    template: "<mat-slider [min]=\"min\" [max]=\"max\" tickInterval=\"6\"></mat-slider>",
                    styles: [styles],
                },] },
    ];
    return SliderWithMinAndMax;
}());
var SliderWithValue = /** @class */ (function () {
    function SliderWithValue() {
    }
    SliderWithValue.decorators = [
        { type: core_1.Component, args: [{
                    template: "<mat-slider value=\"26\"></mat-slider>",
                    styles: [styles],
                },] },
    ];
    return SliderWithValue;
}());
var SliderWithStep = /** @class */ (function () {
    function SliderWithStep() {
        this.step = 25;
    }
    SliderWithStep.decorators = [
        { type: core_1.Component, args: [{
                    template: "<mat-slider [step]=\"step\"></mat-slider>",
                    styles: [styles],
                },] },
    ];
    return SliderWithStep;
}());
var SliderWithAutoTickInterval = /** @class */ (function () {
    function SliderWithAutoTickInterval() {
    }
    SliderWithAutoTickInterval.decorators = [
        { type: core_1.Component, args: [{
                    template: "<mat-slider step=\"5\" tickInterval=\"auto\"></mat-slider>",
                    styles: [styles],
                },] },
    ];
    return SliderWithAutoTickInterval;
}());
var SliderWithSetTickInterval = /** @class */ (function () {
    function SliderWithSetTickInterval() {
        this.tickInterval = 6;
    }
    SliderWithSetTickInterval.decorators = [
        { type: core_1.Component, args: [{
                    template: "<mat-slider step=\"3\" [tickInterval]=\"tickInterval\"></mat-slider>",
                    styles: [styles],
                },] },
    ];
    return SliderWithSetTickInterval;
}());
var SliderWithThumbLabel = /** @class */ (function () {
    function SliderWithThumbLabel() {
    }
    SliderWithThumbLabel.decorators = [
        { type: core_1.Component, args: [{
                    template: "<mat-slider thumbLabel></mat-slider>",
                    styles: [styles],
                },] },
    ];
    return SliderWithThumbLabel;
}());
var SliderWithCustomThumbLabelFormatting = /** @class */ (function () {
    function SliderWithCustomThumbLabelFormatting() {
    }
    SliderWithCustomThumbLabelFormatting.prototype.displayWith = function (value) {
        if (!value) {
            return 0;
        }
        if (value >= 1000) {
            return (value / 1000) + 'k';
        }
        return value;
    };
    SliderWithCustomThumbLabelFormatting.decorators = [
        { type: core_1.Component, args: [{
                    template: "<mat-slider min=\"1\" max=\"100000\" [displayWith]=\"displayWith\" thumbLabel></mat-slider>",
                    styles: [styles],
                },] },
    ];
    return SliderWithCustomThumbLabelFormatting;
}());
var SliderWithOneWayBinding = /** @class */ (function () {
    function SliderWithOneWayBinding() {
        this.val = 50;
    }
    SliderWithOneWayBinding.decorators = [
        { type: core_1.Component, args: [{
                    template: "<mat-slider [value]=\"val\"></mat-slider>",
                    styles: [styles],
                },] },
    ];
    return SliderWithOneWayBinding;
}());
var SliderWithFormControl = /** @class */ (function () {
    function SliderWithFormControl() {
        this.control = new forms_1.FormControl(0);
    }
    SliderWithFormControl.decorators = [
        { type: core_1.Component, args: [{
                    template: "<mat-slider [formControl]=\"control\"></mat-slider>",
                    styles: [styles],
                },] },
    ];
    return SliderWithFormControl;
}());
var SliderWithNgModel = /** @class */ (function () {
    function SliderWithNgModel() {
        this.val = 0;
    }
    SliderWithNgModel.decorators = [
        { type: core_1.Component, args: [{
                    template: "<mat-slider [(ngModel)]=\"val\"></mat-slider>",
                    styles: [styles],
                },] },
    ];
    /** @nocollapse */
    SliderWithNgModel.propDecorators = {
        "slider": [{ type: core_1.ViewChild, args: [index_1.MatSlider,] },],
    };
    return SliderWithNgModel;
}());
var SliderWithValueSmallerThanMin = /** @class */ (function () {
    function SliderWithValueSmallerThanMin() {
    }
    SliderWithValueSmallerThanMin.decorators = [
        { type: core_1.Component, args: [{
                    template: "<mat-slider value=\"3\" min=\"4\" max=\"6\"></mat-slider>",
                    styles: [styles],
                },] },
    ];
    return SliderWithValueSmallerThanMin;
}());
var SliderWithValueGreaterThanMax = /** @class */ (function () {
    function SliderWithValueGreaterThanMax() {
    }
    SliderWithValueGreaterThanMax.decorators = [
        { type: core_1.Component, args: [{
                    template: "<mat-slider value=\"7\" min=\"4\" max=\"6\"></mat-slider>",
                    styles: [styles],
                },] },
    ];
    return SliderWithValueGreaterThanMax;
}());
var SliderWithChangeHandler = /** @class */ (function () {
    function SliderWithChangeHandler() {
    }
    SliderWithChangeHandler.prototype.onChange = function () { };
    SliderWithChangeHandler.prototype.onInput = function () { };
    SliderWithChangeHandler.decorators = [
        { type: core_1.Component, args: [{
                    template: "<mat-slider (change)=\"onChange($event)\" (input)=\"onInput($event)\"></mat-slider>",
                    styles: [styles],
                },] },
    ];
    /** @nocollapse */
    SliderWithChangeHandler.propDecorators = {
        "slider": [{ type: core_1.ViewChild, args: [index_1.MatSlider,] },],
    };
    return SliderWithChangeHandler;
}());
var SliderWithDirAndInvert = /** @class */ (function () {
    function SliderWithDirAndInvert() {
        this.dir = 'ltr';
        this.invert = false;
    }
    SliderWithDirAndInvert.decorators = [
        { type: core_1.Component, args: [{
                    template: "<div [dir]=\"dir\"><mat-slider [invert]=\"invert\" tickInterval=\"5\"></mat-slider></div>",
                    styles: [styles],
                },] },
    ];
    return SliderWithDirAndInvert;
}());
var VerticalSlider = /** @class */ (function () {
    function VerticalSlider() {
        this.invert = false;
    }
    VerticalSlider.decorators = [
        { type: core_1.Component, args: [{
                    template: "<mat-slider vertical [invert]=\"invert\"></mat-slider>",
                    styles: [styles],
                },] },
    ];
    return VerticalSlider;
}());
var SliderWithTabIndexBinding = /** @class */ (function () {
    function SliderWithTabIndexBinding() {
    }
    SliderWithTabIndexBinding.decorators = [
        { type: core_1.Component, args: [{
                    template: "<mat-slider [tabIndex]=\"tabIndex\"></mat-slider>",
                    styles: [styles],
                },] },
    ];
    return SliderWithTabIndexBinding;
}());
var SliderWithNativeTabindexAttr = /** @class */ (function () {
    function SliderWithNativeTabindexAttr() {
    }
    SliderWithNativeTabindexAttr.decorators = [
        { type: core_1.Component, args: [{
                    template: "<mat-slider tabindex=\"5\"></mat-slider>",
                    styles: [styles],
                },] },
    ];
    return SliderWithNativeTabindexAttr;
}());
var SliderWithTwoWayBinding = /** @class */ (function () {
    function SliderWithTwoWayBinding() {
        this.value = 0;
    }
    SliderWithTwoWayBinding.decorators = [
        { type: core_1.Component, args: [{
                    template: '<mat-slider [(value)]="value"></mat-slider>',
                    styles: [styles],
                },] },
    ];
    /** @nocollapse */
    SliderWithTwoWayBinding.propDecorators = {
        "slider": [{ type: core_1.ViewChild, args: [index_1.MatSlider,] },],
    };
    return SliderWithTwoWayBinding;
}());
/**
 * Dispatches a click event sequence (consisting of moueseenter, click) from an element.
 * Note: The mouse event truncates the position for the click.
 * @param sliderElement The mat-slider element from which the event will be dispatched.
 * @param percentage The percentage of the slider where the click should occur. Used to find the
 * physical location of the click.
 */
function dispatchClickEventSequence(sliderElement, percentage) {
    var trackElement = (sliderElement.querySelector('.mat-slider-wrapper'));
    var dimensions = trackElement.getBoundingClientRect();
    var x = dimensions.left + (dimensions.width * percentage);
    var y = dimensions.top + (dimensions.height * percentage);
    dispatchMouseenterEvent(sliderElement);
    testing_1.dispatchMouseEvent(sliderElement, 'click', x, y);
}
/**
 * Dispatches a slide event sequence (consisting of slidestart, slide, slideend) from an element.
 * @param sliderElement The mat-slider element from which the event will be dispatched.
 * @param startPercent The percentage of the slider where the slide will begin.
 * @param endPercent The percentage of the slider where the slide will end.
 * @param gestureConfig The gesture config for the test to handle emitting the slide events.
 */
function dispatchSlideEventSequence(sliderElement, startPercent, endPercent, gestureConfig) {
    dispatchMouseenterEvent(sliderElement);
    dispatchSlideStartEvent(sliderElement, startPercent, gestureConfig);
    dispatchSlideEvent(sliderElement, startPercent, gestureConfig);
    dispatchSlideEvent(sliderElement, endPercent, gestureConfig);
    dispatchSlideEndEvent(sliderElement, endPercent, gestureConfig);
}
/**
 * Dispatches a slide event from an element.
 * @param sliderElement The mat-slider element from which the event will be dispatched.
 * @param percent The percentage of the slider where the slide will happen.
 * @param gestureConfig The gesture config for the test to handle emitting the slide events.
 */
function dispatchSlideEvent(sliderElement, percent, gestureConfig) {
    var trackElement = (sliderElement.querySelector('.mat-slider-wrapper'));
    var dimensions = trackElement.getBoundingClientRect();
    var x = dimensions.left + (dimensions.width * percent);
    var y = dimensions.top + (dimensions.height * percent);
    gestureConfig.emitEventForElement('slide', sliderElement, {
        center: { x: x, y: y },
        srcEvent: { preventDefault: jasmine.createSpy('preventDefault') }
    });
}
/**
 * Dispatches a slidestart event from an element.
 * @param sliderElement The mat-slider element from which the event will be dispatched.
 * @param percent The percentage of the slider where the slide will begin.
 * @param gestureConfig The gesture config for the test to handle emitting the slide events.
 */
function dispatchSlideStartEvent(sliderElement, percent, gestureConfig) {
    var trackElement = (sliderElement.querySelector('.mat-slider-wrapper'));
    var dimensions = trackElement.getBoundingClientRect();
    var x = dimensions.left + (dimensions.width * percent);
    var y = dimensions.top + (dimensions.height * percent);
    dispatchMouseenterEvent(sliderElement);
    gestureConfig.emitEventForElement('slidestart', sliderElement, {
        center: { x: x, y: y },
        srcEvent: { preventDefault: jasmine.createSpy('preventDefault') }
    });
}
/**
 * Dispatches a slideend event from an element.
 * @param sliderElement The mat-slider element from which the event will be dispatched.
 * @param percent The percentage of the slider where the slide will end.
 * @param gestureConfig The gesture config for the test to handle emitting the slide events.
 */
function dispatchSlideEndEvent(sliderElement, percent, gestureConfig) {
    var trackElement = (sliderElement.querySelector('.mat-slider-wrapper'));
    var dimensions = trackElement.getBoundingClientRect();
    var x = dimensions.left + (dimensions.width * percent);
    var y = dimensions.top + (dimensions.height * percent);
    gestureConfig.emitEventForElement('slideend', sliderElement, {
        center: { x: x, y: y },
        srcEvent: { preventDefault: jasmine.createSpy('preventDefault') }
    });
}
/**
 * Dispatches a mouseenter event from an element.
 * Note: The mouse event truncates the position for the click.
 * @param element The element from which the event will be dispatched.
 */
function dispatchMouseenterEvent(element) {
    var dimensions = element.getBoundingClientRect();
    var y = dimensions.top;
    var x = dimensions.left;
    testing_1.dispatchMouseEvent(element, 'mouseenter', x, y);
}
//# sourceMappingURL=slider.spec.js.map