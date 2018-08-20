"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var common_1 = require("@angular/common");
var index_1 = require("./index");
describe('MatProgressBar', function () {
    var fakePath = '/fake-path';
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [index_1.MatProgressBarModule],
            declarations: [
                BasicProgressBar,
                BufferProgressBar,
            ],
            providers: [{
                    provide: common_1.Location,
                    useValue: { path: function () { return fakePath; } }
                }]
        });
        testing_1.TestBed.compileComponents();
    }));
    describe('basic progress-bar', function () {
        var fixture;
        beforeEach(function () {
            fixture = testing_1.TestBed.createComponent(BasicProgressBar);
            fixture.detectChanges();
        });
        it('should apply a mode of "determinate" if no mode is provided.', function () {
            var progressElement = fixture.debugElement.query(platform_browser_1.By.css('mat-progress-bar'));
            expect(progressElement.componentInstance.mode).toBe('determinate');
        });
        it('should define default values for value and bufferValue attributes', function () {
            var progressElement = fixture.debugElement.query(platform_browser_1.By.css('mat-progress-bar'));
            expect(progressElement.componentInstance.value).toBe(0);
            expect(progressElement.componentInstance.bufferValue).toBe(0);
        });
        it('should clamp value and bufferValue between 0 and 100', function () {
            var progressElement = fixture.debugElement.query(platform_browser_1.By.css('mat-progress-bar'));
            var progressComponent = progressElement.componentInstance;
            progressComponent.value = 50;
            expect(progressComponent.value).toBe(50);
            progressComponent.value = 999;
            expect(progressComponent.value).toBe(100);
            progressComponent.value = -10;
            expect(progressComponent.value).toBe(0);
            progressComponent.bufferValue = -29;
            expect(progressComponent.bufferValue).toBe(0);
            progressComponent.bufferValue = 9;
            expect(progressComponent.bufferValue).toBe(9);
            progressComponent.bufferValue = 1320;
            expect(progressComponent.bufferValue).toBe(100);
        });
        it('should return the transform attribute for bufferValue and mode', function () {
            var progressElement = fixture.debugElement.query(platform_browser_1.By.css('mat-progress-bar'));
            var progressComponent = progressElement.componentInstance;
            expect(progressComponent._primaryTransform()).toEqual({ transform: 'scaleX(0)' });
            expect(progressComponent._bufferTransform()).toBe(undefined);
            progressComponent.value = 40;
            expect(progressComponent._primaryTransform()).toEqual({ transform: 'scaleX(0.4)' });
            expect(progressComponent._bufferTransform()).toBe(undefined);
            progressComponent.value = 35;
            progressComponent.bufferValue = 55;
            expect(progressComponent._primaryTransform()).toEqual({ transform: 'scaleX(0.35)' });
            expect(progressComponent._bufferTransform()).toBe(undefined);
            progressComponent.mode = 'buffer';
            expect(progressComponent._primaryTransform()).toEqual({ transform: 'scaleX(0.35)' });
            expect(progressComponent._bufferTransform()).toEqual({ transform: 'scaleX(0.55)' });
            progressComponent.value = 60;
            progressComponent.bufferValue = 60;
            expect(progressComponent._primaryTransform()).toEqual({ transform: 'scaleX(0.6)' });
            expect(progressComponent._bufferTransform()).toEqual({ transform: 'scaleX(0.6)' });
        });
        it('should prefix SVG references with the current path', function () {
            var rect = fixture.debugElement.query(platform_browser_1.By.css('rect')).nativeElement;
            expect(rect.getAttribute('fill')).toMatch(/^url\(['"]?\/fake-path#.*['"]?\)$/);
        });
        it('should not be able to tab into the underlying SVG element', function () {
            var svg = fixture.debugElement.query(platform_browser_1.By.css('svg')).nativeElement;
            expect(svg.getAttribute('focusable')).toBe('false');
        });
    });
    describe('buffer progress-bar', function () {
        var fixture;
        beforeEach(function () {
            fixture = testing_1.TestBed.createComponent(BufferProgressBar);
            fixture.detectChanges();
        });
        it('should not modify the mode if a valid mode is provided.', function () {
            var progressElement = fixture.debugElement.query(platform_browser_1.By.css('mat-progress-bar'));
            expect(progressElement.componentInstance.mode).toBe('buffer');
        });
    });
});
var BasicProgressBar = /** @class */ (function () {
    function BasicProgressBar() {
    }
    BasicProgressBar.decorators = [
        { type: core_1.Component, args: [{ template: '<mat-progress-bar></mat-progress-bar>' },] },
    ];
    return BasicProgressBar;
}());
var BufferProgressBar = /** @class */ (function () {
    function BufferProgressBar() {
    }
    BufferProgressBar.decorators = [
        { type: core_1.Component, args: [{ template: '<mat-progress-bar mode="buffer"></mat-progress-bar>' },] },
    ];
    return BufferProgressBar;
}());
//# sourceMappingURL=progress-bar.spec.js.map