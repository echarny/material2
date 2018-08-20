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
var core_1 = require("@angular/core");
var core_2 = require("@angular/material/core");
var rxjs_1 = require("rxjs");
var tab_1 = require("./tab");
var tab_header_1 = require("./tab-header");
/** Used to generate unique ID's for each tab component */
var nextId = 0;
/** A simple change event emitted on focus or selection changes. */
var /** A simple change event emitted on focus or selection changes. */
MatTabChangeEvent = /** @class */ (function () {
    function MatTabChangeEvent() {
    }
    return MatTabChangeEvent;
}());
exports.MatTabChangeEvent = MatTabChangeEvent;
// Boilerplate for applying mixins to MatTabGroup.
/** @docs-private */
var 
// Boilerplate for applying mixins to MatTabGroup.
/** @docs-private */
MatTabGroupBase = /** @class */ (function () {
    function MatTabGroupBase(_elementRef) {
        this._elementRef = _elementRef;
    }
    return MatTabGroupBase;
}());
exports.MatTabGroupBase = MatTabGroupBase;
exports._MatTabGroupMixinBase = core_2.mixinColor(core_2.mixinDisableRipple(MatTabGroupBase), 'primary');
/**
 * Material design tab-group component.  Supports basic tab pairs (label + content) and includes
 * animated ink-bar, keyboard navigation, and screen reader.
 * See: https://material.io/design/components/tabs.html
 */
