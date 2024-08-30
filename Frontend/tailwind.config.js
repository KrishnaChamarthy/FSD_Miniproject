/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    theme: {
      extend: {
        colors: {
          bodyColor: '#E4E9F7',
          sidebarColor: '#FFF',
          primaryColor: '#3071d8',
          primaryColorGradient: {
            light: '#90aeeb',
            DEFAULT: '#3071d8',
          },
          toggleColor: '#DDD',
          primaryColorLight: '#F6F5FF',
          textColor: '#707070',
          titleColor: '#3C3C3C',
          dark: {
            bodyColor: '#18191A',
            sidebarColor: '#242526',
            primaryColor: '#3A3B3C',
            primaryColorGradient: {
              light: '#4a4b4d',
              DEFAULT: '#252627',
            },
            toggleColor: '#FFF',
            primaryColorLight: '#3A3B3C',
            textColor: '#CCC',
            titleColor: '#E6E6E6',
          },
        },
        transitionTimingFunction: {
          'tran-02': 'ease 0.2s',
          'tran-03': 'ease 0.3s',
          'tran-04': 'ease 0.4s',
          'tran-05': 'ease 0.5s',
        },
      },
    },
  },
  plugins: [],
}

