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
  let [, setInternalState] = React.useState('init');
  let { result, basket, challenge } = useMoveState();
  let { setChallenge, ...rest } = useMoveDispatch();

  React.useEffect(() => {
    let [sample] = dictionary;

    setInternalState('loading');

    if (!challenge?.length) {
      setChallenge(shuffler(sample));
      setInternalState('ready');
    }
  }, [dictionary, shuffler, result, setChallenge, challenge]);

  return (
    <>
      <ResultDisplay value={result} />
      <BasketDisplay value={basket} />
      <For of={actions}>
        <Action />
      </For>
      <For of={moves.map((move) => ({ ...move, onClick: rest[move.name] }))}>
        <Move />
      </For>
    </>
  );
}

function ResultDisplay({ value }) {
  return <p>{value}</p>;
}

function BasketDisplay({ value }) {
  return <p>{value}</p>;
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
      key: props.key ?? idx,
      ...props
    })
  );

  return React.createElement(React.Fragment, null, elements);
}
