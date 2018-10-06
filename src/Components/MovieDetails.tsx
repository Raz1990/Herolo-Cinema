import * as React from 'react';
import '../CSS/cssButton.css';
import '../CSS/cssModal.css';
import Helpers from '../helpers';
import IMovie from '../Interfaces/IMovie';
import IMovieObj from '../Interfaces/IMovieObj';
import {store} from '../Redux/store';
import ServerAPI from '../ServerAPI';
import Button from './Button';
import Modal from "./Modal";

interface IMovieDetailsProps {
  action: string,
  newId?: number,
  index: number,
  submitCallback: (newMovie: IMovie) => void,
  cancelCallback: () => void,
  movieItem?: IMovie,
}

class MovieDetails extends React.Component<IMovieDetailsProps,any> {
  private runTimeWord = ' min';
  private modalArea: any;
  private yearInput: any;
  private movieObj: IMovieObj;
  private searchOnlineBTN: any;
  private defaultPoster: string;
  private noPoster: string

  constructor(props: IMovieDetailsProps){
    super(props);

    this.modalArea = React.createRef();
    this.yearInput = React.createRef();

    this.defaultPoster = 'https://m.media-amazon.com/images/M/MV5BMzljMjBhODItYTYyYi00NzMwLTkyZDQtNjQ4MWU0MzhmNDU4XkEyXkFqcGdeQXVyMTA0MjU0Ng@@._V1_SX300.jpg';
    this.noPoster = 'https://jessica-chastain.com/news/wp-content/uploads/2016/07/noposter.jpg';

    this.movieObj = {
      Director: '',
      Genre: '',
      Plot: '',
      Poster: '',
      Runtime: '',
      Title: '',
      Website: '',
      Year: '',
    }

    if (this.props.action === 'Add') {
      this.state = {
        Director: 'Sidney Lumet',
        Error: '',
        Genre: 'Biography, Crime, Drama',
        Id: this.props.newId,
        Plot: 'A man robs a bank to pay for his lover\'s operation; it turns into a hostage situation and a media circus.',
        Poster: this.defaultPoster,
        Runtime: '125 min',
        Title: 'Dog Day Afternoon',
        Website: 'https://www.imdb.com/title/tt0072890/',
        Year: '1975',
        canSubmit: true,
      };
    }
    else if (this.props.action === 'Edit') {
      this.state = {
        Director: this.props.movieItem!.getDirector(),
        Genre: this.props.movieItem!.getGenre(),
        Id: this.props.movieItem!.getId(),
        Plot: this.props.movieItem!.getPlot(),
        Poster: this.props.movieItem!.getPoster(),
        Runtime: this.props.movieItem!.getRunTime(),
        Title: this.props.movieItem!.getTitle(),
        Website: this.props.movieItem!.getWebsite(),
        Year: this.props.movieItem!.getYear(),
        canSubmit: true,
        error: '',
      };
    }
  }

  public componentWillMount() {
    this.searchOnlineBTN = (this.props.action === 'Add' ? 
                            <button className='btn accept' onClick={this.autoFillFields}> Auto-fill fields with information online </button> 
                            : null);
  }

  public componentDidMount() {
    Helpers.setUpKeysEvents(this.modalArea.current,'Enter',this.accept);
    Helpers.setUpKeysEvents(this.modalArea.current,'Escape',this.props.cancelCallback);
    if (this.props.action === 'Add') {
      this.autoFillFields();
    }
  }

  public componentWillUnmount() {
    Helpers.removeKeysEvents(this.modalArea.current, [this.accept,this.props.cancelCallback]);
  }

  public render(){
    const justTime = this.state.Runtime.substring(0, this.state.Runtime.length - this.runTimeWord.length);

    return (
      <Modal>
        <section ref={this.modalArea}>
          <section className='header'>
            <span>
              <label>{this.props.action} a movie</label>
            </span>
          </section>
          <section className='main'>
            <label className='error'>{this.state.error}</label>
            <ul>
              <li><strong>Title</strong>: <input name='Title' 
                                                 data-validatetype='string' 
                                                 value={this.state.Title} 
                                                 onChange={this.handleChange} /> 
                                                 {this.searchOnlineBTN} 
              </li>
              <li><strong>Year</strong>: <input ref={this.yearInput} name='Year'
                                                data-validatetype='number' 
                                                value={this.state.Year} 
                                                onChange={this.handleChange} /> 
              </li>
              <li><strong>Runtime</strong> (in minutes): <input name='Runtime' 
                                                                data-validatetype='number' 
                                                                value={justTime} 
                                                                onChange={this.handleChange} />
              </li>
              <li><strong>Genre</strong>: <input name='Genre' 
                                                 data-validatetype='string' 
                                                 value={this.state.Genre} 
                                                 onChange={this.handleChange} /> 
              </li>
              <li><strong>Director</strong>: <input name='Director' 
                                                    data-validatetype='string' 
                                                    value={this.state.Director} 
                                                    onChange={this.handleChange} /> 
              </li>
            </ul>
          </section>
          <section className='buttonsWrapper'>
            <Button contentSTR={this.props.action} 
                    className='btn accept' 
                    callbackFunc={this.accept}/>
            <Button contentSTR='Cancel'
                    className='btn' 
                    callbackFunc={this.props.cancelCallback}/>
          </section>
        </section>
      </Modal>
    )
  }

