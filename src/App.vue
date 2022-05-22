<template>
  <BuildPC />
</template>

<script>
import BuildPC from './components/BuildPC.vue';

export default {
  name: 'App',
  components: {
    BuildPC,
  },
};
</script>

<style>
#app {
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #000;
  background-color: #fff;
}
</style>
