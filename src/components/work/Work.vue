<template>
  <div id="work">
    <ImageGrid 
      :projects = "PROJECTS"
      :gridWidth = "width"
      :expandHeight = "height"
    ></ImageGrid>
    <!-- <ExpandedInfo 
      v-if = "OPEN" 
      :selected = "PROJECTS[SELECTED]"
      :expandHeight = "height"
    ></ExpandedInfo> -->
  </div>
</template>

<script>

import debounce from 'debounce'
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
      PROJECTS: require('../../data/projectdata.js'),
      width: 0,
      height: 0,
    }
  },
  created(){
    console.log('work section created, adding resize event')
    window.addEventListener('resize', debounce(()=>{
      this.width = this.$el.offsetWidth
      this.height = this.$el.offsetHeight 
      console.log('resize/recomputed')
      //emit event to Portfolio with new Height
    }, 100))
  },
  mounted(){
    console.log('work section mounted')
    this.width = this.$el.offsetWidth
    this.height = this.$el.offsetHeight
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
  /*max-width: 90vw;*/
  /*max-height: 90vh;*/
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
