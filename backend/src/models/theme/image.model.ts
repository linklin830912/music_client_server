import { model, Schema } from "mongoose"
import { IImage } from "../../interfaces/theme/image.interface"

const ImageSchema = new Schema({
    name: { type: Uint8ClampedArray, required: [true, "Field is required"] },
})

export const Image = model<IImage>("Pokemon", ImageSchema);