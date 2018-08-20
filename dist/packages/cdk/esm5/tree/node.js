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
 * Context provided to the tree node component.
 * @template T
 */
var /**
 * Context provided to the tree node component.
 * @template T
 */
CdkTreeNodeOutletContext = /** @class */ (function () {
    function CdkTreeNodeOutletContext(data) {
        this.$implicit = data;
    }
    return CdkTreeNodeOutletContext;
}());
/**
 * Context provided to the tree node component.
 * @template T
 */
export { CdkTreeNodeOutletContext };
function CdkTreeNodeOutletContext_tsickle_Closure_declarations() {
    /**
     * Data for the node.
     * @type {?}
     */
    CdkTreeNodeOutletContext.prototype.$implicit;
    /**
     * Depth of the node.
     * @type {?}
     */
    CdkTreeNodeOutletContext.prototype.level;
    /**
     * Index location of the node.
     * @type {?}
     */
    CdkTreeNodeOutletContext.prototype.index;
    /**
     * Length of the number of total dataNodes.
     * @type {?}
     */
    CdkTreeNodeOutletContext.prototype.count;
}
/**
 * Data node definition for the CdkTree.
 * Captures the node's template and a when predicate that describes when this node should be used.
 * @template T
 */
var CdkTreeNodeDef = /** @class */ (function () {
    /** @docs-private */
    function CdkTreeNodeDef(template) {
        this.template = template;
    }
    CdkTreeNodeDef.decorators = [
        { type: Directive, args: [{
                    selector: '[cdkTreeNodeDef]',
                    inputs: [
                        'when: cdkTreeNodeDefWhen'
                    ],
                },] },
    ];
    /** @nocollapse */
    CdkTreeNodeDef.ctorParameters = function () { return [
        { type: TemplateRef, },
    ]; };
    return CdkTreeNodeDef;
}());
export { CdkTreeNodeDef };
function CdkTreeNodeDef_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    CdkTreeNodeDef.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    CdkTreeNodeDef.ctorParameters;
    /**
     * Function that should return true if this node template should be used for the provided node
     * data and index. If left undefined, this node will be considered the default node template to
     * use when no other when functions return true for the data.
     * For every node, there must be at least one when function that passes or an undefined to
     * default.
     * @type {?}
     */
    CdkTreeNodeDef.prototype.when;
    /** @type {?} */
    CdkTreeNodeDef.prototype.template;
}
//# sourceMappingURL=node.js.map