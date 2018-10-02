export default interface IMovie {
  getId(): number,
  getTitle(): string,
  getYear(): string
  getRunTime(): number,
  getGenre(): string,
  getDirector(): string,
  setTitle(title: string): void,
  setYear(year: string): void,
  setRunTime(runTime: number): void,
  setGenre(genre: string): void,
  addGenre(genre: string): void,
  setDirector(director: string): void
}