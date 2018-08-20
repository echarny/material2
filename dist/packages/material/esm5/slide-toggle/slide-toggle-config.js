/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { InjectionToken } from '@angular/core';
/**
 * Default `mat-slide-toggle` options that can be overridden.
 * @record
 */
export function MatSlideToggleDefaultOptions() { }
function MatSlideToggleDefaultOptions_tsickle_Closure_declarations() {
    /**
     * Whether toggle action triggers value changes in slide toggle.
     * @type {?|undefined}
     */
    MatSlideToggleDefaultOptions.prototype.disableToggleValue;
    /**
     * Whether drag action triggers value changes in slide toggle.
     * @type {?|undefined}
     */
    MatSlideToggleDefaultOptions.prototype.disableDragValue;
}
/**
 * Injection token to be used to override the default options for `mat-slide-toggle`.
 */
export var /** @type {?} */ MAT_SLIDE_TOGGLE_DEFAULT_OPTIONS = new InjectionToken('mat-slide-toggle-default-options', {
    providedIn: 'root',
    factory: function () { return ({ disableToggleValue: false, disableDragValue: false }); }
});
//# sourceMappingURL=slide-toggle-config.js.map