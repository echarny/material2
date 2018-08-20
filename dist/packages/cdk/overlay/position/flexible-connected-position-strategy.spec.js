"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var portal_1 = require("@angular/cdk/portal");
var scrolling_1 = require("@angular/cdk/scrolling");
var testing_1 = require("@angular/cdk/testing");
var core_1 = require("@angular/core");
var testing_2 = require("@angular/core/testing");
var operators_1 = require("rxjs/operators");
var index_1 = require("../index");
// Default width and height of the overlay and origin panels throughout these tests.
var DEFAULT_HEIGHT = 30;
var DEFAULT_WIDTH = 60;
describe('FlexibleConnectedPositionStrategy', function () {
    var overlay;
    var overlayContainer;
    var zone;
    var overlayRef;
    var viewport;
    beforeEach(function () {
        testing_2.TestBed.configureTestingModule({
            imports: [scrolling_1.ScrollingModule, index_1.OverlayModule, OverlayTestModule],
            providers: [{ provide: core_1.NgZone, useFactory: function () { return zone = new testing_1.MockNgZone(); } }]
        });
        testing_2.inject([index_1.Overlay, index_1.OverlayContainer, index_1.ViewportRuler], function (o, oc, v) {
            overlay = o;
            overlayContainer = oc;
            viewport = v;
        })();
    });
    afterEach(function () {
        overlayContainer.ngOnDestroy();
        if (overlayRef) {
            overlayRef.dispose();
        }
    });
    function attachOverlay(config) {
        overlayRef = overlay.create(config);
        overlayRef.attach(new portal_1.ComponentPortal(TestOverlay));
        zone.simulateZoneExit();
    }
    it('should throw when attempting to attach to multiple different overlays', function () {
        var origin = document.createElement('div');
        var positionStrategy = overlay.position()
            .flexibleConnectedTo(origin)
            .withPositions([{
                overlayX: 'start',
                overlayY: 'top',
                originX: 'start',
                originY: 'bottom'
            }]);
        // Needs to be in the DOM for IE not to throw an "Unspecified error".
        document.body.appendChild(origin);
        attachOverlay({ positionStrategy: positionStrategy });
        expect(function () { return attachOverlay({ positionStrategy: positionStrategy }); }).toThrow();
        document.body.removeChild(origin);
    });
    it('should not throw when trying to apply after being disposed', function () {
        var origin = document.createElement('div');
        var positionStrategy = overlay.position()
            .flexibleConnectedTo(origin)
            .withPositions([{
                overlayX: 'start',
                overlayY: 'top',
                originX: 'start',
                originY: 'bottom'
            }]);
        // Needs to be in the DOM for IE not to throw an "Unspecified error".
        document.body.appendChild(origin);
        attachOverlay({ positionStrategy: positionStrategy });
        overlayRef.dispose();
        expect(function () { return positionStrategy.apply(); }).not.toThrow();
        document.body.removeChild(origin);
    });
    it('should not throw when trying to re-apply the last position after being disposed', function () {
        var origin = document.createElement('div');
        var positionStrategy = overlay.position()
            .flexibleConnectedTo(origin)
            .withPositions([{
                overlayX: 'start',
                overlayY: 'top',
                originX: 'start',
                originY: 'bottom'
            }]);
        // Needs to be in the DOM for IE not to throw an "Unspecified error".
        document.body.appendChild(origin);
        attachOverlay({ positionStrategy: positionStrategy });
        overlayRef.dispose();
        expect(function () { return positionStrategy.reapplyLastPosition(); }).not.toThrow();
        document.body.removeChild(origin);
    });
    it('should for the virtual keyboard offset when positioning the overlay', function () {
        var originElement = createPositionedBlockElement();
        document.body.appendChild(originElement);
        // Position the element so it would have enough space to fit.
        originElement.style.top = '200px';
        originElement.style.left = '70px';
        // Pull the element up ourselves to simulate what a mobile
        // browser would do when the virtual keyboard is being shown.
        overlayContainer.getContainerElement().style.top = '-100px';
        attachOverlay({
            positionStrategy: overlay.position()
                .flexibleConnectedTo(originElement)
                .withFlexibleDimensions(false)
                .withPush(false)
                .withPositions([{
                    originX: 'start',
                    originY: 'bottom',
                    overlayX: 'start',
                    overlayY: 'top'
                }])
        });
        var originRect = originElement.getBoundingClientRect();
        var overlayRect = overlayRef.overlayElement.getBoundingClientRect();
        expect(Math.floor(overlayRect.top)).toBe(Math.floor(originRect.bottom));
        document.body.removeChild(originElement);
    });
    describe('without flexible dimensions and pushing', function () {
        var ORIGIN_HEIGHT = DEFAULT_HEIGHT;
        var ORIGIN_WIDTH = DEFAULT_WIDTH;
        var OVERLAY_HEIGHT = DEFAULT_HEIGHT;
        var OVERLAY_WIDTH = DEFAULT_WIDTH;
        var originElement;
        var positionStrategy;
        beforeEach(function () {
            // The origin and overlay elements need to be in the document body in order to have geometry.
            originElement = createPositionedBlockElement();
            document.body.appendChild(originElement);
            positionStrategy = overlay.position()
                .flexibleConnectedTo(originElement)
                .withFlexibleDimensions(false)
                .withPush(false);
        });
        afterEach(function () {
            document.body.removeChild(originElement);
        });
        describe('when not near viewport edge, not scrolled', function () {
            // Place the original element close to the center of the window.
            // (1024 / 2, 768 / 2). It's not exact, since outerWidth/Height includes browser
            // chrome, but it doesn't really matter for these tests.
            var ORIGIN_LEFT = 500;
            var ORIGIN_TOP = 350;
            beforeEach(function () {
                originElement.style.left = ORIGIN_LEFT + "px";
                originElement.style.top = ORIGIN_TOP + "px";
            });
            // Preconditions are set, now just run the full set of simple position tests.
            runSimplePositionTests();
        });
        describe('when scrolled', function () {
            // Place the original element decently far outside the unscrolled document (1024x768).
            var ORIGIN_LEFT = 2500;
            var ORIGIN_TOP = 2500;
            // Create a very large element that will make the page scrollable.
            var veryLargeElement = document.createElement('div');
            veryLargeElement.style.width = '4000px';
            veryLargeElement.style.height = '4000px';
            beforeEach(function () {
                // Scroll the page such that the origin element is roughly in the
                // center of the visible viewport (2500 - 1024/2, 2500 - 768/2).
                document.body.appendChild(veryLargeElement);
                window.scroll(2100, 2100);
                originElement.style.top = ORIGIN_TOP + "px";
                originElement.style.left = ORIGIN_LEFT + "px";
            });
            afterEach(function () {
                window.scroll(0, 0);
                document.body.removeChild(veryLargeElement);
            });
            // Preconditions are set, now just run the full set of simple position tests.
            runSimplePositionTests();
        });
        describe('when near viewport edge', function () {
            it('should reposition the overlay if it would go off the top of the screen', function () {
                originElement.style.top = '5px';
                originElement.style.left = '200px';
                var originRect = originElement.getBoundingClientRect();
                positionStrategy.withPositions([
                    {
                        originX: 'end',
                        originY: 'top',
                        overlayX: 'end',
                        overlayY: 'bottom'
                    },
                    {
                        originX: 'start',
                        originY: 'bottom',
                        overlayX: 'start',
                        overlayY: 'top'
                    }
                ]);
                attachOverlay({ positionStrategy: positionStrategy });
                var overlayRect = overlayRef.overlayElement.getBoundingClientRect();
                expect(Math.floor(overlayRect.top)).toBe(Math.floor(originRect.bottom));
                expect(Math.floor(overlayRect.left)).toBe(Math.floor(originRect.left));
            });
            it('should reposition the overlay if it would go off the left of the screen', function () {
                originElement.style.top = '200px';
                originElement.style.left = '5px';
                var originRect = originElement.getBoundingClientRect();
                var originCenterY = originRect.top + (ORIGIN_HEIGHT / 2);
                positionStrategy.withPositions([
                    {
                        originX: 'start',
                        originY: 'bottom',
                        overlayX: 'end',
                        overlayY: 'top'
                    },
                    {
                        originX: 'end',
                        originY: 'center',
                        overlayX: 'start',
                        overlayY: 'center'
                    }
                ]);
                attachOverlay({ positionStrategy: positionStrategy });
                var overlayRect = overlayRef.overlayElement.getBoundingClientRect();
                expect(Math.floor(overlayRect.top)).toBe(Math.floor(originCenterY - (OVERLAY_HEIGHT / 2)));
                expect(Math.floor(overlayRect.left)).toBe(Math.floor(originRect.right));
            });
            it('should reposition the overlay if it would go off the bottom of the screen', function () {
                originElement.style.bottom = '25px';
                originElement.style.left = '200px';
                var originRect = originElement.getBoundingClientRect();
                positionStrategy.withPositions([
                    {
                        originX: 'start',
                        originY: 'bottom',
                        overlayX: 'start',
                        overlayY: 'top'
                    },
                    {
                        originX: 'end',
                        originY: 'top',
                        overlayX: 'end',
                        overlayY: 'bottom'
                    }
                ]);
                attachOverlay({ positionStrategy: positionStrategy });
                var overlayRect = overlayRef.overlayElement.getBoundingClientRect();
                expect(Math.floor(overlayRect.bottom)).toBe(Math.floor(originRect.top));
                expect(Math.floor(overlayRect.right)).toBe(Math.floor(originRect.right));
            });
            it('should reposition the overlay if it would go off the right of the screen', function () {
                originElement.style.top = '200px';
                originElement.style.right = '25px';
                var originRect = originElement.getBoundingClientRect();
                positionStrategy.withPositions([
                    {
                        originX: 'end',
                        originY: 'center',
                        overlayX: 'start',
                        overlayY: 'center'
                    },
                    {
                        originX: 'start',
                        originY: 'bottom',
                        overlayX: 'end',
                        overlayY: 'top'
                    }
                ]);
                attachOverlay({ positionStrategy: positionStrategy });
                var overlayRect = overlayRef.overlayElement.getBoundingClientRect();
                expect(Math.floor(overlayRect.top)).toBe(Math.floor(originRect.bottom));
                expect(Math.floor(overlayRect.right)).toBe(Math.floor(originRect.left));
            });
            it('should recalculate and set the last position with recalculateLastPosition()', function () {
                // Push the trigger down so the overlay doesn't have room to open on the bottom.
                originElement.style.bottom = '25px';
                var originRect = originElement.getBoundingClientRect();
                positionStrategy.withPositions([
                    {
                        originX: 'start',
                        originY: 'bottom',
                        overlayX: 'start',
                        overlayY: 'top'
                    },
                    {
                        originX: 'start',
                        originY: 'top',
                        overlayX: 'start',
                        overlayY: 'bottom'
                    }
                ]);
                // This should apply the fallback position, as the original position won't fit.
                attachOverlay({ positionStrategy: positionStrategy });
                // Now make the overlay small enough to fit in the first preferred position.
                overlayRef.overlayElement.style.height = '15px';
                // This should only re-align in the last position, even though the first would fit.
                positionStrategy.reapplyLastPosition();
                var overlayRect = overlayRef.overlayElement.getBoundingClientRect();
                expect(Math.floor(overlayRect.bottom)).toBe(Math.floor(originRect.top), 'Expected overlay to be re-aligned to the trigger in the previous position.');
            });
            it('should default to the initial position, if no positions fit in the viewport', function () {
                // Make the origin element taller than the viewport.
                originElement.style.height = '1000px';
                originElement.style.top = '0';
                var originRect = originElement.getBoundingClientRect();
                positionStrategy.withPositions([{
                        originX: 'start',
                        originY: 'top',
                        overlayX: 'start',
                        overlayY: 'bottom'
                    }]);
                attachOverlay({ positionStrategy: positionStrategy });
                positionStrategy.reapplyLastPosition();
                var overlayRect = overlayRef.overlayElement.getBoundingClientRect();
                expect(Math.floor(overlayRect.bottom)).toBe(Math.floor(originRect.top), 'Expected overlay to be re-aligned to the trigger in the initial position.');
            });
            it('should position a panel properly when rtl', function () {
                var originRect = originElement.getBoundingClientRect();
                positionStrategy.withPositions([{
                        originX: 'start',
                        originY: 'bottom',
                        overlayX: 'start',
                        overlayY: 'top'
                    }]);
                attachOverlay({
                    positionStrategy: positionStrategy,
                    direction: 'rtl'
                });
                // must make the overlay longer than the origin to properly test attachment
                overlayRef.overlayElement.style.width = "500px";
                var overlayRect = overlayRef.overlayElement.getBoundingClientRect();
                expect(Math.floor(overlayRect.top)).toBe(Math.floor(originRect.bottom));
                expect(Math.floor(overlayRect.right)).toBe(Math.floor(originRect.right));
            });
            it('should position a panel with the x offset provided', function () {
                var originRect = originElement.getBoundingClientRect();
                positionStrategy.withPositions([{
                        originX: 'start',
                        originY: 'top',
                        overlayX: 'start',
                        overlayY: 'top',
                        offsetX: 10
                    }]);
                attachOverlay({ positionStrategy: positionStrategy });
                var overlayRect = overlayRef.overlayElement.getBoundingClientRect();
                expect(Math.floor(overlayRect.top)).toBe(Math.floor(originRect.top));
                expect(Math.floor(overlayRect.left)).toBe(Math.floor(originRect.left + 10));
            });
            it('should be able to set the default x offset', function () {
                var originRect = originElement.getBoundingClientRect();
                positionStrategy.withDefaultOffsetX(20).withPositions([{
                        originX: 'start',
                        originY: 'top',
                        overlayX: 'start',
                        overlayY: 'top',
                    }]);
                attachOverlay({ positionStrategy: positionStrategy });
                var overlayRect = overlayRef.overlayElement.getBoundingClientRect();
                expect(Math.floor(overlayRect.top)).toBe(Math.floor(originRect.top));
                expect(Math.floor(overlayRect.left)).toBe(Math.floor(originRect.left + 20));
            });
            it('should have the position offset x take precedence over the default offset x', function () {
                var originRect = originElement.getBoundingClientRect();
                positionStrategy.withDefaultOffsetX(20).withPositions([{
                        originX: 'start',
                        originY: 'top',
                        overlayX: 'start',
                        overlayY: 'top',
                        offsetX: 10
                    }]);
                attachOverlay({ positionStrategy: positionStrategy });
                var overlayRect = overlayRef.overlayElement.getBoundingClientRect();
                expect(Math.floor(overlayRect.top)).toBe(Math.floor(originRect.top));
                expect(Math.floor(overlayRect.left)).toBe(Math.floor(originRect.left + 10));
            });
            it('should position a panel with the y offset provided', function () {
                var originRect = originElement.getBoundingClientRect();
                positionStrategy.withPositions([{
                        originX: 'start',
                        originY: 'top',
                        overlayX: 'start',
                        overlayY: 'top',
                        offsetY: 50
                    }]);
                attachOverlay({ positionStrategy: positionStrategy });
                var overlayRect = overlayRef.overlayElement.getBoundingClientRect();
                expect(Math.floor(overlayRect.top)).toBe(Math.floor(originRect.top + 50));
                expect(Math.floor(overlayRect.left)).toBe(Math.floor(originRect.left));
            });
            it('should be able to set the default y offset', function () {
                var originRect = originElement.getBoundingClientRect();
                positionStrategy.withDefaultOffsetY(60).withPositions([{
                        originX: 'start',
                        originY: 'top',
                        overlayX: 'start',
                        overlayY: 'top',
                    }]);
                attachOverlay({ positionStrategy: positionStrategy });
                var overlayRect = overlayRef.overlayElement.getBoundingClientRect();
                expect(Math.floor(overlayRect.top)).toBe(Math.floor(originRect.top + 60));
                expect(Math.floor(overlayRect.left)).toBe(Math.floor(originRect.left));
            });
            it('should have the position offset y take precedence over the default offset y', function () {
                var originRect = originElement.getBoundingClientRect();
                positionStrategy.withDefaultOffsetY(60).withPositions([{
                        originX: 'start',
                        originY: 'top',
                        overlayX: 'start',
                        overlayY: 'top',
                        offsetY: 50
                    }]);
                attachOverlay({ positionStrategy: positionStrategy });
                var overlayRect = overlayRef.overlayElement.getBoundingClientRect();
                expect(Math.floor(overlayRect.top)).toBe(Math.floor(originRect.top + 50));
                expect(Math.floor(overlayRect.left)).toBe(Math.floor(originRect.left));
            });
            it('should allow for the fallback positions to specify their own offsets', function () {
                originElement.style.bottom = '0';
                originElement.style.left = '50%';
                originElement.style.position = 'fixed';
                var originRect = originElement.getBoundingClientRect();
                positionStrategy.withPositions([
                    {
                        originX: 'start',
                        originY: 'top',
                        overlayX: 'start',
                        overlayY: 'top',
                        offsetX: 50,
                        offsetY: 50
                    },
                    {
                        originX: 'start',
                        originY: 'top',
                        overlayX: 'start',
                        overlayY: 'bottom',
                        offsetX: -100,
                        offsetY: -100
                    }
                ]);
                attachOverlay({ positionStrategy: positionStrategy });
                var overlayRect = overlayRef.overlayElement.getBoundingClientRect();
                expect(Math.floor(overlayRect.bottom)).toBe(Math.floor(originRect.top - 100));
                expect(Math.floor(overlayRect.left)).toBe(Math.floor(originRect.left - 100));
            });
        });
        describe('with transform origin', function () {
            it('should set the proper transform-origin when aligning to start/bottom', function () {
                positionStrategy.withTransformOriginOn('.transform-origin').withPositions([{
                        originX: 'start',
                        originY: 'bottom',
                        overlayX: 'start',
                        overlayY: 'top'
                    }]);
                attachOverlay({ positionStrategy: positionStrategy });
                var target = overlayRef.overlayElement.querySelector('.transform-origin');
                expect(target.style.transformOrigin).toContain('left top');
            });
            it('should set the proper transform-origin when aligning to end/bottom', function () {
                positionStrategy.withTransformOriginOn('.transform-origin').withPositions([{
                        originX: 'end',
                        originY: 'bottom',
                        overlayX: 'end',
                        overlayY: 'top'
                    }]);
                attachOverlay({ positionStrategy: positionStrategy });
                var target = overlayRef.overlayElement.querySelector('.transform-origin');
                expect(target.style.transformOrigin).toContain('right top');
            });
            it('should set the proper transform-origin when centering vertically', function () {
                positionStrategy.withTransformOriginOn('.transform-origin').withPositions([{
                        originX: 'start',
                        originY: 'center',
                        overlayX: 'start',
                        overlayY: 'center'
                    }]);
                attachOverlay({ positionStrategy: positionStrategy });
                var target = overlayRef.overlayElement.querySelector('.transform-origin');
                expect(target.style.transformOrigin).toContain('left center');
            });
            it('should set the proper transform-origin when centering horizontally', function () {
                positionStrategy.withTransformOriginOn('.transform-origin').withPositions([{
                        originX: 'center',
                        originY: 'top',
                        overlayX: 'center',
                        overlayY: 'top'
                    }]);
                attachOverlay({ positionStrategy: positionStrategy });
                var target = overlayRef.overlayElement.querySelector('.transform-origin');
                expect(target.style.transformOrigin).toContain('center top');
            });
            it('should set the proper transform-origin when aligning to start/top', function () {
                positionStrategy.withTransformOriginOn('.transform-origin').withPositions([{
                        originX: 'start',
                        originY: 'top',
                        overlayX: 'start',
                        overlayY: 'bottom'
                    }]);
                attachOverlay({ positionStrategy: positionStrategy });
                var target = overlayRef.overlayElement.querySelector('.transform-origin');
                expect(target.style.transformOrigin).toContain('left bottom');
            });
            it('should set the proper transform-origin when aligning to start/bottom in rtl', function () {
                positionStrategy.withTransformOriginOn('.transform-origin').withPositions([{
                        originX: 'start',
                        originY: 'bottom',
                        overlayX: 'start',
                        overlayY: 'top'
                    }]);
                attachOverlay({ positionStrategy: positionStrategy, direction: 'rtl' });
                var target = overlayRef.overlayElement.querySelector('.transform-origin');
                expect(target.style.transformOrigin).toContain('right top');
            });
            it('should set the proper transform-origin when aligning to end/bottom in rtl', function () {
                positionStrategy.withTransformOriginOn('.transform-origin').withPositions([{
                        originX: 'end',
                        originY: 'bottom',
                        overlayX: 'end',
                        overlayY: 'top'
                    }]);
                attachOverlay({ positionStrategy: positionStrategy, direction: 'rtl' });
                var target = overlayRef.overlayElement.querySelector('.transform-origin');
                expect(target.style.transformOrigin).toContain('left top');
            });
        });
        it('should account for the `offsetX` pushing the overlay out of the screen', function () {
            // Position the element so it would have enough space to fit.
            originElement.style.top = '200px';
            originElement.style.left = '70px';
            var originRect = originElement.getBoundingClientRect();
            positionStrategy.withPositions([
                {
                    originX: 'start',
                    originY: 'top',
                    overlayX: 'end',
                    overlayY: 'top',
                    offsetX: -20 // Add enough of an offset to pull the element out of the viewport.
                },
                {
                    originX: 'end',
                    originY: 'top',
                    overlayX: 'start',
                    overlayY: 'top'
                }
            ]);
            attachOverlay({ positionStrategy: positionStrategy });
            var overlayRect = overlayRef.overlayElement.getBoundingClientRect();
            expect(Math.floor(overlayRect.top)).toBe(Math.floor(originRect.top));
            expect(Math.floor(overlayRect.left)).toBe(Math.floor(originRect.right));
        });
        it('should account for the `offsetY` pushing the overlay out of the screen', function () {
            // Position the overlay so it would normally have enough space to fit.
            originElement.style.bottom = '40px';
            originElement.style.left = '200px';
            var originRect = originElement.getBoundingClientRect();
            positionStrategy.withPositions([
                {
                    originX: 'start',
                    originY: 'bottom',
                    overlayX: 'start',
                    overlayY: 'top',
                    offsetY: 20 // Add enough of an offset for it to go off-screen.
                },
                {
                    originX: 'end',
                    originY: 'top',
                    overlayX: 'end',
                    overlayY: 'bottom'
                }
            ]);
            attachOverlay({ positionStrategy: positionStrategy });
            var overlayRect = overlayRef.overlayElement.getBoundingClientRect();
            expect(Math.floor(overlayRect.bottom)).toBe(Math.floor(originRect.top));
            expect(Math.floor(overlayRect.right)).toBe(Math.floor(originRect.right));
        });
        it('should emit onPositionChange event when the position changes', function () {
            originElement.style.top = '200px';
            originElement.style.right = '25px';
            positionStrategy.withPositions([
                {
                    originX: 'end',
                    originY: 'center',
                    overlayX: 'start',
                    overlayY: 'center'
                },
                {
                    originX: 'start',
                    originY: 'bottom',
                    overlayX: 'end',
                    overlayY: 'top'
                }
            ]);
            var positionChangeHandler = jasmine.createSpy('positionChangeHandler');
            var subscription = positionStrategy.positionChanges.subscribe(positionChangeHandler);
            attachOverlay({ positionStrategy: positionStrategy });
            var latestCall = positionChangeHandler.calls.mostRecent();
            expect(positionChangeHandler).toHaveBeenCalled();
            expect(latestCall.args[0] instanceof index_1.ConnectedOverlayPositionChange)
                .toBe(true, "Expected strategy to emit an instance of ConnectedOverlayPositionChange.");
            // If the strategy is re-applied and the initial position would now fit,
            // the position change event should be emitted again.
            originElement.style.top = '200px';
            originElement.style.left = '200px';
            overlayRef.updatePosition();
            expect(positionChangeHandler).toHaveBeenCalledTimes(2);
            subscription.unsubscribe();
        });
        it('should emit the onPositionChange event even if none of the positions fit', function () {
            originElement.style.bottom = '25px';
            originElement.style.right = '25px';
            positionStrategy.withPositions([
                {
                    originX: 'end',
                    originY: 'bottom',
                    overlayX: 'start',
                    overlayY: 'top'
                },
                {
                    originX: 'start',
                    originY: 'bottom',
                    overlayX: 'end',
                    overlayY: 'top'
                }
            ]);
            var positionChangeHandler = jasmine.createSpy('positionChangeHandler');
            var subscription = positionStrategy.positionChanges.subscribe(positionChangeHandler);
            attachOverlay({ positionStrategy: positionStrategy });
            expect(positionChangeHandler).toHaveBeenCalled();
            subscription.unsubscribe();
        });
        it('should pick the fallback position that shows the largest area of the element', function () {
            originElement.style.top = '200px';
            originElement.style.right = '25px';
            var originRect = originElement.getBoundingClientRect();
            positionStrategy.withPositions([
                {
                    originX: 'end',
                    originY: 'center',
                    overlayX: 'start',
                    overlayY: 'center'
                },
                {
                    originX: 'end',
                    originY: 'top',
                    overlayX: 'start',
                    overlayY: 'bottom'
                },
                {
                    originX: 'end',
                    originY: 'top',
                    overlayX: 'end',
                    overlayY: 'top'
                }
            ]);
            attachOverlay({ positionStrategy: positionStrategy });
            var overlayRect = overlayRef.overlayElement.getBoundingClientRect();
            expect(Math.floor(overlayRect.top)).toBe(Math.floor(originRect.top));
            expect(Math.floor(overlayRect.left)).toBe(Math.floor(originRect.left));
        });
        it('should re-use the preferred position when re-applying while locked in', function () {
            positionStrategy.withPositions([
                {
                    originX: 'end',
                    originY: 'center',
                    overlayX: 'start',
                    overlayY: 'center'
                },
                {
                    originX: 'start',
                    originY: 'bottom',
                    overlayX: 'end',
                    overlayY: 'top'
                }
            ])
                .withLockedPosition();
            var recalcSpy = spyOn(positionStrategy, 'reapplyLastPosition');
            attachOverlay({ positionStrategy: positionStrategy });
            expect(recalcSpy).not.toHaveBeenCalled();
            positionStrategy.apply();
            expect(recalcSpy).toHaveBeenCalled();
        });
        it('should not retain the last preferred position when overriding the positions', function () {
            originElement.style.top = '100px';
            originElement.style.left = '100px';
            var originRect = originElement.getBoundingClientRect();
            positionStrategy.withPositions([{
                    originX: 'start',
                    originY: 'top',
                    overlayX: 'start',
                    overlayY: 'top',
                    offsetX: 10,
                    offsetY: 20
                }]);
            attachOverlay({ positionStrategy: positionStrategy });
            var overlayRect = overlayRef.overlayElement.getBoundingClientRect();
            expect(Math.floor(overlayRect.top)).toBe(Math.floor(originRect.top) + 20);
            expect(Math.floor(overlayRect.left)).toBe(Math.floor(originRect.left) + 10);
            positionStrategy.withPositions([{
                    originX: 'start',
                    originY: 'top',
                    overlayX: 'start',
                    overlayY: 'top',
                    offsetX: 20,
                    offsetY: 40
                }]);
            positionStrategy.reapplyLastPosition();
            overlayRect = overlayRef.overlayElement.getBoundingClientRect();
            expect(Math.floor(overlayRect.top)).toBe(Math.floor(originRect.top) + 40);
            expect(Math.floor(overlayRect.left)).toBe(Math.floor(originRect.left) + 20);
        });
        /**
             * Run all tests for connecting the overlay to the origin such that first preferred
             * position does not go off-screen. We do this because there are several cases where we
             * want to run the exact same tests with different preconditions (e.g., not scroll, scrolled,
             * different element sized, etc.).
             */
        function runSimplePositionTests() {
            it('should position a panel below, left-aligned', function () {
                var originRect = originElement.getBoundingClientRect();
                positionStrategy.withPositions([{
                        originX: 'start',
                        originY: 'bottom',
                        overlayX: 'start',
                        overlayY: 'top'
                    }]);
                attachOverlay({ positionStrategy: positionStrategy });
                var overlayRect = overlayRef.overlayElement.getBoundingClientRect();
                expect(Math.floor(overlayRect.top)).toBe(Math.floor(originRect.bottom));
                expect(Math.floor(overlayRect.left)).toBe(Math.floor(originRect.left));
            });
            it('should position to the right, center aligned vertically', function () {
                var originRect = originElement.getBoundingClientRect();
                var originCenterY = originRect.top + (ORIGIN_HEIGHT / 2);
                positionStrategy.withPositions([{
                        originX: 'end',
                        originY: 'center',
                        overlayX: 'start',
                        overlayY: 'center'
                    }]);
                attachOverlay({ positionStrategy: positionStrategy });
                var overlayRect = overlayRef.overlayElement.getBoundingClientRect();
                expect(Math.floor(overlayRect.top)).toBe(Math.floor(originCenterY - (OVERLAY_HEIGHT / 2)));
                expect(Math.floor(overlayRect.left)).toBe(Math.floor(originRect.right));
            });
            it('should position to the left, below', function () {
                var originRect = originElement.getBoundingClientRect();
                positionStrategy.withPositions([{
                        originX: 'start',
                        originY: 'bottom',
                        overlayX: 'end',
                        overlayY: 'top'
                    }]);
                attachOverlay({ positionStrategy: positionStrategy });
                var overlayRect = overlayRef.overlayElement.getBoundingClientRect();
                expect(Math.floor(overlayRect.top)).toBe(Math.floor(originRect.bottom));
                expect(Math.round(overlayRect.right)).toBe(Math.round(originRect.left));
            });
            it('should position above, right aligned', function () {
                var originRect = originElement.getBoundingClientRect();
                positionStrategy.withPositions([{
                        originX: 'end',
                        originY: 'top',
                        overlayX: 'end',
                        overlayY: 'bottom'
                    }]);
                attachOverlay({ positionStrategy: positionStrategy });
                var overlayRect = overlayRef.overlayElement.getBoundingClientRect();
                expect(Math.round(overlayRect.bottom)).toBe(Math.round(originRect.top));
                expect(Math.round(overlayRect.right)).toBe(Math.round(originRect.right));
            });
            it('should position below, centered', function () {
                var originRect = originElement.getBoundingClientRect();
                var originCenterX = originRect.left + (ORIGIN_WIDTH / 2);
                positionStrategy.withPositions([{
                        originX: 'center',
                        originY: 'bottom',
                        overlayX: 'center',
                        overlayY: 'top'
                    }]);
                attachOverlay({ positionStrategy: positionStrategy });
                var overlayRect = overlayRef.overlayElement.getBoundingClientRect();
                expect(Math.floor(overlayRect.top)).toBe(Math.floor(originRect.bottom));
                expect(Math.floor(overlayRect.left)).toBe(Math.floor(originCenterX - (OVERLAY_WIDTH / 2)));
            });
            it('should center the overlay on the origin', function () {
                var originRect = originElement.getBoundingClientRect();
                positionStrategy.withPositions([{
                        originX: 'center',
                        originY: 'center',
                        overlayX: 'center',
                        overlayY: 'center'
                    }]);
                attachOverlay({ positionStrategy: positionStrategy });
                var overlayRect = overlayRef.overlayElement.getBoundingClientRect();
                expect(Math.floor(overlayRect.top)).toBe(Math.floor(originRect.top));
                expect(Math.floor(overlayRect.left)).toBe(Math.floor(originRect.left));
            });
        }
    });
    describe('with pushing', function () {
        var OVERLAY_HEIGHT = DEFAULT_HEIGHT;
        var OVERLAY_WIDTH = DEFAULT_WIDTH;
        var originElement;
        var positionStrategy;
        beforeEach(function () {
            originElement = createPositionedBlockElement();
            document.body.appendChild(originElement);
            positionStrategy = overlay.position()
                .flexibleConnectedTo(originElement)
                .withFlexibleDimensions(false)
                .withPush();
        });
        afterEach(function () {
            document.body.removeChild(originElement);
        });
        it('should be able to push an overlay into the viewport when it goes out on the right', function () {
            originElement.style.top = '200px';
            originElement.style.right = -OVERLAY_WIDTH / 2 + "px";
            positionStrategy.withPositions([{
                    originX: 'start',
                    originY: 'bottom',
                    overlayX: 'start',
                    overlayY: 'top'
                }]);
            attachOverlay({ positionStrategy: positionStrategy });
            var overlayRect = overlayRef.overlayElement.getBoundingClientRect();
            expect(Math.floor(overlayRect.right)).toBe(viewport.getViewportSize().width);
        });
        it('should be able to push an overlay into the viewport when it goes out on the left', function () {
            originElement.style.top = '200px';
            originElement.style.left = -OVERLAY_WIDTH / 2 + "px";
            positionStrategy.withPositions([{
                    originX: 'start',
                    originY: 'bottom',
                    overlayX: 'start',
                    overlayY: 'top'
                }]);
            attachOverlay({ positionStrategy: positionStrategy });
            var overlayRect = overlayRef.overlayElement.getBoundingClientRect();
            expect(Math.floor(overlayRect.left)).toBe(0);
        });
        it('should be able to push an overlay into the viewport when it goes out on the top', function () {
            originElement.style.top = -OVERLAY_HEIGHT * 2 + "px";
            originElement.style.left = '200px';
            positionStrategy.withPositions([{
                    originX: 'start',
                    originY: 'bottom',
                    overlayX: 'start',
                    overlayY: 'top'
                }]);
            attachOverlay({ positionStrategy: positionStrategy });
            var overlayRect = overlayRef.overlayElement.getBoundingClientRect();
            expect(Math.floor(overlayRect.top)).toBe(0);
        });
        it('should be able to push an overlay into the viewport when it goes out on the bottom', function () {
            originElement.style.bottom = -OVERLAY_HEIGHT / 2 + "px";
            originElement.style.left = '200px';
            positionStrategy.withPositions([{
                    originX: 'start',
                    originY: 'bottom',
                    overlayX: 'start',
                    overlayY: 'top'
                }]);
            attachOverlay({ positionStrategy: positionStrategy });
            var overlayRect = overlayRef.overlayElement.getBoundingClientRect();
            expect(Math.floor(overlayRect.bottom)).toBe(viewport.getViewportSize().height);
        });
        it('should set a margin when pushing the overlay into the viewport horizontally', function () {
            originElement.style.top = '200px';
            originElement.style.left = -OVERLAY_WIDTH / 2 + "px";
            positionStrategy
                .withViewportMargin(15)
                .withPositions([{
                    originX: 'start',
                    originY: 'bottom',
                    overlayX: 'start',
                    overlayY: 'top'
                }]);
            attachOverlay({ positionStrategy: positionStrategy });
            var overlayRect = overlayRef.overlayElement.getBoundingClientRect();
            expect(Math.floor(overlayRect.left)).toBe(15);
        });
        it('should set a margin when pushing the overlay into the viewport vertically', function () {
            positionStrategy.withViewportMargin(15);
            originElement.style.top = -OVERLAY_HEIGHT * 2 + "px";
            originElement.style.left = '200px';
            positionStrategy
                .withViewportMargin(15)
                .withPositions([{
                    originX: 'start',
                    originY: 'bottom',
                    overlayX: 'start',
                    overlayY: 'top'
                }]);
            attachOverlay({ positionStrategy: positionStrategy });
            var overlayRect = overlayRef.overlayElement.getBoundingClientRect();
            expect(Math.floor(overlayRect.top)).toBe(15);
        });
    });
    describe('with flexible dimensions', function () {
        var OVERLAY_HEIGHT = DEFAULT_HEIGHT;
        var OVERLAY_WIDTH = DEFAULT_WIDTH;
        var originElement;
        var positionStrategy;
        beforeEach(function () {
            originElement = createPositionedBlockElement();
            document.body.appendChild(originElement);
            positionStrategy = overlay.position().flexibleConnectedTo(originElement);
        });
        afterEach(function () {
            document.body.removeChild(originElement);
        });
        it('should align the overlay to `flex-start` when the content is flowing to the right', function () {
            positionStrategy
                .withFlexibleDimensions()
                .withPush(false)
                .withPositions([{
                    overlayY: 'top',
                    overlayX: 'start',
                    originY: 'bottom',
                    originX: 'start'
                }]);
            attachOverlay({ positionStrategy: positionStrategy });
            expect(overlayRef.hostElement.style.alignItems).toBe('flex-start');
        });
        it('should align the overlay to `flex-end` when the content is flowing to the left', function () {
            positionStrategy
                .withFlexibleDimensions()
                .withPush(false)
                .withPositions([{
                    overlayY: 'top',
                    overlayX: 'end',
                    originY: 'bottom',
                    originX: 'end'
                }]);
            attachOverlay({ positionStrategy: positionStrategy });
            expect(overlayRef.hostElement.style.alignItems).toBe('flex-end');
        });
        it('should align the overlay to `center` when the content is centered', function () {
            positionStrategy
                .withFlexibleDimensions()
                .withPush(false)
                .withPositions([{
                    overlayY: 'top',
                    overlayX: 'center',
                    originY: 'bottom',
                    originX: 'center'
                }]);
            attachOverlay({ positionStrategy: positionStrategy });
            expect(overlayRef.hostElement.style.alignItems).toBe('center');
        });
        it('should support offsets when centering', function () {
            originElement.style.top = '200px';
            originElement.style.left = '200px';
            positionStrategy
                .withFlexibleDimensions()
                .withPush(false)
                .withPositions([{
                    overlayY: 'center',
                    overlayX: 'center',
                    originY: 'center',
                    originX: 'center',
                    offsetY: 20,
                    offsetX: -15
                }]);
            attachOverlay({ positionStrategy: positionStrategy });
            var originRect = originElement.getBoundingClientRect();
            var originCenterX = originRect.left + (DEFAULT_WIDTH / 2);
            var originCenterY = originRect.top + (DEFAULT_HEIGHT / 2);
            var overlayRect = overlayRef.overlayElement.getBoundingClientRect();
            var overlayCenterY = overlayRect.top + (OVERLAY_HEIGHT / 2);
            var overlayCenterX = overlayRect.left + (OVERLAY_WIDTH / 2);
            expect(overlayRef.overlayElement.style.transform)
                .toBe('translateX(-15px) translateY(20px)');
            expect(Math.floor(overlayCenterY)).toBe(Math.floor(originCenterY) + 20);
            expect(Math.floor(overlayCenterX)).toBe(Math.floor(originCenterX) - 15);
        });
        it('should become scrollable when it hits the viewport edge with a flexible height', function () {
            originElement.style.left = '200px';
            originElement.style.bottom = OVERLAY_HEIGHT - 10 + "px";
            positionStrategy
                .withFlexibleDimensions()
                .withPush(false)
                .withPositions([{
                    overlayY: 'top',
                    overlayX: 'start',
                    originY: 'bottom',
                    originX: 'start'
                }]);
            attachOverlay({ positionStrategy: positionStrategy });
            var overlayRect = overlayRef.overlayElement.getBoundingClientRect();
            expect(Math.floor(overlayRect.height)).toBe(OVERLAY_HEIGHT - 10);
            expect(Math.floor(overlayRect.bottom)).toBe(viewport.getViewportSize().height);
        });
        it('should become scrollable when it hits the viewport edge with a flexible width', function () {
            originElement.style.top = '200px';
            originElement.style.right = '-20px';
            positionStrategy
                .withFlexibleDimensions()
                .withPush(false)
                .withPositions([{
                    overlayY: 'top',
                    overlayX: 'start',
                    originY: 'bottom',
                    originX: 'start'
                }]);
            attachOverlay({ positionStrategy: positionStrategy });
            var overlayRect = overlayRef.overlayElement.getBoundingClientRect();
            expect(Math.floor(overlayRect.width)).toBe(OVERLAY_WIDTH - 20);
            expect(Math.floor(overlayRect.right)).toBe(viewport.getViewportSize().width);
        });
        it('should not collapse the height if the size is less than the minHeight', function () {
            originElement.style.left = '200px';
            originElement.style.bottom = OVERLAY_HEIGHT - 10 + "px";
            positionStrategy
                .withFlexibleDimensions()
                .withPositions([{
                    overlayY: 'top',
                    overlayX: 'start',
                    originY: 'bottom',
                    originX: 'start'
                }]);
            attachOverlay({
                positionStrategy: positionStrategy,
                minHeight: OVERLAY_HEIGHT - 5
            });
            var overlayRect = overlayRef.overlayElement.getBoundingClientRect();
            expect(Math.floor(overlayRect.height)).toBe(OVERLAY_HEIGHT);
        });
        it('should not collapse the width if the size is less than the minWidth', function () {
            originElement.style.top = '200px';
            originElement.style.right = '-20px';
            positionStrategy
                .withFlexibleDimensions()
                .withPositions([{
                    overlayY: 'top',
                    overlayX: 'start',
                    originY: 'bottom',
                    originX: 'start'
                }]);
            attachOverlay({
                minWidth: OVERLAY_WIDTH - 10,
                positionStrategy: positionStrategy
            });
            var overlayRect = overlayRef.overlayElement.getBoundingClientRect();
            expect(Math.floor(overlayRect.width)).toBe(OVERLAY_WIDTH);
        });
        it('should take `weight` into account when determining which position to pick', function () {
            originElement.style.top = '200px';
            originElement.style.right = '25px';
            positionStrategy
                .withFlexibleDimensions()
                .withPush(false)
                .withPositions([
                {
                    originX: 'end',
                    originY: 'top',
                    overlayX: 'start',
                    overlayY: 'bottom',
                    weight: 3
                },
                {
                    originX: 'end',
                    originY: 'center',
                    overlayX: 'start',
                    overlayY: 'center'
                }
            ]);
            attachOverlay({ positionStrategy: positionStrategy });
            var originRect = originElement.getBoundingClientRect();
            var overlayRect = overlayRef.overlayElement.getBoundingClientRect();
            expect(Math.floor(overlayRect.bottom)).toBe(Math.floor(originRect.top));
            expect(Math.floor(overlayRect.left)).toBe(Math.floor(originRect.right));
        });
        it('should be able to opt-in to having the overlay grow after it was opened', function () {
            originElement.style.left = '200px';
            originElement.style.bottom = OVERLAY_HEIGHT - 10 + "px";
            positionStrategy
                .withFlexibleDimensions()
                .withPush(false)
                .withGrowAfterOpen()
                .withPositions([{
                    overlayY: 'top',
                    overlayX: 'start',
                    originY: 'bottom',
                    originX: 'start'
                }]);
            attachOverlay({ positionStrategy: positionStrategy });
            var overlayRect = overlayRef.overlayElement.getBoundingClientRect();
            // The overlay should be scrollable, because it hit the viewport edge.
            expect(Math.floor(overlayRect.height)).toBe(OVERLAY_HEIGHT - 10);
            originElement.style.bottom = '200px';
            overlayRef.updatePosition();
            overlayRect = overlayRef.overlayElement.getBoundingClientRect();
            // The overlay should be back to full height.
            expect(Math.floor(overlayRect.height)).toBe(OVERLAY_HEIGHT);
        });
        it('should calculate the `bottom` value correctly with upward-flowing content ' +
            'and a scrolled page', function () {
            var veryLargeElement = document.createElement('div');
            originElement.style.left = '200px';
            originElement.style.top = "200px";
            veryLargeElement.style.width = '100%';
            veryLargeElement.style.height = '2000px';
            document.body.appendChild(veryLargeElement);
            window.scroll(0, 50);
            positionStrategy
                .withFlexibleDimensions()
                .withPush(false)
                .withPositions([{
                    overlayY: 'bottom',
                    overlayX: 'start',
                    originY: 'bottom',
                    originX: 'start'
                }]);
            attachOverlay({ positionStrategy: positionStrategy });
            var overlayRect = overlayRef.overlayElement.getBoundingClientRect();
            var originRect = originElement.getBoundingClientRect();
            expect(Math.floor(overlayRect.bottom)).toBe(Math.floor(originRect.bottom));
            window.scroll(0, 0);
            document.body.removeChild(veryLargeElement);
        });
        it('should set the proper styles when the `bottom` value is exactly zero', function () {
            originElement.style.position = 'fixed';
            originElement.style.bottom = '0';
            originElement.style.left = '200px';
            positionStrategy
                .withFlexibleDimensions()
                .withPush(false)
                .withPositions([{
                    overlayY: 'bottom',
                    overlayX: 'start',
                    originY: 'bottom',
                    originX: 'start'
                }]);
            attachOverlay({ positionStrategy: positionStrategy });
            var boundingBox = overlayContainer
                .getContainerElement()
                .querySelector('.cdk-overlay-connected-position-bounding-box');
            // Ensure that `0px` is set explicitly, rather than the
            // property being left blank due to zero being falsy.
            expect(boundingBox.style.bottom).toBe('0px');
        });
        it('should set the proper styles when the `top` value is exactly zero', function () {
            originElement.style.position = 'fixed';
            originElement.style.top = '0';
            originElement.style.left = '200px';
            positionStrategy
                .withFlexibleDimensions()
                .withPush(false)
                .withPositions([{
                    overlayY: 'top',
                    overlayX: 'start',
                    originY: 'top',
                    originX: 'start'
                }]);
            attachOverlay({ positionStrategy: positionStrategy });
            var boundingBox = overlayContainer
                .getContainerElement()
                .querySelector('.cdk-overlay-connected-position-bounding-box');
            // Ensure that `0px` is set explicitly, rather than the
            // property being left blank due to zero being falsy.
            expect(boundingBox.style.top).toBe('0px');
        });
        it('should set the proper styles when the `left` value is exactly zero', function () {
            originElement.style.position = 'fixed';
            originElement.style.left = '0';
            originElement.style.top = '200px';
            positionStrategy
                .withFlexibleDimensions()
                .withPush(false)
                .withPositions([{
                    overlayY: 'top',
                    overlayX: 'start',
                    originY: 'top',
                    originX: 'start'
                }]);
            attachOverlay({ positionStrategy: positionStrategy });
            var boundingBox = overlayContainer
                .getContainerElement()
                .querySelector('.cdk-overlay-connected-position-bounding-box');
            // Ensure that `0px` is set explicitly, rather than the
            // property being left blank due to zero being falsy.
            expect(boundingBox.style.left).toBe('0px');
        });
        it('should set the proper styles when the `right` value is exactly zero', function () {
            originElement.style.position = 'fixed';
            originElement.style.right = '0';
            originElement.style.top = '200px';
            positionStrategy
                .withFlexibleDimensions()
                .withPush(false)
                .withPositions([{
                    overlayY: 'top',
                    overlayX: 'end',
                    originY: 'top',
                    originX: 'end'
                }]);
            attachOverlay({ positionStrategy: positionStrategy });
            var boundingBox = overlayContainer
                .getContainerElement()
                .querySelector('.cdk-overlay-connected-position-bounding-box');
            // Ensure that `0px` is set explicitly, rather than the
            // property being left blank due to zero being falsy.
            expect(boundingBox.style.right).toBe('0px');
        });
        it('should calculate the bottom offset correctly with a viewport margin', function () {
            var viewportMargin = 5;
            originElement.style.top = OVERLAY_HEIGHT / 2 + "px";
            originElement.style.right = '200px';
            positionStrategy
                .withFlexibleDimensions()
                .withPush(false)
                .withViewportMargin(viewportMargin)
                .withPositions([
                {
                    originX: 'start',
                    originY: 'top',
                    overlayX: 'start',
                    overlayY: 'bottom'
                }
            ]);
            attachOverlay({ positionStrategy: positionStrategy });
            var originRect = originElement.getBoundingClientRect();
            var overlayRect = overlayRef.overlayElement.getBoundingClientRect();
            expect(Math.floor(overlayRect.bottom)).toBe(Math.floor(originRect.top));
            expect(Math.floor(overlayRect.top)).toBe(viewportMargin);
        });
    });
    describe('onPositionChange with scrollable view properties', function () {
        var scrollable;
        var positionChangeHandler;
        var onPositionChangeSubscription;
        beforeEach(function () {
            // Set up the origin
            var originElement = createBlockElement();
            originElement.style.margin = '0 1000px 1000px 0'; // Added so that the container scrolls
            // Create a scrollable container and put the origin inside
            scrollable = createOverflowContainerElement();
            document.body.appendChild(scrollable);
            scrollable.appendChild(originElement);
            // Create a strategy with knowledge of the scrollable container
            var strategy = overlay.position()
                .flexibleConnectedTo(originElement)
                .withPush(false)
                .withPositions([{
                    originX: 'start',
                    originY: 'bottom',
                    overlayX: 'start',
                    overlayY: 'top'
                }]);
            strategy.withScrollableContainers([
                new scrolling_1.CdkScrollable(new core_1.ElementRef(scrollable), (null), (null))
            ]);
            positionChangeHandler = jasmine.createSpy('positionChange handler');
            onPositionChangeSubscription = strategy.positionChanges
                .pipe(operators_1.map(function (event) { return event.scrollableViewProperties; }))
                .subscribe(positionChangeHandler);
            attachOverlay({ positionStrategy: strategy });
        });
        afterEach(function () {
            onPositionChangeSubscription.unsubscribe();
            document.body.removeChild(scrollable);
        });
        it('should not have origin or overlay clipped or out of view without scroll', function () {
            expect(positionChangeHandler).toHaveBeenCalledWith(jasmine.objectContaining({
                isOriginClipped: false,
                isOriginOutsideView: false,
                isOverlayClipped: false,
                isOverlayOutsideView: false
            }));
        });
        it('should evaluate if origin is clipped if scrolled slightly down', function () {
            scrollable.scrollTop = 10; // Clip the origin by 10 pixels
            overlayRef.updatePosition();
            expect(positionChangeHandler).toHaveBeenCalledWith(jasmine.objectContaining({
                isOriginClipped: true,
                isOriginOutsideView: false,
                isOverlayClipped: false,
                isOverlayOutsideView: false
            }));
        });
        it('should evaluate if origin is out of view and overlay is clipped if scrolled enough', function () {
            scrollable.scrollTop = 31; // Origin is 30 pixels, move out of view and clip the overlay 1px
            overlayRef.updatePosition();
            expect(positionChangeHandler).toHaveBeenCalledWith(jasmine.objectContaining({
                isOriginClipped: true,
                isOriginOutsideView: true,
                isOverlayClipped: true,
                isOverlayOutsideView: false
            }));
        });
        it('should evaluate the overlay and origin are both out of the view', function () {
            scrollable.scrollTop = 61; // Scroll by overlay height + origin height + 1px
            overlayRef.updatePosition();
            expect(positionChangeHandler).toHaveBeenCalledWith(jasmine.objectContaining({
                isOriginClipped: true,
                isOriginOutsideView: true,
                isOverlayClipped: true,
                isOverlayOutsideView: true
            }));
        });
    });
    describe('positioning properties', function () {
        var originElement;
        var positionStrategy;
        beforeEach(function () {
            originElement = createPositionedBlockElement();
            document.body.appendChild(originElement);
            positionStrategy = overlay.position().flexibleConnectedTo(originElement);
        });
        afterEach(function () {
            document.body.removeChild(originElement);
        });
        describe('in ltr', function () {
            it('should use `left` when positioning an element at the start', function () {
                positionStrategy.withPositions([{
                        originX: 'start',
                        originY: 'top',
                        overlayX: 'start',
                        overlayY: 'top'
                    }]);
                attachOverlay({ positionStrategy: positionStrategy });
                expect(overlayRef.hostElement.style.left).toBeTruthy();
                expect(overlayRef.hostElement.style.right).toBeFalsy();
            });
            it('should use `right` when positioning an element at the end', function () {
                positionStrategy.withPositions([{
                        originX: 'end',
                        originY: 'top',
                        overlayX: 'end',
                        overlayY: 'top'
                    }]);
                attachOverlay({ positionStrategy: positionStrategy });
                expect(overlayRef.hostElement.style.right).toBeTruthy();
                expect(overlayRef.hostElement.style.left).toBeFalsy();
            });
        });
        describe('in rtl', function () {
            it('should use `right` when positioning an element at the start', function () {
                positionStrategy.withPositions([{
                        originX: 'start',
                        originY: 'top',
                        overlayX: 'start',
                        overlayY: 'top'
                    }]);
                attachOverlay({
                    positionStrategy: positionStrategy,
                    direction: 'rtl'
                });
                expect(overlayRef.hostElement.style.right).toBeTruthy();
                expect(overlayRef.hostElement.style.left).toBeFalsy();
            });
            it('should use `left` when positioning an element at the end', function () {
                positionStrategy.withPositions([{
                        originX: 'end',
                        originY: 'top',
                        overlayX: 'end',
                        overlayY: 'top'
                    }]);
                attachOverlay({ positionStrategy: positionStrategy, direction: 'rtl' });
                expect(overlayRef.hostElement.style.left).toBeTruthy();
                expect(overlayRef.hostElement.style.right).toBeFalsy();
            });
        });
        describe('vertical', function () {
            it('should use `top` when positioning at element along the top', function () {
                positionStrategy.withPositions([{
                        originX: 'start',
                        originY: 'top',
                        overlayX: 'start',
                        overlayY: 'top'
                    }]);
                attachOverlay({ positionStrategy: positionStrategy });
                expect(overlayRef.hostElement.style.top).toBeTruthy();
                expect(overlayRef.hostElement.style.bottom).toBeFalsy();
            });
            it('should use `bottom` when positioning at element along the bottom', function () {
                positionStrategy.withPositions([{
                        originX: 'start',
                        originY: 'bottom',
                        overlayX: 'start',
                        overlayY: 'bottom'
                    }]);
                attachOverlay({ positionStrategy: positionStrategy });
                expect(overlayRef.hostElement.style.bottom).toBeTruthy();
                expect(overlayRef.hostElement.style.top).toBeFalsy();
            });
        });
    });
    describe('validations', function () {
        var originElement;
        var positionStrategy;
        beforeEach(function () {
            originElement = createPositionedBlockElement();
            document.body.appendChild(originElement);
            positionStrategy = overlay.position().flexibleConnectedTo(originElement);
        });
        afterEach(function () {
            document.body.removeChild(originElement);
            positionStrategy.dispose();
        });
        it('should throw when attaching without any positions', function () {
            expect(function () { return positionStrategy.withPositions([]); }).toThrow();
        });
        it('should throw when passing in something that is missing a connection point', function () {
            expect(function () {
                positionStrategy.withPositions([{
                        originY: 'top',
                        overlayX: 'start',
                        overlayY: 'top'
                    }]);
            }).toThrow();
        });
        it('should throw when passing in something that has an invalid X position', function () {
            expect(function () {
                positionStrategy.withPositions([{
                        originX: 'left',
                        originY: 'top',
                        overlayX: 'left',
                        overlayY: 'top'
                    }]);
            }).toThrow();
        });
        it('should throw when passing in something that has an invalid Y position', function () {
            expect(function () {
                positionStrategy.withPositions([{
                        originX: 'start',
                        originY: 'middle',
                        overlayX: 'start',
                        overlayY: 'middle'
                    }]);
            }).toThrow();
        });
    });
});
/** Creates an absolutely positioned, display: block element with a default size. */
function createPositionedBlockElement() {
    var element = createBlockElement();
    element.style.position = 'absolute';
    return element;
}
/** Creates a block element with a default size. */
function createBlockElement() {
    var element = document.createElement('div');
    element.style.width = DEFAULT_WIDTH + "px";
    element.style.height = DEFAULT_HEIGHT + "px";
    element.style.backgroundColor = 'rebeccapurple';
    element.style.zIndex = '100';
    return element;
}
/** Creates an overflow container with a set height and width with margin. */
function createOverflowContainerElement() {
    var element = document.createElement('div');
    element.style.position = 'relative';
    element.style.overflow = 'auto';
    element.style.height = '300px';
    element.style.width = '300px';
    element.style.margin = '100px';
    return element;
}
var TestOverlay = /** @class */ (function () {
    function TestOverlay() {
    }
    TestOverlay.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <div\n      class=\"transform-origin\"\n      style=\"width: " + DEFAULT_WIDTH + "px; height: " + DEFAULT_HEIGHT + "px;\"></div>\n  "
                },] },
    ];
    return TestOverlay;
}());
var OverlayTestModule = /** @class */ (function () {
    function OverlayTestModule() {
    }
    OverlayTestModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [index_1.OverlayModule, portal_1.PortalModule],
                    exports: [TestOverlay],
                    declarations: [TestOverlay],
                    entryComponents: [TestOverlay],
                },] },
    ];
    return OverlayTestModule;
}());
//# sourceMappingURL=flexible-connected-position-strategy.spec.js.map