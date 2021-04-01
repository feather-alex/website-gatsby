export const COLORS = {
  // brand-refresh colors:
  POPPY: '#E9672B',
  OAT: '#DBD6CC',
  CLOUD: '#F3F0EC',
  CREAM: '#FBF8F5',
  SNOW: '#FFFFFF',
  SHADOW: '#000000',
  MINT: '#A2D4C5',
  YVES: '#225DCA',
  BLACKBERRY: '#242947',
  OLIVE: '#232C07',
  CITRON: '#CDD454',
  LILAC: '#CBC6F4',
  DANDELION: '#E7CB43',
  CHERRY: '#DE4333',
  SUMAC: '#AF4920',
  BLUSH: '#F6CFCA',

  BRAND_GREEN: '#3B705F', // needed for the account history table

  CLOUD_HOVER: '#DCD6CC',

  // v4 colors:
  STANDARD_BUTTON_HOVER: '#DE5212',
  INVERTED_BUTTON_HOVER: '#F3F0EC',
  SECONDARY_BUTTON_HOVER: '#C7C1B8',
  BACKGROUND_LIGHT: 'rgba(255, 255, 255, 0.45)',

  BRAND_OFF_WHITE: '#ECE2D8',
  BRAND_RED: '#D97968',
  BRAND_DARK_TEAL: '#274D58',
  BRAND_TEAL: '#80BCBD',
  GRAY_20: '#333333',
  GRAY_31: '#4F4F4F',
  GRAY_51: '#828282',
  GRAY_74: '#BDBDBD'
  // used https://www.december.com/html/spec/colorcodes.html
  // to determine color name for grays
};

export const SHADES = {
  BLACK: COLORS.SHADOW,
  SHADE_DARKER: COLORS.GRAY_20,
  SHADE_DARK: COLORS.GRAY_31,
  SHADE_LIGHT: COLORS.GRAY_51,
  SHADE_LIGHTER: COLORS.GRAY_74,
  WHITE: COLORS.SNOW
};

export const BRAND = {
  PRIMARY_TEXT: SHADES.BLACK,
  SECONDARY_TEXT: SHADES.SHADE_DARK,
  PRIMARY: COLORS.POPPY,
  ACCENT: SHADES.SHADE_LIGHTER,
  ACCENT_2: COLORS.BRAND_TEAL, // TODO: convert to BRAND.PRIMARY_TEXT
  BACKGROUND: COLORS.CREAM,
  ERROR: COLORS.CHERRY
};

export const FONTS = {
  PRIMARY: 'Centra No2',
  ACCENT: 'Ogg'
};

export const MARGINS = {
  DESKTOP: '16px',
  MOBILE: '24px'
};

export const BREAKPOINTS = {
  MOBILE: 'screen and (max-width: 768px)',
  BANNER: 'screen and (max-width: 1117px)',
  DESKTOP: 'screen and (min-width: 769px)'
};

export const GRID_BREAKPOINTS = {
  MOBILE: 'screen and (max-width: 667px)',
  TABLET: 'screen and (max-width: 1193px)',
  DESKTOP: 'screen and (min-width: 1194px)'
};
