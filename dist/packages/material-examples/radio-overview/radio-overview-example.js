"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
/**
 * @title Basic radios
 */
var RadioOverviewExample = /** @class */ (function () {
    function RadioOverviewExample() {
    }
    RadioOverviewExample.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'radio-overview-example',
                    template: "<mat-radio-group><mat-radio-button value=\"1\">Option 1</mat-radio-button><mat-radio-button value=\"2\">Option 2</mat-radio-button></mat-radio-group>",
                    styles: [".mat-radio-button ~ .mat-radio-button { padding-right: 16px; } "],
                },] },
    ];
    return RadioOverviewExample;
}());
exports.RadioOverviewExample = RadioOverviewExample;
//# sourceMappingURL=radio-overview-example.js.map