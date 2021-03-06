/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { animate, state, style, transition, trigger, } from '@angular/animations';
import { AnimationCurves, AnimationDurations } from '@angular/material/core';
/**
 * Animations used by the Material snack bar.
 */
export var /** @type {?} */ matSnackBarAnimations = {
    /** Animation that slides the dialog in and out of view and fades the opacity. */
    contentFade: trigger('contentFade', [
        transition(':enter', [
            style({ opacity: '0' }),
            animate(AnimationDurations.COMPLEX + " " + AnimationCurves.STANDARD_CURVE)
        ])
    ]),
    /** Animation that shows and hides a snack bar. */
    snackBarState: trigger('state', [
        state('visible-top, visible-bottom', style({ transform: 'translateY(0%)' })),
        transition('visible-top => hidden-top, visible-bottom => hidden-bottom', animate(AnimationDurations.EXITING + " " + AnimationCurves.ACCELERATION_CURVE)),
        transition('void => visible-top, void => visible-bottom', animate(AnimationDurations.ENTERING + " " + AnimationCurves.DECELERATION_CURVE)),
    ])
};
//# sourceMappingURL=snack-bar-animations.js.map