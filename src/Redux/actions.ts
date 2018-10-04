import IMovie from '../Interfaces/IMovie';

function refresh(){
  return {
    type: "REFRESH",
    value: [],
  }
}

function setAllMovies(movies: IMovie[]){
  return {
    type: "SET_ALL_MOVIES",
    value: movies,
  }
}

function addAMovie(movie: IMovie){
  return {
    type: "ADD_A_MOVIE",
    value: movie,
  }
}

function editAMovie(movie: IMovie, location: number){
  return {
    type: "EDIT_A_MOVIE",
    value: {movie, location},
  }
}

function deleteAMovie(movieId: number){
  return {
    type: "DELETE_A_MOVIE",
    value: movieId,
  }
}

export {refresh,setAllMovies,addAMovie,editAMovie,deleteAMovie};