"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var animations_1 = require("@angular/platform-browser/animations");
var core_2 = require("@angular/material/core");
var platform_1 = require("@angular/cdk/platform");
var common_1 = require("@angular/common");
var coercion_1 = require("@angular/cdk/coercion");
/**
 * Base reference size of the spinner.
 * @docs-private
 */
var BASE_SIZE = 100;
/**
 * Base reference stroke width of the spinner.
 * @docs-private
 */
var BASE_STROKE_WIDTH = 10;
// Boilerplate for applying mixins to MatProgressSpinner.
/** @docs-private */
var 
// Boilerplate for applying mixins to MatProgressSpinner.
/** @docs-private */
MatProgressSpinnerBase = /** @class */ (function () {
    function MatProgressSpinnerBase(_elementRef) {
        this._elementRef = _elementRef;
    }
    return MatProgressSpinnerBase;
}());
exports.MatProgressSpinnerBase = MatProgressSpinnerBase;
exports._MatProgressSpinnerMixinBase = core_2.mixinColor(MatProgressSpinnerBase, 'primary');
/** Injection token to be used to override the default options for `mat-progress-spinner`. */
exports.MAT_PROGRESS_SPINNER_DEFAULT_OPTIONS = new core_1.InjectionToken('mat-progress-spinner-default-options', {
    providedIn: 'root',
    factory: MAT_PROGRESS_SPINNER_DEFAULT_OPTIONS_FACTORY,
});
/** @docs-private */
function MAT_PROGRESS_SPINNER_DEFAULT_OPTIONS_FACTORY() {
    return { diameter: BASE_SIZE };
}
exports.MAT_PROGRESS_SPINNER_DEFAULT_OPTIONS_FACTORY = MAT_PROGRESS_SPINNER_DEFAULT_OPTIONS_FACTORY;
// .0001 percentage difference is necessary in order to avoid unwanted animation frames
// for example because the animation duration is 4 seconds, .1% accounts to 4ms
// which are enough to see the flicker described in
// https://github.com/angular/material2/issues/8984
var INDETERMINATE_ANIMATION_TEMPLATE = "\n @keyframes mat-progress-spinner-stroke-rotate-DIAMETER {\n    0%      { stroke-dashoffset: START_VALUE;  transform: rotate(0); }\n    12.5%   { stroke-dashoffset: END_VALUE;    transform: rotate(0); }\n    12.5001%  { stroke-dashoffset: END_VALUE;    transform: rotateX(180deg) rotate(72.5deg); }\n    25%     { stroke-dashoffset: START_VALUE;  transform: rotateX(180deg) rotate(72.5deg); }\n\n    25.0001%   { stroke-dashoffset: START_VALUE;  transform: rotate(270deg); }\n    37.5%   { stroke-dashoffset: END_VALUE;    transform: rotate(270deg); }\n    37.5001%  { stroke-dashoffset: END_VALUE;    transform: rotateX(180deg) rotate(161.5deg); }\n    50%     { stroke-dashoffset: START_VALUE;  transform: rotateX(180deg) rotate(161.5deg); }\n\n    50.0001%  { stroke-dashoffset: START_VALUE;  transform: rotate(180deg); }\n    62.5%   { stroke-dashoffset: END_VALUE;    transform: rotate(180deg); }\n    62.5001%  { stroke-dashoffset: END_VALUE;    transform: rotateX(180deg) rotate(251.5deg); }\n    75%     { stroke-dashoffset: START_VALUE;  transform: rotateX(180deg) rotate(251.5deg); }\n\n    75.0001%  { stroke-dashoffset: START_VALUE;  transform: rotate(90deg); }\n    87.5%   { stroke-dashoffset: END_VALUE;    transform: rotate(90deg); }\n    87.5001%  { stroke-dashoffset: END_VALUE;    transform: rotateX(180deg) rotate(341.5deg); }\n    100%    { stroke-dashoffset: START_VALUE;  transform: rotateX(180deg) rotate(341.5deg); }\n  }\n";
/**
 * `<mat-progress-spinner>` component.
 */
