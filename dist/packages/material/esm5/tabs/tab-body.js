/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import * as tslib_1 from "tslib";
import { Component, ChangeDetectorRef, Input, Inject, Output, EventEmitter, ElementRef, Directive, Optional, ViewEncapsulation, ChangeDetectionStrategy, ComponentFactoryResolver, ViewContainerRef, forwardRef, ViewChild, } from '@angular/core';
import { TemplatePortal, CdkPortalOutlet, PortalHostDirective } from '@angular/cdk/portal';
import { Directionality } from '@angular/cdk/bidi';
import { Subscription } from 'rxjs';
import { matTabsAnimations } from './tabs-animations';
import { startWith } from 'rxjs/operators';
/**
 * The portal host directive for the contents of the tab.
 * \@docs-private
 */
var MatTabBodyPortal = /** @class */ (function (_super) {
    tslib_1.__extends(MatTabBodyPortal, _super);
    function MatTabBodyPortal(componentFactoryResolver, viewContainerRef, _host) {
        var _this = _super.call(this, componentFactoryResolver, viewContainerRef) || this;
        _this._host = _host;
        /**
         * Subscription to events for when the tab body begins centering.
         */
        _this._centeringSub = Subscription.EMPTY;
        /**
         * Subscription to events for when the tab body finishes leaving from center position.
         */
        _this._leavingSub = Subscription.EMPTY;
        return _this;
    }
    /** Set initial visibility or set up subscription for changing visibility. */
    /**
     * Set initial visibility or set up subscription for changing visibility.
     * @return {?}
     */
    MatTabBodyPortal.prototype.ngOnInit = /**
     * Set initial visibility or set up subscription for changing visibility.
     * @return {?}
     */
    function () {
        var _this = this;
        _super.prototype.ngOnInit.call(this);
        this._centeringSub = this._host._beforeCentering
            .pipe(startWith(this._host._isCenterPosition(this._host._position)))
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
    /**
     * Clean up centering subscription.
     * @return {?}
     */
    MatTabBodyPortal.prototype.ngOnDestroy = /**
     * Clean up centering subscription.
     * @return {?}
     */
    function () {
        _super.prototype.ngOnDestroy.call(this);
        this._centeringSub.unsubscribe();
        this._leavingSub.unsubscribe();
    };
    MatTabBodyPortal.decorators = [
        { type: Directive, args: [{
                    selector: '[matTabBodyHost]'
                },] },
    ];
    /** @nocollapse */
    MatTabBodyPortal.ctorParameters = function () { return [
        { type: ComponentFactoryResolver, },
        { type: ViewContainerRef, },
        { type: MatTabBody, decorators: [{ type: Inject, args: [forwardRef(function () { return MatTabBody; }),] },] },
    ]; };
    return MatTabBodyPortal;
}(CdkPortalOutlet));
export { MatTabBodyPortal };
function MatTabBodyPortal_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    MatTabBodyPortal.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    MatTabBodyPortal.ctorParameters;
    /**
     * Subscription to events for when the tab body begins centering.
     * @type {?}
     */
    MatTabBodyPortal.prototype._centeringSub;
    /**
     * Subscription to events for when the tab body finishes leaving from center position.
     * @type {?}
     */
    MatTabBodyPortal.prototype._leavingSub;
    /** @type {?} */
    MatTabBodyPortal.prototype._host;
}
/**
 * Wrapper for the contents of a tab.
 * \@docs-private
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
        /**
         * Subscription to the directionality change observable.
         */
        this._dirChangeSubscription = Subscription.EMPTY;
        /**
         * Event emitted when the tab begins to animate towards the center as the active tab.
         */
        this._onCentering = new EventEmitter();
        /**
         * Event emitted before the centering of the tab begins.
         */
        this._beforeCentering = new EventEmitter();
        /**
         * Event emitted before the centering of the tab begins.
         */
        this._afterLeavingCenter = new EventEmitter();
        /**
         * Event emitted when the tab completes its animation towards the center.
         */
        this._onCentered = new EventEmitter(true);
        if (this._dir && changeDetectorRef) {
            this._dirChangeSubscription = this._dir.change.subscribe(function (dir) {
                _this._computePositionAnimationState(dir);
                changeDetectorRef.markForCheck();
            });
        }
    }
    Object.defineProperty(MatTabBody.prototype, "position", {
        set: /**
         * The shifted index position of the tab body, where zero represents the active center tab.
         * @param {?} position
         * @return {?}
         */
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
     * @return {?}
     */
    MatTabBody.prototype.ngOnInit = /**
     * After initialized, check if the content is centered and has an origin. If so, set the
     * special position states that transition the tab from the left or right before centering.
     * @return {?}
     */
    function () {
        if (this._position == 'center' && this.origin != null) {
            this._position = this._computePositionFromOrigin();
        }
    };
    /**
     * @return {?}
     */
    MatTabBody.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._dirChangeSubscription.unsubscribe();
    };
    /**
     * @param {?} e
     * @return {?}
     */
    MatTabBody.prototype._onTranslateTabStarted = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        var /** @type {?} */ isCentering = this._isCenterPosition(e.toState);
        this._beforeCentering.emit(isCentering);
        if (isCentering) {
            this._onCentering.emit(this._elementRef.nativeElement.clientHeight);
        }
    };
    /**
     * @param {?} e
     * @return {?}
     */
    MatTabBody.prototype._onTranslateTabComplete = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        // If the transition to the center is complete, emit an event.
        if (this._isCenterPosition(e.toState) && this._isCenterPosition(this._position)) {
            this._onCentered.emit();
        }
        if (this._isCenterPosition(e.fromState) && !this._isCenterPosition(this._position)) {
            this._afterLeavingCenter.emit();
        }
    };
    /** The text direction of the containing app. */
    /**
     * The text direction of the containing app.
     * @return {?}
     */
    MatTabBody.prototype._getLayoutDirection = /**
     * The text direction of the containing app.
     * @return {?}
     */
    function () {
        return this._dir && this._dir.value === 'rtl' ? 'rtl' : 'ltr';
    };
    /** Whether the provided position state is considered center, regardless of origin. */
    /**
     * Whether the provided position state is considered center, regardless of origin.
     * @param {?} position
     * @return {?}
     */
    MatTabBody.prototype._isCenterPosition = /**
     * Whether the provided position state is considered center, regardless of origin.
     * @param {?} position
     * @return {?}
     */
    function (position) {
        return position == 'center' ||
            position == 'left-origin-center' ||
            position == 'right-origin-center';
    };
    /**
     * Computes the position state that will be used for the tab-body animation trigger.
     * @param {?=} dir
     * @return {?}
     */
    MatTabBody.prototype._computePositionAnimationState = /**
     * Computes the position state that will be used for the tab-body animation trigger.
     * @param {?=} dir
     * @return {?}
     */
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
     * @return {?}
     */
    MatTabBody.prototype._computePositionFromOrigin = /**
     * Computes the position state based on the specified origin position. This is used if the
     * tab is becoming visible immediately after creation.
     * @return {?}
     */
    function () {
        var /** @type {?} */ dir = this._getLayoutDirection();
        if ((dir == 'ltr' && this.origin <= 0) || (dir == 'rtl' && this.origin > 0)) {
            return 'left-origin-center';
        }
        return 'right-origin-center';
    };
    MatTabBody.decorators = [
        { type: Component, args: [{selector: 'mat-tab-body',
                    template: "<div class=\"mat-tab-body-content\" #content [@translateTab]=\"_position\" (@translateTab.start)=\"_onTranslateTabStarted($event)\" (@translateTab.done)=\"_onTranslateTabComplete($event)\"><ng-template matTabBodyHost></ng-template></div>",
                    styles: [".mat-tab-body-content{height:100%;overflow:auto}.mat-tab-group-dynamic-height .mat-tab-body-content{overflow:hidden}"],
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    animations: [matTabsAnimations.translateTab],
                    host: {
                        'class': 'mat-tab-body',
                    },
                },] },
    ];
    /** @nocollapse */
    MatTabBody.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: Directionality, decorators: [{ type: Optional },] },
        { type: ChangeDetectorRef, },
    ]; };
    MatTabBody.propDecorators = {
        "_onCentering": [{ type: Output },],
        "_beforeCentering": [{ type: Output },],
        "_afterLeavingCenter": [{ type: Output },],
        "_onCentered": [{ type: Output },],
        "_portalHost": [{ type: ViewChild, args: [PortalHostDirective,] },],
        "_content": [{ type: Input, args: ['content',] },],
        "origin": [{ type: Input },],
        "position": [{ type: Input },],
    };
    return MatTabBody;
}());
export { MatTabBody };
function MatTabBody_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    MatTabBody.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    MatTabBody.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    MatTabBody.propDecorators;
    /**
     * Current position of the tab-body in the tab-group. Zero means that the tab is visible.
     * @type {?}
     */
    MatTabBody.prototype._positionIndex;
    /**
     * Subscription to the directionality change observable.
     * @type {?}
     */
    MatTabBody.prototype._dirChangeSubscription;
    /**
     * Tab body position state. Used by the animation trigger for the current state.
     * @type {?}
     */
    MatTabBody.prototype._position;
    /**
     * Event emitted when the tab begins to animate towards the center as the active tab.
     * @type {?}
     */
    MatTabBody.prototype._onCentering;
    /**
     * Event emitted before the centering of the tab begins.
     * @type {?}
     */
    MatTabBody.prototype._beforeCentering;
    /**
     * Event emitted before the centering of the tab begins.
     * @type {?}
     */
    MatTabBody.prototype._afterLeavingCenter;
    /**
     * Event emitted when the tab completes its animation towards the center.
     * @type {?}
     */
    MatTabBody.prototype._onCentered;
    /**
     * The portal host inside of this container into which the tab body content will be loaded.
     * @type {?}
     */
    MatTabBody.prototype._portalHost;
    /**
     * The tab body content to display.
     * @type {?}
     */
    MatTabBody.prototype._content;
    /**
     * Position that will be used when the tab is immediately becoming visible after creation.
     * @type {?}
     */
    MatTabBody.prototype.origin;
    /** @type {?} */
    MatTabBody.prototype._elementRef;
    /** @type {?} */
    MatTabBody.prototype._dir;
}
//# sourceMappingURL=tab-body.js.map