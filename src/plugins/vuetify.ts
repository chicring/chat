/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'
import { md3 } from 'vuetify/blueprints'
import '@mdi/font/css/materialdesignicons.css'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides



const myCustomLightTheme = {
  dark: false,
  colors: {
    background: '#FFFBFE',
    'background-1': '#F2ECF4', // 这里用黑色作为background的文字颜色，你可以修改为实际需要的颜色
    surface: '#FFFBFE',
    'on-surface': '#1C1B1F', // 这里用黑色作为surface的文字颜色，你可以修改为实际需要的颜色
    'surface-variant': '#E7E0EC',
    'on-surface-variant': '#49454F',
    'outline': '#79747E', // 这里用灰色作为边框颜色，你可以修改为实际需要的颜色
    primary: '#6750A4',
    'on-primary': '#FFFFFF', // 这里用白色作为primary的文字颜色，你可以修改为你需要的颜色
    'primary-container': '#EADDFF', // 这里用深蓝色作为primary的容器颜色，你可以修改为你需要的颜色
    'on-primary-container': '#21005D',
    secondary: '#625B71',
    'on-secondary': '#FFFFFF', // 这里用白色作为secondary的文字颜色，你可以修改为你需要的颜色
    'secondary-container': '#E8DEF8', // 这里用深灰色作为secondary容器的颜色，你可以修改为你需要的颜色
    'on-secondary-container': '#1D192B',
    tertiary: '#7D5260', // 这里用灰色作为tertiary的颜色，你可以修改为实际需要的颜色
    'on-tertiary': '#FFFFFF', // 这里用黑色作为tertiary的文字颜色，你可以修改为实际需要的颜色
    'tertiary-container': '#FFD8E4', // 这里用深灰色作为tertiary容器的颜色，你可以修改为你需要的颜色
    'on-tertiary-container': '#31111D',
    error: '#B3261E',
    'on-error': '#FFFFFF', // 这里用白色作为error的文字颜色，你可以修改为你需要的颜色
    'error-container': '#F9DEDC', // 这里用深红色作为error容器的颜色，你可以修改为你需要的颜色
    'on-error-container': '#410E0B',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00',
  },
  variables: {
    'border-color': '#000000',
    'border-opacity': 0.12,
    'high-emphasis-opacity': 0.87,
    'medium-emphasis-opacity': 0.60,
    'disabled-opacity': 0.38,
    'idle-opacity': 0.04,
    'hover-opacity': 0.04,
    'focus-opacity': 0.12,
    'selected-opacity': 0.08,
    'activated-opacity': 0.12,
    'pressed-opacity': 0.12,
    'dragged-opacity': 0.08,
    'theme-kbd': '#212529',
    'theme-on-kbd': '#FFFFFF',
    'theme-code': '#F5F5F5',
    'theme-on-code': '#000000',
  }
}

const myCustomDarkTheme = {
  dark: true,
  colors: {
    background: '#1C1B1F',
    'background-1': '#211F24', // 这里用黑色作为background的文字颜色，你可以修改为实际需要的颜色
    'on-background': '#E6E1E5', // 这里用黑色作为background的文字颜色，你可以修改为实际需要的颜色
    surface: '#1C1B1F',
    'on-surface': '#E6E1E5', // 这里用黑色作为surface的文字颜色，你可以修改为实际需要的颜色
    'surface-variant': '#49454F',
    'on-surface-variant': '#CAC4D0',
    'outline': '#938F99', // 这里用灰色作为边框颜色，你可以修改为实际需要的颜色
    primary: '#D0BCFF',
    'on-primary': '#381E72', // 这里用白色作为primary的文字颜色，你可以修改为你需要的颜色
    'primary-container': '#4F378B', // 这里用深蓝色作为primary的容器颜色，你可以修改为你需要的颜色
    'on-primary-container': '#EADDFF',
    secondary: '#CCC2DC',
    'on-secondary': '#332D41', // 这里用白色作为secondary的文字颜色，你可以修改为你需要的颜色
    'secondary-container': '#4A4458', // 这里用深灰色作为secondary容器的颜色，你可以修改为你需要的颜色
    'on-secondary-container': '#E8DEF8',
    tertiary: '#EFB8C8', // 这里用灰色作为tertiary的颜色，你可以修改为实际需要的颜色
    'on-tertiary': '#492532', // 这里用黑色作为tertiary的文字颜色，你可以修改为实际需要的颜色
    'tertiary-container': '#633B48', // 这里用深灰色作为tertiary容器的颜色，你可以修改为你需要的颜色
    'on-tertiary-container': '#FFD8E4',
    error: '#F2B8B5',
    'on-error': '#601410', // 这里用白色作为error的文字颜色，你可以修改为你需要的颜色
    'error-container': '#8C1D18', // 这里用深红色作为error容器的颜色，你可以修改为你需要的颜色
    'on-error-container': '#F9DEDC',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00',
  },
  variables: {
    'border-color': '#000000',
    'border-opacity': 0.12,
    'high-emphasis-opacity': 0.87,
    'medium-emphasis-opacity': 0.60,
    'disabled-opacity': 0.38,
    'idle-opacity': 0.04,
    'hover-opacity': 0.04,
    'focus-opacity': 0.12,
    'selected-opacity': 0.08,
    'activated-opacity': 0.12,
    'pressed-opacity': 0.12,
    'dragged-opacity': 0.08,
    'theme-kbd': '#212529',
    'theme-on-kbd': '#FFFFFF',
    'theme-code': '#F5F5F5',
    'theme-on-code': '#000000',
  }
}

export default createVuetify({
  blueprint: md3,
  icons: {
    defaultSet: 'mdi',
  },
  theme: {
    defaultTheme: 'myCustomLightTheme',
    themes: {
      myCustomLightTheme,
      myCustomDarkTheme
    }
  },

})
