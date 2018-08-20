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
var a11y_1 = require("@angular/cdk/a11y");
var layout_1 = require("@angular/cdk/layout");
var overlay_1 = require("@angular/cdk/overlay");
var portal_1 = require("@angular/cdk/portal");
var core_1 = require("@angular/core");
var operators_1 = require("rxjs/operators");
var simple_snack_bar_1 = require("./simple-snack-bar");
var snack_bar_config_1 = require("./snack-bar-config");
var snack_bar_container_1 = require("./snack-bar-container");
var snack_bar_module_1 = require("./snack-bar-module");
var snack_bar_ref_1 = require("./snack-bar-ref");
var i0 = require("@angular/core");
var i1 = require("@angular/cdk/overlay");
var i2 = require("@angular/cdk/a11y");
var i3 = require("@angular/cdk/layout");
var i4 = require("./snack-bar-module");
/** Injection token that can be used to specify default snack bar. */
exports.MAT_SNACK_BAR_DEFAULT_OPTIONS = new core_1.InjectionToken('mat-snack-bar-default-options', {
    providedIn: 'root',
    factory: MAT_SNACK_BAR_DEFAULT_OPTIONS_FACTORY,
});
/** @docs-private */
function MAT_SNACK_BAR_DEFAULT_OPTIONS_FACTORY() {
    return new snack_bar_config_1.MatSnackBarConfig();
}
exports.MAT_SNACK_BAR_DEFAULT_OPTIONS_FACTORY = MAT_SNACK_BAR_DEFAULT_OPTIONS_FACTORY;
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
        get: /** Reference to the currently opened snackbar at *any* level. */
        function () {
            var parent = this._parentSnackBar;
            return parent ? parent._openedSnackBarRef : this._snackBarRefAtThisLevel;
        },
        set: function (value) {
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
       * @param component Component to be instantiated.
       * @param config Extra configuration for the snack bar.
       */
    MatSnackBar.prototype.openFromComponent = /**
       * Creates and dispatches a snack bar with a custom component for the content, removing any
       * currently opened snack bars.
       *
       * @param component Component to be instantiated.
       * @param config Extra configuration for the snack bar.
       */
    function (component, config) {
        return this._attach(component, config);
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
       * @param template Template to be instantiated.
       * @param config Extra configuration for the snack bar.
       */
    MatSnackBar.prototype.openFromTemplate = /**
       * Creates and dispatches a snack bar with a custom template for the content, removing any
       * currently opened snack bars.
       *
       * @param template Template to be instantiated.
       * @param config Extra configuration for the snack bar.
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
       * @param message The message to show in the snackbar.
       * @param action The label for the snackbar action.
       * @param config Additional configuration options for the snackbar.
       */
    MatSnackBar.prototype.open = /**
       * Opens a snackbar with a message and an optional action.
       * @param message The message to show in the snackbar.
       * @param action The label for the snackbar action.
       * @param config Additional configuration options for the snackbar.
       */
    function (message, action, config) {
        if (action === void 0) { action = ''; }
        var _config = __assign({}, this._defaultConfig, config);
        // Since the user doesn't have access to the component, we can
        // override the data to pass in our own message and action.
        _config.data = { message: message, action: action };
        if (!_config.announcementMessage) {
            _config.announcementMessage = message;
        }
        return this.openFromComponent(simple_snack_bar_1.SimpleSnackBar, _config);
    };
    /**
     * Dismisses the currently-visible snack bar.
     */
    /**
       * Dismisses the currently-visible snack bar.
       */
    MatSnackBar.prototype.dismiss = /**
       * Dismisses the currently-visible snack bar.
       */
    function () {
        if (this._openedSnackBarRef) {
            this._openedSnackBarRef.dismiss();
        }
    };
    /**
     * Attaches the snack bar container component to the overlay.
     */
    /**
       * Attaches the snack bar container component to the overlay.
       */
    MatSnackBar.prototype._attachSnackBarContainer = /**
       * Attaches the snack bar container component to the overlay.
       */
    function (overlayRef, config) {
        var userInjector = config && config.viewContainerRef && config.viewContainerRef.injector;
        var injector = new portal_1.PortalInjector(userInjector || this._injector, new WeakMap([
            [snack_bar_config_1.MatSnackBarConfig, config]
        ]));
        var containerPortal = new portal_1.ComponentPortal(snack_bar_container_1.MatSnackBarContainer, config.viewContainerRef, injector);
        var containerRef = overlayRef.attach(containerPortal);
        containerRef.instance.snackBarConfig = config;
        return containerRef.instance;
    };
    /**
     * Places a new component or a template as the content of the snack bar container.
     */
    /**
       * Places a new component or a template as the content of the snack bar container.
       */
    MatSnackBar.prototype._attach = /**
       * Places a new component or a template as the content of the snack bar container.
       */
    function (content, userConfig) {
        var config = __assign({}, new snack_bar_config_1.MatSnackBarConfig(), this._defaultConfig, userConfig);
        var overlayRef = this._createOverlay(config);
        var container = this._attachSnackBarContainer(overlayRef, config);
        var snackBarRef = new snack_bar_ref_1.MatSnackBarRef(container, overlayRef);
        if (content instanceof core_1.TemplateRef) {
            var portal = new portal_1.TemplatePortal(content, (null), {
                $implicit: config.data,
                snackBarRef: snackBarRef
            });
            snackBarRef.instance = container.attachTemplatePortal(portal);
        }
        else {
            var injector = this._createInjector(config, snackBarRef);
            var portal = new portal_1.ComponentPortal(content, undefined, injector);
            var contentRef = container.attachComponentPortal(portal);
            // We can't pass this via the injector, because the injector is created earlier.
            snackBarRef.instance = contentRef.instance;
        }
        // Subscribe to the breakpoint observer and attach the mat-snack-bar-handset class as
        // appropriate. This class is applied to the overlay element because the overlay must expand to
        // fill the width of the screen for full width snackbars.
        this._breakpointObserver.observe(layout_1.Breakpoints.Handset).pipe(operators_1.takeUntil(overlayRef.detachments().pipe(operators_1.take(1)))).subscribe(function (state) {
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
    /** Animates the old snack bar out and the new one in. */
    /** Animates the old snack bar out and the new one in. */
    MatSnackBar.prototype._animateSnackBar = /** Animates the old snack bar out and the new one in. */
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
            snackBarRef.afterOpened().subscribe(function () { return snackBarRef._dismissAfter((config.duration)); });
        }
        if (config.announcementMessage) {
            this._live.announce(config.announcementMessage, config.politeness);
        }
    };
    /**
     * Creates a new overlay and places it in the correct location.
     * @param config The user-specified snack bar config.
     */
    /**
       * Creates a new overlay and places it in the correct location.
       * @param config The user-specified snack bar config.
       */
    MatSnackBar.prototype._createOverlay = /**
       * Creates a new overlay and places it in the correct location.
       * @param config The user-specified snack bar config.
       */
    function (config) {
        var overlayConfig = new overlay_1.OverlayConfig();
        overlayConfig.direction = config.direction;
        var positionStrategy = this._overlay.position().global();
        // Set horizontal position.
        var isRtl = config.direction === 'rtl';
        var isLeft = (config.horizontalPosition === 'left' ||
            (config.horizontalPosition === 'start' && !isRtl) ||
            (config.horizontalPosition === 'end' && isRtl));
        var isRight = !isLeft && config.horizontalPosition !== 'center';
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
     * @param config Config that was used to create the snack bar.
     * @param snackBarRef Reference to the snack bar.
     */
    /**
       * Creates an injector to be used inside of a snack bar component.
       * @param config Config that was used to create the snack bar.
       * @param snackBarRef Reference to the snack bar.
       */
    MatSnackBar.prototype._createInjector = /**
       * Creates an injector to be used inside of a snack bar component.
       * @param config Config that was used to create the snack bar.
       * @param snackBarRef Reference to the snack bar.
       */
    function (config, snackBarRef) {
        var userInjector = config && config.viewContainerRef && config.viewContainerRef.injector;
        return new portal_1.PortalInjector(userInjector || this._injector, new WeakMap([
            [snack_bar_ref_1.MatSnackBarRef, snackBarRef],
            [snack_bar_config_1.MAT_SNACK_BAR_DATA, config.data]
        ]));
    };
    MatSnackBar.decorators = [
        { type: core_1.Injectable, args: [{ providedIn: snack_bar_module_1.MatSnackBarModule },] },
    ];
    /** @nocollapse */
    MatSnackBar.ctorParameters = function () { return [
        { type: overlay_1.Overlay, },
        { type: a11y_1.LiveAnnouncer, },
        { type: core_1.Injector, },
        { type: layout_1.BreakpointObserver, },
        { type: MatSnackBar, decorators: [{ type: core_1.Optional }, { type: core_1.SkipSelf },] },
        { type: snack_bar_config_1.MatSnackBarConfig, decorators: [{ type: core_1.Inject, args: [exports.MAT_SNACK_BAR_DEFAULT_OPTIONS,] },] },
    ]; };
    MatSnackBar.ngInjectableDef = i0.defineInjectable({ factory: function MatSnackBar_Factory() { return new MatSnackBar(i0.inject(i1.Overlay), i0.inject(i2.LiveAnnouncer), i0.inject(i0.INJECTOR), i0.inject(i3.BreakpointObserver), i0.inject(MatSnackBar, 12), i0.inject(exports.MAT_SNACK_BAR_DEFAULT_OPTIONS)); }, token: MatSnackBar, providedIn: i4.MatSnackBarModule });
    return MatSnackBar;
}());
exports.MatSnackBar = MatSnackBar;
//# sourceMappingURL=snack-bar.js.map