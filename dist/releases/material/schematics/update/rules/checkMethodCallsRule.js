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
const ts = require("typescript");
const color_1 = require("../material/color");
const method_call_checks_1 = require("../material/data/method-call-checks");
/**
 * Rule that walks through every property access expression and updates properties that have
 * been changed in favor of the new name.
 */
class Rule extends tslint_1.Rules.TypedRule {
    applyWithProgram(sourceFile, program) {
        return this.applyWithWalker(new CheckMethodCallsWalker(sourceFile, this.getOptions(), program));
    }
}
exports.Rule = Rule;
class CheckMethodCallsWalker extends tslint_1.ProgramAwareRuleWalker {
    visitNewExpression(expression) {
        const symbol = this.getTypeChecker().getTypeAtLocation(expression).symbol;
        if (symbol) {
            const className = symbol.name;
            this.checkConstructor(expression, className);
        }
    }
    visitCallExpression(expression) {
        if (expression.expression.kind !== ts.SyntaxKind.PropertyAccessExpression) {
            const functionName = expression.getFirstToken().getText();
            if (functionName === 'super') {
                const superClassType = this.getTypeChecker().getTypeAtLocation(expression.expression);
                const superClassName = superClassType.symbol && superClassType.symbol.name;
                if (superClassType) {
                    this.checkConstructor(expression, superClassName);
                }
            }
            return;
        }
        // TODO(mmalerba): This is probably a bad way to get the class node...
        // Tokens are: [..., <host>, '.', <prop>], so back up 3.
        const accessExp = expression.expression;
        const classNode = accessExp.getChildAt(accessExp.getChildCount() - 3);
        const methodNode = accessExp.getChildAt(accessExp.getChildCount() - 1);
        const methodName = methodNode.getText();
        const type = this.getTypeChecker().getTypeAtLocation(classNode);
        const className = type.symbol && type.symbol.name;
        const currentCheck = method_call_checks_1.methodCallChecks
            .find(data => data.method === methodName && data.className === className);
        if (!currentCheck) {
            return;
        }
        const failure = currentCheck.invalidArgCounts
            .find(countData => countData.count === expression.arguments.length);
        if (failure) {
            this.addFailureAtNode(expression, `Found call to "${chalk_1.bold(className + '.' + methodName)}" with` +
                ` ${chalk_1.bold(String(failure.count))} arguments. ${color_1.color(failure.message)}`);
        }
    }
    checkConstructor(node, className) {
        const currentCheck = method_call_checks_1.methodCallChecks
            .find(data => data.method === 'constructor' && data.className === className);
        if (!currentCheck) {
            return;
        }
        const failure = currentCheck.invalidArgCounts
            .find(countData => !!node.arguments && countData.count === node.arguments.length);
        if (failure) {
            this.addFailureAtNode(node, `Found "${chalk_1.bold(className)}" constructed with ${chalk_1.bold(String(failure.count))} arguments.` +
                ` ${color_1.color(failure.message)}`);
        }
    }
}
exports.CheckMethodCallsWalker = CheckMethodCallsWalker;
//# sourceMappingURL=checkMethodCallsRule.js.map