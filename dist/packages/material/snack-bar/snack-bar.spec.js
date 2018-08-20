"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var animations_1 = require("@angular/platform-browser/animations");
var overlay_1 = require("@angular/cdk/overlay");
var a11y_1 = require("@angular/cdk/a11y");
var index_1 = require("./index");
describe('MatSnackBar', function () {
    var snackBar;
    var liveAnnouncer;
    var overlayContainer;
    var overlayContainerElement;
    var testViewContainerRef;
    var viewContainerFixture;
    var simpleMessage = 'Burritos are here!';
    var simpleActionLabel = 'pickup';
    beforeEach(testing_1.fakeAsync(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [index_1.MatSnackBarModule, SnackBarTestModule, animations_1.NoopAnimationsModule],
        }).compileComponents();
    }));
    beforeEach(testing_1.inject([index_1.MatSnackBar, a11y_1.LiveAnnouncer, overlay_1.OverlayContainer], function (sb, la, oc) {
        snackBar = sb;
        liveAnnouncer = la;
        overlayContainer = oc;
        overlayContainerElement = oc.getContainerElement();
    }));
    afterEach(function () {
        overlayContainer.ngOnDestroy();
        liveAnnouncer.ngOnDestroy();
    });
    beforeEach(function () {
        viewContainerFixture = testing_1.TestBed.createComponent(ComponentWithChildViewContainer);
        viewContainerFixture.detectChanges();
        testViewContainerRef = viewContainerFixture.componentInstance.childViewContainer;
    });
    it('should have the role of alert', function () {
        snackBar.open(simpleMessage, simpleActionLabel);
        var containerElement = (overlayContainerElement.querySelector('snack-bar-container'));
        expect(containerElement.getAttribute('role'))
            .toBe('alert', 'Expected snack bar container to have role="alert"');
    });
    it('should open and close a snackbar without a ViewContainerRef', testing_1.fakeAsync(function () {
        var snackBarRef = snackBar.open('Snack time!', 'Chew');
        viewContainerFixture.detectChanges();
        var messageElement = (overlayContainerElement.querySelector('snack-bar-container'));
        expect(messageElement.textContent).toContain('Snack time!', 'Expected snack bar to show a message without a ViewContainerRef');
        snackBarRef.dismiss();
        viewContainerFixture.detectChanges();
        testing_1.flush();
        expect(overlayContainerElement.childNodes.length)
            .toBe(0, 'Expected snack bar to be dismissed without a ViewContainerRef');
    }));
    it('should open a simple message with a button', function () {
        var config = { viewContainerRef: testViewContainerRef };
        var snackBarRef = snackBar.open(simpleMessage, simpleActionLabel, config);
        viewContainerFixture.detectChanges();
        expect(snackBarRef.instance instanceof index_1.SimpleSnackBar)
            .toBe(true, 'Expected the snack bar content component to be SimpleSnackBar');
        expect(snackBarRef.instance.snackBarRef)
            .toBe(snackBarRef, 'Expected the snack bar reference to be placed in the component instance');
        var messageElement = (overlayContainerElement.querySelector('snack-bar-container'));
        expect(messageElement.textContent)
            .toContain(simpleMessage, "Expected the snack bar message to be '" + simpleMessage + "'");
        var buttonElement = (overlayContainerElement.querySelector('button.mat-button'));
        expect(buttonElement.tagName)
            .toBe('BUTTON', 'Expected snack bar action label to be a <button>');
        expect(buttonElement.textContent)
            .toBe(simpleActionLabel, "Expected the snack bar action label to be '" + simpleActionLabel + "'");
    });
    it('should open a simple message with no button', function () {
        var config = { viewContainerRef: testViewContainerRef };
        var snackBarRef = snackBar.open(simpleMessage, undefined, config);
        viewContainerFixture.detectChanges();
        expect(snackBarRef.instance instanceof index_1.SimpleSnackBar)
            .toBe(true, 'Expected the snack bar content component to be SimpleSnackBar');
        expect(snackBarRef.instance.snackBarRef)
            .toBe(snackBarRef, 'Expected the snack bar reference to be placed in the component instance');
        var messageElement = (overlayContainerElement.querySelector('snack-bar-container'));
        expect(messageElement.textContent)
            .toContain(simpleMessage, "Expected the snack bar message to be '" + simpleMessage + "'");
        expect(overlayContainerElement.querySelector('button.mat-button'))
            .toBeNull('Expected the query selection for action label to be null');
    });
    it('should dismiss the snack bar and remove itself from the view', testing_1.fakeAsync(function () {
        var config = { viewContainerRef: testViewContainerRef };
        var dismissCompleteSpy = jasmine.createSpy('dismiss complete spy');
        var snackBarRef = snackBar.open(simpleMessage, undefined, config);
        viewContainerFixture.detectChanges();
        expect(overlayContainerElement.childElementCount)
            .toBeGreaterThan(0, 'Expected overlay container element to have at least one child');
        snackBarRef.afterDismissed().subscribe(undefined, undefined, dismissCompleteSpy);
        snackBarRef.dismiss();
        viewContainerFixture.detectChanges(); // Run through animations for dismissal
        testing_1.flush();
        expect(dismissCompleteSpy).toHaveBeenCalled();
        expect(overlayContainerElement.childElementCount)
            .toBe(0, 'Expected the overlay container element to have no child elements');
    }));
    it('should default to the passed message for the announcement message', testing_1.fakeAsync(function () {
        spyOn(liveAnnouncer, 'announce');
        snackBar.open(simpleMessage);
        viewContainerFixture.detectChanges();
        expect(overlayContainerElement.childElementCount)
            .toBe(1, 'Expected the overlay with the default announcement message to be added');
        // Expect the live announcer to have been called with the display message and some
        // string for the politeness. We do not want to test for the default politeness here.
        expect(liveAnnouncer.announce).toHaveBeenCalledWith(simpleMessage, jasmine.any(String));
    }));
    it('should be able to specify a custom announcement message', testing_1.fakeAsync(function () {
        spyOn(liveAnnouncer, 'announce');
        snackBar.open(simpleMessage, '', {
            announcementMessage: 'Custom announcement',
            politeness: 'assertive'
        });
        viewContainerFixture.detectChanges();
        expect(overlayContainerElement.childElementCount)
            .toBe(1, 'Expected the overlay with a custom `announcementMessage` to be added');
        expect(liveAnnouncer.announce).toHaveBeenCalledWith('Custom announcement', 'assertive');
    }));
    it('should be able to get dismissed through the service', testing_1.fakeAsync(function () {
        snackBar.open(simpleMessage);
        viewContainerFixture.detectChanges();
        expect(overlayContainerElement.childElementCount).toBeGreaterThan(0);
        snackBar.dismiss();
        viewContainerFixture.detectChanges();
        testing_1.flush();
        expect(overlayContainerElement.childElementCount).toBe(0);
    }));
    it('should clean itself up when the view container gets destroyed', testing_1.fakeAsync(function () {
        snackBar.open(simpleMessage, undefined, { viewContainerRef: testViewContainerRef });
        viewContainerFixture.detectChanges();
        expect(overlayContainerElement.childElementCount).toBeGreaterThan(0);
        viewContainerFixture.componentInstance.childComponentExists = false;
        viewContainerFixture.detectChanges();
        testing_1.flush();
        expect(overlayContainerElement.childElementCount)
            .toBe(0, 'Expected snack bar to be removed after the view container was destroyed');
    }));
    it('should set the animation state to visible on entry', function () {
        var config = { viewContainerRef: testViewContainerRef };
        var snackBarRef = snackBar.open(simpleMessage, undefined, config);
        viewContainerFixture.detectChanges();
        expect(snackBarRef.containerInstance._animationState)
            .toBe('visible-bottom', "Expected the animation state would be 'visible-bottom'.");
        snackBarRef.dismiss();
        viewContainerFixture.detectChanges();
        expect(snackBarRef.containerInstance._animationState)
            .toBe('hidden-bottom', "Expected the animation state would be 'hidden-bottom'.");
    });
    it('should set the animation state to complete on exit', function () {
        var config = { viewContainerRef: testViewContainerRef };
        var snackBarRef = snackBar.open(simpleMessage, undefined, config);
        snackBarRef.dismiss();
        viewContainerFixture.detectChanges();
        expect(snackBarRef.containerInstance._animationState)
            .toBe('hidden-bottom', "Expected the animation state would be 'hidden-bottom'.");
    });
    it("should set the old snack bar animation state to complete and the new snack bar animation\n      state to visible on entry of new snack bar", testing_1.fakeAsync(function () {
        var config = { viewContainerRef: testViewContainerRef };
        var snackBarRef = snackBar.open(simpleMessage, undefined, config);
        var dismissCompleteSpy = jasmine.createSpy('dismiss complete spy');
        viewContainerFixture.detectChanges();
        expect(snackBarRef.containerInstance._animationState)
            .toBe('visible-bottom', "Expected the animation state would be 'visible-bottom'.");
        var config2 = { viewContainerRef: testViewContainerRef };
        var snackBarRef2 = snackBar.open(simpleMessage, undefined, config2);
        viewContainerFixture.detectChanges();
        snackBarRef.afterDismissed().subscribe(undefined, undefined, dismissCompleteSpy);
        testing_1.flush();
        expect(dismissCompleteSpy).toHaveBeenCalled();
        expect(snackBarRef.containerInstance._animationState)
            .toBe('hidden-bottom', "Expected the animation state would be 'hidden-bottom'.");
        expect(snackBarRef2.containerInstance._animationState)
            .toBe('visible-bottom', "Expected the animation state would be 'visible-bottom'.");
    }));
    it('should open a new snackbar after dismissing a previous snackbar', testing_1.fakeAsync(function () {
        var config = { viewContainerRef: testViewContainerRef };
        var snackBarRef = snackBar.open(simpleMessage, 'Dismiss', config);
        viewContainerFixture.detectChanges();
        snackBarRef.dismiss();
        viewContainerFixture.detectChanges();
        // Wait for the snackbar dismiss animation to finish.
        // Wait for the snackbar dismiss animation to finish.
        testing_1.flush();
        snackBarRef = snackBar.open('Second snackbar', 'Dismiss', config);
        viewContainerFixture.detectChanges();
        // Wait for the snackbar open animation to finish.
        // Wait for the snackbar open animation to finish.
        testing_1.flush();
        expect(snackBarRef.containerInstance._animationState)
            .toBe('visible-bottom', "Expected the animation state would be 'visible-bottom'.");
    }));
    it('should remove past snackbars when opening new snackbars', testing_1.fakeAsync(function () {
        snackBar.open('First snackbar');
        viewContainerFixture.detectChanges();
        snackBar.open('Second snackbar');
        viewContainerFixture.detectChanges();
        testing_1.flush();
        snackBar.open('Third snackbar');
        viewContainerFixture.detectChanges();
        testing_1.flush();
        expect(overlayContainerElement.textContent.trim()).toBe('Third snackbar');
    }));
    it('should remove snackbar if another is shown while its still animating open', testing_1.fakeAsync(function () {
        snackBar.open('First snackbar');
        viewContainerFixture.detectChanges();
        snackBar.open('Second snackbar');
        viewContainerFixture.detectChanges();
        testing_1.tick();
        expect(overlayContainerElement.textContent.trim()).toBe('Second snackbar');
        // Let remaining animations run.
        // Let remaining animations run.
        testing_1.tick(500);
    }));
    it('should dismiss the snackbar when the action is called, notifying of both action and dismiss', testing_1.fakeAsync(function () {
        var dismissCompleteSpy = jasmine.createSpy('dismiss complete spy');
        var actionCompleteSpy = jasmine.createSpy('action complete spy');
        var snackBarRef = snackBar.open('Some content', 'Dismiss');
        viewContainerFixture.detectChanges();
        snackBarRef.afterDismissed().subscribe(undefined, undefined, dismissCompleteSpy);
        snackBarRef.onAction().subscribe(undefined, undefined, actionCompleteSpy);
        var actionButton = overlayContainerElement.querySelector('button.mat-button');
        actionButton.click();
        viewContainerFixture.detectChanges();
        testing_1.tick();
        expect(dismissCompleteSpy).toHaveBeenCalled();
        expect(actionCompleteSpy).toHaveBeenCalled();
        testing_1.tick(500);
    }));
    it('should allow manually dismissing with an action', testing_1.fakeAsync(function () {
        var dismissCompleteSpy = jasmine.createSpy('dismiss complete spy');
        var actionCompleteSpy = jasmine.createSpy('action complete spy');
        var snackBarRef = snackBar.open('Some content');
        viewContainerFixture.detectChanges();
        snackBarRef.afterDismissed().subscribe(undefined, undefined, dismissCompleteSpy);
        snackBarRef.onAction().subscribe(undefined, undefined, actionCompleteSpy);
        snackBarRef.dismissWithAction();
        viewContainerFixture.detectChanges();
        testing_1.tick();
        expect(dismissCompleteSpy).toHaveBeenCalled();
        expect(actionCompleteSpy).toHaveBeenCalled();
        testing_1.tick(500);
    }));
    it('should indicate in `afterClosed` whether it was dismissed by an action', testing_1.fakeAsync(function () {
        var dismissSpy = jasmine.createSpy('dismiss spy');
        var snackBarRef = snackBar.open('Some content');
        viewContainerFixture.detectChanges();
        snackBarRef.afterDismissed().subscribe(dismissSpy);
        snackBarRef.dismissWithAction();
        viewContainerFixture.detectChanges();
        testing_1.tick();
        expect(dismissSpy).toHaveBeenCalledWith(jasmine.objectContaining({ dismissedByAction: true }));
        testing_1.tick(500);
    }));
    it('should complete the onAction stream when not closing via an action', testing_1.fakeAsync(function () {
        var actionCompleteSpy = jasmine.createSpy('action complete spy');
        var snackBarRef = snackBar.open('Some content');
        viewContainerFixture.detectChanges();
        snackBarRef.onAction().subscribe(undefined, undefined, actionCompleteSpy);
        snackBarRef.dismiss();
        viewContainerFixture.detectChanges();
        testing_1.tick();
        expect(actionCompleteSpy).toHaveBeenCalled();
        testing_1.tick(500);
    }));
    it('should dismiss automatically after a specified timeout', testing_1.fakeAsync(function () {
        var config = new index_1.MatSnackBarConfig();
        config.duration = 250;
        var snackBarRef = snackBar.open('content', 'test', config);
        var afterDismissSpy = jasmine.createSpy('after dismiss spy');
        snackBarRef.afterDismissed().subscribe(afterDismissSpy);
        viewContainerFixture.detectChanges();
        testing_1.tick();
        expect(afterDismissSpy).not.toHaveBeenCalled();
        testing_1.tick(1000);
        viewContainerFixture.detectChanges();
        testing_1.tick();
        expect(afterDismissSpy).toHaveBeenCalled();
    }));
    it('should clear the dismiss timeout when dismissed before timeout expiration', testing_1.fakeAsync(function () {
        var config = new index_1.MatSnackBarConfig();
        config.duration = 1000;
        snackBar.open('content', 'test', config);
        setTimeout(function () { return snackBar.dismiss(); }, 500);
        testing_1.tick(600);
        viewContainerFixture.detectChanges();
        testing_1.tick();
        expect(viewContainerFixture.isStable()).toBe(true);
    }));
    it('should add extra classes to the container', function () {
        snackBar.open(simpleMessage, simpleActionLabel, { panelClass: ['one', 'two'] });
        viewContainerFixture.detectChanges();
        var containerClasses = overlayContainerElement.querySelector('snack-bar-container').classList;
        expect(containerClasses).toContain('one');
        expect(containerClasses).toContain('two');
    });
    it('should set the layout direction', function () {
        snackBar.open(simpleMessage, simpleActionLabel, { direction: 'rtl' });
        viewContainerFixture.detectChanges();
        var pane = (overlayContainerElement.querySelector('.cdk-global-overlay-wrapper'));
        expect(pane.getAttribute('dir')).toBe('rtl', 'Expected the pane to be in RTL mode.');
    });
    it('should be able to override the default config', testing_1.fakeAsync(function () {
        overlayContainer.ngOnDestroy();
        viewContainerFixture.destroy();
        testing_1.TestBed
            .resetTestingModule()
            .overrideProvider(index_1.MAT_SNACK_BAR_DEFAULT_OPTIONS, {
            deps: [],
            useFactory: function () { return ({ panelClass: 'custom-class' }); }
        })
            .configureTestingModule({ imports: [index_1.MatSnackBarModule, animations_1.NoopAnimationsModule] })
            .compileComponents();
        testing_1.inject([index_1.MatSnackBar, overlay_1.OverlayContainer], function (sb, oc) {
            snackBar = sb;
            overlayContainer = oc;
            overlayContainerElement = oc.getContainerElement();
        })();
        snackBar.open(simpleMessage);
        testing_1.flush();
        expect(overlayContainerElement.querySelector('snack-bar-container').classList)
            .toContain('custom-class', 'Expected class applied through the defaults to be applied.');
    }));
    it('should position the snack bar correctly if no default position is defined', testing_1.fakeAsync(function () {
        overlayContainer.ngOnDestroy();
        viewContainerFixture.destroy();
        testing_1.TestBed
            .resetTestingModule()
            .overrideProvider(index_1.MAT_SNACK_BAR_DEFAULT_OPTIONS, {
            deps: [],
            useFactory: function () { return ({ politeness: 'polite' }); }
        })
            .configureTestingModule({ imports: [index_1.MatSnackBarModule, animations_1.NoopAnimationsModule] })
            .compileComponents();
        testing_1.inject([index_1.MatSnackBar, overlay_1.OverlayContainer], function (sb, oc) {
            snackBar = sb;
            overlayContainer = oc;
            overlayContainerElement = oc.getContainerElement();
        })();
        var snackBarRef = snackBar.open(simpleMessage);
        testing_1.flush();
        expect(snackBarRef.containerInstance._animationState).toBe('visible-bottom');
    }));
    describe('with custom component', function () {
        it('should open a custom component', function () {
            var snackBarRef = snackBar.openFromComponent(BurritosNotification);
            expect(snackBarRef.instance instanceof BurritosNotification)
                .toBe(true, 'Expected the snack bar content component to be BurritosNotification');
            expect(overlayContainerElement.textContent.trim())
                .toBe('Burritos are on the way.', 'Expected component to have the proper text.');
        });
        it('should inject the snack bar reference into the component', function () {
            var snackBarRef = snackBar.openFromComponent(BurritosNotification);
            expect(snackBarRef.instance.snackBarRef)
                .toBe(snackBarRef, 'Expected component to have an injected snack bar reference.');
        });
        it('should be able to inject arbitrary user data', function () {
            var snackBarRef = snackBar.openFromComponent(BurritosNotification, {
                data: {
                    burritoType: 'Chimichanga'
                }
            });
            expect(snackBarRef.instance.data).toBeTruthy('Expected component to have a data object.');
            expect(snackBarRef.instance.data.burritoType)
                .toBe('Chimichanga', 'Expected the injected data object to be the one the user provided.');
        });
        it('should allow manually dismissing with an action', testing_1.fakeAsync(function () {
            var dismissCompleteSpy = jasmine.createSpy('dismiss complete spy');
            var actionCompleteSpy = jasmine.createSpy('action complete spy');
            var snackBarRef = snackBar.openFromComponent(BurritosNotification);
            viewContainerFixture.detectChanges();
            snackBarRef.afterDismissed().subscribe(undefined, undefined, dismissCompleteSpy);
            snackBarRef.onAction().subscribe(undefined, undefined, actionCompleteSpy);
            snackBarRef.dismissWithAction();
            viewContainerFixture.detectChanges();
            testing_1.tick();
            expect(dismissCompleteSpy).toHaveBeenCalled();
            expect(actionCompleteSpy).toHaveBeenCalled();
            testing_1.tick(500);
        }));
    });
    describe('with TemplateRef', function () {
        var templateFixture;
        beforeEach(function () {
            templateFixture = testing_1.TestBed.createComponent(ComponentWithTemplateRef);
            templateFixture.detectChanges();
        });
        it('should be able to open a snack bar using a TemplateRef', function () {
            templateFixture.componentInstance.localValue = 'Pizza';
            snackBar.openFromTemplate(templateFixture.componentInstance.templateRef);
            templateFixture.detectChanges();
            var containerElement = (overlayContainerElement.querySelector('snack-bar-container'));
            expect(containerElement.textContent).toContain('Fries');
            expect(containerElement.textContent).toContain('Pizza');
            templateFixture.componentInstance.localValue = 'Pasta';
            templateFixture.detectChanges();
            expect(containerElement.textContent).toContain('Pasta');
        });
        it('should be able to pass in contextual data when opening with a TemplateRef', function () {
            snackBar.openFromTemplate(templateFixture.componentInstance.templateRef, {
                data: { value: 'Oranges' }
            });
            var containerElement = (overlayContainerElement.querySelector('snack-bar-container'));
            expect(containerElement.textContent).toContain('Oranges');
        });
    });
});
describe('MatSnackBar with parent MatSnackBar', function () {
    var parentSnackBar;
    var childSnackBar;
    var overlayContainer;
    var overlayContainerElement;
    var fixture;
    var liveAnnouncer;
    beforeEach(testing_1.fakeAsync(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [index_1.MatSnackBarModule, SnackBarTestModule, animations_1.NoopAnimationsModule],
            declarations: [ComponentThatProvidesMatSnackBar],
        }).compileComponents();
    }));
    beforeEach(testing_1.inject([index_1.MatSnackBar, a11y_1.LiveAnnouncer, overlay_1.OverlayContainer], function (sb, la, oc) {
        parentSnackBar = sb;
        liveAnnouncer = la;
        overlayContainer = oc;
        overlayContainerElement = oc.getContainerElement();
        fixture = testing_1.TestBed.createComponent(ComponentThatProvidesMatSnackBar);
        childSnackBar = fixture.componentInstance.snackBar;
        fixture.detectChanges();
    }));
    afterEach(function () {
        overlayContainer.ngOnDestroy();
        liveAnnouncer.ngOnDestroy();
    });
    it('should close snackBars opened by parent when opening from child', testing_1.fakeAsync(function () {
        parentSnackBar.open('Pizza');
        fixture.detectChanges();
        testing_1.tick(1000);
        expect(overlayContainerElement.textContent)
            .toContain('Pizza', 'Expected a snackBar to be opened');
        childSnackBar.open('Taco');
        fixture.detectChanges();
        testing_1.tick(1000);
        expect(overlayContainerElement.textContent)
            .toContain('Taco', 'Expected parent snackbar msg to be dismissed by opening from child');
    }));
    it('should close snackBars opened by child when opening from parent', testing_1.fakeAsync(function () {
        childSnackBar.open('Pizza');
        fixture.detectChanges();
        testing_1.tick(1000);
        expect(overlayContainerElement.textContent)
            .toContain('Pizza', 'Expected a snackBar to be opened');
        parentSnackBar.open('Taco');
        fixture.detectChanges();
        testing_1.tick(1000);
        expect(overlayContainerElement.textContent)
            .toContain('Taco', 'Expected child snackbar msg to be dismissed by opening from parent');
    }));
});
describe('MatSnackBar Positioning', function () {
    var snackBar;
    var liveAnnouncer;
    var overlayContainer;
    var overlayContainerEl;
    var viewContainerFixture;
    var simpleMessage = 'Burritos are here!';
    var simpleActionLabel = 'pickup';
    beforeEach(testing_1.fakeAsync(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [index_1.MatSnackBarModule, SnackBarTestModule, animations_1.NoopAnimationsModule],
        }).compileComponents();
    }));
    beforeEach(testing_1.inject([index_1.MatSnackBar, a11y_1.LiveAnnouncer, overlay_1.OverlayContainer], function (sb, la, oc) {
        snackBar = sb;
        liveAnnouncer = la;
        overlayContainer = oc;
        overlayContainerEl = oc.getContainerElement();
    }));
    afterEach(function () {
        overlayContainer.ngOnDestroy();
        liveAnnouncer.ngOnDestroy();
    });
    beforeEach(function () {
        viewContainerFixture = testing_1.TestBed.createComponent(ComponentWithChildViewContainer);
        viewContainerFixture.detectChanges();
    });
    it('should default to bottom center', testing_1.fakeAsync(function () {
        snackBar.open(simpleMessage, simpleActionLabel);
        viewContainerFixture.detectChanges();
        testing_1.flush();
        var containerEl = overlayContainerEl.querySelector('snack-bar-container');
        var overlayPaneEl = overlayContainerEl.querySelector('.cdk-overlay-pane');
        expect(containerEl.classList.contains('mat-snack-bar-center')).toBeTruthy();
        expect(containerEl.classList.contains('mat-snack-bar-top')).toBeFalsy();
        expect(overlayPaneEl.style.marginBottom).toBe('0px', 'Expected margin-bottom to be "0px"');
        expect(overlayPaneEl.style.marginTop).toBe('', 'Expected margin-top to be ""');
        expect(overlayPaneEl.style.marginRight).toBe('', 'Expected margin-right to be ""');
        expect(overlayPaneEl.style.marginLeft).toBe('', 'Expected margin-left  to be ""');
    }));
    it('should be in the bottom left corner', testing_1.fakeAsync(function () {
        snackBar.open(simpleMessage, simpleActionLabel, {
            verticalPosition: 'bottom',
            horizontalPosition: 'left'
        });
        viewContainerFixture.detectChanges();
        testing_1.flush();
        var containerEl = overlayContainerEl.querySelector('snack-bar-container');
        var overlayPaneEl = overlayContainerEl.querySelector('.cdk-overlay-pane');
        expect(containerEl.classList.contains('mat-snack-bar-center')).toBeFalsy();
        expect(containerEl.classList.contains('mat-snack-bar-top')).toBeFalsy();
        expect(overlayPaneEl.style.marginBottom).toBe('0px', 'Expected margin-bottom to be "0px"');
        expect(overlayPaneEl.style.marginTop).toBe('', 'Expected margin-top to be ""');
        expect(overlayPaneEl.style.marginRight).toBe('', 'Expected margin-right to be ""');
        expect(overlayPaneEl.style.marginLeft).toBe('0px', 'Expected margin-left  to be "0px"');
    }));
    it('should be in the bottom right corner', testing_1.fakeAsync(function () {
        snackBar.open(simpleMessage, simpleActionLabel, {
            verticalPosition: 'bottom',
            horizontalPosition: 'right'
        });
        viewContainerFixture.detectChanges();
        testing_1.flush();
        var containerEl = overlayContainerEl.querySelector('snack-bar-container');
        var overlayPaneEl = overlayContainerEl.querySelector('.cdk-overlay-pane');
        expect(containerEl.classList.contains('mat-snack-bar-center')).toBeFalsy();
        expect(containerEl.classList.contains('mat-snack-bar-top')).toBeFalsy();
        expect(overlayPaneEl.style.marginBottom).toBe('0px', 'Expected margin-bottom to be "0px"');
        expect(overlayPaneEl.style.marginTop).toBe('', 'Expected margin-top to be ""');
        expect(overlayPaneEl.style.marginRight).toBe('0px', 'Expected margin-right to be "0px"');
        expect(overlayPaneEl.style.marginLeft).toBe('', 'Expected margin-left  to be ""');
    }));
    it('should be in the bottom center', testing_1.fakeAsync(function () {
        snackBar.open(simpleMessage, simpleActionLabel, {
            verticalPosition: 'bottom',
            horizontalPosition: 'center'
        });
        viewContainerFixture.detectChanges();
        testing_1.flush();
        var containerEl = overlayContainerEl.querySelector('snack-bar-container');
        var overlayPaneEl = overlayContainerEl.querySelector('.cdk-overlay-pane');
        expect(containerEl.classList.contains('mat-snack-bar-center')).toBeTruthy();
        expect(containerEl.classList.contains('mat-snack-bar-top')).toBeFalsy();
        expect(overlayPaneEl.style.marginBottom).toBe('0px', 'Expected margin-bottom to be "0px"');
        expect(overlayPaneEl.style.marginTop).toBe('', 'Expected margin-top to be ""');
        expect(overlayPaneEl.style.marginRight).toBe('', 'Expected margin-right to be ""');
        expect(overlayPaneEl.style.marginLeft).toBe('', 'Expected margin-left  to be ""');
    }));
    it('should be in the top left corner', testing_1.fakeAsync(function () {
        snackBar.open(simpleMessage, simpleActionLabel, {
            verticalPosition: 'top',
            horizontalPosition: 'left'
        });
        viewContainerFixture.detectChanges();
        testing_1.flush();
        var containerEl = overlayContainerEl.querySelector('snack-bar-container');
        var overlayPaneEl = overlayContainerEl.querySelector('.cdk-overlay-pane');
        expect(containerEl.classList.contains('mat-snack-bar-center')).toBeFalsy();
        expect(containerEl.classList.contains('mat-snack-bar-top')).toBeTruthy();
        expect(overlayPaneEl.style.marginBottom).toBe('', 'Expected margin-bottom to be ""');
        expect(overlayPaneEl.style.marginTop).toBe('0px', 'Expected margin-top to be "0px"');
        expect(overlayPaneEl.style.marginRight).toBe('', 'Expected margin-right to be ""');
        expect(overlayPaneEl.style.marginLeft).toBe('0px', 'Expected margin-left  to be "0px"');
    }));
    it('should be in the top right corner', testing_1.fakeAsync(function () {
        snackBar.open(simpleMessage, simpleActionLabel, {
            verticalPosition: 'top',
            horizontalPosition: 'right'
        });
        viewContainerFixture.detectChanges();
        testing_1.flush();
        var containerEl = overlayContainerEl.querySelector('snack-bar-container');
        var overlayPaneEl = overlayContainerEl.querySelector('.cdk-overlay-pane');
        expect(containerEl.classList.contains('mat-snack-bar-center')).toBeFalsy();
        expect(containerEl.classList.contains('mat-snack-bar-top')).toBeTruthy();
        expect(overlayPaneEl.style.marginBottom).toBe('', 'Expected margin-bottom to be ""');
        expect(overlayPaneEl.style.marginTop).toBe('0px', 'Expected margin-top to be "0px"');
        expect(overlayPaneEl.style.marginRight).toBe('0px', 'Expected margin-right to be "0px"');
        expect(overlayPaneEl.style.marginLeft).toBe('', 'Expected margin-left  to be ""');
    }));
    it('should be in the top center', testing_1.fakeAsync(function () {
        snackBar.open(simpleMessage, simpleActionLabel, {
            verticalPosition: 'top',
            horizontalPosition: 'center'
        });
        viewContainerFixture.detectChanges();
        testing_1.flush();
        var containerEl = overlayContainerEl.querySelector('snack-bar-container');
        var overlayPaneEl = overlayContainerEl.querySelector('.cdk-overlay-pane');
        expect(containerEl.classList.contains('mat-snack-bar-center')).toBeTruthy();
        expect(containerEl.classList.contains('mat-snack-bar-top')).toBeTruthy();
        expect(overlayPaneEl.style.marginBottom).toBe('', 'Expected margin-bottom to be ""');
        expect(overlayPaneEl.style.marginTop).toBe('0px', 'Expected margin-top to be "0px"');
        expect(overlayPaneEl.style.marginRight).toBe('', 'Expected margin-right to be ""');
        expect(overlayPaneEl.style.marginLeft).toBe('', 'Expected margin-left  to be ""');
    }));
    it('should handle start based on direction (rtl)', testing_1.fakeAsync(function () {
        snackBar.open(simpleMessage, simpleActionLabel, {
            verticalPosition: 'top',
            horizontalPosition: 'start',
            direction: 'rtl',
        });
        viewContainerFixture.detectChanges();
        testing_1.flush();
        var containerEl = overlayContainerEl.querySelector('snack-bar-container');
        var overlayPaneEl = overlayContainerEl.querySelector('.cdk-overlay-pane');
        expect(containerEl.classList.contains('mat-snack-bar-center')).toBeFalsy();
        expect(containerEl.classList.contains('mat-snack-bar-top')).toBeTruthy();
        expect(overlayPaneEl.style.marginBottom).toBe('', 'Expected margin-bottom to be ""');
        expect(overlayPaneEl.style.marginTop).toBe('0px', 'Expected margin-top to be "0px"');
        expect(overlayPaneEl.style.marginRight).toBe('0px', 'Expected margin-right to be "0px"');
        expect(overlayPaneEl.style.marginLeft).toBe('', 'Expected margin-left  to be ""');
    }));
    it('should handle start based on direction (ltr)', testing_1.fakeAsync(function () {
        snackBar.open(simpleMessage, simpleActionLabel, {
            verticalPosition: 'top',
            horizontalPosition: 'start',
            direction: 'ltr',
        });
        viewContainerFixture.detectChanges();
        testing_1.flush();
        var containerEl = overlayContainerEl.querySelector('snack-bar-container');
        var overlayPaneEl = overlayContainerEl.querySelector('.cdk-overlay-pane');
        expect(containerEl.classList.contains('mat-snack-bar-center')).toBeFalsy();
        expect(containerEl.classList.contains('mat-snack-bar-top')).toBeTruthy();
        expect(overlayPaneEl.style.marginBottom).toBe('', 'Expected margin-bottom to be ""');
        expect(overlayPaneEl.style.marginTop).toBe('0px', 'Expected margin-top to be "0px"');
        expect(overlayPaneEl.style.marginRight).toBe('', 'Expected margin-right to be ""');
        expect(overlayPaneEl.style.marginLeft).toBe('0px', 'Expected margin-left  to be "0px"');
    }));
    it('should handle end based on direction (rtl)', testing_1.fakeAsync(function () {
        snackBar.open(simpleMessage, simpleActionLabel, {
            verticalPosition: 'top',
            horizontalPosition: 'end',
            direction: 'rtl',
        });
        viewContainerFixture.detectChanges();
        testing_1.flush();
        var containerEl = overlayContainerEl.querySelector('snack-bar-container');
        var overlayPaneEl = overlayContainerEl.querySelector('.cdk-overlay-pane');
        expect(containerEl.classList.contains('mat-snack-bar-center')).toBeFalsy();
        expect(containerEl.classList.contains('mat-snack-bar-top')).toBeTruthy();
        expect(overlayPaneEl.style.marginBottom).toBe('', 'Expected margin-bottom to be ""');
        expect(overlayPaneEl.style.marginTop).toBe('0px', 'Expected margin-top to be "0px"');
        expect(overlayPaneEl.style.marginRight).toBe('', 'Expected margin-right to be ""');
        expect(overlayPaneEl.style.marginLeft).toBe('0px', 'Expected margin-left  to be "0px"');
    }));
    it('should handle end based on direction (ltr)', testing_1.fakeAsync(function () {
        snackBar.open(simpleMessage, simpleActionLabel, {
            verticalPosition: 'top',
            horizontalPosition: 'end',
            direction: 'ltr',
        });
        viewContainerFixture.detectChanges();
        testing_1.flush();
        var containerEl = overlayContainerEl.querySelector('snack-bar-container');
        var overlayPaneEl = overlayContainerEl.querySelector('.cdk-overlay-pane');
        expect(containerEl.classList.contains('mat-snack-bar-center')).toBeFalsy();
        expect(containerEl.classList.contains('mat-snack-bar-top')).toBeTruthy();
        expect(overlayPaneEl.style.marginBottom).toBe('', 'Expected margin-bottom to be ""');
        expect(overlayPaneEl.style.marginTop).toBe('0px', 'Expected margin-top to be "0px"');
        expect(overlayPaneEl.style.marginRight).toBe('0px', 'Expected margin-right to be "0px"');
        expect(overlayPaneEl.style.marginLeft).toBe('', 'Expected margin-left  to be ""');
    }));
});
var DirectiveWithViewContainer = /** @class */ (function () {
    function DirectiveWithViewContainer(viewContainerRef) {
        this.viewContainerRef = viewContainerRef;
    }
    DirectiveWithViewContainer.decorators = [
        { type: core_1.Directive, args: [{ selector: 'dir-with-view-container' },] },
    ];
    /** @nocollapse */
    DirectiveWithViewContainer.ctorParameters = function () { return [
        { type: core_1.ViewContainerRef, },
    ]; };
    return DirectiveWithViewContainer;
}());
var ComponentWithChildViewContainer = /** @class */ (function () {
    function ComponentWithChildViewContainer() {
        this.childComponentExists = true;
    }
    Object.defineProperty(ComponentWithChildViewContainer.prototype, "childViewContainer", {
        get: function () {
            return this.childWithViewContainer.viewContainerRef;
        },
        enumerable: true,
        configurable: true
    });
    ComponentWithChildViewContainer.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'arbitrary-component',
                    template: "<dir-with-view-container *ngIf=\"childComponentExists\"></dir-with-view-container>",
                },] },
    ];
    /** @nocollapse */
    ComponentWithChildViewContainer.propDecorators = {
        "childWithViewContainer": [{ type: core_1.ViewChild, args: [DirectiveWithViewContainer,] },],
    };
    return ComponentWithChildViewContainer;
}());
var ComponentWithTemplateRef = /** @class */ (function () {
    function ComponentWithTemplateRef() {
    }
    ComponentWithTemplateRef.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'arbitrary-component-with-template-ref',
                    template: "\n    <ng-template let-data>\n      Fries {{localValue}} {{data?.value}}\n    </ng-template>\n  ",
                },] },
    ];
    /** @nocollapse */
    ComponentWithTemplateRef.propDecorators = {
        "templateRef": [{ type: core_1.ViewChild, args: [core_1.TemplateRef,] },],
    };
    return ComponentWithTemplateRef;
}());
/** Simple component for testing ComponentPortal. */
var BurritosNotification = /** @class */ (function () {
    function BurritosNotification(snackBarRef, data) {
        this.snackBarRef = snackBarRef;
        this.data = data;
    }
    BurritosNotification.decorators = [
        { type: core_1.Component, args: [{ template: '<p>Burritos are on the way.</p>' },] },
    ];
    /** @nocollapse */
    BurritosNotification.ctorParameters = function () { return [
        { type: index_1.MatSnackBarRef, },
        { type: undefined, decorators: [{ type: core_1.Inject, args: [index_1.MAT_SNACK_BAR_DATA,] },] },
    ]; };
    return BurritosNotification;
}());
var ComponentThatProvidesMatSnackBar = /** @class */ (function () {
    function ComponentThatProvidesMatSnackBar(snackBar) {
        this.snackBar = snackBar;
    }
    ComponentThatProvidesMatSnackBar.decorators = [
        { type: core_1.Component, args: [{
                    template: '',
                    providers: [index_1.MatSnackBar]
                },] },
    ];
    /** @nocollapse */
    ComponentThatProvidesMatSnackBar.ctorParameters = function () { return [
        { type: index_1.MatSnackBar, },
    ]; };
    return ComponentThatProvidesMatSnackBar;
}());
/**
 * Simple component to open snack bars from.
 * Create a real (non-test) NgModule as a workaround forRoot
 * https://github.com/angular/angular/issues/10760
 */
var TEST_DIRECTIVES = [ComponentWithChildViewContainer,
    BurritosNotification,
    DirectiveWithViewContainer,
    ComponentWithTemplateRef];
var SnackBarTestModule = /** @class */ (function () {
    function SnackBarTestModule() {
    }
    SnackBarTestModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [common_1.CommonModule, index_1.MatSnackBarModule],
                    exports: TEST_DIRECTIVES,
                    declarations: TEST_DIRECTIVES,
                    entryComponents: [ComponentWithChildViewContainer, BurritosNotification],
                },] },
    ];
    return SnackBarTestModule;
}());
//# sourceMappingURL=snack-bar.spec.js.map