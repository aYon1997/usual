<script setup lang="ts">

import SimpleTable from "./components/table/SimpleTable";
import SimpleTableColumn from "./components/column/index";
import tableData from "./mock/index";

import { ref } from "vue";

const tableList = ref(tableData);

</script>

<template>
  <SimpleTable :data="tableList">
  
    <SimpleTableColumn label="序号"
                       prop="index"
                       :sortable="true" />
    <SimpleTableColumn label="姓名"
                       prop="name" />
    <SimpleTableColumn label="类型"
                       prop="type" />
    <SimpleTableColumn label="版本"
                       prop="version"
                       :sortable="true" />
    <SimpleTableColumn label="爱好"
                       prop="hobby">
      <template #="props">
        {{ props.hobby }}
      </template>
    </SimpleTableColumn>


  </SimpleTable>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 60px;
}
</style>
