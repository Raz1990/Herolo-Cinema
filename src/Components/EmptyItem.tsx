import * as React from 'react';
import '../CSS/cssButton.css';
import '../CSS/cssEmptyItem.css';
import IMovie from '../Interfaces/IMovie';
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
    console.log('adding!');
    console.log(newMovie);
    this.cancelModal();
  }
}

export default EmptyItem;