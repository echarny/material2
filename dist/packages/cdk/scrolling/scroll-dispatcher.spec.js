"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var core_1 = require("@angular/core");
var public_api_1 = require("./public-api");
var testing_2 = require("@angular/cdk/testing");
describe('ScrollDispatcher', function () {
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [ScrollTestModule],
        });
        testing_1.TestBed.compileComponents();
    }));
    describe('Basic usage', function () {
        var scroll;
        var fixture;
        beforeEach(testing_1.inject([public_api_1.ScrollDispatcher], function (s) {
            scroll = s;
            fixture = testing_1.TestBed.createComponent(ScrollingComponent);
            fixture.detectChanges();
        }));
        it('should be registered with the scrollable directive with the scroll service', function () {
            var componentScrollable = fixture.componentInstance.scrollable;
            expect(scroll.scrollContainers.has(componentScrollable)).toBe(true);
        });
        it('should have the scrollable directive deregistered when the component is destroyed', function () {
            var componentScrollable = fixture.componentInstance.scrollable;
            expect(scroll.scrollContainers.has(componentScrollable)).toBe(true);
            fixture.destroy();
            expect(scroll.scrollContainers.has(componentScrollable)).toBe(false);
        });
        it('should notify through the directive and service that a scroll event occurred', testing_1.fakeAsync(function () {
            // Listen for notifications from scroll directive
            var scrollable = fixture.componentInstance.scrollable;
            var directiveSpy = jasmine.createSpy('directive scroll callback');
            scrollable.elementScrolled().subscribe(directiveSpy);
            // Listen for notifications from scroll service with a throttle of 100ms
            var throttleTime = 100;
            var serviceSpy = jasmine.createSpy('service scroll callback');
            scroll.scrolled(throttleTime).subscribe(serviceSpy);
            // Emit a scroll event from the scrolling element in our component.
            // This event should be picked up by the scrollable directive and notify.
            // The notification should be picked up by the service.
            // Emit a scroll event from the scrolling element in our component.
            // This event should be picked up by the scrollable directive and notify.
            // The notification should be picked up by the service.
            testing_2.dispatchFakeEvent(fixture.componentInstance.scrollingElement.nativeElement, 'scroll', false);
            // The scrollable directive should have notified the service immediately.
            expect(directiveSpy).toHaveBeenCalled();
            // Verify that the throttle is used, the service should wait for the throttle time until
            // sending the notification.
            expect(serviceSpy).not.toHaveBeenCalled();
            // After the throttle time, the notification should be sent.
            // After the throttle time, the notification should be sent.
            testing_1.tick(throttleTime);
            expect(serviceSpy).toHaveBeenCalled();
        }));
        it('should not execute the global events in the Angular zone', function () {
            scroll.scrolled(0).subscribe(function () { });
            testing_2.dispatchFakeEvent(document, 'scroll', false);
            expect(fixture.ngZone.isStable).toBe(true);
        });
        it('should not execute the scrollable events in the Angular zone', function () {
            testing_2.dispatchFakeEvent(fixture.componentInstance.scrollingElement.nativeElement, 'scroll');
            expect(fixture.ngZone.isStable).toBe(true);
        });
        it('should be able to unsubscribe from the global scrollable', function () {
            var spy = jasmine.createSpy('global scroll callback');
            var subscription = scroll.scrolled(0).subscribe(spy);
            testing_2.dispatchFakeEvent(document, 'scroll', false);
            expect(spy).toHaveBeenCalledTimes(1);
            subscription.unsubscribe();
            testing_2.dispatchFakeEvent(document, 'scroll', false);
            expect(spy).toHaveBeenCalledTimes(1);
        });
        it('should complete the `scrolled` stream on destroy', function () {
            var completeSpy = jasmine.createSpy('complete spy');
            var subscription = scroll.scrolled(0).subscribe(undefined, undefined, completeSpy);
            scroll.ngOnDestroy();
            expect(completeSpy).toHaveBeenCalled();
            subscription.unsubscribe();
        });
        it('should complete the scrollable stream when it is destroyed', function () {
            var scrollable = fixture.componentInstance.scrollable;
            var spy = jasmine.createSpy('complete spy');
            var subscription = scrollable.elementScrolled().subscribe(undefined, undefined, spy);
            fixture.destroy();
            expect(spy).toHaveBeenCalled();
            subscription.unsubscribe();
        });
    });
    describe('Nested scrollables', function () {
        var scroll;
        var fixture;
        var element;
        beforeEach(testing_1.inject([public_api_1.ScrollDispatcher], function (s) {
            scroll = s;
            fixture = testing_1.TestBed.createComponent(NestedScrollingComponent);
            fixture.detectChanges();
            element = fixture.componentInstance.interestingElement;
        }));
        it('should be able to identify the containing scrollables of an element', function () {
            var scrollContainers = scroll.getAncestorScrollContainers(element);
            var scrollableElementIds = scrollContainers.map(function (scrollable) { return scrollable.getElementRef().nativeElement.id; });
            expect(scrollableElementIds).toEqual(['scrollable-1', 'scrollable-1a']);
        });
        it('should emit when one of the ancestor scrollable containers is scrolled', function () {
            var spy = jasmine.createSpy('scroll spy');
            var subscription = scroll.ancestorScrolled(element, 0).subscribe(spy);
            var grandparent = fixture.debugElement.nativeElement.querySelector('#scrollable-1');
            testing_2.dispatchFakeEvent(grandparent, 'scroll', false);
            expect(spy).toHaveBeenCalledTimes(1);
            testing_2.dispatchFakeEvent(window.document, 'scroll', false);
            expect(spy).toHaveBeenCalledTimes(2);
            subscription.unsubscribe();
        });
        it('should not emit when a non-ancestor is scrolled', function () {
            var spy = jasmine.createSpy('scroll spy');
            var subscription = scroll.ancestorScrolled(element, 0).subscribe(spy);
            var stranger = fixture.debugElement.nativeElement.querySelector('#scrollable-2');
            testing_2.dispatchFakeEvent(stranger, 'scroll', false);
            expect(spy).not.toHaveBeenCalled();
            subscription.unsubscribe();
        });
    });
    describe('lazy subscription', function () {
        var scroll;
        beforeEach(testing_1.inject([public_api_1.ScrollDispatcher], function (s) {
            scroll = s;
        }));
        it('should lazily add global listeners as service subscriptions are added and removed', function () {
            expect(scroll._globalSubscription).toBeNull('Expected no global listeners on init.');
            var subscription = scroll.scrolled(0).subscribe(function () { });
            expect(scroll._globalSubscription).toBeTruthy('Expected global listeners after a subscription has been added.');
            subscription.unsubscribe();
            expect(scroll._globalSubscription).toBeNull('Expected global listeners to have been removed after the subscription has stopped.');
        });
        it('should remove global listeners on unsubscribe, despite any other live scrollables', function () {
            var fixture = testing_1.TestBed.createComponent(NestedScrollingComponent);
            fixture.detectChanges();
            expect(scroll._globalSubscription).toBeNull('Expected no global listeners on init.');
            expect(scroll.scrollContainers.size).toBe(4, 'Expected multiple scrollables');
            var subscription = scroll.scrolled(0).subscribe(function () { });
            expect(scroll._globalSubscription).toBeTruthy('Expected global listeners after a subscription has been added.');
            subscription.unsubscribe();
            expect(scroll._globalSubscription).toBeNull('Expected global listeners to have been removed after the subscription has stopped.');
            expect(scroll.scrollContainers.size)
                .toBe(4, 'Expected scrollable count to stay the same');
        });
        it('should remove the global subscription on destroy', function () {
            expect(scroll._globalSubscription).toBeNull('Expected no global listeners on init.');
            var subscription = scroll.scrolled(0).subscribe(function () { });
            expect(scroll._globalSubscription).toBeTruthy('Expected global listeners after a subscription has been added.');
            scroll.ngOnDestroy();
            expect(scroll._globalSubscription).toBeNull('Expected global listeners to have been removed after the subscription has stopped.');
            subscription.unsubscribe();
        });
    });
});
/** Simple component that contains a large div and can be scrolled. */
var ScrollingComponent = /** @class */ (function () {
    function ScrollingComponent() {
    }
    ScrollingComponent.decorators = [
        { type: core_1.Component, args: [{
                    template: "<div #scrollingElement cdk-scrollable style=\"height: 9999px\"></div>"
                },] },
    ];
    /** @nocollapse */
    ScrollingComponent.propDecorators = {
        "scrollable": [{ type: core_1.ViewChild, args: [public_api_1.CdkScrollable,] },],
        "scrollingElement": [{ type: core_1.ViewChild, args: ['scrollingElement',] },],
    };
    return ScrollingComponent;
}());
/** Component containing nested scrollables. */
var NestedScrollingComponent = /** @class */ (function () {
    function NestedScrollingComponent() {
    }
    NestedScrollingComponent.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <div id=\"scrollable-1\" cdk-scrollable>\n      <div id=\"scrollable-1a\" cdk-scrollable>\n        <div #interestingElement></div>\n      </div>\n      <div id=\"scrollable-1b\" cdk-scrollable></div>\n    </div>\n    <div id=\"scrollable-2\" cdk-scrollable></div>\n  "
                },] },
    ];
    /** @nocollapse */
    NestedScrollingComponent.propDecorators = {
        "interestingElement": [{ type: core_1.ViewChild, args: ['interestingElement',] },],
    };
    return NestedScrollingComponent;
}());
var TEST_COMPONENTS = [ScrollingComponent, NestedScrollingComponent];
var ScrollTestModule = /** @class */ (function () {
    function ScrollTestModule() {
    }
    ScrollTestModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [public_api_1.ScrollingModule],
                    providers: [public_api_1.ScrollDispatcher],
                    exports: TEST_COMPONENTS,
                    declarations: TEST_COMPONENTS,
                    entryComponents: TEST_COMPONENTS,
                },] },
    ];
    return ScrollTestModule;
}());
//# sourceMappingURL=scroll-dispatcher.spec.js.map