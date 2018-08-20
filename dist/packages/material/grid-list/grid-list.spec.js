"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var index_1 = require("./index");
var grid_tile_1 = require("./grid-tile");
var bidi_1 = require("@angular/cdk/bidi");
describe('MatGridList', function () {
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [index_1.MatGridListModule],
            declarations: [
                GridListWithoutCols,
                GridListWithInvalidRowHeightRatio,
                GridListWithTooWideColspan,
                GridListWithUnspecifiedRowHeight,
                GirdListWithRowHeightRatio,
                GridListWithFitRowHeightMode,
                GridListWithFixedRowHeightMode,
                GridListWithUnitlessFixedRowHeight,
                GridListWithUnspecifiedGutterSize,
                GridListWithGutterSize,
                GridListWithUnitlessGutterSize,
                GridListWithRatioHeightAndMulipleRows,
                GridListWithFixRowHeightAndMultipleRows,
                GridListWithColspanBinding,
                GridListWithRowspanBinding,
                GridListWithComplexLayout,
                GridListWithFootersWithoutLines,
                GridListWithFooterContainingTwoLines,
                GridListWithoutMatchingGap,
                GridListWithEmptyDirectionality,
                GridListWithRtl,
            ],
        });
        testing_1.TestBed.compileComponents();
    }));
    it('should throw error if cols is not defined', function () {
        var fixture = testing_1.TestBed.createComponent(GridListWithoutCols);
        expect(function () { return fixture.detectChanges(); }).toThrowError(/must pass in number of columns/);
    });
    it('should throw error if rowHeight ratio is invalid', function () {
        var fixture = testing_1.TestBed.createComponent(GridListWithInvalidRowHeightRatio);
        expect(function () { return fixture.detectChanges(); }).toThrowError(/invalid ratio given for row-height/);
    });
    it('should throw error if tile colspan is wider than total cols', function () {
        var fixture = testing_1.TestBed.createComponent(GridListWithTooWideColspan);
        expect(function () { return fixture.detectChanges(); }).toThrowError(/tile with colspan 5 is wider than grid/);
    });
    it('should default to 1:1 row height if undefined ', function () {
        var fixture = testing_1.TestBed.createComponent(GridListWithUnspecifiedRowHeight);
        fixture.detectChanges();
        var tile = fixture.debugElement.query(platform_browser_1.By.directive(grid_tile_1.MatGridTile));
        // In ratio mode, heights are set using the padding-top property.
        expect(getStyle(tile, 'padding-top')).toBe('200px');
    });
    it('should use a ratio row height if passed in', function () {
        var fixture = testing_1.TestBed.createComponent(GirdListWithRowHeightRatio);
        fixture.componentInstance.rowHeight = '4:1';
        fixture.detectChanges();
        var tile = fixture.debugElement.query(platform_browser_1.By.directive(grid_tile_1.MatGridTile));
        expect(getStyle(tile, 'padding-top')).toBe('100px');
        fixture.componentInstance.rowHeight = '2:1';
        fixture.detectChanges();
        expect(getStyle(tile, 'padding-top')).toBe('200px');
    });
    it('should divide row height evenly in "fit" mode', function () {
        var fixture = testing_1.TestBed.createComponent(GridListWithFitRowHeightMode);
        fixture.componentInstance.totalHeight = '300px';
        fixture.detectChanges();
        var tile = fixture.debugElement.query(platform_browser_1.By.directive(grid_tile_1.MatGridTile));
        // 149.5 * 2 = 299px + 1px gutter = 300px
        expect(getStyle(tile, 'height')).toBe('149.5px');
        fixture.componentInstance.totalHeight = '200px';
        fixture.detectChanges();
        // 99.5 * 2 = 199px + 1px gutter = 200px
        expect(getStyle(tile, 'height')).toBe('99.5px');
    });
    it('should use the fixed row height if passed in', function () {
        var fixture = testing_1.TestBed.createComponent(GridListWithFixedRowHeightMode);
        fixture.componentInstance.rowHeight = '100px';
        fixture.detectChanges();
        var tile = fixture.debugElement.query(platform_browser_1.By.directive(grid_tile_1.MatGridTile));
        expect(getStyle(tile, 'height')).toBe('100px');
        fixture.componentInstance.rowHeight = '200px';
        fixture.detectChanges();
        expect(getStyle(tile, 'height')).toBe('200px');
    });
    it('should default to pixels if row height units are missing', function () {
        var fixture = testing_1.TestBed.createComponent(GridListWithUnitlessFixedRowHeight);
        fixture.detectChanges();
        var tile = fixture.debugElement.query(platform_browser_1.By.directive(grid_tile_1.MatGridTile));
        expect(getStyle(tile, 'height')).toBe('100px');
    });
    it('should default gutter size to 1px', function () {
        var fixture = testing_1.TestBed.createComponent(GridListWithUnspecifiedGutterSize);
        fixture.detectChanges();
        var tiles = fixture.debugElement.queryAll(platform_browser_1.By.css('mat-grid-tile'));
        // check horizontal gutter
        expect(getStyle(tiles[0], 'width')).toBe('99.5px');
        expect(getComputedLeft(tiles[1])).toBe(100.5);
        // check vertical gutter
        expect(getStyle(tiles[0], 'height')).toBe('100px');
        expect(getStyle(tiles[2], 'top')).toBe('101px');
    });
    it('should set the gutter size if passed', function () {
        var fixture = testing_1.TestBed.createComponent(GridListWithGutterSize);
        fixture.detectChanges();
        var tiles = fixture.debugElement.queryAll(platform_browser_1.By.css('mat-grid-tile'));
        // check horizontal gutter
        expect(getStyle(tiles[0], 'width')).toBe('99px');
        expect(getComputedLeft(tiles[1])).toBe(101);
        // check vertical gutter
        expect(getStyle(tiles[0], 'height')).toBe('100px');
        expect(getStyle(tiles[2], 'top')).toBe('102px');
    });
    it('should use pixels if gutter units are missing', function () {
        var fixture = testing_1.TestBed.createComponent(GridListWithUnitlessGutterSize);
        fixture.detectChanges();
        var tiles = fixture.debugElement.queryAll(platform_browser_1.By.css('mat-grid-tile'));
        // check horizontal gutter
        expect(getStyle(tiles[0], 'width')).toBe('99px');
        expect(getComputedLeft(tiles[1])).toBe(101);
        // check vertical gutter
        expect(getStyle(tiles[0], 'height')).toBe('100px');
        expect(getStyle(tiles[2], 'top')).toBe('102px');
    });
    it('should set the correct list height in ratio mode', function () {
        var fixture = testing_1.TestBed.createComponent(GridListWithRatioHeightAndMulipleRows);
        fixture.detectChanges();
        var list = fixture.debugElement.query(platform_browser_1.By.directive(index_1.MatGridList));
        expect(getStyle(list, 'padding-bottom')).toBe('201px');
    });
    it('should set the correct list height in fixed mode', function () {
        var fixture = testing_1.TestBed.createComponent(GridListWithFixRowHeightAndMultipleRows);
        fixture.detectChanges();
        var list = fixture.debugElement.query(platform_browser_1.By.directive(index_1.MatGridList));
        expect(getStyle(list, 'height')).toBe('201px');
    });
    it('should allow adjustment of tile colspan', function () {
        var fixture = testing_1.TestBed.createComponent(GridListWithColspanBinding);
        fixture.componentInstance.colspan = 2;
        fixture.detectChanges();
        var tile = fixture.debugElement.query(platform_browser_1.By.directive(grid_tile_1.MatGridTile));
        expect(getStyle(tile, 'width')).toBe('199.5px');
        fixture.componentInstance.colspan = 3;
        fixture.detectChanges();
        expect(getStyle(tile, 'width')).toBe('299.75px');
    });
    it('should allow adjustment of tile rowspan', function () {
        var fixture = testing_1.TestBed.createComponent(GridListWithRowspanBinding);
        fixture.componentInstance.rowspan = 2;
        fixture.detectChanges();
        var tile = fixture.debugElement.query(platform_browser_1.By.directive(grid_tile_1.MatGridTile));
        expect(getStyle(tile, 'height')).toBe('201px');
        fixture.componentInstance.rowspan = 3;
        fixture.detectChanges();
        expect(getStyle(tile, 'height')).toBe('302px');
    });
    it('should lay out tiles correctly for a complex layout', function () {
        var fixture = testing_1.TestBed.createComponent(GridListWithComplexLayout);
        fixture.componentInstance.tiles = [
            { cols: 3, rows: 1 },
            { cols: 1, rows: 2 },
            { cols: 1, rows: 1 },
            { cols: 2, rows: 1 }
        ];
        fixture.detectChanges();
        var tiles = fixture.debugElement.queryAll(platform_browser_1.By.css('mat-grid-tile'));
        expect(getStyle(tiles[0], 'width')).toBe('299.75px');
        expect(getStyle(tiles[0], 'height')).toBe('100px');
        expect(getComputedLeft(tiles[0])).toBe(0);
        expect(getStyle(tiles[0], 'top')).toBe('0px');
        expect(getStyle(tiles[1], 'width')).toBe('99.25px');
        expect(getStyle(tiles[1], 'height')).toBe('201px');
        expect(getComputedLeft(tiles[1])).toBe(300.75);
        expect(getStyle(tiles[1], 'top')).toBe('0px');
        expect(getStyle(tiles[2], 'width')).toBe('99.25px');
        expect(getStyle(tiles[2], 'height')).toBe('100px');
        expect(getComputedLeft(tiles[2])).toBe(0);
        expect(getStyle(tiles[2], 'top')).toBe('101px');
        expect(getStyle(tiles[3], 'width')).toBe('199.5px');
        expect(getStyle(tiles[3], 'height')).toBe('100px');
        expect(getComputedLeft(tiles[3])).toBe(100.25);
        expect(getStyle(tiles[3], 'top')).toBe('101px');
    });
    it('should add not add any classes to footers without lines', function () {
        var fixture = testing_1.TestBed.createComponent(GridListWithFootersWithoutLines);
        fixture.detectChanges();
        var footer = fixture.debugElement.query(platform_browser_1.By.directive(grid_tile_1.MatGridTileText));
        expect(footer.nativeElement.classList.contains('mat-2-line')).toBe(false);
    });
    it('should add class to footers with two lines', function () {
        var fixture = testing_1.TestBed.createComponent(GridListWithFooterContainingTwoLines);
        fixture.detectChanges();
        var footer = fixture.debugElement.query(platform_browser_1.By.directive(grid_tile_1.MatGridTileText));
        expect(footer.nativeElement.classList.contains('mat-2-line')).toBe(true);
    });
    it('should not use calc() that evaluates to 0', function () {
        var fixture = testing_1.TestBed.createComponent(GirdListWithRowHeightRatio);
        fixture.componentInstance.rowHeight = '4:1';
        fixture.detectChanges();
        var firstTile = fixture.debugElement.query(platform_browser_1.By.directive(grid_tile_1.MatGridTile)).nativeElement;
        expect(firstTile.style.marginTop).toBe('0px');
        expect(firstTile.style.left).toBe('0px');
    });
    it('should reset the old styles when switching to a new tile styler', function () {
        var fixture = testing_1.TestBed.createComponent(GirdListWithRowHeightRatio);
        fixture.componentInstance.rowHeight = '4:1';
        fixture.detectChanges();
        var list = fixture.debugElement.query(platform_browser_1.By.directive(index_1.MatGridList));
        var tile = fixture.debugElement.query(platform_browser_1.By.directive(grid_tile_1.MatGridTile));
        expect(getStyle(tile, 'padding-top')).toBe('100px');
        expect(getStyle(list, 'padding-bottom')).toBe('100px');
        fixture.componentInstance.rowHeight = '400px';
        fixture.detectChanges();
        expect(getStyle(tile, 'padding-top')).toBe('0px', 'Expected tile padding to be reset.');
        expect(getStyle(list, 'padding-bottom')).toBe('0px', 'Expected list padding to be reset.');
        expect(getStyle(tile, 'top')).toBe('0px');
        expect(getStyle(tile, 'height')).toBe('400px');
    });
    it('should ensure that all tiles are inside the grid when there are no matching gaps', function () {
        var fixture = testing_1.TestBed.createComponent(GridListWithoutMatchingGap);
        var tiles = fixture.debugElement.queryAll(platform_browser_1.By.css('mat-grid-tile'));
        fixture.detectChanges();
        expect(tiles.every(function (tile) { return getComputedLeft(tile) >= 0; }))
            .toBe(true, 'Expected none of the tiles to have a negative `left`');
    });
    it('should default to LTR if empty directionality is given', function () {
        var fixture = testing_1.TestBed.createComponent(GridListWithEmptyDirectionality);
        var tile = fixture.debugElement.query(platform_browser_1.By.css('mat-grid-tile')).nativeElement;
        fixture.detectChanges();
        expect(tile.style.left).toBe('0px');
        expect(tile.style.right).toBe('');
    });
    it('should set `right` styles for RTL', function () {
        var fixture = testing_1.TestBed.createComponent(GridListWithRtl);
        var tile = fixture.debugElement.query(platform_browser_1.By.css('mat-grid-tile')).nativeElement;
        fixture.detectChanges();
        expect(tile.style.left).toBe('');
        expect(tile.style.right).toBe('0px');
    });
});
function getStyle(el, prop) {
    return getComputedStyle(el.nativeElement).getPropertyValue(prop);
}
/** Gets the `left` position of an element. */
function getComputedLeft(element) {
    // While the other properties in this test use `getComputedStyle`, we use `getBoundingClientRect`
    // for left because iOS Safari doesn't support using `getComputedStyle` to get the calculated
    // `left` value when using CSS `calc`. We subtract the `left` of the document body because
    // browsers, by default, add a margin to the body (typically 8px).
    var elementRect = element.nativeElement.getBoundingClientRect();
    var bodyRect = document.body.getBoundingClientRect();
    return elementRect.left - bodyRect.left;
}
var GridListWithoutCols = /** @class */ (function () {
    function GridListWithoutCols() {
    }
    GridListWithoutCols.decorators = [
        { type: core_1.Component, args: [{ template: '<mat-grid-list></mat-grid-list>' },] },
    ];
    return GridListWithoutCols;
}());
var GridListWithInvalidRowHeightRatio = /** @class */ (function () {
    function GridListWithInvalidRowHeightRatio() {
    }
    GridListWithInvalidRowHeightRatio.decorators = [
        { type: core_1.Component, args: [{ template: '<mat-grid-list cols="4" rowHeight="4:3:2"></mat-grid-list>' },] },
    ];
    return GridListWithInvalidRowHeightRatio;
}());
var GridListWithTooWideColspan = /** @class */ (function () {
    function GridListWithTooWideColspan() {
    }
    GridListWithTooWideColspan.decorators = [
        { type: core_1.Component, args: [{ template: '<mat-grid-list cols="4"><mat-grid-tile colspan="5"></mat-grid-tile></mat-grid-list>' },] },
    ];
    return GridListWithTooWideColspan;
}());
var GridListWithUnspecifiedRowHeight = /** @class */ (function () {
    function GridListWithUnspecifiedRowHeight() {
    }
    GridListWithUnspecifiedRowHeight.decorators = [
        { type: core_1.Component, args: [{ template: "\n    <div style=\"width:200px\">\n      <mat-grid-list cols=\"1\">\n        <mat-grid-tile></mat-grid-tile>\n      </mat-grid-list>\n    </div>" },] },
    ];
    return GridListWithUnspecifiedRowHeight;
}());
var GirdListWithRowHeightRatio = /** @class */ (function () {
    function GirdListWithRowHeightRatio() {
    }
    GirdListWithRowHeightRatio.decorators = [
        { type: core_1.Component, args: [{ template: "\n    <div style=\"width:400px\">\n      <mat-grid-list cols=\"1\" [rowHeight]=\"rowHeight\">\n        <mat-grid-tile></mat-grid-tile>\n      </mat-grid-list>\n    </div>" },] },
    ];
    return GirdListWithRowHeightRatio;
}());
var GridListWithFitRowHeightMode = /** @class */ (function () {
    function GridListWithFitRowHeightMode() {
    }
    GridListWithFitRowHeightMode.decorators = [
        { type: core_1.Component, args: [{ template: "\n    <mat-grid-list cols=\"1\" rowHeight=\"fit\" [style.height]=\"totalHeight\">\n      <mat-grid-tile></mat-grid-tile>\n      <mat-grid-tile></mat-grid-tile>\n    </mat-grid-list>" },] },
    ];
    return GridListWithFitRowHeightMode;
}());
var GridListWithFixedRowHeightMode = /** @class */ (function () {
    function GridListWithFixedRowHeightMode() {
    }
    GridListWithFixedRowHeightMode.decorators = [
        { type: core_1.Component, args: [{ template: "\n    <mat-grid-list cols=\"4\" [rowHeight]=\"rowHeight\">\n      <mat-grid-tile></mat-grid-tile>\n    </mat-grid-list>" },] },
    ];
    return GridListWithFixedRowHeightMode;
}());
var GridListWithUnitlessFixedRowHeight = /** @class */ (function () {
    function GridListWithUnitlessFixedRowHeight() {
    }
    GridListWithUnitlessFixedRowHeight.decorators = [
        { type: core_1.Component, args: [{ template: "\n    <mat-grid-list cols=\"4\" rowHeight=\"100\">\n      <mat-grid-tile></mat-grid-tile>\n    </mat-grid-list>" },] },
    ];
    return GridListWithUnitlessFixedRowHeight;
}());
var GridListWithUnspecifiedGutterSize = /** @class */ (function () {
    function GridListWithUnspecifiedGutterSize() {
    }
    GridListWithUnspecifiedGutterSize.decorators = [
        { type: core_1.Component, args: [{ template: "\n    <div style=\"width:200px\">\n      <mat-grid-list cols=\"2\" rowHeight=\"100px\">\n        <mat-grid-tile></mat-grid-tile>\n        <mat-grid-tile></mat-grid-tile>\n        <mat-grid-tile></mat-grid-tile>\n      </mat-grid-list>\n    </div>" },] },
    ];
    return GridListWithUnspecifiedGutterSize;
}());
var GridListWithGutterSize = /** @class */ (function () {
    function GridListWithGutterSize() {
    }
    GridListWithGutterSize.decorators = [
        { type: core_1.Component, args: [{ template: "\n    <div style=\"width:200px\">\n      <mat-grid-list cols=\"2\" gutterSize=\"2px\" rowHeight=\"100px\">\n        <mat-grid-tile></mat-grid-tile>\n        <mat-grid-tile></mat-grid-tile>\n        <mat-grid-tile></mat-grid-tile>\n      </mat-grid-list>\n    </div>" },] },
    ];
    return GridListWithGutterSize;
}());
var GridListWithUnitlessGutterSize = /** @class */ (function () {
    function GridListWithUnitlessGutterSize() {
    }
    GridListWithUnitlessGutterSize.decorators = [
        { type: core_1.Component, args: [{ template: "\n    <div style=\"width:200px\">\n      <mat-grid-list cols=\"2\" gutterSize=\"2\" rowHeight=\"100px\">\n        <mat-grid-tile></mat-grid-tile>\n        <mat-grid-tile></mat-grid-tile>\n        <mat-grid-tile></mat-grid-tile>\n      </mat-grid-list>\n    </div>" },] },
    ];
    return GridListWithUnitlessGutterSize;
}());
var GridListWithRatioHeightAndMulipleRows = /** @class */ (function () {
    function GridListWithRatioHeightAndMulipleRows() {
    }
    GridListWithRatioHeightAndMulipleRows.decorators = [
        { type: core_1.Component, args: [{ template: "\n    <div style=\"width:400px\">\n      <mat-grid-list cols=\"1\" rowHeight=\"4:1\">\n        <mat-grid-tile></mat-grid-tile>\n        <mat-grid-tile></mat-grid-tile>\n      </mat-grid-list>\n    </div>" },] },
    ];
    return GridListWithRatioHeightAndMulipleRows;
}());
var GridListWithFixRowHeightAndMultipleRows = /** @class */ (function () {
    function GridListWithFixRowHeightAndMultipleRows() {
    }
    GridListWithFixRowHeightAndMultipleRows.decorators = [
        { type: core_1.Component, args: [{ template: "\n    <mat-grid-list cols=\"1\" rowHeight=\"100px\">\n      <mat-grid-tile></mat-grid-tile>\n      <mat-grid-tile></mat-grid-tile>\n    </mat-grid-list>" },] },
    ];
    return GridListWithFixRowHeightAndMultipleRows;
}());
var GridListWithColspanBinding = /** @class */ (function () {
    function GridListWithColspanBinding() {
    }
    GridListWithColspanBinding.decorators = [
        { type: core_1.Component, args: [{ template: "\n    <div style=\"width:400px\">\n      <mat-grid-list cols=\"4\">\n        <mat-grid-tile [colspan]=\"colspan\"></mat-grid-tile>\n      </mat-grid-list>\n    </div>" },] },
    ];
    return GridListWithColspanBinding;
}());
var GridListWithRowspanBinding = /** @class */ (function () {
    function GridListWithRowspanBinding() {
    }
    GridListWithRowspanBinding.decorators = [
        { type: core_1.Component, args: [{ template: "\n    <mat-grid-list cols=\"1\" rowHeight=\"100px\">\n      <mat-grid-tile [rowspan]=\"rowspan\"></mat-grid-tile>\n    </mat-grid-list>" },] },
    ];
    return GridListWithRowspanBinding;
}());
var GridListWithComplexLayout = /** @class */ (function () {
    function GridListWithComplexLayout() {
    }
    GridListWithComplexLayout.decorators = [
        { type: core_1.Component, args: [{ template: "\n    <div style=\"width:400px\">\n      <mat-grid-list cols=\"4\" rowHeight=\"100px\">\n        <mat-grid-tile *ngFor=\"let tile of tiles\" [colspan]=\"tile.cols\" [rowspan]=\"tile.rows\"\n                      [style.background]=\"tile.color\">\n          {{tile.text}}\n        </mat-grid-tile>\n      </mat-grid-list>\n    </div>" },] },
    ];
    return GridListWithComplexLayout;
}());
var GridListWithFootersWithoutLines = /** @class */ (function () {
    function GridListWithFootersWithoutLines() {
    }
    GridListWithFootersWithoutLines.decorators = [
        { type: core_1.Component, args: [{ template: "\n    <mat-grid-list cols=\"1\">\n      <mat-grid-tile>\n        <mat-grid-tile-footer>\n          I'm a footer!\n        </mat-grid-tile-footer>\n      </mat-grid-tile>\n    </mat-grid-list>" },] },
    ];
    return GridListWithFootersWithoutLines;
}());
var GridListWithFooterContainingTwoLines = /** @class */ (function () {
    function GridListWithFooterContainingTwoLines() {
    }
    GridListWithFooterContainingTwoLines.decorators = [
        { type: core_1.Component, args: [{ template: "\n    <mat-grid-list cols=\"1\">\n      <mat-grid-tile>\n        <mat-grid-tile-footer>\n          <h3 mat-line>First line</h3>\n          <span mat-line>Second line</span>\n        </mat-grid-tile-footer>\n      </mat-grid-tile>\n    </mat-grid-list>" },] },
    ];
    return GridListWithFooterContainingTwoLines;
}());
var GridListWithoutMatchingGap = /** @class */ (function () {
    function GridListWithoutMatchingGap() {
    }
    GridListWithoutMatchingGap.decorators = [
        { type: core_1.Component, args: [{ template: "\n  <mat-grid-list cols=\"5\">\n    <mat-grid-tile [rowspan]=\"1\" [colspan]=\"3\">1</mat-grid-tile>\n    <mat-grid-tile [rowspan]=\"2\" [colspan]=\"2\">2</mat-grid-tile>\n    <mat-grid-tile [rowspan]=\"1\" [colspan]=\"2\">3</mat-grid-tile>\n    <mat-grid-tile [rowspan]=\"2\" [colspan]=\"2\">4</mat-grid-tile>\n  </mat-grid-list>\n" },] },
    ];
    return GridListWithoutMatchingGap;
}());
var GridListWithEmptyDirectionality = /** @class */ (function () {
    function GridListWithEmptyDirectionality() {
    }
    GridListWithEmptyDirectionality.decorators = [
        { type: core_1.Component, args: [{
                    template: "<mat-grid-list cols=\"1\"><mat-grid-tile>Hello</mat-grid-tile></mat-grid-list>",
                    providers: [{ provide: bidi_1.Directionality, useValue: {} }]
                },] },
    ];
    return GridListWithEmptyDirectionality;
}());
var GridListWithRtl = /** @class */ (function () {
    function GridListWithRtl() {
    }
    GridListWithRtl.decorators = [
        { type: core_1.Component, args: [{
                    template: "<mat-grid-list cols=\"1\"><mat-grid-tile>Hello</mat-grid-tile></mat-grid-list>",
                    providers: [{ provide: bidi_1.Directionality, useValue: { value: 'rtl' } }]
                },] },
    ];
    return GridListWithRtl;
}());
//# sourceMappingURL=grid-list.spec.js.map