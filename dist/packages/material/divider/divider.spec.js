"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var divider_module_1 = require("./divider-module");
describe('MatDivider', function () {
    var fixture;
    beforeEach(testing_1.fakeAsync(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [divider_module_1.MatDividerModule],
            declarations: [MatDividerTestComponent],
        });
        testing_1.TestBed.compileComponents();
        fixture = testing_1.TestBed.createComponent(MatDividerTestComponent);
    }));
    it('should apply vertical class to vertical divider', function () {
        fixture.componentInstance.vertical = true;
        fixture.detectChanges();
        var divider = fixture.debugElement.query(platform_browser_1.By.css('mat-divider'));
        expect(divider.nativeElement.classList).toContain('mat-divider');
        expect(divider.nativeElement.classList).toContain('mat-divider-vertical');
    });
    it('should apply horizontal class to horizontal divider', function () {
        fixture.componentInstance.vertical = false;
        fixture.detectChanges();
        var divider = fixture.debugElement.query(platform_browser_1.By.css('mat-divider'));
        expect(divider.nativeElement.classList).toContain('mat-divider');
        expect(divider.nativeElement.classList).not.toContain('mat-divider-vertical');
        expect(divider.nativeElement.classList).toContain('mat-divider-horizontal');
    });
    it('should apply inset class to inset divider', function () {
        fixture.componentInstance.inset = true;
        fixture.detectChanges();
        var divider = fixture.debugElement.query(platform_browser_1.By.css('mat-divider'));
        expect(divider.nativeElement.classList).toContain('mat-divider');
        expect(divider.nativeElement.classList).toContain('mat-divider-inset');
    });
    it('should apply inset and vertical classes to vertical inset divider', function () {
        fixture.componentInstance.vertical = true;
        fixture.componentInstance.inset = true;
        fixture.detectChanges();
        var divider = fixture.debugElement.query(platform_browser_1.By.css('mat-divider'));
        expect(divider.nativeElement.classList).toContain('mat-divider');
        expect(divider.nativeElement.classList).toContain('mat-divider-inset');
        expect(divider.nativeElement.classList).toContain('mat-divider-vertical');
    });
    it('should add aria roles properly', function () {
        fixture.detectChanges();
        var divider = fixture.debugElement.query(platform_browser_1.By.css('mat-divider'));
        expect(divider.nativeElement.getAttribute('role')).toBe('separator');
    });
});
var MatDividerTestComponent = /** @class */ (function () {
    function MatDividerTestComponent() {
    }
    MatDividerTestComponent.decorators = [
        { type: core_1.Component, args: [{
                    template: "<mat-divider [vertical]=\"vertical\" [inset]=\"inset\"></mat-divider>"
                },] },
    ];
    return MatDividerTestComponent;
}());
//# sourceMappingURL=divider.spec.js.map