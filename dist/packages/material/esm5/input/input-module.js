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
import { TextFieldModule } from '@angular/cdk/text-field';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTextareaAutosize } from './autosize';
import { MatInput } from './input';
var MatInputModule = /** @class */ (function () {
    function MatInputModule() {
    }
    MatInputModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [MatInput, MatTextareaAutosize],
                    imports: [
                        CommonModule,
                        TextFieldModule,
                        MatFormFieldModule,
                    ],
                    exports: [
                        TextFieldModule,
                        MatFormFieldModule,
                        MatInput,
                        MatTextareaAutosize,
                    ],
                    providers: [ErrorStateMatcher],
                },] },
    ];
    return MatInputModule;
}());
export { MatInputModule };
function MatInputModule_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    MatInputModule.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    MatInputModule.ctorParameters;
}
//# sourceMappingURL=input-module.js.map