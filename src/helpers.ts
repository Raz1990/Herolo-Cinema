import {toast} from "react-toastify";
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
    else if (type === 'fourDigits' && content.length !== 4) {
      return 'a year should contain 4 digits';
    }
    else if (type === 'exists') {
      return 'A movie with this title already exists';
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

  public static showToast(content: string, type: string) {
    const time = 1500;
    if (type === 'good') {
      toast.success(content, {
        autoClose: time,
        hideProgressBar: true,
        pauseOnHover: false,
        position: toast.POSITION.TOP_RIGHT,
      });
    }
    else if (type === 'bad') {
      toast.error(content, {
        autoClose: time,
        hideProgressBar: true,
        pauseOnHover: false,
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }
}

export default Helpers;