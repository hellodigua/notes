/**
 * 查询iOS设备型号
 */

const devices = {
  'Apple A7 GPU': {
    1136: ['iPhone 5', 'iPhone 5s'],
    2048: ['iPad Air', 'iPad Mini 2', 'iPad Mini 3']
  },
  'Apple A8 GPU': {
    1136: ['iPod touch (6th generation)'],
    1334: ['iPhone 6'],
    2001: ['iPhone 6 Plus'],
    2048: ['iPad Air 2', 'iPad Mini 4']
  },
  'Apple A9 GPU': {
    1136: ['iPhone SE'],
    1334: ['iPhone 6s'],
    2001: ['iPhone 6s Plus'],
    2224: ['iPad Pro (9.7-inch)'],
    2732: ['iPad Pro (12.9-inch)']
  },
  'Apple A10 GPU': {
    1334: ['iPhone 7'],
    2001: ['iPhone 7 Plus']
  },
  'Apple A11 GPU': {
    1334: ['iPhone 8'],
    2001: ['iPhone 8 Plus'],
    2436: ['iPhone X']
  },
  'Apple A12 GPU': {
    2436: ['iPhone XS'],
    2688: ['iPhone XS Max'],
    1792: ['iPhone XR']
  }
};

let canvas = null,
  gl = null,
  glRenderer = null,
  models = null;

const getCanvas = () => {
  if (canvas === null) {
    canvas = document.createElement('canvas');
  }

  return canvas;
};

const getGl = () => {
  if (gl === null) {
    gl = getCanvas().getContext('experimental-webgl');
  }

  return gl;
};

const getScreenWidth = () => {
  return Math.max(screen.width, screen.height) * (window.devicePixelRatio || 1);
};

const getGlRenderer = () => {
  if (glRenderer === null) {
    const debugInfo = getGl().getExtension('WEBGL_debug_renderer_info');
    glRenderer = debugInfo === null ? 'unknown' : getGl().getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
  }

  return glRenderer;
};

export const getDevice = () => {
  if (models === null) {
    const device = devices[getGlRenderer()];

    if (device === undefined) {
      models = ['unknown'];
    } else {
      models = device[getScreenWidth()];

      if (models === undefined) {
        models = ['unknown'];
      }
    }
  }

  return models;
};
