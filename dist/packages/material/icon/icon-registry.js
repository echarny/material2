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
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var i0 = require("@angular/core");
var i1 = require("@angular/common/http");
var i2 = require("@angular/platform-browser");
var i3 = require("@angular/common");
/**
 * Returns an exception to be thrown in the case when attempting to
 * load an icon with a name that cannot be found.
 * @docs-private
 */
function getMatIconNameNotFoundError(iconName) {
    return Error("Unable to find icon with the name \"" + iconName + "\"");
}
exports.getMatIconNameNotFoundError = getMatIconNameNotFoundError;
/**
 * Returns an exception to be thrown when the consumer attempts to use
 * `<mat-icon>` without including @angular/http.
 * @docs-private
 */
function getMatIconNoHttpProviderError() {
    return Error('Could not find HttpClient provider for use with Angular Material icons. ' +
        'Please include the HttpClientModule from @angular/common/http in your ' +
        'app imports.');
}
exports.getMatIconNoHttpProviderError = getMatIconNoHttpProviderError;
/**
 * Returns an exception to be thrown when a URL couldn't be sanitized.
 * @param url URL that was attempted to be sanitized.
 * @docs-private
 */
function getMatIconFailedToSanitizeUrlError(url) {
    return Error("The URL provided to MatIconRegistry was not trusted as a resource URL " +
        ("via Angular's DomSanitizer. Attempted URL was \"" + url + "\"."));
}
exports.getMatIconFailedToSanitizeUrlError = getMatIconFailedToSanitizeUrlError;
/**
 * Returns an exception to be thrown when a HTML string couldn't be sanitized.
 * @param literal HTML that was attempted to be sanitized.
 * @docs-private
 */
function getMatIconFailedToSanitizeLiteralError(literal) {
    return Error("The literal provided to MatIconRegistry was not trusted as safe HTML by " +
        ("Angular's DomSanitizer. Attempted literal was \"" + literal + "\"."));
}
exports.getMatIconFailedToSanitizeLiteralError = getMatIconFailedToSanitizeLiteralError;
/**
 * Configuration for an icon, including the URL and possibly the cached SVG element.
 * @docs-private
 */
var /**
 * Configuration for an icon, including the URL and possibly the cached SVG element.
 * @docs-private
 */
SvgIconConfig = /** @class */ (function () {
    function SvgIconConfig(data) {
        // Note that we can't use `instanceof SVGElement` here,
        // because it'll break during server-side rendering.
        if (!!data.nodeName) {
            this.svgElement = data;
        }
        else {
            this.url = data;
        }
    }
    return SvgIconConfig;
}());
/**
 * Service to register and display icons used by the `<mat-icon>` component.
 * - Registers icon URLs by namespace and name.
 * - Registers icon set URLs by namespace.
 * - Registers aliases for CSS classes, for use with icon fonts.
 * - Loads icons from URLs and extracts individual icons from icon sets.
 */
