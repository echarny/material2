/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { __extends } from 'tslib';
import { FocusMonitor } from '@angular/cdk/a11y';
import { Directionality } from '@angular/cdk/bidi';
import { coerceBooleanProperty, coerceNumberProperty } from '@angular/cdk/coercion';
import { DOWN_ARROW, END, HOME, LEFT_ARROW, PAGE_DOWN, PAGE_UP, RIGHT_ARROW, UP_ARROW } from '@angular/cdk/keycodes';
import { Attribute, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, forwardRef, Input, Optional, Output, ViewChild, ViewEncapsulation, Inject, NgModule } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { mixinColor, mixinDisabled, mixinTabIndex, GestureConfig, MatCommonModule } from '@angular/material/core';
import { Subscription } from 'rxjs';
import { ANIMATION_MODULE_TYPE } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Visually, a 30px separation between tick marks looks best. This is very subjective but it is
 * the default separation we chose.
 */
var /** @type {?} */ MIN_AUTO_TICK_SEPARATION = 30;
/**
 * The thumb gap size for a disabled slider.
 */
var /** @type {?} */ DISABLED_THUMB_GAP = 7;
/**
 * The thumb gap size for a non-active slider at its minimum value.
 */
var /** @type {?} */ MIN_VALUE_NONACTIVE_THUMB_GAP = 7;
/**
 * The thumb gap size for an active slider at its minimum value.
 */
var /** @type {?} */ MIN_VALUE_ACTIVE_THUMB_GAP = 10;
/**
 * Provider Expression that allows mat-slider to register as a ControlValueAccessor.
 * This allows it to support [(ngModel)] and [formControl].
 */
var /** @type {?} */ MAT_SLIDER_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return MatSlider; }),
    multi: true
};
/**
 * A simple change event emitted by the MatSlider component.
 */
var  /**
 * A simple change event emitted by the MatSlider component.
 */
MatSliderChange = /** @class */ (function () {
    function MatSliderChange() {
    }
    return MatSliderChange;
}());
/**
 * \@docs-private
 */
var  /**
 * \@docs-private
 */
MatSliderBase = /** @class */ (function () {
    function MatSliderBase(_elementRef) {
        this._elementRef = _elementRef;
    }
    return MatSliderBase;
}());
var /** @type {?} */ _MatSliderMixinBase = mixinTabIndex(mixinColor(mixinDisabled(MatSliderBase), 'accent'));
/**
 * Allows users to select from a range of values by moving the slider thumb. It is similar in
 * behavior to the native `<input type="range">` element.
 */
