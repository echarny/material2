"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var core_1 = require("@angular/core");
var bidi_1 = require("@angular/cdk/bidi");
var testing_2 = require("@angular/cdk/testing");
var portal_1 = require("@angular/cdk/portal");
var index_1 = require("./index");
describe('Overlay', function () {
    var overlay;
    var componentPortal;
    var templatePortal;
    var overlayContainerElement;
    var overlayContainer;
    var viewContainerFixture;
    var dir;
    var zone;
    beforeEach(testing_1.async(function () {
        dir = 'ltr';
        testing_1.TestBed.configureTestingModule({
            imports: [index_1.OverlayModule, portal_1.PortalModule, OverlayTestModule],
            providers: [
                {
                    provide: bidi_1.Directionality,
                    useFactory: function () {
                        var fakeDirectionality = {};
                        Object.defineProperty(fakeDirectionality, 'value', { get: function () { return dir; } });
                        return fakeDirectionality;
                    }
                },
                {
                    provide: core_1.NgZone,
                    useFactory: function () { return zone = new testing_2.MockNgZone(); }
                },
            ],
        }).compileComponents();
    }));
    beforeEach(testing_1.inject([index_1.Overlay, index_1.OverlayContainer], function (o, oc) {
        overlay = o;
        overlayContainer = oc;
        overlayContainerElement = oc.getContainerElement();
        var fixture = testing_1.TestBed.createComponent(TestComponentWithTemplatePortals);
        fixture.detectChanges();
        templatePortal = fixture.componentInstance.templatePortal;
        componentPortal = new portal_1.ComponentPortal(PizzaMsg, fixture.componentInstance.viewContainerRef);
        viewContainerFixture = fixture;
    }));
    afterEach(function () {
        overlayContainer.ngOnDestroy();
    });
    it('should load a component into an overlay', function () {
        var overlayRef = overlay.create();
        overlayRef.attach(componentPortal);
        expect(overlayContainerElement.textContent).toContain('Pizza');
        overlayRef.dispose();
        expect(overlayContainerElement.childNodes.length).toBe(0);
        expect(overlayContainerElement.textContent).toBe('');
    });
    it('should load a template portal into an overlay', function () {
        var overlayRef = overlay.create();
        overlayRef.attach(templatePortal);
        expect(overlayContainerElement.textContent).toContain('Cake');
        overlayRef.dispose();
        expect(overlayContainerElement.childNodes.length).toBe(0);
        expect(overlayContainerElement.textContent).toBe('');
    });
    it('should disable pointer events of the pane element if detached', function () {
        var overlayRef = overlay.create();
        var paneElement = overlayRef.overlayElement;
        overlayRef.attach(componentPortal);
        viewContainerFixture.detectChanges();
        expect(paneElement.childNodes.length).not.toBe(0);
        expect(paneElement.style.pointerEvents)
            .toBe('auto', 'Expected the overlay pane to enable pointerEvents when attached.');
        overlayRef.detach();
        expect(paneElement.childNodes.length).toBe(0);
        expect(paneElement.style.pointerEvents)
            .toBe('none', 'Expected the overlay pane to disable pointerEvents when detached.');
    });
    it('should open multiple overlays', function () {
        var pizzaOverlayRef = overlay.create();
        pizzaOverlayRef.attach(componentPortal);
        var cakeOverlayRef = overlay.create();
        cakeOverlayRef.attach(templatePortal);
        expect(overlayContainerElement.childNodes.length).toBe(2);
        expect(overlayContainerElement.textContent).toContain('Pizza');
        expect(overlayContainerElement.textContent).toContain('Cake');
        pizzaOverlayRef.dispose();
        expect(overlayContainerElement.childNodes.length).toBe(1);
        expect(overlayContainerElement.textContent).toContain('Cake');
        cakeOverlayRef.dispose();
        expect(overlayContainerElement.childNodes.length).toBe(0);
        expect(overlayContainerElement.textContent).toBe('');
    });
    it('should ensure that the most-recently-attached overlay is on top', (function () {
        var pizzaOverlayRef = overlay.create();
        var cakeOverlayRef = overlay.create();
        pizzaOverlayRef.attach(componentPortal);
        cakeOverlayRef.attach(templatePortal);
        expect(pizzaOverlayRef.hostElement.nextSibling)
            .toBeTruthy('Expected pizza to be on the bottom.');
        expect(cakeOverlayRef.hostElement.nextSibling)
            .toBeFalsy('Expected cake to be on top.');
        pizzaOverlayRef.dispose();
        cakeOverlayRef.detach();
        pizzaOverlayRef = overlay.create();
        pizzaOverlayRef.attach(componentPortal);
        cakeOverlayRef.attach(templatePortal);
        expect(pizzaOverlayRef.hostElement.nextSibling)
            .toBeTruthy('Expected pizza to still be on the bottom.');
        expect(cakeOverlayRef.hostElement.nextSibling)
            .toBeFalsy('Expected cake to still be on top.');
    }));
    it('should take the default direction from the global Directionality', function () {
        dir = 'rtl';
        var overlayRef = overlay.create();
        overlayRef.attach(componentPortal);
        expect(overlayRef.hostElement.getAttribute('dir')).toBe('rtl');
    });
    it('should set the direction', function () {
        var config = new index_1.OverlayConfig({ direction: 'rtl' });
        var overlayRef = overlay.create(config);
        overlayRef.attach(componentPortal);
        expect(overlayRef.hostElement.getAttribute('dir')).toBe('rtl');
    });
    it('should emit when an overlay is attached', function () {
        var overlayRef = overlay.create();
        var spy = jasmine.createSpy('attachments spy');
        overlayRef.attachments().subscribe(spy);
        overlayRef.attach(componentPortal);
        expect(spy).toHaveBeenCalled();
    });
    it('should emit the attachment event after everything is added to the DOM', function () {
        var config = new index_1.OverlayConfig({ hasBackdrop: true });
        var overlayRef = overlay.create(config);
        overlayRef.attachments().subscribe(function () {
            expect(overlayContainerElement.querySelector('pizza'))
                .toBeTruthy('Expected the overlay to have been attached.');
            expect(overlayContainerElement.querySelector('.cdk-overlay-backdrop'))
                .toBeTruthy('Expected the backdrop to have been attached.');
        });
        overlayRef.attach(componentPortal);
    });
    it('should emit when an overlay is detached', function () {
        var overlayRef = overlay.create();
        var spy = jasmine.createSpy('detachments spy');
        overlayRef.detachments().subscribe(spy);
        overlayRef.attach(componentPortal);
        overlayRef.detach();
        expect(spy).toHaveBeenCalled();
    });
    it('should not emit to the detach stream if the overlay has not been attached', function () {
        var overlayRef = overlay.create();
        var spy = jasmine.createSpy('detachments spy');
        overlayRef.detachments().subscribe(spy);
        overlayRef.detach();
        expect(spy).not.toHaveBeenCalled();
    });
    it('should not emit to the detach stream on dispose if the overlay was not attached', function () {
        var overlayRef = overlay.create();
        var spy = jasmine.createSpy('detachments spy');
        overlayRef.detachments().subscribe(spy);
        overlayRef.dispose();
        expect(spy).not.toHaveBeenCalled();
    });
    it('should emit the detachment event after the overlay is removed from the DOM', function () {
        var overlayRef = overlay.create();
        overlayRef.detachments().subscribe(function () {
            expect(overlayContainerElement.querySelector('pizza'))
                .toBeFalsy('Expected the overlay to have been detached.');
        });
        overlayRef.attach(componentPortal);
        overlayRef.detach();
    });
    it('should emit and complete the observables when an overlay is disposed', function () {
        var overlayRef = overlay.create();
        var disposeSpy = jasmine.createSpy('dispose spy');
        var attachCompleteSpy = jasmine.createSpy('attachCompleteSpy spy');
        var detachCompleteSpy = jasmine.createSpy('detachCompleteSpy spy');
        overlayRef.attachments().subscribe(undefined, undefined, attachCompleteSpy);
        overlayRef.detachments().subscribe(disposeSpy, undefined, detachCompleteSpy);
        overlayRef.attach(componentPortal);
        overlayRef.dispose();
        expect(disposeSpy).toHaveBeenCalled();
        expect(attachCompleteSpy).toHaveBeenCalled();
        expect(detachCompleteSpy).toHaveBeenCalled();
    });
    it('should complete the attachment observable before the detachment one', function () {
        var overlayRef = overlay.create();
        var callbackOrder = [];
        overlayRef.attachments().subscribe(undefined, undefined, function () { return callbackOrder.push('attach'); });
        overlayRef.detachments().subscribe(undefined, undefined, function () { return callbackOrder.push('detach'); });
        overlayRef.attach(componentPortal);
        overlayRef.dispose();
        expect(callbackOrder).toEqual(['attach', 'detach']);
    });
    it('should default to the ltr direction', function () {
        var overlayRef = overlay.create();
        expect(overlayRef.getConfig().direction).toBe('ltr');
    });
    it('should skip undefined values when applying the defaults', function () {
        var overlayRef = overlay.create({ direction: undefined });
        expect(overlayRef.getConfig().direction).toBe('ltr');
    });
    it('should clear out all DOM element references on dispose', testing_1.fakeAsync(function () {
        var overlayRef = overlay.create({ hasBackdrop: true });
        overlayRef.attach(componentPortal);
        expect(overlayRef.hostElement).toBeTruthy('Expected overlay host to be defined.');
        expect(overlayRef.overlayElement).toBeTruthy('Expected overlay element to be defined.');
        expect(overlayRef.backdropElement).toBeTruthy('Expected backdrop element to be defined.');
        overlayRef.dispose();
        testing_1.tick(500);
        expect(overlayRef.hostElement).toBeFalsy('Expected overlay host not to be referenced.');
        expect(overlayRef.overlayElement).toBeFalsy('Expected overlay element not to be referenced.');
        expect(overlayRef.backdropElement).toBeFalsy('Expected backdrop element not to be referenced.');
    }));
    it('should clear the backdrop timeout if the transition finishes first', testing_1.fakeAsync(function () {
        var overlayRef = overlay.create({ hasBackdrop: true });
        overlayRef.attach(componentPortal);
        overlayRef.detach();
        var backdrop = (overlayContainerElement.querySelector('.cdk-overlay-backdrop'));
        testing_2.dispatchFakeEvent(backdrop, 'transitionend');
        // Note: we don't `tick` or `flush` here. The assertion is that
        // `fakeAsync` will throw if we have an unflushed timer.
    }));
    it('should be able to use the `Overlay` provider during app initialization', function () {
        /** Dummy provider that depends on `Overlay`. */
        var CustomErrorHandler = /** @class */ (function (_super) {
            __extends(CustomErrorHandler, _super);
            function CustomErrorHandler(_overlay) {
                var _this = _super.call(this) || this;
                _this._overlay = _overlay;
                return _this;
            }
            CustomErrorHandler.prototype.handleError = function (error) {
                var overlayRef = this._overlay.create({ hasBackdrop: !!error });
                overlayRef.dispose();
            };
            CustomErrorHandler.decorators = [
                { type: core_1.Injectable },
            ];
            /** @nocollapse */
            CustomErrorHandler.ctorParameters = function () { return [
                { type: index_1.Overlay, },
            ]; };
            return CustomErrorHandler;
        }(core_1.ErrorHandler));
        overlayContainer.ngOnDestroy();
        testing_1.TestBed
            .resetTestingModule()
            .configureTestingModule({
            imports: [index_1.OverlayModule],
            providers: [
                CustomErrorHandler,
                { provide: core_1.ErrorHandler, useExisting: CustomErrorHandler }
            ]
        });
        expect(function () { return testing_1.TestBed.compileComponents(); }).not.toThrow();
    });
    it('should keep the direction in sync with the passed in Directionality', function () {
        var customDirectionality = { value: 'rtl', change: new core_1.EventEmitter() };
        var overlayRef = overlay.create({ direction: customDirectionality });
        expect(overlayRef.getDirection()).toBe('rtl');
        customDirectionality.value = 'ltr';
        expect(overlayRef.getDirection()).toBe('ltr');
    });
    it('should add and remove the overlay host as the ref is being attached and detached', function () {
        var overlayRef = overlay.create();
        overlayRef.attach(componentPortal);
        viewContainerFixture.detectChanges();
        expect(overlayRef.hostElement.parentElement)
            .toBeTruthy('Expected host element to be in the DOM.');
        overlayRef.detach();
        expect(overlayRef.hostElement.parentElement)
            .toBeTruthy('Expected host element not to have been removed immediately.');
        viewContainerFixture.detectChanges();
        zone.simulateZoneExit();
        expect(overlayRef.hostElement.parentElement)
            .toBeFalsy('Expected host element to have been removed once the zone stabilizes.');
        overlayRef.attach(componentPortal);
        viewContainerFixture.detectChanges();
        expect(overlayRef.hostElement.parentElement)
            .toBeTruthy('Expected host element to be back in the DOM.');
    });
    describe('positioning', function () {
        var config;
        beforeEach(function () {
            config = new index_1.OverlayConfig();
        });
        it('should apply the positioning strategy', testing_1.fakeAsync(function () {
            config.positionStrategy = new FakePositionStrategy();
            overlay.create(config).attach(componentPortal);
            viewContainerFixture.detectChanges();
            zone.simulateZoneExit();
            testing_1.tick();
            expect(overlayContainerElement.querySelectorAll('.fake-positioned').length).toBe(1);
        }));
        it('should not apply the position if it detaches before the zone stabilizes', testing_1.fakeAsync(function () {
            config.positionStrategy = new FakePositionStrategy();
            var overlayRef = overlay.create(config);
            spyOn(config.positionStrategy, 'apply');
            overlayRef.attach(componentPortal);
            overlayRef.detach();
            viewContainerFixture.detectChanges();
            testing_1.tick();
            expect(config.positionStrategy.apply).not.toHaveBeenCalled();
        }));
    });
    describe('size', function () {
        var config;
        beforeEach(function () {
            config = new index_1.OverlayConfig();
        });
        it('should apply the width set in the config', function () {
            config.width = 500;
            var overlayRef = overlay.create(config);
            overlayRef.attach(componentPortal);
            expect(overlayRef.overlayElement.style.width).toBe('500px');
        });
        it('should support using other units if a string width is provided', function () {
            config.width = '200%';
            var overlayRef = overlay.create(config);
            overlayRef.attach(componentPortal);
            expect(overlayRef.overlayElement.style.width).toBe('200%');
        });
        it('should apply the height set in the config', function () {
            config.height = 500;
            var overlayRef = overlay.create(config);
            overlayRef.attach(componentPortal);
            expect(overlayRef.overlayElement.style.height).toBe('500px');
        });
        it('should support using other units if a string height is provided', function () {
            config.height = '100vh';
            var overlayRef = overlay.create(config);
            overlayRef.attach(componentPortal);
            expect(overlayRef.overlayElement.style.height).toBe('100vh');
        });
        it('should apply the min width set in the config', function () {
            config.minWidth = 200;
            var overlayRef = overlay.create(config);
            overlayRef.attach(componentPortal);
            expect(overlayRef.overlayElement.style.minWidth).toBe('200px');
        });
        it('should apply the min height set in the config', function () {
            config.minHeight = 500;
            var overlayRef = overlay.create(config);
            overlayRef.attach(componentPortal);
            expect(overlayRef.overlayElement.style.minHeight).toBe('500px');
        });
        it('should apply the max width set in the config', function () {
            config.maxWidth = 200;
            var overlayRef = overlay.create(config);
            overlayRef.attach(componentPortal);
            expect(overlayRef.overlayElement.style.maxWidth).toBe('200px');
        });
        it('should apply the max height set in the config', function () {
            config.maxHeight = 500;
            var overlayRef = overlay.create(config);
            overlayRef.attach(componentPortal);
            expect(overlayRef.overlayElement.style.maxHeight).toBe('500px');
        });
        it('should support zero widths and heights', function () {
            config.width = 0;
            config.height = 0;
            var overlayRef = overlay.create(config);
            overlayRef.attach(componentPortal);
            expect(overlayRef.overlayElement.style.width).toBe('0px');
            expect(overlayRef.overlayElement.style.height).toBe('0px');
        });
        it('should be able to reset the various size properties', function () {
            config.minWidth = config.minHeight = 100;
            config.width = config.height = 200;
            config.maxWidth = config.maxHeight = 300;
            var overlayRef = overlay.create(config);
            overlayRef.attach(componentPortal);
            var style = overlayRef.overlayElement.style;
            expect(style.minWidth).toBe('100px');
            expect(style.minHeight).toBe('100px');
            expect(style.width).toBe('200px');
            expect(style.height).toBe('200px');
            expect(style.maxWidth).toBe('300px');
            expect(style.maxHeight).toBe('300px');
            overlayRef.updateSize({
                minWidth: '',
                minHeight: '',
                width: '',
                height: '',
                maxWidth: '',
                maxHeight: ''
            });
            overlayRef.updatePosition();
            expect(style.minWidth).toBeFalsy();
            expect(style.minHeight).toBeFalsy();
            expect(style.width).toBeFalsy();
            expect(style.height).toBeFalsy();
            expect(style.maxWidth).toBeFalsy();
            expect(style.maxHeight).toBeFalsy();
        });
    });
    describe('backdrop', function () {
        var config;
        beforeEach(function () {
            config = new index_1.OverlayConfig();
            config.hasBackdrop = true;
        });
        it('should create and destroy an overlay backdrop', function () {
            var overlayRef = overlay.create(config);
            overlayRef.attach(componentPortal);
            viewContainerFixture.detectChanges();
            var backdrop = overlayContainerElement.querySelector('.cdk-overlay-backdrop');
            expect(backdrop).toBeTruthy();
            expect(backdrop.classList).not.toContain('cdk-overlay-backdrop-showing');
            var backdropClickHandler = jasmine.createSpy('backdropClickHander');
            overlayRef.backdropClick().subscribe(backdropClickHandler);
            backdrop.click();
            expect(backdropClickHandler).toHaveBeenCalledWith(jasmine.any(MouseEvent));
        });
        it('should complete the backdrop click stream once the overlay is destroyed', function () {
            var overlayRef = overlay.create(config);
            overlayRef.attach(componentPortal);
            viewContainerFixture.detectChanges();
            var completeHandler = jasmine.createSpy('backdrop complete handler');
            overlayRef.backdropClick().subscribe(undefined, undefined, completeHandler);
            overlayRef.dispose();
            expect(completeHandler).toHaveBeenCalled();
        });
        it('should apply the default overlay backdrop class', function () {
            var overlayRef = overlay.create(config);
            overlayRef.attach(componentPortal);
            viewContainerFixture.detectChanges();
            var backdrop = overlayContainerElement.querySelector('.cdk-overlay-backdrop');
            expect(backdrop.classList).toContain('cdk-overlay-dark-backdrop');
        });
        it('should apply a custom class to the backdrop', function () {
            config.backdropClass = 'cdk-overlay-transparent-backdrop';
            var overlayRef = overlay.create(config);
            overlayRef.attach(componentPortal);
            viewContainerFixture.detectChanges();
            var backdrop = overlayContainerElement.querySelector('.cdk-overlay-backdrop');
            expect(backdrop.classList).toContain('cdk-overlay-transparent-backdrop');
        });
        it('should apply multiple custom classes to the overlay', function () {
            config.backdropClass = ['custom-class-1', 'custom-class-2'];
            var overlayRef = overlay.create(config);
            overlayRef.attach(componentPortal);
            viewContainerFixture.detectChanges();
            var backdrop = overlayContainerElement.querySelector('.cdk-overlay-backdrop');
            expect(backdrop.classList).toContain('custom-class-1');
            expect(backdrop.classList).toContain('custom-class-2');
        });
        it('should disable the pointer events of a backdrop that is being removed', function () {
            var overlayRef = overlay.create(config);
            overlayRef.attach(componentPortal);
            viewContainerFixture.detectChanges();
            var backdrop = overlayContainerElement.querySelector('.cdk-overlay-backdrop');
            expect(backdrop.style.pointerEvents).toBeFalsy();
            overlayRef.detach();
            expect(backdrop.style.pointerEvents).toBe('none');
        });
        it('should insert the backdrop before the overlay host in the DOM order', function () {
            var overlayRef = overlay.create(config);
            overlayRef.attach(componentPortal);
            viewContainerFixture.detectChanges();
            var backdrop = overlayContainerElement.querySelector('.cdk-overlay-backdrop');
            var host = (overlayContainerElement.querySelector('.cdk-overlay-pane').parentElement);
            var children = Array.prototype.slice.call(overlayContainerElement.children);
            expect(children.indexOf(backdrop)).toBeGreaterThan(-1);
            expect(children.indexOf(host)).toBeGreaterThan(-1);
            expect(children.indexOf(backdrop))
                .toBeLessThan(children.indexOf(host), 'Expected backdrop to be before the host in the DOM');
        });
    });
    describe('panelClass', function () {
        it('should apply a custom overlay pane class', function () {
            var config = new index_1.OverlayConfig({ panelClass: 'custom-panel-class' });
            overlay.create(config).attach(componentPortal);
            viewContainerFixture.detectChanges();
            var pane = overlayContainerElement.querySelector('.cdk-overlay-pane');
            expect(pane.classList).toContain('custom-panel-class');
        });
        it('should be able to apply multiple classes', function () {
            var config = new index_1.OverlayConfig({ panelClass: ['custom-class-one', 'custom-class-two'] });
            overlay.create(config).attach(componentPortal);
            viewContainerFixture.detectChanges();
            var pane = overlayContainerElement.querySelector('.cdk-overlay-pane');
            expect(pane.classList).toContain('custom-class-one');
            expect(pane.classList).toContain('custom-class-two');
        });
        it('should remove the custom panel class when the overlay is detached', function () {
            var config = new index_1.OverlayConfig({ panelClass: 'custom-panel-class' });
            var overlayRef = overlay.create(config);
            overlayRef.attach(componentPortal);
            viewContainerFixture.detectChanges();
            var pane = overlayContainerElement.querySelector('.cdk-overlay-pane');
            expect(pane.classList).toContain('custom-panel-class');
            overlayRef.detach();
            viewContainerFixture.detectChanges();
            expect(pane.classList).not.toContain('custom-panel-class');
            overlayRef.attach(componentPortal);
            viewContainerFixture.detectChanges();
            expect(pane.classList).toContain('custom-panel-class');
        });
    });
    describe('scroll strategy', function () {
        var fakeScrollStrategy;
        var config;
        var overlayRef;
        beforeEach(function () {
            fakeScrollStrategy = new FakeScrollStrategy();
            config = new index_1.OverlayConfig({ scrollStrategy: fakeScrollStrategy });
            overlayRef = overlay.create(config);
        });
        it('should attach the overlay ref to the scroll strategy', function () {
            expect(fakeScrollStrategy.overlayRef).toBe(overlayRef, 'Expected scroll strategy to have been attached to the current overlay ref.');
        });
        it('should enable the scroll strategy when the overlay is attached', function () {
            overlayRef.attach(componentPortal);
            expect(fakeScrollStrategy.isEnabled).toBe(true, 'Expected scroll strategy to be enabled.');
        });
        it('should disable the scroll strategy once the overlay is detached', function () {
            overlayRef.attach(componentPortal);
            expect(fakeScrollStrategy.isEnabled).toBe(true, 'Expected scroll strategy to be enabled.');
            overlayRef.detach();
            expect(fakeScrollStrategy.isEnabled).toBe(false, 'Expected scroll strategy to be disabled.');
        });
        it('should disable the scroll strategy when the overlay is destroyed', function () {
            overlayRef.dispose();
            expect(fakeScrollStrategy.isEnabled).toBe(false, 'Expected scroll strategy to be disabled.');
        });
    });
});
/** Simple component for testing ComponentPortal. */
var PizzaMsg = /** @class */ (function () {
    function PizzaMsg() {
    }
    PizzaMsg.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'pizza',
                    template: '<p>Pizza</p>'
                },] },
    ];
    return PizzaMsg;
}());
/** Test-bed component that contains a TempatePortal and an ElementRef. */
var TestComponentWithTemplatePortals = /** @class */ (function () {
    function TestComponentWithTemplatePortals(viewContainerRef) {
        this.viewContainerRef = viewContainerRef;
    }
    TestComponentWithTemplatePortals.decorators = [
        { type: core_1.Component, args: [{ template: "<ng-template cdk-portal>Cake</ng-template>" },] },
    ];
    /** @nocollapse */
    TestComponentWithTemplatePortals.ctorParameters = function () { return [
        { type: core_1.ViewContainerRef, },
    ]; };
    TestComponentWithTemplatePortals.propDecorators = {
        "templatePortal": [{ type: core_1.ViewChild, args: [portal_1.CdkPortal,] },],
    };
    return TestComponentWithTemplatePortals;
}());
// Create a real (non-test) NgModule as a workaround for
// https://github.com/angular/angular/issues/10760
var TEST_COMPONENTS = [PizzaMsg, TestComponentWithTemplatePortals];
var OverlayTestModule = /** @class */ (function () {
    function OverlayTestModule() {
    }
    OverlayTestModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [index_1.OverlayModule, portal_1.PortalModule],
                    exports: TEST_COMPONENTS,
                    declarations: TEST_COMPONENTS,
                    entryComponents: TEST_COMPONENTS,
                },] },
    ];
    return OverlayTestModule;
}());
var FakePositionStrategy = /** @class */ (function () {
    function FakePositionStrategy() {
    }
    FakePositionStrategy.prototype.apply = function () {
        this.element.classList.add('fake-positioned');
    };
    FakePositionStrategy.prototype.attach = function (overlayRef) {
        this.element = overlayRef.overlayElement;
    };
    FakePositionStrategy.prototype.dispose = function () { };
    return FakePositionStrategy;
}());
var FakeScrollStrategy = /** @class */ (function () {
    function FakeScrollStrategy() {
        this.isEnabled = false;
    }
    FakeScrollStrategy.prototype.attach = function (overlayRef) {
        this.overlayRef = overlayRef;
    };
    FakeScrollStrategy.prototype.enable = function () {
        this.isEnabled = true;
    };
    FakeScrollStrategy.prototype.disable = function () {
        this.isEnabled = false;
    };
    return FakeScrollStrategy;
}());
//# sourceMappingURL=overlay.spec.js.map