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
var coercion_1 = require("@angular/cdk/coercion");
var table_1 = require("@angular/cdk/table");
var core_1 = require("@angular/core");
var core_2 = require("@angular/material/core");
var rxjs_1 = require("rxjs");
var sort_1 = require("./sort");
var sort_animations_1 = require("./sort-animations");
var sort_errors_1 = require("./sort-errors");
var sort_header_intl_1 = require("./sort-header-intl");
// Boilerplate for applying mixins to the sort header.
/** @docs-private */
var 
// Boilerplate for applying mixins to the sort header.
/** @docs-private */
MatSortHeaderBase = /** @class */ (function () {
    function MatSortHeaderBase() {
    }
    return MatSortHeaderBase;
}());
exports.MatSortHeaderBase = MatSortHeaderBase;
exports._MatSortHeaderMixinBase = core_2.mixinDisabled(MatSortHeaderBase);
/**
 * Applies sorting behavior (click to change sort) and styles to an element, including an
 * arrow to display the current sort direction.
 *
 * Must be provided with an id and contained within a parent MatSort directive.
 *
 * If used on header cells in a CdkTable, it will automatically default its id from its containing
 * column definition.
 */
var MatSortHeader = /** @class */ (function (_super) {
    __extends(MatSortHeader, _super);
    function MatSortHeader(_intl, changeDetectorRef, _sort, _cdkColumnDef) {
        var _this = _super.call(this) || this;
        _this._intl = _intl;
        _this._sort = _sort;
        _this._cdkColumnDef = _cdkColumnDef;
        /**
           * Flag set to true when the indicator should be displayed while the sort is not active. Used to
           * provide an affordance that the header is sortable by showing on focus and hover.
           */
        _this._showIndicatorHint = false;
        /** The direction the arrow should be facing according to the current state. */
        _this._arrowDirection = '';
        /**
           * Whether the view state animation should show the transition between the `from` and `to` states.
           */
        _this._disableViewStateAnimation = false;
        /** Sets the position of the arrow that displays when sorted. */
        _this.arrowPosition = 'after';
        if (!_sort) {
            throw sort_errors_1.getSortHeaderNotContainedWithinSortError();
        }
        _this._rerenderSubscription = rxjs_1.merge(_sort.sortChange, _sort._stateChanges, _intl.changes)
            .subscribe(function () {
            if (_this._isSorted()) {
                _this._updateArrowDirection();
            }
            // If this header was recently active and now no longer sorted, animate away the arrow.
            if (!_this._isSorted() && _this._viewState && _this._viewState.toState === 'active') {
                _this._disableViewStateAnimation = false;
                _this._setAnimationTransitionState({ fromState: 'active', toState: _this._arrowDirection });
            }
            changeDetectorRef.markForCheck();
        });
        return _this;
    }
    Object.defineProperty(MatSortHeader.prototype, "disableClear", {
        get: /** Overrides the disable clear value of the containing MatSort for this MatSortable. */
        function () { return this._disableClear; },
        set: function (v) { this._disableClear = coercion_1.coerceBooleanProperty(v); },
        enumerable: true,
        configurable: true
    });
    MatSortHeader.prototype.ngOnInit = function () {
        if (!this.id && this._cdkColumnDef) {
            this.id = this._cdkColumnDef.name;
        }
        // Initialize the direction of the arrow and set the view state to be immediately that state.
        this._updateArrowDirection();
        this._setAnimationTransitionState({ toState: this._isSorted() ? 'active' : this._arrowDirection });
        this._sort.register(this);
    };
    MatSortHeader.prototype.ngOnDestroy = function () {
        this._sort.deregister(this);
        this._rerenderSubscription.unsubscribe();
    };
    /**
     * Sets the "hint" state such that the arrow will be semi-transparently displayed as a hint to the
     * user showing what the active sort will become. If set to false, the arrow will fade away.
     */
    /**
       * Sets the "hint" state such that the arrow will be semi-transparently displayed as a hint to the
       * user showing what the active sort will become. If set to false, the arrow will fade away.
       */
    MatSortHeader.prototype._setIndicatorHintVisible = /**
       * Sets the "hint" state such that the arrow will be semi-transparently displayed as a hint to the
       * user showing what the active sort will become. If set to false, the arrow will fade away.
       */
    function (visible) {
        // No-op if the sort header is disabled - should not make the hint visible.
        if (this._isDisabled() && visible) {
            return;
        }
        this._showIndicatorHint = visible;
        if (!this._isSorted()) {
            this._updateArrowDirection();
            if (this._showIndicatorHint) {
                this._setAnimationTransitionState({ fromState: this._arrowDirection, toState: 'hint' });
            }
            else {
                this._setAnimationTransitionState({ fromState: 'hint', toState: this._arrowDirection });
            }
        }
    };
    /**
     * Sets the animation transition view state for the arrow's position and opacity. If the
     * `disableViewStateAnimation` flag is set to true, the `fromState` will be ignored so that
     * no animation appears.
     */
    /**
       * Sets the animation transition view state for the arrow's position and opacity. If the
       * `disableViewStateAnimation` flag is set to true, the `fromState` will be ignored so that
       * no animation appears.
       */
    MatSortHeader.prototype._setAnimationTransitionState = /**
       * Sets the animation transition view state for the arrow's position and opacity. If the
       * `disableViewStateAnimation` flag is set to true, the `fromState` will be ignored so that
       * no animation appears.
       */
    function (viewState) {
        this._viewState = viewState;
        // If the animation for arrow position state (opacity/translation) should be disabled,
        // remove the fromState so that it jumps right to the toState.
        if (this._disableViewStateAnimation) {
            this._viewState = { toState: viewState.toState };
        }
    };
    /** Triggers the sort on this sort header and removes the indicator hint. */
    /** Triggers the sort on this sort header and removes the indicator hint. */
    MatSortHeader.prototype._handleClick = /** Triggers the sort on this sort header and removes the indicator hint. */
    function () {
        if (this._isDisabled()) {
            return;
        }
        this._sort.sort(this);
        // Do not show the animation if the header was already shown in the right position.
        if (this._viewState.toState === 'hint' || this._viewState.toState === 'active') {
            this._disableViewStateAnimation = true;
        }
        // If the arrow is now sorted, animate the arrow into place. Otherwise, animate it away into
        // the direction it is facing.
        var viewState = this._isSorted() ?
            { fromState: this._arrowDirection, toState: 'active' } :
            { fromState: 'active', toState: this._arrowDirection };
        this._setAnimationTransitionState(viewState);
        this._showIndicatorHint = false;
    };
    /** Whether this MatSortHeader is currently sorted in either ascending or descending order. */
    /** Whether this MatSortHeader is currently sorted in either ascending or descending order. */
    MatSortHeader.prototype._isSorted = /** Whether this MatSortHeader is currently sorted in either ascending or descending order. */
    function () {
        return this._sort.active == this.id &&
            (this._sort.direction === 'asc' || this._sort.direction === 'desc');
    };
    /** Returns the animation state for the arrow direction (indicator and pointers). */
    /** Returns the animation state for the arrow direction (indicator and pointers). */
    MatSortHeader.prototype._getArrowDirectionState = /** Returns the animation state for the arrow direction (indicator and pointers). */
    function () {
        return "" + (this._isSorted() ? 'active-' : '') + this._arrowDirection;
    };
    /** Returns the arrow position state (opacity, translation). */
    /** Returns the arrow position state (opacity, translation). */
    MatSortHeader.prototype._getArrowViewState = /** Returns the arrow position state (opacity, translation). */
    function () {
        var fromState = this._viewState.fromState;
        return (fromState ? fromState + "-to-" : '') + this._viewState.toState;
    };
    /**
     * Updates the direction the arrow should be pointing. If it is not sorted, the arrow should be
     * facing the start direction. Otherwise if it is sorted, the arrow should point in the currently
     * active sorted direction. The reason this is updated through a function is because the direction
     * should only be changed at specific times - when deactivated but the hint is displayed and when
     * the sort is active and the direction changes. Otherwise the arrow's direction should linger
     * in cases such as the sort becoming deactivated but we want to animate the arrow away while
     * preserving its direction, even though the next sort direction is actually different and should
     * only be changed once the arrow displays again (hint or activation).
     */
    /**
       * Updates the direction the arrow should be pointing. If it is not sorted, the arrow should be
       * facing the start direction. Otherwise if it is sorted, the arrow should point in the currently
       * active sorted direction. The reason this is updated through a function is because the direction
       * should only be changed at specific times - when deactivated but the hint is displayed and when
       * the sort is active and the direction changes. Otherwise the arrow's direction should linger
       * in cases such as the sort becoming deactivated but we want to animate the arrow away while
       * preserving its direction, even though the next sort direction is actually different and should
       * only be changed once the arrow displays again (hint or activation).
       */
    MatSortHeader.prototype._updateArrowDirection = /**
       * Updates the direction the arrow should be pointing. If it is not sorted, the arrow should be
       * facing the start direction. Otherwise if it is sorted, the arrow should point in the currently
       * active sorted direction. The reason this is updated through a function is because the direction
       * should only be changed at specific times - when deactivated but the hint is displayed and when
       * the sort is active and the direction changes. Otherwise the arrow's direction should linger
       * in cases such as the sort becoming deactivated but we want to animate the arrow away while
       * preserving its direction, even though the next sort direction is actually different and should
       * only be changed once the arrow displays again (hint or activation).
       */
    function () {
        this._arrowDirection = this._isSorted() ?
            this._sort.direction :
            (this.start || this._sort.start);
    };
    MatSortHeader.prototype._isDisabled = function () {
        return this._sort.disabled || this.disabled;
    };
    /**
     * Gets the aria-sort attribute that should be applied to this sort header. If this header
     * is not sorted, returns null so that the attribute is removed from the host element. Aria spec
     * says that the aria-sort property should only be present on one header at a time, so removing
     * ensures this is true.
     */
    /**
       * Gets the aria-sort attribute that should be applied to this sort header. If this header
       * is not sorted, returns null so that the attribute is removed from the host element. Aria spec
       * says that the aria-sort property should only be present on one header at a time, so removing
       * ensures this is true.
       */
    MatSortHeader.prototype._getAriaSortAttribute = /**
       * Gets the aria-sort attribute that should be applied to this sort header. If this header
       * is not sorted, returns null so that the attribute is removed from the host element. Aria spec
       * says that the aria-sort property should only be present on one header at a time, so removing
       * ensures this is true.
       */
    function () {
        if (!this._isSorted()) {
            return null;
        }
        return this._sort.direction == 'asc' ? 'ascending' : 'descending';
    };
    MatSortHeader.decorators = [
        { type: core_1.Component, args: [{selector: '[mat-sort-header]',
                    exportAs: 'matSortHeader',
                    template: "<div class=\"mat-sort-header-container\" [class.mat-sort-header-sorted]=\"_isSorted()\" [class.mat-sort-header-position-before]=\"arrowPosition == 'before'\"><button class=\"mat-sort-header-button\" type=\"button\" [attr.disabled]=\"_isDisabled() || null\" [attr.aria-label]=\"_intl.sortButtonLabel(id)\" (focus)=\"_setIndicatorHintVisible(true)\" (blur)=\"_setIndicatorHintVisible(false)\"><ng-content></ng-content></button><div class=\"mat-sort-header-arrow\" [@arrowOpacity]=\"_getArrowViewState()\" [@arrowPosition]=\"_getArrowViewState()\" [@allowChildren]=\"_getArrowDirectionState()\" (@arrowPosition.start)=\"_disableViewStateAnimation = true\" (@arrowPosition.done)=\"_disableViewStateAnimation = false\"><div class=\"mat-sort-header-stem\"></div><div class=\"mat-sort-header-indicator\" [@indicator]=\"_getArrowDirectionState()\"><div class=\"mat-sort-header-pointer-left\" [@leftPointer]=\"_getArrowDirectionState()\"></div><div class=\"mat-sort-header-pointer-right\" [@rightPointer]=\"_getArrowDirectionState()\"></div><div class=\"mat-sort-header-pointer-middle\"></div></div></div></div>",
                    styles: [".mat-sort-header-container{display:flex;cursor:pointer;align-items:center}.mat-sort-header-disabled .mat-sort-header-container{cursor:default}.mat-sort-header-position-before{flex-direction:row-reverse}.mat-sort-header-button{border:none;background:0 0;display:flex;align-items:center;padding:0;cursor:inherit;outline:0;font:inherit;color:currentColor}.mat-sort-header-arrow{height:12px;width:12px;min-width:12px;position:relative;display:flex;opacity:0}.mat-sort-header-arrow,[dir=rtl] .mat-sort-header-position-before .mat-sort-header-arrow{margin:0 0 0 6px}.mat-sort-header-position-before .mat-sort-header-arrow,[dir=rtl] .mat-sort-header-arrow{margin:0 6px 0 0}.mat-sort-header-stem{background:currentColor;height:10px;width:2px;margin:auto;display:flex;align-items:center}@media screen and (-ms-high-contrast:active){.mat-sort-header-stem{width:0;border-left:solid 2px}}.mat-sort-header-indicator{width:100%;height:2px;display:flex;align-items:center;position:absolute;top:0;left:0}.mat-sort-header-pointer-middle{margin:auto;height:2px;width:2px;background:currentColor;transform:rotate(45deg)}@media screen and (-ms-high-contrast:active){.mat-sort-header-pointer-middle{width:0;height:0;border-top:solid 2px;border-left:solid 2px}}.mat-sort-header-pointer-left,.mat-sort-header-pointer-right{background:currentColor;width:6px;height:2px;position:absolute;top:0}@media screen and (-ms-high-contrast:active){.mat-sort-header-pointer-left,.mat-sort-header-pointer-right{width:0;height:0;border-left:solid 6px;border-top:solid 2px}}.mat-sort-header-pointer-left{transform-origin:right;left:0}.mat-sort-header-pointer-right{transform-origin:left;right:0}"],
                    host: {
                        '(click)': '_handleClick()',
                        '(mouseenter)': '_setIndicatorHintVisible(true)',
                        '(longpress)': '_setIndicatorHintVisible(true)',
                        '(mouseleave)': '_setIndicatorHintVisible(false)',
                        '[attr.aria-sort]': '_getAriaSortAttribute()',
                        '[class.mat-sort-header-disabled]': '_isDisabled()',
                    },
                    encapsulation: core_1.ViewEncapsulation.None,
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    inputs: ['disabled'],
                    animations: [
                        sort_animations_1.matSortAnimations.indicator,
                        sort_animations_1.matSortAnimations.leftPointer,
                        sort_animations_1.matSortAnimations.rightPointer,
                        sort_animations_1.matSortAnimations.arrowOpacity,
                        sort_animations_1.matSortAnimations.arrowPosition,
                        sort_animations_1.matSortAnimations.allowChildren,
                    ]
                },] },
    ];
    /** @nocollapse */
    MatSortHeader.ctorParameters = function () { return [
        { type: sort_header_intl_1.MatSortHeaderIntl, },
        { type: core_1.ChangeDetectorRef, },
        { type: sort_1.MatSort, decorators: [{ type: core_1.Optional },] },
        { type: table_1.CdkColumnDef, decorators: [{ type: core_1.Optional },] },
    ]; };
    MatSortHeader.propDecorators = {
        "id": [{ type: core_1.Input, args: ['mat-sort-header',] },],
        "arrowPosition": [{ type: core_1.Input },],
        "start": [{ type: core_1.Input },],
        "disableClear": [{ type: core_1.Input },],
    };
    return MatSortHeader;
}(exports._MatSortHeaderMixinBase));
exports.MatSortHeader = MatSortHeader;
//# sourceMappingURL=sort-header.js.map