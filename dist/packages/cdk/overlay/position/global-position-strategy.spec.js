"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var testing_1 = require("@angular/core/testing");
var testing_2 = require("@angular/cdk/testing");
var portal_1 = require("@angular/cdk/portal");
var index_1 = require("../index");
describe('GlobalPositonStrategy', function () {
    var overlayRef;
    var overlay;
    var zone;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [GlobalOverlayTestModule],
            providers: [{ provide: core_1.NgZone, useFactory: function () { return zone = new testing_2.MockNgZone(); } }]
        });
        testing_1.inject([index_1.Overlay], function (o) {
            overlay = o;
        })();
    });
    afterEach(testing_1.inject([index_1.OverlayContainer], function (overlayContainer) {
        if (overlayRef) {
            overlayRef.dispose();
            overlayRef = (null);
        }
        overlayContainer.ngOnDestroy();
    }));
    function attachOverlay(config) {
        var portal = new portal_1.ComponentPortal(BlankPortal);
        overlayRef = overlay.create(config);
        overlayRef.attach(portal);
        zone.simulateZoneExit();
        return overlayRef;
    }
    it('should position the element to the (top, left) with an offset', function () {
        attachOverlay({
            positionStrategy: overlay.position()
                .global()
                .top('10px')
                .left('40px')
        });
        var elementStyle = overlayRef.overlayElement.style;
        var parentStyle = overlayRef.overlayElement.parentNode.style;
        expect(elementStyle.marginTop).toBe('10px');
        expect(elementStyle.marginLeft).toBe('40px');
        expect(elementStyle.marginBottom).toBe('');
        expect(elementStyle.marginRight).toBe('');
        expect(parentStyle.justifyContent).toBe('flex-start');
        expect(parentStyle.alignItems).toBe('flex-start');
    });
    it('should position the element to the (bottom, right) with an offset', function () {
        attachOverlay({
            positionStrategy: overlay.position()
                .global()
                .bottom('70px')
                .right('15em')
        });
        var elementStyle = overlayRef.overlayElement.style;
        var parentStyle = overlayRef.overlayElement.parentNode.style;
        expect(elementStyle.marginTop).toBe('');
        expect(elementStyle.marginLeft).toBe('');
        expect(elementStyle.marginBottom).toBe('70px');
        expect(elementStyle.marginRight).toBe('15em');
        expect(parentStyle.justifyContent).toBe('flex-end');
        expect(parentStyle.alignItems).toBe('flex-end');
    });
    it('should overwrite previously applied positioning', function () {
        var positionStrategy = overlay.position()
            .global()
            .centerHorizontally()
            .centerVertically();
        attachOverlay({ positionStrategy: positionStrategy });
        positionStrategy.top('10px').left('40%');
        overlayRef.updatePosition();
        var elementStyle = overlayRef.overlayElement.style;
        var parentStyle = overlayRef.overlayElement.parentNode.style;
        expect(elementStyle.marginTop).toBe('10px');
        expect(elementStyle.marginLeft).toBe('40%');
        expect(elementStyle.marginBottom).toBe('');
        expect(elementStyle.marginRight).toBe('');
        expect(parentStyle.justifyContent).toBe('flex-start');
        expect(parentStyle.alignItems).toBe('flex-start');
        positionStrategy.bottom('70px').right('15em');
        overlayRef.updatePosition();
        expect(elementStyle.marginTop).toBe('');
        expect(elementStyle.marginLeft).toBe('');
        expect(elementStyle.marginBottom).toBe('70px');
        expect(elementStyle.marginRight).toBe('15em');
        expect(parentStyle.justifyContent).toBe('flex-end');
        expect(parentStyle.alignItems).toBe('flex-end');
    });
    it('should center the element', function () {
        attachOverlay({
            positionStrategy: overlay.position()
                .global()
                .centerHorizontally()
                .centerVertically()
        });
        var parentStyle = overlayRef.overlayElement.parentNode.style;
        expect(parentStyle.justifyContent).toBe('center');
        expect(parentStyle.alignItems).toBe('center');
    });
    it('should center the element with an offset', function () {
        attachOverlay({
            positionStrategy: overlay.position()
                .global()
                .centerHorizontally('10px')
                .centerVertically('15px')
        });
        var elementStyle = overlayRef.overlayElement.style;
        var parentStyle = overlayRef.overlayElement.parentNode.style;
        expect(elementStyle.marginLeft).toBe('10px');
        expect(elementStyle.marginTop).toBe('15px');
        expect(parentStyle.justifyContent).toBe('center');
        expect(parentStyle.alignItems).toBe('center');
    });
    it('should make the element position: static', function () {
        attachOverlay({
            positionStrategy: overlay.position().global()
        });
        expect(overlayRef.overlayElement.style.position).toBe('static');
    });
    it('should wrap the element in a `cdk-global-overlay-wrapper`', function () {
        attachOverlay({
            positionStrategy: overlay.position().global()
        });
        var parent = overlayRef.overlayElement.parentNode;
        expect(parent.classList.contains('cdk-global-overlay-wrapper')).toBe(true);
    });
    it('should remove the parent wrapper from the DOM', function () {
        attachOverlay({
            positionStrategy: overlay.position().global()
        });
        var parent = (overlayRef.overlayElement.parentNode);
        expect(document.body.contains(parent)).toBe(true);
        overlayRef.dispose();
        expect(document.body.contains(parent)).toBe(false);
    });
    it('should set the element width', function () {
        attachOverlay({
            positionStrategy: overlay.position().global().width('100px')
        });
        expect(overlayRef.overlayElement.style.width).toBe('100px');
    });
    it('should set the element height', function () {
        attachOverlay({
            positionStrategy: overlay.position().global().height('100px')
        });
        expect(overlayRef.overlayElement.style.height).toBe('100px');
    });
    it('should reset the horizontal position and offset when the width is 100%', function () {
        attachOverlay({
            positionStrategy: overlay.position()
                .global()
                .centerHorizontally()
                .width('100%')
        });
        var elementStyle = overlayRef.overlayElement.style;
        var parentStyle = overlayRef.overlayElement.parentNode.style;
        expect(elementStyle.marginLeft).toBe('0px');
        expect(parentStyle.justifyContent).toBe('flex-start');
    });
    it('should reset the vertical position and offset when the height is 100%', function () {
        attachOverlay({
            positionStrategy: overlay.position()
                .global()
                .centerVertically()
                .height('100%')
        });
        var elementStyle = overlayRef.overlayElement.style;
        var parentStyle = overlayRef.overlayElement.parentNode.style;
        expect(elementStyle.marginTop).toBe('0px');
        expect(parentStyle.alignItems).toBe('flex-start');
    });
    it('should not throw when attempting to apply after the overlay has been disposed', function () {
        var positionStrategy = overlay.position().global();
        attachOverlay({ positionStrategy: positionStrategy });
        positionStrategy.dispose();
        expect(function () { return positionStrategy.apply(); }).not.toThrow();
    });
    it('should take its width and height from the overlay config', function () {
        attachOverlay({
            positionStrategy: overlay.position().global(),
            width: '500px',
            height: '300px'
        });
        var elementStyle = overlayRef.overlayElement.style;
        expect(elementStyle.width).toBe('500px');
        expect(elementStyle.height).toBe('300px');
    });
    it('should update the overlay size when setting it through the position strategy', function () {
        attachOverlay({
            positionStrategy: overlay.position()
                .global()
                .width('500px')
                .height('300px'),
        });
        expect(overlayRef.getConfig().width).toBe('500px');
        expect(overlayRef.getConfig().height).toBe('300px');
    });
    it('should take the dimensions from the overlay config, when they are set both in the ' +
        'config and the strategy', function () {
        attachOverlay({
            positionStrategy: overlay.position().global().width('200px').height('100px'),
            width: '500px',
            height: '300px'
        });
        var elementStyle = overlayRef.overlayElement.style;
        expect(elementStyle.width).toBe('500px');
        expect(elementStyle.height).toBe('300px');
    });
    it('should center the element in RTL', function () {
        attachOverlay({
            direction: 'rtl',
            positionStrategy: overlay.position()
                .global()
                .centerHorizontally()
                .centerVertically()
        });
        var parentStyle = overlayRef.overlayElement.parentNode.style;
        expect(parentStyle.justifyContent).toBe('center');
        expect(parentStyle.alignItems).toBe('center');
    });
    it('should invert `justify-content` when using `left` in RTL', function () {
        attachOverlay({
            positionStrategy: overlay.position().global().left('0'),
            direction: 'rtl'
        });
        var parentStyle = overlayRef.overlayElement.parentNode.style;
        expect(parentStyle.justifyContent).toBe('flex-end');
    });
    it('should invert `justify-content` when using `right` in RTL', function () {
        attachOverlay({
            positionStrategy: overlay.position().global().right('0'),
            direction: 'rtl'
        });
        var parentStyle = overlayRef.overlayElement.parentNode.style;
        expect(parentStyle.justifyContent).toBe('flex-start');
    });
});
var BlankPortal = /** @class */ (function () {
    function BlankPortal() {
    }
    BlankPortal.decorators = [
        { type: core_1.Component, args: [{ template: '' },] },
    ];
    return BlankPortal;
}());
var GlobalOverlayTestModule = /** @class */ (function () {
    function GlobalOverlayTestModule() {
    }
    GlobalOverlayTestModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [index_1.OverlayModule, portal_1.PortalModule],
                    exports: [BlankPortal],
                    declarations: [BlankPortal],
                    entryComponents: [BlankPortal],
                },] },
    ];
    return GlobalOverlayTestModule;
}());
//# sourceMappingURL=global-position-strategy.spec.js.map