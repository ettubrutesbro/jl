<template>
  <div id="projectGrid">

      <article class = "project" v-for = "item in PROJECTS"> 
        {{item.title}}
      </article>
    
  </div>
</template>

<script>

export default {
  name: 'ProjectGrid',
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

<style scoped>
  @media only screen and (min-width : 1800px) {
    #projectGrid{
      display: flex;
      flex-wrap: wrap;
    }
    .project {
      box-sizing: border-box;
      flex-basis: 20%;
      border: 1px red solid;
    }
}
  @media only screen and (min-width : 1200px) and (max-width: 1799px){
    #projectGrid{
      display: flex;
      flex-wrap: wrap;
    }
    .project {
      box-sizing: border-box;
      flex-basis: 33%;
      border: 1px green solid;
    }
  }
  
  @media only screen and (min-width : 600px) and (max-width: 1199px){
    #projectGrid{
      display: flex;
      flex-wrap: wrap;
    }
    .project {
      box-sizing: border-box;
      flex-basis: 50%;
      border: 1px blue solid;
    }
  }

</style>
