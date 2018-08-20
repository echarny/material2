"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bidi_1 = require("@angular/cdk/bidi");
var keycodes_1 = require("@angular/cdk/keycodes");
var platform_1 = require("@angular/cdk/platform");
var testing_1 = require("@angular/cdk/testing");
var core_1 = require("@angular/core");
var testing_2 = require("@angular/core/testing");
var platform_browser_1 = require("@angular/platform-browser");
var animations_1 = require("@angular/platform-browser/animations");
var form_field_1 = require("@angular/material/form-field");
var chip_input_1 = require("./chip-input");
var index_1 = require("./index");
var chip_default_options_1 = require("./chip-default-options");
describe('MatChipInput', function () {
    var fixture;
    var testChipInput;
    var inputDebugElement;
    var inputNativeElement;
    var chipInputDirective;
    var dir = 'ltr';
    beforeEach(testing_2.async(function () {
        testing_2.TestBed.configureTestingModule({
            imports: [platform_1.PlatformModule, index_1.MatChipsModule, form_field_1.MatFormFieldModule, animations_1.NoopAnimationsModule],
            declarations: [TestChipInput],
            providers: [{
                    provide: bidi_1.Directionality, useFactory: function () {
                        return { value: dir.toLowerCase() };
                    }
                }]
        });
        testing_2.TestBed.compileComponents();
    }));
    beforeEach(testing_2.async(function () {
        fixture = testing_2.TestBed.createComponent(TestChipInput);
        testChipInput = fixture.debugElement.componentInstance;
        fixture.detectChanges();
        inputDebugElement = fixture.debugElement.query(platform_browser_1.By.directive(chip_input_1.MatChipInput));
        chipInputDirective = inputDebugElement.injector.get(chip_input_1.MatChipInput);
        inputNativeElement = inputDebugElement.nativeElement;
    }));
    describe('basic behavior', function () {
        it('emits the (chipEnd) on enter keyup', function () {
            var ENTER_EVENT = testing_1.createKeyboardEvent('keydown', keycodes_1.ENTER, inputNativeElement);
            spyOn(testChipInput, 'add');
            chipInputDirective._keydown(ENTER_EVENT);
            expect(testChipInput.add).toHaveBeenCalled();
        });
        it('should have a default id', function () {
            expect(inputNativeElement.getAttribute('id')).toBeTruthy();
        });
        it('should allow binding to the `placeholder` input', function () {
            expect(inputNativeElement.hasAttribute('placeholder')).toBe(false);
            testChipInput.placeholder = 'bound placeholder';
            fixture.detectChanges();
            expect(inputNativeElement.getAttribute('placeholder')).toBe('bound placeholder');
        });
        it('should propagate the dynamic `placeholder` value to the form field', function () {
            fixture.componentInstance.placeholder = 'add a chip';
            fixture.detectChanges();
            var label = fixture.nativeElement.querySelector('.mat-form-field-label');
            expect(label).toBeTruthy();
            expect(label.textContent).toContain('add a chip');
            fixture.componentInstance.placeholder = 'or don\'t';
            fixture.detectChanges();
            expect(label.textContent).toContain('or don\'t');
        });
    });
    describe('[addOnBlur]', function () {
        it('allows (chipEnd) when true', function () {
            spyOn(testChipInput, 'add');
            testChipInput.addOnBlur = true;
            fixture.detectChanges();
            chipInputDirective._blur();
            expect(testChipInput.add).toHaveBeenCalled();
        });
        it('disallows (chipEnd) when false', function () {
            spyOn(testChipInput, 'add');
            testChipInput.addOnBlur = false;
            fixture.detectChanges();
            chipInputDirective._blur();
            expect(testChipInput.add).not.toHaveBeenCalled();
        });
    });
    describe('[separatorKeyCodes]', function () {
        it('does not emit (chipEnd) when a non-separator key is pressed', function () {
            var ENTER_EVENT = testing_1.createKeyboardEvent('keydown', keycodes_1.ENTER, inputNativeElement);
            spyOn(testChipInput, 'add');
            chipInputDirective.separatorKeyCodes = [keycodes_1.COMMA];
            fixture.detectChanges();
            chipInputDirective._keydown(ENTER_EVENT);
            expect(testChipInput.add).not.toHaveBeenCalled();
        });
        it('emits (chipEnd) when a custom separator keys is pressed', function () {
            var COMMA_EVENT = testing_1.createKeyboardEvent('keydown', keycodes_1.COMMA, inputNativeElement);
            spyOn(testChipInput, 'add');
            chipInputDirective.separatorKeyCodes = [keycodes_1.COMMA];
            fixture.detectChanges();
            chipInputDirective._keydown(COMMA_EVENT);
            expect(testChipInput.add).toHaveBeenCalled();
        });
        it('emits accepts the custom separator keys in a Set', function () {
            var COMMA_EVENT = testing_1.createKeyboardEvent('keydown', keycodes_1.COMMA, inputNativeElement);
            spyOn(testChipInput, 'add');
            chipInputDirective.separatorKeyCodes = new Set([keycodes_1.COMMA]);
            fixture.detectChanges();
            chipInputDirective._keydown(COMMA_EVENT);
            expect(testChipInput.add).toHaveBeenCalled();
        });
        it('emits (chipEnd) when the separator keys are configured globally', function () {
            fixture.destroy();
            testing_2.TestBed
                .resetTestingModule()
                .configureTestingModule({
                imports: [index_1.MatChipsModule, form_field_1.MatFormFieldModule, platform_1.PlatformModule, animations_1.NoopAnimationsModule],
                declarations: [TestChipInput],
                providers: [{
                        provide: chip_default_options_1.MAT_CHIPS_DEFAULT_OPTIONS,
                        useValue: { separatorKeyCodes: [keycodes_1.COMMA] }
                    }]
            })
                .compileComponents();
            fixture = testing_2.TestBed.createComponent(TestChipInput);
            testChipInput = fixture.debugElement.componentInstance;
            fixture.detectChanges();
            inputDebugElement = fixture.debugElement.query(platform_browser_1.By.directive(chip_input_1.MatChipInput));
            chipInputDirective = inputDebugElement.injector.get(chip_input_1.MatChipInput);
            inputNativeElement = inputDebugElement.nativeElement;
            spyOn(testChipInput, 'add');
            fixture.detectChanges();
            chipInputDirective._keydown(testing_1.createKeyboardEvent('keydown', keycodes_1.COMMA, inputNativeElement));
            expect(testChipInput.add).toHaveBeenCalled();
        });
    });
});
var TestChipInput = /** @class */ (function () {
    function TestChipInput() {
        this.addOnBlur = false;
        this.placeholder = '';
    }
    TestChipInput.prototype.add = function (_) {
    };
    TestChipInput.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <mat-form-field>\n      <mat-chip-list #chipList>\n      </mat-chip-list>\n      <input matInput [matChipInputFor]=\"chipList\"\n                [matChipInputAddOnBlur]=\"addOnBlur\"\n                (matChipInputTokenEnd)=\"add($event)\"\n                [placeholder]=\"placeholder\" />\n    </mat-form-field>\n  "
                },] },
    ];
    return TestChipInput;
}());
//# sourceMappingURL=chip-input.spec.js.map