"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var unique_selection_dispatcher_1 = require("./unique-selection-dispatcher");
describe('Unique selection dispatcher', function () {
    var dispatcher;
    beforeEach(function () { return dispatcher = new unique_selection_dispatcher_1.UniqueSelectionDispatcher(); });
    it('should notify registered listeners', function () {
        var spy = jasmine.createSpy('listen handler');
        dispatcher.listen(spy);
        dispatcher.notify('id', 'name');
        expect(spy).toHaveBeenCalledWith('id', 'name');
    });
    it('should not notify unregistered listeners', function () {
        var spy = jasmine.createSpy('listen handler');
        var unregister = dispatcher.listen(spy);
        unregister();
        dispatcher.notify('id', 'name');
        expect(spy).not.toHaveBeenCalled();
    });
    it('should remove all listeners when destroyed', function () {
        var spy = jasmine.createSpy('listen handler');
        dispatcher.listen(spy);
        dispatcher.ngOnDestroy();
        dispatcher.notify('id', 'name');
        expect(spy).not.toHaveBeenCalled();
    });
});
//# sourceMappingURL=unique-selection-dispatcher.spec.js.map