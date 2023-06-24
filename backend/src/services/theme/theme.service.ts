// note: this will
// 1. GET :take in image data convert and select rgb colors, don't save the image
// 2. POST :save rgb colors(3) into THEME (main, background, contrast color)
// 3. PUT : update 2. 


import { IImageData } from "../../interfaces/theme/imageData.interface";
import { IThemeData } from "../../interfaces/theme/themeData.interface";
import { ThemeReader } from "./reader/theme.reader";
import { convertImageToRgb } from "./utils/convertImageToRgb";
import { ThemeWriter } from "./writer/theme.writer";

export class ThemeService{
    
    private _themeReader: ThemeReader;
    private _themeWriter: ThemeWriter;
    
    constructor() {
        this._themeWriter = new ThemeWriter();
        this._themeReader = new ThemeReader();
    }

    public async imageDataToRgbGet(imageData: IImageData, selectColorCount: number) {
        return selectColorCount as unknown as string;
        // const theme = await convertImageToRgb(imageData, selectColorCount);
    }
}

