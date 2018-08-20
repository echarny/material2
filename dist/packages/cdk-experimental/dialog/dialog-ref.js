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
var operators_1 = require("rxjs/operators");
/** Unique id for the created dialog. */
var uniqueId = 0;
/**
 * Reference to a dialog opened via the Dialog service.
 */
var /**
 * Reference to a dialog opened via the Dialog service.
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
            _this.componentInstance = (null);
        });
        // Close when escape keydown event occurs
        _overlayRef.keydownEvents()
            .pipe(operators_1.filter(function (event) { return event.keyCode === keycodes_1.ESCAPE && !_this.disableClose; }))
            .subscribe(function () { return _this.close(); });
    }
    /** Gets an observable that emits when the overlay's backdrop has been clicked. */
    /** Gets an observable that emits when the overlay's backdrop has been clicked. */
    DialogRef.prototype.backdropClick = /** Gets an observable that emits when the overlay's backdrop has been clicked. */
    function () {
        return this._overlayRef.backdropClick();
    };
    /**
     * Close the dialog.
     * @param dialogResult Optional result to return to the dialog opener.
     */
    /**
       * Close the dialog.
       * @param dialogResult Optional result to return to the dialog opener.
       */
    DialogRef.prototype.close = /**
       * Close the dialog.
       * @param dialogResult Optional result to return to the dialog opener.
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
       * @param position New dialog position.
       */
    DialogRef.prototype.updatePosition = /**
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
     * Gets an observable that emits when keydown events are targeted on the overlay.
     */
    /**
       * Gets an observable that emits when keydown events are targeted on the overlay.
       */
    DialogRef.prototype.keydownEvents = /**
       * Gets an observable that emits when keydown events are targeted on the overlay.
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
       * @param size New size for the overlay.
       */
    DialogRef.prototype.updateSize = /**
       * Updates the dialog's width and height, defined, min and max.
       * @param size New size for the overlay.
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
    /** Fetches the position strategy object from the overlay ref. */
    /** Fetches the position strategy object from the overlay ref. */
    DialogRef.prototype._getPositionStrategy = /** Fetches the position strategy object from the overlay ref. */
    function () {
        return this._overlayRef.getConfig().positionStrategy;
    };
    /** Gets an observable that emits when dialog begins opening. */
    /** Gets an observable that emits when dialog begins opening. */
    DialogRef.prototype.beforeOpened = /** Gets an observable that emits when dialog begins opening. */
    function () {
        return this._containerInstance._beforeEnter.asObservable();
    };
    /** Gets an observable that emits when dialog is finished opening. */
    /** Gets an observable that emits when dialog is finished opening. */
    DialogRef.prototype.afterOpened = /** Gets an observable that emits when dialog is finished opening. */
    function () {
        return this._containerInstance._afterEnter.asObservable();
    };
    /** Gets an observable that emits when dialog begins closing. */
    /** Gets an observable that emits when dialog begins closing. */
    DialogRef.prototype.beforeClosed = /** Gets an observable that emits when dialog begins closing. */
    function () {
        var _this = this;
        return this._containerInstance._beforeExit.pipe(operators_1.map(function () { return _this._result; }));
    };
    /** Gets an observable that emits when dialog is finished closing. */
    /** Gets an observable that emits when dialog is finished closing. */
    DialogRef.prototype.afterClosed = /** Gets an observable that emits when dialog is finished closing. */
    function () {
        var _this = this;
        return this._containerInstance._afterExit.pipe(operators_1.map(function () { return _this._result; }));
    };
    return DialogRef;
}());
exports.DialogRef = DialogRef;
//# sourceMappingURL=dialog-ref.js.map