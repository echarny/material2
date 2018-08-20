"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var i0 = require("@angular/core");
/**
 * Class to coordinate unique selection based on name.
 * Intended to be consumed as an Angular service.
 * This service is needed because native radio change events are only fired on the item currently
 * being selected, and we still need to uncheck the previous selection.
 *
 * This service does not *store* any IDs and names because they may change at any time, so it is
 * less error-prone if they are simply passed through when the events occur.
 */
var UniqueSelectionDispatcher = /** @class */ (function () {
    function UniqueSelectionDispatcher() {
        this._listeners = [];
    }
    /**
     * Notify other items that selection for the given name has been set.
     * @param id ID of the item.
     * @param name Name of the item.
     */
    /**
       * Notify other items that selection for the given name has been set.
       * @param id ID of the item.
       * @param name Name of the item.
       */
    UniqueSelectionDispatcher.prototype.notify = /**
       * Notify other items that selection for the given name has been set.
       * @param id ID of the item.
       * @param name Name of the item.
       */
    function (id, name) {
        for (var _i = 0, _a = this._listeners; _i < _a.length; _i++) {
            var listener = _a[_i];
            listener(id, name);
        }
    };
    /**
     * Listen for future changes to item selection.
     * @return Function used to deregister listener
     */
    /**
       * Listen for future changes to item selection.
       * @return Function used to deregister listener
       */
    UniqueSelectionDispatcher.prototype.listen = /**
       * Listen for future changes to item selection.
       * @return Function used to deregister listener
       */
    function (listener) {
        var _this = this;
        this._listeners.push(listener);
        return function () {
            _this._listeners = _this._listeners.filter(function (registered) {
                return listener !== registered;
            });
        };
    };
    UniqueSelectionDispatcher.prototype.ngOnDestroy = function () {
        this._listeners = [];
    };
    UniqueSelectionDispatcher.decorators = [
        { type: core_1.Injectable, args: [{ providedIn: 'root' },] },
    ];
    UniqueSelectionDispatcher.ngInjectableDef = i0.defineInjectable({ factory: function UniqueSelectionDispatcher_Factory() { return new UniqueSelectionDispatcher(); }, token: UniqueSelectionDispatcher, providedIn: "root" });
    return UniqueSelectionDispatcher;
}());
exports.UniqueSelectionDispatcher = UniqueSelectionDispatcher;
//# sourceMappingURL=unique-selection-dispatcher.js.map