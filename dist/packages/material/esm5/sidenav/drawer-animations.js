/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { animate, state, style, transition, trigger, } from '@angular/animations';
/**
 * Animations used by the Material drawers.
 */
export var /** @type {?} */ matDrawerAnimations = {
    /** Animation that slides a drawer in and out. */
    transformDrawer: trigger('transform', [
        state('open, open-instant', style({
            'transform': 'translate3d(0, 0, 0)',
            'visibility': 'visible',
        })),
        state('void', style({
            // Avoids the shadow showing up when closed in SSR.
            'box-shadow': 'none',
            'visibility': 'hidden',
        })),
        transition('void => open-instant', animate('0ms')),
        transition('void <=> open, open-instant => void', animate('400ms cubic-bezier(0.25, 0.8, 0.25, 1)'))
    ])
};
//# sourceMappingURL=drawer-animations.js.map