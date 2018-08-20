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
var core_1 = require("@angular/core");
var coercion_1 = require("@angular/cdk/coercion");
var core_2 = require("@angular/material/core");
var sort_errors_1 = require("./sort-errors");
var rxjs_1 = require("rxjs");
// Boilerplate for applying mixins to MatSort.
/** @docs-private */
var 
// Boilerplate for applying mixins to MatSort.
/** @docs-private */
MatSortBase = /** @class */ (function () {
    function MatSortBase() {
    }
    return MatSortBase;
}());
exports.MatSortBase = MatSortBase;
exports._MatSortMixinBase = core_2.mixinInitialized(core_2.mixinDisabled(MatSortBase));
/** Container for MatSortables to manage the sort state and provide default sort parameters. */
var MatSort = /** @class */ (function (_super) {
    __extends(MatSort, _super);
    function MatSort() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /** Collection of all registered sortables that this directive manages. */
        _this.sortables = new Map();
        /** Used to notify any child components listening to state changes. */
        _this._stateChanges = new rxjs_1.Subject();
        /**
           * The direction to set when an MatSortable is initially sorted.
           * May be overriden by the MatSortable's sort start.
           */
        _this.start = 'asc';
        _this._direction = '';
        /** Event emitted when the user changes either the active sort or sort direction. */
        _this.sortChange = new core_1.EventEmitter();
        return _this;
    }
    Object.defineProperty(MatSort.prototype, "direction", {
        get: /** The sort direction of the currently active MatSortable. */
        function () { return this._direction; },
        set: function (direction) {
            if (core_1.isDevMode() && direction && direction !== 'asc' && direction !== 'desc') {
                throw sort_errors_1.getSortInvalidDirectionError(direction);
            }
            this._direction = direction;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatSort.prototype, "disableClear", {
        get: /**
           * Whether to disable the user from clearing the sort by finishing the sort direction cycle.
           * May be overriden by the MatSortable's disable clear input.
           */
        function () { return this._disableClear; },
        set: function (v) { this._disableClear = coercion_1.coerceBooleanProperty(v); },
        enumerable: true,
        configurable: true
    });
    /**
     * Register function to be used by the contained MatSortables. Adds the MatSortable to the
     * collection of MatSortables.
     */
    /**
       * Register function to be used by the contained MatSortables. Adds the MatSortable to the
       * collection of MatSortables.
       */
    MatSort.prototype.register = /**
       * Register function to be used by the contained MatSortables. Adds the MatSortable to the
       * collection of MatSortables.
       */
    function (sortable) {
        if (!sortable.id) {
            throw sort_errors_1.getSortHeaderMissingIdError();
        }
        if (this.sortables.has(sortable.id)) {
            throw sort_errors_1.getSortDuplicateSortableIdError(sortable.id);
        }
        this.sortables.set(sortable.id, sortable);
    };
    /**
     * Unregister function to be used by the contained MatSortables. Removes the MatSortable from the
     * collection of contained MatSortables.
     */
    /**
       * Unregister function to be used by the contained MatSortables. Removes the MatSortable from the
       * collection of contained MatSortables.
       */
    MatSort.prototype.deregister = /**
       * Unregister function to be used by the contained MatSortables. Removes the MatSortable from the
       * collection of contained MatSortables.
       */
    function (sortable) {
        this.sortables.delete(sortable.id);
    };
    /** Sets the active sort id and determines the new sort direction. */
    /** Sets the active sort id and determines the new sort direction. */
    MatSort.prototype.sort = /** Sets the active sort id and determines the new sort direction. */
    function (sortable) {
        if (this.active != sortable.id) {
            this.active = sortable.id;
            this.direction = sortable.start ? sortable.start : this.start;
        }
        else {
            this.direction = this.getNextSortDirection(sortable);
        }
        this.sortChange.emit({ active: this.active, direction: this.direction });
    };
    /** Returns the next sort direction of the active sortable, checking for potential overrides. */
    /** Returns the next sort direction of the active sortable, checking for potential overrides. */
    MatSort.prototype.getNextSortDirection = /** Returns the next sort direction of the active sortable, checking for potential overrides. */
    function (sortable) {
        if (!sortable) {
            return '';
        }
        // Get the sort direction cycle with the potential sortable overrides.
        var disableClear = sortable.disableClear != null ? sortable.disableClear : this.disableClear;
        var sortDirectionCycle = getSortDirectionCycle(sortable.start || this.start, disableClear);
        // Get and return the next direction in the cycle
        var nextDirectionIndex = sortDirectionCycle.indexOf(this.direction) + 1;
        if (nextDirectionIndex >= sortDirectionCycle.length) {
            nextDirectionIndex = 0;
        }
        return sortDirectionCycle[nextDirectionIndex];
    };
    MatSort.prototype.ngOnInit = function () {
        this._markInitialized();
    };
    MatSort.prototype.ngOnChanges = function () {
        this._stateChanges.next();
    };
    MatSort.prototype.ngOnDestroy = function () {
        this._stateChanges.complete();
    };
    MatSort.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[matSort]',
                    exportAs: 'matSort',
                    inputs: ['disabled: matSortDisabled']
                },] },
    ];
    /** @nocollapse */
    MatSort.propDecorators = {
        "active": [{ type: core_1.Input, args: ['matSortActive',] },],
        "start": [{ type: core_1.Input, args: ['matSortStart',] },],
        "direction": [{ type: core_1.Input, args: ['matSortDirection',] },],
        "disableClear": [{ type: core_1.Input, args: ['matSortDisableClear',] },],
        "sortChange": [{ type: core_1.Output, args: ['matSortChange',] },],
    };
    return MatSort;
}(exports._MatSortMixinBase));
exports.MatSort = MatSort;
/** Returns the sort direction cycle to use given the provided parameters of order and clear. */
function getSortDirectionCycle(start, disableClear) {
    var sortOrder = ['asc', 'desc'];
    if (start == 'desc') {
        sortOrder.reverse();
    }
    if (!disableClear) {
        sortOrder.push('');
    }
    return sortOrder;
}
//# sourceMappingURL=sort.js.map