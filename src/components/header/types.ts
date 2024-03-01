import { ExtractPropTypes } from "vue";

// 定义 Props
export const headerProps = {
  columns: {
    type: Array,
    default: () => ([]),
  }
} as const;

export type TableProps = ExtractPropTypes<typeof headerProps>;
