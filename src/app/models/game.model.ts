//Class for game from the API
export class Game{
    id: number;
    aggregated_rating: number;
    cover: string; //This will be the ID for the cover image from https://api.igdb.com/v4/covers
    first_release_date: number; //Time in Epoch time, will need to be converted
    name: string;
    summary: string;
    date:string; //Human form of date
    //Default values
    constructor(){
        this.id = 0;
        this.aggregated_rating = 0;
        this.cover = "nocover_qhhlj6";
        this.first_release_date = -2208988800;
        this.name = "Game";
        this.summary = "N/A";
        this.date = "";
    }
}