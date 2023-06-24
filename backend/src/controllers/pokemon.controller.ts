import { Request, Response, Router } from "express";
import { PokemonService } from "../services/pokemon.service";

export class PokemonController {
  public router = Router();

  private pokemonService!: PokemonService;
  constructor(pokemonService: PokemonService) {
    this.setRoutes();
    this.pokemonService = pokemonService;
  }

  public setRoutes() {
    // Chaining our new post route
    this.router.route("/").get(this.sayHello);
    this.router.route("/all").get(this.findAll);
    this.router.route("/:id").delete(this.delete).put(this.update);
  }
  
  private sayHello = (_: Request, res: Response) => {
    const welcomeMessage = this.pokemonService.getWelcomeMessage();
    res.send(welcomeMessage);
  };

  private findAll = async (_: Request, res: Response) => {
    try {
      const pokemon = await this.pokemonService.findAll();
      res.send(pokemon);
    } catch (e) {
      res.status(500).send("findAll failed");
    }
  };
  
  private add = async (req: Request, res: Response) => {
    try {
      const addPokemonResult = await this.pokemonService.add(req.body);
      res.send(addPokemonResult);
    } catch (e) {
      res.status(500).send("add failed");
    }
  };

  private delete = async (req: Request, res: Response) => {
    try {
      const deletePokemonResult = await this.pokemonService.delete(
        req.params.id
      );
      res.send(deletePokemonResult);
    } catch (e) {
      res.status(500).send("delete failed");
    }
  };

  private update = async (req: Request, res: Response) => {
    try {
      const updatePokemonResult = await this.pokemonService.update(
        req.params.id,
        req.body
      );
      res.send(updatePokemonResult);
    } catch (e) {
      res.status(500).send("update failed");
    }
  };
}
