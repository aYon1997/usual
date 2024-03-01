<template>
  <div class="pagination">
    <span class="current-page-no">当前在第{{ pageConfig.pageNo }}页</span>
    <span class="pagination-padding">共{{ pageConfig.total }}条</span>
    <!-- 选择每页显示条数 -->
    <select class="pagination-padding"
            @change="pageSizeChange($event)">
        <option v-for="(item, index) in pageSizes"
                :key="index"
                :value="item">
            {{ item }}
        </option>
    </select>
    <div class="pagination-padding">
        <!-- 上一页 -->
        <button @click="prePage"
                :disabled="pageConfig.pageNo === 1"
                class="prev_page">
            &lt;
        </button>
        <button v-for="i in pageTotal"
                :key="i"
                @click="changeCurrentPage(i)"
                :class="{currentActive: i === pageConfig.pageNo}">
            {{ i }}
        </button>
        <!-- 下一页 -->
        <button @click="nextPage"
                :disabled="pageConfig.pageNo === pageTotal"
                class="next_page">
            &gt;
        </button>
    </div>
     <!-- 跳页 -->
    <div>
        前往
        <input type="number"
                class="gotoAppoint"
                oninput="value=value.replace(/[^\d]/g,'')"
                @keyup.enter="gotoAppoint"
                v-model="gotoPage">
        页
    </div>
  </div>
</template>

<script lang="ts">
import usePage from "./method";
import { defineComponent } from "vue";
import { type PageProps, pagingProps } from "./types";
import "./index.css";

export default defineComponent({
    name: "SplitPage",

    props: pagingProps,

    setup (props: PageProps, { attrs, emit, slots }) {
        let { pageSizeChange, gotoAppoint, changeCurrentPage, prePage, nextPage, pageTotal, pageSizes, gotoPage } = usePage(props, emit)
    
        return {
            pageSizeChange,
            gotoAppoint,
            changeCurrentPage,
            prePage,
            nextPage,
            pageTotal,
            pageSizes,
            gotoPage
        }
    }
});
</script>