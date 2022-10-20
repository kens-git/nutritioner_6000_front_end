/** Defines an RGB color type. */
export interface Color {

  /** The red component. */
  red: number;

  /** The green component. */
  green: number;

  /** The blue component. */
  blue: number;
}

/**
 * Linearly interpolates between two Colors.
 * 
 * @param color1 The starting color.
 * @param color2 The ending color.
 * @param percent The percentage to interpolate, in the range [0, 1].
 * @returns The interpolated color.
 */
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

/**
 * Converts a Color to a hex string.
 * 
 * @param color The color to convert.
 * @returns The hex string.  
 */
export const getHex = (color: Color): string => {
  return `#${color.red.toString(16)}${color.green.toString(16)}${color.blue.toString(16)}`;
}
