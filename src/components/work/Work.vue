<template>
  <div id="work">
    <ImageGrid 
      v-bind:projects = "PROJECTS"
      v-bind:grid = "!OPEN"
    ></ImageGrid>
    <ExpandedInfo v-if = "OPEN" v-bind:selected = "PROJECTS[SELECTED]"></ExpandedInfo>
  </div>
</template>

<script>

import ImageGrid from './ImageGrid.vue'
import ExpandedInfo from './ExpandedInfo.vue'

export default {
  name: 'Work',
  components: {
    ImageGrid,
    ExpandedInfo
  },
  data () {
    return {
      OPEN: true,
      SELECTED: 0,
      PROJECTS: require('../../data/projectdata.js')
    }
  },
  created() {
    // this.horizontalSpace = this.$el.offsetWidth
  }
}
</script>

<style>
#work{
  display: flex;
  justify-content: center;
  position: fixed;
  align-items: center;
  width: 90%;
  max-width: 90vw;
  max-height: 90vh;
  height: 90%;
  top:0; bottom: 0;
  left: 0; right:0; margin: auto auto;
}

@media (orientation: landscape){
    #work{
      flex-direction: row;
    }
  }
  @media (orientation: portrait){
    #work{
      flex-direction: column;
    }
  }


</style>
