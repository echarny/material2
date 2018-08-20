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
import { Directive, TemplateRef } from '@angular/core';
/**
 * Expansion panel content that will be rendered lazily
 * after the panel is opened for the first time.
 */
var MatExpansionPanelContent = /** @class */ (function () {
    function MatExpansionPanelContent(_template) {
        this._template = _template;
    }
    MatExpansionPanelContent.decorators = [
        { type: Directive, args: [{
                    selector: 'ng-template[matExpansionPanelContent]'
                },] },
    ];
    /** @nocollapse */
    MatExpansionPanelContent.ctorParameters = function () { return [
        { type: TemplateRef, },
    ]; };
    return MatExpansionPanelContent;
}());
export { MatExpansionPanelContent };
function MatExpansionPanelContent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    MatExpansionPanelContent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    MatExpansionPanelContent.ctorParameters;
    /** @type {?} */
    MatExpansionPanelContent.prototype._template;
}
//# sourceMappingURL=expansion-panel-content.js.map