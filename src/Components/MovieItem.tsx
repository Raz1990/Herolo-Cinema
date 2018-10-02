import * as React from 'react';
import IMovie from '../Interfaces/IMovie';

interface IMovieItemProps {
    movie: IMovie
}

class MovieItem extends React.Component<IMovieItemProps,{}> {
  constructor(props: IMovieItemProps) {
      super(props);
  }

  public render() {
    return (
        <section className='movie-item'> Title: {this.props.movie.getTitle()} </section>
    );
  }
}

export default MovieItem;