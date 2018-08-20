"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var core_1 = require("@angular/core");
var calendar_body_1 = require("./calendar-body");
var platform_browser_1 = require("@angular/platform-browser");
describe('MatCalendarBody', function () {
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [
                calendar_body_1.MatCalendarBody,
                StandardCalendarBody,
                CalendarBodyWithDisabledCells,
            ],
        });
        testing_1.TestBed.compileComponents();
    }));
    describe('standard calendar body', function () {
        var fixture;
        var testComponent;
        var calendarBodyNativeElement;
        var rowEls;
        var labelEls;
        var cellEls;
        function refreshElementLists() {
            rowEls = Array.from(calendarBodyNativeElement.querySelectorAll('tr'));
            labelEls = Array.from(calendarBodyNativeElement.querySelectorAll('.mat-calendar-body-label'));
            cellEls = Array.from(calendarBodyNativeElement.querySelectorAll('.mat-calendar-body-cell'));
        }
        beforeEach(function () {
            fixture = testing_1.TestBed.createComponent(StandardCalendarBody);
            fixture.detectChanges();
            var calendarBodyDebugElement = fixture.debugElement.query(platform_browser_1.By.directive(calendar_body_1.MatCalendarBody));
            calendarBodyNativeElement = calendarBodyDebugElement.nativeElement;
            testComponent = fixture.componentInstance;
            refreshElementLists();
        });
        it('creates body', function () {
            expect(rowEls.length).toBe(3);
            expect(labelEls.length).toBe(1);
            expect(cellEls.length).toBe(14);
        });
        it('highlights today', function () {
            var todayCell = (calendarBodyNativeElement.querySelector('.mat-calendar-body-today'));
            expect(todayCell).not.toBeNull();
            expect(todayCell.innerHTML.trim()).toBe('3');
        });
        it('highlights selected', function () {
            var selectedCell = (calendarBodyNativeElement.querySelector('.mat-calendar-body-selected'));
            expect(selectedCell).not.toBeNull();
            expect(selectedCell.innerHTML.trim()).toBe('4');
        });
        it('should set aria-selected correctly', function () {
            var selectedCells = cellEls.filter(function (c) { return c.getAttribute('aria-selected') === 'true'; });
            var deselectedCells = cellEls.filter(function (c) { return c.getAttribute('aria-selected') === 'false'; });
            expect(selectedCells.length).toBe(1, 'Expected one cell to be marked as selected.');
            expect(deselectedCells.length)
                .toBe(cellEls.length - 1, 'Expected remaining cells to be marked as deselected.');
        });
        it('places label in first row if space is available', function () {
            testComponent.rows[0] = testComponent.rows[0].slice(3);
            testComponent.rows = testComponent.rows.slice();
            fixture.detectChanges();
            refreshElementLists();
            expect(rowEls.length).toBe(2);
            expect(labelEls.length).toBe(1);
            expect(cellEls.length).toBe(11);
            expect(rowEls[0].firstElementChild.classList)
                .toContain('mat-calendar-body-label', 'first cell should be the label');
            expect(labelEls[0].getAttribute('colspan')).toBe('3');
        });
        it('cell should be selected on click', function () {
            var todayElement = calendarBodyNativeElement.querySelector('.mat-calendar-body-today');
            todayElement.click();
            fixture.detectChanges();
            expect(todayElement.classList)
                .toContain('mat-calendar-body-selected', 'today should be selected');
        });
        it('should mark active date', function () {
            expect(cellEls[10].innerText.trim()).toBe('11');
            expect(cellEls[10].classList).toContain('mat-calendar-body-active');
        });
    });
    describe('calendar body with disabled cells', function () {
        var fixture;
        var testComponent;
        var calendarBodyNativeElement;
        var cellEls;
        beforeEach(function () {
            fixture = testing_1.TestBed.createComponent(CalendarBodyWithDisabledCells);
            fixture.detectChanges();
            var calendarBodyDebugElement = fixture.debugElement.query(platform_browser_1.By.directive(calendar_body_1.MatCalendarBody));
            calendarBodyNativeElement = calendarBodyDebugElement.nativeElement;
            testComponent = fixture.componentInstance;
            cellEls = Array.from(calendarBodyNativeElement.querySelectorAll('.mat-calendar-body-cell'));
        });
        it('should only allow selection of disabled cells when allowDisabledSelection is true', function () {
            cellEls[0].click();
            fixture.detectChanges();
            expect(testComponent.selected).toBeFalsy();
            testComponent.allowDisabledSelection = true;
            fixture.detectChanges();
            cellEls[0].click();
            fixture.detectChanges();
            expect(testComponent.selected).toBe(1);
        });
    });
});
var StandardCalendarBody = /** @class */ (function () {
    function StandardCalendarBody() {
        this.label = 'Jan 2017';
        this.rows = [[1, 2, 3, 4, 5, 6, 7], [8, 9, 10, 11, 12, 13, 14]].map(function (r) { return r.map(createCell); });
        this.todayValue = 3;
        this.selectedValue = 4;
        this.labelMinRequiredCells = 3;
        this.numCols = 7;
    }
    StandardCalendarBody.prototype.onSelect = function (value) {
        this.selectedValue = value;
    };
    StandardCalendarBody.decorators = [
        { type: core_1.Component, args: [{
                    template: "<table mat-calendar-body\n                    [label]=\"label\"\n                    [rows]=\"rows\"\n                    [todayValue]=\"todayValue\"\n                    [selectedValue]=\"selectedValue\"\n                    [labelMinRequiredCells]=\"labelMinRequiredCells\"\n                    [numCols]=\"numCols\"\n                    [activeCell]=\"10\"\n                    (selectedValueChange)=\"onSelect($event)\">\n             </table>",
                },] },
    ];
    return StandardCalendarBody;
}());
var CalendarBodyWithDisabledCells = /** @class */ (function () {
    function CalendarBodyWithDisabledCells() {
        this.rows = [[1, 2, 3, 4]].map(function (r) {
            return r.map(function (d) {
                var cell = createCell(d);
                cell.enabled = d % 2 == 0;
                return cell;
            });
        });
        this.allowDisabledSelection = false;
    }
    CalendarBodyWithDisabledCells.decorators = [
        { type: core_1.Component, args: [{
                    template: "<table mat-calendar-body\n                    [rows]=\"rows\"\n                    [allowDisabledSelection]=\"allowDisabledSelection\"\n                    (selectedValueChange)=\"selected = $event\">\n             </table>"
                },] },
    ];
    return CalendarBodyWithDisabledCells;
}());
function createCell(value) {
    return new calendar_body_1.MatCalendarCell(value, "" + value, value + "-label", true);
}
//# sourceMappingURL=calendar-body.spec.js.map