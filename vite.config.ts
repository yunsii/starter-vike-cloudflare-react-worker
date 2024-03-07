import path from 'node:path'

import react from '@vitejs/plugin-react'
import vike from 'vike/plugin'
import polishTaggedTemplates from 'unplugin-polish-tagged-templates/vite'

import type { UserConfig } from 'vite'

export default {
  plugins: [
    react(),
    vike(),
    polishTaggedTemplates({
      cssTags: ['cls'],
    }),
  ],
  resolve: {
    // Only needed for this example
    // TODO: check if still needed
    preserveSymlinks: true,
    alias: {
      '#src': path.resolve(__dirname, 'src'),
    },
  },
} as UserConfig