var MatSlider = /** @class */ (function (_super) {
    __extends(MatSlider, _super);
    function MatSlider(elementRef, _focusMonitor, _changeDetectorRef, _dir, tabIndex, 
    // @breaking-change 7.0.0 `_animationMode` parameter to be made required.
    _animationMode) {
        var _this = _super.call(this, elementRef) || this;
        _this._focusMonitor = _focusMonitor;
        _this._changeDetectorRef = _changeDetectorRef;
        _this._dir = _dir;
        _this._animationMode = _animationMode;
        _this._invert = false;
        _this._max = 100;
        _this._min = 0;
        _this._step = 1;
        _this._thumbLabel = false;
        _this._tickInterval = 0;
        _this._value = null;
        _this._vertical = false;
        /**
         * Event emitted when the slider value has changed.
         */
        _this.change = new EventEmitter();
        /**
         * Event emitted when the slider thumb moves.
         */
        _this.input = new EventEmitter();
        /**
         * Emits when the raw value of the slider changes. This is here primarily
         * to facilitate the two-way binding for the `value` input.
         * \@docs-private
         */
        _this.valueChange = new EventEmitter();
        /**
         * onTouch function registered via registerOnTouch (ControlValueAccessor).
         */
        _this.onTouched = function () { };
        _this._percent = 0;
        /**
         * Whether or not the thumb is sliding.
         * Used to determine if there should be a transition for the thumb and fill track.
         */
        _this._isSliding = false;
        /**
         * Whether or not the slider is active (clicked or sliding).
         * Used to shrink and grow the thumb as according to the Material Design spec.
         */
        _this._isActive = false;
        /**
         * The size of a tick interval as a percentage of the size of the track.
         */
        _this._tickIntervalPercent = 0;
        /**
         * The dimensions of the slider.
         */
        _this._sliderDimensions = null;
        _this._controlValueAccessorChangeFn = function () { };
        /**
         * Subscription to the Directionality change EventEmitter.
         */
        _this._dirChangeSubscription = Subscription.EMPTY;
        _this.tabIndex = parseInt(tabIndex) || 0;
        return _this;
    }
    Object.defineProperty(MatSlider.prototype, "invert", {
        get: /**
         * Whether the slider is inverted.
         * @return {?}
         */
        function () { return this._invert; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._invert = coerceBooleanProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatSlider.prototype, "max", {
        get: /**
         * The maximum value that the slider can have.
         * @return {?}
         */
        function () { return this._max; },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            this._max = coerceNumberProperty(v, this._max);
            this._percent = this._calculatePercentage(this._value);
            // Since this also modifies the percentage, we need to let the change detection know.
            this._changeDetectorRef.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatSlider.prototype, "min", {
        get: /**
         * The minimum value that the slider can have.
         * @return {?}
         */
        function () { return this._min; },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            this._min = coerceNumberProperty(v, this._min);
            // If the value wasn't explicitly set by the user, set it to the min.
            if (this._value === null) {
                this.value = this._min;
            }
            this._percent = this._calculatePercentage(this._value);
            // Since this also modifies the percentage, we need to let the change detection know.
            this._changeDetectorRef.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatSlider.prototype, "step", {
        get: /**
         * The values at which the thumb will snap.
         * @return {?}
         */
        function () { return this._step; },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            this._step = coerceNumberProperty(v, this._step);
            if (this._step % 1 !== 0) {
                this._roundToDecimal = /** @type {?} */ ((this._step.toString().split('.').pop())).length;
            }
            // Since this could modify the label, we need to notify the change detection.
            this._changeDetectorRef.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatSlider.prototype, "thumbLabel", {
        get: /**
         * Whether or not to show the thumb label.
         * @return {?}
         */
        function () { return this._thumbLabel; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) { this._thumbLabel = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatSlider.prototype, "tickInterval", {
        get: /**
         * How often to show ticks. Relative to the step so that a tick always appears on a step.
         * Ex: Tick interval of 4 with a step of 3 will draw a tick every 4 steps (every 12 values).
         * @return {?}
         */
        function () { return this._tickInterval; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (value === 'auto') {
                this._tickInterval = 'auto';
            }
            else if (typeof value === 'number' || typeof value === 'string') {
                this._tickInterval = coerceNumberProperty(value, /** @type {?} */ (this._tickInterval));
            }
            else {
                this._tickInterval = 0;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatSlider.prototype, "value", {
        get: /**
         * Value of the slider.
         * @return {?}
         */
        function () {
            // If the value needs to be read and it is still uninitialized, initialize it to the min.
            if (this._value === null) {
                this.value = this._min;
            }
            return this._value;
        },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            if (v !== this._value) {
                var /** @type {?} */ value = coerceNumberProperty(v);
                // While incrementing by a decimal we can end up with values like 33.300000000000004.
                // Truncate it to ensure that it matches the label and to make it easier to work with.
                if (this._roundToDecimal) {
                    value = parseFloat(value.toFixed(this._roundToDecimal));
                }
                this._value = value;
                this._percent = this._calculatePercentage(this._value);
                // Since this also modifies the percentage, we need to let the change detection know.
                this._changeDetectorRef.markForCheck();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatSlider.prototype, "vertical", {
        get: /**
         * Whether the slider is vertical.
         * @return {?}
         */
        function () { return this._vertical; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._vertical = coerceBooleanProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatSlider.prototype, "displayValue", {
        /** The value to be used for display purposes. */
        get: /**
         * The value to be used for display purposes.
         * @return {?}
         */
        function () {
            if (this.displayWith) {
                return this.displayWith(this.value);
            }
            // Note that this could be improved further by rounding something like 0.999 to 1 or
            // 0.899 to 0.9, however it is very performance sensitive, because it gets called on
            // every change detection cycle.
            if (this._roundToDecimal && this.value && this.value % 1 !== 0) {
                return this.value.toFixed(this._roundToDecimal);
            }
            return this.value || 0;
        },
        enumerable: true,
        configurable: true
    });
    /** set focus to the host element */
    /**
     * set focus to the host element
     * @return {?}
     */
    MatSlider.prototype.focus = /**
     * set focus to the host element
     * @return {?}
     */
    function () {
        this._focusHostElement();
    };
    /** blur the host element */
    /**
     * blur the host element
     * @return {?}
     */
    MatSlider.prototype.blur = /**
     * blur the host element
     * @return {?}
     */
    function () {
        this._blurHostElement();
    };
    Object.defineProperty(MatSlider.prototype, "percent", {
        /** The percentage of the slider that coincides with the value. */
        get: /**
         * The percentage of the slider that coincides with the value.
         * @return {?}
         */
        function () { return this._clamp(this._percent); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatSlider.prototype, "_invertAxis", {
        /**
         * Whether the axis of the slider is inverted.
         * (i.e. whether moving the thumb in the positive x or y direction decreases the slider's value).
         */
        get: /**
         * Whether the axis of the slider is inverted.
         * (i.e. whether moving the thumb in the positive x or y direction decreases the slider's value).
         * @return {?}
         */
        function () {
            // Standard non-inverted mode for a vertical slider should be dragging the thumb from bottom to
            // top. However from a y-axis standpoint this is inverted.
            return this.vertical ? !this.invert : this.invert;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatSlider.prototype, "_isMinValue", {
        /** Whether the slider is at its minimum value. */
        get: /**
         * Whether the slider is at its minimum value.
         * @return {?}
         */
        function () {
            return this.percent === 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatSlider.prototype, "_thumbGap", {
        /**
         * The amount of space to leave between the slider thumb and the track fill & track background
         * elements.
         */
        get: /**
         * The amount of space to leave between the slider thumb and the track fill & track background
         * elements.
         * @return {?}
         */
        function () {
            if (this.disabled) {
                return DISABLED_THUMB_GAP;
            }
            if (this._isMinValue && !this.thumbLabel) {
                return this._isActive ? MIN_VALUE_ACTIVE_THUMB_GAP : MIN_VALUE_NONACTIVE_THUMB_GAP;
            }
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatSlider.prototype, "_trackBackgroundStyles", {
        /** CSS styles for the track background element. */
        get: /**
         * CSS styles for the track background element.
         * @return {?}
         */
        function () {
            var /** @type {?} */ axis = this.vertical ? 'Y' : 'X';
            var /** @type {?} */ scale = this.vertical ? "1, " + (1 - this.percent) + ", 1" : 1 - this.percent + ", 1, 1";
            var /** @type {?} */ sign = this._invertMouseCoords ? '-' : '';
            return {
                // scale3d avoids some rendering issues in Chrome. See #12071.
                transform: "translate" + axis + "(" + sign + this._thumbGap + "px) scale3d(" + scale + ")"
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatSlider.prototype, "_trackFillStyles", {
        /** CSS styles for the track fill element. */
        get: /**
         * CSS styles for the track fill element.
         * @return {?}
         */
        function () {
            var /** @type {?} */ axis = this.vertical ? 'Y' : 'X';
            var /** @type {?} */ scale = this.vertical ? "1, " + this.percent + ", 1" : this.percent + ", 1, 1";
            var /** @type {?} */ sign = this._invertMouseCoords ? '' : '-';
            return {
                // scale3d avoids some rendering issues in Chrome. See #12071.
                transform: "translate" + axis + "(" + sign + this._thumbGap + "px) scale3d(" + scale + ")"
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatSlider.prototype, "_ticksContainerStyles", {
        /** CSS styles for the ticks container element. */
        get: /**
         * CSS styles for the ticks container element.
         * @return {?}
         */
        function () {
            var /** @type {?} */ axis = this.vertical ? 'Y' : 'X';
            // For a horizontal slider in RTL languages we push the ticks container off the left edge
            // instead of the right edge to avoid causing a horizontal scrollbar to appear.
            var /** @type {?} */ sign = !this.vertical && this._direction == 'rtl' ? '' : '-';
            var /** @type {?} */ offset = this._tickIntervalPercent / 2 * 100;
            return {
                'transform': "translate" + axis + "(" + sign + offset + "%)"
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatSlider.prototype, "_ticksStyles", {
        /** CSS styles for the ticks element. */
        get: /**
         * CSS styles for the ticks element.
         * @return {?}
         */
        function () {
            var /** @type {?} */ tickSize = this._tickIntervalPercent * 100;
            var /** @type {?} */ backgroundSize = this.vertical ? "2px " + tickSize + "%" : tickSize + "% 2px";
            var /** @type {?} */ axis = this.vertical ? 'Y' : 'X';
            // Depending on the direction we pushed the ticks container, push the ticks the opposite
            // direction to re-center them but clip off the end edge. In RTL languages we need to flip the
            // ticks 180 degrees so we're really cutting off the end edge abd not the start.
            var /** @type {?} */ sign = !this.vertical && this._direction == 'rtl' ? '-' : '';
            var /** @type {?} */ rotate = !this.vertical && this._direction == 'rtl' ? ' rotate(180deg)' : '';
            var /** @type {?} */ styles = {
                'backgroundSize': backgroundSize,
                // Without translateZ ticks sometimes jitter as the slider moves on Chrome & Firefox.
                'transform': "translateZ(0) translate" + axis + "(" + sign + tickSize / 2 + "%)" + rotate
            };
            if (this._isMinValue && this._thumbGap) {
                var /** @type {?} */ side = this.vertical ?
                    (this._invertAxis ? 'Bottom' : 'Top') :
                    (this._invertAxis ? 'Right' : 'Left');
                styles["padding" + side] = this._thumbGap + "px";
            }
            return styles;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatSlider.prototype, "_thumbContainerStyles", {
        get: /**
         * @return {?}
         */
        function () {
            var /** @type {?} */ axis = this.vertical ? 'Y' : 'X';
            // For a horizontal slider in RTL languages we push the thumb container off the left edge
            // instead of the right edge to avoid causing a horizontal scrollbar to appear.
            var /** @type {?} */ invertOffset = (this._direction == 'rtl' && !this.vertical) ? !this._invertAxis : this._invertAxis;
            var /** @type {?} */ offset = (invertOffset ? this.percent : 1 - this.percent) * 100;
            return {
                'transform': "translate" + axis + "(-" + offset + "%)"
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatSlider.prototype, "_invertMouseCoords", {
        get: /**
         * Whether mouse events should be converted to a slider position by calculating their distance
         * from the right or bottom edge of the slider as opposed to the top or left.
         * @return {?}
         */
        function () {
            return (this._direction == 'rtl' && !this.vertical) ? !this._invertAxis : this._invertAxis;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatSlider.prototype, "_direction", {
        get: /**
         * The language direction for this slider element.
         * @return {?}
         */
        function () {
            return (this._dir && this._dir.value == 'rtl') ? 'rtl' : 'ltr';
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    MatSlider.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this._focusMonitor
            .monitor(this._elementRef.nativeElement, true)
            .subscribe(function (origin) {
            _this._isActive = !!origin && origin !== 'keyboard';
            _this._changeDetectorRef.detectChanges();
        });
        if (this._dir) {
            this._dirChangeSubscription = this._dir.change.subscribe(function () {
                _this._changeDetectorRef.markForCheck();
            });
        }
    };
    /**
     * @return {?}
     */
    MatSlider.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._focusMonitor.stopMonitoring(this._elementRef.nativeElement);
        this._dirChangeSubscription.unsubscribe();
    };
    /**
     * @return {?}
     */
    MatSlider.prototype._onMouseenter = /**
     * @return {?}
     */
    function () {
        if (this.disabled) {
            return;
        }
        // We save the dimensions of the slider here so we can use them to update the spacing of the
        // ticks and determine where on the slider click and slide events happen.
        this._sliderDimensions = this._getSliderDimensions();
        this._updateTickIntervalPercent();
    };
    /**
     * @param {?} event
     * @return {?}
     */
    MatSlider.prototype._onClick = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this.disabled) {
            return;
        }
        var /** @type {?} */ oldValue = this.value;
        this._isSliding = false;
        this._focusHostElement();
        this._updateValueFromPosition({ x: event.clientX, y: event.clientY });
        // Emit a change and input event if the value changed.
        if (oldValue != this.value) {
            this._emitInputEvent();
            this._emitChangeEvent();
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    MatSlider.prototype._onSlide = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this.disabled) {
            return;
        }
        // The slide start event sometimes fails to fire on iOS, so if we're not already in the sliding
        // state, call the slide start handler manually.
        if (!this._isSliding) {
            this._onSlideStart(null);
        }
        // Prevent the slide from selecting anything else.
        event.preventDefault();
        var /** @type {?} */ oldValue = this.value;
        this._updateValueFromPosition({ x: event.center.x, y: event.center.y });
        // Native range elements always emit `input` events when the value changed while sliding.
        if (oldValue != this.value) {
            this._emitInputEvent();
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    MatSlider.prototype._onSlideStart = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this.disabled || this._isSliding) {
            return;
        }
        // Simulate mouseenter in case this is a mobile device.
        this._onMouseenter();
        this._isSliding = true;
        this._focusHostElement();
        this._valueOnSlideStart = this.value;
        if (event) {
            this._updateValueFromPosition({ x: event.center.x, y: event.center.y });
            event.preventDefault();
        }
    };
    /**
     * @return {?}
     */
    MatSlider.prototype._onSlideEnd = /**
     * @return {?}
     */
    function () {
        this._isSliding = false;
        if (this._valueOnSlideStart != this.value && !this.disabled) {
            this._emitChangeEvent();
        }
        this._valueOnSlideStart = null;
    };
    /**
     * @return {?}
     */
    MatSlider.prototype._onFocus = /**
     * @return {?}
     */
    function () {
        // We save the dimensions of the slider here so we can use them to update the spacing of the
        // ticks and determine where on the slider click and slide events happen.
        this._sliderDimensions = this._getSliderDimensions();
        this._updateTickIntervalPercent();
    };
    /**
     * @return {?}
     */
    MatSlider.prototype._onBlur = /**
     * @return {?}
     */
    function () {
        this.onTouched();
    };
    /**
     * @param {?} event
     * @return {?}
     */
    MatSlider.prototype._onKeydown = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this.disabled) {
            return;
        }
        var /** @type {?} */ oldValue = this.value;
        switch (event.keyCode) {
            case PAGE_UP:
                this._increment(10);
                break;
            case PAGE_DOWN:
                this._increment(-10);
                break;
            case END:
                this.value = this.max;
                break;
            case HOME:
                this.value = this.min;
                break;
            case LEFT_ARROW:
                // NOTE: For a sighted user it would make more sense that when they press an arrow key on an
                // inverted slider the thumb moves in that direction. However for a blind user, nothing
                // about the slider indicates that it is inverted. They will expect left to be decrement,
                // regardless of how it appears on the screen. For speakers ofRTL languages, they probably
                // expect left to mean increment. Therefore we flip the meaning of the side arrow keys for
                // RTL. For inverted sliders we prefer a good a11y experience to having it "look right" for
                // sighted users, therefore we do not swap the meaning.
                this._increment(this._direction == 'rtl' ? 1 : -1);
                break;
            case UP_ARROW:
                this._increment(1);
                break;
            case RIGHT_ARROW:
                // See comment on LEFT_ARROW about the conditions under which we flip the meaning.
                this._increment(this._direction == 'rtl' ? -1 : 1);
                break;
            case DOWN_ARROW:
                this._increment(-1);
                break;
            default:
                // Return if the key is not one that we explicitly handle to avoid calling preventDefault on
                // it.
                return;
        }
        if (oldValue != this.value) {
            this._emitInputEvent();
            this._emitChangeEvent();
        }
        this._isSliding = true;
        event.preventDefault();
    };
    /**
     * @return {?}
     */
    MatSlider.prototype._onKeyup = /**
     * @return {?}
     */
    function () {
        this._isSliding = false;
    };
    /**
     * Increments the slider by the given number of steps (negative number decrements).
     * @param {?} numSteps
     * @return {?}
     */
    MatSlider.prototype._increment = /**
     * Increments the slider by the given number of steps (negative number decrements).
     * @param {?} numSteps
     * @return {?}
     */
    function (numSteps) {
        this.value = this._clamp((this.value || 0) + this.step * numSteps, this.min, this.max);
    };
    /**
     * Calculate the new value from the new physical location. The value will always be snapped.
     * @param {?} pos
     * @return {?}
     */
    MatSlider.prototype._updateValueFromPosition = /**
     * Calculate the new value from the new physical location. The value will always be snapped.
     * @param {?} pos
     * @return {?}
     */
    function (pos) {
        if (!this._sliderDimensions) {
            return;
        }
        var /** @type {?} */ offset = this.vertical ? this._sliderDimensions.top : this._sliderDimensions.left;
        var /** @type {?} */ size = this.vertical ? this._sliderDimensions.height : this._sliderDimensions.width;
        var /** @type {?} */ posComponent = this.vertical ? pos.y : pos.x;
        // The exact value is calculated from the event and used to find the closest snap value.
        var /** @type {?} */ percent = this._clamp((posComponent - offset) / size);
        if (this._invertMouseCoords) {
            percent = 1 - percent;
        }
        // Since the steps may not divide cleanly into the max value, if the user
        // slid to 0 or 100 percent, we jump to the min/max value. This approach
        // is slightly more intuitive than using `Math.ceil` below, because it
        // follows the user's pointer closer.
        if (percent === 0) {
            this.value = this.min;
        }
        else if (percent === 1) {
            this.value = this.max;
        }
        else {
            var /** @type {?} */ exactValue = this._calculateValue(percent);
            // This calculation finds the closest step by finding the closest
            // whole number divisible by the step relative to the min.
            var /** @type {?} */ closestValue = Math.round((exactValue - this.min) / this.step) * this.step + this.min;
            // The value needs to snap to the min and max.
            this.value = this._clamp(closestValue, this.min, this.max);
        }
    };
    /**
     * Emits a change event if the current value is different from the last emitted value.
     * @return {?}
     */
    MatSlider.prototype._emitChangeEvent = /**
     * Emits a change event if the current value is different from the last emitted value.
     * @return {?}
     */
    function () {
        this._controlValueAccessorChangeFn(this.value);
        this.valueChange.emit(this.value);
        this.change.emit(this._createChangeEvent());
    };
    /**
     * Emits an input event when the current value is different from the last emitted value.
     * @return {?}
     */
    MatSlider.prototype._emitInputEvent = /**
     * Emits an input event when the current value is different from the last emitted value.
     * @return {?}
     */
    function () {
        this.input.emit(this._createChangeEvent());
    };
    /**
     * Updates the amount of space between ticks as a percentage of the width of the slider.
     * @return {?}
     */
    MatSlider.prototype._updateTickIntervalPercent = /**
     * Updates the amount of space between ticks as a percentage of the width of the slider.
     * @return {?}
     */
    function () {
        if (!this.tickInterval || !this._sliderDimensions) {
            return;
        }
        if (this.tickInterval == 'auto') {
            var /** @type {?} */ trackSize = this.vertical ? this._sliderDimensions.height : this._sliderDimensions.width;
            var /** @type {?} */ pixelsPerStep = trackSize * this.step / (this.max - this.min);
            var /** @type {?} */ stepsPerTick = Math.ceil(MIN_AUTO_TICK_SEPARATION / pixelsPerStep);
            var /** @type {?} */ pixelsPerTick = stepsPerTick * this.step;
            this._tickIntervalPercent = pixelsPerTick / trackSize;
        }
        else {
            this._tickIntervalPercent = this.tickInterval * this.step / (this.max - this.min);
        }
    };
    /**
     * Creates a slider change object from the specified value.
     * @param {?=} value
     * @return {?}
     */
    MatSlider.prototype._createChangeEvent = /**
     * Creates a slider change object from the specified value.
     * @param {?=} value
     * @return {?}
     */
    function (value) {
        if (value === void 0) { value = this.value; }
        var /** @type {?} */ event = new MatSliderChange();
        event.source = this;
        event.value = value;
        return event;
    };
    /**
     * Calculates the percentage of the slider that a value is.
     * @param {?} value
     * @return {?}
     */
    MatSlider.prototype._calculatePercentage = /**
     * Calculates the percentage of the slider that a value is.
     * @param {?} value
     * @return {?}
     */
    function (value) {
        return ((value || 0) - this.min) / (this.max - this.min);
    };
    /**
     * Calculates the value a percentage of the slider corresponds to.
     * @param {?} percentage
     * @return {?}
     */
    MatSlider.prototype._calculateValue = /**
     * Calculates the value a percentage of the slider corresponds to.
     * @param {?} percentage
     * @return {?}
     */
    function (percentage) {
        return this.min + percentage * (this.max - this.min);
    };
    /**
     * Return a number between two numbers.
     * @param {?} value
     * @param {?=} min
     * @param {?=} max
     * @return {?}
     */
    MatSlider.prototype._clamp = /**
     * Return a number between two numbers.
     * @param {?} value
     * @param {?=} min
     * @param {?=} max
     * @return {?}
     */
    function (value, min, max) {
        if (min === void 0) { min = 0; }
        if (max === void 0) { max = 1; }
        return Math.max(min, Math.min(value, max));
    };
    /**
     * Get the bounding client rect of the slider track element.
     * The track is used rather than the native element to ignore the extra space that the thumb can
     * take up.
     * @return {?}
     */
    MatSlider.prototype._getSliderDimensions = /**
     * Get the bounding client rect of the slider track element.
     * The track is used rather than the native element to ignore the extra space that the thumb can
     * take up.
     * @return {?}
     */
    function () {
        return this._sliderWrapper ? this._sliderWrapper.nativeElement.getBoundingClientRect() : null;
    };
    /**
     * Focuses the native element.
     * Currently only used to allow a blur event to fire but will be used with keyboard input later.
     * @return {?}
     */
    MatSlider.prototype._focusHostElement = /**
     * Focuses the native element.
     * Currently only used to allow a blur event to fire but will be used with keyboard input later.
     * @return {?}
     */
    function () {
        this._elementRef.nativeElement.focus();
    };
    /**
     * Blurs the native element.
     * @return {?}
     */
    MatSlider.prototype._blurHostElement = /**
     * Blurs the native element.
     * @return {?}
     */
    function () {
        this._elementRef.nativeElement.blur();
    };
    /**
     * Sets the model value. Implemented as part of ControlValueAccessor.
     * @param value
     */
    /**
     * Sets the model value. Implemented as part of ControlValueAccessor.
     * @param {?} value
     * @return {?}
     */
    MatSlider.prototype.writeValue = /**
     * Sets the model value. Implemented as part of ControlValueAccessor.
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.value = value;
    };
    /**
     * Registers a callback to be triggered when the value has changed.
     * Implemented as part of ControlValueAccessor.
     * @param fn Callback to be registered.
     */
    /**
     * Registers a callback to be triggered when the value has changed.
     * Implemented as part of ControlValueAccessor.
     * @param {?} fn Callback to be registered.
     * @return {?}
     */
    MatSlider.prototype.registerOnChange = /**
     * Registers a callback to be triggered when the value has changed.
     * Implemented as part of ControlValueAccessor.
     * @param {?} fn Callback to be registered.
     * @return {?}
     */
    function (fn) {
        this._controlValueAccessorChangeFn = fn;
    };
    /**
     * Registers a callback to be triggered when the component is touched.
     * Implemented as part of ControlValueAccessor.
     * @param fn Callback to be registered.
     */
    /**
     * Registers a callback to be triggered when the component is touched.
     * Implemented as part of ControlValueAccessor.
     * @param {?} fn Callback to be registered.
     * @return {?}
     */
    MatSlider.prototype.registerOnTouched = /**
     * Registers a callback to be triggered when the component is touched.
     * Implemented as part of ControlValueAccessor.
     * @param {?} fn Callback to be registered.
     * @return {?}
     */
    function (fn) {
        this.onTouched = fn;
    };
    /**
     * Sets whether the component should be disabled.
     * Implemented as part of ControlValueAccessor.
     * @param isDisabled
     */
    /**
     * Sets whether the component should be disabled.
     * Implemented as part of ControlValueAccessor.
     * @param {?} isDisabled
     * @return {?}
     */
    MatSlider.prototype.setDisabledState = /**
     * Sets whether the component should be disabled.
     * Implemented as part of ControlValueAccessor.
     * @param {?} isDisabled
     * @return {?}
     */
    function (isDisabled) {
        this.disabled = isDisabled;
    };
    MatSlider.decorators = [
        { type: Component, args: [{selector: 'mat-slider',
                    exportAs: 'matSlider',
                    providers: [MAT_SLIDER_VALUE_ACCESSOR],
                    host: {
                        '(focus)': '_onFocus()',
                        '(blur)': '_onBlur()',
                        '(click)': '_onClick($event)',
                        '(keydown)': '_onKeydown($event)',
                        '(keyup)': '_onKeyup()',
                        '(mouseenter)': '_onMouseenter()',
                        '(slide)': '_onSlide($event)',
                        '(slideend)': '_onSlideEnd()',
                        '(slidestart)': '_onSlideStart($event)',
                        'class': 'mat-slider',
                        'role': 'slider',
                        '[tabIndex]': 'tabIndex',
                        '[attr.aria-disabled]': 'disabled',
                        '[attr.aria-valuemax]': 'max',
                        '[attr.aria-valuemin]': 'min',
                        '[attr.aria-valuenow]': 'value',
                        '[attr.aria-orientation]': 'vertical ? "vertical" : "horizontal"',
                        '[class.mat-slider-disabled]': 'disabled',
                        '[class.mat-slider-has-ticks]': 'tickInterval',
                        '[class.mat-slider-horizontal]': '!vertical',
                        '[class.mat-slider-axis-inverted]': '_invertAxis',
                        '[class.mat-slider-sliding]': '_isSliding',
                        '[class.mat-slider-thumb-label-showing]': 'thumbLabel',
                        '[class.mat-slider-vertical]': 'vertical',
                        '[class.mat-slider-min-value]': '_isMinValue',
                        '[class.mat-slider-hide-last-tick]': 'disabled || _isMinValue && _thumbGap && _invertAxis',
                        '[class._mat-animation-noopable]': '_animationMode === "NoopAnimations"',
                    },
                    template: "<div class=\"mat-slider-wrapper\" #sliderWrapper><div class=\"mat-slider-track-wrapper\"><div class=\"mat-slider-track-background\" [ngStyle]=\"_trackBackgroundStyles\"></div><div class=\"mat-slider-track-fill\" [ngStyle]=\"_trackFillStyles\"></div></div><div class=\"mat-slider-ticks-container\" [ngStyle]=\"_ticksContainerStyles\"><div class=\"mat-slider-ticks\" [ngStyle]=\"_ticksStyles\"></div></div><div class=\"mat-slider-thumb-container\" [ngStyle]=\"_thumbContainerStyles\"><div class=\"mat-slider-focus-ring\"></div><div class=\"mat-slider-thumb\"></div><div class=\"mat-slider-thumb-label\"><span class=\"mat-slider-thumb-label-text\">{{displayValue}}</span></div></div></div>",
                    styles: [".mat-slider{display:inline-block;position:relative;box-sizing:border-box;padding:8px;outline:0;vertical-align:middle}.mat-slider-wrapper{position:absolute}.mat-slider-track-wrapper{position:absolute;top:0;left:0;overflow:hidden}.mat-slider-track-fill{position:absolute;transform-origin:0 0;transition:transform .4s cubic-bezier(.25,.8,.25,1),background-color .4s cubic-bezier(.25,.8,.25,1)}.mat-slider-track-background{position:absolute;transform-origin:100% 100%;transition:transform .4s cubic-bezier(.25,.8,.25,1),background-color .4s cubic-bezier(.25,.8,.25,1)}.mat-slider-ticks-container{position:absolute;left:0;top:0;overflow:hidden}.mat-slider-ticks{background-repeat:repeat;background-clip:content-box;box-sizing:border-box;opacity:0;transition:opacity .4s cubic-bezier(.25,.8,.25,1)}.mat-slider-thumb-container{position:absolute;z-index:1;transition:transform .4s cubic-bezier(.25,.8,.25,1)}.mat-slider-focus-ring{position:absolute;width:30px;height:30px;border-radius:50%;transform:scale(0);opacity:0;transition:transform .4s cubic-bezier(.25,.8,.25,1),background-color .4s cubic-bezier(.25,.8,.25,1),opacity .4s cubic-bezier(.25,.8,.25,1)}.cdk-keyboard-focused .mat-slider-focus-ring,.cdk-program-focused .mat-slider-focus-ring{transform:scale(1);opacity:1}.mat-slider:not(.mat-slider-disabled) .mat-slider-thumb,.mat-slider:not(.mat-slider-disabled) .mat-slider-thumb-label{cursor:-webkit-grab;cursor:grab}.mat-slider-sliding:not(.mat-slider-disabled) .mat-slider-thumb,.mat-slider-sliding:not(.mat-slider-disabled) .mat-slider-thumb-label,.mat-slider:not(.mat-slider-disabled) .mat-slider-thumb-label:active,.mat-slider:not(.mat-slider-disabled) .mat-slider-thumb:active{cursor:-webkit-grabbing;cursor:grabbing}.mat-slider-thumb{position:absolute;right:-10px;bottom:-10px;box-sizing:border-box;width:20px;height:20px;border:3px solid transparent;border-radius:50%;transform:scale(.7);transition:transform .4s cubic-bezier(.25,.8,.25,1),background-color .4s cubic-bezier(.25,.8,.25,1),border-color .4s cubic-bezier(.25,.8,.25,1)}.mat-slider-thumb-label{display:none;align-items:center;justify-content:center;position:absolute;width:28px;height:28px;border-radius:50%;transition:transform .4s cubic-bezier(.25,.8,.25,1),border-radius .4s cubic-bezier(.25,.8,.25,1),background-color .4s cubic-bezier(.25,.8,.25,1)}.mat-slider-thumb-label-text{z-index:1;opacity:0;transition:opacity .4s cubic-bezier(.25,.8,.25,1)}.mat-slider-sliding .mat-slider-thumb-container,.mat-slider-sliding .mat-slider-track-background,.mat-slider-sliding .mat-slider-track-fill{transition-duration:0s}.mat-slider-has-ticks .mat-slider-wrapper::after{content:'';position:absolute;border-width:0;border-style:solid;opacity:0;transition:opacity .4s cubic-bezier(.25,.8,.25,1)}.mat-slider-has-ticks.cdk-focused:not(.mat-slider-hide-last-tick) .mat-slider-wrapper::after,.mat-slider-has-ticks:hover:not(.mat-slider-hide-last-tick) .mat-slider-wrapper::after{opacity:1}.mat-slider-has-ticks.cdk-focused:not(.mat-slider-disabled) .mat-slider-ticks,.mat-slider-has-ticks:hover:not(.mat-slider-disabled) .mat-slider-ticks{opacity:1}.mat-slider-thumb-label-showing .mat-slider-focus-ring{transform:scale(0);opacity:0}.mat-slider-thumb-label-showing .mat-slider-thumb-label{display:flex}.mat-slider-axis-inverted .mat-slider-track-fill{transform-origin:100% 100%}.mat-slider-axis-inverted .mat-slider-track-background{transform-origin:0 0}.mat-slider:not(.mat-slider-disabled).cdk-focused.mat-slider-thumb-label-showing .mat-slider-thumb{transform:scale(0)}.mat-slider:not(.mat-slider-disabled).cdk-focused .mat-slider-thumb-label{border-radius:50% 50% 0}.mat-slider:not(.mat-slider-disabled).cdk-focused .mat-slider-thumb-label-text{opacity:1}.mat-slider:not(.mat-slider-disabled).cdk-mouse-focused .mat-slider-thumb,.mat-slider:not(.mat-slider-disabled).cdk-program-focused .mat-slider-thumb,.mat-slider:not(.mat-slider-disabled).cdk-touch-focused .mat-slider-thumb{border-width:2px;transform:scale(1)}.mat-slider-disabled .mat-slider-focus-ring{transform:scale(0);opacity:0}.mat-slider-disabled .mat-slider-thumb{border-width:4px;transform:scale(.5)}.mat-slider-disabled .mat-slider-thumb-label{display:none}.mat-slider-horizontal{height:48px;min-width:128px}.mat-slider-horizontal .mat-slider-wrapper{height:2px;top:23px;left:8px;right:8px}.mat-slider-horizontal .mat-slider-wrapper::after{height:2px;border-left-width:2px;right:0;top:0}.mat-slider-horizontal .mat-slider-track-wrapper{height:2px;width:100%}.mat-slider-horizontal .mat-slider-track-fill{height:2px;width:100%;transform:scaleX(0)}.mat-slider-horizontal .mat-slider-track-background{height:2px;width:100%;transform:scaleX(1)}.mat-slider-horizontal .mat-slider-ticks-container{height:2px;width:100%}@media screen and (-ms-high-contrast:active){.mat-slider-horizontal .mat-slider-ticks-container{height:0;outline:solid 2px;top:1px}}.mat-slider-horizontal .mat-slider-ticks{height:2px;width:100%}.mat-slider-horizontal .mat-slider-thumb-container{width:100%;height:0;top:50%}.mat-slider-horizontal .mat-slider-focus-ring{top:-15px;right:-15px}.mat-slider-horizontal .mat-slider-thumb-label{right:-14px;top:-40px;transform:translateY(26px) scale(.01) rotate(45deg)}.mat-slider-horizontal .mat-slider-thumb-label-text{transform:rotate(-45deg)}.mat-slider-horizontal.cdk-focused .mat-slider-thumb-label{transform:rotate(45deg)}.mat-slider-vertical{width:48px;min-height:128px}.mat-slider-vertical .mat-slider-wrapper{width:2px;top:8px;bottom:8px;left:23px}.mat-slider-vertical .mat-slider-wrapper::after{width:2px;border-top-width:2px;bottom:0;left:0}.mat-slider-vertical .mat-slider-track-wrapper{height:100%;width:2px}.mat-slider-vertical .mat-slider-track-fill{height:100%;width:2px;transform:scaleY(0)}.mat-slider-vertical .mat-slider-track-background{height:100%;width:2px;transform:scaleY(1)}.mat-slider-vertical .mat-slider-ticks-container{width:2px;height:100%}@media screen and (-ms-high-contrast:active){.mat-slider-vertical .mat-slider-ticks-container{width:0;outline:solid 2px;left:1px}}.mat-slider-vertical .mat-slider-focus-ring{bottom:-15px;left:-15px}.mat-slider-vertical .mat-slider-ticks{width:2px;height:100%}.mat-slider-vertical .mat-slider-thumb-container{height:100%;width:0;left:50%}.mat-slider-vertical .mat-slider-thumb{-webkit-backface-visibility:hidden;backface-visibility:hidden}.mat-slider-vertical .mat-slider-thumb-label{bottom:-14px;left:-40px;transform:translateX(26px) scale(.01) rotate(-45deg)}.mat-slider-vertical .mat-slider-thumb-label-text{transform:rotate(45deg)}.mat-slider-vertical.cdk-focused .mat-slider-thumb-label{transform:rotate(-45deg)}[dir=rtl] .mat-slider-wrapper::after{left:0;right:auto}[dir=rtl] .mat-slider-horizontal .mat-slider-track-fill{transform-origin:100% 100%}[dir=rtl] .mat-slider-horizontal .mat-slider-track-background{transform-origin:0 0}[dir=rtl] .mat-slider-horizontal.mat-slider-axis-inverted .mat-slider-track-fill{transform-origin:0 0}[dir=rtl] .mat-slider-horizontal.mat-slider-axis-inverted .mat-slider-track-background{transform-origin:100% 100%}.mat-slider._mat-animation-noopable .mat-slider-focus-ring,.mat-slider._mat-animation-noopable .mat-slider-has-ticks .mat-slider-wrapper::after,.mat-slider._mat-animation-noopable .mat-slider-thumb,.mat-slider._mat-animation-noopable .mat-slider-thumb-container,.mat-slider._mat-animation-noopable .mat-slider-thumb-label,.mat-slider._mat-animation-noopable .mat-slider-thumb-label-text,.mat-slider._mat-animation-noopable .mat-slider-ticks,.mat-slider._mat-animation-noopable .mat-slider-track-background,.mat-slider._mat-animation-noopable .mat-slider-track-fill{transition:none}"],
                    inputs: ['disabled', 'color', 'tabIndex'],
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                },] },
    ];
    /** @nocollapse */
    MatSlider.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: FocusMonitor, },
        { type: ChangeDetectorRef, },
        { type: Directionality, decorators: [{ type: Optional },] },
        { type: undefined, decorators: [{ type: Attribute, args: ['tabindex',] },] },
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [ANIMATION_MODULE_TYPE,] },] },
    ]; };
    MatSlider.propDecorators = {
        "invert": [{ type: Input },],
        "max": [{ type: Input },],
        "min": [{ type: Input },],
        "step": [{ type: Input },],
        "thumbLabel": [{ type: Input },],
        "tickInterval": [{ type: Input },],
        "value": [{ type: Input },],
        "displayWith": [{ type: Input },],
        "vertical": [{ type: Input },],
        "change": [{ type: Output },],
        "input": [{ type: Output },],
        "valueChange": [{ type: Output },],
        "_sliderWrapper": [{ type: ViewChild, args: ['sliderWrapper',] },],
    };
    return MatSlider;
}(_MatSliderMixinBase));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var MatSliderModule = /** @class */ (function () {
    function MatSliderModule() {
    }
    MatSliderModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule, MatCommonModule],
                    exports: [MatSlider, MatCommonModule],
                    declarations: [MatSlider],
                    providers: [{ provide: HAMMER_GESTURE_CONFIG, useClass: GestureConfig }]
                },] },
    ];
    return MatSliderModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

export { MatSliderModule, MAT_SLIDER_VALUE_ACCESSOR, MatSliderChange, MatSliderBase, _MatSliderMixinBase, MatSlider };
//# sourceMappingURL=slider.es5.js.map
