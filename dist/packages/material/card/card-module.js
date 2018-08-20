"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var core_2 = require("@angular/material/core");
var card_1 = require("./card");
var MatCardModule = /** @class */ (function () {
    function MatCardModule() {
    }
    MatCardModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [core_2.MatCommonModule],
                    exports: [
                        card_1.MatCard,
                        card_1.MatCardHeader,
                        card_1.MatCardTitleGroup,
                        card_1.MatCardContent,
                        card_1.MatCardTitle,
                        card_1.MatCardSubtitle,
                        card_1.MatCardActions,
                        card_1.MatCardFooter,
                        card_1.MatCardSmImage,
                        card_1.MatCardMdImage,
                        card_1.MatCardLgImage,
                        card_1.MatCardImage,
                        card_1.MatCardXlImage,
                        card_1.MatCardAvatar,
                        core_2.MatCommonModule,
                    ],
                    declarations: [
                        card_1.MatCard, card_1.MatCardHeader, card_1.MatCardTitleGroup, card_1.MatCardContent, card_1.MatCardTitle, card_1.MatCardSubtitle,
                        card_1.MatCardActions, card_1.MatCardFooter, card_1.MatCardSmImage, card_1.MatCardMdImage, card_1.MatCardLgImage, card_1.MatCardImage,
                        card_1.MatCardXlImage, card_1.MatCardAvatar,
                    ],
                },] },
    ];
    return MatCardModule;
}());
exports.MatCardModule = MatCardModule;
//# sourceMappingURL=card-module.js.map