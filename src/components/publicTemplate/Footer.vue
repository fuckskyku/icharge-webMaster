<template>
  <div v-if="visibility" class="f_footer">
    Copyright © 2017-2018 by | mseenet.com ICP备案号：闽ICP备12013509号-2
  </div>
</template>

<script>
export default {
  props: {
    msg: {
      type: String
    }
  },
  data() {
    return {
      visibility: true,
    };
  },
  computed: {

  },
  mounted() {
    if(this.$route.name == 'Login') {
      this.visibility = false
    }
  },
  methods: {

  },
  components: {}
};
</script>
<style scoped lang="less">

</style>
