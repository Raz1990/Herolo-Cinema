import IMovie from './IMovie';

export interface IAppState {
    lastIndex: number,
    moviesList: IMovie[],
}