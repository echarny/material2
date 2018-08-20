"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var animations_1 = require("@angular/platform-browser/animations");
var public_api_1 = require("./public-api");
describe('CdkAccordionItem', function () {
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [
                animations_1.BrowserAnimationsModule,
                public_api_1.CdkAccordionModule
            ],
            declarations: [
                SingleItem,
                ItemGroupWithoutAccordion,
                ItemGroupWithAccordion
            ],
        });
        testing_1.TestBed.compileComponents();
    }));
    describe('single item', function () {
        var fixture;
        var item;
        beforeEach(function () {
            fixture = testing_1.TestBed.createComponent(SingleItem);
            item = fixture.debugElement
                .query(platform_browser_1.By.directive(public_api_1.CdkAccordionItem))
                .injector.get(public_api_1.CdkAccordionItem);
        });
        describe('that is not disabled', function () {
            beforeEach(function () {
                item.disabled = false;
            });
            it('should toggle its expanded state', function () {
                expect(item.expanded).toBe(false);
                item.toggle();
                expect(item.expanded).toBe(true);
                item.toggle();
                expect(item.expanded).toBe(false);
            });
            it('should set its expanded state to expanded', function () {
                item.expanded = false;
                item.open();
                expect(item.expanded).toBe(true);
            });
            it('should set its expanded state to closed', function () {
                item.expanded = true;
                item.close();
                expect(item.expanded).toBe(false);
            });
            it('should emit a closed event', function () {
                item.open();
                fixture.detectChanges();
                spyOn(item.closed, 'emit');
                item.close();
                fixture.detectChanges();
                expect(item.closed.emit).toHaveBeenCalled();
            });
            it('should not emit a closed event when the item is closed already', function () {
                expect(item.expanded).toBe(false);
                spyOn(item.closed, 'emit');
                item.close();
                fixture.detectChanges();
                expect(item.closed.emit).not.toHaveBeenCalled();
            });
            it('should emit an opened event', function () {
                spyOn(item.opened, 'emit');
                item.open();
                fixture.detectChanges();
                expect(item.opened.emit).toHaveBeenCalled();
            });
            it('should emit a destroyed event', function () {
                spyOn(item.destroyed, 'emit');
                item.ngOnDestroy();
                fixture.detectChanges();
                expect(item.destroyed.emit).toHaveBeenCalled();
            });
        });
        describe('that is disabled', function () {
            beforeEach(function () {
                item.disabled = true;
            });
            it('should not toggle its expanded state', function () {
                expect(item.expanded).toBe(false);
                item.toggle();
                expect(item.expanded).toBe(false);
            });
            it('should not set its expanded state to expanded', function () {
                item.expanded = false;
                item.open();
                expect(item.expanded).toBe(false);
            });
            it('should not set its expanded state to closed', function () {
                item.expanded = true;
                item.close();
                expect(item.expanded).toBe(true);
            });
            it('should not emit a closed event', function () {
                spyOn(item.closed, 'emit');
                item.close();
                fixture.detectChanges();
                expect(item.closed.emit).not.toHaveBeenCalled();
            });
            it('should not emit an opened event', function () {
                spyOn(item.opened, 'emit');
                item.open();
                fixture.detectChanges();
                expect(item.opened.emit).not.toHaveBeenCalled();
            });
            it('should emit a destroyed event', function () {
                spyOn(item.destroyed, 'emit');
                item.ngOnDestroy();
                fixture.detectChanges();
                expect(item.destroyed.emit).toHaveBeenCalled();
            });
        });
        it('should emit to and complete the `destroyed` stream on destroy', function () {
            var emitSpy = jasmine.createSpy('emit spy');
            var completeSpy = jasmine.createSpy('complete spy');
            var subscription = item.destroyed.subscribe(emitSpy, undefined, completeSpy);
            fixture.detectChanges();
            fixture.destroy();
            expect(emitSpy).toHaveBeenCalled();
            expect(completeSpy).toHaveBeenCalled();
            subscription.unsubscribe();
        });
        it('should complete the `opened` stream on destroy', function () {
            var completeSpy = jasmine.createSpy('complete spy');
            var subscription = item.opened.subscribe(function () { }, undefined, completeSpy);
            fixture.detectChanges();
            fixture.destroy();
            expect(completeSpy).toHaveBeenCalled();
            subscription.unsubscribe();
        });
        it('should complete the `closed` stream on destroy', function () {
            var completeSpy = jasmine.createSpy('complete spy');
            var subscription = item.closed.subscribe(function () { }, undefined, completeSpy);
            fixture.detectChanges();
            fixture.destroy();
            expect(completeSpy).toHaveBeenCalled();
            subscription.unsubscribe();
        });
    });
    describe('items without accordion', function () {
        var fixture;
        var firstItem;
        var secondItem;
        beforeEach(function () {
            fixture = testing_1.TestBed.createComponent(ItemGroupWithoutAccordion);
            _a = fixture.debugElement
                .queryAll(platform_browser_1.By.directive(public_api_1.CdkAccordionItem))
                .map(function (el) {
                return el.injector.get(public_api_1.CdkAccordionItem);
            }), firstItem = _a[0], secondItem = _a[1];
            var _a;
        });
        it('should not change expanded state based on unrelated items', function () {
            expect(firstItem.expanded).toBe(false);
            expect(secondItem.expanded).toBe(false);
            firstItem.open();
            fixture.detectChanges();
            expect(firstItem.expanded).toBe(true);
            expect(secondItem.expanded).toBe(false);
            secondItem.open();
            fixture.detectChanges();
            expect(firstItem.expanded).toBe(true);
            expect(secondItem.expanded).toBe(true);
        });
        it('should not change expanded state for disabled items', function () {
            firstItem.disabled = true;
            expect(firstItem.expanded).toBe(false);
            expect(secondItem.expanded).toBe(false);
            firstItem.open();
            fixture.detectChanges();
            expect(firstItem.expanded).toBe(false);
            expect(secondItem.expanded).toBe(false);
            secondItem.open();
            fixture.detectChanges();
            expect(firstItem.expanded).toBe(false);
            expect(secondItem.expanded).toBe(true);
        });
    });
    describe('items in accordion', function () {
        var fixture;
        var firstItem;
        var secondItem;
        beforeEach(function () {
            fixture = testing_1.TestBed.createComponent(ItemGroupWithAccordion);
            _a = fixture.debugElement
                .queryAll(platform_browser_1.By.directive(public_api_1.CdkAccordionItem))
                .map(function (el) {
                return el.injector.get(public_api_1.CdkAccordionItem);
            }), firstItem = _a[0], secondItem = _a[1];
            var _a;
        });
        it('should change expanded state based on related items', function () {
            expect(firstItem.expanded).toBe(false);
            expect(secondItem.expanded).toBe(false);
            firstItem.open();
            fixture.detectChanges();
            expect(firstItem.expanded).toBe(true);
            expect(secondItem.expanded).toBe(false);
            secondItem.open();
            fixture.detectChanges();
            expect(firstItem.expanded).toBe(false);
            expect(secondItem.expanded).toBe(true);
        });
    });
});
var SingleItem = /** @class */ (function () {
    function SingleItem() {
    }
    SingleItem.decorators = [
        { type: core_1.Component, args: [{
                    template: "<cdk-accordion-item #item1></cdk-accordion-item>"
                },] },
    ];
    return SingleItem;
}());
var ItemGroupWithoutAccordion = /** @class */ (function () {
    function ItemGroupWithoutAccordion() {
    }
    ItemGroupWithoutAccordion.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <cdk-accordion-item #item1></cdk-accordion-item>\n    <cdk-accordion-item #item2></cdk-accordion-item>\n  "
                },] },
    ];
    return ItemGroupWithoutAccordion;
}());
var ItemGroupWithAccordion = /** @class */ (function () {
    function ItemGroupWithAccordion() {
    }
    ItemGroupWithAccordion.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <cdk-accordion>\n      <cdk-accordion-item #item1></cdk-accordion-item>\n      <cdk-accordion-item #item2></cdk-accordion-item>\n    </cdk-accordion>\n  "
                },] },
    ];
    return ItemGroupWithAccordion;
}());
//# sourceMappingURL=accordion-item.spec.js.map