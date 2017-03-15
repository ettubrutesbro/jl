<template>
<div class = "project"
    :style = "{
        left: coords[0]+'px', 
        top: coords[1]+'px', 
        width: dims+'px',
        height: dims+'px',
    }"
    @click = "handleClick"
>
    {{index}}
</div>
</template>

<script>

export default {
    name: 'ProjectImages',
    props: {
        coords: Array,
        dims: Number,
        index: Number,
    },
    data (){
        return {
            // yTranslation: 0,

        }
    },
    watch: {
        coords: function(val){
            // console.log('coords changed: ')
            // console.log(val)
        }
    },
    mounted() {
        // console.log('ProjectImage mounted')
        // console.log('coords: ' + this.coords)
        // console.log(this.position)
    },
    methods: {
        handleClick: function(evt){
            //if nothing selected
            this.$emit('selection', this.index)
            // Velocity(this.$el, {width: '600px'})


            

        }
    }
}

</script>

<style>

    .project{
        position: absolute;
        /*top: 0; bottom: 0; margin: auto auto;*/
        /*width: 100%;*/
        /*height: 100px;*/
        /*display: flex;*/
      /*  align-items: center;
        flex-direction: column;
        justify-content: center*/;
        /*border: 1px black solid;*/
        background-color: rgba(0,0,255,0.1);
        &.selected{
            background-color: red;
        }
    }

</style>