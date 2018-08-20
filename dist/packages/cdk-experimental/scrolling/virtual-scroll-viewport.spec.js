"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var scrolling_1 = require("@angular/cdk/scrolling");
var core_1 = require("@angular/core");
var testing_1 = require("@angular/core/testing");
var scrolling_module_1 = require("./scrolling-module");
describe('CdkVirtualScrollViewport', function () {
    describe('with AutoSizeVirtualScrollStrategy', function () {
        var fixture;
        var testComponent;
        var viewport;
        beforeEach(function () {
            testing_1.TestBed.configureTestingModule({
                imports: [scrolling_1.ScrollingModule, scrolling_module_1.ScrollingModule],
                declarations: [AutoSizeVirtualScroll],
            }).compileComponents();
            fixture = testing_1.TestBed.createComponent(AutoSizeVirtualScroll);
            testComponent = fixture.componentInstance;
            viewport = testComponent.viewport;
        });
        it('should render initial state for uniform items', testing_1.fakeAsync(function () {
            finishInit(fixture);
            var contentWrapper = (viewport.elementRef.nativeElement.querySelector('.cdk-virtual-scroll-content-wrapper'));
            expect(contentWrapper.children.length)
                .toBe(4, 'should render 4 50px items to fill 200px space');
        }));
        it('should render extra content if first item is smaller than average', testing_1.fakeAsync(function () {
            testComponent.items = [50, 200, 200, 200, 200, 200];
            finishInit(fixture);
            var contentWrapper = (viewport.elementRef.nativeElement.querySelector('.cdk-virtual-scroll-content-wrapper'));
            expect(contentWrapper.children.length).toBe(4, 'should render 4 items to fill 200px space based on 50px estimate from first item');
        }));
        it('should throw if maxBufferPx is less than minBufferPx', testing_1.fakeAsync(function () {
            testComponent.minBufferPx = 100;
            testComponent.maxBufferPx = 99;
            expect(function () { return finishInit(fixture); }).toThrow();
        }));
        // TODO(mmalerba): Add test that it corrects the initial render if it didn't render enough,
        // once it actually does that.
    });
});
/** Finish initializing the virtual scroll component at the beginning of a test. */
function finishInit(fixture) {
    // On the first cycle we render and measure the viewport.
    fixture.detectChanges();
    testing_1.flush();
    // On the second cycle we render the items.
    fixture.detectChanges();
    testing_1.flush();
}
var AutoSizeVirtualScroll = /** @class */ (function () {
    function AutoSizeVirtualScroll() {
        this.orientation = 'vertical';
        this.viewportSize = 200;
        this.viewportCrossSize = 100;
        this.minBufferPx = 0;
        this.maxBufferPx = 0;
        this.items = Array(10).fill(50);
    }
    Object.defineProperty(AutoSizeVirtualScroll.prototype, "viewportWidth", {
        get: function () {
            return this.orientation == 'horizontal' ? this.viewportSize : this.viewportCrossSize;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AutoSizeVirtualScroll.prototype, "viewportHeight", {
        get: function () {
            return this.orientation == 'horizontal' ? this.viewportCrossSize : this.viewportSize;
        },
        enumerable: true,
        configurable: true
    });
    AutoSizeVirtualScroll.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <cdk-virtual-scroll-viewport\n        autosize [minBufferPx]=\"minBufferPx\" [maxBufferPx]=\"maxBufferPx\"\n        [orientation]=\"orientation\" [style.height.px]=\"viewportHeight\"\n        [style.width.px]=\"viewportWidth\">\n      <div class=\"item\" *cdkVirtualFor=\"let size of items; let i = index\" [style.height.px]=\"size\"\n           [style.width.px]=\"size\">\n        {{i}} - {{size}}\n      </div>\n    </cdk-virtual-scroll-viewport>\n  ",
                    styles: ["\n    .cdk-virtual-scroll-content-wrapper {\n      display: flex;\n      flex-direction: column;\n    }\n\n    .cdk-virtual-scroll-orientation-horizontal .cdk-virtual-scroll-content-wrapper {\n      flex-direction: row;\n    }\n  "],
                    encapsulation: core_1.ViewEncapsulation.None,
                },] },
    ];
    /** @nocollapse */
    AutoSizeVirtualScroll.propDecorators = {
        "viewport": [{ type: core_1.ViewChild, args: [scrolling_1.CdkVirtualScrollViewport,] },],
        "orientation": [{ type: core_1.Input },],
        "viewportSize": [{ type: core_1.Input },],
        "viewportCrossSize": [{ type: core_1.Input },],
        "minBufferPx": [{ type: core_1.Input },],
        "maxBufferPx": [{ type: core_1.Input },],
        "items": [{ type: core_1.Input },],
    };
    return AutoSizeVirtualScroll;
}());
//# sourceMappingURL=virtual-scroll-viewport.spec.js.map