"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var animations_1 = require("@angular/platform-browser/animations");
var common_1 = require("@angular/common");
var testing_2 = require("@angular/common/testing");
var bidi_1 = require("@angular/cdk/bidi");
var dialog_container_1 = require("./dialog-container");
var overlay_1 = require("@angular/cdk/overlay");
var keycodes_1 = require("@angular/cdk/keycodes");
var testing_3 = require("@angular/cdk/testing");
var index_1 = require("./index");
var rxjs_1 = require("rxjs");
describe('MatDialog', function () {
    var dialog;
    var overlayContainer;
    var overlayContainerElement;
    var scrolledSubject = new rxjs_1.Subject();
    var testViewContainerRef;
    var viewContainerFixture;
    var mockLocation;
    beforeEach(testing_1.fakeAsync(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [index_1.MatDialogModule, DialogTestModule],
            providers: [
                { provide: common_1.Location, useClass: testing_2.SpyLocation },
                { provide: overlay_1.ScrollDispatcher, useFactory: function () {
                        return ({
                            scrolled: function () { return scrolledSubject.asObservable(); }
                        });
                    } },
            ],
        });
        testing_1.TestBed.compileComponents();
    }));
    beforeEach(testing_1.inject([index_1.MatDialog, common_1.Location, overlay_1.OverlayContainer], function (d, l, oc) {
        dialog = d;
        mockLocation = l;
        overlayContainer = oc;
        overlayContainerElement = oc.getContainerElement();
    }));
    afterEach(function () {
        overlayContainer.ngOnDestroy();
    });
    beforeEach(function () {
        viewContainerFixture = testing_1.TestBed.createComponent(ComponentWithChildViewContainer);
        viewContainerFixture.detectChanges();
        testViewContainerRef = viewContainerFixture.componentInstance.childViewContainer;
    });
    it('should open a dialog with a component', function () {
        var dialogRef = dialog.open(PizzaMsg, {
            viewContainerRef: testViewContainerRef
        });
        viewContainerFixture.detectChanges();
        expect(overlayContainerElement.textContent).toContain('Pizza');
        expect(dialogRef.componentInstance instanceof PizzaMsg).toBe(true);
        expect(dialogRef.componentInstance.dialogRef).toBe(dialogRef);
        viewContainerFixture.detectChanges();
        var dialogContainerElement = (overlayContainerElement.querySelector('mat-dialog-container'));
        expect(dialogContainerElement.getAttribute('role')).toBe('dialog');
    });
    it('should open a dialog with a template', function () {
        var templateRefFixture = testing_1.TestBed.createComponent(ComponentWithTemplateRef);
        templateRefFixture.componentInstance.localValue = 'Bees';
        templateRefFixture.detectChanges();
        var data = { value: 'Knees' };
        var dialogRef = dialog.open(templateRefFixture.componentInstance.templateRef, { data: data });
        viewContainerFixture.detectChanges();
        expect(overlayContainerElement.textContent).toContain('Cheese Bees Knees');
        expect(templateRefFixture.componentInstance.dialogRef).toBe(dialogRef);
        viewContainerFixture.detectChanges();
        var dialogContainerElement = (overlayContainerElement.querySelector('mat-dialog-container'));
        expect(dialogContainerElement.getAttribute('role')).toBe('dialog');
        dialogRef.close();
    });
    it('should emit when dialog opening animation is complete', testing_1.fakeAsync(function () {
        var dialogRef = dialog.open(PizzaMsg, { viewContainerRef: testViewContainerRef });
        var spy = jasmine.createSpy('afterOpen spy');
        dialogRef.afterOpened().subscribe(spy);
        viewContainerFixture.detectChanges();
        // callback should not be called before animation is complete
        expect(spy).not.toHaveBeenCalled();
        testing_1.flushMicrotasks();
        expect(spy).toHaveBeenCalled();
    }));
    it('should use injector from viewContainerRef for DialogInjector', function () {
        var dialogRef = dialog.open(PizzaMsg, {
            viewContainerRef: testViewContainerRef
        });
        viewContainerFixture.detectChanges();
        var dialogInjector = dialogRef.componentInstance.dialogInjector;
        expect(dialogRef.componentInstance.dialogRef).toBe(dialogRef);
        expect(dialogInjector.get(DirectiveWithViewContainer)).toBeTruthy('Expected the dialog component to be created with the injector from the viewContainerRef.');
    });
    it('should open a dialog with a component and no ViewContainerRef', function () {
        var dialogRef = dialog.open(PizzaMsg);
        viewContainerFixture.detectChanges();
        expect(overlayContainerElement.textContent).toContain('Pizza');
        expect(dialogRef.componentInstance instanceof PizzaMsg).toBe(true);
        expect(dialogRef.componentInstance.dialogRef).toBe(dialogRef);
        viewContainerFixture.detectChanges();
        var dialogContainerElement = (overlayContainerElement.querySelector('mat-dialog-container'));
        expect(dialogContainerElement.getAttribute('role')).toBe('dialog');
    });
    it('should apply the configured role to the dialog element', function () {
        dialog.open(PizzaMsg, { role: 'alertdialog' });
        viewContainerFixture.detectChanges();
        var dialogContainerElement = (overlayContainerElement.querySelector('mat-dialog-container'));
        expect(dialogContainerElement.getAttribute('role')).toBe('alertdialog');
    });
    it('should apply the specified `aria-describedby`', function () {
        dialog.open(PizzaMsg, { ariaDescribedBy: 'description-element' });
        viewContainerFixture.detectChanges();
        var dialogContainerElement = (overlayContainerElement.querySelector('mat-dialog-container'));
        expect(dialogContainerElement.getAttribute('aria-describedby')).toBe('description-element');
    });
    it('should close a dialog and get back a result', testing_1.fakeAsync(function () {
        var dialogRef = dialog.open(PizzaMsg, { viewContainerRef: testViewContainerRef });
        var afterCloseCallback = jasmine.createSpy('afterClose callback');
        dialogRef.afterClosed().subscribe(afterCloseCallback);
        dialogRef.close('Charmander');
        viewContainerFixture.detectChanges();
        testing_1.flush();
        expect(afterCloseCallback).toHaveBeenCalledWith('Charmander');
        expect(overlayContainerElement.querySelector('mat-dialog-container')).toBeNull();
    }));
    it('should dispatch the beforeClose and afterClose events when the ' +
        'overlay is detached externally', testing_1.fakeAsync(testing_1.inject([overlay_1.Overlay], function (overlay) {
        var dialogRef = dialog.open(PizzaMsg, {
            viewContainerRef: testViewContainerRef,
            scrollStrategy: overlay.scrollStrategies.close()
        });
        var beforeCloseCallback = jasmine.createSpy('beforeClosed callback');
        var afterCloseCallback = jasmine.createSpy('afterClosed callback');
        dialogRef.beforeClose().subscribe(beforeCloseCallback);
        dialogRef.afterClosed().subscribe(afterCloseCallback);
        scrolledSubject.next();
        viewContainerFixture.detectChanges();
        testing_1.flush();
        expect(beforeCloseCallback).toHaveBeenCalledTimes(1);
        expect(afterCloseCallback).toHaveBeenCalledTimes(1);
    })));
    it('should close a dialog and get back a result before it is closed', testing_1.fakeAsync(function () {
        var dialogRef = dialog.open(PizzaMsg, { viewContainerRef: testViewContainerRef });
        testing_1.flush();
        viewContainerFixture.detectChanges();
        // beforeClose should emit before dialog container is destroyed
        var beforeCloseHandler = jasmine.createSpy('beforeClose callback').and.callFake(function () {
            expect(overlayContainerElement.querySelector('mat-dialog-container'))
                .not.toBeNull('dialog container exists when beforeClose is called');
        });
        dialogRef.beforeClosed().subscribe(beforeCloseHandler);
        dialogRef.close('Bulbasaur');
        viewContainerFixture.detectChanges();
        testing_1.flush();
        expect(beforeCloseHandler).toHaveBeenCalledWith('Bulbasaur');
        expect(overlayContainerElement.querySelector('mat-dialog-container')).toBeNull();
    }));
    it('should close a dialog via the escape key', testing_1.fakeAsync(function () {
        dialog.open(PizzaMsg, {
            viewContainerRef: testViewContainerRef
        });
        testing_3.dispatchKeyboardEvent(document.body, 'keydown', keycodes_1.ESCAPE);
        viewContainerFixture.detectChanges();
        testing_1.flush();
        expect(overlayContainerElement.querySelector('mat-dialog-container')).toBeNull();
    }));
    it('should close from a ViewContainerRef with OnPush change detection', testing_1.fakeAsync(function () {
        var onPushFixture = testing_1.TestBed.createComponent(ComponentWithOnPushViewContainer);
        onPushFixture.detectChanges();
        var dialogRef = dialog.open(PizzaMsg, {
            viewContainerRef: onPushFixture.componentInstance.viewContainerRef
        });
        testing_1.flushMicrotasks();
        onPushFixture.detectChanges();
        testing_1.flushMicrotasks();
        expect(overlayContainerElement.querySelectorAll('mat-dialog-container').length)
            .toBe(1, 'Expected one open dialog.');
        dialogRef.close();
        testing_1.flushMicrotasks();
        onPushFixture.detectChanges();
        testing_1.tick(500);
        expect(overlayContainerElement.querySelectorAll('mat-dialog-container').length)
            .toBe(0, 'Expected no open dialogs.');
    }));
    it('should close when clicking on the overlay backdrop', testing_1.fakeAsync(function () {
        dialog.open(PizzaMsg, {
            viewContainerRef: testViewContainerRef
        });
        viewContainerFixture.detectChanges();
        var backdrop = overlayContainerElement.querySelector('.cdk-overlay-backdrop');
        backdrop.click();
        viewContainerFixture.detectChanges();
        testing_1.flush();
        expect(overlayContainerElement.querySelector('mat-dialog-container')).toBeFalsy();
    }));
    it('should emit the backdropClick stream when clicking on the overlay backdrop', testing_1.fakeAsync(function () {
        var dialogRef = dialog.open(PizzaMsg, {
            viewContainerRef: testViewContainerRef
        });
        var spy = jasmine.createSpy('backdropClick spy');
        dialogRef.backdropClick().subscribe(spy);
        viewContainerFixture.detectChanges();
        var backdrop = overlayContainerElement.querySelector('.cdk-overlay-backdrop');
        backdrop.click();
        expect(spy).toHaveBeenCalledTimes(1);
        viewContainerFixture.detectChanges();
        testing_1.flush();
        // Additional clicks after the dialog has closed should not be emitted
        backdrop.click();
        expect(spy).toHaveBeenCalledTimes(1);
    }));
    it('should emit the keyboardEvent stream when key events target the overlay', testing_1.fakeAsync(function () {
        var dialogRef = dialog.open(PizzaMsg, { viewContainerRef: testViewContainerRef });
        var spy = jasmine.createSpy('keyboardEvent spy');
        dialogRef.keydownEvents().subscribe(spy);
        viewContainerFixture.detectChanges();
        var backdrop = overlayContainerElement.querySelector('.cdk-overlay-backdrop');
        var container = overlayContainerElement.querySelector('mat-dialog-container');
        testing_3.dispatchKeyboardEvent(document.body, 'keydown', keycodes_1.A);
        testing_3.dispatchKeyboardEvent(document.body, 'keydown', keycodes_1.A, backdrop);
        testing_3.dispatchKeyboardEvent(document.body, 'keydown', keycodes_1.A, container);
        expect(spy).toHaveBeenCalledTimes(3);
    }));
    it('should notify the observers if a dialog has been opened', function () {
        dialog.afterOpened.subscribe(function (ref) {
            expect(dialog.open(PizzaMsg, {
                viewContainerRef: testViewContainerRef
            })).toBe(ref);
        });
    });
    it('should notify the observers if all open dialogs have finished closing', testing_1.fakeAsync(function () {
        var ref1 = dialog.open(PizzaMsg, { viewContainerRef: testViewContainerRef });
        var ref2 = dialog.open(ContentElementDialog, { viewContainerRef: testViewContainerRef });
        var spy = jasmine.createSpy('afterAllClosed spy');
        dialog.afterAllClosed.subscribe(spy);
        ref1.close();
        viewContainerFixture.detectChanges();
        testing_1.flush();
        expect(spy).not.toHaveBeenCalled();
        ref2.close();
        viewContainerFixture.detectChanges();
        testing_1.flush();
        expect(spy).toHaveBeenCalled();
    }));
    it('should emit the afterAllClosed stream on subscribe if there are no open dialogs', function () {
        var spy = jasmine.createSpy('afterAllClosed spy');
        dialog.afterAllClosed.subscribe(spy);
        expect(spy).toHaveBeenCalled();
    });
    it('should should override the width of the overlay pane', function () {
        dialog.open(PizzaMsg, {
            width: '500px'
        });
        viewContainerFixture.detectChanges();
        var overlayPane = overlayContainerElement.querySelector('.cdk-overlay-pane');
        expect(overlayPane.style.width).toBe('500px');
    });
    it('should should override the height of the overlay pane', function () {
        dialog.open(PizzaMsg, {
            height: '100px'
        });
        viewContainerFixture.detectChanges();
        var overlayPane = overlayContainerElement.querySelector('.cdk-overlay-pane');
        expect(overlayPane.style.height).toBe('100px');
    });
    it('should should override the min-width of the overlay pane', function () {
        dialog.open(PizzaMsg, {
            minWidth: '500px'
        });
        viewContainerFixture.detectChanges();
        var overlayPane = overlayContainerElement.querySelector('.cdk-overlay-pane');
        expect(overlayPane.style.minWidth).toBe('500px');
    });
    it('should should override the max-width of the overlay pane', testing_1.fakeAsync(function () {
        var dialogRef = dialog.open(PizzaMsg);
        viewContainerFixture.detectChanges();
        var overlayPane = overlayContainerElement.querySelector('.cdk-overlay-pane');
        expect(overlayPane.style.maxWidth).toBe('80vw', 'Expected dialog to set a default max-width on overlay pane');
        dialogRef.close();
        testing_1.tick(500);
        viewContainerFixture.detectChanges();
        testing_1.flushMicrotasks();
        dialogRef = dialog.open(PizzaMsg, {
            maxWidth: '100px'
        });
        viewContainerFixture.detectChanges();
        overlayPane = overlayContainerElement.querySelector('.cdk-overlay-pane');
        expect(overlayPane.style.maxWidth).toBe('100px');
    }));
    it('should should override the min-height of the overlay pane', function () {
        dialog.open(PizzaMsg, {
            minHeight: '300px'
        });
        viewContainerFixture.detectChanges();
        var overlayPane = overlayContainerElement.querySelector('.cdk-overlay-pane');
        expect(overlayPane.style.minHeight).toBe('300px');
    });
    it('should should override the max-height of the overlay pane', function () {
        dialog.open(PizzaMsg, {
            maxHeight: '100px'
        });
        viewContainerFixture.detectChanges();
        var overlayPane = overlayContainerElement.querySelector('.cdk-overlay-pane');
        expect(overlayPane.style.maxHeight).toBe('100px');
    });
    it('should should override the top offset of the overlay pane', function () {
        dialog.open(PizzaMsg, {
            position: {
                top: '100px'
            }
        });
        viewContainerFixture.detectChanges();
        var overlayPane = overlayContainerElement.querySelector('.cdk-overlay-pane');
        expect(overlayPane.style.marginTop).toBe('100px');
    });
    it('should should override the bottom offset of the overlay pane', function () {
        dialog.open(PizzaMsg, {
            position: {
                bottom: '200px'
            }
        });
        viewContainerFixture.detectChanges();
        var overlayPane = overlayContainerElement.querySelector('.cdk-overlay-pane');
        expect(overlayPane.style.marginBottom).toBe('200px');
    });
    it('should should override the left offset of the overlay pane', function () {
        dialog.open(PizzaMsg, {
            position: {
                left: '250px'
            }
        });
        viewContainerFixture.detectChanges();
        var overlayPane = overlayContainerElement.querySelector('.cdk-overlay-pane');
        expect(overlayPane.style.marginLeft).toBe('250px');
    });
    it('should should override the right offset of the overlay pane', function () {
        dialog.open(PizzaMsg, {
            position: {
                right: '125px'
            }
        });
        viewContainerFixture.detectChanges();
        var overlayPane = overlayContainerElement.querySelector('.cdk-overlay-pane');
        expect(overlayPane.style.marginRight).toBe('125px');
    });
    it('should allow for the position to be updated', function () {
        var dialogRef = dialog.open(PizzaMsg, {
            position: {
                left: '250px'
            }
        });
        viewContainerFixture.detectChanges();
        var overlayPane = overlayContainerElement.querySelector('.cdk-overlay-pane');
        expect(overlayPane.style.marginLeft).toBe('250px');
        dialogRef.updatePosition({ left: '500px' });
        expect(overlayPane.style.marginLeft).toBe('500px');
    });
    it('should allow for the dimensions to be updated', function () {
        var dialogRef = dialog.open(PizzaMsg, { width: '100px' });
        viewContainerFixture.detectChanges();
        var overlayPane = overlayContainerElement.querySelector('.cdk-overlay-pane');
        expect(overlayPane.style.width).toBe('100px');
        dialogRef.updateSize('200px');
        expect(overlayPane.style.width).toBe('200px');
    });
    it('should reset the overlay dimensions to their initial size', function () {
        var dialogRef = dialog.open(PizzaMsg);
        viewContainerFixture.detectChanges();
        var overlayPane = overlayContainerElement.querySelector('.cdk-overlay-pane');
        expect(overlayPane.style.width).toBeFalsy();
        expect(overlayPane.style.height).toBeFalsy();
        dialogRef.updateSize('200px', '200px');
        expect(overlayPane.style.width).toBe('200px');
        expect(overlayPane.style.height).toBe('200px');
        dialogRef.updateSize();
        expect(overlayPane.style.width).toBeFalsy();
        expect(overlayPane.style.height).toBeFalsy();
    });
    it('should allow setting the layout direction', function () {
        dialog.open(PizzaMsg, { direction: 'rtl' });
        viewContainerFixture.detectChanges();
        var overlayPane = (overlayContainerElement.querySelector('.cdk-global-overlay-wrapper'));
        expect(overlayPane.getAttribute('dir')).toBe('rtl');
    });
    it('should inject the correct layout direction in the component instance', function () {
        var dialogRef = dialog.open(PizzaMsg, { direction: 'rtl' });
        viewContainerFixture.detectChanges();
        expect(dialogRef.componentInstance.directionality.value).toBe('rtl');
    });
    it('should fall back to injecting the global direction if none is passed by the config', function () {
        var dialogRef = dialog.open(PizzaMsg, {});
        viewContainerFixture.detectChanges();
        expect(dialogRef.componentInstance.directionality.value).toBe('ltr');
    });
    it('should close all of the dialogs', testing_1.fakeAsync(function () {
        dialog.open(PizzaMsg);
        dialog.open(PizzaMsg);
        dialog.open(PizzaMsg);
        expect(overlayContainerElement.querySelectorAll('mat-dialog-container').length).toBe(3);
        dialog.closeAll();
        viewContainerFixture.detectChanges();
        testing_1.flush();
        expect(overlayContainerElement.querySelectorAll('mat-dialog-container').length).toBe(0);
    }));
    it('should set the proper animation states', function () {
        var dialogRef = dialog.open(PizzaMsg, { viewContainerRef: testViewContainerRef });
        var dialogContainer = viewContainerFixture.debugElement.query(platform_browser_1.By.directive(dialog_container_1.MatDialogContainer)).componentInstance;
        expect(dialogContainer._state).toBe('enter');
        dialogRef.close();
        expect(dialogContainer._state).toBe('exit');
    });
    it('should close all dialogs when the user goes forwards/backwards in history', testing_1.fakeAsync(function () {
        dialog.open(PizzaMsg);
        dialog.open(PizzaMsg);
        expect(overlayContainerElement.querySelectorAll('mat-dialog-container').length).toBe(2);
        mockLocation.simulateUrlPop('');
        viewContainerFixture.detectChanges();
        testing_1.flush();
        expect(overlayContainerElement.querySelectorAll('mat-dialog-container').length).toBe(0);
    }));
    it('should close all open dialogs when the location hash changes', testing_1.fakeAsync(function () {
        dialog.open(PizzaMsg);
        dialog.open(PizzaMsg);
        expect(overlayContainerElement.querySelectorAll('mat-dialog-container').length).toBe(2);
        mockLocation.simulateHashChange('');
        viewContainerFixture.detectChanges();
        testing_1.flush();
        expect(overlayContainerElement.querySelectorAll('mat-dialog-container').length).toBe(0);
    }));
    it('should allow the consumer to disable closing a dialog on navigation', testing_1.fakeAsync(function () {
        dialog.open(PizzaMsg);
        dialog.open(PizzaMsg, { closeOnNavigation: false });
        expect(overlayContainerElement.querySelectorAll('mat-dialog-container').length).toBe(2);
        mockLocation.simulateUrlPop('');
        viewContainerFixture.detectChanges();
        testing_1.flush();
        expect(overlayContainerElement.querySelectorAll('mat-dialog-container').length).toBe(1);
    }));
    it('should have the componentInstance available in the afterClosed callback', testing_1.fakeAsync(function () {
        var dialogRef = dialog.open(PizzaMsg);
        var spy = jasmine.createSpy('afterClosed spy');
        testing_1.flushMicrotasks();
        viewContainerFixture.detectChanges();
        testing_1.flushMicrotasks();
        dialogRef.afterClosed().subscribe(function () {
            spy();
            expect(dialogRef.componentInstance).toBeTruthy('Expected component instance to be defined.');
        });
        dialogRef.close();
        testing_1.flushMicrotasks();
        viewContainerFixture.detectChanges();
        testing_1.tick(500);
        // Ensure that the callback actually fires.
        expect(spy).toHaveBeenCalled();
    }));
    it('should be able to attach a custom scroll strategy', testing_1.fakeAsync(function () {
        var scrollStrategy = {
            attach: function () { },
            enable: jasmine.createSpy('scroll strategy enable spy'),
            disable: function () { }
        };
        dialog.open(PizzaMsg, { scrollStrategy: scrollStrategy });
        expect(scrollStrategy.enable).toHaveBeenCalled();
    }));
    describe('passing in data', function () {
        it('should be able to pass in data', function () {
            var config = {
                data: {
                    stringParam: 'hello',
                    dateParam: new Date()
                }
            };
            var instance = dialog.open(DialogWithInjectedData, config).componentInstance;
            expect(instance.data.stringParam).toBe(config.data.stringParam);
            expect(instance.data.dateParam).toBe(config.data.dateParam);
        });
        it('should default to null if no data is passed', function () {
            expect(function () {
                var dialogRef = dialog.open(DialogWithInjectedData);
                expect(dialogRef.componentInstance.data).toBeNull();
            }).not.toThrow();
        });
    });
    it('should not keep a reference to the component after the dialog is closed', testing_1.fakeAsync(function () {
        var dialogRef = dialog.open(PizzaMsg);
        expect(dialogRef.componentInstance).toBeTruthy();
        dialogRef.close();
        viewContainerFixture.detectChanges();
        testing_1.flush();
        expect(dialogRef.componentInstance).toBeFalsy('Expected reference to have been cleared.');
    }));
    it('should assign a unique id to each dialog', function () {
        var one = dialog.open(PizzaMsg);
        var two = dialog.open(PizzaMsg);
        expect(one.id).toBeTruthy();
        expect(two.id).toBeTruthy();
        expect(one.id).not.toBe(two.id);
    });
    it('should allow for the id to be overwritten', function () {
        var dialogRef = dialog.open(PizzaMsg, { id: 'pizza' });
        expect(dialogRef.id).toBe('pizza');
    });
    it('should throw when trying to open a dialog with the same id as another dialog', function () {
        dialog.open(PizzaMsg, { id: 'pizza' });
        expect(function () { return dialog.open(PizzaMsg, { id: 'pizza' }); }).toThrowError(/must be unique/g);
    });
    it('should be able to find a dialog by id', function () {
        var dialogRef = dialog.open(PizzaMsg, { id: 'pizza' });
        expect(dialog.getDialogById('pizza')).toBe(dialogRef);
    });
    it('should toggle `aria-hidden` on the overlay container siblings', testing_1.fakeAsync(function () {
        var sibling = document.createElement('div');
        overlayContainerElement.parentNode.appendChild(sibling);
        var dialogRef = dialog.open(PizzaMsg, { viewContainerRef: testViewContainerRef });
        viewContainerFixture.detectChanges();
        testing_1.flush();
        expect(sibling.getAttribute('aria-hidden')).toBe('true', 'Expected sibling to be hidden');
        expect(overlayContainerElement.hasAttribute('aria-hidden'))
            .toBe(false, 'Expected overlay container not to be hidden.');
        dialogRef.close();
        viewContainerFixture.detectChanges();
        testing_1.flush();
        expect(sibling.hasAttribute('aria-hidden'))
            .toBe(false, 'Expected sibling to no longer be hidden.');
        sibling.parentNode.removeChild(sibling);
    }));
    it('should restore `aria-hidden` to the overlay container siblings on close', testing_1.fakeAsync(function () {
        var sibling = document.createElement('div');
        sibling.setAttribute('aria-hidden', 'true');
        overlayContainerElement.parentNode.appendChild(sibling);
        var dialogRef = dialog.open(PizzaMsg, { viewContainerRef: testViewContainerRef });
        viewContainerFixture.detectChanges();
        testing_1.flush();
        expect(sibling.getAttribute('aria-hidden')).toBe('true', 'Expected sibling to be hidden.');
        dialogRef.close();
        viewContainerFixture.detectChanges();
        testing_1.flush();
        expect(sibling.getAttribute('aria-hidden')).toBe('true', 'Expected sibling to remain hidden.');
        sibling.parentNode.removeChild(sibling);
    }));
    it('should not set `aria-hidden` on `aria-live` elements', testing_1.fakeAsync(function () {
        var sibling = document.createElement('div');
        sibling.setAttribute('aria-live', 'polite');
        overlayContainerElement.parentNode.appendChild(sibling);
        dialog.open(PizzaMsg, { viewContainerRef: testViewContainerRef });
        viewContainerFixture.detectChanges();
        testing_1.flush();
        expect(sibling.hasAttribute('aria-hidden'))
            .toBe(false, 'Expected live element not to be hidden.');
        sibling.parentNode.removeChild(sibling);
    }));
    describe('disableClose option', function () {
        it('should prevent closing via clicks on the backdrop', function () {
            dialog.open(PizzaMsg, {
                disableClose: true,
                viewContainerRef: testViewContainerRef
            });
            viewContainerFixture.detectChanges();
            var backdrop = overlayContainerElement.querySelector('.cdk-overlay-backdrop');
            backdrop.click();
            expect(overlayContainerElement.querySelector('mat-dialog-container')).toBeTruthy();
        });
        it('should prevent closing via the escape key', function () {
            dialog.open(PizzaMsg, {
                disableClose: true,
                viewContainerRef: testViewContainerRef
            });
            viewContainerFixture.detectChanges();
            testing_3.dispatchKeyboardEvent(document.body, 'keydown', keycodes_1.ESCAPE);
            expect(overlayContainerElement.querySelector('mat-dialog-container')).toBeTruthy();
        });
        it('should allow for the disableClose option to be updated while open', testing_1.fakeAsync(function () {
            var dialogRef = dialog.open(PizzaMsg, {
                disableClose: true,
                viewContainerRef: testViewContainerRef
            });
            viewContainerFixture.detectChanges();
            var backdrop = overlayContainerElement.querySelector('.cdk-overlay-backdrop');
            backdrop.click();
            expect(overlayContainerElement.querySelector('mat-dialog-container')).toBeTruthy();
            dialogRef.disableClose = false;
            backdrop.click();
            viewContainerFixture.detectChanges();
            testing_1.flush();
            expect(overlayContainerElement.querySelector('mat-dialog-container')).toBeFalsy();
        }));
    });
    describe('hasBackdrop option', function () {
        it('should have a backdrop', function () {
            dialog.open(PizzaMsg, {
                hasBackdrop: true,
                viewContainerRef: testViewContainerRef
            });
            viewContainerFixture.detectChanges();
            expect(overlayContainerElement.querySelector('.cdk-overlay-backdrop')).toBeTruthy();
        });
        it('should not have a backdrop', function () {
            dialog.open(PizzaMsg, {
                hasBackdrop: false,
                viewContainerRef: testViewContainerRef
            });
            viewContainerFixture.detectChanges();
            expect(overlayContainerElement.querySelector('.cdk-overlay-backdrop')).toBeFalsy();
        });
    });
    describe('panelClass option', function () {
        it('should have custom panel class', function () {
            dialog.open(PizzaMsg, {
                panelClass: 'custom-panel-class',
                viewContainerRef: testViewContainerRef
            });
            viewContainerFixture.detectChanges();
            expect(overlayContainerElement.querySelector('.custom-panel-class')).toBeTruthy();
        });
    });
    describe('backdropClass option', function () {
        it('should have default backdrop class', function () {
            dialog.open(PizzaMsg, {
                backdropClass: '',
                viewContainerRef: testViewContainerRef
            });
            viewContainerFixture.detectChanges();
            expect(overlayContainerElement.querySelector('.cdk-overlay-dark-backdrop')).toBeTruthy();
        });
        it('should have custom backdrop class', function () {
            dialog.open(PizzaMsg, {
                backdropClass: 'custom-backdrop-class',
                viewContainerRef: testViewContainerRef
            });
            viewContainerFixture.detectChanges();
            expect(overlayContainerElement.querySelector('.custom-backdrop-class')).toBeTruthy();
        });
    });
    describe('focus management', function () {
        // When testing focus, all of the elements must be in the DOM.
        beforeEach(function () { return document.body.appendChild(overlayContainerElement); });
        afterEach(function () { return document.body.removeChild(overlayContainerElement); });
        it('should focus the first tabbable element of the dialog on open', testing_1.fakeAsync(function () {
            dialog.open(PizzaMsg, {
                viewContainerRef: testViewContainerRef
            });
            viewContainerFixture.detectChanges();
            testing_1.flushMicrotasks();
            expect(document.activeElement.tagName)
                .toBe('INPUT', 'Expected first tabbable element (input) in the dialog to be focused.');
        }));
        it('should allow disabling focus of the first tabbable element', testing_1.fakeAsync(function () {
            dialog.open(PizzaMsg, {
                viewContainerRef: testViewContainerRef,
                autoFocus: false
            });
            viewContainerFixture.detectChanges();
            testing_1.flushMicrotasks();
            expect(document.activeElement.tagName).not.toBe('INPUT');
        }));
        it('should re-focus trigger element when dialog closes', testing_1.fakeAsync(function () {
            // Create a element that has focus before the dialog is opened.
            var button = document.createElement('button');
            button.id = 'dialog-trigger';
            document.body.appendChild(button);
            button.focus();
            var dialogRef = dialog.open(PizzaMsg, { viewContainerRef: testViewContainerRef });
            testing_1.flushMicrotasks();
            viewContainerFixture.detectChanges();
            testing_1.flushMicrotasks();
            expect(document.activeElement.id)
                .not.toBe('dialog-trigger', 'Expected the focus to change when dialog was opened.');
            dialogRef.close();
            expect(document.activeElement.id).not.toBe('dialog-trigger', 'Expcted the focus not to have changed before the animation finishes.');
            testing_1.flushMicrotasks();
            viewContainerFixture.detectChanges();
            testing_1.tick(500);
            expect(document.activeElement.id).toBe('dialog-trigger', 'Expected that the trigger was refocused after the dialog is closed.');
            document.body.removeChild(button);
        }));
        it('should allow the consumer to shift focus in afterClosed', testing_1.fakeAsync(function () {
            // Create a element that has focus before the dialog is opened.
            var button = document.createElement('button');
            var input = document.createElement('input');
            button.id = 'dialog-trigger';
            input.id = 'input-to-be-focused';
            document.body.appendChild(button);
            document.body.appendChild(input);
            button.focus();
            var dialogRef = dialog.open(PizzaMsg, { viewContainerRef: testViewContainerRef });
            testing_1.tick(500);
            viewContainerFixture.detectChanges();
            dialogRef.afterClosed().subscribe(function () { return input.focus(); });
            dialogRef.close();
            testing_1.tick(500);
            viewContainerFixture.detectChanges();
            testing_1.flushMicrotasks();
            expect(document.activeElement.id).toBe('input-to-be-focused', 'Expected that the trigger was refocused after the dialog is closed.');
            document.body.removeChild(button);
            document.body.removeChild(input);
        }));
        it('should move focus to the container if there are no focusable elements in the dialog', testing_1.fakeAsync(function () {
            dialog.open(DialogWithoutFocusableElements);
            viewContainerFixture.detectChanges();
            testing_1.flushMicrotasks();
            expect(document.activeElement.tagName)
                .toBe('MAT-DIALOG-CONTAINER', 'Expected dialog container to be focused.');
        }));
        it('should be able to disable focus restoration', testing_1.fakeAsync(function () {
            // Create a element that has focus before the dialog is opened.
            var button = document.createElement('button');
            button.id = 'dialog-trigger';
            document.body.appendChild(button);
            button.focus();
            var dialogRef = dialog.open(PizzaMsg, {
                viewContainerRef: testViewContainerRef,
                restoreFocus: false
            });
            testing_1.flushMicrotasks();
            viewContainerFixture.detectChanges();
            testing_1.flushMicrotasks();
            expect(document.activeElement.id)
                .not.toBe('dialog-trigger', 'Expected the focus to change when dialog was opened.');
            dialogRef.close();
            testing_1.flushMicrotasks();
            viewContainerFixture.detectChanges();
            testing_1.tick(500);
            expect(document.activeElement.id).not.toBe('dialog-trigger', 'Expected focus not to have been restored.');
            document.body.removeChild(button);
        }));
    });
    describe('dialog content elements', function () {
        var dialogRef;
        describe('inside component dialog', function () {
            beforeEach(testing_1.fakeAsync(function () {
                dialogRef = dialog.open(ContentElementDialog, { viewContainerRef: testViewContainerRef });
                viewContainerFixture.detectChanges();
                testing_1.flush();
            }));
            runContentElementTests();
        });
        describe('inside template portal', function () {
            beforeEach(testing_1.fakeAsync(function () {
                var fixture = testing_1.TestBed.createComponent(ComponentWithContentElementTemplateRef);
                fixture.detectChanges();
                dialogRef = dialog.open(fixture.componentInstance.templateRef, {
                    viewContainerRef: testViewContainerRef
                });
                viewContainerFixture.detectChanges();
                testing_1.flush();
            }));
            runContentElementTests();
        });
        function runContentElementTests() {
            it('should close the dialog when clicking on the close button', testing_1.fakeAsync(function () {
                expect(overlayContainerElement.querySelectorAll('.mat-dialog-container').length).toBe(1);
                overlayContainerElement.querySelector('button[mat-dialog-close]').click();
                viewContainerFixture.detectChanges();
                testing_1.flush();
                expect(overlayContainerElement.querySelectorAll('.mat-dialog-container').length).toBe(0);
            }));
            it('should not close if [mat-dialog-close] is applied on a non-button node', function () {
                expect(overlayContainerElement.querySelectorAll('.mat-dialog-container').length).toBe(1);
                overlayContainerElement.querySelector('div[mat-dialog-close]').click();
                expect(overlayContainerElement.querySelectorAll('.mat-dialog-container').length).toBe(1);
            });
            it('should allow for a user-specified aria-label on the close button', testing_1.fakeAsync(function () {
                var button = (overlayContainerElement.querySelector('.close-with-aria-label'));
                expect(button.getAttribute('aria-label')).toBe('Best close button ever');
            }));
            it('should override the "type" attribute of the close button', function () {
                var button = (overlayContainerElement.querySelector('button[mat-dialog-close]'));
                expect(button.getAttribute('type')).toBe('button');
            });
            it('should return the [mat-dialog-close] result when clicking the close button', testing_1.fakeAsync(function () {
                var afterCloseCallback = jasmine.createSpy('afterClose callback');
                dialogRef.afterClosed().subscribe(afterCloseCallback);
                overlayContainerElement.querySelector('button.close-with-true').click();
                viewContainerFixture.detectChanges();
                testing_1.flush();
                expect(afterCloseCallback).toHaveBeenCalledWith(true);
            }));
            it('should set the aria-labelledby attribute to the id of the title', testing_1.fakeAsync(function () {
                var title = (overlayContainerElement.querySelector('[mat-dialog-title]'));
                var container = (overlayContainerElement.querySelector('mat-dialog-container'));
                testing_1.flush();
                viewContainerFixture.detectChanges();
                expect(title.id).toBeTruthy('Expected title element to have an id.');
                expect(container.getAttribute('aria-labelledby'))
                    .toBe(title.id, 'Expected the aria-labelledby to match the title id.');
            }));
        }
    });
    describe('aria-label', function () {
        it('should be able to set a custom aria-label', function () {
            dialog.open(PizzaMsg, {
                ariaLabel: 'Hello there',
                viewContainerRef: testViewContainerRef
            });
            viewContainerFixture.detectChanges();
            var container = (overlayContainerElement.querySelector('mat-dialog-container'));
            expect(container.getAttribute('aria-label')).toBe('Hello there');
        });
        it('should not set the aria-labelledby automatically if it has an aria-label', testing_1.fakeAsync(function () {
            dialog.open(ContentElementDialog, {
                ariaLabel: 'Hello there',
                viewContainerRef: testViewContainerRef
            });
            viewContainerFixture.detectChanges();
            testing_1.tick();
            viewContainerFixture.detectChanges();
            var container = (overlayContainerElement.querySelector('mat-dialog-container'));
            expect(container.hasAttribute('aria-labelledby')).toBe(false);
        }));
    });
});
describe('MatDialog with a parent MatDialog', function () {
    var parentDialog;
    var childDialog;
    var overlayContainerElement;
    var fixture;
    beforeEach(testing_1.fakeAsync(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [index_1.MatDialogModule, DialogTestModule],
            declarations: [ComponentThatProvidesMatDialog],
            providers: [
                { provide: overlay_1.OverlayContainer, useFactory: function () {
                        overlayContainerElement = document.createElement('div');
                        return { getContainerElement: function () { return overlayContainerElement; } };
                    } },
                { provide: common_1.Location, useClass: testing_2.SpyLocation }
            ],
        });
        testing_1.TestBed.compileComponents();
    }));
    beforeEach(testing_1.inject([index_1.MatDialog], function (d) {
        parentDialog = d;
        fixture = testing_1.TestBed.createComponent(ComponentThatProvidesMatDialog);
        childDialog = fixture.componentInstance.dialog;
        fixture.detectChanges();
    }));
    afterEach(function () {
        overlayContainerElement.innerHTML = '';
    });
    it('should close dialogs opened by a parent when calling closeAll on a child MatDialog', testing_1.fakeAsync(function () {
        parentDialog.open(PizzaMsg);
        fixture.detectChanges();
        testing_1.flush();
        expect(overlayContainerElement.textContent)
            .toContain('Pizza', 'Expected a dialog to be opened');
        childDialog.closeAll();
        fixture.detectChanges();
        testing_1.flush();
        expect(overlayContainerElement.textContent.trim())
            .toBe('', 'Expected closeAll on child MatDialog to close dialog opened by parent');
    }));
    it('should close dialogs opened by a child when calling closeAll on a parent MatDialog', testing_1.fakeAsync(function () {
        childDialog.open(PizzaMsg);
        fixture.detectChanges();
        expect(overlayContainerElement.textContent)
            .toContain('Pizza', 'Expected a dialog to be opened');
        parentDialog.closeAll();
        fixture.detectChanges();
        testing_1.flush();
        expect(overlayContainerElement.textContent.trim())
            .toBe('', 'Expected closeAll on parent MatDialog to close dialog opened by child');
    }));
    it('should close the top dialog via the escape key', testing_1.fakeAsync(function () {
        childDialog.open(PizzaMsg);
        testing_3.dispatchKeyboardEvent(document.body, 'keydown', keycodes_1.ESCAPE);
        fixture.detectChanges();
        testing_1.flush();
        expect(overlayContainerElement.querySelector('mat-dialog-container')).toBeNull();
    }));
});
describe('MatDialog with default options', function () {
    var dialog;
    var overlayContainer;
    var overlayContainerElement;
    var testViewContainerRef;
    var viewContainerFixture;
    beforeEach(testing_1.fakeAsync(function () {
        var defaultConfig = {
            hasBackdrop: false,
            disableClose: true,
            width: '100px',
            height: '100px',
            minWidth: '50px',
            minHeight: '50px',
            maxWidth: '150px',
            maxHeight: '150px',
            autoFocus: false,
        };
        testing_1.TestBed.configureTestingModule({
            imports: [index_1.MatDialogModule, DialogTestModule],
            providers: [
                { provide: index_1.MAT_DIALOG_DEFAULT_OPTIONS, useValue: defaultConfig },
            ],
        });
        testing_1.TestBed.compileComponents();
    }));
    beforeEach(testing_1.inject([index_1.MatDialog, overlay_1.OverlayContainer], function (d, oc) {
        dialog = d;
        overlayContainer = oc;
        overlayContainerElement = oc.getContainerElement();
    }));
    afterEach(function () {
        overlayContainer.ngOnDestroy();
    });
    beforeEach(function () {
        viewContainerFixture = testing_1.TestBed.createComponent(ComponentWithChildViewContainer);
        viewContainerFixture.detectChanges();
        testViewContainerRef = viewContainerFixture.componentInstance.childViewContainer;
    });
    it('should use the provided defaults', function () {
        dialog.open(PizzaMsg, { viewContainerRef: testViewContainerRef });
        viewContainerFixture.detectChanges();
        expect(overlayContainerElement.querySelector('.cdk-overlay-backdrop')).toBeFalsy();
        testing_3.dispatchKeyboardEvent(document.body, 'keydown', keycodes_1.ESCAPE);
        expect(overlayContainerElement.querySelector('mat-dialog-container')).toBeTruthy();
        expect(document.activeElement.tagName).not.toBe('INPUT');
        var overlayPane = overlayContainerElement.querySelector('.cdk-overlay-pane');
        expect(overlayPane.style.width).toBe('100px');
        expect(overlayPane.style.height).toBe('100px');
        expect(overlayPane.style.minWidth).toBe('50px');
        expect(overlayPane.style.minHeight).toBe('50px');
        expect(overlayPane.style.maxWidth).toBe('150px');
        expect(overlayPane.style.maxHeight).toBe('150px');
    });
    it('should be overridable by open() options', testing_1.fakeAsync(function () {
        dialog.open(PizzaMsg, {
            hasBackdrop: true,
            disableClose: false,
            viewContainerRef: testViewContainerRef
        });
        viewContainerFixture.detectChanges();
        expect(overlayContainerElement.querySelector('.cdk-overlay-backdrop')).toBeTruthy();
        testing_3.dispatchKeyboardEvent(document.body, 'keydown', keycodes_1.ESCAPE);
        viewContainerFixture.detectChanges();
        testing_1.flush();
        expect(overlayContainerElement.querySelector('mat-dialog-container')).toBeFalsy();
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
var ComponentWithOnPushViewContainer = /** @class */ (function () {
    function ComponentWithOnPushViewContainer(viewContainerRef) {
        this.viewContainerRef = viewContainerRef;
    }
    ComponentWithOnPushViewContainer.decorators = [
        { type: core_1.Component, args: [{
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    template: 'hello',
                },] },
    ];
    /** @nocollapse */
    ComponentWithOnPushViewContainer.ctorParameters = function () { return [
        { type: core_1.ViewContainerRef, },
    ]; };
    return ComponentWithOnPushViewContainer;
}());
var ComponentWithChildViewContainer = /** @class */ (function () {
    function ComponentWithChildViewContainer() {
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
                    template: "<dir-with-view-container></dir-with-view-container>",
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
    ComponentWithTemplateRef.prototype.setDialogRef = function (dialogRef) {
        this.dialogRef = dialogRef;
        return '';
    };
    ComponentWithTemplateRef.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'arbitrary-component-with-template-ref',
                    template: "<ng-template let-data let-dialogRef=\"dialogRef\">\n      Cheese {{localValue}} {{data?.value}}{{setDialogRef(dialogRef)}}</ng-template>",
                },] },
    ];
    /** @nocollapse */
    ComponentWithTemplateRef.propDecorators = {
        "templateRef": [{ type: core_1.ViewChild, args: [core_1.TemplateRef,] },],
    };
    return ComponentWithTemplateRef;
}());
/** Simple component for testing ComponentPortal. */
var PizzaMsg = /** @class */ (function () {
    function PizzaMsg(dialogRef, dialogInjector, directionality) {
        this.dialogRef = dialogRef;
        this.dialogInjector = dialogInjector;
        this.directionality = directionality;
    }
    PizzaMsg.decorators = [
        { type: core_1.Component, args: [{ template: '<p>Pizza</p> <input> <button>Close</button>' },] },
    ];
    /** @nocollapse */
    PizzaMsg.ctorParameters = function () { return [
        { type: index_1.MatDialogRef, },
        { type: core_1.Injector, },
        { type: bidi_1.Directionality, },
    ]; };
    return PizzaMsg;
}());
var ContentElementDialog = /** @class */ (function () {
    function ContentElementDialog() {
    }
    ContentElementDialog.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <h1 mat-dialog-title>This is the title</h1>\n    <mat-dialog-content>Lorem ipsum dolor sit amet.</mat-dialog-content>\n    <mat-dialog-actions>\n      <button mat-dialog-close>Close</button>\n      <button class=\"close-with-true\" [mat-dialog-close]=\"true\">Close and return true</button>\n      <button\n        class=\"close-with-aria-label\"\n        aria-label=\"Best close button ever\"\n        [mat-dialog-close]=\"true\">Close</button>\n      <div mat-dialog-close>Should not close</div>\n    </mat-dialog-actions>\n  "
                },] },
    ];
    return ContentElementDialog;
}());
var ComponentWithContentElementTemplateRef = /** @class */ (function () {
    function ComponentWithContentElementTemplateRef() {
    }
    ComponentWithContentElementTemplateRef.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <ng-template>\n      <h1 mat-dialog-title>This is the title</h1>\n      <mat-dialog-content>Lorem ipsum dolor sit amet.</mat-dialog-content>\n      <mat-dialog-actions>\n        <button mat-dialog-close>Close</button>\n        <button class=\"close-with-true\" [mat-dialog-close]=\"true\">Close and return true</button>\n        <button\n          class=\"close-with-aria-label\"\n          aria-label=\"Best close button ever\"\n          [mat-dialog-close]=\"true\">Close</button>\n        <div mat-dialog-close>Should not close</div>\n      </mat-dialog-actions>\n    </ng-template>\n  "
                },] },
    ];
    /** @nocollapse */
    ComponentWithContentElementTemplateRef.propDecorators = {
        "templateRef": [{ type: core_1.ViewChild, args: [core_1.TemplateRef,] },],
    };
    return ComponentWithContentElementTemplateRef;
}());
var ComponentThatProvidesMatDialog = /** @class */ (function () {
    function ComponentThatProvidesMatDialog(dialog) {
        this.dialog = dialog;
    }
    ComponentThatProvidesMatDialog.decorators = [
        { type: core_1.Component, args: [{
                    template: '',
                    providers: [index_1.MatDialog]
                },] },
    ];
    /** @nocollapse */
    ComponentThatProvidesMatDialog.ctorParameters = function () { return [
        { type: index_1.MatDialog, },
    ]; };
    return ComponentThatProvidesMatDialog;
}());
/** Simple component for testing ComponentPortal. */
var DialogWithInjectedData = /** @class */ (function () {
    function DialogWithInjectedData(data) {
        this.data = data;
    }
    DialogWithInjectedData.decorators = [
        { type: core_1.Component, args: [{ template: '' },] },
    ];
    /** @nocollapse */
    DialogWithInjectedData.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: core_1.Inject, args: [index_1.MAT_DIALOG_DATA,] },] },
    ]; };
    return DialogWithInjectedData;
}());
var DialogWithoutFocusableElements = /** @class */ (function () {
    function DialogWithoutFocusableElements() {
    }
    DialogWithoutFocusableElements.decorators = [
        { type: core_1.Component, args: [{ template: '<p>Pasta</p>' },] },
    ];
    return DialogWithoutFocusableElements;
}());
// Create a real (non-test) NgModule as a workaround for
// https://github.com/angular/angular/issues/10760
var TEST_DIRECTIVES = [
    ComponentWithChildViewContainer,
    ComponentWithTemplateRef,
    PizzaMsg,
    DirectiveWithViewContainer,
    ComponentWithOnPushViewContainer,
    ContentElementDialog,
    DialogWithInjectedData,
    DialogWithoutFocusableElements,
    ComponentWithContentElementTemplateRef,
];
var DialogTestModule = /** @class */ (function () {
    function DialogTestModule() {
    }
    DialogTestModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [index_1.MatDialogModule, animations_1.NoopAnimationsModule],
                    exports: TEST_DIRECTIVES,
                    declarations: TEST_DIRECTIVES,
                    entryComponents: [
                        ComponentWithChildViewContainer,
                        ComponentWithTemplateRef,
                        PizzaMsg,
                        ContentElementDialog,
                        DialogWithInjectedData,
                        DialogWithoutFocusableElements,
                    ],
                },] },
    ];
    return DialogTestModule;
}());
//# sourceMappingURL=dialog.spec.js.map