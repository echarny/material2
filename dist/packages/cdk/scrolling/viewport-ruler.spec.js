"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var public_api_1 = require("./public-api");
var viewport_ruler_1 = require("./viewport-ruler");
var testing_2 = require("@angular/cdk/testing");
// For all tests, we assume the browser window is 1024x786 (outerWidth x outerHeight).
// The karma config has been set to this for local tests, and it is the default size
// for tests on CI (both SauceLabs and Browserstack).
// While we know the *outer* window width/height, the innerWidth and innerHeight depend on the
// the size of the individual browser's chrome, so we have to use window.innerWidth and
// window.innerHeight in the unit test instead of hard-coded values.
describe('ViewportRuler', function () {
    var ruler;
    var startingWindowWidth = window.innerWidth;
    var startingWindowHeight = window.innerHeight;
    // Create a very large element that will make the page scrollable.
    var veryLargeElement = document.createElement('div');
    veryLargeElement.style.width = '6000px';
    veryLargeElement.style.height = '6000px';
    beforeEach(function () {
        return testing_1.TestBed.configureTestingModule({
            imports: [public_api_1.ScrollingModule],
            providers: [viewport_ruler_1.ViewportRuler]
        });
    });
    beforeEach(testing_1.inject([viewport_ruler_1.ViewportRuler], function (viewportRuler) {
        ruler = viewportRuler;
        scrollTo(0, 0);
    }));
    afterEach(function () {
        ruler.ngOnDestroy();
    });
    it('should get the viewport size', function () {
        var size = ruler.getViewportSize();
        expect(size.width).toBe(window.innerWidth);
        expect(size.height).toBe(window.innerHeight);
    });
    it('should get the viewport bounds when the page is not scrolled', function () {
        var bounds = ruler.getViewportRect();
        expect(bounds.top).toBe(0);
        expect(bounds.left).toBe(0);
        expect(bounds.bottom).toBe(window.innerHeight);
        expect(bounds.right).toBe(window.innerWidth);
    });
    it('should get the viewport bounds when the page is scrolled', function () {
        document.body.appendChild(veryLargeElement);
        scrollTo(1500, 2000);
        var bounds = ruler.getViewportRect();
        // In the iOS simulator (BrowserStack & SauceLabs), adding the content to the
        // body causes karma's iframe for the test to stretch to fit that content once we attempt to
        // scroll the page. Setting width / height / maxWidth / maxHeight on the iframe does not
        // successfully constrain its size. As such, skip assertions in environments where the
        // window size has changed since the start of the test.
        if (window.innerWidth > startingWindowWidth || window.innerHeight > startingWindowHeight) {
            document.body.removeChild(veryLargeElement);
            return;
        }
        expect(bounds.top).toBe(2000);
        expect(bounds.left).toBe(1500);
        expect(bounds.bottom).toBe(2000 + window.innerHeight);
        expect(bounds.right).toBe(1500 + window.innerWidth);
        document.body.removeChild(veryLargeElement);
    });
    it('should get the bounds based on client coordinates when the page is pinch-zoomed', function () {
        // There is no API to make the browser pinch-zoom, so there's no real way to automate
        // tests for this behavior. Leaving this test here as documentation for the behavior.
    });
    it('should get the scroll position when the page is not scrolled', function () {
        var scrollPos = ruler.getViewportScrollPosition();
        expect(scrollPos.top).toBe(0);
        expect(scrollPos.left).toBe(0);
    });
    it('should get the scroll position when the page is scrolled', function () {
        document.body.appendChild(veryLargeElement);
        scrollTo(1500, 2000);
        // In the iOS simulator (BrowserStack & SauceLabs), adding the content to the
        // body causes karma's iframe for the test to stretch to fit that content once we attempt to
        // scroll the page. Setting width / height / maxWidth / maxHeight on the iframe does not
        // successfully constrain its size. As such, skip assertions in environments where the
        // window size has changed since the start of the test.
        if (window.innerWidth > startingWindowWidth || window.innerHeight > startingWindowHeight) {
            document.body.removeChild(veryLargeElement);
            return;
        }
        var scrollPos = ruler.getViewportScrollPosition();
        expect(scrollPos.top).toBe(2000);
        expect(scrollPos.left).toBe(1500);
        document.body.removeChild(veryLargeElement);
    });
    describe('changed event', function () {
        it('should dispatch an event when the window is resized', function () {
            var spy = jasmine.createSpy('viewport changed spy');
            var subscription = ruler.change(0).subscribe(spy);
            testing_2.dispatchFakeEvent(window, 'resize');
            expect(spy).toHaveBeenCalled();
            subscription.unsubscribe();
        });
        it('should dispatch an event when the orientation is changed', function () {
            var spy = jasmine.createSpy('viewport changed spy');
            var subscription = ruler.change(0).subscribe(spy);
            testing_2.dispatchFakeEvent(window, 'orientationchange');
            expect(spy).toHaveBeenCalled();
            subscription.unsubscribe();
        });
        it('should be able to throttle the callback', testing_1.fakeAsync(function () {
            var spy = jasmine.createSpy('viewport changed spy');
            var subscription = ruler.change(1337).subscribe(spy);
            testing_2.dispatchFakeEvent(window, 'resize');
            expect(spy).not.toHaveBeenCalled();
            testing_1.tick(1337);
            expect(spy).toHaveBeenCalledTimes(1);
            subscription.unsubscribe();
        }));
    });
});
//# sourceMappingURL=viewport-ruler.spec.js.map