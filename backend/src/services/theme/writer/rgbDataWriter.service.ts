import { IImageData } from "../../../interfaces/theme/imageData.interface";
import { IRgbData } from "../../../interfaces/theme/rgbData.interface";
import { convertImageToRgb } from "../utils/convertImageToRgb";

export class RgbDataWriter{
    public rgbData: IRgbData[] = [] as IRgbData[];

    public save() {
        if (this.rgbData == undefined) 
            return;
        
        return this.rgbData
    }

   public async getRgbsFromImageData(imageData: IImageData, count:number): Promise<IRgbData[]>{
        const rgb = await convertImageToRgb(imageData, count)
        return rgb;
    }
}