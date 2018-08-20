"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var animations_1 = require("@angular/animations");
/** Animations used by MatDialog. */
exports.matDialogAnimations = {
    /** Animation that slides the dialog in and out of view and fades the opacity. */
    slideDialog: animations_1.trigger('slideDialog', [
        // Note: The `enter` animation doesn't transition to something like `translate3d(0, 0, 0)
        // scale(1)`, because for some reason specifying the transform explicitly, causes IE both
        // to blur the dialog content and decimate the animation performance. Leaving it as `none`
        // solves both issues.
        // Note: The `enter` animation doesn't transition to something like `translate3d(0, 0, 0)
        // scale(1)`, because for some reason specifying the transform explicitly, causes IE both
        // to blur the dialog content and decimate the animation performance. Leaving it as `none`
        // solves both issues.
        animations_1.state('enter', animations_1.style({ transform: 'none', opacity: 1 })),
        animations_1.state('void', animations_1.style({ transform: 'translate3d(0, 25%, 0) scale(0.9)', opacity: 0 })),
        animations_1.state('exit', animations_1.style({ transform: 'translate3d(0, 25%, 0)', opacity: 0 })),
        animations_1.transition('* => *', animations_1.animate('400ms cubic-bezier(0.25, 0.8, 0.25, 1)')),
    ])
};
//# sourceMappingURL=dialog-animations.js.map