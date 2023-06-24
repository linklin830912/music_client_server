import { Document } from 'mongoose';
import { RgbDataType } from '../../immutable types/theme/rgbData.type';
export interface IThemeData extends Document{
    mainColor: RgbDataType,
    backgroundColor: RgbDataType,
    contrastColor: RgbDataType,
    useId: string
}