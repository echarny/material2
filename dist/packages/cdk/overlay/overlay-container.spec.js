"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var core_1 = require("@angular/core");
var portal_1 = require("@angular/cdk/portal");
var index_1 = require("./index");
describe('OverlayContainer', function () {
    var overlay;
    var overlayContainer;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [OverlayTestModule]
        }).compileComponents();
    }));
    beforeEach(testing_1.inject([index_1.Overlay, index_1.OverlayContainer], function (o, oc) {
        overlay = o;
        overlayContainer = oc;
    }));
    afterEach(function () {
        overlayContainer.ngOnDestroy();
    });
    it('should remove the overlay container element from the DOM on destruction', function () {
        var fixture = testing_1.TestBed.createComponent(TestComponentWithTemplatePortals);
        var overlayRef = overlay.create();
        overlayRef.attach(fixture.componentInstance.templatePortal);
        fixture.detectChanges();
        expect(document.querySelector('.cdk-overlay-container'))
            .not.toBeNull('Expected the overlay container to be in the DOM after opening an overlay');
        // Manually call `ngOnDestroy` because there is no way to force Angular to destroy an
        // injectable in a unit test.
        overlayContainer.ngOnDestroy();
        expect(document.querySelector('.cdk-overlay-container'))
            .toBeNull('Expected the overlay container *not* to be in the DOM after destruction');
    });
    it('should add and remove css classes from the container element', function () {
        overlayContainer.getContainerElement().classList.add('commander-shepard');
        var containerElement = (document.querySelector('.cdk-overlay-container'));
        expect(containerElement.classList.contains('commander-shepard'))
            .toBe(true, 'Expected the overlay container to have class "commander-shepard"');
        overlayContainer.getContainerElement().classList.remove('commander-shepard');
        expect(containerElement.classList.contains('commander-shepard'))
            .toBe(false, 'Expected the overlay container not to have class "commander-shepard"');
    });
});
/** Test-bed component that contains a TempatePortal and an ElementRef. */
var TestComponentWithTemplatePortals = /** @class */ (function () {
    function TestComponentWithTemplatePortals(viewContainerRef) {
        this.viewContainerRef = viewContainerRef;
    }
    TestComponentWithTemplatePortals.decorators = [
        { type: core_1.Component, args: [{
                    template: "<ng-template cdk-portal>Cake</ng-template>",
                    providers: [index_1.Overlay],
                },] },
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
var OverlayTestModule = /** @class */ (function () {
    function OverlayTestModule() {
    }
    OverlayTestModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [index_1.OverlayModule, portal_1.PortalModule],
                    declarations: [TestComponentWithTemplatePortals]
                },] },
    ];
    return OverlayTestModule;
}());
//# sourceMappingURL=overlay-container.spec.js.map