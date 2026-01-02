import type { Block } from 'payload'

export const EmbedBlock: Block = {
  slug: 'embed',
  fields: [
    {
      name: 'url',
      type: 'text',
      required: true,
    },
    {
      name: 'provider',
      type: 'text',
    },
  ],
}
