export default interface IMovie {
  getId(): number,
  getTitle(): string,
  getYear(): string
  getRunTime(): string,
  getGenre(): string,
  getPoster(): string,
  getPlot(): string,
  getWebsite(): string,
  getDirector(): string,
  setTitle(title: string): void,
  setYear(year: string): void,
  setRunTime(runTime: string): void,
  setGenre(genre: string): void,
  addGenre(genre: string): void,
  setDirector(director: string): void
}