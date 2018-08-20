"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var testing_1 = require("@angular/core/testing");
var bidi_1 = require("@angular/cdk/bidi");
var testing_2 = require("@angular/cdk/testing");
var keycodes_1 = require("@angular/cdk/keycodes");
var index_1 = require("./index");
var overlay_container_1 = require("./overlay-container");
var connected_position_1 = require("./position/connected-position");
var flexible_connected_position_strategy_1 = require("./position/flexible-connected-position-strategy");
describe('Overlay directives', function () {
    var overlayContainer;
    var overlayContainerElement;
    var fixture;
    var dir;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [index_1.OverlayModule],
            declarations: [ConnectedOverlayDirectiveTest, ConnectedOverlayPropertyInitOrder],
            providers: [{ provide: bidi_1.Directionality, useFactory: function () { return dir = { value: 'ltr' }; } }],
        });
    });
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(ConnectedOverlayDirectiveTest);
        fixture.detectChanges();
    });
    beforeEach(testing_1.inject([overlay_container_1.OverlayContainer], function (oc) {
        overlayContainer = oc;
        overlayContainerElement = oc.getContainerElement();
    }));
    afterEach(function () {
        overlayContainer.ngOnDestroy();
    });
    /** Returns the current open overlay pane element. */
    function getPaneElement() {
        return overlayContainerElement.querySelector('.cdk-overlay-pane');
    }
    it("should attach the overlay based on the open property", function () {
        fixture.componentInstance.isOpen = true;
        fixture.detectChanges();
        expect(overlayContainerElement.textContent).toContain('Menu content');
        fixture.componentInstance.isOpen = false;
        fixture.detectChanges();
        expect(overlayContainerElement.textContent).toBe('');
    });
    it('should destroy the overlay when the directive is destroyed', function () {
        fixture.componentInstance.isOpen = true;
        fixture.detectChanges();
        fixture.destroy();
        expect(overlayContainerElement.textContent.trim()).toBe('');
        expect(getPaneElement())
            .toBeFalsy('Expected the overlay pane element to be removed when disposed.');
    });
    it('should use a connected position strategy with a default set of positions', function () {
        fixture.componentInstance.isOpen = true;
        fixture.detectChanges();
        var testComponent = fixture.debugElement.componentInstance;
        var overlayDirective = testComponent.connectedOverlayDirective;
        var strategy = overlayDirective.overlayRef.getConfig().positionStrategy;
        expect(strategy instanceof flexible_connected_position_strategy_1.FlexibleConnectedPositionStrategy).toBe(true);
        expect(strategy.positions.length).toBeGreaterThan(0);
    });
    it('should set and update the `dir` attribute', function () {
        dir.value = 'rtl';
        fixture.componentInstance.isOpen = true;
        fixture.detectChanges();
        var boundingBox = (overlayContainerElement.querySelector('.cdk-overlay-connected-position-bounding-box'));
        expect(boundingBox.getAttribute('dir')).toBe('rtl');
        fixture.componentInstance.isOpen = false;
        fixture.detectChanges();
        dir.value = 'ltr';
        fixture.componentInstance.isOpen = true;
        fixture.detectChanges();
        boundingBox =
            (overlayContainerElement.querySelector('.cdk-overlay-connected-position-bounding-box'));
        expect(boundingBox.getAttribute('dir')).toBe('ltr');
    });
    it('should close when pressing escape', function () {
        fixture.componentInstance.isOpen = true;
        fixture.detectChanges();
        testing_2.dispatchKeyboardEvent(document.body, 'keydown', keycodes_1.ESCAPE);
        fixture.detectChanges();
        expect(overlayContainerElement.textContent.trim()).toBe('', 'Expected overlay to have been detached.');
    });
    it('should not depend on the order in which the `origin` and `open` are set', testing_1.async(function () {
        fixture.destroy();
        var propOrderFixture = testing_1.TestBed.createComponent(ConnectedOverlayPropertyInitOrder);
        propOrderFixture.detectChanges();
        var overlayDirective = propOrderFixture.componentInstance.connectedOverlayDirective;
        expect(function () {
            overlayDirective.open = true;
            overlayDirective.origin = propOrderFixture.componentInstance.trigger;
            propOrderFixture.detectChanges();
        }).not.toThrow();
    }));
    describe('inputs', function () {
        it('should set the width', function () {
            fixture.componentInstance.width = 250;
            fixture.componentInstance.isOpen = true;
            fixture.detectChanges();
            var pane = overlayContainerElement.querySelector('.cdk-overlay-pane');
            expect(pane.style.width).toEqual('250px');
            fixture.componentInstance.isOpen = false;
            fixture.detectChanges();
            fixture.componentInstance.width = 500;
            fixture.componentInstance.isOpen = true;
            fixture.detectChanges();
            expect(pane.style.width).toEqual('500px');
        });
        it('should set the height', function () {
            fixture.componentInstance.height = '100vh';
            fixture.componentInstance.isOpen = true;
            fixture.detectChanges();
            var pane = overlayContainerElement.querySelector('.cdk-overlay-pane');
            expect(pane.style.height).toEqual('100vh');
            fixture.componentInstance.isOpen = false;
            fixture.detectChanges();
            fixture.componentInstance.height = '50vh';
            fixture.componentInstance.isOpen = true;
            fixture.detectChanges();
            expect(pane.style.height).toEqual('50vh');
        });
        it('should set the min width', function () {
            fixture.componentInstance.minWidth = 250;
            fixture.componentInstance.isOpen = true;
            fixture.detectChanges();
            var pane = overlayContainerElement.querySelector('.cdk-overlay-pane');
            expect(pane.style.minWidth).toEqual('250px');
            fixture.componentInstance.isOpen = false;
            fixture.detectChanges();
            fixture.componentInstance.minWidth = 500;
            fixture.componentInstance.isOpen = true;
            fixture.detectChanges();
            expect(pane.style.minWidth).toEqual('500px');
        });
        it('should set the min height', function () {
            fixture.componentInstance.minHeight = '500px';
            fixture.componentInstance.isOpen = true;
            fixture.detectChanges();
            var pane = overlayContainerElement.querySelector('.cdk-overlay-pane');
            expect(pane.style.minHeight).toEqual('500px');
            fixture.componentInstance.isOpen = false;
            fixture.detectChanges();
            fixture.componentInstance.minHeight = '250px';
            fixture.componentInstance.isOpen = true;
            fixture.detectChanges();
            expect(pane.style.minHeight).toEqual('250px');
        });
        it('should create the backdrop if designated', function () {
            fixture.componentInstance.hasBackdrop = true;
            fixture.componentInstance.isOpen = true;
            fixture.detectChanges();
            var backdrop = overlayContainerElement.querySelector('.cdk-overlay-backdrop');
            expect(backdrop).toBeTruthy();
        });
        it('should not create the backdrop by default', function () {
            fixture.componentInstance.isOpen = true;
            fixture.detectChanges();
            var backdrop = overlayContainerElement.querySelector('.cdk-overlay-backdrop');
            expect(backdrop).toBeNull();
        });
        it('should set the custom backdrop class', function () {
            fixture.componentInstance.hasBackdrop = true;
            fixture.componentInstance.isOpen = true;
            fixture.detectChanges();
            var backdrop = overlayContainerElement.querySelector('.cdk-overlay-backdrop');
            expect(backdrop.classList).toContain('mat-test-class');
        });
        it('should set the offsetX', function () {
            fixture.componentInstance.offsetX = 5;
            fixture.componentInstance.isOpen = true;
            fixture.detectChanges();
            var pane = overlayContainerElement.querySelector('.cdk-overlay-pane');
            expect(pane.style.transform).toContain('translateX(5px)');
            fixture.componentInstance.isOpen = false;
            fixture.detectChanges();
            fixture.componentInstance.offsetX = 15;
            fixture.componentInstance.isOpen = true;
            fixture.detectChanges();
            expect(pane.style.transform).toContain('translateX(15px)');
        });
        it('should set the offsetY', function () {
            var trigger = fixture.debugElement.query(platform_browser_1.By.css('button')).nativeElement;
            trigger.style.position = 'absolute';
            trigger.style.top = '30px';
            trigger.style.height = '20px';
            fixture.componentInstance.offsetY = 45;
            fixture.componentInstance.isOpen = true;
            fixture.detectChanges();
            var pane = overlayContainerElement.querySelector('.cdk-overlay-pane');
            expect(pane.style.transform).toContain('translateY(45px)');
            fixture.componentInstance.isOpen = false;
            fixture.detectChanges();
            fixture.componentInstance.offsetY = 55;
            fixture.componentInstance.isOpen = true;
            fixture.detectChanges();
            expect(pane.style.transform).toContain('translateY(55px)');
        });
        it('should be able to update the origin after init', function () {
            var testComponent = fixture.componentInstance;
            testComponent.isOpen = true;
            fixture.detectChanges();
            var triggerRect = fixture.nativeElement.querySelector('#trigger').getBoundingClientRect();
            var overlayRect = getPaneElement().getBoundingClientRect();
            expect(Math.floor(triggerRect.left)).toBe(Math.floor(overlayRect.left));
            expect(Math.floor(triggerRect.bottom)).toBe(Math.floor(overlayRect.top));
            testComponent.triggerOverride = testComponent.otherTrigger;
            fixture.detectChanges();
            triggerRect = fixture.nativeElement.querySelector('#otherTrigger').getBoundingClientRect();
            overlayRect = getPaneElement().getBoundingClientRect();
            expect(Math.floor(triggerRect.left)).toBe(Math.floor(overlayRect.left));
            expect(Math.floor(triggerRect.bottom)).toBe(Math.floor(overlayRect.top));
        });
        it('should update the positions if they change after init', function () {
            var trigger = fixture.nativeElement.querySelector('#trigger');
            trigger.style.position = 'fixed';
            trigger.style.top = '200px';
            trigger.style.left = '200px';
            fixture.componentInstance.isOpen = true;
            fixture.detectChanges();
            var triggerRect = trigger.getBoundingClientRect();
            var overlayRect = getPaneElement().getBoundingClientRect();
            expect(Math.floor(triggerRect.left)).toBe(Math.floor(overlayRect.left));
            expect(Math.floor(triggerRect.bottom)).toBe(Math.floor(overlayRect.top));
            fixture.componentInstance.isOpen = false;
            fixture.detectChanges();
            fixture.componentInstance.positionOverrides = [{
                    originX: 'end',
                    originY: 'bottom',
                    overlayX: 'start',
                    overlayY: 'top',
                    // TODO(jelbourn) figure out why, when compiling with bazel, these offsets are required.
                    offsetX: 0,
                    offsetY: 0,
                }];
            fixture.componentInstance.isOpen = true;
            fixture.detectChanges();
            triggerRect = trigger.getBoundingClientRect();
            overlayRect = getPaneElement().getBoundingClientRect();
            expect(Math.floor(triggerRect.right)).toBe(Math.floor(overlayRect.left));
            expect(Math.floor(triggerRect.bottom)).toBe(Math.floor(overlayRect.top));
        });
        it('should take the offset from the position', function () {
            var trigger = fixture.nativeElement.querySelector('#trigger');
            trigger.style.position = 'fixed';
            trigger.style.top = '200px';
            trigger.style.left = '200px';
            fixture.componentInstance.positionOverrides = [{
                    originX: 'start',
                    originY: 'top',
                    overlayX: 'start',
                    overlayY: 'top',
                    offsetX: 20,
                    offsetY: 10
                }];
            fixture.componentInstance.isOpen = true;
            fixture.detectChanges();
            var triggerRect = trigger.getBoundingClientRect();
            var overlayRect = getPaneElement().getBoundingClientRect();
            expect(Math.floor(overlayRect.top)).toBe(Math.floor(triggerRect.top) + 10);
            expect(Math.floor(overlayRect.left)).toBe(Math.floor(triggerRect.left) + 20);
        });
        it('should be able to set the viewport margin', function () {
            expect(fixture.componentInstance.connectedOverlayDirective.viewportMargin).not.toBe(10);
            fixture.componentInstance.viewportMargin = 10;
            fixture.detectChanges();
            expect(fixture.componentInstance.connectedOverlayDirective.viewportMargin).toBe(10);
        });
        it('should allow for flexible positioning to be enabled', function () {
            expect(fixture.componentInstance.connectedOverlayDirective.flexibleDiemsions).not.toBe(true);
            fixture.componentInstance.flexibleDimensions = true;
            fixture.detectChanges();
            expect(fixture.componentInstance.connectedOverlayDirective.flexibleDiemsions).toBe(true);
        });
        it('should allow for growing after open to be enabled', function () {
            expect(fixture.componentInstance.connectedOverlayDirective.growAfterOpen).not.toBe(true);
            fixture.componentInstance.growAfterOpen = true;
            fixture.detectChanges();
            expect(fixture.componentInstance.connectedOverlayDirective.growAfterOpen).toBe(true);
        });
        it('should allow for pushing to be enabled', function () {
            expect(fixture.componentInstance.connectedOverlayDirective.push).not.toBe(true);
            fixture.componentInstance.push = true;
            fixture.detectChanges();
            expect(fixture.componentInstance.connectedOverlayDirective.push).toBe(true);
        });
    });
    describe('outputs', function () {
        it('should emit backdropClick appropriately', function () {
            fixture.componentInstance.hasBackdrop = true;
            fixture.componentInstance.isOpen = true;
            fixture.detectChanges();
            var backdrop = overlayContainerElement.querySelector('.cdk-overlay-backdrop');
            backdrop.click();
            fixture.detectChanges();
            expect(fixture.componentInstance.backdropClickHandler)
                .toHaveBeenCalledWith(jasmine.any(MouseEvent));
        });
        it('should emit positionChange appropriately', function () {
            expect(fixture.componentInstance.positionChangeHandler).not.toHaveBeenCalled();
            fixture.componentInstance.isOpen = true;
            fixture.detectChanges();
            expect(fixture.componentInstance.positionChangeHandler).toHaveBeenCalled();
            var latestCall = fixture.componentInstance.positionChangeHandler.calls.mostRecent();
            expect(latestCall.args[0] instanceof connected_position_1.ConnectedOverlayPositionChange)
                .toBe(true, "Expected directive to emit an instance of ConnectedOverlayPositionChange.");
        });
        it('should emit attach and detach appropriately', function () {
            expect(fixture.componentInstance.attachHandler).not.toHaveBeenCalled();
            expect(fixture.componentInstance.detachHandler).not.toHaveBeenCalled();
            fixture.componentInstance.isOpen = true;
            fixture.detectChanges();
            expect(fixture.componentInstance.attachHandler).toHaveBeenCalled();
            expect(fixture.componentInstance.attachResult instanceof HTMLElement)
                .toBe(true, "Expected pane to be populated with HTML elements when attach was called.");
            expect(fixture.componentInstance.detachHandler).not.toHaveBeenCalled();
            fixture.componentInstance.isOpen = false;
            fixture.detectChanges();
            expect(fixture.componentInstance.detachHandler).toHaveBeenCalled();
        });
        it('should emit the keydown events from the overlay', function () {
            expect(fixture.componentInstance.keydownHandler).not.toHaveBeenCalled();
            fixture.componentInstance.isOpen = true;
            fixture.detectChanges();
            var event = testing_2.dispatchKeyboardEvent(document.body, 'keydown', keycodes_1.A);
            fixture.detectChanges();
            expect(fixture.componentInstance.keydownHandler).toHaveBeenCalledWith(event);
        });
    });
});
var ConnectedOverlayDirectiveTest = /** @class */ (function () {
    function ConnectedOverlayDirectiveTest() {
        var _this = this;
        this.isOpen = false;
        this.backdropClickHandler = jasmine.createSpy('backdropClick handler');
        this.positionChangeHandler = jasmine.createSpy('positionChange handler');
        this.keydownHandler = jasmine.createSpy('keydown handler');
        this.attachHandler = jasmine.createSpy('attachHandler').and.callFake(function () {
            _this.attachResult = _this.connectedOverlayDirective.overlayRef.overlayElement.querySelector('p');
        });
        this.detachHandler = jasmine.createSpy('detachHandler');
    }
    ConnectedOverlayDirectiveTest.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n  <button cdk-overlay-origin id=\"trigger\" #trigger=\"cdkOverlayOrigin\">Toggle menu</button>\n  <button cdk-overlay-origin id=\"otherTrigger\" #otherTrigger=\"cdkOverlayOrigin\">Toggle menu</button>\n\n  <ng-template cdk-connected-overlay\n            [cdkConnectedOverlayOpen]=\"isOpen\"\n            [cdkConnectedOverlayWidth]=\"width\"\n            [cdkConnectedOverlayHeight]=\"height\"\n            [cdkConnectedOverlayOrigin]=\"triggerOverride || trigger\"\n            [cdkConnectedOverlayHasBackdrop]=\"hasBackdrop\"\n            [cdkConnectedOverlayViewportMargin]=\"viewportMargin\"\n            [cdkConnectedOverlayFlexibleDimensions]=\"flexibleDimensions\"\n            [cdkConnectedOverlayGrowAfterOpen]=\"growAfterOpen\"\n            [cdkConnectedOverlayPush]=\"push\"\n            cdkConnectedOverlayBackdropClass=\"mat-test-class\"\n            (backdropClick)=\"backdropClickHandler($event)\"\n            [cdkConnectedOverlayOffsetX]=\"offsetX\"\n            [cdkConnectedOverlayOffsetY]=\"offsetY\"\n            (positionChange)=\"positionChangeHandler($event)\"\n            (attach)=\"attachHandler()\"\n            (detach)=\"detachHandler()\"\n            (overlayKeydown)=\"keydownHandler($event)\"\n            [cdkConnectedOverlayMinWidth]=\"minWidth\"\n            [cdkConnectedOverlayMinHeight]=\"minHeight\"\n            [cdkConnectedOverlayPositions]=\"positionOverrides\">\n    <p>Menu content</p>\n  </ng-template>",
                },] },
    ];
    /** @nocollapse */
    ConnectedOverlayDirectiveTest.propDecorators = {
        "connectedOverlayDirective": [{ type: core_1.ViewChild, args: [index_1.CdkConnectedOverlay,] },],
        "trigger": [{ type: core_1.ViewChild, args: ['trigger',] },],
        "otherTrigger": [{ type: core_1.ViewChild, args: ['otherTrigger',] },],
    };
    return ConnectedOverlayDirectiveTest;
}());
var ConnectedOverlayPropertyInitOrder = /** @class */ (function () {
    function ConnectedOverlayPropertyInitOrder() {
    }
    ConnectedOverlayPropertyInitOrder.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n  <button cdk-overlay-origin #trigger=\"cdkOverlayOrigin\">Toggle menu</button>\n  <ng-template cdk-connected-overlay>Menu content</ng-template>",
                },] },
    ];
    /** @nocollapse */
    ConnectedOverlayPropertyInitOrder.propDecorators = {
        "connectedOverlayDirective": [{ type: core_1.ViewChild, args: [index_1.CdkConnectedOverlay,] },],
        "trigger": [{ type: core_1.ViewChild, args: ['trigger',] },],
    };
    return ConnectedOverlayPropertyInitOrder;
}());
//# sourceMappingURL=overlay-directives.spec.js.map