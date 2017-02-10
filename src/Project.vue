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

}

</script>

<style>

    #project{
        position: absolute;
        top: 0; bottom: 0; margin: auto auto;
        width: 100%;
        /*height: 100px;*/
        border: 1px solid blue;
        background-color: white;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
    }
    #content {
        width: 50px;
        height: 50px;
        border: 1px blue solid;
    }
    #caption{
        box-sizing: border-box;
        border: 1px teal solid;
        /*height: 10px;*/
    }

</style>