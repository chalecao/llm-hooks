import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
      include: ['hooks'],
      outDir: 'dist'
    })
  ],
  build: {
    lib: {
      entry: {
        index: './hooks/index.ts',
        useFetchStream: './hooks/useFetchStream.ts',
        useTypingEffect: './hooks/useTypingEffect.ts',
        useLLM: './hooks/useLLM.ts',
        useTTS: './hooks/useTTS.ts'
      },
      formats: ['es']
    },
    rollupOptions: {
      external: [
        'react', 
        'react-dom',
        '@huggingface/transformers',
        'kokoro-js-zh',
        'i18next',
        'react-i18next', 
        'react-router-dom',
        'path',
        /^@huggingface\//,  // 排除所有 @huggingface/ 开头的包
        /^kokoro-js-zh/    // 排除 kokoro-js-zh 相关
      ],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          '@huggingface/transformers': 'transformers',
          'kokoro-js-zh': 'kokoro',
          'i18next': 'i18next',
          'react-i18next': 'reactI18next',
          'react-router-dom': 'reactRouterDom'
        },
        preserveModules: true,
        preserveModulesRoot: 'hooks',
        interop: 'auto'
      }
    }
  }
});