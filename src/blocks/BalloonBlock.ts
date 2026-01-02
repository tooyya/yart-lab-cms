import type { Block } from 'payload'

export const BalloonBlock: Block = {
  slug: 'balloon',
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'iconUrl',
      type: 'text',
    },
    {
      name: 'position',
      type: 'select',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Right', value: 'right' },
      ],
      defaultValue: 'left',
    },
    {
      name: 'style',
      type: 'select',
      options: [
        { label: 'Standard', value: 'standard' },
        { label: 'Line', value: 'line' },
        { label: 'Think', value: 'think' },
      ],
      defaultValue: 'standard',
    },
    {
      name: 'text',
      type: 'textarea',
    },
  ],
}
