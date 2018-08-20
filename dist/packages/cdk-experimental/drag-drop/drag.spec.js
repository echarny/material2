"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var testing_1 = require("@angular/core/testing");
var drag_drop_module_1 = require("./drag-drop-module");
var testing_2 = require("@angular/cdk/testing");
var bidi_1 = require("@angular/cdk/bidi");
var drag_1 = require("./drag");
var drag_utils_1 = require("./drag-utils");
var drop_1 = require("./drop");
var drag_handle_1 = require("./drag-handle");
var ITEM_HEIGHT = 25;
var ITEM_WIDTH = 75;
describe('CdkDrag', function () {
    function createComponent(componentType, providers) {
        if (providers === void 0) { providers = []; }
        testing_1.TestBed.configureTestingModule({
            imports: [drag_drop_module_1.DragDropModule],
            declarations: [componentType],
            providers: providers,
        }).compileComponents();
        return testing_1.TestBed.createComponent(componentType);
    }
    describe('standalone draggable', function () {
        describe('mouse dragging', function () {
            it('should drag an element freely to a particular position', testing_1.fakeAsync(function () {
                var fixture = createComponent(StandaloneDraggable);
                fixture.detectChanges();
                var dragElement = fixture.componentInstance.dragElement.nativeElement;
                expect(dragElement.style.transform).toBeFalsy();
                dragElementViaMouse(fixture, dragElement, 50, 100);
                expect(dragElement.style.transform).toBe('translate3d(50px, 100px, 0px)');
            }));
            it('should drag an element freely to a particular position when the page is scrolled', testing_1.fakeAsync(function () {
                var fixture = createComponent(StandaloneDraggable);
                fixture.detectChanges();
                var cleanup = makePageScrollable();
                var dragElement = fixture.componentInstance.dragElement.nativeElement;
                scrollTo(0, 500);
                expect(dragElement.style.transform).toBeFalsy();
                dragElementViaMouse(fixture, dragElement, 50, 100);
                expect(dragElement.style.transform).toBe('translate3d(50px, 100px, 0px)');
                cleanup();
            }));
            it('should continue dragging the element from where it was left off', testing_1.fakeAsync(function () {
                var fixture = createComponent(StandaloneDraggable);
                fixture.detectChanges();
                var dragElement = fixture.componentInstance.dragElement.nativeElement;
                expect(dragElement.style.transform).toBeFalsy();
                dragElementViaMouse(fixture, dragElement, 50, 100);
                expect(dragElement.style.transform).toBe('translate3d(50px, 100px, 0px)');
                dragElementViaMouse(fixture, dragElement, 100, 200);
                expect(dragElement.style.transform).toBe('translate3d(150px, 300px, 0px)');
            }));
            it('should continue dragging from where it was left off when the page is scrolled', testing_1.fakeAsync(function () {
                var fixture = createComponent(StandaloneDraggable);
                fixture.detectChanges();
                var dragElement = fixture.componentInstance.dragElement.nativeElement;
                var cleanup = makePageScrollable();
                scrollTo(0, 500);
                expect(dragElement.style.transform).toBeFalsy();
                dragElementViaMouse(fixture, dragElement, 50, 100);
                expect(dragElement.style.transform).toBe('translate3d(50px, 100px, 0px)');
                dragElementViaMouse(fixture, dragElement, 100, 200);
                expect(dragElement.style.transform).toBe('translate3d(150px, 300px, 0px)');
                cleanup();
            }));
        });
        describe('touch dragging', function () {
            it('should drag an element freely to a particular position', testing_1.fakeAsync(function () {
                var fixture = createComponent(StandaloneDraggable);
                fixture.detectChanges();
                var dragElement = fixture.componentInstance.dragElement.nativeElement;
                expect(dragElement.style.transform).toBeFalsy();
                dragElementViaTouch(fixture, dragElement, 50, 100);
                expect(dragElement.style.transform).toBe('translate3d(50px, 100px, 0px)');
            }));
            it('should drag an element freely to a particular position when the page is scrolled', testing_1.fakeAsync(function () {
                var fixture = createComponent(StandaloneDraggable);
                fixture.detectChanges();
                var dragElement = fixture.componentInstance.dragElement.nativeElement;
                var cleanup = makePageScrollable();
                scrollTo(0, 500);
                expect(dragElement.style.transform).toBeFalsy();
                dragElementViaTouch(fixture, dragElement, 50, 100);
                expect(dragElement.style.transform).toBe('translate3d(50px, 100px, 0px)');
                cleanup();
            }));
            it('should continue dragging the element from where it was left off', testing_1.fakeAsync(function () {
                var fixture = createComponent(StandaloneDraggable);
                fixture.detectChanges();
                var dragElement = fixture.componentInstance.dragElement.nativeElement;
                expect(dragElement.style.transform).toBeFalsy();
                dragElementViaTouch(fixture, dragElement, 50, 100);
                expect(dragElement.style.transform).toBe('translate3d(50px, 100px, 0px)');
                dragElementViaTouch(fixture, dragElement, 100, 200);
                expect(dragElement.style.transform).toBe('translate3d(150px, 300px, 0px)');
            }));
            it('should continue dragging from where it was left off when the page is scrolled', testing_1.fakeAsync(function () {
                var fixture = createComponent(StandaloneDraggable);
                fixture.detectChanges();
                var dragElement = fixture.componentInstance.dragElement.nativeElement;
                var cleanup = makePageScrollable();
                scrollTo(0, 500);
                expect(dragElement.style.transform).toBeFalsy();
                dragElementViaTouch(fixture, dragElement, 50, 100);
                expect(dragElement.style.transform).toBe('translate3d(50px, 100px, 0px)');
                dragElementViaTouch(fixture, dragElement, 100, 200);
                expect(dragElement.style.transform).toBe('translate3d(150px, 300px, 0px)');
                cleanup();
            }));
            it('should prevent the default `touchmove` action on the page while dragging', testing_1.fakeAsync(function () {
                var fixture = createComponent(StandaloneDraggable);
                fixture.detectChanges();
                testing_2.dispatchTouchEvent(fixture.componentInstance.dragElement.nativeElement, 'touchstart');
                fixture.detectChanges();
                expect(testing_2.dispatchTouchEvent(document, 'touchmove').defaultPrevented).toBe(true);
                testing_2.dispatchTouchEvent(document, 'touchend');
                fixture.detectChanges();
            }));
        });
        it('should dispatch an event when the user has started dragging', testing_1.fakeAsync(function () {
            var fixture = createComponent(StandaloneDraggable);
            fixture.detectChanges();
            testing_2.dispatchMouseEvent(fixture.componentInstance.dragElement.nativeElement, 'mousedown');
            fixture.detectChanges();
            expect(fixture.componentInstance.startedSpy).toHaveBeenCalled();
            var event = fixture.componentInstance.startedSpy.calls.mostRecent().args[0];
            // Assert the event like this, rather than `toHaveBeenCalledWith`, because Jasmine will
            // go into an infinite loop trying to stringify the event, if the test fails.
            expect(event).toEqual({ source: fixture.componentInstance.dragInstance });
        }));
        it('should dispatch an event when the user has stopped dragging', testing_1.fakeAsync(function () {
            var fixture = createComponent(StandaloneDraggable);
            fixture.detectChanges();
            dragElementViaMouse(fixture, fixture.componentInstance.dragElement.nativeElement, 5, 10);
            expect(fixture.componentInstance.endedSpy).toHaveBeenCalled();
            var event = fixture.componentInstance.endedSpy.calls.mostRecent().args[0];
            // Assert the event like this, rather than `toHaveBeenCalledWith`, because Jasmine will
            // go into an infinite loop trying to stringify the event, if the test fails.
            expect(event).toEqual({ source: fixture.componentInstance.dragInstance });
        }));
        it('should emit when the user is moving the drag element', function () {
            var fixture = createComponent(StandaloneDraggable);
            fixture.detectChanges();
            var spy = jasmine.createSpy('move spy');
            var subscription = fixture.componentInstance.dragInstance.moved.subscribe(spy);
            dragElementViaMouse(fixture, fixture.componentInstance.dragElement.nativeElement, 5, 10);
            expect(spy).toHaveBeenCalledTimes(1);
            dragElementViaMouse(fixture, fixture.componentInstance.dragElement.nativeElement, 10, 20);
            expect(spy).toHaveBeenCalledTimes(2);
            subscription.unsubscribe();
        });
        it('should emit to `moved` inside the NgZone', function () {
            var fixture = createComponent(StandaloneDraggable);
            fixture.detectChanges();
            var spy = jasmine.createSpy('move spy');
            var subscription = fixture.componentInstance.dragInstance.moved
                .subscribe(function () { return spy(core_1.NgZone.isInAngularZone()); });
            dragElementViaMouse(fixture, fixture.componentInstance.dragElement.nativeElement, 10, 20);
            expect(spy).toHaveBeenCalledWith(true);
            subscription.unsubscribe();
        });
        it('should complete the `moved` stream on destroy', function () {
            var fixture = createComponent(StandaloneDraggable);
            fixture.detectChanges();
            var spy = jasmine.createSpy('move spy');
            var subscription = fixture.componentInstance.dragInstance.moved
                .subscribe(undefined, undefined, spy);
            fixture.destroy();
            expect(spy).toHaveBeenCalled();
            subscription.unsubscribe();
        });
        it('should be able to lock dragging along the x axis', testing_1.fakeAsync(function () {
            var fixture = createComponent(StandaloneDraggable);
            fixture.detectChanges();
            fixture.componentInstance.dragInstance.lockAxis = 'x';
            var dragElement = fixture.componentInstance.dragElement.nativeElement;
            expect(dragElement.style.transform).toBeFalsy();
            dragElementViaMouse(fixture, dragElement, 50, 100);
            expect(dragElement.style.transform).toBe('translate3d(50px, 0px, 0px)');
            dragElementViaMouse(fixture, dragElement, 100, 200);
            expect(dragElement.style.transform).toBe('translate3d(150px, 0px, 0px)');
        }));
        it('should be able to lock dragging along the y axis', testing_1.fakeAsync(function () {
            var fixture = createComponent(StandaloneDraggable);
            fixture.detectChanges();
            fixture.componentInstance.dragInstance.lockAxis = 'y';
            var dragElement = fixture.componentInstance.dragElement.nativeElement;
            expect(dragElement.style.transform).toBeFalsy();
            dragElementViaMouse(fixture, dragElement, 50, 100);
            expect(dragElement.style.transform).toBe('translate3d(0px, 100px, 0px)');
            dragElementViaMouse(fixture, dragElement, 100, 200);
            expect(dragElement.style.transform).toBe('translate3d(0px, 300px, 0px)');
        }));
    });
    describe('draggable with a handle', function () {
        it('should not be able to drag the entire element if it has a handle', testing_1.fakeAsync(function () {
            var fixture = createComponent(StandaloneDraggableWithHandle);
            fixture.detectChanges();
            var dragElement = fixture.componentInstance.dragElement.nativeElement;
            expect(dragElement.style.transform).toBeFalsy();
            dragElementViaMouse(fixture, dragElement, 50, 100);
            expect(dragElement.style.transform).toBeFalsy();
        }));
        it('should be able to drag an element using its handle', testing_1.fakeAsync(function () {
            var fixture = createComponent(StandaloneDraggableWithHandle);
            fixture.detectChanges();
            var dragElement = fixture.componentInstance.dragElement.nativeElement;
            var handle = fixture.componentInstance.handleElement.nativeElement;
            expect(dragElement.style.transform).toBeFalsy();
            dragElementViaMouse(fixture, handle, 50, 100);
            expect(dragElement.style.transform).toBe('translate3d(50px, 100px, 0px)');
        }));
        it('should be able to use a handle that was added after init', testing_1.fakeAsync(function () {
            var fixture = createComponent(StandaloneDraggableWithDelayedHandle);
            fixture.detectChanges();
            fixture.componentInstance.showHandle = true;
            fixture.detectChanges();
            var dragElement = fixture.componentInstance.dragElement.nativeElement;
            var handle = fixture.componentInstance.handleElement.nativeElement;
            expect(dragElement.style.transform).toBeFalsy();
            dragElementViaMouse(fixture, handle, 50, 100);
            expect(dragElement.style.transform).toBe('translate3d(50px, 100px, 0px)');
        }));
        it('should be able to use more than one handle to drag the element', testing_1.fakeAsync(function () {
            var fixture = createComponent(StandaloneDraggableWithMultipleHandles);
            fixture.detectChanges();
            var dragElement = fixture.componentInstance.dragElement.nativeElement;
            var handles = fixture.componentInstance.handles.map(function (handle) { return handle.element.nativeElement; });
            expect(dragElement.style.transform).toBeFalsy();
            dragElementViaMouse(fixture, handles[1], 50, 100);
            expect(dragElement.style.transform).toBe('translate3d(50px, 100px, 0px)');
            dragElementViaMouse(fixture, handles[0], 100, 200);
            expect(dragElement.style.transform).toBe('translate3d(150px, 300px, 0px)');
        }));
    });
    describe('in a drop container', function () {
        it('should be able to attach data to the drop container', function () {
            var fixture = createComponent(DraggableInDropZone);
            fixture.detectChanges();
            expect(fixture.componentInstance.dropInstance.data).toBe(fixture.componentInstance.items);
        });
        it('should be able to attach data to a drag item', function () {
            var fixture = createComponent(DraggableInDropZone);
            fixture.detectChanges();
            expect(fixture.componentInstance.dragItems.first.data)
                .toBe(fixture.componentInstance.items[0]);
        });
        it('should be able to overwrite the drop zone id', testing_1.fakeAsync(function () {
            var fixture = createComponent(DraggableInDropZone);
            fixture.componentInstance.dropZoneId = 'custom-id';
            fixture.detectChanges();
            var drop = fixture.componentInstance.dropInstance;
            expect(drop.id).toBe('custom-id');
            expect(drop.element.nativeElement.getAttribute('id')).toBe('custom-id');
        }));
        it('should toggle a class when the user starts dragging an item', testing_1.fakeAsync(function () {
            var fixture = createComponent(DraggableInDropZone);
            fixture.detectChanges();
            var item = fixture.componentInstance.dragItems.toArray()[1].element.nativeElement;
            var dropZone = fixture.componentInstance.dropInstance;
            expect(dropZone.element.nativeElement.classList).not.toContain('cdk-drop-dragging');
            testing_2.dispatchMouseEvent(item, 'mousedown');
            fixture.detectChanges();
            expect(dropZone.element.nativeElement.classList).toContain('cdk-drop-dragging');
            testing_2.dispatchMouseEvent(document, 'mouseup');
            fixture.detectChanges();
            testing_1.flush();
            fixture.detectChanges();
            expect(dropZone.element.nativeElement.classList).not.toContain('cdk-drop-dragging');
        }));
        it('should dispatch the `dropped` event when an item has been dropped', testing_1.fakeAsync(function () {
            var fixture = createComponent(DraggableInDropZone);
            fixture.detectChanges();
            var dragItems = fixture.componentInstance.dragItems;
            expect(dragItems.map(function (drag) { return drag.element.nativeElement.textContent.trim(); }))
                .toEqual(['Zero', 'One', 'Two', 'Three']);
            var firstItem = dragItems.first;
            var thirdItemRect = dragItems.toArray()[2].element.nativeElement.getBoundingClientRect();
            dragElementViaMouse(fixture, firstItem.element.nativeElement, thirdItemRect.left + 1, thirdItemRect.top + 1);
            testing_1.flush();
            fixture.detectChanges();
            expect(fixture.componentInstance.droppedSpy).toHaveBeenCalledTimes(1);
            var event = fixture.componentInstance.droppedSpy.calls.mostRecent().args[0];
            // Assert the event like this, rather than `toHaveBeenCalledWith`, because Jasmine will
            // go into an infinite loop trying to stringify the event, if the test fails.
            expect(event).toEqual({
                previousIndex: 0,
                currentIndex: 2,
                item: firstItem,
                container: fixture.componentInstance.dropInstance,
                previousContainer: fixture.componentInstance.dropInstance
            });
            expect(dragItems.map(function (drag) { return drag.element.nativeElement.textContent.trim(); }))
                .toEqual(['One', 'Two', 'Zero', 'Three']);
        }));
        it('should not move the original element from its initial DOM position', testing_1.fakeAsync(function () {
            var fixture = createComponent(DraggableInDropZone);
            fixture.detectChanges();
            var root = fixture.nativeElement;
            var dragElements = Array.from(root.querySelectorAll('.cdk-drag'));
            expect(dragElements.map(function (el) { return el.textContent; })).toEqual(['Zero', 'One', 'Two', 'Three']);
            // Stub out the original call so the list doesn't get re-rendered.
            // We're testing the DOM order explicitly.
            fixture.componentInstance.droppedSpy.and.callFake(function () { });
            var thirdItemRect = dragElements[2].getBoundingClientRect();
            dragElementViaMouse(fixture, fixture.componentInstance.dragItems.first.element.nativeElement, thirdItemRect.left + 1, thirdItemRect.top + 1);
            testing_1.flush();
            fixture.detectChanges();
            dragElements = Array.from(root.querySelectorAll('.cdk-drag'));
            expect(dragElements.map(function (el) { return el.textContent; })).toEqual(['Zero', 'One', 'Two', 'Three']);
        }));
        it('should dispatch the `dropped` event in a horizontal drop zone', testing_1.fakeAsync(function () {
            var fixture = createComponent(DraggableInHorizontalDropZone);
            fixture.detectChanges();
            var dragItems = fixture.componentInstance.dragItems;
            expect(dragItems.map(function (drag) { return drag.element.nativeElement.textContent.trim(); }))
                .toEqual(['Zero', 'One', 'Two', 'Three']);
            var firstItem = dragItems.first;
            var thirdItemRect = dragItems.toArray()[2].element.nativeElement.getBoundingClientRect();
            dragElementViaMouse(fixture, firstItem.element.nativeElement, thirdItemRect.left + 1, thirdItemRect.top + 1);
            testing_1.flush();
            fixture.detectChanges();
            expect(fixture.componentInstance.droppedSpy).toHaveBeenCalledTimes(1);
            var event = fixture.componentInstance.droppedSpy.calls.mostRecent().args[0];
            // Assert the event like this, rather than `toHaveBeenCalledWith`, because Jasmine will
            // go into an infinite loop trying to stringify the event, if the test fails.
            expect(event).toEqual({
                previousIndex: 0,
                currentIndex: 2,
                item: firstItem,
                container: fixture.componentInstance.dropInstance,
                previousContainer: fixture.componentInstance.dropInstance
            });
            expect(dragItems.map(function (drag) { return drag.element.nativeElement.textContent.trim(); }))
                .toEqual(['One', 'Two', 'Zero', 'Three']);
        }));
        it('should create a preview element while the item is dragged', testing_1.fakeAsync(function () {
            var fixture = createComponent(DraggableInDropZone);
            fixture.detectChanges();
            var item = fixture.componentInstance.dragItems.toArray()[1].element.nativeElement;
            var itemRect = item.getBoundingClientRect();
            var initialParent = item.parentNode;
            testing_2.dispatchMouseEvent(item, 'mousedown');
            fixture.detectChanges();
            var preview = document.querySelector('.cdk-drag-preview');
            var previewRect = preview.getBoundingClientRect();
            expect(item.parentNode).toBe(document.body, 'Expected element to be moved out into the body');
            expect(item.style.display).toBe('none', 'Expected element to be hidden');
            expect(preview).toBeTruthy('Expected preview to be in the DOM');
            expect(preview.textContent.trim())
                .toContain('One', 'Expected preview content to match element');
            expect(preview.getAttribute('dir'))
                .toBe('ltr', 'Expected preview element to inherit the directionality.');
            expect(previewRect.width).toBe(itemRect.width, 'Expected preview width to match element');
            expect(previewRect.height).toBe(itemRect.height, 'Expected preview height to match element');
            testing_2.dispatchMouseEvent(document, 'mouseup');
            fixture.detectChanges();
            testing_1.flush();
            expect(item.parentNode)
                .toBe(initialParent, 'Expected element to be moved back into its old parent');
            expect(item.style.display).toBeFalsy('Expected element to be visible');
            expect(preview.parentNode).toBeFalsy('Expected preview to be removed from the DOM');
        }));
        it('should pass the proper direction to the preview in rtl', testing_1.fakeAsync(function () {
            var fixture = createComponent(DraggableInDropZone, [{
                    provide: bidi_1.Directionality,
                    useValue: ({ value: 'rtl' })
                }]);
            fixture.detectChanges();
            var item = fixture.componentInstance.dragItems.toArray()[1].element.nativeElement;
            testing_2.dispatchMouseEvent(item, 'mousedown');
            fixture.detectChanges();
            expect(document.querySelector('.cdk-drag-preview').getAttribute('dir'))
                .toBe('rtl', 'Expected preview element to inherit the directionality.');
        }));
        it('should remove the preview if its `transitionend` event timed out', testing_1.fakeAsync(function () {
            var fixture = createComponent(DraggableInDropZone);
            fixture.detectChanges();
            var item = fixture.componentInstance.dragItems.toArray()[1].element.nativeElement;
            testing_2.dispatchMouseEvent(item, 'mousedown');
            fixture.detectChanges();
            var preview = document.querySelector('.cdk-drag-preview');
            // Add a duration since the tests won't include one.
            preview.style.transitionDuration = '500ms';
            // Move somewhere so the draggable doesn't exit immediately.
            // Move somewhere so the draggable doesn't exit immediately.
            testing_2.dispatchTouchEvent(document, 'mousemove', 50, 50);
            fixture.detectChanges();
            testing_2.dispatchMouseEvent(document, 'mouseup');
            fixture.detectChanges();
            testing_1.tick(250);
            expect(preview.parentNode)
                .toBeTruthy('Expected preview to be in the DOM mid-way through the transition');
            testing_1.tick(500);
            expect(preview.parentNode)
                .toBeFalsy('Expected preview to be removed from the DOM if the transition timed out');
        }));
        it('should create a placeholder element while the item is dragged', testing_1.fakeAsync(function () {
            var fixture = createComponent(DraggableInDropZone);
            fixture.detectChanges();
            var item = fixture.componentInstance.dragItems.toArray()[1].element.nativeElement;
            var initialParent = item.parentNode;
            testing_2.dispatchMouseEvent(item, 'mousedown');
            fixture.detectChanges();
            var placeholder = document.querySelector('.cdk-drag-placeholder');
            expect(placeholder).toBeTruthy('Expected placeholder to be in the DOM');
            expect(placeholder.parentNode)
                .toBe(initialParent, 'Expected placeholder to be inserted into the same parent');
            expect(placeholder.textContent.trim())
                .toContain('One', 'Expected placeholder content to match element');
            testing_2.dispatchMouseEvent(document, 'mouseup');
            fixture.detectChanges();
            testing_1.flush();
            expect(placeholder.parentNode).toBeFalsy('Expected placeholder to be removed from the DOM');
        }));
        it('should move the placeholder as an item is being sorted down', testing_1.fakeAsync(function () {
            var fixture = createComponent(DraggableInDropZone);
            fixture.detectChanges();
            assertDownwardSorting(fixture, fixture.componentInstance.dragItems.map(function (item) {
                return item.element.nativeElement;
            }));
        }));
        it('should move the placeholder as an item is being sorted down on a scrolled page', testing_1.fakeAsync(function () {
            var fixture = createComponent(DraggableInDropZone);
            fixture.detectChanges();
            var cleanup = makePageScrollable();
            scrollTo(0, 500);
            assertDownwardSorting(fixture, fixture.componentInstance.dragItems.map(function (item) {
                return item.element.nativeElement;
            }));
            cleanup();
        }));
        it('should move the placeholder as an item is being sorted up', testing_1.fakeAsync(function () {
            var fixture = createComponent(DraggableInDropZone);
            fixture.detectChanges();
            assertUpwardSorting(fixture, fixture.componentInstance.dragItems.map(function (item) {
                return item.element.nativeElement;
            }));
        }));
        it('should move the placeholder as an item is being sorted up on a scrolled page', testing_1.fakeAsync(function () {
            var fixture = createComponent(DraggableInDropZone);
            fixture.detectChanges();
            var cleanup = makePageScrollable();
            scrollTo(0, 500);
            assertUpwardSorting(fixture, fixture.componentInstance.dragItems.map(function (item) {
                return item.element.nativeElement;
            }));
            cleanup();
        }));
        it('should move the placeholder as an item is being sorted to the right', testing_1.fakeAsync(function () {
            var fixture = createComponent(DraggableInHorizontalDropZone);
            fixture.detectChanges();
            var items = fixture.componentInstance.dragItems.toArray();
            var draggedItem = items[0].element.nativeElement;
            var _a = draggedItem.getBoundingClientRect(), top = _a.top, left = _a.left;
            testing_2.dispatchMouseEvent(draggedItem, 'mousedown', left, top);
            fixture.detectChanges();
            var placeholder = document.querySelector('.cdk-drag-placeholder');
            // Drag over each item one-by-one going to the right.
            for (var i = 0; i < items.length; i++) {
                var elementRect = items[i].element.nativeElement.getBoundingClientRect();
                // Add a few pixels to the left offset so we get some overlap.
                // Add a few pixels to the left offset so we get some overlap.
                testing_2.dispatchMouseEvent(document, 'mousemove', elementRect.left + 5, elementRect.top);
                fixture.detectChanges();
                expect(getElementIndexByPosition(placeholder, 'left')).toBe(i);
            }
            testing_2.dispatchMouseEvent(document, 'mouseup');
            fixture.detectChanges();
            testing_1.flush();
        }));
        it('should move the placeholder as an item is being sorted to the left', testing_1.fakeAsync(function () {
            var fixture = createComponent(DraggableInHorizontalDropZone);
            fixture.detectChanges();
            var items = fixture.componentInstance.dragItems.toArray();
            var draggedItem = items[items.length - 1].element.nativeElement;
            var _a = draggedItem.getBoundingClientRect(), top = _a.top, left = _a.left;
            testing_2.dispatchMouseEvent(draggedItem, 'mousedown', left, top);
            fixture.detectChanges();
            var placeholder = document.querySelector('.cdk-drag-placeholder');
            // Drag over each item one-by-one going to the left.
            for (var i = items.length - 1; i > -1; i--) {
                var elementRect = items[i].element.nativeElement.getBoundingClientRect();
                // Remove a few pixels from the right offset so we get some overlap.
                // Remove a few pixels from the right offset so we get some overlap.
                testing_2.dispatchMouseEvent(document, 'mousemove', elementRect.right - 5, elementRect.top);
                fixture.detectChanges();
                expect(getElementIndexByPosition(placeholder, 'left')).toBe(i);
            }
            testing_2.dispatchMouseEvent(document, 'mouseup');
            fixture.detectChanges();
            testing_1.flush();
        }));
        it('should clean up the preview element if the item is destroyed mid-drag', testing_1.fakeAsync(function () {
            var fixture = createComponent(DraggableInDropZone);
            fixture.detectChanges();
            var item = fixture.componentInstance.dragItems.toArray()[1].element.nativeElement;
            testing_2.dispatchMouseEvent(item, 'mousedown');
            fixture.detectChanges();
            var preview = document.querySelector('.cdk-drag-preview');
            expect(preview.parentNode).toBeTruthy('Expected preview to be in the DOM');
            expect(item.parentNode).toBeTruthy('Expected drag item to be in the DOM');
            fixture.destroy();
            expect(preview.parentNode).toBeFalsy('Expected preview to be removed from the DOM');
            expect(item.parentNode).toBeFalsy('Expected drag item to be removed from the DOM');
        }));
        it('should be able to customize the preview element', testing_1.fakeAsync(function () {
            var fixture = createComponent(DraggableInDropZoneWithCustomPreview);
            fixture.detectChanges();
            var item = fixture.componentInstance.dragItems.toArray()[1].element.nativeElement;
            testing_2.dispatchMouseEvent(item, 'mousedown');
            fixture.detectChanges();
            var preview = document.querySelector('.cdk-drag-preview');
            expect(preview).toBeTruthy();
            expect(preview.classList).toContain('custom-preview');
            expect(preview.textContent.trim()).toContain('Custom preview');
        }));
        it('should position custom previews next to the pointer', testing_1.fakeAsync(function () {
            var fixture = createComponent(DraggableInDropZoneWithCustomPreview);
            fixture.detectChanges();
            var item = fixture.componentInstance.dragItems.toArray()[1].element.nativeElement;
            testing_2.dispatchMouseEvent(item, 'mousedown', 50, 50);
            fixture.detectChanges();
            var preview = document.querySelector('.cdk-drag-preview');
            expect(preview.style.transform).toBe('translate3d(50px, 50px, 0px)');
        }));
        it('should lock position inside a drop container along the x axis', testing_1.fakeAsync(function () {
            var fixture = createComponent(DraggableInDropZoneWithCustomPreview);
            fixture.detectChanges();
            var item = fixture.componentInstance.dragItems.toArray()[1];
            var element = item.element.nativeElement;
            item.lockAxis = 'x';
            testing_2.dispatchMouseEvent(element, 'mousedown', 50, 50);
            fixture.detectChanges();
            testing_2.dispatchMouseEvent(element, 'mousemove', 100, 100);
            fixture.detectChanges();
            var preview = document.querySelector('.cdk-drag-preview');
            expect(preview.style.transform).toBe('translate3d(100px, 50px, 0px)');
        }));
        it('should lock position inside a drop container along the y axis', testing_1.fakeAsync(function () {
            var fixture = createComponent(DraggableInDropZoneWithCustomPreview);
            fixture.detectChanges();
            var item = fixture.componentInstance.dragItems.toArray()[1];
            var element = item.element.nativeElement;
            item.lockAxis = 'y';
            testing_2.dispatchMouseEvent(element, 'mousedown', 50, 50);
            fixture.detectChanges();
            testing_2.dispatchMouseEvent(element, 'mousemove', 100, 100);
            fixture.detectChanges();
            var preview = document.querySelector('.cdk-drag-preview');
            expect(preview.style.transform).toBe('translate3d(50px, 100px, 0px)');
        }));
        it('should inherit the position locking from the drop container', testing_1.fakeAsync(function () {
            var fixture = createComponent(DraggableInDropZoneWithCustomPreview);
            fixture.detectChanges();
            var element = fixture.componentInstance.dragItems.toArray()[1].element.nativeElement;
            fixture.componentInstance.dropInstance.lockAxis = 'x';
            testing_2.dispatchMouseEvent(element, 'mousedown', 50, 50);
            fixture.detectChanges();
            testing_2.dispatchMouseEvent(element, 'mousemove', 100, 100);
            fixture.detectChanges();
            var preview = document.querySelector('.cdk-drag-preview');
            expect(preview.style.transform).toBe('translate3d(100px, 50px, 0px)');
        }));
        it('should be able to customize the placeholder', testing_1.fakeAsync(function () {
            var fixture = createComponent(DraggableInDropZoneWithCustomPlaceholder);
            fixture.detectChanges();
            var item = fixture.componentInstance.dragItems.toArray()[1].element.nativeElement;
            testing_2.dispatchMouseEvent(item, 'mousedown');
            fixture.detectChanges();
            var placeholder = document.querySelector('.cdk-drag-placeholder');
            expect(placeholder).toBeTruthy();
            expect(placeholder.classList).toContain('custom-placeholder');
            expect(placeholder.textContent.trim()).toContain('Custom placeholder');
        }));
        it('should clear the `transform` value from siblings when item is dropped`', testing_1.fakeAsync(function () {
            var fixture = createComponent(DraggableInDropZone);
            fixture.detectChanges();
            var dragItems = fixture.componentInstance.dragItems;
            var firstItem = dragItems.first;
            var thirdItem = dragItems.toArray()[2].element.nativeElement;
            var thirdItemRect = thirdItem.getBoundingClientRect();
            testing_2.dispatchMouseEvent(firstItem.element.nativeElement, 'mousedown');
            fixture.detectChanges();
            testing_2.dispatchMouseEvent(document, 'mousemove', thirdItemRect.left + 1, thirdItemRect.top + 1);
            fixture.detectChanges();
            expect(thirdItem.style.transform).toBeTruthy();
            testing_2.dispatchMouseEvent(document, 'mouseup');
            fixture.detectChanges();
            testing_1.flush();
            fixture.detectChanges();
            expect(thirdItem.style.transform).toBeFalsy();
        }));
    });
    describe('in a connected drop container', function () {
        it('should dispatch the `dropped` event when an item has been dropped into a new container', testing_1.fakeAsync(function () {
            var fixture = createComponent(ConnectedDropZones);
            fixture.detectChanges();
            var groups = fixture.componentInstance.groupedDragItems;
            var item = groups[0][1];
            var targetRect = groups[1][2].element.nativeElement.getBoundingClientRect();
            dragElementViaMouse(fixture, item.element.nativeElement, targetRect.left + 1, targetRect.top + 1);
            testing_1.flush();
            fixture.detectChanges();
            expect(fixture.componentInstance.droppedSpy).toHaveBeenCalledTimes(1);
            var event = fixture.componentInstance.droppedSpy.calls.mostRecent().args[0];
            expect(event).toEqual({
                previousIndex: 1,
                currentIndex: 3,
                item: item,
                container: fixture.componentInstance.dropInstances.toArray()[1],
                previousContainer: fixture.componentInstance.dropInstances.first
            });
        }));
        it('should be able to move the element over a new container and return it', testing_1.fakeAsync(function () {
            var fixture = createComponent(ConnectedDropZones);
            fixture.detectChanges();
            var groups = fixture.componentInstance.groupedDragItems;
            var dropZones = fixture.componentInstance.dropInstances.map(function (d) { return d.element.nativeElement; });
            var item = groups[0][1];
            var initialRect = item.element.nativeElement.getBoundingClientRect();
            var targetRect = groups[1][2].element.nativeElement.getBoundingClientRect();
            testing_2.dispatchMouseEvent(item.element.nativeElement, 'mousedown');
            fixture.detectChanges();
            var placeholder = (dropZones[0].querySelector('.cdk-drag-placeholder'));
            expect(placeholder).toBeTruthy();
            expect(dropZones[0].contains(placeholder))
                .toBe(true, 'Expected placeholder to be inside the first container.');
            testing_2.dispatchMouseEvent(document, 'mousemove', targetRect.left + 1, targetRect.top + 1);
            fixture.detectChanges();
            expect(dropZones[1].contains(placeholder))
                .toBe(true, 'Expected placeholder to be inside second container.');
            testing_2.dispatchMouseEvent(document, 'mousemove', initialRect.left + 1, initialRect.top + 1);
            fixture.detectChanges();
            expect(dropZones[0].contains(placeholder))
                .toBe(true, 'Expected placeholder to be back inside first container.');
            testing_2.dispatchMouseEvent(document, 'mouseup');
            fixture.detectChanges();
            expect(fixture.componentInstance.droppedSpy).not.toHaveBeenCalled();
        }));
        it('should transfer the DOM element from one drop zone to another', testing_1.fakeAsync(function () {
            var fixture = createComponent(ConnectedDropZones);
            fixture.detectChanges();
            var groups = fixture.componentInstance.groupedDragItems.slice();
            var element = groups[0][1].element.nativeElement;
            var dropInstances = fixture.componentInstance.dropInstances.toArray();
            var targetRect = groups[1][2].element.nativeElement.getBoundingClientRect();
            dragElementViaMouse(fixture, element, targetRect.left + 1, targetRect.top + 1);
            testing_1.flush();
            fixture.detectChanges();
            var event = fixture.componentInstance.droppedSpy.calls.mostRecent().args[0];
            expect(event).toBeTruthy();
            expect(event).toEqual({
                previousIndex: 1,
                currentIndex: 3,
                item: groups[0][1],
                container: dropInstances[1],
                previousContainer: dropInstances[0]
            });
        }));
        it('should not be able to transfer an item into a container that is not in `connectedTo`', testing_1.fakeAsync(function () {
            var fixture = createComponent(ConnectedDropZones);
            fixture.detectChanges();
            fixture.componentInstance.dropInstances.forEach(function (d) { return d.connectedTo = []; });
            fixture.detectChanges();
            var groups = fixture.componentInstance.groupedDragItems.slice();
            var element = groups[0][1].element.nativeElement;
            var dropInstances = fixture.componentInstance.dropInstances.toArray();
            var targetRect = groups[1][2].element.nativeElement.getBoundingClientRect();
            dragElementViaMouse(fixture, element, targetRect.left + 1, targetRect.top + 1);
            testing_1.flush();
            fixture.detectChanges();
            var event = fixture.componentInstance.droppedSpy.calls.mostRecent().args[0];
            expect(event).toBeTruthy();
            expect(event).toEqual({
                previousIndex: 1,
                currentIndex: 1,
                item: groups[0][1],
                container: dropInstances[0],
                previousContainer: dropInstances[0]
            });
        }));
        it('should not be able to transfer an item that does not match the `enterPredicate`', testing_1.fakeAsync(function () {
            var fixture = createComponent(ConnectedDropZones);
            fixture.detectChanges();
            fixture.componentInstance.dropInstances.forEach(function (d) { return d.enterPredicate = function () { return false; }; });
            fixture.detectChanges();
            var groups = fixture.componentInstance.groupedDragItems.slice();
            var element = groups[0][1].element.nativeElement;
            var dropInstances = fixture.componentInstance.dropInstances.toArray();
            var targetRect = groups[1][2].element.nativeElement.getBoundingClientRect();
            dragElementViaMouse(fixture, element, targetRect.left + 1, targetRect.top + 1);
            testing_1.flush();
            fixture.detectChanges();
            var event = fixture.componentInstance.droppedSpy.calls.mostRecent().args[0];
            expect(event).toBeTruthy();
            expect(event).toEqual({
                previousIndex: 1,
                currentIndex: 1,
                item: groups[0][1],
                container: dropInstances[0],
                previousContainer: dropInstances[0]
            });
        }));
        it('should be able to start dragging after an item has been transferred', testing_1.fakeAsync(function () {
            var fixture = createComponent(ConnectedDropZones);
            fixture.detectChanges();
            var groups = fixture.componentInstance.groupedDragItems;
            var element = groups[0][1].element.nativeElement;
            var dropZone = fixture.componentInstance.dropInstances.toArray()[1].element.nativeElement;
            var targetRect = dropZone.getBoundingClientRect();
            // Drag the element into the drop zone and move it to the top.
            [1, -1].forEach(function (offset) {
                dragElementViaMouse(fixture, element, targetRect.left + offset, targetRect.top + offset);
                testing_1.flush();
                fixture.detectChanges();
            });
            assertDownwardSorting(fixture, Array.from(dropZone.querySelectorAll('.cdk-drag')));
        }));
        it('should be able to return the last item inside its initial container', testing_1.fakeAsync(function () {
            var fixture = createComponent(ConnectedDropZones);
            // Make sure there's only one item in the first list.
            fixture.componentInstance.todo = ['things'];
            fixture.detectChanges();
            var groups = fixture.componentInstance.groupedDragItems;
            var dropZones = fixture.componentInstance.dropInstances.map(function (d) { return d.element.nativeElement; });
            var item = groups[0][0];
            var initialRect = item.element.nativeElement.getBoundingClientRect();
            var targetRect = groups[1][0].element.nativeElement.getBoundingClientRect();
            testing_2.dispatchMouseEvent(item.element.nativeElement, 'mousedown');
            fixture.detectChanges();
            var placeholder = (dropZones[0].querySelector('.cdk-drag-placeholder'));
            expect(placeholder).toBeTruthy();
            expect(dropZones[0].contains(placeholder))
                .toBe(true, 'Expected placeholder to be inside the first container.');
            testing_2.dispatchMouseEvent(document, 'mousemove', targetRect.left + 1, targetRect.top + 1);
            fixture.detectChanges();
            expect(dropZones[1].contains(placeholder))
                .toBe(true, 'Expected placeholder to be inside second container.');
            testing_2.dispatchMouseEvent(document, 'mousemove', initialRect.left + 1, initialRect.top + 1);
            fixture.detectChanges();
            expect(dropZones[0].contains(placeholder))
                .toBe(true, 'Expected placeholder to be back inside first container.');
            testing_2.dispatchMouseEvent(document, 'mouseup');
            fixture.detectChanges();
            expect(fixture.componentInstance.droppedSpy).not.toHaveBeenCalled();
        }));
        it('should assign a default id on each drop zone', testing_1.fakeAsync(function () {
            var fixture = createComponent(ConnectedDropZones);
            fixture.detectChanges();
            expect(fixture.componentInstance.dropInstances.toArray().every(function (dropZone) {
                return !!dropZone.id && !!dropZone.element.nativeElement.getAttribute('id');
            })).toBe(true);
        }));
        it('should be able to connect two drop zones by id', testing_1.fakeAsync(function () {
            var fixture = createComponent(ConnectedDropZones);
            fixture.detectChanges();
            var dropInstances = fixture.componentInstance.dropInstances.toArray();
            dropInstances[0].id = 'todo';
            dropInstances[1].id = 'done';
            dropInstances[0].connectedTo = ['done'];
            dropInstances[1].connectedTo = ['todo'];
            fixture.detectChanges();
            var groups = fixture.componentInstance.groupedDragItems;
            var element = groups[0][1].element.nativeElement;
            var targetRect = groups[1][2].element.nativeElement.getBoundingClientRect();
            dragElementViaMouse(fixture, element, targetRect.left + 1, targetRect.top + 1);
            testing_1.flush();
            fixture.detectChanges();
            var event = fixture.componentInstance.droppedSpy.calls.mostRecent().args[0];
            expect(event).toBeTruthy();
            expect(event).toEqual({
                previousIndex: 1,
                currentIndex: 3,
                item: groups[0][1],
                container: dropInstances[1],
                previousContainer: dropInstances[0]
            });
        }));
    });
});
var StandaloneDraggable = /** @class */ (function () {
    function StandaloneDraggable() {
        this.startedSpy = jasmine.createSpy('started spy');
        this.endedSpy = jasmine.createSpy('ended spy');
    }
    StandaloneDraggable.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <div\n      cdkDrag\n      (cdkDragStarted)=\"startedSpy($event)\"\n      (cdkDragEnded)=\"endedSpy($event)\"\n      #dragElement\n      style=\"width: 100px; height: 100px; background: red;\"></div>\n  "
                },] },
    ];
    /** @nocollapse */
    StandaloneDraggable.propDecorators = {
        "dragElement": [{ type: core_1.ViewChild, args: ['dragElement',] },],
        "dragInstance": [{ type: core_1.ViewChild, args: [drag_1.CdkDrag,] },],
    };
    return StandaloneDraggable;
}());
exports.StandaloneDraggable = StandaloneDraggable;
var StandaloneDraggableWithHandle = /** @class */ (function () {
    function StandaloneDraggableWithHandle() {
    }
    StandaloneDraggableWithHandle.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <div #dragElement cdkDrag\n      style=\"width: 100px; height: 100px; background: red; position: relative\">\n      <div #handleElement cdkDragHandle style=\"width: 10px; height: 10px; background: green;\"></div>\n    </div>\n  "
                },] },
    ];
    /** @nocollapse */
    StandaloneDraggableWithHandle.propDecorators = {
        "dragElement": [{ type: core_1.ViewChild, args: ['dragElement',] },],
        "handleElement": [{ type: core_1.ViewChild, args: ['handleElement',] },],
    };
    return StandaloneDraggableWithHandle;
}());
exports.StandaloneDraggableWithHandle = StandaloneDraggableWithHandle;
var StandaloneDraggableWithDelayedHandle = /** @class */ (function () {
    function StandaloneDraggableWithDelayedHandle() {
        this.showHandle = false;
    }
    StandaloneDraggableWithDelayedHandle.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <div #dragElement cdkDrag\n      style=\"width: 100px; height: 100px; background: red; position: relative\">\n      <div\n        #handleElement\n        *ngIf=\"showHandle\"\n        cdkDragHandle style=\"width: 10px; height: 10px; background: green;\"></div>\n    </div>\n  "
                },] },
    ];
    /** @nocollapse */
    StandaloneDraggableWithDelayedHandle.propDecorators = {
        "dragElement": [{ type: core_1.ViewChild, args: ['dragElement',] },],
        "handleElement": [{ type: core_1.ViewChild, args: ['handleElement',] },],
    };
    return StandaloneDraggableWithDelayedHandle;
}());
exports.StandaloneDraggableWithDelayedHandle = StandaloneDraggableWithDelayedHandle;
var StandaloneDraggableWithMultipleHandles = /** @class */ (function () {
    function StandaloneDraggableWithMultipleHandles() {
    }
    StandaloneDraggableWithMultipleHandles.decorators = [
        { type: core_1.Component, args: [{
                    encapsulation: core_1.ViewEncapsulation.None,
                    styles: ["\n    .cdk-drag-handle {\n      position: absolute;\n      top: 0;\n      background: green;\n      width: 10px;\n      height: 10px;\n    }\n  "],
                    template: "\n    <div #dragElement cdkDrag\n      style=\"width: 100px; height: 100px; background: red; position: relative\">\n      <div cdkDragHandle style=\"left: 0;\"></div>\n      <div cdkDragHandle style=\"right: 0;\"></div>\n    </div>\n  "
                },] },
    ];
    /** @nocollapse */
    StandaloneDraggableWithMultipleHandles.propDecorators = {
        "dragElement": [{ type: core_1.ViewChild, args: ['dragElement',] },],
        "handles": [{ type: core_1.ViewChildren, args: [drag_handle_1.CdkDragHandle,] },],
    };
    return StandaloneDraggableWithMultipleHandles;
}());
exports.StandaloneDraggableWithMultipleHandles = StandaloneDraggableWithMultipleHandles;
var DraggableInDropZone = /** @class */ (function () {
    function DraggableInDropZone() {
        var _this = this;
        this.items = ['Zero', 'One', 'Two', 'Three'];
        this.dropZoneId = 'items';
        this.droppedSpy = jasmine.createSpy('dropped spy').and.callFake(function (event) {
            drag_utils_1.moveItemInArray(_this.items, event.previousIndex, event.currentIndex);
        });
    }
    DraggableInDropZone.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <cdk-drop\n      style=\"display: block; width: 100px; background: pink;\"\n      [id]=\"dropZoneId\"\n      [data]=\"items\"\n      (dropped)=\"droppedSpy($event)\">\n      <div\n        *ngFor=\"let item of items\"\n        cdkDrag\n        [cdkDragData]=\"item\"\n        style=\"width: 100%; height: " + ITEM_HEIGHT + "px; background: red;\">{{item}}</div>\n    </cdk-drop>\n  "
                },] },
    ];
    /** @nocollapse */
    DraggableInDropZone.propDecorators = {
        "dragItems": [{ type: core_1.ViewChildren, args: [drag_1.CdkDrag,] },],
        "dropInstance": [{ type: core_1.ViewChild, args: [drop_1.CdkDrop,] },],
    };
    return DraggableInDropZone;
}());
exports.DraggableInDropZone = DraggableInDropZone;
var DraggableInHorizontalDropZone = /** @class */ (function () {
    function DraggableInHorizontalDropZone() {
        var _this = this;
        this.items = ['Zero', 'One', 'Two', 'Three'];
        this.droppedSpy = jasmine.createSpy('dropped spy').and.callFake(function (event) {
            drag_utils_1.moveItemInArray(_this.items, event.previousIndex, event.currentIndex);
        });
    }
    DraggableInHorizontalDropZone.decorators = [
        { type: core_1.Component, args: [{
                    encapsulation: core_1.ViewEncapsulation.None,
                    styles: [
                        // Use inline blocks here to avoid flexbox issues and not to have to flip floats in rtl.
                        "\n    .cdk-drop {\n      display: block;\n      width: 300px;\n      background: pink;\n      font-size: 0;\n    }\n\n    .cdk-drag {\n      width: " + ITEM_WIDTH + "px;\n      height: " + ITEM_HEIGHT + "px;\n      background: red;\n      display: inline-block;\n    }\n  "
                    ],
                    template: "\n    <cdk-drop\n      orientation=\"horizontal\"\n      [data]=\"items\"\n      (dropped)=\"droppedSpy($event)\">\n      <div *ngFor=\"let item of items\" cdkDrag>{{item}}</div>\n    </cdk-drop>\n  "
                },] },
    ];
    /** @nocollapse */
    DraggableInHorizontalDropZone.propDecorators = {
        "dragItems": [{ type: core_1.ViewChildren, args: [drag_1.CdkDrag,] },],
        "dropInstance": [{ type: core_1.ViewChild, args: [drop_1.CdkDrop,] },],
    };
    return DraggableInHorizontalDropZone;
}());
exports.DraggableInHorizontalDropZone = DraggableInHorizontalDropZone;
var DraggableInDropZoneWithCustomPreview = /** @class */ (function () {
    function DraggableInDropZoneWithCustomPreview() {
        this.items = ['Zero', 'One', 'Two', 'Three'];
    }
    DraggableInDropZoneWithCustomPreview.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <cdk-drop style=\"display: block; width: 100px; background: pink;\">\n      <div *ngFor=\"let item of items\" cdkDrag\n        style=\"width: 100%; height: " + ITEM_HEIGHT + "px; background: red;\">\n          {{item}}\n          <div class=\"custom-preview\" *cdkDragPreview>Custom preview</div>\n      </div>\n    </cdk-drop>\n  "
                },] },
    ];
    /** @nocollapse */
    DraggableInDropZoneWithCustomPreview.propDecorators = {
        "dropInstance": [{ type: core_1.ViewChild, args: [drop_1.CdkDrop,] },],
        "dragItems": [{ type: core_1.ViewChildren, args: [drag_1.CdkDrag,] },],
    };
    return DraggableInDropZoneWithCustomPreview;
}());
exports.DraggableInDropZoneWithCustomPreview = DraggableInDropZoneWithCustomPreview;
var DraggableInDropZoneWithCustomPlaceholder = /** @class */ (function () {
    function DraggableInDropZoneWithCustomPlaceholder() {
        this.items = ['Zero', 'One', 'Two', 'Three'];
    }
    DraggableInDropZoneWithCustomPlaceholder.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <cdk-drop style=\"display: block; width: 100px; background: pink;\">\n      <div *ngFor=\"let item of items\" cdkDrag\n        style=\"width: 100%; height: " + ITEM_HEIGHT + "px; background: red;\">\n          {{item}}\n          <div class=\"custom-placeholder\" *cdkDragPlaceholder>Custom placeholder</div>\n      </div>\n    </cdk-drop>\n  "
                },] },
    ];
    /** @nocollapse */
    DraggableInDropZoneWithCustomPlaceholder.propDecorators = {
        "dragItems": [{ type: core_1.ViewChildren, args: [drag_1.CdkDrag,] },],
    };
    return DraggableInDropZoneWithCustomPlaceholder;
}());
exports.DraggableInDropZoneWithCustomPlaceholder = DraggableInDropZoneWithCustomPlaceholder;
var ConnectedDropZones = /** @class */ (function () {
    function ConnectedDropZones() {
        this.groupedDragItems = [];
        this.todo = ['Zero', 'One', 'Two', 'Three'];
        this.done = ['Four', 'Five', 'Six'];
        this.droppedSpy = jasmine.createSpy('dropped spy');
    }
    ConnectedDropZones.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.dropInstances.forEach(function (dropZone, index) {
            if (!_this.groupedDragItems[index]) {
                _this.groupedDragItems.push([]);
            }
            (_a = _this.groupedDragItems[index]).push.apply(_a, dropZone._draggables.toArray());
            var _a;
        });
    };
    ConnectedDropZones.decorators = [
        { type: core_1.Component, args: [{
                    encapsulation: core_1.ViewEncapsulation.None,
                    styles: ["\n    .cdk-drop {\n      display: block;\n      width: 100px;\n      min-height: " + ITEM_HEIGHT + "px;\n      background: hotpink;\n    }\n\n    .cdk-drag {\n      display: block;\n      height: " + ITEM_HEIGHT + "px;\n      background: red;\n    }\n  "],
                    template: "\n    <cdk-drop\n      #todoZone\n      [data]=\"todo\"\n      [connectedTo]=\"[doneZone]\"\n      (dropped)=\"droppedSpy($event)\">\n      <div [cdkDragData]=\"item\" *ngFor=\"let item of todo\" cdkDrag>{{item}}</div>\n    </cdk-drop>\n\n    <cdk-drop\n      #doneZone\n      [data]=\"done\"\n      [connectedTo]=\"[todoZone]\"\n      (dropped)=\"droppedSpy($event)\">\n      <div [cdkDragData]=\"item\" *ngFor=\"let item of done\" cdkDrag>{{item}}</div>\n    </cdk-drop>\n  "
                },] },
    ];
    /** @nocollapse */
    ConnectedDropZones.propDecorators = {
        "rawDragItems": [{ type: core_1.ViewChildren, args: [drag_1.CdkDrag,] },],
        "dropInstances": [{ type: core_1.ViewChildren, args: [drop_1.CdkDrop,] },],
    };
    return ConnectedDropZones;
}());
exports.ConnectedDropZones = ConnectedDropZones;
/**
 * Drags an element to a position on the page using the mouse.
 * @param fixture Fixture on which to run change detection.
 * @param element Element which is being dragged.
 * @param x Position along the x axis to which to drag the element.
 * @param y Position along the y axis to which to drag the element.
 */
