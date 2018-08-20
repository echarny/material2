"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
var platform_1 = require("@angular/cdk/platform");
var core_1 = require("@angular/core");
var ripple_renderer_1 = require("./ripple-renderer");
var animations_1 = require("@angular/platform-browser/animations");
/** Injection token that can be used to specify the global ripple options. */
exports.MAT_RIPPLE_GLOBAL_OPTIONS = new core_1.InjectionToken('mat-ripple-global-options');
var MatRipple = /** @class */ (function () {
    function MatRipple(_elementRef, ngZone, platform, globalOptions, animationMode) {
        this._elementRef = _elementRef;
        /**
           * If set, the radius in pixels of foreground ripples when fully expanded. If unset, the radius
           * will be the distance from the center of the ripple to the furthest corner of the host element's
           * bounding rectangle.
           */
        this.radius = 0;
        /**
           * If set, the normal duration of ripple animations is divided by this value. For example,
           * setting it to 0.5 will cause the animations to take twice as long.
           * A changed speedFactor will not modify the fade-out duration of the ripples.
           * @deprecated Use the [matRippleAnimation] binding instead.
           * @breaking-change 7.0.0
           */
        this.speedFactor = 1;
        this._disabled = false;
        /** Whether ripple directive is initialized and the input bindings are set. */
        this._isInitialized = false;
        this._globalOptions = globalOptions || {};
        this._rippleRenderer = new ripple_renderer_1.RippleRenderer(this, ngZone, _elementRef, platform);
        if (animationMode === 'NoopAnimations') {
            this._globalOptions.animation = { enterDuration: 0, exitDuration: 0 };
        }
    }
    Object.defineProperty(MatRipple.prototype, "disabled", {
        get: /**
           * Whether click events will not trigger the ripple. Ripples can be still launched manually
           * by using the `launch()` method.
           */
        function () { return this._disabled; },
        set: function (value) {
            this._disabled = value;
            this._setupTriggerEventsIfEnabled();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatRipple.prototype, "trigger", {
        get: /**
           * The element that triggers the ripple when click events are received.
           * Defaults to the directive's host element.
           */
        function () { return this._trigger || this._elementRef.nativeElement; },
        set: function (trigger) {
            this._trigger = trigger;
            this._setupTriggerEventsIfEnabled();
        },
        enumerable: true,
        configurable: true
    });
    MatRipple.prototype.ngOnInit = function () {
        this._isInitialized = true;
        this._setupTriggerEventsIfEnabled();
    };
    MatRipple.prototype.ngOnDestroy = function () {
        this._rippleRenderer._removeTriggerEvents();
    };
    /** Fades out all currently showing ripple elements. */
    /** Fades out all currently showing ripple elements. */
    MatRipple.prototype.fadeOutAll = /** Fades out all currently showing ripple elements. */
    function () {
        this._rippleRenderer.fadeOutAll();
    };
    Object.defineProperty(MatRipple.prototype, "rippleConfig", {
        /**
         * Ripple configuration from the directive's input values.
         * @docs-private Implemented as part of RippleTarget
         */
        get: /**
           * Ripple configuration from the directive's input values.
           * @docs-private Implemented as part of RippleTarget
           */
        function () {
            return {
                centered: this.centered,
                radius: this.radius,
                color: this.color,
                animation: __assign({}, this._globalOptions.animation, this.animation),
                terminateOnPointerUp: this._globalOptions.terminateOnPointerUp,
                speedFactor: this.speedFactor * (this._globalOptions.baseSpeedFactor || 1),
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatRipple.prototype, "rippleDisabled", {
        /**
         * Whether ripples on pointer-down are disabled or not.
         * @docs-private Implemented as part of RippleTarget
         */
        get: /**
           * Whether ripples on pointer-down are disabled or not.
           * @docs-private Implemented as part of RippleTarget
           */
        function () {
            return this.disabled || !!this._globalOptions.disabled;
        },
        enumerable: true,
        configurable: true
    });
    /** Sets up the the trigger event listeners if ripples are enabled. */
    /** Sets up the the trigger event listeners if ripples are enabled. */
    MatRipple.prototype._setupTriggerEventsIfEnabled = /** Sets up the the trigger event listeners if ripples are enabled. */
    function () {
        if (!this.disabled && this._isInitialized) {
            this._rippleRenderer.setupTriggerEvents(this.trigger);
        }
    };
    /** Launches a manual ripple at the specified coordinated or just by the ripple config. */
    /** Launches a manual ripple at the specified coordinated or just by the ripple config. */
    MatRipple.prototype.launch = /** Launches a manual ripple at the specified coordinated or just by the ripple config. */
    function (configOrX, y, config) {
        if (y === void 0) { y = 0; }
        if (typeof configOrX === 'number') {
            return this._rippleRenderer.fadeInRipple(configOrX, y, __assign({}, this.rippleConfig, config));
        }
        else {
            return this._rippleRenderer.fadeInRipple(0, 0, __assign({}, this.rippleConfig, configOrX));
        }
    };
    MatRipple.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[mat-ripple], [matRipple]',
                    exportAs: 'matRipple',
                    host: {
                        'class': 'mat-ripple',
                        '[class.mat-ripple-unbounded]': 'unbounded'
                    }
                },] },
    ];
    /** @nocollapse */
    MatRipple.ctorParameters = function () { return [
        { type: core_1.ElementRef, },
        { type: core_1.NgZone, },
        { type: platform_1.Platform, },
        { type: undefined, decorators: [{ type: core_1.Optional }, { type: core_1.Inject, args: [exports.MAT_RIPPLE_GLOBAL_OPTIONS,] },] },
        { type: undefined, decorators: [{ type: core_1.Optional }, { type: core_1.Inject, args: [animations_1.ANIMATION_MODULE_TYPE,] },] },
    ]; };
    MatRipple.propDecorators = {
        "color": [{ type: core_1.Input, args: ['matRippleColor',] },],
        "unbounded": [{ type: core_1.Input, args: ['matRippleUnbounded',] },],
        "centered": [{ type: core_1.Input, args: ['matRippleCentered',] },],
        "radius": [{ type: core_1.Input, args: ['matRippleRadius',] },],
        "speedFactor": [{ type: core_1.Input, args: ['matRippleSpeedFactor',] },],
        "animation": [{ type: core_1.Input, args: ['matRippleAnimation',] },],
        "disabled": [{ type: core_1.Input, args: ['matRippleDisabled',] },],
        "trigger": [{ type: core_1.Input, args: ['matRippleTrigger',] },],
    };
    return MatRipple;
}());
exports.MatRipple = MatRipple;
//# sourceMappingURL=ripple.js.map