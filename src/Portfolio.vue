<template>
  <div id="portfolio">

    <Work> </Work>
    

  </div>
</template>

<script>

import Work from './components/work/Work.vue'

export default {
  name: 'Portfolio',
  components: {
    Work
  },
  data () {
    return {
    
    }
  }
}
</script>

<style>
  #portfolio{
    overflow: scroll;
  }
</style>
