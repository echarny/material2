"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
var coercion_1 = require("@angular/cdk/coercion");
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var datepicker_1 = require("./datepicker");
var datepicker_intl_1 = require("./datepicker-intl");
/** Can be used to override the icon of a `matDatepickerToggle`. */
var MatDatepickerToggleIcon = /** @class */ (function () {
    function MatDatepickerToggleIcon() {
    }
    MatDatepickerToggleIcon.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[matDatepickerToggleIcon]'
                },] },
    ];
    return MatDatepickerToggleIcon;
}());
exports.MatDatepickerToggleIcon = MatDatepickerToggleIcon;
var MatDatepickerToggle = /** @class */ (function () {
    function MatDatepickerToggle(_intl, _changeDetectorRef) {
        this._intl = _intl;
        this._changeDetectorRef = _changeDetectorRef;
        this._stateChanges = rxjs_1.Subscription.EMPTY;
    }
    Object.defineProperty(MatDatepickerToggle.prototype, "disabled", {
        get: /** Whether the toggle button is disabled. */
        function () {
            return this._disabled === undefined ? this.datepicker.disabled : !!this._disabled;
        },
        set: function (value) {
            this._disabled = coercion_1.coerceBooleanProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    MatDatepickerToggle.prototype.ngOnChanges = function (changes) {
        if (changes.datepicker) {
            this._watchStateChanges();
        }
    };
    MatDatepickerToggle.prototype.ngOnDestroy = function () {
        this._stateChanges.unsubscribe();
    };
    MatDatepickerToggle.prototype.ngAfterContentInit = function () {
        this._watchStateChanges();
    };
    MatDatepickerToggle.prototype._open = function (event) {
        if (this.datepicker && !this.disabled) {
            this.datepicker.open();
            event.stopPropagation();
        }
    };
    MatDatepickerToggle.prototype._watchStateChanges = function () {
        var _this = this;
        var datepickerDisabled = this.datepicker ? this.datepicker._disabledChange : rxjs_1.of();
        var inputDisabled = this.datepicker && this.datepicker._datepickerInput ?
            this.datepicker._datepickerInput._disabledChange : rxjs_1.of();
        var datepickerToggled = this.datepicker ?
            rxjs_1.merge(this.datepicker.openedStream, this.datepicker.closedStream) :
            rxjs_1.of();
        this._stateChanges.unsubscribe();
        this._stateChanges = rxjs_1.merge(this._intl.changes, datepickerDisabled, inputDisabled, datepickerToggled).subscribe(function () { return _this._changeDetectorRef.markForCheck(); });
    };
    MatDatepickerToggle.decorators = [
        { type: core_1.Component, args: [{selector: 'mat-datepicker-toggle',
                    template: "<button mat-icon-button type=\"button\" aria-haspopup=\"true\" [attr.aria-label]=\"_intl.openCalendarLabel\" [disabled]=\"disabled\" (click)=\"_open($event)\"><svg *ngIf=\"!_customIcon\" class=\"mat-datepicker-toggle-default-icon\" viewBox=\"0 0 24 24\" width=\"24px\" height=\"24px\" fill=\"currentColor\" focusable=\"false\"><path d=\"M0 0h24v24H0z\" fill=\"none\"/><path d=\"M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z\"/></svg><ng-content select=\"[matDatepickerToggleIcon]\"></ng-content></button>",
                    styles: [".mat-form-field-appearance-legacy .mat-form-field-prefix .mat-datepicker-toggle-default-icon,.mat-form-field-appearance-legacy .mat-form-field-suffix .mat-datepicker-toggle-default-icon{width:1em}.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-prefix .mat-datepicker-toggle-default-icon,.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-suffix .mat-datepicker-toggle-default-icon{display:block;width:1.5em;height:1.5em}.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-prefix .mat-icon-button .mat-datepicker-toggle-default-icon,.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-suffix .mat-icon-button .mat-datepicker-toggle-default-icon{margin:auto}"],
                    host: {
                        'class': 'mat-datepicker-toggle',
                        '[class.mat-datepicker-toggle-active]': 'datepicker && datepicker.opened',
                        '[class.mat-accent]': 'datepicker && datepicker.color === "accent"',
                        '[class.mat-warn]': 'datepicker && datepicker.color === "warn"',
                    },
                    exportAs: 'matDatepickerToggle',
                    encapsulation: core_1.ViewEncapsulation.None,
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                },] },
    ];
    /** @nocollapse */
    MatDatepickerToggle.ctorParameters = function () { return [
        { type: datepicker_intl_1.MatDatepickerIntl, },
        { type: core_1.ChangeDetectorRef, },
    ]; };
    MatDatepickerToggle.propDecorators = {
        "datepicker": [{ type: core_1.Input, args: ['for',] },],
        "disabled": [{ type: core_1.Input },],
        "_customIcon": [{ type: core_1.ContentChild, args: [MatDatepickerToggleIcon,] },],
    };
    return MatDatepickerToggle;
}());
exports.MatDatepickerToggle = MatDatepickerToggle;
//# sourceMappingURL=datepicker-toggle.js.map