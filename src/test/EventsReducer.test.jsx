import { eventsReducer, initialState } from "../components/reducer/useReducer";

describe('eventsReducer', () => {
  it('should return the initial state for unknown action', () => {
    const newState = eventsReducer(initialState, { type: 'unknown' });
    expect(newState).toEqual(initialState);
  });

  it('should load events', () => {
    const mockEvents = [{ id: 1, title: 'Test Event' }];
    const newState = eventsReducer(initialState, { type: 'load', payload: mockEvents });
    expect(newState).toEqual(mockEvents);
  });

  it('should add an event', () => {
    const eventToAdd = { id: 2, title: 'New Event' };
    const newState = eventsReducer(initialState, { type: 'add', payload: eventToAdd });
    expect(newState).toContainEqual(eventToAdd);
  });

  it('should update an event', () => {
    const initial = [{ id: 1, title: 'Old Title' }];
    const updatedEvent = { id: 1, title: 'Updated Title' };
    const newState = eventsReducer(initial, { type: 'update', payload: updatedEvent });
    expect(newState).toContainEqual(updatedEvent);
  });

  it('should delete an event', () => {
    const initial = [{ id: 1, title: 'Event 1' }, { id: 2, title: 'Event 2' }];
    const newState = eventsReducer(initial, { type: 'delete', payload: 1 });
    expect(newState).toEqual([{ id: 2, title: 'Event 2' }]);
  });
});
