import { MONGO_URL } from "./constants/app.constants";
import { PokemonController } from "./controllers/pokemon.controller";
import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import { PokemonService } from "./services/pokemon.service";

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.setConfig();
    this.setMongoConfig();
    this.setControllers();
  }

  private setConfig() {
    this.app.use(bodyParser.json({ limit: "50mb" }));
    this.app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
    this.app.use(cors());
  }

  private setMongoConfig() {
    mongoose.Promise = global.Promise;
    mongoose.connect(MONGO_URL, {
    //   useNewUrlParser: true,
    });
  }

    private setControllers() {
        const pokemonService = new PokemonService();
    const pokemonController = new PokemonController(pokemonService);

    this.app.use("/pokemon", pokemonController.router);
  }
}

export default new App().app;