import { defineComponent, toRefs, onMounted } from "vue";
import { type TableProps, headerProps } from "./types";
import { useSort } from "./method";
import "./index.css";

const SORTATUS = {
    asc: 'isAsc',
    desc: 'isDesc'
};

export default defineComponent({
    name: "table-header",

    props: headerProps,

    setup (props: TableProps) {
        const { columns } = toRefs(props);

        let { iconStatusResultMap, sort, resetSort }  = useSort();

        const handlerClick = (property: any, hasSortable: any, sortStatus: any, hadSort: any) => {
            hasSortable && sort(property, sortStatus, hadSort);
        };

        onMounted (() => {
            resetSort();
        });

        return {
            iconStatusResultMap,
            handlerClick,
            columns
        };
    },

    render() {
        return (
            <tr>
                {
                    this.columns.map((item: any) => (

                        <th class={[`sort-icon`]}>
                            { item.props?.label }
                            {
                                item.props?.sortable &&
                                <div>
                                    <span class={['up', this.iconStatusResultMap?.[item.props?.prop]?.isAsc && 'active']}
                                          onClick={() => this.handlerClick(item.props?.prop, item.props?.sortable, SORTATUS.asc, this.iconStatusResultMap?.[item.props?.prop]?.isAsc)}>
                                    </span>
                                    <span class={['down', this.iconStatusResultMap?.[item.props?.prop]?.isDesc && 'active']}
                                          onClick={() => this.handlerClick(item.props?.prop, item.props?.sortable, SORTATUS.desc, this.iconStatusResultMap?.[item.props?.prop]?.isDesc)}>
                                    </span>
                                </div>
                            }
                        </th>
                    ))
                }
            </tr> 
        )
    }
})