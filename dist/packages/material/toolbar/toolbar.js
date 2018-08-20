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
var core_2 = require("@angular/material/core");
var platform_1 = require("@angular/cdk/platform");
var common_1 = require("@angular/common");
// Boilerplate for applying mixins to MatToolbar.
/** @docs-private */
var 
// Boilerplate for applying mixins to MatToolbar.
/** @docs-private */
MatToolbarBase = /** @class */ (function () {
    function MatToolbarBase(_elementRef) {
        this._elementRef = _elementRef;
    }
    return MatToolbarBase;
}());
exports.MatToolbarBase = MatToolbarBase;
exports._MatToolbarMixinBase = core_2.mixinColor(MatToolbarBase);
var MatToolbarRow = /** @class */ (function () {
    function MatToolbarRow() {
    }
    MatToolbarRow.decorators = [
        { type: core_1.Directive, args: [{
                    selector: 'mat-toolbar-row',
                    exportAs: 'matToolbarRow',
                    host: { 'class': 'mat-toolbar-row' },
                },] },
    ];
    return MatToolbarRow;
}());
exports.MatToolbarRow = MatToolbarRow;
var MatToolbar = /** @class */ (function (_super) {
    __extends(MatToolbar, _super);
    function MatToolbar(elementRef, _platform, document) {
        var _this = _super.call(this, elementRef) || this;
        _this._platform = _platform;
        // TODO: make the document a required param when doing breaking changes.
        // TODO: make the document a required param when doing breaking changes.
        _this._document = document;
        return _this;
    }
    MatToolbar.prototype.ngAfterViewInit = function () {
        var _this = this;
        if (!core_1.isDevMode() || !this._platform.isBrowser) {
            return;
        }
        this._checkToolbarMixedModes();
        this._toolbarRows.changes.subscribe(function () { return _this._checkToolbarMixedModes(); });
    };
    /**
     * Throws an exception when developers are attempting to combine the different toolbar row modes.
     */
    /**
       * Throws an exception when developers are attempting to combine the different toolbar row modes.
       */
    MatToolbar.prototype._checkToolbarMixedModes = /**
       * Throws an exception when developers are attempting to combine the different toolbar row modes.
       */
    function () {
        var _this = this;
        if (!this._toolbarRows.length) {
            return;
        }
        // Check if there are any other DOM nodes that can display content but aren't inside of
        // a <mat-toolbar-row> element.
        var isCombinedUsage = [].slice.call(this._elementRef.nativeElement.childNodes)
            .filter(function (node) { return !(node.classList && node.classList.contains('mat-toolbar-row')); })
            .filter(function (node) { return node.nodeType !== (_this._document ? _this._document.COMMENT_NODE : 8); })
            .some(function (node) { return node.textContent.trim(); });
        if (isCombinedUsage) {
            throwToolbarMixedModesError();
        }
    };
    MatToolbar.decorators = [
        { type: core_1.Component, args: [{selector: 'mat-toolbar',
                    exportAs: 'matToolbar',
                    template: "<ng-content></ng-content><ng-content select=\"mat-toolbar-row\"></ng-content>",
                    styles: ["@media screen and (-ms-high-contrast:active){.mat-toolbar{outline:solid 1px}}.mat-toolbar-row,.mat-toolbar-single-row{display:flex;box-sizing:border-box;padding:0 16px;width:100%;flex-direction:row;align-items:center;white-space:nowrap}.mat-toolbar-multiple-rows{display:flex;box-sizing:border-box;flex-direction:column;width:100%}.mat-toolbar-multiple-rows{min-height:64px}.mat-toolbar-row,.mat-toolbar-single-row{height:64px}@media (max-width:599px){.mat-toolbar-multiple-rows{min-height:56px}.mat-toolbar-row,.mat-toolbar-single-row{height:56px}}"],
                    inputs: ['color'],
                    host: {
                        'class': 'mat-toolbar',
                        '[class.mat-toolbar-multiple-rows]': '_toolbarRows.length > 0',
                        '[class.mat-toolbar-single-row]': '_toolbarRows.length === 0',
                    },
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    encapsulation: core_1.ViewEncapsulation.None,
                },] },
    ];
    /** @nocollapse */
    MatToolbar.ctorParameters = function () { return [
        { type: core_1.ElementRef, },
        { type: platform_1.Platform, },
        { type: undefined, decorators: [{ type: core_1.Inject, args: [common_1.DOCUMENT,] },] },
    ]; };
    MatToolbar.propDecorators = {
        "_toolbarRows": [{ type: core_1.ContentChildren, args: [MatToolbarRow,] },],
    };
    return MatToolbar;
}(exports._MatToolbarMixinBase));
exports.MatToolbar = MatToolbar;
/**
 * Throws an exception when attempting to combine the different toolbar row modes.
 * @docs-private
 */
function throwToolbarMixedModesError() {
    throw Error('MatToolbar: Attempting to combine different toolbar modes. ' +
        'Either specify multiple `<mat-toolbar-row>` elements explicitly or just place content ' +
        'inside of a `<mat-toolbar>` for a single row.');
}
exports.throwToolbarMixedModesError = throwToolbarMixedModesError;
//# sourceMappingURL=toolbar.js.map