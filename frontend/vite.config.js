import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
const Dotenv = require('dotenv-webpack');

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),
    new Dotenv({
      path: './.env', // load this now instead of the ones in '.env'
      safe: true, // load '.env.example' to verify the '.env' variables are all set. Can also be a string to a different file.
      allowEmptyValues: true, // allow empty variables (e.g. `FOO=`) (treat it as empty string, rather than missing)
      systemvars: true, // load all the predefined 'process.env' variables which will trump anything local per dotenv specs.
      silent: true, // hide any errors
      defaults: false, // load '.env.defaults' as the default values if empty.
      prefix: 'import.meta.env.'
  })],
  






 

})
