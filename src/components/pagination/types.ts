import { ExtractPropTypes } from "vue";

export const pagingProps = {
    pageConfig: {
        type: Object,
        require: true,
        default: () => {
            return {
                pageSize: 10, // 一页数据的条数
                pageNo: 1, // 当前页索引
                total: 0, // 总数据量
                pageTotal: 0, // 总的页数
                pageSizes: [10, 20, 30, 40] // 每页显示数量
            }
        }
    }
} as const;

export type PageProps = ExtractPropTypes<typeof pagingProps>;