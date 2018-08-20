"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var scrolling_1 = require("@angular/cdk/scrolling");
var core_1 = require("@angular/core");
var testing_1 = require("@angular/core/testing");
function expectOverlapping(el1, el2, expected) {
    if (expected === void 0) { expected = true; }
    var r1 = el1.nativeElement.getBoundingClientRect();
    var r2 = el2.nativeElement.getBoundingClientRect();
    var actual = r1.left < r2.right && r1.right > r2.left && r1.top < r2.bottom && r1.bottom > r2.top;
    if (expected) {
        expect(actual)
            .toBe(expected, JSON.stringify(r1) + " should overlap with " + JSON.stringify(r2));
    }
    else {
        expect(actual)
            .toBe(expected, JSON.stringify(r1) + " should not overlap with " + JSON.stringify(r2));
    }
}
describe('CdkScrollable', function () {
    var fixture;
    var testComponent;
    var maxOffset = 0;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [scrolling_1.ScrollingModule],
            declarations: [ScrollableViewport],
        }).compileComponents();
        fixture = testing_1.TestBed.createComponent(ScrollableViewport);
        testComponent = fixture.componentInstance;
    }));
    describe('in LTR context', function () {
        beforeEach(function () {
            fixture.detectChanges();
            maxOffset = testComponent.scrollContainer.nativeElement.scrollHeight -
                testComponent.scrollContainer.nativeElement.clientHeight;
        });
        it('should initially be scrolled to top-left', function () {
            expectOverlapping(testComponent.scrollContainer, testComponent.firstRowStart, true);
            expectOverlapping(testComponent.scrollContainer, testComponent.firstRowEnd, false);
            expectOverlapping(testComponent.scrollContainer, testComponent.lastRowStart, false);
            expectOverlapping(testComponent.scrollContainer, testComponent.lastRowEnd, false);
            expect(testComponent.scrollable.measureScrollOffset('top')).toBe(0);
            expect(testComponent.scrollable.measureScrollOffset('bottom')).toBe(maxOffset);
            expect(testComponent.scrollable.measureScrollOffset('left')).toBe(0);
            expect(testComponent.scrollable.measureScrollOffset('right')).toBe(maxOffset);
            expect(testComponent.scrollable.measureScrollOffset('start')).toBe(0);
            expect(testComponent.scrollable.measureScrollOffset('end')).toBe(maxOffset);
        });
        it('should scrollTo top-left', function () {
            testComponent.scrollable.scrollTo({ top: 0, left: 0 });
            expectOverlapping(testComponent.scrollContainer, testComponent.firstRowStart, true);
            expectOverlapping(testComponent.scrollContainer, testComponent.firstRowEnd, false);
            expectOverlapping(testComponent.scrollContainer, testComponent.lastRowStart, false);
            expectOverlapping(testComponent.scrollContainer, testComponent.lastRowEnd, false);
            expect(testComponent.scrollable.measureScrollOffset('top')).toBe(0);
            expect(testComponent.scrollable.measureScrollOffset('bottom')).toBe(maxOffset);
            expect(testComponent.scrollable.measureScrollOffset('left')).toBe(0);
            expect(testComponent.scrollable.measureScrollOffset('right')).toBe(maxOffset);
            expect(testComponent.scrollable.measureScrollOffset('start')).toBe(0);
            expect(testComponent.scrollable.measureScrollOffset('end')).toBe(maxOffset);
        });
        it('should scrollTo bottom-right', function () {
            testComponent.scrollable.scrollTo({ bottom: 0, right: 0 });
            expectOverlapping(testComponent.scrollContainer, testComponent.firstRowStart, false);
            expectOverlapping(testComponent.scrollContainer, testComponent.firstRowEnd, false);
            expectOverlapping(testComponent.scrollContainer, testComponent.lastRowStart, false);
            expectOverlapping(testComponent.scrollContainer, testComponent.lastRowEnd, true);
            expect(testComponent.scrollable.measureScrollOffset('top')).toBe(maxOffset);
            expect(testComponent.scrollable.measureScrollOffset('bottom')).toBe(0);
            expect(testComponent.scrollable.measureScrollOffset('left')).toBe(maxOffset);
            expect(testComponent.scrollable.measureScrollOffset('right')).toBe(0);
            expect(testComponent.scrollable.measureScrollOffset('start')).toBe(maxOffset);
            expect(testComponent.scrollable.measureScrollOffset('end')).toBe(0);
        });
        it('should scroll to top-end', function () {
            testComponent.scrollable.scrollTo({ top: 0, end: 0 });
            expectOverlapping(testComponent.scrollContainer, testComponent.firstRowStart, false);
            expectOverlapping(testComponent.scrollContainer, testComponent.firstRowEnd, true);
            expectOverlapping(testComponent.scrollContainer, testComponent.lastRowStart, false);
            expectOverlapping(testComponent.scrollContainer, testComponent.lastRowEnd, false);
            expect(testComponent.scrollable.measureScrollOffset('top')).toBe(0);
            expect(testComponent.scrollable.measureScrollOffset('bottom')).toBe(maxOffset);
            expect(testComponent.scrollable.measureScrollOffset('left')).toBe(maxOffset);
            expect(testComponent.scrollable.measureScrollOffset('right')).toBe(0);
            expect(testComponent.scrollable.measureScrollOffset('start')).toBe(maxOffset);
            expect(testComponent.scrollable.measureScrollOffset('end')).toBe(0);
        });
        it('should scroll to bottom-start', function () {
            testComponent.scrollable.scrollTo({ bottom: 0, start: 0 });
            expectOverlapping(testComponent.scrollContainer, testComponent.firstRowStart, false);
            expectOverlapping(testComponent.scrollContainer, testComponent.firstRowEnd, false);
            expectOverlapping(testComponent.scrollContainer, testComponent.lastRowStart, true);
            expectOverlapping(testComponent.scrollContainer, testComponent.lastRowEnd, false);
            expect(testComponent.scrollable.measureScrollOffset('top')).toBe(maxOffset);
            expect(testComponent.scrollable.measureScrollOffset('bottom')).toBe(0);
            expect(testComponent.scrollable.measureScrollOffset('left')).toBe(0);
            expect(testComponent.scrollable.measureScrollOffset('right')).toBe(maxOffset);
            expect(testComponent.scrollable.measureScrollOffset('start')).toBe(0);
            expect(testComponent.scrollable.measureScrollOffset('end')).toBe(maxOffset);
        });
    });
    describe('in RTL context', function () {
        beforeEach(function () {
            testComponent.dir = 'rtl';
            fixture.detectChanges();
            maxOffset = testComponent.scrollContainer.nativeElement.scrollHeight -
                testComponent.scrollContainer.nativeElement.clientHeight;
        });
        it('should initially be scrolled to top-right', function () {
            expectOverlapping(testComponent.scrollContainer, testComponent.firstRowStart, true);
            expectOverlapping(testComponent.scrollContainer, testComponent.firstRowEnd, false);
            expectOverlapping(testComponent.scrollContainer, testComponent.lastRowStart, false);
            expectOverlapping(testComponent.scrollContainer, testComponent.lastRowEnd, false);
            expect(testComponent.scrollable.measureScrollOffset('top')).toBe(0);
            expect(testComponent.scrollable.measureScrollOffset('bottom')).toBe(maxOffset);
            expect(testComponent.scrollable.measureScrollOffset('left')).toBe(maxOffset);
            expect(testComponent.scrollable.measureScrollOffset('right')).toBe(0);
            expect(testComponent.scrollable.measureScrollOffset('start')).toBe(0);
            expect(testComponent.scrollable.measureScrollOffset('end')).toBe(maxOffset);
        });
        it('should scrollTo top-left', function () {
            testComponent.scrollable.scrollTo({ top: 0, left: 0 });
            expectOverlapping(testComponent.scrollContainer, testComponent.firstRowStart, false);
            expectOverlapping(testComponent.scrollContainer, testComponent.firstRowEnd, true);
            expectOverlapping(testComponent.scrollContainer, testComponent.lastRowStart, false);
            expectOverlapping(testComponent.scrollContainer, testComponent.lastRowEnd, false);
            expect(testComponent.scrollable.measureScrollOffset('top')).toBe(0);
            expect(testComponent.scrollable.measureScrollOffset('bottom')).toBe(maxOffset);
            expect(testComponent.scrollable.measureScrollOffset('left')).toBe(0);
            expect(testComponent.scrollable.measureScrollOffset('right')).toBe(maxOffset);
            expect(testComponent.scrollable.measureScrollOffset('start')).toBe(maxOffset);
            expect(testComponent.scrollable.measureScrollOffset('end')).toBe(0);
        });
        it('should scrollTo bottom-right', function () {
            testComponent.scrollable.scrollTo({ bottom: 0, right: 0 });
            expectOverlapping(testComponent.scrollContainer, testComponent.firstRowStart, false);
            expectOverlapping(testComponent.scrollContainer, testComponent.firstRowEnd, false);
            expectOverlapping(testComponent.scrollContainer, testComponent.lastRowStart, true);
            expectOverlapping(testComponent.scrollContainer, testComponent.lastRowEnd, false);
            expect(testComponent.scrollable.measureScrollOffset('top')).toBe(maxOffset);
            expect(testComponent.scrollable.measureScrollOffset('bottom')).toBe(0);
            expect(testComponent.scrollable.measureScrollOffset('left')).toBe(maxOffset);
            expect(testComponent.scrollable.measureScrollOffset('right')).toBe(0);
            expect(testComponent.scrollable.measureScrollOffset('start')).toBe(0);
            expect(testComponent.scrollable.measureScrollOffset('end')).toBe(maxOffset);
        });
        it('should scroll to top-end', function () {
            testComponent.scrollable.scrollTo({ top: 0, end: 0 });
            expectOverlapping(testComponent.scrollContainer, testComponent.firstRowStart, false);
            expectOverlapping(testComponent.scrollContainer, testComponent.firstRowEnd, true);
            expectOverlapping(testComponent.scrollContainer, testComponent.lastRowStart, false);
            expectOverlapping(testComponent.scrollContainer, testComponent.lastRowEnd, false);
            expect(testComponent.scrollable.measureScrollOffset('top')).toBe(0);
            expect(testComponent.scrollable.measureScrollOffset('bottom')).toBe(maxOffset);
            expect(testComponent.scrollable.measureScrollOffset('left')).toBe(0);
            expect(testComponent.scrollable.measureScrollOffset('right')).toBe(maxOffset);
            expect(testComponent.scrollable.measureScrollOffset('start')).toBe(maxOffset);
            expect(testComponent.scrollable.measureScrollOffset('end')).toBe(0);
        });
        it('should scroll to bottom-start', function () {
            testComponent.scrollable.scrollTo({ bottom: 0, start: 0 });
            expectOverlapping(testComponent.scrollContainer, testComponent.firstRowStart, false);
            expectOverlapping(testComponent.scrollContainer, testComponent.firstRowEnd, false);
            expectOverlapping(testComponent.scrollContainer, testComponent.lastRowStart, true);
            expectOverlapping(testComponent.scrollContainer, testComponent.lastRowEnd, false);
            expect(testComponent.scrollable.measureScrollOffset('top')).toBe(maxOffset);
            expect(testComponent.scrollable.measureScrollOffset('bottom')).toBe(0);
            expect(testComponent.scrollable.measureScrollOffset('left')).toBe(maxOffset);
            expect(testComponent.scrollable.measureScrollOffset('right')).toBe(0);
            expect(testComponent.scrollable.measureScrollOffset('start')).toBe(0);
            expect(testComponent.scrollable.measureScrollOffset('end')).toBe(maxOffset);
        });
    });
});
var ScrollableViewport = /** @class */ (function () {
    function ScrollableViewport() {
    }
    ScrollableViewport.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <div #scrollContainer class=\"scroll-container\" cdkScrollable [dir]=\"dir\">\n      <div class=\"row\">\n        <div #firstRowStart class=\"cell\"></div>\n        <div #firstRowEnd class=\"cell\"></div>\n      </div>\n      <div class=\"row\">\n        <div #lastRowStart class=\"cell\"></div>\n        <div #lastRowEnd class=\"cell\"></div>\n      </div>\n    </div>",
                    styles: ["\n    .scroll-container {\n      width: 100px;\n      height: 100px;\n      overflow: auto;\n    }\n\n    .row {\n      display: flex;\n      flex-direction: row;\n    }\n\n    .cell {\n      flex: none;\n      width: 100px;\n      height: 100px;\n    }\n  "]
                },] },
    ];
    /** @nocollapse */
    ScrollableViewport.propDecorators = {
        "dir": [{ type: core_1.Input },],
        "scrollable": [{ type: core_1.ViewChild, args: [scrolling_1.CdkScrollable,] },],
        "scrollContainer": [{ type: core_1.ViewChild, args: ['scrollContainer',] },],
        "firstRowStart": [{ type: core_1.ViewChild, args: ['firstRowStart',] },],
        "firstRowEnd": [{ type: core_1.ViewChild, args: ['firstRowEnd',] },],
        "lastRowStart": [{ type: core_1.ViewChild, args: ['lastRowStart',] },],
        "lastRowEnd": [{ type: core_1.ViewChild, args: ['lastRowEnd',] },],
    };
    return ScrollableViewport;
}());
//# sourceMappingURL=scrollable.spec.js.map