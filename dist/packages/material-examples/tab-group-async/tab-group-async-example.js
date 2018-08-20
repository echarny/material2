"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
/**
 * @title Tab group with asynchronously loading tab contents
 */
var TabGroupAsyncExample = /** @class */ (function () {
    function TabGroupAsyncExample() {
        this.asyncTabs = rxjs_1.Observable.create(function (observer) {
            setTimeout(function () {
                observer.next([
                    { label: 'First', content: 'Content 1' },
                    { label: 'Second', content: 'Content 2' },
                    { label: 'Third', content: 'Content 3' },
                ]);
            }, 1000);
        });
    }
    TabGroupAsyncExample.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'tab-group-async-example',
                    template: "<ng-container *ngIf=\"(asyncTabs | async) === null\">Loading tabs...</ng-container><mat-tab-group><mat-tab *ngFor=\"let tab of asyncTabs | async\"><ng-template mat-tab-label>{{tab.label}}</ng-template>{{tab.content}}</mat-tab></mat-tab-group>",
                    styles: ["/** No CSS for this example */ "],
                },] },
    ];
    /** @nocollapse */
    TabGroupAsyncExample.ctorParameters = function () { return []; };
    return TabGroupAsyncExample;
}());
exports.TabGroupAsyncExample = TabGroupAsyncExample;
//# sourceMappingURL=tab-group-async-example.js.map