import { Note } from "../../enum/frequency/Note";

const a0 = 27.5;
const a0Enum = Note[1];
export function convertNumberToFrequency(number: number): number {
  return a0 * Math.pow(2, number / 12);
}
