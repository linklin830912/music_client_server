import { IImageData } from "../../../interfaces/theme/imageData.interface";
import { IRgbData } from "../../../interfaces/theme/rgbData.interface";

const interval = 3;
const tolerance = 1;
const neighborCount = 3;

export async function convertImageToRgb(imageData: IImageData, _count: number): Promise<IRgbData[]> {
    //!!!todo color picker algo here
    
    const data = mapUint8ClampedArrayTo2d(imageData.data);
    const dataIsSimilar = mapToIsSimilar(imageData.data, imageData.width);
    console.log("!!!data", data);
    console.log("!!!dataIsSimilar", dataIsSimilar);
    // const rgb = await new RgbDataType();

    // rgb.r = 99;
    // rgb.g = 99;
    // rgb.b = 99;

    // return new Array(count).fill(rgb);
    return [] as IRgbData[];
}

function mapUint8ClampedArrayTo2d(imageData: Uint8ClampedArray):Uint8ClampedArray[] {
    const initArray2d = [] as Uint8ClampedArray[];
    imageData.forEach((_val, index, array) => {
        if (index % interval === 0) {
          initArray2d.push(
            new Uint8ClampedArray([
              array[index],
              array[index + 1],
              array[index + 2],
            ])
          );
        }
    });
    return initArray2d;
}

function mapToIsSimilar(data: Uint8ClampedArray, imageWidth: number):boolean[] {
    const result = [] as boolean[];

    for (let i = 0; i < Math.round(data.length/interval); i++) { 
        const index = i * interval;

        const isSimilarX = isSimilarToNeighborX(data, index, neighborCount);
        const isSimilarY = isSimilarToNeighborY(data, index, neighborCount, imageWidth);

        result.push(isSimilarX || isSimilarY);
    }
    
    return result;
}
function isSimilarToNeighborX(array: Uint8ClampedArray, index: number, neighborCount: number): boolean { 
    let isSimilarX = false;
    const arraySliced = array.slice(index, index+neighborCount* interval)
    
    for (let i = 0; i < neighborCount; i++) { 
        isSimilarX = (
            Math.abs(arraySliced[0] - arraySliced[(i+1)*interval]) > tolerance &&
            Math.abs(arraySliced[1] - arraySliced[(i+1)*interval+1]) > tolerance &&
            Math.abs(arraySliced[2] - arraySliced[(i + 1) * interval + 2]) > tolerance
        );
        
        if (isSimilarX) {
            return true;
        }
    }

    return isSimilarX;     
}
function isSimilarToNeighborY(array: Uint8ClampedArray, index: number, neighborCount: number, imageWidth:number): boolean { 
    let isSimilarY = false;

    const arraySliced = array.slice(index, index + interval)
    
    for (let i = 0; i < neighborCount; i++) {
        const arraySlicedCompare = array.slice(index + (i+1)*imageWidth*interval, index + (i+1)*imageWidth*interval + interval);

        isSimilarY = (
            Math.abs(arraySliced[0] - arraySlicedCompare[0]) > tolerance &&
            Math.abs(arraySliced[1] - arraySlicedCompare[1]) > tolerance &&
            Math.abs(arraySliced[2] - arraySlicedCompare[2]) > tolerance
        );
        
        
        if (isSimilarY) {
            return true;
        }
    }

    return isSimilarY;     
}