import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import { ThemeService } from "./services/theme/theme.service";
import { ThemeController } from "./controllers/theme/theme.controller";

type AppConfigType = {
    dbUrl: string,
    serverPort: string,
}
export class App {
    public app: express.Application;
    private dbUrl: string | undefined;
    private serverPort: string | undefined;

    constructor(config: AppConfigType) {
        this.serverPort = config.serverPort;
        this.dbUrl = config.dbUrl;

        this.app = express();
        this.initialize();
        this.setDbConfig(this.dbUrl);
        this.setControllers();
    }
  

  public startListening() {
    this.app.listen(this.serverPort, () => console.log(`Listening on port ${this.serverPort}`));
  }

  private initialize() {
    this.app.use(bodyParser.json({ limit: "50mb" }));
    this.app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
    this.app.use(cors());
  }

  private setDbConfig(dbUrl: string) {
    mongoose.Promise = global.Promise;
    mongoose.connect(dbUrl, {
    //   useNewUrlParser: true,
    });
  }

    private setControllers() {

      const themeService = new ThemeService();
      const themeController = new ThemeController(themeService);
      this.app.use("/theme", themeController.router);
  }
}

// export default new App(new Config()).app;