import React from 'react';
import { moves } from './moves';
import { actions } from './actions';
import { dictionary } from './dictionary';
import { shuffler } from './shuffler';
import { MoveProvider, useMoveDispatch, useMoveState } from './context';

export default function App() {
  return (
    <>
      <h1>Array Puzzle</h1>
      <MoveProvider>
        <Game
          actions={actions}
          dictionary={dictionary}
          moves={moves}
          shuffler={shuffler}
        />
      </MoveProvider>
    </>
  );
}

function Game({ dictionary, shuffler, moves, actions }) {
  let [internalState, setInternalState] = React.useState('init');
  let { result, basket } = useMoveState();
  let { set, ...dispatcher } = useMoveDispatch();

  React.useEffect(() => {
    let [sample] = dictionary;

    if (internalState === 'init') {
      set({ result: shuffler(sample) });
      setInternalState('ready');
    }
  }, [dictionary, shuffler, set, internalState]);

  return (
    <>
      <For
        of={actions.map((action) => ({
          ...action,
          onClick: dispatcher[action.name]
        }))}
      >
        <Action />
      </For>
      <ResultDisplay value={result.join('')} />
      <BasketDisplay value={basket.join('')} />
      <For
        of={moves
          .filter((move) => move.label)
          .map((move) => ({ ...move, onClick: dispatcher[move.name] }))}
      >
        <Move />
      </For>
    </>
  );
}

function ResultDisplay({ value }) {
  return (
    <p>
      <input defaultValue={value} />
    </p>
  );
}

function BasketDisplay({ value }) {
  return (
    <p>
      <input defaultValue={value} />
    </p>
  );
}

function Action({ label }) {
  return <button type="button">{label}</button>;
}

function Move({ label, onClick }) {
  return (
    <button type="button" onClick={onClick}>
      {label}
    </button>
  );
}

function For({ of, children }) {
  let child = React.Children.only(children);
  let elements = of.map((props, idx) =>
    React.cloneElement(child, {
      key: props.id ?? idx,
      ...props
    })
  );

  return React.createElement(React.Fragment, null, elements);
}
