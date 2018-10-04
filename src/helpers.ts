import Movie from './Classes/Movie';
import IMovie from './Interfaces/IMovie';
import IMovieObj from './Interfaces/IMovieObj';

class Helpers {
  public static moviefy(movieJson: IMovieObj, id: number) {
    const movie: IMovie = new Movie(id, movieJson.Title, movieJson.Year, movieJson.Runtime, movieJson.Genre, movieJson.Director, movieJson.Plot, movieJson.Poster, movieJson.Website);
    return movie;
  }
  
  public static validate(content: any, type: string) {
    if (content.length === 0) {
      return 'cannot accept empty field';
    }
    else if (type === 'number' && content.match(/^[0-9]+$/) == null ) {
      return 'only numbers are allowed';
    }
    else if (type === 'fourLetters' && content.length !== 4) {
      console.log(content.length);
      return 'a year should contain 4 digits';
    }
    return '';
  }

  public static setUpKeysEvents(element: HTMLElement, keyPress: string, callBackFunc: () => void){
    element.addEventListener('keydown', (event: KeyboardEvent) => {
      if (event.key === keyPress) {
        callBackFunc();
      }
    });
  }

  public static removeKeysEvents(element: HTMLElement, funcs: any){
    for (const func of funcs) {
      element.removeEventListener('keydown', func);  
    }
  }
}

export default Helpers;