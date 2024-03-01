import { defineComponent } from "vue";
import { type TableProps, tableProps } from "./types";

import TableHeader from "../header/index";
import TableBody from "../body/index";
import simpleTablePagination from "../pagination/index.vue";


import useTable from "./method";

export default defineComponent({
  name: "SimpleTable",

  components: {
    TableHeader,
    TableBody,
    simpleTablePagination
  },

  props: tableProps,

  provide () {
    return {
      onSort: this.onSort
    };
  },

  setup (props: TableProps) {
    const { cuttingData, columns, onSort, pageConfigTotal, pageSizeChange, changePage } = useTable(props);
    const hasPaging = !!props.data.length;

    return {
      cuttingData, // 切割后的表格数据
      columns, // 列数据
      onSort, // 排序函数

      hasPaging, // 表格有数据才显示分页器
      pageConfigTotal, // 分页器配置项
      pageSizeChange, // 下拉选中每页数量，触发改变
      changePage // 当前是第n页，触发改变
    }
  },

  render () {
    return (
      <table>
        <tr>{ this.$slots.default ? this.$slots.default() : '' }</tr>
        <table-header columns={this.columns} />
        <table-body data={ this.cuttingData }
                    columns={ this.columns } />

        {
          this.hasPaging &&
          <simple-table-pagination pageConfig={ this.pageConfigTotal }
                                   onPageSizeChange={ this.pageSizeChange }
                                   onChangeCurrentPage={ this.changePage } />
        }

      </table>
    )
  }
});
