/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#E5F7F0',
          100: '#99E6C7',
          500: '#008A56',
          600: '#006F46',
          700: '#00633D',
        },
        gray: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
        },
      },
      spacing: {
        '60': '60px',
        '220': '220px',
        '320': '320px',
      },
      borderRadius: {
        '6': '6px',
        '8': '8px',
      },
      fontSize: {
        '11': '11px',
        '12': '12px',
        '13': '13px',
        '14': '14px',
        '15': '15px',
        '16': '16px',
        '32': '32px',
      },
      fontWeight: {
        '500': '500',
        '600': '600',
        '700': '700',
      },
      boxShadow: {
        'sm': '0 1px 2px rgba(0, 0, 0, 0.05)',
        'md': '0 4px 6px rgba(0, 0, 0, 0.1)',
        'focus': '0 0 0 3px rgba(0, 111, 70, 0.1)',
      },
      gridTemplateColumns: {
        'table': '40px 160px 220px 160px 200px 140px 100px 120px 120px 40px',
        'table-mobile': '1fr',
        'layout': '220px 1fr',
        'layout-mobile': '1fr',
        'detail': '1fr 320px',
        'detail-mobile': '1fr',
      },
      gridTemplateRows: {
        'layout': '60px 1fr',
      },
      screens: {
        'xs': '475px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
      transitionProperty: {
        'all': 'all',
      },
      transitionDuration: {
        '150': '150ms',
        '200': '200ms',
      },
      transitionTimingFunction: {
        'ease': 'ease',
      },
    },
  },
  plugins: [],
}
