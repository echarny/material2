"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
/** InjectionToken for datepicker that can be used to override default locale code. */
exports.MAT_DATE_LOCALE = new core_1.InjectionToken('MAT_DATE_LOCALE', {
    providedIn: 'root',
    factory: MAT_DATE_LOCALE_FACTORY,
});
/** @docs-private */
function MAT_DATE_LOCALE_FACTORY() {
    return core_1.inject(core_1.LOCALE_ID);
}
exports.MAT_DATE_LOCALE_FACTORY = MAT_DATE_LOCALE_FACTORY;
/**
 * No longer needed since MAT_DATE_LOCALE has been changed to a scoped injectable.
 * If you are importing and providing this in your code you can simply remove it.
 * @deprecated
 * @breaking-change 7.0.0
 */
exports.MAT_DATE_LOCALE_PROVIDER = { provide: exports.MAT_DATE_LOCALE, useExisting: core_1.LOCALE_ID };
/** Adapts type `D` to be usable as a date by cdk-based components that work with dates. */
var /** Adapts type `D` to be usable as a date by cdk-based components that work with dates. */
DateAdapter = /** @class */ (function () {
    function DateAdapter() {
        this._localeChanges = new rxjs_1.Subject();
    }
    Object.defineProperty(DateAdapter.prototype, "localeChanges", {
        /** A stream that emits when the locale changes. */
        get: /** A stream that emits when the locale changes. */
        function () { return this._localeChanges; },
        enumerable: true,
        configurable: true
    });
    /**
     * Attempts to deserialize a value to a valid date object. This is different from parsing in that
     * deserialize should only accept non-ambiguous, locale-independent formats (e.g. a ISO 8601
     * string). The default implementation does not allow any deserialization, it simply checks that
     * the given value is already a valid date object or null. The `<mat-datepicker>` will call this
     * method on all of it's `@Input()` properties that accept dates. It is therefore possible to
     * support passing values from your backend directly to these properties by overriding this method
     * to also deserialize the format used by your backend.
     * @param value The value to be deserialized into a date object.
     * @returns The deserialized date object, either a valid date, null if the value can be
     *     deserialized into a null date (e.g. the empty string), or an invalid date.
     */
    /**
       * Attempts to deserialize a value to a valid date object. This is different from parsing in that
       * deserialize should only accept non-ambiguous, locale-independent formats (e.g. a ISO 8601
       * string). The default implementation does not allow any deserialization, it simply checks that
       * the given value is already a valid date object or null. The `<mat-datepicker>` will call this
       * method on all of it's `@Input()` properties that accept dates. It is therefore possible to
       * support passing values from your backend directly to these properties by overriding this method
       * to also deserialize the format used by your backend.
       * @param value The value to be deserialized into a date object.
       * @returns The deserialized date object, either a valid date, null if the value can be
       *     deserialized into a null date (e.g. the empty string), or an invalid date.
       */
    DateAdapter.prototype.deserialize = /**
       * Attempts to deserialize a value to a valid date object. This is different from parsing in that
       * deserialize should only accept non-ambiguous, locale-independent formats (e.g. a ISO 8601
       * string). The default implementation does not allow any deserialization, it simply checks that
       * the given value is already a valid date object or null. The `<mat-datepicker>` will call this
       * method on all of it's `@Input()` properties that accept dates. It is therefore possible to
       * support passing values from your backend directly to these properties by overriding this method
       * to also deserialize the format used by your backend.
       * @param value The value to be deserialized into a date object.
       * @returns The deserialized date object, either a valid date, null if the value can be
       *     deserialized into a null date (e.g. the empty string), or an invalid date.
       */
    function (value) {
        if (value == null || this.isDateInstance(value) && this.isValid(value)) {
            return value;
        }
        return this.invalid();
    };
    /**
     * Sets the locale used for all dates.
     * @param locale The new locale.
     */
    /**
       * Sets the locale used for all dates.
       * @param locale The new locale.
       */
    DateAdapter.prototype.setLocale = /**
       * Sets the locale used for all dates.
       * @param locale The new locale.
       */
    function (locale) {
        this.locale = locale;
        this._localeChanges.next();
    };
    /**
     * Compares two dates.
     * @param first The first date to compare.
     * @param second The second date to compare.
     * @returns 0 if the dates are equal, a number less than 0 if the first date is earlier,
     *     a number greater than 0 if the first date is later.
     */
    /**
       * Compares two dates.
       * @param first The first date to compare.
       * @param second The second date to compare.
       * @returns 0 if the dates are equal, a number less than 0 if the first date is earlier,
       *     a number greater than 0 if the first date is later.
       */
    DateAdapter.prototype.compareDate = /**
       * Compares two dates.
       * @param first The first date to compare.
       * @param second The second date to compare.
       * @returns 0 if the dates are equal, a number less than 0 if the first date is earlier,
       *     a number greater than 0 if the first date is later.
       */
    function (first, second) {
        return this.getYear(first) - this.getYear(second) ||
            this.getMonth(first) - this.getMonth(second) ||
            this.getDate(first) - this.getDate(second);
    };
    /**
     * Checks if two dates are equal.
     * @param first The first date to check.
     * @param second The second date to check.
     * @returns Whether the two dates are equal.
     *     Null dates are considered equal to other null dates.
     */
    /**
       * Checks if two dates are equal.
       * @param first The first date to check.
       * @param second The second date to check.
       * @returns Whether the two dates are equal.
       *     Null dates are considered equal to other null dates.
       */
    DateAdapter.prototype.sameDate = /**
       * Checks if two dates are equal.
       * @param first The first date to check.
       * @param second The second date to check.
       * @returns Whether the two dates are equal.
       *     Null dates are considered equal to other null dates.
       */
    function (first, second) {
        if (first && second) {
            var firstValid = this.isValid(first);
            var secondValid = this.isValid(second);
            if (firstValid && secondValid) {
                return !this.compareDate(first, second);
            }
            return firstValid == secondValid;
        }
        return first == second;
    };
    /**
     * Clamp the given date between min and max dates.
     * @param date The date to clamp.
     * @param min The minimum value to allow. If null or omitted no min is enforced.
     * @param max The maximum value to allow. If null or omitted no max is enforced.
     * @returns `min` if `date` is less than `min`, `max` if date is greater than `max`,
     *     otherwise `date`.
     */
    /**
       * Clamp the given date between min and max dates.
       * @param date The date to clamp.
       * @param min The minimum value to allow. If null or omitted no min is enforced.
       * @param max The maximum value to allow. If null or omitted no max is enforced.
       * @returns `min` if `date` is less than `min`, `max` if date is greater than `max`,
       *     otherwise `date`.
       */
    DateAdapter.prototype.clampDate = /**
       * Clamp the given date between min and max dates.
       * @param date The date to clamp.
       * @param min The minimum value to allow. If null or omitted no min is enforced.
       * @param max The maximum value to allow. If null or omitted no max is enforced.
       * @returns `min` if `date` is less than `min`, `max` if date is greater than `max`,
       *     otherwise `date`.
       */
    function (date, min, max) {
        if (min && this.compareDate(date, min) < 0) {
            return min;
        }
        if (max && this.compareDate(date, max) > 0) {
            return max;
        }
        return date;
    };
    return DateAdapter;
}());
exports.DateAdapter = DateAdapter;
//# sourceMappingURL=date-adapter.js.map