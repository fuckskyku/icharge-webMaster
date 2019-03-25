/*
 * @Author: fuckSkyKu 
 * @Date: 2019-03-05 16:00:39 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-03-12 13:56:46
 */

<template>
    <div class="pagination">
        <el-pagination
            small
            class="text-center"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="page.page"
            :page-sizes="pageSizes"
            :page-size="page.limit"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
        ></el-pagination>
    </div>
</template>

<script>
export default {
  props: {
    total: {
      type: Number
    } // 总条数
  },
  data() {
    return {
      pageSizes: [10, 20, 50, 100],
      page: {
        page: 1,
        limit: 10
      }
    };
  },
  methods: {
    // 每页条数变更
    handleSizeChange(val) {
      this.page.limit = val;
      this.$emit("pageChange", this.page);
    }, // 当前页码变更
    handleCurrentChange(val) {
      this.page.page = val;
      this.$emit("pageChange", this.page);
    }
  }
};
</script>
<style scoped lang="less">
.pagination {
  margin: 20px 0;
}
</style>