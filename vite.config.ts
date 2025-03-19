import {defineConfig, loadEnv} from 'vite';
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({mode}) => {
    // const env = loadEnv(mode, process.cwd());
    const {GOOGLE_MAPS_API_KEY = ''} = loadEnv(mode, process.cwd(), '');
    return {
        plugins: [react()],
        define: {
          'process.env.GOOGLE_MAPS_API_KEY': JSON.stringify(GOOGLE_MAPS_API_KEY)
        },
        resolve: {
          alias: {
            '@vis.gl/react-google-maps/examples.js':
              'https://visgl.github.io/react-google-maps/scripts/examples.js'
          }
        }
    }
})
