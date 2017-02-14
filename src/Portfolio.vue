<template>
  <div id="portfolio">
    <ProjectGrid>
      <!-- <Project v-for = "item in PROJECTS"> </Project> -->
    </ProjectGrid>
    <ExpandTextArea></ExpandTextArea>
    

  </div>
</template>

<script>

import ProjectGrid from './ProjectGrid.vue'
import ExpandTextArea from './ExpandTextArea.vue'

export default {
  name: 'Portfolio',
  components: {
    ProjectGrid,
    ExpandTextArea
  },
  data () {
    return {
      PROJECTS: require('../data/projectdata.js'),
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style>
#portfolio{
  display: flex;
  justify-content: center;
  position: fixed;
  align-items: center;
  width: 90%;
  max-width: 1200px;
  max-height: 1200px;
  height: 90%;
  top:0; bottom: 0;
  left: 0; right:0; margin: auto auto;
}

@media (orientation: landscape){
    #portfolio{
      flex-direction: row;
    }
  }
  @media (orientation: portrait){
    #portfolio{
      flex-direction: column;
    }
  }


</style>
