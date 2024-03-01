import { ExtractPropTypes } from "vue";

export const bodyProps = {
    data: {
        type: Array,
        default: () => ([])
    },

    columns: {
        type: Array,
        default: () => ([])
    }
};

export type TableProps = ExtractPropTypes<typeof bodyProps>;