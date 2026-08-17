const config = {
  content: ['./src/app/**/*.{js,jsx,mdx}'],
  theme: {
    extend: {
      colors: { ink: '#19221E', moss: '#47735B', mist: '#F3F6F2', peach: '#FFB899' },
      boxShadow: { soft: '0 16px 40px rgba(32, 55, 43, 0.10)' }
    }
  },
  plugins: []
};

module.exports = config;
