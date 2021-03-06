"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const transform_change_data_1 = require("../transform-change-data");
exports.classNames = transform_change_data_1.transformChanges([
    {
        pr: 'https://github.com/angular/material2/pull/10161',
        changes: [
            {
                replace: 'ConnectedOverlayDirective',
                replaceWith: 'CdkConnectedOverlay'
            },
            {
                replace: 'OverlayOrigin',
                replaceWith: 'CdkOverlayOrigin'
            }
        ]
    },
    {
        pr: 'https://github.com/angular/material2/pull/10267',
        changes: [
            {
                replace: 'ObserveContent',
                replaceWith: 'CdkObserveContent'
            }
        ]
    },
    {
        pr: 'https://github.com/angular/material2/pull/10291',
        changes: [
            {
                replace: 'FloatPlaceholderType',
                replaceWith: 'FloatLabelType'
            },
            {
                replace: 'MAT_PLACEHOLDER_GLOBAL_OPTIONS',
                replaceWith: 'MAT_LABEL_GLOBAL_OPTIONS'
            },
            {
                replace: 'PlaceholderOptions',
                replaceWith: 'LabelOptions'
            }
        ]
    },
    {
        pr: 'https://github.com/angular/material2/pull/10325',
        changes: [
            {
                replace: 'FocusTrapDirective',
                replaceWith: 'CdkTrapFocus'
            }
        ]
    }
]);
//# sourceMappingURL=class-names.js.map