"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
var keycodes_1 = require("@angular/cdk/keycodes");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
// TODO(jelbourn): resizing
// Counter for unique dialog ids.
var uniqueId = 0;
/**
 * Reference to a dialog opened via the MatDialog service.
 */
var /**
 * Reference to a dialog opened via the MatDialog service.
 */
MatDialogRef = /** @class */ (function () {
    function MatDialogRef(_overlayRef, _containerInstance, location, id) {
        if (id === void 0) { id = "mat-dialog-" + uniqueId++; }
        var _this = this;
        this._overlayRef = _overlayRef;
        this._containerInstance = _containerInstance;
        this.id = id;
        /** Whether the user is allowed to close the dialog. */
        this.disableClose = this._containerInstance._config.disableClose;
        /** Subject for notifying the user that the dialog has finished opening. */
        this._afterOpened = new rxjs_1.Subject();
        /** Subject for notifying the user that the dialog has finished closing. */
        this._afterClosed = new rxjs_1.Subject();
        /** Subject for notifying the user that the dialog has started closing. */
        this._beforeClosed = new rxjs_1.Subject();
        /** Subscription to changes in the user's location. */
        this._locationChanges = rxjs_1.Subscription.EMPTY;
        // Pass the id along to the container.
        _containerInstance._id = id;
        // Emit when opening animation completes
        _containerInstance._animationStateChanged.pipe(operators_1.filter(function (event) { return event.phaseName === 'done' && event.toState === 'enter'; }), operators_1.take(1))
            .subscribe(function () {
            _this._afterOpened.next();
            _this._afterOpened.complete();
        });
        // Dispose overlay when closing animation is complete
        _containerInstance._animationStateChanged.pipe(operators_1.filter(function (event) { return event.phaseName === 'done' && event.toState === 'exit'; }), operators_1.take(1)).subscribe(function () { return _this._overlayRef.dispose(); });
        _overlayRef.detachments().subscribe(function () {
            _this._beforeClosed.next(_this._result);
            _this._beforeClosed.complete();
            _this._locationChanges.unsubscribe();
            _this._afterClosed.next(_this._result);
            _this._afterClosed.complete();
            _this.componentInstance = (null);
            _this._overlayRef.dispose();
        });
        _overlayRef.keydownEvents()
            .pipe(operators_1.filter(function (event) { return event.keyCode === keycodes_1.ESCAPE && !_this.disableClose; }))
            .subscribe(function () { return _this.close(); });
        if (location) {
            // Close the dialog when the user goes forwards/backwards in history or when the location
            // hash changes. Note that this usually doesn't include clicking on links (unless the user
            // is using the `HashLocationStrategy`).
            this._locationChanges = location.subscribe(function () {
                if (_this._containerInstance._config.closeOnNavigation) {
                    _this.close();
                }
            });
        }
    }
    /**
     * Close the dialog.
     * @param dialogResult Optional result to return to the dialog opener.
     */
    /**
       * Close the dialog.
       * @param dialogResult Optional result to return to the dialog opener.
       */
    MatDialogRef.prototype.close = /**
       * Close the dialog.
       * @param dialogResult Optional result to return to the dialog opener.
       */
    function (dialogResult) {
        var _this = this;
        this._result = dialogResult;
        // Transition the backdrop in parallel to the dialog.
        this._containerInstance._animationStateChanged.pipe(operators_1.filter(function (event) { return event.phaseName === 'start'; }), operators_1.take(1))
            .subscribe(function () {
            _this._beforeClosed.next(dialogResult);
            _this._beforeClosed.complete();
            _this._overlayRef.detachBackdrop();
        });
        this._containerInstance._startExitAnimation();
    };
    /**
     * Gets an observable that is notified when the dialog is finished opening.
     */
    /**
       * Gets an observable that is notified when the dialog is finished opening.
       */
    MatDialogRef.prototype.afterOpened = /**
       * Gets an observable that is notified when the dialog is finished opening.
       */
    function () {
        return this._afterOpened.asObservable();
    };
    /**
     * Gets an observable that is notified when the dialog is finished closing.
     */
    /**
       * Gets an observable that is notified when the dialog is finished closing.
       */
    MatDialogRef.prototype.afterClosed = /**
       * Gets an observable that is notified when the dialog is finished closing.
       */
    function () {
        return this._afterClosed.asObservable();
    };
    /**
     * Gets an observable that is notified when the dialog has started closing.
     */
    /**
       * Gets an observable that is notified when the dialog has started closing.
       */
    MatDialogRef.prototype.beforeClosed = /**
       * Gets an observable that is notified when the dialog has started closing.
       */
    function () {
        return this._beforeClosed.asObservable();
    };
    /**
     * Gets an observable that emits when the overlay's backdrop has been clicked.
     */
    /**
       * Gets an observable that emits when the overlay's backdrop has been clicked.
       */
    MatDialogRef.prototype.backdropClick = /**
       * Gets an observable that emits when the overlay's backdrop has been clicked.
       */
    function () {
        return this._overlayRef.backdropClick();
    };
    /**
     * Gets an observable that emits when keydown events are targeted on the overlay.
     */
    /**
       * Gets an observable that emits when keydown events are targeted on the overlay.
       */
    MatDialogRef.prototype.keydownEvents = /**
       * Gets an observable that emits when keydown events are targeted on the overlay.
       */
    function () {
        return this._overlayRef.keydownEvents();
    };
    /**
     * Updates the dialog's position.
     * @param position New dialog position.
     */
    /**
       * Updates the dialog's position.
       * @param position New dialog position.
       */
    MatDialogRef.prototype.updatePosition = /**
       * Updates the dialog's position.
       * @param position New dialog position.
       */
    function (position) {
        var strategy = this._getPositionStrategy();
        if (position && (position.left || position.right)) {
            position.left ? strategy.left(position.left) : strategy.right(position.right);
        }
        else {
            strategy.centerHorizontally();
        }
        if (position && (position.top || position.bottom)) {
            position.top ? strategy.top(position.top) : strategy.bottom(position.bottom);
        }
        else {
            strategy.centerVertically();
        }
        this._overlayRef.updatePosition();
        return this;
    };
    /**
     * Updates the dialog's width and height.
     * @param width New width of the dialog.
     * @param height New height of the dialog.
     */
    /**
       * Updates the dialog's width and height.
       * @param width New width of the dialog.
       * @param height New height of the dialog.
       */
    MatDialogRef.prototype.updateSize = /**
       * Updates the dialog's width and height.
       * @param width New width of the dialog.
       * @param height New height of the dialog.
       */
    function (width, height) {
        if (width === void 0) { width = ''; }
        if (height === void 0) { height = ''; }
        this._getPositionStrategy().width(width).height(height);
        this._overlayRef.updatePosition();
        return this;
    };
    /**
     * Gets an observable that is notified when the dialog is finished opening.
     * @deprecated Use `afterOpened` instead.
     * @breaking-change 8.0.0
     */
    /**
       * Gets an observable that is notified when the dialog is finished opening.
       * @deprecated Use `afterOpened` instead.
       * @breaking-change 8.0.0
       */
    MatDialogRef.prototype.afterOpen = /**
       * Gets an observable that is notified when the dialog is finished opening.
       * @deprecated Use `afterOpened` instead.
       * @breaking-change 8.0.0
       */
    function () {
        return this.afterOpened();
    };
    /**
     * Gets an observable that is notified when the dialog has started closing.
     * @deprecated Use `beforeClosed` instead.
     * @breaking-change 8.0.0
     */
    /**
       * Gets an observable that is notified when the dialog has started closing.
       * @deprecated Use `beforeClosed` instead.
       * @breaking-change 8.0.0
       */
    MatDialogRef.prototype.beforeClose = /**
       * Gets an observable that is notified when the dialog has started closing.
       * @deprecated Use `beforeClosed` instead.
       * @breaking-change 8.0.0
       */
    function () {
        return this.beforeClosed();
    };
    /** Fetches the position strategy object from the overlay ref. */
    /** Fetches the position strategy object from the overlay ref. */
    MatDialogRef.prototype._getPositionStrategy = /** Fetches the position strategy object from the overlay ref. */
    function () {
        return this._overlayRef.getConfig().positionStrategy;
    };
    return MatDialogRef;
}());
exports.MatDialogRef = MatDialogRef;
//# sourceMappingURL=dialog-ref.js.map