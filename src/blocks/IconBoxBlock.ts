import type { Block } from 'payload'

export const IconBoxBlock: Block = {
  slug: 'iconBox',
  fields: [
    {
      name: 'type',
      type: 'select',
      options: [
        { label: 'Info', value: 'info' },
        { label: 'Warning', value: 'warning' },
        { label: 'Success', value: 'success' },
        { label: 'Error', value: 'error' },
      ],
      defaultValue: 'info',
    },
    {
      name: 'text',
      type: 'textarea',
    },
  ],
}
