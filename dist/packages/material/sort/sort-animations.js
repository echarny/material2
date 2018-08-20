"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var animations_1 = require("@angular/animations");
var core_1 = require("@angular/material/core");
var SORT_ANIMATION_TRANSITION = core_1.AnimationDurations.ENTERING + ' ' +
    core_1.AnimationCurves.STANDARD_CURVE;
/** Animations used by MatSort. */
exports.matSortAnimations = {
    /** Animation that moves the sort indicator. */
    indicator: animations_1.trigger('indicator', [
        animations_1.state('active-asc, asc', animations_1.style({ transform: 'translateY(0px)' })),
        // 10px is the height of the sort indicator, minus the width of the pointers
        // 10px is the height of the sort indicator, minus the width of the pointers
        animations_1.state('active-desc, desc', animations_1.style({ transform: 'translateY(10px)' })),
        animations_1.transition('active-asc <=> active-desc', animations_1.animate(SORT_ANIMATION_TRANSITION))
    ]),
    /** Animation that rotates the left pointer of the indicator based on the sorting direction. */
    leftPointer: animations_1.trigger('leftPointer', [
        animations_1.state('active-asc, asc', animations_1.style({ transform: 'rotate(-45deg)' })),
        animations_1.state('active-desc, desc', animations_1.style({ transform: 'rotate(45deg)' })),
        animations_1.transition('active-asc <=> active-desc', animations_1.animate(SORT_ANIMATION_TRANSITION))
    ]),
    /** Animation that rotates the right pointer of the indicator based on the sorting direction. */
    rightPointer: animations_1.trigger('rightPointer', [
        animations_1.state('active-asc, asc', animations_1.style({ transform: 'rotate(45deg)' })),
        animations_1.state('active-desc, desc', animations_1.style({ transform: 'rotate(-45deg)' })),
        animations_1.transition('active-asc <=> active-desc', animations_1.animate(SORT_ANIMATION_TRANSITION))
    ]),
    /** Animation that controls the arrow opacity. */
    arrowOpacity: animations_1.trigger('arrowOpacity', [
        animations_1.state('desc-to-active, asc-to-active, active', animations_1.style({ opacity: 1 })),
        animations_1.state('desc-to-hint, asc-to-hint, hint', animations_1.style({ opacity: .54 })),
        animations_1.state('hint-to-desc, active-to-desc, desc, hint-to-asc, active-to-asc, asc, void', animations_1.style({ opacity: 0 })),
        // Transition between all states except for immediate transitions
        // Transition between all states except for immediate transitions
        animations_1.transition('* => asc, * => desc, * => active, * => hint, * => void', animations_1.animate('0ms')),
        animations_1.transition('* <=> *', animations_1.animate(SORT_ANIMATION_TRANSITION)),
    ]),
    /**
       * Animation for the translation of the arrow as a whole. States are separated into two
       * groups: ones with animations and others that are immediate. Immediate states are asc, desc,
       * peek, and active. The other states define a specific animation (source-to-destination)
       * and are determined as a function of their prev user-perceived state and what the next state
       * should be.
       */
    arrowPosition: animations_1.trigger('arrowPosition', [
        // Hidden Above => Hint Center
        // Hidden Above => Hint Center
        animations_1.transition('* => desc-to-hint, * => desc-to-active', animations_1.animate(SORT_ANIMATION_TRANSITION, animations_1.keyframes([
            animations_1.style({ transform: 'translateY(-25%)' }),
            animations_1.style({ transform: 'translateY(0)' })
        ]))),
        // Hint Center => Hidden Below
        // Hint Center => Hidden Below
        animations_1.transition('* => hint-to-desc, * => active-to-desc', animations_1.animate(SORT_ANIMATION_TRANSITION, animations_1.keyframes([
            animations_1.style({ transform: 'translateY(0)' }),
            animations_1.style({ transform: 'translateY(25%)' })
        ]))),
        // Hidden Below => Hint Center
        // Hidden Below => Hint Center
        animations_1.transition('* => asc-to-hint, * => asc-to-active', animations_1.animate(SORT_ANIMATION_TRANSITION, animations_1.keyframes([
            animations_1.style({ transform: 'translateY(25%)' }),
            animations_1.style({ transform: 'translateY(0)' })
        ]))),
        // Hint Center => Hidden Above
        // Hint Center => Hidden Above
        animations_1.transition('* => hint-to-asc, * => active-to-asc', animations_1.animate(SORT_ANIMATION_TRANSITION, animations_1.keyframes([
            animations_1.style({ transform: 'translateY(0)' }),
            animations_1.style({ transform: 'translateY(-25%)' })
        ]))),
        animations_1.state('desc-to-hint, asc-to-hint, hint, desc-to-active, asc-to-active, active', animations_1.style({ transform: 'translateY(0)' })),
        animations_1.state('hint-to-desc, active-to-desc, desc', animations_1.style({ transform: 'translateY(-25%)' })),
        animations_1.state('hint-to-asc, active-to-asc, asc', animations_1.style({ transform: 'translateY(25%)' })),
    ]),
    /** Necessary trigger that calls animate on children animations. */
    allowChildren: animations_1.trigger('allowChildren', [
        animations_1.transition('* <=> *', [
            animations_1.query('@*', animations_1.animateChild(), { optional: true })
        ])
    ]),
};
//# sourceMappingURL=sort-animations.js.map