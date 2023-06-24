import { model, Schema } from "mongoose"
import { IRgbData } from "../../interfaces/theme/rgbData.interface";

const RgbDataSchema = new Schema({
    r: { type: Number, required: [true, "Field is required"] },
    g: { type: Number, required: [true, "Field is required"] },
    b: { type: Number, required: [true, "Field is required"] },
})

export const RgbData = model<IRgbData>("RgbData", RgbDataSchema);