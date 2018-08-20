"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
/** Creates a browser MouseEvent with the specified options. */
function createMouseEvent(type, x, y) {
    if (x === void 0) { x = 0; }
    if (y === void 0) { y = 0; }
    var event = document.createEvent('MouseEvent');
    event.initMouseEvent(type, true, /* canBubble */ /* canBubble */
    false, /* cancelable */ window, /* view */ 0, /* detail */ x, /* screenX */ y, /* screenY */ x, /* clientX */ y, /* clientY */ /* clientY */
    false, /* ctrlKey */ /* ctrlKey */
    false, /* altKey */ /* altKey */
    false, /* shiftKey */ /* shiftKey */
    false, /* metaKey */ 0, /* button */ null);
    return event;
}
exports.createMouseEvent = createMouseEvent;
/** Creates a browser TouchEvent with the specified pointer coordinates. */
function createTouchEvent(type, pageX, pageY) {
    if (pageX === void 0) { pageX = 0; }
    if (pageY === void 0) { pageY = 0; }
    // In favor of creating events that work for most of the browsers, the event is created
    // as a basic UI Event. The necessary details for the event will be set manually.
    var event = document.createEvent('UIEvent');
    var touchDetails = { pageX: pageX, pageY: pageY };
    event.initUIEvent(type, true, true, window, 0);
    // Most of the browsers don't have a "initTouchEvent" method that can be used to define
    // the touch details.
    Object.defineProperties(event, {
        touches: { value: [touchDetails] },
        targetTouches: { value: [touchDetails] }
    });
    return event;
}
exports.createTouchEvent = createTouchEvent;
/** Dispatches a keydown event from an element. */
function createKeyboardEvent(type, keyCode, target, key) {
    var event = document.createEvent('KeyboardEvent');
    // Firefox does not support `initKeyboardEvent`, but supports `initKeyEvent`.
    var initEventFn = (event.initKeyEvent || event.initKeyboardEvent).bind(event);
    var originalPreventDefault = event.preventDefault;
    initEventFn(type, true, true, window, 0, 0, 0, 0, 0, keyCode);
    // Webkit Browsers don't set the keyCode when calling the init function.
    // See related bug https://bugs.webkit.org/show_bug.cgi?id=16735
    Object.defineProperties(event, {
        keyCode: { get: function () { return keyCode; } },
        key: { get: function () { return key; } },
        target: { get: function () { return target; } }
    });
    // IE won't set `defaultPrevented` on synthetic events so we need to do it manually.
    event.preventDefault = function () {
        Object.defineProperty(event, 'defaultPrevented', { get: function () { return true; } });
        return originalPreventDefault.apply(this, arguments);
    };
    return event;
}
exports.createKeyboardEvent = createKeyboardEvent;
/** Creates a fake event object with any desired event type. */
function createFakeEvent(type, canBubble, cancelable) {
    if (canBubble === void 0) { canBubble = false; }
    if (cancelable === void 0) { cancelable = true; }
    var event = document.createEvent('Event');
    event.initEvent(type, canBubble, cancelable);
    return event;
}
exports.createFakeEvent = createFakeEvent;
//# sourceMappingURL=event-objects.js.map