"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var animations_1 = require("@angular/animations");
/** Animations used by the Material tabs. */
exports.matTabsAnimations = {
    /** Animation translates a tab along the X axis. */
    translateTab: animations_1.trigger('translateTab', [
        // Note: transitions to `none` instead of 0, because some browsers might blur the content.
        // Note: transitions to `none` instead of 0, because some browsers might blur the content.
        animations_1.state('center, void, left-origin-center, right-origin-center', animations_1.style({ transform: 'none' })),
        // If the tab is either on the left or right, we additionally add a `min-height` of 1px
        // in order to ensure that the element has a height before its state changes. This is
        // necessary because Chrome does seem to skip the transition in RTL mode if the element does
        // not have a static height and is not rendered. See related issue: #9465
        // If the tab is either on the left or right, we additionally add a `min-height` of 1px
        // in order to ensure that the element has a height before its state changes. This is
        // necessary because Chrome does seem to skip the transition in RTL mode if the element does
        // not have a static height and is not rendered. See related issue: #9465
        animations_1.state('left', animations_1.style({ transform: 'translate3d(-100%, 0, 0)', minHeight: '1px' })),
        animations_1.state('right', animations_1.style({ transform: 'translate3d(100%, 0, 0)', minHeight: '1px' })),
        animations_1.transition('* => left, * => right, left => center, right => center', animations_1.animate('500ms cubic-bezier(0.35, 0, 0.25, 1)')),
        animations_1.transition('void => left-origin-center', [
            animations_1.style({ transform: 'translate3d(-100%, 0, 0)' }),
            animations_1.animate('500ms cubic-bezier(0.35, 0, 0.25, 1)')
        ]),
        animations_1.transition('void => right-origin-center', [
            animations_1.style({ transform: 'translate3d(100%, 0, 0)' }),
            animations_1.animate('500ms cubic-bezier(0.35, 0, 0.25, 1)')
        ])
    ])
};
//# sourceMappingURL=tabs-animations.js.map