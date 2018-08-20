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
var portal_1 = require("@angular/cdk/portal");
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var snack_bar_animations_1 = require("./snack-bar-animations");
var snack_bar_config_1 = require("./snack-bar-config");
/**
 * Internal component that wraps user-provided snack bar content.
 * @docs-private
 */
var MatSnackBarContainer = /** @class */ (function (_super) {
    __extends(MatSnackBarContainer, _super);
    function MatSnackBarContainer(_ngZone, _elementRef, _changeDetectorRef, /** The snack bar configuration. */
    snackBarConfig) {
        var _this = _super.call(this) || this;
        _this._ngZone = _ngZone;
        _this._elementRef = _elementRef;
        _this._changeDetectorRef = _changeDetectorRef;
        _this.snackBarConfig = snackBarConfig;
        /** Whether the component has been destroyed. */
        _this._destroyed = false;
        /** Subject for notifying that the snack bar has exited from view. */
        _this._onExit = new rxjs_1.Subject();
        /** Subject for notifying that the snack bar has finished entering the view. */
        _this._onEnter = new rxjs_1.Subject();
        /** The state of the snack bar animations. */
        _this._animationState = 'void';
        return _this;
    }
    /** Attach a component portal as content to this snack bar container. */
    /** Attach a component portal as content to this snack bar container. */
    MatSnackBarContainer.prototype.attachComponentPortal = /** Attach a component portal as content to this snack bar container. */
    function (portal) {
        this._assertNotAttached();
        this._applySnackBarClasses();
        return this._portalOutlet.attachComponentPortal(portal);
    };
    /** Attach a template portal as content to this snack bar container. */
    /** Attach a template portal as content to this snack bar container. */
    MatSnackBarContainer.prototype.attachTemplatePortal = /** Attach a template portal as content to this snack bar container. */
    function (portal) {
        this._assertNotAttached();
        this._applySnackBarClasses();
        return this._portalOutlet.attachTemplatePortal(portal);
    };
    /** Handle end of animations, updating the state of the snackbar. */
    /** Handle end of animations, updating the state of the snackbar. */
    MatSnackBarContainer.prototype.onAnimationEnd = /** Handle end of animations, updating the state of the snackbar. */
    function (event) {
        var fromState = event.fromState, toState = event.toState;
        if ((toState === 'void' && fromState !== 'void') || toState.startsWith('hidden')) {
            this._completeExit();
        }
        if (toState.startsWith('visible')) {
            // Note: we shouldn't use `this` inside the zone callback,
            // because it can cause a memory leak.
            var onEnter_1 = this._onEnter;
            this._ngZone.run(function () {
                onEnter_1.next();
                onEnter_1.complete();
            });
        }
    };
    /** Begin animation of snack bar entrance into view. */
    /** Begin animation of snack bar entrance into view. */
    MatSnackBarContainer.prototype.enter = /** Begin animation of snack bar entrance into view. */
    function () {
        if (!this._destroyed) {
            this._animationState = "visible-" + this.snackBarConfig.verticalPosition;
            this._changeDetectorRef.detectChanges();
        }
    };
    /** Begin animation of the snack bar exiting from view. */
    /** Begin animation of the snack bar exiting from view. */
    MatSnackBarContainer.prototype.exit = /** Begin animation of the snack bar exiting from view. */
    function () {
        this._animationState = "hidden-" + this.snackBarConfig.verticalPosition;
        return this._onExit;
    };
    /** Makes sure the exit callbacks have been invoked when the element is destroyed. */
    /** Makes sure the exit callbacks have been invoked when the element is destroyed. */
    MatSnackBarContainer.prototype.ngOnDestroy = /** Makes sure the exit callbacks have been invoked when the element is destroyed. */
    function () {
        this._destroyed = true;
        this._completeExit();
    };
    /**
     * Waits for the zone to settle before removing the element. Helps prevent
     * errors where we end up removing an element which is in the middle of an animation.
     */
    /**
       * Waits for the zone to settle before removing the element. Helps prevent
       * errors where we end up removing an element which is in the middle of an animation.
       */
    MatSnackBarContainer.prototype._completeExit = /**
       * Waits for the zone to settle before removing the element. Helps prevent
       * errors where we end up removing an element which is in the middle of an animation.
       */
    function () {
        var _this = this;
        this._ngZone.onMicrotaskEmpty.asObservable().pipe(operators_1.take(1)).subscribe(function () {
            _this._onExit.next();
            _this._onExit.complete();
        });
    };
    /** Applies the various positioning and user-configured CSS classes to the snack bar. */
    /** Applies the various positioning and user-configured CSS classes to the snack bar. */
    MatSnackBarContainer.prototype._applySnackBarClasses = /** Applies the various positioning and user-configured CSS classes to the snack bar. */
    function () {
        var element = this._elementRef.nativeElement;
        var panelClasses = this.snackBarConfig.panelClass;
        if (panelClasses) {
            if (Array.isArray(panelClasses)) {
                // Note that we can't use a spread here, because IE doesn't support multiple arguments.
                panelClasses.forEach(function (cssClass) { return element.classList.add(cssClass); });
            }
            else {
                element.classList.add(panelClasses);
            }
        }
        if (this.snackBarConfig.horizontalPosition === 'center') {
            element.classList.add('mat-snack-bar-center');
        }
        if (this.snackBarConfig.verticalPosition === 'top') {
            element.classList.add('mat-snack-bar-top');
        }
    };
    /** Asserts that no content is already attached to the container. */
    /** Asserts that no content is already attached to the container. */
    MatSnackBarContainer.prototype._assertNotAttached = /** Asserts that no content is already attached to the container. */
    function () {
        if (this._portalOutlet.hasAttached()) {
            throw Error('Attempting to attach snack bar content after content is already attached');
        }
    };
    MatSnackBarContainer.decorators = [
        { type: core_1.Component, args: [{selector: 'snack-bar-container',
                    template: "<ng-template cdkPortalOutlet></ng-template>",
                    styles: [".mat-snack-bar-container{border-radius:2px;box-sizing:border-box;display:block;margin:24px;max-width:568px;min-width:288px;padding:14px 24px;transform:translateY(100%) translateY(24px)}.mat-snack-bar-container.mat-snack-bar-center{margin:0;transform:translateY(100%)}.mat-snack-bar-container.mat-snack-bar-top{transform:translateY(-100%) translateY(-24px)}.mat-snack-bar-container.mat-snack-bar-top.mat-snack-bar-center{transform:translateY(-100%)}@media screen and (-ms-high-contrast:active){.mat-snack-bar-container{border:solid 1px}}.mat-snack-bar-handset{width:100%}.mat-snack-bar-handset .mat-snack-bar-container{margin:0;max-width:inherit;width:100%}"],
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    encapsulation: core_1.ViewEncapsulation.None,
                    animations: [snack_bar_animations_1.matSnackBarAnimations.snackBarState],
                    host: {
                        'role': 'alert',
                        'class': 'mat-snack-bar-container',
                        '[@state]': '_animationState',
                        '(@state.done)': 'onAnimationEnd($event)'
                    },
                },] },
    ];
    /** @nocollapse */
    MatSnackBarContainer.ctorParameters = function () { return [
        { type: core_1.NgZone, },
        { type: core_1.ElementRef, },
        { type: core_1.ChangeDetectorRef, },
        { type: snack_bar_config_1.MatSnackBarConfig, },
    ]; };
    MatSnackBarContainer.propDecorators = {
        "_portalOutlet": [{ type: core_1.ViewChild, args: [portal_1.CdkPortalOutlet,] },],
    };
    return MatSnackBarContainer;
}(portal_1.BasePortalOutlet));
exports.MatSnackBarContainer = MatSnackBarContainer;
//# sourceMappingURL=snack-bar-container.js.map