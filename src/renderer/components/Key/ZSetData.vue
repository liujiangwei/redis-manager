<template>
  <el-table :data="members" style="width: 100%">
    <el-table-column prop="member" label="member"></el-table-column>
    <el-table-column prop="score" label="score"></el-table-column>
  </el-table>
</template>
<script>
let Redis = require("ioredis");
let client = new Redis();
export default {
  props: ["redisKey", "database"],
  data() {
    return {
      members: []
    };
  },
  mounted() {
    console.log("set component mounted");
    this.showData();
  },
  watch: {},
  methods: {
    showData() {
      client.select(this.database)
      //console.log("set component data" + this.redisKey);
      client.zrange(this.redisKey, 0, -1, "withscores").then(response => {
        console.log(this.redisKey + "=>", response);
        let members = [];
        for (var i = 0; i < response.length / 2; i++) {
          members.push({
            member: response[i * 2],
            score: response[i * 2 + 1]
          });
        }

        this.members = members;
      });
    }
  }
};
</script>
