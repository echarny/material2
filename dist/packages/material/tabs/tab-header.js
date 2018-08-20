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
var scrolling_1 = require("@angular/cdk/scrolling");
var core_1 = require("@angular/core");
var core_2 = require("@angular/material/core");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var ink_bar_1 = require("./ink-bar");
var tab_label_wrapper_1 = require("./tab-label-wrapper");
var a11y_1 = require("@angular/cdk/a11y");
/**
 * The distance in pixels that will be overshot when scrolling a tab label into view. This helps
 * provide a small affordance to the label next to it.
 */
var EXAGGERATED_OVERSCROLL = 60;
// Boilerplate for applying mixins to MatTabHeader.
/** @docs-private */
var 
// Boilerplate for applying mixins to MatTabHeader.
/** @docs-private */
MatTabHeaderBase = /** @class */ (function () {
    function MatTabHeaderBase() {
    }
    return MatTabHeaderBase;
}());
exports.MatTabHeaderBase = MatTabHeaderBase;
exports._MatTabHeaderMixinBase = core_2.mixinDisableRipple(MatTabHeaderBase);
/**
 * The header of the tab group which displays a list of all the tabs in the tab group. Includes
 * an ink bar that follows the currently selected tab. When the tabs list's width exceeds the
 * width of the header container, then arrows will be displayed to allow the user to scroll
 * left and right across the header.
 * @docs-private
 */
