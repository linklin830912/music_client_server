import { Document } from 'mongoose';
export interface IRgbData extends Document{
    r: number;
    g: number;
    b: number;
}