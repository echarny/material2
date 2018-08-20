"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var drop_1 = require("./drop");
var drag_1 = require("./drag");
var drag_handle_1 = require("./drag-handle");
var drag_preview_1 = require("./drag-preview");
var drag_placeholder_1 = require("./drag-placeholder");
var DragDropModule = /** @class */ (function () {
    function DragDropModule() {
    }
    DragDropModule.decorators = [
        { type: core_1.NgModule, args: [{
                    declarations: [
                        drop_1.CdkDrop,
                        drag_1.CdkDrag,
                        drag_handle_1.CdkDragHandle,
                        drag_preview_1.CdkDragPreview,
                        drag_placeholder_1.CdkDragPlaceholder,
                    ],
                    exports: [
                        drop_1.CdkDrop,
                        drag_1.CdkDrag,
                        drag_handle_1.CdkDragHandle,
                        drag_preview_1.CdkDragPreview,
                        drag_placeholder_1.CdkDragPlaceholder,
                    ],
                },] },
    ];
    return DragDropModule;
}());
exports.DragDropModule = DragDropModule;
//# sourceMappingURL=drag-drop-module.js.map