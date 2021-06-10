import { createMemoryHistory, History } from 'history';
import { createStore, Reducer } from 'redux';
import createRootReducer from './reducer';

// mock out calls to UUID library coming from cart.reducer.ts initialState
jest.mock('uuid', () => ({
  v1: () => 'mock-uuid-string-for-testing'
}));

describe('Redux Store', () => {
  let memoryHistory: History;
  let reducer: Reducer;

  beforeAll(() => {
    // use memory history, as this test is not running in a real browser
    memoryHistory = createMemoryHistory({ keyLength: 0 });
  });

  beforeEach(() => {
    reducer = createRootReducer(memoryHistory);
  });

  it('should be able to create the store', () => {
    expect(createStore(reducer)).toBeDefined();
  });

  it('should ensure there has not been any schema changes to the redux store', () => {
    const store = createStore(reducer);
    // ensure that the redux state schema has not changed
    // by comparing the initial state produced against our snapshot
    expect(store.getState()).toMatchSnapshot();
  });
});
