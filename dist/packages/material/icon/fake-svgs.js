"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Fake URLs and associated SVG documents used by tests.
 * The ID attribute is used to load the icons, the name attribute is only used for testing.
 * @docs-private
 */
exports.FAKE_SVGS = {
    cat: '<svg><path id="meow" name="meow"></path></svg>',
    dog: '<svg><path id="woof" name="woof"></path></svg>',
    farmSet1: "\n    <svg>\n      <defs>\n        <g id=\"pig\" name=\"pig\"><path name=\"oink\"></path></g>\n        <g id=\"cow\" name=\"cow\"><path name=\"moo\"></path></g>\n      </defs>\n    </svg>\n  ",
    farmSet2: "\n    <svg>\n      <defs>\n        <g id=\"cow\" name=\"cow\"><path name=\"moo moo\"></path></g>\n        <g id=\"sheep\" name=\"sheep\"><path name=\"baa\"></path></g>\n      </defs>\n    </svg>\n  ",
    farmSet3: "\n    <svg>\n      <symbol id=\"duck\" name=\"duck\">\n        <path id=\"quack\" name=\"quack\"></path>\n      </symbol>\n    </svg>\n  ",
    arrows: "\n    <svg>\n      <defs>\n        <svg id=\"left-arrow\" name=\"left-arrow\"><path name=\"left\"></path></svg>\n        <svg id=\"right-arrow\" name=\"right-arrow\"><path name=\"right\"></path></svg>\n      </defs>\n    </svg>  "
};
//# sourceMappingURL=fake-svgs.js.map