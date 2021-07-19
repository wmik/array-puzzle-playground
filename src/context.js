import React from 'react';

let initialState = {
  result: [],
  basket: [],
  history: []
};
let MoveStateCtx = React.createContext(initialState);
let MoveDispatchCtx = React.createContext();

const POP = 'pop';
const PUSH = 'push';
const SHIFT = 'shift';
const UNSHIFT = 'unshift';
const SET_CHALLENGE = 'set challenge';

function reducer(state, action) {
  switch (action.type) {
    case POP: {
      if (state.result.length) {
        let result = state.result.slice();
        return {
          ...state,
          basket: state.basket.concat(result.pop()).filter(Boolean),
          result
        };
      }
      return state;
    }
    case PUSH: {
      if (state.basket.length) {
        let basket = state.basket.slice();
        return {
          ...state,
          result: state.result.concat(basket.pop()).filter(Boolean),
          basket
        };
      }

      return state;
    }
    case SHIFT: {
      if (state.result.length) {
        let result = state.result.slice().reverse();
        return {
          ...state,
          basket: state.basket.concat(result.pop()).filter(Boolean),
          result
        };
      }
      return state;
    }
    case UNSHIFT: {
      if (state.basket.length) {
        let basket = state.basket.slice();
        return {
          ...state,
          result: basket.concat(state.result),
          basket: []
        };
      }

      return state;
    }
    case SET_CHALLENGE: {
      return { ...state, ...action.payload };
    }
    default:
      return state;
  }
}

export function MoveProvider({ children }) {
  let [state, dispatch] = React.useReducer(reducer, initialState);

  function setChallenge(challenge) {
    dispatch({
      type: SET_CHALLENGE,
      payload: { challenge, result: challenge }
    });
  }

  function pop() {
    dispatch({ type: POP });
  }

  function push() {
    dispatch({ type: PUSH });
  }

  function shift() {
    dispatch({ type: SHIFT });
  }

  function unshift() {
    dispatch({ type: UNSHIFT });
  }

  return (
    <MoveDispatchCtx.Provider
      value={{ setChallenge, pop, push, shift, unshift }}
    >
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
