"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./index");
var media_matcher_1 = require("./media-matcher");
var testing_1 = require("@angular/core/testing");
var platform_1 = require("@angular/cdk/platform");
describe('MediaMatcher', function () {
    var mediaMatcher;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [index_1.LayoutModule]
        });
    }));
    beforeEach(testing_1.inject([media_matcher_1.MediaMatcher], function (mm) {
        mediaMatcher = mm;
    }));
    it('correctly returns a MediaQueryList to check for matches', function () {
        expect(mediaMatcher.matchMedia('(min-width: 1px)').matches).toBeTruthy();
        expect(mediaMatcher.matchMedia('(max-width: 1px)').matches).toBeFalsy();
    });
    it('should add CSS rules for provided queries when the platform is webkit', testing_1.inject([platform_1.Platform], function (platform) {
        var randomWidth = Math.random() + "px";
        expect(getStyleTagByString(randomWidth)).toBeFalsy();
        mediaMatcher.matchMedia("(width: " + randomWidth + ")");
        if (platform.WEBKIT) {
            expect(getStyleTagByString(randomWidth)).toBeTruthy();
        }
        else {
            expect(getStyleTagByString(randomWidth)).toBeFalsy();
        }
        function getStyleTagByString(str) {
            return Array.from(document.head.querySelectorAll('style')).find(function (tag) {
                var rules = tag.sheet ? Array.from(tag.sheet.cssRules) : [];
                return !!rules.find(function (rule) { return rule.cssText.includes(str); });
            });
        }
    }));
});
//# sourceMappingURL=media-matcher.spec.js.map