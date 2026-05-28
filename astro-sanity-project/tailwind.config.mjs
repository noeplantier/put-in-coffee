/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{astro,html,js,jsx,ts,tsx}',
    './public/**/*.html',
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Playfair Display', 'Georgia', 'serif'],
      },
      colors: {
        pc: {
          // Marine bleu nuit
          bg: '#0f1419',
          bg2: '#1a1f2e',
          bg3: '#252d3d',
          
          // Textes
          text: '#ffffff',
          cream: '#f0f0f0',
          muted: '#b0b8c4',
          
          // Sunset: or/orange/rouge
          gold: '#ffa500',
          sunset: '#ff6b35',
          amber: '#ffb84d',
          coral: '#ff7f50',
          deep: '#c41e3a',
        },
      },
      maxWidth: {
        container: '1280px',
      },
      borderRadius: {
        pill: '9999px',
      },
      boxShadow: {
        'gold-lg': '0 20px 60px rgba(255, 165, 0, 0.25)',
        'sunset-lg': '0 20px 60px rgba(255, 107, 53, 0.25)',
        'card': '0 10px 30px rgba(0, 0, 0, 0.5)',
        'inner-glow': 'inset 0 0 30px rgba(255, 165, 0, 0.1)',
      },
      backgroundImage: {
        'gradient-sunset': 'linear-gradient(135deg, #ffa500 0%, #ff6b35 50%, #c41e3a 100%)',
        'gradient-night': 'linear-gradient(135deg, #0f1419 0%, #1a1f2e 50%, #252d3d 100%)',
        'gradient-text-sunset': 'linear-gradient(135deg, #ffb84d 0%, #ff6b35 100%)',
      },
      animation: {
        shimmer: 'shimmer 2s infinite',
        'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
        'sunset-float': 'sunset-float 6s ease-in-out infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
        'glow-pulse': {
          '0%, 100%': { opacity: 1, boxShadow: '0 0 20px rgba(255, 165, 0, 0.3)' },
          '50%': { opacity: 0.8, boxShadow: '0 0 40px rgba(255, 165, 0, 0.5)' },
        },
        'sunset-float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      spacing: {
        nav: '80px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
}