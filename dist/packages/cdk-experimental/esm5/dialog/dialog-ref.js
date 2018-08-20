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
import { map, filter } from 'rxjs/operators';
/**
 * Unique id for the created dialog.
 */
var /** @type {?} */ uniqueId = 0;
/**
 * Reference to a dialog opened via the Dialog service.
 * @template T, R
 */
var /**
 * Reference to a dialog opened via the Dialog service.
 * @template T, R
 */
DialogRef = /** @class */ (function () {
    function DialogRef(_overlayRef, _containerInstance, id) {
        if (id === void 0) { id = "dialog-" + uniqueId++; }
        var _this = this;
        this._overlayRef = _overlayRef;
        this._containerInstance = _containerInstance;
        this.id = id;
        // If the dialog has a backdrop, handle clicks from the backdrop.
        if (_containerInstance._config.hasBackdrop) {
            _overlayRef.backdropClick().subscribe(function () {
                if (!_this.disableClose) {
                    _this.close();
                }
            });
        }
        this.beforeClosed().subscribe(function () {
            _this._overlayRef.detachBackdrop();
        });
        this.afterClosed().subscribe(function () {
            _this._overlayRef.detach();
            _this._overlayRef.dispose();
            _this.componentInstance = /** @type {?} */ ((null));
        });
        // Close when escape keydown event occurs
        _overlayRef.keydownEvents()
            .pipe(filter(function (event) { return event.keyCode === ESCAPE && !_this.disableClose; }))
            .subscribe(function () { return _this.close(); });
    }
    /** Gets an observable that emits when the overlay's backdrop has been clicked. */
    /**
     * Gets an observable that emits when the overlay's backdrop has been clicked.
     * @return {?}
     */
    DialogRef.prototype.backdropClick = /**
     * Gets an observable that emits when the overlay's backdrop has been clicked.
     * @return {?}
     */
    function () {
        return this._overlayRef.backdropClick();
    };
    /**
     * Close the dialog.
     * @param dialogResult Optional result to return to the dialog opener.
     */
    /**
     * Close the dialog.
     * @param {?=} dialogResult Optional result to return to the dialog opener.
     * @return {?}
     */
    DialogRef.prototype.close = /**
     * Close the dialog.
     * @param {?=} dialogResult Optional result to return to the dialog opener.
     * @return {?}
     */
    function (dialogResult) {
        this._result = dialogResult;
        this._containerInstance._startExiting();
    };
    /**
     * Updates the dialog's position.
     * @param position New dialog position.
     */
    /**
     * Updates the dialog's position.
     * @param {?=} position New dialog position.
     * @return {?}
     */
    DialogRef.prototype.updatePosition = /**
     * Updates the dialog's position.
     * @param {?=} position New dialog position.
     * @return {?}
     */
    function (position) {
        var /** @type {?} */ strategy = this._getPositionStrategy();
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
     * Gets an observable that emits when keydown events are targeted on the overlay.
     */
    /**
     * Gets an observable that emits when keydown events are targeted on the overlay.
     * @return {?}
     */
    DialogRef.prototype.keydownEvents = /**
     * Gets an observable that emits when keydown events are targeted on the overlay.
     * @return {?}
     */
    function () {
        return this._overlayRef.keydownEvents();
    };
    /**
     * Updates the dialog's width and height, defined, min and max.
     * @param size New size for the overlay.
     */
    /**
     * Updates the dialog's width and height, defined, min and max.
     * @param {?} size New size for the overlay.
     * @return {?}
     */
    DialogRef.prototype.updateSize = /**
     * Updates the dialog's width and height, defined, min and max.
     * @param {?} size New size for the overlay.
     * @return {?}
     */
    function (size) {
        if (size.width) {
            this._getPositionStrategy().width(size.width.toString());
        }
        if (size.height) {
            this._getPositionStrategy().height(size.height.toString());
        }
        this._overlayRef.updateSize(size);
        this._overlayRef.updatePosition();
        return this;
    };
    /**
     * Fetches the position strategy object from the overlay ref.
     * @return {?}
     */
    DialogRef.prototype._getPositionStrategy = /**
     * Fetches the position strategy object from the overlay ref.
     * @return {?}
     */
    function () {
        return /** @type {?} */ (this._overlayRef.getConfig().positionStrategy);
    };
    /** Gets an observable that emits when dialog begins opening. */
    /**
     * Gets an observable that emits when dialog begins opening.
     * @return {?}
     */
    DialogRef.prototype.beforeOpened = /**
     * Gets an observable that emits when dialog begins opening.
     * @return {?}
     */
    function () {
        return this._containerInstance._beforeEnter.asObservable();
    };
    /** Gets an observable that emits when dialog is finished opening. */
    /**
     * Gets an observable that emits when dialog is finished opening.
     * @return {?}
     */
    DialogRef.prototype.afterOpened = /**
     * Gets an observable that emits when dialog is finished opening.
     * @return {?}
     */
    function () {
        return this._containerInstance._afterEnter.asObservable();
    };
    /** Gets an observable that emits when dialog begins closing. */
    /**
     * Gets an observable that emits when dialog begins closing.
     * @return {?}
     */
    DialogRef.prototype.beforeClosed = /**
     * Gets an observable that emits when dialog begins closing.
     * @return {?}
     */
    function () {
        var _this = this;
        return this._containerInstance._beforeExit.pipe(map(function () { return _this._result; }));
    };
    /** Gets an observable that emits when dialog is finished closing. */
    /**
     * Gets an observable that emits when dialog is finished closing.
     * @return {?}
     */
    DialogRef.prototype.afterClosed = /**
     * Gets an observable that emits when dialog is finished closing.
     * @return {?}
     */
    function () {
        var _this = this;
        return this._containerInstance._afterExit.pipe(map(function () { return _this._result; }));
    };
    return DialogRef;
}());
/**
 * Reference to a dialog opened via the Dialog service.
 * @template T, R
 */
export { DialogRef };
function DialogRef_tsickle_Closure_declarations() {
    /**
     * The instance of the component in the dialog.
     * @type {?}
     */
    DialogRef.prototype.componentInstance;
    /**
     * Whether the user is allowed to close the dialog.
     * @type {?}
     */
    DialogRef.prototype.disableClose;
    /**
     * Result to be passed to afterClosed.
     * @type {?}
     */
    DialogRef.prototype._result;
    /** @type {?} */
    DialogRef.prototype._overlayRef;
    /** @type {?} */
    DialogRef.prototype._containerInstance;
    /** @type {?} */
    DialogRef.prototype.id;
}
//# sourceMappingURL=dialog-ref.js.map