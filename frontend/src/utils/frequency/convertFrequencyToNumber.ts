import { Note } from "../../enum/frequency/Note";

const a0 = 27.5;
const a0Enum = Note[1];

function getBaseLog(num: number): number {
  return Math.log(num) / Math.log(2);
}
function round(number: number, round: number): number {
  return Math.round(number * Math.pow(10, round)) / Math.pow(10, round);
}
export function convertFrequencyToNumber(frequency: number): number {
  const num = round(12 * getBaseLog(frequency / a0), 1);
  return num > 0 ? num : 0;
}