var MatTabHeader = /** @class */ (function (_super) {
    __extends(MatTabHeader, _super);
    function MatTabHeader(_elementRef, _changeDetectorRef, _viewportRuler, _dir) {
        var _this = _super.call(this) || this;
        _this._elementRef = _elementRef;
        _this._changeDetectorRef = _changeDetectorRef;
        _this._viewportRuler = _viewportRuler;
        _this._dir = _dir;
        /** The distance in pixels that the tab labels should be translated to the left. */
        _this._scrollDistance = 0;
        /** Whether the header should scroll to the selected index after the view has been checked. */
        _this._selectedIndexChanged = false;
        /** Emits when the component is destroyed. */
        _this._destroyed = new rxjs_1.Subject();
        /** Whether the controls for pagination should be displayed */
        _this._showPaginationControls = false;
        /** Whether the tab list can be scrolled more towards the end of the tab label list. */
        _this._disableScrollAfter = true;
        /** Whether the tab list can be scrolled more towards the beginning of the tab label list. */
        _this._disableScrollBefore = true;
        _this._selectedIndex = 0;
        /** Event emitted when the option is selected. */
        _this.selectFocusedIndex = new core_1.EventEmitter();
        /** Event emitted when a label is focused. */
        _this.indexFocused = new core_1.EventEmitter();
        return _this;
    }
    Object.defineProperty(MatTabHeader.prototype, "selectedIndex", {
        get: /** The index of the active tab. */
        function () { return this._selectedIndex; },
        set: function (value) {
            value = coercion_1.coerceNumberProperty(value);
            this._selectedIndexChanged = this._selectedIndex != value;
            this._selectedIndex = value;
            if (this._keyManager) {
                this._keyManager.updateActiveItemIndex(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    MatTabHeader.prototype.ngAfterContentChecked = function () {
        // If the number of tab labels have changed, check if scrolling should be enabled
        if (this._tabLabelCount != this._labelWrappers.length) {
            this._updatePagination();
            this._tabLabelCount = this._labelWrappers.length;
            this._changeDetectorRef.markForCheck();
        }
        // If the selected index has changed, scroll to the label and check if the scrolling controls
        // should be disabled.
        if (this._selectedIndexChanged) {
            this._scrollToLabel(this._selectedIndex);
            this._checkScrollingControls();
            this._alignInkBarToSelectedTab();
            this._selectedIndexChanged = false;
            this._changeDetectorRef.markForCheck();
        }
        // If the scroll distance has been changed (tab selected, focused, scroll controls activated),
        // then translate the header to reflect this.
        if (this._scrollDistanceChanged) {
            this._updateTabScrollPosition();
            this._scrollDistanceChanged = false;
            this._changeDetectorRef.markForCheck();
        }
    };
    MatTabHeader.prototype._handleKeydown = function (event) {
        switch (event.keyCode) {
            case keycodes_1.HOME:
                this._keyManager.setFirstItemActive();
                event.preventDefault();
                break;
            case keycodes_1.END:
                this._keyManager.setLastItemActive();
                event.preventDefault();
                break;
            case keycodes_1.ENTER:
            case keycodes_1.SPACE:
                this.selectFocusedIndex.emit(this.focusIndex);
                event.preventDefault();
                break;
            default:
                this._keyManager.onKeydown(event);
        }
    };
    /**
     * Aligns the ink bar to the selected tab on load.
     */
    /**
       * Aligns the ink bar to the selected tab on load.
       */
    MatTabHeader.prototype.ngAfterContentInit = /**
       * Aligns the ink bar to the selected tab on load.
       */
    function () {
        var _this = this;
        var dirChange = this._dir ? this._dir.change : rxjs_1.of(null);
        var resize = this._viewportRuler.change(150);
        var realign = function () {
            _this._updatePagination();
            _this._alignInkBarToSelectedTab();
        };
        this._keyManager = new a11y_1.FocusKeyManager(this._labelWrappers)
            .withHorizontalOrientation(this._getLayoutDirection())
            .withWrap();
        this._keyManager.updateActiveItem(0);
        // Defer the first call in order to allow for slower browsers to lay out the elements.
        // This helps in cases where the user lands directly on a page with paginated tabs.
        typeof requestAnimationFrame !== 'undefined' ? requestAnimationFrame(realign) : realign();
        // On dir change or window resize, realign the ink bar and update the orientation of
        // the key manager if the direction has changed.
        // On dir change or window resize, realign the ink bar and update the orientation of
        // the key manager if the direction has changed.
        rxjs_1.merge(dirChange, resize).pipe(operators_1.takeUntil(this._destroyed)).subscribe(function () {
            realign();
            _this._keyManager.withHorizontalOrientation(_this._getLayoutDirection());
        });
        // If there is a change in the focus key manager we need to emit the `indexFocused`
        // event in order to provide a public event that notifies about focus changes. Also we realign
        // the tabs container by scrolling the new focused tab into the visible section.
        this._keyManager.change.pipe(operators_1.takeUntil(this._destroyed)).subscribe(function (newFocusIndex) {
            _this.indexFocused.emit(newFocusIndex);
            _this._setTabFocus(newFocusIndex);
        });
    };
    MatTabHeader.prototype.ngOnDestroy = function () {
        this._destroyed.next();
        this._destroyed.complete();
    };
    /**
     * Callback for when the MutationObserver detects that the content has changed.
     */
    /**
       * Callback for when the MutationObserver detects that the content has changed.
       */
    MatTabHeader.prototype._onContentChanges = /**
       * Callback for when the MutationObserver detects that the content has changed.
       */
    function () {
        this._updatePagination();
        this._alignInkBarToSelectedTab();
        this._changeDetectorRef.markForCheck();
    };
    /**
     * Updating the view whether pagination should be enabled or not
     */
    /**
       * Updating the view whether pagination should be enabled or not
       */
    MatTabHeader.prototype._updatePagination = /**
       * Updating the view whether pagination should be enabled or not
       */
    function () {
        this._checkPaginationEnabled();
        this._checkScrollingControls();
        this._updateTabScrollPosition();
    };
    Object.defineProperty(MatTabHeader.prototype, "focusIndex", {
        /** Tracks which element has focus; used for keyboard navigation */
        get: /** Tracks which element has focus; used for keyboard navigation */
        function () {
            return this._keyManager ? this._keyManager.activeItemIndex : 0;
        },
        /** When the focus index is set, we must manually send focus to the correct label */
        set: /** When the focus index is set, we must manually send focus to the correct label */
        function (value) {
            if (!this._isValidIndex(value) || this.focusIndex === value || !this._keyManager) {
                return;
            }
            this._keyManager.setActiveItem(value);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Determines if an index is valid.  If the tabs are not ready yet, we assume that the user is
     * providing a valid index and return true.
     */
    /**
       * Determines if an index is valid.  If the tabs are not ready yet, we assume that the user is
       * providing a valid index and return true.
       */
    MatTabHeader.prototype._isValidIndex = /**
       * Determines if an index is valid.  If the tabs are not ready yet, we assume that the user is
       * providing a valid index and return true.
       */
    function (index) {
        if (!this._labelWrappers) {
            return true;
        }
        var tab = this._labelWrappers ? this._labelWrappers.toArray()[index] : null;
        return !!tab && !tab.disabled;
    };
    /**
     * Sets focus on the HTML element for the label wrapper and scrolls it into the view if
     * scrolling is enabled.
     */
    /**
       * Sets focus on the HTML element for the label wrapper and scrolls it into the view if
       * scrolling is enabled.
       */
    MatTabHeader.prototype._setTabFocus = /**
       * Sets focus on the HTML element for the label wrapper and scrolls it into the view if
       * scrolling is enabled.
       */
    function (tabIndex) {
        if (this._showPaginationControls) {
            this._scrollToLabel(tabIndex);
        }
        if (this._labelWrappers && this._labelWrappers.length) {
            this._labelWrappers.toArray()[tabIndex].focus();
            // Do not let the browser manage scrolling to focus the element, this will be handled
            // by using translation. In LTR, the scroll left should be 0. In RTL, the scroll width
            // should be the full width minus the offset width.
            var containerEl = this._tabListContainer.nativeElement;
            var dir = this._getLayoutDirection();
            if (dir == 'ltr') {
                containerEl.scrollLeft = 0;
            }
            else {
                containerEl.scrollLeft = containerEl.scrollWidth - containerEl.offsetWidth;
            }
        }
    };
    /** The layout direction of the containing app. */
    /** The layout direction of the containing app. */
    MatTabHeader.prototype._getLayoutDirection = /** The layout direction of the containing app. */
    function () {
        return this._dir && this._dir.value === 'rtl' ? 'rtl' : 'ltr';
    };
    /** Performs the CSS transformation on the tab list that will cause the list to scroll. */
    /** Performs the CSS transformation on the tab list that will cause the list to scroll. */
    MatTabHeader.prototype._updateTabScrollPosition = /** Performs the CSS transformation on the tab list that will cause the list to scroll. */
    function () {
        var scrollDistance = this.scrollDistance;
        var translateX = this._getLayoutDirection() === 'ltr' ? -scrollDistance : scrollDistance;
        // Don't use `translate3d` here because we don't want to create a new layer. A new layer
        // seems to cause flickering and overflow in Internet Explorer. For example, the ink bar
        // and ripples will exceed the boundaries of the visible tab bar.
        // See: https://github.com/angular/material2/issues/10276
        this._tabList.nativeElement.style.transform = "translateX(" + translateX + "px)";
    };
    Object.defineProperty(MatTabHeader.prototype, "scrollDistance", {
        /** Sets the distance in pixels that the tab header should be transformed in the X-axis. */
        get: /** Sets the distance in pixels that the tab header should be transformed in the X-axis. */
        function () { return this._scrollDistance; },
        set: function (v) {
            this._scrollDistance = Math.max(0, Math.min(this._getMaxScrollDistance(), v));
            // Mark that the scroll distance has changed so that after the view is checked, the CSS
            // transformation can move the header.
            this._scrollDistanceChanged = true;
            this._checkScrollingControls();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Moves the tab list in the 'before' or 'after' direction (towards the beginning of the list or
     * the end of the list, respectively). The distance to scroll is computed to be a third of the
     * length of the tab list view window.
     *
     * This is an expensive call that forces a layout reflow to compute box and scroll metrics and
     * should be called sparingly.
     */
    /**
       * Moves the tab list in the 'before' or 'after' direction (towards the beginning of the list or
       * the end of the list, respectively). The distance to scroll is computed to be a third of the
       * length of the tab list view window.
       *
       * This is an expensive call that forces a layout reflow to compute box and scroll metrics and
       * should be called sparingly.
       */
    MatTabHeader.prototype._scrollHeader = /**
       * Moves the tab list in the 'before' or 'after' direction (towards the beginning of the list or
       * the end of the list, respectively). The distance to scroll is computed to be a third of the
       * length of the tab list view window.
       *
       * This is an expensive call that forces a layout reflow to compute box and scroll metrics and
       * should be called sparingly.
       */
    function (scrollDir) {
        var viewLength = this._tabListContainer.nativeElement.offsetWidth;
        // Move the scroll distance one-third the length of the tab list's viewport.
        this.scrollDistance += (scrollDir == 'before' ? -1 : 1) * viewLength / 3;
    };
    /**
     * Moves the tab list such that the desired tab label (marked by index) is moved into view.
     *
     * This is an expensive call that forces a layout reflow to compute box and scroll metrics and
     * should be called sparingly.
     */
    /**
       * Moves the tab list such that the desired tab label (marked by index) is moved into view.
       *
       * This is an expensive call that forces a layout reflow to compute box and scroll metrics and
       * should be called sparingly.
       */
    MatTabHeader.prototype._scrollToLabel = /**
       * Moves the tab list such that the desired tab label (marked by index) is moved into view.
       *
       * This is an expensive call that forces a layout reflow to compute box and scroll metrics and
       * should be called sparingly.
       */
    function (labelIndex) {
        var selectedLabel = this._labelWrappers ? this._labelWrappers.toArray()[labelIndex] : null;
        if (!selectedLabel) {
            return;
        }
        // The view length is the visible width of the tab labels.
        var viewLength = this._tabListContainer.nativeElement.offsetWidth;
        var labelBeforePos, labelAfterPos;
        if (this._getLayoutDirection() == 'ltr') {
            labelBeforePos = selectedLabel.getOffsetLeft();
            labelAfterPos = labelBeforePos + selectedLabel.getOffsetWidth();
        }
        else {
            labelAfterPos = this._tabList.nativeElement.offsetWidth - selectedLabel.getOffsetLeft();
            labelBeforePos = labelAfterPos - selectedLabel.getOffsetWidth();
        }
        var beforeVisiblePos = this.scrollDistance;
        var afterVisiblePos = this.scrollDistance + viewLength;
        if (labelBeforePos < beforeVisiblePos) {
            // Scroll header to move label to the before direction
            this.scrollDistance -= beforeVisiblePos - labelBeforePos + EXAGGERATED_OVERSCROLL;
        }
        else if (labelAfterPos > afterVisiblePos) {
            // Scroll header to move label to the after direction
            this.scrollDistance += labelAfterPos - afterVisiblePos + EXAGGERATED_OVERSCROLL;
        }
    };
    /**
     * Evaluate whether the pagination controls should be displayed. If the scroll width of the
     * tab list is wider than the size of the header container, then the pagination controls should
     * be shown.
     *
     * This is an expensive call that forces a layout reflow to compute box and scroll metrics and
     * should be called sparingly.
     */
    /**
       * Evaluate whether the pagination controls should be displayed. If the scroll width of the
       * tab list is wider than the size of the header container, then the pagination controls should
       * be shown.
       *
       * This is an expensive call that forces a layout reflow to compute box and scroll metrics and
       * should be called sparingly.
       */
    MatTabHeader.prototype._checkPaginationEnabled = /**
       * Evaluate whether the pagination controls should be displayed. If the scroll width of the
       * tab list is wider than the size of the header container, then the pagination controls should
       * be shown.
       *
       * This is an expensive call that forces a layout reflow to compute box and scroll metrics and
       * should be called sparingly.
       */
    function () {
        var isEnabled = this._tabList.nativeElement.scrollWidth > this._elementRef.nativeElement.offsetWidth;
        if (!isEnabled) {
            this.scrollDistance = 0;
        }
        if (isEnabled !== this._showPaginationControls) {
            this._changeDetectorRef.markForCheck();
        }
        this._showPaginationControls = isEnabled;
    };
    /**
     * Evaluate whether the before and after controls should be enabled or disabled.
     * If the header is at the beginning of the list (scroll distance is equal to 0) then disable the
     * before button. If the header is at the end of the list (scroll distance is equal to the
     * maximum distance we can scroll), then disable the after button.
     *
     * This is an expensive call that forces a layout reflow to compute box and scroll metrics and
     * should be called sparingly.
     */
    /**
       * Evaluate whether the before and after controls should be enabled or disabled.
       * If the header is at the beginning of the list (scroll distance is equal to 0) then disable the
       * before button. If the header is at the end of the list (scroll distance is equal to the
       * maximum distance we can scroll), then disable the after button.
       *
       * This is an expensive call that forces a layout reflow to compute box and scroll metrics and
       * should be called sparingly.
       */
    MatTabHeader.prototype._checkScrollingControls = /**
       * Evaluate whether the before and after controls should be enabled or disabled.
       * If the header is at the beginning of the list (scroll distance is equal to 0) then disable the
       * before button. If the header is at the end of the list (scroll distance is equal to the
       * maximum distance we can scroll), then disable the after button.
       *
       * This is an expensive call that forces a layout reflow to compute box and scroll metrics and
       * should be called sparingly.
       */
    function () {
        // Check if the pagination arrows should be activated.
        this._disableScrollBefore = this.scrollDistance == 0;
        this._disableScrollAfter = this.scrollDistance == this._getMaxScrollDistance();
        this._changeDetectorRef.markForCheck();
    };
    /**
     * Determines what is the maximum length in pixels that can be set for the scroll distance. This
     * is equal to the difference in width between the tab list container and tab header container.
     *
     * This is an expensive call that forces a layout reflow to compute box and scroll metrics and
     * should be called sparingly.
     */
    /**
       * Determines what is the maximum length in pixels that can be set for the scroll distance. This
       * is equal to the difference in width between the tab list container and tab header container.
       *
       * This is an expensive call that forces a layout reflow to compute box and scroll metrics and
       * should be called sparingly.
       */
    MatTabHeader.prototype._getMaxScrollDistance = /**
       * Determines what is the maximum length in pixels that can be set for the scroll distance. This
       * is equal to the difference in width between the tab list container and tab header container.
       *
       * This is an expensive call that forces a layout reflow to compute box and scroll metrics and
       * should be called sparingly.
       */
    function () {
        var lengthOfTabList = this._tabList.nativeElement.scrollWidth;
        var viewLength = this._tabListContainer.nativeElement.offsetWidth;
        return (lengthOfTabList - viewLength) || 0;
    };
    /** Tells the ink-bar to align itself to the current label wrapper */
    /** Tells the ink-bar to align itself to the current label wrapper */
    MatTabHeader.prototype._alignInkBarToSelectedTab = /** Tells the ink-bar to align itself to the current label wrapper */
    function () {
        var selectedLabelWrapper = this._labelWrappers && this._labelWrappers.length ?
            this._labelWrappers.toArray()[this.selectedIndex].elementRef.nativeElement :
            null;
        this._inkBar.alignToElement(selectedLabelWrapper);
    };
    MatTabHeader.decorators = [
        { type: core_1.Component, args: [{selector: 'mat-tab-header',
                    template: "<div class=\"mat-tab-header-pagination mat-tab-header-pagination-before mat-elevation-z4\" aria-hidden=\"true\" mat-ripple [matRippleDisabled]=\"_disableScrollBefore || disableRipple\" [class.mat-tab-header-pagination-disabled]=\"_disableScrollBefore\" (click)=\"_scrollHeader('before')\"><div class=\"mat-tab-header-pagination-chevron\"></div></div><div class=\"mat-tab-label-container\" #tabListContainer (keydown)=\"_handleKeydown($event)\"><div class=\"mat-tab-list\" #tabList role=\"tablist\" (cdkObserveContent)=\"_onContentChanges()\"><div class=\"mat-tab-labels\"><ng-content></ng-content></div><mat-ink-bar></mat-ink-bar></div></div><div class=\"mat-tab-header-pagination mat-tab-header-pagination-after mat-elevation-z4\" aria-hidden=\"true\" mat-ripple [matRippleDisabled]=\"_disableScrollAfter || disableRipple\" [class.mat-tab-header-pagination-disabled]=\"_disableScrollAfter\" (click)=\"_scrollHeader('after')\"><div class=\"mat-tab-header-pagination-chevron\"></div></div>",
                    styles: [".mat-tab-header{display:flex;overflow:hidden;position:relative;flex-shrink:0}.mat-tab-label{height:48px;padding:0 24px;cursor:pointer;box-sizing:border-box;opacity:.6;min-width:160px;text-align:center;display:inline-flex;justify-content:center;align-items:center;white-space:nowrap;position:relative}.mat-tab-label:focus{outline:0}.mat-tab-label:focus:not(.mat-tab-disabled){opacity:1}@media screen and (-ms-high-contrast:active){.mat-tab-label:focus{outline:dotted 2px}}.mat-tab-label.mat-tab-disabled{cursor:default}@media screen and (-ms-high-contrast:active){.mat-tab-label.mat-tab-disabled{opacity:.5}}.mat-tab-label .mat-tab-label-content{display:inline-flex;justify-content:center;align-items:center;white-space:nowrap}@media screen and (-ms-high-contrast:active){.mat-tab-label{opacity:1}}@media (max-width:599px){.mat-tab-label{min-width:72px}}.mat-ink-bar{position:absolute;bottom:0;height:2px;transition:.5s cubic-bezier(.35,0,.25,1)}.mat-tab-group-inverted-header .mat-ink-bar{bottom:auto;top:0}@media screen and (-ms-high-contrast:active){.mat-ink-bar{outline:solid 2px;height:0}}.mat-tab-header-pagination{position:relative;display:none;justify-content:center;align-items:center;min-width:32px;cursor:pointer;z-index:2}.mat-tab-header-pagination-controls-enabled .mat-tab-header-pagination{display:flex}.mat-tab-header-pagination-before,.mat-tab-header-rtl .mat-tab-header-pagination-after{padding-left:4px}.mat-tab-header-pagination-before .mat-tab-header-pagination-chevron,.mat-tab-header-rtl .mat-tab-header-pagination-after .mat-tab-header-pagination-chevron{transform:rotate(-135deg)}.mat-tab-header-pagination-after,.mat-tab-header-rtl .mat-tab-header-pagination-before{padding-right:4px}.mat-tab-header-pagination-after .mat-tab-header-pagination-chevron,.mat-tab-header-rtl .mat-tab-header-pagination-before .mat-tab-header-pagination-chevron{transform:rotate(45deg)}.mat-tab-header-pagination-chevron{border-style:solid;border-width:2px 2px 0 0;content:'';height:8px;width:8px}.mat-tab-header-pagination-disabled{box-shadow:none;cursor:default}.mat-tab-label-container{display:flex;flex-grow:1;overflow:hidden;z-index:1}.mat-tab-list{flex-grow:1;position:relative;transition:transform .5s cubic-bezier(.35,0,.25,1)}.mat-tab-labels{display:flex}"],
                    inputs: ['disableRipple'],
                    encapsulation: core_1.ViewEncapsulation.None,
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    host: {
                        'class': 'mat-tab-header',
                        '[class.mat-tab-header-pagination-controls-enabled]': '_showPaginationControls',
                        '[class.mat-tab-header-rtl]': "_getLayoutDirection() == 'rtl'",
                    },
                },] },
    ];
    /** @nocollapse */
    MatTabHeader.ctorParameters = function () { return [
        { type: core_1.ElementRef, },
        { type: core_1.ChangeDetectorRef, },
        { type: scrolling_1.ViewportRuler, },
        { type: bidi_1.Directionality, decorators: [{ type: core_1.Optional },] },
    ]; };
    MatTabHeader.propDecorators = {
        "_labelWrappers": [{ type: core_1.ContentChildren, args: [tab_label_wrapper_1.MatTabLabelWrapper,] },],
        "_inkBar": [{ type: core_1.ViewChild, args: [ink_bar_1.MatInkBar,] },],
        "_tabListContainer": [{ type: core_1.ViewChild, args: ['tabListContainer',] },],
        "_tabList": [{ type: core_1.ViewChild, args: ['tabList',] },],
        "selectedIndex": [{ type: core_1.Input },],
        "selectFocusedIndex": [{ type: core_1.Output },],
        "indexFocused": [{ type: core_1.Output },],
    };
    return MatTabHeader;
}(exports._MatTabHeaderMixinBase));
exports.MatTabHeader = MatTabHeader;
//# sourceMappingURL=tab-header.js.map