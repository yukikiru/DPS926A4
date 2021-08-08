import { Game } from "./game.model";

//Class for the user's list of games
export class MyGames{
    gameList: Game[];
    constructor(){
        this.gameList = new Array<Game>();
    }
}