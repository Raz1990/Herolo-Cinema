import IMovie from '../Interfaces/IMovie';

class Movie implements IMovie {
  constructor(private id: number, private title:string, private year: number, private runTime:number, private genres:string[], private director: string ) {}

  public getId() {
    return this.id;
  }
  public getTitle() {
    return this.title;
  }
  public getYear() {
    return this.year;
  }
  public getRunTime() {
    return this.runTime;
  }
  public getGenres() {
    return this.genres;
  }
  public getDirector() {
    return this.director;
  }

  public setTitle(title:string) {
    this.title = title;
  }
  public setYear(year: number) {
    this.year = year;
  }
  public setRunTime(runTime: number) {
    this.runTime = runTime;
  }
  public setGenre(genres: string[]) {
    this.genres = genres;
  }
  public addGenre(genre: string) {
    this.genres.concat(genre);
  }
  public setDirector(director: string) {
    this.director = director;
  }
}

export default Movie;