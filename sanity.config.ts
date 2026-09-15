'use client'

import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './sanity/schemaTypes'
import { dataset, projectId } from './sanity/env'

export default defineConfig({
  name: 'default',
  title: 'Konuko Foundation',
  projectId: projectId || 'replace-me',
  dataset,
  basePath: '/studio',
  plugins: [structureTool()],
  schema: { types: schemaTypes },
})
