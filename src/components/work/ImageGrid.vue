<template>
  <div 
    class = 'imageGrid'
    :style = '{
      width: gridTotalWidthPx, 
      height: gridTotalHeightPx,
      }'
    >
    <transition-group
      name = "grid-transition"
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
          selected: index===selected
        }"

      />
    </transition-group>
  </div>
</template>

<script>
import ProjectImages from './ProjectImages.vue'
// import translate from '../../utility/translate.js'
import Velocity from 'velocity-animate'
import getElementIndex from '../../utility/getElementIndex.js'

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
    getElementIndex: getElementIndex,
    imageSelect: function(index){
      const gridRect = this.$el.getBoundingClientRect()
      const old = {x: this.move.x, y: this.move.y}
      this.move.x -= (this.imgCoords[index][0] + gridRect.left)
      this.move.y -= (this.imgCoords[index][1] + gridRect.top)
      const distance = (old.x - this.move.x) + (old.x - this.move.y)
      console.log(distance)
      this.selected = index

      Velocity(this.$el, {translateX: this.move.x+'px', translateY: this.move.y+'px'}, {easing: 'easeOutSine', duration: distance/10000+(index*20), delay: 50+(index*35)})
      // this.translation = 'translateX('+(-moveX)+'px) translateY('+(-moveY)+'px)'
    },
    returnToGrid: function(){  
      this.selected = -1
      const distance = Math.abs(this.move.x + this.move.y)
      this.move.x = 0
      this.move.y = 0 
      Velocity(this.$el, {translateX: this.move.x+'px', translateY: this.move.y+'px'}, {easing: 'easeOutSine', duration: distance/5000})
    },
    enter: function(el, done){
      done()
      Velocity(el, {translateX: 0, translateY: 0, opacity: [1,0]})
    },
    leave: function(el, done){
      //some randomization stuff for 'choreos' 

      let relation
      //this.selected is 0 or projects.length-1 (first/last)
      if(this.selected === 0)  relation = 'first'
      else if(this.selected === this.projects.length-1) relation = 'last'
      else relation = getElementIndex(el) > this.selected? 'after': 'before'
      const unit = this.gridImgSize + 'px'
      let animation
      switch(relation){ //values should determine on what's the longer screen dimension
        case 'first': animation = {translateX: unit, translateY: unit, opacity: 0}; break;
        case 'last': animation = {translateX: '-'+unit, translateY: '-'+unit, opacity: 0}; break;
        case 'before': animation = {translateY: '-'+unit, opacity: 0}; break;
        case 'after': animation = {translateY: unit, opacity: 0}; break;
      }

      Velocity(el, animation, {easing: 'easeOutCubic', complete: done, duration: 650})
    }
  }

  
}
</script>

<style>
  .imageGrid{
    align-self: center;
    position: relative;
    /*border: 1px blue solid;*/
    transition: transform 1s;
  }

  .afterSelected{
    &.grid-transition-leave-active{
      transition: transform .2s;
    }
    &.grid-transition-leave-to{
      transform: translateY(50px);
    }
  }

  .beforeSelected{
    &.grid-transition-leave-active{
      transition: transform .2s;
    }
    &.grid-transition-leave-to{
      transform: translateY(-50px);
    }
  }
  
  
  /*@media (orientation: landscape){
    width: 50%;
  }
  @media (orientation: portrait){
    .imageGrid{
      width: 100%;
    }
  }*/



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
