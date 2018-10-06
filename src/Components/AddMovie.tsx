import * as React from 'react';
import '../CSS/cssAddMovie.css';
import '../CSS/cssButton.css';
import Helpers from '../helpers';
import IMovie from '../Interfaces/IMovie';
import * as actions from '../Redux/actions';
import {store} from '../Redux/store';
import Button from './Button';
import MovieDetails from './MovieDetails';

interface IAddMovieState {
  showAddModal: boolean
}

class AddMovie extends React.Component<{},IAddMovieState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      showAddModal: false
    }
  }
  
  public render() {
    let modal: any = null;

    if (this.state.showAddModal) {
      modal = <MovieDetails action='Add'
                            cancelCallback={this.cancelModal} 
                            index={store.getState().moviesList.length}
                            newId={store.getState().lastIndex+1}
                            submitCallback={this.addMovie}/>;
    }

    return (
      <section className='empty-item'>
        <Button contentSTR='+' className={"btn add"} callbackFunc={this.showAddModal}/>
        {modal ? modal : <div/>}
      </section>
    );
  }

  private showAddModal = () => {
    this.setState({
      showAddModal: true
    });
  }

  private cancelModal = () => {
    this.setState({
      showAddModal: false
    });
  };

  private addMovie = (newMovie: IMovie) => {
    store.dispatch(actions.addAMovie(newMovie));
    Helpers.showToast('Movie added successfully!', 'good');
    this.cancelModal();
  }
}

export default AddMovie;