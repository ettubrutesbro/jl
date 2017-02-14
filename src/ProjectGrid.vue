<template>
  <div :class = '$style.projectGrid'>
    <Project v-for = "item in PROJECTS"></Project>
  </div>
</template>

<script>
import Project from './Project.vue'

export default {
  name: 'ProjectGrid',
  components: {
    Project
  },
  data () {
    return {
      PROJECTS: require('../data/projectdata.js'),
      windowSize: window.innerWidth,
      rowLength: 0
    }
  },
  created () {
    if(this.windowSize >= 1800) this.rowLength = 5
    if(this.windowSize >= 1200 && this.windowSize< 1800) this.rowLength = 3
    if(this.windowSize >= 600 && this.windowSize< 1200) this.rowLength = 2
    if(this.windowSize < 600) this.rowLength = 1
    console.log(this.PROJECTS.length)
    console.log(this.rowLength)
  }
}
</script>

<style module>
  .projectGrid{
    position: relative;
    box-sizing: border-box;
    width: 50%;
    /*max-width: 500px;*/
    right: 50%; left: 0;
    height: 100%;
    top: 0; bottom: 0; margin: auto auto;
    background-color: rgba(0,0,255,0.25);



  }
  @media (orientation: landscape){

  }
  @media (orientation: portrait){
    .projectGrid{
      width: 100%;
    }

  }



/*  @media only screen and (min-width : 1800px) {
    #projectGrid{

    }
    .project {
      width: 150px;
      height: 150px;
      border: 1px red solid;
    }
}
  @media only screen and (min-width : 1200px) and (max-width: 1799px){
    #projectGrid { width: 1100px; }
    .project {
      width: 300px;
      height: 300px;
      border: 1px green solid;
    }
  }
  
  @media only screen and (min-width : 600px) and (max-width: 1199px){
   #projectGrid{ width: 90%;  }
    .project {
      width: 35%;
      padding-bottom: 35%;
      border: 1px blue solid;
    }
  }*/

</style>
