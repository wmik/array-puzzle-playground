export const initialState = {
  result: [],
  basket: [],
  history: []
};

export const moves = [
  {
    id: 0,
    name: 'set',
    handler(state, action) {
      return {
        ...state,
        ...action.payload
      };
    }
  },
  {
    id: 1,
    name: 'pop',
    label: 'Pop ❌',
    description: '',
    handler(state) {
      if (state.result.length) {
        let result = state.result.slice();
        let basket = state.basket.slice();

        basket.push(result.pop());

        return {
          ...state,
          basket,
          result
        };
      }

      return state;
    }
  },
  {
    id: 2,
    name: 'push',
    label: 'Push ➕',
    description: '',
    handler(state) {
      if (state.basket.length) {
        let basket = state.basket.slice();
        let result = state.result.slice();

        result.push(basket.pop());

        return {
          ...state,
          result,
          basket
        };
      }

      return state;
    }
  },
  {
    id: 3,
    name: 'shift',
    label: '❌ Shift',
    description: '',
    handler(state) {
      if (state.result.length) {
        let result = state.result.slice().reverse();
        let basket = state.basket.slice();

        basket.push(result.pop());

        return {
          ...state,
          basket,
          result
        };
      }

      return state;
    }
  },
  {
    id: 4,
    name: 'unshift',
    label: '➕ Unshift',
    description: '',
    handler(state) {
      if (state.basket.length) {
        return {
          ...state,
          result: state.basket.concat(state.result),
          basket: []
        };
      }

      return state;
    }
  }
];
