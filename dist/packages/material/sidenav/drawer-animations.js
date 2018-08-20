"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var animations_1 = require("@angular/animations");
/** Animations used by the Material drawers. */
exports.matDrawerAnimations = {
    /** Animation that slides a drawer in and out. */
    transformDrawer: animations_1.trigger('transform', [
        animations_1.state('open, open-instant', animations_1.style({
            'transform': 'translate3d(0, 0, 0)',
            'visibility': 'visible',
        })),
        animations_1.state('void', animations_1.style({
            // Avoids the shadow showing up when closed in SSR.
            'box-shadow': 'none',
            'visibility': 'hidden',
        })),
        animations_1.transition('void => open-instant', animations_1.animate('0ms')),
        animations_1.transition('void <=> open, open-instant => void', animations_1.animate('400ms cubic-bezier(0.25, 0.8, 0.25, 1)'))
    ])
};
//# sourceMappingURL=drawer-animations.js.map