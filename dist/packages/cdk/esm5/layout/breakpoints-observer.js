/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable, NgZone } from '@angular/core';
import { MediaMatcher } from './media-matcher';
import { combineLatest, fromEventPattern, Subject } from 'rxjs';
import { map, startWith, takeUntil } from 'rxjs/operators';
import { coerceArray } from '@angular/cdk/coercion';
import * as i0 from "@angular/core";
import * as i1 from "./media-matcher";
/**
 * The current state of a layout breakpoint.
 * @record
 */
export function BreakpointState() { }
function BreakpointState_tsickle_Closure_declarations() {
    /**
     * Whether the breakpoint is currently matching.
     * @type {?}
     */
    BreakpointState.prototype.matches;
    /**
     * A key boolean pair for each query provided to the observe method,
     * with its current matched state.
     * @type {?}
     */
    BreakpointState.prototype.breakpoints;
}
/**
 * The current state of a layout breakpoint.
 * @record
 */
function InternalBreakpointState() { }
function InternalBreakpointState_tsickle_Closure_declarations() {
    /**
     * Whether the breakpoint is currently matching.
     * @type {?}
     */
    InternalBreakpointState.prototype.matches;
    /**
     * The media query being to be matched
     * @type {?}
     */
    InternalBreakpointState.prototype.query;
}
/**
 * @record
 */
function Query() { }
function Query_tsickle_Closure_declarations() {
    /** @type {?} */
    Query.prototype.observable;
    /** @type {?} */
    Query.prototype.mql;
}
/**
 * Utility for checking the matching state of \@media queries.
 */
