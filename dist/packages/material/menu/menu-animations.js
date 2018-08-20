"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
var animations_1 = require("@angular/animations");
/**
 * Animations used by the mat-menu component.
 * Animation duration and timing values are based on:
 * https://material.io/guidelines/components/menus.html#menus-usage
 */
exports.matMenuAnimations = {
    /**
       * This animation controls the menu panel's entry and exit from the page.
       *
       * When the menu panel is added to the DOM, it scales in and fades in its border.
       *
       * When the menu panel is removed from the DOM, it simply fades out after a brief
       * delay to display the ripple.
       */
    transformMenu: animations_1.trigger('transformMenu', [
        animations_1.state('void', animations_1.style({
            opacity: 0,
            // This starts off from 0.01, instead of 0, because there's an issue in the Angular animations
            // as of 4.2, which causes the animation to be skipped if it starts from 0.
            transform: 'scale(0.01, 0.01)'
        })),
        animations_1.transition('void => enter', animations_1.sequence([
            animations_1.query('.mat-menu-content', animations_1.style({ opacity: 0 })),
            animations_1.animate('100ms linear', animations_1.style({ opacity: 1, transform: 'scale(1, 0.5)' })),
            animations_1.group([
                animations_1.query('.mat-menu-content', animations_1.animate('400ms cubic-bezier(0.55, 0, 0.55, 0.2)', animations_1.style({ opacity: 1 }))),
                animations_1.animate('300ms cubic-bezier(0.25, 0.8, 0.25, 1)', animations_1.style({ transform: 'scale(1, 1)' })),
            ])
        ])),
        animations_1.transition('* => void', animations_1.animate('150ms 50ms linear', animations_1.style({ opacity: 0 })))
    ]),
    /**
       * This animation fades in the background color and content of the menu panel
       * after its containing element is scaled in.
       */
    fadeInItems: animations_1.trigger('fadeInItems', [
        // TODO(crisbeto): this is inside the `transformMenu`
        // now. Remove next time we do breaking changes.
        // TODO(crisbeto): this is inside the `transformMenu`
        // now. Remove next time we do breaking changes.
        animations_1.state('showing', animations_1.style({ opacity: 1 })),
        animations_1.transition('void => *', [
            animations_1.style({ opacity: 0 }),
            animations_1.animate('400ms 100ms cubic-bezier(0.55, 0, 0.55, 0.2)')
        ])
    ])
};
/**
 * @deprecated
 * @breaking-change 7.0.0
 */
exports.fadeInItems = exports.matMenuAnimations.fadeInItems;
/**
 * @deprecated
 * @breaking-change 7.0.0
 */
exports.transformMenu = exports.matMenuAnimations.transformMenu;
//# sourceMappingURL=menu-animations.js.map