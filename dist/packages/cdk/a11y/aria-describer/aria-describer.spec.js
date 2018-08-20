"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../index");
var aria_describer_1 = require("./aria-describer");
var testing_1 = require("@angular/core/testing");
var core_1 = require("@angular/core");
describe('AriaDescriber', function () {
    var ariaDescriber;
    var component;
    var fixture;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [index_1.A11yModule],
            declarations: [TestApp],
            providers: [aria_describer_1.AriaDescriber],
        }).compileComponents();
    }));
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(TestApp);
        component = fixture.componentInstance;
        ariaDescriber = component.ariaDescriber;
    });
    afterEach(function () {
        ariaDescriber.ngOnDestroy();
    });
    it('should initialize without the message container', function () {
        expect(getMessagesContainer()).toBeNull();
    });
    it('should be able to create a message element', function () {
        ariaDescriber.describe(component.element1, 'My Message');
        expectMessages(['My Message']);
    });
    it('should not register empty strings', function () {
        ariaDescriber.describe(component.element1, '');
        expect(getMessageElements()).toBe(null);
    });
    it('should not register non-string values', function () {
        expect(function () { return ariaDescriber.describe(component.element1, (null)); }).not.toThrow();
        expect(getMessageElements()).toBe(null);
    });
    it('should not throw when trying to remove non-string value', function () {
        expect(function () { return ariaDescriber.removeDescription(component.element1, (null)); }).not.toThrow();
    });
    it('should de-dupe a message registered multiple times', function () {
        ariaDescriber.describe(component.element1, 'My Message');
        ariaDescriber.describe(component.element2, 'My Message');
        ariaDescriber.describe(component.element3, 'My Message');
        expectMessages(['My Message']);
        expectMessage(component.element1, 'My Message');
        expectMessage(component.element2, 'My Message');
        expectMessage(component.element3, 'My Message');
    });
    it('should be able to register multiple messages', function () {
        ariaDescriber.describe(component.element1, 'First Message');
        ariaDescriber.describe(component.element2, 'Second Message');
        expectMessages(['First Message', 'Second Message']);
        expectMessage(component.element1, 'First Message');
        expectMessage(component.element2, 'Second Message');
    });
    it('should be able to unregister messages', function () {
        ariaDescriber.describe(component.element1, 'My Message');
        expectMessages(['My Message']);
        // Register again to check dedupe
        ariaDescriber.describe(component.element2, 'My Message');
        expectMessages(['My Message']);
        // Unregister one message and make sure the message is still present in the container
        ariaDescriber.removeDescription(component.element1, 'My Message');
        expect(component.element1.hasAttribute(index_1.CDK_DESCRIBEDBY_HOST_ATTRIBUTE)).toBeFalsy();
        expectMessages(['My Message']);
        // Unregister the second message, message container should be gone
        ariaDescriber.removeDescription(component.element2, 'My Message');
        expect(component.element2.hasAttribute(index_1.CDK_DESCRIBEDBY_HOST_ATTRIBUTE)).toBeFalsy();
        expect(getMessagesContainer()).toBeNull();
    });
    it('should be able to unregister messages while having others registered', function () {
        ariaDescriber.describe(component.element1, 'Persistent Message');
        ariaDescriber.describe(component.element2, 'My Message');
        expectMessages(['Persistent Message', 'My Message']);
        // Register again to check dedupe
        ariaDescriber.describe(component.element3, 'My Message');
        expectMessages(['Persistent Message', 'My Message']);
        // Unregister one message and make sure the message is still present in the container
        ariaDescriber.removeDescription(component.element2, 'My Message');
        expectMessages(['Persistent Message', 'My Message']);
        // Unregister the second message, message container should be gone
        ariaDescriber.removeDescription(component.element3, 'My Message');
        expectMessages(['Persistent Message']);
    });
    it('should be able to append to an existing list of aria describedby', function () {
        ariaDescriber.describe(component.element4, 'My Message');
        expectMessages(['My Message']);
        expectMessage(component.element4, 'My Message');
    });
    it('should be able to handle multiple regisitrations of the same message to an element', function () {
        ariaDescriber.describe(component.element1, 'My Message');
        ariaDescriber.describe(component.element1, 'My Message');
        expectMessages(['My Message']);
        expectMessage(component.element1, 'My Message');
    });
    it('should not throw when attempting to describe a non-element node', function () {
        var node = document.createComment('Not an element node');
        expect(function () { return ariaDescriber.describe(node, 'This looks like an element'); }).not.toThrow();
    });
    it('should clear any pre-existing containers', function () {
        var extraContainer = document.createElement('div');
        extraContainer.id = aria_describer_1.MESSAGES_CONTAINER_ID;
        document.body.appendChild(extraContainer);
        ariaDescriber.describe(component.element1, 'Hello');
        // Use `querySelectorAll` with an attribute since `getElementById` will stop at the first match.
        expect(document.querySelectorAll("[id='" + aria_describer_1.MESSAGES_CONTAINER_ID + "']").length).toBe(1);
    });
});
function getMessagesContainer() {
    return document.querySelector("#" + aria_describer_1.MESSAGES_CONTAINER_ID);
}
function getMessageElements() {
    var messagesContainer = getMessagesContainer();
    if (!messagesContainer) {
        return null;
    }
    return messagesContainer ? Array.prototype.slice.call(messagesContainer.children) : null;
}
/** Checks that the messages array matches the existing created message elements. */
function expectMessages(messages) {
    var messageElements = getMessageElements();
    expect(messageElements).toBeDefined();
    expect(messages.length).toBe(messageElements.length);
    messages.forEach(function (message, i) {
        expect(messageElements[i].textContent).toBe(message);
    });
}
/** Checks that an element points to a message element that contains the message. */
function expectMessage(el, message) {
    var ariaDescribedBy = el.getAttribute('aria-describedby');
    expect(ariaDescribedBy).toBeDefined();
    var cdkDescribedBy = el.getAttribute(index_1.CDK_DESCRIBEDBY_HOST_ATTRIBUTE);
    expect(cdkDescribedBy).toBeDefined();
    var messages = ariaDescribedBy.split(' ').map(function (referenceId) {
        var messageElement = document.querySelector("#" + referenceId);
        return messageElement ? messageElement.textContent : '';
    });
    expect(messages).toContain(message);
}
var TestApp = /** @class */ (function () {
    function TestApp(ariaDescriber) {
        this.ariaDescriber = ariaDescriber;
    }
    Object.defineProperty(TestApp.prototype, "element1", {
        get: function () { return this._element1.nativeElement; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TestApp.prototype, "element2", {
        get: function () { return this._element2.nativeElement; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TestApp.prototype, "element3", {
        get: function () { return this._element3.nativeElement; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TestApp.prototype, "element4", {
        get: function () { return this._element4.nativeElement; },
        enumerable: true,
        configurable: true
    });
    TestApp.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <div #element1></div>\n    <div #element2></div>\n    <div #element3></div>\n    <div #element4 aria-describedby=\"existing-aria-describedby1 existing-aria-describedby2\"></div>\n  ",
                },] },
    ];
    /** @nocollapse */
    TestApp.ctorParameters = function () { return [
        { type: aria_describer_1.AriaDescriber, },
    ]; };
    TestApp.propDecorators = {
        "_element1": [{ type: core_1.ViewChild, args: ['element1',] },],
        "_element2": [{ type: core_1.ViewChild, args: ['element2',] },],
        "_element3": [{ type: core_1.ViewChild, args: ['element3',] },],
        "_element4": [{ type: core_1.ViewChild, args: ['element4',] },],
    };
    return TestApp;
}());
//# sourceMappingURL=aria-describer.spec.js.map