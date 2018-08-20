"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var testing_1 = require("@angular/core/testing");
var index_1 = require("./index");
var animations_1 = require("@angular/platform-browser/animations");
var platform_browser_1 = require("@angular/platform-browser");
describe('MatSidenav', function () {
    var fixture;
    var sidenavEl;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [index_1.MatSidenavModule, animations_1.NoopAnimationsModule],
            declarations: [SidenavWithFixedPosition],
        });
        testing_1.TestBed.compileComponents();
        fixture = testing_1.TestBed.createComponent(SidenavWithFixedPosition);
        fixture.detectChanges();
        sidenavEl = fixture.debugElement.query(platform_browser_1.By.directive(index_1.MatSidenav)).nativeElement;
    }));
    it('should be fixed position when in fixed mode', function () {
        expect(sidenavEl.classList).toContain('mat-sidenav-fixed');
        fixture.componentInstance.fixed = false;
        fixture.detectChanges();
        expect(sidenavEl.classList).not.toContain('mat-sidenav-fixed');
    });
    it('should set fixed bottom and top when in fixed mode', function () {
        expect(sidenavEl.style.top).toBe('20px');
        expect(sidenavEl.style.bottom).toBe('30px');
        fixture.componentInstance.fixed = false;
        fixture.detectChanges();
        expect(sidenavEl.style.top).toBeFalsy();
        expect(sidenavEl.style.bottom).toBeFalsy();
    });
});
var SidenavWithFixedPosition = /** @class */ (function () {
    function SidenavWithFixedPosition() {
        this.fixed = true;
        this.fixedTop = 20;
        this.fixedBottom = 30;
    }
    SidenavWithFixedPosition.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <mat-sidenav-container>\n      <mat-sidenav\n          #drawer\n          [fixedInViewport]=\"fixed\"\n          [fixedTopGap]=\"fixedTop\"\n          [fixedBottomGap]=\"fixedBottom\">\n        Drawer.\n      </mat-sidenav>\n      <mat-sidenav-content>\n        Some content.\n      </mat-sidenav-content>\n    </mat-sidenav-container>",
                },] },
    ];
    return SidenavWithFixedPosition;
}());
//# sourceMappingURL=sidenav.spec.js.map