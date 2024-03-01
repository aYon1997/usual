import { ExtractPropTypes } from "vue";

// 定义 Props
export const tableProps = {
  data: {
    type: Array,
    default: () => ([]),
  },

  pageConfig: {
    type: Object,
    default: () => ({}),
  }
} as const;

export type TableProps = ExtractPropTypes<typeof tableProps>;
