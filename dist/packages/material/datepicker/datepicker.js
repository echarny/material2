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
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
var bidi_1 = require("@angular/cdk/bidi");
var coercion_1 = require("@angular/cdk/coercion");
var keycodes_1 = require("@angular/cdk/keycodes");
var overlay_1 = require("@angular/cdk/overlay");
var portal_1 = require("@angular/cdk/portal");
var common_1 = require("@angular/common");
var operators_1 = require("rxjs/operators");
var core_1 = require("@angular/core");
var core_2 = require("@angular/material/core");
var dialog_1 = require("@angular/material/dialog");
var rxjs_1 = require("rxjs");
var datepicker_errors_1 = require("./datepicker-errors");
var calendar_1 = require("./calendar");
var datepicker_animations_1 = require("./datepicker-animations");
/** Used to generate a unique ID for each datepicker instance. */
var datepickerUid = 0;
/** Injection token that determines the scroll handling while the calendar is open. */
exports.MAT_DATEPICKER_SCROLL_STRATEGY = new core_1.InjectionToken('mat-datepicker-scroll-strategy');
/** @docs-private */
function MAT_DATEPICKER_SCROLL_STRATEGY_FACTORY(overlay) {
    return function () { return overlay.scrollStrategies.reposition(); };
}
exports.MAT_DATEPICKER_SCROLL_STRATEGY_FACTORY = MAT_DATEPICKER_SCROLL_STRATEGY_FACTORY;
/** @docs-private */
exports.MAT_DATEPICKER_SCROLL_STRATEGY_FACTORY_PROVIDER = {
    provide: exports.MAT_DATEPICKER_SCROLL_STRATEGY,
    deps: [overlay_1.Overlay],
    useFactory: MAT_DATEPICKER_SCROLL_STRATEGY_FACTORY,
};
// Boilerplate for applying mixins to MatDatepickerContent.
/** @docs-private */
var 
// Boilerplate for applying mixins to MatDatepickerContent.
/** @docs-private */
MatDatepickerContentBase = /** @class */ (function () {
    function MatDatepickerContentBase(_elementRef) {
        this._elementRef = _elementRef;
    }
    return MatDatepickerContentBase;
}());
exports.MatDatepickerContentBase = MatDatepickerContentBase;
exports._MatDatepickerContentMixinBase = core_2.mixinColor(MatDatepickerContentBase);
/**
 * Component used as the content for the datepicker dialog and popup. We use this instead of using
 * MatCalendar directly as the content so we can control the initial focus. This also gives us a
 * place to put additional features of the popup that are not part of the calendar itself in the
 * future. (e.g. confirmation buttons).
 * @docs-private
 */
