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
var core_1 = require("@angular/core");
var testing_1 = require("@angular/core/testing");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var cell_1 = require("./cell");
var index_1 = require("./index");
var row_1 = require("./row");
var table_1 = require("./table");
var table_errors_1 = require("./table-errors");
var bidi_1 = require("@angular/cdk/bidi");
describe('CdkTable', function () {
    var fixture;
    var component;
    var tableElement;
    function createComponent(componentType, declarations) {
        if (declarations === void 0) { declarations = []; }
        testing_1.TestBed.configureTestingModule({
            imports: [index_1.CdkTableModule, bidi_1.BidiModule],
            declarations: [componentType].concat(declarations),
        }).compileComponents();
        return testing_1.TestBed.createComponent(componentType);
    }
    function setupTableTestApp(componentType, declarations) {
        if (declarations === void 0) { declarations = []; }
        fixture = createComponent(componentType, declarations);
        component = fixture.componentInstance;
        fixture.detectChanges();
        tableElement = fixture.nativeElement.querySelector('.cdk-table');
    }
    describe('in a typical simple use case', function () {
        var dataSource;
        var table;
        beforeEach(function () {
            setupTableTestApp(SimpleCdkTableApp);
            component = fixture.componentInstance;
            dataSource = component.dataSource;
            table = component.table;
            fixture.detectChanges();
        });
        describe('should initialize', function () {
            it('with a connected data source', function () {
                expect(table.dataSource).toBe(dataSource);
                expect(dataSource.isConnected).toBe(true);
            });
            it('with a rendered header with the right number of header cells', function () {
                var header = getHeaderRows(tableElement)[0];
                expect(header).toBeTruthy();
                expect(header.classList).toContain('customHeaderRowClass');
                expect(getHeaderCells(header).length).toBe(component.columnsToRender.length);
            });
            it('with rendered rows with right number of row cells', function () {
                var rows = getRows(tableElement);
                expect(rows.length).toBe(dataSource.data.length);
                rows.forEach(function (row) {
                    expect(row.classList).toContain('customRowClass');
                    expect(getCells(row).length).toBe(component.columnsToRender.length);
                });
            });
            it('with column class names provided to header and data row cells', function () {
                var header = getHeaderRows(tableElement)[0];
                getHeaderCells(header).forEach(function (headerCell, index) {
                    expect(headerCell.classList).toContain("cdk-column-" + component.columnsToRender[index]);
                });
                getRows(tableElement).forEach(function (row) {
                    getCells(row).forEach(function (cell, index) {
                        expect(cell.classList).toContain("cdk-column-" + component.columnsToRender[index]);
                    });
                });
            });
            it('with the right accessibility roles', function () {
                expect(tableElement.getAttribute('role')).toBe('grid');
                expect(getHeaderRows(tableElement)[0].getAttribute('role')).toBe('row');
                var header = getHeaderRows(tableElement)[0];
                getHeaderCells(header).forEach(function (cell) {
                    expect(cell.getAttribute('role')).toBe('columnheader');
                });
                getRows(tableElement).forEach(function (row) {
                    expect(row.getAttribute('role')).toBe('row');
                    getCells(row).forEach(function (cell) {
                        expect(cell.getAttribute('role')).toBe('gridcell');
                    });
                });
            });
        });
        it('should disconnect the data source when table is destroyed', function () {
            expect(dataSource.isConnected).toBe(true);
            fixture.destroy();
            expect(dataSource.isConnected).toBe(false);
        });
        it('should re-render the rows when the data changes', function () {
            dataSource.addData();
            fixture.detectChanges();
            expect(getRows(tableElement).length).toBe(dataSource.data.length);
            // Check that the number of cells is correct
            getRows(tableElement).forEach(function (row) {
                expect(getCells(row).length).toBe(component.columnsToRender.length);
            });
        });
        it('should clear the `mostRecentCellOutlet` on destroy', function () {
            // Note: we cast the assertions here to booleans, because they may
            // contain circular objects which will throw Jasmine into an infinite
            // when its tries to stringify them to show a test failure.
            expect(!!row_1.CdkCellOutlet.mostRecentCellOutlet).toBe(true);
            fixture.destroy();
            expect(!!row_1.CdkCellOutlet.mostRecentCellOutlet).toBe(false);
        });
        describe('should correctly use the differ to add/remove/move rows', function () {
            function addInitialIndexAttribute() {
                // Each row receives an attribute 'initialIndex' the element's original place
                getRows(tableElement).forEach(function (row, index) {
                    row.setAttribute('initialIndex', index.toString());
                });
                // Prove that the attributes match their indicies
                var initialRows = getRows(tableElement);
                expect(initialRows[0].getAttribute('initialIndex')).toBe('0');
                expect(initialRows[1].getAttribute('initialIndex')).toBe('1');
                expect(initialRows[2].getAttribute('initialIndex')).toBe('2');
            }
            it('when the data is heterogeneous', function () {
                addInitialIndexAttribute();
                // Swap first and second data in data array
                var copiedData = component.dataSource.data.slice();
                var temp = copiedData[0];
                copiedData[0] = copiedData[1];
                copiedData[1] = temp;
                // Remove the third element
                copiedData.splice(2, 1);
                // Add new data
                // Add new data
                component.dataSource.data = copiedData;
                component.dataSource.addData();
                // Expect that the first and second rows were swapped and that the last row is new
                var changedRows = getRows(tableElement);
                expect(changedRows.length).toBe(3);
                expect(changedRows[0].getAttribute('initialIndex')).toBe('1');
                expect(changedRows[1].getAttribute('initialIndex')).toBe('0');
                expect(changedRows[2].getAttribute('initialIndex')).toBe(null);
            });
            it('when the data contains multiple occurrences of the same object instance', function () {
                var obj = { value: true };
                component.dataSource.data = [obj, obj, obj];
                addInitialIndexAttribute();
                var copiedData = component.dataSource.data.slice();
                // Remove the third element and add a new different obj in the beginning.
                copiedData.splice(2, 1);
                copiedData.unshift({ value: false });
                // Add new data
                // Add new data
                component.dataSource.data = copiedData;
                // Expect that two of the three rows still have an initial index. Not as concerned about
                // the order they are in, but more important that there was no unnecessary removes/inserts.
                var changedRows = getRows(tableElement);
                expect(changedRows.length).toBe(3);
                var numInitialRows = 0;
                changedRows.forEach(function (row) {
                    if (row.getAttribute('initialIndex') !== null) {
                        numInitialRows++;
                    }
                });
                expect(numInitialRows).toBe(2);
            });
        });
        it('should clear the row view containers on destroy', function () {
            var rowOutlet = fixture.componentInstance.table._rowOutlet.viewContainer;
            var headerPlaceholder = fixture.componentInstance.table._headerRowOutlet.viewContainer;
            spyOn(rowOutlet, 'clear').and.callThrough();
            spyOn(headerPlaceholder, 'clear').and.callThrough();
            fixture.destroy();
            expect(rowOutlet.clear).toHaveBeenCalled();
            expect(headerPlaceholder.clear).toHaveBeenCalled();
        });
        it('should match the right table content with dynamic data', function () {
            var initialDataLength = dataSource.data.length;
            expect(dataSource.data.length).toBe(3);
            var data = dataSource.data;
            expectTableToMatchContent(tableElement, [
                ['Column A', 'Column B', 'Column C'],
                [data[0].a, data[0].b, data[0].c],
                [data[1].a, data[1].b, data[1].c],
                [data[2].a, data[2].b, data[2].c],
                ['Footer A', 'Footer B', 'Footer C'],
            ]);
            // Add data to the table and recreate what the rendered output should be.
            dataSource.addData();
            expect(dataSource.data.length).toBe(initialDataLength + 1); // Make sure data was added
            fixture.detectChanges();
            data = dataSource.data;
            expectTableToMatchContent(tableElement, [
                ['Column A', 'Column B', 'Column C'],
                [data[0].a, data[0].b, data[0].c],
                [data[1].a, data[1].b, data[1].c],
                [data[2].a, data[2].b, data[2].c],
                [data[3].a, data[3].b, data[3].c],
                ['Footer A', 'Footer B', 'Footer C'],
            ]);
        });
        it('should be able to dynamically change the columns for header and rows', function () {
            expect(dataSource.data.length).toBe(3);
            var data = dataSource.data;
            expectTableToMatchContent(tableElement, [
                ['Column A', 'Column B', 'Column C'],
                [data[0].a, data[0].b, data[0].c],
                [data[1].a, data[1].b, data[1].c],
                [data[2].a, data[2].b, data[2].c],
                ['Footer A', 'Footer B', 'Footer C'],
            ]);
            // Remove column_a and swap column_b/column_c.
            component.columnsToRender = ['column_c', 'column_b'];
            fixture.detectChanges();
            var changedTableContent = [['Column C', 'Column B']];
            dataSource.data.forEach(function (rowData) { return changedTableContent.push([rowData.c, rowData.b]); });
            data = dataSource.data;
            expectTableToMatchContent(tableElement, [
                ['Column C', 'Column B'],
                [data[0].c, data[0].b],
                [data[1].c, data[1].b],
                [data[2].c, data[2].b],
                ['Footer C', 'Footer B'],
            ]);
        });
    });
    it('should render no rows when the data is null', testing_1.fakeAsync(function () {
        setupTableTestApp(NullDataCdkTableApp);
        fixture.detectChanges();
        expect(getRows(tableElement).length).toBe(0);
    }));
    it('should be able to render multiple header and footer rows', function () {
        setupTableTestApp(MultipleHeaderFooterRowsCdkTableApp);
        fixture.detectChanges();
        expectTableToMatchContent(tableElement, [
            ['first-header'],
            ['second-header'],
            ['first-footer'],
            ['second-footer'],
        ]);
    });
    it('should be able to render and change multiple header and footer rows', function () {
        setupTableTestApp(MultipleHeaderFooterRowsCdkTableApp);
        fixture.detectChanges();
        expectTableToMatchContent(tableElement, [
            ['first-header'],
            ['second-header'],
            ['first-footer'],
            ['second-footer'],
        ]);
        component.showAlternativeHeadersAndFooters = true;
        fixture.detectChanges();
        expectTableToMatchContent(tableElement, [
            ['first-header'],
            ['second-header'],
            ['first-footer'],
            ['second-footer'],
        ]);
    });
    describe('with different data inputs other than data source', function () {
        var baseData = [
            { a: 'a_1', b: 'b_1', c: 'c_1' },
            { a: 'a_2', b: 'b_2', c: 'c_2' },
            { a: 'a_3', b: 'b_3', c: 'c_3' },
        ];
        beforeEach(function () {
            setupTableTestApp(CdkTableWithDifferentDataInputsApp);
        });
        it('should render with data array input', function () {
            var data = baseData.slice();
            component.dataSource = data;
            fixture.detectChanges();
            var expectedRender = [
                ['Column A', 'Column B', 'Column C'],
                ['a_1', 'b_1', 'c_1'],
                ['a_2', 'b_2', 'c_2'],
                ['a_3', 'b_3', 'c_3'],
            ];
            expectTableToMatchContent(tableElement, expectedRender);
            // Push data to the array but neglect to tell the table, should be no change
            data.push({ a: 'a_4', b: 'b_4', c: 'c_4' });
            expectTableToMatchContent(tableElement, expectedRender);
            // Notify table of the change, expect another row
            component.table.renderRows();
            fixture.detectChanges();
            expectedRender.push(['a_4', 'b_4', 'c_4']);
            expectTableToMatchContent(tableElement, expectedRender);
            // Remove a row and expect the change in rows
            data.pop();
            component.table.renderRows();
            expectedRender.pop();
            expectTableToMatchContent(tableElement, expectedRender);
            // Remove the data input entirely and expect no rows - just header.
            component.dataSource = null;
            fixture.detectChanges();
            expectTableToMatchContent(tableElement, [expectedRender[0]]);
            // Add back the data to verify that it renders rows
            component.dataSource = data;
            fixture.detectChanges();
            expectTableToMatchContent(tableElement, expectedRender);
        });
        it('should render with data stream input', function () {
            var data = baseData.slice();
            var stream = new rxjs_1.BehaviorSubject(data);
            component.dataSource = stream;
            fixture.detectChanges();
            var expectedRender = [
                ['Column A', 'Column B', 'Column C'],
                ['a_1', 'b_1', 'c_1'],
                ['a_2', 'b_2', 'c_2'],
                ['a_3', 'b_3', 'c_3'],
            ];
            expectTableToMatchContent(tableElement, expectedRender);
            // Push data to the array and emit the data array on the stream
            data.push({ a: 'a_4', b: 'b_4', c: 'c_4' });
            stream.next(data);
            fixture.detectChanges();
            expectedRender.push(['a_4', 'b_4', 'c_4']);
            expectTableToMatchContent(tableElement, expectedRender);
            // Push data to the array but rather than emitting, call renderRows.
            data.push({ a: 'a_5', b: 'b_5', c: 'c_5' });
            component.table.renderRows();
            fixture.detectChanges();
            expectedRender.push(['a_5', 'b_5', 'c_5']);
            expectTableToMatchContent(tableElement, expectedRender);
            // Remove a row and expect the change in rows
            data.pop();
            expectedRender.pop();
            stream.next(data);
            expectTableToMatchContent(tableElement, expectedRender);
            // Remove the data input entirely and expect no rows - just header.
            component.dataSource = null;
            fixture.detectChanges();
            expectTableToMatchContent(tableElement, [expectedRender[0]]);
            // Add back the data to verify that it renders rows
            component.dataSource = stream;
            fixture.detectChanges();
            expectTableToMatchContent(tableElement, expectedRender);
        });
        it('should throw an error if the data source is not valid', function () {
            component.dataSource = { invalid: 'dataSource' };
            expect(function () { return fixture.detectChanges(); })
                .toThrowError(table_errors_1.getTableUnknownDataSourceError().message);
        });
        it('should throw an error if the data source is not valid', function () {
            component.dataSource = undefined;
            fixture.detectChanges();
            // Expect the table to render just the header, no rows
            expectTableToMatchContent(tableElement, [
                ['Column A', 'Column B', 'Column C']
            ]);
        });
    });
    describe('missing row defs', function () {
        it('should be able to render without a header row def', function () {
            setupTableTestApp(MissingHeaderRowDefCdkTableApp);
            expectTableToMatchContent(tableElement, [
                ['a_1'],
                // Data rows
                ['a_2'],
                ['a_3'],
                ['Footer A'],
            ]);
        });
        it('should be able to render without a data row def', function () {
            setupTableTestApp(MissingRowDefCdkTableApp);
            expectTableToMatchContent(tableElement, [
                ['Column A'],
                // Header row
                ['Footer A'],
            ]);
        });
        it('should be able to render without a footer row def', function () {
            setupTableTestApp(MissingFooterRowDefCdkTableApp);
            expectTableToMatchContent(tableElement, [
                ['Column A'],
                // Header row
                ['a_1'],
                // Data rows
                ['a_2'],
                ['a_3'],
            ]);
        });
    });
    it('should render correctly when using native HTML tags', function () {
        var thisFixture = createComponent(NativeHtmlTableApp);
        var thisTableElement = thisFixture.nativeElement.querySelector('table');
        thisFixture.detectChanges();
        expectTableToMatchContent(thisTableElement, [
            ['Column A', 'Column B', 'Column C'],
            ['a_1', 'b_1', 'c_1'],
            ['a_2', 'b_2', 'c_2'],
            ['a_3', 'b_3', 'c_3'],
        ]);
    });
    it('should render cells even if row data is falsy', function () {
        setupTableTestApp(BooleanRowCdkTableApp);
        expectTableToMatchContent(tableElement, [
            [''],
            // Header row
            ['false'],
            // Data rows
            ['true'],
            ['false'],
            ['true'],
        ]);
    });
    it('should be able to apply class-friendly css class names for the column cells', function () {
        setupTableTestApp(CrazyColumnNameCdkTableApp);
        // Column was named 'crazy-column-NAME-1!@#$%^-_&*()2'
        var header = getHeaderRows(tableElement)[0];
        expect(getHeaderCells(header)[0].classList)
            .toContain('cdk-column-crazy-column-NAME-1-------_----2');
    });
    it('should not clobber an existing table role', function () {
        setupTableTestApp(CustomRoleCdkTableApp);
        expect(tableElement.getAttribute('role')).toBe('treegrid');
    });
    it('should throw an error if two column definitions have the same name', function () {
        expect(function () { return createComponent(DuplicateColumnDefNameCdkTableApp).detectChanges(); })
            .toThrowError(table_errors_1.getTableDuplicateColumnNameError('column_a').message);
    });
    it('should throw an error if a column definition is requested but not defined', function () {
        expect(function () { return createComponent(MissingColumnDefCdkTableApp).detectChanges(); })
            .toThrowError(table_errors_1.getTableUnknownColumnError('column_a').message);
    });
    it('should throw an error if the row definitions are missing', function () {
        expect(function () { return createComponent(MissingAllRowDefsCdkTableApp).detectChanges(); })
            .toThrowError(table_errors_1.getTableMissingRowDefsError().message);
    });
    it('should not throw an error if columns are undefined on initialization', function () {
        setupTableTestApp(UndefinedColumnsCdkTableApp);
        // Header should be empty since there are no columns to display.
        var headerRow = getHeaderRows(tableElement)[0];
        expect(headerRow.textContent).toBe('');
        // Rows should be empty since there are no columns to display.
        var rows = getRows(tableElement);
        expect(rows[0].textContent).toBe('');
        expect(rows[1].textContent).toBe('');
        expect(rows[2].textContent).toBe('');
    });
    it('should be able to dynamically add/remove column definitions', function () {
        setupTableTestApp(DynamicColumnDefinitionsCdkTableApp);
        // Add a new column and expect it to show up in the table
        var columnA = 'columnA';
        component.dynamicColumns.push(columnA);
        fixture.detectChanges();
        expectTableToMatchContent(tableElement, [
            [columnA],
            // Header row
            [columnA],
            // Data rows
            [columnA],
            [columnA],
        ]);
        // Add another new column and expect it to show up in the table
        var columnB = 'columnB';
        component.dynamicColumns.push(columnB);
        fixture.detectChanges();
        expectTableToMatchContent(tableElement, [
            [columnA, columnB],
            // Header row
            [columnA, columnB],
            // Data rows
            [columnA, columnB],
            [columnA, columnB],
        ]);
        // Remove column A expect only column B to be rendered
        component.dynamicColumns.shift();
        fixture.detectChanges();
        expectTableToMatchContent(tableElement, [
            [columnB],
            // Header row
            [columnB],
            // Data rows
            [columnB],
            [columnB],
        ]);
    });
    it('should be able to register column, row, and header row definitions outside content', function () {
        setupTableTestApp(OuterTableApp, [WrapperCdkTableApp]);
        // The first two columns were defined in the wrapped table component as content children,
        // while the injected columns were provided to the wrapped table from the outer component.
        // A special row was provided with a when predicate that shows the single column with text.
        // The header row was defined by the outer component.
        expectTableToMatchContent(tableElement, [
            ['Content Column A', 'Content Column B', 'Injected Column A', 'Injected Column B'],
            ['injected row with when predicate'],
            ['a_2', 'b_2', 'a_2', 'b_2'],
            ['a_3', 'b_3', 'a_3', 'b_3']
        ]);
    });
    describe('using when predicate', function () {
        it('should be able to display different row templates based on the row data', function () {
            setupTableTestApp(WhenRowCdkTableApp);
            var data = component.dataSource.data;
            expectTableToMatchContent(tableElement, [
                ['Column A', 'Column B', 'Column C'],
                [data[0].a, data[0].b, data[0].c],
                ['index_1_special_row'],
                ['c3_special_row'],
                [data[3].a, data[3].b, data[3].c],
            ]);
        });
        it('should error if there is row data that does not have a matching row template', testing_1.fakeAsync(function () {
            var whenRowWithoutDefaultFixture = createComponent(WhenRowWithoutDefaultCdkTableApp);
            var data = whenRowWithoutDefaultFixture.componentInstance.dataSource.data;
            expect(function () {
                try {
                    whenRowWithoutDefaultFixture.detectChanges();
                    testing_1.flush();
                }
                catch (_a) {
                    testing_1.flush();
                }
            }).toThrowError(table_errors_1.getTableMissingMatchingRowDefError(data[0]).message);
        }));
        it('should fail when multiple rows match data without multiTemplateDataRows', testing_1.fakeAsync(function () {
            var whenFixture = createComponent(WhenRowMultipleDefaultsCdkTableApp);
            expect(function () {
                whenFixture.detectChanges();
                testing_1.flush();
            }).toThrowError(table_errors_1.getTableMultipleDefaultRowDefsError().message);
        }));
        describe('with multiTemplateDataRows', function () {
            it('should be able to render multiple rows per data object', function () {
                setupTableTestApp(WhenRowCdkTableApp);
                component.multiTemplateDataRows = true;
                fixture.detectChanges();
                var data = component.dataSource.data;
                expectTableToMatchContent(tableElement, [
                    ['Column A', 'Column B', 'Column C'],
                    [data[0].a, data[0].b, data[0].c],
                    [data[1].a, data[1].b, data[1].c],
                    ['index_1_special_row'],
                    [data[2].a, data[2].b, data[2].c],
                    ['c3_special_row'],
                    [data[3].a, data[3].b, data[3].c],
                ]);
            });
            it('should have the correct data and row indicies', function () {
                setupTableTestApp(WhenRowCdkTableApp);
                component.multiTemplateDataRows = true;
                component.showIndexColumns();
                fixture.detectChanges();
                expectTableToMatchContent(tableElement, [
                    ['Index', 'Data Index', 'Render Index'],
                    ['', '0', '0'],
                    ['', '1', '1'],
                    ['', '1', '2'],
                    ['', '2', '3'],
                    ['', '2', '4'],
                    ['', '3', '5'],
                ]);
            });
            it('should have the correct data and row indicies when data contains multiple instances of ' +
                'the same object instance', function () {
                setupTableTestApp(WhenRowCdkTableApp);
                component.multiTemplateDataRows = true;
                component.showIndexColumns();
                var obj = { value: true };
                component.dataSource.data = [obj, obj, obj, obj];
                fixture.detectChanges();
                expectTableToMatchContent(tableElement, [
                    ['Index', 'Data Index', 'Render Index'],
                    ['', '0', '0'],
                    ['', '1', '1'],
                    ['', '1', '2'],
                    ['', '2', '3'],
                    ['', '3', '4'],
                ]);
                // Push unique data on the front and add another obj to the array
                component.dataSource.data = [{ value: false }, obj, obj, obj, obj, obj];
                fixture.detectChanges();
                expectTableToMatchContent(tableElement, [
                    ['Index', 'Data Index', 'Render Index'],
                    ['', '0', '0'],
                    ['', '1', '1'],
                    ['', '1', '2'],
                    ['', '2', '3'],
                    ['', '3', '4'],
                    ['', '4', '5'],
                    ['', '5', '6'],
                ]);
            });
        });
    });
    describe('with sticky positioning', function () {
        function expectNoStickyStyles(elements) {
            elements.forEach(function (element) {
                expect(element.classList.contains('cdk-table-sticky'));
                expect(element.style.position).toBe('');
                expect(element.style.zIndex || '0').toBe('0');
                ['top', 'bottom', 'left', 'right'].forEach(function (d) {
                    expect(element.style[d] || 'unset').toBe('unset', "Expected " + d + " to be unset");
                });
            });
        }
        function expectStickyStyles(element, zIndex, directions) {
            if (directions === void 0) { directions = {}; }
            expect(element.style.position).toContain('sticky');
            expect(element.style.zIndex).toBe(zIndex, "Expected zIndex to be " + zIndex);
            ['top', 'bottom', 'left', 'right'].forEach(function (d) {
                if (!directions[d]) {
                    // If no expected position for this direction, must either be unset or empty string
                    expect(element.style[d] || 'unset').toBe('unset', "Expected " + d + " to be unset");
                    return;
                }
                var expectationMessage = "Expected direction " + d + " to be " + directions[d];
                // If the direction contains `px`, we parse the number to be able to avoid deviations
                // caused by individual browsers.
                if (directions[d].includes('px')) {
                    expect(Math.round(parseInt(element.style[d])))
                        .toBe(Math.round(parseInt(directions[d])), expectationMessage);
                }
                else {
                    expect(element.style[d]).toBe(directions[d], expectationMessage);
                }
            });
        }
        describe('on "display: flex" table style', function () {
            var dataRows;
            var headerRows;
            var footerRows;
            beforeEach(function () {
                setupTableTestApp(StickyFlexLayoutCdkTableApp);
                headerRows = getHeaderRows(tableElement);
                footerRows = getFooterRows(tableElement);
                dataRows = getRows(tableElement);
            });
            it('should stick and unstick headers', function () {
                component.stickyHeaders = ['header-1', 'header-3'];
                fixture.detectChanges();
                expectStickyStyles(headerRows[0], '100', { top: '0px' });
                expectNoStickyStyles([headerRows[1]]);
                expectStickyStyles(headerRows[2], '100', { top: headerRows[0].getBoundingClientRect().height + 'px' });
                component.stickyHeaders = [];
                fixture.detectChanges();
                expectNoStickyStyles(headerRows);
            });
            it('should stick and unstick footers', function () {
                component.stickyFooters = ['footer-1', 'footer-3'];
                fixture.detectChanges();
                expectStickyStyles(footerRows[0], '10', { bottom: footerRows[1].getBoundingClientRect().height + 'px' });
                expectNoStickyStyles([footerRows[1]]);
                expectStickyStyles(footerRows[2], '10', { bottom: '0px' });
                component.stickyFooters = [];
                fixture.detectChanges();
                expectNoStickyStyles(footerRows);
            });
            it('should stick and unstick left columns', function () {
                component.stickyStartColumns = ['column-1', 'column-3'];
                fixture.detectChanges();
                headerRows.forEach(function (row) {
                    var cells = getHeaderCells(row);
                    expectStickyStyles(cells[0], '1', { left: '0px' });
                    expectStickyStyles(cells[2], '1', { left: '20px' });
                    expectNoStickyStyles([cells[1], cells[3], cells[4], cells[5]]);
                });
                dataRows.forEach(function (row) {
                    var cells = getCells(row);
                    expectStickyStyles(cells[0], '1', { left: '0px' });
                    expectStickyStyles(cells[2], '1', { left: '20px' });
                    expectNoStickyStyles([cells[1], cells[3], cells[4], cells[5]]);
                });
                footerRows.forEach(function (row) {
                    var cells = getFooterCells(row);
                    expectStickyStyles(cells[0], '1', { left: '0px' });
                    expectStickyStyles(cells[2], '1', { left: '20px' });
                    expectNoStickyStyles([cells[1], cells[3], cells[4], cells[5]]);
                });
                component.stickyStartColumns = [];
                fixture.detectChanges();
                headerRows.forEach(function (row) { return expectNoStickyStyles(getHeaderCells(row)); });
                dataRows.forEach(function (row) { return expectNoStickyStyles(getCells(row)); });
                footerRows.forEach(function (row) { return expectNoStickyStyles(getFooterCells(row)); });
            });
            it('should stick and unstick right columns', function () {
                component.stickyEndColumns = ['column-4', 'column-6'];
                fixture.detectChanges();
                headerRows.forEach(function (row) {
                    var cells = getHeaderCells(row);
                    expectStickyStyles(cells[5], '1', { right: '0px' });
                    expectStickyStyles(cells[3], '1', { right: '20px' });
                    expectNoStickyStyles([cells[0], cells[1], cells[2], cells[4]]);
                });
                dataRows.forEach(function (row) {
                    var cells = getCells(row);
                    expectStickyStyles(cells[5], '1', { right: '0px' });
                    expectStickyStyles(cells[3], '1', { right: '20px' });
                    expectNoStickyStyles([cells[0], cells[1], cells[2], cells[4]]);
                });
                footerRows.forEach(function (row) {
                    var cells = getFooterCells(row);
                    expectStickyStyles(cells[5], '1', { right: '0px' });
                    expectStickyStyles(cells[3], '1', { right: '20px' });
                    expectNoStickyStyles([cells[0], cells[1], cells[2], cells[4]]);
                });
                component.stickyEndColumns = [];
                fixture.detectChanges();
                headerRows.forEach(function (row) { return expectNoStickyStyles(getHeaderCells(row)); });
                dataRows.forEach(function (row) { return expectNoStickyStyles(getCells(row)); });
                footerRows.forEach(function (row) { return expectNoStickyStyles(getFooterCells(row)); });
            });
            it('should reverse directions for sticky columns in rtl', function () {
                component.dir = 'rtl';
                component.stickyStartColumns = ['column-1', 'column-2'];
                component.stickyEndColumns = ['column-5', 'column-6'];
                fixture.detectChanges();
                var firstColumnWidth = getHeaderCells(headerRows[0])[0].getBoundingClientRect().width;
                var lastColumnWidth = getHeaderCells(headerRows[0])[5].getBoundingClientRect().width;
                var headerCells = getHeaderCells(headerRows[0]);
                expectStickyStyles(headerCells[0], '1', { right: '0px' });
                expectStickyStyles(headerCells[1], '1', { right: firstColumnWidth + "px" });
                expectStickyStyles(headerCells[4], '1', { left: lastColumnWidth + "px" });
                expectStickyStyles(headerCells[5], '1', { left: '0px' });
                dataRows.forEach(function (row) {
                    var cells = getCells(row);
                    expectStickyStyles(cells[0], '1', { right: '0px' });
                    expectStickyStyles(cells[1], '1', { right: firstColumnWidth + "px" });
                    expectStickyStyles(cells[4], '1', { left: lastColumnWidth + "px" });
                    expectStickyStyles(cells[5], '1', { left: '0px' });
                });
                var footerCells = getFooterCells(footerRows[0]);
                expectStickyStyles(footerCells[0], '1', { right: '0px' });
                expectStickyStyles(footerCells[1], '1', { right: firstColumnWidth + "px" });
                expectStickyStyles(footerCells[4], '1', { left: lastColumnWidth + "px" });
                expectStickyStyles(footerCells[5], '1', { left: '0px' });
            });
            it('should stick and unstick combination of sticky header, footer, and columns', function () {
                component.stickyHeaders = ['header-1'];
                component.stickyFooters = ['footer-3'];
                component.stickyStartColumns = ['column-1'];
                component.stickyEndColumns = ['column-6'];
                fixture.detectChanges();
                var headerCells = getHeaderCells(headerRows[0]);
                expectStickyStyles(headerRows[0], '100', { top: '0px' });
                expectStickyStyles(headerCells[0], '1', { left: '0px' });
                expectStickyStyles(headerCells[5], '1', { right: '0px' });
                expectNoStickyStyles([headerCells[1], headerCells[2], headerCells[3], headerCells[4]]);
                expectNoStickyStyles([headerRows[1], headerRows[2]]);
                dataRows.forEach(function (row) {
                    var cells = getCells(row);
                    expectStickyStyles(cells[0], '1', { left: '0px' });
                    expectStickyStyles(cells[5], '1', { right: '0px' });
                    expectNoStickyStyles([cells[1], cells[2], cells[3], cells[4]]);
                });
                var footerCells = getFooterCells(footerRows[0]);
                expectStickyStyles(footerRows[0], '10', { bottom: '0px' });
                expectStickyStyles(footerCells[0], '1', { left: '0px' });
                expectStickyStyles(footerCells[5], '1', { right: '0px' });
                expectNoStickyStyles([footerCells[1], footerCells[2], footerCells[3], footerCells[4]]);
                expectNoStickyStyles([footerRows[1], footerRows[2]]);
                component.stickyHeaders = [];
                component.stickyFooters = [];
                component.stickyStartColumns = [];
                component.stickyEndColumns = [];
                fixture.detectChanges();
                headerRows.forEach(function (row) { return expectNoStickyStyles([row].concat(getHeaderCells(row))); });
                dataRows.forEach(function (row) { return expectNoStickyStyles([row].concat(getCells(row))); });
                footerRows.forEach(function (row) { return expectNoStickyStyles([row].concat(getFooterCells(row))); });
            });
        });
        describe('on native table layout', function () {
            var dataRows;
            var headerRows;
            var footerRows;
            beforeEach(function () {
                setupTableTestApp(StickyNativeLayoutCdkTableApp);
                headerRows = getHeaderRows(tableElement);
                footerRows = getFooterRows(tableElement);
                dataRows = getRows(tableElement);
            });
            it('should stick and unstick headers', function () {
                component.stickyHeaders = ['header-1', 'header-3'];
                fixture.detectChanges();
                getHeaderCells(headerRows[0]).forEach(function (cell) {
                    expectStickyStyles(cell, '100', { top: '0px' });
                });
                var firstHeaderHeight = headerRows[0].getBoundingClientRect().height;
                getHeaderCells(headerRows[2]).forEach(function (cell) {
                    expectStickyStyles(cell, '100', { top: firstHeaderHeight + 'px' });
                });
                expectNoStickyStyles(getHeaderCells(headerRows[1]));
                expectNoStickyStyles(headerRows); // No sticky styles on rows for native table
                component.stickyHeaders = [];
                fixture.detectChanges();
                expectNoStickyStyles(headerRows); // No sticky styles on rows for native table
                headerRows.forEach(function (row) { return expectNoStickyStyles(getHeaderCells(row)); });
            });
            it('should stick and unstick footers', function () {
                component.stickyFooters = ['footer-1', 'footer-3'];
                fixture.detectChanges();
                getFooterCells(footerRows[2]).forEach(function (cell) {
                    expectStickyStyles(cell, '10', { bottom: '0px' });
                });
                var thirdFooterHeight = footerRows[2].getBoundingClientRect().height;
                getFooterCells(footerRows[0]).forEach(function (cell) {
                    expectStickyStyles(cell, '10', { bottom: thirdFooterHeight + 'px' });
                });
                expectNoStickyStyles(getFooterCells(footerRows[1]));
                expectNoStickyStyles(footerRows); // No sticky styles on rows for native table
                component.stickyFooters = [];
                fixture.detectChanges();
                expectNoStickyStyles(footerRows); // No sticky styles on rows for native table
                footerRows.forEach(function (row) { return expectNoStickyStyles(getFooterCells(row)); });
            });
            it('should stick tfoot when all rows are stuck', function () {
                var tfoot = tableElement.querySelector('tfoot');
                component.stickyFooters = ['footer-1'];
                fixture.detectChanges();
                expectNoStickyStyles([tfoot]);
                component.stickyFooters = ['footer-1', 'footer-2', 'footer-3'];
                fixture.detectChanges();
                expectStickyStyles(tfoot, '10', { bottom: '0px' });
                component.stickyFooters = ['footer-1', 'footer-2'];
                fixture.detectChanges();
                expectNoStickyStyles([tfoot]);
            });
            it('should stick and unstick left columns', function () {
                component.stickyStartColumns = ['column-1', 'column-3'];
                fixture.detectChanges();
                headerRows.forEach(function (row) {
                    var cells = getHeaderCells(row);
                    expectStickyStyles(cells[0], '1', { left: '0px' });
                    expectStickyStyles(cells[2], '1', { left: '20px' });
                    expectNoStickyStyles([cells[1], cells[3], cells[4], cells[5]]);
                });
                dataRows.forEach(function (row) {
                    var cells = getCells(row);
                    expectStickyStyles(cells[0], '1', { left: '0px' });
                    expectStickyStyles(cells[2], '1', { left: '20px' });
                    expectNoStickyStyles([cells[1], cells[3], cells[4], cells[5]]);
                });
                footerRows.forEach(function (row) {
                    var cells = getFooterCells(row);
                    expectStickyStyles(cells[0], '1', { left: '0px' });
                    expectStickyStyles(cells[2], '1', { left: '20px' });
                    expectNoStickyStyles([cells[1], cells[3], cells[4], cells[5]]);
                });
                component.stickyStartColumns = [];
                fixture.detectChanges();
                headerRows.forEach(function (row) { return expectNoStickyStyles(getHeaderCells(row)); });
                dataRows.forEach(function (row) { return expectNoStickyStyles(getCells(row)); });
                footerRows.forEach(function (row) { return expectNoStickyStyles(getFooterCells(row)); });
            });
            it('should stick and unstick right columns', function () {
                component.stickyEndColumns = ['column-4', 'column-6'];
                fixture.detectChanges();
                headerRows.forEach(function (row) {
                    var cells = getHeaderCells(row);
                    expectStickyStyles(cells[5], '1', { right: '0px' });
                    expectStickyStyles(cells[3], '1', { right: '20px' });
                    expectNoStickyStyles([cells[0], cells[1], cells[2], cells[4]]);
                });
                dataRows.forEach(function (row) {
                    var cells = getCells(row);
                    expectStickyStyles(cells[5], '1', { right: '0px' });
                    expectStickyStyles(cells[3], '1', { right: '20px' });
                    expectNoStickyStyles([cells[0], cells[1], cells[2], cells[4]]);
                });
                footerRows.forEach(function (row) {
                    var cells = getFooterCells(row);
                    expectStickyStyles(cells[5], '1', { right: '0px' });
                    expectStickyStyles(cells[3], '1', { right: '20px' });
                    expectNoStickyStyles([cells[0], cells[1], cells[2], cells[4]]);
                });
                component.stickyEndColumns = [];
                fixture.detectChanges();
                headerRows.forEach(function (row) { return expectNoStickyStyles(getHeaderCells(row)); });
                dataRows.forEach(function (row) { return expectNoStickyStyles(getCells(row)); });
                footerRows.forEach(function (row) { return expectNoStickyStyles(getFooterCells(row)); });
            });
            it('should stick and unstick combination of sticky header, footer, and columns', function () {
                component.stickyHeaders = ['header-1'];
                component.stickyFooters = ['footer-3'];
                component.stickyStartColumns = ['column-1'];
                component.stickyEndColumns = ['column-6'];
                fixture.detectChanges();
                var headerCells = getHeaderCells(headerRows[0]);
                expectStickyStyles(headerCells[0], '101', { top: '0px', left: '0px' });
                expectStickyStyles(headerCells[1], '100', { top: '0px' });
                expectStickyStyles(headerCells[2], '100', { top: '0px' });
                expectStickyStyles(headerCells[3], '100', { top: '0px' });
                expectStickyStyles(headerCells[4], '100', { top: '0px' });
                expectStickyStyles(headerCells[5], '101', { top: '0px', right: '0px' });
                expectNoStickyStyles(headerRows);
                dataRows.forEach(function (row) {
                    var cells = getCells(row);
                    expectStickyStyles(cells[0], '1', { left: '0px' });
                    expectStickyStyles(cells[5], '1', { right: '0px' });
                    expectNoStickyStyles([cells[1], cells[2], cells[3], cells[4]]);
                });
                var footerCells = getFooterCells(footerRows[0]);
                expectStickyStyles(footerCells[0], '11', { bottom: '0px', left: '0px' });
                expectStickyStyles(footerCells[1], '10', { bottom: '0px' });
                expectStickyStyles(footerCells[2], '10', { bottom: '0px' });
                expectStickyStyles(footerCells[3], '10', { bottom: '0px' });
                expectStickyStyles(footerCells[4], '10', { bottom: '0px' });
                expectStickyStyles(footerCells[5], '11', { bottom: '0px', right: '0px' });
                expectNoStickyStyles(footerRows);
                component.stickyHeaders = [];
                component.stickyFooters = [];
                component.stickyStartColumns = [];
                component.stickyEndColumns = [];
                fixture.detectChanges();
                headerRows.forEach(function (row) { return expectNoStickyStyles([row].concat(getHeaderCells(row))); });
                dataRows.forEach(function (row) { return expectNoStickyStyles([row].concat(getCells(row))); });
                footerRows.forEach(function (row) { return expectNoStickyStyles([row].concat(getFooterCells(row))); });
            });
        });
    });
    describe('with trackBy', function () {
        function createTestComponentWithTrackyByTable(trackByStrategy) {
            fixture = createComponent(TrackByCdkTableApp);
            component = fixture.componentInstance;
            component.trackByStrategy = trackByStrategy;
            tableElement = fixture.nativeElement.querySelector('cdk-table');
            fixture.detectChanges();
            // Each row receives an attribute 'initialIndex' the element's original place
            getRows(tableElement).forEach(function (row, index) {
                row.setAttribute('initialIndex', index.toString());
            });
            // Prove that the attributes match their indicies
            var initialRows = getRows(tableElement);
            expect(initialRows[0].getAttribute('initialIndex')).toBe('0');
            expect(initialRows[1].getAttribute('initialIndex')).toBe('1');
            expect(initialRows[2].getAttribute('initialIndex')).toBe('2');
        }
        // Swap first two elements, remove the third, add new data
        function mutateData() {
            // Swap first and second data in data array
            var copiedData = component.dataSource.data.slice();
            var temp = copiedData[0];
            copiedData[0] = copiedData[1];
            copiedData[1] = temp;
            // Remove the third element
            copiedData.splice(2, 1);
            // Add new data
            component.dataSource.data = copiedData;
            component.dataSource.addData();
        }
        it('should add/remove/move rows with reference-based trackBy', function () {
            createTestComponentWithTrackyByTable('reference');
            mutateData();
            // Expect that the first and second rows were swapped and that the last row is new
            var changedRows = getRows(tableElement);
            expect(changedRows.length).toBe(3);
            expect(changedRows[0].getAttribute('initialIndex')).toBe('1');
            expect(changedRows[1].getAttribute('initialIndex')).toBe('0');
            expect(changedRows[2].getAttribute('initialIndex')).toBe(null);
        });
        it('should add/remove/move rows with changed references without property-based trackBy', function () {
            createTestComponentWithTrackyByTable('reference');
            mutateData();
            // Change each item reference to show that the trackby is not checking the item properties.
            component.dataSource.data = component.dataSource.data
                .map(function (item) { return { a: item.a, b: item.b, c: item.c }; });
            // Expect that all the rows are considered new since their references are all different
            var changedRows = getRows(tableElement);
            expect(changedRows.length).toBe(3);
            expect(changedRows[0].getAttribute('initialIndex')).toBe(null);
            expect(changedRows[1].getAttribute('initialIndex')).toBe(null);
            expect(changedRows[2].getAttribute('initialIndex')).toBe(null);
        });
        it('should add/remove/move rows with changed references with property-based trackBy', function () {
            createTestComponentWithTrackyByTable('propertyA');
            mutateData();
            // Change each item reference to show that the trackby is checking the item properties.
            // Otherwise this would cause them all to be removed/added.
            component.dataSource.data = component.dataSource.data
                .map(function (item) { return { a: item.a, b: item.b, c: item.c }; });
            // Expect that the first and second rows were swapped and that the last row is new
            var changedRows = getRows(tableElement);
            expect(changedRows.length).toBe(3);
            expect(changedRows[0].getAttribute('initialIndex')).toBe('1');
            expect(changedRows[1].getAttribute('initialIndex')).toBe('0');
            expect(changedRows[2].getAttribute('initialIndex')).toBe(null);
        });
        it('should add/remove/move rows with changed references with index-based trackBy', function () {
            createTestComponentWithTrackyByTable('index');
            mutateData();
            // Change each item reference to show that the trackby is checking the index.
            // Otherwise this would cause them all to be removed/added.
            component.dataSource.data = component.dataSource.data
                .map(function (item) { return { a: item.a, b: item.b, c: item.c }; });
            // Expect first two to be the same since they were swapped but indicies are consistent.
            // The third element was removed and caught by the table so it was removed before another
            // item was added, so it is without an initial index.
            var changedRows = getRows(tableElement);
            expect(changedRows.length).toBe(3);
            expect(changedRows[0].getAttribute('initialIndex')).toBe('0');
            expect(changedRows[1].getAttribute('initialIndex')).toBe('1');
            expect(changedRows[2].getAttribute('initialIndex')).toBe(null);
        });
        it('should change row implicit data even when trackBy finds no changes', function () {
            createTestComponentWithTrackyByTable('index');
            var firstRow = getRows(tableElement)[0];
            expect(firstRow.textContent.trim()).toBe('a_1 b_1');
            expect(firstRow.getAttribute('initialIndex')).toBe('0');
            mutateData();
            // Change each item reference to show that the trackby is checking the index.
            // Otherwise this would cause them all to be removed/added.
            component.dataSource.data = component.dataSource.data
                .map(function (item) { return ({ a: item.a, b: item.b, c: item.c }); });
            // Expect the rows were given the right implicit data even though the rows were not moved.
            fixture.detectChanges();
            expect(firstRow.textContent.trim()).toBe('a_2 b_2');
            expect(firstRow.getAttribute('initialIndex')).toBe('0');
        });
    });
    it('should match the right table content with dynamic data source', function () {
        setupTableTestApp(DynamicDataSourceCdkTableApp);
        // Expect that the component has no data source and the table element reflects empty data.
        expect(component.dataSource).toBeUndefined();
        expectTableToMatchContent(tableElement, [
            ['Column A']
        ]);
        // Add a data source that has initialized data. Expect that the table shows this data.
        var dynamicDataSource = new FakeDataSource();
        component.dataSource = dynamicDataSource;
        fixture.detectChanges();
        expect(dynamicDataSource.isConnected).toBe(true);
        var data = component.dataSource.data;
        expectTableToMatchContent(tableElement, [
            ['Column A'],
            [data[0].a],
            [data[1].a],
            [data[2].a],
        ]);
        // Remove the data source and check to make sure the table is empty again.
        component.dataSource = undefined;
        fixture.detectChanges();
        // Expect that the old data source has been disconnected.
        expect(dynamicDataSource.isConnected).toBe(false);
        expectTableToMatchContent(tableElement, [
            ['Column A']
        ]);
        // Reconnect a data source and check that the table is populated
        var newDynamicDataSource = new FakeDataSource();
        component.dataSource = newDynamicDataSource;
        fixture.detectChanges();
        expect(newDynamicDataSource.isConnected).toBe(true);
        var newData = component.dataSource.data;
        expectTableToMatchContent(tableElement, [
            ['Column A'],
            [newData[0].a],
            [newData[1].a],
            [newData[2].a],
        ]);
    });
    it('should be able to apply classes to rows based on their context', function () {
        setupTableTestApp(RowContextCdkTableApp);
        var rowElements = tableElement.querySelectorAll('cdk-row');
        // Rows should not have any context classes
        for (var i = 0; i < rowElements.length; i++) {
            expect(rowElements[i].classList.contains('custom-row-class-first')).toBe(false);
            expect(rowElements[i].classList.contains('custom-row-class-last')).toBe(false);
            expect(rowElements[i].classList.contains('custom-row-class-even')).toBe(false);
            expect(rowElements[i].classList.contains('custom-row-class-odd')).toBe(false);
        }
        // Enable all the context classes
        component.enableRowContextClasses = true;
        fixture.detectChanges();
        expect(rowElements[0].classList.contains('custom-row-class-first')).toBe(true);
        expect(rowElements[0].classList.contains('custom-row-class-last')).toBe(false);
        expect(rowElements[0].classList.contains('custom-row-class-even')).toBe(true);
        expect(rowElements[0].classList.contains('custom-row-class-odd')).toBe(false);
        expect(rowElements[1].classList.contains('custom-row-class-first')).toBe(false);
        expect(rowElements[1].classList.contains('custom-row-class-last')).toBe(false);
        expect(rowElements[1].classList.contains('custom-row-class-even')).toBe(false);
        expect(rowElements[1].classList.contains('custom-row-class-odd')).toBe(true);
        expect(rowElements[2].classList.contains('custom-row-class-first')).toBe(false);
        expect(rowElements[2].classList.contains('custom-row-class-last')).toBe(true);
        expect(rowElements[2].classList.contains('custom-row-class-even')).toBe(true);
        expect(rowElements[2].classList.contains('custom-row-class-odd')).toBe(false);
    });
    it('should be able to apply classes to cells based on their row context', function () {
        setupTableTestApp(RowContextCdkTableApp);
        var rowElements = fixture.nativeElement.querySelectorAll('cdk-row');
        for (var i = 0; i < rowElements.length; i++) {
            // Cells should not have any context classes
            var cellElements = rowElements[i].querySelectorAll('cdk-cell');
            for (var j = 0; j < cellElements.length; j++) {
                expect(cellElements[j].classList.contains('custom-cell-class-first')).toBe(false);
                expect(cellElements[j].classList.contains('custom-cell-class-last')).toBe(false);
                expect(cellElements[j].classList.contains('custom-cell-class-even')).toBe(false);
                expect(cellElements[j].classList.contains('custom-cell-class-odd')).toBe(false);
            }
        }
        // Enable the context classes
        component.enableCellContextClasses = true;
        fixture.detectChanges();
        var cellElement = rowElements[0].querySelectorAll('cdk-cell')[0];
        expect(cellElement.classList.contains('custom-cell-class-first')).toBe(true);
        expect(cellElement.classList.contains('custom-cell-class-last')).toBe(false);
        expect(cellElement.classList.contains('custom-cell-class-even')).toBe(true);
        expect(cellElement.classList.contains('custom-cell-class-odd')).toBe(false);
        cellElement = rowElements[1].querySelectorAll('cdk-cell')[0];
        expect(cellElement.classList.contains('custom-cell-class-first')).toBe(false);
        expect(cellElement.classList.contains('custom-cell-class-last')).toBe(false);
        expect(cellElement.classList.contains('custom-cell-class-even')).toBe(false);
        expect(cellElement.classList.contains('custom-cell-class-odd')).toBe(true);
        cellElement = rowElements[2].querySelectorAll('cdk-cell')[0];
        expect(cellElement.classList.contains('custom-cell-class-first')).toBe(false);
        expect(cellElement.classList.contains('custom-cell-class-last')).toBe(true);
        expect(cellElement.classList.contains('custom-cell-class-even')).toBe(true);
        expect(cellElement.classList.contains('custom-cell-class-odd')).toBe(false);
    });
});
var FakeDataSource = /** @class */ (function (_super) {
    __extends(FakeDataSource, _super);
    function FakeDataSource() {
        var _this = _super.call(this) || this;
        _this.isConnected = false;
        _this._dataChange = new rxjs_1.BehaviorSubject([]);
        for (var i = 0; i < 3; i++) {
            _this.addData();
        }
        return _this;
    }
    Object.defineProperty(FakeDataSource.prototype, "data", {
        get: function () { return this._dataChange.getValue(); },
        set: function (data) { this._dataChange.next(data); },
        enumerable: true,
        configurable: true
    });
    FakeDataSource.prototype.connect = function (collectionViewer) {
        this.isConnected = true;
        var streams = [this._dataChange, collectionViewer.viewChange];
        return rxjs_1.combineLatest(streams).pipe(operators_1.map(function (data) { return data[0]; }));
    };
    FakeDataSource.prototype.disconnect = function () {
        this.isConnected = false;
    };
    FakeDataSource.prototype.addData = function () {
        var nextIndex = this.data.length + 1;
        var copiedData = this.data.slice();
        copiedData.push({
            a: "a_" + nextIndex,
            b: "b_" + nextIndex,
            c: "c_" + nextIndex
        });
        this.data = copiedData;
    };
    return FakeDataSource;
}(collections_1.DataSource));
var BooleanDataSource = /** @class */ (function (_super) {
    __extends(BooleanDataSource, _super);
    function BooleanDataSource() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._dataChange = new rxjs_1.BehaviorSubject([false, true, false, true]);
        return _this;
    }
    BooleanDataSource.prototype.connect = function () {
        return this._dataChange;
    };
    BooleanDataSource.prototype.disconnect = function () { };
    return BooleanDataSource;
}(collections_1.DataSource));
var SimpleCdkTableApp = /** @class */ (function () {
    function SimpleCdkTableApp() {
        this.dataSource = new FakeDataSource();
        this.columnsToRender = ['column_a', 'column_b', 'column_c'];
    }
    SimpleCdkTableApp.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <cdk-table [dataSource]=\"dataSource\">\n      <ng-container cdkColumnDef=\"column_a\">\n        <cdk-header-cell *cdkHeaderCellDef> Column A </cdk-header-cell>\n        <cdk-cell *cdkCellDef=\"let row\"> {{row.a}} </cdk-cell>\n        <cdk-footer-cell *cdkFooterCellDef> Footer A </cdk-footer-cell>\n      </ng-container>\n\n      <ng-container cdkColumnDef=\"column_b\">\n        <cdk-header-cell *cdkHeaderCellDef> Column B </cdk-header-cell>\n        <cdk-cell *cdkCellDef=\"let row\"> {{row.b}} </cdk-cell>\n        <cdk-footer-cell *cdkFooterCellDef> Footer B </cdk-footer-cell>\n      </ng-container>\n\n      <ng-container cdkColumnDef=\"column_c\">\n        <cdk-header-cell *cdkHeaderCellDef> Column C </cdk-header-cell>\n        <cdk-cell *cdkCellDef=\"let row\"> {{row.c}} </cdk-cell>\n        <cdk-footer-cell *cdkFooterCellDef> Footer C </cdk-footer-cell>\n      </ng-container>\n\n      <cdk-header-row class=\"customHeaderRowClass\"\n                      *cdkHeaderRowDef=\"columnsToRender\"></cdk-header-row>\n      <cdk-row class=\"customRowClass\"\n               *cdkRowDef=\"let row; columns: columnsToRender\"></cdk-row>\n      <cdk-footer-row class=\"customFooterRowClass\"\n                      *cdkFooterRowDef=\"columnsToRender\"></cdk-footer-row>\n    </cdk-table>\n  "
                },] },
    ];
    /** @nocollapse */
    SimpleCdkTableApp.propDecorators = {
        "table": [{ type: core_1.ViewChild, args: [table_1.CdkTable,] },],
    };
    return SimpleCdkTableApp;
}());
var CdkTableWithDifferentDataInputsApp = /** @class */ (function () {
    function CdkTableWithDifferentDataInputsApp() {
        this.dataSource = null;
        this.columnsToRender = ['column_a', 'column_b', 'column_c'];
    }
    CdkTableWithDifferentDataInputsApp.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <cdk-table [dataSource]=\"dataSource\">\n      <ng-container cdkColumnDef=\"column_a\">\n        <cdk-header-cell *cdkHeaderCellDef> Column A</cdk-header-cell>\n        <cdk-cell *cdkCellDef=\"let row\"> {{row.a}}</cdk-cell>\n      </ng-container>\n\n      <ng-container cdkColumnDef=\"column_b\">\n        <cdk-header-cell *cdkHeaderCellDef> Column B</cdk-header-cell>\n        <cdk-cell *cdkCellDef=\"let row\"> {{row.b}}</cdk-cell>\n      </ng-container>\n\n      <ng-container cdkColumnDef=\"column_c\">\n        <cdk-header-cell *cdkHeaderCellDef> Column C</cdk-header-cell>\n        <cdk-cell *cdkCellDef=\"let row\"> {{row.c}}</cdk-cell>\n      </ng-container>\n\n      <cdk-header-row *cdkHeaderRowDef=\"columnsToRender\"></cdk-header-row>\n      <cdk-row *cdkRowDef=\"let row; columns: columnsToRender\"></cdk-row>\n    </cdk-table>\n  "
                },] },
    ];
    /** @nocollapse */
    CdkTableWithDifferentDataInputsApp.propDecorators = {
        "table": [{ type: core_1.ViewChild, args: [table_1.CdkTable,] },],
    };
    return CdkTableWithDifferentDataInputsApp;
}());
var BooleanRowCdkTableApp = /** @class */ (function () {
    function BooleanRowCdkTableApp() {
        this.dataSource = new BooleanDataSource();
    }
    BooleanRowCdkTableApp.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <cdk-table [dataSource]=\"dataSource\">\n      <ng-container cdkColumnDef=\"column_a\">\n        <cdk-header-cell *cdkHeaderCellDef></cdk-header-cell>\n        <cdk-cell *cdkCellDef=\"let data\"> {{data}} </cdk-cell>\n      </ng-container>\n\n      <cdk-header-row *cdkHeaderRowDef=\"['column_a']\"></cdk-header-row>\n      <cdk-row *cdkRowDef=\"let row; columns: ['column_a']\"></cdk-row>\n    </cdk-table>\n  "
                },] },
    ];
    return BooleanRowCdkTableApp;
}());
var NullDataCdkTableApp = /** @class */ (function () {
    function NullDataCdkTableApp() {
        this.dataSource = rxjs_1.of(null);
    }
    NullDataCdkTableApp.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <cdk-table [dataSource]=\"dataSource\">\n      <ng-container cdkColumnDef=\"column_a\">\n        <cdk-header-cell *cdkHeaderCellDef></cdk-header-cell>\n        <cdk-cell *cdkCellDef=\"let data\"> {{data}} </cdk-cell>\n      </ng-container>\n\n      <cdk-header-row *cdkHeaderRowDef=\"['column_a']\"></cdk-header-row>\n      <cdk-row *cdkRowDef=\"let row; columns: ['column_a']\"></cdk-row>\n    </cdk-table>\n  "
                },] },
    ];
    return NullDataCdkTableApp;
}());
var MultipleHeaderFooterRowsCdkTableApp = /** @class */ (function () {
    function MultipleHeaderFooterRowsCdkTableApp() {
        this.showAlternativeHeadersAndFooters = false;
    }
    MultipleHeaderFooterRowsCdkTableApp.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <cdk-table [dataSource]=\"[]\">\n      <ng-container cdkColumnDef=\"first-header\">\n        <th cdk-header-cell *cdkHeaderCellDef> first-header </th>\n      </ng-container>\n\n      <ng-container cdkColumnDef=\"second-header\">\n        <th cdk-header-cell *cdkHeaderCellDef> second-header </th>\n      </ng-container>\n\n      <ng-container cdkColumnDef=\"first-footer\">\n        <td cdk-footer-cell *cdkFooterCellDef> first-footer </td>\n      </ng-container>\n\n      <ng-container cdkColumnDef=\"second-footer\">\n        <td cdk-footer-cell *cdkFooterCellDef> second-footer </td>\n      </ng-container>\n\n      <ng-container *ngIf=\"!showAlternativeHeadersAndFooters\">\n        <tr cdk-header-row *cdkHeaderRowDef=\"['first-header']\"></tr>\n        <tr cdk-header-row *cdkHeaderRowDef=\"['second-header']\"></tr>\n        <tr cdk-footer-row *cdkFooterRowDef=\"['first-footer']\"></tr>\n        <tr cdk-footer-row *cdkFooterRowDef=\"['second-footer']\"></tr>\n      </ng-container>\n\n      <ng-container cdkColumnDef=\"alt-first-header\">\n        <th cdk-header-cell *cdkHeaderCellDef> alt-first-header </th>\n      </ng-container>\n\n      <ng-container cdkColumnDef=\"alt-second-header\">\n        <th cdk-header-cell *cdkHeaderCellDef> alt-second-header </th>\n      </ng-container>\n\n      <ng-container cdkColumnDef=\"alt-first-footer\">\n        <td cdk-footer-cell *cdkFooterCellDef> alt-first-footer </td>\n      </ng-container>\n\n      <ng-container cdkColumnDef=\"alt-second-footer\">\n        <td cdk-footer-cell *cdkFooterCellDef> alt-second-footer </td>\n      </ng-container>\n\n      <ng-container *ngIf=\"showAlternativeHeadersAndFooters\">\n        <tr cdk-header-row *cdkHeaderRowDef=\"['alt-first-header']\"></tr>\n        <tr cdk-header-row *cdkHeaderRowDef=\"['alt-second-header']\"></tr>\n        <tr cdk-footer-row *cdkFooterRowDef=\"['alt-first-footer']\"></tr>\n        <tr cdk-footer-row *cdkFooterRowDef=\"['alt-second-footer']\"></tr>\n      </ng-container>\n    </cdk-table>\n  "
                },] },
    ];
    return MultipleHeaderFooterRowsCdkTableApp;
}());
var WhenRowCdkTableApp = /** @class */ (function () {
    function WhenRowCdkTableApp() {
        this.multiTemplateDataRows = false;
        this.dataSource = new FakeDataSource();
        this.columnsToRender = ['column_a', 'column_b', 'column_c'];
        this.columnsForIsIndex1Row = ['index1Column'];
        this.columnsForHasC3Row = ['c3Column'];
        this.isIndex1 = function (index, _rowData) { return index == 1; };
        this.hasC3 = function (_index, rowData) { return rowData.c == 'c_3'; };
        this.dataSource.addData();
    }
    WhenRowCdkTableApp.prototype.showIndexColumns = function () {
        var indexColumns = ['index', 'dataIndex', 'renderIndex'];
        this.columnsToRender = indexColumns;
        this.columnsForIsIndex1Row = indexColumns;
        this.columnsForHasC3Row = indexColumns;
    };
    WhenRowCdkTableApp.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <cdk-table [dataSource]=\"dataSource\" [multiTemplateDataRows]=\"multiTemplateDataRows\">\n      <ng-container cdkColumnDef=\"column_a\">\n        <cdk-header-cell *cdkHeaderCellDef> Column A</cdk-header-cell>\n        <cdk-cell *cdkCellDef=\"let row\"> {{row.a}}</cdk-cell>\n      </ng-container>\n\n      <ng-container cdkColumnDef=\"column_b\">\n        <cdk-header-cell *cdkHeaderCellDef> Column B</cdk-header-cell>\n        <cdk-cell *cdkCellDef=\"let row\"> {{row.b}}</cdk-cell>\n      </ng-container>\n\n      <ng-container cdkColumnDef=\"column_c\">\n        <cdk-header-cell *cdkHeaderCellDef> Column C</cdk-header-cell>\n        <cdk-cell *cdkCellDef=\"let row\"> {{row.c}}</cdk-cell>\n      </ng-container>\n\n      <ng-container cdkColumnDef=\"index1Column\">\n        <cdk-header-cell *cdkHeaderCellDef> Column C</cdk-header-cell>\n        <cdk-cell *cdkCellDef=\"let row\"> index_1_special_row</cdk-cell>\n      </ng-container>\n\n      <ng-container cdkColumnDef=\"c3Column\">\n        <cdk-header-cell *cdkHeaderCellDef> Column C</cdk-header-cell>\n        <cdk-cell *cdkCellDef=\"let row\"> c3_special_row</cdk-cell>\n      </ng-container>\n\n      <ng-container cdkColumnDef=\"index\">\n        <cdk-header-cell *cdkHeaderCellDef> Index</cdk-header-cell>\n        <cdk-cell *cdkCellDef=\"let row; let index = index\"> {{index}}</cdk-cell>\n      </ng-container>\n\n      <ng-container cdkColumnDef=\"dataIndex\">\n        <cdk-header-cell *cdkHeaderCellDef> Data Index</cdk-header-cell>\n        <cdk-cell *cdkCellDef=\"let row; let dataIndex = dataIndex\"> {{dataIndex}}</cdk-cell>\n      </ng-container>\n\n      <ng-container cdkColumnDef=\"renderIndex\">\n        <cdk-header-cell *cdkHeaderCellDef> Render Index</cdk-header-cell>\n        <cdk-cell *cdkCellDef=\"let row; let renderIndex = renderIndex\"> {{renderIndex}}</cdk-cell>\n      </ng-container>\n\n      <cdk-header-row *cdkHeaderRowDef=\"columnsToRender\"></cdk-header-row>\n      <cdk-row *cdkRowDef=\"let row; columns: columnsToRender\"></cdk-row>\n      <cdk-row *cdkRowDef=\"let row; columns: columnsForIsIndex1Row; when: isIndex1\"></cdk-row>\n      <cdk-row *cdkRowDef=\"let row; columns: columnsForHasC3Row; when: hasC3\"></cdk-row>\n    </cdk-table>\n  "
                },] },
    ];
    /** @nocollapse */
    WhenRowCdkTableApp.ctorParameters = function () { return []; };
    WhenRowCdkTableApp.propDecorators = {
        "table": [{ type: core_1.ViewChild, args: [table_1.CdkTable,] },],
    };
    return WhenRowCdkTableApp;
}());
var WhenRowWithoutDefaultCdkTableApp = /** @class */ (function () {
    function WhenRowWithoutDefaultCdkTableApp() {
        this.dataSource = new FakeDataSource();
        this.columnsToRender = ['column_a', 'column_b', 'column_c'];
        this.isIndex1 = function (index, _rowData) { return index == 1; };
        this.hasC3 = function (_index, rowData) { return rowData.c == 'c_3'; };
    }
    WhenRowWithoutDefaultCdkTableApp.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <cdk-table [dataSource]=\"dataSource\">\n      <ng-container cdkColumnDef=\"column_a\">\n        <cdk-header-cell *cdkHeaderCellDef> Column A</cdk-header-cell>\n        <cdk-cell *cdkCellDef=\"let row\"> {{row.a}}</cdk-cell>\n      </ng-container>\n\n      <ng-container cdkColumnDef=\"column_b\">\n        <cdk-header-cell *cdkHeaderCellDef> Column B</cdk-header-cell>\n        <cdk-cell *cdkCellDef=\"let row\"> {{row.b}}</cdk-cell>\n      </ng-container>\n\n      <ng-container cdkColumnDef=\"column_c\">\n        <cdk-header-cell *cdkHeaderCellDef> Column C</cdk-header-cell>\n        <cdk-cell *cdkCellDef=\"let row\"> {{row.c}}</cdk-cell>\n      </ng-container>\n\n      <ng-container cdkColumnDef=\"index1Column\">\n        <cdk-header-cell *cdkHeaderCellDef> Column C</cdk-header-cell>\n        <cdk-cell *cdkCellDef=\"let row\"> index_1_special_row </cdk-cell>\n      </ng-container>\n\n      <ng-container cdkColumnDef=\"c3Column\">\n        <cdk-header-cell *cdkHeaderCellDef> Column C</cdk-header-cell>\n        <cdk-cell *cdkCellDef=\"let row\"> c3_special_row </cdk-cell>\n      </ng-container>\n\n      <cdk-header-row *cdkHeaderRowDef=\"columnsToRender\"></cdk-header-row>\n      <cdk-row *cdkRowDef=\"let row; columns: ['index1Column']; when: isIndex1\"></cdk-row>\n      <cdk-row *cdkRowDef=\"let row; columns: ['c3Column']; when: hasC3\"></cdk-row>\n    </cdk-table>\n  "
                },] },
    ];
    /** @nocollapse */
    WhenRowWithoutDefaultCdkTableApp.propDecorators = {
        "table": [{ type: core_1.ViewChild, args: [table_1.CdkTable,] },],
    };
    return WhenRowWithoutDefaultCdkTableApp;
}());
var WhenRowMultipleDefaultsCdkTableApp = /** @class */ (function () {
    function WhenRowMultipleDefaultsCdkTableApp() {
        this.dataSource = new FakeDataSource();
        this.columnsToRender = ['column_a', 'column_b', 'column_c'];
        this.hasC3 = function (_index, rowData) { return rowData.c == 'c_3'; };
    }
    WhenRowMultipleDefaultsCdkTableApp.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <cdk-table [dataSource]=\"dataSource\">\n      <ng-container cdkColumnDef=\"column_a\">\n        <cdk-header-cell *cdkHeaderCellDef> Column A</cdk-header-cell>\n        <cdk-cell *cdkCellDef=\"let row\"> {{row.a}}</cdk-cell>\n      </ng-container>\n\n      <ng-container cdkColumnDef=\"column_b\">\n        <cdk-header-cell *cdkHeaderCellDef> Column B</cdk-header-cell>\n        <cdk-cell *cdkCellDef=\"let row\"> {{row.b}}</cdk-cell>\n      </ng-container>\n\n      <ng-container cdkColumnDef=\"column_c\">\n        <cdk-header-cell *cdkHeaderCellDef> Column C</cdk-header-cell>\n        <cdk-cell *cdkCellDef=\"let row\"> {{row.c}}</cdk-cell>\n      </ng-container>\n\n      <ng-container cdkColumnDef=\"index1Column\">\n        <cdk-header-cell *cdkHeaderCellDef> Column C</cdk-header-cell>\n        <cdk-cell *cdkCellDef=\"let row\"> index_1_special_row </cdk-cell>\n      </ng-container>\n\n      <ng-container cdkColumnDef=\"c3Column\">\n        <cdk-header-cell *cdkHeaderCellDef> Column C</cdk-header-cell>\n        <cdk-cell *cdkCellDef=\"let row\"> c3_special_row </cdk-cell>\n      </ng-container>\n\n      <cdk-header-row *cdkHeaderRowDef=\"columnsToRender\"></cdk-header-row>\n      <cdk-row *cdkRowDef=\"let row; columns: columnsToRender\"></cdk-row>\n      <cdk-row *cdkRowDef=\"let row; columns: ['index1Column']\"></cdk-row>\n      <cdk-row *cdkRowDef=\"let row; columns: ['c3Column']; when: hasC3\"></cdk-row>\n    </cdk-table>\n  "
                },] },
    ];
    /** @nocollapse */
    WhenRowMultipleDefaultsCdkTableApp.propDecorators = {
        "table": [{ type: core_1.ViewChild, args: [table_1.CdkTable,] },],
    };
    return WhenRowMultipleDefaultsCdkTableApp;
}());
var DynamicDataSourceCdkTableApp = /** @class */ (function () {
    function DynamicDataSourceCdkTableApp() {
        this.columnsToRender = ['column_a'];
    }
    DynamicDataSourceCdkTableApp.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <cdk-table [dataSource]=\"dataSource\">\n      <ng-container cdkColumnDef=\"column_a\">\n        <cdk-header-cell *cdkHeaderCellDef> Column A</cdk-header-cell>\n        <cdk-cell *cdkCellDef=\"let row\"> {{row.a}}</cdk-cell>\n      </ng-container>\n\n      <cdk-header-row *cdkHeaderRowDef=\"columnsToRender\"></cdk-header-row>\n      <cdk-row *cdkRowDef=\"let row; columns: columnsToRender\"></cdk-row>\n    </cdk-table>\n  "
                },] },
    ];
    /** @nocollapse */
    DynamicDataSourceCdkTableApp.propDecorators = {
        "table": [{ type: core_1.ViewChild, args: [table_1.CdkTable,] },],
    };
    return DynamicDataSourceCdkTableApp;
}());
var TrackByCdkTableApp = /** @class */ (function () {
    function TrackByCdkTableApp() {
        var _this = this;
        this.trackByStrategy = 'reference';
        this.dataSource = new FakeDataSource();
        this.columnsToRender = ['column_a', 'column_b'];
        this.trackBy = function (index, item) {
            switch (_this.trackByStrategy) {
                case 'reference': return item;
                case 'propertyA': return item.a;
                case 'index': return index;
            }
        };
    }
    TrackByCdkTableApp.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <cdk-table [dataSource]=\"dataSource\" [trackBy]=\"trackBy\">\n      <ng-container cdkColumnDef=\"column_a\">\n        <cdk-header-cell *cdkHeaderCellDef> Column A</cdk-header-cell>\n        <cdk-cell *cdkCellDef=\"let row\"> {{row.a}}</cdk-cell>\n      </ng-container>\n\n      <ng-container cdkColumnDef=\"column_b\">\n        <cdk-header-cell *cdkHeaderCellDef> Column B</cdk-header-cell>\n        <cdk-cell *cdkCellDef=\"let row\"> {{row.b}}</cdk-cell>\n      </ng-container>\n\n      <cdk-header-row *cdkHeaderRowDef=\"columnsToRender\"></cdk-header-row>\n      <cdk-row *cdkRowDef=\"let row; columns: columnsToRender\"></cdk-row>\n    </cdk-table>\n  "
                },] },
    ];
    /** @nocollapse */
    TrackByCdkTableApp.propDecorators = {
        "table": [{ type: core_1.ViewChild, args: [table_1.CdkTable,] },],
    };
    return TrackByCdkTableApp;
}());
var StickyFlexLayoutCdkTableApp = /** @class */ (function () {
    function StickyFlexLayoutCdkTableApp() {
        this.dataSource = new FakeDataSource();
        this.columns = ['column-1', 'column-2', 'column-3', 'column-4', 'column-5', 'column-6'];
        this.dir = 'ltr';
        this.stickyHeaders = [];
        this.stickyFooters = [];
        this.stickyStartColumns = [];
        this.stickyEndColumns = [];
    }
    StickyFlexLayoutCdkTableApp.prototype.isStuck = function (list, id) {
        return list.indexOf(id) != -1;
    };
    StickyFlexLayoutCdkTableApp.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <cdk-table [dataSource]=\"dataSource\" [dir]=\"dir\">\n      <ng-container [cdkColumnDef]=\"column\" *ngFor=\"let column of columns\"\n                    [sticky]=\"isStuck(stickyStartColumns, column)\"\n                    [stickyEnd]=\"isStuck(stickyEndColumns, column)\">\n        <cdk-header-cell *cdkHeaderCellDef> Header {{column}} </cdk-header-cell>\n        <cdk-cell *cdkCellDef=\"let row\"> {{column}} </cdk-cell>\n        <cdk-footer-cell *cdkFooterCellDef> Footer {{column}} </cdk-footer-cell>\n      </ng-container>\n\n      <cdk-header-row *cdkHeaderRowDef=\"columns; sticky: isStuck(stickyHeaders, 'header-1')\">\n      </cdk-header-row>\n      <cdk-header-row *cdkHeaderRowDef=\"columns; sticky: isStuck(stickyHeaders, 'header-2')\">\n      </cdk-header-row>\n      <cdk-header-row *cdkHeaderRowDef=\"columns; sticky: isStuck(stickyHeaders, 'header-3')\">\n      </cdk-header-row>\n\n      <cdk-row *cdkRowDef=\"let row; columns: columns\"></cdk-row>\n\n      <cdk-footer-row *cdkFooterRowDef=\"columns; sticky: isStuck(stickyFooters, 'footer-1')\">\n      </cdk-footer-row>\n      <cdk-footer-row *cdkFooterRowDef=\"columns; sticky: isStuck(stickyFooters, 'footer-2')\">\n      </cdk-footer-row>\n      <cdk-footer-row *cdkFooterRowDef=\"columns; sticky: isStuck(stickyFooters, 'footer-3')\">\n      </cdk-footer-row>\n    </cdk-table>\n  ",
                    styles: ["\n    .cdk-header-cell, .cdk-cell, .cdk-footer-cell {\n      display: block;\n      width: 20px;\n    }\n  "]
                },] },
    ];
    /** @nocollapse */
    StickyFlexLayoutCdkTableApp.propDecorators = {
        "table": [{ type: core_1.ViewChild, args: [table_1.CdkTable,] },],
    };
    return StickyFlexLayoutCdkTableApp;
}());
var StickyNativeLayoutCdkTableApp = /** @class */ (function () {
    function StickyNativeLayoutCdkTableApp() {
        this.dataSource = new FakeDataSource();
        this.columns = ['column-1', 'column-2', 'column-3', 'column-4', 'column-5', 'column-6'];
        this.stickyHeaders = [];
        this.stickyFooters = [];
        this.stickyStartColumns = [];
        this.stickyEndColumns = [];
    }
    StickyNativeLayoutCdkTableApp.prototype.isStuck = function (list, id) {
        return list.indexOf(id) != -1;
    };
    StickyNativeLayoutCdkTableApp.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <table cdk-table [dataSource]=\"dataSource\">\n      <ng-container [cdkColumnDef]=\"column\" *ngFor=\"let column of columns\"\n                    [sticky]=\"isStuck(stickyStartColumns, column)\"\n                    [stickyEnd]=\"isStuck(stickyEndColumns, column)\">\n        <th cdk-header-cell *cdkHeaderCellDef> Header {{column}} </th>\n        <td cdk-cell *cdkCellDef=\"let row\"> {{column}} </td>\n        <td cdk-footer-cell *cdkFooterCellDef> Footer {{column}} </td>\n      </ng-container>\n\n      <tr cdk-header-row *cdkHeaderRowDef=\"columns; sticky: isStuck(stickyHeaders, 'header-1')\">\n      </tr>\n      <tr cdk-header-row *cdkHeaderRowDef=\"columns; sticky: isStuck(stickyHeaders, 'header-2')\">\n      </tr>\n      <tr cdk-header-row *cdkHeaderRowDef=\"columns; sticky: isStuck(stickyHeaders, 'header-3')\">\n      </tr>\n\n      <tr cdk-row *cdkRowDef=\"let row; columns: columns\"></tr>\n\n      <tr cdk-footer-row *cdkFooterRowDef=\"columns; sticky: isStuck(stickyFooters, 'footer-1')\">\n      </tr>\n      <tr cdk-footer-row *cdkFooterRowDef=\"columns; sticky: isStuck(stickyFooters, 'footer-2')\">\n      </tr>\n      <tr cdk-footer-row *cdkFooterRowDef=\"columns; sticky: isStuck(stickyFooters, 'footer-3')\">\n      </tr>\n    </table>\n  ",
                    styles: ["\n    .cdk-header-cell, .cdk-cell, .cdk-footer-cell {\n      display: block;\n      width: 20px;\n      box-sizing: border-box;\n    }\n  "]
                },] },
    ];
    /** @nocollapse */
    StickyNativeLayoutCdkTableApp.propDecorators = {
        "table": [{ type: core_1.ViewChild, args: [table_1.CdkTable,] },],
    };
    return StickyNativeLayoutCdkTableApp;
}());
var DynamicColumnDefinitionsCdkTableApp = /** @class */ (function () {
    function DynamicColumnDefinitionsCdkTableApp() {
        this.dynamicColumns = [];
        this.dataSource = new FakeDataSource();
    }
    DynamicColumnDefinitionsCdkTableApp.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <cdk-table [dataSource]=\"dataSource\">\n      <ng-container [cdkColumnDef]=\"column\" *ngFor=\"let column of dynamicColumns\">\n        <cdk-header-cell *cdkHeaderCellDef> {{column}} </cdk-header-cell>\n        <cdk-cell *cdkCellDef=\"let row\"> {{column}} </cdk-cell>\n      </ng-container>\n\n      <cdk-header-row *cdkHeaderRowDef=\"dynamicColumns\"></cdk-header-row>\n      <cdk-row *cdkRowDef=\"let row; columns: dynamicColumns;\"></cdk-row>\n    </cdk-table>\n  "
                },] },
    ];
    /** @nocollapse */
    DynamicColumnDefinitionsCdkTableApp.propDecorators = {
        "table": [{ type: core_1.ViewChild, args: [table_1.CdkTable,] },],
    };
    return DynamicColumnDefinitionsCdkTableApp;
}());
var CustomRoleCdkTableApp = /** @class */ (function () {
    function CustomRoleCdkTableApp() {
        this.dataSource = new FakeDataSource();
        this.columnsToRender = ['column_a'];
    }
    CustomRoleCdkTableApp.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <cdk-table [dataSource]=\"dataSource\" role=\"treegrid\">\n      <ng-container cdkColumnDef=\"column_a\">\n        <cdk-header-cell *cdkHeaderCellDef> Column A</cdk-header-cell>\n        <cdk-cell *cdkCellDef=\"let row\"> {{row.a}}</cdk-cell>\n      </ng-container>\n\n      <cdk-header-row *cdkHeaderRowDef=\"columnsToRender\"></cdk-header-row>\n      <cdk-row *cdkRowDef=\"let row; columns: columnsToRender\"></cdk-row>\n    </cdk-table>\n  "
                },] },
    ];
    /** @nocollapse */
    CustomRoleCdkTableApp.propDecorators = {
        "table": [{ type: core_1.ViewChild, args: [table_1.CdkTable,] },],
    };
    return CustomRoleCdkTableApp;
}());
var CrazyColumnNameCdkTableApp = /** @class */ (function () {
    function CrazyColumnNameCdkTableApp() {
        this.dataSource = new FakeDataSource();
        this.columnsToRender = ['crazy-column-NAME-1!@#$%^-_&*()2'];
    }
    CrazyColumnNameCdkTableApp.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <cdk-table [dataSource]=\"dataSource\">\n      <ng-container [cdkColumnDef]=\"columnsToRender[0]\">\n        <cdk-header-cell *cdkHeaderCellDef> Column A</cdk-header-cell>\n        <cdk-cell *cdkCellDef=\"let row\"> {{row.a}}</cdk-cell>\n      </ng-container>\n\n      <cdk-header-row *cdkHeaderRowDef=\"columnsToRender\"></cdk-header-row>\n      <cdk-row *cdkRowDef=\"let row; columns: columnsToRender\"></cdk-row>\n    </cdk-table>\n  "
                },] },
    ];
    /** @nocollapse */
    CrazyColumnNameCdkTableApp.propDecorators = {
        "table": [{ type: core_1.ViewChild, args: [table_1.CdkTable,] },],
    };
    return CrazyColumnNameCdkTableApp;
}());
var DuplicateColumnDefNameCdkTableApp = /** @class */ (function () {
    function DuplicateColumnDefNameCdkTableApp() {
        this.dataSource = new FakeDataSource();
    }
    DuplicateColumnDefNameCdkTableApp.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <cdk-table [dataSource]=\"dataSource\">\n      <ng-container cdkColumnDef=\"column_a\">\n        <cdk-header-cell *cdkHeaderCellDef> Column A</cdk-header-cell>\n        <cdk-cell *cdkCellDef=\"let row\"> {{row.a}}</cdk-cell>\n      </ng-container>\n\n      <ng-container cdkColumnDef=\"column_a\">\n        <cdk-header-cell *cdkHeaderCellDef> Column A</cdk-header-cell>\n        <cdk-cell *cdkCellDef=\"let row\"> {{row.a}}</cdk-cell>\n      </ng-container>\n\n      <cdk-header-row *cdkHeaderRowDef=\"['column_a']\"></cdk-header-row>\n      <cdk-row *cdkRowDef=\"let row; columns: ['column_a']\"></cdk-row>\n    </cdk-table>\n  "
                },] },
    ];
    return DuplicateColumnDefNameCdkTableApp;
}());
var MissingColumnDefCdkTableApp = /** @class */ (function () {
    function MissingColumnDefCdkTableApp() {
        this.dataSource = new FakeDataSource();
    }
    MissingColumnDefCdkTableApp.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <cdk-table [dataSource]=\"dataSource\">\n      <ng-container cdkColumnDef=\"column_b\">\n        <cdk-header-cell *cdkHeaderCellDef> Column A</cdk-header-cell>\n        <cdk-cell *cdkCellDef=\"let row\"> {{row.a}}</cdk-cell>\n      </ng-container>\n\n      <cdk-header-row *cdkHeaderRowDef=\"['column_a']\"></cdk-header-row>\n      <cdk-row *cdkRowDef=\"let row; columns: ['column_a']\"></cdk-row>\n    </cdk-table>\n  "
                },] },
    ];
    return MissingColumnDefCdkTableApp;
}());
var MissingAllRowDefsCdkTableApp = /** @class */ (function () {
    function MissingAllRowDefsCdkTableApp() {
        this.dataSource = new FakeDataSource();
    }
    MissingAllRowDefsCdkTableApp.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <cdk-table [dataSource]=\"dataSource\">\n      <ng-container cdkColumnDef=\"column_a\">\n        <cdk-header-cell *cdkHeaderCellDef> Column A</cdk-header-cell>\n        <cdk-cell *cdkCellDef=\"let row\"> {{row.a}}</cdk-cell>\n      </ng-container>\n    </cdk-table>\n  "
                },] },
    ];
    return MissingAllRowDefsCdkTableApp;
}());
var MissingHeaderRowDefCdkTableApp = /** @class */ (function () {
    function MissingHeaderRowDefCdkTableApp() {
        this.dataSource = new FakeDataSource();
    }
    MissingHeaderRowDefCdkTableApp.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <cdk-table [dataSource]=\"dataSource\">\n      <ng-container cdkColumnDef=\"column_a\">\n        <cdk-header-cell *cdkHeaderCellDef> Column A</cdk-header-cell>\n        <cdk-cell *cdkCellDef=\"let row\"> {{row.a}} </cdk-cell>\n        <cdk-footer-cell *cdkFooterCellDef> Footer A </cdk-footer-cell>\n      </ng-container>\n\n      <cdk-row *cdkRowDef=\"let row; columns: ['column_a']\"></cdk-row>\n      <cdk-footer-row *cdkFooterRowDef=\"['column_a']\"></cdk-footer-row>\n    </cdk-table>\n  "
                },] },
    ];
    return MissingHeaderRowDefCdkTableApp;
}());
var MissingRowDefCdkTableApp = /** @class */ (function () {
    function MissingRowDefCdkTableApp() {
        this.dataSource = new FakeDataSource();
    }
    MissingRowDefCdkTableApp.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <cdk-table [dataSource]=\"dataSource\">\n      <ng-container cdkColumnDef=\"column_a\">\n        <cdk-header-cell *cdkHeaderCellDef> Column A</cdk-header-cell>\n        <cdk-cell *cdkCellDef=\"let row\"> {{row.a}} </cdk-cell>\n        <cdk-footer-cell *cdkFooterCellDef> Footer A </cdk-footer-cell>\n      </ng-container>\n\n      <cdk-header-row *cdkHeaderRowDef=\"['column_a']\"></cdk-header-row>\n      <cdk-footer-row *cdkFooterRowDef=\"['column_a']\"></cdk-footer-row>\n    </cdk-table>\n  "
                },] },
    ];
    return MissingRowDefCdkTableApp;
}());
var MissingFooterRowDefCdkTableApp = /** @class */ (function () {
    function MissingFooterRowDefCdkTableApp() {
        this.dataSource = new FakeDataSource();
    }
    MissingFooterRowDefCdkTableApp.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <cdk-table [dataSource]=\"dataSource\">\n      <ng-container cdkColumnDef=\"column_a\">\n        <cdk-header-cell *cdkHeaderCellDef> Column A</cdk-header-cell>\n        <cdk-cell *cdkCellDef=\"let row\"> {{row.a}} </cdk-cell>\n        <cdk-footer-cell *cdkFooterCellDef> Footer A </cdk-footer-cell>\n      </ng-container>\n\n      <cdk-header-row *cdkHeaderRowDef=\"['column_a']\"></cdk-header-row>\n      <cdk-row *cdkRowDef=\"let row; columns: ['column_a']\"></cdk-row>\n    </cdk-table>\n  "
                },] },
    ];
    return MissingFooterRowDefCdkTableApp;
}());
var UndefinedColumnsCdkTableApp = /** @class */ (function () {
    function UndefinedColumnsCdkTableApp() {
        this.dataSource = new FakeDataSource();
    }
    UndefinedColumnsCdkTableApp.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <cdk-table [dataSource]=\"dataSource\">\n      <ng-container cdkColumnDef=\"column_a\">\n        <cdk-header-cell *cdkHeaderCellDef> Column A</cdk-header-cell>\n        <cdk-cell *cdkCellDef=\"let row\"> {{row.a}}</cdk-cell>\n      </ng-container>\n\n      <cdk-header-row *cdkHeaderRowDef=\"undefinedColumns\"></cdk-header-row>\n      <cdk-row *cdkRowDef=\"let row; columns: undefinedColumns\"></cdk-row>\n    </cdk-table>\n  "
                },] },
    ];
    return UndefinedColumnsCdkTableApp;
}());
var RowContextCdkTableApp = /** @class */ (function () {
    function RowContextCdkTableApp() {
        this.dataSource = new FakeDataSource();
        this.columnsToRender = ['column_a'];
        this.enableRowContextClasses = false;
        this.enableCellContextClasses = false;
    }
    RowContextCdkTableApp.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <cdk-table [dataSource]=\"dataSource\">\n      <ng-container cdkColumnDef=\"column_a\">\n        <cdk-header-cell *cdkHeaderCellDef> Column A</cdk-header-cell>\n        <cdk-cell *cdkCellDef=\"let row; let first = first;\n                               let last = last; let even = even; let odd = odd\"\n                  [ngClass]=\"{\n                    'custom-cell-class-first': enableCellContextClasses && first,\n                    'custom-cell-class-last': enableCellContextClasses && last,\n                    'custom-cell-class-even': enableCellContextClasses && even,\n                    'custom-cell-class-odd': enableCellContextClasses && odd\n                  }\">\n          {{row.a}}\n        </cdk-cell>\n      </ng-container>\n      <cdk-header-row *cdkHeaderRowDef=\"columnsToRender\"></cdk-header-row>\n      <cdk-row *cdkRowDef=\"let row; columns: columnsToRender;\n                           let first = first; let last = last; let even = even; let odd = odd\"\n               [ngClass]=\"{\n                 'custom-row-class-first': enableRowContextClasses && first,\n                 'custom-row-class-last': enableRowContextClasses && last,\n                 'custom-row-class-even': enableRowContextClasses && even,\n                 'custom-row-class-odd': enableRowContextClasses && odd\n               }\">\n      </cdk-row>\n    </cdk-table>\n  "
                },] },
    ];
    return RowContextCdkTableApp;
}());
var WrapperCdkTableApp = /** @class */ (function () {
    function WrapperCdkTableApp() {
    }
    WrapperCdkTableApp.prototype.ngAfterContentInit = function () {
        var _this = this;
        // Register the content's column, row, and header row definitions.
        this.columnDefs.forEach(function (columnDef) { return _this.table.addColumnDef(columnDef); });
        this.rowDefs.forEach(function (rowDef) { return _this.table.addRowDef(rowDef); });
        this.table.addHeaderRowDef(this.headerRowDef);
    };
    WrapperCdkTableApp.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'wrapper-table',
                    template: "\n    <cdk-table [dataSource]=\"dataSource\">\n      <ng-container cdkColumnDef=\"content_column_a\">\n        <cdk-header-cell *cdkHeaderCellDef> Content Column A </cdk-header-cell>\n        <cdk-cell *cdkCellDef=\"let row\"> {{row.a}} </cdk-cell>\n      </ng-container>\n      <ng-container cdkColumnDef=\"content_column_b\">\n        <cdk-header-cell *cdkHeaderCellDef> Content Column B </cdk-header-cell>\n        <cdk-cell *cdkCellDef=\"let row\"> {{row.b}} </cdk-cell>\n      </ng-container>\n\n      <cdk-row *cdkRowDef=\"let row; columns: columns\"></cdk-row>\n    </cdk-table>\n  "
                },] },
    ];
    /** @nocollapse */
    WrapperCdkTableApp.propDecorators = {
        "columnDefs": [{ type: core_1.ContentChildren, args: [cell_1.CdkColumnDef,] },],
        "headerRowDef": [{ type: core_1.ContentChild, args: [row_1.CdkHeaderRowDef,] },],
        "rowDefs": [{ type: core_1.ContentChildren, args: [row_1.CdkRowDef,] },],
        "table": [{ type: core_1.ViewChild, args: [table_1.CdkTable,] },],
        "columns": [{ type: core_1.Input },],
        "dataSource": [{ type: core_1.Input },],
    };
    return WrapperCdkTableApp;
}());
var OuterTableApp = /** @class */ (function () {
    function OuterTableApp() {
        this.dataSource = new FakeDataSource();
        this.columnsToRender = ['content_column_a', 'content_column_b', 'injected_column_a', 'injected_column_b'];
        this.firstRow = function (i) { return i === 0; };
    }
    OuterTableApp.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <wrapper-table [dataSource]=\"dataSource\" [columns]=\"columnsToRender\">\n      <ng-container cdkColumnDef=\"injected_column_a\">\n        <cdk-header-cell *cdkHeaderCellDef> Injected Column A </cdk-header-cell>\n        <cdk-cell *cdkCellDef=\"let row\"> {{row.a}} </cdk-cell>\n      </ng-container>\n      <ng-container cdkColumnDef=\"injected_column_b\">\n        <cdk-header-cell *cdkHeaderCellDef> Injected Column B </cdk-header-cell>\n        <cdk-cell *cdkCellDef=\"let row\"> {{row.b}} </cdk-cell>\n      </ng-container>\n\n      <!-- Only used for the 'when' row, the first row -->\n      <ng-container cdkColumnDef=\"special_column\">\n        <cdk-cell *cdkCellDef=\"let row\"> injected row with when predicate </cdk-cell>\n      </ng-container>\n\n      <cdk-header-row *cdkHeaderRowDef=\"columnsToRender\"></cdk-header-row>\n      <cdk-row class=\"first-row\" *cdkRowDef=\"let row; columns: ['special_column']; when: firstRow\">\n      </cdk-row>\n    </wrapper-table>\n  "
                },] },
    ];
    return OuterTableApp;
}());
var NativeHtmlTableApp = /** @class */ (function () {
    function NativeHtmlTableApp() {
        this.dataSource = new FakeDataSource();
        this.columnsToRender = ['column_a', 'column_b', 'column_c'];
    }
    NativeHtmlTableApp.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <table cdk-table [dataSource]=\"dataSource\">\n      <ng-container cdkColumnDef=\"column_a\">\n        <th cdk-header-cell *cdkHeaderCellDef> Column A</th>\n        <td cdk-cell *cdkCellDef=\"let row\"> {{row.a}}</td>\n      </ng-container>\n\n      <ng-container cdkColumnDef=\"column_b\">\n        <th cdk-header-cell *cdkHeaderCellDef> Column B</th>\n        <td cdk-cell *cdkCellDef=\"let row\"> {{row.b}}</td>\n      </ng-container>\n\n      <ng-container cdkColumnDef=\"column_c\">\n        <th cdk-header-cell *cdkHeaderCellDef> Column C</th>\n        <td cdk-cell *cdkCellDef=\"let row\"> {{row.c}}</td>\n      </ng-container>\n\n      <tr cdk-header-row *cdkHeaderRowDef=\"columnsToRender\"></tr>\n      <tr cdk-row *cdkRowDef=\"let row; columns: columnsToRender\" class=\"customRowClass\"></tr>\n    </table>\n  "
                },] },
    ];
    /** @nocollapse */
    NativeHtmlTableApp.propDecorators = {
        "table": [{ type: core_1.ViewChild, args: [table_1.CdkTable,] },],
    };
    return NativeHtmlTableApp;
}());
function getElements(element, query) {
    return [].slice.call(element.querySelectorAll(query));
}
function getHeaderRows(tableElement) {
    return [].slice.call(tableElement.querySelectorAll('.cdk-header-row'));
}
function getFooterRows(tableElement) {
    return [].slice.call(tableElement.querySelectorAll('.cdk-footer-row'));
}
function getRows(tableElement) {
    return getElements(tableElement, '.cdk-row');
}
function getCells(row) {
    if (!row) {
        return [];
    }
    var cells = getElements(row, 'cdk-cell');
    if (!cells.length) {
        cells = getElements(row, 'td.cdk-cell');
    }
    return cells;
}
function getHeaderCells(headerRow) {
    var cells = getElements(headerRow, 'cdk-header-cell');
    if (!cells.length) {
        cells = getElements(headerRow, 'th.cdk-header-cell');
    }
    return cells;
}
function getFooterCells(footerRow) {
    var cells = getElements(footerRow, 'cdk-footer-cell');
    if (!cells.length) {
        cells = getElements(footerRow, 'td.cdk-footer-cell');
    }
    return cells;
}
function getActualTableContent(tableElement) {
    var actualTableContent = [];
    getHeaderRows(tableElement).forEach(function (row) {
        actualTableContent.push(getHeaderCells(row));
    });
    // Check data row cells
    var rows = getRows(tableElement).map(function (row) { return getCells(row); });
    actualTableContent = actualTableContent.concat(rows);
    getFooterRows(tableElement).forEach(function (row) {
        actualTableContent.push(getFooterCells(row));
    });
    // Convert the nodes into their text content;
    return actualTableContent.map(function (row) { return row.map(function (cell) { return cell.textContent.trim(); }); });
}
function expectTableToMatchContent(tableElement, expected) {
    var missedExpectations = [];
    function checkCellContent(actualCell, expectedCell) {
        if (actualCell !== expectedCell) {
            missedExpectations.push("Expected cell contents to be " + expectedCell + " but was " + actualCell);
        }
    }
    var actual = getActualTableContent(tableElement);
    // Make sure the number of rows match
    if (actual.length !== expected.length) {
        missedExpectations.push("Expected " + expected.length + " total rows but got " + actual.length);
        fail(missedExpectations.join('\n'));
    }
    actual.forEach(function (row, rowIndex) {
        var expectedRow = expected[rowIndex];
        // Make sure the number of cells match
        if (row.length !== expectedRow.length) {
            missedExpectations.push("Expected " + expectedRow.length + " cells in row but got " + row.length);
            fail(missedExpectations.join('\n'));
        }
        row.forEach(function (actualCell, cellIndex) {
            var expectedCell = expectedRow ? expectedRow[cellIndex] : null;
            checkCellContent(actualCell, expectedCell);
        });
    });
    if (missedExpectations.length) {
        fail(missedExpectations.join('\n'));
    }
}
//# sourceMappingURL=table.spec.js.map