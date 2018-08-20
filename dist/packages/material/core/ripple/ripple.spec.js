"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var core_1 = require("@angular/core");
var platform_1 = require("@angular/cdk/platform");
var testing_2 = require("@angular/cdk/testing");
var ripple_renderer_1 = require("./ripple-renderer");
var index_1 = require("./index");
var animations_1 = require("@angular/platform-browser/animations");
/** Shorthands for the enter and exit duration of ripples. */
var enterDuration = ripple_renderer_1.defaultRippleAnimationConfig.enterDuration, exitDuration = ripple_renderer_1.defaultRippleAnimationConfig.exitDuration;
describe('MatRipple', function () {
    var fixture;
    var rippleTarget;
    var originalBodyMargin;
    var platform;
    /** Extracts the numeric value of a pixel size string like '123px'. */
    var pxStringToFloat = function (s) { return parseFloat(s) || 0; };
    var startingWindowWidth = window.innerWidth;
    var startingWindowHeight = window.innerHeight;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [index_1.MatRippleModule],
            declarations: [
                BasicRippleContainer,
                RippleContainerWithInputBindings,
                RippleContainerWithoutBindings,
                RippleContainerWithNgIf,
            ],
        });
    });
    beforeEach(testing_1.inject([platform_1.Platform], function (p) {
        platform = p;
        // Set body margin to 0 during tests so it doesn't mess up position calculations.
        originalBodyMargin = document.body.style.margin;
        document.body.style.margin = '0';
    }));
    afterEach(function () {
        document.body.style.margin = originalBodyMargin;
    });
    describe('basic ripple', function () {
        var rippleDirective;
        var TARGET_HEIGHT = 200;
        var TARGET_WIDTH = 300;
        beforeEach(function () {
            fixture = testing_1.TestBed.createComponent(BasicRippleContainer);
            fixture.detectChanges();
            rippleTarget = fixture.nativeElement.querySelector('[mat-ripple]');
            rippleDirective = fixture.componentInstance.ripple;
        });
        it('sizes ripple to cover element', function () {
            // This test is consistently flaky on iOS (vs. Safari on desktop and all other browsers).
            // Temporarily skip this test on iOS until we can determine the source of the flakiness.
            // TODO(jelbourn): determine the source of flakiness here
            if (platform.IOS) {
                return;
            }
            var elementRect = rippleTarget.getBoundingClientRect();
            // Dispatch a ripple at the following relative coordinates (X: 50| Y: 75)
            // Dispatch a ripple at the following relative coordinates (X: 50| Y: 75)
            testing_2.dispatchMouseEvent(rippleTarget, 'mousedown', 50, 75);
            testing_2.dispatchMouseEvent(rippleTarget, 'mouseup');
            // Calculate distance from the click to farthest edge of the ripple target.
            var maxDistanceX = TARGET_WIDTH - 50;
            var maxDistanceY = TARGET_HEIGHT - 75;
            // At this point the foreground ripple should be created with a div centered at the click
            // location, and large enough to reach the furthest corner, which is 250px to the right
            // and 125px down relative to the click position.
            var expectedRadius = Math.sqrt(maxDistanceX * maxDistanceX + maxDistanceY * maxDistanceY);
            var expectedLeft = elementRect.left + 50 - expectedRadius;
            var expectedTop = elementRect.top + 75 - expectedRadius;
            var ripple = rippleTarget.querySelector('.mat-ripple-element');
            // Note: getBoundingClientRect won't work because there's a transform applied to make the
            // ripple start out tiny.
            expect(pxStringToFloat(ripple.style.left)).toBeCloseTo(expectedLeft, 1);
            expect(pxStringToFloat(ripple.style.top)).toBeCloseTo(expectedTop, 1);
            expect(pxStringToFloat(ripple.style.width)).toBeCloseTo(2 * expectedRadius, 1);
            expect(pxStringToFloat(ripple.style.height)).toBeCloseTo(2 * expectedRadius, 1);
        });
        it('creates ripple on mousedown', function () {
            testing_2.dispatchMouseEvent(rippleTarget, 'mousedown');
            testing_2.dispatchMouseEvent(rippleTarget, 'mouseup');
            expect(rippleTarget.querySelectorAll('.mat-ripple-element').length).toBe(1);
            testing_2.dispatchMouseEvent(rippleTarget, 'mousedown');
            testing_2.dispatchMouseEvent(rippleTarget, 'mouseup');
            expect(rippleTarget.querySelectorAll('.mat-ripple-element').length).toBe(2);
        });
        it('should launch ripples on touchstart', testing_1.fakeAsync(function () {
            testing_2.dispatchTouchEvent(rippleTarget, 'touchstart');
            expect(rippleTarget.querySelectorAll('.mat-ripple-element').length).toBe(1);
            testing_1.tick(enterDuration);
            expect(rippleTarget.querySelectorAll('.mat-ripple-element').length).toBe(1);
            testing_2.dispatchTouchEvent(rippleTarget, 'touchend');
            testing_1.tick(exitDuration);
            expect(rippleTarget.querySelectorAll('.mat-ripple-element').length).toBe(0);
        }));
        it('should ignore synthetic mouse events after touchstart', function () {
            return testing_1.fakeAsync(function () {
                testing_2.dispatchTouchEvent(rippleTarget, 'touchstart');
                testing_2.dispatchTouchEvent(rippleTarget, 'mousedown');
                testing_1.tick(enterDuration);
                expect(rippleTarget.querySelectorAll('.mat-ripple-element').length).toBe(1);
                testing_2.dispatchTouchEvent(rippleTarget, 'touchend');
                testing_1.tick(exitDuration);
                expect(rippleTarget.querySelectorAll('.mat-ripple-element').length).toBe(0);
            });
        });
        it('removes ripple after timeout', testing_1.fakeAsync(function () {
            testing_2.dispatchMouseEvent(rippleTarget, 'mousedown');
            testing_2.dispatchMouseEvent(rippleTarget, 'mouseup');
            expect(rippleTarget.querySelectorAll('.mat-ripple-element').length).toBe(1);
            // Calculates the duration for fading-in and fading-out the ripple.
            // Calculates the duration for fading-in and fading-out the ripple.
            testing_1.tick(enterDuration + exitDuration);
            expect(rippleTarget.querySelectorAll('.mat-ripple-element').length).toBe(0);
        }));
        it('should remove ripples after mouseup', testing_1.fakeAsync(function () {
            testing_2.dispatchMouseEvent(rippleTarget, 'mousedown');
            expect(rippleTarget.querySelectorAll('.mat-ripple-element').length).toBe(1);
            // Fakes the duration of fading-in and fading-out normal ripples.
            // The fade-out duration has been added to ensure that didn't start fading out.
            // Fakes the duration of fading-in and fading-out normal ripples.
            // The fade-out duration has been added to ensure that didn't start fading out.
            testing_1.tick(enterDuration + exitDuration);
            expect(rippleTarget.querySelectorAll('.mat-ripple-element').length).toBe(1);
            testing_2.dispatchMouseEvent(rippleTarget, 'mouseup');
            testing_1.tick(exitDuration);
            expect(rippleTarget.querySelectorAll('.mat-ripple-element').length).toBe(0);
        }));
        it('should not hide ripples while animating.', testing_1.fakeAsync(function () {
            // Calculates the duration for fading-in and fading-out the ripple.
            var hideDuration = enterDuration + exitDuration;
            testing_2.dispatchMouseEvent(rippleTarget, 'mousedown');
            testing_2.dispatchMouseEvent(rippleTarget, 'mouseup');
            expect(rippleTarget.querySelectorAll('.mat-ripple-element').length).toBe(1);
            testing_1.tick(hideDuration - 10);
            expect(rippleTarget.querySelectorAll('.mat-ripple-element').length).toBe(1);
            testing_1.tick(10);
            expect(rippleTarget.querySelectorAll('.mat-ripple-element').length).toBe(0);
        }));
        it('creates ripples when manually triggered', function () {
            expect(rippleTarget.querySelectorAll('.mat-ripple-element').length).toBe(0);
            rippleDirective.launch(0, 0);
            expect(rippleTarget.querySelectorAll('.mat-ripple-element').length).toBe(1);
        });
        it('creates manual ripples with the default ripple config', function () {
            expect(rippleTarget.querySelectorAll('.mat-ripple-element').length).toBe(0);
            // Calculate the diagonal distance and divide it by two for the center radius.
            var radius = Math.sqrt(TARGET_HEIGHT * TARGET_HEIGHT + TARGET_WIDTH * TARGET_WIDTH) / 2;
            rippleDirective.centered = true;
            rippleDirective.launch(0, 0);
            var rippleElement = rippleTarget.querySelector('.mat-ripple-element');
            expect(rippleElement).toBeTruthy();
            expect(parseFloat(rippleElement.style.left))
                .toBeCloseTo(TARGET_WIDTH / 2 - radius, 1);
            expect(parseFloat(rippleElement.style.top))
                .toBeCloseTo(TARGET_HEIGHT / 2 - radius, 1);
        });
        it('cleans up the event handlers when the container gets destroyed', function () {
            fixture = testing_1.TestBed.createComponent(RippleContainerWithNgIf);
            fixture.detectChanges();
            rippleTarget = fixture.debugElement.nativeElement.querySelector('[mat-ripple]');
            fixture.componentInstance.isDestroyed = true;
            fixture.detectChanges();
            testing_2.dispatchMouseEvent(rippleTarget, 'mousedown');
            testing_2.dispatchMouseEvent(rippleTarget, 'mouseup');
            expect(rippleTarget.querySelectorAll('.mat-ripple-element').length).toBe(0);
        });
        it('does not run events inside the NgZone', function () {
            var spy = jasmine.createSpy('zone unstable callback');
            var subscription = fixture.ngZone.onUnstable.subscribe(spy);
            testing_2.dispatchMouseEvent(rippleTarget, 'mousedown');
            testing_2.dispatchMouseEvent(rippleTarget, 'mouseup');
            expect(spy).not.toHaveBeenCalled();
            subscription.unsubscribe();
        });
        it('should only persist the latest ripple on pointer down', testing_1.fakeAsync(function () {
            testing_2.dispatchMouseEvent(rippleTarget, 'mousedown');
            expect(rippleTarget.querySelectorAll('.mat-ripple-element').length).toBe(1);
            testing_2.dispatchMouseEvent(rippleTarget, 'mousedown');
            expect(rippleTarget.querySelectorAll('.mat-ripple-element').length).toBe(2);
            testing_1.tick(enterDuration + exitDuration);
            expect(rippleTarget.querySelectorAll('.mat-ripple-element').length).toBe(1);
        }));
        describe('when page is scrolled', function () {
            var veryLargeElement = document.createElement('div');
            var pageScrollTop = 500;
            var pageScrollLeft = 500;
            beforeEach(function () {
                // Add a very large element to make the page scroll
                veryLargeElement.style.width = '4000px';
                veryLargeElement.style.height = '4000px';
                document.body.appendChild(veryLargeElement);
                document.body.scrollTop = pageScrollTop;
                document.body.scrollLeft = pageScrollLeft;
                // Firefox
                document.documentElement.scrollLeft = pageScrollLeft;
                document.documentElement.scrollTop = pageScrollTop;
                // Mobile safari
                window.scrollTo(pageScrollLeft, pageScrollTop);
            });
            afterEach(function () {
                document.body.removeChild(veryLargeElement);
                document.body.scrollTop = 0;
                document.body.scrollLeft = 0;
                // Firefox
                document.documentElement.scrollLeft = 0;
                document.documentElement.scrollTop = 0;
                // Mobile safari
                window.scrollTo(0, 0);
            });
            it('create ripple with correct position', function () {
                var elementTop = 600;
                var elementLeft = 750;
                var left = 50;
                var top = 75;
                rippleTarget.style.left = elementLeft + "px";
                rippleTarget.style.top = elementTop + "px";
                // Simulate a keyboard-triggered click by setting event coordinates to 0.
                // Simulate a keyboard-triggered click by setting event coordinates to 0.
                testing_2.dispatchMouseEvent(rippleTarget, 'mousedown', left + elementLeft - pageScrollLeft, top + elementTop - pageScrollTop);
                var expectedRadius = Math.sqrt(250 * 250 + 125 * 125);
                var expectedLeft = left - expectedRadius;
                var expectedTop = top - expectedRadius;
                var ripple = rippleTarget.querySelector('.mat-ripple-element');
                // In the iOS simulator (BrowserStack & SauceLabs), adding the content to the
                // body causes karma's iframe for the test to stretch to fit that content once we attempt to
                // scroll the page. Setting width / height / maxWidth / maxHeight on the iframe does not
                // successfully constrain its size. As such, skip assertions in environments where the
                // window size has changed since the start of the test.
                if (window.innerWidth > startingWindowWidth || window.innerHeight > startingWindowHeight) {
                    return;
                }
                expect(pxStringToFloat(ripple.style.left)).toBeCloseTo(expectedLeft, 1);
                expect(pxStringToFloat(ripple.style.top)).toBeCloseTo(expectedTop, 1);
                expect(pxStringToFloat(ripple.style.width)).toBeCloseTo(2 * expectedRadius, 1);
                expect(pxStringToFloat(ripple.style.height)).toBeCloseTo(2 * expectedRadius, 1);
            });
        });
    });
    describe('manual ripples', function () {
        var rippleDirective;
        beforeEach(function () {
            fixture = testing_1.TestBed.createComponent(BasicRippleContainer);
            fixture.detectChanges();
            rippleTarget = fixture.nativeElement.querySelector('[mat-ripple]');
            rippleDirective = fixture.componentInstance.ripple;
        });
        it('should allow persistent ripple elements', testing_1.fakeAsync(function () {
            expect(rippleTarget.querySelectorAll('.mat-ripple-element').length).toBe(0);
            var rippleRef = rippleDirective.launch(0, 0, { persistent: true });
            expect(rippleTarget.querySelectorAll('.mat-ripple-element').length).toBe(1);
            // Calculates the duration for fading-in and fading-out the ripple. Also adds some
            // extra time to demonstrate that the ripples are persistent.
            // Calculates the duration for fading-in and fading-out the ripple. Also adds some
            // extra time to demonstrate that the ripples are persistent.
            testing_1.tick(enterDuration + exitDuration + 5000);
            expect(rippleTarget.querySelectorAll('.mat-ripple-element').length).toBe(1);
            rippleRef.fadeOut();
            testing_1.tick(exitDuration);
            expect(rippleTarget.querySelectorAll('.mat-ripple-element').length).toBe(0);
        }));
        it('should remove ripples that are not done fading-in', testing_1.fakeAsync(function () {
            expect(rippleTarget.querySelectorAll('.mat-ripple-element').length).toBe(0);
            rippleDirective.launch(0, 0);
            expect(rippleTarget.querySelectorAll('.mat-ripple-element').length).toBe(1);
            testing_1.tick(enterDuration / 2);
            rippleDirective.fadeOutAll();
            testing_1.tick(exitDuration);
            expect(rippleTarget.querySelectorAll('.mat-ripple-element').length)
                .toBe(0, 'Expected no ripples to be active after calling fadeOutAll.');
        }));
        it('should properly set ripple states', testing_1.fakeAsync(function () {
            expect(rippleTarget.querySelectorAll('.mat-ripple-element').length).toBe(0);
            var rippleRef = rippleDirective.launch(0, 0, { persistent: true });
            expect(rippleRef.state).toBe(index_1.RippleState.FADING_IN);
            expect(rippleTarget.querySelectorAll('.mat-ripple-element').length).toBe(1);
            testing_1.tick(enterDuration);
            expect(rippleRef.state).toBe(index_1.RippleState.VISIBLE);
            expect(rippleTarget.querySelectorAll('.mat-ripple-element').length).toBe(1);
            rippleRef.fadeOut();
            expect(rippleRef.state).toBe(index_1.RippleState.FADING_OUT);
            expect(rippleTarget.querySelectorAll('.mat-ripple-element').length).toBe(1);
            testing_1.tick(exitDuration);
            expect(rippleRef.state).toBe(index_1.RippleState.HIDDEN);
            expect(rippleTarget.querySelectorAll('.mat-ripple-element').length).toBe(0);
        }));
        it('should allow setting a specific animation config for a ripple', testing_1.fakeAsync(function () {
            expect(rippleTarget.querySelectorAll('.mat-ripple-element').length).toBe(0);
            rippleDirective.launch(0, 0, {
                animation: { enterDuration: 120, exitDuration: 0 }
            });
            expect(rippleTarget.querySelectorAll('.mat-ripple-element').length).toBe(1);
            testing_1.tick(120);
            expect(rippleTarget.querySelectorAll('.mat-ripple-element').length).toBe(0);
        }));
        it('should allow passing only a configuration', testing_1.fakeAsync(function () {
            expect(rippleTarget.querySelectorAll('.mat-ripple-element').length).toBe(0);
            var rippleRef = rippleDirective.launch({ persistent: true });
            expect(rippleTarget.querySelectorAll('.mat-ripple-element').length).toBe(1);
            testing_1.tick(enterDuration + exitDuration);
            expect(rippleTarget.querySelectorAll('.mat-ripple-element').length).toBe(1);
            rippleRef.fadeOut();
            testing_1.tick(exitDuration);
            expect(rippleTarget.querySelectorAll('.mat-ripple-element').length).toBe(0);
        }));
    });
    describe('global ripple options', function () {
        var rippleDirective;
        function createTestComponent(rippleConfig, testComponent) {
            if (testComponent === void 0) { testComponent = BasicRippleContainer; }
            // Reset the previously configured testing module to be able set new providers.
            // The testing module has been initialized in the root describe group for the ripples.
            // Reset the previously configured testing module to be able set new providers.
            // The testing module has been initialized in the root describe group for the ripples.
            testing_1.TestBed.resetTestingModule();
            testing_1.TestBed.configureTestingModule({
                imports: [index_1.MatRippleModule],
                declarations: [testComponent],
                providers: [{ provide: index_1.MAT_RIPPLE_GLOBAL_OPTIONS, useValue: rippleConfig }]
            });
            fixture = testing_1.TestBed.createComponent(testComponent);
            fixture.detectChanges();
            rippleTarget = fixture.nativeElement.querySelector('[mat-ripple]');
            rippleDirective = fixture.componentInstance.ripple;
        }
        it('should work without having any binding set', function () {
            createTestComponent({ disabled: true }, RippleContainerWithoutBindings);
            testing_2.dispatchMouseEvent(rippleTarget, 'mousedown');
            testing_2.dispatchMouseEvent(rippleTarget, 'mouseup');
            expect(rippleTarget.querySelectorAll('.mat-ripple-element').length).toBe(0);
            testing_2.dispatchMouseEvent(rippleTarget, 'mousedown');
            testing_2.dispatchMouseEvent(rippleTarget, 'mouseup');
            expect(rippleTarget.querySelectorAll('.mat-ripple-element').length).toBe(0);
        });
        it('when disabled should not show any ripples on mousedown', function () {
            createTestComponent({ disabled: true });
            testing_2.dispatchMouseEvent(rippleTarget, 'mousedown');
            testing_2.dispatchMouseEvent(rippleTarget, 'mouseup');
            expect(rippleTarget.querySelectorAll('.mat-ripple-element').length).toBe(0);
            testing_2.dispatchMouseEvent(rippleTarget, 'mousedown');
            testing_2.dispatchMouseEvent(rippleTarget, 'mouseup');
            expect(rippleTarget.querySelectorAll('.mat-ripple-element').length).toBe(0);
        });
        it('when disabled should still allow manual ripples', function () {
            createTestComponent({ disabled: true });
            expect(rippleTarget.querySelectorAll('.mat-ripple-element').length).toBe(0);
            rippleDirective.launch(0, 0);
            expect(rippleTarget.querySelectorAll('.mat-ripple-element').length).toBe(1);
        });
        it('should support changing the baseSpeedFactor', testing_1.fakeAsync(function () {
            createTestComponent({ baseSpeedFactor: 0.5 });
            testing_2.dispatchMouseEvent(rippleTarget, 'mousedown');
            testing_2.dispatchMouseEvent(rippleTarget, 'mouseup');
            expect(rippleTarget.querySelectorAll('.mat-ripple-element').length).toBe(1);
            // Calculates the speedFactor for the duration. Those factors needs to be inverted, because
            // a lower speed factor, will make the duration longer. For example: 0.5 => 2x duration.
            var fadeInFactor = 1 / 0.5;
            // Calculates the duration for fading-in and fading-out the ripple.
            // Calculates the duration for fading-in and fading-out the ripple.
            testing_1.tick(enterDuration * fadeInFactor + exitDuration);
            expect(rippleTarget.querySelectorAll('.mat-ripple-element').length).toBe(0);
        }));
        it('should combine individual speed factor with baseSpeedFactor', testing_1.fakeAsync(function () {
            createTestComponent({ baseSpeedFactor: 0.5 });
            rippleDirective.launch(0, 0, { speedFactor: 1.5 });
            expect(rippleTarget.querySelectorAll('.mat-ripple-element').length).toBe(1);
            // Calculates the speedFactor for the duration. Those factors needs to be inverted, because
            // a lower speed factor, will make the duration longer. For example: 0.5 => 2x duration.
            var fadeInFactor = 1 / (0.5 * 1.5);
            // Calculates the duration for fading-in and fading-out the ripple.
            // Calculates the duration for fading-in and fading-out the ripple.
            testing_1.tick(enterDuration * fadeInFactor + exitDuration);
            expect(rippleTarget.querySelectorAll('.mat-ripple-element').length).toBe(0);
        }));
        it('should support changing the animation duration', testing_1.fakeAsync(function () {
            createTestComponent({
                animation: { enterDuration: 100, exitDuration: 100 }
            });
            rippleDirective.launch(0, 0);
            expect(rippleTarget.querySelectorAll('.mat-ripple-element').length).toBe(1);
            // Wait the 200ms of the enter duration and exit duration.
            // Wait the 200ms of the enter duration and exit duration.
            testing_1.tick(100 + 100);
            expect(rippleTarget.querySelectorAll('.mat-ripple-element').length).toBe(0);
        }));
        it('should allow ripples to fade out immediately on pointer up', testing_1.fakeAsync(function () {
            createTestComponent({
                terminateOnPointerUp: true
            });
            testing_2.dispatchMouseEvent(rippleTarget, 'mousedown');
            testing_2.dispatchMouseEvent(rippleTarget, 'mouseup');
            expect(rippleTarget.querySelectorAll('.mat-ripple-element').length).toBe(1);
            // Ignore the enter duration, because we immediately fired the mouseup after the mousedown.
            // This means that the ripple should just fade out, and there shouldn't be an enter animation.
            // Ignore the enter duration, because we immediately fired the mouseup after the mousedown.
            // This means that the ripple should just fade out, and there shouldn't be an enter animation.
            testing_1.tick(exitDuration);
            expect(rippleTarget.querySelectorAll('.mat-ripple-element').length).toBe(0);
            // Since the enter duration is bigger than the exit duration, the enter duration timer
            // will still exist. To properly finish all timers, we just wait the remaining time.
            // Since the enter duration is bigger than the exit duration, the enter duration timer
            // will still exist. To properly finish all timers, we just wait the remaining time.
            testing_1.tick(enterDuration - exitDuration);
        }));
    });
    describe('with disabled animations', function () {
        var rippleDirective;
        beforeEach(function () {
            testing_1.TestBed.resetTestingModule();
            testing_1.TestBed.configureTestingModule({
                imports: [animations_1.NoopAnimationsModule, index_1.MatRippleModule],
                declarations: [BasicRippleContainer],
            });
            fixture = testing_1.TestBed.createComponent(BasicRippleContainer);
            fixture.detectChanges();
            rippleTarget = fixture.nativeElement.querySelector('[mat-ripple]');
            rippleDirective = fixture.componentInstance.ripple;
        });
        it('should set the animation durations to zero', function () {
            expect(rippleDirective.rippleConfig.animation.enterDuration).toBe(0);
            expect(rippleDirective.rippleConfig.animation.exitDuration).toBe(0);
        });
    });
    describe('configuring behavior', function () {
        var controller;
        beforeEach(function () {
            fixture = testing_1.TestBed.createComponent(RippleContainerWithInputBindings);
            fixture.detectChanges();
            controller = fixture.debugElement.componentInstance;
            rippleTarget = fixture.debugElement.nativeElement.querySelector('[mat-ripple]');
        });
        it('sets ripple color', function () {
            var backgroundColor = 'rgba(12, 34, 56, 0.8)';
            controller.color = backgroundColor;
            fixture.detectChanges();
            testing_2.dispatchMouseEvent(rippleTarget, 'mousedown');
            testing_2.dispatchMouseEvent(rippleTarget, 'mouseup');
            var ripple = (rippleTarget.querySelector('.mat-ripple-element'));
            expect(window.getComputedStyle(ripple).backgroundColor).toBe(backgroundColor);
        });
        it('does not respond to events when disabled input is set', function () {
            controller.disabled = true;
            fixture.detectChanges();
            testing_2.dispatchMouseEvent(rippleTarget, 'mousedown');
            testing_2.dispatchMouseEvent(rippleTarget, 'mouseup');
            expect(rippleTarget.querySelectorAll('.mat-ripple-element').length).toBe(0);
            controller.disabled = false;
            fixture.detectChanges();
            testing_2.dispatchMouseEvent(rippleTarget, 'mousedown');
            testing_2.dispatchMouseEvent(rippleTarget, 'mouseup');
            expect(rippleTarget.querySelectorAll('.mat-ripple-element').length).toBe(1);
        });
        it('allows specifying custom trigger element', function () {
            var alternateTrigger = fixture.debugElement.nativeElement
                .querySelector('.alternateTrigger');
            testing_2.dispatchMouseEvent(alternateTrigger, 'mousedown');
            testing_2.dispatchMouseEvent(alternateTrigger, 'mouseup');
            expect(rippleTarget.querySelectorAll('.mat-ripple-element').length).toBe(0);
            // Set the trigger element, and now events should create ripples.
            controller.trigger = alternateTrigger;
            fixture.detectChanges();
            testing_2.dispatchMouseEvent(alternateTrigger, 'mousedown');
            testing_2.dispatchMouseEvent(alternateTrigger, 'mouseup');
            expect(rippleTarget.querySelectorAll('.mat-ripple-element').length).toBe(1);
        });
        it('expands ripple from center if centered input is set', function () {
            controller.centered = true;
            fixture.detectChanges();
            var elementRect = rippleTarget.getBoundingClientRect();
            // Click the ripple element 50 px to the right and 75px down from its upper left.
            // Click the ripple element 50 px to the right and 75px down from its upper left.
            testing_2.dispatchMouseEvent(rippleTarget, 'mousedown', 50, 75);
            testing_2.dispatchMouseEvent(rippleTarget, 'mouseup');
            // Because the centered input is true, the center of the ripple should be the midpoint of the
            // bounding rect. The ripple should expand to cover the rect corners, which are 150px
            // horizontally and 100px vertically from the midpoint.
            var expectedRadius = Math.sqrt(150 * 150 + 100 * 100);
            var expectedLeft = elementRect.left + (elementRect.width / 2) - expectedRadius;
            var expectedTop = elementRect.top + (elementRect.height / 2) - expectedRadius;
            var ripple = rippleTarget.querySelector('.mat-ripple-element');
            expect(pxStringToFloat(ripple.style.left)).toBeCloseTo(expectedLeft, 1);
            expect(pxStringToFloat(ripple.style.top)).toBeCloseTo(expectedTop, 1);
            expect(pxStringToFloat(ripple.style.width)).toBeCloseTo(2 * expectedRadius, 1);
            expect(pxStringToFloat(ripple.style.height)).toBeCloseTo(2 * expectedRadius, 1);
        });
        it('uses custom radius if set', function () {
            var customRadius = 42;
            controller.radius = customRadius;
            fixture.detectChanges();
            var elementRect = rippleTarget.getBoundingClientRect();
            // Click the ripple element 50 px to the right and 75px down from its upper left.
            // Click the ripple element 50 px to the right and 75px down from its upper left.
            testing_2.dispatchMouseEvent(rippleTarget, 'mousedown', 50, 75);
            testing_2.dispatchMouseEvent(rippleTarget, 'mouseup');
            var expectedLeft = elementRect.left + 50 - customRadius;
            var expectedTop = elementRect.top + 75 - customRadius;
            var ripple = rippleTarget.querySelector('.mat-ripple-element');
            expect(pxStringToFloat(ripple.style.left)).toBeCloseTo(expectedLeft, 1);
            expect(pxStringToFloat(ripple.style.top)).toBeCloseTo(expectedTop, 1);
            expect(pxStringToFloat(ripple.style.width)).toBeCloseTo(2 * customRadius, 1);
            expect(pxStringToFloat(ripple.style.height)).toBeCloseTo(2 * customRadius, 1);
        });
        it('should be able to specify animation config through binding', testing_1.fakeAsync(function () {
            controller.animationConfig = { enterDuration: 150, exitDuration: 150 };
            fixture.detectChanges();
            testing_2.dispatchMouseEvent(rippleTarget, 'mousedown');
            testing_2.dispatchMouseEvent(rippleTarget, 'mouseup');
            expect(rippleTarget.querySelectorAll('.mat-ripple-element').length).toBe(1);
            testing_1.tick(150 + 150);
            expect(rippleTarget.querySelectorAll('.mat-ripple-element').length).toBe(0);
        }));
    });
});
var BasicRippleContainer = /** @class */ (function () {
    function BasicRippleContainer() {
    }
    BasicRippleContainer.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <div id=\"container\" #ripple=\"matRipple\" mat-ripple [matRippleSpeedFactor]=\"0\"\n         style=\"position: relative; width:300px; height:200px;\">\n    </div>\n  ",
                },] },
    ];
    /** @nocollapse */
    BasicRippleContainer.propDecorators = {
        "ripple": [{ type: core_1.ViewChild, args: ['ripple',] },],
    };
    return BasicRippleContainer;
}());
var RippleContainerWithInputBindings = /** @class */ (function () {
    function RippleContainerWithInputBindings() {
        this.centered = false;
        this.disabled = false;
        this.radius = 0;
        this.color = '';
    }
    RippleContainerWithInputBindings.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <div id=\"container\" style=\"position: relative; width:300px; height:200px;\"\n      mat-ripple\n      [matRippleSpeedFactor]=\"0\"\n      [matRippleTrigger]=\"trigger\"\n      [matRippleCentered]=\"centered\"\n      [matRippleRadius]=\"radius\"\n      [matRippleDisabled]=\"disabled\"\n      [matRippleAnimation]=\"animationConfig\"\n      [matRippleColor]=\"color\">\n    </div>\n    <div class=\"alternateTrigger\"></div>\n  ",
                },] },
    ];
    /** @nocollapse */
    RippleContainerWithInputBindings.propDecorators = {
        "ripple": [{ type: core_1.ViewChild, args: [index_1.MatRipple,] },],
    };
    return RippleContainerWithInputBindings;
}());
var RippleContainerWithoutBindings = /** @class */ (function () {
    function RippleContainerWithoutBindings() {
    }
    RippleContainerWithoutBindings.decorators = [
        { type: core_1.Component, args: [{
                    template: "<div id=\"container\" #ripple=\"matRipple\" mat-ripple></div>",
                },] },
    ];
    return RippleContainerWithoutBindings;
}());
var RippleContainerWithNgIf = /** @class */ (function () {
    function RippleContainerWithNgIf() {
        this.isDestroyed = false;
    }
    RippleContainerWithNgIf.decorators = [
        { type: core_1.Component, args: [{ template: "<div id=\"container\" mat-ripple [matRippleSpeedFactor]=\"0\"\n                             *ngIf=\"!isDestroyed\"></div>" },] },
    ];
    /** @nocollapse */
    RippleContainerWithNgIf.propDecorators = {
        "ripple": [{ type: core_1.ViewChild, args: [index_1.MatRipple,] },],
    };
    return RippleContainerWithNgIf;
}());
//# sourceMappingURL=ripple.spec.js.map