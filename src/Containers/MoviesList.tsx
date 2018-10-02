import * as React from 'react';

class MoviesList extends React.Component<{},any> {
  constructor(props: {}){
    super(props);  

    this.state = {
      moviesList: []
    };
  }

  public render() {
    return (
      <section className="movie-list">
        <h1> placeholder </h1>
      </section>
    );
  }
}

export default MoviesList;
