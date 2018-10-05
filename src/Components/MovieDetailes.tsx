import * as React from 'react';
import '../CSS/cssButton.css';
import '../CSS/cssModal.css';
import Helpers from '../helpers';
import IMovie from '../Interfaces/IMovie';
import IMovieObj from '../Interfaces/IMovieObj';
import {store} from '../Redux/store';
import Modal from "./Modal";

interface IAddProps {
  action: string,
  newId?: number,
  index: number,
  submitCallback: (newMovie: IMovie) => void,
  cancelCallback: () => void,
  movieItem?: IMovie,
}

class MovieDetails extends React.Component<IAddProps,any> {
  private runTimeWord = ' min';
  private modalArea: any;
  private yearInput: any;

  constructor(props: IAddProps){
    super(props);

    this.modalArea = React.createRef();
    this.yearInput = React.createRef();

    if (this.props.action === 'add') {
      this.state = {
        canSubmit: true,
        director: 'Sidney Lumet',
        error: '',
        genre: 'Biography, Crime, Drama',
        id: this.props.newId,
        plot: 'A man robs a bank to pay for his lover\'s operation; it turns into a hostage situation and a media circus.',
        poster: 'https://images-na.ssl-images-amazon.com/images/I/51LJe3aoe4L.jpg',
        runtime: '125 min',
        title: 'Dog Day Afternoon',
        website: 'https://www.imdb.com/title/tt0072890/',
        year: '1975',
      };
    }
    else if (this.props.action === 'edit') {
      this.state = {
        canSubmit: true,
        // @ts-ignore
        director: this.props.movieItem.getDirector(),
        error: '',
        // @ts-ignore
        genre: this.props.movieItem.getGenre(),
        // @ts-ignore
        id: this.props.movieItem.getId(),
        // @ts-ignore
        plot: this.props.movieItem.getPlot(),
        // @ts-ignore
        poster: this.props.movieItem.getPoster(),
        // @ts-ignore
        runtime: this.props.movieItem.getRunTime(),
        // @ts-ignore
        title: this.props.movieItem.getTitle(),
        // @ts-ignore
        website: this.props.movieItem.getWebsite(),
        // @ts-ignore
        year: this.props.movieItem.getYear(),
      };
    }
  }

  public componentDidMount() {
    Helpers.setUpKeysEvents(this.modalArea.current,'Enter',this.accept);
    Helpers.setUpKeysEvents(this.modalArea.current,'Escape',this.props.cancelCallback);
  }

  public componentWillUnmount() {
    Helpers.removeKeysEvents(this.modalArea.current, [this.accept,this.props.cancelCallback]);
  }

  public render(){
    const justTime = this.state.runtime.substring(0, this.state.runtime.length - this.runTimeWord.length);

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
              <li><strong>Title</strong>: <input name='title' data-validatetype='string' defaultValue={this.state.title} onChange={this.handleChange} /> </li>
              <li><strong>Year</strong>: <input ref={this.yearInput} name='year' data-validatetype='number' defaultValue={this.state.year} onChange={this.handleChange} /> </li>
              <li><strong>Runtime</strong> (in minutes): <input name='runtime' data-validatetype='number' defaultValue={justTime} onChange={this.handleChange} /> </li>
              <li><strong>Genre</strong>: <input name='genre' data-validatetype='string' defaultValue={this.state.genre} onChange={this.handleChange} /> </li>
              <li><strong>Director</strong>: <input name='director' data-validatetype='string' defaultValue={this.state.director} onChange={this.handleChange} /> </li>
            </ul>
          </section>
          <section className='buttonsWrapper'>
            <button className='btn accept' onClick={this.accept}>{this.props.action}</button>
            <button className='btn' onClick={this.props.cancelCallback}>Cancel</button>
          </section>
        </section>
      </Modal>
    )
  }

  private handleChange = (evt: any) => {
    const validationRes = Helpers.validate(evt.target.value, evt.target.attributes['data-validatetype'].value);
 
    this.setState((prevState: any) => ({
      ...prevState,
      error: validationRes
     }));

    if (validationRes.length > 0) {
      evt.target.value = evt.target.value.slice(0,-1);
      this.setState((prevState: any) => ({
        ...prevState,
        canSubmit: false
       }));
      return;
    }
    else {
      this.setState((prevState: any) => ({
        ...prevState,
        canSubmit: true
       }));
    }

    let newValue = evt.target.value;
    if (evt.target.name === 'runtime') {
      newValue += this.runTimeWord;
    }
    this.setState({ [evt.target.name]: newValue });
  }

  private accept = () => {
    let validationRes = Helpers.validate(this.yearInput.current.value, 'fourLetters');

    for (const storeMovie of store.getState().moviesList) {
      if (storeMovie.getId() !== this.state.id && storeMovie.getTitle() === this.state.title) {
        validationRes = Helpers.validate('found', 'exists');
        break;
      }
    }

    if (validationRes.length > 0) {
      this.setState((prevState: any) => ({
        ...prevState,
        canSubmit: false,
        error: validationRes
       }));
       return;
    }

    if (!this.state.canSubmit) {
      this.setState((prevState: any) => ({
        ...prevState,
        error: 'Every field must be filled correctly!'
       }));
      return;
    }
    
    const movieObj: IMovieObj = {
      Director: this.state.director,
      Genre: this.state.genre,
      Plot: this.state.plot,
      Poster: this.state.poster,
      Runtime: this.state.runtime,
      Title: this.state.title,
      Website: this.state.website,
      Year: this.state.year,
    }
    const movie = Helpers.moviefy(movieObj,this.state.id);
    this.props.submitCallback(movie);
  }
}

export default MovieDetails;