var MatTabGroup = /** @class */ (function (_super) {
    __extends(MatTabGroup, _super);
    function MatTabGroup(elementRef, _changeDetectorRef) {
        var _this = _super.call(this, elementRef) || this;
        _this._changeDetectorRef = _changeDetectorRef;
        /** The tab index that should be selected after the content has been checked. */
        _this._indexToSelect = 0;
        /** Snapshot of the height of the tab body wrapper before another tab is activated. */
        _this._tabBodyWrapperHeight = 0;
        /** Subscription to tabs being added/removed. */
        _this._tabsSubscription = rxjs_1.Subscription.EMPTY;
        /** Subscription to changes in the tab labels. */
        _this._tabLabelSubscription = rxjs_1.Subscription.EMPTY;
        _this._dynamicHeight = false;
        _this._selectedIndex = null;
        /** Position of the tab header. */
        _this.headerPosition = 'above';
        /** Output to enable support for two-way binding on `[(selectedIndex)]` */
        _this.selectedIndexChange = new core_1.EventEmitter();
        /** Event emitted when focus has changed within a tab group. */
        _this.focusChange = new core_1.EventEmitter();
        /** Event emitted when the body animation has completed */
        _this.animationDone = new core_1.EventEmitter();
        /** Event emitted when the tab selection has changed. */
        _this.selectedTabChange = new core_1.EventEmitter(true);
        _this._groupId = nextId++;
        return _this;
    }
    Object.defineProperty(MatTabGroup.prototype, "dynamicHeight", {
        get: /** Whether the tab group should grow to the size of the active tab. */
        function () { return this._dynamicHeight; },
        set: function (value) { this._dynamicHeight = coercion_1.coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatTabGroup.prototype, "selectedIndex", {
        get: /** The index of the active tab. */
        function () { return this._selectedIndex; },
        set: function (value) {
            this._indexToSelect = coercion_1.coerceNumberProperty(value, null);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatTabGroup.prototype, "backgroundColor", {
        get: /** Background color of the tab group. */
        function () { return this._backgroundColor; },
        set: function (value) {
            var nativeElement = this._elementRef.nativeElement;
            nativeElement.classList.remove("mat-background-" + this.backgroundColor);
            if (value) {
                nativeElement.classList.add("mat-background-" + value);
            }
            this._backgroundColor = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * After the content is checked, this component knows what tabs have been defined
     * and what the selected index should be. This is where we can know exactly what position
     * each tab should be in according to the new selected index, and additionally we know how
     * a new selected tab should transition in (from the left or right).
     */
    /**
       * After the content is checked, this component knows what tabs have been defined
       * and what the selected index should be. This is where we can know exactly what position
       * each tab should be in according to the new selected index, and additionally we know how
       * a new selected tab should transition in (from the left or right).
       */
    MatTabGroup.prototype.ngAfterContentChecked = /**
       * After the content is checked, this component knows what tabs have been defined
       * and what the selected index should be. This is where we can know exactly what position
       * each tab should be in according to the new selected index, and additionally we know how
       * a new selected tab should transition in (from the left or right).
       */
    function () {
        var _this = this;
        // Don't clamp the `indexToSelect` immediately in the setter because it can happen that
        // the amount of tabs changes before the actual change detection runs.
        var indexToSelect = this._indexToSelect = this._clampTabIndex(this._indexToSelect);
        // If there is a change in selected index, emit a change event. Should not trigger if
        // the selected index has not yet been initialized.
        if (this._selectedIndex != indexToSelect) {
            var isFirstRun_1 = this._selectedIndex == null;
            if (!isFirstRun_1) {
                this.selectedTabChange.emit(this._createChangeEvent(indexToSelect));
            }
            // Changing these values after change detection has run
            // since the checked content may contain references to them.
            Promise.resolve().then(function () {
                _this._tabs.forEach(function (tab, index) { return tab.isActive = index === indexToSelect; });
                if (!isFirstRun_1) {
                    _this.selectedIndexChange.emit(indexToSelect);
                }
            });
        }
        // Setup the position for each tab and optionally setup an origin on the next selected tab.
        this._tabs.forEach(function (tab, index) {
            tab.position = index - indexToSelect;
            // If there is already a selected tab, then set up an origin for the next selected tab
            // if it doesn't have one already.
            if (_this._selectedIndex != null && tab.position == 0 && !tab.origin) {
                tab.origin = indexToSelect - _this._selectedIndex;
            }
        });
        if (this._selectedIndex !== indexToSelect) {
            this._selectedIndex = indexToSelect;
            this._changeDetectorRef.markForCheck();
        }
    };
    MatTabGroup.prototype.ngAfterContentInit = function () {
        var _this = this;
        this._subscribeToTabLabels();
        // Subscribe to changes in the amount of tabs, in order to be
        // able to re-render the content as new tabs are added or removed.
        this._tabsSubscription = this._tabs.changes.subscribe(function () {
            var indexToSelect = _this._clampTabIndex(_this._indexToSelect);
            // Maintain the previously-selected tab if a new tab is added or removed and there is no
            // explicit change that selects a different tab.
            if (indexToSelect === _this._selectedIndex) {
                var tabs = _this._tabs.toArray();
                for (var i = 0; i < tabs.length; i++) {
                    if (tabs[i].isActive) {
                        // Assign both to the `_indexToSelect` and `_selectedIndex` so we don't fire a changed
                        // event, otherwise the consumer may end up in an infinite loop in some edge cases like
                        // adding a tab within the `selectedIndexChange` event.
                        // Assign both to the `_indexToSelect` and `_selectedIndex` so we don't fire a changed
                        // event, otherwise the consumer may end up in an infinite loop in some edge cases like
                        // adding a tab within the `selectedIndexChange` event.
                        _this._indexToSelect = _this._selectedIndex = i;
                        break;
                    }
                }
            }
            _this._subscribeToTabLabels();
            _this._changeDetectorRef.markForCheck();
        });
    };
    MatTabGroup.prototype.ngOnDestroy = function () {
        this._tabsSubscription.unsubscribe();
        this._tabLabelSubscription.unsubscribe();
    };
    /** Re-aligns the ink bar to the selected tab element. */
    /** Re-aligns the ink bar to the selected tab element. */
    MatTabGroup.prototype.realignInkBar = /** Re-aligns the ink bar to the selected tab element. */
    function () {
        if (this._tabHeader) {
            this._tabHeader._alignInkBarToSelectedTab();
        }
    };
    MatTabGroup.prototype._focusChanged = function (index) {
        this.focusChange.emit(this._createChangeEvent(index));
    };
    MatTabGroup.prototype._createChangeEvent = function (index) {
        var event = new MatTabChangeEvent;
        event.index = index;
        if (this._tabs && this._tabs.length) {
            event.tab = this._tabs.toArray()[index];
        }
        return event;
    };
    /**
     * Subscribes to changes in the tab labels. This is needed, because the @Input for the label is
     * on the MatTab component, whereas the data binding is inside the MatTabGroup. In order for the
     * binding to be updated, we need to subscribe to changes in it and trigger change detection
     * manually.
     */
    /**
       * Subscribes to changes in the tab labels. This is needed, because the @Input for the label is
       * on the MatTab component, whereas the data binding is inside the MatTabGroup. In order for the
       * binding to be updated, we need to subscribe to changes in it and trigger change detection
       * manually.
       */
    MatTabGroup.prototype._subscribeToTabLabels = /**
       * Subscribes to changes in the tab labels. This is needed, because the @Input for the label is
       * on the MatTab component, whereas the data binding is inside the MatTabGroup. In order for the
       * binding to be updated, we need to subscribe to changes in it and trigger change detection
       * manually.
       */
    function () {
        var _this = this;
        if (this._tabLabelSubscription) {
            this._tabLabelSubscription.unsubscribe();
        }
        this._tabLabelSubscription = rxjs_1.merge.apply(void 0, this._tabs.map(function (tab) { return tab._stateChanges; })).subscribe(function () { return _this._changeDetectorRef.markForCheck(); });
    };
    /** Clamps the given index to the bounds of 0 and the tabs length. */
    /** Clamps the given index to the bounds of 0 and the tabs length. */
    MatTabGroup.prototype._clampTabIndex = /** Clamps the given index to the bounds of 0 and the tabs length. */
    function (index) {
        // Note the `|| 0`, which ensures that values like NaN can't get through
        // and which would otherwise throw the component into an infinite loop
        // (since Math.max(NaN, 0) === NaN).
        return Math.min(this._tabs.length - 1, Math.max(index || 0, 0));
    };
    /** Returns a unique id for each tab label element */
    /** Returns a unique id for each tab label element */
    MatTabGroup.prototype._getTabLabelId = /** Returns a unique id for each tab label element */
    function (i) {
        return "mat-tab-label-" + this._groupId + "-" + i;
    };
    /** Returns a unique id for each tab content element */
    /** Returns a unique id for each tab content element */
    MatTabGroup.prototype._getTabContentId = /** Returns a unique id for each tab content element */
    function (i) {
        return "mat-tab-content-" + this._groupId + "-" + i;
    };
    /**
     * Sets the height of the body wrapper to the height of the activating tab if dynamic
     * height property is true.
     */
    /**
       * Sets the height of the body wrapper to the height of the activating tab if dynamic
       * height property is true.
       */
    MatTabGroup.prototype._setTabBodyWrapperHeight = /**
       * Sets the height of the body wrapper to the height of the activating tab if dynamic
       * height property is true.
       */
    function (tabHeight) {
        if (!this._dynamicHeight || !this._tabBodyWrapperHeight) {
            return;
        }
        var wrapper = this._tabBodyWrapper.nativeElement;
        wrapper.style.height = this._tabBodyWrapperHeight + 'px';
        // This conditional forces the browser to paint the height so that
        // the animation to the new height can have an origin.
        if (this._tabBodyWrapper.nativeElement.offsetHeight) {
            wrapper.style.height = tabHeight + 'px';
        }
    };
    /** Removes the height of the tab body wrapper. */
    /** Removes the height of the tab body wrapper. */
    MatTabGroup.prototype._removeTabBodyWrapperHeight = /** Removes the height of the tab body wrapper. */
    function () {
        this._tabBodyWrapperHeight = this._tabBodyWrapper.nativeElement.clientHeight;
        this._tabBodyWrapper.nativeElement.style.height = '';
        this.animationDone.emit();
    };
    /** Handle click events, setting new selected index if appropriate. */
    /** Handle click events, setting new selected index if appropriate. */
    MatTabGroup.prototype._handleClick = /** Handle click events, setting new selected index if appropriate. */
    function (tab, tabHeader, idx) {
        if (!tab.disabled) {
            this.selectedIndex = tabHeader.focusIndex = idx;
        }
    };
    /** Retrieves the tabindex for the tab. */
    /** Retrieves the tabindex for the tab. */
    MatTabGroup.prototype._getTabIndex = /** Retrieves the tabindex for the tab. */
    function (tab, idx) {
        if (tab.disabled) {
            return null;
        }
        return this.selectedIndex === idx ? 0 : -1;
    };
    MatTabGroup.decorators = [
        { type: core_1.Component, args: [{selector: 'mat-tab-group',
                    exportAs: 'matTabGroup',
                    template: "<mat-tab-header #tabHeader [selectedIndex]=\"selectedIndex\" [disableRipple]=\"disableRipple\" (indexFocused)=\"_focusChanged($event)\" (selectFocusedIndex)=\"selectedIndex = $event\"><div class=\"mat-tab-label\" role=\"tab\" matTabLabelWrapper mat-ripple cdkMonitorElementFocus *ngFor=\"let tab of _tabs; let i = index\" [id]=\"_getTabLabelId(i)\" [attr.tabIndex]=\"_getTabIndex(tab, i)\" [attr.aria-posinset]=\"i + 1\" [attr.aria-setsize]=\"_tabs.length\" [attr.aria-controls]=\"_getTabContentId(i)\" [attr.aria-selected]=\"selectedIndex == i\" [attr.aria-label]=\"tab.ariaLabel || null\" [attr.aria-labelledby]=\"(!tab.ariaLabel && tab.ariaLabelledby) ? tab.ariaLabelledby : null\" [class.mat-tab-label-active]=\"selectedIndex == i\" [disabled]=\"tab.disabled\" [matRippleDisabled]=\"tab.disabled || disableRipple\" (click)=\"_handleClick(tab, tabHeader, i)\"><div class=\"mat-tab-label-content\"><ng-template [ngIf]=\"tab.templateLabel\"><ng-template [cdkPortalOutlet]=\"tab.templateLabel\"></ng-template></ng-template><ng-template [ngIf]=\"!tab.templateLabel\">{{tab.textLabel}}</ng-template></div></div></mat-tab-header><div class=\"mat-tab-body-wrapper\" #tabBodyWrapper><mat-tab-body role=\"tabpanel\" *ngFor=\"let tab of _tabs; let i = index\" [id]=\"_getTabContentId(i)\" [attr.aria-labelledby]=\"_getTabLabelId(i)\" [class.mat-tab-body-active]=\"selectedIndex == i\" [content]=\"tab.content\" [position]=\"tab.position\" [origin]=\"tab.origin\" (_onCentered)=\"_removeTabBodyWrapperHeight()\" (_onCentering)=\"_setTabBodyWrapperHeight($event)\"></mat-tab-body></div>",
                    styles: [".mat-tab-group{display:flex;flex-direction:column}.mat-tab-group.mat-tab-group-inverted-header{flex-direction:column-reverse}.mat-tab-label{height:48px;padding:0 24px;cursor:pointer;box-sizing:border-box;opacity:.6;min-width:160px;text-align:center;display:inline-flex;justify-content:center;align-items:center;white-space:nowrap;position:relative}.mat-tab-label:focus{outline:0}.mat-tab-label:focus:not(.mat-tab-disabled){opacity:1}@media screen and (-ms-high-contrast:active){.mat-tab-label:focus{outline:dotted 2px}}.mat-tab-label.mat-tab-disabled{cursor:default}@media screen and (-ms-high-contrast:active){.mat-tab-label.mat-tab-disabled{opacity:.5}}.mat-tab-label .mat-tab-label-content{display:inline-flex;justify-content:center;align-items:center;white-space:nowrap}@media screen and (-ms-high-contrast:active){.mat-tab-label{opacity:1}}@media (max-width:599px){.mat-tab-label{padding:0 12px}}@media (max-width:959px){.mat-tab-label{padding:0 12px}}.mat-tab-group[mat-stretch-tabs] .mat-tab-label{flex-basis:0;flex-grow:1}.mat-tab-body-wrapper{position:relative;overflow:hidden;display:flex;transition:height .5s cubic-bezier(.35,0,.25,1)}.mat-tab-body{top:0;left:0;right:0;bottom:0;position:absolute;display:block;overflow:hidden;flex-basis:100%}.mat-tab-body.mat-tab-body-active{position:relative;overflow-x:hidden;overflow-y:auto;z-index:1;flex-grow:1}.mat-tab-group.mat-tab-group-dynamic-height .mat-tab-body.mat-tab-body-active{overflow-y:hidden}"],
                    encapsulation: core_1.ViewEncapsulation.None,
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    inputs: ['color', 'disableRipple'],
                    host: {
                        'class': 'mat-tab-group',
                        '[class.mat-tab-group-dynamic-height]': 'dynamicHeight',
                        '[class.mat-tab-group-inverted-header]': 'headerPosition === "below"',
                    },
                },] },
    ];
    /** @nocollapse */
    MatTabGroup.ctorParameters = function () { return [
        { type: core_1.ElementRef, },
        { type: core_1.ChangeDetectorRef, },
    ]; };
    MatTabGroup.propDecorators = {
        "_tabs": [{ type: core_1.ContentChildren, args: [tab_1.MatTab,] },],
        "_tabBodyWrapper": [{ type: core_1.ViewChild, args: ['tabBodyWrapper',] },],
        "_tabHeader": [{ type: core_1.ViewChild, args: ['tabHeader',] },],
        "dynamicHeight": [{ type: core_1.Input },],
        "selectedIndex": [{ type: core_1.Input },],
        "headerPosition": [{ type: core_1.Input },],
        "backgroundColor": [{ type: core_1.Input },],
        "selectedIndexChange": [{ type: core_1.Output },],
        "focusChange": [{ type: core_1.Output },],
        "animationDone": [{ type: core_1.Output },],
        "selectedTabChange": [{ type: core_1.Output },],
    };
    return MatTabGroup;
}(exports._MatTabGroupMixinBase));
exports.MatTabGroup = MatTabGroup;
//# sourceMappingURL=tab-group.js.map