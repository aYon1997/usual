import { ref, computed } from "vue";
import catchError from "../hooks/index";

const usePage = (props: any, emit: any) => {
    let currentPage = ref(1) as any; // 当前在第几页
    let gotoPage = ref('') as any; // 跳页的value值

    let pageTotal = computed(() => {
        const config = props.pageConfig;

        if(config.pageTotal) {
            return config.pageTotal;
        } else {
            if(config.pageSize && config.total) {
                return Math.ceil(config.total / config.pageSize);
            } else {
                return 0;
            }
        }
    });

    let pageSizes = computed(() => {
        const config = props.pageConfig;

        // 可拓展其他传参方式, 如字符串形式"[10,20,30,40]"
        if(config.pageSize && Array.isArray(config.pageSizes)) {
            return config.pageSizes;
        }

        return [10, 20, 30, 40];
    });

    // 改变页数通用方法
    const monitorEvent = () => {
        emit("changeCurrentPage", currentPage.value);
    };

    // 上一页
    const prePage = () => {
        catchError(() => {
            currentPage.value -= 1;
        }, 'data type');

        monitorEvent();
    };

    const nextPage = () => {
        catchError(() => {
            currentPage.value += 1;
        }, 'data type');

        monitorEvent();
    };

    // select调整每页显示的条数
    const pageSizeChange = (e: any) => {
        // 加Number放置前端数据切割出错
        emit("pageSizeChange", Number(e.target.value), currentPage.value);

        // 当调整当页显示条数时,如果调整前比调整后每页显示条数大, 如: 10条/页 变成 20条/页
        catchError(() => {
            currentPage.value = currentPage.value > pageTotal.value ? pageTotal.value : currentPage.value;
        }, 'data type');

        monitorEvent();
    };

    // 点击页数跳转指定页
    const changeCurrentPage = (i: any) => {
        currentPage.value = i;
        monitorEvent();
    };

    // 跳页
    const gotoAppoint = () => {
        // 如果跳转页数输入001,则去掉开头的0
        gotoPage.value = Number(gotoPage.value);

        // 如果跳转页数输入超过总页数,取总页数
        catchError(() => {
            gotoPage.value = gotoPage.value > pageTotal.value ? pageTotal.value : gotoPage.value;
        }, 'data type');

        // 如果跳转页输入小于1,则取1
        gotoPage.value = gotoPage.value ? gotoPage.value : 1;

        //更新当前页数
        currentPage.value = gotoPage.value;

        monitorEvent();
    };

    return {
        prePage,
        nextPage,
        changeCurrentPage,
        pageSizeChange,
        gotoAppoint,
        pageTotal,
        pageSizes,
        gotoPage
    };
}

export default usePage;

