"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
/**
 * @title Badge overview
 */
var BadgeOverviewExample = /** @class */ (function () {
    function BadgeOverviewExample() {
    }
    BadgeOverviewExample.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'badge-overview-example',
                    template: "<p><span matBadge=\"4\" matBadgeOverlap=\"false\">Text with a badge</span></p><p>Button with a badge on the left <button mat-raised-button color=\"primary\" matBadge=\"8\" matBadgePosition=\"before\" matBadgeColor=\"accent\">Action</button></p><p>Icon with a badge<mat-icon matBadge=\"15\" matBadgeColor=\"warn\">home</mat-icon></p>",
                    styles: ["/** No CSS for this example */ "],
                },] },
    ];
    return BadgeOverviewExample;
}());
exports.BadgeOverviewExample = BadgeOverviewExample;
//# sourceMappingURL=badge-overview-example.js.map