"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var animations_1 = require("@angular/platform-browser/animations");
var index_1 = require("./index");
var keycodes_1 = require("@angular/cdk/keycodes");
var testing_2 = require("@angular/cdk/testing");
describe('MatExpansionPanel', function () {
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [
                index_1.MatExpansionModule,
                animations_1.NoopAnimationsModule,
            ],
            declarations: [
                PanelWithContent,
                PanelWithContentInNgIf,
                PanelWithCustomMargin,
                LazyPanelWithContent,
                LazyPanelOpenOnLoad,
                PanelWithTwoWayBinding,
            ],
        });
        testing_1.TestBed.compileComponents();
    }));
    it('should expand and collapse the panel', testing_1.fakeAsync(function () {
        var fixture = testing_1.TestBed.createComponent(PanelWithContent);
        var contentEl = fixture.nativeElement.querySelector('.mat-expansion-panel-content');
        var headerEl = fixture.nativeElement.querySelector('.mat-expansion-panel-header');
        fixture.detectChanges();
        expect(headerEl.classList).not.toContain('mat-expanded');
        expect(contentEl.classList).not.toContain('mat-expanded');
        fixture.componentInstance.expanded = true;
        fixture.detectChanges();
        testing_1.flush();
        expect(headerEl.classList).toContain('mat-expanded');
        expect(contentEl.classList).toContain('mat-expanded');
    }));
    it('should be able to render panel content lazily', testing_1.fakeAsync(function () {
        var fixture = testing_1.TestBed.createComponent(LazyPanelWithContent);
        var content = fixture.debugElement.query(platform_browser_1.By.css('.mat-expansion-panel-content')).nativeElement;
        fixture.detectChanges();
        expect(content.textContent.trim()).toBe('', 'Expected content element to be empty.');
        fixture.componentInstance.expanded = true;
        fixture.detectChanges();
        expect(content.textContent.trim())
            .toContain('Some content', 'Expected content to be rendered.');
    }));
    it('should render the content for a lazy-loaded panel that is opened on init', testing_1.fakeAsync(function () {
        var fixture = testing_1.TestBed.createComponent(LazyPanelOpenOnLoad);
        var content = fixture.debugElement.query(platform_browser_1.By.css('.mat-expansion-panel-content')).nativeElement;
        fixture.detectChanges();
        expect(content.textContent.trim())
            .toContain('Some content', 'Expected content to be rendered.');
    }));
    it('emit correct events for change in panel expanded state', function () {
        var fixture = testing_1.TestBed.createComponent(PanelWithContent);
        fixture.componentInstance.expanded = true;
        fixture.detectChanges();
        expect(fixture.componentInstance.openCallback).toHaveBeenCalled();
        fixture.componentInstance.expanded = false;
        fixture.detectChanges();
        expect(fixture.componentInstance.closeCallback).toHaveBeenCalled();
    });
    it('should create a unique panel id for each panel', function () {
        var fixtureOne = testing_1.TestBed.createComponent(PanelWithContent);
        var headerElOne = fixtureOne.nativeElement.querySelector('.mat-expansion-panel-header');
        var fixtureTwo = testing_1.TestBed.createComponent(PanelWithContent);
        var headerElTwo = fixtureTwo.nativeElement.querySelector('.mat-expansion-panel-header');
        fixtureOne.detectChanges();
        fixtureTwo.detectChanges();
        var panelIdOne = headerElOne.getAttribute('aria-controls');
        var panelIdTwo = headerElTwo.getAttribute('aria-controls');
        expect(panelIdOne).not.toBe(panelIdTwo);
    });
    it('should set `aria-labelledby` of the content to the header id', function () {
        var fixture = testing_1.TestBed.createComponent(PanelWithContent);
        var headerEl = fixture.nativeElement.querySelector('.mat-expansion-panel-header');
        var contentEl = fixture.nativeElement.querySelector('.mat-expansion-panel-content');
        fixture.detectChanges();
        var headerId = headerEl.getAttribute('id');
        var contentLabel = contentEl.getAttribute('aria-labelledby');
        expect(headerId).toBeTruthy();
        expect(contentLabel).toBeTruthy();
        expect(headerId).toBe(contentLabel);
    });
    it('should set the proper role on the content element', function () {
        var fixture = testing_1.TestBed.createComponent(PanelWithContent);
        var contentEl = fixture.nativeElement.querySelector('.mat-expansion-panel-content');
        expect(contentEl.getAttribute('role')).toBe('region');
    });
    it('should toggle the panel when pressing SPACE on the header', function () {
        var fixture = testing_1.TestBed.createComponent(PanelWithContent);
        var headerEl = fixture.nativeElement.querySelector('.mat-expansion-panel-header');
        spyOn(fixture.componentInstance.panel, 'toggle');
        var event = testing_2.dispatchKeyboardEvent(headerEl, 'keydown', keycodes_1.SPACE);
        fixture.detectChanges();
        expect(fixture.componentInstance.panel.toggle).toHaveBeenCalled();
        expect(event.defaultPrevented).toBe(true);
    });
    it('should toggle the panel when pressing ENTER on the header', function () {
        var fixture = testing_1.TestBed.createComponent(PanelWithContent);
        var headerEl = fixture.nativeElement.querySelector('.mat-expansion-panel-header');
        spyOn(fixture.componentInstance.panel, 'toggle');
        var event = testing_2.dispatchKeyboardEvent(headerEl, 'keydown', keycodes_1.ENTER);
        fixture.detectChanges();
        expect(fixture.componentInstance.panel.toggle).toHaveBeenCalled();
        expect(event.defaultPrevented).toBe(true);
    });
    it('should not be able to focus content while closed', testing_1.fakeAsync(function () {
        var fixture = testing_1.TestBed.createComponent(PanelWithContent);
        fixture.componentInstance.expanded = true;
        fixture.detectChanges();
        testing_1.tick(250);
        var button = fixture.debugElement.query(platform_browser_1.By.css('button')).nativeElement;
        button.focus();
        expect(document.activeElement).toBe(button, 'Expected button to start off focusable.');
        button.blur();
        fixture.componentInstance.expanded = false;
        fixture.detectChanges();
        testing_1.tick(250);
        button.focus();
        expect(document.activeElement).not.toBe(button, 'Expected button to no longer be focusable.');
    }));
    it('should not override the panel margin if it is not inside an accordion', testing_1.fakeAsync(function () {
        var fixture = testing_1.TestBed.createComponent(PanelWithCustomMargin);
        fixture.detectChanges();
        var panel = fixture.debugElement.query(platform_browser_1.By.css('mat-expansion-panel'));
        var styles = getComputedStyle(panel.nativeElement);
        expect(panel.componentInstance._hasSpacing()).toBe(false);
        expect(styles.marginTop).toBe('13px');
        expect(styles.marginBottom).toBe('13px');
        expect(styles.marginLeft).toBe('37px');
        expect(styles.marginRight).toBe('37px');
        fixture.componentInstance.expanded = true;
        fixture.detectChanges();
        testing_1.tick(250);
        styles = getComputedStyle(panel.nativeElement);
        expect(panel.componentInstance._hasSpacing()).toBe(false);
        expect(styles.marginTop).toBe('13px');
        expect(styles.marginBottom).toBe('13px');
        expect(styles.marginLeft).toBe('37px');
        expect(styles.marginRight).toBe('37px');
    }));
    it('should be able to hide the toggle', function () {
        var fixture = testing_1.TestBed.createComponent(PanelWithContent);
        var header = fixture.debugElement.query(platform_browser_1.By.css('.mat-expansion-panel-header')).nativeElement;
        fixture.detectChanges();
        expect(header.querySelector('.mat-expansion-indicator'))
            .toBeTruthy('Expected indicator to be shown.');
        fixture.componentInstance.hideToggle = true;
        fixture.detectChanges();
        expect(header.querySelector('.mat-expansion-indicator'))
            .toBeFalsy('Expected indicator to be hidden.');
    });
    it('should update the indicator rotation when the expanded state is toggled programmatically', testing_1.fakeAsync(function () {
        var fixture = testing_1.TestBed.createComponent(PanelWithContent);
        fixture.detectChanges();
        testing_1.tick(250);
        var arrow = fixture.debugElement.query(platform_browser_1.By.css('.mat-expansion-indicator')).nativeElement;
        expect(arrow.style.transform).toBe('rotate(0deg)', 'Expected no rotation.');
        fixture.componentInstance.expanded = true;
        fixture.detectChanges();
        testing_1.tick(250);
        expect(arrow.style.transform).toBe('rotate(180deg)', 'Expected 180 degree rotation.');
    }));
    it('should make sure accordion item runs ngOnDestroy when expansion panel is destroyed', function () {
        var fixture = testing_1.TestBed.createComponent(PanelWithContentInNgIf);
        fixture.detectChanges();
        var destroyedOk = false;
        fixture.componentInstance.panel.destroyed.subscribe(function () { return destroyedOk = true; });
        fixture.componentInstance.expansionShown = false;
        fixture.detectChanges();
        expect(destroyedOk).toBe(true);
    });
    it('should support two-way binding of the `expanded` property', function () {
        var fixture = testing_1.TestBed.createComponent(PanelWithTwoWayBinding);
        var header = fixture.debugElement.query(platform_browser_1.By.css('mat-expansion-panel-header')).nativeElement;
        fixture.detectChanges();
        expect(fixture.componentInstance.expanded).toBe(false);
        header.click();
        fixture.detectChanges();
        expect(fixture.componentInstance.expanded).toBe(true);
        header.click();
        fixture.detectChanges();
        expect(fixture.componentInstance.expanded).toBe(false);
    });
    it('should not set the mat-expanded class until the open animation is done', testing_1.fakeAsync(function () {
        var fixture = testing_1.TestBed.createComponent(PanelWithContent);
        var contentEl = fixture.nativeElement.querySelector('.mat-expansion-panel-content');
        fixture.detectChanges();
        expect(contentEl.classList).not.toContain('mat-expanded', 'Expected class not to be there on init');
        fixture.componentInstance.expanded = true;
        fixture.detectChanges();
        expect(contentEl.classList).not.toContain('mat-expanded', 'Expected class not to be added immediately after becoming expanded');
        testing_1.flush();
        expect(contentEl.classList).toContain('mat-expanded', 'Expected class to be added after the animation has finished');
    }));
    it('should emit events for body expanding and collapsing animations', testing_1.fakeAsync(function () {
        var fixture = testing_1.TestBed.createComponent(PanelWithContent);
        fixture.detectChanges();
        var afterExpand = 0;
        var afterCollapse = 0;
        fixture.componentInstance.panel.afterExpand.subscribe(function () { return afterExpand++; });
        fixture.componentInstance.panel.afterCollapse.subscribe(function () { return afterCollapse++; });
        fixture.componentInstance.expanded = true;
        fixture.detectChanges();
        testing_1.flush();
        expect(afterExpand).toBe(1);
        expect(afterCollapse).toBe(0);
        fixture.componentInstance.expanded = false;
        fixture.detectChanges();
        testing_1.flush();
        expect(afterExpand).toBe(1);
        expect(afterCollapse).toBe(1);
    }));
    describe('disabled state', function () {
        var fixture;
        var panel;
        var header;
        beforeEach(function () {
            fixture = testing_1.TestBed.createComponent(PanelWithContent);
            fixture.detectChanges();
            panel = fixture.debugElement.query(platform_browser_1.By.css('mat-expansion-panel')).nativeElement;
            header = fixture.debugElement.query(platform_browser_1.By.css('mat-expansion-panel-header')).nativeElement;
        });
        it('should toggle the aria-disabled attribute on the header', function () {
            expect(header.getAttribute('aria-disabled')).toBe('false');
            fixture.componentInstance.disabled = true;
            fixture.detectChanges();
            expect(header.getAttribute('aria-disabled')).toBe('true');
        });
        it('should toggle the expansion indicator', function () {
            expect(panel.querySelector('.mat-expansion-indicator')).toBeTruthy();
            fixture.componentInstance.disabled = true;
            fixture.detectChanges();
            expect(panel.querySelector('.mat-expansion-indicator')).toBeFalsy();
        });
        it('should not be able to toggle the panel via a user action if disabled', function () {
            expect(fixture.componentInstance.panel.expanded).toBe(false);
            expect(header.classList).not.toContain('mat-expanded');
            fixture.componentInstance.disabled = true;
            fixture.detectChanges();
            header.click();
            fixture.detectChanges();
            expect(fixture.componentInstance.panel.expanded).toBe(false);
            expect(header.classList).not.toContain('mat-expanded');
        });
        it('should be able to toggle a disabled expansion panel programmatically', function () {
            expect(fixture.componentInstance.panel.expanded).toBe(false);
            expect(header.classList).not.toContain('mat-expanded');
            fixture.componentInstance.disabled = true;
            fixture.detectChanges();
            fixture.componentInstance.expanded = true;
            fixture.detectChanges();
            expect(fixture.componentInstance.panel.expanded).toBe(true);
            expect(header.classList).toContain('mat-expanded');
        });
    });
});
var PanelWithContent = /** @class */ (function () {
    function PanelWithContent() {
        this.expanded = false;
        this.hideToggle = false;
        this.disabled = false;
        this.openCallback = jasmine.createSpy('openCallback');
        this.closeCallback = jasmine.createSpy('closeCallback');
    }
    PanelWithContent.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n  <mat-expansion-panel [expanded]=\"expanded\"\n                      [hideToggle]=\"hideToggle\"\n                      [disabled]=\"disabled\"\n                      (opened)=\"openCallback()\"\n                      (closed)=\"closeCallback()\">\n    <mat-expansion-panel-header>Panel Title</mat-expansion-panel-header>\n    <p>Some content</p>\n    <button>I am a button</button>\n  </mat-expansion-panel>"
                },] },
    ];
    /** @nocollapse */
    PanelWithContent.propDecorators = {
        "panel": [{ type: core_1.ViewChild, args: [index_1.MatExpansionPanel,] },],
    };
    return PanelWithContent;
}());
var PanelWithContentInNgIf = /** @class */ (function () {
    function PanelWithContentInNgIf() {
        this.expansionShown = true;
    }
    PanelWithContentInNgIf.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n  <div *ngIf=\"expansionShown\">\n    <mat-expansion-panel>\n      <mat-expansion-panel-header>Panel Title</mat-expansion-panel-header>\n    </mat-expansion-panel>\n  </div>"
                },] },
    ];
    /** @nocollapse */
    PanelWithContentInNgIf.propDecorators = {
        "panel": [{ type: core_1.ViewChild, args: [index_1.MatExpansionPanel,] },],
    };
    return PanelWithContentInNgIf;
}());
var PanelWithCustomMargin = /** @class */ (function () {
    function PanelWithCustomMargin() {
        this.expanded = false;
    }
    PanelWithCustomMargin.decorators = [
        { type: core_1.Component, args: [{
                    styles: [
                        "mat-expansion-panel {\n      margin: 13px 37px;\n    }"
                    ],
                    template: "\n  <mat-expansion-panel [expanded]=\"expanded\">\n    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores officia, aliquam dicta\n    corrupti maxime voluptate accusamus impedit atque incidunt pariatur.\n  </mat-expansion-panel>"
                },] },
    ];
    return PanelWithCustomMargin;
}());
var LazyPanelWithContent = /** @class */ (function () {
    function LazyPanelWithContent() {
        this.expanded = false;
    }
    LazyPanelWithContent.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n  <mat-expansion-panel [expanded]=\"expanded\">\n    <mat-expansion-panel-header>Panel Title</mat-expansion-panel-header>\n\n    <ng-template matExpansionPanelContent>\n      <p>Some content</p>\n      <button>I am a button</button>\n    </ng-template>\n  </mat-expansion-panel>"
                },] },
    ];
    return LazyPanelWithContent;
}());
var LazyPanelOpenOnLoad = /** @class */ (function () {
    function LazyPanelOpenOnLoad() {
    }
    LazyPanelOpenOnLoad.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n  <mat-expansion-panel [expanded]=\"true\">\n    <mat-expansion-panel-header>Panel Title</mat-expansion-panel-header>\n\n    <ng-template matExpansionPanelContent>\n      <p>Some content</p>\n    </ng-template>\n  </mat-expansion-panel>"
                },] },
    ];
    return LazyPanelOpenOnLoad;
}());
var PanelWithTwoWayBinding = /** @class */ (function () {
    function PanelWithTwoWayBinding() {
        this.expanded = false;
    }
    PanelWithTwoWayBinding.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n  <mat-expansion-panel [(expanded)]=\"expanded\">\n    <mat-expansion-panel-header>Panel Title</mat-expansion-panel-header>\n  </mat-expansion-panel>"
                },] },
    ];
    return PanelWithTwoWayBinding;
}());
//# sourceMappingURL=expansion.spec.js.map