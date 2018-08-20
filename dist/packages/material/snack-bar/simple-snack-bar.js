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
var snack_bar_ref_1 = require("./snack-bar-ref");
var snack_bar_config_1 = require("./snack-bar-config");
var snack_bar_animations_1 = require("./snack-bar-animations");
/**
 * A component used to open as the default snack bar, matching material spec.
 * This should only be used internally by the snack bar service.
 */
var SimpleSnackBar = /** @class */ (function () {
    function SimpleSnackBar(snackBarRef, data) {
        this.snackBarRef = snackBarRef;
        this.data = data;
    }
    /** Performs the action on the snack bar. */
    /** Performs the action on the snack bar. */
    SimpleSnackBar.prototype.action = /** Performs the action on the snack bar. */
    function () {
        this.snackBarRef.dismissWithAction();
    };
    Object.defineProperty(SimpleSnackBar.prototype, "hasAction", {
        /** If the action button should be shown. */
        get: /** If the action button should be shown. */
        function () {
            return !!this.data.action;
        },
        enumerable: true,
        configurable: true
    });
    SimpleSnackBar.decorators = [
        { type: core_1.Component, args: [{selector: 'simple-snack-bar',
                    template: "<span>{{data.message}}</span><div class=\"mat-simple-snackbar-action\" *ngIf=\"hasAction\"><button mat-button (click)=\"action()\">{{data.action}}</button></div>",
                    styles: [".mat-simple-snackbar{display:flex;justify-content:space-between;line-height:20px;opacity:1}.mat-simple-snackbar-action{display:flex;flex-direction:column;flex-shrink:0;justify-content:space-around;margin:-8px 0 -8px 8px}.mat-simple-snackbar-action button{flex:1;max-height:36px}[dir=rtl] .mat-simple-snackbar-action{margin-left:0;margin-right:8px}"],
                    encapsulation: core_1.ViewEncapsulation.None,
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    animations: [snack_bar_animations_1.matSnackBarAnimations.contentFade],
                    host: {
                        '[@contentFade]': '',
                        'class': 'mat-simple-snackbar',
                    }
                },] },
    ];
    /** @nocollapse */
    SimpleSnackBar.ctorParameters = function () { return [
        { type: snack_bar_ref_1.MatSnackBarRef, },
        { type: undefined, decorators: [{ type: core_1.Inject, args: [snack_bar_config_1.MAT_SNACK_BAR_DATA,] },] },
    ]; };
    return SimpleSnackBar;
}());
exports.SimpleSnackBar = SimpleSnackBar;
//# sourceMappingURL=simple-snack-bar.js.map