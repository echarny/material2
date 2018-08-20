"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var initialized_1 = require("./initialized");
describe('MixinHasInitialized', function () {
    var EmptyClass = /** @class */ (function () {
        function EmptyClass() {
        }
        return EmptyClass;
    }());
    var instance;
    beforeEach(function () {
        var classWithHasInitialized = initialized_1.mixinInitialized(EmptyClass);
        instance = new classWithHasInitialized();
    });
    it('should emit for subscriptions made before the directive was marked as initialized', function (done) {
        // Listen for an event from the initialized stream and mark the test as done when it emits.
        instance.initialized.subscribe(function () { return done(); });
        // Mark the class as initialized so that the stream emits and the test completes.
        instance._markInitialized();
    });
    it('should emit for subscriptions made after the directive was marked as initialized', function (done) {
        // Mark the class as initialized so the stream emits when subscribed and the test completes.
        instance._markInitialized();
        // Listen for an event from the initialized stream and mark the test as done when it emits.
        instance.initialized.subscribe(function () { return done(); });
    });
    it('should emit for multiple subscriptions made before and after marked as initialized', function (done) {
        // Should expect the number of notifications to match the number of subscriptions.
        var expectedNotificationCount = 4;
        var currentNotificationCount = 0;
        // Function that completes the test when the number of notifications meets the expectation.
        function onNotified() {
            currentNotificationCount++;
            if (currentNotificationCount === expectedNotificationCount) {
                done();
            }
        }
        instance.initialized.subscribe(onNotified); // Subscription 1
        instance.initialized.subscribe(onNotified); // Subscription 2
        instance._markInitialized();
        instance.initialized.subscribe(onNotified); // Subscription 3
        instance.initialized.subscribe(onNotified); // Subscription 4
    });
});
//# sourceMappingURL=initialized.spec.js.map