var MatIconRegistry = /** @class */ (function () {
    function MatIconRegistry(_httpClient, _sanitizer, document) {
        this._httpClient = _httpClient;
        this._sanitizer = _sanitizer;
        /**
           * URLs and cached SVG elements for individual icons. Keys are of the format "[namespace]:[icon]".
           */
        this._svgIconConfigs = new Map();
        /**
           * SvgIconConfig objects and cached SVG elements for icon sets, keyed by namespace.
           * Multiple icon sets can be registered under the same namespace.
           */
        this._iconSetConfigs = new Map();
        /** Cache for icons loaded by direct URLs. */
        this._cachedIconsByUrl = new Map();
        /** In-progress icon fetches. Used to coalesce multiple requests to the same URL. */
        this._inProgressUrlFetches = new Map();
        /** Map from font identifiers to their CSS class names. Used for icon fonts. */
        this._fontCssClassesByAlias = new Map();
        /**
           * The CSS class to apply when an `<mat-icon>` component has no icon name, url, or font specified.
           * The default 'material-icons' value assumes that the material icon font has been loaded as
           * described at http://google.github.io/material-design-icons/#icon-font-for-the-web
           */
        this._defaultFontSetClass = 'material-icons';
        this._document = document;
    }
    /**
     * Registers an icon by URL in the default namespace.
     * @param iconName Name under which the icon should be registered.
     * @param url
     */
    /**
       * Registers an icon by URL in the default namespace.
       * @param iconName Name under which the icon should be registered.
       * @param url
       */
    MatIconRegistry.prototype.addSvgIcon = /**
       * Registers an icon by URL in the default namespace.
       * @param iconName Name under which the icon should be registered.
       * @param url
       */
    function (iconName, url) {
        return this.addSvgIconInNamespace('', iconName, url);
    };
    /**
     * Registers an icon using an HTML string in the default namespace.
     * @param iconName Name under which the icon should be registered.
     * @param literal SVG source of the icon.
     */
    /**
       * Registers an icon using an HTML string in the default namespace.
       * @param iconName Name under which the icon should be registered.
       * @param literal SVG source of the icon.
       */
    MatIconRegistry.prototype.addSvgIconLiteral = /**
       * Registers an icon using an HTML string in the default namespace.
       * @param iconName Name under which the icon should be registered.
       * @param literal SVG source of the icon.
       */
    function (iconName, literal) {
        return this.addSvgIconLiteralInNamespace('', iconName, literal);
    };
    /**
     * Registers an icon by URL in the specified namespace.
     * @param namespace Namespace in which the icon should be registered.
     * @param iconName Name under which the icon should be registered.
     * @param url
     */
    /**
       * Registers an icon by URL in the specified namespace.
       * @param namespace Namespace in which the icon should be registered.
       * @param iconName Name under which the icon should be registered.
       * @param url
       */
    MatIconRegistry.prototype.addSvgIconInNamespace = /**
       * Registers an icon by URL in the specified namespace.
       * @param namespace Namespace in which the icon should be registered.
       * @param iconName Name under which the icon should be registered.
       * @param url
       */
    function (namespace, iconName, url) {
        return this._addSvgIconConfig(namespace, iconName, new SvgIconConfig(url));
    };
    /**
     * Registers an icon using an HTML string in the specified namespace.
     * @param namespace Namespace in which the icon should be registered.
     * @param iconName Name under which the icon should be registered.
     * @param literal SVG source of the icon.
     */
    /**
       * Registers an icon using an HTML string in the specified namespace.
       * @param namespace Namespace in which the icon should be registered.
       * @param iconName Name under which the icon should be registered.
       * @param literal SVG source of the icon.
       */
    MatIconRegistry.prototype.addSvgIconLiteralInNamespace = /**
       * Registers an icon using an HTML string in the specified namespace.
       * @param namespace Namespace in which the icon should be registered.
       * @param iconName Name under which the icon should be registered.
       * @param literal SVG source of the icon.
       */
    function (namespace, iconName, literal) {
        var sanitizedLiteral = this._sanitizer.sanitize(core_1.SecurityContext.HTML, literal);
        if (!sanitizedLiteral) {
            throw getMatIconFailedToSanitizeLiteralError(literal);
        }
        var svgElement = this._createSvgElementForSingleIcon(sanitizedLiteral);
        return this._addSvgIconConfig(namespace, iconName, new SvgIconConfig(svgElement));
    };
    /**
     * Registers an icon set by URL in the default namespace.
     * @param url
     */
    /**
       * Registers an icon set by URL in the default namespace.
       * @param url
       */
    MatIconRegistry.prototype.addSvgIconSet = /**
       * Registers an icon set by URL in the default namespace.
       * @param url
       */
    function (url) {
        return this.addSvgIconSetInNamespace('', url);
    };
    /**
     * Registers an icon set using an HTML string in the default namespace.
     * @param literal SVG source of the icon set.
     */
    /**
       * Registers an icon set using an HTML string in the default namespace.
       * @param literal SVG source of the icon set.
       */
    MatIconRegistry.prototype.addSvgIconSetLiteral = /**
       * Registers an icon set using an HTML string in the default namespace.
       * @param literal SVG source of the icon set.
       */
    function (literal) {
        return this.addSvgIconSetLiteralInNamespace('', literal);
    };
    /**
     * Registers an icon set by URL in the specified namespace.
     * @param namespace Namespace in which to register the icon set.
     * @param url
     */
    /**
       * Registers an icon set by URL in the specified namespace.
       * @param namespace Namespace in which to register the icon set.
       * @param url
       */
    MatIconRegistry.prototype.addSvgIconSetInNamespace = /**
       * Registers an icon set by URL in the specified namespace.
       * @param namespace Namespace in which to register the icon set.
       * @param url
       */
    function (namespace, url) {
        return this._addSvgIconSetConfig(namespace, new SvgIconConfig(url));
    };
    /**
     * Registers an icon set using an HTML string in the specified namespace.
     * @param namespace Namespace in which to register the icon set.
     * @param literal SVG source of the icon set.
     */
    /**
       * Registers an icon set using an HTML string in the specified namespace.
       * @param namespace Namespace in which to register the icon set.
       * @param literal SVG source of the icon set.
       */
    MatIconRegistry.prototype.addSvgIconSetLiteralInNamespace = /**
       * Registers an icon set using an HTML string in the specified namespace.
       * @param namespace Namespace in which to register the icon set.
       * @param literal SVG source of the icon set.
       */
    function (namespace, literal) {
        var sanitizedLiteral = this._sanitizer.sanitize(core_1.SecurityContext.HTML, literal);
        if (!sanitizedLiteral) {
            throw getMatIconFailedToSanitizeLiteralError(literal);
        }
        var svgElement = this._svgElementFromString(sanitizedLiteral);
        return this._addSvgIconSetConfig(namespace, new SvgIconConfig(svgElement));
    };
    /**
     * Defines an alias for a CSS class name to be used for icon fonts. Creating an matIcon
     * component with the alias as the fontSet input will cause the class name to be applied
     * to the `<mat-icon>` element.
     *
     * @param alias Alias for the font.
     * @param className Class name override to be used instead of the alias.
     */
    /**
       * Defines an alias for a CSS class name to be used for icon fonts. Creating an matIcon
       * component with the alias as the fontSet input will cause the class name to be applied
       * to the `<mat-icon>` element.
       *
       * @param alias Alias for the font.
       * @param className Class name override to be used instead of the alias.
       */
    MatIconRegistry.prototype.registerFontClassAlias = /**
       * Defines an alias for a CSS class name to be used for icon fonts. Creating an matIcon
       * component with the alias as the fontSet input will cause the class name to be applied
       * to the `<mat-icon>` element.
       *
       * @param alias Alias for the font.
       * @param className Class name override to be used instead of the alias.
       */
    function (alias, className) {
        if (className === void 0) { className = alias; }
        this._fontCssClassesByAlias.set(alias, className);
        return this;
    };
    /**
     * Returns the CSS class name associated with the alias by a previous call to
     * registerFontClassAlias. If no CSS class has been associated, returns the alias unmodified.
     */
    /**
       * Returns the CSS class name associated with the alias by a previous call to
       * registerFontClassAlias. If no CSS class has been associated, returns the alias unmodified.
       */
    MatIconRegistry.prototype.classNameForFontAlias = /**
       * Returns the CSS class name associated with the alias by a previous call to
       * registerFontClassAlias. If no CSS class has been associated, returns the alias unmodified.
       */
    function (alias) {
        return this._fontCssClassesByAlias.get(alias) || alias;
    };
    /**
     * Sets the CSS class name to be used for icon fonts when an `<mat-icon>` component does not
     * have a fontSet input value, and is not loading an icon by name or URL.
     *
     * @param className
     */
    /**
       * Sets the CSS class name to be used for icon fonts when an `<mat-icon>` component does not
       * have a fontSet input value, and is not loading an icon by name or URL.
       *
       * @param className
       */
    MatIconRegistry.prototype.setDefaultFontSetClass = /**
       * Sets the CSS class name to be used for icon fonts when an `<mat-icon>` component does not
       * have a fontSet input value, and is not loading an icon by name or URL.
       *
       * @param className
       */
    function (className) {
        this._defaultFontSetClass = className;
        return this;
    };
    /**
     * Returns the CSS class name to be used for icon fonts when an `<mat-icon>` component does not
     * have a fontSet input value, and is not loading an icon by name or URL.
     */
    /**
       * Returns the CSS class name to be used for icon fonts when an `<mat-icon>` component does not
       * have a fontSet input value, and is not loading an icon by name or URL.
       */
    MatIconRegistry.prototype.getDefaultFontSetClass = /**
       * Returns the CSS class name to be used for icon fonts when an `<mat-icon>` component does not
       * have a fontSet input value, and is not loading an icon by name or URL.
       */
    function () {
        return this._defaultFontSetClass;
    };
    /**
     * Returns an Observable that produces the icon (as an `<svg>` DOM element) from the given URL.
     * The response from the URL may be cached so this will not always cause an HTTP request, but
     * the produced element will always be a new copy of the originally fetched icon. (That is,
     * it will not contain any modifications made to elements previously returned).
     *
     * @param safeUrl URL from which to fetch the SVG icon.
     */
    /**
       * Returns an Observable that produces the icon (as an `<svg>` DOM element) from the given URL.
       * The response from the URL may be cached so this will not always cause an HTTP request, but
       * the produced element will always be a new copy of the originally fetched icon. (That is,
       * it will not contain any modifications made to elements previously returned).
       *
       * @param safeUrl URL from which to fetch the SVG icon.
       */
    MatIconRegistry.prototype.getSvgIconFromUrl = /**
       * Returns an Observable that produces the icon (as an `<svg>` DOM element) from the given URL.
       * The response from the URL may be cached so this will not always cause an HTTP request, but
       * the produced element will always be a new copy of the originally fetched icon. (That is,
       * it will not contain any modifications made to elements previously returned).
       *
       * @param safeUrl URL from which to fetch the SVG icon.
       */
    function (safeUrl) {
        var _this = this;
        var url = this._sanitizer.sanitize(core_1.SecurityContext.RESOURCE_URL, safeUrl);
        if (!url) {
            throw getMatIconFailedToSanitizeUrlError(safeUrl);
        }
        var cachedIcon = this._cachedIconsByUrl.get(url);
        if (cachedIcon) {
            return rxjs_1.of(cloneSvg(cachedIcon));
        }
        return this._loadSvgIconFromConfig(new SvgIconConfig(safeUrl)).pipe(operators_1.tap(function (svg) { return _this._cachedIconsByUrl.set((url), svg); }), operators_1.map(function (svg) { return cloneSvg(svg); }));
    };
    /**
     * Returns an Observable that produces the icon (as an `<svg>` DOM element) with the given name
     * and namespace. The icon must have been previously registered with addIcon or addIconSet;
     * if not, the Observable will throw an error.
     *
     * @param name Name of the icon to be retrieved.
     * @param namespace Namespace in which to look for the icon.
     */
    /**
       * Returns an Observable that produces the icon (as an `<svg>` DOM element) with the given name
       * and namespace. The icon must have been previously registered with addIcon or addIconSet;
       * if not, the Observable will throw an error.
       *
       * @param name Name of the icon to be retrieved.
       * @param namespace Namespace in which to look for the icon.
       */
    MatIconRegistry.prototype.getNamedSvgIcon = /**
       * Returns an Observable that produces the icon (as an `<svg>` DOM element) with the given name
       * and namespace. The icon must have been previously registered with addIcon or addIconSet;
       * if not, the Observable will throw an error.
       *
       * @param name Name of the icon to be retrieved.
       * @param namespace Namespace in which to look for the icon.
       */
    function (name, namespace) {
        if (namespace === void 0) { namespace = ''; }
        // Return (copy of) cached icon if possible.
        var key = iconKey(namespace, name);
        var config = this._svgIconConfigs.get(key);
        if (config) {
            return this._getSvgFromConfig(config);
        }
        // See if we have any icon sets registered for the namespace.
        var iconSetConfigs = this._iconSetConfigs.get(namespace);
        if (iconSetConfigs) {
            return this._getSvgFromIconSetConfigs(name, iconSetConfigs);
        }
        return rxjs_1.throwError(getMatIconNameNotFoundError(key));
    };
    /**
     * Returns the cached icon for a SvgIconConfig if available, or fetches it from its URL if not.
     */
    /**
       * Returns the cached icon for a SvgIconConfig if available, or fetches it from its URL if not.
       */
    MatIconRegistry.prototype._getSvgFromConfig = /**
       * Returns the cached icon for a SvgIconConfig if available, or fetches it from its URL if not.
       */
    function (config) {
        if (config.svgElement) {
            // We already have the SVG element for this icon, return a copy.
            return rxjs_1.of(cloneSvg(config.svgElement));
        }
        else {
            // Fetch the icon from the config's URL, cache it, and return a copy.
            return this._loadSvgIconFromConfig(config).pipe(operators_1.tap(function (svg) { return config.svgElement = svg; }), operators_1.map(function (svg) { return cloneSvg(svg); }));
        }
    };
    /**
     * Attempts to find an icon with the specified name in any of the SVG icon sets.
     * First searches the available cached icons for a nested element with a matching name, and
     * if found copies the element to a new `<svg>` element. If not found, fetches all icon sets
     * that have not been cached, and searches again after all fetches are completed.
     * The returned Observable produces the SVG element if possible, and throws
     * an error if no icon with the specified name can be found.
     */
    /**
       * Attempts to find an icon with the specified name in any of the SVG icon sets.
       * First searches the available cached icons for a nested element with a matching name, and
       * if found copies the element to a new `<svg>` element. If not found, fetches all icon sets
       * that have not been cached, and searches again after all fetches are completed.
       * The returned Observable produces the SVG element if possible, and throws
       * an error if no icon with the specified name can be found.
       */
    MatIconRegistry.prototype._getSvgFromIconSetConfigs = /**
       * Attempts to find an icon with the specified name in any of the SVG icon sets.
       * First searches the available cached icons for a nested element with a matching name, and
       * if found copies the element to a new `<svg>` element. If not found, fetches all icon sets
       * that have not been cached, and searches again after all fetches are completed.
       * The returned Observable produces the SVG element if possible, and throws
       * an error if no icon with the specified name can be found.
       */
    function (name, iconSetConfigs) {
        var _this = this;
        // For all the icon set SVG elements we've fetched, see if any contain an icon with the
        // requested name.
        var namedIcon = this._extractIconWithNameFromAnySet(name, iconSetConfigs);
        if (namedIcon) {
            // We could cache namedIcon in _svgIconConfigs, but since we have to make a copy every
            // time anyway, there's probably not much advantage compared to just always extracting
            // it from the icon set.
            return rxjs_1.of(namedIcon);
        }
        // Not found in any cached icon sets. If there are icon sets with URLs that we haven't
        // fetched, fetch them now and look for iconName in the results.
        var iconSetFetchRequests = iconSetConfigs
            .filter(function (iconSetConfig) { return !iconSetConfig.svgElement; })
            .map(function (iconSetConfig) {
            return _this._loadSvgIconSetFromConfig(iconSetConfig).pipe(operators_1.catchError(function (err) {
                var url = _this._sanitizer.sanitize(core_1.SecurityContext.RESOURCE_URL, iconSetConfig.url);
                // Swallow errors fetching individual URLs so the
                // combined Observable won't necessarily fail.
                console.error("Loading icon set URL: " + url + " failed: " + err.message);
                return rxjs_1.of(null);
            }));
        });
        // Fetch all the icon set URLs. When the requests complete, every IconSet should have a
        // cached SVG element (unless the request failed), and we can check again for the icon.
        return rxjs_1.forkJoin(iconSetFetchRequests).pipe(operators_1.map(function () {
            var foundIcon = _this._extractIconWithNameFromAnySet(name, iconSetConfigs);
            if (!foundIcon) {
                throw getMatIconNameNotFoundError(name);
            }
            return foundIcon;
        }));
    };
    /**
     * Searches the cached SVG elements for the given icon sets for a nested icon element whose "id"
     * tag matches the specified name. If found, copies the nested element to a new SVG element and
     * returns it. Returns null if no matching element is found.
     */
    /**
       * Searches the cached SVG elements for the given icon sets for a nested icon element whose "id"
       * tag matches the specified name. If found, copies the nested element to a new SVG element and
       * returns it. Returns null if no matching element is found.
       */
    MatIconRegistry.prototype._extractIconWithNameFromAnySet = /**
       * Searches the cached SVG elements for the given icon sets for a nested icon element whose "id"
       * tag matches the specified name. If found, copies the nested element to a new SVG element and
       * returns it. Returns null if no matching element is found.
       */
    function (iconName, iconSetConfigs) {
        // Iterate backwards, so icon sets added later have precedence.
        for (var i = iconSetConfigs.length - 1; i >= 0; i--) {
            var config = iconSetConfigs[i];
            if (config.svgElement) {
                var foundIcon = this._extractSvgIconFromSet(config.svgElement, iconName);
                if (foundIcon) {
                    return foundIcon;
                }
            }
        }
        return null;
    };
    /**
     * Loads the content of the icon URL specified in the SvgIconConfig and creates an SVG element
     * from it.
     */
    /**
       * Loads the content of the icon URL specified in the SvgIconConfig and creates an SVG element
       * from it.
       */
    MatIconRegistry.prototype._loadSvgIconFromConfig = /**
       * Loads the content of the icon URL specified in the SvgIconConfig and creates an SVG element
       * from it.
       */
    function (config) {
        var _this = this;
        return this._fetchUrl(config.url)
            .pipe(operators_1.map(function (svgText) { return _this._createSvgElementForSingleIcon(svgText); }));
    };
    /**
     * Loads the content of the icon set URL specified in the SvgIconConfig and creates an SVG element
     * from it.
     */
    /**
       * Loads the content of the icon set URL specified in the SvgIconConfig and creates an SVG element
       * from it.
       */
    MatIconRegistry.prototype._loadSvgIconSetFromConfig = /**
       * Loads the content of the icon set URL specified in the SvgIconConfig and creates an SVG element
       * from it.
       */
    function (config) {
        var _this = this;
        // If the SVG for this icon set has already been parsed, do nothing.
        if (config.svgElement) {
            return rxjs_1.of(config.svgElement);
        }
        return this._fetchUrl(config.url).pipe(operators_1.map(function (svgText) {
            // It is possible that the icon set was parsed and cached by an earlier request, so parsing
            // only needs to occur if the cache is yet unset.
            if (!config.svgElement) {
                config.svgElement = _this._svgElementFromString(svgText);
            }
            return config.svgElement;
        }));
    };
    /**
     * Creates a DOM element from the given SVG string, and adds default attributes.
     */
    /**
       * Creates a DOM element from the given SVG string, and adds default attributes.
       */
    MatIconRegistry.prototype._createSvgElementForSingleIcon = /**
       * Creates a DOM element from the given SVG string, and adds default attributes.
       */
    function (responseText) {
        var svg = this._svgElementFromString(responseText);
        this._setSvgAttributes(svg);
        return svg;
    };
    /**
     * Searches the cached element of the given SvgIconConfig for a nested icon element whose "id"
     * tag matches the specified name. If found, copies the nested element to a new SVG element and
     * returns it. Returns null if no matching element is found.
     */
    /**
       * Searches the cached element of the given SvgIconConfig for a nested icon element whose "id"
       * tag matches the specified name. If found, copies the nested element to a new SVG element and
       * returns it. Returns null if no matching element is found.
       */
    MatIconRegistry.prototype._extractSvgIconFromSet = /**
       * Searches the cached element of the given SvgIconConfig for a nested icon element whose "id"
       * tag matches the specified name. If found, copies the nested element to a new SVG element and
       * returns it. Returns null if no matching element is found.
       */
    function (iconSet, iconName) {
        var iconSource = iconSet.querySelector('#' + iconName);
        if (!iconSource) {
            return null;
        }
        // Clone the element and remove the ID to prevent multiple elements from being added
        // to the page with the same ID.
        var iconElement = iconSource.cloneNode(true);
        iconElement.removeAttribute('id');
        // If the icon node is itself an <svg> node, clone and return it directly. If not, set it as
        // the content of a new <svg> node.
        if (iconElement.nodeName.toLowerCase() === 'svg') {
            return this._setSvgAttributes(iconElement);
        }
        // If the node is a <symbol>, it won't be rendered so we have to convert it into <svg>. Note
        // that the same could be achieved by referring to it via <use href="#id">, however the <use>
        // tag is problematic on Firefox, because it needs to include the current page path.
        if (iconElement.nodeName.toLowerCase() === 'symbol') {
            return this._setSvgAttributes(this._toSvgElement(iconElement));
        }
        // createElement('SVG') doesn't work as expected; the DOM ends up with
        // the correct nodes, but the SVG content doesn't render. Instead we
        // have to create an empty SVG node using innerHTML and append its content.
        // Elements created using DOMParser.parseFromString have the same problem.
        // http://stackoverflow.com/questions/23003278/svg-innerhtml-in-firefox-can-not-display
        var svg = this._svgElementFromString('<svg></svg>');
        // Clone the node so we don't remove it from the parent icon set element.
        svg.appendChild(iconElement);
        return this._setSvgAttributes(svg);
    };
    /**
     * Creates a DOM element from the given SVG string.
     */
    /**
       * Creates a DOM element from the given SVG string.
       */
    MatIconRegistry.prototype._svgElementFromString = /**
       * Creates a DOM element from the given SVG string.
       */
    function (str) {
        var div = this._document.createElement('DIV');
        div.innerHTML = str;
        var svg = div.querySelector('svg');
        if (!svg) {
            throw Error('<svg> tag not found');
        }
        return svg;
    };
    /**
     * Converts an element into an SVG node by cloning all of its children.
     */
    /**
       * Converts an element into an SVG node by cloning all of its children.
       */
    MatIconRegistry.prototype._toSvgElement = /**
       * Converts an element into an SVG node by cloning all of its children.
       */
    function (element) {
        var svg = this._svgElementFromString('<svg></svg>');
        for (var i = 0; i < element.childNodes.length; i++) {
            if (element.childNodes[i].nodeType === this._document.ELEMENT_NODE) {
                svg.appendChild(element.childNodes[i].cloneNode(true));
            }
        }
        return svg;
    };
    /**
     * Sets the default attributes for an SVG element to be used as an icon.
     */
    /**
       * Sets the default attributes for an SVG element to be used as an icon.
       */
    MatIconRegistry.prototype._setSvgAttributes = /**
       * Sets the default attributes for an SVG element to be used as an icon.
       */
    function (svg) {
        svg.setAttribute('fit', '');
        svg.setAttribute('height', '100%');
        svg.setAttribute('width', '100%');
        svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
        svg.setAttribute('focusable', 'false'); // Disable IE11 default behavior to make SVGs focusable.
        return svg;
    };
    /**
     * Returns an Observable which produces the string contents of the given URL. Results may be
     * cached, so future calls with the same URL may not cause another HTTP request.
     */
    /**
       * Returns an Observable which produces the string contents of the given URL. Results may be
       * cached, so future calls with the same URL may not cause another HTTP request.
       */
    MatIconRegistry.prototype._fetchUrl = /**
       * Returns an Observable which produces the string contents of the given URL. Results may be
       * cached, so future calls with the same URL may not cause another HTTP request.
       */
    function (safeUrl) {
        var _this = this;
        if (!this._httpClient) {
            throw getMatIconNoHttpProviderError();
        }
        if (safeUrl == null) {
            throw Error("Cannot fetch icon from URL \"" + safeUrl + "\".");
        }
        var url = this._sanitizer.sanitize(core_1.SecurityContext.RESOURCE_URL, safeUrl);
        if (!url) {
            throw getMatIconFailedToSanitizeUrlError(safeUrl);
        }
        // Store in-progress fetches to avoid sending a duplicate request for a URL when there is
        // already a request in progress for that URL. It's necessary to call share() on the
        // Observable returned by http.get() so that multiple subscribers don't cause multiple XHRs.
        var inProgressFetch = this._inProgressUrlFetches.get(url);
        if (inProgressFetch) {
            return inProgressFetch;
        }
        // TODO(jelbourn): for some reason, the `finalize` operator "loses" the generic type on the
        // Observable. Figure out why and fix it.
        var req = this._httpClient.get(url, { responseType: 'text' }).pipe(operators_1.finalize(function () { return _this._inProgressUrlFetches.delete(url); }), operators_1.share());
        this._inProgressUrlFetches.set(url, req);
        return req;
    };
    /**
     * Registers an icon config by name in the specified namespace.
     * @param namespace Namespace in which to register the icon config.
     * @param iconName Name under which to register the config.
     * @param config Config to be registered.
     */
    /**
       * Registers an icon config by name in the specified namespace.
       * @param namespace Namespace in which to register the icon config.
       * @param iconName Name under which to register the config.
       * @param config Config to be registered.
       */
    MatIconRegistry.prototype._addSvgIconConfig = /**
       * Registers an icon config by name in the specified namespace.
       * @param namespace Namespace in which to register the icon config.
       * @param iconName Name under which to register the config.
       * @param config Config to be registered.
       */
    function (namespace, iconName, config) {
        this._svgIconConfigs.set(iconKey(namespace, iconName), config);
        return this;
    };
    /**
     * Registers an icon set config in the specified namespace.
     * @param namespace Namespace in which to register the icon config.
     * @param config Config to be registered.
     */
    /**
       * Registers an icon set config in the specified namespace.
       * @param namespace Namespace in which to register the icon config.
       * @param config Config to be registered.
       */
    MatIconRegistry.prototype._addSvgIconSetConfig = /**
       * Registers an icon set config in the specified namespace.
       * @param namespace Namespace in which to register the icon config.
       * @param config Config to be registered.
       */
    function (namespace, config) {
        var configNamespace = this._iconSetConfigs.get(namespace);
        if (configNamespace) {
            configNamespace.push(config);
        }
        else {
            this._iconSetConfigs.set(namespace, [config]);
        }
        return this;
    };
    MatIconRegistry.decorators = [
        { type: core_1.Injectable, args: [{ providedIn: 'root' },] },
    ];
    /** @nocollapse */
    MatIconRegistry.ctorParameters = function () { return [
        { type: http_1.HttpClient, decorators: [{ type: core_1.Optional },] },
        { type: platform_browser_1.DomSanitizer, },
        { type: undefined, decorators: [{ type: core_1.Optional }, { type: core_1.Inject, args: [common_1.DOCUMENT,] },] },
    ]; };
    MatIconRegistry.ngInjectableDef = i0.defineInjectable({ factory: function MatIconRegistry_Factory() { return new MatIconRegistry(i0.inject(i1.HttpClient, 8), i0.inject(i2.DomSanitizer), i0.inject(i3.DOCUMENT, 8)); }, token: MatIconRegistry, providedIn: "root" });
    return MatIconRegistry;
}());
exports.MatIconRegistry = MatIconRegistry;
/** @docs-private */
function ICON_REGISTRY_PROVIDER_FACTORY(parentRegistry, httpClient, sanitizer, document) {
    return parentRegistry || new MatIconRegistry(httpClient, sanitizer, document);
}
exports.ICON_REGISTRY_PROVIDER_FACTORY = ICON_REGISTRY_PROVIDER_FACTORY;
/** @docs-private */
exports.ICON_REGISTRY_PROVIDER = {
    // If there is already an MatIconRegistry available, use that. Otherwise, provide a new one.
    provide: MatIconRegistry,
    deps: [
        [new core_1.Optional(), new core_1.SkipSelf(), MatIconRegistry],
        [new core_1.Optional(), http_1.HttpClient],
        platform_browser_1.DomSanitizer,
        [new core_1.Optional(), common_1.DOCUMENT],
    ],
    useFactory: ICON_REGISTRY_PROVIDER_FACTORY,
};
/** Clones an SVGElement while preserving type information. */
function cloneSvg(svg) {
    return svg.cloneNode(true);
}
/** Returns the cache key to use for an icon namespace and name. */
function iconKey(namespace, name) {
    return namespace + ':' + name;
}
//# sourceMappingURL=icon-registry.js.map