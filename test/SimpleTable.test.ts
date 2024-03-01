import { mount,shallowMount} from "@vue/test-utils";
import { expect, test } from "vitest";
import { nextTick } from 'vue'
import SimpleTable from "../src/components/table/SimpleTable";
import tableData from "../src/mock/index";
import simpleTablePagination from "../pagination/index.vue";

test("测试默认prop渲染的dom结构", async () => {
  const wrapper = mount(SimpleTable, {
    props: {
      data:tableData
    },
  });

const arr=['当前在第1页','共60条']
await nextTick()
arr.forEach(item=>{
  expect(wrapper.text()).toContain(item);
})
const listItems=wrapper.findAll('.list_item')
expect(listItems).toHaveLength(10)
});


test("测试点击改变每页展示数据条数逻辑", async () => {
  const wrapper = mount(SimpleTable, {
    props: {
      data:tableData
    },
  });

const pageCom=wrapper.findComponent({name:'SplitPage'})
pageCom.vm.$emit('pageSizeChange',20,10)

await nextTick()

const listItems=wrapper.findAll('.list_item')
expect(listItems).toHaveLength(20)

});

test("测试点击页数切换数据逻辑", async () => {
  const wrapper = mount(SimpleTable, {
    props: {
      data:tableData
    }
  });

const pageCom=wrapper.findComponent({name:'SplitPage'})
pageCom.vm.$emit('changeCurrentPage',3)
expect(wrapper.vm.cuttingData[3].name).toContain('机器人24')

});

// test("测试点击上一页切换数据逻辑", async () => {
//   const wrapper = mount(SimpleTable, {
//     props: {
//       data:tableData
//     }
//   });

//   await wrapper.find('.prev_page').trigger('click')

//   expect(wrapper.vm.cuttingData).toContain('机器人14') 

// });
test("测试点击下一页切换数据逻辑", async () => {
  const wrapper = mount(SimpleTable, {
    props: {
      data:tableData
    }
  });

 await wrapper.find('.next_page').trigger('click')

expect(wrapper.vm.cuttingData[3].name).toContain('机器人14')

});
