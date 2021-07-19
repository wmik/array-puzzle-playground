import React from 'react';
import { moves, initialState } from './moves';

let MoveStateCtx = React.createContext(initialState);
let MoveDispatchCtx = React.createContext();

function reducer(state, action) {
  let move = moves.find((move) => move.name === action.type);

  if (typeof move?.handler === 'function') {
    return move.handler(state, action);
  }

  return state;
}

export function MoveProvider({ children }) {
  let [state, dispatch] = React.useReducer(reducer, initialState);

  let dispatchers = moves.reduce(
    (store, move) => ({
      ...store,
      [move.name]: (payload) => dispatch({ type: move.name, payload })
    }),
    {}
  );

  return (
    <MoveDispatchCtx.Provider value={dispatchers}>
      <MoveStateCtx.Provider value={state}>{children}</MoveStateCtx.Provider>
    </MoveDispatchCtx.Provider>
  );
}

export function useMoveState() {
  return React.useContext(MoveStateCtx);
}

export function useMoveDispatch() {
  return React.useContext(MoveDispatchCtx);
}
