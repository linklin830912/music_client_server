import * as fs from 'fs';

export class Config {  
    public SERVER_PORT: string | undefined;
    public DB_URL : string | undefined;
    constructor() {
        const c = JSON.parse(fs.readFileSync(require.resolve("./config/config.json"), {
            encoding: 'utf8', flag: 'r'
        }));
        console.log("!!! config.json", c.SERVER_PORT, c.DB_URL, "end")
        this.SERVER_PORT = c.SERVER_PORT;
        this.DB_URL = c.DB_URL;
    }    
}