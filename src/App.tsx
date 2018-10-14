import * as React from 'react';
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import AddMovie from './Components/AddMovie';
import Filter from './Components/Filter';
import {Loader} from './Components/Loader';
import MoviesList from './Containers/MoviesList';
import ServerAPI from './ServerAPI';

interface IAppState {
  isLoading: boolean,
  moviesList: []
}

class App extends React.Component<{},IAppState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      isLoading: false,
      moviesList: []
    }
  }

  public render() {
    const content = (
      <MoviesList moviesJSONList={this.state.moviesList}/>
    );

    return (
      <section id='full'>
        <ToastContainer />
        <header>
          <Filter/>
          <AddMovie/>
        </header>
        {this.state.isLoading ? (<Loader/>) : content}
      </section>
    );
  }

  public componentDidMount() {
    this.changeLoading();

    const initialMoviesNames = ['chappie', 
                                'guardians of the galaxy vol 2', 
                                'venom', 
                                'toy story 3', 
                                'inside out',
                                'jurassic park', 
                                'green mile', 
                                'infinity war', 
                                'thor ragnarok'];
    
    for (const movieName of initialMoviesNames) {
      ServerAPI.getMovie(movieName)
      .then((movieJson) => {
        this.setState((prevState: any)=>{
          return {moviesList: prevState.moviesList.concat(movieJson)};
        });
        if (this.state.moviesList.length === initialMoviesNames.length) {
          this.changeLoading();
        }
      });
    }
  }

  private changeLoading() {
    this.setState((prevState: IAppState) => ({
      ...prevState,
      isLoading: !prevState.isLoading
     }));
  }
}

export default App;
