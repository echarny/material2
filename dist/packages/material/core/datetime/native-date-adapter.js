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
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
var platform_1 = require("@angular/cdk/platform");
var core_1 = require("@angular/core");
var date_adapter_1 = require("./date-adapter");
// TODO(mmalerba): Remove when we no longer support safari 9.
/** Whether the browser supports the Intl API. */
var SUPPORTS_INTL_API = typeof Intl != 'undefined';
/** The default month names to use if Intl API is not available. */
var DEFAULT_MONTH_NAMES = {
    'long': [
        'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September',
        'October', 'November', 'December'
    ],
    'short': ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    'narrow': ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D']
};
var ɵ0 = function (i) { return String(i + 1); };
exports.ɵ0 = ɵ0;
/** The default date names to use if Intl API is not available. */
var DEFAULT_DATE_NAMES = range(31, ɵ0);
/** The default day of the week names to use if Intl API is not available. */
var DEFAULT_DAY_OF_WEEK_NAMES = {
    'long': ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    'short': ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    'narrow': ['S', 'M', 'T', 'W', 'T', 'F', 'S']
};
/**
 * Matches strings that have the form of a valid RFC 3339 string
 * (https://tools.ietf.org/html/rfc3339). Note that the string may not actually be a valid date
 * because the regex will match strings an with out of bounds month, date, etc.
 */
