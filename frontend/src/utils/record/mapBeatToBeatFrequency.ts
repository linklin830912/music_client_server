export function mapBeatToBeatFrequency(beat: number): number {
  return Math.round(100 / (beat / 60));
}
