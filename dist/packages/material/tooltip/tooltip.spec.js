"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var animations_1 = require("@angular/platform-browser/animations");
var bidi_1 = require("@angular/cdk/bidi");
var overlay_1 = require("@angular/cdk/overlay");
var platform_1 = require("@angular/cdk/platform");
var testing_2 = require("@angular/cdk/testing");
var keycodes_1 = require("@angular/cdk/keycodes");
var a11y_1 = require("@angular/cdk/a11y");
var index_1 = require("./index");
var initialTooltipMessage = 'initial tooltip message';
describe('MatTooltip', function () {
    var overlayContainer;
    var overlayContainerElement;
    var dir;
    var platform;
    var focusMonitor;
    beforeEach(testing_1.async(function () {
        // Set the default Platform override that can be updated before component creation.
        platform = { IOS: false, isBrowser: true };
        testing_1.TestBed.configureTestingModule({
            imports: [index_1.MatTooltipModule, overlay_1.OverlayModule, animations_1.NoopAnimationsModule],
            declarations: [
                BasicTooltipDemo,
                ScrollableTooltipDemo,
                OnPushTooltipDemo,
                DynamicTooltipsDemo,
                TooltipOnTextFields,
                TooltipOnDraggableElement,
            ],
            providers: [
                { provide: platform_1.Platform, useFactory: function () { return platform; } },
                { provide: bidi_1.Directionality, useFactory: function () {
                        return dir = { value: 'ltr' };
                    } }
            ]
        });
        testing_1.TestBed.compileComponents();
        testing_1.inject([overlay_1.OverlayContainer, a11y_1.FocusMonitor], function (oc, fm) {
            overlayContainer = oc;
            overlayContainerElement = oc.getContainerElement();
            focusMonitor = fm;
        })();
    }));
    afterEach(testing_1.inject([overlay_1.OverlayContainer], function (currentOverlayContainer) {
        // Since we're resetting the testing module in some of the tests,
        // we can potentially have multiple overlay containers.
        currentOverlayContainer.ngOnDestroy();
        overlayContainer.ngOnDestroy();
    }));
    describe('basic usage', function () {
        var fixture;
        var buttonDebugElement;
        var buttonElement;
        var tooltipDirective;
        beforeEach(function () {
            fixture = testing_1.TestBed.createComponent(BasicTooltipDemo);
            fixture.detectChanges();
            buttonDebugElement = fixture.debugElement.query(platform_browser_1.By.css('button'));
            buttonElement = buttonDebugElement.nativeElement;
            tooltipDirective = buttonDebugElement.injector.get(index_1.MatTooltip);
        });
        it('should show and hide the tooltip', testing_1.fakeAsync(function () {
            assertTooltipInstance(tooltipDirective, false);
            tooltipDirective.show();
            testing_1.tick(0); // Tick for the show delay (default is 0)
            expect(tooltipDirective._isTooltipVisible()).toBe(true);
            fixture.detectChanges();
            // wait till animation has finished
            // wait till animation has finished
            testing_1.tick(500);
            // Make sure tooltip is shown to the user and animation has finished
            var tooltipElement = overlayContainerElement.querySelector('.mat-tooltip');
            expect(tooltipElement instanceof HTMLElement).toBe(true);
            expect(tooltipElement.style.transform).toBe('scale(1)');
            expect(overlayContainerElement.textContent).toContain(initialTooltipMessage);
            // After hide called, a timeout delay is created that will to hide the tooltip.
            var tooltipDelay = 1000;
            tooltipDirective.hide(tooltipDelay);
            expect(tooltipDirective._isTooltipVisible()).toBe(true);
            // After the tooltip delay elapses, expect that the tooltip is not visible.
            // After the tooltip delay elapses, expect that the tooltip is not visible.
            testing_1.tick(tooltipDelay);
            fixture.detectChanges();
            expect(tooltipDirective._isTooltipVisible()).toBe(false);
            // On animation complete, should expect that the tooltip has been detached.
            // On animation complete, should expect that the tooltip has been detached.
            testing_1.flushMicrotasks();
            assertTooltipInstance(tooltipDirective, false);
        }));
        it('should be able to re-open a tooltip if it was closed by detaching the overlay', testing_1.fakeAsync(function () {
            tooltipDirective.show();
            testing_1.tick(0);
            expect(tooltipDirective._isTooltipVisible()).toBe(true);
            fixture.detectChanges();
            testing_1.tick(500);
            tooltipDirective._overlayRef.detach();
            testing_1.tick(0);
            fixture.detectChanges();
            expect(tooltipDirective._isTooltipVisible()).toBe(false);
            testing_1.flushMicrotasks();
            assertTooltipInstance(tooltipDirective, false);
            tooltipDirective.show();
            testing_1.tick(0);
            expect(tooltipDirective._isTooltipVisible()).toBe(true);
        }));
        it('should show with delay', testing_1.fakeAsync(function () {
            assertTooltipInstance(tooltipDirective, false);
            var tooltipDelay = 1000;
            tooltipDirective.show(tooltipDelay);
            expect(tooltipDirective._isTooltipVisible()).toBe(false);
            fixture.detectChanges();
            expect(overlayContainerElement.textContent).toContain('');
            testing_1.tick(tooltipDelay);
            expect(tooltipDirective._isTooltipVisible()).toBe(true);
            expect(overlayContainerElement.textContent).toContain(initialTooltipMessage);
        }));
        it('should be able to override the default show and hide delays', testing_1.fakeAsync(function () {
            testing_1.TestBed
                .resetTestingModule()
                .configureTestingModule({
                imports: [index_1.MatTooltipModule, overlay_1.OverlayModule, animations_1.NoopAnimationsModule],
                declarations: [BasicTooltipDemo],
                providers: [{
                        provide: index_1.MAT_TOOLTIP_DEFAULT_OPTIONS,
                        useValue: { showDelay: 1337, hideDelay: 7331 }
                    }]
            })
                .compileComponents();
            fixture = testing_1.TestBed.createComponent(BasicTooltipDemo);
            fixture.detectChanges();
            tooltipDirective = fixture.debugElement.query(platform_browser_1.By.css('button')).injector.get(index_1.MatTooltip);
            tooltipDirective.show();
            fixture.detectChanges();
            testing_1.tick();
            expect(tooltipDirective._isTooltipVisible()).toBe(false);
            testing_1.tick(1337);
            expect(tooltipDirective._isTooltipVisible()).toBe(true);
            tooltipDirective.hide();
            fixture.detectChanges();
            testing_1.tick();
            expect(tooltipDirective._isTooltipVisible()).toBe(true);
            testing_1.tick(7331);
            expect(tooltipDirective._isTooltipVisible()).toBe(false);
        }));
        it('should set a css class on the overlay panel element', testing_1.fakeAsync(function () {
            tooltipDirective.show();
            fixture.detectChanges();
            testing_1.tick(0);
            var overlayRef = tooltipDirective._overlayRef;
            expect(!!overlayRef).toBeTruthy();
            expect(overlayRef.overlayElement.classList).toContain(index_1.TOOLTIP_PANEL_CLASS, 'Expected the overlay panel element to have the tooltip panel class set.');
        }));
        it('should not show if disabled', testing_1.fakeAsync(function () {
            // Test that disabling the tooltip will not set the tooltip visible
            tooltipDirective.disabled = true;
            tooltipDirective.show();
            fixture.detectChanges();
            testing_1.tick(0);
            expect(tooltipDirective._isTooltipVisible()).toBe(false);
            // Test to make sure setting disabled to false will show the tooltip
            // Sanity check to make sure everything was correct before (detectChanges, tick)
            tooltipDirective.disabled = false;
            tooltipDirective.show();
            fixture.detectChanges();
            testing_1.tick(0);
            expect(tooltipDirective._isTooltipVisible()).toBe(true);
        }));
        it('should hide if disabled while visible', testing_1.fakeAsync(function () {
            // Display the tooltip with a timeout before hiding.
            tooltipDirective.hideDelay = 1000;
            tooltipDirective.show();
            fixture.detectChanges();
            testing_1.tick(0);
            expect(tooltipDirective._isTooltipVisible()).toBe(true);
            // Set tooltip to be disabled and verify that the tooltip hides.
            tooltipDirective.disabled = true;
            testing_1.tick(0);
            expect(tooltipDirective._isTooltipVisible()).toBe(false);
        }));
        it('should hide if the message is cleared while the tooltip is open', testing_1.fakeAsync(function () {
            tooltipDirective.show();
            fixture.detectChanges();
            testing_1.tick(0);
            expect(tooltipDirective._isTooltipVisible()).toBe(true);
            fixture.componentInstance.message = '';
            fixture.detectChanges();
            testing_1.tick(0);
            expect(tooltipDirective._isTooltipVisible()).toBe(false);
        }));
        it('should not show if hide is called before delay finishes', testing_1.async(function () {
            assertTooltipInstance(tooltipDirective, false);
            var tooltipDelay = 1000;
            tooltipDirective.show(tooltipDelay);
            expect(tooltipDirective._isTooltipVisible()).toBe(false);
            fixture.detectChanges();
            expect(overlayContainerElement.textContent).toContain('');
            tooltipDirective.hide();
            fixture.whenStable().then(function () {
                expect(tooltipDirective._isTooltipVisible()).toBe(false);
            });
        }));
        it('should not show tooltip if message is not present or empty', function () {
            assertTooltipInstance(tooltipDirective, false);
            tooltipDirective.message = (undefined);
            fixture.detectChanges();
            tooltipDirective.show();
            assertTooltipInstance(tooltipDirective, false);
            tooltipDirective.message = (null);
            fixture.detectChanges();
            tooltipDirective.show();
            assertTooltipInstance(tooltipDirective, false);
            tooltipDirective.message = '';
            fixture.detectChanges();
            tooltipDirective.show();
            assertTooltipInstance(tooltipDirective, false);
            tooltipDirective.message = '   ';
            fixture.detectChanges();
            tooltipDirective.show();
            assertTooltipInstance(tooltipDirective, false);
        });
        it('should not follow through with hide if show is called after', testing_1.fakeAsync(function () {
            tooltipDirective.show();
            testing_1.tick(0); // Tick for the show delay (default is 0)
            expect(tooltipDirective._isTooltipVisible()).toBe(true);
            // After hide called, a timeout delay is created that will to hide the tooltip.
            var tooltipDelay = 1000;
            tooltipDirective.hide(tooltipDelay);
            expect(tooltipDirective._isTooltipVisible()).toBe(true);
            // Before delay time has passed, call show which should cancel intent to hide tooltip.
            tooltipDirective.show();
            testing_1.tick(tooltipDelay);
            expect(tooltipDirective._isTooltipVisible()).toBe(true);
        }));
        it('should be able to update the tooltip position while open', testing_1.fakeAsync(function () {
            tooltipDirective.position = 'below';
            tooltipDirective.show();
            testing_1.tick();
            assertTooltipInstance(tooltipDirective, true);
            tooltipDirective.position = 'above';
            spyOn((tooltipDirective._overlayRef), 'updatePosition').and.callThrough();
            fixture.detectChanges();
            testing_1.tick();
            assertTooltipInstance(tooltipDirective, true);
            expect(tooltipDirective._overlayRef.updatePosition).toHaveBeenCalled();
        }));
        it('should not throw when updating the position for a closed tooltip', testing_1.fakeAsync(function () {
            tooltipDirective.position = 'left';
            tooltipDirective.show(0);
            fixture.detectChanges();
            testing_1.tick();
            tooltipDirective.hide(0);
            fixture.detectChanges();
            testing_1.tick();
            // At this point the animation should be able to complete itself and trigger the
            // _animationDone function, but for unknown reasons in the test infrastructure,
            // this does not occur. Manually call the hook so the animation subscriptions get invoked.
            // At this point the animation should be able to complete itself and trigger the
            // _animationDone function, but for unknown reasons in the test infrastructure,
            // this does not occur. Manually call the hook so the animation subscriptions get invoked.
            tooltipDirective._tooltipInstance._animationDone({
                fromState: 'visible',
                toState: 'hidden',
                totalTime: 150,
                phaseName: 'done',
            });
            expect(function () {
                tooltipDirective.position = 'right';
                fixture.detectChanges();
                testing_1.tick();
            }).not.toThrow();
        }));
        it('should be able to modify the tooltip message', testing_1.fakeAsync(function () {
            assertTooltipInstance(tooltipDirective, false);
            tooltipDirective.show();
            testing_1.tick(0); // Tick for the show delay (default is 0)
            expect(tooltipDirective._tooltipInstance._visibility).toBe('visible');
            fixture.detectChanges();
            expect(overlayContainerElement.textContent).toContain(initialTooltipMessage);
            var newMessage = 'new tooltip message';
            tooltipDirective.message = newMessage;
            fixture.detectChanges();
            expect(overlayContainerElement.textContent).toContain(newMessage);
        }));
        it('should allow extra classes to be set on the tooltip', testing_1.fakeAsync(function () {
            assertTooltipInstance(tooltipDirective, false);
            tooltipDirective.show();
            testing_1.tick(0); // Tick for the show delay (default is 0)
            fixture.detectChanges();
            // Make sure classes aren't prematurely added
            var tooltipElement = overlayContainerElement.querySelector('.mat-tooltip');
            expect(tooltipElement.classList).not.toContain('custom-one', 'Expected to not have the class before enabling matTooltipClass');
            expect(tooltipElement.classList).not.toContain('custom-two', 'Expected to not have the class before enabling matTooltipClass');
            // Enable the classes via ngClass syntax
            fixture.componentInstance.showTooltipClass = true;
            fixture.detectChanges();
            // Make sure classes are correctly added
            tooltipElement = overlayContainerElement.querySelector('.mat-tooltip');
            expect(tooltipElement.classList).toContain('custom-one', 'Expected to have the class after enabling matTooltipClass');
            expect(tooltipElement.classList).toContain('custom-two', 'Expected to have the class after enabling matTooltipClass');
        }));
        it('should be removed after parent destroyed', testing_1.fakeAsync(function () {
            tooltipDirective.show();
            testing_1.tick(0); // Tick for the show delay (default is 0)
            expect(tooltipDirective._isTooltipVisible()).toBe(true);
            fixture.destroy();
            expect(overlayContainerElement.childNodes.length).toBe(0);
            expect(overlayContainerElement.textContent).toBe('');
        }));
        it('should have an aria-described element with the tooltip message', function () {
            var dynamicTooltipsDemoFixture = testing_1.TestBed.createComponent(DynamicTooltipsDemo);
            var dynamicTooltipsComponent = dynamicTooltipsDemoFixture.componentInstance;
            dynamicTooltipsComponent.tooltips = ['Tooltip One', 'Tooltip Two'];
            dynamicTooltipsDemoFixture.detectChanges();
            var buttons = dynamicTooltipsComponent.getButtons();
            var firstButtonAria = buttons[0].getAttribute('aria-describedby');
            expect(document.querySelector("#" + firstButtonAria).textContent).toBe('Tooltip One');
            var secondButtonAria = buttons[1].getAttribute('aria-describedby');
            expect(document.querySelector("#" + secondButtonAria).textContent).toBe('Tooltip Two');
        });
        it('should not try to dispose the tooltip when destroyed and done hiding', testing_1.fakeAsync(function () {
            tooltipDirective.show();
            fixture.detectChanges();
            testing_1.tick(150);
            var tooltipDelay = 1000;
            tooltipDirective.hide();
            testing_1.tick(tooltipDelay); // Change the tooltip state to hidden and trigger animation start
            // Store the tooltip instance, which will be set to null after the button is hidden.
            var tooltipInstance = (tooltipDirective._tooltipInstance);
            fixture.componentInstance.showButton = false;
            fixture.detectChanges();
            // At this point the animation should be able to complete itself and trigger the
            // _animationDone function, but for unknown reasons in the test infrastructure,
            // this does not occur. Manually call this and verify that doing so does not
            // throw an error.
            tooltipInstance._animationDone({
                fromState: 'visible',
                toState: 'hidden',
                totalTime: 150,
                phaseName: 'done',
            });
        }));
        it('should consistently position before and after overlay origin in ltr and rtl dir', function () {
            tooltipDirective.position = 'left';
            var leftOrigin = tooltipDirective._getOrigin().main;
            tooltipDirective.position = 'right';
            var rightOrigin = tooltipDirective._getOrigin().main;
            // Test expectations in LTR
            tooltipDirective.position = 'before';
            expect(tooltipDirective._getOrigin().main).toEqual(leftOrigin);
            tooltipDirective.position = 'after';
            expect(tooltipDirective._getOrigin().main).toEqual(rightOrigin);
            // Test expectations in RTL
            dir.value = 'rtl';
            tooltipDirective.position = 'before';
            expect(tooltipDirective._getOrigin().main).toEqual(leftOrigin);
            tooltipDirective.position = 'after';
            expect(tooltipDirective._getOrigin().main).toEqual(rightOrigin);
        });
        it('should consistently position before and after overlay position in ltr and rtl dir', function () {
            tooltipDirective.position = 'left';
            var leftOverlayPosition = tooltipDirective._getOverlayPosition().main;
            tooltipDirective.position = 'right';
            var rightOverlayPosition = tooltipDirective._getOverlayPosition().main;
            // Test expectations in LTR
            tooltipDirective.position = 'before';
            expect(tooltipDirective._getOverlayPosition().main).toEqual(leftOverlayPosition);
            tooltipDirective.position = 'after';
            expect(tooltipDirective._getOverlayPosition().main).toEqual(rightOverlayPosition);
            // Test expectations in RTL
            dir.value = 'rtl';
            tooltipDirective.position = 'before';
            expect(tooltipDirective._getOverlayPosition().main).toEqual(leftOverlayPosition);
            tooltipDirective.position = 'after';
            expect(tooltipDirective._getOverlayPosition().main).toEqual(rightOverlayPosition);
        });
        it('should throw when trying to assign an invalid position', function () {
            expect(function () {
                fixture.componentInstance.position = 'everywhere';
                fixture.detectChanges();
                tooltipDirective.show();
            }).toThrowError('Tooltip position "everywhere" is invalid.');
        });
        it('should pass the layout direction to the tooltip', testing_1.fakeAsync(function () {
            dir.value = 'rtl';
            tooltipDirective.show();
            testing_1.tick(0);
            fixture.detectChanges();
            var tooltipWrapper = (overlayContainerElement.querySelector('.cdk-overlay-connected-position-bounding-box'));
            expect(tooltipWrapper).toBeTruthy('Expected tooltip to be shown.');
            expect(tooltipWrapper.getAttribute('dir')).toBe('rtl', 'Expected tooltip to be in RTL mode.');
        }));
        it('should keep the overlay direction in sync with the trigger direction', testing_1.fakeAsync(function () {
            dir.value = 'rtl';
            tooltipDirective.show();
            testing_1.tick(0);
            fixture.detectChanges();
            testing_1.tick(500);
            var tooltipWrapper = (overlayContainerElement.querySelector('.cdk-overlay-connected-position-bounding-box'));
            expect(tooltipWrapper.getAttribute('dir')).toBe('rtl', 'Expected tooltip to be in RTL.');
            tooltipDirective.hide(0);
            testing_1.tick(0);
            fixture.detectChanges();
            testing_1.tick(500);
            dir.value = 'ltr';
            tooltipDirective.show();
            testing_1.tick(0);
            fixture.detectChanges();
            testing_1.tick(500);
            tooltipWrapper =
                (overlayContainerElement.querySelector('.cdk-overlay-connected-position-bounding-box'));
            expect(tooltipWrapper.getAttribute('dir')).toBe('ltr', 'Expected tooltip to be in LTR.');
        }));
        it('should be able to set the tooltip message as a number', testing_1.fakeAsync(function () {
            fixture.componentInstance.message = 100;
            fixture.detectChanges();
            expect(tooltipDirective.message).toBe('100');
        }));
        it('should hide when clicking away', testing_1.fakeAsync(function () {
            tooltipDirective.show();
            testing_1.tick(0);
            fixture.detectChanges();
            testing_1.tick(500);
            expect(tooltipDirective._isTooltipVisible()).toBe(true);
            expect(overlayContainerElement.textContent).toContain(initialTooltipMessage);
            document.body.click();
            testing_1.tick(0);
            fixture.detectChanges();
            testing_1.tick(500);
            fixture.detectChanges();
            expect(tooltipDirective._isTooltipVisible()).toBe(false);
            expect(overlayContainerElement.textContent).toBe('');
        }));
        it('should not hide immediately if a click fires while animating', testing_1.fakeAsync(function () {
            tooltipDirective.show();
            testing_1.tick(0);
            fixture.detectChanges();
            document.body.click();
            fixture.detectChanges();
            testing_1.tick(500);
            expect(overlayContainerElement.textContent).toContain(initialTooltipMessage);
        }));
        it('should not throw when pressing ESCAPE', testing_1.fakeAsync(function () {
            expect(function () {
                testing_2.dispatchKeyboardEvent(buttonElement, 'keydown', keycodes_1.ESCAPE);
                fixture.detectChanges();
            }).not.toThrow();
            // Flush due to the additional tick that is necessary for the FocusMonitor.
            // Flush due to the additional tick that is necessary for the FocusMonitor.
            testing_1.flush();
        }));
        it('should not show the tooltip on progammatic focus', testing_1.fakeAsync(function () {
            testing_2.patchElementFocus(buttonElement);
            assertTooltipInstance(tooltipDirective, false);
            focusMonitor.focusVia(buttonElement, 'program');
            testing_1.tick(0);
            fixture.detectChanges();
            testing_1.tick(500);
            expect(overlayContainerElement.querySelector('.mat-tooltip')).toBeNull();
        }));
        it('should not show the tooltip on mouse focus', testing_1.fakeAsync(function () {
            testing_2.patchElementFocus(buttonElement);
            assertTooltipInstance(tooltipDirective, false);
            focusMonitor.focusVia(buttonElement, 'mouse');
            testing_1.tick(0);
            fixture.detectChanges();
            testing_1.tick(500);
            expect(overlayContainerElement.querySelector('.mat-tooltip')).toBeNull();
        }));
        it('should not show the tooltip on touch focus', testing_1.fakeAsync(function () {
            testing_2.patchElementFocus(buttonElement);
            assertTooltipInstance(tooltipDirective, false);
            focusMonitor.focusVia(buttonElement, 'touch');
            testing_1.tick(0);
            fixture.detectChanges();
            testing_1.tick(500);
            expect(overlayContainerElement.querySelector('.mat-tooltip')).toBeNull();
        }));
    });
    describe('fallback positions', function () {
        var fixture;
        var tooltip;
        beforeEach(function () {
            fixture = testing_1.TestBed.createComponent(BasicTooltipDemo);
            fixture.detectChanges();
            tooltip = fixture.debugElement.query(platform_browser_1.By.css('button')).injector.get(index_1.MatTooltip);
        });
        it('should set a fallback origin position by inverting the main origin position', function () {
            tooltip.position = 'left';
            expect(tooltip._getOrigin().main.originX).toBe('start');
            expect(tooltip._getOrigin().fallback.originX).toBe('end');
            tooltip.position = 'right';
            expect(tooltip._getOrigin().main.originX).toBe('end');
            expect(tooltip._getOrigin().fallback.originX).toBe('start');
            tooltip.position = 'above';
            expect(tooltip._getOrigin().main.originY).toBe('top');
            expect(tooltip._getOrigin().fallback.originY).toBe('bottom');
            tooltip.position = 'below';
            expect(tooltip._getOrigin().main.originY).toBe('bottom');
            expect(tooltip._getOrigin().fallback.originY).toBe('top');
        });
        it('should set a fallback overlay position by inverting the main overlay position', function () {
            tooltip.position = 'left';
            expect(tooltip._getOverlayPosition().main.overlayX).toBe('end');
            expect(tooltip._getOverlayPosition().fallback.overlayX).toBe('start');
            tooltip.position = 'right';
            expect(tooltip._getOverlayPosition().main.overlayX).toBe('start');
            expect(tooltip._getOverlayPosition().fallback.overlayX).toBe('end');
            tooltip.position = 'above';
            expect(tooltip._getOverlayPosition().main.overlayY).toBe('bottom');
            expect(tooltip._getOverlayPosition().fallback.overlayY).toBe('top');
            tooltip.position = 'below';
            expect(tooltip._getOverlayPosition().main.overlayY).toBe('top');
            expect(tooltip._getOverlayPosition().fallback.overlayY).toBe('bottom');
        });
    });
    describe('scrollable usage', function () {
        var fixture;
        var buttonDebugElement;
        var tooltipDirective;
        beforeEach(function () {
            fixture = testing_1.TestBed.createComponent(ScrollableTooltipDemo);
            fixture.detectChanges();
            buttonDebugElement = fixture.debugElement.query(platform_browser_1.By.css('button'));
            tooltipDirective = buttonDebugElement.injector.get(index_1.MatTooltip);
        });
        it('should hide tooltip if clipped after changing positions', testing_1.fakeAsync(function () {
            assertTooltipInstance(tooltipDirective, false);
            // Show the tooltip and tick for the show delay (default is 0)
            tooltipDirective.show();
            fixture.detectChanges();
            testing_1.tick(0);
            // Expect that the tooltip is displayed
            expect(tooltipDirective._isTooltipVisible())
                .toBe(true, 'Expected tooltip to be initially visible');
            // Scroll the page but tick just before the default throttle should update.
            fixture.componentInstance.scrollDown();
            testing_1.tick(index_1.SCROLL_THROTTLE_MS - 1);
            expect(tooltipDirective._isTooltipVisible())
                .toBe(true, 'Expected tooltip to be visible when scrolling, before throttle limit');
            // Finish ticking to the throttle's limit and check that the scroll event notified the
            // tooltip and it was hidden.
            // Finish ticking to the throttle's limit and check that the scroll event notified the
            // tooltip and it was hidden.
            testing_1.tick(100);
            fixture.detectChanges();
            expect(tooltipDirective._isTooltipVisible())
                .toBe(false, 'Expected tooltip hidden when scrolled out of view, after throttle limit');
        }));
        it('should execute the `hide` call, after scrolling away, inside the NgZone', testing_1.fakeAsync(function () {
            var inZoneSpy = jasmine.createSpy('in zone spy');
            tooltipDirective.show();
            fixture.detectChanges();
            testing_1.tick(0);
            spyOn((tooltipDirective._tooltipInstance), 'hide').and.callFake(function () {
                inZoneSpy(core_1.NgZone.isInAngularZone());
            });
            fixture.componentInstance.scrollDown();
            testing_1.tick(100);
            fixture.detectChanges();
            expect(inZoneSpy).toHaveBeenCalled();
            expect(inZoneSpy).toHaveBeenCalledWith(true);
        }));
    });
    describe('with OnPush', function () {
        var fixture;
        var buttonDebugElement;
        var buttonElement;
        var tooltipDirective;
        beforeEach(function () {
            fixture = testing_1.TestBed.createComponent(OnPushTooltipDemo);
            fixture.detectChanges();
            buttonDebugElement = fixture.debugElement.query(platform_browser_1.By.css('button'));
            buttonElement = buttonDebugElement.nativeElement;
            tooltipDirective = buttonDebugElement.injector.get(index_1.MatTooltip);
        });
        it('should show and hide the tooltip', testing_1.fakeAsync(function () {
            assertTooltipInstance(tooltipDirective, false);
            tooltipDirective.show();
            testing_1.tick(0); // Tick for the show delay (default is 0)
            expect(tooltipDirective._isTooltipVisible()).toBe(true);
            fixture.detectChanges();
            // wait until animation has finished
            // wait until animation has finished
            testing_1.tick(500);
            // Make sure tooltip is shown to the user and animation has finished
            var tooltipElement = overlayContainerElement.querySelector('.mat-tooltip');
            expect(tooltipElement instanceof HTMLElement).toBe(true);
            expect(tooltipElement.style.transform).toBe('scale(1)');
            // After hide called, a timeout delay is created that will to hide the tooltip.
            var tooltipDelay = 1000;
            tooltipDirective.hide(tooltipDelay);
            expect(tooltipDirective._isTooltipVisible()).toBe(true);
            // After the tooltip delay elapses, expect that the tooltip is not visible.
            // After the tooltip delay elapses, expect that the tooltip is not visible.
            testing_1.tick(tooltipDelay);
            fixture.detectChanges();
            expect(tooltipDirective._isTooltipVisible()).toBe(false);
            // On animation complete, should expect that the tooltip has been detached.
            // On animation complete, should expect that the tooltip has been detached.
            testing_1.flushMicrotasks();
            assertTooltipInstance(tooltipDirective, false);
        }));
        it('should have rendered the tooltip text on init', testing_1.fakeAsync(function () {
            testing_2.dispatchFakeEvent(buttonElement, 'mouseenter');
            fixture.detectChanges();
            testing_1.tick(0);
            var tooltipElement = overlayContainerElement.querySelector('.mat-tooltip');
            expect(tooltipElement.textContent).toContain('initial tooltip message');
        }));
    });
    describe('special cases', function () {
        it('should clear the `user-select` when a tooltip is set on a text field in iOS', function () {
            platform.IOS = true;
            var fixture = testing_1.TestBed.createComponent(TooltipOnTextFields);
            var instance = fixture.componentInstance;
            fixture.detectChanges();
            expect(instance.input.nativeElement.style.userSelect).toBeFalsy();
            expect(instance.input.nativeElement.style.webkitUserSelect).toBeFalsy();
            expect(instance.textarea.nativeElement.style.userSelect).toBeFalsy();
            expect(instance.textarea.nativeElement.style.webkitUserSelect).toBeFalsy();
        });
        it('should clear the `-webkit-user-drag` on draggable elements', function () {
            var fixture = testing_1.TestBed.createComponent(TooltipOnDraggableElement);
            fixture.detectChanges();
            expect(fixture.componentInstance.button.nativeElement.style.webkitUserDrag).toBeFalsy();
        });
    });
});
var BasicTooltipDemo = /** @class */ (function () {
    function BasicTooltipDemo() {
        this.position = 'below';
        this.message = initialTooltipMessage;
        this.showButton = true;
        this.showTooltipClass = false;
    }
    BasicTooltipDemo.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'app',
                    template: "\n    <button #button\n            *ngIf=\"showButton\"\n            [matTooltip]=\"message\"\n            [matTooltipPosition]=\"position\"\n            [matTooltipClass]=\"{'custom-one': showTooltipClass, 'custom-two': showTooltipClass }\">\n      Button\n    </button>"
                },] },
    ];
    /** @nocollapse */
    BasicTooltipDemo.propDecorators = {
        "tooltip": [{ type: core_1.ViewChild, args: [index_1.MatTooltip,] },],
        "button": [{ type: core_1.ViewChild, args: ['button',] },],
    };
    return BasicTooltipDemo;
}());
var ScrollableTooltipDemo = /** @class */ (function () {
    function ScrollableTooltipDemo() {
        this.position = 'below';
        this.message = initialTooltipMessage;
        this.showButton = true;
    }
    ScrollableTooltipDemo.prototype.scrollDown = function () {
        var scrollingContainerEl = this.scrollingContainer.getElementRef().nativeElement;
        scrollingContainerEl.scrollTop = 250;
        // Emit a scroll event from the scrolling element in our component.
        // This event should be picked up by the scrollable directive and notify.
        // The notification should be picked up by the service.
        // Emit a scroll event from the scrolling element in our component.
        // This event should be picked up by the scrollable directive and notify.
        // The notification should be picked up by the service.
        testing_2.dispatchFakeEvent(scrollingContainerEl, 'scroll');
    };
    ScrollableTooltipDemo.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'app',
                    template: "\n    <div cdk-scrollable style=\"padding: 100px; margin: 300px;\n                               height: 200px; width: 200px; overflow: auto;\">\n      <button *ngIf=\"showButton\" style=\"margin-bottom: 600px\"\n              [matTooltip]=\"message\"\n              [matTooltipPosition]=\"position\">\n        Button\n      </button>\n    </div>"
                },] },
    ];
    /** @nocollapse */
    ScrollableTooltipDemo.propDecorators = {
        "scrollingContainer": [{ type: core_1.ViewChild, args: [overlay_1.CdkScrollable,] },],
    };
    return ScrollableTooltipDemo;
}());
var OnPushTooltipDemo = /** @class */ (function () {
    function OnPushTooltipDemo() {
        this.position = 'below';
        this.message = initialTooltipMessage;
    }
    OnPushTooltipDemo.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'app',
                    template: "\n    <button [matTooltip]=\"message\"\n            [matTooltipPosition]=\"position\">\n      Button\n    </button>",
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush
                },] },
    ];
    return OnPushTooltipDemo;
}());
var DynamicTooltipsDemo = /** @class */ (function () {
    function DynamicTooltipsDemo(_elementRef) {
        this._elementRef = _elementRef;
        this.tooltips = [];
    }
    DynamicTooltipsDemo.prototype.getButtons = function () {
        return this._elementRef.nativeElement.querySelectorAll('button');
    };
    DynamicTooltipsDemo.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'app',
                    template: "\n    <button *ngFor=\"let tooltip of tooltips\"\n            [matTooltip]=\"tooltip\">\n      Button {{tooltip}}\n    </button>",
                },] },
    ];
    /** @nocollapse */
    DynamicTooltipsDemo.ctorParameters = function () { return [
        { type: core_1.ElementRef, },
    ]; };
    return DynamicTooltipsDemo;
}());
var TooltipOnTextFields = /** @class */ (function () {
    function TooltipOnTextFields() {
    }
    TooltipOnTextFields.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <input\n      #input\n      style=\"user-select: none; -webkit-user-select: none\"\n      matTooltip=\"Something\">\n\n    <textarea\n      #textarea\n      style=\"user-select: none; -webkit-user-select: none\"\n      matTooltip=\"Another thing\"></textarea>\n  ",
                },] },
    ];
    /** @nocollapse */
    TooltipOnTextFields.propDecorators = {
        "input": [{ type: core_1.ViewChild, args: ['input',] },],
        "textarea": [{ type: core_1.ViewChild, args: ['textarea',] },],
    };
    return TooltipOnTextFields;
}());
var TooltipOnDraggableElement = /** @class */ (function () {
    function TooltipOnDraggableElement() {
    }
    TooltipOnDraggableElement.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <button\n      #button\n      style=\"-webkit-user-drag: none;\"\n      draggable=\"true\"\n      matTooltip=\"Drag me\"></button>\n  ",
                },] },
    ];
    /** @nocollapse */
    TooltipOnDraggableElement.propDecorators = {
        "button": [{ type: core_1.ViewChild, args: ['button',] },],
    };
    return TooltipOnDraggableElement;
}());
/** Asserts whether a tooltip directive has a tooltip instance. */
function assertTooltipInstance(tooltip, shouldExist) {
    // Note that we have to cast this to a boolean, because Jasmine will go into an infinite loop
    // if it tries to stringify the `_tooltipInstance` when an assertion fails. The infinite loop
    // happens due to the `_tooltipInstance` having a circular structure.
    expect(!!tooltip._tooltipInstance).toBe(shouldExist);
}
//# sourceMappingURL=tooltip.spec.js.map