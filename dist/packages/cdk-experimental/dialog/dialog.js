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
var core_1 = require("@angular/core");
var portal_1 = require("@angular/cdk/portal");
var rxjs_1 = require("rxjs");
var common_1 = require("@angular/common");
var dialog_config_1 = require("./dialog-config");
var bidi_1 = require("@angular/cdk/bidi");
var overlay_1 = require("@angular/cdk/overlay");
var operators_1 = require("rxjs/operators");
var dialog_injectors_1 = require("./dialog-injectors");
/**
 * Service to open modal dialogs.
 */
var Dialog = /** @class */ (function () {
    function Dialog(overlay, injector, dialogRefConstructor, _scrollStrategy, _parentDialog, location) {
        var _this = this;
        this.overlay = overlay;
        this.injector = injector;
        this.dialogRefConstructor = dialogRefConstructor;
        this._scrollStrategy = _scrollStrategy;
        this._parentDialog = _parentDialog;
        this._afterAllClosedBase = new rxjs_1.Subject();
        this.afterAllClosed = rxjs_1.defer(function () {
            return _this.openDialogs.length ?
                _this._afterAllClosed : _this._afterAllClosed.pipe(operators_1.startWith(undefined));
        });
        this._afterOpened = new rxjs_1.Subject();
        this._openDialogs = [];
        // Close all of the dialogs when the user goes forwards/backwards in history or when the
        // location hash changes. Note that this usually doesn't include clicking on links (unless
        // the user is using the `HashLocationStrategy`).
        if (!_parentDialog && location) {
            location.subscribe(function () { return _this.closeAll(); });
        }
    }
    Object.defineProperty(Dialog.prototype, "_afterAllClosed", {
        /** Stream that emits when all dialogs are closed. */
        get: /** Stream that emits when all dialogs are closed. */
        function () {
            return this._parentDialog ? this._parentDialog.afterAllClosed : this._afterAllClosedBase;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Dialog.prototype, "afterOpened", {
        /** Stream that emits when a dialog is opened. */
        get: /** Stream that emits when a dialog is opened. */
        function () {
            return this._parentDialog ? this._parentDialog.afterOpened : this._afterOpened;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Dialog.prototype, "openDialogs", {
        /** Stream that emits when a dialog is opened. */
        get: /** Stream that emits when a dialog is opened. */
        function () {
            return this._parentDialog ? this._parentDialog.openDialogs : this._openDialogs;
        },
        enumerable: true,
        configurable: true
    });
    /** Gets an open dialog by id. */
    /** Gets an open dialog by id. */
    Dialog.prototype.getById = /** Gets an open dialog by id. */
    function (id) {
        return this._openDialogs.find(function (ref) { return ref.id === id; });
    };
    /** Closes all open dialogs. */
    /** Closes all open dialogs. */
    Dialog.prototype.closeAll = /** Closes all open dialogs. */
    function () {
        this.openDialogs.forEach(function (ref) { return ref.close(); });
    };
    /** Opens a dialog from a component. */
    /** Opens a dialog from a component. */
    Dialog.prototype.openFromComponent = /** Opens a dialog from a component. */
    function (component, config) {
        config = this._applyConfigDefaults(config);
        if (config.id && this.getById(config.id)) {
            throw Error("Dialog with id \"" + config.id + "\" exists already. The dialog id must be unique.");
        }
        var overlayRef = this._createOverlay(config);
        var dialogContainer = this._attachDialogContainer(overlayRef, config);
        var dialogRef = this._attachDialogContentForComponent(component, dialogContainer, overlayRef, config);
        this.registerDialogRef(dialogRef);
        return dialogRef;
    };
    /** Opens a dialog from a template. */
    /** Opens a dialog from a template. */
    Dialog.prototype.openFromTemplate = /** Opens a dialog from a template. */
    function (template, config) {
        config = this._applyConfigDefaults(config);
        if (config.id && this.getById(config.id)) {
            throw Error("Dialog with id \"" + config.id + "\" exists already. The dialog id must be unique.");
        }
        var overlayRef = this._createOverlay(config);
        var dialogContainer = this._attachDialogContainer(overlayRef, config);
        var dialogRef = this._attachDialogContentForTemplate(template, dialogContainer, overlayRef, config);
        this.registerDialogRef(dialogRef);
        return dialogRef;
    };
    /**
     * Forwards emitting events for when dialogs are opened and all dialogs are closed.
     */
    /**
       * Forwards emitting events for when dialogs are opened and all dialogs are closed.
       */
    Dialog.prototype.registerDialogRef = /**
       * Forwards emitting events for when dialogs are opened and all dialogs are closed.
       */
    function (dialogRef) {
        var _this = this;
        this.openDialogs.push(dialogRef);
        var dialogOpenSub = dialogRef.afterOpened().subscribe(function () {
            _this.afterOpened.next(dialogRef);
            dialogOpenSub.unsubscribe();
        });
        var dialogCloseSub = dialogRef.afterClosed().subscribe(function () {
            var dialogIndex = _this._openDialogs.indexOf(dialogRef);
            if (dialogIndex > -1) {
                _this._openDialogs.splice(dialogIndex, 1);
            }
            if (!_this._openDialogs.length) {
                _this._afterAllClosedBase.next();
                dialogCloseSub.unsubscribe();
            }
        });
    };
    /**
     * Creates an overlay config from a dialog config.
     * @param config The dialog configuration.
     * @returns The overlay configuration.
     */
    /**
       * Creates an overlay config from a dialog config.
       * @param config The dialog configuration.
       * @returns The overlay configuration.
       */
    Dialog.prototype._createOverlay = /**
       * Creates an overlay config from a dialog config.
       * @param config The dialog configuration.
       * @returns The overlay configuration.
       */
    function (config) {
        var overlayConfig = new overlay_1.OverlayConfig({
            positionStrategy: this.overlay.position().global(),
            scrollStrategy: this._scrollStrategy(),
            panelClass: config.panelClass,
            hasBackdrop: config.hasBackdrop,
            direction: config.direction,
            minWidth: config.minWidth,
            minHeight: config.minHeight,
            maxWidth: config.maxWidth,
            maxHeight: config.maxHeight
        });
        if (config.backdropClass) {
            overlayConfig.backdropClass = config.backdropClass;
        }
        return this.overlay.create(overlayConfig);
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
    Dialog.prototype._attachDialogContainer = /**
       * Attaches an MatDialogContainer to a dialog's already-created overlay.
       * @param overlay Reference to the dialog's underlying overlay.
       * @param config The dialog configuration.
       * @returns A promise resolving to a ComponentRef for the attached container.
       */
    function (overlay, config) {
        var container = config.containerComponent || this.injector.get(dialog_injectors_1.DIALOG_CONTAINER);
        var userInjector = config && config.viewContainerRef && config.viewContainerRef.injector;
        var injector = new portal_1.PortalInjector(userInjector || this.injector, new WeakMap([
            [dialog_config_1.DialogConfig, config]
        ]));
        var containerPortal = new portal_1.ComponentPortal(container, config.viewContainerRef, injector);
        var containerRef = overlay.attach(containerPortal);
        containerRef.instance._config = config;
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
    Dialog.prototype._attachDialogContentForComponent = /**
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
        var dialogRef = new this.dialogRefConstructor(overlayRef, dialogContainer, config.id);
        var injector = this._createInjector(config, dialogRef, dialogContainer);
        var contentRef = dialogContainer.attachComponentPortal(new portal_1.ComponentPortal(componentOrTemplateRef, undefined, injector));
        dialogRef.componentInstance = contentRef.instance;
        dialogRef.updateSize({ width: config.width, height: config.height })
            .updatePosition(config.position);
        return dialogRef;
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
    Dialog.prototype._attachDialogContentForTemplate = /**
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
        var dialogRef = new this.dialogRefConstructor(overlayRef, dialogContainer, config.id);
        dialogContainer.attachTemplatePortal(new portal_1.TemplatePortal(componentOrTemplateRef, (null), { $implicit: config.data, dialogRef: dialogRef }));
        dialogRef.updateSize({ width: config.width, height: config.height })
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
    Dialog.prototype._createInjector = /**
       * Creates a custom injector to be used inside the dialog. This allows a component loaded inside
       * of a dialog to close itself and, optionally, to return a value.
       * @param config Config object that is used to construct the dialog.
       * @param dialogRef Reference to the dialog.
       * @param container Dialog container element that wraps all of the contents.
       * @returns The custom injector that can be used inside the dialog.
       */
    function (config, dialogRef, dialogContainer) {
        var userInjector = config && config.viewContainerRef && config.viewContainerRef.injector;
        var injectionTokens = new WeakMap([
            [this.injector.get(dialog_injectors_1.DIALOG_REF), dialogRef],
            [this.injector.get(dialog_injectors_1.DIALOG_CONTAINER), dialogContainer],
            [dialog_injectors_1.DIALOG_DATA, config.data]
        ]);
        if (config.direction &&
            (!userInjector || !userInjector.get(bidi_1.Directionality, null))) {
            injectionTokens.set(bidi_1.Directionality, {
                value: config.direction,
                change: rxjs_1.of()
            });
        }
        return new portal_1.PortalInjector(userInjector || this.injector, injectionTokens);
    };
    /**
     * Expands the provided configuration object to include the default values for properties which
     * are undefined.
     */
    /**
       * Expands the provided configuration object to include the default values for properties which
       * are undefined.
       */
    Dialog.prototype._applyConfigDefaults = /**
       * Expands the provided configuration object to include the default values for properties which
       * are undefined.
       */
    function (config) {
        var dialogConfig = this.injector.get(dialog_injectors_1.DIALOG_CONFIG);
        return __assign({}, new dialogConfig(), config);
    };
    Dialog.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    Dialog.ctorParameters = function () { return [
        { type: overlay_1.Overlay, },
        { type: core_1.Injector, },
        { type: undefined, decorators: [{ type: core_1.Inject, args: [dialog_injectors_1.DIALOG_REF,] },] },
        { type: undefined, decorators: [{ type: core_1.Inject, args: [dialog_injectors_1.DIALOG_SCROLL_STRATEGY,] },] },
        { type: Dialog, decorators: [{ type: core_1.Optional }, { type: core_1.SkipSelf },] },
        { type: common_1.Location, decorators: [{ type: core_1.Optional },] },
    ]; };
    return Dialog;
}());
exports.Dialog = Dialog;
//# sourceMappingURL=dialog.js.map