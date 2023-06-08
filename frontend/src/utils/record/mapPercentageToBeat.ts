const maxValue = 240;
const minValue = 30;

export function mapPercentageToBeat(num: number): number {
  const value = (num * (maxValue - minValue)) / 100;
  return maxValue - Math.round(value);
}

export function mapBeatToPercentage(beat: number): number {
  const value = ((beat - minValue) * 100) / (maxValue - minValue);
  return 100 - Math.round(value);
}
