/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import * as tslib_1 from "tslib";
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector, TemplatePortal } from '@angular/cdk/portal';
import { Inject, Injectable, InjectionToken, Injector, Optional, SkipSelf, TemplateRef, } from '@angular/core';
import { take, takeUntil } from 'rxjs/operators';
import { SimpleSnackBar } from './simple-snack-bar';
import { MAT_SNACK_BAR_DATA, MatSnackBarConfig } from './snack-bar-config';
import { MatSnackBarContainer } from './snack-bar-container';
import { MatSnackBarModule } from './snack-bar-module';
import { MatSnackBarRef } from './snack-bar-ref';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/overlay";
import * as i2 from "@angular/cdk/a11y";
import * as i3 from "@angular/cdk/layout";
import * as i4 from "./snack-bar-module";
/**
 * Injection token that can be used to specify default snack bar.
 */
export var /** @type {?} */ MAT_SNACK_BAR_DEFAULT_OPTIONS = new InjectionToken('mat-snack-bar-default-options', {
    providedIn: 'root',
    factory: MAT_SNACK_BAR_DEFAULT_OPTIONS_FACTORY,
});
/**
 * \@docs-private
 * @return {?}
 */
export function MAT_SNACK_BAR_DEFAULT_OPTIONS_FACTORY() {
    return new MatSnackBarConfig();
}
/**
 * Service to dispatch Material Design snack bar messages.
 */
