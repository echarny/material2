"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var animations_1 = require("@angular/animations");
/** Animations used by the MatFormField. */
exports.matFormFieldAnimations = {
    /** Animation that transitions the form field's error and hint messages. */
    transitionMessages: animations_1.trigger('transitionMessages', [
        // TODO(mmalerba): Use angular animations for label animation as well.
        // TODO(mmalerba): Use angular animations for label animation as well.
        animations_1.state('enter', animations_1.style({ opacity: 1, transform: 'translateY(0%)' })),
        animations_1.transition('void => enter', [
            animations_1.style({ opacity: 0, transform: 'translateY(-100%)' }),
            animations_1.animate('300ms cubic-bezier(0.55, 0, 0.55, 0.2)'),
        ]),
    ])
};
//# sourceMappingURL=form-field-animations.js.map