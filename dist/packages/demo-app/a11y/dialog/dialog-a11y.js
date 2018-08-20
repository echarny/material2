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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var material_1 = require("@angular/material");
var DialogAccessibilityDemo = /** @class */ (function () {
    function DialogAccessibilityDemo(dialog) {
        this.dialog = dialog;
        this.fruitSelectedOption = '';
    }
    DialogAccessibilityDemo.prototype.openFruitDialog = function () {
        var _this = this;
        var dialogRef = this.dialog.open(DialogFruitExampleDialog);
        dialogRef.afterClosed().subscribe(function (result) {
            _this.fruitSelectedOption = result;
        });
    };
    DialogAccessibilityDemo.prototype.openWelcomeDialog = function () {
        this.dialog.open(DialogWelcomeExampleDialog);
    };
    DialogAccessibilityDemo.prototype.openNeptuneDialog = function () {
        this.dialog.open(DialogNeptuneExampleDialog);
    };
    DialogAccessibilityDemo.prototype.openAddressDialog = function () {
        this.dialog.open(DialogAddressFormDialog);
    };
    DialogAccessibilityDemo = __decorate([
        core_1.Component({selector: 'dialog-a11y',
            template: "<section> <h2>Welcome message</h2> <p>Activate the button to see a welcome dialog with a simple message and a close button.</p> <button mat-button (click)=\"openWelcomeDialog()\">Welcome</button> </section> <section> <h2>Choose a fruit</h2> <p>Active the button to choose apple or peach in a dialog.</p> <button mat-button (click)=\"openFruitDialog()\">Fruit</button> <p *ngIf=\"fruitSelectedOption\"> You chose: {{fruitSelectedOption}} </p> </section> <section> <h2>Neptune</h2> <p> Active the button to see a dialog showing information of Neptune. A Wikipedia page can be opened either in a new tab or in a stacked dialog. </p> <button mat-button (click)=\"openNeptuneDialog()\">Learn Neptune</button> </section> <section> <h2>Address form</h2> <p> Active the button to fill out shipping address information in a dialog. </p> <button mat-button (click)=\"openAddressDialog()\">Add address</button> </section> ",
            styles: [""],
        }),
        __metadata("design:paramtypes", [material_1.MatDialog])
    ], DialogAccessibilityDemo);
    return DialogAccessibilityDemo;
}());
exports.DialogAccessibilityDemo = DialogAccessibilityDemo;
var DialogFruitExampleDialog = /** @class */ (function () {
    function DialogFruitExampleDialog() {
    }
    DialogFruitExampleDialog = __decorate([
        core_1.Component({selector: 'dialog-fruit-a11y',
            template: "<h2 mat-dialog-title>Fruit</h2> <div mat-dialog-content>Which would you like to choose?</div> <div mat-dialog-actions> <button mat-button mat-dialog-close=\"peach\" aria-label=\"Peach\">Peach</button> <button mat-button mat-dialog-close=\"apple\" aria-label=\"Apple\">Apple</button> </div> ",
        })
    ], DialogFruitExampleDialog);
    return DialogFruitExampleDialog;
}());
exports.DialogFruitExampleDialog = DialogFruitExampleDialog;
var DialogWelcomeExampleDialog = /** @class */ (function () {
    function DialogWelcomeExampleDialog() {
    }
    DialogWelcomeExampleDialog = __decorate([
        core_1.Component({selector: 'dialog-welcome-a11y',
            template: "<h2>Welcome to Angular Material dialog demo page!</h2> <p> The Web is fundamentally designed to work for all people, whatever their hardware, software, language, culture, location, or physical or mental ability. When the Web meets this goal, it is accessible to people with a diverse range of hearing, movement, sight, and cognitive ability. </p> <p> The mission of the Web Accessibility Initiative (WAI) is to lead the Web to its full potential to be accessible, enabling people with disabilities to participate equally on the Web. </p> <button mat-button color=\"primary\" mat-dialog-close>Close</button> ",
        })
    ], DialogWelcomeExampleDialog);
    return DialogWelcomeExampleDialog;
}());
exports.DialogWelcomeExampleDialog = DialogWelcomeExampleDialog;
var DialogNeptuneExampleDialog = /** @class */ (function () {
    function DialogNeptuneExampleDialog(dialog) {
        this.dialog = dialog;
    }
    DialogNeptuneExampleDialog.prototype.showInStackedDialog = function () {
        this.dialog.open(DialogNeptuneIFrameDialog);
    };
    DialogNeptuneExampleDialog = __decorate([
        core_1.Component({selector: 'dialog-neptune-a11y-dialog',
            template: "<h2 mat-dialog-title>Neptune</h2> <mat-dialog-content> <img src=\"https://upload.wikimedia.org/wikipedia/commons/5/56/Neptune_Full.jpg\" alt=\"Neptune\"/> <p> Neptune is the eighth and farthest known planet from the Sun in the Solar System. In the Solar System, it is the fourth-largest planet by diameter, the third-most-massive planet, and the densest giant planet. Neptune is 17 times the mass of Earth and is slightly more massive than its near-twin Uranus, which is 15 times the mass of Earth and slightly larger than Neptune. Neptune orbits the Sun once every 164.8 years at an average distance of 30.1 astronomical units (4.50×109 km). It is named after the Roman god of the sea and has the astronomical symbol ♆, a stylised version of the god Neptune's trident. </p> </mat-dialog-content> <mat-dialog-actions> <button mat-raised-button color=\"primary\" mat-dialog-close>Close</button> <a mat-button color=\"primary\" href=\"https://en.wikipedia.org/wiki/Neptune\" target=\"_blank\"> Read more on Wikipedia </a> <button mat-button color=\"secondary\" (click)=\"showInStackedDialog()\"> Show in dialog</button> </mat-dialog-actions> ",
        }),
        __metadata("design:paramtypes", [material_1.MatDialog])
    ], DialogNeptuneExampleDialog);
    return DialogNeptuneExampleDialog;
}());
exports.DialogNeptuneExampleDialog = DialogNeptuneExampleDialog;
var DialogNeptuneIFrameDialog = /** @class */ (function () {
    function DialogNeptuneIFrameDialog() {
    }
    DialogNeptuneIFrameDialog = __decorate([
        core_1.Component({selector: 'dialog-neptune-iframe-dialog',
            styles: ["\n    iframe {\n      width: 800px;\n    }\n  "],
            template: "<h2 mat-dialog-title>Neptune</h2> <mat-dialog-content> <iframe frameborder=\"0\" src=\"https://en.wikipedia.org/wiki/Neptune\"></iframe> </mat-dialog-content> <mat-dialog-actions> <button mat-raised-button color=\"primary\" mat-dialog-close>Close</button> </mat-dialog-actions> ",
        })
    ], DialogNeptuneIFrameDialog);
    return DialogNeptuneIFrameDialog;
}());
exports.DialogNeptuneIFrameDialog = DialogNeptuneIFrameDialog;
var DialogAddressFormDialog = /** @class */ (function () {
    function DialogAddressFormDialog() {
    }
    DialogAddressFormDialog = __decorate([
        core_1.Component({selector: 'dialog-address-form-a11y',
            styles: ["\n    .demo-full-width {\n      width: 100%;\n    }\n  "],
            template: "<h2 mat-dialog-title>Company</h2> <mat-dialog-content> <form> <mat-form-field class=\"demo-full-width\"> <mat-label>Company (disabled)</mat-label> <input matInput disabled value=\"Google\"> </mat-form-field> <table class=\"demo-full-width\" cellspacing=\"0\"><tr> <td><mat-form-field class=\"demo-full-width\"> <mat-label>First name</mat-label> <input matInput> </mat-form-field></td> <td><mat-form-field class=\"demo-full-width\"> <mat-label>Long last name that will be truncated</mat-label> <input matInput> </mat-form-field></td> </tr></table> <p> <mat-form-field class=\"demo-full-width\"> <mat-label>Address</mat-label> <textarea matInput>1600 Amphitheatre Pkwy</textarea> </mat-form-field> <mat-form-field class=\"demo-full-width\"> <mat-label>Address 2</mat-label> <textarea matInput></textarea> </mat-form-field> </p> <table class=\"demo-full-width\" cellspacing=\"0\"><tr> <td><mat-form-field class=\"demo-full-width\"> <mat-label>City</mat-label> <input matInput> </mat-form-field></td> <td><mat-form-field class=\"demo-full-width\"> <mat-label>State</mat-label> <input matInput> </mat-form-field></td> <td><mat-form-field class=\"demo-full-width\"> <mat-label>Postal code</mat-label> <input matInput #postalCode maxlength=\"5\" value=\"94043\"> <mat-hint align=\"end\">{{postalCode.value.length}} / 5</mat-hint> </mat-form-field></td> </tr></table> </form> </mat-dialog-content> <mat-dialog-actions> <button mat-raised-button mat-dialog-close>Close</button> <button mat-raised-button color=\"primary\" mat-dialog-close cdkFocusInitial>Submit</button> </mat-dialog-actions> ",
        })
    ], DialogAddressFormDialog);
    return DialogAddressFormDialog;
}());
exports.DialogAddressFormDialog = DialogAddressFormDialog;
//# sourceMappingURL=dialog-a11y.js.map