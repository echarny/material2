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
var bidi_1 = require("@angular/cdk/bidi");
var overlay_1 = require("@angular/cdk/overlay");
var portal_1 = require("@angular/cdk/portal");
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var dialog_config_1 = require("./dialog-config");
var dialog_container_1 = require("./dialog-container");
var dialog_ref_1 = require("./dialog-ref");
/** Injection token that can be used to access the data that was passed in to a dialog. */
exports.MAT_DIALOG_DATA = new core_1.InjectionToken('MatDialogData');
/** Injection token that can be used to specify default dialog options. */
exports.MAT_DIALOG_DEFAULT_OPTIONS = new core_1.InjectionToken('mat-dialog-default-options');
/** Injection token that determines the scroll handling while the dialog is open. */
exports.MAT_DIALOG_SCROLL_STRATEGY = new core_1.InjectionToken('mat-dialog-scroll-strategy');
/** @docs-private */
function MAT_DIALOG_SCROLL_STRATEGY_FACTORY(overlay) {
    return function () { return overlay.scrollStrategies.block(); };
}
exports.MAT_DIALOG_SCROLL_STRATEGY_FACTORY = MAT_DIALOG_SCROLL_STRATEGY_FACTORY;
/** @docs-private */
function MAT_DIALOG_SCROLL_STRATEGY_PROVIDER_FACTORY(overlay) {
    return function () { return overlay.scrollStrategies.block(); };
}
exports.MAT_DIALOG_SCROLL_STRATEGY_PROVIDER_FACTORY = MAT_DIALOG_SCROLL_STRATEGY_PROVIDER_FACTORY;
/** @docs-private */
exports.MAT_DIALOG_SCROLL_STRATEGY_PROVIDER = {
    provide: exports.MAT_DIALOG_SCROLL_STRATEGY,
    deps: [overlay_1.Overlay],
    useFactory: MAT_DIALOG_SCROLL_STRATEGY_PROVIDER_FACTORY,
};
/**
 * Service to open Material Design modal dialogs.
 */
