"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
var tabs_a11y_1 = require("./tabs-a11y");
exports.TABS_DEMO_ROUTES = [
    { path: '', redirectTo: 'sunny-tab', pathMatch: 'full' },
    { path: 'sunny-tab', component: tabs_a11y_1.SunnyTabContent },
    { path: 'rainy-tab', component: tabs_a11y_1.RainyTabContent },
    { path: 'foggy-tab', component: tabs_a11y_1.FoggyTabContent },
];
//# sourceMappingURL=routes.js.map