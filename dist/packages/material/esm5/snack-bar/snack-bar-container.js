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
import { BasePortalOutlet, CdkPortalOutlet, } from '@angular/cdk/portal';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, NgZone, ViewChild, ViewEncapsulation, } from '@angular/core';
import { Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { matSnackBarAnimations } from './snack-bar-animations';
import { MatSnackBarConfig } from './snack-bar-config';
/**
 * Internal component that wraps user-provided snack bar content.
 * \@docs-private
 */
var MatSnackBarContainer = /** @class */ (function (_super) {
    tslib_1.__extends(MatSnackBarContainer, _super);
    function MatSnackBarContainer(_ngZone, _elementRef, _changeDetectorRef, snackBarConfig) {
        var _this = _super.call(this) || this;
        _this._ngZone = _ngZone;
        _this._elementRef = _elementRef;
        _this._changeDetectorRef = _changeDetectorRef;
        _this.snackBarConfig = snackBarConfig;
        /**
         * Whether the component has been destroyed.
         */
        _this._destroyed = false;
        /**
         * Subject for notifying that the snack bar has exited from view.
         */
        _this._onExit = new Subject();
        /**
         * Subject for notifying that the snack bar has finished entering the view.
         */
        _this._onEnter = new Subject();
        /**
         * The state of the snack bar animations.
         */
        _this._animationState = 'void';
        return _this;
    }
    /** Attach a component portal as content to this snack bar container. */
    /**
     * Attach a component portal as content to this snack bar container.
     * @template T
     * @param {?} portal
     * @return {?}
     */
    MatSnackBarContainer.prototype.attachComponentPortal = /**
     * Attach a component portal as content to this snack bar container.
     * @template T
     * @param {?} portal
     * @return {?}
     */
    function (portal) {
        this._assertNotAttached();
        this._applySnackBarClasses();
        return this._portalOutlet.attachComponentPortal(portal);
    };
    /** Attach a template portal as content to this snack bar container. */
    /**
     * Attach a template portal as content to this snack bar container.
     * @template C
     * @param {?} portal
     * @return {?}
     */
    MatSnackBarContainer.prototype.attachTemplatePortal = /**
     * Attach a template portal as content to this snack bar container.
     * @template C
     * @param {?} portal
     * @return {?}
     */
    function (portal) {
        this._assertNotAttached();
        this._applySnackBarClasses();
        return this._portalOutlet.attachTemplatePortal(portal);
    };
    /** Handle end of animations, updating the state of the snackbar. */
    /**
     * Handle end of animations, updating the state of the snackbar.
     * @param {?} event
     * @return {?}
     */
    MatSnackBarContainer.prototype.onAnimationEnd = /**
     * Handle end of animations, updating the state of the snackbar.
     * @param {?} event
     * @return {?}
     */
    function (event) {
        var fromState = event.fromState, toState = event.toState;
        if ((toState === 'void' && fromState !== 'void') || toState.startsWith('hidden')) {
            this._completeExit();
        }
        if (toState.startsWith('visible')) {
            // Note: we shouldn't use `this` inside the zone callback,
            // because it can cause a memory leak.
            var /** @type {?} */ onEnter_1 = this._onEnter;
            this._ngZone.run(function () {
                onEnter_1.next();
                onEnter_1.complete();
            });
        }
    };
    /** Begin animation of snack bar entrance into view. */
    /**
     * Begin animation of snack bar entrance into view.
     * @return {?}
     */
    MatSnackBarContainer.prototype.enter = /**
     * Begin animation of snack bar entrance into view.
     * @return {?}
     */
    function () {
        if (!this._destroyed) {
            this._animationState = "visible-" + this.snackBarConfig.verticalPosition;
            this._changeDetectorRef.detectChanges();
        }
    };
    /** Begin animation of the snack bar exiting from view. */
    /**
     * Begin animation of the snack bar exiting from view.
     * @return {?}
     */
    MatSnackBarContainer.prototype.exit = /**
     * Begin animation of the snack bar exiting from view.
     * @return {?}
     */
    function () {
        this._animationState = "hidden-" + this.snackBarConfig.verticalPosition;
        return this._onExit;
    };
    /** Makes sure the exit callbacks have been invoked when the element is destroyed. */
    /**
     * Makes sure the exit callbacks have been invoked when the element is destroyed.
     * @return {?}
     */
    MatSnackBarContainer.prototype.ngOnDestroy = /**
     * Makes sure the exit callbacks have been invoked when the element is destroyed.
     * @return {?}
     */
    function () {
        this._destroyed = true;
        this._completeExit();
    };
    /**
     * Waits for the zone to settle before removing the element. Helps prevent
     * errors where we end up removing an element which is in the middle of an animation.
     * @return {?}
     */
    MatSnackBarContainer.prototype._completeExit = /**
     * Waits for the zone to settle before removing the element. Helps prevent
     * errors where we end up removing an element which is in the middle of an animation.
     * @return {?}
     */
    function () {
        var _this = this;
        this._ngZone.onMicrotaskEmpty.asObservable().pipe(take(1)).subscribe(function () {
            _this._onExit.next();
            _this._onExit.complete();
        });
    };
    /**
     * Applies the various positioning and user-configured CSS classes to the snack bar.
     * @return {?}
     */
    MatSnackBarContainer.prototype._applySnackBarClasses = /**
     * Applies the various positioning and user-configured CSS classes to the snack bar.
     * @return {?}
     */
    function () {
        var /** @type {?} */ element = this._elementRef.nativeElement;
        var /** @type {?} */ panelClasses = this.snackBarConfig.panelClass;
        if (panelClasses) {
            if (Array.isArray(panelClasses)) {
                // Note that we can't use a spread here, because IE doesn't support multiple arguments.
                panelClasses.forEach(function (cssClass) { return element.classList.add(cssClass); });
            }
            else {
                element.classList.add(panelClasses);
            }
        }
        if (this.snackBarConfig.horizontalPosition === 'center') {
            element.classList.add('mat-snack-bar-center');
        }
        if (this.snackBarConfig.verticalPosition === 'top') {
            element.classList.add('mat-snack-bar-top');
        }
    };
    /**
     * Asserts that no content is already attached to the container.
     * @return {?}
     */
    MatSnackBarContainer.prototype._assertNotAttached = /**
     * Asserts that no content is already attached to the container.
     * @return {?}
     */
    function () {
        if (this._portalOutlet.hasAttached()) {
            throw Error('Attempting to attach snack bar content after content is already attached');
        }
    };
    MatSnackBarContainer.decorators = [
        { type: Component, args: [{selector: 'snack-bar-container',
                    template: "<ng-template cdkPortalOutlet></ng-template>",
                    styles: [".mat-snack-bar-container{border-radius:2px;box-sizing:border-box;display:block;margin:24px;max-width:568px;min-width:288px;padding:14px 24px;transform:translateY(100%) translateY(24px)}.mat-snack-bar-container.mat-snack-bar-center{margin:0;transform:translateY(100%)}.mat-snack-bar-container.mat-snack-bar-top{transform:translateY(-100%) translateY(-24px)}.mat-snack-bar-container.mat-snack-bar-top.mat-snack-bar-center{transform:translateY(-100%)}@media screen and (-ms-high-contrast:active){.mat-snack-bar-container{border:solid 1px}}.mat-snack-bar-handset{width:100%}.mat-snack-bar-handset .mat-snack-bar-container{margin:0;max-width:inherit;width:100%}"],
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    animations: [matSnackBarAnimations.snackBarState],
                    host: {
                        'role': 'alert',
                        'class': 'mat-snack-bar-container',
                        '[@state]': '_animationState',
                        '(@state.done)': 'onAnimationEnd($event)'
                    },
                },] },
    ];
    /** @nocollapse */
    MatSnackBarContainer.ctorParameters = function () { return [
        { type: NgZone, },
        { type: ElementRef, },
        { type: ChangeDetectorRef, },
        { type: MatSnackBarConfig, },
    ]; };
    MatSnackBarContainer.propDecorators = {
        "_portalOutlet": [{ type: ViewChild, args: [CdkPortalOutlet,] },],
    };
    return MatSnackBarContainer;
}(BasePortalOutlet));
export { MatSnackBarContainer };
function MatSnackBarContainer_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    MatSnackBarContainer.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    MatSnackBarContainer.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    MatSnackBarContainer.propDecorators;
    /**
     * Whether the component has been destroyed.
     * @type {?}
     */
    MatSnackBarContainer.prototype._destroyed;
    /**
     * The portal outlet inside of this container into which the snack bar content will be loaded.
     * @type {?}
     */
    MatSnackBarContainer.prototype._portalOutlet;
    /**
     * Subject for notifying that the snack bar has exited from view.
     * @type {?}
     */
    MatSnackBarContainer.prototype._onExit;
    /**
     * Subject for notifying that the snack bar has finished entering the view.
     * @type {?}
     */
    MatSnackBarContainer.prototype._onEnter;
    /**
     * The state of the snack bar animations.
     * @type {?}
     */
    MatSnackBarContainer.prototype._animationState;
    /** @type {?} */
    MatSnackBarContainer.prototype._ngZone;
    /** @type {?} */
    MatSnackBarContainer.prototype._elementRef;
    /** @type {?} */
    MatSnackBarContainer.prototype._changeDetectorRef;
    /**
     * The snack bar configuration.
     * @type {?}
     */
    MatSnackBarContainer.prototype.snackBarConfig;
}
//# sourceMappingURL=snack-bar-container.js.map