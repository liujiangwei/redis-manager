<template>
  <el-container>
    <el-main>
      <el-tabs v-model="activeTab" closable @tab-remove="removeKey">
        <el-tab-pane :label="item.label" :name="item.name" :key="item.name" v-for="item in keyTabs">
          <hash-data :database="item.database" :redisKey="item.key" v-if="item.type === 'hash'"></hash-data>
          <string-data :database="item.database" :redisKey="item.key" v-if="item.type === 'string'"></string-data>
          <set-data :database="item.database" :redisKey="item.key" v-if="item.type === 'set'"></set-data>
          <z-set-data :database="item.database" :redisKey="item.key" v-if="item.type === 'zset'"></z-set-data>
          <list-data :database="item.database" :redisKey="item.key" v-if="item.type === 'list'"></list-data>
        </el-tab-pane>
      </el-tabs>
    </el-main>
  </el-container>
</template>
<script>
import HashData from "./Key/HashData";
import StringData from "./Key/StringData";
import SetData from "./Key/SetData";
import ZSetData from "./Key/ZSetData";
import ListData from "./Key/ListData";
let Redis = require("ioredis");
let client = new Redis();

export default {
  name: "key",
  props: ["redisKey", "database"],
  components: { HashData, StringData, SetData, ZSetData, ListData },
  data() {
    return {
      keyTabs: [],
      activeTab: ""
    };
  },
  mounted() {
    this.getDataType();
  },
  watch: {
    redisKey: {
      handler: "getDataType"
    },
    database: {
      handler: "getDataType"
    }
  },
  methods: {
    getDataType() {
      client.select(this.database);
      client.type(this.redisKey).then(type => {
        var tab = {
          database: this.database,
          key: this.redisKey,
          type: type,
          label: this.redisKey + "(" + this.database + ")",
          name: this.database + "_" + this.redisKey
        };

        this.keyTabs = this.keyTabs.filter(item => tab.name !== item.name);
        this.keyTabs.push(tab);

        this.activeTab = tab.name;
        console.log(tab, this.keyTabs, this.activeTab);
      });
    },
    removeKey(targetName) {
      if (this.activeTab === targetName) {
        this.keyTabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = this.keyTabs[index + 1] || this.keyTabs[index - 1];
            if (nextTab) {
              this.activeTab = nextTab.name;
            }
          }
        });
      }

      this.keyTabs = this.keyTabs.filter(tab => tab.name !== targetName);
    }
  }
};
</script>
