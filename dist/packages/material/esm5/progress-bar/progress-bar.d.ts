/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import { CanColor } from '@angular/material/core';
/** @docs-private */
export declare class MatProgressBarBase {
    _elementRef: ElementRef;
    constructor(_elementRef: ElementRef);
}
export declare const _MatProgressBarMixinBase: (new (...args: any[]) => CanColor) & typeof MatProgressBarBase;
/**
 * `<mat-progress-bar>` component.
 */
export declare class MatProgressBar extends _MatProgressBarMixinBase implements CanColor {
    _elementRef: ElementRef;
    _animationMode: string | undefined;
    constructor(_elementRef: ElementRef, _animationMode?: string | undefined, 
        /**
         * @deprecated `location` parameter to be made required.
         * @breaking-change 8.0.0
         */
        location?: Location);
    /** Value of the progress bar. Defaults to zero. Mirrored to aria-valuenow. */
    value: number;
    private _value;
    /** Buffer value of the progress bar. Defaults to zero. */
    bufferValue: number;
    private _bufferValue;
    /**
     * Mode of the progress bar.
     *
     * Input must be one of these values: determinate, indeterminate, buffer, query, defaults to
     * 'determinate'.
     * Mirrored to mode attribute.
     */
    mode: 'determinate' | 'indeterminate' | 'buffer' | 'query';
    /** ID of the progress bar. */
    progressbarId: string;
    /** Attribute to be used for the `fill` attribute on the internal `rect` element. */
    _rectangleFillValue: string;
    /** Gets the current transform value for the progress bar's primary indicator. */
    _primaryTransform(): {
        transform: string;
    };
    /**
     * Gets the current transform value for the progress bar's buffer indicator. Only used if the
     * progress mode is set to buffer, otherwise returns an undefined, causing no transformation.
     */
    _bufferTransform(): {
        transform: string;
    } | undefined;
}
