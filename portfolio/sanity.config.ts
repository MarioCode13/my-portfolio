import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'portfolio',

  projectId: 'zcsc2ikh',
  dataset: 'production',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },

  cors: {
    credentials: 'include',
    origin: [
      'http://localhost:5173',
      'http://localhost:3000',
      'https://your-netlify-site.netlify.app',
      'https://marioliebenberg.com'
    ]
  },
})