var MatProgressSpinner = /** @class */ (function (_super) {
    __extends(MatProgressSpinner, _super);
    function MatProgressSpinner(_elementRef, platform, _document, 
    // @breaking-change 7.0.0 animationMode and defaults parameters to be made required.
    animationMode, defaults) {
        var _this = _super.call(this, _elementRef) || this;
        _this._elementRef = _elementRef;
        _this._document = _document;
        _this.animationMode = animationMode;
        _this.defaults = defaults;
        _this._value = 0;
        _this._fallbackAnimation = false;
        /** Whether the _mat-animation-noopable class should be applied, disabling animations.  */
        _this._noopAnimations = _this.animationMode === 'NoopAnimations' && (!!_this.defaults && !_this.defaults._forceAnimations);
        _this._diameter = BASE_SIZE;
        /** Mode of the progress circle */
        _this.mode = 'determinate';
        _this._fallbackAnimation = platform.EDGE || platform.TRIDENT;
        if (defaults) {
            if (defaults.diameter) {
                _this.diameter = defaults.diameter;
            }
            if (defaults.strokeWidth) {
                _this.strokeWidth = defaults.strokeWidth;
            }
        }
        // On IE and Edge, we can't animate the `stroke-dashoffset`
        // reliably so we fall back to a non-spec animation.
        var animationClass = "mat-progress-spinner-indeterminate" + (_this._fallbackAnimation ? '-fallback' : '') + "-animation";
        _elementRef.nativeElement.classList.add(animationClass);
        return _this;
    }
    Object.defineProperty(MatProgressSpinner.prototype, "diameter", {
        get: /** The diameter of the progress spinner (will set width and height of svg). */
        function () { return this._diameter; },
        set: function (size) {
            this._diameter = coercion_1.coerceNumberProperty(size);
            if (!this._fallbackAnimation && !MatProgressSpinner.diameters.has(this._diameter)) {
                this._attachStyleNode();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatProgressSpinner.prototype, "strokeWidth", {
        get: /** Stroke width of the progress spinner. */
        function () {
            return this._strokeWidth || this.diameter / 10;
        },
        set: function (value) {
            this._strokeWidth = coercion_1.coerceNumberProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatProgressSpinner.prototype, "value", {
        get: /** Value of the progress circle. */
        function () {
            return this.mode === 'determinate' ? this._value : 0;
        },
        set: function (newValue) {
            this._value = Math.max(0, Math.min(100, coercion_1.coerceNumberProperty(newValue)));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatProgressSpinner.prototype, "_circleRadius", {
        /** The radius of the spinner, adjusted for stroke width. */
        get: /** The radius of the spinner, adjusted for stroke width. */
        function () {
            return (this.diameter - BASE_STROKE_WIDTH) / 2;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatProgressSpinner.prototype, "_viewBox", {
        /** The view box of the spinner's svg element. */
        get: /** The view box of the spinner's svg element. */
        function () {
            var viewBox = this._circleRadius * 2 + this.strokeWidth;
            return "0 0 " + viewBox + " " + viewBox;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatProgressSpinner.prototype, "_strokeCircumference", {
        /** The stroke circumference of the svg circle. */
        get: /** The stroke circumference of the svg circle. */
        function () {
            return 2 * Math.PI * this._circleRadius;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatProgressSpinner.prototype, "_strokeDashOffset", {
        /** The dash offset of the svg circle. */
        get: /** The dash offset of the svg circle. */
        function () {
            if (this.mode === 'determinate') {
                return this._strokeCircumference * (100 - this._value) / 100;
            }
            // In fallback mode set the circle to 80% and rotate it with CSS.
            if (this._fallbackAnimation && this.mode === 'indeterminate') {
                return this._strokeCircumference * 0.2;
            }
            return null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatProgressSpinner.prototype, "_circleStrokeWidth", {
        /** Stroke width of the circle in percent. */
        get: /** Stroke width of the circle in percent. */
        function () {
            return this.strokeWidth / this.diameter * 100;
        },
        enumerable: true,
        configurable: true
    });
    /** Dynamically generates a style tag containing the correct animation for this diameter. */
    /** Dynamically generates a style tag containing the correct animation for this diameter. */
    MatProgressSpinner.prototype._attachStyleNode = /** Dynamically generates a style tag containing the correct animation for this diameter. */
    function () {
        var styleTag = MatProgressSpinner.styleTag;
        if (!styleTag) {
            styleTag = this._document.createElement('style');
            this._document.head.appendChild(styleTag);
            MatProgressSpinner.styleTag = styleTag;
        }
        if (styleTag && styleTag.sheet) {
            styleTag.sheet.insertRule(this._getAnimationText(), 0);
        }
        MatProgressSpinner.diameters.add(this.diameter);
    };
    /** Generates animation styles adjusted for the spinner's diameter. */
    /** Generates animation styles adjusted for the spinner's diameter. */
    MatProgressSpinner.prototype._getAnimationText = /** Generates animation styles adjusted for the spinner's diameter. */
    function () {
        return INDETERMINATE_ANIMATION_TEMPLATE
            .replace(/START_VALUE/g, "" + 0.95 * this._strokeCircumference)
            .replace(/END_VALUE/g, "" + 0.2 * this._strokeCircumference)
            .replace(/DIAMETER/g, "" + this.diameter);
    };
    /** Tracks diameters of existing instances to de-dupe generated styles (default d = 100) */
    MatProgressSpinner.diameters = new Set([BASE_SIZE]);
    /**
       * Used for storing all of the generated keyframe animations.
       * @dynamic
       */
    MatProgressSpinner.styleTag = null;
    MatProgressSpinner.decorators = [
        { type: core_1.Component, args: [{selector: 'mat-progress-spinner',
                    exportAs: 'matProgressSpinner',
                    host: {
                        'role': 'progressbar',
                        'class': 'mat-progress-spinner',
                        '[class._mat-animation-noopable]': "_noopAnimations",
                        '[style.width.px]': 'diameter',
                        '[style.height.px]': 'diameter',
                        '[attr.aria-valuemin]': 'mode === "determinate" ? 0 : null',
                        '[attr.aria-valuemax]': 'mode === "determinate" ? 100 : null',
                        '[attr.aria-valuenow]': 'value',
                        '[attr.mode]': 'mode',
                    },
                    inputs: ['color'],
                    template: "<svg [style.width.px]=\"diameter\" [style.height.px]=\"diameter\" [attr.viewBox]=\"_viewBox\" preserveAspectRatio=\"xMidYMid meet\" focusable=\"false\" [ngSwitch]=\"mode === 'indeterminate'\"><circle *ngSwitchCase=\"true\" cx=\"50%\" cy=\"50%\" [attr.r]=\"_circleRadius\" [style.animation-name]=\"'mat-progress-spinner-stroke-rotate-' + diameter\" [style.stroke-dashoffset.px]=\"_strokeDashOffset\" [style.stroke-dasharray.px]=\"_strokeCircumference\" [style.stroke-width.%]=\"_circleStrokeWidth\"></circle><circle *ngSwitchCase=\"false\" cx=\"50%\" cy=\"50%\" [attr.r]=\"_circleRadius\" [style.stroke-dashoffset.px]=\"_strokeDashOffset\" [style.stroke-dasharray.px]=\"_strokeCircumference\" [style.stroke-width.%]=\"_circleStrokeWidth\"></circle></svg>",
                    styles: [".mat-progress-spinner{display:block;position:relative}.mat-progress-spinner svg{position:absolute;transform:rotate(-90deg);top:0;left:0;transform-origin:center;overflow:visible}.mat-progress-spinner circle{fill:transparent;transform-origin:center;transition:stroke-dashoffset 225ms linear}._mat-animation-noopable.mat-progress-spinner circle{transition:none;animation:none}.mat-progress-spinner.mat-progress-spinner-indeterminate-animation[mode=indeterminate]{animation:mat-progress-spinner-linear-rotate 2s linear infinite}._mat-animation-noopable.mat-progress-spinner.mat-progress-spinner-indeterminate-animation[mode=indeterminate]{transition:none;animation:none}.mat-progress-spinner.mat-progress-spinner-indeterminate-animation[mode=indeterminate] circle{transition-property:stroke;animation-duration:4s;animation-timing-function:cubic-bezier(.35,0,.25,1);animation-iteration-count:infinite}._mat-animation-noopable.mat-progress-spinner.mat-progress-spinner-indeterminate-animation[mode=indeterminate] circle{transition:none;animation:none}.mat-progress-spinner.mat-progress-spinner-indeterminate-fallback-animation[mode=indeterminate]{animation:mat-progress-spinner-stroke-rotate-fallback 10s cubic-bezier(.87,.03,.33,1) infinite}._mat-animation-noopable.mat-progress-spinner.mat-progress-spinner-indeterminate-fallback-animation[mode=indeterminate]{transition:none;animation:none}.mat-progress-spinner.mat-progress-spinner-indeterminate-fallback-animation[mode=indeterminate] circle{transition-property:stroke}._mat-animation-noopable.mat-progress-spinner.mat-progress-spinner-indeterminate-fallback-animation[mode=indeterminate] circle{transition:none;animation:none}@keyframes mat-progress-spinner-linear-rotate{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}@keyframes mat-progress-spinner-stroke-rotate-100{0%{stroke-dashoffset:268.60617px;transform:rotate(0)}12.5%{stroke-dashoffset:56.54867px;transform:rotate(0)}12.5001%{stroke-dashoffset:56.54867px;transform:rotateX(180deg) rotate(72.5deg)}25%{stroke-dashoffset:268.60617px;transform:rotateX(180deg) rotate(72.5deg)}25.0001%{stroke-dashoffset:268.60617px;transform:rotate(270deg)}37.5%{stroke-dashoffset:56.54867px;transform:rotate(270deg)}37.5001%{stroke-dashoffset:56.54867px;transform:rotateX(180deg) rotate(161.5deg)}50%{stroke-dashoffset:268.60617px;transform:rotateX(180deg) rotate(161.5deg)}50.0001%{stroke-dashoffset:268.60617px;transform:rotate(180deg)}62.5%{stroke-dashoffset:56.54867px;transform:rotate(180deg)}62.5001%{stroke-dashoffset:56.54867px;transform:rotateX(180deg) rotate(251.5deg)}75%{stroke-dashoffset:268.60617px;transform:rotateX(180deg) rotate(251.5deg)}75.0001%{stroke-dashoffset:268.60617px;transform:rotate(90deg)}87.5%{stroke-dashoffset:56.54867px;transform:rotate(90deg)}87.5001%{stroke-dashoffset:56.54867px;transform:rotateX(180deg) rotate(341.5deg)}100%{stroke-dashoffset:268.60617px;transform:rotateX(180deg) rotate(341.5deg)}}@keyframes mat-progress-spinner-stroke-rotate-fallback{0%{transform:rotate(0)}25%{transform:rotate(1170deg)}50%{transform:rotate(2340deg)}75%{transform:rotate(3510deg)}100%{transform:rotate(4680deg)}}"],
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    encapsulation: core_1.ViewEncapsulation.None,
                },] },
    ];
    /** @nocollapse */
    MatProgressSpinner.ctorParameters = function () { return [
        { type: core_1.ElementRef, },
        { type: platform_1.Platform, },
        { type: undefined, decorators: [{ type: core_1.Optional }, { type: core_1.Inject, args: [common_1.DOCUMENT,] },] },
        { type: undefined, decorators: [{ type: core_1.Optional }, { type: core_1.Inject, args: [animations_1.ANIMATION_MODULE_TYPE,] },] },
        { type: undefined, decorators: [{ type: core_1.Inject, args: [exports.MAT_PROGRESS_SPINNER_DEFAULT_OPTIONS,] },] },
    ]; };
    MatProgressSpinner.propDecorators = {
        "diameter": [{ type: core_1.Input },],
        "strokeWidth": [{ type: core_1.Input },],
        "mode": [{ type: core_1.Input },],
        "value": [{ type: core_1.Input },],
    };
    return MatProgressSpinner;
}(exports._MatProgressSpinnerMixinBase));
exports.MatProgressSpinner = MatProgressSpinner;
/**
 * `<mat-spinner>` component.
 *
 * This is a component definition to be used as a convenience reference to create an
 * indeterminate `<mat-progress-spinner>` instance.
 */
var MatSpinner = /** @class */ (function (_super) {
    __extends(MatSpinner, _super);
    function MatSpinner(elementRef, platform, document, 
    // @breaking-changes 7.0.0 animationMode and defaults parameters to be made required.
    animationMode, defaults) {
        var _this = _super.call(this, elementRef, platform, document, animationMode, defaults) || this;
        _this.mode = 'indeterminate';
        return _this;
    }
    MatSpinner.decorators = [
        { type: core_1.Component, args: [{selector: 'mat-spinner',
                    host: {
                        'role': 'progressbar',
                        'mode': 'indeterminate',
                        'class': 'mat-spinner mat-progress-spinner',
                        '[class._mat-animation-noopable]': "_noopAnimations",
                        '[style.width.px]': 'diameter',
                        '[style.height.px]': 'diameter',
                    },
                    inputs: ['color'],
                    template: "<svg [style.width.px]=\"diameter\" [style.height.px]=\"diameter\" [attr.viewBox]=\"_viewBox\" preserveAspectRatio=\"xMidYMid meet\" focusable=\"false\" [ngSwitch]=\"mode === 'indeterminate'\"><circle *ngSwitchCase=\"true\" cx=\"50%\" cy=\"50%\" [attr.r]=\"_circleRadius\" [style.animation-name]=\"'mat-progress-spinner-stroke-rotate-' + diameter\" [style.stroke-dashoffset.px]=\"_strokeDashOffset\" [style.stroke-dasharray.px]=\"_strokeCircumference\" [style.stroke-width.%]=\"_circleStrokeWidth\"></circle><circle *ngSwitchCase=\"false\" cx=\"50%\" cy=\"50%\" [attr.r]=\"_circleRadius\" [style.stroke-dashoffset.px]=\"_strokeDashOffset\" [style.stroke-dasharray.px]=\"_strokeCircumference\" [style.stroke-width.%]=\"_circleStrokeWidth\"></circle></svg>",
                    styles: [".mat-progress-spinner{display:block;position:relative}.mat-progress-spinner svg{position:absolute;transform:rotate(-90deg);top:0;left:0;transform-origin:center;overflow:visible}.mat-progress-spinner circle{fill:transparent;transform-origin:center;transition:stroke-dashoffset 225ms linear}._mat-animation-noopable.mat-progress-spinner circle{transition:none;animation:none}.mat-progress-spinner.mat-progress-spinner-indeterminate-animation[mode=indeterminate]{animation:mat-progress-spinner-linear-rotate 2s linear infinite}._mat-animation-noopable.mat-progress-spinner.mat-progress-spinner-indeterminate-animation[mode=indeterminate]{transition:none;animation:none}.mat-progress-spinner.mat-progress-spinner-indeterminate-animation[mode=indeterminate] circle{transition-property:stroke;animation-duration:4s;animation-timing-function:cubic-bezier(.35,0,.25,1);animation-iteration-count:infinite}._mat-animation-noopable.mat-progress-spinner.mat-progress-spinner-indeterminate-animation[mode=indeterminate] circle{transition:none;animation:none}.mat-progress-spinner.mat-progress-spinner-indeterminate-fallback-animation[mode=indeterminate]{animation:mat-progress-spinner-stroke-rotate-fallback 10s cubic-bezier(.87,.03,.33,1) infinite}._mat-animation-noopable.mat-progress-spinner.mat-progress-spinner-indeterminate-fallback-animation[mode=indeterminate]{transition:none;animation:none}.mat-progress-spinner.mat-progress-spinner-indeterminate-fallback-animation[mode=indeterminate] circle{transition-property:stroke}._mat-animation-noopable.mat-progress-spinner.mat-progress-spinner-indeterminate-fallback-animation[mode=indeterminate] circle{transition:none;animation:none}@keyframes mat-progress-spinner-linear-rotate{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}@keyframes mat-progress-spinner-stroke-rotate-100{0%{stroke-dashoffset:268.60617px;transform:rotate(0)}12.5%{stroke-dashoffset:56.54867px;transform:rotate(0)}12.5001%{stroke-dashoffset:56.54867px;transform:rotateX(180deg) rotate(72.5deg)}25%{stroke-dashoffset:268.60617px;transform:rotateX(180deg) rotate(72.5deg)}25.0001%{stroke-dashoffset:268.60617px;transform:rotate(270deg)}37.5%{stroke-dashoffset:56.54867px;transform:rotate(270deg)}37.5001%{stroke-dashoffset:56.54867px;transform:rotateX(180deg) rotate(161.5deg)}50%{stroke-dashoffset:268.60617px;transform:rotateX(180deg) rotate(161.5deg)}50.0001%{stroke-dashoffset:268.60617px;transform:rotate(180deg)}62.5%{stroke-dashoffset:56.54867px;transform:rotate(180deg)}62.5001%{stroke-dashoffset:56.54867px;transform:rotateX(180deg) rotate(251.5deg)}75%{stroke-dashoffset:268.60617px;transform:rotateX(180deg) rotate(251.5deg)}75.0001%{stroke-dashoffset:268.60617px;transform:rotate(90deg)}87.5%{stroke-dashoffset:56.54867px;transform:rotate(90deg)}87.5001%{stroke-dashoffset:56.54867px;transform:rotateX(180deg) rotate(341.5deg)}100%{stroke-dashoffset:268.60617px;transform:rotateX(180deg) rotate(341.5deg)}}@keyframes mat-progress-spinner-stroke-rotate-fallback{0%{transform:rotate(0)}25%{transform:rotate(1170deg)}50%{transform:rotate(2340deg)}75%{transform:rotate(3510deg)}100%{transform:rotate(4680deg)}}"],
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    encapsulation: core_1.ViewEncapsulation.None,
                },] },
    ];
    /** @nocollapse */
    MatSpinner.ctorParameters = function () { return [
        { type: core_1.ElementRef, },
        { type: platform_1.Platform, },
        { type: undefined, decorators: [{ type: core_1.Optional }, { type: core_1.Inject, args: [common_1.DOCUMENT,] },] },
        { type: undefined, decorators: [{ type: core_1.Optional }, { type: core_1.Inject, args: [animations_1.ANIMATION_MODULE_TYPE,] },] },
        { type: undefined, decorators: [{ type: core_1.Inject, args: [exports.MAT_PROGRESS_SPINNER_DEFAULT_OPTIONS,] },] },
    ]; };
    return MatSpinner;
}(MatProgressSpinner));
exports.MatSpinner = MatSpinner;
//# sourceMappingURL=progress-spinner.js.map