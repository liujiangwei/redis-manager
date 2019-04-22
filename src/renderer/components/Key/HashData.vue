<template>
  <el-table :data="hashTable" style="width: 100%">
    <el-table-column prop="field" label="field"></el-table-column>
    <el-table-column prop="value" label="value"></el-table-column>
  </el-table>
</template>
<script>
let Redis = require("ioredis");
let client = new Redis();
export default {
  props: ["redisKey","database"],
  data() {
    return {
      hashTable: []
    };
  },
  mounted() {
    console.log("hash component mounted");
    this.showData();
  },
  watch: {
  },
  methods: {
    showData() {
      client.select(this.database)
      //console.log("hash component data"+this.redisKey)
      client.hgetall(this.redisKey).then(response => {
        console.log(this.redisKey +"=>"+response)
        let hashTable = [];
        for (var field in response) {
          hashTable.push({
            field: field,
            value: response[field]
          });
        }
        this.hashTable = hashTable;
      });
    }
  }
};
</script>
