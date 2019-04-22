<template>
  <el-container>
    <el-main>
      <div v-if="format==='string'">{{value}}</div>
      <vue-json-pretty :data="valueJson" v-if="format==='json'"></vue-json-pretty>
    </el-main>
    <el-aside width="200px">
      <el-select v-model="format" placeholder="请选择">
        <el-option label="string" value="string"></el-option>
        <el-option label="json" value="json"></el-option>
      </el-select>
    </el-aside>
  </el-container>
</template>
<script>
import VueJsonPretty from "vue-json-pretty";

let Redis = require("ioredis");
let client = new Redis();
export default {
  props: ["redisKey", "database"],
  components: {
    VueJsonPretty
  },
  data() {
    return {
      value: "",
      format: "string",
      data:{
        "a": 1
      }
    };
  },
  computed:{
    valueJson:function(){
      return JSON.parse(this.value)
    }
  },
  watch: {},
  mounted() {
    //console.log("string component mounted");
    this.showData();
  },
  methods: {
    showData() {
      client.select(this.database);
      client.get(this.redisKey).then(response => {
        //console.log(this.redisKey + "=>" + response);
        this.value = response;
      });
    }
  }
};
</script>

