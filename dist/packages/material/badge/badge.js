"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
var a11y_1 = require("@angular/cdk/a11y");
var coercion_1 = require("@angular/cdk/coercion");
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var nextId = 0;
/** Directive to display a text badge. */
var MatBadge = /** @class */ (function () {
    function MatBadge(_document, _ngZone, _elementRef, _ariaDescriber) {
        this._document = _document;
        this._ngZone = _ngZone;
        this._elementRef = _elementRef;
        this._ariaDescriber = _ariaDescriber;
        /** Whether the badge has any content. */
        this._hasContent = false;
        this._color = 'primary';
        this._overlap = true;
        /**
           * Position the badge should reside.
           * Accepts any combination of 'above'|'below' and 'before'|'after'
           */
        this.position = 'above after';
        /** Size of the badge. Can be 'small', 'medium', or 'large'. */
        this.size = 'medium';
        /** Unique id for the badge */
        this._id = nextId++;
    }
    Object.defineProperty(MatBadge.prototype, "color", {
        get: /** The color of the badge. Can be `primary`, `accent`, or `warn`. */
        function () { return this._color; },
        set: function (value) {
            this._setColor(value);
            this._color = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatBadge.prototype, "overlap", {
        get: /** Whether the badge should overlap its contents or not */
        function () { return this._overlap; },
        set: function (val) {
            this._overlap = coercion_1.coerceBooleanProperty(val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatBadge.prototype, "content", {
        get: /** The content for the badge */
        function () { return this._content; },
        set: function (value) {
            this._content = value;
            this._hasContent = value != null && ("" + value).trim().length > 0;
            this._updateTextContent();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatBadge.prototype, "description", {
        get: /** Message used to describe the decorated element via aria-describedby */
        function () { return this._description; },
        set: function (newDescription) {
            if (newDescription !== this._description) {
                this._updateHostAriaDescription(newDescription, this._description);
                this._description = newDescription;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatBadge.prototype, "hidden", {
        get: /** Whether the badge is hidden. */
        function () { return this._hidden; },
        set: function (val) {
            this._hidden = coercion_1.coerceBooleanProperty(val);
        },
        enumerable: true,
        configurable: true
    });
    /** Whether the badge is above the host or not */
    /** Whether the badge is above the host or not */
    MatBadge.prototype.isAbove = /** Whether the badge is above the host or not */
    function () {
        return this.position.indexOf('below') === -1;
    };
    /** Whether the badge is after the host or not */
    /** Whether the badge is after the host or not */
    MatBadge.prototype.isAfter = /** Whether the badge is after the host or not */
    function () {
        return this.position.indexOf('before') === -1;
    };
    MatBadge.prototype.ngOnDestroy = function () {
        if (this.description && this._badgeElement) {
            this._ariaDescriber.removeDescription(this._badgeElement, this.description);
        }
    };
    /** Injects a span element into the DOM with the content. */
    /** Injects a span element into the DOM with the content. */
    MatBadge.prototype._updateTextContent = /** Injects a span element into the DOM with the content. */
    function () {
        if (!this._badgeElement) {
            this._badgeElement = this._createBadgeElement();
        }
        else {
            this._badgeElement.textContent = this.content;
        }
        return this._badgeElement;
    };
    /** Creates the badge element */
    /** Creates the badge element */
    MatBadge.prototype._createBadgeElement = /** Creates the badge element */
    function () {
        var badgeElement = this._document.createElement('span');
        var activeClass = 'mat-badge-active';
        badgeElement.setAttribute('id', "mat-badge-content-" + this._id);
        badgeElement.classList.add('mat-badge-content');
        badgeElement.textContent = this.content;
        if (this.description) {
            badgeElement.setAttribute('aria-label', this.description);
        }
        this._elementRef.nativeElement.appendChild(badgeElement);
        // animate in after insertion
        if (typeof requestAnimationFrame === 'function') {
            this._ngZone.runOutsideAngular(function () {
                requestAnimationFrame(function () {
                    badgeElement.classList.add(activeClass);
                });
            });
        }
        else {
            badgeElement.classList.add(activeClass);
        }
        return badgeElement;
    };
    /** Sets the aria-label property on the element */
    /** Sets the aria-label property on the element */
    MatBadge.prototype._updateHostAriaDescription = /** Sets the aria-label property on the element */
    function (newDescription, oldDescription) {
        // ensure content available before setting label
        var content = this._updateTextContent();
        if (oldDescription) {
            this._ariaDescriber.removeDescription(content, oldDescription);
        }
        if (newDescription) {
            this._ariaDescriber.describe(content, newDescription);
        }
    };
    /** Adds css theme class given the color to the component host */
    /** Adds css theme class given the color to the component host */
    MatBadge.prototype._setColor = /** Adds css theme class given the color to the component host */
    function (colorPalette) {
        if (colorPalette !== this._color) {
            if (this._color) {
                this._elementRef.nativeElement.classList.remove("mat-badge-" + this._color);
            }
            if (colorPalette) {
                this._elementRef.nativeElement.classList.add("mat-badge-" + colorPalette);
            }
        }
    };
    MatBadge.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[matBadge]',
                    host: {
                        'class': 'mat-badge',
                        '[class.mat-badge-overlap]': 'overlap',
                        '[class.mat-badge-above]': 'isAbove()',
                        '[class.mat-badge-below]': '!isAbove()',
                        '[class.mat-badge-before]': '!isAfter()',
                        '[class.mat-badge-after]': 'isAfter()',
                        '[class.mat-badge-small]': 'size === "small"',
                        '[class.mat-badge-medium]': 'size === "medium"',
                        '[class.mat-badge-large]': 'size === "large"',
                        '[class.mat-badge-hidden]': 'hidden || !_hasContent',
                    },
                },] },
    ];
    /** @nocollapse */
    MatBadge.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: core_1.Optional }, { type: core_1.Inject, args: [common_1.DOCUMENT,] },] },
        { type: core_1.NgZone, },
        { type: core_1.ElementRef, },
        { type: a11y_1.AriaDescriber, },
    ]; };
    MatBadge.propDecorators = {
        "color": [{ type: core_1.Input, args: ['matBadgeColor',] },],
        "overlap": [{ type: core_1.Input, args: ['matBadgeOverlap',] },],
        "position": [{ type: core_1.Input, args: ['matBadgePosition',] },],
        "content": [{ type: core_1.Input, args: ['matBadge',] },],
        "description": [{ type: core_1.Input, args: ['matBadgeDescription',] },],
        "size": [{ type: core_1.Input, args: ['matBadgeSize',] },],
        "hidden": [{ type: core_1.Input, args: ['matBadgeHidden',] },],
    };
    return MatBadge;
}());
exports.MatBadge = MatBadge;
//# sourceMappingURL=badge.js.map