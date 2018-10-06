import * as React from 'react';
import '../CSS/cssButton.css';
import '../CSS/cssMovieItem.css';
import Helpers from '../helpers';
import IMovie from '../Interfaces/IMovie';
import * as actions from '../Redux/actions';
import {store} from '../Redux/store';
import Button from './Button';
import DeletePanel from './DeletePanel';
import MovieDetails from './MovieDetails';

interface IMovieItemProps {
  index: number,
  movie: IMovie
}

interface IMovieItemState {
  panelToShow: string
}

class MovieItem extends React.Component<IMovieItemProps,IMovieItemState> {
  private flipArea: any;

  constructor(props: IMovieItemProps) {
    super(props);

    this.state = {
      panelToShow: '',
    };

    this.flipArea = React.createRef();
  }

  public render() {
    let modal: any;
    
    switch (this.state.panelToShow) {
      case 'edit':
        modal = <MovieDetails action='Edit'
                              cancelCallback={this.cancelModal}
                              index={this.props.index} 
                              submitCallback={this.editMovie} 
                              movieItem={this.props.movie}/>;
        break;
      case 'delete':
        modal = <DeletePanel cancelCallback={this.cancelModal} 
                             submitCallback={this.deleteMovie} />;
        break;
      default:
        modal = null;
    }
    
    return (
      <section>
        <section className='flip-container movie-item' ref={this.flipArea} onTouchStart={this.flipTouch}>
          <section className='flipper'>
            <section className='front'>
              <h2>{this.toProperCase(this.onlyAlphabet(this.props.movie.getTitle()))}</h2>
              <img src={this.props.movie.getPoster()} alt={this.props.movie.getTitle()} />
            </section>
            <section className='back'>
            <h2>{this.toProperCase(this.onlyAlphabet(this.props.movie.getTitle()))}</h2>
              <ul>
                <li><strong>Year</strong>: {this.props.movie.getYear()}</li>
                <li><strong>Runtime</strong>: {this.props.movie.getRunTime()}</li>
                <li><strong>Genre</strong>: {this.props.movie.getGenre()}</li>
                <li><strong>Director</strong>: {this.props.movie.getDirector()}</li>
                <li><strong>Plot</strong>: {this.props.movie.getPlot()}</li>
                <li><strong>Website</strong>: <a href={this.props.movie.getWebsite()} target="blank"> movie website </a></li>
              </ul>
              <section className='buttons'>
                <Button contentSTR='Edit' className={'btn edit'} callbackFunc={this.showEditModal}/>
                <Button contentSTR='Delete' className={'btn delete'} callbackFunc={this.showDeleteModal}/>
              </section>
            </section>
          </section>
        </section>
        {modal ? modal : null}
      </section>
    );
  }

  private onlyAlphabet(text: string) {
    return text.replace(/[^A-Za-z 0-9]/g, '');
  }

  private toProperCase(text: string) {
    return text.replace(/\w\S*/g, (txt) => {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  private flipTouch = () => {
    this.flipArea.current.classList.toggle('hover');
  }

  private toggleModal = (panel:string) => {
    this.setState({
      panelToShow: panel
    });
  }

  private cancelModal = () => {
    this.setState({
      panelToShow: ''
    });
  };

  private showEditModal = () => {
    this.toggleModal('edit');
  }

  private showDeleteModal = () => {
    this.toggleModal('delete');
  }

  private editMovie = (editedMovie: IMovie) => {
    store.dispatch(actions.editAMovie(editedMovie,this.props.index));
    Helpers.showToast('Movie edited successfully!' ,'good');
    this.cancelModal();
  }

  private deleteMovie = () => {
    store.dispatch(actions.deleteAMovie(this.props.index));
    Helpers.showToast('Movie deleted successfully!','good');
    this.cancelModal();
  }
}

export default MovieItem;