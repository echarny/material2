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
var dialog_1 = require("./dialog");
var dialog_ref_1 = require("./dialog-ref");
/** Counter used to generate unique IDs for dialog elements. */
var dialogElementUid = 0;
/**
 * Button that will close the current dialog.
 */
var MatDialogClose = /** @class */ (function () {
    function MatDialogClose(dialogRef, _elementRef, _dialog) {
        this.dialogRef = dialogRef;
        this._elementRef = _elementRef;
        this._dialog = _dialog;
        /** Screenreader label for the button. */
        this.ariaLabel = 'Close dialog';
    }
    MatDialogClose.prototype.ngOnInit = function () {
        if (!this.dialogRef) {
            // When this directive is included in a dialog via TemplateRef (rather than being
            // in a Component), the DialogRef isn't available via injection because embedded
            // views cannot be given a custom injector. Instead, we look up the DialogRef by
            // ID. This must occur in `onInit`, as the ID binding for the dialog container won't
            // be resolved at constructor time.
            this.dialogRef = (getClosestDialog(this._elementRef, this._dialog.openDialogs));
        }
    };
    MatDialogClose.prototype.ngOnChanges = function (changes) {
        var proxiedChange = changes._matDialogClose || changes._matDialogCloseResult;
        if (proxiedChange) {
            this.dialogResult = proxiedChange.currentValue;
        }
    };
    MatDialogClose.decorators = [
        { type: core_1.Directive, args: [{
                    selector: "button[mat-dialog-close], button[matDialogClose]",
                    exportAs: 'matDialogClose',
                    host: {
                        '(click)': 'dialogRef.close(dialogResult)',
                        '[attr.aria-label]': 'ariaLabel',
                        'type': 'button',
                    }
                },] },
    ];
    /** @nocollapse */
    MatDialogClose.ctorParameters = function () { return [
        { type: dialog_ref_1.MatDialogRef, decorators: [{ type: core_1.Optional },] },
        { type: core_1.ElementRef, },
        { type: dialog_1.MatDialog, },
    ]; };
    MatDialogClose.propDecorators = {
        "ariaLabel": [{ type: core_1.Input, args: ['aria-label',] },],
        "dialogResult": [{ type: core_1.Input, args: ['mat-dialog-close',] },],
        "_matDialogClose": [{ type: core_1.Input, args: ['matDialogClose',] },],
    };
    return MatDialogClose;
}());
exports.MatDialogClose = MatDialogClose;
/**
 * Title of a dialog element. Stays fixed to the top of the dialog when scrolling.
 */
var MatDialogTitle = /** @class */ (function () {
    function MatDialogTitle(_dialogRef, _elementRef, _dialog) {
        this._dialogRef = _dialogRef;
        this._elementRef = _elementRef;
        this._dialog = _dialog;
        this.id = "mat-dialog-title-" + dialogElementUid++;
    }
    MatDialogTitle.prototype.ngOnInit = function () {
        var _this = this;
        if (!this._dialogRef) {
            this._dialogRef = (getClosestDialog(this._elementRef, this._dialog.openDialogs));
        }
        if (this._dialogRef) {
            Promise.resolve().then(function () {
                var container = _this._dialogRef._containerInstance;
                if (container && !container._ariaLabelledBy) {
                    container._ariaLabelledBy = _this.id;
                }
            });
        }
    };
    MatDialogTitle.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[mat-dialog-title], [matDialogTitle]',
                    exportAs: 'matDialogTitle',
                    host: {
                        'class': 'mat-dialog-title',
                        '[id]': 'id',
                    },
                },] },
    ];
    /** @nocollapse */
    MatDialogTitle.ctorParameters = function () { return [
        { type: dialog_ref_1.MatDialogRef, decorators: [{ type: core_1.Optional },] },
        { type: core_1.ElementRef, },
        { type: dialog_1.MatDialog, },
    ]; };
    MatDialogTitle.propDecorators = {
        "id": [{ type: core_1.Input },],
    };
    return MatDialogTitle;
}());
exports.MatDialogTitle = MatDialogTitle;
/**
 * Scrollable content container of a dialog.
 */
var MatDialogContent = /** @class */ (function () {
    function MatDialogContent() {
    }
    MatDialogContent.decorators = [
        { type: core_1.Directive, args: [{
                    selector: "[mat-dialog-content], mat-dialog-content, [matDialogContent]",
                    host: { 'class': 'mat-dialog-content' }
                },] },
    ];
    return MatDialogContent;
}());
exports.MatDialogContent = MatDialogContent;
/**
 * Container for the bottom action buttons in a dialog.
 * Stays fixed to the bottom when scrolling.
 */
var MatDialogActions = /** @class */ (function () {
    function MatDialogActions() {
    }
    MatDialogActions.decorators = [
        { type: core_1.Directive, args: [{
                    selector: "[mat-dialog-actions], mat-dialog-actions, [matDialogActions]",
                    host: { 'class': 'mat-dialog-actions' }
                },] },
    ];
    return MatDialogActions;
}());
exports.MatDialogActions = MatDialogActions;
/**
 * Finds the closest MatDialogRef to an element by looking at the DOM.
 * @param element Element relative to which to look for a dialog.
 * @param openDialogs References to the currently-open dialogs.
 */
function getClosestDialog(element, openDialogs) {
    var parent = element.nativeElement.parentElement;
    while (parent && !parent.classList.contains('mat-dialog-container')) {
        parent = parent.parentElement;
    }
    return parent ? openDialogs.find(function (dialog) { return dialog.id === parent.id; }) : null;
}
//# sourceMappingURL=dialog-content-directives.js.map