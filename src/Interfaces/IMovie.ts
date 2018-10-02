export default interface IMovie {
  getId(): number,
  getTitle(): string,
  getYear(): number
  getRunTime(): number,
  getGenres(): string[],
  getDirector(): string,
  setTitle(title: string): void,
  setYear(year: number): void,
  setRunTime(runTime: number): void,
  setGenre(genres: string[]): void,
  addGenre(genre: string): void,
  setDirector(director: string): void
}