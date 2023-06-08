const tolerance = 1; //distance when determine cluster
const resol = 64; //shrink rgb 256

export async function mapImageDataToUniqueRgbClusters(
  data: Uint8ClampedArray,
  canvasWidth: number
) {
  let rgb = await createRgbArray(data);
  const isFamilliar = getNeighborFamilliar(data, canvasWidth);

  rgb = filterFamilliar(rgb, isFamilliar);
  const colors = await gridAnalysis(rgb);
  return colors;
}

function createRgbArray(data: Uint8ClampedArray) {
  const initArray2d = [] as Uint8ClampedArray[];

  data.forEach((val, index, array) => {
    if (index % 4 === 0) {
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

function getNeighborFamilliar(data: Uint8ClampedArray, width: number) {
  const result = [] as boolean[];
  data.forEach((val, index, array) => {
    if (index % 4 === 0) {
      // x direction
      const isNotNeighborX =
        Math.abs(val - array[index + 4]) > tolerance ||
        Math.abs(array[index + 1] - array[index + 5]) > tolerance ||
        Math.abs(array[index + 2] - array[index + 6]) > tolerance ||
        Math.abs(val - array[index + 8]) > tolerance ||
        Math.abs(array[index + 1] - array[index + 9]) > tolerance ||
        Math.abs(array[index + 2] - array[index + 10]) > tolerance
          ? true
          : false;

      //y direction
      const isNotNeighborY =
        Math.abs(val - array[index + width * 3]) > tolerance ||
        Math.abs(array[index + 1] - array[index + 1 + width * 3]) > tolerance ||
        Math.abs(array[index + 2] - array[index + 2 + width * 3]) > tolerance
          ? true
          : false;

      result.push(!(isNotNeighborX && isNotNeighborY));
    }
  });
  return result;
}
function filterFamilliar(rgb: Uint8ClampedArray[], isFamilliar: boolean[]) {
  let result = rgb.filter((val, index) => isFamilliar[index]);
  return result;
}

function gridAnalysis(rgb: Uint8ClampedArray[]) {
  const gridSize = 64;

  let colors = [] as Uint8ClampedArray[][];

  for (let r = 0; r < 256; r = r + gridSize) {
    for (let g = 0; g < 256; g = g + gridSize) {
      for (let b = 0; b < 256; b = b + gridSize) {
        let uniqueColors = [] as Uint8ClampedArray[];

        const cluster = rgb.filter(
          (val) =>
            val[0] >= r &&
            val[0] < r + gridSize &&
            val[1] >= g &&
            val[1] < g + gridSize &&
            val[2] >= b &&
            val[2] < b + gridSize
        );
        let clusterString = cluster.map((x) => JSON.stringify(x));
        clusterString.forEach((x, index, array) => {
          if (array.indexOf(x) === index) {
            uniqueColors.push(cluster[index]);
          }
        });

        if (uniqueColors.length > 0) {
          colors.push(uniqueColors);
        }
      }
    }
  }

  return colors;
}

export function mapToRgbString(rgb: Uint8ClampedArray[]) {
  const result = [] as string[];
  rgb.forEach((x) => {
    result.push(`rgb(${x[0]}, ${x[1]}, ${x[2]})`);
  });
  return result;
}
