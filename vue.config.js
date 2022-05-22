const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    mode: 'production',
    entry: './src/main.js',
    resolve: {
      alias: {
        vue$: 'vue/dist/vue.runtime.esm-bundler.js',
      },
    },
  },
});
