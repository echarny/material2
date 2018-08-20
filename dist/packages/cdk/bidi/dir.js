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
var directionality_1 = require("./directionality");
/**
 * Directive to listen for changes of direction of part of the DOM.
 *
 * Provides itself as Directionality such that descendant directives only need to ever inject
 * Directionality to get the closest direction.
 */
var Dir = /** @class */ (function () {
    function Dir() {
        this._dir = 'ltr';
        /** Whether the `value` has been set to its initial value. */
        this._isInitialized = false;
        /** Event emitted when the direction changes. */
        this.change = new core_1.EventEmitter();
    }
    Object.defineProperty(Dir.prototype, "dir", {
        get: /** @docs-private */
        function () { return this._dir; },
        set: function (value) {
            var old = this._dir;
            this._dir = (value === 'ltr' || value === 'rtl') ? value : 'ltr';
            if (old !== this._dir && this._isInitialized) {
                this.change.emit(this._dir);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Dir.prototype, "value", {
        /** Current layout direction of the element. */
        get: /** Current layout direction of the element. */
        function () { return this.dir; },
        enumerable: true,
        configurable: true
    });
    /** Initialize once default value has been set. */
    /** Initialize once default value has been set. */
    Dir.prototype.ngAfterContentInit = /** Initialize once default value has been set. */
    function () {
        this._isInitialized = true;
    };
    Dir.prototype.ngOnDestroy = function () {
        this.change.complete();
    };
    Dir.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[dir]',
                    providers: [{ provide: directionality_1.Directionality, useExisting: Dir }],
                    host: { '[dir]': 'dir' },
                    exportAs: 'dir',
                },] },
    ];
    /** @nocollapse */
    Dir.propDecorators = {
        "change": [{ type: core_1.Output, args: ['dirChange',] },],
        "dir": [{ type: core_1.Input },],
    };
    return Dir;
}());
exports.Dir = Dir;
//# sourceMappingURL=dir.js.map