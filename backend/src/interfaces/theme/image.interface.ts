import { Document } from 'mongoose';

export interface IImage extends Document {
    data: Uint8ClampedArray
}