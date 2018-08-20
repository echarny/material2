"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var collections_1 = require("@angular/cdk/collections");
var table_1 = require("@angular/cdk/table");
var testing_1 = require("@angular/cdk/testing");
var core_1 = require("@angular/core");
var testing_2 = require("@angular/core/testing");
var platform_browser_1 = require("@angular/platform-browser");
var animations_1 = require("@angular/platform-browser/animations");
var operators_1 = require("rxjs/operators");
var index_1 = require("../table/index");
var index_2 = require("./index");
var sort_errors_1 = require("./sort-errors");
describe('MatSort', function () {
    var fixture;
    var component;
    beforeEach(testing_2.async(function () {
        testing_2.TestBed.configureTestingModule({
            imports: [index_2.MatSortModule, index_1.MatTableModule, table_1.CdkTableModule, animations_1.NoopAnimationsModule],
            declarations: [
                SimpleMatSortApp,
                CdkTableMatSortApp,
                MatTableMatSortApp,
                MatSortHeaderMissingMatSortApp,
                MatSortDuplicateMatSortableIdsApp,
                MatSortableMissingIdApp,
                MatSortableInvalidDirection
            ],
        }).compileComponents();
    }));
    beforeEach(function () {
        fixture = testing_2.TestBed.createComponent(SimpleMatSortApp);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should have the sort headers register and deregister themselves', function () {
        var sortables = component.matSort.sortables;
        expect(sortables.size).toBe(4);
        expect(sortables.get('defaultA')).toBe(component.defaultA);
        expect(sortables.get('defaultB')).toBe(component.defaultB);
        fixture.destroy();
        expect(sortables.size).toBe(0);
    });
    it('should mark itself as initialized', testing_2.fakeAsync(function () {
        var isMarkedInitialized = false;
        component.matSort.initialized.subscribe(function () { return isMarkedInitialized = true; });
        testing_2.tick();
        expect(isMarkedInitialized).toBeTruthy();
    }));
    it('should use the column definition if used within a cdk table', function () {
        var cdkTableMatSortAppFixture = testing_2.TestBed.createComponent(CdkTableMatSortApp);
        var cdkTableMatSortAppComponent = cdkTableMatSortAppFixture.componentInstance;
        cdkTableMatSortAppFixture.detectChanges();
        cdkTableMatSortAppFixture.detectChanges();
        var sortables = cdkTableMatSortAppComponent.matSort.sortables;
        expect(sortables.size).toBe(3);
        expect(sortables.has('column_a')).toBe(true);
        expect(sortables.has('column_b')).toBe(true);
        expect(sortables.has('column_c')).toBe(true);
    });
    it('should use the column definition if used within an mat table', function () {
        var matTableMatSortAppFixture = testing_2.TestBed.createComponent(MatTableMatSortApp);
        var matTableMatSortAppComponent = matTableMatSortAppFixture.componentInstance;
        matTableMatSortAppFixture.detectChanges();
        matTableMatSortAppFixture.detectChanges();
        var sortables = matTableMatSortAppComponent.matSort.sortables;
        expect(sortables.size).toBe(3);
        expect(sortables.has('column_a')).toBe(true);
        expect(sortables.has('column_b')).toBe(true);
        expect(sortables.has('column_c')).toBe(true);
    });
    describe('checking correct arrow direction and view state for its various states', function () {
        var expectedStates;
        beforeEach(function () {
            // Starting state for the view and directions - note that overrideStart is reversed to be desc
            expectedStates = new Map([
                ['defaultA', { viewState: 'asc', arrowDirection: 'asc' }],
                ['defaultB', { viewState: 'asc', arrowDirection: 'asc' }],
                ['overrideStart', { viewState: 'desc', arrowDirection: 'desc' }],
                ['overrideDisableClear', { viewState: 'asc', arrowDirection: 'asc' }],
            ]);
            component.expectViewAndDirectionStates(expectedStates);
        });
        it('should be correct when mousing over headers and leaving on mouseleave', function () {
            // Mousing over the first sort should set the view state to hint (asc)
            component.dispatchMouseEvent('defaultA', 'mouseenter');
            expectedStates.set('defaultA', { viewState: 'asc-to-hint', arrowDirection: 'asc' });
            component.expectViewAndDirectionStates(expectedStates);
            // Mousing away from the first sort should hide the arrow
            component.dispatchMouseEvent('defaultA', 'mouseleave');
            expectedStates.set('defaultA', { viewState: 'hint-to-asc', arrowDirection: 'asc' });
            component.expectViewAndDirectionStates(expectedStates);
            // Mousing over another sort should set the view state to hint (desc)
            component.dispatchMouseEvent('overrideStart', 'mouseenter');
            expectedStates.set('overrideStart', { viewState: 'desc-to-hint', arrowDirection: 'desc' });
            component.expectViewAndDirectionStates(expectedStates);
        });
        it('should be correct when mousing over header and then sorting', function () {
            // Mousing over the first sort should set the view state to hint
            component.dispatchMouseEvent('defaultA', 'mouseenter');
            expectedStates.set('defaultA', { viewState: 'asc-to-hint', arrowDirection: 'asc' });
            component.expectViewAndDirectionStates(expectedStates);
            // Clicking sort on the header should set it to be active immediately
            // (since it was already hinted)
            component.dispatchMouseEvent('defaultA', 'click');
            expectedStates.set('defaultA', { viewState: 'active', arrowDirection: 'active-asc' });
            component.expectViewAndDirectionStates(expectedStates);
        });
        it('should be correct when cycling through a default sort header', function () {
            // Sort the header to set it to the active start state
            component.sort('defaultA');
            expectedStates.set('defaultA', { viewState: 'asc-to-active', arrowDirection: 'active-asc' });
            component.expectViewAndDirectionStates(expectedStates);
            // Sorting again will reverse its direction
            component.dispatchMouseEvent('defaultA', 'click');
            expectedStates.set('defaultA', { viewState: 'active', arrowDirection: 'active-desc' });
            component.expectViewAndDirectionStates(expectedStates);
            // Sorting again will remove the sort and animate away the view
            component.dispatchMouseEvent('defaultA', 'click');
            expectedStates.set('defaultA', { viewState: 'active-to-desc', arrowDirection: 'desc' });
            component.expectViewAndDirectionStates(expectedStates);
        });
        it('should not enter sort with animations if an animations is disabled', function () {
            // Sort the header to set it to the active start state
            component.defaultA._disableViewStateAnimation = true;
            component.sort('defaultA');
            expectedStates.set('defaultA', { viewState: 'active', arrowDirection: 'active-asc' });
            component.expectViewAndDirectionStates(expectedStates);
            // Sorting again will reverse its direction
            component.defaultA._disableViewStateAnimation = true;
            component.dispatchMouseEvent('defaultA', 'click');
            expectedStates.set('defaultA', { viewState: 'active', arrowDirection: 'active-desc' });
            component.expectViewAndDirectionStates(expectedStates);
        });
        it('should be correct when sort has changed while a header is active', function () {
            // Sort the first header to set up
            component.sort('defaultA');
            expectedStates.set('defaultA', { viewState: 'asc-to-active', arrowDirection: 'active-asc' });
            component.expectViewAndDirectionStates(expectedStates);
            // Sort the second header and verify that the first header animated away
            component.dispatchMouseEvent('defaultB', 'click');
            expectedStates.set('defaultA', { viewState: 'active-to-asc', arrowDirection: 'asc' });
            expectedStates.set('defaultB', { viewState: 'asc-to-active', arrowDirection: 'active-asc' });
            component.expectViewAndDirectionStates(expectedStates);
        });
        it('should be correct when sort has been disabled', function () {
            // Mousing over the first sort should set the view state to hint
            component.disabledColumnSort = true;
            fixture.detectChanges();
            component.dispatchMouseEvent('defaultA', 'mouseenter');
            component.expectViewAndDirectionStates(expectedStates);
        });
    });
    it('should be able to cycle from asc -> desc from either start point', function () {
        component.disableClear = true;
        component.start = 'asc';
        testSingleColumnSortDirectionSequence(fixture, ['asc', 'desc']);
        // Reverse directions
        component.start = 'desc';
        testSingleColumnSortDirectionSequence(fixture, ['desc', 'asc']);
    });
    it('should be able to cycle asc -> desc -> [none]', function () {
        component.start = 'asc';
        testSingleColumnSortDirectionSequence(fixture, ['asc', 'desc', '']);
    });
    it('should be able to cycle desc -> asc -> [none]', function () {
        component.start = 'desc';
        testSingleColumnSortDirectionSequence(fixture, ['desc', 'asc', '']);
    });
    it('should allow for the cycling the sort direction to be disabled per column', function () {
        var button = fixture.nativeElement.querySelector('#defaultA button');
        component.sort('defaultA');
        expect(component.matSort.direction).toBe('asc');
        expect(button.getAttribute('disabled')).toBeFalsy();
        component.disabledColumnSort = true;
        fixture.detectChanges();
        component.sort('defaultA');
        expect(component.matSort.direction).toBe('asc');
        expect(button.getAttribute('disabled')).toBe('true');
    });
    it('should allow for the cycling the sort direction to be disabled for all columns', function () {
        var button = fixture.nativeElement.querySelector('#defaultA button');
        component.sort('defaultA');
        expect(component.matSort.active).toBe('defaultA');
        expect(component.matSort.direction).toBe('asc');
        expect(button.getAttribute('disabled')).toBeFalsy();
        component.disableAllSort = true;
        fixture.detectChanges();
        component.sort('defaultA');
        expect(component.matSort.active).toBe('defaultA');
        expect(component.matSort.direction).toBe('asc');
        expect(button.getAttribute('disabled')).toBe('true');
        component.sort('defaultB');
        expect(component.matSort.active).toBe('defaultA');
        expect(component.matSort.direction).toBe('asc');
        expect(button.getAttribute('disabled')).toBe('true');
    });
    it('should reset sort direction when a different column is sorted', function () {
        component.sort('defaultA');
        expect(component.matSort.active).toBe('defaultA');
        expect(component.matSort.direction).toBe('asc');
        component.sort('defaultA');
        expect(component.matSort.active).toBe('defaultA');
        expect(component.matSort.direction).toBe('desc');
        component.sort('defaultB');
        expect(component.matSort.active).toBe('defaultB');
        expect(component.matSort.direction).toBe('asc');
    });
    it('should throw an error if an MatSortable is not contained within an MatSort directive', function () {
        expect(function () { return testing_2.TestBed.createComponent(MatSortHeaderMissingMatSortApp).detectChanges(); })
            .toThrowError(testing_1.wrappedErrorMessage(sort_errors_1.getSortHeaderNotContainedWithinSortError()));
    });
    it('should throw an error if two MatSortables have the same id', function () {
        expect(function () { return testing_2.TestBed.createComponent(MatSortDuplicateMatSortableIdsApp).detectChanges(); })
            .toThrowError(testing_1.wrappedErrorMessage(sort_errors_1.getSortDuplicateSortableIdError('duplicateId')));
    });
    it('should throw an error if an MatSortable is missing an id', function () {
        expect(function () { return testing_2.TestBed.createComponent(MatSortableMissingIdApp).detectChanges(); })
            .toThrowError(testing_1.wrappedErrorMessage(sort_errors_1.getSortHeaderMissingIdError()));
    });
    it('should throw an error if the provided direction is invalid', function () {
        expect(function () { return testing_2.TestBed.createComponent(MatSortableInvalidDirection).detectChanges(); })
            .toThrowError(testing_1.wrappedErrorMessage(sort_errors_1.getSortInvalidDirectionError('ascending')));
    });
    it('should allow let MatSortable override the default sort parameters', function () {
        testSingleColumnSortDirectionSequence(fixture, ['asc', 'desc', '']);
        testSingleColumnSortDirectionSequence(fixture, ['desc', 'asc', ''], 'overrideStart');
        testSingleColumnSortDirectionSequence(fixture, ['asc', 'desc'], 'overrideDisableClear');
    });
    it('should apply the aria-labels to the button', function () {
        var button = fixture.nativeElement.querySelector('#defaultA button');
        expect(button.getAttribute('aria-label')).toBe('Change sorting for defaultA');
    });
    it('should toggle indicator hint on button focus/blur and hide on click', function () {
        var header = fixture.componentInstance.defaultA;
        var button = fixture.nativeElement.querySelector('#defaultA button');
        var focusEvent = testing_1.createFakeEvent('focus');
        var blurEvent = testing_1.createFakeEvent('blur');
        // Should start without a displayed hint
        expect(header._showIndicatorHint).toBeFalsy();
        // Focusing the button should show the hint, blurring should hide it
        button.dispatchEvent(focusEvent);
        expect(header._showIndicatorHint).toBeTruthy();
        button.dispatchEvent(blurEvent);
        expect(header._showIndicatorHint).toBeFalsy();
        // Show the indicator hint. On click the hint should be hidden
        button.dispatchEvent(focusEvent);
        expect(header._showIndicatorHint).toBeTruthy();
        header._handleClick();
        expect(header._showIndicatorHint).toBeFalsy();
    });
    it('should toggle indicator hint on mouseenter/mouseleave and hide on click', function () {
        var header = fixture.componentInstance.defaultA;
        var headerElement = fixture.nativeElement.querySelector('#defaultA');
        var mouseenterEvent = testing_1.createMouseEvent('mouseenter');
        var mouseleaveEvent = testing_1.createMouseEvent('mouseleave');
        // Should start without a displayed hint
        expect(header._showIndicatorHint).toBeFalsy();
        // Mouse enter should show the hint, blurring should hide it
        headerElement.dispatchEvent(mouseenterEvent);
        expect(header._showIndicatorHint).toBeTruthy();
        headerElement.dispatchEvent(mouseleaveEvent);
        expect(header._showIndicatorHint).toBeFalsy();
        // Show the indicator hint. On click the hint should be hidden
        headerElement.dispatchEvent(mouseenterEvent);
        expect(header._showIndicatorHint).toBeTruthy();
        header._handleClick();
        expect(header._showIndicatorHint).toBeFalsy();
    });
    it('should apply the aria-sort label to the header when sorted', function () {
        var sortHeaderElement = fixture.nativeElement.querySelector('#defaultA');
        expect(sortHeaderElement.getAttribute('aria-sort')).toBe(null);
        component.sort('defaultA');
        fixture.detectChanges();
        expect(sortHeaderElement.getAttribute('aria-sort')).toBe('ascending');
        component.sort('defaultA');
        fixture.detectChanges();
        expect(sortHeaderElement.getAttribute('aria-sort')).toBe('descending');
        component.sort('defaultA');
        fixture.detectChanges();
        expect(sortHeaderElement.getAttribute('aria-sort')).toBe(null);
    });
    it('should re-render when the i18n labels have changed', testing_2.inject([index_2.MatSortHeaderIntl], function (intl) {
        var header = fixture.debugElement.query(platform_browser_1.By.directive(index_2.MatSortHeader)).nativeElement;
        var button = header.querySelector('.mat-sort-header-button');
        intl.sortButtonLabel = function () { return 'Sort all of the things'; };
        intl.changes.next();
        fixture.detectChanges();
        expect(button.getAttribute('aria-label')).toBe('Sort all of the things');
    }));
});
/**
 * Performs a sequence of sorting on a single column to see if the sort directions are
 * consistent with expectations. Detects any changes in the fixture to reflect any changes in
 * the inputs and resets the MatSort to remove any side effects from previous tests.
 */
