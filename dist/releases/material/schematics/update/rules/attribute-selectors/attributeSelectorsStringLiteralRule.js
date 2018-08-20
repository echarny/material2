"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = require("chalk");
const tslint_1 = require("tslint");
const attribute_selectors_1 = require("../../material/data/attribute-selectors");
const literal_1 = require("../../typescript/literal");
const ts = require("typescript");
/**
 * Rule that walks through every string literal that is part of a call expression and
 * switches deprecated attribute selectors to the updated selector.
 */
class Rule extends tslint_1.Rules.AbstractRule {
    apply(sourceFile) {
        return this.applyWithWalker(new Walker(sourceFile, this.getOptions()));
    }
}
exports.Rule = Rule;
class Walker extends tslint_1.RuleWalker {
    visitStringLiteral(literal) {
        if (literal.parent && literal.parent.kind !== ts.SyntaxKind.CallExpression) {
            return;
        }
        const literalText = literal.getFullText();
        attribute_selectors_1.attributeSelectors.forEach(selector => {
            literal_1.findAllSubstringIndices(literalText, selector.replace)
                .map(offset => literal.getStart() + offset)
                .map(start => new tslint_1.Replacement(start, selector.replace.length, selector.replaceWith))
                .forEach(replacement => this._addFailureWithReplacement(literal, replacement, selector));
        });
    }
    /** Adds an attribute selector failure with the given replacement at the specified node. */
    _addFailureWithReplacement(node, replacement, selector) {
        this.addFailureAtNode(node, `Found deprecated attribute selector "${chalk_1.red('[' + selector.replace + ']')}" which ` +
            `has been renamed to "${chalk_1.green('[' + selector.replaceWith + ']')}"`, replacement);
    }
}
//# sourceMappingURL=attributeSelectorsStringLiteralRule.js.map