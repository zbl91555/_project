<template>
  <div class="thanka" style="width:100%" v-if="activityEntranceShow">
    <router-link to="/thanka">
      <img width='100%' :src="img" alt="">
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'activityEntrance',
  data () {
    return {

    }
  },
  props: ['activityEntranceShow', 'img']
}
</script>

<style>

</style>
