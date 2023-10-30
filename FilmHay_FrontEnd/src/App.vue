<script>
import FilmHeader from "@/components/FilmHeader.vue";
import FilmFooter from "@/components/FilmFooter.vue";
export default {
  components: {
    FilmHeader,
    FilmFooter
  },
  
};
</script>
<template>

      <FilmHeader />
    <router-view />
    <FilmFooter />
  

</template>
<style>
</style>
