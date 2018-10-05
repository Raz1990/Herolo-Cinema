import * as React from 'react';
import {toast} from "react-toastify";
import '../CSS/cssButton.css';
import '../CSS/cssEmptyItem.css';
import IMovie from '../Interfaces/IMovie';
import * as actions from '../Redux/actions';
import {store} from '../Redux/store';
import Button from './Button';
import MovieDetailes from './MovieDetailes';

interface IEmptyItem {
  showAddModal: boolean
}

class EmptyItem extends React.Component<{},IEmptyItem> {
  constructor(props: {}) {
    super(props);

    this.state = {
      showAddModal: false
    }
  }
  
  public render() {
    let modal: any = null;

    if (this.state.showAddModal) {
      modal = <MovieDetailes  action='add'
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
    toast.success('Movie added successfully!', {
      autoClose: 3000,
      hideProgressBar: true,
      pauseOnHover: false,
      position: toast.POSITION.TOP_RIGHT,
    });
    this.cancelModal();
  }
}

export default EmptyItem;