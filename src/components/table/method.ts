import { computed, reactive, useSlots } from "vue";

const SORTATUS = {
    asc: 'isAsc',
    desc: 'isDesc'
};
const LANGUAGE = { zhCN: 'zh-CN' };

const useTable = (props: any) => {
    let data = reactive(props.data);
    let columns = reactive([]) as any[];

    let pageConfigTotal = reactive({
        total: 60,
        pageSize: 10,
        pageNo: 1
    });

    // 改变当前页数、可点击具体页、跳页、上一页下一页
    const changePage = (page: any) => {
        pageConfigTotal.pageNo = page;
    };

    // select调整每页显示条数
    const pageSizeChange = (value: any) => {
        pageConfigTotal.pageSize = value;
    };

    // 获取表格插槽内容
    const slots = useSlots();
    columns = slots.default ? slots.default() : [];

    // 排序函数
    const onSort = (propKey: any, sortStatus: any) => {
        data.sort((a: any, b: any) => {
            // 非字符串或0，使用数字排序
            if(Number(a[propKey]) && Number(b[propKey])) {
                return sortStatus === SORTATUS.asc
                ? a[propKey] - b[propKey]
                : b[propKey] - a[propKey]
            } else {
                return sortStatus === SORTATUS.asc
                ? a[propKey].localeCompare(b[propKey], LANGUAGE.zhCN)
                : b[propKey].localeCompare(a[propKey], LANGUAGE.zhCN)
            }
        })
    };

    // 切割数据，模拟后台按页请求数据
    const cuttingData = computed ( () => {
        let dataList = JSON.parse(JSON.stringify(data));
        let list: any[] = [];

        for (let index = 0; index < dataList.length; index += pageConfigTotal.pageSize) {
            list.push(dataList.slice(index, index + pageConfigTotal.pageSize));
        }
        // console.log(pageConfigTotal, '2222', list);
        return list[pageConfigTotal.pageNo - 1];
    });

    return {
        // 表格渲染相关
        cuttingData,
        columns,
        onSort,
        //分页相关
        pageConfigTotal,
        changePage,
        pageSizeChange
    };
}

export default useTable;