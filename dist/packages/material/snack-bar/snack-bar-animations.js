"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var animations_1 = require("@angular/animations");
var core_1 = require("@angular/material/core");
/** Animations used by the Material snack bar. */
exports.matSnackBarAnimations = {
    /** Animation that slides the dialog in and out of view and fades the opacity. */
    contentFade: animations_1.trigger('contentFade', [
        animations_1.transition(':enter', [
            animations_1.style({ opacity: '0' }),
            animations_1.animate(core_1.AnimationDurations.COMPLEX + " " + core_1.AnimationCurves.STANDARD_CURVE)
        ])
    ]),
    /** Animation that shows and hides a snack bar. */
    snackBarState: animations_1.trigger('state', [
        animations_1.state('visible-top, visible-bottom', animations_1.style({ transform: 'translateY(0%)' })),
        animations_1.transition('visible-top => hidden-top, visible-bottom => hidden-bottom', animations_1.animate(core_1.AnimationDurations.EXITING + " " + core_1.AnimationCurves.ACCELERATION_CURVE)),
        animations_1.transition('void => visible-top, void => visible-bottom', animations_1.animate(core_1.AnimationDurations.ENTERING + " " + core_1.AnimationCurves.DECELERATION_CURVE)),
    ])
};
//# sourceMappingURL=snack-bar-animations.js.map