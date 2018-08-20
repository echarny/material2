/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { TemplateRef, Injector } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { DialogRef } from './dialog-ref';
import { Location } from '@angular/common';
import { DialogConfig } from './dialog-config';
import { CdkDialogContainer } from './dialog-container';
import { ComponentType, Overlay, OverlayRef } from '@angular/cdk/overlay';
/**
 * Service to open modal dialogs.
 */
export declare class Dialog {
    private overlay;
    private injector;
    private dialogRefConstructor;
    private _scrollStrategy;
    private _parentDialog;
    /** Stream that emits when all dialogs are closed. */
    readonly _afterAllClosed: Observable<void>;
    _afterAllClosedBase: Subject<void>;
    afterAllClosed: Observable<void>;
    /** Stream that emits when a dialog is opened. */
    readonly afterOpened: Subject<DialogRef<any>>;
    _afterOpened: Subject<DialogRef<any>>;
    /** Stream that emits when a dialog is opened. */
    readonly openDialogs: DialogRef<any>[];
    _openDialogs: DialogRef<any>[];
    constructor(overlay: Overlay, injector: Injector, dialogRefConstructor: any, _scrollStrategy: any, _parentDialog: Dialog, location: Location);
    /** Gets an open dialog by id. */
    getById(id: string): DialogRef<any> | undefined;
    /** Closes all open dialogs. */
    closeAll(): void;
    /** Opens a dialog from a component. */
    openFromComponent<T>(component: ComponentType<T>, config?: DialogConfig): DialogRef<any>;
    /** Opens a dialog from a template. */
    openFromTemplate<T>(template: TemplateRef<T>, config?: DialogConfig): DialogRef<any>;
    /**
     * Forwards emitting events for when dialogs are opened and all dialogs are closed.
     */
    private registerDialogRef(dialogRef);
    /**
     * Creates an overlay config from a dialog config.
     * @param config The dialog configuration.
     * @returns The overlay configuration.
     */
    protected _createOverlay(config: DialogConfig): OverlayRef;
    /**
     * Attaches an MatDialogContainer to a dialog's already-created overlay.
     * @param overlay Reference to the dialog's underlying overlay.
     * @param config The dialog configuration.
     * @returns A promise resolving to a ComponentRef for the attached container.
     */
    protected _attachDialogContainer(overlay: OverlayRef, config: DialogConfig): CdkDialogContainer;
    /**
     * Attaches the user-provided component to the already-created MatDialogContainer.
     * @param componentOrTemplateRef The type of component being loaded into the dialog,
     *     or a TemplateRef to instantiate as the content.
     * @param dialogContainer Reference to the wrapping MatDialogContainer.
     * @param overlayRef Reference to the overlay in which the dialog resides.
     * @param config The dialog configuration.
     * @returns A promise resolving to the MatDialogRef that should be returned to the user.
     */
    protected _attachDialogContentForComponent<T>(componentOrTemplateRef: ComponentType<T>, dialogContainer: CdkDialogContainer, overlayRef: OverlayRef, config: DialogConfig): DialogRef<any>;
    /**
     * Attaches the user-provided component to the already-created MatDialogContainer.
     * @param componentOrTemplateRef The type of component being loaded into the dialog,
     *     or a TemplateRef to instantiate as the content.
     * @param dialogContainer Reference to the wrapping MatDialogContainer.
     * @param overlayRef Reference to the overlay in which the dialog resides.
     * @param config The dialog configuration.
     * @returns A promise resolving to the MatDialogRef that should be returned to the user.
     */
    protected _attachDialogContentForTemplate<T>(componentOrTemplateRef: TemplateRef<T>, dialogContainer: CdkDialogContainer, overlayRef: OverlayRef, config: DialogConfig): DialogRef<any>;
    /**
     * Creates a custom injector to be used inside the dialog. This allows a component loaded inside
     * of a dialog to close itself and, optionally, to return a value.
     * @param config Config object that is used to construct the dialog.
     * @param dialogRef Reference to the dialog.
     * @param container Dialog container element that wraps all of the contents.
     * @returns The custom injector that can be used inside the dialog.
     */
    private _createInjector<T>(config, dialogRef, dialogContainer);
    /**
     * Expands the provided configuration object to include the default values for properties which
     * are undefined.
     */
    private _applyConfigDefaults(config?);
}
