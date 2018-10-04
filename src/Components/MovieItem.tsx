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
  constructor(props: IMovieItemProps) {
    super(props);

    this.state = {
      panelToShow: '',
    };
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
      <section className='movie-item'>
        <ul>
          <li>Id: {this.props.movie.getId()}</li>
          <li>Title: {this.props.movie.getTitle()}</li>
          <li>Year: {this.props.movie.getYear()}</li>
          <li>Runtime: {this.props.movie.getRunTime()}</li>
          <li>Genre: {this.props.movie.getGenre()}</li>
          <li>Director: {this.props.movie.getDirector()}</li>
        </ul>
        <section className='buttons'>
          <Button contentSTR='Edit' className={'btn edit'} callbackFunc={this.showEditModal}/>
          <Button contentSTR='Delete' className={'btn delete'} callbackFunc={this.showDeleteModal}/>
        </section>
        {modal ? modal : <div/>}
      </section>
    );
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