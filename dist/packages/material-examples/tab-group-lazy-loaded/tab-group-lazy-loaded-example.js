"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
/**
 * @title Tab group where the tab content is loaded lazily (when activated)
 */
var TabGroupLazyLoadedExample = /** @class */ (function () {
    function TabGroupLazyLoadedExample() {
        this.tabLoadTimes = [];
    }
    TabGroupLazyLoadedExample.prototype.getTimeLoaded = function (index) {
        if (!this.tabLoadTimes[index]) {
            this.tabLoadTimes[index] = new Date();
        }
        return this.tabLoadTimes[index];
    };
    TabGroupLazyLoadedExample.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'tab-group-lazy-loaded-example',
                    template: "<mat-tab-group><mat-tab label=\"First\"><ng-template matTabContent>Content 1 - Loaded: {{getTimeLoaded(1) | date:'medium'}}</ng-template></mat-tab><mat-tab label=\"Second\"><ng-template matTabContent>Content 2 - Loaded: {{getTimeLoaded(2) | date:'medium'}}</ng-template></mat-tab><mat-tab label=\"Third\"><ng-template matTabContent>Content 3 - Loaded: {{getTimeLoaded(3) | date:'medium'}}</ng-template></mat-tab></mat-tab-group>",
                    styles: ["/** No CSS for this example */ "],
                },] },
    ];
    return TabGroupLazyLoadedExample;
}());
exports.TabGroupLazyLoadedExample = TabGroupLazyLoadedExample;
//# sourceMappingURL=tab-group-lazy-loaded-example.js.map