import { App } from "./App";
import { Config } from "./Config";

const config = new Config();
const app = new App({
    dbUrl: config.DB_URL || "",
    serverPort: config.SERVER_PORT || ""});
app.startListening();