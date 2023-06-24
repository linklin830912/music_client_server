import { Document } from 'mongoose';

export interface IImageData extends Document {
    data: Uint8ClampedArray
    width: number;
    height: number;
}