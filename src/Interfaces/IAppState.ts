import IMovie from './IMovie';

export interface IAppState {
    lastIndex: number,
    movieTitles: {},
    moviesList: IMovie[],
}