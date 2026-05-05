import { Dimensions, PixelRatio } from 'react-native';

const { width: W, height: H } = Dimensions.get('window');

/** Base design width (iPhone 14 Pro) */
const BASE_W = 393;

/** Scale a size value relative to the base design width. */
export function rs(size: number): number {
  return Math.round(PixelRatio.roundToNearestPixel((size * W) / BASE_W));
}

/** Width as a percentage of screen width. */
export function wp(pct: number): number {
  return (W * pct) / 100;
}

/** Height as a percentage of screen height. */
export function hp(pct: number): number {
  return (H * pct) / 100;
}

export const screen = { width: W, height: H };
export const isSmallPhone = W < 360;
export const isTablet = W >= 600;
