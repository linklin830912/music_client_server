import { model, Schema } from "mongoose";
import { IThemeData } from "../../interfaces/theme/themeData.interface";

const ThemeDataSchema = new Schema({
    mainColorR: { type: Number, required: [true, "Field is required"] },
    mainColorG: { type: Number, required: [true, "Field is required"] },
    mainColorB: { type: Number, required: [true, "Field is required"] },

    backgroundColorR: { type: Number, required: [true, "Field is required"] },
    backgroundColorG: { type: Number, required: [true, "Field is required"] },
    backgroundColorB: { type: Number, required: [true, "Field is required"] },

    contrastColorR: { type: Number, required: [true, "Field is required"] },
    contrastColorG: { type: Number, required: [true, "Field is required"] },
    contrastColorB: { type: Number, required: [true, "Field is required"] },
})

export const ThemeData = model<IThemeData>("ThemeData", ThemeDataSchema);