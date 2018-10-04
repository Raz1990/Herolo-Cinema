export default class ServerAPI {
  private apiKey = '&apikey=b6463727';
  private baseUrl = 'https://www.omdbapi.com/?t=';
  
  public getMovie(titleName: string) {
    return fetch(this.baseUrl + titleName + this.apiKey)
          .then(res => res.json());
  }
}