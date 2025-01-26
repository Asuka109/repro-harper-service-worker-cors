import { pluginReact } from '@rsbuild/plugin-react';
import { defineConfig } from '@rslib/core';

export default defineConfig({
  lib: [
    {
      id: 'content',
      bundle: true,
      dts: false,
      format: 'esm',
      source: {
        entry: { content: './src/content.ts' },
      },
    },
    {
      id: 'popup',
      bundle: true,
      dts: false,
      format: 'esm',
      source: {
        entry: { popup: './src/popup.tsx' },
      },
      tools: { htmlPlugin: true },
    },
  ],
  source: {
    define: {
      'process.env.NODE_ENV': JSON.stringify('production'),
    }
  },
  output: {
    target: 'web',
  },
  plugins: [pluginReact()],
});
