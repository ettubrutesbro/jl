<template>
  <div id="portfolio">
    <!-- <ProjectGrid></ProjectGrid> -->
    <ExpandTextArea></ExpandTextArea>
    <section id = "projects">
      <Project v-for = "item in PROJECTS"> </Project>
    </section>

  </div>
</template>

<script>

import Project from './Project.vue'
import ProjectGrid from './ProjectGrid.vue'
import ExpandTextArea from './ExpandTextArea.vue'

export default {
  name: 'Portfolio',
  components: {
    Project,
    ProjectGrid,
    ExpandTextArea
  },
  data () {
    return {
      PROJECTS: require('../data/projectdata.js'),
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style>

  #projects{
    box-sizing: border-box;
    position: fixed;
    width: 50%;
    height: 80%;
    top: 0; bottom: 0; margin: auto auto;
    border: 2px black solid;
    background-color: rgba(0,0,0,0.5);
  }
</style>
