import { Request, Response, Router } from "express";
import { ThemeService } from "../../services/theme/theme.service";


export class ThemeController{
    public router = Router();
    
    constructor(private themeService: ThemeService) {
        this.setRoutes();
        this.themeService = themeService;
    }

    public setRoutes() :void{
        this.router.route("/:selectColorCount").get(this.convertImageDataToRgb);
    }

    // private sayHello = (_: Request, res: Response) => {
    //     const welcomeMessage = "hello world";
    //     console.log("123")
    //     res.send(welcomeMessage);
    //   };

    public async convertImageDataToRgb(req: Request, res: Response) {
        
        const imageData = req.body.imageData;
        const selectColorCount = await req.params.selectColorCount;

        console.log("123", selectColorCount,req.params, req.body)
        // const data = await this.themeService.imageDataToRgbGet(imageData, selectColorCount);

        res.send({
            "hello":"ducky"
        });
    }
}