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
import * as tslib_1 from "tslib";
import { Observable, of as observableOf } from 'rxjs';
import { DataSource } from './data-source';
/**
 * DataSource wrapper for a native array.
 * @template T
 */
var /**
 * DataSource wrapper for a native array.
 * @template T
 */
ArrayDataSource = /** @class */ (function (_super) {
    tslib_1.__extends(ArrayDataSource, _super);
    function ArrayDataSource(_data) {
        var _this = _super.call(this) || this;
        _this._data = _data;
        return _this;
    }
    /**
     * @return {?}
     */
    ArrayDataSource.prototype.connect = /**
     * @return {?}
     */
    function () {
        return this._data instanceof Observable ? this._data : observableOf(this._data);
    };
    /**
     * @return {?}
     */
    ArrayDataSource.prototype.disconnect = /**
     * @return {?}
     */
    function () { };
    return ArrayDataSource;
}(DataSource));
/**
 * DataSource wrapper for a native array.
 * @template T
 */
export { ArrayDataSource };
function ArrayDataSource_tsickle_Closure_declarations() {
    /** @type {?} */
    ArrayDataSource.prototype._data;
}
//# sourceMappingURL=array-data-source.js.map