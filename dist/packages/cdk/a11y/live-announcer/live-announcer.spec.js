"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var observers_1 = require("@angular/cdk/observers");
var core_1 = require("@angular/core");
var testing_1 = require("@angular/core/testing");
var platform_browser_1 = require("@angular/platform-browser");
var index_1 = require("../index");
var live_announcer_1 = require("./live-announcer");
var live_announcer_token_1 = require("./live-announcer-token");
describe('LiveAnnouncer', function () {
    var announcer;
    var ariaLiveElement;
    var fixture;
    describe('with default element', function () {
        beforeEach(function () {
            return testing_1.TestBed.configureTestingModule({
                imports: [index_1.A11yModule],
                declarations: [TestApp],
            });
        });
        beforeEach(testing_1.fakeAsync(testing_1.inject([live_announcer_1.LiveAnnouncer], function (la) {
            announcer = la;
            ariaLiveElement = getLiveElement();
            fixture = testing_1.TestBed.createComponent(TestApp);
        })));
        afterEach(function () {
            // In our tests we always remove the current live element, in
            // order to avoid having multiple announcer elements in the DOM.
            announcer.ngOnDestroy();
        });
        it('should correctly update the announce text', testing_1.fakeAsync(function () {
            var buttonElement = fixture.debugElement.query(platform_browser_1.By.css('button')).nativeElement;
            buttonElement.click();
            // This flushes our 100ms timeout for the screenreaders.
            // This flushes our 100ms timeout for the screenreaders.
            testing_1.tick(100);
            expect(ariaLiveElement.textContent).toBe('Test');
        }));
        it('should correctly update the politeness attribute', testing_1.fakeAsync(function () {
            announcer.announce('Hey Google', 'assertive');
            // This flushes our 100ms timeout for the screenreaders.
            // This flushes our 100ms timeout for the screenreaders.
            testing_1.tick(100);
            expect(ariaLiveElement.textContent).toBe('Hey Google');
            expect(ariaLiveElement.getAttribute('aria-live')).toBe('assertive');
        }));
        it('should apply the aria-live value polite by default', testing_1.fakeAsync(function () {
            announcer.announce('Hey Google');
            // This flushes our 100ms timeout for the screenreaders.
            // This flushes our 100ms timeout for the screenreaders.
            testing_1.tick(100);
            expect(ariaLiveElement.textContent).toBe('Hey Google');
            expect(ariaLiveElement.getAttribute('aria-live')).toBe('polite');
        }));
        it('should remove the aria-live element from the DOM on destroy', testing_1.fakeAsync(function () {
            announcer.announce('Hey Google');
            // This flushes our 100ms timeout for the screenreaders.
            // This flushes our 100ms timeout for the screenreaders.
            testing_1.tick(100);
            // Call the lifecycle hook manually since Angular won't do it in tests.
            announcer.ngOnDestroy();
            expect(document.body.querySelector('.cdk-live-announcer-element'))
                .toBeFalsy('Expected that the aria-live element was remove from the DOM.');
        }));
        it('should return a promise that resolves after the text has been announced', testing_1.fakeAsync(function () {
            var spy = jasmine.createSpy('announce spy');
            announcer.announce('something').then(spy);
            expect(spy).not.toHaveBeenCalled();
            testing_1.tick(100);
            expect(spy).toHaveBeenCalled();
        }));
        it('should ensure that there is only one live element at a time', testing_1.fakeAsync(function () {
            announcer.ngOnDestroy();
            fixture.destroy();
            testing_1.TestBed.resetTestingModule().configureTestingModule({
                imports: [index_1.A11yModule],
                declarations: [TestApp],
            });
            var extraElement = document.createElement('div');
            extraElement.classList.add('cdk-live-announcer-element');
            document.body.appendChild(extraElement);
            testing_1.inject([live_announcer_1.LiveAnnouncer], function (la) {
                announcer = la;
                ariaLiveElement = getLiveElement();
                fixture = testing_1.TestBed.createComponent(TestApp);
            })();
            announcer.announce('Hey Google');
            testing_1.tick(100);
            expect(document.body.querySelectorAll('.cdk-live-announcer-element').length)
                .toBe(1, 'Expected only one live announcer element in the DOM.');
        }));
    });
    describe('with a custom element', function () {
        var customLiveElement;
        beforeEach(function () {
            customLiveElement = document.createElement('div');
            return testing_1.TestBed.configureTestingModule({
                imports: [index_1.A11yModule],
                declarations: [TestApp],
                providers: [{ provide: live_announcer_token_1.LIVE_ANNOUNCER_ELEMENT_TOKEN, useValue: customLiveElement }],
            });
        });
        beforeEach(testing_1.inject([live_announcer_1.LiveAnnouncer], function (la) {
            announcer = la;
            ariaLiveElement = getLiveElement();
        }));
        it('should allow to use a custom live element', testing_1.fakeAsync(function () {
            announcer.announce('Custom Element');
            // This flushes our 100ms timeout for the screenreaders.
            // This flushes our 100ms timeout for the screenreaders.
            testing_1.tick(100);
            expect(customLiveElement.textContent).toBe('Custom Element');
        }));
    });
});
describe('CdkAriaLive', function () {
    var mutationCallbacks = [];
    var announcer;
    var announcerSpy;
    var fixture;
    var invokeMutationCallbacks = function () { return mutationCallbacks.forEach(function (cb) { return cb(); }); };
    beforeEach(testing_1.fakeAsync(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [index_1.A11yModule],
            declarations: [DivWithCdkAriaLive],
            providers: [{
                    provide: observers_1.MutationObserverFactory,
                    useValue: {
                        create: function (callback) {
                            mutationCallbacks.push(callback);
                            return {
                                observe: function () { },
                                disconnect: function () { }
                            };
                        }
                    }
                }]
        });
    }));
    beforeEach(testing_1.fakeAsync(testing_1.inject([live_announcer_1.LiveAnnouncer], function (la) {
        announcer = la;
        announcerSpy = spyOn(la, 'announce').and.callThrough();
        fixture = testing_1.TestBed.createComponent(DivWithCdkAriaLive);
        fixture.detectChanges();
        testing_1.flush();
    })));
    afterEach(testing_1.fakeAsync(function () {
        // In our tests we always remove the current live element, in
        // order to avoid having multiple announcer elements in the DOM.
        announcer.ngOnDestroy();
    }));
    it('should dynamically update the politeness', testing_1.fakeAsync(function () {
        fixture.componentInstance.content = 'New content';
        fixture.detectChanges();
        invokeMutationCallbacks();
        testing_1.flush();
        expect(announcer.announce).toHaveBeenCalledWith('New content', 'polite');
        announcerSpy.calls.reset();
        fixture.componentInstance.politeness = 'off';
        fixture.componentInstance.content = 'Newer content';
        fixture.detectChanges();
        invokeMutationCallbacks();
        testing_1.flush();
        expect(announcer.announce).not.toHaveBeenCalled();
        announcerSpy.calls.reset();
        fixture.componentInstance.politeness = 'assertive';
        fixture.componentInstance.content = 'Newest content';
        fixture.detectChanges();
        invokeMutationCallbacks();
        testing_1.flush();
        expect(announcer.announce).toHaveBeenCalledWith('Newest content', 'assertive');
    }));
});
function getLiveElement() {
    return document.body.querySelector('.cdk-live-announcer-element');
}
var TestApp = /** @class */ (function () {
    function TestApp(live) {
        this.live = live;
    }
    TestApp.prototype.announceText = function (message) {
        this.live.announce(message);
    };
    TestApp.decorators = [
        { type: core_1.Component, args: [{ template: "<button (click)=\"announceText('Test')\">Announce</button>" },] },
    ];
    /** @nocollapse */
    TestApp.ctorParameters = function () { return [
        { type: live_announcer_1.LiveAnnouncer, },
    ]; };
    return TestApp;
}());
var DivWithCdkAriaLive = /** @class */ (function () {
    function DivWithCdkAriaLive() {
        this.politeness = 'polite';
        this.content = 'Initial content';
    }
    DivWithCdkAriaLive.decorators = [
        { type: core_1.Component, args: [{ template: "<div [cdkAriaLive]=\"politeness\">{{content}}</div>" },] },
    ];
    /** @nocollapse */
    DivWithCdkAriaLive.propDecorators = {
        "politeness": [{ type: core_1.Input },],
        "content": [{ type: core_1.Input },],
    };
    return DivWithCdkAriaLive;
}());
//# sourceMappingURL=live-announcer.spec.js.map