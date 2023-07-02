import { createContext, useReducer, FC, Reducer } from 'react';
import GhibliReducer from './GhibliReducer';

type R = Reducer<any, any>;

const GhibliContext = createContext(null);

export const GhibliProvider: FC = ({ children }) => {
  const initialState = {
    films: [],
    film: {},
    isLoading: false,
  };

  const [state, dispatch] = useReducer<R>(GhibliReducer, initialState);

  return (
    <GhibliContext.Provider
      value={{
        ...state,
        dispatch,
      }}
    >
      {children}
    </GhibliContext.Provider>
  );
};
