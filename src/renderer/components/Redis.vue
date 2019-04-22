<template>
  <el-container>
    <el-aside width="200px">
      <el-menu default-active="2" class="el-menu-vertical-demo">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-document"></i>
            <span>数据库</span>
          </template>
          <el-tree :data="databaseList" accordion :props="defaultProps" @node-click="handleNodeClick">
            <span class="custom-tree-node" slot-scope="{ node, data }">
              <span>{{ node.label }}</span>
              <span v-if="data.type == 'key'">
              </span>
            </span>
          </el-tree>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-setting"></i>
            <span>服务器</span>
          </template>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>
let Redis = require("ioredis");
let client = new Redis();

export default {
  name: "redis",
  components: {},
  props: [],
  data() {
    return {
      databaseList: [],
      defaultProps: {
        children: "children",
        label: "label"
      },
    };
  },
  mounted() {
    client.config("get", "databases").then(response => {
      for (var i = 0; i < response[1]; i++) {
        this.databaseList.push({
          label: "database_" + i,
          id: i,
          type: "database",
          children: []
        });
      }
    });
  },
  methods: {
    handleNodeClick(node) {
      if (node.type === "database") {
        let keys = [];
        client.select(node.id);
        client.keys("*").then(response => {
          response.forEach(element => {
            keys.push({
              label: element,
              type: "key",
              database: node.id,
              key: element,
            });
          });
        });
        node.children = keys;    
      } else if (node.type === "key") {
        console.log("go to redis-key " + node.database +" "+ node.key)
        this.$router.replace({
          name: "redis-key",
          params: { database: node.database, redisKey: node.key }
        });
      }
    },
    getAllKeys(database) {
      let keys = [];
      client.select(1);
      client.keys("*").then(response => {
        response.forEach(element => {
          keys.push({
            label: element,
            type: "key"
          });
        });
      });
      return keys;
    }
  }
};
</script>

<style>
.el-main{
  padding: 0px;
}
</style>
