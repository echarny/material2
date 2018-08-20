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
/**
 * Reference to a bottom sheet dispatched from the bottom sheet service.
 */
var /**
 * Reference to a bottom sheet dispatched from the bottom sheet service.
 */
MatBottomSheetRef = /** @class */ (function () {
    function MatBottomSheetRef(containerInstance, _overlayRef, location) {
        var _this = this;
        this._overlayRef = _overlayRef;
        /** Subject for notifying the user that the bottom sheet has been dismissed. */
        this._afterDismissed = new rxjs_1.Subject();
        /** Subject for notifying the user that the bottom sheet has opened and appeared. */
        this._afterOpened = new rxjs_1.Subject();
        /** Subscription to changes in the user's location. */
        this._locationChanges = rxjs_1.Subscription.EMPTY;
        this.containerInstance = containerInstance;
        // Emit when opening animation completes
        containerInstance._animationStateChanged.pipe(operators_1.filter(function (event) { return event.phaseName === 'done' && event.toState === 'visible'; }), operators_1.take(1))
            .subscribe(function () {
            _this._afterOpened.next();
            _this._afterOpened.complete();
        });
        // Dispose overlay when closing animation is complete
        containerInstance._animationStateChanged.pipe(operators_1.filter(function (event) { return event.phaseName === 'done' && event.toState === 'hidden'; }), operators_1.take(1))
            .subscribe(function () {
            _this._locationChanges.unsubscribe();
            _this._overlayRef.dispose();
            _this._afterDismissed.next(_this._result);
            _this._afterDismissed.complete();
        });
        if (!containerInstance.bottomSheetConfig.disableClose) {
            rxjs_1.merge(_overlayRef.backdropClick(), _overlayRef.keydownEvents().pipe(operators_1.filter(function (event) { return event.keyCode === keycodes_1.ESCAPE; }))).subscribe(function () { return _this.dismiss(); });
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
       * @param result Data to be passed back to the bottom sheet opener.
       */
    MatBottomSheetRef.prototype.dismiss = /**
       * Dismisses the bottom sheet.
       * @param result Data to be passed back to the bottom sheet opener.
       */
    function (result) {
        var _this = this;
        if (!this._afterDismissed.closed) {
            // Transition the backdrop in parallel to the bottom sheet.
            this.containerInstance._animationStateChanged.pipe(operators_1.filter(function (event) { return event.phaseName === 'start'; }), operators_1.take(1)).subscribe(function () { return _this._overlayRef.detachBackdrop(); });
            this._result = result;
            this.containerInstance.exit();
        }
    };
    /** Gets an observable that is notified when the bottom sheet is finished closing. */
    /** Gets an observable that is notified when the bottom sheet is finished closing. */
    MatBottomSheetRef.prototype.afterDismissed = /** Gets an observable that is notified when the bottom sheet is finished closing. */
    function () {
        return this._afterDismissed.asObservable();
    };
    /** Gets an observable that is notified when the bottom sheet has opened and appeared. */
    /** Gets an observable that is notified when the bottom sheet has opened and appeared. */
    MatBottomSheetRef.prototype.afterOpened = /** Gets an observable that is notified when the bottom sheet has opened and appeared. */
    function () {
        return this._afterOpened.asObservable();
    };
    /**
     * Gets an observable that emits when the overlay's backdrop has been clicked.
     */
    /**
       * Gets an observable that emits when the overlay's backdrop has been clicked.
       */
    MatBottomSheetRef.prototype.backdropClick = /**
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
    MatBottomSheetRef.prototype.keydownEvents = /**
       * Gets an observable that emits when keydown events are targeted on the overlay.
       */
    function () {
        return this._overlayRef.keydownEvents();
    };
    return MatBottomSheetRef;
}());
exports.MatBottomSheetRef = MatBottomSheetRef;
//# sourceMappingURL=bottom-sheet-ref.js.map