"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
var dispatch_events_1 = require("./dispatch-events");
/**
 * Patches an elements focus and blur methods to emit events consistently and predictably.
 * This is necessary, because some browsers, like IE11, will call the focus handlers asynchronously,
 * while others won't fire them at all if the browser window is not focused.
 */
function patchElementFocus(element) {
    element.focus = function () { return dispatch_events_1.dispatchFakeEvent(element, 'focus'); };
    element.blur = function () { return dispatch_events_1.dispatchFakeEvent(element, 'blur'); };
}
exports.patchElementFocus = patchElementFocus;
//# sourceMappingURL=element-focus.js.map