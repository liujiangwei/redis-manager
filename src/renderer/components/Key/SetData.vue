<template>
  <el-table :data="members" style="width: 100%">
    <el-table-column prop="value" label="member"></el-table-column>
  </el-table>
</template>
<script>
let Redis = require("ioredis");
let client = new Redis();
export default {
  props: ["redisKey","database"],
  data() {
    return {
      members: []
    };
  },
  mounted() {
    console.log("set component mounted");
    this.showData();
  },
  watch: {
  },
  methods: {
    showData() {
      client.select(this.database)
      //console.log("set component data"+this.redisKey)
      client.smembers(this.redisKey).then(response => {
        console.log(this.redisKey +"=>"+response)
        let members = [];
        for (var key in response) {
          members.push({
            value: response[key]
          });
        }
        this.members = members;
      });
    }
  }
};
</script>
