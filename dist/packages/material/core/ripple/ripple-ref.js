"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
/** Possible states for a ripple element. */
/** Possible states for a ripple element. */
var RippleState;
/** Possible states for a ripple element. */
(function (RippleState) {
    RippleState[RippleState["FADING_IN"] = 0] = "FADING_IN";
    RippleState[RippleState["VISIBLE"] = 1] = "VISIBLE";
    RippleState[RippleState["FADING_OUT"] = 2] = "FADING_OUT";
    RippleState[RippleState["HIDDEN"] = 3] = "HIDDEN";
})(RippleState = exports.RippleState || (exports.RippleState = {}));
/**
 * Reference to a previously launched ripple element.
 */
var /**
 * Reference to a previously launched ripple element.
 */
RippleRef = /** @class */ (function () {
    function RippleRef(_renderer, /** Reference to the ripple HTML element. */
    element, /** Ripple configuration used for the ripple. */
    config) {
        this._renderer = _renderer;
        this.element = element;
        this.config = config;
        /** Current state of the ripple. */
        this.state = RippleState.HIDDEN;
    }
    /** Fades out the ripple element. */
    /** Fades out the ripple element. */
    RippleRef.prototype.fadeOut = /** Fades out the ripple element. */
    function () {
        this._renderer.fadeOutRipple(this);
    };
    return RippleRef;
}());
exports.RippleRef = RippleRef;
//# sourceMappingURL=ripple-ref.js.map