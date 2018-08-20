"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var testing_2 = require("@angular/cdk/testing");
var bidi_1 = require("@angular/cdk/bidi");
var rxjs_1 = require("rxjs");
var index_1 = require("../index");
describe('MatTabNavBar', function () {
    var dir = 'ltr';
    var dirChange = new rxjs_1.Subject();
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [index_1.MatTabsModule],
            declarations: [
                SimpleTabNavBarTestApp,
                TabLinkWithNgIf,
                TabLinkWithTabIndexBinding,
                TabLinkWithNativeTabindexAttr,
            ],
            providers: [
                { provide: bidi_1.Directionality, useFactory: function () {
                        return ({
                            value: dir,
                            change: dirChange.asObservable()
                        });
                    } },
            ]
        });
        testing_1.TestBed.compileComponents();
    }));
    describe('basic behavior', function () {
        var fixture;
        beforeEach(function () {
            fixture = testing_1.TestBed.createComponent(SimpleTabNavBarTestApp);
            fixture.detectChanges();
        });
        it('should change active index on click', function () {
            // select the second link
            var tabLink = fixture.debugElement.queryAll(platform_browser_1.By.css('a'))[1];
            tabLink.nativeElement.click();
            expect(fixture.componentInstance.activeIndex).toBe(1);
            // select the third link
            tabLink = fixture.debugElement.queryAll(platform_browser_1.By.css('a'))[2];
            tabLink.nativeElement.click();
            expect(fixture.componentInstance.activeIndex).toBe(2);
        });
        it('should add the active class if active', function () {
            var tabLink1 = fixture.debugElement.queryAll(platform_browser_1.By.css('a'))[0];
            var tabLink2 = fixture.debugElement.queryAll(platform_browser_1.By.css('a'))[1];
            var tabLinkElements = fixture.debugElement.queryAll(platform_browser_1.By.css('a'))
                .map(function (tabLinkDebugEl) { return tabLinkDebugEl.nativeElement; });
            tabLink1.nativeElement.click();
            fixture.detectChanges();
            expect(tabLinkElements[0].classList.contains('mat-tab-label-active')).toBeTruthy();
            expect(tabLinkElements[1].classList.contains('mat-tab-label-active')).toBeFalsy();
            tabLink2.nativeElement.click();
            fixture.detectChanges();
            expect(tabLinkElements[0].classList.contains('mat-tab-label-active')).toBeFalsy();
            expect(tabLinkElements[1].classList.contains('mat-tab-label-active')).toBeTruthy();
        });
        it('should toggle aria-current based on active state', function () {
            var tabLink1 = fixture.debugElement.queryAll(platform_browser_1.By.css('a'))[0];
            var tabLink2 = fixture.debugElement.queryAll(platform_browser_1.By.css('a'))[1];
            var tabLinkElements = fixture.debugElement.queryAll(platform_browser_1.By.css('a'))
                .map(function (tabLinkDebugEl) { return tabLinkDebugEl.nativeElement; });
            tabLink1.nativeElement.click();
            fixture.detectChanges();
            expect(tabLinkElements[0].getAttribute('aria-current')).toEqual('true');
            expect(tabLinkElements[1].getAttribute('aria-current')).toEqual('false');
            tabLink2.nativeElement.click();
            fixture.detectChanges();
            expect(tabLinkElements[0].getAttribute('aria-current')).toEqual('false');
            expect(tabLinkElements[1].getAttribute('aria-current')).toEqual('true');
        });
        it('should add the disabled class if disabled', function () {
            var tabLinkElements = fixture.debugElement.queryAll(platform_browser_1.By.css('a'))
                .map(function (tabLinkDebugEl) { return tabLinkDebugEl.nativeElement; });
            expect(tabLinkElements.every(function (tabLinkEl) { return !tabLinkEl.classList.contains('mat-tab-disabled'); }))
                .toBe(true, 'Expected every tab link to not have the disabled class initially');
            fixture.componentInstance.disabled = true;
            fixture.detectChanges();
            expect(tabLinkElements.every(function (tabLinkEl) { return tabLinkEl.classList.contains('mat-tab-disabled'); }))
                .toBe(true, 'Expected every tab link to have the disabled class if set through binding');
        });
        it('should update aria-disabled if disabled', function () {
            var tabLinkElements = fixture.debugElement.queryAll(platform_browser_1.By.css('a'))
                .map(function (tabLinkDebugEl) { return tabLinkDebugEl.nativeElement; });
            expect(tabLinkElements.every(function (tabLink) { return tabLink.getAttribute('aria-disabled') === 'false'; }))
                .toBe(true, 'Expected aria-disabled to be set to "false" by default.');
            fixture.componentInstance.disabled = true;
            fixture.detectChanges();
            expect(tabLinkElements.every(function (tabLink) { return tabLink.getAttribute('aria-disabled') === 'true'; }))
                .toBe(true, 'Expected aria-disabled to be set to "true" if link is disabled.');
        });
        it('should disable the ripples on all tabs when they are disabled on the nav bar', function () {
            expect(fixture.componentInstance.tabLinks.toArray().every(function (tabLink) { return !tabLink.rippleDisabled; }))
                .toBe(true, 'Expected every tab link to have ripples enabled');
            fixture.componentInstance.disableRippleOnBar = true;
            fixture.detectChanges();
            expect(fixture.componentInstance.tabLinks.toArray().every(function (tabLink) { return tabLink.rippleDisabled; }))
                .toBe(true, 'Expected every tab link to have ripples disabled');
        });
        it('should have the `disableRipple` from the tab take precendence over the nav bar', function () {
            var firstTab = fixture.componentInstance.tabLinks.first;
            expect(firstTab.rippleDisabled).toBe(false, 'Expected ripples to be enabled on first tab');
            firstTab.disableRipple = true;
            fixture.componentInstance.disableRippleOnBar = false;
            fixture.detectChanges();
            expect(firstTab.rippleDisabled).toBe(true, 'Expected ripples to be disabled on first tab');
        });
        it('should update the tabindex if links are disabled', function () {
            var tabLinkElements = fixture.debugElement.queryAll(platform_browser_1.By.css('a'))
                .map(function (tabLinkDebugEl) { return tabLinkDebugEl.nativeElement; });
            expect(tabLinkElements.every(function (tabLink) { return tabLink.tabIndex === 0; }))
                .toBe(true, 'Expected element to be keyboard focusable by default');
            fixture.componentInstance.disabled = true;
            fixture.detectChanges();
            expect(tabLinkElements.every(function (tabLink) { return tabLink.tabIndex === -1; }))
                .toBe(true, 'Expected element to no longer be keyboard focusable if disabled.');
        });
        it('should prevent default action for clicks if links are disabled', function () {
            var tabLinkElement = fixture.debugElement.query(platform_browser_1.By.css('a')).nativeElement;
            var mouseEvent = testing_2.createMouseEvent('click');
            spyOn(mouseEvent, 'preventDefault');
            tabLinkElement.dispatchEvent(mouseEvent);
            expect(mouseEvent.preventDefault).not.toHaveBeenCalled();
            fixture.componentInstance.disabled = true;
            fixture.detectChanges();
            var mouseEventWhileDisabled = testing_2.createMouseEvent('click');
            spyOn(mouseEventWhileDisabled, 'preventDefault');
            tabLinkElement.dispatchEvent(mouseEventWhileDisabled);
            expect(mouseEventWhileDisabled.preventDefault).toHaveBeenCalled();
        });
        it('should show ripples for tab links', function () {
            var tabLink = fixture.debugElement.nativeElement.querySelector('.mat-tab-link');
            testing_2.dispatchMouseEvent(tabLink, 'mousedown');
            testing_2.dispatchMouseEvent(tabLink, 'mouseup');
            expect(tabLink.querySelectorAll('.mat-ripple-element').length)
                .toBe(1, 'Expected one ripple to show up if user clicks on tab link.');
        });
        it('should be able to disable ripples on a tab link', function () {
            var tabLinkDebug = fixture.debugElement.query(platform_browser_1.By.css('a'));
            var tabLinkElement = tabLinkDebug.nativeElement;
            var tabLinkInstance = tabLinkDebug.injector.get(index_1.MatTabLink);
            tabLinkInstance.disableRipple = true;
            testing_2.dispatchMouseEvent(tabLinkElement, 'mousedown');
            testing_2.dispatchMouseEvent(tabLinkElement, 'mouseup');
            expect(tabLinkElement.querySelectorAll('.mat-ripple-element').length)
                .toBe(0, 'Expected no ripple to show up if ripples are disabled.');
        });
        it('should re-align the ink bar when the direction changes', function () {
            var inkBar = fixture.componentInstance.tabNavBar._inkBar;
            spyOn(inkBar, 'alignToElement');
            dirChange.next();
            fixture.detectChanges();
            expect(inkBar.alignToElement).toHaveBeenCalled();
        });
        it('should re-align the ink bar when the tabs list change', function () {
            var inkBar = fixture.componentInstance.tabNavBar._inkBar;
            spyOn(inkBar, 'alignToElement');
            fixture.componentInstance.tabs = [1, 2, 3, 4];
            fixture.detectChanges();
            expect(inkBar.alignToElement).toHaveBeenCalled();
        });
        it('should re-align the ink bar when the tab labels change the width', function (done) {
            var inkBar = fixture.componentInstance.tabNavBar._inkBar;
            var spy = spyOn(inkBar, 'alignToElement').and.callFake(function () {
                expect(spy.calls.any()).toBe(true);
                done();
            });
            fixture.componentInstance.label = 'label change';
            fixture.detectChanges();
            expect(spy.calls.any()).toBe(false);
        });
        it('should re-align the ink bar when the window is resized', testing_1.fakeAsync(function () {
            var inkBar = fixture.componentInstance.tabNavBar._inkBar;
            spyOn(inkBar, 'alignToElement');
            testing_2.dispatchFakeEvent(window, 'resize');
            testing_1.tick(150);
            fixture.detectChanges();
            expect(inkBar.alignToElement).toHaveBeenCalled();
        }));
        it('should hide the ink bar when all the links are inactive', function () {
            var inkBar = fixture.componentInstance.tabNavBar._inkBar;
            spyOn(inkBar, 'hide');
            fixture.componentInstance.tabLinks.forEach(function (link) { return link.active = false; });
            fixture.detectChanges();
            expect(inkBar.hide).toHaveBeenCalled();
        });
    });
    it('should clean up the ripple event handlers on destroy', function () {
        var fixture = testing_1.TestBed.createComponent(TabLinkWithNgIf);
        fixture.detectChanges();
        var link = fixture.debugElement.nativeElement.querySelector('.mat-tab-link');
        fixture.componentInstance.isDestroyed = true;
        fixture.detectChanges();
        testing_2.dispatchMouseEvent(link, 'mousedown');
        expect(link.querySelector('.mat-ripple-element'))
            .toBeFalsy('Expected no ripple to be created when ripple target is destroyed.');
    });
    it('should support the native tabindex attribute', function () {
        var fixture = testing_1.TestBed.createComponent(TabLinkWithNativeTabindexAttr);
        fixture.detectChanges();
        var tabLink = fixture.debugElement.query(platform_browser_1.By.directive(index_1.MatTabLink)).injector.get(index_1.MatTabLink);
        expect(tabLink.tabIndex)
            .toBe(5, 'Expected the tabIndex to be set from the native tabindex attribute.');
    });
    it('should support binding to the tabIndex', function () {
        var fixture = testing_1.TestBed.createComponent(TabLinkWithTabIndexBinding);
        fixture.detectChanges();
        var tabLink = fixture.debugElement.query(platform_browser_1.By.directive(index_1.MatTabLink)).injector.get(index_1.MatTabLink);
        expect(tabLink.tabIndex).toBe(0, 'Expected the tabIndex to be set to 0 by default.');
        fixture.componentInstance.tabIndex = 3;
        fixture.detectChanges();
        expect(tabLink.tabIndex).toBe(3, 'Expected the tabIndex to be have been set to 3.');
    });
});
var SimpleTabNavBarTestApp = /** @class */ (function () {
    function SimpleTabNavBarTestApp() {
        this.label = '';
        this.disabled = false;
        this.disableRippleOnBar = false;
        this.tabs = [0, 1, 2];
        this.activeIndex = 0;
    }
    SimpleTabNavBarTestApp.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'test-app',
                    template: "\n    <nav mat-tab-nav-bar [disableRipple]=\"disableRippleOnBar\">\n      <a mat-tab-link\n         *ngFor=\"let tab of tabs; let index = index\"\n         [active]=\"activeIndex === index\"\n         [disabled]=\"disabled\"\n         (click)=\"activeIndex = index\">\n        Tab link {{label}}\n      </a>\n    </nav>\n  "
                },] },
    ];
    /** @nocollapse */
    SimpleTabNavBarTestApp.propDecorators = {
        "tabNavBar": [{ type: core_1.ViewChild, args: [index_1.MatTabNav,] },],
        "tabLinks": [{ type: core_1.ViewChildren, args: [index_1.MatTabLink,] },],
    };
    return SimpleTabNavBarTestApp;
}());
var TabLinkWithNgIf = /** @class */ (function () {
    function TabLinkWithNgIf() {
        this.isDestroyed = false;
    }
    TabLinkWithNgIf.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <nav mat-tab-nav-bar>\n      <a mat-tab-link *ngIf=\"!isDestroyed\">Link</a>\n    </nav>\n  "
                },] },
    ];
    return TabLinkWithNgIf;
}());
var TabLinkWithTabIndexBinding = /** @class */ (function () {
    function TabLinkWithTabIndexBinding() {
        this.tabIndex = 0;
    }
    TabLinkWithTabIndexBinding.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <nav mat-tab-nav-bar>\n      <a mat-tab-link [tabIndex]=\"tabIndex\">TabIndex Link</a>\n    </nav>\n  "
                },] },
    ];
    return TabLinkWithTabIndexBinding;
}());
var TabLinkWithNativeTabindexAttr = /** @class */ (function () {
    function TabLinkWithNativeTabindexAttr() {
    }
    TabLinkWithNativeTabindexAttr.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <nav mat-tab-nav-bar>\n      <a mat-tab-link tabindex=\"5\">Link</a>\n    </nav>\n  "
                },] },
    ];
    return TabLinkWithNativeTabindexAttr;
}());
//# sourceMappingURL=tab-nav-bar.spec.js.map