var ISO_8601_REGEX = /^\d{4}-\d{2}-\d{2}(?:T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|(?:(?:\+|-)\d{2}:\d{2}))?)?$/;
/** Creates an array and fills it with values. */
function range(length, valueFunction) {
    var valuesArray = Array(length);
    for (var i = 0; i < length; i++) {
        valuesArray[i] = valueFunction(i);
    }
    return valuesArray;
}
/** Adapts the native JS Date for use with cdk-based components that work with dates. */
var NativeDateAdapter = /** @class */ (function (_super) {
    __extends(NativeDateAdapter, _super);
    function NativeDateAdapter(matDateLocale, platform) {
        var _this = _super.call(this) || this;
        /**
           * Whether to use `timeZone: 'utc'` with `Intl.DateTimeFormat` when formatting dates.
           * Without this `Intl.DateTimeFormat` sometimes chooses the wrong timeZone, which can throw off
           * the result. (e.g. in the en-US locale `new Date(1800, 7, 14).toLocaleDateString()`
           * will produce `'8/13/1800'`.
           *
           * TODO(mmalerba): drop this variable. It's not being used in the code right now. We're now
           * getting the string representation of a Date object from it's utc representation. We're keeping
           * it here for sometime, just for precaution, in case we decide to revert some of these changes
           * though.
           */
        _this.useUtcForDisplay = true;
        _super.prototype.setLocale.call(_this, matDateLocale);
        // IE does its own time zone correction, so we disable this on IE.
        // IE does its own time zone correction, so we disable this on IE.
        _this.useUtcForDisplay = !platform.TRIDENT;
        _this._clampDate = platform.TRIDENT || platform.EDGE;
        return _this;
    }
    NativeDateAdapter.prototype.getYear = function (date) {
        return date.getFullYear();
    };
    NativeDateAdapter.prototype.getMonth = function (date) {
        return date.getMonth();
    };
    NativeDateAdapter.prototype.getDate = function (date) {
        return date.getDate();
    };
    NativeDateAdapter.prototype.getDayOfWeek = function (date) {
        return date.getDay();
    };
    NativeDateAdapter.prototype.getMonthNames = function (style) {
        var _this = this;
        if (SUPPORTS_INTL_API) {
            var dtf_1 = new Intl.DateTimeFormat(this.locale, { month: style, timeZone: 'utc' });
            return range(12, function (i) {
                return _this._stripDirectionalityCharacters(_this._format(dtf_1, new Date(2017, i, 1)));
            });
        }
        return DEFAULT_MONTH_NAMES[style];
    };
    NativeDateAdapter.prototype.getDateNames = function () {
        var _this = this;
        if (SUPPORTS_INTL_API) {
            var dtf_2 = new Intl.DateTimeFormat(this.locale, { day: 'numeric', timeZone: 'utc' });
            return range(31, function (i) {
                return _this._stripDirectionalityCharacters(_this._format(dtf_2, new Date(2017, 0, i + 1)));
            });
        }
        return DEFAULT_DATE_NAMES;
    };
    NativeDateAdapter.prototype.getDayOfWeekNames = function (style) {
        var _this = this;
        if (SUPPORTS_INTL_API) {
            var dtf_3 = new Intl.DateTimeFormat(this.locale, { weekday: style, timeZone: 'utc' });
            return range(7, function (i) {
                return _this._stripDirectionalityCharacters(_this._format(dtf_3, new Date(2017, 0, i + 1)));
            });
        }
        return DEFAULT_DAY_OF_WEEK_NAMES[style];
    };
    NativeDateAdapter.prototype.getYearName = function (date) {
        if (SUPPORTS_INTL_API) {
            var dtf = new Intl.DateTimeFormat(this.locale, { year: 'numeric', timeZone: 'utc' });
            return this._stripDirectionalityCharacters(this._format(dtf, date));
        }
        return String(this.getYear(date));
    };
    NativeDateAdapter.prototype.getFirstDayOfWeek = function () {
        // We can't tell using native JS Date what the first day of the week is, we default to Sunday.
        return 0;
    };
    NativeDateAdapter.prototype.getNumDaysInMonth = function (date) {
        return this.getDate(this._createDateWithOverflow(this.getYear(date), this.getMonth(date) + 1, 0));
    };
    NativeDateAdapter.prototype.clone = function (date) {
        return this.createDate(this.getYear(date), this.getMonth(date), this.getDate(date));
    };
    NativeDateAdapter.prototype.createDate = function (year, month, date) {
        // Check for invalid month and date (except upper bound on date which we have to check after
        // creating the Date).
        if (month < 0 || month > 11) {
            throw Error("Invalid month index \"" + month + "\". Month index has to be between 0 and 11.");
        }
        if (date < 1) {
            throw Error("Invalid date \"" + date + "\". Date has to be greater than 0.");
        }
        var result = this._createDateWithOverflow(year, month, date);
        // Check that the date wasn't above the upper bound for the month, causing the month to overflow
        if (result.getMonth() != month) {
            throw Error("Invalid date \"" + date + "\" for month with index \"" + month + "\".");
        }
        return result;
    };
    NativeDateAdapter.prototype.today = function () {
        return new Date();
    };
    NativeDateAdapter.prototype.parse = function (value) {
        // We have no way using the native JS Date to set the parse format or locale, so we ignore these
        // parameters.
        if (typeof value == 'number') {
            return new Date(value);
        }
        return value ? new Date(Date.parse(value)) : null;
    };
    NativeDateAdapter.prototype.format = function (date, displayFormat) {
        if (!this.isValid(date)) {
            throw Error('NativeDateAdapter: Cannot format invalid date.');
        }
        if (SUPPORTS_INTL_API) {
            // On IE and Edge the i18n API will throw a hard error that can crash the entire app
            // if we attempt to format a date whose year is less than 1 or greater than 9999.
            if (this._clampDate && (date.getFullYear() < 1 || date.getFullYear() > 9999)) {
                date = this.clone(date);
                date.setFullYear(Math.max(1, Math.min(9999, date.getFullYear())));
            }
            displayFormat = __assign({}, displayFormat, { timeZone: 'utc' });
            var dtf = new Intl.DateTimeFormat(this.locale, displayFormat);
            return this._stripDirectionalityCharacters(this._format(dtf, date));
        }
        return this._stripDirectionalityCharacters(date.toDateString());
    };
    NativeDateAdapter.prototype.addCalendarYears = function (date, years) {
        return this.addCalendarMonths(date, years * 12);
    };
    NativeDateAdapter.prototype.addCalendarMonths = function (date, months) {
        var newDate = this._createDateWithOverflow(this.getYear(date), this.getMonth(date) + months, this.getDate(date));
        // It's possible to wind up in the wrong month if the original month has more days than the new
        // month. In this case we want to go to the last day of the desired month.
        // Note: the additional + 12 % 12 ensures we end up with a positive number, since JS % doesn't
        // guarantee this.
        if (this.getMonth(newDate) != ((this.getMonth(date) + months) % 12 + 12) % 12) {
            newDate = this._createDateWithOverflow(this.getYear(newDate), this.getMonth(newDate), 0);
        }
        return newDate;
    };
    NativeDateAdapter.prototype.addCalendarDays = function (date, days) {
        return this._createDateWithOverflow(this.getYear(date), this.getMonth(date), this.getDate(date) + days);
    };
    NativeDateAdapter.prototype.toIso8601 = function (date) {
        return [
            date.getUTCFullYear(),
            this._2digit(date.getUTCMonth() + 1),
            this._2digit(date.getUTCDate())
        ].join('-');
    };
    /**
     * Returns the given value if given a valid Date or null. Deserializes valid ISO 8601 strings
     * (https://www.ietf.org/rfc/rfc3339.txt) into valid Dates and empty string into null. Returns an
     * invalid date for all other values.
     */
    /**
       * Returns the given value if given a valid Date or null. Deserializes valid ISO 8601 strings
       * (https://www.ietf.org/rfc/rfc3339.txt) into valid Dates and empty string into null. Returns an
       * invalid date for all other values.
       */
    NativeDateAdapter.prototype.deserialize = /**
       * Returns the given value if given a valid Date or null. Deserializes valid ISO 8601 strings
       * (https://www.ietf.org/rfc/rfc3339.txt) into valid Dates and empty string into null. Returns an
       * invalid date for all other values.
       */
    function (value) {
        if (typeof value === 'string') {
            if (!value) {
                return null;
            }
            // The `Date` constructor accepts formats other than ISO 8601, so we need to make sure the
            // string is the right format first.
            if (ISO_8601_REGEX.test(value)) {
                var date = new Date(value);
                if (this.isValid(date)) {
                    return date;
                }
            }
        }
        return _super.prototype.deserialize.call(this, value);
    };
    NativeDateAdapter.prototype.isDateInstance = function (obj) {
        return obj instanceof Date;
    };
    NativeDateAdapter.prototype.isValid = function (date) {
        return !isNaN(date.getTime());
    };
    NativeDateAdapter.prototype.invalid = function () {
        return new Date(NaN);
    };
    /** Creates a date but allows the month and date to overflow. */
    /** Creates a date but allows the month and date to overflow. */
    NativeDateAdapter.prototype._createDateWithOverflow = /** Creates a date but allows the month and date to overflow. */
    function (year, month, date) {
        var result = new Date(year, month, date);
        // We need to correct for the fact that JS native Date treats years in range [0, 99] as
        // abbreviations for 19xx.
        if (year >= 0 && year < 100) {
            result.setFullYear(this.getYear(result) - 1900);
        }
        return result;
    };
    /**
     * Pads a number to make it two digits.
     * @param n The number to pad.
     * @returns The padded number.
     */
    /**
       * Pads a number to make it two digits.
       * @param n The number to pad.
       * @returns The padded number.
       */
    NativeDateAdapter.prototype._2digit = /**
       * Pads a number to make it two digits.
       * @param n The number to pad.
       * @returns The padded number.
       */
    function (n) {
        return ('00' + n).slice(-2);
    };
    /**
     * Strip out unicode LTR and RTL characters. Edge and IE insert these into formatted dates while
     * other browsers do not. We remove them to make output consistent and because they interfere with
     * date parsing.
     * @param str The string to strip direction characters from.
     * @returns The stripped string.
     */
    /**
       * Strip out unicode LTR and RTL characters. Edge and IE insert these into formatted dates while
       * other browsers do not. We remove them to make output consistent and because they interfere with
       * date parsing.
       * @param str The string to strip direction characters from.
       * @returns The stripped string.
       */
    NativeDateAdapter.prototype._stripDirectionalityCharacters = /**
       * Strip out unicode LTR and RTL characters. Edge and IE insert these into formatted dates while
       * other browsers do not. We remove them to make output consistent and because they interfere with
       * date parsing.
       * @param str The string to strip direction characters from.
       * @returns The stripped string.
       */
    function (str) {
        return str.replace(/[\u200e\u200f]/g, '');
    };
    /**
     * When converting Date object to string, javascript built-in functions may return wrong
     * results because it applies its internal DST rules. The DST rules around the world change
     * very frequently, and the current valid rule is not always valid in previous years though.
     * We work around this problem building a new Date object which has its internal UTC
     * representation with the local date and time.
     * @param dtf Intl.DateTimeFormat object, containg the desired string format. It must have
     *    timeZone set to 'utc' to work fine.
     * @param date Date from which we want to get the string representation according to dtf
     * @returns A Date object with its UTC representation based on the passed in date info
     */
    /**
       * When converting Date object to string, javascript built-in functions may return wrong
       * results because it applies its internal DST rules. The DST rules around the world change
       * very frequently, and the current valid rule is not always valid in previous years though.
       * We work around this problem building a new Date object which has its internal UTC
       * representation with the local date and time.
       * @param dtf Intl.DateTimeFormat object, containg the desired string format. It must have
       *    timeZone set to 'utc' to work fine.
       * @param date Date from which we want to get the string representation according to dtf
       * @returns A Date object with its UTC representation based on the passed in date info
       */
    NativeDateAdapter.prototype._format = /**
       * When converting Date object to string, javascript built-in functions may return wrong
       * results because it applies its internal DST rules. The DST rules around the world change
       * very frequently, and the current valid rule is not always valid in previous years though.
       * We work around this problem building a new Date object which has its internal UTC
       * representation with the local date and time.
       * @param dtf Intl.DateTimeFormat object, containg the desired string format. It must have
       *    timeZone set to 'utc' to work fine.
       * @param date Date from which we want to get the string representation according to dtf
       * @returns A Date object with its UTC representation based on the passed in date info
       */
    function (dtf, date) {
        var d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds()));
        return dtf.format(d);
    };
    NativeDateAdapter.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    NativeDateAdapter.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: core_1.Optional }, { type: core_1.Inject, args: [date_adapter_1.MAT_DATE_LOCALE,] },] },
        { type: platform_1.Platform, },
    ]; };
    return NativeDateAdapter;
}(date_adapter_1.DateAdapter));
exports.NativeDateAdapter = NativeDateAdapter;
//# sourceMappingURL=native-date-adapter.js.map