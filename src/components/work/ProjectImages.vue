<template>
<div id = "project">
    <div id = "content">
    </div>
    <div id = "caption">
        some bullshit
    </div>
</div>
</template>

<script>

export default {
    name: 'ProjectImages',
    props: ['imgCoords'],
    data (){
        return {

        }
    },
    created () {
        console.log(this.position)
    }
}

</script>

<style>

    #project{
        position: absolute;
        top: 0; bottom: 0; margin: auto auto;
        width: 100%;
        /*height: 100px;*/
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
        /*border: 1px black solid;*/
        background-color: rgba(0,0,255,0.1);
    }
    #content {
        width: 100%;
        height: 100%;
        background-color: black;
        background-image: url(../../../assets/projects/seseme/closeup.jpg);
        background-size: contain;
        background-repeat: no-repeat;
        background-position: 50% 50%;
    }
    #caption{
        box-sizing: border-box;
        border: 1px teal solid;
        /*height: 10px;*/
    }

</style>