var MatSnackBar = /** @class */ (function () {
    function MatSnackBar(_overlay, _live, _injector, _breakpointObserver, _parentSnackBar, _defaultConfig) {
        this._overlay = _overlay;
        this._live = _live;
        this._injector = _injector;
        this._breakpointObserver = _breakpointObserver;
        this._parentSnackBar = _parentSnackBar;
        this._defaultConfig = _defaultConfig;
        /**
         * Reference to the current snack bar in the view *at this level* (in the Angular injector tree).
         * If there is a parent snack-bar service, all operations should delegate to that parent
         * via `_openedSnackBarRef`.
         */
        this._snackBarRefAtThisLevel = null;
    }
    Object.defineProperty(MatSnackBar.prototype, "_openedSnackBarRef", {
        /** Reference to the currently opened snackbar at *any* level. */
        get: /**
         * Reference to the currently opened snackbar at *any* level.
         * @return {?}
         */
        function () {
            var /** @type {?} */ parent = this._parentSnackBar;
            return parent ? parent._openedSnackBarRef : this._snackBarRefAtThisLevel;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (this._parentSnackBar) {
                this._parentSnackBar._openedSnackBarRef = value;
            }
            else {
                this._snackBarRefAtThisLevel = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Creates and dispatches a snack bar with a custom component for the content, removing any
     * currently opened snack bars.
     *
     * @param component Component to be instantiated.
     * @param config Extra configuration for the snack bar.
     */
    /**
     * Creates and dispatches a snack bar with a custom component for the content, removing any
     * currently opened snack bars.
     *
     * @template T
     * @param {?} component Component to be instantiated.
     * @param {?=} config Extra configuration for the snack bar.
     * @return {?}
     */
    MatSnackBar.prototype.openFromComponent = /**
     * Creates and dispatches a snack bar with a custom component for the content, removing any
     * currently opened snack bars.
     *
     * @template T
     * @param {?} component Component to be instantiated.
     * @param {?=} config Extra configuration for the snack bar.
     * @return {?}
     */
    function (component, config) {
        return /** @type {?} */ (this._attach(component, config));
    };
    /**
     * Creates and dispatches a snack bar with a custom template for the content, removing any
     * currently opened snack bars.
     *
     * @param template Template to be instantiated.
     * @param config Extra configuration for the snack bar.
     */
    /**
     * Creates and dispatches a snack bar with a custom template for the content, removing any
     * currently opened snack bars.
     *
     * @param {?} template Template to be instantiated.
     * @param {?=} config Extra configuration for the snack bar.
     * @return {?}
     */
    MatSnackBar.prototype.openFromTemplate = /**
     * Creates and dispatches a snack bar with a custom template for the content, removing any
     * currently opened snack bars.
     *
     * @param {?} template Template to be instantiated.
     * @param {?=} config Extra configuration for the snack bar.
     * @return {?}
     */
    function (template, config) {
        return this._attach(template, config);
    };
    /**
     * Opens a snackbar with a message and an optional action.
     * @param message The message to show in the snackbar.
     * @param action The label for the snackbar action.
     * @param config Additional configuration options for the snackbar.
     */
    /**
     * Opens a snackbar with a message and an optional action.
     * @param {?} message The message to show in the snackbar.
     * @param {?=} action The label for the snackbar action.
     * @param {?=} config Additional configuration options for the snackbar.
     * @return {?}
     */
    MatSnackBar.prototype.open = /**
     * Opens a snackbar with a message and an optional action.
     * @param {?} message The message to show in the snackbar.
     * @param {?=} action The label for the snackbar action.
     * @param {?=} config Additional configuration options for the snackbar.
     * @return {?}
     */
    function (message, action, config) {
        if (action === void 0) { action = ''; }
        var /** @type {?} */ _config = tslib_1.__assign({}, this._defaultConfig, config);
        // Since the user doesn't have access to the component, we can
        // override the data to pass in our own message and action.
        _config.data = { message: message, action: action };
        if (!_config.announcementMessage) {
            _config.announcementMessage = message;
        }
        return this.openFromComponent(SimpleSnackBar, _config);
    };
    /**
     * Dismisses the currently-visible snack bar.
     */
    /**
     * Dismisses the currently-visible snack bar.
     * @return {?}
     */
    MatSnackBar.prototype.dismiss = /**
     * Dismisses the currently-visible snack bar.
     * @return {?}
     */
    function () {
        if (this._openedSnackBarRef) {
            this._openedSnackBarRef.dismiss();
        }
    };
    /**
     * Attaches the snack bar container component to the overlay.
     * @param {?} overlayRef
     * @param {?} config
     * @return {?}
     */
    MatSnackBar.prototype._attachSnackBarContainer = /**
     * Attaches the snack bar container component to the overlay.
     * @param {?} overlayRef
     * @param {?} config
     * @return {?}
     */
    function (overlayRef, config) {
        var /** @type {?} */ userInjector = config && config.viewContainerRef && config.viewContainerRef.injector;
        var /** @type {?} */ injector = new PortalInjector(userInjector || this._injector, new WeakMap([
            [MatSnackBarConfig, config]
        ]));
        var /** @type {?} */ containerPortal = new ComponentPortal(MatSnackBarContainer, config.viewContainerRef, injector);
        var /** @type {?} */ containerRef = overlayRef.attach(containerPortal);
        containerRef.instance.snackBarConfig = config;
        return containerRef.instance;
    };
    /**
     * Places a new component or a template as the content of the snack bar container.
     * @template T
     * @param {?} content
     * @param {?=} userConfig
     * @return {?}
     */
    MatSnackBar.prototype._attach = /**
     * Places a new component or a template as the content of the snack bar container.
     * @template T
     * @param {?} content
     * @param {?=} userConfig
     * @return {?}
     */
    function (content, userConfig) {
        var /** @type {?} */ config = tslib_1.__assign({}, new MatSnackBarConfig(), this._defaultConfig, userConfig);
        var /** @type {?} */ overlayRef = this._createOverlay(config);
        var /** @type {?} */ container = this._attachSnackBarContainer(overlayRef, config);
        var /** @type {?} */ snackBarRef = new MatSnackBarRef(container, overlayRef);
        if (content instanceof TemplateRef) {
            var /** @type {?} */ portal = new TemplatePortal(content, /** @type {?} */ ((null)), /** @type {?} */ ({
                $implicit: config.data,
                snackBarRef: snackBarRef
            }));
            snackBarRef.instance = container.attachTemplatePortal(portal);
        }
        else {
            var /** @type {?} */ injector = this._createInjector(config, snackBarRef);
            var /** @type {?} */ portal = new ComponentPortal(content, undefined, injector);
            var /** @type {?} */ contentRef = container.attachComponentPortal(portal);
            // We can't pass this via the injector, because the injector is created earlier.
            snackBarRef.instance = contentRef.instance;
        }
        // Subscribe to the breakpoint observer and attach the mat-snack-bar-handset class as
        // appropriate. This class is applied to the overlay element because the overlay must expand to
        // fill the width of the screen for full width snackbars.
        this._breakpointObserver.observe(Breakpoints.Handset).pipe(takeUntil(overlayRef.detachments().pipe(take(1)))).subscribe(function (state) {
            if (state.matches) {
                overlayRef.overlayElement.classList.add('mat-snack-bar-handset');
            }
            else {
                overlayRef.overlayElement.classList.remove('mat-snack-bar-handset');
            }
        });
        this._animateSnackBar(snackBarRef, config);
        this._openedSnackBarRef = snackBarRef;
        return this._openedSnackBarRef;
    };
    /**
     * Animates the old snack bar out and the new one in.
     * @param {?} snackBarRef
     * @param {?} config
     * @return {?}
     */
    MatSnackBar.prototype._animateSnackBar = /**
     * Animates the old snack bar out and the new one in.
     * @param {?} snackBarRef
     * @param {?} config
     * @return {?}
     */
    function (snackBarRef, config) {
        var _this = this;
        // When the snackbar is dismissed, clear the reference to it.
        snackBarRef.afterDismissed().subscribe(function () {
            // Clear the snackbar ref if it hasn't already been replaced by a newer snackbar.
            if (_this._openedSnackBarRef == snackBarRef) {
                _this._openedSnackBarRef = null;
            }
        });
        if (this._openedSnackBarRef) {
            // If a snack bar is already in view, dismiss it and enter the
            // new snack bar after exit animation is complete.
            this._openedSnackBarRef.afterDismissed().subscribe(function () {
                snackBarRef.containerInstance.enter();
            });
            this._openedSnackBarRef.dismiss();
        }
        else {
            // If no snack bar is in view, enter the new snack bar.
            snackBarRef.containerInstance.enter();
        }
        // If a dismiss timeout is provided, set up dismiss based on after the snackbar is opened.
        if (config.duration && config.duration > 0) {
            snackBarRef.afterOpened().subscribe(function () { return snackBarRef._dismissAfter(/** @type {?} */ ((config.duration))); });
        }
        if (config.announcementMessage) {
            this._live.announce(config.announcementMessage, config.politeness);
        }
    };
    /**
     * Creates a new overlay and places it in the correct location.
     * @param {?} config The user-specified snack bar config.
     * @return {?}
     */
    MatSnackBar.prototype._createOverlay = /**
     * Creates a new overlay and places it in the correct location.
     * @param {?} config The user-specified snack bar config.
     * @return {?}
     */
    function (config) {
        var /** @type {?} */ overlayConfig = new OverlayConfig();
        overlayConfig.direction = config.direction;
        var /** @type {?} */ positionStrategy = this._overlay.position().global();
        // Set horizontal position.
        var /** @type {?} */ isRtl = config.direction === 'rtl';
        var /** @type {?} */ isLeft = (config.horizontalPosition === 'left' ||
            (config.horizontalPosition === 'start' && !isRtl) ||
            (config.horizontalPosition === 'end' && isRtl));
        var /** @type {?} */ isRight = !isLeft && config.horizontalPosition !== 'center';
        if (isLeft) {
            positionStrategy.left('0');
        }
        else if (isRight) {
            positionStrategy.right('0');
        }
        else {
            positionStrategy.centerHorizontally();
        }
        // Set horizontal position.
        if (config.verticalPosition === 'top') {
            positionStrategy.top('0');
        }
        else {
            positionStrategy.bottom('0');
        }
        overlayConfig.positionStrategy = positionStrategy;
        return this._overlay.create(overlayConfig);
    };
    /**
     * Creates an injector to be used inside of a snack bar component.
     * @template T
     * @param {?} config Config that was used to create the snack bar.
     * @param {?} snackBarRef Reference to the snack bar.
     * @return {?}
     */
    MatSnackBar.prototype._createInjector = /**
     * Creates an injector to be used inside of a snack bar component.
     * @template T
     * @param {?} config Config that was used to create the snack bar.
     * @param {?} snackBarRef Reference to the snack bar.
     * @return {?}
     */
    function (config, snackBarRef) {
        var /** @type {?} */ userInjector = config && config.viewContainerRef && config.viewContainerRef.injector;
        return new PortalInjector(userInjector || this._injector, new WeakMap([
            [MatSnackBarRef, snackBarRef],
            [MAT_SNACK_BAR_DATA, config.data]
        ]));
    };
    MatSnackBar.decorators = [
        { type: Injectable, args: [{ providedIn: MatSnackBarModule },] },
    ];
    /** @nocollapse */
    MatSnackBar.ctorParameters = function () { return [
        { type: Overlay, },
        { type: LiveAnnouncer, },
        { type: Injector, },
        { type: BreakpointObserver, },
        { type: MatSnackBar, decorators: [{ type: Optional }, { type: SkipSelf },] },
        { type: MatSnackBarConfig, decorators: [{ type: Inject, args: [MAT_SNACK_BAR_DEFAULT_OPTIONS,] },] },
    ]; };
    /** @nocollapse */ MatSnackBar.ngInjectableDef = i0.defineInjectable({ factory: function MatSnackBar_Factory() { return new MatSnackBar(i0.inject(i1.Overlay), i0.inject(i2.LiveAnnouncer), i0.inject(i0.INJECTOR), i0.inject(i3.BreakpointObserver), i0.inject(MatSnackBar, 12), i0.inject(MAT_SNACK_BAR_DEFAULT_OPTIONS)); }, token: MatSnackBar, providedIn: i4.MatSnackBarModule });
    return MatSnackBar;
}());
export { MatSnackBar };
function MatSnackBar_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    MatSnackBar.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    MatSnackBar.ctorParameters;
    /**
     * Reference to the current snack bar in the view *at this level* (in the Angular injector tree).
     * If there is a parent snack-bar service, all operations should delegate to that parent
     * via `_openedSnackBarRef`.
     * @type {?}
     */
    MatSnackBar.prototype._snackBarRefAtThisLevel;
    /** @type {?} */
    MatSnackBar.prototype._overlay;
    /** @type {?} */
    MatSnackBar.prototype._live;
    /** @type {?} */
    MatSnackBar.prototype._injector;
    /** @type {?} */
    MatSnackBar.prototype._breakpointObserver;
    /** @type {?} */
    MatSnackBar.prototype._parentSnackBar;
    /** @type {?} */
    MatSnackBar.prototype._defaultConfig;
}
//# sourceMappingURL=snack-bar.js.map