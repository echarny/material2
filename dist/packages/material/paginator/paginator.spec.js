"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var index_1 = require("./index");
var paginator_1 = require("./paginator");
var core_1 = require("@angular/core");
var paginator_intl_1 = require("./paginator-intl");
var animations_1 = require("@angular/platform-browser/animations");
var testing_2 = require("@angular/cdk/testing");
describe('MatPaginator', function () {
    var fixture;
    var component;
    var paginator;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [
                index_1.MatPaginatorModule,
                animations_1.NoopAnimationsModule,
            ],
            declarations: [
                MatPaginatorApp,
                MatPaginatorWithoutPageSizeApp,
                MatPaginatorWithoutOptionsApp,
                MatPaginatorWithoutInputsApp,
                MatPaginatorWithStringValues
            ],
            providers: [paginator_intl_1.MatPaginatorIntl]
        }).compileComponents();
    }));
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(MatPaginatorApp);
        component = fixture.componentInstance;
        paginator = component.paginator;
        fixture.detectChanges();
    });
    describe('with the default internationalization provider', function () {
        it('should show the right range text', function () {
            var rangeElement = fixture.nativeElement.querySelector('.mat-paginator-range-label');
            // View second page of list of 100, each page contains 10 items.
            component.length = 100;
            component.pageSize = 10;
            component.pageIndex = 1;
            fixture.detectChanges();
            expect(rangeElement.innerText).toBe('11 - 20 of 100');
            // View third page of list of 200, each page contains 20 items.
            component.length = 200;
            component.pageSize = 20;
            component.pageIndex = 2;
            fixture.detectChanges();
            expect(rangeElement.innerText).toBe('41 - 60 of 200');
            // View first page of list of 0, each page contains 5 items.
            component.length = 0;
            component.pageSize = 5;
            component.pageIndex = 2;
            fixture.detectChanges();
            expect(rangeElement.innerText).toBe('0 of 0');
            // View third page of list of 12, each page contains 5 items.
            component.length = 12;
            component.pageSize = 5;
            component.pageIndex = 2;
            fixture.detectChanges();
            expect(rangeElement.innerText).toBe('11 - 12 of 12');
            // View third page of list of 10, each page contains 5 items.
            component.length = 10;
            component.pageSize = 5;
            component.pageIndex = 2;
            fixture.detectChanges();
            expect(rangeElement.innerText).toBe('11 - 15 of 10');
            // View third page of list of -5, each page contains 5 items.
            component.length = -5;
            component.pageSize = 5;
            component.pageIndex = 2;
            fixture.detectChanges();
            expect(rangeElement.innerText).toBe('11 - 15 of 0');
        });
        it('should show right aria-labels for select and buttons', function () {
            var select = fixture.nativeElement.querySelector('.mat-select');
            expect(select.getAttribute('aria-label')).toBe('Items per page:');
            expect(getPreviousButton(fixture).getAttribute('aria-label')).toBe('Previous page');
            expect(getNextButton(fixture).getAttribute('aria-label')).toBe('Next page');
        });
        it('should re-render when the i18n labels change', testing_1.inject([paginator_intl_1.MatPaginatorIntl], function (intl) {
            var label = fixture.nativeElement.querySelector('.mat-paginator-page-size-label');
            intl.itemsPerPageLabel = '1337 items per page';
            intl.changes.next();
            fixture.detectChanges();
            expect(label.textContent).toBe('1337 items per page');
        }));
    });
    describe('when navigating with the next and previous buttons', function () {
        it('should be able to go to the next page', function () {
            expect(paginator.pageIndex).toBe(0);
            testing_2.dispatchMouseEvent(getNextButton(fixture), 'click');
            expect(paginator.pageIndex).toBe(1);
            expect(component.pageEvent).toHaveBeenCalledWith(jasmine.objectContaining({
                previousPageIndex: 0,
                pageIndex: 1
            }));
        });
        it('should be able to go to the previous page', function () {
            paginator.pageIndex = 1;
            fixture.detectChanges();
            expect(paginator.pageIndex).toBe(1);
            testing_2.dispatchMouseEvent(getPreviousButton(fixture), 'click');
            expect(paginator.pageIndex).toBe(0);
            expect(component.pageEvent).toHaveBeenCalledWith(jasmine.objectContaining({
                previousPageIndex: 1,
                pageIndex: 0
            }));
        });
    });
    it('should be able to show the first/last buttons', function () {
        expect(getFirstButton(fixture))
            .toBeNull('Expected first button to not exist.');
        expect(getLastButton(fixture))
            .toBeNull('Expected last button to not exist.');
        fixture.componentInstance.showFirstLastButtons = true;
        fixture.detectChanges();
        expect(getFirstButton(fixture))
            .toBeTruthy('Expected first button to be rendered.');
        expect(getLastButton(fixture))
            .toBeTruthy('Expected last button to be rendered.');
    });
    it('should mark itself as initialized', testing_1.fakeAsync(function () {
        var isMarkedInitialized = false;
        paginator.initialized.subscribe(function () { return isMarkedInitialized = true; });
        testing_1.tick();
        expect(isMarkedInitialized).toBeTruthy();
    }));
    it('should not allow a negative pageSize', function () {
        paginator.pageSize = -1337;
        expect(paginator.pageSize).toBeGreaterThanOrEqual(0);
    });
    it('should not allow a negative pageIndex', function () {
        paginator.pageSize = -42;
        expect(paginator.pageIndex).toBeGreaterThanOrEqual(0);
    });
    describe('when showing the first and last button', function () {
        beforeEach(function () {
            component.showFirstLastButtons = true;
            fixture.detectChanges();
        });
        it('should show right aria-labels for first/last buttons', function () {
            expect(getFirstButton(fixture).getAttribute('aria-label')).toBe('First page');
            expect(getLastButton(fixture).getAttribute('aria-label')).toBe('Last page');
        });
        it('should be able to go to the last page via the last page button', function () {
            expect(paginator.pageIndex).toBe(0);
            testing_2.dispatchMouseEvent(getLastButton(fixture), 'click');
            expect(paginator.pageIndex).toBe(9);
            expect(component.pageEvent).toHaveBeenCalledWith(jasmine.objectContaining({
                previousPageIndex: 0,
                pageIndex: 9
            }));
        });
        it('should be able to go to the first page via the first page button', function () {
            paginator.pageIndex = 3;
            fixture.detectChanges();
            expect(paginator.pageIndex).toBe(3);
            testing_2.dispatchMouseEvent(getFirstButton(fixture), 'click');
            expect(paginator.pageIndex).toBe(0);
            expect(component.pageEvent).toHaveBeenCalledWith(jasmine.objectContaining({
                previousPageIndex: 3,
                pageIndex: 0
            }));
        });
        it('should disable navigating to the next page if at last page', function () {
            component.goToLastPage();
            fixture.detectChanges();
            expect(paginator.pageIndex).toBe(9);
            expect(paginator.hasNextPage()).toBe(false);
            component.pageEvent.calls.reset();
            testing_2.dispatchMouseEvent(getNextButton(fixture), 'click');
            expect(component.pageEvent).not.toHaveBeenCalled();
            expect(paginator.pageIndex).toBe(9);
        });
        it('should disable navigating to the previous page if at first page', function () {
            expect(paginator.pageIndex).toBe(0);
            expect(paginator.hasPreviousPage()).toBe(false);
            component.pageEvent.calls.reset();
            testing_2.dispatchMouseEvent(getPreviousButton(fixture), 'click');
            expect(component.pageEvent).not.toHaveBeenCalled();
            expect(paginator.pageIndex).toBe(0);
        });
    });
    it('should mark for check when inputs are changed directly', function () {
        var rangeElement = fixture.nativeElement.querySelector('.mat-paginator-range-label');
        expect(rangeElement.innerText).toBe('1 - 10 of 100');
        paginator.length = 99;
        fixture.detectChanges();
        expect(rangeElement.innerText).toBe('1 - 10 of 99');
        paginator.pageSize = 6;
        fixture.detectChanges();
        expect(rangeElement.innerText).toBe('1 - 6 of 99');
        paginator.pageIndex = 1;
        fixture.detectChanges();
        expect(rangeElement.innerText).toBe('7 - 12 of 99');
        // Having one option and the same page size should remove the select menu
        expect(fixture.nativeElement.querySelector('.mat-select')).not.toBeNull();
        paginator.pageSize = 10;
        paginator.pageSizeOptions = [10];
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('.mat-select')).toBeNull();
    });
    it('should default the page size options to the page size if no options provided', function () {
        var withoutOptionsAppFixture = testing_1.TestBed.createComponent(MatPaginatorWithoutOptionsApp);
        withoutOptionsAppFixture.detectChanges();
        expect(withoutOptionsAppFixture.componentInstance.paginator._displayedPageSizeOptions)
            .toEqual([10]);
    });
    it('should default the page size to the first page size option if not provided', function () {
        var withoutPageSizeAppFixture = testing_1.TestBed.createComponent(MatPaginatorWithoutPageSizeApp);
        withoutPageSizeAppFixture.detectChanges();
        expect(withoutPageSizeAppFixture.componentInstance.paginator.pageSize).toEqual(10);
    });
    it('should show a sorted list of page size options including the current page size', function () {
        expect(paginator._displayedPageSizeOptions).toEqual([5, 10, 25, 100]);
        component.pageSize = 30;
        fixture.detectChanges();
        expect(paginator.pageSizeOptions).toEqual([5, 10, 25, 100]);
        expect(paginator._displayedPageSizeOptions).toEqual([5, 10, 25, 30, 100]);
        component.pageSizeOptions = [100, 25, 10, 5];
        fixture.detectChanges();
        expect(paginator._displayedPageSizeOptions).toEqual([5, 10, 25, 30, 100]);
    });
    it('should be able to change the page size while keeping the first item present', function () {
        // Start on the third page of a list of 100 with a page size of 10.
        component.pageIndex = 4;
        component.pageSize = 10;
        component.length = 100;
        fixture.detectChanges();
        // The first item of the page should be item with index 40
        expect(paginator.pageIndex * paginator.pageSize).toBe(40);
        // The first item on the page is now 25. Change the page size to 25 so that we should now be
        // on the second page where the top item is index 25.
        component.pageEvent.calls.reset();
        paginator._changePageSize(25);
        expect(component.pageEvent).toHaveBeenCalledWith(jasmine.objectContaining({
            pageIndex: 1,
            pageSize: 25
        }));
        // The first item on the page is still 25. Change the page size to 8 so that we should now be
        // on the fourth page where the top item is index 24.
        component.pageEvent.calls.reset();
        paginator._changePageSize(8);
        expect(component.pageEvent).toHaveBeenCalledWith(jasmine.objectContaining({
            pageIndex: 3,
            pageSize: 8
        }));
        // The first item on the page is 24. Change the page size to 16 so that we should now be
        // on the first page where the top item is index 0.
        component.pageEvent.calls.reset();
        paginator._changePageSize(25);
        expect(component.pageEvent).toHaveBeenCalledWith(jasmine.objectContaining({
            pageIndex: 0,
            pageSize: 25
        }));
    });
    it('should show a select only if there are multiple options', function () {
        expect(paginator._displayedPageSizeOptions).toEqual([5, 10, 25, 100]);
        expect(fixture.nativeElement.querySelector('.mat-select')).not.toBeNull();
        // Remove options so that the paginator only uses the current page size (10) as an option.
        // Should no longer show the select component since there is only one option.
        component.pageSizeOptions = [];
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('.mat-select')).toBeNull();
    });
    it('should handle the number inputs being passed in as strings', function () {
        var withStringFixture = testing_1.TestBed.createComponent(MatPaginatorWithStringValues);
        var withStringPaginator = withStringFixture.componentInstance.paginator;
        withStringFixture.detectChanges();
        expect(withStringPaginator.pageIndex).toEqual(0);
        expect(withStringPaginator.length).toEqual(100);
        expect(withStringPaginator.pageSize).toEqual(10);
        expect(withStringPaginator.pageSizeOptions).toEqual([5, 10, 25, 100]);
    });
    it('should be able to hide the page size select', function () {
        var element = fixture.nativeElement;
        expect(element.querySelector('.mat-paginator-page-size'))
            .toBeTruthy('Expected select to be rendered.');
        fixture.componentInstance.hidePageSize = true;
        fixture.detectChanges();
        expect(element.querySelector('.mat-paginator-page-size'))
            .toBeNull('Expected select to be removed.');
    });
});
function getPreviousButton(fixture) {
    return fixture.nativeElement.querySelector('.mat-paginator-navigation-previous');
}
function getNextButton(fixture) {
    return fixture.nativeElement.querySelector('.mat-paginator-navigation-next');
}
function getFirstButton(fixture) {
    return fixture.nativeElement.querySelector('.mat-paginator-navigation-first');
}
function getLastButton(fixture) {
    return fixture.nativeElement.querySelector('.mat-paginator-navigation-last');
}
var MatPaginatorApp = /** @class */ (function () {
    function MatPaginatorApp() {
        this.pageIndex = 0;
        this.pageSize = 10;
        this.pageSizeOptions = [5, 10, 25, 100];
        this.hidePageSize = false;
        this.showFirstLastButtons = false;
        this.length = 100;
        this.pageEvent = jasmine.createSpy('page event');
    }
    MatPaginatorApp.prototype.goToLastPage = function () {
        this.pageIndex = Math.ceil(this.length / this.pageSize) - 1;
    };
    MatPaginatorApp.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <mat-paginator [pageIndex]=\"pageIndex\"\n                   [pageSize]=\"pageSize\"\n                   [pageSizeOptions]=\"pageSizeOptions\"\n                   [hidePageSize]=\"hidePageSize\"\n                   [showFirstLastButtons]=\"showFirstLastButtons\"\n                   [length]=\"length\"\n                   (page)=\"pageEvent($event)\">\n    </mat-paginator>\n  ",
                },] },
    ];
    /** @nocollapse */
    MatPaginatorApp.propDecorators = {
        "paginator": [{ type: core_1.ViewChild, args: [paginator_1.MatPaginator,] },],
    };
    return MatPaginatorApp;
}());
var MatPaginatorWithoutInputsApp = /** @class */ (function () {
    function MatPaginatorWithoutInputsApp() {
    }
    MatPaginatorWithoutInputsApp.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <mat-paginator></mat-paginator>\n  ",
                },] },
    ];
    /** @nocollapse */
    MatPaginatorWithoutInputsApp.propDecorators = {
        "paginator": [{ type: core_1.ViewChild, args: [paginator_1.MatPaginator,] },],
    };
    return MatPaginatorWithoutInputsApp;
}());
var MatPaginatorWithoutPageSizeApp = /** @class */ (function () {
    function MatPaginatorWithoutPageSizeApp() {
    }
    MatPaginatorWithoutPageSizeApp.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <mat-paginator [pageSizeOptions]=\"[10, 20, 30]\"></mat-paginator>\n  ",
                },] },
    ];
    /** @nocollapse */
    MatPaginatorWithoutPageSizeApp.propDecorators = {
        "paginator": [{ type: core_1.ViewChild, args: [paginator_1.MatPaginator,] },],
    };
    return MatPaginatorWithoutPageSizeApp;
}());
var MatPaginatorWithoutOptionsApp = /** @class */ (function () {
    function MatPaginatorWithoutOptionsApp() {
    }
    MatPaginatorWithoutOptionsApp.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <mat-paginator [pageSize]=\"10\"></mat-paginator>\n  ",
                },] },
    ];
    /** @nocollapse */
    MatPaginatorWithoutOptionsApp.propDecorators = {
        "paginator": [{ type: core_1.ViewChild, args: [paginator_1.MatPaginator,] },],
    };
    return MatPaginatorWithoutOptionsApp;
}());
var MatPaginatorWithStringValues = /** @class */ (function () {
    function MatPaginatorWithStringValues() {
    }
    MatPaginatorWithStringValues.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <mat-paginator pageIndex=\"0\"\n                   pageSize=\"10\"\n                   [pageSizeOptions]=\"['5', '10', '25', '100']\"\n                   length=\"100\">\n    </mat-paginator>\n  "
                },] },
    ];
    /** @nocollapse */
    MatPaginatorWithStringValues.propDecorators = {
        "paginator": [{ type: core_1.ViewChild, args: [paginator_1.MatPaginator,] },],
    };
    return MatPaginatorWithStringValues;
}());
//# sourceMappingURL=paginator.spec.js.map