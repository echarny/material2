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
import { TemplatePortal } from '@angular/cdk/portal';
import { ChangeDetectionStrategy, Component, ContentChild, Input, TemplateRef, ViewChild, ViewContainerRef, ViewEncapsulation, } from '@angular/core';
import { mixinDisabled } from '@angular/material/core';
import { Subject } from 'rxjs';
import { MatTabLabel } from './tab-label';
import { MatTabContent } from './tab-content';
/**
 * \@docs-private
 */
var /**
 * \@docs-private
 */
MatTabBase = /** @class */ (function () {
    function MatTabBase() {
    }
    return MatTabBase;
}());
/**
 * \@docs-private
 */
export { MatTabBase };
export var /** @type {?} */ _MatTabMixinBase = mixinDisabled(MatTabBase);
var MatTab = /** @class */ (function (_super) {
    tslib_1.__extends(MatTab, _super);
    function MatTab(_viewContainerRef) {
        var _this = _super.call(this) || this;
        _this._viewContainerRef = _viewContainerRef;
        /**
         * Plain text label for the tab, used when there is no template label.
         */
        _this.textLabel = '';
        /**
         * Portal that will be the hosted content of the tab
         */
        _this._contentPortal = null;
        /**
         * Emits whenever the internal state of the tab changes.
         */
        _this._stateChanges = new Subject();
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
        get: /**
         * \@docs-private
         * @return {?}
         */
        function () {
            return this._contentPortal;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} changes
     * @return {?}
     */
    MatTab.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes.hasOwnProperty('textLabel') || changes.hasOwnProperty('disabled')) {
            this._stateChanges.next();
        }
    };
    /**
     * @return {?}
     */
    MatTab.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._stateChanges.complete();
    };
    /**
     * @return {?}
     */
    MatTab.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this._contentPortal = new TemplatePortal(this._explicitContent || this._implicitContent, this._viewContainerRef);
    };
    MatTab.decorators = [
        { type: Component, args: [{selector: 'mat-tab',
                    template: "<ng-template><ng-content></ng-content></ng-template>",
                    inputs: ['disabled'],
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    exportAs: 'matTab',
                },] },
    ];
    /** @nocollapse */
    MatTab.ctorParameters = function () { return [
        { type: ViewContainerRef, },
    ]; };
    MatTab.propDecorators = {
        "templateLabel": [{ type: ContentChild, args: [MatTabLabel,] },],
        "_explicitContent": [{ type: ContentChild, args: [MatTabContent, { read: TemplateRef },] },],
        "_implicitContent": [{ type: ViewChild, args: [TemplateRef,] },],
        "textLabel": [{ type: Input, args: ['label',] },],
        "ariaLabel": [{ type: Input, args: ['aria-label',] },],
        "ariaLabelledby": [{ type: Input, args: ['aria-labelledby',] },],
    };
    return MatTab;
}(_MatTabMixinBase));
export { MatTab };
function MatTab_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    MatTab.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    MatTab.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    MatTab.propDecorators;
    /**
     * Content for the tab label given by `<ng-template mat-tab-label>`.
     * @type {?}
     */
    MatTab.prototype.templateLabel;
    /**
     * Template provided in the tab content that will be used if present, used to enable lazy-loading
     * @type {?}
     */
    MatTab.prototype._explicitContent;
    /**
     * Template inside the MatTab view that contains an `<ng-content>`.
     * @type {?}
     */
    MatTab.prototype._implicitContent;
    /**
     * Plain text label for the tab, used when there is no template label.
     * @type {?}
     */
    MatTab.prototype.textLabel;
    /**
     * Aria label for the tab.
     * @type {?}
     */
    MatTab.prototype.ariaLabel;
    /**
     * Reference to the element that the tab is labelled by.
     * Will be cleared if `aria-label` is set at the same time.
     * @type {?}
     */
    MatTab.prototype.ariaLabelledby;
    /**
     * Portal that will be the hosted content of the tab
     * @type {?}
     */
    MatTab.prototype._contentPortal;
    /**
     * Emits whenever the internal state of the tab changes.
     * @type {?}
     */
    MatTab.prototype._stateChanges;
    /**
     * The relatively indexed position where 0 represents the center, negative is left, and positive
     * represents the right.
     * @type {?}
     */
    MatTab.prototype.position;
    /**
     * The initial relatively index origin of the tab if it was created and selected after there
     * was already a selected tab. Provides context of what position the tab should originate from.
     * @type {?}
     */
    MatTab.prototype.origin;
    /**
     * Whether the tab is currently active.
     * @type {?}
     */
    MatTab.prototype.isActive;
    /** @type {?} */
    MatTab.prototype._viewContainerRef;
}
//# sourceMappingURL=tab.js.map