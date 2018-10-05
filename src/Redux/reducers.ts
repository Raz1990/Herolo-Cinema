import {AnyAction} from 'redux';
import IMovie from '../Interfaces/IMovie';
import {IAppState} from './../Interfaces/IAppState';

const handlers = {
  'ADD_A_MOVIE': addAMovie,
  'DELETE_A_MOVIE': deleteAMovie,
  'EDIT_A_MOVIE': editAMovie,
  'REFRESH': refresh,
  'SET_ALL_MOVIES': setAllMovies,
};

export function rootReducer(state: IAppState, action: AnyAction): IAppState {
  const handler = handlers[action.type];
  if(handler) {
    return handler(state, action.value);
  }
  return state;
}

function refresh(state: IAppState) {
  const wholeList = state.moviesList.map( (item, index) => {
    item.setShow(true);
    return item;  
  });
  return {
    ...state,
    shownMovies: wholeList,
  }
}

function setAllMovies(state: IAppState, movies: IMovie[]): IAppState {
  return {
    ...state,
    moviesList: movies,
  }
}

function addAMovie(state: IAppState, movie: IMovie): IAppState {
  return {
    ...state,
    lastIndex: state.lastIndex+1,
    moviesList: [...state.moviesList, movie]
  }
}

function editAMovie(state: IAppState, payload: any): IAppState {
  const updatedList = state.moviesList.map( (item, index) => {
    if(index !== payload.location) {
        return item;
    }
    return payload.movie;
  });

  return {
    ...state,
    moviesList: [...updatedList],
  }
}

function deleteAMovie(state: IAppState, movieId: number): IAppState {
  return {
    ...state,
    moviesList: [...state.moviesList.slice(0, movieId),
                ...state.moviesList.slice(movieId + 1)]
  }
}




