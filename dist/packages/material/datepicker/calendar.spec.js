"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bidi_1 = require("@angular/cdk/bidi");
var keycodes_1 = require("@angular/cdk/keycodes");
var testing_1 = require("@angular/cdk/testing");
var core_1 = require("@angular/core");
var testing_2 = require("@angular/core/testing");
var core_2 = require("@angular/material/core");
var platform_browser_1 = require("@angular/platform-browser");
var calendar_1 = require("./calendar");
var datepicker_intl_1 = require("./datepicker-intl");
var datepicker_module_1 = require("./datepicker-module");
describe('MatCalendar', function () {
    var dir;
    var zone;
    beforeEach(testing_2.async(function () {
        testing_2.TestBed.configureTestingModule({
            imports: [
                core_2.MatNativeDateModule,
                datepicker_module_1.MatDatepickerModule,
            ],
            declarations: [
                StandardCalendar,
                CalendarWithMinMax,
                CalendarWithDateFilter,
                CalendarWithSelectableMinDate,
            ],
            providers: [
                datepicker_intl_1.MatDatepickerIntl,
                { provide: core_1.NgZone, useFactory: function () { return zone = new testing_1.MockNgZone(); } },
                { provide: bidi_1.Directionality, useFactory: function () { return dir = { value: 'ltr' }; } }
            ],
        });
        testing_2.TestBed.compileComponents();
    }));
    describe('standard calendar', function () {
        var fixture;
        var testComponent;
        var calendarElement;
        var periodButton;
        var calendarInstance;
        beforeEach(function () {
            fixture = testing_2.TestBed.createComponent(StandardCalendar);
            fixture.detectChanges();
            var calendarDebugElement = fixture.debugElement.query(platform_browser_1.By.directive(calendar_1.MatCalendar));
            calendarElement = calendarDebugElement.nativeElement;
            periodButton = calendarElement.querySelector('.mat-calendar-period-button');
            calendarInstance = calendarDebugElement.componentInstance;
            testComponent = fixture.componentInstance;
        });
        it("should update today's date", testing_2.inject([core_2.DateAdapter], function (adapter) {
            var fakeToday = new Date(2018, 0, 1);
            spyOn(adapter, 'today').and.callFake(function () { return fakeToday; });
            calendarInstance.activeDate = fakeToday;
            calendarInstance.updateTodaysDate();
            fixture.detectChanges();
            var todayCell = (calendarElement.querySelector('.mat-calendar-body-today'));
            expect(todayCell).not.toBeNull();
            expect(todayCell.innerHTML.trim()).toBe('1');
            fakeToday = new Date(2018, 0, 10);
            calendarInstance.updateTodaysDate();
            fixture.detectChanges();
            todayCell = (calendarElement.querySelector('.mat-calendar-body-today'));
            expect(todayCell).not.toBeNull();
            expect(todayCell.innerHTML.trim()).toBe('10');
        }));
        it('should be in month view with specified month active', function () {
            expect(calendarInstance.currentView).toBe('month');
            expect(calendarInstance.activeDate).toEqual(new Date(2017, core_2.JAN, 31));
        });
        it('should select date in month view', function () {
            var monthCells = calendarElement.querySelectorAll('.mat-calendar-body-cell');
            monthCells[monthCells.length - 1].click();
            fixture.detectChanges();
            expect(calendarInstance.currentView).toBe('month');
            expect(testComponent.selected).toEqual(new Date(2017, core_2.JAN, 31));
        });
        it('should emit the selected month on cell clicked in year view', function () {
            periodButton.click();
            fixture.detectChanges();
            expect(calendarInstance.currentView).toBe('multi-year');
            expect(calendarInstance.activeDate).toEqual(new Date(2017, core_2.JAN, 31));
            calendarElement.querySelector('.mat-calendar-body-active').click();
            fixture.detectChanges();
            expect(calendarInstance.currentView).toBe('year');
            calendarElement.querySelector('.mat-calendar-body-active').click();
            var normalizedMonth = fixture.componentInstance.selectedMonth;
            expect(normalizedMonth.getMonth()).toEqual(0);
        });
        it('should emit the selected year on cell clicked in multiyear view', function () {
            periodButton.click();
            fixture.detectChanges();
            expect(calendarInstance.currentView).toBe('multi-year');
            expect(calendarInstance.activeDate).toEqual(new Date(2017, core_2.JAN, 31));
            calendarElement.querySelector('.mat-calendar-body-active').click();
            fixture.detectChanges();
            var normalizedYear = fixture.componentInstance.selectedYear;
            expect(normalizedYear.getFullYear()).toEqual(2017);
        });
        it('should re-render when the i18n labels have changed', testing_2.inject([datepicker_intl_1.MatDatepickerIntl], function (intl) {
            var button = fixture.debugElement.nativeElement
                .querySelector('.mat-calendar-period-button');
            intl.switchToMultiYearViewLabel = 'Go to multi-year view?';
            intl.changes.next();
            fixture.detectChanges();
            expect(button.getAttribute('aria-label')).toBe('Go to multi-year view?');
        }));
        it('should set all buttons to be `type="button"`', function () {
            var invalidButtons = calendarElement.querySelectorAll('button:not([type="button"])');
            expect(invalidButtons.length).toBe(0);
        });
        it('should complete the stateChanges stream', function () {
            var spy = jasmine.createSpy('complete spy');
            var subscription = calendarInstance.stateChanges.subscribe(undefined, undefined, spy);
            fixture.destroy();
            expect(spy).toHaveBeenCalled();
            subscription.unsubscribe();
        });
        describe('a11y', function () {
            describe('calendar body', function () {
                var calendarBodyEl;
                beforeEach(function () {
                    calendarBodyEl = calendarElement.querySelector('.mat-calendar-content');
                    expect(calendarBodyEl).not.toBeNull();
                    testing_1.dispatchFakeEvent(calendarBodyEl, 'focus');
                    fixture.detectChanges();
                });
                it('should initially set start date active', function () {
                    expect(calendarInstance.activeDate).toEqual(new Date(2017, core_2.JAN, 31));
                });
                it('should make the calendar body focusable', function () {
                    expect(calendarBodyEl.getAttribute('tabindex')).toBe('-1');
                });
                it('should not move focus to the active cell on init', function () {
                    var activeCell = calendarBodyEl.querySelector('.mat-calendar-body-active');
                    spyOn(activeCell, 'focus').and.callThrough();
                    fixture.detectChanges();
                    zone.simulateZoneExit();
                    expect(activeCell.focus).not.toHaveBeenCalled();
                });
                it('should move focus to the active cell when the view changes', function () {
                    var activeCell = calendarBodyEl.querySelector('.mat-calendar-body-active');
                    spyOn(activeCell, 'focus').and.callThrough();
                    fixture.detectChanges();
                    zone.simulateZoneExit();
                    expect(activeCell.focus).not.toHaveBeenCalled();
                    calendarInstance.currentView = 'multi-year';
                    fixture.detectChanges();
                    zone.simulateZoneExit();
                    expect(activeCell.focus).toHaveBeenCalled();
                });
                describe('year view', function () {
                    beforeEach(function () {
                        testing_1.dispatchMouseEvent(periodButton, 'click');
                        fixture.detectChanges();
                        expect(calendarInstance.currentView).toBe('multi-year');
                        calendarBodyEl.querySelector('.mat-calendar-body-active').click();
                        fixture.detectChanges();
                        expect(calendarInstance.currentView).toBe('year');
                    });
                    it('should return to month view on enter', function () {
                        var tableBodyEl = calendarBodyEl.querySelector('.mat-calendar-body');
                        testing_1.dispatchKeyboardEvent(tableBodyEl, 'keydown', keycodes_1.RIGHT_ARROW);
                        fixture.detectChanges();
                        testing_1.dispatchKeyboardEvent(tableBodyEl, 'keydown', keycodes_1.ENTER);
                        fixture.detectChanges();
                        expect(calendarInstance.currentView).toBe('month');
                        expect(calendarInstance.activeDate).toEqual(new Date(2017, core_2.FEB, 28));
                        expect(testComponent.selected).toBeUndefined();
                    });
                });
                describe('multi-year view', function () {
                    beforeEach(function () {
                        testing_1.dispatchMouseEvent(periodButton, 'click');
                        fixture.detectChanges();
                        expect(calendarInstance.currentView).toBe('multi-year');
                    });
                    it('should go to year view on enter', function () {
                        var tableBodyEl = calendarBodyEl.querySelector('.mat-calendar-body');
                        testing_1.dispatchKeyboardEvent(tableBodyEl, 'keydown', keycodes_1.RIGHT_ARROW);
                        fixture.detectChanges();
                        testing_1.dispatchKeyboardEvent(tableBodyEl, 'keydown', keycodes_1.ENTER);
                        fixture.detectChanges();
                        expect(calendarInstance.currentView).toBe('year');
                        expect(calendarInstance.activeDate).toEqual(new Date(2018, core_2.JAN, 31));
                        expect(testComponent.selected).toBeUndefined();
                    });
                });
            });
        });
    });
    describe('calendar with min and max date', function () {
        var fixture;
        var testComponent;
        var calendarElement;
        var calendarInstance;
        beforeEach(function () {
            fixture = testing_2.TestBed.createComponent(CalendarWithMinMax);
            var calendarDebugElement = fixture.debugElement.query(platform_browser_1.By.directive(calendar_1.MatCalendar));
            calendarElement = calendarDebugElement.nativeElement;
            calendarInstance = calendarDebugElement.componentInstance;
            testComponent = fixture.componentInstance;
        });
        it('should clamp startAt value below min date', function () {
            testComponent.startAt = new Date(2000, core_2.JAN, 1);
            fixture.detectChanges();
            expect(calendarInstance.activeDate).toEqual(new Date(2016, core_2.JAN, 1));
        });
        it('should clamp startAt value above max date', function () {
            testComponent.startAt = new Date(2020, core_2.JAN, 1);
            fixture.detectChanges();
            expect(calendarInstance.activeDate).toEqual(new Date(2018, core_2.JAN, 1));
        });
        it('should not go back past min date', function () {
            testComponent.startAt = new Date(2016, core_2.FEB, 1);
            fixture.detectChanges();
            var prevButton = calendarElement.querySelector('.mat-calendar-previous-button');
            expect(prevButton.disabled).toBe(false, 'previous button should not be disabled');
            expect(calendarInstance.activeDate).toEqual(new Date(2016, core_2.FEB, 1));
            prevButton.click();
            fixture.detectChanges();
            expect(prevButton.disabled).toBe(true, 'previous button should be disabled');
            expect(calendarInstance.activeDate).toEqual(new Date(2016, core_2.JAN, 1));
            prevButton.click();
            fixture.detectChanges();
            expect(calendarInstance.activeDate).toEqual(new Date(2016, core_2.JAN, 1));
        });
        it('should not go forward past max date', function () {
            testComponent.startAt = new Date(2017, core_2.DEC, 1);
            fixture.detectChanges();
            var nextButton = calendarElement.querySelector('.mat-calendar-next-button');
            expect(nextButton.disabled).toBe(false, 'next button should not be disabled');
            expect(calendarInstance.activeDate).toEqual(new Date(2017, core_2.DEC, 1));
            nextButton.click();
            fixture.detectChanges();
            expect(nextButton.disabled).toBe(true, 'next button should be disabled');
            expect(calendarInstance.activeDate).toEqual(new Date(2018, core_2.JAN, 1));
            nextButton.click();
            fixture.detectChanges();
            expect(calendarInstance.activeDate).toEqual(new Date(2018, core_2.JAN, 1));
        });
        it('should re-render the month view when the minDate changes', function () {
            fixture.detectChanges();
            spyOn(calendarInstance.monthView, '_init').and.callThrough();
            testComponent.minDate = new Date(2017, core_2.NOV, 1);
            fixture.detectChanges();
            expect(calendarInstance.monthView._init).toHaveBeenCalled();
        });
        it('should re-render the month view when the maxDate changes', function () {
            fixture.detectChanges();
            spyOn(calendarInstance.monthView, '_init').and.callThrough();
            testComponent.maxDate = new Date(2017, core_2.DEC, 1);
            fixture.detectChanges();
            expect(calendarInstance.monthView._init).toHaveBeenCalled();
        });
        it('should re-render the year view when the minDate changes', function () {
            fixture.detectChanges();
            var periodButton = calendarElement.querySelector('.mat-calendar-period-button');
            periodButton.click();
            fixture.detectChanges();
            calendarElement.querySelector('.mat-calendar-body-active').click();
            fixture.detectChanges();
            spyOn(calendarInstance.yearView, '_init').and.callThrough();
            testComponent.minDate = new Date(2017, core_2.NOV, 1);
            fixture.detectChanges();
            expect(calendarInstance.yearView._init).toHaveBeenCalled();
        });
        it('should re-render the year view when the maxDate changes', function () {
            fixture.detectChanges();
            var periodButton = calendarElement.querySelector('.mat-calendar-period-button');
            periodButton.click();
            fixture.detectChanges();
            calendarElement.querySelector('.mat-calendar-body-active').click();
            fixture.detectChanges();
            spyOn(calendarInstance.yearView, '_init').and.callThrough();
            testComponent.maxDate = new Date(2017, core_2.DEC, 1);
            fixture.detectChanges();
            expect(calendarInstance.yearView._init).toHaveBeenCalled();
        });
        it('should re-render the multi-year view when the minDate changes', function () {
            fixture.detectChanges();
            var periodButton = calendarElement.querySelector('.mat-calendar-period-button');
            periodButton.click();
            fixture.detectChanges();
            spyOn(calendarInstance.multiYearView, '_init').and.callThrough();
            testComponent.minDate = new Date(2017, core_2.NOV, 1);
            fixture.detectChanges();
            expect(calendarInstance.multiYearView._init).toHaveBeenCalled();
        });
        it('should re-render the multi-year view when the maxDate changes', function () {
            fixture.detectChanges();
            var periodButton = calendarElement.querySelector('.mat-calendar-period-button');
            periodButton.click();
            fixture.detectChanges();
            spyOn(calendarInstance.multiYearView, '_init').and.callThrough();
            testComponent.maxDate = new Date(2017, core_2.DEC, 1);
            fixture.detectChanges();
            expect(calendarInstance.multiYearView._init).toHaveBeenCalled();
        });
        it('should update the minDate in the child view if it changed after an interaction', function () {
            fixture.destroy();
            var dynamicFixture = testing_2.TestBed.createComponent(CalendarWithSelectableMinDate);
            dynamicFixture.detectChanges();
            var calendarDebugElement = dynamicFixture.debugElement.query(platform_browser_1.By.directive(calendar_1.MatCalendar));
            var disabledClass = 'mat-calendar-body-disabled';
            calendarElement = calendarDebugElement.nativeElement;
            calendarInstance = calendarDebugElement.componentInstance;
            var cells = Array.from(calendarElement.querySelectorAll('.mat-calendar-body-cell'));
            expect(cells.slice(0, 9).every(function (c) { return c.classList.contains(disabledClass); }))
                .toBe(true, 'Expected dates up to the 10th to be disabled.');
            expect(cells.slice(9).every(function (c) { return c.classList.contains(disabledClass); }))
                .toBe(false, 'Expected dates after the 10th to be enabled.');
            cells[14].click();
            dynamicFixture.detectChanges();
            cells = Array.from(calendarElement.querySelectorAll('.mat-calendar-body-cell'));
            expect(cells.slice(0, 14).every(function (c) { return c.classList.contains(disabledClass); }))
                .toBe(true, 'Expected dates up to the 14th to be disabled.');
            expect(cells.slice(14).every(function (c) { return c.classList.contains(disabledClass); }))
                .toBe(false, 'Expected dates after the 14th to be enabled.');
        });
    });
    describe('calendar with date filter', function () {
        var fixture;
        var testComponent;
        var calendarElement;
        var calendarInstance;
        beforeEach(function () {
            fixture = testing_2.TestBed.createComponent(CalendarWithDateFilter);
            fixture.detectChanges();
            var calendarDebugElement = fixture.debugElement.query(platform_browser_1.By.directive(calendar_1.MatCalendar));
            calendarElement = calendarDebugElement.nativeElement;
            calendarInstance = calendarDebugElement.componentInstance;
            testComponent = fixture.componentInstance;
        });
        it('should disable and prevent selection of filtered dates', function () {
            var cells = calendarElement.querySelectorAll('.mat-calendar-body-cell');
            cells[0].click();
            fixture.detectChanges();
            expect(testComponent.selected).toBeFalsy();
            cells[1].click();
            fixture.detectChanges();
            expect(testComponent.selected).toEqual(new Date(2017, core_2.JAN, 2));
        });
        describe('a11y', function () {
            var tableBodyEl;
            beforeEach(function () {
                tableBodyEl = calendarElement.querySelector('.mat-calendar-body');
                expect(tableBodyEl).not.toBeNull();
                testing_1.dispatchFakeEvent(tableBodyEl, 'focus');
                fixture.detectChanges();
            });
            it('should not allow selection of disabled date in month view', function () {
                expect(calendarInstance.currentView).toBe('month');
                expect(calendarInstance.activeDate).toEqual(new Date(2017, core_2.JAN, 1));
                testing_1.dispatchKeyboardEvent(tableBodyEl, 'keydown', keycodes_1.ENTER);
                fixture.detectChanges();
                expect(testComponent.selected).toBeUndefined();
            });
            it('should allow entering month view at disabled month', function () {
                var periodButton = calendarElement.querySelector('.mat-calendar-period-button');
                testing_1.dispatchMouseEvent(periodButton, 'click');
                fixture.detectChanges();
                calendarElement.querySelector('.mat-calendar-body-active').click();
                fixture.detectChanges();
                calendarInstance.activeDate = new Date(2017, core_2.NOV, 1);
                fixture.detectChanges();
                expect(calendarInstance.currentView).toBe('year');
                tableBodyEl = calendarElement.querySelector('.mat-calendar-body');
                testing_1.dispatchKeyboardEvent(tableBodyEl, 'keydown', keycodes_1.ENTER);
                fixture.detectChanges();
                expect(calendarInstance.currentView).toBe('month');
                expect(testComponent.selected).toBeUndefined();
            });
        });
    });
});
var StandardCalendar = /** @class */ (function () {
    function StandardCalendar() {
        this.startDate = new Date(2017, core_2.JAN, 31);
    }
    StandardCalendar.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <mat-calendar\n        [startAt]=\"startDate\"\n        [(selected)]=\"selected\"\n        (yearSelected)=\"selectedYear=$event\"\n        (monthSelected)=\"selectedMonth=$event\">\n    </mat-calendar>"
                },] },
    ];
    return StandardCalendar;
}());
var CalendarWithMinMax = /** @class */ (function () {
    function CalendarWithMinMax() {
        this.minDate = new Date(2016, core_2.JAN, 1);
        this.maxDate = new Date(2018, core_2.JAN, 1);
    }
    CalendarWithMinMax.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <mat-calendar [startAt]=\"startAt\" [minDate]=\"minDate\" [maxDate]=\"maxDate\"></mat-calendar>\n  "
                },] },
    ];
    return CalendarWithMinMax;
}());
var CalendarWithDateFilter = /** @class */ (function () {
    function CalendarWithDateFilter() {
        this.startDate = new Date(2017, core_2.JAN, 1);
    }
    CalendarWithDateFilter.prototype.dateFilter = function (date) {
        return !(date.getDate() % 2) && date.getMonth() !== core_2.NOV;
    };
    CalendarWithDateFilter.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <mat-calendar [startAt]=\"startDate\" [(selected)]=\"selected\" [dateFilter]=\"dateFilter\">\n    </mat-calendar>\n  "
                },] },
    ];
    return CalendarWithDateFilter;
}());
var CalendarWithSelectableMinDate = /** @class */ (function () {
    function CalendarWithSelectableMinDate() {
        this.startAt = new Date(2018, core_2.JUL, 0);
        this.select(new Date(2018, core_2.JUL, 10));
    }
    CalendarWithSelectableMinDate.prototype.select = function (value) {
        this.minDate = this.selected = value;
    };
    CalendarWithSelectableMinDate.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <mat-calendar\n      [startAt]=\"startAt\"\n      (selectedChange)=\"select($event)\"\n      [selected]=\"selected\"\n      [minDate]=\"selected\">\n    </mat-calendar>\n  "
                },] },
    ];
    /** @nocollapse */
    CalendarWithSelectableMinDate.ctorParameters = function () { return []; };
    return CalendarWithSelectableMinDate;
}());
//# sourceMappingURL=calendar.spec.js.map