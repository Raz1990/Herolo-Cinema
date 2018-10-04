import Movie from './Classes/Movie';
import IMovie from './Interfaces/IMovie';
import IMovieObj from './Interfaces/IMovieObj';

class Helpers {
  public static moviefy(movieJson: IMovieObj, id: number) {
    const movie: IMovie = new Movie(id, movieJson.Title, movieJson.Year, movieJson.Runtime, movieJson.Genre, movieJson.Director);
    return movie;
  }
  
  public static validate(content: any, type: string) {
    if (content.length === 0) {
      return 'cannot accept empty string';
    }
    if (type==='number' && content.match(/^[0-9]+$/) == null ) {
      return 'only numbers are allowed';
    }
    return '';
  }
}

export default Helpers;