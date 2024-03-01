import { ref, computed, inject, reactive } from 'vue';

export const useSort = () => {
    // 当前的排序状态（默认升序）
    let currentSortStatus = ref('');
    // 排序前是否已经存在排序
    let hadSorts = ref('');
    //当前操作列的key
    let propKey = ref('') as any;
    // 收集排序icon的状态
    let iconStatusMap = reactive({}) as any;

    // 排序icon最终结果的集合
    let iconStatusResultMap = computed(() => {
        iconStatusMap[propKey.value] = {};

        Object.keys(iconStatusMap).forEach(item => {
            iconStatusMap[item] = {};
            iconStatusMap[item].isAsc = false;
            iconStatusMap[item].isDesc = false;
        });

        iconStatusMap[propKey.value][currentSortStatus.value] = true;

        if(hadSorts.value) {
            iconStatusMap[propKey.value][currentSortStatus.value] = false;  
        }

        currentSortStatus.value = '';

        return iconStatusMap;
    });

    const onSort = inject('onSort') as Function;

    // 排序
    const sort = (property: any, sortStatus: any, hadSort: any) => {
        propKey.value = property;
        currentSortStatus.value = sortStatus;
        hadSorts.value = hadSort;

        onSort(property, sortStatus);

        // 重置排序
        hadSort && resetSort();
    };

    const resetSort = () => {
        onSort('index', 'isAsc');
    };

    return {
        iconStatusResultMap,
        sort,
        resetSort
    };
}