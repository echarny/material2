"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var animations_1 = require("@angular/platform-browser/animations");
var public_api_1 = require("./public-api");
describe('CdkAccordion', function () {
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [
                animations_1.BrowserAnimationsModule,
                public_api_1.CdkAccordionModule
            ],
            declarations: [
                SetOfItems,
                NestedItems,
            ],
        });
        testing_1.TestBed.compileComponents();
    }));
    it('should ensure only one item is expanded at a time', function () {
        var fixture = testing_1.TestBed.createComponent(SetOfItems);
        var _a = fixture.debugElement
            .queryAll(platform_browser_1.By.directive(public_api_1.CdkAccordionItem))
            .map(function (el) {
            return el.injector.get(public_api_1.CdkAccordionItem);
        }), firstPanel = _a[0], secondPanel = _a[1];
        firstPanel.open();
        fixture.detectChanges();
        expect(firstPanel.expanded).toBeTruthy();
        expect(secondPanel.expanded).toBeFalsy();
        secondPanel.open();
        fixture.detectChanges();
        expect(firstPanel.expanded).toBeFalsy();
        expect(secondPanel.expanded).toBeTruthy();
    });
    it('should allow multiple items to be expanded simultaneously', function () {
        var fixture = testing_1.TestBed.createComponent(SetOfItems);
        var _a = fixture.debugElement
            .queryAll(platform_browser_1.By.directive(public_api_1.CdkAccordionItem))
            .map(function (el) {
            return el.injector.get(public_api_1.CdkAccordionItem);
        }), firstPanel = _a[0], secondPanel = _a[1];
        fixture.componentInstance.multi = true;
        fixture.detectChanges();
        firstPanel.expanded = true;
        secondPanel.expanded = true;
        fixture.detectChanges();
        expect(firstPanel.expanded).toBeTruthy();
        expect(secondPanel.expanded).toBeTruthy();
    });
    it('should not register nested items to the same accordion', function () {
        var fixture = testing_1.TestBed.createComponent(NestedItems);
        var innerItem = fixture.componentInstance.innerItem;
        var outerItem = fixture.componentInstance.outerItem;
        expect(innerItem.accordion).not.toBe(outerItem.accordion);
    });
});
var SetOfItems = /** @class */ (function () {
    function SetOfItems() {
        this.multi = false;
    }
    SetOfItems.decorators = [
        { type: core_1.Component, args: [{ template: "\n  <cdk-accordion [multi]=\"multi\">\n    <cdk-accordion-item #item1></cdk-accordion-item>\n    <cdk-accordion-item #item2></cdk-accordion-item>\n  </cdk-accordion>" },] },
    ];
    /** @nocollapse */
    SetOfItems.propDecorators = {
        "item1": [{ type: core_1.ViewChild, args: ['item1',] },],
        "item2": [{ type: core_1.ViewChild, args: ['item2',] },],
    };
    return SetOfItems;
}());
var NestedItems = /** @class */ (function () {
    function NestedItems() {
    }
    NestedItems.decorators = [
        { type: core_1.Component, args: [{ template: "\n  <cdk-accordion>\n    <cdk-accordion-item #outerItem=\"cdkAccordionItem\">\n      <cdk-accordion-item #innerItem=\"cdkAccordionItem\"></cdk-accordion-item>\n    </cdk-accordion-item>\n  </cdk-accordion>" },] },
    ];
    /** @nocollapse */
    NestedItems.propDecorators = {
        "outerItem": [{ type: core_1.ViewChild, args: ['outerItem',] },],
        "innerItem": [{ type: core_1.ViewChild, args: ['innerItem',] },],
    };
    return NestedItems;
}());
//# sourceMappingURL=accordion.spec.js.map