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
import { Subject } from 'rxjs';
/**
 * Event that is emitted when a snack bar is dismissed.
 * @record
 */
export function MatSnackBarDismiss() { }
function MatSnackBarDismiss_tsickle_Closure_declarations() {
    /**
     * Whether the snack bar was dismissed using the action button.
     * @type {?}
     */
    MatSnackBarDismiss.prototype.dismissedByAction;
}
/**
 * Reference to a snack bar dispatched from the snack bar service.
 * @template T
 */
var /**
 * Reference to a snack bar dispatched from the snack bar service.
 * @template T
 */
MatSnackBarRef = /** @class */ (function () {
    function MatSnackBarRef(containerInstance, _overlayRef) {
        var _this = this;
        this._overlayRef = _overlayRef;
        /**
         * Subject for notifying the user that the snack bar has been dismissed.
         */
        this._afterDismissed = new Subject();
        /**
         * Subject for notifying the user that the snack bar has opened and appeared.
         */
        this._afterOpened = new Subject();
        /**
         * Subject for notifying the user that the snack bar action was called.
         */
        this._onAction = new Subject();
        /**
         * Whether the snack bar was dismissed using the action button.
         */
        this._dismissedByAction = false;
        this.containerInstance = containerInstance;
        // Dismiss snackbar on action.
        this.onAction().subscribe(function () { return _this.dismiss(); });
        containerInstance._onExit.subscribe(function () { return _this._finishDismiss(); });
    }
    /** Dismisses the snack bar. */
    /**
     * Dismisses the snack bar.
     * @return {?}
     */
    MatSnackBarRef.prototype.dismiss = /**
     * Dismisses the snack bar.
     * @return {?}
     */
    function () {
        if (!this._afterDismissed.closed) {
            this.containerInstance.exit();
        }
        clearTimeout(this._durationTimeoutId);
    };
    /** Marks the snackbar action clicked. */
    /**
     * Marks the snackbar action clicked.
     * @return {?}
     */
    MatSnackBarRef.prototype.dismissWithAction = /**
     * Marks the snackbar action clicked.
     * @return {?}
     */
    function () {
        if (!this._onAction.closed) {
            this._dismissedByAction = true;
            this._onAction.next();
            this._onAction.complete();
        }
    };
    /**
     * Marks the snackbar action clicked.
     * @deprecated Use `dismissWithAction` instead.
     * @breaking-change 7.0.0
     */
    /**
     * Marks the snackbar action clicked.
     * @deprecated Use `dismissWithAction` instead.
     * \@breaking-change 7.0.0
     * @return {?}
     */
    MatSnackBarRef.prototype.closeWithAction = /**
     * Marks the snackbar action clicked.
     * @deprecated Use `dismissWithAction` instead.
     * \@breaking-change 7.0.0
     * @return {?}
     */
    function () {
        this.dismissWithAction();
    };
    /** Dismisses the snack bar after some duration */
    /**
     * Dismisses the snack bar after some duration
     * @param {?} duration
     * @return {?}
     */
    MatSnackBarRef.prototype._dismissAfter = /**
     * Dismisses the snack bar after some duration
     * @param {?} duration
     * @return {?}
     */
    function (duration) {
        var _this = this;
        this._durationTimeoutId = setTimeout(function () { return _this.dismiss(); }, duration);
    };
    /** Marks the snackbar as opened */
    /**
     * Marks the snackbar as opened
     * @return {?}
     */
    MatSnackBarRef.prototype._open = /**
     * Marks the snackbar as opened
     * @return {?}
     */
    function () {
        if (!this._afterOpened.closed) {
            this._afterOpened.next();
            this._afterOpened.complete();
        }
    };
    /**
     * Cleans up the DOM after closing.
     * @return {?}
     */
    MatSnackBarRef.prototype._finishDismiss = /**
     * Cleans up the DOM after closing.
     * @return {?}
     */
    function () {
        this._overlayRef.dispose();
        if (!this._onAction.closed) {
            this._onAction.complete();
        }
        this._afterDismissed.next({ dismissedByAction: this._dismissedByAction });
        this._afterDismissed.complete();
        this._dismissedByAction = false;
    };
    /** Gets an observable that is notified when the snack bar is finished closing. */
    /**
     * Gets an observable that is notified when the snack bar is finished closing.
     * @return {?}
     */
    MatSnackBarRef.prototype.afterDismissed = /**
     * Gets an observable that is notified when the snack bar is finished closing.
     * @return {?}
     */
    function () {
        return this._afterDismissed.asObservable();
    };
    /** Gets an observable that is notified when the snack bar has opened and appeared. */
    /**
     * Gets an observable that is notified when the snack bar has opened and appeared.
     * @return {?}
     */
    MatSnackBarRef.prototype.afterOpened = /**
     * Gets an observable that is notified when the snack bar has opened and appeared.
     * @return {?}
     */
    function () {
        return this.containerInstance._onEnter;
    };
    /** Gets an observable that is notified when the snack bar action is called. */
    /**
     * Gets an observable that is notified when the snack bar action is called.
     * @return {?}
     */
    MatSnackBarRef.prototype.onAction = /**
     * Gets an observable that is notified when the snack bar action is called.
     * @return {?}
     */
    function () {
        return this._onAction.asObservable();
    };
    return MatSnackBarRef;
}());
/**
 * Reference to a snack bar dispatched from the snack bar service.
 * @template T
 */
export { MatSnackBarRef };
function MatSnackBarRef_tsickle_Closure_declarations() {
    /**
     * The instance of the component making up the content of the snack bar.
     * @type {?}
     */
    MatSnackBarRef.prototype.instance;
    /**
     * The instance of the component making up the content of the snack bar.
     * \@docs-private
     * @type {?}
     */
    MatSnackBarRef.prototype.containerInstance;
    /**
     * Subject for notifying the user that the snack bar has been dismissed.
     * @type {?}
     */
    MatSnackBarRef.prototype._afterDismissed;
    /**
     * Subject for notifying the user that the snack bar has opened and appeared.
     * @type {?}
     */
    MatSnackBarRef.prototype._afterOpened;
    /**
     * Subject for notifying the user that the snack bar action was called.
     * @type {?}
     */
    MatSnackBarRef.prototype._onAction;
    /**
     * Timeout ID for the duration setTimeout call. Used to clear the timeout if the snackbar is
     * dismissed before the duration passes.
     * @type {?}
     */
    MatSnackBarRef.prototype._durationTimeoutId;
    /**
     * Whether the snack bar was dismissed using the action button.
     * @type {?}
     */
    MatSnackBarRef.prototype._dismissedByAction;
    /** @type {?} */
    MatSnackBarRef.prototype._overlayRef;
}
//# sourceMappingURL=snack-bar-ref.js.map