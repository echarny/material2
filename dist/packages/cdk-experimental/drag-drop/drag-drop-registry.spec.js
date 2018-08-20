"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var testing_1 = require("@angular/core/testing");
var testing_2 = require("@angular/cdk/testing");
var drag_drop_registry_1 = require("./drag-drop-registry");
var drag_drop_module_1 = require("./drag-drop-module");
var drag_1 = require("./drag");
var drop_1 = require("./drop");
describe('DragDropRegistry', function () {
    var fixture;
    var testComponent;
    var registry;
    beforeEach(testing_1.fakeAsync(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [drag_drop_module_1.DragDropModule],
            declarations: [SimpleDropZone],
        }).compileComponents();
        fixture = testing_1.TestBed.createComponent(SimpleDropZone);
        testComponent = fixture.componentInstance;
        fixture.detectChanges();
        testing_1.inject([drag_drop_registry_1.DragDropRegistry], function (c) {
            registry = c;
        })();
    }));
    afterEach(function () {
        registry.ngOnDestroy();
    });
    it('should be able to start dragging an item', function () {
        var firstItem = testComponent.dragItems.first;
        expect(registry.isDragging(firstItem)).toBe(false);
        registry.startDragging(firstItem, testing_2.createMouseEvent('mousedown'));
        expect(registry.isDragging(firstItem)).toBe(true);
    });
    it('should be able to stop dragging an item', function () {
        var firstItem = testComponent.dragItems.first;
        registry.startDragging(firstItem, testing_2.createMouseEvent('mousedown'));
        expect(registry.isDragging(firstItem)).toBe(true);
        registry.stopDragging(firstItem);
        expect(registry.isDragging(firstItem)).toBe(false);
    });
    it('should stop dragging an item if it is removed', function () {
        var firstItem = testComponent.dragItems.first;
        registry.startDragging(firstItem, testing_2.createMouseEvent('mousedown'));
        expect(registry.isDragging(firstItem)).toBe(true);
        registry.removeDragItem(firstItem);
        expect(registry.isDragging(firstItem)).toBe(false);
    });
    it('should dispatch `mousemove` events after starting to drag via the mouse', function () {
        var spy = jasmine.createSpy('pointerMove spy');
        var subscription = registry.pointerMove.subscribe(spy);
        registry.startDragging(testComponent.dragItems.first, testing_2.createMouseEvent('mousedown'));
        testing_2.dispatchMouseEvent(document, 'mousemove');
        expect(spy).toHaveBeenCalled();
        subscription.unsubscribe();
    });
    it('should dispatch `touchmove` events after starting to drag via touch', function () {
        var spy = jasmine.createSpy('pointerMove spy');
        var subscription = registry.pointerMove.subscribe(spy);
        registry.startDragging(testComponent.dragItems.first, testing_2.createTouchEvent('touchstart'));
        testing_2.dispatchTouchEvent(document, 'touchmove');
        expect(spy).toHaveBeenCalled();
        subscription.unsubscribe();
    });
    it('should dispatch `mouseup` events after ending the drag via the mouse', function () {
        var spy = jasmine.createSpy('pointerUp spy');
        var subscription = registry.pointerUp.subscribe(spy);
        registry.startDragging(testComponent.dragItems.first, testing_2.createMouseEvent('mousedown'));
        testing_2.dispatchMouseEvent(document, 'mouseup');
        expect(spy).toHaveBeenCalled();
        subscription.unsubscribe();
    });
    it('should dispatch `touchend` events after ending the drag via touch', function () {
        var spy = jasmine.createSpy('pointerUp spy');
        var subscription = registry.pointerUp.subscribe(spy);
        registry.startDragging(testComponent.dragItems.first, testing_2.createTouchEvent('touchstart'));
        testing_2.dispatchTouchEvent(document, 'touchend');
        expect(spy).toHaveBeenCalled();
        subscription.unsubscribe();
    });
    it('should complete the pointer event streams on destroy', function () {
        var pointerUpSpy = jasmine.createSpy('pointerUp complete spy');
        var pointerMoveSpy = jasmine.createSpy('pointerMove complete spy');
        var pointerUpSubscription = registry.pointerUp.subscribe(undefined, undefined, pointerUpSpy);
        var pointerMoveSubscription = registry.pointerMove.subscribe(undefined, undefined, pointerMoveSpy);
        registry.ngOnDestroy();
        expect(pointerUpSpy).toHaveBeenCalled();
        expect(pointerMoveSpy).toHaveBeenCalled();
        pointerUpSubscription.unsubscribe();
        pointerMoveSubscription.unsubscribe();
    });
    it('should not throw when trying to register the same container again', function () {
        expect(function () { return registry.registerDropContainer(testComponent.dropInstances.first); }).not.toThrow();
    });
    it('should throw when trying to register a different container with the same id', function () {
        expect(function () {
            testComponent.showDuplicateContainer = true;
            fixture.detectChanges();
        }).toThrowError(/Drop instance with id \"items\" has already been registered/);
    });
    it('should be able to get a drop container by its id', function () {
        expect(registry.getDropContainer('items')).toBe(testComponent.dropInstances.first);
        expect(registry.getDropContainer('does-not-exist')).toBeFalsy();
    });
    it('should not prevent the default `touchmove` actions when nothing is being dragged', function () {
        expect(testing_2.dispatchTouchEvent(document, 'touchmove').defaultPrevented).toBe(false);
    });
    it('should prevent the default `touchmove` action when an item is being dragged', function () {
        registry.startDragging(testComponent.dragItems.first, testing_2.createTouchEvent('touchstart'));
        expect(testing_2.dispatchTouchEvent(document, 'touchmove').defaultPrevented).toBe(true);
    });
});
var SimpleDropZone = /** @class */ (function () {
    function SimpleDropZone() {
        this.items = ['Zero', 'One', 'Two', 'Three'];
        this.showDuplicateContainer = false;
    }
    SimpleDropZone.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <cdk-drop id=\"items\" [data]=\"items\">\n      <div *ngFor=\"let item of items\" cdkDrag>{{item}}</div>\n    </cdk-drop>\n\n    <cdk-drop id=\"items\" *ngIf=\"showDuplicateContainer\"></cdk-drop>\n  "
                },] },
    ];
    /** @nocollapse */
    SimpleDropZone.propDecorators = {
        "dragItems": [{ type: core_1.ViewChildren, args: [drag_1.CdkDrag,] },],
        "dropInstances": [{ type: core_1.ViewChildren, args: [drop_1.CdkDrop,] },],
    };
    return SimpleDropZone;
}());
exports.SimpleDropZone = SimpleDropZone;
//# sourceMappingURL=drag-drop-registry.spec.js.map