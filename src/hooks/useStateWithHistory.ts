import React from 'react';
import { type } from 'ramda';

type TState = [state: any, setState: (...props: any[]) => void];

const useStateWithHistory = <State>(initialState?: any): TState => {
  const [state, setUseState] = React.useState<State>(initialState);

  const setState = (newState: any) => {
    if (type(newState) === 'Array')
      return setUseState(
        (prev: State) => [...[prev], ...newState] as unknown as State,
      );

    if (type(newState) === 'Object')
      return setUseState((prev: { [key: string]: any }) => ({
        ...prev,
        ...newState,
      }));

    return setUseState(newState);
  };

  return [state, setState];
};

export { useStateWithHistory };
