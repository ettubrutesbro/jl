<template>
<div :class = "$style.projectInfo">
    <article :class = "$style.text">
        <!-- recursive paragraphs, eventually need blockquote/etc support -->
        <p v-for = "paragraph in selected.text">
            {{paragraph}}
        </p>
    
    </article>
    </div>
</template>

<script>
export default {
    name: 'ProjectInfo',
    props: ['selected'],
    data(){
        return {

        }
    }
}
</script>

<style module>
.projectInfo{
    /*position: relative;*/
    width: 50%;
    height: 100%;
    /*border: 3px red solid;*/
    box-sizing: border-box;
    display: flex;
    align-items: center;
    /*background-color: rgba(255,0,0,0.25);*/
    border: 1px solid black;
    overflow: scroll;
}

    .text {
    	background-color: rgba(255,0,0,0.05);
    	display: block;
    	/*height: 100%;*/
    	width: 100%;
    	padding: 2rem;
    }
 @media (orientation: landscape){
    .projectInfo{
        width: 50%;
    }
 }
 @media (orientation: portrait){
    .projectInfo{
    	/*display: block;*/
    	/*height: auto;*/
    	overflow: auto;
        width: 100%;
        /*max-height: 50vh;*/
    }
 }
</style>