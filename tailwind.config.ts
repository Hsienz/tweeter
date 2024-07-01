import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
      },
      colors: {
        font_dark_gray: '#333333',
        font_gray: '#828282',
        font_light_gray: '#BDBDBD',
        background_gray: '#F2F2F2',
        font_green: '#27AE60',
        font_red: '#EB5757',
        font_blue: '#2D9CDB',
        break_gray: '#E0E0E0',
        icon_blue: '#2F80ED',
      },
    },
  },
  plugins: [],
} satisfies Config;
