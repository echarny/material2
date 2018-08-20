/// <reference types="jasmine" />
import { AfterViewInit, ElementRef, QueryList } from '@angular/core';
import { CdkDrag } from './drag';
import { CdkDrop } from './drop';
import { CdkDragHandle } from './drag-handle';
export declare class StandaloneDraggable {
    dragElement: ElementRef<HTMLElement>;
    dragInstance: CdkDrag;
    startedSpy: jasmine.Spy;
    endedSpy: jasmine.Spy;
}
export declare class StandaloneDraggableWithHandle {
    dragElement: ElementRef<HTMLElement>;
    handleElement: ElementRef<HTMLElement>;
}
export declare class StandaloneDraggableWithDelayedHandle {
    dragElement: ElementRef<HTMLElement>;
    handleElement: ElementRef<HTMLElement>;
    showHandle: boolean;
}
export declare class StandaloneDraggableWithMultipleHandles {
    dragElement: ElementRef<HTMLElement>;
    handles: QueryList<CdkDragHandle>;
}
export declare class DraggableInDropZone {
    dragItems: QueryList<CdkDrag>;
    dropInstance: CdkDrop;
    items: string[];
    dropZoneId: string;
    droppedSpy: jasmine.Spy;
}
export declare class DraggableInHorizontalDropZone {
    dragItems: QueryList<CdkDrag>;
    dropInstance: CdkDrop;
    items: string[];
    droppedSpy: jasmine.Spy;
}
export declare class DraggableInDropZoneWithCustomPreview {
    dropInstance: CdkDrop;
    dragItems: QueryList<CdkDrag>;
    items: string[];
}
export declare class DraggableInDropZoneWithCustomPlaceholder {
    dragItems: QueryList<CdkDrag>;
    items: string[];
}
export declare class ConnectedDropZones implements AfterViewInit {
    rawDragItems: QueryList<CdkDrag>;
    dropInstances: QueryList<CdkDrop>;
    groupedDragItems: CdkDrag[][];
    todo: string[];
    done: string[];
    droppedSpy: jasmine.Spy;
    ngAfterViewInit(): void;
}