function dragElementViaMouse(fixture, element, x, y) {
    testing_2.dispatchMouseEvent(element, 'mousedown');
    fixture.detectChanges();
    testing_2.dispatchMouseEvent(document, 'mousemove', x, y);
    fixture.detectChanges();
    testing_2.dispatchMouseEvent(document, 'mouseup');
    fixture.detectChanges();
}
/**
 * Drags an element to a position on the page using a touch device.
 * @param fixture Fixture on which to run change detection.
 * @param element Element which is being dragged.
 * @param x Position along the x axis to which to drag the element.
 * @param y Position along the y axis to which to drag the element.
 */
function dragElementViaTouch(fixture, element, x, y) {
    testing_2.dispatchTouchEvent(element, 'touchstart');
    fixture.detectChanges();
    testing_2.dispatchTouchEvent(document, 'touchmove', x, y);
    fixture.detectChanges();
    testing_2.dispatchTouchEvent(document, 'touchend');
    fixture.detectChanges();
}
/** Gets the index of an element among its siblings, based on their position on the page. */
function getElementIndexByPosition(element, direction) {
    if (!element.parentElement) {
        return -1;
    }
    return Array.from(element.parentElement.children)
        .sort(function (a, b) { return a.getBoundingClientRect()[direction] - b.getBoundingClientRect()[direction]; })
        .indexOf(element);
}
/**
 * Adds a large element to the page in order to make it scrollable.
 * @returns Function that should be used to clean up after the test is done.
 */
