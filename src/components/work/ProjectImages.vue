<template>
<div id = "project"
    :style = "{
        left: coords[0]+'px', 
        top: coords[1]+'px', 
        width: dims+'px',
        height: dims+'px',
    }"
>
    <div id = "content">
    </div>
    <div id = "caption">
    </div>
</div>
</template>

<script>

export default {
    name: 'ProjectImages',
    props: {
        coords: Array,
        dims: Number,
    },
    data (){
        return {
        }
    },
    watch: {
        coords: function(val){
            console.log('coords changed: ')
            console.log(val)
        }
    },
    mounted() {
        console.log('ProjectImage mounted')
        console.log('coords: ' + this.coords)
        // console.log(this.position)
    }
}

</script>

<style>

    #project{
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
    }
    #content {
        /*width: 100%;*/
        /*height: 100%;*/
        /*background-color: black;
        background-image: url(../../../assets/projects/seseme/closeup.jpg);
        background-size: contain;
        background-repeat: no-repeat;
        background-position: 50% 50%;*/
    }
    #caption{
       /* box-sizing: border-box;
        border: 1px teal solid;*/
        /*height: 10px;*/
    }

</style>