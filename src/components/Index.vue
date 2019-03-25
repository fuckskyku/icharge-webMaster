<template>
  <div class="index">
    <Header></Header>
    <div class="warp">
      <div class="aside">
        <Aside></Aside>
      </div>
      <div class="main">
        <transition enter-active-class="animated zoomIn" leave-active-class="animated zoomOut">
          <router-view></router-view>
        </transition>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Header from "@/components/publicTemplate/Header";
import Footer from '@/components/publicTemplate/Footer';
import Aside from "@/components/publicTemplate/Aside";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(["token","defaultActive"])
  },
  mounted() {
    // this.setToKen("")
  },
  methods: {
    ...mapActions(["setToKen", "setDefaultActive"]),
  },
  components: {
    Header,
    Aside,
    Footer
  }
};
</script>
<style scoped lang="less">
.index {
  .warp {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    .aside {
      flex: 2;
    }
    .main {
      flex: 8;
      padding: 15px 10px;
      .header {
        margin: 20px 30px;
        border-bottom: 1px solid #ebebeb;
        p {
          border-left: 4px solid #14bf6d;
          padding-left: 10px;
        }
      }
    }
  }
}
</style>
