<template>
  <div id="portfolio">
    <ProjectGrid></ProjectGrid>

  </div>
</template>

<script>

import ProjectGrid from './ProjectGrid.vue'

export default {
  name: 'Portfolio',
  components: {
    ProjectGrid
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style>

</style>
