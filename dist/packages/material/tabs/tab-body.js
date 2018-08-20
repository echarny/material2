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
var core_1 = require("@angular/core");
var portal_1 = require("@angular/cdk/portal");
var bidi_1 = require("@angular/cdk/bidi");
var rxjs_1 = require("rxjs");
var tabs_animations_1 = require("./tabs-animations");
var operators_1 = require("rxjs/operators");
/**
 * The portal host directive for the contents of the tab.
 * @docs-private
 */
var MatTabBodyPortal = /** @class */ (function (_super) {
    __extends(MatTabBodyPortal, _super);
    function MatTabBodyPortal(componentFactoryResolver, viewContainerRef, _host) {
        var _this = _super.call(this, componentFactoryResolver, viewContainerRef) || this;
        _this._host = _host;
        /** Subscription to events for when the tab body begins centering. */
        _this._centeringSub = rxjs_1.Subscription.EMPTY;
        /** Subscription to events for when the tab body finishes leaving from center position. */
        _this._leavingSub = rxjs_1.Subscription.EMPTY;
        return _this;
    }
    /** Set initial visibility or set up subscription for changing visibility. */
    /** Set initial visibility or set up subscription for changing visibility. */
    MatTabBodyPortal.prototype.ngOnInit = /** Set initial visibility or set up subscription for changing visibility. */
    function () {
        var _this = this;
        _super.prototype.ngOnInit.call(this);
        this._centeringSub = this._host._beforeCentering
            .pipe(operators_1.startWith(this._host._isCenterPosition(this._host._position)))
            .subscribe(function (isCentering) {
            if (isCentering && !_this.hasAttached()) {
                _this.attach(_this._host._content);
            }
        });
        this._leavingSub = this._host._afterLeavingCenter.subscribe(function () {
            _this.detach();
        });
    };
    /** Clean up centering subscription. */
    /** Clean up centering subscription. */
    MatTabBodyPortal.prototype.ngOnDestroy = /** Clean up centering subscription. */
    function () {
        _super.prototype.ngOnDestroy.call(this);
        this._centeringSub.unsubscribe();
        this._leavingSub.unsubscribe();
    };
    MatTabBodyPortal.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[matTabBodyHost]'
                },] },
    ];
    /** @nocollapse */
    MatTabBodyPortal.ctorParameters = function () { return [
        { type: core_1.ComponentFactoryResolver, },
        { type: core_1.ViewContainerRef, },
        { type: MatTabBody, decorators: [{ type: core_1.Inject, args: [core_1.forwardRef(function () { return MatTabBody; }),] },] },
    ]; };
    return MatTabBodyPortal;
}(portal_1.CdkPortalOutlet));
exports.MatTabBodyPortal = MatTabBodyPortal;
/**
 * Wrapper for the contents of a tab.
 * @docs-private
 */
