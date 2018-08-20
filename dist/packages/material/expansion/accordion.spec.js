"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var animations_1 = require("@angular/platform-browser/animations");
var index_1 = require("./index");
describe('MatAccordion', function () {
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [
                animations_1.BrowserAnimationsModule,
                index_1.MatExpansionModule
            ],
            declarations: [
                NestedPanel,
                SetOfItems,
            ],
        });
        testing_1.TestBed.compileComponents();
    }));
    it('should ensure only one item is expanded at a time', function () {
        var fixture = testing_1.TestBed.createComponent(SetOfItems);
        var items = fixture.debugElement.queryAll(platform_browser_1.By.css('.mat-expansion-panel'));
        fixture.componentInstance.firstPanelExpanded = true;
        fixture.detectChanges();
        expect(items[0].classes['mat-expanded']).toBeTruthy();
        expect(items[1].classes['mat-expanded']).toBeFalsy();
        fixture.componentInstance.secondPanelExpanded = true;
        fixture.detectChanges();
        expect(items[0].classes['mat-expanded']).toBeFalsy();
        expect(items[1].classes['mat-expanded']).toBeTruthy();
    });
    it('should allow multiple items to be expanded simultaneously', function () {
        var fixture = testing_1.TestBed.createComponent(SetOfItems);
        var panels = fixture.debugElement.queryAll(platform_browser_1.By.css('.mat-expansion-panel'));
        fixture.componentInstance.multi = true;
        fixture.componentInstance.firstPanelExpanded = true;
        fixture.componentInstance.secondPanelExpanded = true;
        fixture.detectChanges();
        expect(panels[0].classes['mat-expanded']).toBeTruthy();
        expect(panels[1].classes['mat-expanded']).toBeTruthy();
    });
    it('should expand or collapse all enabled items', function () {
        var fixture = testing_1.TestBed.createComponent(SetOfItems);
        var panels = fixture.debugElement.queryAll(platform_browser_1.By.css('.mat-expansion-panel'));
        fixture.componentInstance.multi = true;
        fixture.componentInstance.secondPanelExpanded = true;
        fixture.detectChanges();
        expect(panels[0].classes['mat-expanded']).toBeFalsy();
        expect(panels[1].classes['mat-expanded']).toBeTruthy();
        fixture.componentInstance.accordion.openAll();
        fixture.detectChanges();
        expect(panels[0].classes['mat-expanded']).toBeTruthy();
        expect(panels[1].classes['mat-expanded']).toBeTruthy();
        fixture.componentInstance.accordion.closeAll();
        fixture.detectChanges();
        expect(panels[0].classes['mat-expanded']).toBeFalsy();
        expect(panels[1].classes['mat-expanded']).toBeFalsy();
    });
    it('should not expand or collapse disabled items', function () {
        var fixture = testing_1.TestBed.createComponent(SetOfItems);
        var panels = fixture.debugElement.queryAll(platform_browser_1.By.css('.mat-expansion-panel'));
        fixture.componentInstance.multi = true;
        fixture.componentInstance.secondPanelDisabled = true;
        fixture.detectChanges();
        fixture.componentInstance.accordion.openAll();
        fixture.detectChanges();
        expect(panels[0].classes['mat-expanded']).toBeTruthy();
        expect(panels[1].classes['mat-expanded']).toBeFalsy();
        fixture.componentInstance.accordion.closeAll();
        fixture.detectChanges();
        expect(panels[0].classes['mat-expanded']).toBeFalsy();
        expect(panels[1].classes['mat-expanded']).toBeFalsy();
    });
    it('should not register nested panels to the same accordion', function () {
        var fixture = testing_1.TestBed.createComponent(NestedPanel);
        var innerPanel = fixture.componentInstance.innerPanel;
        var outerPanel = fixture.componentInstance.outerPanel;
        expect(innerPanel.accordion).not.toBe(outerPanel.accordion);
    });
});
var SetOfItems = /** @class */ (function () {
    function SetOfItems() {
        this.multi = false;
        this.firstPanelExpanded = false;
        this.secondPanelExpanded = false;
        this.secondPanelDisabled = false;
    }
    SetOfItems.decorators = [
        { type: core_1.Component, args: [{ template: "\n  <mat-accordion [multi]=\"multi\">\n    <mat-expansion-panel [expanded]=\"firstPanelExpanded\">\n      <mat-expansion-panel-header>Summary</mat-expansion-panel-header>\n      <p>Content</p>\n    </mat-expansion-panel>\n    <mat-expansion-panel [expanded]=\"secondPanelExpanded\" [disabled]=\"secondPanelDisabled\">\n      <mat-expansion-panel-header>Summary</mat-expansion-panel-header>\n      <p>Content</p>\n    </mat-expansion-panel>\n  </mat-accordion>" },] },
    ];
    /** @nocollapse */
    SetOfItems.propDecorators = {
        "accordion": [{ type: core_1.ViewChild, args: [index_1.MatAccordion,] },],
    };
    return SetOfItems;
}());
var NestedPanel = /** @class */ (function () {
    function NestedPanel() {
    }
    NestedPanel.decorators = [
        { type: core_1.Component, args: [{ template: "\n  <mat-accordion>\n    <mat-expansion-panel #outerPanel=\"matExpansionPanel\">\n      <mat-expansion-panel-header>Outer Panel</mat-expansion-panel-header>\n      <mat-expansion-panel #innerPanel=\"matExpansionPanel\">\n        <mat-expansion-panel-header>Inner Panel</mat-expansion-panel-header>\n        <p>Content</p>\n      </mat-expansion-panel>\n    </mat-expansion-panel>\n  </mat-accordion>" },] },
    ];
    /** @nocollapse */
    NestedPanel.propDecorators = {
        "outerPanel": [{ type: core_1.ViewChild, args: ['outerPanel',] },],
        "innerPanel": [{ type: core_1.ViewChild, args: ['innerPanel',] },],
    };
    return NestedPanel;
}());
//# sourceMappingURL=accordion.spec.js.map