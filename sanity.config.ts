import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { codeInput } from '@sanity/code-input'
import { schemaTypes } from './sanity/schemaTypes'

if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
  throw new Error('NEXT_PUBLIC_SANITY_PROJECT_ID is not set in .env.local')
}
if (!process.env.NEXT_PUBLIC_SANITY_DATASET) {
  throw new Error('NEXT_PUBLIC_SANITY_DATASET is not set in .env.local')
}

export default defineConfig({
  name: 'warad-portfolio',
  title: 'Warad Portfolio',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  basePath: '/studio',
 plugins: [
  structureTool({
    title: 'Content',
    structure: (S) =>
      S.list()
        .title('Content')
        .items([
          S.listItem().title('Blog Posts').schemaType('post').child(S.documentTypeList('post')),
          S.listItem().title('Projects').schemaType('project').child(S.documentTypeList('project')),
          S.listItem().title('Certificates').schemaType('certificate').child(S.documentTypeList('certificate')),
          S.listItem().title('Roadmap').schemaType('roadmap').child(S.documentTypeList('roadmap')),
        ]),
  }),
  visionTool(),
  codeInput(),
],
  schema: { types: schemaTypes },
})