var BreakpointObserver = /** @class */ (function () {
    function BreakpointObserver(mediaMatcher, zone) {
        this.mediaMatcher = mediaMatcher;
        this.zone = zone;
        /**
         * A map of all media queries currently being listened for.
         */
        this._queries = new Map();
        /**
         * A subject for all other observables to takeUntil based on.
         */
        this._destroySubject = new Subject();
    }
    /** Completes the active subject, signalling to all other observables to complete. */
    /**
     * Completes the active subject, signalling to all other observables to complete.
     * @return {?}
     */
    BreakpointObserver.prototype.ngOnDestroy = /**
     * Completes the active subject, signalling to all other observables to complete.
     * @return {?}
     */
    function () {
        this._destroySubject.next();
        this._destroySubject.complete();
    };
    /**
     * Whether one or more media queries match the current viewport size.
     * @param value One or more media queries to check.
     * @returns Whether any of the media queries match.
     */
    /**
     * Whether one or more media queries match the current viewport size.
     * @param {?} value One or more media queries to check.
     * @return {?} Whether any of the media queries match.
     */
    BreakpointObserver.prototype.isMatched = /**
     * Whether one or more media queries match the current viewport size.
     * @param {?} value One or more media queries to check.
     * @return {?} Whether any of the media queries match.
     */
    function (value) {
        var _this = this;
        var /** @type {?} */ queries = splitQueries(coerceArray(value));
        return queries.some(function (mediaQuery) { return _this._registerQuery(mediaQuery).mql.matches; });
    };
    /**
     * Gets an observable of results for the given queries that will emit new results for any changes
     * in matching of the given queries.
     * @param value One or more media queries to check.
     * @returns A stream of matches for the given queries.
     */
    /**
     * Gets an observable of results for the given queries that will emit new results for any changes
     * in matching of the given queries.
     * @param {?} value One or more media queries to check.
     * @return {?} A stream of matches for the given queries.
     */
    BreakpointObserver.prototype.observe = /**
     * Gets an observable of results for the given queries that will emit new results for any changes
     * in matching of the given queries.
     * @param {?} value One or more media queries to check.
     * @return {?} A stream of matches for the given queries.
     */
    function (value) {
        var _this = this;
        var /** @type {?} */ queries = splitQueries(coerceArray(value));
        var /** @type {?} */ observables = queries.map(function (query) { return _this._registerQuery(query).observable; });
        return combineLatest(observables).pipe(map(function (breakpointStates) {
            var /** @type {?} */ response = {
                matches: false,
                breakpoints: {},
            };
            breakpointStates.forEach(function (state) {
                response.matches = response.matches || state.matches;
                response.breakpoints[state.query] = state.matches;
            });
            return response;
        }));
    };
    /**
     * Registers a specific query to be listened for.
     * @param {?} query
     * @return {?}
     */
    BreakpointObserver.prototype._registerQuery = /**
     * Registers a specific query to be listened for.
     * @param {?} query
     * @return {?}
     */
    function (query) {
        var _this = this;
        // Only set up a new MediaQueryList if it is not already being listened for.
        if (this._queries.has(query)) {
            return /** @type {?} */ ((this._queries.get(query)));
        }
        var /** @type {?} */ mql = this.mediaMatcher.matchMedia(query);
        // Create callback for match changes and add it is as a listener.
        var /** @type {?} */ queryObservable = fromEventPattern(
        // Listener callback methods are wrapped to be placed back in ngZone. Callbacks must be placed
        // back into the zone because matchMedia is only included in Zone.js by loading the
        // webapis-media-query.js file alongside the zone.js file.  Additionally, some browsers do not
        // have MediaQueryList inherit from EventTarget, which causes inconsistencies in how Zone.js
        // patches it.
        // Listener callback methods are wrapped to be placed back in ngZone. Callbacks must be placed
        // back into the zone because matchMedia is only included in Zone.js by loading the
        // webapis-media-query.js file alongside the zone.js file.  Additionally, some browsers do not
        // have MediaQueryList inherit from EventTarget, which causes inconsistencies in how Zone.js
        // patches it.
        function (listener) {
            mql.addListener(function (e) { return _this.zone.run(function () { return listener(e); }); });
        }, function (listener) {
            mql.removeListener(function (e) { return _this.zone.run(function () { return listener(e); }); });
        })
            .pipe(takeUntil(this._destroySubject), startWith(mql), map(function (nextMql) { return ({ query: query, matches: nextMql.matches }); }));
        // Add the MediaQueryList to the set of queries.
        var /** @type {?} */ output = { observable: queryObservable, mql: mql };
        this._queries.set(query, output);
        return output;
    };
    BreakpointObserver.decorators = [
        { type: Injectable, args: [{ providedIn: 'root' },] },
    ];
    /** @nocollapse */
    BreakpointObserver.ctorParameters = function () { return [
        { type: MediaMatcher, },
        { type: NgZone, },
    ]; };
    /** @nocollapse */ BreakpointObserver.ngInjectableDef = i0.defineInjectable({ factory: function BreakpointObserver_Factory() { return new BreakpointObserver(i0.inject(i1.MediaMatcher), i0.inject(i0.NgZone)); }, token: BreakpointObserver, providedIn: "root" });
    return BreakpointObserver;
}());
export { BreakpointObserver };
function BreakpointObserver_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    BreakpointObserver.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    BreakpointObserver.ctorParameters;
    /**
     * A map of all media queries currently being listened for.
     * @type {?}
     */
    BreakpointObserver.prototype._queries;
    /**
     * A subject for all other observables to takeUntil based on.
     * @type {?}
     */
    BreakpointObserver.prototype._destroySubject;
    /** @type {?} */
    BreakpointObserver.prototype.mediaMatcher;
    /** @type {?} */
    BreakpointObserver.prototype.zone;
}
/**
 * Split each query string into separate query strings if two queries are provided as comma
 * separated.
 * @param {?} queries
 * @return {?}
 */
function splitQueries(queries) {
    return queries.map(function (query) { return query.split(','); })
        .reduce(function (a1, a2) { return a1.concat(a2); })
        .map(function (query) { return query.trim(); });
}
//# sourceMappingURL=breakpoints-observer.js.map