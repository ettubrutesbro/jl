<template>
  <div :class = '$style.imageGrid'>
    <ProjectImages 
      v-for = "(item, index) in projects"
      v-if = "imgCoords[index]"
      key = "index"
      :coords = "imgCoords[index]"
      :dims = "gridImgSize"
    ></Project>
  </div>
</template>

<script>
import ProjectImages from './ProjectImages.vue'

export default {
  name: 'ImageGrid',
  template: '#work',
  components: {
    ProjectImages
  },
  props: ['projects', 'gridWidth', 'expandHeight'],
  data () {
    return {
      mode: 'grid',
      //a series of calculated-once pertaining solely to grid mode
      imgsPerRow: 0,
      gridImgSize: 350,
      imgCoords: []
    }
  },
  watch: {
    gridWidth: function(val, oldVal){
      console.log('new width',val,' old width',oldVal)
      if(val >= 1800) this.imgsPerRow = 5
      else if(val >= 1200 && val< 1800) this.imgsPerRow = 3
      else if(val >= 600 && val< 1200) this.imgsPerRow = 2
      else if(val < 600) this.imgsPerRow = 1

      let whichRow = 0
      let indexInRow = 0
      let margin = (val - (this.imgsPerRow*this.gridImgSize)) / (this.imgsPerRow - 1)
      for(var i = 0; i<this.projects.length; i++){
        const xCoord = indexInRow>0? (indexInRow * this.gridImgSize) + (margin * indexInRow) : 0
        let yCoord = (whichRow * this.gridImgSize)
        if(whichRow>0)yCoord += margin

        if(this.imgCoords.length===this.projects.length) this.imgCoords.splice(0,this.imgCoords.length)
        this.imgCoords.push([xCoord, yCoord])
        
        //indexing for subsequent images
        if(indexInRow < this.imgsPerRow-1) indexInRow++
        else { indexInRow = 0; whichRow++}

      }
    },
  },
  created(){
    console.log('ImageGrid created')

  },

  
}
</script>

<style module>
  .imageGrid{
    /*position: relative;*/
    /*box-sizing: border-box;*/
    /*width: 50%;*/
    /*max-width: 500px;*/
    /*right: 50%; left: 0;*/
    /*height: 100%;*/
    /*top: 0; bottom: 0; margin: auto auto;*/
    /*background-color: rgba(0,0,255,0.25);*/
    /*border: 1px blue solid;*/



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
