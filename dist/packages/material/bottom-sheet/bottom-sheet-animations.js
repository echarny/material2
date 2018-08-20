"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var animations_1 = require("@angular/animations");
var core_1 = require("@angular/material/core");
/** Animations used by the Material bottom sheet. */
exports.matBottomSheetAnimations = {
    /** Animation that shows and hides a bottom sheet. */
    bottomSheetState: animations_1.trigger('state', [
        animations_1.state('void, hidden', animations_1.style({ transform: 'translateY(100%)' })),
        animations_1.state('visible', animations_1.style({ transform: 'translateY(0%)' })),
        animations_1.transition('visible => void, visible => hidden', animations_1.animate(core_1.AnimationDurations.COMPLEX + " " + core_1.AnimationCurves.ACCELERATION_CURVE)),
        animations_1.transition('void => visible', animations_1.animate(core_1.AnimationDurations.EXITING + " " + core_1.AnimationCurves.DECELERATION_CURVE)),
    ])
};
//# sourceMappingURL=bottom-sheet-animations.js.map