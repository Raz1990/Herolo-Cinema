import * as React from 'react';
import MovieItem from '../Components/MovieItem';
import '../CSS/cssMovieList.css';
import Helpers from '../helpers';
import IMovie from '../Interfaces/IMovie';
import * as actions from '../Redux/actions';
import {store} from '../Redux/store';

interface IMovieListProps {
  moviesJSONList: []
}

class MoviesList extends React.Component<IMovieListProps,any> {
  private unsubscribe: any;

  constructor(props: IMovieListProps){
    super(props);
    
    this.unsubscribe = store.subscribe( () => {
      this.setState({});
    });
  }

  public componentWillUnmount() {
    this.unsubscribe();
  }

  public componentDidMount() {
    for (const movieJson of this.props.moviesJSONList) {
      const movie = Helpers.moviefy(movieJson, store.getState().lastIndex+1);
      store.dispatch(actions.addAMovie(movie));
    }
  }

  public formatList(){
    const formatedList = store.getState().moviesList.map((movie: IMovie, idx: any) => {
      if (movie.getShow()) {
        return <MovieItem key={idx} movie={movie} index={idx} />;
      }
      return;
    });
    return formatedList;
  }
  
  public render() {
    return (
      <main className="movie-list">
        {this.formatList()}
      </main>
    );
  }
}

export default MoviesList;
