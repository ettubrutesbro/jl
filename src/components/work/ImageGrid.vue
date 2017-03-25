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
        @click = "index===selected? returnToGrid : returnToGrid"
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
      const distanceViewport = this.$el.getBoundingClientRect()
      const old = {x: this.move.x, y: this.move.y}
      this.move.x -= (this.imgCoords[index][0] + distanceViewport.left)
      this.move.y -= (this.imgCoords[index][1] + distanceViewport.top )
      const distance = Math.sqrt(Math.pow((old.x - this.move.x),2) + Math.pow((old.x - this.move.y),2))
      console.log(distance)
      this.selected = index

      Velocity(this.$el, {translateX: this.move.x+'px', translateY: this.move.y+'px'}, {easing: distance > 1000 ? 'easeOutCubic' : 'easeOutSine', duration: 150+(distance/1.5), delay: 200})
    },
    returnToGrid: function(){  
      this.selected = -1
      const distance = Math.sqrt(Math.pow(this.move.x,2) + Math.pow(this.move.y,2))
      this.move.x = 0
      this.move.y = 0 
      Velocity(this.$el, {translateX: this.move.x+'px', translateY: this.move.y+'px'}, {easing: distance > 1000 ? 'easeOutCubic' : 'easeOutSine', duration: 100+(distance/1.5)})
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
      const unit = (this.gridImgSize)/1.75 + 'px'
      let animation
      switch(relation){ //values should determine on what's the longer screen dimension
        case 'first': animation = {translateX: unit, translateY: unit, opacity: 0}; break;
        case 'last': animation = {translateX: '-'+unit, translateY: '-'+unit, opacity: 0}; break;
        case 'before': animation = {translateY: '-'+unit, opacity: 0}; break;
        case 'after': animation = {translateY: unit, opacity: 0}; break;
      }

      Velocity(el, animation, {easing: 'easeOutCubic', complete: done, duration: 450})
    }
  }

  
}
</script>

<style>
  .imageGrid{
    align-self: center;
    position: relative;
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

</style>
