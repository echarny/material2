import { QueryList } from '@angular/core';
import { CdkDrag } from './drag';
import { CdkDrop } from './drop';
export declare class SimpleDropZone {
    dragItems: QueryList<CdkDrag>;
    dropInstances: QueryList<CdkDrop>;
    items: string[];
    showDuplicateContainer: boolean;
}