  private handleChange = (evt: any) => {
    let newValue = evt.target.value;
    if (evt.target.name === 'Runtime') {
      newValue += this.runTimeWord;
    }

    this.setState({[evt.target.name]: newValue });
    
    if (evt.target.name === 'Title' && newValue.toLowerCase().trim() !== 'dog day afternoon') {
      this.setState((prevState: any) => ({
        ...prevState,
        Poster: this.noPoster,
      }));
    }
    else {
      this.setState((prevState: any) => ({
        ...prevState,
        Poster: this.defaultPoster,
      }));
    }

    this.checkValidation(evt.target);
  }
  
  private checkValidation = (inputField) => {
    let validationRes: string;

    this.checkIfMovieExists(inputField.value);

    validationRes = Helpers.validate(inputField.value, inputField.attributes['data-validatetype'].value);
  
    if (validationRes.length > 0) {
      inputField.value = inputField.value.slice(0,-1);
      switch (inputField.name) {
        case 'Year':
        this.setState((prevState: any) => ({
          ...prevState,
          Year: inputField.value,
          error: validationRes
        }));
        break;
        case 'Runtime': 
        this.setState((prevState: any) => ({
          ...prevState,
          Runtime: inputField.value + this.runTimeWord,
          error: validationRes
        }));
        break;
        default: {
          this.setState((prevState: any) => ({
            ...prevState,
            canSubmit: false,
            error: validationRes
          }));
        }
      }
      return false;
    }
    
    validationRes = Helpers.validate(this.yearInput.current.value, 'fourDigits');

    if (validationRes.length > 0) {
      this.setState((prevState: any) => ({
        ...prevState,
        canSubmit: false,
        error: validationRes
      }));
      return false;
    }

    this.setState((prevState: any) => ({
      ...prevState,
      canSubmit: true,
      error: validationRes
    }));

    return true;
  }

  private checkIfMovieExists(movieName: string) {
    if (store.getState().movieTitles[movieName]) {
      const validationRes = Helpers.validate('found', 'exists');
      this.setState((prevState: any) => ({
        ...prevState,
        canSubmit: false,
        error: validationRes
       }));
       return true;
    }
    return false;
  }

  private autoFillFields = () => {
    ServerAPI.getMovie(this.state.Title)
      .then((movieJson) => {
        if (!movieJson.hasOwnProperty('Error')) {
          Helpers.showToast('Movie found!', 'good');
          this.setState((prevState: any) => ({
            ...prevState,
            canSubmit: true,
           }));
          for (const key in this.movieObj) {
            if (movieJson.hasOwnProperty(key)) {
              if (movieJson[key] === 'N/A' && 
                  key !== 'Website' && 
                  key !== 'Plot' && 
                  key !== 'Poster') {
                this.setState((prevState: any) => ({
                  ...prevState,
                  canSubmit: false,
                 }));
              }
              this.setState({[key]: movieJson[key] });
            }
          }
        }
        else {
          Helpers.showToast('Found no movie with this title', 'bad');
        }
    });
  }

  private accept = () => {
    if (this.props.action === 'Add' && this.checkIfMovieExists(this.state.Title)) {
      return;
    }

    if (!this.state.canSubmit) {
      this.setState((prevState: any) => ({
        ...prevState,
        error: 'Every field must be filled correctly!'
       }));
      return;
    }

    this.movieObj = {
      Director: this.state.Director.trim(),
      Genre: this.state.Genre.trim(),
      Plot: this.state.Plot.trim(),
      Poster: this.state.Poster,
      Runtime: this.state.Runtime,
      Title: this.state.Title.trim(),
      Website: this.state.Website.trim(),
      Year: this.state.Year,
    }
    const movie = Helpers.moviefy(this.movieObj,this.state.Id);
    this.props.submitCallback(movie);
  }
}

export default MovieDetails;