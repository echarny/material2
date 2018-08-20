"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var portal_directives_1 = require("./portal-directives");
var portal_1 = require("./portal");
var dom_portal_outlet_1 = require("./dom-portal-outlet");
describe('Portals', function () {
    beforeEach(function () {
        testing_1.TestBed
            .configureTestingModule({ imports: [portal_directives_1.PortalModule, PortalTestModule] })
            .compileComponents();
    });
    describe('CdkPortalOutlet', function () {
        var fixture;
        beforeEach(function () {
            fixture = testing_1.TestBed.createComponent(PortalTestApp);
        });
        it('should load a component into the portal', function () {
            // Set the selectedHost to be a ComponentPortal.
            var testAppComponent = fixture.componentInstance;
            var componentPortal = new portal_1.ComponentPortal(PizzaMsg);
            var hostContainer = fixture.nativeElement.querySelector('.portal-container');
            testAppComponent.selectedPortal = componentPortal;
            fixture.detectChanges();
            // Expect that the content of the attached portal is present.
            expect(hostContainer.textContent).toContain('Pizza');
            expect(testAppComponent.portalOutlet.portal).toBe(componentPortal);
            expect(testAppComponent.portalOutlet.attachedRef instanceof core_1.ComponentRef).toBe(true);
            expect(testAppComponent.attachedSpy)
                .toHaveBeenCalledWith(testAppComponent.portalOutlet.attachedRef);
        });
        it('should load a template into the portal', function () {
            var testAppComponent = fixture.componentInstance;
            var hostContainer = fixture.nativeElement.querySelector('.portal-container');
            var templatePortal = new portal_1.TemplatePortal(testAppComponent.templateRef, (null));
            testAppComponent.selectedPortal = templatePortal;
            fixture.detectChanges();
            // Expect that the content of the attached portal is present and no context is projected
            expect(hostContainer.textContent).toContain('Banana');
            expect(testAppComponent.portalOutlet.portal).toBe(templatePortal);
            // We can't test whether it's an instance of an `EmbeddedViewRef` so
            // we verify that it's defined and that it's not a ComponentRef.
            expect(testAppComponent.portalOutlet.attachedRef instanceof core_1.ComponentRef).toBe(false);
            expect(testAppComponent.portalOutlet.attachedRef).toBeTruthy();
            expect(testAppComponent.attachedSpy)
                .toHaveBeenCalledWith(testAppComponent.portalOutlet.attachedRef);
        });
        it('should project template context bindings in the portal', function () {
            var testAppComponent = fixture.componentInstance;
            var hostContainer = fixture.nativeElement.querySelector('.portal-container');
            // TemplatePortal without context:
            var templatePortal = new portal_1.TemplatePortal(testAppComponent.templateRef, (null));
            testAppComponent.selectedPortal = templatePortal;
            fixture.detectChanges();
            // Expect that the content of the attached portal is present and NO context is projected
            expect(hostContainer.textContent).toContain('Banana - !');
            // using TemplatePortal.attach method to set context
            testAppComponent.selectedPortal = undefined;
            fixture.detectChanges();
            templatePortal.attach(testAppComponent.portalOutlet, { $implicit: { status: 'rotten' } });
            fixture.detectChanges();
            // Expect that the content of the attached portal is present and context given via the
            // attach method is projected
            expect(hostContainer.textContent).toContain('Banana - rotten!');
            // using TemplatePortal constructor to set the context
            templatePortal =
                new portal_1.TemplatePortal(testAppComponent.templateRef, (null), { $implicit: { status: 'fresh' } });
            testAppComponent.selectedPortal = templatePortal;
            fixture.detectChanges();
            // Expect that the content of the attached portal is present and context given via the
            // constructor is projected
            expect(hostContainer.textContent).toContain('Banana - fresh!');
            // using TemplatePortal constructor to set the context but also calling attach method with
            // context, the latter should take precedence:
            testAppComponent.selectedPortal = undefined;
            fixture.detectChanges();
            templatePortal.attach(testAppComponent.portalOutlet, { $implicit: { status: 'rotten' } });
            fixture.detectChanges();
            // Expect that the content of the attached portal is present and and context given via the
            // attach method is projected and get precedence over constructor context
            expect(hostContainer.textContent).toContain('Banana - rotten!');
        });
        it('should dispose the host when destroyed', function () {
            // Set the selectedHost to be a ComponentPortal.
            var testAppComponent = fixture.componentInstance;
            testAppComponent.selectedPortal = new portal_1.ComponentPortal(PizzaMsg);
            fixture.detectChanges();
            expect(testAppComponent.selectedPortal.isAttached).toBe(true);
            fixture.destroy();
            expect(testAppComponent.selectedPortal.isAttached).toBe(false);
        });
        it('should load a component into the portal with a given injector', function () {
            // Create a custom injector for the component.
            var chocolateInjector = new ChocolateInjector(fixture.componentInstance.injector);
            // Set the selectedHost to be a ComponentPortal.
            var testAppComponent = fixture.componentInstance;
            testAppComponent.selectedPortal = new portal_1.ComponentPortal(PizzaMsg, undefined, chocolateInjector);
            fixture.detectChanges();
            // Expect that the content of the attached portal is present.
            var hostContainer = fixture.nativeElement.querySelector('.portal-container');
            expect(hostContainer.textContent).toContain('Pizza');
            expect(hostContainer.textContent).toContain('Chocolate');
        });
        it('should load a <ng-template> portal', function () {
            var testAppComponent = fixture.componentInstance;
            // Detect changes initially so that the component's ViewChildren are resolved.
            fixture.detectChanges();
            // Set the selectedHost to be a TemplatePortal.
            testAppComponent.selectedPortal = testAppComponent.cakePortal;
            fixture.detectChanges();
            // Expect that the content of the attached portal is present.
            var hostContainer = fixture.nativeElement.querySelector('.portal-container');
            expect(hostContainer.textContent).toContain('Cake');
        });
        it('should load a <ng-template> portal with the `*` sugar', function () {
            var testAppComponent = fixture.componentInstance;
            // Detect changes initially so that the component's ViewChildren are resolved.
            fixture.detectChanges();
            // Set the selectedHost to be a TemplatePortal (with the `*` syntax).
            testAppComponent.selectedPortal = testAppComponent.piePortal;
            fixture.detectChanges();
            // Expect that the content of the attached portal is present.
            var hostContainer = fixture.nativeElement.querySelector('.portal-container');
            expect(hostContainer.textContent).toContain('Pie');
        });
        it('should load a <ng-template> portal with a binding', function () {
            var testAppComponent = fixture.componentInstance;
            // Detect changes initially so that the component's ViewChildren are resolved.
            fixture.detectChanges();
            // Set the selectedHost to be a TemplatePortal.
            testAppComponent.selectedPortal = testAppComponent.portalWithBinding;
            fixture.detectChanges();
            // Expect that the content of the attached portal is present.
            var hostContainer = fixture.nativeElement.querySelector('.portal-container');
            expect(hostContainer.textContent).toContain('Banana');
            // When updating the binding value.
            testAppComponent.fruit = 'Mango';
            fixture.detectChanges();
            // Expect the new value to be reflected in the rendered output.
            expect(hostContainer.textContent).toContain('Mango');
        });
        it('should load a <ng-template> portal with an inner template', function () {
            var testAppComponent = fixture.componentInstance;
            // Detect changes initially so that the component's ViewChildren are resolved.
            fixture.detectChanges();
            // Set the selectedHost to be a TemplatePortal.
            testAppComponent.selectedPortal = testAppComponent.portalWithTemplate;
            fixture.detectChanges();
            // Expect that the content of the attached portal is present.
            var hostContainer = fixture.nativeElement.querySelector('.portal-container');
            expect(hostContainer.textContent).toContain('Pineapple');
            // When updating the binding value.
            testAppComponent.fruits = ['Mangosteen'];
            fixture.detectChanges();
            // Expect the new value to be reflected in the rendered output.
            expect(hostContainer.textContent).toContain('Mangosteen');
        });
        it('should change the attached portal', function () {
            var testAppComponent = fixture.componentInstance;
            // Detect changes initially so that the component's ViewChildren are resolved.
            fixture.detectChanges();
            // Set the selectedHost to be a ComponentPortal.
            testAppComponent.selectedPortal = testAppComponent.piePortal;
            fixture.detectChanges();
            // Expect that the content of the attached portal is present.
            var hostContainer = fixture.nativeElement.querySelector('.portal-container');
            expect(hostContainer.textContent).toContain('Pie');
            testAppComponent.selectedPortal = new portal_1.ComponentPortal(PizzaMsg);
            fixture.detectChanges();
            expect(hostContainer.textContent).toContain('Pizza');
        });
        it('should detach the portal when it is set to null', function () {
            var testAppComponent = fixture.componentInstance;
            testAppComponent.selectedPortal = new portal_1.ComponentPortal(PizzaMsg);
            fixture.detectChanges();
            expect(testAppComponent.portalOutlet.hasAttached()).toBe(true);
            expect(testAppComponent.portalOutlet.portal).toBe(testAppComponent.selectedPortal);
            testAppComponent.selectedPortal = (null);
            fixture.detectChanges();
            expect(testAppComponent.portalOutlet.hasAttached()).toBe(false);
            expect(testAppComponent.portalOutlet.portal).toBeNull();
        });
        it('should set the `portal` when attaching a component portal programmatically', function () {
            var testAppComponent = fixture.componentInstance;
            var portal = new portal_1.ComponentPortal(PizzaMsg);
            testAppComponent.portalOutlet.attachComponentPortal(portal);
            expect(testAppComponent.portalOutlet.portal).toBe(portal);
        });
        it('should set the `portal` when attaching a template portal programmatically', function () {
            var testAppComponent = fixture.componentInstance;
            fixture.detectChanges();
            testAppComponent.portalOutlet.attachTemplatePortal(testAppComponent.cakePortal);
            expect(testAppComponent.portalOutlet.portal).toBe(testAppComponent.cakePortal);
        });
        it('should clear the portal reference on destroy', function () {
            var testAppComponent = fixture.componentInstance;
            testAppComponent.selectedPortal = new portal_1.ComponentPortal(PizzaMsg);
            fixture.detectChanges();
            expect(testAppComponent.portalOutlet.portal).toBeTruthy();
            fixture.destroy();
            expect(testAppComponent.portalOutlet.portal).toBeNull();
        });
        it('should not clear programmatically-attached portals on init', function () {
            fixture.destroy();
            var unboundFixture = testing_1.TestBed.createComponent(UnboundPortalTestApp);
            // Note: calling `detectChanges` here will cause a false positive.
            // What we're testing is attaching before the first CD cycle.
            unboundFixture.componentInstance.portalOutlet.attach(new portal_1.ComponentPortal(PizzaMsg));
            unboundFixture.detectChanges();
            expect(unboundFixture.nativeElement.querySelector('.portal-container').textContent)
                .toContain('Pizza');
        });
        it('should be considered attached when attaching using `attach`', function () {
            expect(fixture.componentInstance.portalOutlet.hasAttached()).toBe(false);
            fixture.componentInstance.portalOutlet.attach(new portal_1.ComponentPortal(PizzaMsg));
            expect(fixture.componentInstance.portalOutlet.hasAttached()).toBe(true);
        });
        it('should be considered attached when attaching using `attachComponentPortal`', function () {
            expect(fixture.componentInstance.portalOutlet.hasAttached()).toBe(false);
            fixture.componentInstance.portalOutlet.attachComponentPortal(new portal_1.ComponentPortal(PizzaMsg));
            expect(fixture.componentInstance.portalOutlet.hasAttached()).toBe(true);
        });
        it('should be considered attached when attaching using `attachTemplatePortal`', function () {
            var instance = fixture.componentInstance;
            expect(instance.portalOutlet.hasAttached()).toBe(false);
            instance.portalOutlet.attachTemplatePortal(new portal_1.TemplatePortal(instance.templateRef, (null)));
            expect(instance.portalOutlet.hasAttached()).toBe(true);
        });
    });
    describe('DomPortalOutlet', function () {
        var componentFactoryResolver;
        var someViewContainerRef;
        var someInjector;
        var someFixture;
        var someDomElement;
        var host;
        var injector;
        var appRef;
        var deps = [core_1.ComponentFactoryResolver, core_1.Injector, core_1.ApplicationRef];
        beforeEach(testing_1.inject(deps, function (dcl, i, ar) {
            componentFactoryResolver = dcl;
            injector = i;
            appRef = ar;
        }));
        beforeEach(function () {
            someDomElement = document.createElement('div');
            host = new dom_portal_outlet_1.DomPortalOutlet(someDomElement, componentFactoryResolver, appRef, injector);
            someFixture = testing_1.TestBed.createComponent(ArbitraryViewContainerRefComponent);
            someViewContainerRef = someFixture.componentInstance.viewContainerRef;
            someInjector = someFixture.componentInstance.injector;
        });
        it('should attach and detach a component portal', function () {
            var portal = new portal_1.ComponentPortal(PizzaMsg, someViewContainerRef);
            var componentInstance = portal.attach(host).instance;
            expect(componentInstance instanceof PizzaMsg).toBe(true);
            expect(someDomElement.textContent).toContain('Pizza');
            host.detach();
            expect(someDomElement.innerHTML).toBe('');
        });
        it('should attach and detach a component portal with a given injector', function () {
            var fixture = testing_1.TestBed.createComponent(ArbitraryViewContainerRefComponent);
            someViewContainerRef = fixture.componentInstance.viewContainerRef;
            someInjector = fixture.componentInstance.injector;
            var chocolateInjector = new ChocolateInjector(someInjector);
            var portal = new portal_1.ComponentPortal(PizzaMsg, someViewContainerRef, chocolateInjector);
            var componentInstance = portal.attach(host).instance;
            fixture.detectChanges();
            expect(componentInstance instanceof PizzaMsg).toBe(true);
            expect(someDomElement.textContent).toContain('Pizza');
            expect(someDomElement.textContent).toContain('Chocolate');
            host.detach();
            expect(someDomElement.innerHTML).toBe('');
        });
        it('should attach and detach a template portal', function () {
            var fixture = testing_1.TestBed.createComponent(PortalTestApp);
            fixture.detectChanges();
            fixture.componentInstance.cakePortal.attach(host);
            expect(someDomElement.textContent).toContain('Cake');
        });
        it('should render a template portal with an inner template', function () {
            var fixture = testing_1.TestBed.createComponent(PortalTestApp);
            fixture.detectChanges();
            fixture.componentInstance.portalWithTemplate.attach(host);
            expect(someDomElement.textContent).toContain('Durian');
        });
        it('should attach and detach a template portal with a binding', function () {
            var fixture = testing_1.TestBed.createComponent(PortalTestApp);
            var testAppComponent = fixture.componentInstance;
            // Detect changes initially so that the component's ViewChildren are resolved.
            fixture.detectChanges();
            // Attach the TemplatePortal.
            testAppComponent.portalWithBinding.attach(host, { $implicit: { status: 'fresh' } });
            fixture.detectChanges();
            // Now that the portal is attached, change detection has to happen again in order
            // for the bindings to update.
            fixture.detectChanges();
            // Expect that the content of the attached portal is present.
            expect(someDomElement.textContent).toContain('Banana - fresh');
            // When updating the binding value.
            testAppComponent.fruit = 'Mango';
            fixture.detectChanges();
            // Expect the new value to be reflected in the rendered output.
            expect(someDomElement.textContent).toContain('Mango');
            host.detach();
            expect(someDomElement.innerHTML).toBe('');
        });
        it('should change the attached portal', function () {
            var fixture = testing_1.TestBed.createComponent(ArbitraryViewContainerRefComponent);
            someViewContainerRef = fixture.componentInstance.viewContainerRef;
            var appFixture = testing_1.TestBed.createComponent(PortalTestApp);
            appFixture.detectChanges();
            appFixture.componentInstance.piePortal.attach(host);
            expect(someDomElement.textContent).toContain('Pie');
            host.detach();
            host.attach(new portal_1.ComponentPortal(PizzaMsg, someViewContainerRef));
            expect(someDomElement.textContent).toContain('Pizza');
        });
        it('should attach and detach a component portal without a ViewContainerRef', function () {
            var portal = new portal_1.ComponentPortal(PizzaMsg);
            var componentInstance = portal.attach(host).instance;
            expect(componentInstance instanceof PizzaMsg)
                .toBe(true, 'Expected a PizzaMsg component to be created');
            expect(someDomElement.textContent)
                .toContain('Pizza', 'Expected the static string "Pizza" in the DomPortalOutlet.');
            componentInstance.snack = new Chocolate();
            someFixture.detectChanges();
            expect(someDomElement.textContent)
                .toContain('Chocolate', 'Expected the bound string "Chocolate" in the DomPortalOutlet');
            host.detach();
            expect(someDomElement.innerHTML)
                .toBe('', 'Expected the DomPortalOutlet to be empty after detach');
        });
        it('should call the dispose function even if the host has no attached content', function () {
            var spy = jasmine.createSpy('host dispose spy');
            expect(host.hasAttached()).toBe(false, 'Expected host not to have attached content.');
            host.setDisposeFn(spy);
            host.dispose();
            expect(spy).toHaveBeenCalled();
        });
    });
});
var Chocolate = /** @class */ (function () {
    function Chocolate() {
    }
    Chocolate.prototype.toString = function () {
        return 'Chocolate';
    };
    return Chocolate;
}());
var ChocolateInjector = /** @class */ (function () {
    function ChocolateInjector(parentInjector) {
        this.parentInjector = parentInjector;
    }
    ChocolateInjector.prototype.get = function (token) {
        return token === Chocolate ? new Chocolate() : this.parentInjector.get(token);
    };
    return ChocolateInjector;
}());
/** Simple component for testing ComponentPortal. */
var PizzaMsg = /** @class */ (function () {
    function PizzaMsg(snack) {
        this.snack = snack;
    }
    PizzaMsg.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'pizza-msg',
                    template: '<p>Pizza</p><p>{{snack}}</p>',
                },] },
    ];
    /** @nocollapse */
    PizzaMsg.ctorParameters = function () { return [
        { type: Chocolate, decorators: [{ type: core_1.Optional },] },
    ]; };
    return PizzaMsg;
}());
/** Simple component to grab an arbitrary ViewContainerRef */
var ArbitraryViewContainerRefComponent = /** @class */ (function () {
    function ArbitraryViewContainerRefComponent(viewContainerRef, injector) {
        this.viewContainerRef = viewContainerRef;
        this.injector = injector;
    }
    ArbitraryViewContainerRefComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'some-placeholder',
                    template: '<p>Hello</p>'
                },] },
    ];
    /** @nocollapse */
    ArbitraryViewContainerRefComponent.ctorParameters = function () { return [
        { type: core_1.ViewContainerRef, },
        { type: core_1.Injector, },
    ]; };
    return ArbitraryViewContainerRefComponent;
}());
/** Test-bed component that contains a portal outlet and a couple of template portals. */
var PortalTestApp = /** @class */ (function () {
    function PortalTestApp(injector) {
        this.injector = injector;
        this.fruit = 'Banana';
        this.fruits = ['Apple', 'Pineapple', 'Durian'];
        this.attachedSpy = jasmine.createSpy('attached spy');
    }
    Object.defineProperty(PortalTestApp.prototype, "cakePortal", {
        get: function () {
            return this.portals.first;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PortalTestApp.prototype, "piePortal", {
        get: function () {
            return this.portals.toArray()[1];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PortalTestApp.prototype, "portalWithBinding", {
        get: function () {
            return this.portals.toArray()[2];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PortalTestApp.prototype, "portalWithTemplate", {
        get: function () {
            return this.portals.toArray()[3];
        },
        enumerable: true,
        configurable: true
    });
    PortalTestApp.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'portal-test',
                    template: "\n  <div class=\"portal-container\">\n    <ng-template [cdkPortalOutlet]=\"selectedPortal\" (attached)=\"attachedSpy($event)\"></ng-template>\n  </div>\n\n  <ng-template cdk-portal>Cake</ng-template>\n\n  <div *cdk-portal>Pie</div>\n  <ng-template cdk-portal let-data> {{fruit}} - {{ data?.status }} </ng-template>\n\n  <ng-template cdk-portal>\n    <ul>\n      <li *ngFor=\"let fruitName of fruits\"> {{fruitName}} </li>\n    </ul>\n  </ng-template>\n\n  <ng-template #templateRef let-data> {{fruit}} - {{ data?.status }}!</ng-template>\n  ",
                },] },
    ];
    /** @nocollapse */
    PortalTestApp.ctorParameters = function () { return [
        { type: core_1.Injector, },
    ]; };
    PortalTestApp.propDecorators = {
        "portals": [{ type: core_1.ViewChildren, args: [portal_directives_1.CdkPortal,] },],
        "portalOutlet": [{ type: core_1.ViewChild, args: [portal_directives_1.CdkPortalOutlet,] },],
        "templateRef": [{ type: core_1.ViewChild, args: ['templateRef', { read: core_1.TemplateRef },] },],
    };
    return PortalTestApp;
}());
/** Test-bed component that contains a portal outlet and a couple of template portals. */
var UnboundPortalTestApp = /** @class */ (function () {
    function UnboundPortalTestApp() {
    }
    UnboundPortalTestApp.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <div class=\"portal-container\">\n      <ng-template cdkPortalOutlet></ng-template>\n    </div>\n  ",
                },] },
    ];
    /** @nocollapse */
    UnboundPortalTestApp.propDecorators = {
        "portalOutlet": [{ type: core_1.ViewChild, args: [portal_directives_1.CdkPortalOutlet,] },],
    };
    return UnboundPortalTestApp;
}());
// Create a real (non-test) NgModule as a workaround for
// https://github.com/angular/angular/issues/10760
var TEST_COMPONENTS = [
    PortalTestApp,
    UnboundPortalTestApp,
    ArbitraryViewContainerRefComponent,
    PizzaMsg
];
var PortalTestModule = /** @class */ (function () {
    function PortalTestModule() {
    }
    PortalTestModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [common_1.CommonModule, portal_directives_1.PortalModule],
                    exports: TEST_COMPONENTS,
                    declarations: TEST_COMPONENTS,
                    entryComponents: TEST_COMPONENTS,
                },] },
    ];
    return PortalTestModule;
}());
//# sourceMappingURL=portal.spec.js.map