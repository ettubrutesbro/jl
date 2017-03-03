<template>
  <div :class = '$style.imageGrid'>
    <ProjectImages 
      v-for = "(item, index) in projects"
      :key = "index"
      v-bind:grid-position = "imgCoords[index]"
    ></Project>
  </div>
</template>

<script>
import ProjectImages from './ProjectImages.vue'

export default {
  name: 'ImageGrid',
  components: {
    ProjectImages
  },
  props: ['projects', 'grid'],
  data () {
    return {
      gridSpace: 0,
      imgsPerRow: 0,
      gridImgSize: 350,
      imgCoords: []
    }
  },
  created () {
    window.addEventListener('load', () => {
      this.gridSpace = this.$el.offsetWidth

      if(this.gridSpace >= 1800) this.imgsPerRow = 5
      if(this.gridSpace >= 1200 && this.gridSpace< 1800) this.imgsPerRow = 3
      if(this.gridSpace >= 600 && this.gridSpace< 1200) this.imgsPerRow = 2
      if(this.gridSpace < 600) this.imgsPerRow = 1
      // console.log(this.PROJECTS.length)
      console.log('# of items per row: ', this.imgsPerRow)

      //for each project in projects(prop), calculate XY
      let whichRow = 0
      let indexInRow = 0
      for(var i = 0; i<this.projects.length; i++){
        //coordinate math
        const xCoord = indexInRow * this.gridImgSize
        const yCoord = whichRow * this.gridImgSize
        console.log(xCoord, yCoord)
        this.imgCoords[i] = [xCoord, yCoord]
        //indexing for subsequent images
        if(indexInRow < this.imgsPerRow-1) indexInRow++
        else { indexInRow = 0; whichRow++}

      }

    })

    
  }
}
</script>

<style module>
  .imageGrid{
    position: relative;
    box-sizing: border-box;
    width: 50%;
    /*max-width: 500px;*/
    right: 50%; left: 0;
    height: 100%;
    top: 0; bottom: 0; margin: auto auto;
    /*background-color: rgba(0,0,255,0.25);*/
    border: 1px blue solid;



  }
  @media (orientation: landscape){
    width: 50%;
  }
  @media (orientation: portrait){
    .imageGrid{
      width: 100%;
    }

  }



/*  @media only screen and (min-width : 1800px) {
    #imageGrid{

    }
    .project {
      width: 150px;
      height: 150px;
      border: 1px red solid;
    }
}
  @media only screen and (min-width : 1200px) and (max-width: 1799px){
    #imageGrid { width: 1100px; }
    .project {
      width: 300px;
      height: 300px;
      border: 1px green solid;
    }
  }
  
  @media only screen and (min-width : 600px) and (max-width: 1199px){
   #imageGrid{ width: 90%;  }
    .project {
      width: 35%;
      padding-bottom: 35%;
      border: 1px blue solid;
    }
  }*/

</style>
