/** @type {import("tailwindcss").Config} */
const headerHeight = "171px";
const mobileFooterNavHeight = "60px";
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      keyframes: {
        "enter": {
          "0%": {
            opacity: "0",
            transform: "translateY(50px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateX(0)",
          },
        }
      },
      fontFamily: {
        "SGL": ["Sharp Grotesk Light", "sans-serif"],
        "SGB": ["Sharp Grotesk Book", "sans-serif"],
        "OUP": ["oup", "sans-serif"]
      },
      height: {
        "mfnav-h": mobileFooterNavHeight,
        "header-height": headerHeight,
        "drawer-mobile": `calc(100vh - ${mobileFooterNavHeight}})`
      },
      width: {
        main: "1300px"
      },
      maxWidth: {
        main: "1300px"
      },
      padding: {
        "header-height": headerHeight
      },
      margin: {
        "mfnav-h": mobileFooterNavHeight
      },
      colors: {
        main: "#00addb",
        mainText22: "#222222",
        mainText99: "#707072",
        mainTextHover: "#00addb",
        themePrimary50: "#E6F0FF",
        themePrimary100: "#CCE1FF",
        themePrimary200: "#99C2FF",
        themePrimary300: "#66A2FF",
        themePrimary400: "#3383FF",
        themePrimary500: "#0064FF",
        themePrimary600: "#4d85f5",
        themePrimary700: "#004EAD",
        themePrimary800: "#00428A",
        themePrimary900: "#003667",
        themeSecondary50: "#fafafa",
        themeSecondary100: "#f4f4f5",
        themeSecondary200: "#e4e4e7",
        themeSecondary300: "#d4d4d8",
        themeSecondary400: "#a1a1aa",
        themeSecondary500: "#71717A",
        themeSecondary600: "#52525b",
        themeSecondary700: "#3f3f46",
        themeSecondary800: "#27272a",
        themeSecondary900: "#18181b",
        themeSuccess50: "#ecfdf5",
        themeSuccess100: "#d1fae5",
        themeSuccess200: "#a7f3d0",
        themeSuccess300: "#6ee7b7",
        themeSuccess400: "#34d399",
        themeSuccess500: "#10b981",
        themeSuccess600: "#059669",
        themeSuccess700: "#047857",
        themeSuccess800: "#065f46",
        themeSuccess900: "#064e3b",
        themeWarning50: "#fffbeb",
        themeWarning100: "#fef3c7",
        themeWarning200: "#fde68a",
        themeWarning300: "#fcd34d",
        themeWarning400: "#fbbf24",
        themeWarning500: "#f59e0b",
        themeWarning600: "#d97706",
        themeWarning700: "#b45309",
        themeWarning800: "#92400e",
        themeWarning900: "#78350f",
        themeDanger50: "#fef2f2",
        themeDanger100: "#fee2e2",
        themeDanger200: "#fecaca",
        themeDanger300: "#fca5a5",
        themeDanger400: "#f87171",
        themeDanger500: "#ef4444",
        themeDanger600: "#dc2626",
        themeDanger700: "#b91c1c",
        themeDanger800: "#991b1b",
        themeDanger900: "#7f1d1d",
        themeInfo50: "#ecfeff",
        themeInfo100: "#cffafe",
        themeInfo200: "#a5f3fc",
        themeInfo300: "#67e8f9",
        themeInfo400: "#22d3ee",
        themeInfo500: "#06b6d4",
        themeInfo600: "#0891b2",
        themeInfo700: "#0e7490",
        themeInfo800: "#155e75",
        themeInfo900: "#164e63",
        themeLightWhite: "#1B2631",
        themeRgbaColor: "rgba(255, 255, 255, 0.7)",
        themeRgbaColorTwo: "rgba(255, 255, 255, 0.2)",
        themeGraylight: "#6B7280",
        themBlack: "#18181B",
        themWhite: "#F1F5F9",
        themeGray: "#64748B",
        thmeBlackLight: "#1F2937",
        // checkoutflow-colors
        themeLightGray: "#F4F7FB",
        themeDark: "#2E4053",
        orangeOne: "#FFAB90",
        orangeTwo: "#FF4307",
        blueOne: "#75B1FF",
        blueTwo: "#056BF1",
        purpleLight: "#B593FF",
        purpleDark: "#6726F2",
        primaryGreen: "#4AAD4E",
        greenLight: "#67E5A3",
        greenDark: "#08994D",
        yellowLight: "#FFD470",
        yellowDark: "#FB9600",
        redLight: "#FF7E85",
        redDark: "#FF2632",
        themeNevyLight: "#5D6D7E",
        themeRedLight: "#DE0404"
      },
      boxShadow: {
        dropShadowXs: "0px 1px 1px rgba(24, 24, 27, 0.03), 0px 2px 4px rgba(24, 24, 27, 0.06)",
        dropShadowSm: " 0px 2px 3px rgba(24, 24, 27, 0.02), 0px 4px 8px rgba(24, 24, 27, 0.06)",
        dropShadowMd: "0px 2px 4px rgba(24, 24, 27, 0.03), 0px 6px 12px rgba(24, 24, 27, 0.08)",
        dropShadowLg: "0px 8px 16px rgba(24, 24, 27, 0.08)",
        dropShadowXl: "0px 12px 24px rgba(24, 24, 27, 0.08)",
        dropShadow2xl: "0px 24px 48px rgba(24, 24, 27, 0.12)",
        boxShaddowxl: "0px -8px 24px rgba(15, 23, 42, 0.15)"
      }
    },
    plugins: [require("@tailwindcss/line-clamp")]
  }
};
