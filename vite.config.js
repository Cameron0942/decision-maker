import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/decision-maker/',
  plugins: [react()],
  // css: {
  //   preprocessorOptions: {
  //     scss: {
  //       additionalData: `@import "src/pages/decision-new/DecisionNew.scss";`, // Replace with the correct path to your SCSS file
  //     },
  //   },
  // },
  optimizeDeps: {
    include: ['axios'],
  },
})
