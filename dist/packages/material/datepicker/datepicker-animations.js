"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var animations_1 = require("@angular/animations");
/** Animations used by the Material datepicker. */
exports.matDatepickerAnimations = {
    /** Transforms the height of the datepicker's calendar. */
    transformPanel: animations_1.trigger('transformPanel', [
        animations_1.state('void', animations_1.style({ opacity: 0, transform: 'scale(1, 0)' })),
        animations_1.state('enter', animations_1.style({ opacity: 1, transform: 'scale(1, 1)' })),
        animations_1.transition('void => enter', animations_1.group([
            animations_1.query('@fadeInCalendar', animations_1.animateChild()),
            animations_1.animate('400ms cubic-bezier(0.25, 0.8, 0.25, 1)')
        ])),
        animations_1.transition('* => void', animations_1.animate('100ms linear', animations_1.style({ opacity: 0 })))
    ]),
    /** Fades in the content of the calendar. */
    fadeInCalendar: animations_1.trigger('fadeInCalendar', [
        animations_1.state('void', animations_1.style({ opacity: 0 })),
        animations_1.state('enter', animations_1.style({ opacity: 1 })),
        animations_1.transition('void => *', animations_1.animate('400ms 100ms cubic-bezier(0.55, 0, 0.55, 0.2)'))
    ])
};
//# sourceMappingURL=datepicker-animations.js.map