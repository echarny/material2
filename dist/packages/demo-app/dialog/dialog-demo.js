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
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var material_1 = require("@angular/material");
var defaultDialogConfig = new material_1.MatDialogConfig();
var DialogDemo = /** @class */ (function () {
    function DialogDemo(dialog, doc) {
        this.dialog = dialog;
        this.config = {
            disableClose: false,
            panelClass: 'custom-overlay-pane-class',
            hasBackdrop: true,
            backdropClass: '',
            width: '',
            height: '',
            minWidth: '',
            minHeight: '',
            maxWidth: defaultDialogConfig.maxWidth,
            maxHeight: '',
            position: {
                top: '',
                bottom: '',
                left: '',
                right: ''
            },
            data: {
                message: 'Jazzy jazz jazz'
            }
        };
        this.numTemplateOpens = 0;
        // Possible useful example for the open and closeAll events.
        // Adding a class to the body if a dialog opens and
        // removing it after all open dialogs are closed
        dialog.afterOpen.subscribe(function () {
            if (!doc.body.classList.contains('no-scroll')) {
                doc.body.classList.add('no-scroll');
            }
        });
        dialog.afterAllClosed.subscribe(function () {
            doc.body.classList.remove('no-scroll');
        });
    }
    DialogDemo.prototype.openJazz = function () {
        var _this = this;
        this.dialogRef = this.dialog.open(JazzDialog, this.config);
        this.dialogRef.beforeClosed().subscribe(function (result) {
            _this.lastBeforeCloseResult = result;
        });
        this.dialogRef.afterClosed().subscribe(function (result) {
            _this.lastAfterClosedResult = result;
            _this.dialogRef = null;
        });
    };
    DialogDemo.prototype.openContentElement = function () {
        var dialogRef = this.dialog.open(ContentElementDialog, this.config);
        dialogRef.componentInstance.actionsAlignment = this.actionsAlignment;
    };
    DialogDemo.prototype.openTemplate = function () {
        this.numTemplateOpens++;
        this.dialog.open(this.template, this.config);
    };
    __decorate([
        core_1.ViewChild(core_1.TemplateRef),
        __metadata("design:type", core_1.TemplateRef)
    ], DialogDemo.prototype, "template", void 0);
    DialogDemo = __decorate([
        core_1.Component({selector: 'dialog-demo',
            template: "<h1>Dialog demo</h1> <button mat-raised-button color=\"primary\" (click)=\"openJazz()\"> Open dialog </button> <button mat-raised-button color=\"accent\" (click)=\"openContentElement()\"> Open dialog with content elements </button> <button mat-raised-button color=\"accent\" (click)=\"openTemplate()\"> Open dialog with template content </button> <mat-card class=\"demo-dialog-card\"> <mat-card-content> <h2>Dialog dimensions</h2> <p> <mat-form-field> <mat-label>Width</mat-label> <input matInput [(ngModel)]=\"config.width\"> </mat-form-field> <mat-form-field> <mat-label>Height</mat-label> <input matInput [(ngModel)]=\"config.height\"> </mat-form-field> </p> <p> <mat-form-field> <mat-label>Min width</mat-label> <input matInput [(ngModel)]=\"config.minWidth\"> </mat-form-field> <mat-form-field> <mat-label>Min height</mat-label> <input matInput [(ngModel)]=\"config.minHeight\"> </mat-form-field> </p> <p> <mat-form-field> <mat-label>Max width</mat-label> <input matInput [(ngModel)]=\"config.maxWidth\"> </mat-form-field> <mat-form-field> <mat-label>Max height</mat-label> <input matInput [(ngModel)]=\"config.maxHeight\"> </mat-form-field> </p> <h2>Dialog position</h2> <p> <mat-form-field> <mat-label>Top</mat-label> <input matInput [(ngModel)]=\"config.position.top\" (change)=\"config.position.bottom = ''\"> </mat-form-field> <mat-form-field> <mat-label>Bottom</mat-label> <input matInput [(ngModel)]=\"config.position.bottom\" (change)=\"config.position.top = ''\"> </mat-form-field> </p> <p> <mat-form-field> <mat-label>Left</mat-label> <input matInput [(ngModel)]=\"config.position.left\" (change)=\"config.position.right = ''\"> </mat-form-field> <mat-form-field> <mat-label>Right</mat-label> <input matInput [(ngModel)]=\"config.position.right\" (change)=\"config.position.left = ''\"> </mat-form-field> </p> <h2>Dialog backdrop</h2> <p> <mat-form-field> <mat-label>Backdrop class</mat-label> <input matInput [(ngModel)]=\"config.backdropClass\"> </mat-form-field> </p> <mat-checkbox [(ngModel)]=\"config.hasBackdrop\">Has backdrop</mat-checkbox> <h2>Other options</h2> <p> <mat-form-field> <mat-label>Button alignment</mat-label> <mat-select [(ngModel)]=\"actionsAlignment\"> <mat-option>Start</mat-option> <mat-option value=\"end\">End</mat-option> <mat-option value=\"center\">Center</mat-option> </mat-select> </mat-form-field> </p> <p> <mat-form-field> <mat-label>Dialog message</mat-label> <input matInput [(ngModel)]=\"config.data.message\"> </mat-form-field> </p> <p> <mat-checkbox [(ngModel)]=\"config.disableClose\">Disable close</mat-checkbox> </p> </mat-card-content> </mat-card> <p>Last afterClosed result: {{lastAfterClosedResult}}</p> <p>Last beforeClose result: {{lastBeforeCloseResult}}</p> <ng-template let-data let-dialogRef=\"dialogRef\"> I'm a template dialog. I've been opened {{numTemplateOpens}} times! <p>It's Jazz!</p> <mat-form-field> <mat-label>How much?</mat-label> <input matInput #howMuch> </mat-form-field> <p> {{ data.message }} </p> <button type=\"button\" (click)=\"dialogRef.close(howMuch.value)\">Close dialog</button> <button (click)=\"dialogRef.updateSize('500px', '500px').updatePosition({ top: '25px', left: '25px' });\">Change dimensions</button>` </ng-template> ",
            styles: [".demo-dialog-card { max-width: 405px; margin: 20px 0; } "],
        }),
        __param(1, core_1.Inject(common_1.DOCUMENT)),
        __metadata("design:paramtypes", [material_1.MatDialog, Object])
    ], DialogDemo);
    return DialogDemo;
}());
exports.DialogDemo = DialogDemo;
var JazzDialog = /** @class */ (function () {
    function JazzDialog(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
        this._dimesionToggle = false;
    }
    JazzDialog.prototype.togglePosition = function () {
        this._dimesionToggle = !this._dimesionToggle;
        if (this._dimesionToggle) {
            this.dialogRef
                .updateSize('500px', '500px')
                .updatePosition({ top: '25px', left: '25px' });
        }
        else {
            this.dialogRef
                .updateSize()
                .updatePosition();
        }
    };
    JazzDialog = __decorate([
        core_1.Component({
            selector: 'demo-jazz-dialog',
            template: "\n  <p>It's Jazz!</p>\n\n  <mat-form-field>\n    <mat-label>How much?</mat-label>\n    <input matInput #howMuch>\n  </mat-form-field>\n\n  <p> {{ data.message }} </p>\n  <button type=\"button\" (click)=\"dialogRef.close(howMuch.value)\">Close dialog</button>\n  <button (click)=\"togglePosition()\">Change dimensions</button>"
        }),
        __param(1, core_1.Inject(material_1.MAT_DIALOG_DATA)),
        __metadata("design:paramtypes", [material_1.MatDialogRef, Object])
    ], JazzDialog);
    return JazzDialog;
}());
exports.JazzDialog = JazzDialog;
var ContentElementDialog = /** @class */ (function () {
    function ContentElementDialog(dialog) {
        this.dialog = dialog;
    }
    ContentElementDialog.prototype.showInStackedDialog = function () {
        this.dialog.open(IFrameDialog);
    };
    ContentElementDialog = __decorate([
        core_1.Component({
            selector: 'demo-content-element-dialog',
            styles: ["\n    img {\n      max-width: 100%;\n    }\n  "],
            template: "\n    <h2 mat-dialog-title>Neptune</h2>\n\n    <mat-dialog-content>\n      <img src=\"https://upload.wikimedia.org/wikipedia/commons/5/56/Neptune_Full.jpg\"/>\n\n      <p>\n        Neptune is the eighth and farthest known planet from the Sun in the Solar System. In the\n        Solar System, it is the fourth-largest planet by diameter, the third-most-massive planet,\n        and the densest giant planet. Neptune is 17 times the mass of Earth and is slightly more\n        massive than its near-twin Uranus, which is 15 times the mass of Earth and slightly larger\n        than Neptune. Neptune orbits the Sun once every 164.8 years at an average distance of 30.1\n        astronomical units (4.50\u00D7109 km). It is named after the Roman god of the sea and has the\n        astronomical symbol \u2646, a stylised version of the god Neptune's trident.\n      </p>\n    </mat-dialog-content>\n\n    <mat-dialog-actions [attr.align]=\"actionsAlignment\">\n      <button\n        mat-raised-button\n        color=\"primary\"\n        mat-dialog-close>Close</button>\n\n      <a\n        mat-button\n        color=\"primary\"\n        href=\"https://en.wikipedia.org/wiki/Neptune\"\n        target=\"_blank\">Read more on Wikipedia</a>\n\n      <button\n        mat-button\n        color=\"secondary\"\n        (click)=\"showInStackedDialog()\">\n        Show in Dialog</button>\n    </mat-dialog-actions>\n  "
        }),
        __metadata("design:paramtypes", [material_1.MatDialog])
    ], ContentElementDialog);
    return ContentElementDialog;
}());
exports.ContentElementDialog = ContentElementDialog;
var IFrameDialog = /** @class */ (function () {
    function IFrameDialog() {
    }
    IFrameDialog = __decorate([
        core_1.Component({
            selector: 'demo-iframe-dialog',
            styles: ["\n    iframe {\n      width: 800px;\n    }\n  "],
            template: "\n    <h2 mat-dialog-title>Neptune</h2>\n\n    <mat-dialog-content>\n      <iframe frameborder=\"0\" src=\"https://en.wikipedia.org/wiki/Neptune\"></iframe>\n    </mat-dialog-content>\n\n    <mat-dialog-actions>\n      <button\n        mat-raised-button\n        color=\"primary\"\n        mat-dialog-close>Close</button>\n    </mat-dialog-actions>\n  "
        })
    ], IFrameDialog);
    return IFrameDialog;
}());
exports.IFrameDialog = IFrameDialog;
//# sourceMappingURL=dialog-demo.js.map