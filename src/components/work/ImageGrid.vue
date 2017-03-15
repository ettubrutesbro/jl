<template>
  <div 
    :class = '$style.imageGrid'
    :style = '{
      width: gridTotalWidthPx, 
      height: gridTotalHeightPx,
      //transform: translate(move.x, move.y)
      }'
    >
    <transition-group
      name = "enterExit"
      tag = "div"
      :css="false"
      @enter="enter"
      @leave="leave"
    >
      <ProjectImages 
        v-for = "(item, index) in projects"
        v-if = "imgCoords[index] && (selected===-1||(selected===index))"
        :key = "index"
        :index = "index"
        :coords = "imgCoords[index]"
        :dims = "gridImgSize"
        @selection = "imageSelect"
        :class = "{
          selected: index===selected, 
          unselected: selected>-1&&index!==selected,
          beforeSelected: index < selected,
          afterSelected: index > selected
        }"

      />
    </transition-group>
  </div>
</template>

<script>
import ProjectImages from './ProjectImages.vue'
import translate from '../../utility/translate.js'
import Velocity from 'velocity-animate'

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
      gridImgSize: 300,
      gridTotalWidth: 0,
      gridTotalHeight: 0,
      imgCoords: [],
      //component state
      selected: -1,
      move: {x: 0, y:0},
    }
  },
  computed: {
    gridTotalHeightPx: function(){ return this.gridTotalHeight+'px' },
    gridTotalWidthPx: function(){ return this.gridTotalWidth +'px'},

  },
  watch: {
    gridWidth: function(val, oldVal){
      //can this be rewritten in computed? watchers are probably not the best pattern.
      if(val===oldVal) return
      //constant and shorthand
      const img = this.gridImgSize
      const margin = 50
      //counters for recursive positioning
      let whichRow = 0
      let indexInRow = 0
      //totals for CSS and scroll calculation

      this.imgsPerRow = Math.floor(val / (img*(1+(1/(img / margin))))) 

      for(var i = 0; i<this.projects.length; i++){
        const xCoord = indexInRow>0? (indexInRow * img) + (margin * indexInRow) : 0
        let yCoord = (whichRow * img) + (whichRow *margin)

        if(this.imgCoords.length===this.projects.length) this.imgCoords.splice(0,this.imgCoords.length)
        this.imgCoords.push([xCoord, yCoord])
      
        
        //indexing for subsequent images
        if(indexInRow < this.imgsPerRow-1) indexInRow++
        else { indexInRow = 0; whichRow++}

        if(i===this.projects.length-1){ //last project - width and height totals are calculable now
          this.gridTotalWidth = (this.imgsPerRow * img) + ((this.imgsPerRow-1)*margin)
          this.gridTotalHeight = yCoord+img

          this.$emit('computedGridHeight', this.gridTotalHeight)
        }
      }
      
    },
    gridTotalWidth: function(){

    },

  },
  created(){
    console.log('ImageGrid created')

  },
  methods: {
    imageSelect: function(index){
      const gridRect = this.$el.getBoundingClientRect()
      const old = {x: this.move.x, y: this.move.y}
      this.move.x -= (this.imgCoords[index][0] + gridRect.left)
      this.move.y -= (this.imgCoords[index][1] + gridRect.top)
      const distance = (old.x - this.move.x) + (old.x - this.move.y)
      console.log(distance)
      this.selected = index

      Velocity(this.$el, {translateX: this.move.x+'px', translateY: this.move.y+'px'}, {easing: 'easeOutSine', duration: distance/5000})
      // this.translation = 'translateX('+(-moveX)+'px) translateY('+(-moveY)+'px)'
    },
    returnToGrid: function(){  
      this.selected = -1
      const distance = this.move.x + this.move.y
      this.move.x = this.move.y = 0 
      Velocity(this.$el, {translateX: this.move.x+'px', translateY: this.move.y+'px'}, {easing: 'easeOutSine', duration: distance/5000})
    },
    enter: function(el, done){
      Velocity(el, {opacity: 1}, {complete: done})
    },
    leave: function(el, done){
      console.log(this)
      Velocity(el, {opacity: 0}, {complete: done})
    }
  }

  
}
</script>

<style module>
  .imageGrid{
    align-self: center;
    position: relative;
    /*box-sizing: border-box;*/
    /*width: 50%;*/
    /*max-width: 500px;*/
    /*right: 50%; left: 0;*/
    /*height: 100%;*/
    /*top: 0; bottom: 0; margin: auto auto;*/
    /*background-color: rgba(0,0,255,0.25);*/
    border: 1px blue solid;
    transition: transform 1s;


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
