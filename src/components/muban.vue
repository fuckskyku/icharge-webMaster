<template>
  <div class="">
    mdzz
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(["token"])
  },
  mounted() {},
  methods: {
    ...mapActions(["setToKen"])
  },
  components: {}
};
</script>
<style scoped lang="less">
</style>
