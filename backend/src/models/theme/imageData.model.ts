import { model, Schema } from "mongoose"
import { IImageData } from "../../interfaces/theme/imageData.interface"

const ImageDataSchema = new Schema({
    name: { type: Uint8ClampedArray, required: [true, "Field is required"] },
})

export const ImageData = model<IImageData>("ImageData", ImageDataSchema);