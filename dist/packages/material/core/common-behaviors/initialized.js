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
var rxjs_1 = require("rxjs");
/** Mixin to augment a directive with an initialized property that will emits when ngOnInit ends. */
function mixinInitialized(base) {
    return /** @class */ (function (_super) {
        __extends(class_1, _super);
        function class_1() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var _this = _super.apply(this, args) || this;
            /** Whether this directive has been marked as initialized. */
            _this._isInitialized = false;
            /**
                 * List of subscribers that subscribed before the directive was initialized. Should be notified
                 * during _markInitialized. Set to null after pending subscribers are notified, and should
                 * not expect to be populated after.
                 */
            _this._pendingSubscribers = [];
            /**
                 * Observable stream that emits when the directive initializes. If already initialized, the
                 * subscriber is stored to be notified once _markInitialized is called.
                 */
            _this.initialized = new rxjs_1.Observable(function (subscriber) {
                // If initialized, immediately notify the subscriber. Otherwise store the subscriber to notify
                // when _markInitialized is called.
                if (_this._isInitialized) {
                    _this._notifySubscriber(subscriber);
                }
                else {
                    _this._pendingSubscribers.push(subscriber);
                }
            });
            return _this;
        }
        /**
         * Marks the state as initialized and notifies pending subscribers. Should be called at the end
         * of ngOnInit.
         * @docs-private
         */
        /**
             * Marks the state as initialized and notifies pending subscribers. Should be called at the end
             * of ngOnInit.
             * @docs-private
             */
        class_1.prototype._markInitialized = /**
             * Marks the state as initialized and notifies pending subscribers. Should be called at the end
             * of ngOnInit.
             * @docs-private
             */
        function () {
            if (this._isInitialized) {
                throw Error('This directive has already been marked as initialized and ' +
                    'should not be called twice.');
            }
            this._isInitialized = true;
            this._pendingSubscribers.forEach(this._notifySubscriber);
            this._pendingSubscribers = null;
        };
        /** Emits and completes the subscriber stream (should only emit once). */
        /** Emits and completes the subscriber stream (should only emit once). */
        class_1.prototype._notifySubscriber = /** Emits and completes the subscriber stream (should only emit once). */
        function (subscriber) {
            subscriber.next();
            subscriber.complete();
        };
        return class_1;
    }(base));
}
exports.mixinInitialized = mixinInitialized;
//# sourceMappingURL=initialized.js.map