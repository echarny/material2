"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var aria_reference_1 = require("./aria-reference");
var i0 = require("@angular/core");
var i1 = require("@angular/common");
/** ID used for the body container where all messages are appended. */
exports.MESSAGES_CONTAINER_ID = 'cdk-describedby-message-container';
/** ID prefix used for each created message element. */
exports.CDK_DESCRIBEDBY_ID_PREFIX = 'cdk-describedby-message';
/** Attribute given to each host element that is described by a message element. */
exports.CDK_DESCRIBEDBY_HOST_ATTRIBUTE = 'cdk-describedby-host';
/** Global incremental identifier for each registered message element. */
var nextId = 0;
/** Global map of all registered message elements that have been placed into the document. */
var messageRegistry = new Map();
/** Container for all registered messages. */
var messagesContainer = null;
/**
 * Utility that creates visually hidden elements with a message content. Useful for elements that
 * want to use aria-describedby to further describe themselves without adding additional visual
 * content.
 * @docs-private
 */
var AriaDescriber = /** @class */ (function () {
    function AriaDescriber(_document) {
        this._document = _document;
    }
    /**
     * Adds to the host element an aria-describedby reference to a hidden element that contains
     * the message. If the same message has already been registered, then it will reuse the created
     * message element.
     */
    /**
       * Adds to the host element an aria-describedby reference to a hidden element that contains
       * the message. If the same message has already been registered, then it will reuse the created
       * message element.
       */
    AriaDescriber.prototype.describe = /**
       * Adds to the host element an aria-describedby reference to a hidden element that contains
       * the message. If the same message has already been registered, then it will reuse the created
       * message element.
       */
    function (hostElement, message) {
        if (!this._canBeDescribed(hostElement, message)) {
            return;
        }
        if (!messageRegistry.has(message)) {
            this._createMessageElement(message);
        }
        if (!this._isElementDescribedByMessage(hostElement, message)) {
            this._addMessageReference(hostElement, message);
        }
    };
    /** Removes the host element's aria-describedby reference to the message element. */
    /** Removes the host element's aria-describedby reference to the message element. */
    AriaDescriber.prototype.removeDescription = /** Removes the host element's aria-describedby reference to the message element. */
    function (hostElement, message) {
        if (!this._canBeDescribed(hostElement, message)) {
            return;
        }
        if (this._isElementDescribedByMessage(hostElement, message)) {
            this._removeMessageReference(hostElement, message);
        }
        var registeredMessage = messageRegistry.get(message);
        if (registeredMessage && registeredMessage.referenceCount === 0) {
            this._deleteMessageElement(message);
        }
        if (messagesContainer && messagesContainer.childNodes.length === 0) {
            this._deleteMessagesContainer();
        }
    };
    /** Unregisters all created message elements and removes the message container. */
    /** Unregisters all created message elements and removes the message container. */
    AriaDescriber.prototype.ngOnDestroy = /** Unregisters all created message elements and removes the message container. */
    function () {
        var describedElements = this._document.querySelectorAll("[" + exports.CDK_DESCRIBEDBY_HOST_ATTRIBUTE + "]");
        for (var i = 0; i < describedElements.length; i++) {
            this._removeCdkDescribedByReferenceIds(describedElements[i]);
            describedElements[i].removeAttribute(exports.CDK_DESCRIBEDBY_HOST_ATTRIBUTE);
        }
        if (messagesContainer) {
            this._deleteMessagesContainer();
        }
        messageRegistry.clear();
    };
    /**
     * Creates a new element in the visually hidden message container element with the message
     * as its content and adds it to the message registry.
     */
    /**
       * Creates a new element in the visually hidden message container element with the message
       * as its content and adds it to the message registry.
       */
    AriaDescriber.prototype._createMessageElement = /**
       * Creates a new element in the visually hidden message container element with the message
       * as its content and adds it to the message registry.
       */
    function (message) {
        var messageElement = this._document.createElement('div');
        messageElement.setAttribute('id', exports.CDK_DESCRIBEDBY_ID_PREFIX + "-" + nextId++);
        messageElement.appendChild((this._document.createTextNode(message)));
        this._createMessagesContainer();
        messagesContainer.appendChild(messageElement);
        messageRegistry.set(message, { messageElement: messageElement, referenceCount: 0 });
    };
    /** Deletes the message element from the global messages container. */
    /** Deletes the message element from the global messages container. */
    AriaDescriber.prototype._deleteMessageElement = /** Deletes the message element from the global messages container. */
    function (message) {
        var registeredMessage = messageRegistry.get(message);
        var messageElement = registeredMessage && registeredMessage.messageElement;
        if (messagesContainer && messageElement) {
            messagesContainer.removeChild(messageElement);
        }
        messageRegistry.delete(message);
    };
    /** Creates the global container for all aria-describedby messages. */
    /** Creates the global container for all aria-describedby messages. */
    AriaDescriber.prototype._createMessagesContainer = /** Creates the global container for all aria-describedby messages. */
    function () {
        if (!messagesContainer) {
            var preExistingContainer = this._document.getElementById(exports.MESSAGES_CONTAINER_ID);
            // When going from the server to the client, we may end up in a situation where there's
            // already a container on the page, but we don't have a reference to it. Clear the
            // old container so we don't get duplicates. Doing this, instead of emptying the previous
            // container, should be slightly faster.
            if (preExistingContainer) {
                preExistingContainer.parentNode.removeChild(preExistingContainer);
            }
            messagesContainer = this._document.createElement('div');
            messagesContainer.id = exports.MESSAGES_CONTAINER_ID;
            messagesContainer.setAttribute('aria-hidden', 'true');
            messagesContainer.style.display = 'none';
            this._document.body.appendChild(messagesContainer);
        }
    };
    /** Deletes the global messages container. */
    /** Deletes the global messages container. */
    AriaDescriber.prototype._deleteMessagesContainer = /** Deletes the global messages container. */
    function () {
        if (messagesContainer && messagesContainer.parentNode) {
            messagesContainer.parentNode.removeChild(messagesContainer);
            messagesContainer = null;
        }
    };
    /** Removes all cdk-describedby messages that are hosted through the element. */
    /** Removes all cdk-describedby messages that are hosted through the element. */
    AriaDescriber.prototype._removeCdkDescribedByReferenceIds = /** Removes all cdk-describedby messages that are hosted through the element. */
    function (element) {
        // Remove all aria-describedby reference IDs that are prefixed by CDK_DESCRIBEDBY_ID_PREFIX
        var originalReferenceIds = aria_reference_1.getAriaReferenceIds(element, 'aria-describedby')
            .filter(function (id) { return id.indexOf(exports.CDK_DESCRIBEDBY_ID_PREFIX) != 0; });
        element.setAttribute('aria-describedby', originalReferenceIds.join(' '));
    };
    /**
     * Adds a message reference to the element using aria-describedby and increments the registered
     * message's reference count.
     */
    /**
       * Adds a message reference to the element using aria-describedby and increments the registered
       * message's reference count.
       */
    AriaDescriber.prototype._addMessageReference = /**
       * Adds a message reference to the element using aria-describedby and increments the registered
       * message's reference count.
       */
    function (element, message) {
        var registeredMessage = (messageRegistry.get(message));
        // Add the aria-describedby reference and set the
        // describedby_host attribute to mark the element.
        // Add the aria-describedby reference and set the
        // describedby_host attribute to mark the element.
        aria_reference_1.addAriaReferencedId(element, 'aria-describedby', registeredMessage.messageElement.id);
        element.setAttribute(exports.CDK_DESCRIBEDBY_HOST_ATTRIBUTE, '');
        registeredMessage.referenceCount++;
    };
    /**
     * Removes a message reference from the element using aria-describedby
     * and decrements the registered message's reference count.
     */
    /**
       * Removes a message reference from the element using aria-describedby
       * and decrements the registered message's reference count.
       */
    AriaDescriber.prototype._removeMessageReference = /**
       * Removes a message reference from the element using aria-describedby
       * and decrements the registered message's reference count.
       */
    function (element, message) {
        var registeredMessage = (messageRegistry.get(message));
        registeredMessage.referenceCount--;
        aria_reference_1.removeAriaReferencedId(element, 'aria-describedby', registeredMessage.messageElement.id);
        element.removeAttribute(exports.CDK_DESCRIBEDBY_HOST_ATTRIBUTE);
    };
    /** Returns true if the element has been described by the provided message ID. */
    /** Returns true if the element has been described by the provided message ID. */
    AriaDescriber.prototype._isElementDescribedByMessage = /** Returns true if the element has been described by the provided message ID. */
    function (element, message) {
        var referenceIds = aria_reference_1.getAriaReferenceIds(element, 'aria-describedby');
        var registeredMessage = messageRegistry.get(message);
        var messageId = registeredMessage && registeredMessage.messageElement.id;
        return !!messageId && referenceIds.indexOf(messageId) != -1;
    };
    /** Determines whether a message can be described on a particular element. */
    /** Determines whether a message can be described on a particular element. */
    AriaDescriber.prototype._canBeDescribed = /** Determines whether a message can be described on a particular element. */
    function (element, message) {
        return element.nodeType === this._document.ELEMENT_NODE && message != null &&
            !!("" + message).trim();
    };
    AriaDescriber.decorators = [
        { type: core_1.Injectable, args: [{ providedIn: 'root' },] },
    ];
    /** @nocollapse */
    AriaDescriber.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: core_1.Inject, args: [common_1.DOCUMENT,] },] },
    ]; };
    AriaDescriber.ngInjectableDef = i0.defineInjectable({ factory: function AriaDescriber_Factory() { return new AriaDescriber(i0.inject(i1.DOCUMENT)); }, token: AriaDescriber, providedIn: "root" });
    return AriaDescriber;
}());
exports.AriaDescriber = AriaDescriber;
/** @docs-private @deprecated @breaking-change 7.0.0 */
function ARIA_DESCRIBER_PROVIDER_FACTORY(parentDispatcher, _document) {
    return parentDispatcher || new AriaDescriber(_document);
}
exports.ARIA_DESCRIBER_PROVIDER_FACTORY = ARIA_DESCRIBER_PROVIDER_FACTORY;
/** @docs-private @deprecated @breaking-change 7.0.0 */
exports.ARIA_DESCRIBER_PROVIDER = {
    // If there is already an AriaDescriber available, use that. Otherwise, provide a new one.
    provide: AriaDescriber,
    deps: [
        [new core_1.Optional(), new core_1.SkipSelf(), AriaDescriber],
        common_1.DOCUMENT
    ],
    useFactory: ARIA_DESCRIBER_PROVIDER_FACTORY
};
//# sourceMappingURL=aria-describer.js.map