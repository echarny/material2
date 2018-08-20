"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var testing_1 = require("@angular/core/testing");
var platform_browser_1 = require("@angular/platform-browser");
var index_1 = require("./index");
describe('MatToolbar', function () {
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [index_1.MatToolbarModule],
            declarations: [ToolbarSingleRow, ToolbarMultipleRows, ToolbarMixedRowModes],
        });
        testing_1.TestBed.compileComponents();
    }));
    describe('with single row', function () {
        var fixture;
        var testComponent;
        var toolbarElement;
        beforeEach(function () {
            fixture = testing_1.TestBed.createComponent(ToolbarSingleRow);
            testComponent = fixture.debugElement.componentInstance;
            toolbarElement = fixture.debugElement.query(platform_browser_1.By.css('.mat-toolbar')).nativeElement;
        });
        it('should apply class based on color attribute', function () {
            testComponent.toolbarColor = 'primary';
            fixture.detectChanges();
            expect(toolbarElement.classList.contains('mat-primary')).toBe(true);
            testComponent.toolbarColor = 'accent';
            fixture.detectChanges();
            expect(toolbarElement.classList.contains('mat-primary')).toBe(false);
            expect(toolbarElement.classList.contains('mat-accent')).toBe(true);
            testComponent.toolbarColor = 'warn';
            fixture.detectChanges();
            expect(toolbarElement.classList.contains('mat-accent')).toBe(false);
            expect(toolbarElement.classList.contains('mat-warn')).toBe(true);
        });
        it('should not wrap the first row contents inside of a generated element', function () {
            expect(toolbarElement.firstElementChild.tagName).toBe('SPAN', 'Expected the <span> element of the first row to be a direct child of the toolbar');
        });
    });
    describe('with multiple rows', function () {
        it('should project each toolbar-row element inside of the toolbar', function () {
            var fixture = testing_1.TestBed.createComponent(ToolbarMultipleRows);
            fixture.detectChanges();
            expect(fixture.debugElement.queryAll(platform_browser_1.By.css('.mat-toolbar > .mat-toolbar-row')).length)
                .toBe(2, 'Expected one toolbar row to be present while no content is projected.');
        });
        it('should throw an error if different toolbar modes are mixed', function () {
            expect(function () {
                var fixture = testing_1.TestBed.createComponent(ToolbarMixedRowModes);
                fixture.detectChanges();
            }).toThrowError(/attempting to combine different/i);
        });
        it('should throw an error if a toolbar-row is added later', testing_1.fakeAsync(function () {
            var fixture = testing_1.TestBed.createComponent(ToolbarMixedRowModes);
            fixture.componentInstance.showToolbarRow = false;
            fixture.detectChanges();
            testing_1.flush();
            expect(function () {
                try {
                    fixture.componentInstance.showToolbarRow = true;
                    fixture.detectChanges();
                    testing_1.flush();
                }
                catch (e) {
                    testing_1.flush();
                }
            }).toThrowError(/attempting to combine different/i);
        }));
    });
});
var ToolbarSingleRow = /** @class */ (function () {
    function ToolbarSingleRow() {
    }
    ToolbarSingleRow.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <mat-toolbar [color]=\"toolbarColor\">\n      <span>First Row</span>\n    </mat-toolbar>\n  "
                },] },
    ];
    return ToolbarSingleRow;
}());
var ToolbarMultipleRows = /** @class */ (function () {
    function ToolbarMultipleRows() {
    }
    ToolbarMultipleRows.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <mat-toolbar>\n      <mat-toolbar-row>First Row</mat-toolbar-row>\n      <mat-toolbar-row>Second Row</mat-toolbar-row>\n    </mat-toolbar>\n  "
                },] },
    ];
    return ToolbarMultipleRows;
}());
var ToolbarMixedRowModes = /** @class */ (function () {
    function ToolbarMixedRowModes() {
        this.showToolbarRow = true;
    }
    ToolbarMixedRowModes.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <mat-toolbar>\n      First Row\n      <mat-toolbar-row *ngIf=\"showToolbarRow\">Second Row</mat-toolbar-row>\n    </mat-toolbar>\n  "
                },] },
    ];
    return ToolbarMixedRowModes;
}());
//# sourceMappingURL=toolbar.spec.js.map