"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var index_1 = require("./index");
describe('MatProgressSpinner', function () {
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [index_1.MatProgressSpinnerModule],
            declarations: [
                BasicProgressSpinner,
                IndeterminateProgressSpinner,
                ProgressSpinnerWithValueAndBoundMode,
                ProgressSpinnerWithColor,
                ProgressSpinnerCustomStrokeWidth,
                ProgressSpinnerCustomDiameter,
                SpinnerWithColor,
                ProgressSpinnerWithStringValues,
            ],
        }).compileComponents();
    }));
    it('should apply a mode of "determinate" if no mode is provided.', function () {
        var fixture = testing_1.TestBed.createComponent(BasicProgressSpinner);
        fixture.detectChanges();
        var progressElement = fixture.debugElement.query(platform_browser_1.By.css('mat-progress-spinner'));
        expect(progressElement.componentInstance.mode).toBe('determinate');
    });
    it('should not modify the mode if a valid mode is provided.', function () {
        var fixture = testing_1.TestBed.createComponent(IndeterminateProgressSpinner);
        fixture.detectChanges();
        var progressElement = fixture.debugElement.query(platform_browser_1.By.css('mat-progress-spinner'));
        expect(progressElement.componentInstance.mode).toBe('indeterminate');
    });
    it('should define a default value of zero for the value attribute', function () {
        var fixture = testing_1.TestBed.createComponent(BasicProgressSpinner);
        fixture.detectChanges();
        var progressElement = fixture.debugElement.query(platform_browser_1.By.css('mat-progress-spinner'));
        expect(progressElement.componentInstance.value).toBe(0);
    });
    it('should set the value to 0 when the mode is set to indeterminate', function () {
        var fixture = testing_1.TestBed.createComponent(ProgressSpinnerWithValueAndBoundMode);
        var progressElement = fixture.debugElement.query(platform_browser_1.By.css('mat-progress-spinner'));
        fixture.componentInstance.mode = 'determinate';
        fixture.detectChanges();
        expect(progressElement.componentInstance.value).toBe(50);
        fixture.componentInstance.mode = 'indeterminate';
        fixture.detectChanges();
        expect(progressElement.componentInstance.value).toBe(0);
    });
    it('should retain the value if it updates while indeterminate', function () {
        var fixture = testing_1.TestBed.createComponent(ProgressSpinnerWithValueAndBoundMode);
        var progressElement = fixture.debugElement.query(platform_browser_1.By.css('mat-progress-spinner'));
        fixture.componentInstance.mode = 'determinate';
        fixture.detectChanges();
        expect(progressElement.componentInstance.value).toBe(50);
        fixture.componentInstance.mode = 'indeterminate';
        fixture.detectChanges();
        expect(progressElement.componentInstance.value).toBe(0);
        fixture.componentInstance.value = 75;
        fixture.detectChanges();
        expect(progressElement.componentInstance.value).toBe(0);
        fixture.componentInstance.mode = 'determinate';
        fixture.detectChanges();
        expect(progressElement.componentInstance.value).toBe(75);
    });
    it('should use different `circle` elements depending on the mode', function () {
        var fixture = testing_1.TestBed.createComponent(ProgressSpinnerWithValueAndBoundMode);
        fixture.componentInstance.mode = 'determinate';
        fixture.detectChanges();
        var determinateCircle = fixture.nativeElement.querySelector('circle');
        fixture.componentInstance.mode = 'indeterminate';
        fixture.detectChanges();
        var indeterminateCircle = fixture.nativeElement.querySelector('circle');
        expect(determinateCircle).toBeTruthy();
        expect(indeterminateCircle).toBeTruthy();
        expect(determinateCircle).not.toBe(indeterminateCircle);
    });
    it('should clamp the value of the progress between 0 and 100', function () {
        var fixture = testing_1.TestBed.createComponent(BasicProgressSpinner);
        fixture.detectChanges();
        var progressElement = fixture.debugElement.query(platform_browser_1.By.css('mat-progress-spinner'));
        var progressComponent = progressElement.componentInstance;
        progressComponent.value = 50;
        expect(progressComponent.value).toBe(50);
        progressComponent.value = 0;
        expect(progressComponent.value).toBe(0);
        progressComponent.value = 100;
        expect(progressComponent.value).toBe(100);
        progressComponent.value = 999;
        expect(progressComponent.value).toBe(100);
        progressComponent.value = -10;
        expect(progressComponent.value).toBe(0);
    });
    it('should default to a stroke width that is 10% of the diameter', function () {
        var fixture = testing_1.TestBed.createComponent(ProgressSpinnerCustomDiameter);
        var spinner = fixture.debugElement.query(platform_browser_1.By.directive(index_1.MatProgressSpinner));
        fixture.componentInstance.diameter = 67;
        fixture.detectChanges();
        expect(spinner.componentInstance.strokeWidth).toBe(6.7);
    });
    it('should allow a custom diameter', function () {
        var fixture = testing_1.TestBed.createComponent(ProgressSpinnerCustomDiameter);
        var spinner = fixture.debugElement.query(platform_browser_1.By.css('mat-progress-spinner')).nativeElement;
        var svgElement = fixture.nativeElement.querySelector('svg');
        fixture.componentInstance.diameter = 32;
        fixture.detectChanges();
        expect(parseInt(spinner.style.width))
            .toBe(32, 'Expected the custom diameter to be applied to the host element width.');
        expect(parseInt(spinner.style.height))
            .toBe(32, 'Expected the custom diameter to be applied to the host element height.');
        expect(parseInt(svgElement.style.width))
            .toBe(32, 'Expected the custom diameter to be applied to the svg element width.');
        expect(parseInt(svgElement.style.height))
            .toBe(32, 'Expected the custom diameter to be applied to the svg element height.');
        expect(svgElement.getAttribute('viewBox'))
            .toBe('0 0 25.2 25.2', 'Expected the custom diameter to be applied to the svg viewBox.');
    });
    it('should allow a custom stroke width', function () {
        var fixture = testing_1.TestBed.createComponent(ProgressSpinnerCustomStrokeWidth);
        fixture.componentInstance.strokeWidth = 40;
        fixture.detectChanges();
        var circleElement = fixture.nativeElement.querySelector('circle');
        var svgElement = fixture.nativeElement.querySelector('svg');
        expect(parseInt(circleElement.style.strokeWidth)).toBe(40, 'Expected the custom stroke ' +
            'width to be applied to the circle element as a percentage of the element size.');
        expect(svgElement.getAttribute('viewBox'))
            .toBe('0 0 130 130', 'Expected the viewBox to be adjusted based on the stroke width.');
    });
    it('should expand the host element if the stroke width is greater than the default', function () {
        var fixture = testing_1.TestBed.createComponent(ProgressSpinnerCustomStrokeWidth);
        var element = fixture.debugElement.nativeElement.querySelector('.mat-progress-spinner');
        fixture.componentInstance.strokeWidth = 40;
        fixture.detectChanges();
        expect(element.style.width).toBe('100px');
        expect(element.style.height).toBe('100px');
    });
    it('should not collapse the host element if the stroke width is less than the default', function () {
        var fixture = testing_1.TestBed.createComponent(ProgressSpinnerCustomStrokeWidth);
        var element = fixture.debugElement.nativeElement.querySelector('.mat-progress-spinner');
        fixture.componentInstance.strokeWidth = 5;
        fixture.detectChanges();
        expect(element.style.width).toBe('100px');
        expect(element.style.height).toBe('100px');
    });
    it('should set the color class on the mat-spinner', function () {
        var fixture = testing_1.TestBed.createComponent(SpinnerWithColor);
        fixture.detectChanges();
        var progressElement = fixture.debugElement.query(platform_browser_1.By.css('mat-spinner'));
        expect(progressElement.nativeElement.classList).toContain('mat-primary');
        fixture.componentInstance.color = 'accent';
        fixture.detectChanges();
        expect(progressElement.nativeElement.classList).toContain('mat-accent');
        expect(progressElement.nativeElement.classList).not.toContain('mat-primary');
    });
    it('should set the color class on the mat-progress-spinner', function () {
        var fixture = testing_1.TestBed.createComponent(ProgressSpinnerWithColor);
        fixture.detectChanges();
        var progressElement = fixture.debugElement.query(platform_browser_1.By.css('mat-progress-spinner'));
        expect(progressElement.nativeElement.classList).toContain('mat-primary');
        fixture.componentInstance.color = 'accent';
        fixture.detectChanges();
        expect(progressElement.nativeElement.classList).toContain('mat-accent');
        expect(progressElement.nativeElement.classList).not.toContain('mat-primary');
    });
    it('should remove the underlying SVG element from the tab order explicitly', function () {
        var fixture = testing_1.TestBed.createComponent(BasicProgressSpinner);
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('svg').getAttribute('focusable')).toBe('false');
    });
    it('should handle the number inputs being passed in as strings', function () {
        var fixture = testing_1.TestBed.createComponent(ProgressSpinnerWithStringValues);
        var spinner = fixture.debugElement.query(platform_browser_1.By.directive(index_1.MatProgressSpinner));
        var svgElement = spinner.nativeElement.querySelector('svg');
        fixture.detectChanges();
        expect(spinner.componentInstance.diameter).toBe(37);
        expect(spinner.componentInstance.strokeWidth).toBe(11);
        expect(spinner.componentInstance.value).toBe(25);
        expect(spinner.nativeElement.style.width).toBe('37px');
        expect(spinner.nativeElement.style.height).toBe('37px');
        expect(svgElement.style.width).toBe('37px');
        expect(svgElement.style.height).toBe('37px');
        expect(svgElement.getAttribute('viewBox')).toBe('0 0 38 38');
    });
    it('should update the element size when changed dynamically', function () {
        var fixture = testing_1.TestBed.createComponent(BasicProgressSpinner);
        var spinner = fixture.debugElement.query(platform_browser_1.By.directive(index_1.MatProgressSpinner));
        spinner.componentInstance.diameter = 32;
        fixture.detectChanges();
        expect(spinner.nativeElement.style.width).toBe('32px');
        expect(spinner.nativeElement.style.height).toBe('32px');
    });
    it('should be able to set a default diameter', function () {
        testing_1.TestBed
            .resetTestingModule()
            .configureTestingModule({
            imports: [index_1.MatProgressSpinnerModule],
            declarations: [BasicProgressSpinner],
            providers: [{
                    provide: index_1.MAT_PROGRESS_SPINNER_DEFAULT_OPTIONS,
                    useValue: { diameter: 23 }
                }]
        })
            .compileComponents();
        var fixture = testing_1.TestBed.createComponent(BasicProgressSpinner);
        fixture.detectChanges();
        var progressElement = fixture.debugElement.query(platform_browser_1.By.css('mat-progress-spinner'));
        expect(progressElement.componentInstance.diameter).toBe(23);
    });
    it('should be able to set a default stroke width', function () {
        testing_1.TestBed
            .resetTestingModule()
            .configureTestingModule({
            imports: [index_1.MatProgressSpinnerModule],
            declarations: [BasicProgressSpinner],
            providers: [{
                    provide: index_1.MAT_PROGRESS_SPINNER_DEFAULT_OPTIONS,
                    useValue: { strokeWidth: 7 }
                }]
        })
            .compileComponents();
        var fixture = testing_1.TestBed.createComponent(BasicProgressSpinner);
        fixture.detectChanges();
        var progressElement = fixture.debugElement.query(platform_browser_1.By.css('mat-progress-spinner'));
        expect(progressElement.componentInstance.strokeWidth).toBe(7);
    });
});
var BasicProgressSpinner = /** @class */ (function () {
    function BasicProgressSpinner() {
    }
    BasicProgressSpinner.decorators = [
        { type: core_1.Component, args: [{ template: '<mat-progress-spinner></mat-progress-spinner>' },] },
    ];
    return BasicProgressSpinner;
}());
var ProgressSpinnerCustomStrokeWidth = /** @class */ (function () {
    function ProgressSpinnerCustomStrokeWidth() {
    }
    ProgressSpinnerCustomStrokeWidth.decorators = [
        { type: core_1.Component, args: [{ template: '<mat-progress-spinner [strokeWidth]="strokeWidth"></mat-progress-spinner>' },] },
    ];
    return ProgressSpinnerCustomStrokeWidth;
}());
var ProgressSpinnerCustomDiameter = /** @class */ (function () {
    function ProgressSpinnerCustomDiameter() {
    }
    ProgressSpinnerCustomDiameter.decorators = [
        { type: core_1.Component, args: [{ template: '<mat-progress-spinner [diameter]="diameter"></mat-progress-spinner>' },] },
    ];
    return ProgressSpinnerCustomDiameter;
}());
var IndeterminateProgressSpinner = /** @class */ (function () {
    function IndeterminateProgressSpinner() {
    }
    IndeterminateProgressSpinner.decorators = [
        { type: core_1.Component, args: [{ template: '<mat-progress-spinner mode="indeterminate"></mat-progress-spinner>' },] },
    ];
    return IndeterminateProgressSpinner;
}());
var ProgressSpinnerWithValueAndBoundMode = /** @class */ (function () {
    function ProgressSpinnerWithValueAndBoundMode() {
        this.mode = 'indeterminate';
        this.value = 50;
    }
    ProgressSpinnerWithValueAndBoundMode.decorators = [
        { type: core_1.Component, args: [{
                    template: '<mat-progress-spinner [value]="value" [mode]="mode"></mat-progress-spinner>'
                },] },
    ];
    return ProgressSpinnerWithValueAndBoundMode;
}());
var SpinnerWithColor = /** @class */ (function () {
    function SpinnerWithColor() {
        this.color = 'primary';
    }
    SpinnerWithColor.decorators = [
        { type: core_1.Component, args: [{ template: "<mat-spinner [color]=\"color\"></mat-spinner>" },] },
    ];
    return SpinnerWithColor;
}());
var ProgressSpinnerWithColor = /** @class */ (function () {
    function ProgressSpinnerWithColor() {
        this.color = 'primary';
    }
    ProgressSpinnerWithColor.decorators = [
        { type: core_1.Component, args: [{ template: "<mat-progress-spinner value=\"50\" [color]=\"color\"></mat-progress-spinner>" },] },
    ];
    return ProgressSpinnerWithColor;
}());
var ProgressSpinnerWithStringValues = /** @class */ (function () {
    function ProgressSpinnerWithStringValues() {
    }
    ProgressSpinnerWithStringValues.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <mat-progress-spinner value=\"25\" diameter=\"37\" strokeWidth=\"11\"></mat-progress-spinner>\n  "
                },] },
    ];
    return ProgressSpinnerWithStringValues;
}());
//# sourceMappingURL=progress-spinner.spec.js.map