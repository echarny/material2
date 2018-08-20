"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var animations_1 = require("@angular/animations");
/** Animations used by MatTooltip. */
exports.matTooltipAnimations = {
    /** Animation that transitions a tooltip in and out. */
    tooltipState: animations_1.trigger('state', [
        animations_1.state('initial, void, hidden', animations_1.style({ opacity: 0, transform: 'scale(0)' })),
        animations_1.state('visible', animations_1.style({ transform: 'scale(1)' })),
        animations_1.transition('* => visible', animations_1.animate('200ms cubic-bezier(0, 0, 0.2, 1)', animations_1.keyframes([
            animations_1.style({ opacity: 0, transform: 'scale(0)', offset: 0 }),
            animations_1.style({ opacity: 0.5, transform: 'scale(0.99)', offset: 0.5 }),
            animations_1.style({ opacity: 1, transform: 'scale(1)', offset: 1 })
        ]))),
        animations_1.transition('* => hidden', animations_1.animate('100ms cubic-bezier(0, 0, 0.2, 1)', animations_1.style({ opacity: 0 }))),
    ])
};
//# sourceMappingURL=tooltip-animations.js.map