function testSingleColumnSortDirectionSequence(fixture, expectedSequence, id) {
    if (id === void 0) { id = 'defaultA'; }
    // Detect any changes that were made in preparation for this sort sequence
    fixture.detectChanges();
    // Reset the sort to make sure there are no side affects from previous tests
    var component = fixture.componentInstance;
    component.matSort.active = '';
    component.matSort.direction = '';
    // Run through the sequence to confirm the order
    var actualSequence = expectedSequence.map(function () {
        component.sort(id);
        // Check that the sort event's active sort is consistent with the MatSort
        expect(component.matSort.active).toBe(id);
        expect(component.latestSortEvent.active).toBe(id);
        // Check that the sort event's direction is consistent with the MatSort
        expect(component.matSort.direction).toBe(component.latestSortEvent.direction);
        return component.matSort.direction;
    });
    expect(actualSequence).toEqual(expectedSequence);
    // Expect that performing one more sort will loop it back to the beginning.
    component.sort(id);
    expect(component.matSort.direction).toBe(expectedSequence[0]);
}
var SimpleMatSortApp = /** @class */ (function () {
    function SimpleMatSortApp(elementRef) {
        this.elementRef = elementRef;
        this.start = 'asc';
        this.direction = '';
        this.disabledColumnSort = false;
        this.disableAllSort = false;
    }
    SimpleMatSortApp.prototype.sort = function (id) {
        this.dispatchMouseEvent(id, 'click');
    };
    SimpleMatSortApp.prototype.dispatchMouseEvent = function (id, event) {
        var sortElement = this.elementRef.nativeElement.querySelector("#" + id);
        testing_1.dispatchMouseEvent(sortElement, event);
    };
    /**
     * Checks expectations for each sort header's view state and arrow direction states. Receives a
     * map that is keyed by each sort header's ID and contains the expectation for that header's
     * states.
     */
    /**
       * Checks expectations for each sort header's view state and arrow direction states. Receives a
       * map that is keyed by each sort header's ID and contains the expectation for that header's
       * states.
       */
    SimpleMatSortApp.prototype.expectViewAndDirectionStates = /**
       * Checks expectations for each sort header's view state and arrow direction states. Receives a
       * map that is keyed by each sort header's ID and contains the expectation for that header's
       * states.
       */
    function (viewStates) {
        var sortHeaders = new Map([
            ['defaultA', this.defaultA],
            ['defaultB', this.defaultB],
            ['overrideStart', this.overrideStart],
            ['overrideDisableClear', this.overrideDisableClear]
        ]);
        viewStates.forEach(function (viewState, id) {
            expect(sortHeaders.get(id)._getArrowViewState()).toEqual(viewState.viewState);
            expect(sortHeaders.get(id)._getArrowDirectionState()).toEqual(viewState.arrowDirection);
        });
    };
    SimpleMatSortApp.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <div matSort\n         [matSortActive]=\"active\"\n         [matSortDisabled]=\"disableAllSort\"\n         [matSortStart]=\"start\"\n         [matSortDirection]=\"direction\"\n         [matSortDisableClear]=\"disableClear\"\n         (matSortChange)=\"latestSortEvent = $event\">\n      <div id=\"defaultA\"\n           #defaultA\n           mat-sort-header=\"defaultA\"\n           [disabled]=\"disabledColumnSort\">\n        A\n      </div>\n      <div id=\"defaultB\"\n           #defaultB\n           mat-sort-header=\"defaultB\">\n        B\n      </div>\n      <div id=\"overrideStart\"\n           #overrideStart\n           mat-sort-header=\"overrideStart\" start=\"desc\">\n        D\n      </div>\n      <div id=\"overrideDisableClear\"\n           #overrideDisableClear\n           mat-sort-header=\"overrideDisableClear\"\n           disableClear>\n        E\n      </div>\n    </div>\n  "
                },] },
    ];
    /** @nocollapse */
    SimpleMatSortApp.ctorParameters = function () { return [
        { type: core_1.ElementRef, },
    ]; };
    SimpleMatSortApp.propDecorators = {
        "matSort": [{ type: core_1.ViewChild, args: [index_2.MatSort,] },],
        "defaultA": [{ type: core_1.ViewChild, args: ['defaultA',] },],
        "defaultB": [{ type: core_1.ViewChild, args: ['defaultB',] },],
        "overrideStart": [{ type: core_1.ViewChild, args: ['overrideStart',] },],
        "overrideDisableClear": [{ type: core_1.ViewChild, args: ['overrideDisableClear',] },],
    };
    return SimpleMatSortApp;
}());
var FakeDataSource = /** @class */ (function (_super) {
    __extends(FakeDataSource, _super);
    function FakeDataSource() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FakeDataSource.prototype.connect = function (collectionViewer) {
        return collectionViewer.viewChange.pipe(operators_1.map(function () { return []; }));
    };
    FakeDataSource.prototype.disconnect = function () { };
    return FakeDataSource;
}(collections_1.DataSource));
var CdkTableMatSortApp = /** @class */ (function () {
    function CdkTableMatSortApp() {
        this.dataSource = new FakeDataSource();
        this.columnsToRender = ['column_a', 'column_b', 'column_c'];
    }
    CdkTableMatSortApp.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <cdk-table [dataSource]=\"dataSource\" matSort>\n      <ng-container cdkColumnDef=\"column_a\">\n        <cdk-header-cell *cdkHeaderCellDef #sortHeaderA mat-sort-header> Column A </cdk-header-cell>\n        <cdk-cell *cdkCellDef=\"let row\"> {{row.a}} </cdk-cell>\n      </ng-container>\n\n      <ng-container cdkColumnDef=\"column_b\">\n        <cdk-header-cell *cdkHeaderCellDef #sortHeaderB mat-sort-header> Column B </cdk-header-cell>\n        <cdk-cell *cdkCellDef=\"let row\"> {{row.b}} </cdk-cell>\n      </ng-container>\n\n      <ng-container cdkColumnDef=\"column_c\">\n        <cdk-header-cell *cdkHeaderCellDef #sortHeaderC mat-sort-header> Column C </cdk-header-cell>\n        <cdk-cell *cdkCellDef=\"let row\"> {{row.c}} </cdk-cell>\n      </ng-container>\n\n      <cdk-header-row *cdkHeaderRowDef=\"columnsToRender\"></cdk-header-row>\n      <cdk-row *cdkRowDef=\"let row; columns: columnsToRender\"></cdk-row>\n    </cdk-table>\n  "
                },] },
    ];
    /** @nocollapse */
    CdkTableMatSortApp.propDecorators = {
        "matSort": [{ type: core_1.ViewChild, args: [index_2.MatSort,] },],
    };
    return CdkTableMatSortApp;
}());
var MatTableMatSortApp = /** @class */ (function () {
    function MatTableMatSortApp() {
        this.dataSource = new FakeDataSource();
        this.columnsToRender = ['column_a', 'column_b', 'column_c'];
    }
    MatTableMatSortApp.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <mat-table [dataSource]=\"dataSource\" matSort>\n      <ng-container matColumnDef=\"column_a\">\n        <mat-header-cell *matHeaderCellDef #sortHeaderA mat-sort-header> Column A </mat-header-cell>\n        <mat-cell *matCellDef=\"let row\"> {{row.a}} </mat-cell>\n      </ng-container>\n\n      <ng-container matColumnDef=\"column_b\">\n        <mat-header-cell *matHeaderCellDef #sortHeaderB mat-sort-header> Column B </mat-header-cell>\n        <mat-cell *matCellDef=\"let row\"> {{row.b}} </mat-cell>\n      </ng-container>\n\n      <ng-container matColumnDef=\"column_c\">\n        <mat-header-cell *matHeaderCellDef #sortHeaderC mat-sort-header> Column C </mat-header-cell>\n        <mat-cell *matCellDef=\"let row\"> {{row.c}} </mat-cell>\n      </ng-container>\n\n      <mat-header-row *matHeaderRowDef=\"columnsToRender\"></mat-header-row>\n      <mat-row *matRowDef=\"let row; columns: columnsToRender\"></mat-row>\n    </mat-table>\n  "
                },] },
    ];
    /** @nocollapse */
    MatTableMatSortApp.propDecorators = {
        "matSort": [{ type: core_1.ViewChild, args: [index_2.MatSort,] },],
    };
    return MatTableMatSortApp;
}());
var MatSortHeaderMissingMatSortApp = /** @class */ (function () {
    function MatSortHeaderMissingMatSortApp() {
    }
    MatSortHeaderMissingMatSortApp.decorators = [
        { type: core_1.Component, args: [{
                    template: "<div mat-sort-header=\"a\"> A </div>"
                },] },
    ];
    return MatSortHeaderMissingMatSortApp;
}());
var MatSortDuplicateMatSortableIdsApp = /** @class */ (function () {
    function MatSortDuplicateMatSortableIdsApp() {
    }
    MatSortDuplicateMatSortableIdsApp.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <div matSort>\n      <div mat-sort-header=\"duplicateId\"> A </div>\n      <div mat-sort-header=\"duplicateId\"> A </div>\n    </div>\n  "
                },] },
    ];
    return MatSortDuplicateMatSortableIdsApp;
}());
var MatSortableMissingIdApp = /** @class */ (function () {
    function MatSortableMissingIdApp() {
    }
    MatSortableMissingIdApp.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <div matSort>\n      <div mat-sort-header> A </div>\n    </div>\n  "
                },] },
    ];
    return MatSortableMissingIdApp;
}());
var MatSortableInvalidDirection = /** @class */ (function () {
    function MatSortableInvalidDirection() {
    }
    MatSortableInvalidDirection.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <div matSort matSortDirection=\"ascending\">\n      <div mat-sort-header=\"a\"> A </div>\n    </div>\n  "
                },] },
    ];
    return MatSortableInvalidDirection;
}());
//# sourceMappingURL=sort.spec.js.map