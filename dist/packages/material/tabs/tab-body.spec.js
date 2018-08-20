"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bidi_1 = require("@angular/cdk/bidi");
var portal_1 = require("@angular/cdk/portal");
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var testing_1 = require("@angular/core/testing");
var core_2 = require("@angular/material/core");
var animations_1 = require("@angular/platform-browser/animations");
var tab_body_1 = require("./tab-body");
var rxjs_1 = require("rxjs");
describe('MatTabBody', function () {
    var dir = 'ltr';
    var dirChange = new rxjs_1.Subject();
    beforeEach(testing_1.async(function () {
        dir = 'ltr';
        testing_1.TestBed.configureTestingModule({
            imports: [common_1.CommonModule, portal_1.PortalModule, core_2.MatRippleModule, animations_1.NoopAnimationsModule],
            declarations: [
                tab_body_1.MatTabBody,
                tab_body_1.MatTabBodyPortal,
                SimpleTabBodyApp,
            ],
            providers: [
                { provide: bidi_1.Directionality, useFactory: function () { return ({ value: dir, change: dirChange }); } }
            ]
        });
        testing_1.TestBed.compileComponents();
    }));
    describe('when initialized as center', function () {
        var fixture;
        it('should be center position if origin is unchanged', function () {
            fixture = testing_1.TestBed.createComponent(SimpleTabBodyApp);
            fixture.componentInstance.position = 0;
            fixture.detectChanges();
            expect(fixture.componentInstance.tabBody._position).toBe('center');
        });
        it('should be center position if origin is explicitly set to null', function () {
            fixture = testing_1.TestBed.createComponent(SimpleTabBodyApp);
            fixture.componentInstance.position = 0;
            // It can happen that the `origin` is explicitly set to null through the Angular input
            // binding. This test should ensure that the body does properly such origin value.
            // The `MatTab` class sets the origin by default to null. See related issue: #12455
            fixture.componentInstance.origin = null;
            fixture.detectChanges();
            expect(fixture.componentInstance.tabBody._position).toBe('center');
        });
        describe('in LTR direction', function () {
            beforeEach(function () {
                dir = 'ltr';
                fixture = testing_1.TestBed.createComponent(SimpleTabBodyApp);
            });
            it('should be left-origin-center position with negative or zero origin', function () {
                fixture.componentInstance.position = 0;
                fixture.componentInstance.origin = 0;
                fixture.detectChanges();
                expect(fixture.componentInstance.tabBody._position).toBe('left-origin-center');
            });
            it('should be right-origin-center position with positive nonzero origin', function () {
                fixture.componentInstance.position = 0;
                fixture.componentInstance.origin = 1;
                fixture.detectChanges();
                expect(fixture.componentInstance.tabBody._position).toBe('right-origin-center');
            });
        });
        describe('in RTL direction', function () {
            beforeEach(function () {
                dir = 'rtl';
                fixture = testing_1.TestBed.createComponent(SimpleTabBodyApp);
            });
            it('should be right-origin-center position with negative or zero origin', function () {
                fixture.componentInstance.position = 0;
                fixture.componentInstance.origin = 0;
                fixture.detectChanges();
                expect(fixture.componentInstance.tabBody._position).toBe('right-origin-center');
            });
            it('should be left-origin-center position with positive nonzero origin', function () {
                fixture.componentInstance.position = 0;
                fixture.componentInstance.origin = 1;
                fixture.detectChanges();
                expect(fixture.componentInstance.tabBody._position).toBe('left-origin-center');
            });
        });
    });
    describe('should properly set the position in LTR', function () {
        var fixture;
        beforeEach(function () {
            dir = 'ltr';
            fixture = testing_1.TestBed.createComponent(SimpleTabBodyApp);
            fixture.detectChanges();
        });
        it('to be left position with negative position', function () {
            fixture.componentInstance.position = -1;
            fixture.detectChanges();
            expect(fixture.componentInstance.tabBody._position).toBe('left');
        });
        it('to be center position with zero position', function () {
            fixture.componentInstance.position = 0;
            fixture.detectChanges();
            expect(fixture.componentInstance.tabBody._position).toBe('center');
        });
        it('to be left position with positive position', function () {
            fixture.componentInstance.position = 1;
            fixture.detectChanges();
            expect(fixture.componentInstance.tabBody._position).toBe('right');
        });
    });
    describe('should properly set the position in RTL', function () {
        var fixture;
        beforeEach(function () {
            dir = 'rtl';
            fixture = testing_1.TestBed.createComponent(SimpleTabBodyApp);
            fixture.detectChanges();
        });
        it('to be right position with negative position', function () {
            fixture.componentInstance.position = -1;
            fixture.detectChanges();
            expect(fixture.componentInstance.tabBody._position).toBe('right');
        });
        it('to be center position with zero position', function () {
            fixture.componentInstance.position = 0;
            fixture.detectChanges();
            expect(fixture.componentInstance.tabBody._position).toBe('center');
        });
        it('to be left position with positive position', function () {
            fixture.componentInstance.position = 1;
            fixture.detectChanges();
            expect(fixture.componentInstance.tabBody._position).toBe('left');
        });
    });
    it('should update position if direction changed at runtime', function () {
        var fixture = testing_1.TestBed.createComponent(SimpleTabBodyApp);
        fixture.componentInstance.position = 1;
        fixture.detectChanges();
        expect(fixture.componentInstance.tabBody._position).toBe('right');
        dirChange.next('rtl');
        dir = 'rtl';
        fixture.detectChanges();
        expect(fixture.componentInstance.tabBody._position).toBe('left');
    });
});
var SimpleTabBodyApp = /** @class */ (function () {
    function SimpleTabBodyApp(_viewContainerRef) {
        this._viewContainerRef = _viewContainerRef;
    }
    SimpleTabBodyApp.prototype.ngAfterContentInit = function () {
        this.content = new portal_1.TemplatePortal(this.template, this._viewContainerRef);
    };
    SimpleTabBodyApp.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <ng-template>Tab Body Content</ng-template>\n    <mat-tab-body [content]=\"content\" [position]=\"position\" [origin]=\"origin\"></mat-tab-body>\n  "
                },] },
    ];
    /** @nocollapse */
    SimpleTabBodyApp.ctorParameters = function () { return [
        { type: core_1.ViewContainerRef, },
    ]; };
    SimpleTabBodyApp.propDecorators = {
        "tabBody": [{ type: core_1.ViewChild, args: [tab_body_1.MatTabBody,] },],
        "template": [{ type: core_1.ViewChild, args: [core_1.TemplateRef,] },],
    };
    return SimpleTabBodyApp;
}());
//# sourceMappingURL=tab-body.spec.js.map