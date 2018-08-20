"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
/** Injection token for the MatInkBar's Positioner. */
exports._MAT_INK_BAR_POSITIONER = new core_1.InjectionToken('MatInkBarPositioner', {
    providedIn: 'root',
    factory: _MAT_INK_BAR_POSITIONER_FACTORY
});
/**
 * The default positioner function for the MatInkBar.
 * @docs-private
 */
function _MAT_INK_BAR_POSITIONER_FACTORY() {
    var method = function (element) {
        return ({
            left: element ? (element.offsetLeft || 0) + 'px' : '0',
            width: element ? (element.offsetWidth || 0) + 'px' : '0',
        });
    };
    return method;
}
exports._MAT_INK_BAR_POSITIONER_FACTORY = _MAT_INK_BAR_POSITIONER_FACTORY;
/**
 * The ink-bar is used to display and animate the line underneath the current active tab label.
 * @docs-private
 */
var MatInkBar = /** @class */ (function () {
    function MatInkBar(_elementRef, _ngZone, _inkBarPositioner) {
        this._elementRef = _elementRef;
        this._ngZone = _ngZone;
        this._inkBarPositioner = _inkBarPositioner;
    }
    /**
     * Calculates the styles from the provided element in order to align the ink-bar to that element.
     * Shows the ink bar if previously set as hidden.
     * @param element
     */
    /**
       * Calculates the styles from the provided element in order to align the ink-bar to that element.
       * Shows the ink bar if previously set as hidden.
       * @param element
       */
    MatInkBar.prototype.alignToElement = /**
       * Calculates the styles from the provided element in order to align the ink-bar to that element.
       * Shows the ink bar if previously set as hidden.
       * @param element
       */
    function (element) {
        var _this = this;
        this.show();
        if (typeof requestAnimationFrame !== 'undefined') {
            this._ngZone.runOutsideAngular(function () {
                requestAnimationFrame(function () { return _this._setStyles(element); });
            });
        }
        else {
            this._setStyles(element);
        }
    };
    /** Shows the ink bar. */
    /** Shows the ink bar. */
    MatInkBar.prototype.show = /** Shows the ink bar. */
    function () {
        this._elementRef.nativeElement.style.visibility = 'visible';
    };
    /** Hides the ink bar. */
    /** Hides the ink bar. */
    MatInkBar.prototype.hide = /** Hides the ink bar. */
    function () {
        this._elementRef.nativeElement.style.visibility = 'hidden';
    };
    /**
     * Sets the proper styles to the ink bar element.
     * @param element
     */
    /**
       * Sets the proper styles to the ink bar element.
       * @param element
       */
    MatInkBar.prototype._setStyles = /**
       * Sets the proper styles to the ink bar element.
       * @param element
       */
    function (element) {
        var positions = this._inkBarPositioner(element);
        var inkBar = this._elementRef.nativeElement;
        inkBar.style.left = positions.left;
        inkBar.style.width = positions.width;
    };
    MatInkBar.decorators = [
        { type: core_1.Directive, args: [{
                    selector: 'mat-ink-bar',
                    host: {
                        'class': 'mat-ink-bar',
                    },
                },] },
    ];
    /** @nocollapse */
    MatInkBar.ctorParameters = function () { return [
        { type: core_1.ElementRef, },
        { type: core_1.NgZone, },
        { type: undefined, decorators: [{ type: core_1.Inject, args: [exports._MAT_INK_BAR_POSITIONER,] },] },
    ]; };
    return MatInkBar;
}());
exports.MatInkBar = MatInkBar;
//# sourceMappingURL=ink-bar.js.map