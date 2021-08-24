/* eslint-disable */
//Class for Platform from the API
export class PlatformModel{
    name: string;
    platform_logo: number;
    abbreviation: string;
    alternative_name: string;
    //Default values
    constructor(){
        this.name = "Console";
        this.platform_logo = 0;
        this.abbreviation = "NA";
        this.alternative_name = "NA";
    }
}