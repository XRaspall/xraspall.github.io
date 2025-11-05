<template>
  <div id="app" class="app">
    <component :is="currentComponent" />
  </div>
</template>

<script>
import Roulette from './components/Roulette.vue';
import Home from './views/Home.vue';

export default {
  name: 'App',
  components: {
    Roulette,
    Home
  },
  data() {
    return {
      currentComponent: 'Home'
    };
  },
  mounted() {
    const handleRoute = () => {
      const hash = window.location.hash.slice(1) || '/';
      const pathname = window.location.pathname;

      // Si la ruta es /roulette o hash es /roulette, mostrar ruleta
      if (pathname.includes('roulette') || hash.includes('roulette')) {
        this.currentComponent = 'Roulette';
      } else {
        this.currentComponent = 'Home';
      }
    };

    window.addEventListener('hashchange', handleRoute);
    handleRoute();
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
}

.app {
  min-height: 100vh;
}
</style>
