import colorsPL from '../const/colors-pl';
import colorsEN from '../const/colors-en';


const hexRegex = /^[0-9a-fA-F]+$/;

const isHexColor = hex => hex.length === 6 && hexRegex.test(hex);

const rgbToHex = rgb => rgb.toString(16);

const hexToRgb = hex => parseInt(hex, 16);

const hexToArray = hex => [hex.slice(0, 2), hex.slice(2,4), hex.slice(4,6)];

const getRandomColor = () => [...Array(3)].map(() => rgbToHex(Math.floor(Math.random()* 255))).join('');
const getRandomColorFromData = (lang = 'en') => {
  const colors = lang === 'en' ? colorsEN : colorsPL;
  colors[Math.floor(Math.random()* colors.length)].hex.slice(1);
}

const euclideanDistance = (hex1, hex2) => {
  const rgb1 = hexToArray(hex1).map(hexToRgb);
  const rgb2 = hexToArray(hex2).map(hexToRgb);

  return Math.sqrt(Math.pow(rgb1[0] - rgb2[0],2) + Math.pow(rgb1[1] - rgb2[1],2) + Math.pow(rgb1[2] - rgb2[2],2));
}

const getClosestColor = (hex, lang = 'en', distanceFunction = euclideanDistance ) => {
  const colors = lang === 'en' ? colorsEN : colorsPL;
  const withDistances = colors.map(color => ({
    ...color,
    distance: distanceFunction(color.hex.slice(1), hex)
  }));

  const min = Math.min(...withDistances.map(color => color.distance));

  const closest = withDistances.find(color => color.distance === min);

  return {
    original: hex,
    closest
  }
}

const isColorDark = hex => {
  const rgb = hexToArray(hex).map(hexToRgb);

  return rgb.reduce((a,b) => a + b) < 360;
}

const translations = {
  en: {
    YOU_PICKED: 'You picked',
    CLOSEST_COLOR: 'Closest color'
  },
  pl: {
    YOU_PICKED: 'Wybrany',
    CLOSEST_COLOR: 'Najbliższy znaleziony'
  }
}

export {
  isHexColor,
  getRandomColor,
  getRandomColorFromData,
  getClosestColor,
  translations,
  isColorDark
}
