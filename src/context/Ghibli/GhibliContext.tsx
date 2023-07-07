import { createContext, useReducer, FC, Reducer } from 'react';
import GhibliReducer from './GhibliReducer';
import { ChildrenProps, GhibliContextState } from '../../@types/CommonTypes';

type R = Reducer<any, any>;

const initialState: GhibliContextState = {
  films: [],
  film: {
    title: '',
    originalTitle: '',
    originalTitleRomanised: '',
    description: '',
    director: '',
    producer: '',
    releaseDate: '',
    runningTime: '',
    image: '',
    people: [],
  },
  isLoading: false,
  dispatch: () => {
    // Placeholder function
  },
};

const GhibliContext = createContext(initialState);

export const GhibliProvider: FC<ChildrenProps> = ({ children }) => {
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
