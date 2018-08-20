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
var bidi_1 = require("@angular/cdk/bidi");
var platform_1 = require("@angular/cdk/platform");
var scrolling_1 = require("@angular/cdk/scrolling");
var core_1 = require("@angular/core");
var core_2 = require("@angular/material/core");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var ink_bar_1 = require("../ink-bar");
var a11y_1 = require("@angular/cdk/a11y");
// Boilerplate for applying mixins to MatTabNav.
/** @docs-private */
var 
// Boilerplate for applying mixins to MatTabNav.
/** @docs-private */
MatTabNavBase = /** @class */ (function () {
    function MatTabNavBase(_elementRef) {
        this._elementRef = _elementRef;
    }
    return MatTabNavBase;
}());
exports.MatTabNavBase = MatTabNavBase;
exports._MatTabNavMixinBase = core_2.mixinDisableRipple(core_2.mixinColor(MatTabNavBase, 'primary'));
/**
 * Navigation component matching the styles of the tab group header.
 * Provides anchored navigation with animated ink bar.
 */
var MatTabNav = /** @class */ (function (_super) {
    __extends(MatTabNav, _super);
    function MatTabNav(elementRef, _dir, _ngZone, _changeDetectorRef, _viewportRuler) {
        var _this = _super.call(this, elementRef) || this;
        _this._dir = _dir;
        _this._ngZone = _ngZone;
        _this._changeDetectorRef = _changeDetectorRef;
        _this._viewportRuler = _viewportRuler;
        /** Subject that emits when the component has been destroyed. */
        _this._onDestroy = new rxjs_1.Subject();
        return _this;
    }
    Object.defineProperty(MatTabNav.prototype, "backgroundColor", {
        get: /** Background color of the tab nav. */
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
     * Notifies the component that the active link has been changed.
     * @breaking-change 7.0.0 `element` parameter to be removed.
     */
    /**
       * Notifies the component that the active link has been changed.
       * @breaking-change 7.0.0 `element` parameter to be removed.
       */
    MatTabNav.prototype.updateActiveLink = /**
       * Notifies the component that the active link has been changed.
       * @breaking-change 7.0.0 `element` parameter to be removed.
       */
    function (element) {
        // Note: keeping the `element` for backwards-compat, but isn't being used for anything.
        // @breaking-change 7.0.0
        this._activeLinkChanged = !!element;
        this._changeDetectorRef.markForCheck();
    };
    MatTabNav.prototype.ngAfterContentInit = function () {
        var _this = this;
        this._ngZone.runOutsideAngular(function () {
            var dirChange = _this._dir ? _this._dir.change : rxjs_1.of(null);
            return rxjs_1.merge(dirChange, _this._viewportRuler.change(10))
                .pipe(operators_1.takeUntil(_this._onDestroy))
                .subscribe(function () { return _this._alignInkBar(); });
        });
    };
    /** Checks if the active link has been changed and, if so, will update the ink bar. */
    /** Checks if the active link has been changed and, if so, will update the ink bar. */
    MatTabNav.prototype.ngAfterContentChecked = /** Checks if the active link has been changed and, if so, will update the ink bar. */
    function () {
        if (this._activeLinkChanged) {
            var activeTab = this._tabLinks.find(function (tab) { return tab.active; });
            this._activeLinkElement = activeTab ? activeTab._elementRef : null;
            this._alignInkBar();
            this._activeLinkChanged = false;
        }
    };
    MatTabNav.prototype.ngOnDestroy = function () {
        this._onDestroy.next();
        this._onDestroy.complete();
    };
    /** Aligns the ink bar to the active link. */
    /** Aligns the ink bar to the active link. */
    MatTabNav.prototype._alignInkBar = /** Aligns the ink bar to the active link. */
    function () {
        if (this._activeLinkElement) {
            this._inkBar.show();
            this._inkBar.alignToElement(this._activeLinkElement.nativeElement);
        }
        else {
            this._inkBar.hide();
        }
    };
    MatTabNav.decorators = [
        { type: core_1.Component, args: [{selector: '[mat-tab-nav-bar]',
                    exportAs: 'matTabNavBar, matTabNav',
                    inputs: ['color', 'disableRipple'],
                    template: "<div class=\"mat-tab-links\" (cdkObserveContent)=\"_alignInkBar()\"><ng-content></ng-content><mat-ink-bar></mat-ink-bar></div>",
                    styles: [".mat-tab-nav-bar{overflow:hidden;position:relative;flex-shrink:0}.mat-tab-links{position:relative;display:flex}.mat-tab-link{height:48px;padding:0 24px;cursor:pointer;box-sizing:border-box;opacity:.6;min-width:160px;text-align:center;display:inline-flex;justify-content:center;align-items:center;white-space:nowrap;vertical-align:top;text-decoration:none;position:relative;overflow:hidden;-webkit-tap-highlight-color:transparent}.mat-tab-link:focus{outline:0}.mat-tab-link:focus:not(.mat-tab-disabled){opacity:1}@media screen and (-ms-high-contrast:active){.mat-tab-link:focus{outline:dotted 2px}}.mat-tab-link.mat-tab-disabled{cursor:default}@media screen and (-ms-high-contrast:active){.mat-tab-link.mat-tab-disabled{opacity:.5}}.mat-tab-link .mat-tab-label-content{display:inline-flex;justify-content:center;align-items:center;white-space:nowrap}@media screen and (-ms-high-contrast:active){.mat-tab-link{opacity:1}}[mat-stretch-tabs] .mat-tab-link{flex-basis:0;flex-grow:1}@media (max-width:599px){.mat-tab-link{min-width:72px}}.mat-ink-bar{position:absolute;bottom:0;height:2px;transition:.5s cubic-bezier(.35,0,.25,1)}.mat-tab-group-inverted-header .mat-ink-bar{bottom:auto;top:0}@media screen and (-ms-high-contrast:active){.mat-ink-bar{outline:solid 2px;height:0}}"],
                    host: { 'class': 'mat-tab-nav-bar' },
                    encapsulation: core_1.ViewEncapsulation.None,
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                },] },
    ];
    /** @nocollapse */
    MatTabNav.ctorParameters = function () { return [
        { type: core_1.ElementRef, },
        { type: bidi_1.Directionality, decorators: [{ type: core_1.Optional },] },
        { type: core_1.NgZone, },
        { type: core_1.ChangeDetectorRef, },
        { type: scrolling_1.ViewportRuler, },
    ]; };
    MatTabNav.propDecorators = {
        "_inkBar": [{ type: core_1.ViewChild, args: [ink_bar_1.MatInkBar,] },],
        "_tabLinks": [{ type: core_1.ContentChildren, args: [core_1.forwardRef(function () { return MatTabLink; }), { descendants: true },] },],
        "backgroundColor": [{ type: core_1.Input },],
    };
    return MatTabNav;
}(exports._MatTabNavMixinBase));
exports.MatTabNav = MatTabNav;
// Boilerplate for applying mixins to MatTabLink.
var 
// Boilerplate for applying mixins to MatTabLink.
MatTabLinkBase = /** @class */ (function () {
    function MatTabLinkBase() {
    }
    return MatTabLinkBase;
}());
exports.MatTabLinkBase = MatTabLinkBase;
exports._MatTabLinkMixinBase = core_2.mixinTabIndex(core_2.mixinDisableRipple(core_2.mixinDisabled(MatTabLinkBase)));
/**
 * Link inside of a `mat-tab-nav-bar`.
 */
var MatTabLink = /** @class */ (function (_super) {
    __extends(MatTabLink, _super);
    function MatTabLink(_tabNavBar, _elementRef, ngZone, platform, globalOptions, tabIndex, /**
                   * @deprecated
                   * @breaking-change 7.0.0 `_focusMonitor` parameter to be made required.
                   */
    _focusMonitor) {
        var _this = _super.call(this) || this;
        _this._tabNavBar = _tabNavBar;
        _this._elementRef = _elementRef;
        _this._focusMonitor = _focusMonitor;
        /** Whether the tab link is active or not. */
        _this._isActive = false;
        /** Whether the ripples are globally disabled through the RippleGlobalOptions */
        _this._ripplesGloballyDisabled = false;
        /**
           * Ripple configuration for ripples that are launched on pointer down.
           * @docs-private
           */
        _this.rippleConfig = {};
        _this._tabLinkRipple = new core_2.RippleRenderer(_this, ngZone, _elementRef, platform);
        _this._tabLinkRipple.setupTriggerEvents(_elementRef.nativeElement);
        _this.tabIndex = parseInt(tabIndex) || 0;
        if (globalOptions) {
            _this._ripplesGloballyDisabled = !!globalOptions.disabled;
            // TODO(paul): Once the speedFactor is removed, we no longer need to copy each single option.
            // TODO(paul): Once the speedFactor is removed, we no longer need to copy each single option.
            _this.rippleConfig = {
                terminateOnPointerUp: globalOptions.terminateOnPointerUp,
                speedFactor: globalOptions.baseSpeedFactor,
                animation: globalOptions.animation,
            };
        }
        if (_focusMonitor) {
            _focusMonitor.monitor(_elementRef.nativeElement);
        }
        return _this;
    }
    Object.defineProperty(MatTabLink.prototype, "active", {
        get: /** Whether the link is active. */
        function () { return this._isActive; },
        set: function (value) {
            if (value !== this._isActive) {
                this._isActive = value;
                this._tabNavBar.updateActiveLink(this._elementRef);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatTabLink.prototype, "rippleDisabled", {
        /**
         * Whether ripples are disabled on interaction
         * @docs-private
         */
        get: /**
           * Whether ripples are disabled on interaction
           * @docs-private
           */
        function () {
            return this.disabled || this.disableRipple || this._tabNavBar.disableRipple ||
                this._ripplesGloballyDisabled;
        },
        enumerable: true,
        configurable: true
    });
    MatTabLink.prototype.ngOnDestroy = function () {
        this._tabLinkRipple._removeTriggerEvents();
        if (this._focusMonitor) {
            this._focusMonitor.stopMonitoring(this._elementRef.nativeElement);
        }
    };
    /**
     * Handles the click event, preventing default navigation if the tab link is disabled.
     */
    /**
       * Handles the click event, preventing default navigation if the tab link is disabled.
       */
    MatTabLink.prototype._handleClick = /**
       * Handles the click event, preventing default navigation if the tab link is disabled.
       */
    function (event) {
        if (this.disabled) {
            event.preventDefault();
        }
    };
    MatTabLink.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[mat-tab-link], [matTabLink]',
                    exportAs: 'matTabLink',
                    inputs: ['disabled', 'disableRipple', 'tabIndex'],
                    host: {
                        'class': 'mat-tab-link',
                        '[attr.aria-current]': 'active',
                        '[attr.aria-disabled]': 'disabled.toString()',
                        '[attr.tabIndex]': 'tabIndex',
                        '[class.mat-tab-disabled]': 'disabled',
                        '[class.mat-tab-label-active]': 'active',
                        '(click)': '_handleClick($event)'
                    }
                },] },
    ];
    /** @nocollapse */
    MatTabLink.ctorParameters = function () { return [
        { type: MatTabNav, },
        { type: core_1.ElementRef, },
        { type: core_1.NgZone, },
        { type: platform_1.Platform, },
        { type: undefined, decorators: [{ type: core_1.Optional }, { type: core_1.Inject, args: [core_2.MAT_RIPPLE_GLOBAL_OPTIONS,] },] },
        { type: undefined, decorators: [{ type: core_1.Attribute, args: ['tabindex',] },] },
        { type: a11y_1.FocusMonitor, },
    ]; };
    MatTabLink.propDecorators = {
        "active": [{ type: core_1.Input },],
    };
    return MatTabLink;
}(exports._MatTabLinkMixinBase));
exports.MatTabLink = MatTabLink;
//# sourceMappingURL=tab-nav-bar.js.map