import { createContext, useReducer, FC, Reducer } from 'react';
import GhibliReducer from './GhibliReducer';
import { GhibliContextState } from '../../@types/CommonTypes';

type R = Reducer<any, any>;

const initialState: GhibliContextState = {
  films: [],
  film: {
    title: '',
    originalTitle: '',
    titleRomanized: '',
    description: '',
    director: '',
    producer: '',
    releaseDate: '',
    runningTime: '',
    image: '',
    people: [],
  },
  isLoading: false,
};

const GhibliContext = createContext(initialState);

export const GhibliProvider: FC = ({ children }) => {
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

export default GhibliContext;
