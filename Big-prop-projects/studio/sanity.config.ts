import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {structure} from './structure'

export default defineConfig({
  name: 'default',
  title: 'Big Prop Projects',

  projectId: 'df6rlsmo',
  dataset: 'production',

  plugins: [structureTool({structure}), visionTool({defaultApiVersion: '2026-10-05'})],

  schema: {
    types: schemaTypes,
  },
})