var MatTabBody = /** @class */ (function () {
    function MatTabBody(_elementRef, _dir, /**
                   * @breaking-change 7.0.0 changeDetectorRef to be made required.
                   */
    /**
     * @breaking-change 7.0.0 changeDetectorRef to be made required.
     */
    changeDetectorRef) {
        var _this = this;
        this._elementRef = _elementRef;
        this._dir = _dir;
        /** Subscription to the directionality change observable. */
        this._dirChangeSubscription = rxjs_1.Subscription.EMPTY;
        /** Event emitted when the tab begins to animate towards the center as the active tab. */
        this._onCentering = new core_1.EventEmitter();
        /** Event emitted before the centering of the tab begins. */
        this._beforeCentering = new core_1.EventEmitter();
        /** Event emitted before the centering of the tab begins. */
        this._afterLeavingCenter = new core_1.EventEmitter();
        /** Event emitted when the tab completes its animation towards the center. */
        this._onCentered = new core_1.EventEmitter(true);
        if (this._dir && changeDetectorRef) {
            this._dirChangeSubscription = this._dir.change.subscribe(function (dir) {
                _this._computePositionAnimationState(dir);
                changeDetectorRef.markForCheck();
            });
        }
    }
    Object.defineProperty(MatTabBody.prototype, "position", {
        set: /** The shifted index position of the tab body, where zero represents the active center tab. */
        function (position) {
            this._positionIndex = position;
            this._computePositionAnimationState();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * After initialized, check if the content is centered and has an origin. If so, set the
     * special position states that transition the tab from the left or right before centering.
     */
    /**
       * After initialized, check if the content is centered and has an origin. If so, set the
       * special position states that transition the tab from the left or right before centering.
       */
    MatTabBody.prototype.ngOnInit = /**
       * After initialized, check if the content is centered and has an origin. If so, set the
       * special position states that transition the tab from the left or right before centering.
       */
    function () {
        if (this._position == 'center' && this.origin != null) {
            this._position = this._computePositionFromOrigin();
        }
    };
    MatTabBody.prototype.ngOnDestroy = function () {
        this._dirChangeSubscription.unsubscribe();
    };
    MatTabBody.prototype._onTranslateTabStarted = function (e) {
        var isCentering = this._isCenterPosition(e.toState);
        this._beforeCentering.emit(isCentering);
        if (isCentering) {
            this._onCentering.emit(this._elementRef.nativeElement.clientHeight);
        }
    };
    MatTabBody.prototype._onTranslateTabComplete = function (e) {
        // If the transition to the center is complete, emit an event.
        if (this._isCenterPosition(e.toState) && this._isCenterPosition(this._position)) {
            this._onCentered.emit();
        }
        if (this._isCenterPosition(e.fromState) && !this._isCenterPosition(this._position)) {
            this._afterLeavingCenter.emit();
        }
    };
    /** The text direction of the containing app. */
    /** The text direction of the containing app. */
    MatTabBody.prototype._getLayoutDirection = /** The text direction of the containing app. */
    function () {
        return this._dir && this._dir.value === 'rtl' ? 'rtl' : 'ltr';
    };
    /** Whether the provided position state is considered center, regardless of origin. */
    /** Whether the provided position state is considered center, regardless of origin. */
    MatTabBody.prototype._isCenterPosition = /** Whether the provided position state is considered center, regardless of origin. */
    function (position) {
        return position == 'center' ||
            position == 'left-origin-center' ||
            position == 'right-origin-center';
    };
    /** Computes the position state that will be used for the tab-body animation trigger. */
    /** Computes the position state that will be used for the tab-body animation trigger. */
    MatTabBody.prototype._computePositionAnimationState = /** Computes the position state that will be used for the tab-body animation trigger. */
    function (dir) {
        if (dir === void 0) { dir = this._getLayoutDirection(); }
        if (this._positionIndex < 0) {
            this._position = dir == 'ltr' ? 'left' : 'right';
        }
        else if (this._positionIndex > 0) {
            this._position = dir == 'ltr' ? 'right' : 'left';
        }
        else {
            this._position = 'center';
        }
    };
    /**
     * Computes the position state based on the specified origin position. This is used if the
     * tab is becoming visible immediately after creation.
     */
    /**
       * Computes the position state based on the specified origin position. This is used if the
       * tab is becoming visible immediately after creation.
       */
    MatTabBody.prototype._computePositionFromOrigin = /**
       * Computes the position state based on the specified origin position. This is used if the
       * tab is becoming visible immediately after creation.
       */
    function () {
        var dir = this._getLayoutDirection();
        if ((dir == 'ltr' && this.origin <= 0) || (dir == 'rtl' && this.origin > 0)) {
            return 'left-origin-center';
        }
        return 'right-origin-center';
    };
    MatTabBody.decorators = [
        { type: core_1.Component, args: [{selector: 'mat-tab-body',
                    template: "<div class=\"mat-tab-body-content\" #content [@translateTab]=\"_position\" (@translateTab.start)=\"_onTranslateTabStarted($event)\" (@translateTab.done)=\"_onTranslateTabComplete($event)\"><ng-template matTabBodyHost></ng-template></div>",
                    styles: [".mat-tab-body-content{height:100%;overflow:auto}.mat-tab-group-dynamic-height .mat-tab-body-content{overflow:hidden}"],
                    encapsulation: core_1.ViewEncapsulation.None,
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    animations: [tabs_animations_1.matTabsAnimations.translateTab],
                    host: {
                        'class': 'mat-tab-body',
                    },
                },] },
    ];
    /** @nocollapse */
    MatTabBody.ctorParameters = function () { return [
        { type: core_1.ElementRef, },
        { type: bidi_1.Directionality, decorators: [{ type: core_1.Optional },] },
        { type: core_1.ChangeDetectorRef, },
    ]; };
    MatTabBody.propDecorators = {
        "_onCentering": [{ type: core_1.Output },],
        "_beforeCentering": [{ type: core_1.Output },],
        "_afterLeavingCenter": [{ type: core_1.Output },],
        "_onCentered": [{ type: core_1.Output },],
        "_portalHost": [{ type: core_1.ViewChild, args: [portal_1.PortalHostDirective,] },],
        "_content": [{ type: core_1.Input, args: ['content',] },],
        "origin": [{ type: core_1.Input },],
        "position": [{ type: core_1.Input },],
    };
    return MatTabBody;
}());
exports.MatTabBody = MatTabBody;
//# sourceMappingURL=tab-body.js.map