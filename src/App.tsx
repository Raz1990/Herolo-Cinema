import * as React from 'react';
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import EmptyItem from './Components/EmptyItem';
import {Loader} from './Components/Loader';
import Search from './Components/Search';
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

  public componentWillUpdate() {
    document.title = 'Herolo Cinema City';
  }

  public render() {
    const content = (
      <MoviesList moviesJSONList={this.state.moviesList}/>
    );

    return (
      <section id='full'>
        <ToastContainer />
        <header>
          <Search/>
          <EmptyItem/>
          <span className='headerItem'/>
        </header>
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
