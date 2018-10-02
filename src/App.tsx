import * as React from 'react';
import './App.css';

import MoviesList from './Containers/MoviesList';

class App extends React.Component {
  public render() {
    return (
      <section id='Main'>
        <MoviesList/>
      </section>
    );
  }
}

export default App;
