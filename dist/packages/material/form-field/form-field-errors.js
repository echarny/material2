"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
/** @docs-private */
function getMatFormFieldPlaceholderConflictError() {
    return Error('Placeholder attribute and child element were both specified.');
}
exports.getMatFormFieldPlaceholderConflictError = getMatFormFieldPlaceholderConflictError;
/** @docs-private */
function getMatFormFieldDuplicatedHintError(align) {
    return Error("A hint was already declared for 'align=\"" + align + "\"'.");
}
exports.getMatFormFieldDuplicatedHintError = getMatFormFieldDuplicatedHintError;
/** @docs-private */
function getMatFormFieldMissingControlError() {
    return Error('mat-form-field must contain a MatFormFieldControl.');
}
exports.getMatFormFieldMissingControlError = getMatFormFieldMissingControlError;
//# sourceMappingURL=form-field-errors.js.map