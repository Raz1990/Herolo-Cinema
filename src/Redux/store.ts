import {Action, createStore, Dispatch, Unsubscribe} from "redux";
import {IAppState} from "./../Interfaces/IAppState";
import {rootReducer} from "./reducers";

const initialState: IAppState = {
  lastIndex: 0,
  movieTitles: {},
  moviesList: [],
};

interface IAppStore {
  dispatch: Dispatch<Action | any>;
  getState(): IAppState;
  subscribe(listener: () => void): Unsubscribe;
}

export const store: IAppStore = createStore(
  rootReducer,
  initialState,
);
