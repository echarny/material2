"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/cdk/testing");
var core_1 = require("@angular/core");
var testing_2 = require("@angular/core/testing");
var forms_1 = require("@angular/forms");
var platform_browser_1 = require("@angular/platform-browser");
var animations_1 = require("@angular/platform-browser/animations");
var autosize_1 = require("./autosize");
var text_field_module_1 = require("./text-field-module");
describe('CdkTextareaAutosize', function () {
    var fixture;
    var textarea;
    var autosize;
    beforeEach(testing_2.async(function () {
        testing_2.TestBed.configureTestingModule({
            imports: [
                forms_1.FormsModule,
                text_field_module_1.TextFieldModule,
                animations_1.NoopAnimationsModule,
            ],
            declarations: [
                AutosizeTextAreaWithContent,
                AutosizeTextAreaWithValue,
                AutosizeTextareaWithNgModel,
                AutosizeTextareaWithoutAutosize,
            ],
        });
        testing_2.TestBed.compileComponents();
    }));
    beforeEach(function () {
        fixture = testing_2.TestBed.createComponent(AutosizeTextAreaWithContent);
        fixture.detectChanges();
        textarea = fixture.nativeElement.querySelector('textarea');
        autosize = fixture.debugElement.query(platform_browser_1.By.directive(autosize_1.CdkTextareaAutosize)).injector.get(autosize_1.CdkTextareaAutosize);
    });
    it('should resize the textarea based on its content', function () {
        var previousHeight = textarea.clientHeight;
        fixture.componentInstance.content = "\n    Once upon a midnight dreary, while I pondered, weak and weary,\n    Over many a quaint and curious volume of forgotten lore\u2014\n        While I nodded, nearly napping, suddenly there came a tapping,\n    As of some one gently rapping, rapping at my chamber door.\n    \u201C\u2019Tis some visitor,\u201D I muttered, \u201Ctapping at my chamber door\u2014\n                Only this and nothing more.\u201D";
        // Manually call resizeToFitContent instead of faking an `input` event.
        fixture.detectChanges();
        autosize.resizeToFitContent();
        expect(textarea.clientHeight)
            .toBeGreaterThan(previousHeight, 'Expected textarea to have grown with added content.');
        expect(textarea.clientHeight)
            .toBe(textarea.scrollHeight, 'Expected textarea height to match its scrollHeight');
        previousHeight = textarea.clientHeight;
        fixture.componentInstance.content += "\n        Ah, distinctly I remember it was in the bleak December;\n    And each separate dying ember wrought its ghost upon the floor.\n        Eagerly I wished the morrow;\u2014vainly I had sought to borrow\n        From my books surcease of sorrow\u2014sorrow for the lost Lenore\u2014\n    For the rare and radiant maiden whom the angels name Lenore\u2014\n                Nameless here for evermore.";
        fixture.detectChanges();
        autosize.resizeToFitContent();
        expect(textarea.clientHeight)
            .toBeGreaterThan(previousHeight, 'Expected textarea to have grown with added content.');
        expect(textarea.clientHeight)
            .toBe(textarea.scrollHeight, 'Expected textarea height to match its scrollHeight');
    });
    it('should set a min-height based on minRows', function () {
        expect(textarea.style.minHeight).toBeFalsy();
        fixture.componentInstance.minRows = 4;
        fixture.detectChanges();
        expect(textarea.style.minHeight).toBeDefined('Expected a min-height to be set via minRows.');
        var previousMinHeight = parseInt(textarea.style.minHeight);
        fixture.componentInstance.minRows = 6;
        fixture.detectChanges();
        expect(parseInt(textarea.style.minHeight))
            .toBeGreaterThan(previousMinHeight, 'Expected increased min-height with minRows increase.');
    });
    it('should set a max-height based on maxRows', function () {
        expect(textarea.style.maxHeight).toBeFalsy();
        fixture.componentInstance.maxRows = 4;
        fixture.detectChanges();
        expect(textarea.style.maxHeight).toBeDefined('Expected a max-height to be set via maxRows.');
        var previousMaxHeight = parseInt(textarea.style.maxHeight);
        fixture.componentInstance.maxRows = 6;
        fixture.detectChanges();
        expect(parseInt(textarea.style.maxHeight))
            .toBeGreaterThan(previousMaxHeight, 'Expected increased max-height with maxRows increase.');
    });
    it('should export the cdkAutosize reference', function () {
        expect(fixture.componentInstance.autosize).toBeTruthy();
        expect(fixture.componentInstance.autosize.resizeToFitContent).toBeTruthy();
    });
    it('should initially set the rows of a textarea to one', function () {
        expect(textarea.rows)
            .toBe(1, 'Expected the directive to initially set the rows property to one.');
        fixture.componentInstance.minRows = 1;
        fixture.detectChanges();
        expect(textarea.rows)
            .toBe(1, 'Expected the textarea to have the rows property set to one.');
        var previousMinHeight = parseInt(textarea.style.minHeight);
        fixture.componentInstance.minRows = 2;
        fixture.detectChanges();
        expect(textarea.rows).toBe(1, 'Expected the rows property to be set to one. ' +
            'The amount of rows will be specified using CSS.');
        expect(parseInt(textarea.style.minHeight))
            .toBeGreaterThan(previousMinHeight, 'Expected the textarea to grow to two rows.');
    });
    it('should calculate the proper height based on the specified amount of max rows', function () {
        fixture.componentInstance.content = [1, 2, 3, 4, 5, 6, 7, 8].join('\n');
        fixture.detectChanges();
        autosize.resizeToFitContent();
        expect(textarea.clientHeight)
            .toBe(textarea.scrollHeight, 'Expected textarea to not have a vertical scrollbar.');
        fixture.componentInstance.maxRows = 5;
        fixture.detectChanges();
        expect(textarea.clientHeight)
            .toBeLessThan(textarea.scrollHeight, 'Expected textarea to have a vertical scrollbar.');
    });
    it('should properly resize to content on init', function () {
        // Manually create the test component in this test, because in this test the first change
        // detection should be triggered after a multiline content is set.
        fixture = testing_2.TestBed.createComponent(AutosizeTextAreaWithContent);
        textarea = fixture.nativeElement.querySelector('textarea');
        autosize = fixture.debugElement.query(platform_browser_1.By.css('textarea')).injector.get(autosize_1.CdkTextareaAutosize);
        fixture.componentInstance.content = "\n      Line\n      Line\n      Line\n      Line\n      Line";
        fixture.detectChanges();
        expect(textarea.clientHeight)
            .toBe(textarea.scrollHeight, 'Expected textarea height to match its scrollHeight');
    });
    it('should resize when an associated form control value changes', testing_2.fakeAsync(function () {
        var fixtureWithForms = testing_2.TestBed.createComponent(AutosizeTextareaWithNgModel);
        textarea = fixtureWithForms.nativeElement.querySelector('textarea');
        fixtureWithForms.detectChanges();
        var previousHeight = textarea.clientHeight;
        fixtureWithForms.componentInstance.model = "\n        And the silken, sad, uncertain rustling of each purple curtain\n    Thrilled me\u2014filled me with fantastic terrors never felt before;\n        So that now, to still the beating of my heart, I stood repeating\n        \u201C\u2019Tis some visitor entreating entrance at my chamber door\u2014\n    Some late visitor entreating entrance at my chamber door;\u2014\n                This it is and nothing more.\u201D ";
        fixtureWithForms.detectChanges();
        testing_2.flush();
        fixtureWithForms.detectChanges();
        expect(textarea.clientHeight)
            .toBeGreaterThan(previousHeight, 'Expected increased height when ngModel is updated.');
    }));
    it('should resize when the textarea value is changed programmatically', testing_2.fakeAsync(function () {
        var previousHeight = textarea.clientHeight;
        textarea.value = "\n      How much wood would a woodchuck chuck\n      if a woodchuck could chuck wood?\n    ";
        fixture.detectChanges();
        testing_2.flush();
        fixture.detectChanges();
        expect(textarea.clientHeight)
            .toBeGreaterThan(previousHeight, 'Expected the textarea height to have increased.');
    }));
    it('should trigger a resize when the window is resized', testing_2.fakeAsync(function () {
        spyOn(autosize, 'resizeToFitContent');
        testing_1.dispatchFakeEvent(window, 'resize');
        testing_2.tick(16);
        expect(autosize.resizeToFitContent).toHaveBeenCalled();
    }));
    it('should not trigger a resize when it is disabled', testing_2.fakeAsync(function () {
        var fixtureWithoutAutosize = testing_2.TestBed.createComponent(AutosizeTextareaWithoutAutosize);
        textarea = fixtureWithoutAutosize.nativeElement.querySelector('textarea');
        autosize = fixtureWithoutAutosize.debugElement.query(platform_browser_1.By.css('textarea'))
            .injector.get(autosize_1.CdkTextareaAutosize);
        fixtureWithoutAutosize.detectChanges();
        var previousHeight = textarea.clientHeight;
        fixtureWithoutAutosize.componentInstance.content = "\n    Line\n    Line\n    Line\n    Line\n    Line";
        // Manually call resizeToFitContent instead of faking an `input` event.
        fixtureWithoutAutosize.detectChanges();
        expect(textarea.clientHeight)
            .toEqual(previousHeight, 'Expected textarea to still have the same size.');
        expect(textarea.clientHeight)
            .toBeLessThan(textarea.scrollHeight, 'Expected textarea to a have scrollbar.');
        autosize.enabled = true;
        fixtureWithoutAutosize.detectChanges();
        expect(textarea.clientHeight)
            .toBeGreaterThan(previousHeight, 'Expected textarea to have grown after enabling autosize.');
        expect(textarea.clientHeight)
            .toBe(textarea.scrollHeight, 'Expected textarea not to have a scrollbar');
        autosize.enabled = false;
        fixtureWithoutAutosize.detectChanges();
        expect(textarea.clientHeight)
            .toEqual(previousHeight, 'Expected textarea to have the original size.');
        expect(textarea.clientHeight)
            .toBeLessThan(textarea.scrollHeight, 'Expected textarea to have a scrollbar.');
    }));
});
// Styles to reset padding and border to make measurement comparisons easier.
var textareaStyleReset = "\n    textarea {\n      padding: 0;\n      border: none;\n      overflow: auto;\n    }";
var AutosizeTextAreaWithContent = /** @class */ (function () {
    function AutosizeTextAreaWithContent() {
        this.minRows = null;
        this.maxRows = null;
        this.content = '';
    }
    AutosizeTextAreaWithContent.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <textarea cdkTextareaAutosize [cdkAutosizeMinRows]=\"minRows\" [cdkAutosizeMaxRows]=\"maxRows\"\n        #autosize=\"cdkTextareaAutosize\">\n      {{content}}\n    </textarea>",
                    styles: [textareaStyleReset],
                },] },
    ];
    /** @nocollapse */
    AutosizeTextAreaWithContent.propDecorators = {
        "autosize": [{ type: core_1.ViewChild, args: ['autosize',] },],
    };
    return AutosizeTextAreaWithContent;
}());
var AutosizeTextAreaWithValue = /** @class */ (function () {
    function AutosizeTextAreaWithValue() {
        this.value = '';
    }
    AutosizeTextAreaWithValue.decorators = [
        { type: core_1.Component, args: [{
                    template: "<textarea cdkTextareaAutosize [value]=\"value\"></textarea>",
                    styles: [textareaStyleReset],
                },] },
    ];
    return AutosizeTextAreaWithValue;
}());
var AutosizeTextareaWithNgModel = /** @class */ (function () {
    function AutosizeTextareaWithNgModel() {
        this.model = '';
    }
    AutosizeTextareaWithNgModel.decorators = [
        { type: core_1.Component, args: [{
                    template: "<textarea cdkTextareaAutosize [(ngModel)]=\"model\"></textarea>",
                    styles: [textareaStyleReset],
                },] },
    ];
    return AutosizeTextareaWithNgModel;
}());
var AutosizeTextareaWithoutAutosize = /** @class */ (function () {
    function AutosizeTextareaWithoutAutosize() {
        this.content = '';
    }
    AutosizeTextareaWithoutAutosize.decorators = [
        { type: core_1.Component, args: [{
                    template: "<textarea [cdkTextareaAutosize]=\"false\">{{content}}</textarea>",
                    styles: [textareaStyleReset],
                },] },
    ];
    return AutosizeTextareaWithoutAutosize;
}());
//# sourceMappingURL=autosize.spec.js.map