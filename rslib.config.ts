import { pluginReact } from '@rsbuild/plugin-react';
import { defineConfig } from '@rslib/core';

export default defineConfig({
  lib: [
    {
      id: 'content',
      bundle: true,
      dts: false,
      format: 'umd',
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
    {
      id: 'service',
      bundle: true,
      dts: false,
      autoExternal: false,
      format: 'esm',
      source: {
        entry: { service: './src/service.ts' },
      },
    },
  ],
  source: {
    define: {
      'process.env.NODE_ENV': JSON.stringify('production'),
    },
  },
  output: {
    target: 'web',
  },
  plugins: [pluginReact()],
});
