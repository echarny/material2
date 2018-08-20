"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bidi_1 = require("@angular/cdk/bidi");
var keycodes_1 = require("@angular/cdk/keycodes");
var testing_1 = require("@angular/cdk/testing");
var core_1 = require("@angular/core");
var testing_2 = require("@angular/core/testing");
var platform_browser_1 = require("@angular/platform-browser");
var index_1 = require("./index");
describe('Chips', function () {
    var fixture;
    var chipDebugElement;
    var chipNativeElement;
    var chipInstance;
    var dir = 'ltr';
    beforeEach(testing_2.async(function () {
        testing_2.TestBed.configureTestingModule({
            imports: [index_1.MatChipsModule],
            declarations: [BasicChip, SingleChip],
            providers: [{
                    provide: bidi_1.Directionality, useFactory: function () { return ({ value: dir }); }
                }]
        });
        testing_2.TestBed.compileComponents();
    }));
    describe('MatBasicChip', function () {
        beforeEach(function () {
            fixture = testing_2.TestBed.createComponent(BasicChip);
            fixture.detectChanges();
            chipDebugElement = fixture.debugElement.query(platform_browser_1.By.directive(index_1.MatChip));
            chipNativeElement = chipDebugElement.nativeElement;
            chipInstance = chipDebugElement.injector.get(index_1.MatChip);
            document.body.appendChild(chipNativeElement);
        });
        afterEach(function () {
            document.body.removeChild(chipNativeElement);
        });
        it('adds the `mat-basic-chip` class', function () {
            expect(chipNativeElement.classList).toContain('mat-chip');
            expect(chipNativeElement.classList).toContain('mat-basic-chip');
        });
    });
    describe('MatChip', function () {
        var testComponent;
        beforeEach(function () {
            fixture = testing_2.TestBed.createComponent(SingleChip);
            fixture.detectChanges();
            chipDebugElement = fixture.debugElement.query(platform_browser_1.By.directive(index_1.MatChip));
            chipNativeElement = chipDebugElement.nativeElement;
            chipInstance = chipDebugElement.injector.get(index_1.MatChip);
            testComponent = fixture.debugElement.componentInstance;
            document.body.appendChild(chipNativeElement);
        });
        afterEach(function () {
            document.body.removeChild(chipNativeElement);
        });
        describe('basic behaviors', function () {
            it('adds the `mat-chip` class', function () {
                expect(chipNativeElement.classList).toContain('mat-chip');
            });
            it('does not add the `mat-basic-chip` class', function () {
                expect(chipNativeElement.classList).not.toContain('mat-basic-chip');
            });
            it('emits focus only once for multiple clicks', function () {
                var counter = 0;
                chipInstance._onFocus.subscribe(function () {
                    counter++;
                });
                chipNativeElement.focus();
                chipNativeElement.focus();
                fixture.detectChanges();
                expect(counter).toBe(1);
            });
            it('emits destroy on destruction', function () {
                spyOn(testComponent, 'chipDestroy').and.callThrough();
                // Force a destroy callback
                testComponent.shouldShow = false;
                fixture.detectChanges();
                expect(testComponent.chipDestroy).toHaveBeenCalledTimes(1);
            });
            it('allows color customization', function () {
                expect(chipNativeElement.classList).toContain('mat-primary');
                testComponent.color = 'warn';
                fixture.detectChanges();
                expect(chipNativeElement.classList).not.toContain('mat-primary');
                expect(chipNativeElement.classList).toContain('mat-warn');
            });
            it('allows selection', function () {
                spyOn(testComponent, 'chipSelectionChange');
                expect(chipNativeElement.classList).not.toContain('mat-chip-selected');
                testComponent.selected = true;
                fixture.detectChanges();
                expect(chipNativeElement.classList).toContain('mat-chip-selected');
                expect(testComponent.chipSelectionChange)
                    .toHaveBeenCalledWith({ source: chipInstance, isUserInput: false, selected: true });
            });
            it('allows removal', function () {
                spyOn(testComponent, 'chipRemove');
                chipInstance.remove();
                fixture.detectChanges();
                expect(testComponent.chipRemove).toHaveBeenCalledWith({ chip: chipInstance });
            });
        });
        describe('keyboard behavior', function () {
            describe('when selectable is true', function () {
                beforeEach(function () {
                    testComponent.selectable = true;
                    fixture.detectChanges();
                });
                it('should selects/deselects the currently focused chip on SPACE', function () {
                    var SPACE_EVENT = testing_1.createKeyboardEvent('keydown', keycodes_1.SPACE);
                    var CHIP_SELECTED_EVENT = {
                        source: chipInstance,
                        isUserInput: true,
                        selected: true
                    };
                    var CHIP_DESELECTED_EVENT = {
                        source: chipInstance,
                        isUserInput: true,
                        selected: false
                    };
                    spyOn(testComponent, 'chipSelectionChange');
                    // Use the spacebar to select the chip
                    chipInstance._handleKeydown(SPACE_EVENT);
                    fixture.detectChanges();
                    expect(chipInstance.selected).toBeTruthy();
                    expect(testComponent.chipSelectionChange).toHaveBeenCalledTimes(1);
                    expect(testComponent.chipSelectionChange).toHaveBeenCalledWith(CHIP_SELECTED_EVENT);
                    // Use the spacebar to deselect the chip
                    chipInstance._handleKeydown(SPACE_EVENT);
                    fixture.detectChanges();
                    expect(chipInstance.selected).toBeFalsy();
                    expect(testComponent.chipSelectionChange).toHaveBeenCalledTimes(2);
                    expect(testComponent.chipSelectionChange).toHaveBeenCalledWith(CHIP_DESELECTED_EVENT);
                });
                it('should have correct aria-selected', function () {
                    expect(chipNativeElement.getAttribute('aria-selected')).toBe('false');
                    testComponent.selected = true;
                    fixture.detectChanges();
                    expect(chipNativeElement.getAttribute('aria-selected')).toBe('true');
                });
            });
            describe('when selectable is false', function () {
                beforeEach(function () {
                    testComponent.selectable = false;
                    fixture.detectChanges();
                });
                it('SPACE ignores selection', function () {
                    var SPACE_EVENT = testing_1.createKeyboardEvent('keydown', keycodes_1.SPACE);
                    spyOn(testComponent, 'chipSelectionChange');
                    // Use the spacebar to attempt to select the chip
                    chipInstance._handleKeydown(SPACE_EVENT);
                    fixture.detectChanges();
                    expect(chipInstance.selected).toBeFalsy();
                    expect(testComponent.chipSelectionChange).not.toHaveBeenCalled();
                });
                it('should not have the aria-selected attribute', function () {
                    expect(chipNativeElement.hasAttribute('aria-selected')).toBe(false);
                });
            });
            describe('when removable is true', function () {
                beforeEach(function () {
                    testComponent.removable = true;
                    fixture.detectChanges();
                });
                it('DELETE emits the (removed) event', function () {
                    var DELETE_EVENT = testing_1.createKeyboardEvent('keydown', keycodes_1.DELETE);
                    spyOn(testComponent, 'chipRemove');
                    // Use the delete to remove the chip
                    chipInstance._handleKeydown(DELETE_EVENT);
                    fixture.detectChanges();
                    expect(testComponent.chipRemove).toHaveBeenCalled();
                });
                it('BACKSPACE emits the (removed) event', function () {
                    var BACKSPACE_EVENT = testing_1.createKeyboardEvent('keydown', keycodes_1.BACKSPACE);
                    spyOn(testComponent, 'chipRemove');
                    // Use the delete to remove the chip
                    chipInstance._handleKeydown(BACKSPACE_EVENT);
                    fixture.detectChanges();
                    expect(testComponent.chipRemove).toHaveBeenCalled();
                });
            });
            describe('when removable is false', function () {
                beforeEach(function () {
                    testComponent.removable = false;
                    fixture.detectChanges();
                });
                it('DELETE does not emit the (removed) event', function () {
                    var DELETE_EVENT = testing_1.createKeyboardEvent('keydown', keycodes_1.DELETE);
                    spyOn(testComponent, 'chipRemove');
                    // Use the delete to remove the chip
                    chipInstance._handleKeydown(DELETE_EVENT);
                    fixture.detectChanges();
                    expect(testComponent.chipRemove).not.toHaveBeenCalled();
                });
                it('BACKSPACE does not emit the (removed) event', function () {
                    var BACKSPACE_EVENT = testing_1.createKeyboardEvent('keydown', keycodes_1.BACKSPACE);
                    spyOn(testComponent, 'chipRemove');
                    // Use the delete to remove the chip
                    chipInstance._handleKeydown(BACKSPACE_EVENT);
                    fixture.detectChanges();
                    expect(testComponent.chipRemove).not.toHaveBeenCalled();
                });
            });
            it('should update the aria-label for disabled chips', function () {
                expect(chipNativeElement.getAttribute('aria-disabled')).toBe('false');
                testComponent.disabled = true;
                fixture.detectChanges();
                expect(chipNativeElement.getAttribute('aria-disabled')).toBe('true');
            });
            it('should make disabled chips non-focusable', function () {
                expect(chipNativeElement.getAttribute('tabindex')).toBe('-1');
                testComponent.disabled = true;
                fixture.detectChanges();
                expect(chipNativeElement.getAttribute('tabindex')).toBeFalsy();
            });
        });
    });
});
var SingleChip = /** @class */ (function () {
    function SingleChip() {
        this.disabled = false;
        this.name = 'Test';
        this.color = 'primary';
        this.selected = false;
        this.selectable = true;
        this.removable = true;
        this.shouldShow = true;
        this.chipFocus = function () { };
        this.chipDestroy = function () { };
        this.chipSelectionChange = function () { };
        this.chipRemove = function () { };
    }
    SingleChip.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <mat-chip-list>\n      <div *ngIf=\"shouldShow\">\n        <mat-chip [selectable]=\"selectable\" [removable]=\"removable\"\n                 [color]=\"color\" [selected]=\"selected\" [disabled]=\"disabled\"\n                 (focus)=\"chipFocus($event)\" (destroyed)=\"chipDestroy($event)\"\n                 (selectionChange)=\"chipSelectionChange($event)\"\n                 (removed)=\"chipRemove($event)\">\n          {{name}}\n        </mat-chip>\n      </div>\n    </mat-chip-list>"
                },] },
    ];
    return SingleChip;
}());
var BasicChip = /** @class */ (function () {
    function BasicChip() {
    }
    BasicChip.decorators = [
        { type: core_1.Component, args: [{
                    template: "<mat-basic-chip>{{name}}</mat-basic-chip>"
                },] },
    ];
    return BasicChip;
}());
//# sourceMappingURL=chip.spec.js.map