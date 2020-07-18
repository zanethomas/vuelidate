<template>
  <div id="app">
    <RouterLink
      v-for="link of links"
      :key="link"
      :to="{ name: link }"
      class="link"
    >
      {{ link }}
    </RouterLink>
    <RouterView />
  </div>
</template>

<script>
export default {
  name: 'App',
  computed: {
    links () {
      return ['Home', 'Dynamic', 'Simple', 'Nested', 'Old']
    }
  }
}
</script>

<style>
.link {
  color: #fff;
  margin: 0 5px;
}

body {
  background: #203041;
  color: #f6f6f6;
}

pre {
  background: #1b2637;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin-top: 60px;
}
</style>
