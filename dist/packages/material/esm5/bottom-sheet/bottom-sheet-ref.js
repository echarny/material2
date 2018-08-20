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
import { ESCAPE } from '@angular/cdk/keycodes';
import { merge, Subject, Subscription } from 'rxjs';
import { filter, take } from 'rxjs/operators';
/**
 * Reference to a bottom sheet dispatched from the bottom sheet service.
 * @template T, R
 */
var /**
 * Reference to a bottom sheet dispatched from the bottom sheet service.
 * @template T, R
 */
MatBottomSheetRef = /** @class */ (function () {
    function MatBottomSheetRef(containerInstance, _overlayRef, location) {
        var _this = this;
        this._overlayRef = _overlayRef;
        /**
         * Subject for notifying the user that the bottom sheet has been dismissed.
         */
        this._afterDismissed = new Subject();
        /**
         * Subject for notifying the user that the bottom sheet has opened and appeared.
         */
        this._afterOpened = new Subject();
        /**
         * Subscription to changes in the user's location.
         */
        this._locationChanges = Subscription.EMPTY;
        this.containerInstance = containerInstance;
        // Emit when opening animation completes
        containerInstance._animationStateChanged.pipe(filter(function (event) { return event.phaseName === 'done' && event.toState === 'visible'; }), take(1))
            .subscribe(function () {
            _this._afterOpened.next();
            _this._afterOpened.complete();
        });
        // Dispose overlay when closing animation is complete
        containerInstance._animationStateChanged.pipe(filter(function (event) { return event.phaseName === 'done' && event.toState === 'hidden'; }), take(1))
            .subscribe(function () {
            _this._locationChanges.unsubscribe();
            _this._overlayRef.dispose();
            _this._afterDismissed.next(_this._result);
            _this._afterDismissed.complete();
        });
        if (!containerInstance.bottomSheetConfig.disableClose) {
            merge(_overlayRef.backdropClick(), _overlayRef.keydownEvents().pipe(filter(function (event) { return event.keyCode === ESCAPE; }))).subscribe(function () { return _this.dismiss(); });
        }
        if (location) {
            this._locationChanges = location.subscribe(function () {
                if (containerInstance.bottomSheetConfig.closeOnNavigation) {
                    _this.dismiss();
                }
            });
        }
    }
    /**
     * Dismisses the bottom sheet.
     * @param result Data to be passed back to the bottom sheet opener.
     */
    /**
     * Dismisses the bottom sheet.
     * @param {?=} result Data to be passed back to the bottom sheet opener.
     * @return {?}
     */
    MatBottomSheetRef.prototype.dismiss = /**
     * Dismisses the bottom sheet.
     * @param {?=} result Data to be passed back to the bottom sheet opener.
     * @return {?}
     */
    function (result) {
        var _this = this;
        if (!this._afterDismissed.closed) {
            // Transition the backdrop in parallel to the bottom sheet.
            this.containerInstance._animationStateChanged.pipe(filter(function (event) { return event.phaseName === 'start'; }), take(1)).subscribe(function () { return _this._overlayRef.detachBackdrop(); });
            this._result = result;
            this.containerInstance.exit();
        }
    };
    /** Gets an observable that is notified when the bottom sheet is finished closing. */
    /**
     * Gets an observable that is notified when the bottom sheet is finished closing.
     * @return {?}
     */
    MatBottomSheetRef.prototype.afterDismissed = /**
     * Gets an observable that is notified when the bottom sheet is finished closing.
     * @return {?}
     */
    function () {
        return this._afterDismissed.asObservable();
    };
    /** Gets an observable that is notified when the bottom sheet has opened and appeared. */
    /**
     * Gets an observable that is notified when the bottom sheet has opened and appeared.
     * @return {?}
     */
    MatBottomSheetRef.prototype.afterOpened = /**
     * Gets an observable that is notified when the bottom sheet has opened and appeared.
     * @return {?}
     */
    function () {
        return this._afterOpened.asObservable();
    };
    /**
     * Gets an observable that emits when the overlay's backdrop has been clicked.
     */
    /**
     * Gets an observable that emits when the overlay's backdrop has been clicked.
     * @return {?}
     */
    MatBottomSheetRef.prototype.backdropClick = /**
     * Gets an observable that emits when the overlay's backdrop has been clicked.
     * @return {?}
     */
    function () {
        return this._overlayRef.backdropClick();
    };
    /**
     * Gets an observable that emits when keydown events are targeted on the overlay.
     */
    /**
     * Gets an observable that emits when keydown events are targeted on the overlay.
     * @return {?}
     */
    MatBottomSheetRef.prototype.keydownEvents = /**
     * Gets an observable that emits when keydown events are targeted on the overlay.
     * @return {?}
     */
    function () {
        return this._overlayRef.keydownEvents();
    };
    return MatBottomSheetRef;
}());
/**
 * Reference to a bottom sheet dispatched from the bottom sheet service.
 * @template T, R
 */
export { MatBottomSheetRef };
function MatBottomSheetRef_tsickle_Closure_declarations() {
    /**
     * Instance of the component making up the content of the bottom sheet.
     * @type {?}
     */
    MatBottomSheetRef.prototype.instance;
    /**
     * Instance of the component into which the bottom sheet content is projected.
     * \@docs-private
     * @type {?}
     */
    MatBottomSheetRef.prototype.containerInstance;
    /**
     * Subject for notifying the user that the bottom sheet has been dismissed.
     * @type {?}
     */
    MatBottomSheetRef.prototype._afterDismissed;
    /**
     * Subject for notifying the user that the bottom sheet has opened and appeared.
     * @type {?}
     */
    MatBottomSheetRef.prototype._afterOpened;
    /**
     * Result to be passed down to the `afterDismissed` stream.
     * @type {?}
     */
    MatBottomSheetRef.prototype._result;
    /**
     * Subscription to changes in the user's location.
     * @type {?}
     */
    MatBottomSheetRef.prototype._locationChanges;
    /** @type {?} */
    MatBottomSheetRef.prototype._overlayRef;
}
//# sourceMappingURL=bottom-sheet-ref.js.map