"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
/**
 * @title Basic button-toggles
 */
var ButtonToggleOverviewExample = /** @class */ (function () {
    function ButtonToggleOverviewExample() {
    }
    ButtonToggleOverviewExample.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'button-toggle-overview-example',
                    template: "<mat-button-toggle-group name=\"fontStyle\" aria-label=\"Font Style\"><mat-button-toggle value=\"bold\">Bold</mat-button-toggle><mat-button-toggle value=\"italic\">Italic</mat-button-toggle><mat-button-toggle value=\"underline\">Underline</mat-button-toggle></mat-button-toggle-group>",
                    styles: ["/** No CSS for this example */ "],
                },] },
    ];
    return ButtonToggleOverviewExample;
}());
exports.ButtonToggleOverviewExample = ButtonToggleOverviewExample;
//# sourceMappingURL=button-toggle-overview-example.js.map