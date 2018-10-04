import * as React from 'react';
import '../CSS/cssButton.css';
import '../CSS/cssModal.css';
import Helpers from '../helpers';
import IMovie from '../Interfaces/IMovie';
import IMovieObj from '../Interfaces/IMovieObj';
import Modal from "./Modal";

interface IAddProps {
  action: string,
  submitCallback: (newMovie: IMovie) => void,
  cancelCallback: () => void,
  movieItem?: IMovie,
}

class MovieDetails extends React.Component<IAddProps,any> {
  private runTimeWord = ' min';
  
  constructor(props: IAddProps){
    super(props);

    if (this.props.action === 'add') {
      this.state = {
        canSubmit: true,
        director: 'Sidney Lumet',
        error: '',
        genre: 'Biography, Crime, Drama',
        id: 10,
        runtime: '125 min',
        title: 'Dog Day Afternoon',
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
        runtime: this.props.movieItem.getRunTime(),
        // @ts-ignore
        title: this.props.movieItem.getTitle(),
        // @ts-ignore
        year: this.props.movieItem.getYear(),
      };
    }
  }

  public render(){
    const justTime = this.state.runtime.substring(0, this.state.runtime.length - this.runTimeWord.length);

    return (
      <Modal>
        <section className='header'>
          <span>
            <label>{this.props.action} a movie</label>
          </span>
        </section>
        <section className='main'>
          <label className='error'>{this.state.error}</label>
          <ul>
            <li>Id: {this.state.id} </li>
            <li>Title: <input name='title' data-validatetype='string' defaultValue={this.state.title} onChange={this.handleChange} /> </li>
            <li>Year: <input name='year' data-validatetype='number' defaultValue={this.state.year} onChange={this.handleChange} /> </li>
            <li>Runtime (in minutes): <input name='runtime' data-validatetype='number' defaultValue={justTime} onChange={this.handleChange} /> </li>
            <li>Genre: <input name='genre' data-validatetype='string' defaultValue={this.state.genre} onChange={this.handleChange} /> </li>
            <li>Director: <input name='director' data-validatetype='string' defaultValue={this.state.director} onChange={this.handleChange} /> </li>
          </ul>
        </section>
        <section className='buttonsWrapper'>
          <button className='btn accept' onClick={this.accept}>{this.props.action}</button>
          <button className='btn cancel' onClick={this.props.cancelCallback}>Cancel</button>
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
    if (!this.state.canSubmit) {
      this.setState((prevState: any) => ({
        ...prevState,
        error: 'Every field must be filled!'
       }));
      return;
    }
    
    const movieObj: IMovieObj = {
      Director: this.state.director,
      Genre: this.state.genre,
      Runtime: this.state.runtime,
      Title: this.state.title,
      Year: this.state.year,
    }
    const movie = Helpers.moviefy(movieObj,this.state.id);
    this.props.submitCallback(movie);
  }
}

export default MovieDetails;