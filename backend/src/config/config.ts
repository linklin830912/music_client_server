import * as fs from 'fs';

export function setGlobalConfig() {
    const config = JSON.parse(fs.readFileSync('config.json', 'utf-8'));
    const serverPort = config.SERVER_PORT;
    const dbUrl = config.DB_URL;
    return {
        serverPort: serverPort,
        dbUrl: dbUrl
    }
}