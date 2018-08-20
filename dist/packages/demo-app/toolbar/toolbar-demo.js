"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ToolbarDemo = /** @class */ (function () {
    function ToolbarDemo() {
    }
    ToolbarDemo = __decorate([
        core_1.Component({selector: 'toolbar-demo',
            template: "<div class=\"demo-toolbar\"> <p> <mat-toolbar> <button mat-icon-button> <mat-icon>menu</mat-icon> </button> <span>Default Toolbar</span> <span class=\"demo-fill-remaining\"></span> <button mat-button>Text</button> <button mat-icon-button> <mat-icon>code</mat-icon> </button> <button mat-icon-button color=\"warn\"> <mat-icon>code</mat-icon> </button> </mat-toolbar> </p> <p> <mat-toolbar color=\"primary\"> <button mat-icon-button> <mat-icon>menu</mat-icon> </button> <span>Primary Toolbar</span> <span class=\"demo-fill-remaining\"></span> <button mat-raised-button>Text</button> <button mat-raised-button color=\"accent\">Accent</button> <button mat-stroked-button>Stroked</button> </mat-toolbar> </p> <p> <mat-toolbar color=\"accent\"> <button mat-icon-button> <mat-icon>menu</mat-icon> </button> <span>Accent Toolbar</span> <span class=\"demo-fill-remaining\"></span> <button mat-button>Text</button> <button mat-flat-button>Flat</button> <button mat-mini-fab color=\"\"> <mat-icon>done</mat-icon> </button> <button mat-mini-fab color=\"primary\"> <mat-icon>done</mat-icon> </button> </mat-toolbar> </p> <p> <mat-toolbar> <mat-toolbar-row>First Row</mat-toolbar-row> <mat-toolbar-row>Second Row</mat-toolbar-row> </mat-toolbar> </p> <p> <mat-toolbar color=\"primary\"> <mat-toolbar-row> <span>First Row</span> </mat-toolbar-row> <mat-toolbar-row> <span>Second Row</span> <span class=\"demo-fill-remaining\"></span> <mat-icon class=\"demo-toolbar-icon\">verified_user</mat-icon> </mat-toolbar-row> <mat-toolbar-row> <span>Third Row</span> <span class=\"demo-fill-remaining\"></span> <mat-icon class=\"demo-toolbar-icon\">favorite</mat-icon> <mat-icon class=\"demo-toolbar-icon\">delete</mat-icon> </mat-toolbar-row> </mat-toolbar> </p> <h3>Toolbar with form-fields</h3> <p> <mat-toolbar> <mat-form-field> <mat-label>Select</mat-label> <mat-select> <mat-option value=\"1\">One</mat-option> <mat-option value=\"2\">Two</mat-option> </mat-select> </mat-form-field> <mat-form-field appearance=\"legacy\"> <mat-label>Input</mat-label> <input matInput> </mat-form-field> </mat-toolbar> </p> <p> <mat-toolbar color=\"primary\"> <mat-form-field> <mat-label>Select</mat-label> <mat-select> <mat-option value=\"1\">One</mat-option> <mat-option value=\"2\">Two</mat-option> </mat-select> </mat-form-field> <mat-form-field appearance=\"legacy\"> <mat-label>Input</mat-label> <input matInput> </mat-form-field> </mat-toolbar> </p> </div> ",
            styles: [".demo-toolbar { padding: 6px; } .demo-toolbar .demo-toolbar-icon { padding: 0 14px; } .demo-toolbar .demo-fill-remaining { flex: 1 1 auto; } .demo-toolbar button { margin: 0 4px; } "],
        })
    ], ToolbarDemo);
    return ToolbarDemo;
}());
exports.ToolbarDemo = ToolbarDemo;
//# sourceMappingURL=toolbar-demo.js.map