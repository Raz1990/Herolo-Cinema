import * as React from 'react';
import './App.css';
import {Loader} from './Components/Loader';
import MoviesList from './Containers/MoviesList';
import ServerAPI from './ServerAPI';

interface IAppState {
  isLoading: number,
  moviesList: []
}

class App extends React.Component<{},IAppState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      isLoading: 0,
      moviesList: []
    }
  }

  public render() {
    const content = (
      <MoviesList moviesJSONList={this.state.moviesList}/>
    );

    return (
      <section id='Main'>
        <section className='header'>
          <h1>Welcome to Herolo Cinema City!</h1>
        </section>
        {this.state.isLoading ? (<Loader/>) : content}
      </section>
    );
  }

  public componentDidMount() {
    this.startLoading();

    const serverApi = new ServerAPI();
    const initialMoviesNames = ['guardians of the galaxy', 
                                'guardians of the galaxy vol 2', 
                                'Avengers', 
                                'Avengers age of ultron', 
                                'Avengers infinity',
                                'Captain America the first avenger', 
                                'Captain America the Winter Soldier', 
                                'Captain America Civil War', 
                                'Thor ragnarok'];
    
    for (const movieName of initialMoviesNames) {
      serverApi.getMovie(movieName)
      .then((movieJson) => {
        this.setState((prevState: any)=>{
          return {moviesList: prevState.moviesList.concat(movieJson)};
        });
        if (this.state.moviesList.length === initialMoviesNames.length) {
          this.stopLoading();
        }
      });
    }
  }

  private startLoading() {
    this.setState((prevState: IAppState) => ({
      ...prevState,
      isLoading: ++prevState.isLoading
     }));
    }

  private stopLoading() {
  this.setState((prevState: IAppState) => ({
      ...prevState,
      isLoading: --prevState.isLoading
    }));
  }
}

export default App;
