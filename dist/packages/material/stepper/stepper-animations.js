"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var animations_1 = require("@angular/animations");
/** Animations used by the Material steppers. */
exports.matStepperAnimations = {
    /** Animation that transitions the step along the X axis in a horizontal stepper. */
    horizontalStepTransition: animations_1.trigger('stepTransition', [
        animations_1.state('previous', animations_1.style({ transform: 'translate3d(-100%, 0, 0)', visibility: 'hidden' })),
        animations_1.state('current', animations_1.style({ transform: 'none', visibility: 'visible' })),
        animations_1.state('next', animations_1.style({ transform: 'translate3d(100%, 0, 0)', visibility: 'hidden' })),
        animations_1.transition('* => *', animations_1.animate('500ms cubic-bezier(0.35, 0, 0.25, 1)'))
    ]),
    /** Animation that transitions the step along the Y axis in a vertical stepper. */
    verticalStepTransition: animations_1.trigger('stepTransition', [
        animations_1.state('previous', animations_1.style({ height: '0px', visibility: 'hidden' })),
        animations_1.state('next', animations_1.style({ height: '0px', visibility: 'hidden' })),
        animations_1.state('current', animations_1.style({ height: '*', visibility: 'visible' })),
        animations_1.transition('* <=> current', animations_1.animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
    ])
};
//# sourceMappingURL=stepper-animations.js.map