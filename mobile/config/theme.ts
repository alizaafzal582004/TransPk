// TransPk — Design System (Icy Glass + Indigo)
export const theme = {
  colors: {
    bg: '#eef0fb',
    bgSoft: '#f5f6fd',

    glass: 'rgba(255, 255, 255, 0.72)',
    glassBorder: 'rgba(255, 255, 255, 0.95)',
    glassSoft: 'rgba(255, 255, 255, 0.5)',

    primary: '#1a1a3c',       // deep navy-black (title)
    accent: '#6C5CE7',        // indigo/purple
    accentSoft: 'rgba(108, 92, 231, 0.12)',
    accentLight: '#a89cf0',

    textDark: '#1a1a3c',
    textMed: '#5a6a8a',
    textLight: '#9aa5c0',
    silver: '#d7dced',

    success: '#2e9e6b',
    successBg: 'rgba(46, 158, 107, 0.12)',
    warning: '#c98a1a',
    warningBg: 'rgba(201, 138, 26, 0.12)',
    danger: '#d15a5a',
    dangerBg: 'rgba(209, 90, 90, 0.12)',
  },
  radius: { sm: 10, md: 18, lg: 26, pill: 30 },
  shadow: {
    card: {
      shadowColor: '#6C5CE7',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.10,
      shadowRadius: 20,
      elevation: 4,
    },
    glow: {
      shadowColor: '#6C5CE7',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.4,
      shadowRadius: 16,
      elevation: 8,
    },
    soft: {
      shadowColor: '#1a1a3c',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.06,
      shadowRadius: 8,
      elevation: 2,
    },
  },
  spacing: { xs: 6, sm: 10, md: 16, lg: 24, xl: 32 },
};
