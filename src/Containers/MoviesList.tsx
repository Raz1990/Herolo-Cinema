import * as React from 'react';
import EmptyItem from '../Components/EmptyItem';
import MovieItem from '../Components/MovieItem';
import '../CSS/cssMovieList.css';
import Helpers from '../helpers';

interface IMovieListProps {
  moviesJSONList: []
}

class MoviesList extends React.Component<IMovieListProps,any> {
  constructor(props: IMovieListProps){
    super(props);
  }

  public formatList(){
    let idCount = 1;
    const formatedList = this.props.moviesJSONList.map((movieJson: any, idx: any) => {
      const movie = Helpers.moviefy(movieJson, idCount++);
      return <MovieItem key={idx} movie={movie} />;
    });

    return formatedList;
  }
  
    public render() {
    return (
      <section className="movie-list">
        {this.formatList()}
        <EmptyItem/>
      </section>
    );
  }
}

export default MoviesList;
