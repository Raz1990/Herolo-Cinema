const apiKey = '&apikey=b6463727';
const baseUrl = 'https://www.omdbapi.com/?t=';

const ServerAPI = {
  getMovie: (titleName: string) => {
    return fetch(baseUrl + titleName + apiKey)
          .then(res => res.json());
  }
}

export default ServerAPI;