import ConsumableCategoryDataContext from "../store/ConsumableCategoryDataContext";

export interface Color {
  red: number;
  green: number;
  blue: number;
}

export const interpolate =
    (color1: Color, color2: Color, percent: number): Color => {
  const r = color1.red + percent * (color2.red - color1.red);
  const g = color1.green + percent * (color2.green - color1.green);
  const b = color1.blue + percent * (color2.blue - color1.blue);
  return {
    red: Math.trunc(Math.min(Math.max(color1.red, r), color2.red)),
    green: Math.trunc(Math.min(Math.max(color1.green, g), color2.green)),
    blue: Math.trunc(Math.min(Math.max(color1.blue, b), color2.blue)),
  }
}

export const getHex = (color: Color): string => {
  return `#${color.red.toString(16)}${color.green.toString(16)}${color.blue.toString(16)}`;
}
