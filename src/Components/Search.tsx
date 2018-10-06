import * as React from 'react';
import '../CSS/cssSearch.css';
import * as actions from '../Redux/actions';
import {store} from '../Redux/store';

class Search extends React.Component<{},{}> {
  constructor(props: {}) {
    super(props);
  }
  
  public render() {
    return (
      <span className='search-area'>
      <label><b>Search a movie</b></label> 
      <input className='header-item' 
             placeholder='Enter movie name...' 
             onChange={this.filter}/>
      </span>
    );
  }

  private filter(evt: any) {
    if (evt.target.value.length === 0) {
      store.dispatch(actions.refresh());
      return;
    }
    for (const movie of store.getState().moviesList) {
      if (movie.getTitle().toLowerCase().includes(evt.target.value.toLowerCase())) {
        movie.setShow(true);
      }
      else {
        movie.setShow(false);
      }
    }
    store.dispatch(actions.setAllMovies(store.getState().moviesList));
  }
}

export default Search;