<template>
  <el-container>
    <el-main>
      database_{{database}}_a
    </el-main>
  </el-container>
</template>
<script>
let Redis = require("ioredis");
let client = new Redis();

export default {
  name: "key",
  props: ["database"],
  components: {},
  data() {
    return {};
  },
  mounted() {
  },
  watch: {
  },
  methods: {
  }
};
</script>