function makePageScrollable() {
    var veryTallElement = document.createElement('div');
    veryTallElement.style.width = '100%';
    veryTallElement.style.height = '2000px';
    document.body.appendChild(veryTallElement);
    return function () {
        scrollTo(0, 0);
        veryTallElement.parentNode.removeChild(veryTallElement);
    };
}
/**
 * Asserts that sorting an element down works correctly.
 * @param fixture Fixture against which to run the assertions.
 * @param items Array of items against which to test sorting.
 */
function assertDownwardSorting(fixture, items) {
    var draggedItem = items[0];
    var _a = draggedItem.getBoundingClientRect(), top = _a.top, left = _a.left;
    testing_2.dispatchMouseEvent(draggedItem, 'mousedown', left, top);
    fixture.detectChanges();
    var placeholder = document.querySelector('.cdk-drag-placeholder');
    // Drag over each item one-by-one going downwards.
    for (var i = 0; i < items.length; i++) {
        var elementRect = items[i].getBoundingClientRect();
        // Add a few pixels to the top offset so we get some overlap.
        // Add a few pixels to the top offset so we get some overlap.
        testing_2.dispatchMouseEvent(document, 'mousemove', elementRect.left, elementRect.top + 5);
        fixture.detectChanges();
        expect(getElementIndexByPosition(placeholder, 'top')).toBe(i);
    }
    testing_2.dispatchMouseEvent(document, 'mouseup');
    fixture.detectChanges();
    testing_1.flush();
}
/**
 * Asserts that sorting an element up works correctly.
 * @param fixture Fixture against which to run the assertions.
 * @param items Array of items against which to test sorting.
 */
function assertUpwardSorting(fixture, items) {
    var draggedItem = items[items.length - 1];
    var _a = draggedItem.getBoundingClientRect(), top = _a.top, left = _a.left;
    testing_2.dispatchMouseEvent(draggedItem, 'mousedown', left, top);
    fixture.detectChanges();
    var placeholder = document.querySelector('.cdk-drag-placeholder');
    // Drag over each item one-by-one going upwards.
    for (var i = items.length - 1; i > -1; i--) {
        var elementRect = items[i].getBoundingClientRect();
        // Remove a few pixels from the bottom offset so we get some overlap.
        // Remove a few pixels from the bottom offset so we get some overlap.
        testing_2.dispatchMouseEvent(document, 'mousemove', elementRect.left, elementRect.bottom - 5);
        fixture.detectChanges();
        expect(getElementIndexByPosition(placeholder, 'top')).toBe(i);
    }
    testing_2.dispatchMouseEvent(document, 'mouseup');
    fixture.detectChanges();
    testing_1.flush();
}
//# sourceMappingURL=drag.spec.js.map