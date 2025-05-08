export const initialState = [];

export function eventsReducer(state, action) {
  switch (action.type) {
    case 'load':
      return action.payload;
    case 'add':
      return [...state, action.payload];
    case 'update':
      return state.map(event =>
        event.id === action.payload.id ? action.payload : event
      );
    case 'delete':
      return state.filter(event => event.id !== action.payload);
    default:
      return state;
  }
}
