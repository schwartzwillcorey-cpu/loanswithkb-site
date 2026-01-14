import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://loanswithkb.com',
  build: {
    format: 'file'
  },
  output: 'static',
  compressHTML: true
});
