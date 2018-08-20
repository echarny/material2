"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
var event_objects_1 = require("./event-objects");
/** Utility to dispatch any event on a Node. */
function dispatchEvent(node, event) {
    node.dispatchEvent(event);
    return event;
}
exports.dispatchEvent = dispatchEvent;
/** Shorthand to dispatch a fake event on a specified node. */
function dispatchFakeEvent(node, type, canBubble) {
    return dispatchEvent(node, event_objects_1.createFakeEvent(type, canBubble));
}
exports.dispatchFakeEvent = dispatchFakeEvent;
/** Shorthand to dispatch a keyboard event with a specified key code. */
function dispatchKeyboardEvent(node, type, keyCode, target) {
    return dispatchEvent(node, event_objects_1.createKeyboardEvent(type, keyCode, target));
}
exports.dispatchKeyboardEvent = dispatchKeyboardEvent;
/** Shorthand to dispatch a mouse event on the specified coordinates. */
function dispatchMouseEvent(node, type, x, y, event) {
    if (x === void 0) { x = 0; }
    if (y === void 0) { y = 0; }
    if (event === void 0) { event = event_objects_1.createMouseEvent(type, x, y); }
    return dispatchEvent(node, event);
}
exports.dispatchMouseEvent = dispatchMouseEvent;
/** Shorthand to dispatch a touch event on the specified coordinates. */
function dispatchTouchEvent(node, type, x, y) {
    if (x === void 0) { x = 0; }
    if (y === void 0) { y = 0; }
    return dispatchEvent(node, event_objects_1.createTouchEvent(type, x, y));
}
exports.dispatchTouchEvent = dispatchTouchEvent;
//# sourceMappingURL=dispatch-events.js.map