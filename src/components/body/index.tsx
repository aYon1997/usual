import { defineComponent, toRefs } from "vue";
import { type TableProps, bodyProps } from "./types";
import "./index.css";

export default defineComponent({
    name: "tableBody",

    props: bodyProps,

    setup (props: TableProps) {
        const { data, columns } = toRefs(props);

        return {
            data,
            columns
        }
    },
    render () {
        return (
            <tbody>
                {
                    this.data.map((item: any) => (
                        <tr class="list_item">
                            {
                                this.columns.map((key: any) => {
                                    let slotValue = item[key.props.prop];

                                    // 使用slot-scope="props" 进行分发
                                    if(key.children && key.children.default) {
                                        slotValue = key.children.default({ [key.props.prop]: slotValue })
                                    }

                                    return <td class={['row-td']}>{ slotValue }</td>
                                })
                            }
                        </tr>
                    ))
                }
            </tbody>
        )
    }
})