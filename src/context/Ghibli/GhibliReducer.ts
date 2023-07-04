import { GhibliContextAction, GhibliContextState } from '../../@types/CommonTypes';


const GhibliReducer = (state: GhibliContextState, action: GhibliContextAction) => {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: true
      };
    case 'SET_FILMS':
      return {
        ...state,
        films: action.payload,
        isLoading: false
      };
    case 'CLEAR_FILMS':
      return {
        ...state,
        films: []
      };
    case 'GET_FILM':
      return {
        ...state,
        film: action.payload,
        isLoading: false
      };
    case 'SEARCH_FILMS':
      return {
        ...state,
        films: action.payload,
      }
  }
}

export default GhibliReducer
