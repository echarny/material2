"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
/**
 * Reference to a snack bar dispatched from the snack bar service.
 */
var /**
 * Reference to a snack bar dispatched from the snack bar service.
 */
MatSnackBarRef = /** @class */ (function () {
    function MatSnackBarRef(containerInstance, _overlayRef) {
        var _this = this;
        this._overlayRef = _overlayRef;
        /** Subject for notifying the user that the snack bar has been dismissed. */
        this._afterDismissed = new rxjs_1.Subject();
        /** Subject for notifying the user that the snack bar has opened and appeared. */
        this._afterOpened = new rxjs_1.Subject();
        /** Subject for notifying the user that the snack bar action was called. */
        this._onAction = new rxjs_1.Subject();
        /** Whether the snack bar was dismissed using the action button. */
        this._dismissedByAction = false;
        this.containerInstance = containerInstance;
        // Dismiss snackbar on action.
        this.onAction().subscribe(function () { return _this.dismiss(); });
        containerInstance._onExit.subscribe(function () { return _this._finishDismiss(); });
    }
    /** Dismisses the snack bar. */
    /** Dismisses the snack bar. */
    MatSnackBarRef.prototype.dismiss = /** Dismisses the snack bar. */
    function () {
        if (!this._afterDismissed.closed) {
            this.containerInstance.exit();
        }
        clearTimeout(this._durationTimeoutId);
    };
    /** Marks the snackbar action clicked. */
    /** Marks the snackbar action clicked. */
    MatSnackBarRef.prototype.dismissWithAction = /** Marks the snackbar action clicked. */
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
       * @breaking-change 7.0.0
       */
    MatSnackBarRef.prototype.closeWithAction = /**
       * Marks the snackbar action clicked.
       * @deprecated Use `dismissWithAction` instead.
       * @breaking-change 7.0.0
       */
    function () {
        this.dismissWithAction();
    };
    /** Dismisses the snack bar after some duration */
    /** Dismisses the snack bar after some duration */
    MatSnackBarRef.prototype._dismissAfter = /** Dismisses the snack bar after some duration */
    function (duration) {
        var _this = this;
        this._durationTimeoutId = setTimeout(function () { return _this.dismiss(); }, duration);
    };
    /** Marks the snackbar as opened */
    /** Marks the snackbar as opened */
    MatSnackBarRef.prototype._open = /** Marks the snackbar as opened */
    function () {
        if (!this._afterOpened.closed) {
            this._afterOpened.next();
            this._afterOpened.complete();
        }
    };
    /** Cleans up the DOM after closing. */
    /** Cleans up the DOM after closing. */
    MatSnackBarRef.prototype._finishDismiss = /** Cleans up the DOM after closing. */
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
    /** Gets an observable that is notified when the snack bar is finished closing. */
    MatSnackBarRef.prototype.afterDismissed = /** Gets an observable that is notified when the snack bar is finished closing. */
    function () {
        return this._afterDismissed.asObservable();
    };
    /** Gets an observable that is notified when the snack bar has opened and appeared. */
    /** Gets an observable that is notified when the snack bar has opened and appeared. */
    MatSnackBarRef.prototype.afterOpened = /** Gets an observable that is notified when the snack bar has opened and appeared. */
    function () {
        return this.containerInstance._onEnter;
    };
    /** Gets an observable that is notified when the snack bar action is called. */
    /** Gets an observable that is notified when the snack bar action is called. */
    MatSnackBarRef.prototype.onAction = /** Gets an observable that is notified when the snack bar action is called. */
    function () {
        return this._onAction.asObservable();
    };
    return MatSnackBarRef;
}());
exports.MatSnackBarRef = MatSnackBarRef;
//# sourceMappingURL=snack-bar-ref.js.map