var MatDatepickerContent = /** @class */ (function (_super) {
    __extends(MatDatepickerContent, _super);
    function MatDatepickerContent(elementRef) {
        return _super.call(this, elementRef) || this;
    }
    MatDatepickerContent.prototype.ngAfterViewInit = function () {
        this._calendar.focusActiveCell();
    };
    MatDatepickerContent.decorators = [
        { type: core_1.Component, args: [{selector: 'mat-datepicker-content',
                    template: "<mat-calendar cdkTrapFocus [id]=\"datepicker.id\" [ngClass]=\"datepicker.panelClass\" [startAt]=\"datepicker.startAt\" [startView]=\"datepicker.startView\" [minDate]=\"datepicker._minDate\" [maxDate]=\"datepicker._maxDate\" [dateFilter]=\"datepicker._dateFilter\" [headerComponent]=\"datepicker.calendarHeaderComponent\" [selected]=\"datepicker._selected\" [@fadeInCalendar]=\"'enter'\" (selectedChange)=\"datepicker.select($event)\" (yearSelected)=\"datepicker._selectYear($event)\" (monthSelected)=\"datepicker._selectMonth($event)\" (_userSelection)=\"datepicker.close()\"></mat-calendar>",
                    styles: [".mat-datepicker-content{box-shadow:0 5px 5px -3px rgba(0,0,0,.2),0 8px 10px 1px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12);display:block;border-radius:2px}.mat-datepicker-content .mat-calendar{width:296px;height:354px}.mat-datepicker-content-touch{box-shadow:0 0 0 0 rgba(0,0,0,.2),0 0 0 0 rgba(0,0,0,.14),0 0 0 0 rgba(0,0,0,.12);display:block;max-height:80vh;overflow:auto;margin:-24px}.mat-datepicker-content-touch .mat-calendar{min-width:250px;min-height:312px;max-width:750px;max-height:788px}@media all and (orientation:landscape){.mat-datepicker-content-touch .mat-calendar{width:64vh;height:80vh}}@media all and (orientation:portrait){.mat-datepicker-content-touch .mat-calendar{width:80vw;height:100vw}}"],
                    host: {
                        'class': 'mat-datepicker-content',
                        '[@transformPanel]': '"enter"',
                        '[class.mat-datepicker-content-touch]': 'datepicker.touchUi',
                    },
                    animations: [
                        datepicker_animations_1.matDatepickerAnimations.transformPanel,
                        datepicker_animations_1.matDatepickerAnimations.fadeInCalendar,
                    ],
                    exportAs: 'matDatepickerContent',
                    encapsulation: core_1.ViewEncapsulation.None,
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    inputs: ['color'],
                },] },
    ];
    /** @nocollapse */
    MatDatepickerContent.ctorParameters = function () { return [
        { type: core_1.ElementRef, },
    ]; };
    MatDatepickerContent.propDecorators = {
        "_calendar": [{ type: core_1.ViewChild, args: [calendar_1.MatCalendar,] },],
    };
    return MatDatepickerContent;
}(exports._MatDatepickerContentMixinBase));
exports.MatDatepickerContent = MatDatepickerContent;
// TODO(mmalerba): We use a component instead of a directive here so the user can use implicit
// template reference variables (e.g. #d vs #d="matDatepicker"). We can change this to a directive
// if angular adds support for `exportAs: '$implicit'` on directives.
/** Component responsible for managing the datepicker popup/dialog. */
var MatDatepicker = /** @class */ (function () {
    function MatDatepicker(_dialog, _overlay, _ngZone, _viewContainerRef, _scrollStrategy, _dateAdapter, _dir, _document) {
        this._dialog = _dialog;
        this._overlay = _overlay;
        this._ngZone = _ngZone;
        this._viewContainerRef = _viewContainerRef;
        this._scrollStrategy = _scrollStrategy;
        this._dateAdapter = _dateAdapter;
        this._dir = _dir;
        this._document = _document;
        /** The view that the calendar should start in. */
        this.startView = 'month';
        this._touchUi = false;
        /**
           * Emits selected year in multiyear view.
           * This doesn't imply a change on the selected date.
           */
        this.yearSelected = new core_1.EventEmitter();
        /**
           * Emits selected month in year view.
           * This doesn't imply a change on the selected date.
           */
        this.monthSelected = new core_1.EventEmitter();
        /** Emits when the datepicker has been opened. */
        this.openedStream = new core_1.EventEmitter();
        /** Emits when the datepicker has been closed. */
        this.closedStream = new core_1.EventEmitter();
        this._opened = false;
        /** The id for the datepicker calendar. */
        this.id = "mat-datepicker-" + datepickerUid++;
        this._validSelected = null;
        /** The element that was focused before the datepicker was opened. */
        this._focusedElementBeforeOpen = null;
        /** Subscription to value changes in the associated input element. */
        this._inputSubscription = rxjs_1.Subscription.EMPTY;
        /** Emits when the datepicker is disabled. */
        this._disabledChange = new rxjs_1.Subject();
        /** Emits new selected date when selected date changes. */
        this._selectedChanged = new rxjs_1.Subject();
        if (!this._dateAdapter) {
            throw datepicker_errors_1.createMissingDateImplError('DateAdapter');
        }
    }
    Object.defineProperty(MatDatepicker.prototype, "startAt", {
        get: /** The date to open the calendar to initially. */
        function () {
            // If an explicit startAt is set we start there, otherwise we start at whatever the currently
            // selected value is.
            return this._startAt || (this._datepickerInput ? this._datepickerInput.value : null);
        },
        set: function (value) {
            this._startAt = this._getValidDateOrNull(this._dateAdapter.deserialize(value));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatDatepicker.prototype, "color", {
        get: /** Color palette to use on the datepicker's calendar. */
        function () {
            return this._color ||
                (this._datepickerInput ? this._datepickerInput._getThemePalette() : undefined);
        },
        set: function (value) {
            this._color = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatDatepicker.prototype, "touchUi", {
        get: /**
           * Whether the calendar UI is in touch mode. In touch mode the calendar opens in a dialog rather
           * than a popup and elements have more padding to allow for bigger touch targets.
           */
        function () { return this._touchUi; },
        set: function (value) {
            this._touchUi = coercion_1.coerceBooleanProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatDatepicker.prototype, "disabled", {
        get: /** Whether the datepicker pop-up should be disabled. */
        function () {
            return this._disabled === undefined && this._datepickerInput ?
                this._datepickerInput.disabled : !!this._disabled;
        },
        set: function (value) {
            var newValue = coercion_1.coerceBooleanProperty(value);
            if (newValue !== this._disabled) {
                this._disabled = newValue;
                this._disabledChange.next(newValue);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatDatepicker.prototype, "opened", {
        get: /** Whether the calendar is open. */
        function () { return this._opened; },
        set: function (value) { value ? this.open() : this.close(); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatDatepicker.prototype, "_selected", {
        /** The currently selected date. */
        get: /** The currently selected date. */
        function () { return this._validSelected; },
        set: function (value) { this._validSelected = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatDatepicker.prototype, "_minDate", {
        /** The minimum selectable date. */
        get: /** The minimum selectable date. */
        function () {
            return this._datepickerInput && this._datepickerInput.min;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatDatepicker.prototype, "_maxDate", {
        /** The maximum selectable date. */
        get: /** The maximum selectable date. */
        function () {
            return this._datepickerInput && this._datepickerInput.max;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatDatepicker.prototype, "_dateFilter", {
        get: function () {
            return this._datepickerInput && this._datepickerInput._dateFilter;
        },
        enumerable: true,
        configurable: true
    });
    MatDatepicker.prototype.ngOnDestroy = function () {
        this.close();
        this._inputSubscription.unsubscribe();
        this._disabledChange.complete();
        if (this._popupRef) {
            this._popupRef.dispose();
            this._popupComponentRef = null;
        }
    };
    /** Selects the given date */
    /** Selects the given date */
    MatDatepicker.prototype.select = /** Selects the given date */
    function (date) {
        var oldValue = this._selected;
        this._selected = date;
        if (!this._dateAdapter.sameDate(oldValue, this._selected)) {
            this._selectedChanged.next(date);
        }
    };
    /** Emits the selected year in multiyear view */
    /** Emits the selected year in multiyear view */
    MatDatepicker.prototype._selectYear = /** Emits the selected year in multiyear view */
    function (normalizedYear) {
        this.yearSelected.emit(normalizedYear);
    };
    /** Emits selected month in year view */
    /** Emits selected month in year view */
    MatDatepicker.prototype._selectMonth = /** Emits selected month in year view */
    function (normalizedMonth) {
        this.monthSelected.emit(normalizedMonth);
    };
    /**
     * Register an input with this datepicker.
     * @param input The datepicker input to register with this datepicker.
     */
    /**
       * Register an input with this datepicker.
       * @param input The datepicker input to register with this datepicker.
       */
    MatDatepicker.prototype._registerInput = /**
       * Register an input with this datepicker.
       * @param input The datepicker input to register with this datepicker.
       */
    function (input) {
        var _this = this;
        if (this._datepickerInput) {
            throw Error('A MatDatepicker can only be associated with a single input.');
        }
        this._datepickerInput = input;
        this._inputSubscription =
            this._datepickerInput._valueChange.subscribe(function (value) { return _this._selected = value; });
    };
    /** Open the calendar. */
    /** Open the calendar. */
    MatDatepicker.prototype.open = /** Open the calendar. */
    function () {
        if (this._opened || this.disabled) {
            return;
        }
        if (!this._datepickerInput) {
            throw Error('Attempted to open an MatDatepicker with no associated input.');
        }
        if (this._document) {
            this._focusedElementBeforeOpen = this._document.activeElement;
        }
        this.touchUi ? this._openAsDialog() : this._openAsPopup();
        this._opened = true;
        this.openedStream.emit();
    };
    /** Close the calendar. */
    /** Close the calendar. */
    MatDatepicker.prototype.close = /** Close the calendar. */
    function () {
        var _this = this;
        if (!this._opened) {
            return;
        }
        if (this._popupRef && this._popupRef.hasAttached()) {
            this._popupRef.detach();
        }
        if (this._dialogRef) {
            this._dialogRef.close();
            this._dialogRef = null;
        }
        if (this._calendarPortal && this._calendarPortal.isAttached) {
            this._calendarPortal.detach();
        }
        var completeClose = function () {
            // The `_opened` could've been reset already if
            // we got two events in quick succession.
            if (_this._opened) {
                _this._opened = false;
                _this.closedStream.emit();
                _this._focusedElementBeforeOpen = null;
            }
        };
        if (this._focusedElementBeforeOpen &&
            typeof this._focusedElementBeforeOpen.focus === 'function') {
            // Because IE moves focus asynchronously, we can't count on it being restored before we've
            // marked the datepicker as closed. If the event fires out of sequence and the element that
            // we're refocusing opens the datepicker on focus, the user could be stuck with not being
            // able to close the calendar at all. We work around it by making the logic, that marks
            // the datepicker as closed, async as well.
            this._focusedElementBeforeOpen.focus();
            setTimeout(completeClose);
        }
        else {
            completeClose();
        }
    };
    /** Open the calendar as a dialog. */
    /** Open the calendar as a dialog. */
    MatDatepicker.prototype._openAsDialog = /** Open the calendar as a dialog. */
    function () {
        var _this = this;
        this._dialogRef = this._dialog.open(MatDatepickerContent, {
            direction: this._dir ? this._dir.value : 'ltr',
            viewContainerRef: this._viewContainerRef,
            panelClass: 'mat-datepicker-dialog',
        });
        this._dialogRef.afterClosed().subscribe(function () { return _this.close(); });
        this._dialogRef.componentInstance.datepicker = this;
        this._setColor();
    };
    /** Open the calendar as a popup. */
    /** Open the calendar as a popup. */
    MatDatepicker.prototype._openAsPopup = /** Open the calendar as a popup. */
    function () {
        var _this = this;
        if (!this._calendarPortal) {
            this._calendarPortal = new portal_1.ComponentPortal(MatDatepickerContent, this._viewContainerRef);
        }
        if (!this._popupRef) {
            this._createPopup();
        }
        if (!this._popupRef.hasAttached()) {
            this._popupComponentRef = this._popupRef.attach(this._calendarPortal);
            this._popupComponentRef.instance.datepicker = this;
            this._setColor();
            // Update the position once the calendar has rendered.
            this._ngZone.onStable.asObservable().pipe(operators_1.take(1)).subscribe(function () {
                _this._popupRef.updatePosition();
            });
        }
    };
    /** Create the popup. */
    /** Create the popup. */
    MatDatepicker.prototype._createPopup = /** Create the popup. */
    function () {
        var _this = this;
        var overlayConfig = new overlay_1.OverlayConfig({
            positionStrategy: this._createPopupPositionStrategy(),
            hasBackdrop: true,
            backdropClass: 'mat-overlay-transparent-backdrop',
            direction: this._dir,
            scrollStrategy: this._scrollStrategy(),
            panelClass: 'mat-datepicker-popup',
        });
        this._popupRef = this._overlay.create(overlayConfig);
        this._popupRef.overlayElement.setAttribute('role', 'dialog');
        rxjs_1.merge(this._popupRef.backdropClick(), this._popupRef.detachments(), this._popupRef.keydownEvents().pipe(operators_1.filter(function (event) {
            // Closing on alt + up is only valid when there's an input associated with the datepicker.
            return event.keyCode === keycodes_1.ESCAPE ||
                (_this._datepickerInput && event.altKey && event.keyCode === keycodes_1.UP_ARROW);
        }))).subscribe(function () { return _this.close(); });
    };
    /** Create the popup PositionStrategy. */
    /** Create the popup PositionStrategy. */
    MatDatepicker.prototype._createPopupPositionStrategy = /** Create the popup PositionStrategy. */
    function () {
        return this._overlay.position()
            .flexibleConnectedTo(this._datepickerInput.getConnectedOverlayOrigin())
            .withTransformOriginOn('.mat-datepicker-content')
            .withFlexibleDimensions(false)
            .withViewportMargin(8)
            .withPush(false)
            .withPositions([
            {
                originX: 'start',
                originY: 'bottom',
                overlayX: 'start',
                overlayY: 'top'
            },
            {
                originX: 'start',
                originY: 'top',
                overlayX: 'start',
                overlayY: 'bottom'
            },
            {
                originX: 'end',
                originY: 'bottom',
                overlayX: 'end',
                overlayY: 'top'
            },
            {
                originX: 'end',
                originY: 'top',
                overlayX: 'end',
                overlayY: 'bottom'
            }
        ]);
    };
    /**
     * @param obj The object to check.
     * @returns The given object if it is both a date instance and valid, otherwise null.
     */
    /**
       * @param obj The object to check.
       * @returns The given object if it is both a date instance and valid, otherwise null.
       */
    MatDatepicker.prototype._getValidDateOrNull = /**
       * @param obj The object to check.
       * @returns The given object if it is both a date instance and valid, otherwise null.
       */
    function (obj) {
        return (this._dateAdapter.isDateInstance(obj) && this._dateAdapter.isValid(obj)) ? obj : null;
    };
    /** Passes the current theme color along to the calendar overlay. */
    /** Passes the current theme color along to the calendar overlay. */
    MatDatepicker.prototype._setColor = /** Passes the current theme color along to the calendar overlay. */
    function () {
        var color = this.color;
        if (this._popupComponentRef) {
            this._popupComponentRef.instance.color = color;
        }
        if (this._dialogRef) {
            this._dialogRef.componentInstance.color = color;
        }
    };
    MatDatepicker.decorators = [
        { type: core_1.Component, args: [{selector: 'mat-datepicker',
                    template: '',
                    exportAs: 'matDatepicker',
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    encapsulation: core_1.ViewEncapsulation.None,
                },] },
    ];
    /** @nocollapse */
    MatDatepicker.ctorParameters = function () { return [
        { type: dialog_1.MatDialog, },
        { type: overlay_1.Overlay, },
        { type: core_1.NgZone, },
        { type: core_1.ViewContainerRef, },
        { type: undefined, decorators: [{ type: core_1.Inject, args: [exports.MAT_DATEPICKER_SCROLL_STRATEGY,] },] },
        { type: core_2.DateAdapter, decorators: [{ type: core_1.Optional },] },
        { type: bidi_1.Directionality, decorators: [{ type: core_1.Optional },] },
        { type: undefined, decorators: [{ type: core_1.Optional }, { type: core_1.Inject, args: [common_1.DOCUMENT,] },] },
    ]; };
    MatDatepicker.propDecorators = {
        "calendarHeaderComponent": [{ type: core_1.Input },],
        "startAt": [{ type: core_1.Input },],
        "startView": [{ type: core_1.Input },],
        "color": [{ type: core_1.Input },],
        "touchUi": [{ type: core_1.Input },],
        "disabled": [{ type: core_1.Input },],
        "yearSelected": [{ type: core_1.Output },],
        "monthSelected": [{ type: core_1.Output },],
        "panelClass": [{ type: core_1.Input },],
        "openedStream": [{ type: core_1.Output, args: ['opened',] },],
        "closedStream": [{ type: core_1.Output, args: ['closed',] },],
        "opened": [{ type: core_1.Input },],
    };
    return MatDatepicker;
}());
exports.MatDatepicker = MatDatepicker;
//# sourceMappingURL=datepicker.js.map