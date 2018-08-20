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
var portal_1 = require("@angular/cdk/portal");
var core_1 = require("@angular/core");
var core_2 = require("@angular/material/core");
var rxjs_1 = require("rxjs");
var tab_label_1 = require("./tab-label");
var tab_content_1 = require("./tab-content");
// Boilerplate for applying mixins to MatTab.
/** @docs-private */
var 
// Boilerplate for applying mixins to MatTab.
/** @docs-private */
MatTabBase = /** @class */ (function () {
    function MatTabBase() {
    }
    return MatTabBase;
}());
exports.MatTabBase = MatTabBase;
exports._MatTabMixinBase = core_2.mixinDisabled(MatTabBase);
var MatTab = /** @class */ (function (_super) {
    __extends(MatTab, _super);
    function MatTab(_viewContainerRef) {
        var _this = _super.call(this) || this;
        _this._viewContainerRef = _viewContainerRef;
        /** Plain text label for the tab, used when there is no template label. */
        _this.textLabel = '';
        /** Portal that will be the hosted content of the tab */
        _this._contentPortal = null;
        /** Emits whenever the internal state of the tab changes. */
        _this._stateChanges = new rxjs_1.Subject();
        /**
           * The relatively indexed position where 0 represents the center, negative is left, and positive
           * represents the right.
           */
        _this.position = null;
        /**
           * The initial relatively index origin of the tab if it was created and selected after there
           * was already a selected tab. Provides context of what position the tab should originate from.
           */
        _this.origin = null;
        /**
           * Whether the tab is currently active.
           */
        _this.isActive = false;
        return _this;
    }
    Object.defineProperty(MatTab.prototype, "content", {
        /** @docs-private */
        get: /** @docs-private */
        function () {
            return this._contentPortal;
        },
        enumerable: true,
        configurable: true
    });
    MatTab.prototype.ngOnChanges = function (changes) {
        if (changes.hasOwnProperty('textLabel') || changes.hasOwnProperty('disabled')) {
            this._stateChanges.next();
        }
    };
    MatTab.prototype.ngOnDestroy = function () {
        this._stateChanges.complete();
    };
    MatTab.prototype.ngOnInit = function () {
        this._contentPortal = new portal_1.TemplatePortal(this._explicitContent || this._implicitContent, this._viewContainerRef);
    };
    MatTab.decorators = [
        { type: core_1.Component, args: [{selector: 'mat-tab',
                    template: "<ng-template><ng-content></ng-content></ng-template>",
                    inputs: ['disabled'],
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    encapsulation: core_1.ViewEncapsulation.None,
                    exportAs: 'matTab',
                },] },
    ];
    /** @nocollapse */
    MatTab.ctorParameters = function () { return [
        { type: core_1.ViewContainerRef, },
    ]; };
    MatTab.propDecorators = {
        "templateLabel": [{ type: core_1.ContentChild, args: [tab_label_1.MatTabLabel,] },],
        "_explicitContent": [{ type: core_1.ContentChild, args: [tab_content_1.MatTabContent, { read: core_1.TemplateRef },] },],
        "_implicitContent": [{ type: core_1.ViewChild, args: [core_1.TemplateRef,] },],
        "textLabel": [{ type: core_1.Input, args: ['label',] },],
        "ariaLabel": [{ type: core_1.Input, args: ['aria-label',] },],
        "ariaLabelledby": [{ type: core_1.Input, args: ['aria-labelledby',] },],
    };
    return MatTab;
}(exports._MatTabMixinBase));
exports.MatTab = MatTab;
//# sourceMappingURL=tab.js.map