export class colorPalette {
  constructor(
    mainColor: string,
    backgroundColor: string,
    contrastColor: string
  ) {
    this.mainColor = mainColor;
    this.backgroundColor = backgroundColor;
    this.contrastColor = contrastColor;
    this.colorArray = [
      this.mainColor,
      this.backgroundColor,
      this.contrastColor,
    ];
  }
  mainColor: string;
  backgroundColor: string;
  contrastColor: string;
  colorArray: string[];

  public getColorArray(): string[] {
    return [this.mainColor, this.backgroundColor, this.contrastColor];
  }
}
export function getColorPaletteClass(colorArray: string[]): colorPalette {
  return new colorPalette(colorArray[0], colorArray[1], colorArray[2]);
}
