/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { animate, state, style, transition, trigger } from '@angular/animations';
import { FocusTrapFactory, A11yModule } from '@angular/cdk/a11y';
import { BasePortalOutlet, PortalHostDirective, ComponentPortal, PortalInjector, TemplatePortal, PortalModule } from '@angular/cdk/portal';
import { DOCUMENT, Location, CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, HostBinding, Inject, Optional, ViewChild, ViewEncapsulation, InjectionToken, SkipSelf, Injectable, Injector, NgModule } from '@angular/core';
import { Subject, of, defer } from 'rxjs';
import { ESCAPE } from '@angular/cdk/keycodes';
import { map, filter, startWith } from 'rxjs/operators';
import { Overlay, OverlayConfig, OverlayModule } from '@angular/cdk/overlay';
import { Directionality } from '@angular/cdk/bidi';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @template D
 */
class DialogConfig {
    constructor() {
        /**
         * The ARIA role of the dialog.
         */
        this.role = 'dialog';
        /**
         * Custom class(es) for the overlay panel.
         */
        this.panelClass = '';
        /**
         * Whether the dialog has a background.
         */
        this.hasBackdrop = true;
        /**
         * Custom class(es) for the backdrop.
         */
        this.backdropClass = '';
        /**
         * Whether the dialog can be closed by user interaction.
         */
        this.disableClose = false;
        /**
         * The width of the dialog.
         */
        this.width = '';
        /**
         * The height of the dialog.
         */
        this.height = '';
        /**
         * The minimum width of the dialog.
         */
        this.minWidth = '';
        /**
         * The minimum height of the dialog.
         */
        this.minHeight = '';
        /**
         * The maximum width of the dialog.
         */
        this.maxWidth = '80vw';
        /**
         * The maximum height of the dialog.
         */
        this.maxHeight = '';
        /**
         * Data to be injected into the dialog content.
         */
        this.data = null;
        /**
         * ID of the element that describes the dialog.
         */
        this.ariaDescribedBy = null;
        /**
         * Aria label to assign to the dialog element
         */
        this.ariaLabel = null;
        /**
         * Whether the dialog should focus the first focusable element on open.
         */
        this.autoFocus = true;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @return {?}
 */
function throwDialogContentAlreadyAttachedError() {
    throw Error('Attempting to attach dialog content after content is already attached');
}
/**
 * Internal component that wraps user-provided dialog content.
 * \@docs-private
 */
class CdkDialogContainer extends BasePortalOutlet {
    /**
     * @param {?} _elementRef
     * @param {?} _focusTrapFactory
     * @param {?} _changeDetectorRef
     * @param {?} _document
     * @param {?} _config
     */
    constructor(_elementRef, _focusTrapFactory, _changeDetectorRef, _document, _config) {
        super();
        this._elementRef = _elementRef;
        this._focusTrapFactory = _focusTrapFactory;
        this._changeDetectorRef = _changeDetectorRef;
        this._document = _document;
        this._config = _config;
        /**
         * State of the dialog animation.
         */
        this._state = 'enter';
        /**
         * Element that was focused before the dialog was opened. Save this to restore upon close.
         */
        this._elementFocusedBeforeDialogWasOpened = null;
        /**
         * The class that traps and manages focus within the dialog.
         */
        this._focusTrap = this._focusTrapFactory.create(this._elementRef.nativeElement, false);
        /**
         * A subject emitting before the dialog enters the view.
         */
        this._beforeEnter = new Subject();
        /**
         * A subject emitting after the dialog enters the view.
         */
        this._afterEnter = new Subject();
        /**
         * A subject emitting before the dialog exits the view.
         */
        this._beforeExit = new Subject();
        /**
         * A subject emitting after the dialog exits the view.
         */
        this._afterExit = new Subject();
    }
    /**
     * @return {?}
     */
    get _ariaLabel() { return this._config.ariaLabel || null; }
    /**
     * @return {?}
     */
    get _ariaDescribedBy() { return this._config.ariaDescribedBy; }
    /**
     * @return {?}
     */
    get _role() { return this._config.role; }
    /**
     * @return {?}
     */
    get _tabindex() { return -1; }
    /**
     * Destroy focus trap to place focus back to the element focused before the dialog opened.
     * @return {?}
     */
    ngOnDestroy() {
        this._focusTrap.destroy();
    }
    /**
     * Attach a ComponentPortal as content to this dialog container.
     * @template T
     * @param {?} portal Portal to be attached as the dialog content.
     * @return {?}
     */
    attachComponentPortal(portal) {
        if (this._portalHost.hasAttached()) {
            throwDialogContentAlreadyAttachedError();
        }
        this._savePreviouslyFocusedElement();
        return this._portalHost.attachComponentPortal(portal);
    }
    /**
     * Attach a TemplatePortal as content to this dialog container.
     * @template C
     * @param {?} portal Portal to be attached as the dialog content.
     * @return {?}
     */
    attachTemplatePortal(portal) {
        if (this._portalHost.hasAttached()) {
            throwDialogContentAlreadyAttachedError();
        }
        this._savePreviouslyFocusedElement();
        return this._portalHost.attachTemplatePortal(portal);
    }
    /**
     * Emit lifecycle events based on animation `start` callback.
     * @param {?} event
     * @return {?}
     */
    _onAnimationStart(event) {
        if (event.toState === 'enter') {
            this._beforeEnter.next();
        }
        if (event.fromState === 'enter' && (event.toState === 'void' || event.toState === 'exit')) {
            this._beforeExit.next();
        }
    }
    /**
     * Emit lifecycle events based on animation `done` callback.
     * @param {?} event
     * @return {?}
     */
    _onAnimationDone(event) {
        if (event.toState === 'enter') {
            this._autoFocusFirstTabbableElement();
            this._afterEnter.next();
        }
        if (event.fromState === 'enter' && (event.toState === 'void' || event.toState === 'exit')) {
            this._returnFocusAfterDialog();
            this._afterExit.next();
        }
    }
    /**
     * Starts the dialog exit animation.
     * @return {?}
     */
    _startExiting() {
        this._state = 'exit';
        // Mark the container for check so it can react if the
        // view container is using OnPush change detection.
        this._changeDetectorRef.markForCheck();
    }
    /**
     * Saves a reference to the element that was focused before the dialog was opened.
     * @return {?}
     */
    _savePreviouslyFocusedElement() {
        if (this._document) {
            this._elementFocusedBeforeDialogWasOpened = /** @type {?} */ (this._document.activeElement);
            // Move focus onto the dialog immediately in order to prevent the user from accidentally
            // opening multiple dialogs at the same time. Needs to be async, because the element
            // may not be focusable immediately.
            Promise.resolve().then(() => this._elementRef.nativeElement.focus());
        }
    }
    /**
     * Autofocus the first tabbable element inside of the dialog, if there is not a tabbable element,
     * focus the dialog instead.
     * @return {?}
     */
    _autoFocusFirstTabbableElement() {
        // If were to attempt to focus immediately, then the content of the dialog would not yet be
        // ready in instances where change detection has to run first. To deal with this, we simply
        // wait for the microtask queue to be empty.
        if (this._config.autoFocus) {
            this._focusTrap.focusInitialElementWhenReady().then(hasMovedFocus => {
                // If we didn't find any focusable elements inside the dialog, focus the
                // container so the user can't tab into other elements behind it.
                if (!hasMovedFocus) {
                    this._elementRef.nativeElement.focus();
                }
            });
        }
    }
    /**
     * Returns the focus to the element focused before the dialog was open.
     * @return {?}
     */
    _returnFocusAfterDialog() {
        const /** @type {?} */ toFocus = this._elementFocusedBeforeDialogWasOpened;
        // We need the extra check, because IE can set the `activeElement` to null in some cases.
        if (toFocus && typeof toFocus.focus === 'function') {
            toFocus.focus();
        }
    }
}
CdkDialogContainer.decorators = [
    { type: Component, args: [{selector: 'cdk-dialog-container',
                template: "<ng-template cdkPortalOutlet></ng-template>",
                styles: ["cdk-dialog-container{background:#fff;border-radius:5px;display:block;padding:10px}"],
                encapsulation: ViewEncapsulation.None,
                // Using OnPush for dialogs caused some G3 sync issues. Disabled until we can track them down.
                // tslint:disable-next-line:validate-decorators
                changeDetection: ChangeDetectionStrategy.Default,
                animations: [
                    trigger('dialog', [
                        state('enter', style({ opacity: 1 })),
                        state('exit, void', style({ opacity: 0 })),
                        transition('* => *', animate(225)),
                    ])
                ],
                host: {
                    '[@dialog]': '_state',
                    '(@dialog.start)': '_onAnimationStart($event)',
                    '(@dialog.done)': '_onAnimationDone($event)',
                },
            },] },
];
/** @nocollapse */
CdkDialogContainer.ctorParameters = () => [
    { type: ElementRef, },
    { type: FocusTrapFactory, },
    { type: ChangeDetectorRef, },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [DOCUMENT,] },] },
    { type: DialogConfig, },
];
CdkDialogContainer.propDecorators = {
    "_ariaLabel": [{ type: HostBinding, args: ['attr.aria-label',] },],
    "_ariaDescribedBy": [{ type: HostBinding, args: ['attr.aria-describedby',] },],
    "_role": [{ type: HostBinding, args: ['attr.role',] },],
    "_tabindex": [{ type: HostBinding, args: ['attr.tabindex',] },],
    "_portalHost": [{ type: ViewChild, args: [PortalHostDirective,] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Unique id for the created dialog.
 */
let /** @type {?} */ uniqueId = 0;
/**
 * Reference to a dialog opened via the Dialog service.
 * @template T, R
 */
class DialogRef {
    /**
     * @param {?} _overlayRef
     * @param {?} _containerInstance
     * @param {?=} id
     */
    constructor(_overlayRef, _containerInstance, id = `dialog-${uniqueId++}`) {
        this._overlayRef = _overlayRef;
        this._containerInstance = _containerInstance;
        this.id = id;
        // If the dialog has a backdrop, handle clicks from the backdrop.
        if (_containerInstance._config.hasBackdrop) {
            _overlayRef.backdropClick().subscribe(() => {
                if (!this.disableClose) {
                    this.close();
                }
            });
        }
        this.beforeClosed().subscribe(() => {
            this._overlayRef.detachBackdrop();
        });
        this.afterClosed().subscribe(() => {
            this._overlayRef.detach();
            this._overlayRef.dispose();
            this.componentInstance = /** @type {?} */ ((null));
        });
        // Close when escape keydown event occurs
        _overlayRef.keydownEvents()
            .pipe(filter(event => event.keyCode === ESCAPE && !this.disableClose))
            .subscribe(() => this.close());
    }
    /**
     * Gets an observable that emits when the overlay's backdrop has been clicked.
     * @return {?}
     */
    backdropClick() {
        return this._overlayRef.backdropClick();
    }
    /**
     * Close the dialog.
     * @param {?=} dialogResult Optional result to return to the dialog opener.
     * @return {?}
     */
    close(dialogResult) {
        this._result = dialogResult;
        this._containerInstance._startExiting();
    }
    /**
     * Updates the dialog's position.
     * @param {?=} position New dialog position.
     * @return {?}
     */
    updatePosition(position) {
        let /** @type {?} */ strategy = this._getPositionStrategy();
        if (position && (position.left || position.right)) {
            position.left ? strategy.left(position.left) : strategy.right(position.right);
        }
        else {
            strategy.centerHorizontally();
        }
        if (position && (position.top || position.bottom)) {
            position.top ? strategy.top(position.top) : strategy.bottom(position.bottom);
        }
        else {
            strategy.centerVertically();
        }
        this._overlayRef.updatePosition();
        return this;
    }
    /**
     * Gets an observable that emits when keydown events are targeted on the overlay.
     * @return {?}
     */
    keydownEvents() {
        return this._overlayRef.keydownEvents();
    }
    /**
     * Updates the dialog's width and height, defined, min and max.
     * @param {?} size New size for the overlay.
     * @return {?}
     */
    updateSize(size) {
        if (size.width) {
            this._getPositionStrategy().width(size.width.toString());
        }
        if (size.height) {
            this._getPositionStrategy().height(size.height.toString());
        }
        this._overlayRef.updateSize(size);
        this._overlayRef.updatePosition();
        return this;
    }
    /**
     * Fetches the position strategy object from the overlay ref.
     * @return {?}
     */
    _getPositionStrategy() {
        return /** @type {?} */ (this._overlayRef.getConfig().positionStrategy);
    }
    /**
     * Gets an observable that emits when dialog begins opening.
     * @return {?}
     */
    beforeOpened() {
        return this._containerInstance._beforeEnter.asObservable();
    }
    /**
     * Gets an observable that emits when dialog is finished opening.
     * @return {?}
     */
    afterOpened() {
        return this._containerInstance._afterEnter.asObservable();
    }
    /**
     * Gets an observable that emits when dialog begins closing.
     * @return {?}
     */
    beforeClosed() {
        return this._containerInstance._beforeExit.pipe(map(() => this._result));
    }
    /**
     * Gets an observable that emits when dialog is finished closing.
     * @return {?}
     */
    afterClosed() {
        return this._containerInstance._afterExit.pipe(map(() => this._result));
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Injection token for the Dialog's ScrollStrategy.
 */
const /** @type {?} */ DIALOG_SCROLL_STRATEGY = new InjectionToken('DialogScrollStrategy');
/**
 * Injection token for the Dialog's Data.
 */
const /** @type {?} */ DIALOG_DATA = new InjectionToken('DialogData');
/**
 * Injection token for the DialogRef constructor.
 */
const /** @type {?} */ DIALOG_REF = new InjectionToken('DialogRef');
/**
 * Injection token for the DialogConfig.
 */
const /** @type {?} */ DIALOG_CONFIG = new InjectionToken('DialogConfig');
/**
 * Injection token for the Dialog's DialogContainer component.
 */
const /** @type {?} */ DIALOG_CONTAINER = new InjectionToken('DialogContainer');
/**
 * \@docs-private
 * @param {?} overlay
 * @return {?}
 */
function MAT_DIALOG_SCROLL_STRATEGY_PROVIDER_FACTORY(overlay) {
    return () => overlay.scrollStrategies.block();
}
/**
 * \@docs-private
 */
const /** @type {?} */ MAT_DIALOG_SCROLL_STRATEGY_PROVIDER = {
    provide: DIALOG_SCROLL_STRATEGY,
    deps: [Overlay],
    useFactory: MAT_DIALOG_SCROLL_STRATEGY_PROVIDER_FACTORY,
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Service to open modal dialogs.
 */
class Dialog {
    /**
     * @param {?} overlay
     * @param {?} injector
     * @param {?} dialogRefConstructor
     * @param {?} _scrollStrategy
     * @param {?} _parentDialog
     * @param {?} location
     */
    constructor(overlay, injector, dialogRefConstructor, _scrollStrategy, _parentDialog, location) {
        this.overlay = overlay;
        this.injector = injector;
        this.dialogRefConstructor = dialogRefConstructor;
        this._scrollStrategy = _scrollStrategy;
        this._parentDialog = _parentDialog;
        this._afterAllClosedBase = new Subject();
        this.afterAllClosed = defer(() => this.openDialogs.length ?
            this._afterAllClosed : this._afterAllClosed.pipe(startWith(undefined)));
        this._afterOpened = new Subject();
        this._openDialogs = [];
        // Close all of the dialogs when the user goes forwards/backwards in history or when the
        // location hash changes. Note that this usually doesn't include clicking on links (unless
        // the user is using the `HashLocationStrategy`).
        if (!_parentDialog && location) {
            location.subscribe(() => this.closeAll());
        }
    }
    /**
     * Stream that emits when all dialogs are closed.
     * @return {?}
     */
    get _afterAllClosed() {
        return this._parentDialog ? this._parentDialog.afterAllClosed : this._afterAllClosedBase;
    }
    /**
     * Stream that emits when a dialog is opened.
     * @return {?}
     */
    get afterOpened() {
        return this._parentDialog ? this._parentDialog.afterOpened : this._afterOpened;
    }
    /**
     * Stream that emits when a dialog is opened.
     * @return {?}
     */
    get openDialogs() {
        return this._parentDialog ? this._parentDialog.openDialogs : this._openDialogs;
    }
    /**
     * Gets an open dialog by id.
     * @param {?} id
     * @return {?}
     */
    getById(id) {
        return this._openDialogs.find(ref => ref.id === id);
    }
    /**
     * Closes all open dialogs.
     * @return {?}
     */
    closeAll() {
        this.openDialogs.forEach(ref => ref.close());
    }
    /**
     * Opens a dialog from a component.
     * @template T
     * @param {?} component
     * @param {?=} config
     * @return {?}
     */
    openFromComponent(component, config) {
        config = this._applyConfigDefaults(config);
        if (config.id && this.getById(config.id)) {
            throw Error(`Dialog with id "${config.id}" exists already. The dialog id must be unique.`);
        }
        const /** @type {?} */ overlayRef = this._createOverlay(config);
        const /** @type {?} */ dialogContainer = this._attachDialogContainer(overlayRef, config);
        const /** @type {?} */ dialogRef = this._attachDialogContentForComponent(component, dialogContainer, overlayRef, config);
        this.registerDialogRef(dialogRef);
        return dialogRef;
    }
    /**
     * Opens a dialog from a template.
     * @template T
     * @param {?} template
     * @param {?=} config
     * @return {?}
     */
    openFromTemplate(template, config) {
        config = this._applyConfigDefaults(config);
        if (config.id && this.getById(config.id)) {
            throw Error(`Dialog with id "${config.id}" exists already. The dialog id must be unique.`);
        }
        const /** @type {?} */ overlayRef = this._createOverlay(config);
        const /** @type {?} */ dialogContainer = this._attachDialogContainer(overlayRef, config);
        const /** @type {?} */ dialogRef = this._attachDialogContentForTemplate(template, dialogContainer, overlayRef, config);
        this.registerDialogRef(dialogRef);
        return dialogRef;
    }
    /**
     * Forwards emitting events for when dialogs are opened and all dialogs are closed.
     * @param {?} dialogRef
     * @return {?}
     */
    registerDialogRef(dialogRef) {
        this.openDialogs.push(dialogRef);
        const /** @type {?} */ dialogOpenSub = dialogRef.afterOpened().subscribe(() => {
            this.afterOpened.next(dialogRef);
            dialogOpenSub.unsubscribe();
        });
        const /** @type {?} */ dialogCloseSub = dialogRef.afterClosed().subscribe(() => {
            let /** @type {?} */ dialogIndex = this._openDialogs.indexOf(dialogRef);
            if (dialogIndex > -1) {
                this._openDialogs.splice(dialogIndex, 1);
            }
            if (!this._openDialogs.length) {
                this._afterAllClosedBase.next();
                dialogCloseSub.unsubscribe();
            }
        });
    }
    /**
     * Creates an overlay config from a dialog config.
     * @param {?} config The dialog configuration.
     * @return {?} The overlay configuration.
     */
    _createOverlay(config) {
        const /** @type {?} */ overlayConfig = new OverlayConfig({
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
    }
    /**
     * Attaches an MatDialogContainer to a dialog's already-created overlay.
     * @param {?} overlay Reference to the dialog's underlying overlay.
     * @param {?} config The dialog configuration.
     * @return {?} A promise resolving to a ComponentRef for the attached container.
     */
    _attachDialogContainer(overlay, config) {
        const /** @type {?} */ container = config.containerComponent || this.injector.get(DIALOG_CONTAINER);
        const /** @type {?} */ userInjector = config && config.viewContainerRef && config.viewContainerRef.injector;
        const /** @type {?} */ injector = new PortalInjector(userInjector || this.injector, new WeakMap([
            [DialogConfig, config]
        ]));
        const /** @type {?} */ containerPortal = new ComponentPortal(container, config.viewContainerRef, injector);
        const /** @type {?} */ containerRef = overlay.attach(containerPortal);
        containerRef.instance._config = config;
        return containerRef.instance;
    }
    /**
     * Attaches the user-provided component to the already-created MatDialogContainer.
     * @template T
     * @param {?} componentOrTemplateRef The type of component being loaded into the dialog,
     *     or a TemplateRef to instantiate as the content.
     * @param {?} dialogContainer Reference to the wrapping MatDialogContainer.
     * @param {?} overlayRef Reference to the overlay in which the dialog resides.
     * @param {?} config The dialog configuration.
     * @return {?} A promise resolving to the MatDialogRef that should be returned to the user.
     */
    _attachDialogContentForComponent(componentOrTemplateRef, dialogContainer, overlayRef, config) {
        // Create a reference to the dialog we're creating in order to give the user a handle
        // to modify and close it.
        const /** @type {?} */ dialogRef = new this.dialogRefConstructor(overlayRef, dialogContainer, config.id);
        const /** @type {?} */ injector = this._createInjector(config, dialogRef, dialogContainer);
        const /** @type {?} */ contentRef = dialogContainer.attachComponentPortal(new ComponentPortal(componentOrTemplateRef, undefined, injector));
        dialogRef.componentInstance = contentRef.instance;
        dialogRef.updateSize({ width: config.width, height: config.height })
            .updatePosition(config.position);
        return dialogRef;
    }
    /**
     * Attaches the user-provided component to the already-created MatDialogContainer.
     * @template T
     * @param {?} componentOrTemplateRef The type of component being loaded into the dialog,
     *     or a TemplateRef to instantiate as the content.
     * @param {?} dialogContainer Reference to the wrapping MatDialogContainer.
     * @param {?} overlayRef Reference to the overlay in which the dialog resides.
     * @param {?} config The dialog configuration.
     * @return {?} A promise resolving to the MatDialogRef that should be returned to the user.
     */
    _attachDialogContentForTemplate(componentOrTemplateRef, dialogContainer, overlayRef, config) {
        // Create a reference to the dialog we're creating in order to give the user a handle
        // to modify and close it.
        const /** @type {?} */ dialogRef = new this.dialogRefConstructor(overlayRef, dialogContainer, config.id);
        dialogContainer.attachTemplatePortal(new TemplatePortal(componentOrTemplateRef, /** @type {?} */ ((null)), /** @type {?} */ ({ $implicit: config.data, dialogRef })));
        dialogRef.updateSize({ width: config.width, height: config.height })
            .updatePosition(config.position);
        return dialogRef;
    }
    /**
     * Creates a custom injector to be used inside the dialog. This allows a component loaded inside
     * of a dialog to close itself and, optionally, to return a value.
     * @template T
     * @param {?} config Config object that is used to construct the dialog.
     * @param {?} dialogRef Reference to the dialog.
     * @param {?} dialogContainer
     * @return {?} The custom injector that can be used inside the dialog.
     */
    _createInjector(config, dialogRef, dialogContainer) {
        const /** @type {?} */ userInjector = config && config.viewContainerRef && config.viewContainerRef.injector;
        const /** @type {?} */ injectionTokens = new WeakMap([
            [this.injector.get(DIALOG_REF), dialogRef],
            [this.injector.get(DIALOG_CONTAINER), dialogContainer],
            [DIALOG_DATA, config.data]
        ]);
        if (config.direction &&
            (!userInjector || !userInjector.get(Directionality, null))) {
            injectionTokens.set(Directionality, {
                value: config.direction,
                change: of()
            });
        }
        return new PortalInjector(userInjector || this.injector, injectionTokens);
    }
    /**
     * Expands the provided configuration object to include the default values for properties which
     * are undefined.
     * @param {?=} config
     * @return {?}
     */
    _applyConfigDefaults(config) {
        const /** @type {?} */ dialogConfig = /** @type {?} */ (this.injector.get(DIALOG_CONFIG));
        return Object.assign({}, new dialogConfig(), config);
    }
}
Dialog.decorators = [
    { type: Injectable },
];
/** @nocollapse */
Dialog.ctorParameters = () => [
    { type: Overlay, },
    { type: Injector, },
    { type: undefined, decorators: [{ type: Inject, args: [DIALOG_REF,] },] },
    { type: undefined, decorators: [{ type: Inject, args: [DIALOG_SCROLL_STRATEGY,] },] },
    { type: Dialog, decorators: [{ type: Optional }, { type: SkipSelf },] },
    { type: Location, decorators: [{ type: Optional },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const ɵ0 = DialogRef, ɵ1 = CdkDialogContainer, ɵ2 = DialogConfig;
class DialogModule {
}
DialogModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    OverlayModule,
                    PortalModule,
                    A11yModule,
                ],
                exports: [
                    CdkDialogContainer,
                ],
                declarations: [
                    CdkDialogContainer,
                ],
                providers: [
                    Dialog,
                    MAT_DIALOG_SCROLL_STRATEGY_PROVIDER,
                    { provide: DIALOG_REF, useValue: ɵ0 },
                    { provide: DIALOG_CONTAINER, useValue: ɵ1 },
                    { provide: DIALOG_CONFIG, useValue: ɵ2 },
                ],
                entryComponents: [CdkDialogContainer],
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

export { throwDialogContentAlreadyAttachedError, CdkDialogContainer, DialogConfig, DialogRef, Dialog, DialogModule, DIALOG_SCROLL_STRATEGY, DIALOG_DATA, DIALOG_REF, DIALOG_CONFIG, DIALOG_CONTAINER, MAT_DIALOG_SCROLL_STRATEGY_PROVIDER_FACTORY, MAT_DIALOG_SCROLL_STRATEGY_PROVIDER };
//# sourceMappingURL=dialog.js.map
