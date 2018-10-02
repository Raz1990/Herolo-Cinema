import IMovie from '../Interfaces/IMovie';

class Movie implements IMovie {
  constructor(private id: number, private title:string, private year: string, private runTime:number, private genre:string, private director: string ) {}

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
  public getGenre() {
    return this.genre;
  }
  public getDirector() {
    return this.director;
  }

  public setTitle(title:string) {
    this.title = title;
  }
  public setYear(year: string) {
    this.year = year;
  }
  public setRunTime(runTime: number) {
    this.runTime = runTime;
  }
  public setGenre(genre: string) {
    this.genre = genre;
  }
  public addGenre(genre: string) {
    this.genre += ', ' + genre;
  }
  public setDirector(director: string) {
    this.director = director;
  }
}

export default Movie;