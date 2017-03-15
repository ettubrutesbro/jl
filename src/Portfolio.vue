<template>
  <div id="portfolio"
    :style = "{height: totalHeight+'px'}"
  >
    <Work
      @computedWorkHeight = "addHeight"
    /> 
    

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
      sectionHeights: {
        intro: 0,
        work: 0,
        contact: 0
      },
      totalHeight: 0,
      scroll: 0,
    }
  },
  methods: {
    addHeight(sectionHeight, section){
      if(sectionHeight !== this.sectionHeights[section]){
        this.totalHeight += (sectionHeight - this.sectionHeights[section])
        this.sectionHeights[section] = sectionHeight
      }
    }
  }
}
</script>

<style>
  #portfolio{

  }
</style>
