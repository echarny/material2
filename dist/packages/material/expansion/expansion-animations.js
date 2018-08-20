"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var animations_1 = require("@angular/animations");
/** Time and timing curve for expansion panel animations. */
exports.EXPANSION_PANEL_ANIMATION_TIMING = '225ms cubic-bezier(0.4,0.0,0.2,1)';
/** Animations used by the Material expansion panel. */
exports.matExpansionAnimations = {
    /** Animation that rotates the indicator arrow. */
    indicatorRotate: animations_1.trigger('indicatorRotate', [
        animations_1.state('collapsed', animations_1.style({ transform: 'rotate(0deg)' })),
        animations_1.state('expanded', animations_1.style({ transform: 'rotate(180deg)' })),
        animations_1.transition('expanded <=> collapsed', animations_1.animate(exports.EXPANSION_PANEL_ANIMATION_TIMING)),
    ]),
    /** Animation that expands and collapses the panel header height. */
    expansionHeaderHeight: animations_1.trigger('expansionHeight', [
        animations_1.state('collapsed', animations_1.style({
            height: '{{collapsedHeight}}',
        }), {
            params: { collapsedHeight: '48px' },
        }),
        animations_1.state('expanded', animations_1.style({
            height: '{{expandedHeight}}'
        }), {
            params: { expandedHeight: '64px' }
        }),
        animations_1.transition('expanded <=> collapsed', animations_1.group([
            animations_1.query('@indicatorRotate', animations_1.animateChild(), { optional: true }),
            animations_1.animate(exports.EXPANSION_PANEL_ANIMATION_TIMING),
        ])),
    ]),
    /** Animation that expands and collapses the panel content. */
    bodyExpansion: animations_1.trigger('bodyExpansion', [
        animations_1.state('collapsed', animations_1.style({ height: '0px', visibility: 'hidden' })),
        animations_1.state('expanded', animations_1.style({ height: '*', visibility: 'visible' })),
        animations_1.transition('expanded <=> collapsed', animations_1.animate(exports.EXPANSION_PANEL_ANIMATION_TIMING)),
    ])
};
//# sourceMappingURL=expansion-animations.js.map