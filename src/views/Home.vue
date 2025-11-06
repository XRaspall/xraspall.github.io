<template>
  <div class="home">
    <div class="empty-state">
      <p>Accede a <router-link to="/roulette">la ruleta</router-link></p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home'
};
</script>

<style scoped>
.home {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.empty-state {
  text-align: center;
  color: white;
  font-size: 1.2em;
}

.empty-state a {
  color: white;
  text-decoration: underline;
  font-weight: bold;
  transition: opacity 0.3s ease;
}

.empty-state a:hover {
  opacity: 0.8;
}
</style>
