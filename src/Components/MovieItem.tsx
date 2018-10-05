import * as React from 'react';
import '../CSS/cssButton.css';
import '../CSS/cssMovieItem.css';
import IMovie from '../Interfaces/IMovie';
import * as actions from '../Redux/actions';
import {store} from '../Redux/store';
import Button from './Button';
import DeletingPanel from './DeletingPanel';
import MovieDetailes from './MovieDetailes';

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
        modal = <MovieDetailes  action='edit'
                                cancelCallback={this.cancelModal}
                                index={this.props.index} 
                                submitCallback={this.editMovie} 
                                movieItem={this.props.movie}/>;
        break;
      case 'delete':
        modal = <DeletingPanel  cancelCallback={this.cancelModal} 
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
              <img src={this.props.movie.getPoster()} />
            </section>
            <section className='back'>
            <h2>{this.props.movie.getTitle()}</h2>
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
    this.cancelModal();
  }

  private deleteMovie = () => {
    store.dispatch(actions.deleteAMovie(this.props.index));;
    this.cancelModal();
  }
}

export default MovieItem;