var MatDialog = /** @class */ (function () {
    function MatDialog(_overlay, _injector, _location, _defaultOptions, _scrollStrategy, _parentDialog, _overlayContainer) {
        var _this = this;
        this._overlay = _overlay;
        this._injector = _injector;
        this._location = _location;
        this._defaultOptions = _defaultOptions;
        this._scrollStrategy = _scrollStrategy;
        this._parentDialog = _parentDialog;
        this._overlayContainer = _overlayContainer;
        this._openDialogsAtThisLevel = [];
        this._afterAllClosedAtThisLevel = new rxjs_1.Subject();
        this._afterOpenedAtThisLevel = new rxjs_1.Subject();
        this._ariaHiddenElements = new Map();
        /**
           * Stream that emits when all open dialog have finished closing.
           * Will emit on subscribe if there are no open dialogs to begin with.
           */
        this.afterAllClosed = rxjs_1.defer(function () {
            return _this.openDialogs.length ?
                _this._afterAllClosed :
                _this._afterAllClosed.pipe(operators_1.startWith(undefined));
        });
    }
    Object.defineProperty(MatDialog.prototype, "openDialogs", {
        /** Keeps track of the currently-open dialogs. */
        get: /** Keeps track of the currently-open dialogs. */
        function () {
            return this._parentDialog ? this._parentDialog.openDialogs : this._openDialogsAtThisLevel;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatDialog.prototype, "afterOpened", {
        /** Stream that emits when a dialog has been opened. */
        get: /** Stream that emits when a dialog has been opened. */
        function () {
            return this._parentDialog ? this._parentDialog.afterOpened : this._afterOpenedAtThisLevel;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatDialog.prototype, "afterOpen", {
        /**
         * Stream that emits when a dialog has been opened.
         * @deprecated Use `afterOpened` instead.
         * @breaking-change 8.0.0
         */
        get: /**
           * Stream that emits when a dialog has been opened.
           * @deprecated Use `afterOpened` instead.
           * @breaking-change 8.0.0
           */
        function () {
            return this.afterOpened;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatDialog.prototype, "_afterAllClosed", {
        get: function () {
            var parent = this._parentDialog;
            return parent ? parent._afterAllClosed : this._afterAllClosedAtThisLevel;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Opens a modal dialog containing the given component.
     * @param componentOrTemplateRef Type of the component to load into the dialog,
     *     or a TemplateRef to instantiate as the dialog content.
     * @param config Extra configuration options.
     * @returns Reference to the newly-opened dialog.
     */
    /**
       * Opens a modal dialog containing the given component.
       * @param componentOrTemplateRef Type of the component to load into the dialog,
       *     or a TemplateRef to instantiate as the dialog content.
       * @param config Extra configuration options.
       * @returns Reference to the newly-opened dialog.
       */
    MatDialog.prototype.open = /**
       * Opens a modal dialog containing the given component.
       * @param componentOrTemplateRef Type of the component to load into the dialog,
       *     or a TemplateRef to instantiate as the dialog content.
       * @param config Extra configuration options.
       * @returns Reference to the newly-opened dialog.
       */
    function (componentOrTemplateRef, config) {
        var _this = this;
        config = _applyConfigDefaults(config, this._defaultOptions || new dialog_config_1.MatDialogConfig());
        if (config.id && this.getDialogById(config.id)) {
            throw Error("Dialog with id \"" + config.id + "\" exists already. The dialog id must be unique.");
        }
        var overlayRef = this._createOverlay(config);
        var dialogContainer = this._attachDialogContainer(overlayRef, config);
        var dialogRef = this._attachDialogContent(componentOrTemplateRef, dialogContainer, overlayRef, config);
        // If this is the first dialog that we're opening, hide all the non-overlay content.
        if (!this.openDialogs.length) {
            this._hideNonDialogContentFromAssistiveTechnology();
        }
        this.openDialogs.push(dialogRef);
        dialogRef.afterClosed().subscribe(function () { return _this._removeOpenDialog(dialogRef); });
        this.afterOpened.next(dialogRef);
        return dialogRef;
    };
    /**
     * Closes all of the currently-open dialogs.
     */
    /**
       * Closes all of the currently-open dialogs.
       */
    MatDialog.prototype.closeAll = /**
       * Closes all of the currently-open dialogs.
       */
    function () {
        var i = this.openDialogs.length;
        while (i--) {
            // The `_openDialogs` property isn't updated after close until the rxjs subscription
            // runs on the next microtask, in addition to modifying the array as we're going
            // through it. We loop through all of them and call close without assuming that
            // they'll be removed from the list instantaneously.
            this.openDialogs[i].close();
        }
    };
    /**
     * Finds an open dialog by its id.
     * @param id ID to use when looking up the dialog.
     */
    /**
       * Finds an open dialog by its id.
       * @param id ID to use when looking up the dialog.
       */
    MatDialog.prototype.getDialogById = /**
       * Finds an open dialog by its id.
       * @param id ID to use when looking up the dialog.
       */
    function (id) {
        return this.openDialogs.find(function (dialog) { return dialog.id === id; });
    };
    /**
     * Creates the overlay into which the dialog will be loaded.
     * @param config The dialog configuration.
     * @returns A promise resolving to the OverlayRef for the created overlay.
     */
    /**
       * Creates the overlay into which the dialog will be loaded.
       * @param config The dialog configuration.
       * @returns A promise resolving to the OverlayRef for the created overlay.
       */
    MatDialog.prototype._createOverlay = /**
       * Creates the overlay into which the dialog will be loaded.
       * @param config The dialog configuration.
       * @returns A promise resolving to the OverlayRef for the created overlay.
       */
    function (config) {
        var overlayConfig = this._getOverlayConfig(config);
        return this._overlay.create(overlayConfig);
    };
    /**
     * Creates an overlay config from a dialog config.
     * @param dialogConfig The dialog configuration.
     * @returns The overlay configuration.
     */
    /**
       * Creates an overlay config from a dialog config.
       * @param dialogConfig The dialog configuration.
       * @returns The overlay configuration.
       */
    MatDialog.prototype._getOverlayConfig = /**
       * Creates an overlay config from a dialog config.
       * @param dialogConfig The dialog configuration.
       * @returns The overlay configuration.
       */
    function (dialogConfig) {
        var state = new overlay_1.OverlayConfig({
            positionStrategy: this._overlay.position().global(),
            scrollStrategy: dialogConfig.scrollStrategy || this._scrollStrategy(),
            panelClass: dialogConfig.panelClass,
            hasBackdrop: dialogConfig.hasBackdrop,
            direction: dialogConfig.direction,
            minWidth: dialogConfig.minWidth,
            minHeight: dialogConfig.minHeight,
            maxWidth: dialogConfig.maxWidth,
            maxHeight: dialogConfig.maxHeight
        });
        if (dialogConfig.backdropClass) {
            state.backdropClass = dialogConfig.backdropClass;
        }
        return state;
    };
    /**
     * Attaches an MatDialogContainer to a dialog's already-created overlay.
     * @param overlay Reference to the dialog's underlying overlay.
     * @param config The dialog configuration.
     * @returns A promise resolving to a ComponentRef for the attached container.
     */
    /**
       * Attaches an MatDialogContainer to a dialog's already-created overlay.
       * @param overlay Reference to the dialog's underlying overlay.
       * @param config The dialog configuration.
       * @returns A promise resolving to a ComponentRef for the attached container.
       */
    MatDialog.prototype._attachDialogContainer = /**
       * Attaches an MatDialogContainer to a dialog's already-created overlay.
       * @param overlay Reference to the dialog's underlying overlay.
       * @param config The dialog configuration.
       * @returns A promise resolving to a ComponentRef for the attached container.
       */
    function (overlay, config) {
        var userInjector = config && config.viewContainerRef && config.viewContainerRef.injector;
        var injector = new portal_1.PortalInjector(userInjector || this._injector, new WeakMap([
            [dialog_config_1.MatDialogConfig, config]
        ]));
        var containerPortal = new portal_1.ComponentPortal(dialog_container_1.MatDialogContainer, config.viewContainerRef, injector);
        var containerRef = overlay.attach(containerPortal);
        return containerRef.instance;
    };
    /**
     * Attaches the user-provided component to the already-created MatDialogContainer.
     * @param componentOrTemplateRef The type of component being loaded into the dialog,
     *     or a TemplateRef to instantiate as the content.
     * @param dialogContainer Reference to the wrapping MatDialogContainer.
     * @param overlayRef Reference to the overlay in which the dialog resides.
     * @param config The dialog configuration.
     * @returns A promise resolving to the MatDialogRef that should be returned to the user.
     */
    /**
       * Attaches the user-provided component to the already-created MatDialogContainer.
       * @param componentOrTemplateRef The type of component being loaded into the dialog,
       *     or a TemplateRef to instantiate as the content.
       * @param dialogContainer Reference to the wrapping MatDialogContainer.
       * @param overlayRef Reference to the overlay in which the dialog resides.
       * @param config The dialog configuration.
       * @returns A promise resolving to the MatDialogRef that should be returned to the user.
       */
    MatDialog.prototype._attachDialogContent = /**
       * Attaches the user-provided component to the already-created MatDialogContainer.
       * @param componentOrTemplateRef The type of component being loaded into the dialog,
       *     or a TemplateRef to instantiate as the content.
       * @param dialogContainer Reference to the wrapping MatDialogContainer.
       * @param overlayRef Reference to the overlay in which the dialog resides.
       * @param config The dialog configuration.
       * @returns A promise resolving to the MatDialogRef that should be returned to the user.
       */
    function (componentOrTemplateRef, dialogContainer, overlayRef, config) {
        // Create a reference to the dialog we're creating in order to give the user a handle
        // to modify and close it.
        var dialogRef = new dialog_ref_1.MatDialogRef(overlayRef, dialogContainer, this._location, config.id);
        // When the dialog backdrop is clicked, we want to close it.
        if (config.hasBackdrop) {
            overlayRef.backdropClick().subscribe(function () {
                if (!dialogRef.disableClose) {
                    dialogRef.close();
                }
            });
        }
        if (componentOrTemplateRef instanceof core_1.TemplateRef) {
            dialogContainer.attachTemplatePortal(new portal_1.TemplatePortal(componentOrTemplateRef, (null), { $implicit: config.data, dialogRef: dialogRef }));
        }
        else {
            var injector = this._createInjector(config, dialogRef, dialogContainer);
            var contentRef = dialogContainer.attachComponentPortal(new portal_1.ComponentPortal(componentOrTemplateRef, undefined, injector));
            dialogRef.componentInstance = contentRef.instance;
        }
        dialogRef
            .updateSize(config.width, config.height)
            .updatePosition(config.position);
        return dialogRef;
    };
    /**
     * Creates a custom injector to be used inside the dialog. This allows a component loaded inside
     * of a dialog to close itself and, optionally, to return a value.
     * @param config Config object that is used to construct the dialog.
     * @param dialogRef Reference to the dialog.
     * @param container Dialog container element that wraps all of the contents.
     * @returns The custom injector that can be used inside the dialog.
     */
    /**
       * Creates a custom injector to be used inside the dialog. This allows a component loaded inside
       * of a dialog to close itself and, optionally, to return a value.
       * @param config Config object that is used to construct the dialog.
       * @param dialogRef Reference to the dialog.
       * @param container Dialog container element that wraps all of the contents.
       * @returns The custom injector that can be used inside the dialog.
       */
    MatDialog.prototype._createInjector = /**
       * Creates a custom injector to be used inside the dialog. This allows a component loaded inside
       * of a dialog to close itself and, optionally, to return a value.
       * @param config Config object that is used to construct the dialog.
       * @param dialogRef Reference to the dialog.
       * @param container Dialog container element that wraps all of the contents.
       * @returns The custom injector that can be used inside the dialog.
       */
    function (config, dialogRef, dialogContainer) {
        var userInjector = config && config.viewContainerRef && config.viewContainerRef.injector;
        // The MatDialogContainer is injected in the portal as the MatDialogContainer and the dialog's
        // content are created out of the same ViewContainerRef and as such, are siblings for injector
        // purposes. To allow the hierarchy that is expected, the MatDialogContainer is explicitly
        // added to the injection tokens.
        var injectionTokens = new WeakMap([
            [dialog_container_1.MatDialogContainer, dialogContainer],
            [exports.MAT_DIALOG_DATA, config.data],
            [dialog_ref_1.MatDialogRef, dialogRef]
        ]);
        if (config.direction &&
            (!userInjector || !userInjector.get(bidi_1.Directionality, null))) {
            injectionTokens.set(bidi_1.Directionality, {
                value: config.direction,
                change: rxjs_1.of()
            });
        }
        return new portal_1.PortalInjector(userInjector || this._injector, injectionTokens);
    };
    /**
     * Removes a dialog from the array of open dialogs.
     * @param dialogRef Dialog to be removed.
     */
    /**
       * Removes a dialog from the array of open dialogs.
       * @param dialogRef Dialog to be removed.
       */
    MatDialog.prototype._removeOpenDialog = /**
       * Removes a dialog from the array of open dialogs.
       * @param dialogRef Dialog to be removed.
       */
    function (dialogRef) {
        var index = this.openDialogs.indexOf(dialogRef);
        if (index > -1) {
            this.openDialogs.splice(index, 1);
            // If all the dialogs were closed, remove/restore the `aria-hidden`
            // to a the siblings and emit to the `afterAllClosed` stream.
            if (!this.openDialogs.length) {
                this._ariaHiddenElements.forEach(function (previousValue, element) {
                    if (previousValue) {
                        element.setAttribute('aria-hidden', previousValue);
                    }
                    else {
                        element.removeAttribute('aria-hidden');
                    }
                });
                this._ariaHiddenElements.clear();
                this._afterAllClosed.next();
            }
        }
    };
    /**
     * Hides all of the content that isn't an overlay from assistive technology.
     */
    /**
       * Hides all of the content that isn't an overlay from assistive technology.
       */
    MatDialog.prototype._hideNonDialogContentFromAssistiveTechnology = /**
       * Hides all of the content that isn't an overlay from assistive technology.
       */
    function () {
        var overlayContainer = this._overlayContainer.getContainerElement();
        // Ensure that the overlay container is attached to the DOM.
        if (overlayContainer.parentElement) {
            var siblings = overlayContainer.parentElement.children;
            for (var i = siblings.length - 1; i > -1; i--) {
                var sibling = siblings[i];
                if (sibling !== overlayContainer &&
                    sibling.nodeName !== 'SCRIPT' &&
                    sibling.nodeName !== 'STYLE' &&
                    !sibling.hasAttribute('aria-live')) {
                    this._ariaHiddenElements.set(sibling, sibling.getAttribute('aria-hidden'));
                    sibling.setAttribute('aria-hidden', 'true');
                }
            }
        }
    };
    MatDialog.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    MatDialog.ctorParameters = function () { return [
        { type: overlay_1.Overlay, },
        { type: core_1.Injector, },
        { type: common_1.Location, decorators: [{ type: core_1.Optional },] },
        { type: undefined, decorators: [{ type: core_1.Optional }, { type: core_1.Inject, args: [exports.MAT_DIALOG_DEFAULT_OPTIONS,] },] },
        { type: undefined, decorators: [{ type: core_1.Inject, args: [exports.MAT_DIALOG_SCROLL_STRATEGY,] },] },
        { type: MatDialog, decorators: [{ type: core_1.Optional }, { type: core_1.SkipSelf },] },
        { type: overlay_1.OverlayContainer, },
    ]; };
    return MatDialog;
}());
exports.MatDialog = MatDialog;
/**
 * Applies default options to the dialog config.
 * @param config Config to be modified.
 * @param defaultOptions Default options provided.
 * @returns The new configuration object.
 */
function _applyConfigDefaults(config, defaultOptions) {
    return __assign({}, defaultOptions, config);
}
//# sourceMappingURL=dialog.js.map